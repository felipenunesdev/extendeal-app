
type SearchBarProps = {
    onInput: (query: string) => void
}
export const SearchBar = ({ onInput }: SearchBarProps) => {

    const handleInput = (e: any) => {
        onInput(e?.target?.value)
    }

    return (
        <div className="bg-gray-900 py-2 px-4 rounded-md">
            <input className="outline-none bg-transparent text-white w-full" placeholder="Buscar productos" type="text" onInput={handleInput} />
        </div>
    )
}