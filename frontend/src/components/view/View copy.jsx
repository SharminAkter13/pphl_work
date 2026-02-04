import React from 'react';
import { ASSET_URL } from '../../services/api';

const View = ({ data, fields }) => {
    if (!data) return null;

    // Detect if record is an employee
    const isEmployee = !!data.name && !!data.email;

    if (isEmployee) {
        return (
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg max-h-[80vh] overflow-y-auto">
                {/* 1. TOP CARD: BASIC INFORMATION */}
                <div className="bg-white p-6 rounded-xl shadow-sm border mb-6">
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wider">Employee Profile</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${data.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {data.is_active ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Profile Image */}
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-100">
                                {data.profile_image ? (
                                    <img 
                                        src={`${ASSET_URL}/storage/${data.profile_image}`} 
                                        className="w-full h-full object-cover" 
                                        alt="Profile" 
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Photo</div>
                                )}
                            </div>
                            <p className="mt-2 text-xs text-gray-400 font-mono">ID: {data.id}</p>
                        </div>

                        {/* Quick Stats */}
                        <div className="flex-1">
                            <h1 className="text-2xl font-black text-gray-900 mb-1">{data.name}</h1>
                            <p className="text-blue-600 font-medium mb-4">{data.department || 'General'} Department</p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center text-gray-600">
                                    <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full mr-3 text-gray-400">✉</span>
                                    {data.email}
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full mr-3 text-gray-400">📞</span>
                                    {data.phone || 'N/A'}
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full mr-3 text-gray-400">🌐</span>
                                    <a href={data.website} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline truncate">
                                        {data.website || 'No Website'}
                                    </a>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full mr-3 text-gray-400">🎂</span>
                                    {data.dob ? new Date(data.dob).toLocaleDateString() : 'N/A'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. BOTTOM GRID: ALL OTHER INFORMATION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Professional Info */}
                    <div className="bg-white p-5 rounded-xl border shadow-sm">
                        <h4 className="text-sm font-bold text-gray-400 uppercase mb-4 border-b pb-2">Professional Details</h4>
                        <div className="space-y-4">
                            <DetailItem label="Joining Date" value={data.joining_datetime ? new Date(data.joining_datetime).toLocaleString() : '-'} />
                            <DetailItem label="Salary Range" value={`$${data.salary_range || 0}`} />
                            <DetailItem label="Office Time" value={data.office_time || '-'} />
                            <DetailItem label="Join Month" value={data.joining_month || '-'} />
                            <DetailItem label="Join Week" value={data.joining_week || '-'} />
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-white p-5 rounded-xl border shadow-sm">
                        <h4 className="text-sm font-bold text-gray-400 uppercase mb-4 border-b pb-2">Additional Info</h4>
                        <div className="space-y-4">
                            <DetailItem label="Age" value={data.age || '-'} />
                            <DetailItem label="Fav Color" value={
                                <div className="flex items-center">
                                    <div className="w-4 h-4 rounded border mr-2" style={{ backgroundColor: data.favorite_color }}></div>
                                    {data.favorite_color || '-'}
                                </div>
                            } />
                            <DetailItem label="Skills" value={
                                <div className="flex flex-wrap gap-1">
                                    {Array.isArray(data.skills) ? data.skills.map(s => (
                                        <span key={s} className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] border border-blue-100">{s}</span>
                                    )) : '-'}
                                </div>
                            } />
                            <DetailItem label="Resume" value={
                                data.resume ? (
                                    <a href={`${ASSET_URL}/storage/${data.resume}`} target="_blank" rel="noreferrer" className="text-xs bg-gray-800 text-white px-3 py-1 rounded hover:bg-black transition">
                                        View Document 📄
                                    </a>
                                ) : 'Not Uploaded'
                            } />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Default Fallback for other data types (Product, etc)
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {fields.map(field => (
                <div key={field.name} className="border-b py-2 flex justify-between items-center">
                    <strong className="text-gray-500 text-sm uppercase">{field.label}:</strong> 
                    <span className="text-gray-800">{String(data[field.name] || '-')}</span>
                </div>
            ))}
        </div>
    );
};

// Helper component for clean rows
const DetailItem = ({ label, value }) => (
    <div className="flex justify-between items-start text-sm">
        <span className="text-gray-400 font-medium">{label}</span>
        <div className="text-gray-800 font-semibold text-right max-w-[60%]">{value}</div>
    </div>
);

export default View;