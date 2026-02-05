import React from 'react';
import { ASSET_URL } from '../../services/api';

const Print = ({ data, fields }) => {
    if (!data) return null;

    const isEmployee = !!data.name && !!data.email;

    return (
        <div className="bg-white p-8 max-w-4xl mx-auto print:p-0">
            <div className="no-print flex justify-between items-center mb-6 bg-gray-50 p-4 rounded-lg border">
                <p className="text-sm text-gray-500 font-medium">
                    Review document 
                </p>
                <button 
                    onClick={() => window.print()} 
                    className="bg-blue-600 text-white px-6 py-2 rounded-md font-bold hover:bg-blue-700 transition flex items-center gap-2"
                >
                    <span>Print </span> 
                </button>
            </div>

            <div className="border-4 border-double border-gray-200 p-8">
                <div className="flex justify-between items-start border-b-2 border-gray-900 pb-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter text-gray-900">
                            {isEmployee ? 'Personal Record' : 'Product Specification'}
                        </h1>
                        <p className="text-gray-500 font-mono text-xs mt-1">
                            Reference ID: {data.id} | Generated: {new Date().toLocaleDateString()}
                        </p>
                    </div>
                    <div className="text-right">
                        <div className={`text-sm font-bold uppercase ${data.is_active ? 'text-green-600' : 'text-red-600'}`}>
                            Status: {data.is_active ? 'Active' : 'Inactive'}
                        </div>
                    </div>
                </div>

                <div className="flex gap-10 mb-10">
                    <div className="w-40 h-40 bg-gray-50 border rounded-lg overflow-hidden flex-shrink-0">
                        {(data.profile_image || data.product_image) ? (
                            <img 
                                src={`${ASSET_URL}/storage/${data.profile_image || data.product_image}`} 
                                className="w-full h-full object-cover"
                                alt="Record"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300 italic text-xs">No Image</div>
                        )}
                    </div>

                    <div className="flex-1">
                        <h2 className="text-4xl font-bold text-gray-900 mb-2">{data.name || data.product_name}</h2>
                        <p className="text-xl text-blue-700 font-semibold mb-6">
                            {data.department || data.category_name || 'General Classification'}
                        </p>

                        <div className="grid grid-cols-2 gap-y-4 text-sm">
                            <PrintRow label="Primary Contact" value={data.email || data.sku || 'N/A'} />
                            <PrintRow label="Secondary Ref" value={data.phone || data.base_price || 'N/A'} />
                            <PrintRow label="Website/Portfolio" value={data.website || data.supplier_name || 'N/A'} />
                            <PrintRow label="Effective Date" value={data.joining_datetime || data.created_at || 'N/A'} />
                        </div>
                    </div>
                </div>

                <div className="mb-10">
                    <h3 className="text-xs font-black bg-gray-900 text-white px-3 py-1 inline-block uppercase tracking-widest mb-4">
                        Detailed Specifications
                    </h3>
                    <div className="grid grid-cols-2 gap-x-12 gap-y-3 border-t pt-4">
                        {fields.map(field => (
                            <div key={field.name} className="flex justify-between border-b border-gray-100 py-1">
                                <span className="text-gray-500 text-xs font-bold uppercase">{field.label}</span>
                                <span className="text-gray-900 text-xs font-medium">
                                    {String(data[field.name] || '-')}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 grid grid-cols-2 gap-20">
                    <div className="border-t border-gray-400 pt-2">
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Authorized Signature</p>
                    </div>
                    <div className="border-t border-gray-400 pt-2">
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Verification Date</p>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; }
                    .print\\:p-0 { padding: 0 !important; }
                }
            `}} />
        </div>
    );
};

// Internal Helper for primary rows
const PrintRow = ({ label, value }) => (
    <div>
        <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest">{label}</span>
        <span className="text-gray-800 font-semibold">{value}</span>
    </div>
);

export default Print;