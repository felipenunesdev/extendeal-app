import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { SidebarWrapper } from './components/layout/SidebarWrapper';
import { MainContainer } from './components/layout/MainContainer';
import { ProductosProvider } from './context/ProductosContext';
import { CreateProduct } from "./pages/CreateProduct";
import { ViewProduct } from "./pages/ViewProduct";
function App() {



  return (
    <BrowserRouter>
      <ProductosProvider>
        <div className='flex'>
          <SidebarWrapper />
          <Routes>
            <Route path="/" element={<MainContainer />}>
              <Route index element={<Home />} />
              <Route path="/create" element={<CreateProduct />} />
              <Route path="/view/:id" element={<ViewProduct />} />
            </Route>
          </Routes>
        </div>
      </ProductosProvider>
    </BrowserRouter>
  );
}

export default App;
