import { PropsWithChildren } from "react";

type IconButtonProps = {
    onClick?: (e: any) => void;
    type?: 'button' | 'submit' | 'reset';
    size?: 'regular' | 'small';
} & PropsWithChildren
export const IconButton = ({ children, onClick, type = "button", size = "regular" }: IconButtonProps) => {

    const sizeClasses = {
        regular: 'h-10 w-10 min-h-10 min-w-10',
        small: 'h-6 w-6 min-h-6 min-w-6',
    }

    return (
        <>
            <button type={type} onClick={onClick} className={`${sizeClasses[size]} bg-teal-600 hover:bg-teal-800 rounded-full flex items-center justify-center text-white text-3xl leading-1`}>
                <span>
                    {children}
                </span>

            </button>
        </>
    )
}