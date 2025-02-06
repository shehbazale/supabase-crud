"use client"
import { useEffect, useState } from "react";
import { deleteData, getData, updateData } from "../config/actions";
import { columns } from "../constants/column";
import supabase from "../config/supabase";
import { useRouter } from "next/navigation";
import EditModal from "../components/EditModel";
import Header from "../components/Header";
interface EditData {
    id: number | null;
    province: string;
    city: string;
    rating: string;
}

const RatingDetail = () => {
    const [data, setData] = useState<any[]>([]);
    const [editModal, setEditModal] = useState<Boolean>(false);
    const [loading, setLoading] = useState<Boolean>(true);
    const [editData, setEditData] = useState<EditData>({
        id: null,
        province: "",
        city: "",
        rating: ""
    });

    const router = useRouter();
    useEffect(() => {

        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/auth/login');
            }
            else {
                setLoading(false)
            }
        };
        const fetchData = async () => {
            const response = await getData()
            if (response) {
                setData(response)
            }
        }
        checkUser()
        fetchData()
    }, [])
    
    const handleDelete = async (id: number) => {
        const result = await deleteData(id);
        if (result) {
            alert('Data deleted successfully');
            setData((prevData) => prevData.filter((item) => item.id !== id))
        }
    }
    const handleEdit = (item: any) => {
        setEditData(item);
        setEditModal(true);
    };

    const handleUpdate = async (updatedData: any) => {
        const result = await updateData(updatedData.id, updatedData);
        console.log("result", result)
        if (result) {
            setData((prevData) => prevData.map((item) => (item.id === updatedData.id ? updatedData : item)));
            setEditModal(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    return (
        <>
        <Header/>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-20 mt-24">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                        Most Beautiful Cities of Pakistan
                    </caption>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {
                                columns.map((item) => (
                                    <th scope="col" className="px-6 py-3" key={item.label}>
                                        {item.label}
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((item) => (
                                <tr className="bg-white   border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200" key={item.id}>
                                    <td className="px-6 py-4 ">{item.province}</td>
                                    <td className="px-6 py-4">{item.city}</td>
                                    <td className="pl-8 py-4">{item.rating}</td>
                                    <td className="px-6 py-4">
                                        <button className="text-blue-600 hover:text-blue-900" onClick={() => handleEdit(item)}>Edit</button>
                                        <button className="text-red-600 hover:text-red-900 ml-4" onClick={() => handleDelete(item?.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {editModal && (
                <EditModal
                    editData={editData}
                    setEditData={setEditData}
                    handleUpdate={handleUpdate}
                    closeModal={() => setEditModal(false)}
                />
            )}
        </>
    );
};



export default RatingDetail