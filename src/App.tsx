import { MainLayout } from './components/Layout';
import CartPage from './Pages/CartPage';
import HomePage from './Pages/HomePage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Products from './Pages/Products';
import ProductsDetails from './Pages/ProductsDetails';
import CustomizeDetails from './Pages/CustomizeDetails';
import About from './Pages/About';
import ErrorPage from './Pages/ErrorPage';

const router = createBrowserRouter([
  {
    path:'/shop',
    element:<MainLayout />,
    children:[
      {
        index:true,
        element:<HomePage />
      },
      {
        path:'product',element:<Products />
      },
      {
        path:'product/:productId', element : <ProductsDetails />
      },
      {
       path:'product/:productId/customize', element : <CustomizeDetails /> 
      },
      {
        path:'cart',
        element:<CartPage />
      }
    ]
  },
  {
    path:'/about',
    element:<About />
  },
  {
    path : '*',
    element:<ErrorPage />
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}



export default App;
