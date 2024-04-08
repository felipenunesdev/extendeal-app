import { useNavigate } from "react-router-dom"
import { useProductosContext } from "../../context/ProductosContext"
import { useSearch } from "../../hooks/useSearch"
import { ListItem } from "../ui/ListItem"
import { SearchBar } from "../ui/SearchBar"
import { Sidebar } from "./Sidebar"
import { useEffect } from "react"

export const SidebarWrapper = () => {

    const { productos } = useProductosContext();
    const { result, setQuery } = useSearch({ list: productos, fields: ['nombre', 'categoria'] });
    const navigate = useNavigate();

    return (
        <>
            <Sidebar>
                <Sidebar.Search>
                    <SearchBar onInput={(query) => setQuery(query)} />
                </Sidebar.Search>
                <Sidebar.List>
                    {
                        result.map(({ id, nombre }) => (
                            <div key={id} onClick={() => navigate(`view/${id}`)}>
                                <ListItem>{nombre}</ListItem>
                            </div>
                        ))
                    }
                </Sidebar.List>
            </Sidebar>
        </>
    )
}