import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { CreateProduct } from './CreateProduct';
import { useProductosAdapter } from '../hooks/useProductosAdapter';
import { ProductosProvider, useProductosContext } from '../context/ProductosContext';

const nuevoProductoMock = {
    nombre: "Galaxy S21 Ultra",
    categoria: "Smartphone",
    precio: 699,
    especificaciones: [
        {
            nombre: "RAM",
            descripcion: "8Gb",
        },
    ],
    id: "0763c6c9-2504-443b-b736-72e9be7ccfde",
};


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));
jest.mock('../context/ProductosContext', () => ({
    useProductosContext: () => ({
        loadProductos: jest.fn()
    }),
    ProductosProvider: (props: any) => <>{props.children}</>
}));
jest.mock('../hooks/useProductosAdapter', () => ({
    useProductosAdapter: () => ({
        createProduct: jest.fn(),
    }),
}));

afterEach(() => {
    jest.restoreAllMocks();
});

describe('<CreateProduct />', () => {
    it('crear un nuevo producto', async () => {

        const mockNavigate = jest.fn();
        jest.mocked(useNavigate).mockImplementation(() => mockNavigate)

        const handleOnSubmitMock = jest.fn(() => {
            useProductosAdapter().createProduct(nuevoProductoMock);
            const navigate = useNavigate();
            navigate('/')
            useProductosContext().loadProductos()
        });

        
        render(
            <BrowserRouter>
                <ProductosProvider>
                    <CreateProduct />
                </ProductosProvider>
            </BrowserRouter>
        );
      
        const form = screen.getByTestId('productoForm');
        form.onsubmit = handleOnSubmitMock

        await act(async () => {
            userEvent.type(within(form).getByPlaceholderText('Nombre'), nuevoProductoMock.nombre);
            userEvent.type(within(form).getByPlaceholderText('Categoría'), nuevoProductoMock.categoria);
            userEvent.type(within(form).getByPlaceholderText('Precio'), nuevoProductoMock.precio.toString());
            fireEvent.submit(form);
        })

        await waitFor(() => expect(handleOnSubmitMock).toHaveBeenCalled());

    });
});





