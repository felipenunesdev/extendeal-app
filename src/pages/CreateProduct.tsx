import { useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { EspecificacionForm } from "../components/producto/EspecificacionForm";
import { EspecificacionesList } from "../components/producto/EspecificacionesList";
import { ProductDetails, ProductoFormType } from "../components/producto/ProductDetails";
import { Button } from "../components/ui/Button";
import { useProductosContext } from "../context/ProductosContext";
import { Especificaciones, Producto } from "../hooks/useProductos";
import { useProductosAdapter } from "../hooks/useProductosAdapter";

export const CreateProduct = () => {
    const navigate = useNavigate();
    const { loadProductos } = useProductosContext();
    const { createProduct } = useProductosAdapter();


    const { control, formState: { isValid }, setValue, handleSubmit } = useForm<ProductoFormType>({
        defaultValues: {
            nombre: "",
            categoria: "",
            precio: "",
            especificaciones: []
        }
    });

    const { especificaciones } = useWatch({ control })

    const handleAdd = useCallback((especificacion: Especificaciones) => {

        if (especificaciones) {
            const espec = [...especificaciones, especificacion]
            setValue('especificaciones', espec)
        }

    }, [especificaciones]);

    const handleRemove = useCallback((especificacion: Especificaciones) => {

        if (especificaciones) {
            const espec = especificaciones.filter(e => e.nombre !== especificacion.nombre)
            setValue('especificaciones', espec)
        }

    }, [especificaciones]);

    const onSubmit = async (data: Partial<Producto>) => {
        const producto: Partial<Producto> = { ...data, precio: parseFloat(data.precio as string) }
        try {
            await createProduct(producto)
            navigate('/')
            loadProductos();
        }

        catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <h1 className="text-3xl mb-12">Crear nuevo producto</h1>

            <ProductDetails control={control} onSubmit={handleSubmit(onSubmit)}  />

            <h2 className="text-2xl mt-12 mb-6">Especificaciones</h2>
            <EspecificacionForm onAdd={handleAdd} />
            <EspecificacionesList onRemove={handleRemove} especificaciones={especificaciones} />

            <div className="flex justify-end mt-16">
                <div className="mr-2">
                    <Button variant="outlined" onClick={() => navigate('/')}>Cancelar</Button>
                </div>
                <Button form="productoForm" data-testid="agregar-producto" type="submit" disabled={!isValid}>Agregar producto</Button>
            </div>
        </>
    )
}