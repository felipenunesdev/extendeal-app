import { PropsWithChildren } from "react"

export const Sidebar = ({ children }: PropsWithChildren) => {
    return (
        <aside className="w-[450px] bg-gray-600 h-screen overflow-hidden flex flex-col">
            {children}
        </aside>
    )
}

const Search = ({ children }: PropsWithChildren) => {

    return (
        <div className="p-4 bg-gray-800">
            {children}
        </div>
    )

}

const List = ({ children }: PropsWithChildren) => {

    return (
        <div className="overflow-y-scroll p-4 flex-1">
            {children}
        </div>
    )

}

Sidebar.Search = Search
Sidebar.List = List