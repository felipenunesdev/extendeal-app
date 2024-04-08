import { Producto } from "./useProductos";
import { useCallback } from "react";
import { useProductsStore } from "./useProductosStore";


export const useProductosMock = () => {
  const { getAll, add, getById, remove, update, init } = useProductsStore();

  const getProducts = useCallback(async (): Promise<Producto[]> => {
    return getAll();
  }, [getAll]);

  const createProduct = useCallback(
    async (producto: Partial<Producto>) => {
      return add(producto);
    },
    [add]
  );

  const getProductById = useCallback(
    async (id: string): Promise<Producto | undefined> => {
      return getById(id);
    },
    [getById]
  );

  const removeProduct = useCallback(
    async (id: string) => {
      return remove(id);
    },
    [remove]
  );

  const updateProduct = useCallback(
    async (producto: Partial<Producto>) => {
      return update(producto);
    },
    [update]
  );

  return {
    getProducts,
    createProduct,
    getProductById,
    removeProduct,
    updateProduct,
  };
};
