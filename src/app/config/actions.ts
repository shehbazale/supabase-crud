import supabase from "./supabase"

export const getData = async () => {

    const { data, error } = await supabase.from('rating').select('*')
    if (error) throw error
    return data
}
export const addData = async (province: string, city: string, rating: number) => {
    const { data, error } = await supabase.from('rating').insert([
        { province, city, rating }
    ])
    if (error) throw error
    return data
}

export const deleteData = async (id: number) => {
    const { error } = await supabase.from('rating').delete().eq('id', id);
    if (error) {
        console.error("Error deleting data:", error.message);
        throw error;
    }
    return true; 
};

 export const updateData = async (id: number | null, updatedData:any) => {
    try {
        const { data, error } = await supabase
            .from('rating') 
            .update({
                province: updatedData.province,
                city: updatedData.city,
                rating: updatedData.rating,
            })
            .eq('id', id).select(); 

        if (error) {
            throw error;
        }
        return data; 
    } catch (error) {
        console.error('Error updating data:', error);
        return null; 
    }
};
