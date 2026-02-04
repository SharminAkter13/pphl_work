import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye, FaPrint, FaSearch, FaPlus } from 'react-icons/fa';

const View = ({ isOpen, onClose, data, fields, primaryKey = 'id', relatedDataKey }) => (
    <Modal isOpen={isOpen} onClose={onClose} title="View Record">
        {data && (
            <div>
                {relatedDataKey ? (
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                {fields.map(field => (
                                    <th key={field.name} className="px-4 py-2 border-b">{field.label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data[relatedDataKey]?.map(item => (
                                <tr key={item[primaryKey]}>
                                    {fields.map(field => (
                                        <td key={field.name} className="px-4 py-2 border-b">{item[field.name]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="space-y-2">
                        {fields.map(field => (
                            <div key={field.name}>
                                <strong>{field.label}:</strong> {data[field.name]}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )}
    </Modal>
);

export default View;