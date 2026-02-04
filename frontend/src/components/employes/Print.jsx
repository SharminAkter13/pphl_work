import React from 'react';

const Print = ({ data, fields = [] }) => {
    if (!data) return <div className="p-10 text-center text-gray-900">No record selected.</div>;

    const getNestedValue = (obj, path) => {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    const unitPrice = data.base_price || 0;
    const quantity = data.quantity || 1; 
    const total = unitPrice * quantity;

    return (
        <div className="bg-white text-gray-900 font-sans p-4">
            <div className="no-print flex justify-end mb-4">
                <button 
                    onClick={() => window.print()} 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-bold text-sm transition"
                >
                    Print Document 📄
                </button>
            </div>

            <div className="border-2 border-gray-300">
                
                <div className="flex justify-between border-b-2 border-gray-300">
                    <div className="p-6 border-r-2 border-gray-300 flex-1">
                        <h2 className="font-black text-xl uppercase tracking-tight">
                            {getNestedValue(data, 'supplier.supplier_name') || "Master Blaster's Massive Entity"}
                        </h2>
                        <p className="text-xs mt-1 text-gray-600">
                            Ref ID: {data.id} | Generated: {new Date().toLocaleDateString()}
                        </p>
                    </div>
                    <div className="p-6 flex items-center justify-center min-w-[180px]">
                        <h1 className="text-3xl font-black uppercase tracking-widest text-gray-400">Invoice</h1>
                    </div>
                </div>

                <div className="grid grid-cols-2 border-b-2 border-gray-300 bg-gray-50">
                    <div className="p-3 border-r-2 border-gray-300 font-bold">
                        Invoice #{String(data.id).padStart(4, '0')}
                    </div>
                    <div className="p-3">
                        <span className="font-bold text-gray-500 uppercase text-xs mr-2">Date Issued:</span> 
                        {new Date().toLocaleDateString()}
                    </div>
                </div>

                <div className="p-6 border-b-2 border-gray-300">
                    <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Item Description</h3>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-2xl font-black uppercase text-gray-800">
                                {data.product_name || "N/A"}
                            </p>
                            <p className="text-sm text-blue-600 font-semibold">
                                {getNestedValue(data, 'category.category_name') || "General Product"}
                            </p>
                        </div>
                        {data.product_image && (
                            <img 
                                src={`http://127.0.0.1:8000/storage/${data.product_image}`} 
                                className="w-16 h-16 object-cover border" 
                                alt="Product"
                            />
                        )}
                    </div>
                </div>

                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b-2 border-gray-800 bg-gray-100 text-[10px] uppercase font-black">
                            <th className="p-3 border-r-2 border-gray-300">Specification</th>
                            <th className="p-3">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fields.map((field) => (
                            <tr key={field.name} className="border-b border-gray-200">
                                <td className="p-3 border-r-2 border-gray-300 font-bold text-xs uppercase text-gray-500 w-1/3">
                                    {field.label}
                                </td>
                                <td className="p-3 text-sm font-medium">
                                    {getNestedValue(data, field.name) || "N/A"}
                                </td>
                            </tr>
                        ))}
                        
                        <tr className="border-t-2 border-gray-800 bg-gray-50">
                            <td className="p-3 border-r-2 border-gray-300 font-bold text-xs uppercase text-right">Unit Price</td>
                            <td className="p-3 font-bold">${Number(unitPrice).toFixed(2)}</td>
                        </tr>
                        <tr className="bg-gray-900 text-white">
                            <td className="p-3 border-r-2 border-gray-700 font-bold text-xs uppercase text-right">Total Amount (Inc. Tax if applicable)</td>
                            <td className="p-3 font-black text-lg">${Number(total).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <style setInnerHTML={{ __html: `
                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; padding: 0; margin: 0; }
                    .border-gray-300 { border-color: #000 !important; }
                    .bg-gray-900 { background-color: #000 !important; color: #fff !important; print-color-adjust: exact; }
                }
            `}} />
        </div>
    );
};

export default Print;