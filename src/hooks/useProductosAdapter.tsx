import { USE_MOCK } from "../core/env.const";
import { useProductos } from "./useProductos";
import { useProductosMock } from "./useProductosMock";

export const useProductosAdapter = USE_MOCK ? useProductosMock : useProductos;