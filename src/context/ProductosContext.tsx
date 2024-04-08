import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { Producto } from "../hooks/useProductos";
import { useProductosAdapter } from "../hooks/useProductosAdapter";
import productosJson from '../mock/productos-mock.json'
import { useProductsStore } from "../hooks/useProductosStore";

type ProductoContextValue = { 
    productos: Producto[]
    producto?: Producto
    setProducto: React.Dispatch<React.SetStateAction<Producto | undefined>>
    loadProductos: () => void
}
const ProductosContext = createContext({} as ProductoContextValue);


export const ProductosProvider = ({ children }: PropsWithChildren) => {


    const [productos, setProductos] = useState<Producto[]>([]);
    const [producto, setProducto] = useState<Producto>();
    const { getProducts } = useProductosAdapter();
    const { init } = useProductsStore();

    useEffect(() => {
        init(productosJson.productos)
    }, [])

    const loadProductos = async () => {
        const response = await getProducts();
        const productos = response.sort((a, b) => a.nombre.toLowerCase() > b.nombre.toLowerCase() ? 1 : -1)
        setProductos(productos)
    }

    useEffect(() => {
        loadProductos();
    }, [])

    return (
        <ProductosContext.Provider value={{ productos, producto, setProducto, loadProductos }}>
            {children}
        </ProductosContext.Provider>
    )
}

export const useProductosContext = () => useContext(ProductosContext);