import { API_URL } from "../core/env.const";

export type Producto = {
        id: string;
        nombre: string;
        categoria: string;
        especificaciones: Especificaciones[]
        precio: number | string;
}

export type Especificaciones = {
    nombre?: string;
    descripcion?: string;
}

export const useProductos = () => {

    const getProducts = async (): Promise<Producto[]> => {
        const response = await fetch(`${API_URL}/productos`);
        const data = await response.json();
        return data.productos;
    }

    const createProduct = async (producto: Partial<Producto>) => {
        await fetch(`${API_URL}/productos`, { 
            method: 'POST', 
            body: JSON.stringify(producto), 
            headers: {'Content-type': 'application/json'} 
        });
    }

    const getProductById = async (id: string): Promise<Producto> => {
        const response = await fetch(`${API_URL}/productos/${id}`);
        const data = await response.json();
        return data;
    }

    const removeProduct = async (id: string) => {
        await fetch(`${API_URL}/productos/${id}`, { 
            method: 'DELETE', 
            headers: {'Content-type': 'application/json'} 
        });
    }

    const updateProduct = async (producto: Partial<Producto>) => {
        await fetch(`${API_URL}/productos`, { 
            method: 'PUT', 
            body: JSON.stringify(producto), 
            headers: {'Content-type': 'application/json'} 
        });
    }

    return {
        getProducts,
        createProduct,
        getProductById,
        removeProduct,
        updateProduct
    }

}