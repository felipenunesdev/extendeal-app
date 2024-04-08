import { PropsWithChildren } from "react";

type ButtonProps = {
    onClick?: (e: any) => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'solid' | 'outlined'
} & PropsWithChildren & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ children, onClick, type = "button", variant = 'solid', className, ...props }: ButtonProps) => {

    const variantClasses = {
        solid: 'bg-teal-600 hover:bg-teal-800 text-white',
        outlined: 'bg-transparent text-teal-800 hover:bg-gray-300',
    }

    return (
        <>
            <button type={type} onClick={onClick} className={`${variantClasses[variant]} px-4 py-2  rounded-full flex items-center justify-center leading-1 disabled:bg-gray-300`} {...props}>
                <span>
                    {children}
                </span>
            </button>
        </>
    )
}