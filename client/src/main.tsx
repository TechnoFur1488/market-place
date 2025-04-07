import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import { Provider } from "react-redux";
import { Bar, Header } from './root/index';
import { store } from './store/store';
import { CategoryPage, MainPage, ProductPage } from './page/index';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <Bar />,
        children: [
          {
            path: "/",
            element: <MainPage />
          },
          {
            path: "/category-products/:subSubCategoryId",
            element: <CategoryPage />
          },
          {
            path: "/product-option/:productId",
            element: <ProductPage />
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
