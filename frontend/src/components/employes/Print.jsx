import React from 'react';

const Print = ({ data, fields = [] }) => {
    if (!data) return <div className="p-10 text-center text-gray-900">No record selected.</div>;

    const getNestedValue = (obj, path) => {
        if (!path) return null;
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    const unitPrice = parseFloat(data.base_price || 0);
    const quantity = parseInt(data.quantity || 1);
    const netTotal = unitPrice * quantity;
    const vatRate = 0.10; 
    const vatAmount = netTotal * vatRate;
    const grandTotal = netTotal + vatAmount;

    return (
        <div className="bg-white text-gray-900 font-sans p-4 max-w-4xl mx-auto">
            <div className="no-print flex justify-between items-center mb-6 bg-gray-50 p-4 rounded border">
                <p className="text-sm text-gray-500 font-medium italic">  Generating PDF.</p>
                <button 
                    onClick={() => window.print()} 
                    className="bg-black text-white px-6 py-2 rounded font-bold hover:bg-gray-800 transition flex items-center gap-2"
                >
                    Print 
                </button>
            </div>

            <div className="border-4 border-black p-0">
                
                <div className="flex justify-between border-b-4 border-black">
                    <div className="p-6 border-r-4 border-black flex-1">
                        <h2 className="font-black text-2xl uppercase leading-none mb-1">
                            {getNestedValue(data, 'supplier.supplier_name') || "N/A Supplier"}
                        </h2>
                        <p className="text-sm font-medium">{data.supplier?.address || "Bartertown, NY 12345"}</p>
                        <p className="text-sm">{data.supplier?.phone || "(212) 555-1234"}</p>
                        <p className="text-sm">{data.supplier?.email || "info@masterblaster.com"}</p>
                    </div>
                    <div className="p-6 flex items-center justify-center min-w-[220px] bg-gray-50">
                        <h1 className="text-5xl font-black uppercase tracking-tighter">INVOICE</h1>
                    </div>
                </div>

                <div className="grid grid-cols-3 border-b-4 border-black bg-white">
                    <div className="p-3 border-r-4 border-black">
                        <span className="font-black uppercase text-xs block text-gray-400">Invoice ID</span>
                        <span className="font-bold">#00{data.id || '---'}</span>
                    </div>
                    <div className="p-3 border-r-4 border-black">
                        <span className="font-black uppercase text-xs block text-gray-400">Date Issued</span>
                        <span className="font-bold">{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="p-3">
                        
                    </div>
                </div>

                <div className="p-6 border-b-4 border-black">
                    <h3 className="font-black uppercase text-xs text-gray-400 mb-2">Bill To:</h3>
                    <p className="text-xl font-black uppercase">{data.client_name || "Imperator Furiosa"}</p>
                    <p className="text-sm whitespace-pre-line">{data.client_address || "202 Fury Road\nGreenplace, NY 10101"}</p>
                </div>

                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b-4 border-black uppercase text-sm font-black bg-gray-100">
                            <th className="p-3 border-r-4 border-black w-24">SKU</th>
                            <th className="p-3 border-r-4 border-black">Item Description</th>
                            <th className="p-3 border-r-4 border-black w-24 text-center">Qty/Size</th>
                            <th className="p-3 border-r-4 border-black w-32 text-right">Unit Price</th>
                            <th className="p-3 w-32 text-right">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b-2 border-black text-sm">
                            <td className="p-3 border-r-4 border-black font-mono">{data.sku || 'N/A'}</td>
                            <td className="p-3 border-r-4 border-black font-bold uppercase">{data.product_name || 'N/A'}</td>
                            <td className="p-3 border-r-4 border-black text-center">{quantity}</td>
                            <td className="p-3 border-r-4 border-black text-right">${unitPrice.toFixed(2)}</td>
                            <td className="p-3 text-right font-bold">${netTotal.toFixed(2)}</td>
                        </tr>
                        <tr className="h-12 border-b-2 border-black"><td className="border-r-4 border-black"></td><td className="border-r-4 border-black"></td><td className="border-r-4 border-black"></td><td className="border-r-4 border-black"></td><td></td></tr>
                    </tbody>
                </table>

                <div className="flex">
                    <div className="flex-1 border-r-4 border-black p-4 italic text-xs self-end">
                        Payment accepted via check or credit card within 30 days.
                    </div>
                    <div className="w-64">
                        <div className="flex justify-between p-3 border-b-2 border-black">
                            <span className="font-black uppercase text-xs">Net Total</span>
                            <span className="font-bold">${netTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between p-3 border-b-4 border-black">
                            <span className="font-black uppercase text-xs">Vat (10%)</span>
                            <span className="font-bold">${vatAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between p-3 bg-black text-white font-black">
                            <span className="uppercase text-sm">Grand Total</span>
                            <span className="text-xl">${grandTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="flex border-t-4 border-black">
                    <div className="flex-1 p-3 border-r-4 border-black bg-gray-50">
                    </div>
                    <div className="p-3 w-64 flex justify-between items-center">
                        <span className="font-black uppercase text-xs">Payment Due:</span>
                        <span className="font-bold underline text-lg">{data.due_date || "N/A"}</span>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; padding: 0; }
                    .border-black { border-color: black !important; }
                    .bg-black { background-color: black !important; color: white !important; -webkit-print-color-adjust: exact; }
                }
            `}} />
        </div>
    );
};

export default Print;