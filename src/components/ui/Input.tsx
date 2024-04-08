import { Controller } from "react-hook-form"
import { InputUI } from "./InputUI";

type InputProps = {
    control: any;
    name?: string;
} & React.InputHTMLAttributes<HTMLInputElement>

export const Input = ({ control, name, required, ...props }: InputProps) => {
    return (
        <>
            <Controller
                name={name ?? ""}
                control={control}
                rules={{
                    required
                }}
                render={({ field }) => (
                    <InputUI {...{...props, ...field}} />
                )}
            />
        </>
    )
}