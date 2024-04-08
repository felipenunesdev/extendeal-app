import { act, renderHook } from "@testing-library/react";
import { useProductos } from "./useProductos"; // Ajuste o caminho do import conforme necessário
import fetchMock from "jest-fetch-mock";
import productosJson from "../mock/productos-mock.json";
import { API_URL } from "../core/env.const";

const nuevoProductoMock = {
  nombre: "Galaxy S21 Ultra",
  categoria: "Smartphone",
  precio: 699,
  especificaciones: [
    {
      nombre: "RAM",
      descripcion: "8Gb",
    },
  ],
  id: "0763c6c9-2504-443b-b736-72e9be7ccfde",
};

const tabletId = "5f8d0a44-d8e0-4d33-89fe-c545a567b4d6";
const mockProductoTablet = productosJson.productos.find(
  (p) => p.id === tabletId
);

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("useProductos", () => {
  it("obtener listado de productos utilizando getProducts", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(productosJson));

    const { result: hook } = renderHook(() => useProductos());
    let productos;
    await act(async () => {
      productos = await hook.current.getProducts();
    });

    expect(productos).toEqual(productosJson.productos);
    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/productos`);
  });

  it("crear nuevo producto utilizando createProduct", async () => {
    const productosList = [...productosJson.productos];

    const { result: hook } = renderHook(() => useProductos());
    await act(async () => {
      await hook.current.createProduct(nuevoProductoMock);
      productosList.push(nuevoProductoMock);
    });

    expect(productosList).toContainEqual(nuevoProductoMock);
    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/productos`, {
      method: "POST",
      body: JSON.stringify(nuevoProductoMock),
      headers: { "Content-type": "application/json" },
    });
  });

  it("obtener un producto por id utilizando getProductById", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockProductoTablet));

    const { result: hook } = renderHook(() => useProductos());
    let producto;

    await act(async () => {
      producto = await hook.current.getProductById(tabletId);
    });

    expect(producto).toEqual(mockProductoTablet);
    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/productos/${tabletId}`);
  });

  it("remover producto utilizando removeProduct", async () => {
    const response = productosJson.productos.filter((p) => p.id !== tabletId);

    const { result: hook } = renderHook(() => useProductos());

    await act(async () => {
      await hook.current.removeProduct(tabletId);
    });

    expect(response).not.toContainEqual(mockProductoTablet);
    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/productos/${tabletId}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    });
  });

  it("actualizar producto utilizando updateProduct", async () => {

    const datoNuevo = { nombre: "Aspect ratio", descripcion: "16:9" };

    const productoActualizado = {...mockProductoTablet}
    productoActualizado.especificaciones?.push(datoNuevo);

    const mockActualizado = {...mockProductoTablet}
    mockActualizado.especificaciones?.push(datoNuevo);

    
    const { result: hook } = renderHook(() => useProductos());
    
    await act(async () => {
        await hook.current.updateProduct(productoActualizado);
    });
    
    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/productos`, { 
        method: 'PUT', 
        body: JSON.stringify(productoActualizado),
        headers: {'Content-type': 'application/json'} 
    });
    

    fetchMock.mockResponseOnce(JSON.stringify(mockActualizado));
    let producto;

    await act(async () => {
      producto = await hook.current.getProductById(tabletId);
    });

    expect(producto).toEqual(productoActualizado);
  });
});
