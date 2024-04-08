import { PropsWithChildren } from "react"

export const ListItem = ({ children }: PropsWithChildren) => {
    return (
        <div className="hover:bg-gray-800 bg-gray-600 transition-all cursor-pointer border-b-gray-900 border-b p-4 text-white">
            {children}
        </div>
    )
}