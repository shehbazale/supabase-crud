"use client";
import React from "react";

interface EditModalProps {
    editData: { id: number | null; province: string; city: string; rating: string };
    setEditData: React.Dispatch<React.SetStateAction<{ id: number | null; province: string; city: string; rating: string }>>;
    handleUpdate: (data: { id: number | null; province: string; city: string; rating: string }) => void;
    closeModal: () => void;
}

const EditModal = ({ editData, setEditData, handleUpdate, closeModal }: EditModalProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleUpdate(editData); // Pass the updated data
        closeModal();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">Edit Rating</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Province:</label>
                        <input
                            type="text"
                            name="province"
                            value={editData.province}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">City:</label>
                        <input
                            type="text"
                            name="city"
                            value={editData.city}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Rating:</label>
                        <input
                            type="number"
                            name="rating"
                            value={editData.rating}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={closeModal} className="mr-2 px-4 py-2 bg-gray-500 text-white rounded">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
