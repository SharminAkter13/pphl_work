import React from 'react';
import { ASSET_URL } from '../../services/api';

const Print = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-white p-10 max-w-4xl mx-auto shadow-sm border text-gray-800 font-sans">
      {/* Header Section */}
      <div className="flex justify-between items-start border-b-4 border-black pb-8 mb-8">
        <div>
          <h1 className="text-5xl font-black tracking-tighter italic">PRODUCT SPEC</h1>
          <p className="text-gray-400 mt-2 font-mono uppercase tracking-widest text-xs">
            System ID: #{data.id}
          </p>
        </div>
        <div className="text-right">
          <h2 className={`text-xl font-bold uppercase ${data.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
            {data.status || 'Active'}
          </h2>
          <p className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Hero Section: Image & Main Info */}
      <div className="flex flex-col md:flex-row gap-10 mb-10">
        {/* Product Image Box */}
        <div className="w-full md:w-1/3 aspect-square bg-gray-50 border-2 border-dashed flex items-center justify-center rounded-xl overflow-hidden">
          {data.product_image ? (
            <img 
              src={`${ASSET_URL}/storage/${data.product_image}`} 
              className="w-full h-full object-contain p-2" 
              alt="Product" 
            />
          ) : (
            <div className="text-center">
              <span className="text-5xl opacity-20 block mb-2">📦</span>
              <span className="text-[10px] text-gray-400 uppercase font-bold">No Image</span>
            </div>
          )}
        </div>

        {/* Core Specs Grid */}
        <div className="flex-1 grid grid-cols-2 gap-y-6">
          <div className="col-span-2">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Product Name</p>
            <p className="text-3xl font-black text-black leading-tight">{data.product_name}</p>
          </div>
          
          <DetailBox label="SKU Number" value={data.sku} />
          <DetailBox label="Base Price" value={`$${data.base_price}`} highlight />
          <DetailBox label="Category ID" value={data.category_id} />
          <DetailBox label="Sub-Category ID" value={data.subcategory_id} />
          <DetailBox label="Supplier ID" value={data.supplier_id} />
          <DetailBox label="Featured" value={data.featured ? "★ Yes" : "No"} />
        </div>
      </div>

      {/* Description Section */}
      <div className="mb-10 bg-gray-50 p-6 rounded-lg border">
        <h3 className="text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Description</h3>
        <p className="text-gray-700 leading-relaxed italic">
          {data.description || 'No detailed description available for this item.'}
        </p>
      </div>

      {/* Technical Specifications Table */}
      <table className="w-full text-left border-collapse mb-10">
        <thead>
          <tr className="bg-black text-white text-[10px] uppercase tracking-widest">
            <th className="p-3">Color Attribute</th>
            <th className="p-3">Size/Dimension</th>
            <th className="p-3">Created At</th>
            <th className="p-3 text-right">Last Updated</th>
          </tr>
        </thead>
        <tbody className="border-b-2 border-black">
          <tr className="text-sm font-bold">
            <td className="p-3 uppercase">
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full border shadow-sm" 
                  style={{ backgroundColor: data.color || '#eee' }}
                ></div>
                {data.color || 'N/A'}
              </div>
            </td>
            <td className="p-3">{data.size || 'Standard'}</td>
            <td className="p-3 text-gray-500 font-normal">
              {data.created_at ? new Date(data.created_at).toLocaleDateString() : 'N/A'}
            </td>
            <td className="p-3 text-right text-gray-500 font-normal">
              {data.updated_at ? new Date(data.updated_at).toLocaleDateString() : 'N/A'}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Bottom Sign-off */}
      <div className="mt-20 grid grid-cols-2 gap-20">
        <div className="border-t border-gray-900 pt-2 text-center text-[10px] font-bold uppercase text-gray-400">Inventory Manager</div>
        <div className="border-t border-gray-900 pt-2 text-center text-[10px] font-bold uppercase text-gray-400">Quality Assurance</div>
      </div>

      {/* Print Button - Hidden on Paper */}
      <div className="mt-12 flex justify-center no-print">
        <button 
          onClick={() => window.print()} 
          className="bg-black text-white px-12 py-3 rounded-full font-black hover:bg-gray-800 transition shadow-2xl uppercase tracking-tighter flex items-center gap-2"
        >
          <span>Print Spec Sheet</span>
        </button>
      </div>
    </div>
  );
};

// Helper component for layout
const DetailBox = ({ label, value, highlight = false }) => (
  <div>
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <p className={`font-bold ${highlight ? 'text-xl text-blue-600' : 'text-gray-800'}`}>
      {value || '—'}
    </p>
  </div>
);

export default Print;