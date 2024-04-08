import { useState } from "react";
import { Especificaciones } from "../../hooks/useProductos";
import { EspecificacionForm } from "./EspecificacionForm";
import { IconButton } from "../ui/IconButton";

type EspecificacionProps = {
    especificaciones?: Especificaciones[];
    readOnly?: boolean;
    onRemove: (especificacion: Especificaciones) => void
}
export const EspecificacionesList = ({ especificaciones, readOnly, onRemove }: EspecificacionProps) => {


    return (
        <>
            <div>
                <div className="grid gap-4 grid-cols-2 pb-2 mb-2 border-b border-b-gray-400">
                    <div className="col-span-1 text-xl">
                        Nombre
                    </div>
                    <div className="col-span-1 text-xl">
                        Descripción
                    </div>
                </div>
                {especificaciones?.map((espec, index) => (
                    <div key={`${index}-${espec.nombre?.trim()}`} className="grid gap-4 grid-cols-2 mb-4">
                        <div className="col-span-1">
                            {espec.nombre}
                        </div>
                        <div className="col-span-1 flex justify-between">
                            {espec.descripcion}
                            {
                                !readOnly &&
                                <IconButton onClick={() => onRemove(espec)} size="small">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                    </svg>
                                </IconButton>
                            }
                        </div>
                    </div>
                ))}
            </div >
        </>
    )
}