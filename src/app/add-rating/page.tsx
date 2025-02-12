"use client";

import { useState } from 'react';
import { addData } from '../config/actions';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddRating = () => {
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [rating, setRating] = useState<number | ''>('');
        const router = useRouter()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addData(province, city, Number(rating));
            toast.success("Data added successfully")
            setProvince('');
            setCity('');
            setRating('');
            router.push("/dashboard")
        } catch (error) {
            alert('Error adding rating');
        }
    };

    return (
        <>
    
        <Header/>
        <ToastContainer/>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Add Rating</h2>
            <div className="mb-4">
                <label className="block text-gray-700">Province</label>
                <input
                    type="text"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">City</label>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Rating</label>
                <input
                    type="number"
                    value={rating}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRating(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
                Add Rating
            </button>
        </form>
        </>
    );
};

export default AddRating; 
