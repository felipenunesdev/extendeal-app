import { useForm } from "react-hook-form";
import { Especificaciones } from "../../hooks/useProductos";
import { IconButton } from "../ui/IconButton";
import { Input } from "../ui/Input";


type EspecificacionFormProps = {
    onAdd: (item: Especificaciones) => void
}

export const EspecificacionForm = ({ onAdd }: EspecificacionFormProps) => {

    const { control, reset, handleSubmit } = useForm({
        defaultValues: {
            nombre: "",
            descripcion: ""
        }
    });

    const onSubmit = (data: Especificaciones) => {
        reset();
        onAdd(data);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4 grid-cols-2">
                    <div className="col-span-1">
                        <Input name="nombre" control={control} placeholder="Nombre" />
                    </div>
                    <div className="col-span-1 flex">
                        <Input name="descripcion" control={control} placeholder="Descripción" className="mr-4" />
                        <IconButton type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>

                        </IconButton>
                    </div>
                </div>

            </form>
        </>
    )
}