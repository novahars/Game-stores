// src/api/api.js
const API_URL = "http://127.0.0.1:8000/api/stores";

// Fungsi untuk mendapatkan data toko
export const getStores = async () => {
    try {
        const response = await fetch(`${API_URL}/stores`);
        if (!response.ok) {
            throw new Error("Failed to fetch stores");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching stores:", error);
        throw error;
    }
};
