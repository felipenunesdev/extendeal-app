import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button"

export const Home = () => {
    const navigate = useNavigate();

    return(
        <>
            <div className="w-full h-full flex flex-col items-center justify-center text-center">
                <p className="mb-4">Seleccione un producto o</p> 
                <Button onClick={() => navigate('/create')}>Agregue un nuevo producto</Button>
            </div>
        </>
    )
}