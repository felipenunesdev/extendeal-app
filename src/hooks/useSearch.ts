import { useCallback, useMemo, useState } from "react"

type SearchProps<T> = {
    /**
     * Lista donde se va a hacer la búsqueda
     */
    list: T[];
    /**
     * Campos donde se va a aplicar la query de busqueda
     */
    fields: string[];
}

/**
 * const { setQuery, result } = useSearch({ list: users, fields: ['nombre', 'apellido'] })
 */
export const useSearch = <T>({
    list = [],
    fields = []
}: SearchProps<T>) => {
    const [query, setQuery] = useState<string>("");

    /**
     * Acá se realiza el filtro
     */
    const filterList = useCallback((item: T) => {
        const querySearch = query.toLowerCase();

        const hasQuery = fields.some(field => {
            const keyValue = item[field as keyof T] as string;
            return keyValue.toLowerCase().includes(querySearch)
        })
        
        return hasQuery
    }, [fields, query])

    /**
     * Wrapper para devolver el resultado
     */
    const result = useMemo(() => {
        return list.filter(filterList) ?? [];
    }, [filterList])

    return {
        result,
        setQuery
    }
}