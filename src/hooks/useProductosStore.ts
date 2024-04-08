import uniqid from 'uniqid'
import { create } from 'zustand'
import { Producto } from "./useProductos";

type ProductosStore = {
    productos: Producto[];
    add: (producto: Partial<Producto>) => void;
    update: (producto: Partial<Producto>) => void;
    remove: (id: string) => void;
    getById: (id: string) => Producto | undefined;
    init: (productos: Producto[]) => void;
    getAll: () => Producto[];
}
export const useProductsStore = create<ProductosStore>((set, get) => ({
    productos: [],
    add: (p: Partial<Producto>) => set((state: ProductosStore) => {
        p.id = uniqid.process();
        const productos = [...state.productos];
        productos.push(p as Producto);
        return { productos }
    }),
    update: (p: Partial<Producto>) => set((state: ProductosStore) => {
        const productos = [...state.productos];
        const index = productos.map((prod) => prod.id).indexOf(p.id as string);
        productos.splice(index, 1);
        productos.push(p as Producto)
        return { productos }
    }),
    remove: (id: string) => set((state) => {
        const productos = [...state.productos];
        const index = productos.map((prod) => prod.id).indexOf(id);
        productos.splice(index, 1);
        return { productos }
    }),
    getById: (id: string) => get().productos.find(p => p.id === id),
    getAll: () => get().productos,
    init: (p: Producto[]) => set({productos: p})
}))