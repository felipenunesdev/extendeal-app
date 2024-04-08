import { FormEventHandler } from "react";
import { Producto } from "../../hooks/useProductos";
import { Input } from "../ui/Input";

export type ProductoFormType = Required<Pick<Producto, 'nombre' | 'categoria' | 'especificaciones' | 'precio'>>
type ProductDetails = {
    control: any;
    onSubmit: FormEventHandler<HTMLFormElement>;
    readOnly?: boolean;
}
export const ProductDetails = ({ control, onSubmit, readOnly }: ProductDetails) => {

    return (
        <>
            <div className="grid gap-4 grid-cols-3 pb-2 mb-2 border-b border-b-gray-400">
                <div className="col-span-1 text-xl">
                    Nombre
                </div>
                <div className="col-span-1 text-xl">
                    Categoría
                </div>
                <div className="col-span-1 text-xl">
                    Precio
                </div>
            </div>

            <form id="productoForm" data-testid="productoForm" onSubmit={onSubmit}>
                <div className="grid gap-4 grid-cols-3">
                    <div className="col-span-1">
                        <Input readOnly={readOnly} required name="nombre" control={control} placeholder="Nombre" />
                    </div>
                    <div className="col-span-1">
                        <Input readOnly={readOnly} required name="categoria" control={control} placeholder="Categoría" />
                    </div>
                    <div className="col-span-1">
                        <Input readOnly={readOnly} required name="precio" control={control} placeholder="Precio" type='number' />
                    </div>
                </div>
            </form>
        </>
    )
}