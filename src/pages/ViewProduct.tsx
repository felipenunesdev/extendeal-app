import { useCallback, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { EspecificacionForm } from "../components/producto/EspecificacionForm";
import { EspecificacionesList } from "../components/producto/EspecificacionesList";
import { ProductDetails, ProductoFormType } from "../components/producto/ProductDetails";
import { Button } from "../components/ui/Button";
import { useProductosContext } from "../context/ProductosContext";
import { Especificaciones, Producto } from "../hooks/useProductos";
import { useProductosAdapter } from "../hooks/useProductosAdapter";


export const ViewProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getProductById, removeProduct, updateProduct } = useProductosAdapter();
    const { loadProductos } = useProductosContext();
    const [readOnly, setReadOnly] = useState(true)

    const { control, formState: { isValid }, setValue, handleSubmit, getValues, reset } = useForm<ProductoFormType>({
        defaultValues: {
            nombre: "",
            categoria: "",
            precio: "",
            especificaciones: []
        }
    });

    const { especificaciones } = useWatch({control});

    const getProduct = async (id: string) => {
        const producto = await getProductById(id);
        reset(producto)
    }

    useEffect(() => {
        if (id) getProduct(id)
    }, [id])


    const handleEliminar = async () => {
        if (id) {
            await removeProduct(id);
            loadProductos();
            navigate('/')
        }
    }

    const handleEditar = (e: any) => {
        e.preventDefault();
        setReadOnly(false)
    }

    const onSubmit = async (data: Partial<Producto>) => {
        const producto: Partial<Producto> = { ...data, precio: parseFloat(data.precio as string) }
        try {
            await updateProduct(producto)
            loadProductos();
            await getProduct(producto.id as string)
            setReadOnly(true)
        }

        catch (e) {
            console.error(e)
        }
    }

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

    return (
        <>
        <div className="flex justify-between items-start">

            <h1 className="text-3xl mb-12">Detalles del producto</h1>
            <Button onClick={() => navigate('/create')}>Agregar producto</Button>
        </div>

            <ProductDetails readOnly={readOnly} control={control} onSubmit={handleSubmit(onSubmit)} />

            <h2 className="text-2xl mt-12 mb-6">Especificaciones</h2>
            {
                !readOnly &&
                <EspecificacionForm onAdd={handleAdd} />
            }
            <EspecificacionesList onRemove={handleRemove} readOnly={readOnly} especificaciones={especificaciones} />

            {
                readOnly ?
                    <div className="flex justify-end mt-16">
                        <div className="mr-2">
                            <Button variant="outlined" onClick={handleEliminar}>Eliminar</Button>
                        </div>
                        <Button onClick={handleEditar} type="button">Editar</Button>
                    </div>
                    :
                    <div className="flex justify-end mt-16">
                        <div className="mr-2">
                            <Button variant="outlined" onClick={() => setReadOnly(true)}>Cancelar</Button>
                        </div>
                        <Button form="productoForm" type="submit">Guardar</Button>
                    </div>
            }


        </>
    )
}