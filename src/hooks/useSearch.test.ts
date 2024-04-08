import { renderHook, act } from '@testing-library/react';
import { useSearch } from './useSearch';
import productosJson from '../mock/productos-mock.json';

const mockProductoTablet = productosJson.productos.find(p => p.id === "5f8d0a44-d8e0-4d33-89fe-c545a567b4d6");
const mockProductoAlmacenamiento = productosJson.productos.find(p => p.id === "334bc2f1-ebde-4aba-9853-77d658ddf3a6");

describe('useSearch', () => {

    it('si la lista está vacia no devuelve resultados', () => {
        const { result: hook } = renderHook(() => useSearch({ list: [], fields: ['nombre'] }));  
        expect(hook.current.result).toEqual([])
    })
    
    it('buscar por unico campo', () => {
        const { result: hook } = renderHook(() => useSearch({ list: productosJson.productos, fields: ['nombre'] }));  

        act(() => {
            hook.current.setQuery('Tablet')
        })

        expect(hook.current.result).toEqual([mockProductoTablet])
    })
    
    it('buscar por multiples campos', () => {
        const { result: hook } = renderHook(() => useSearch({ list: productosJson.productos, fields: ['nombre', 'categoria'] }));  

        act(() => {
            hook.current.setQuery('Almacenamiento')
        })

        expect(hook.current.result).toEqual([mockProductoAlmacenamiento])
    })


    it('si no encuentra resultados devuelve un array vacio', () => {
        const { result: hook } = renderHook(() => useSearch({ list: productosJson.productos, fields: ['nombre', 'categoria'] }));  

        act(() => {
            hook.current.setQuery('ValorInexistente')
        })

        expect(hook.current.result).toEqual([])
    })
})