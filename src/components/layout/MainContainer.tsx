import { Outlet } from "react-router-dom";
import { useProductosContext } from "../../context/ProductosContext";

export const MainContainer = () => {

    const { producto } = useProductosContext();

    return (
        <div className="h-screen bg-gray-200 w-full">
            <div className="w-[860px] h-full m-auto pt-12 px-6">
            <Outlet />
                {/* <CrearProducto />
                <Routes>
                <Route></Route>
                <Home />
                </Routes> */}
            </div>
        </div>
    )
}