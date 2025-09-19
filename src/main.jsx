import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import App from './App.jsx';
import Cadastro from './screens/cadastro.jsx';
import Login from "./screens/Login.jsx";
import Hospitais from "./screens/hospitais.jsx"; 
import Medicos from "./screens/medicos.jsx";
import Agendar from "./screens/agendar.jsx";
import Fila from "./screens/fila.jsx";




const router = createBrowserRouter([
  { path: '/', element: <App /> },                     
  { path: '/cadastro', element: <Cadastro /> },      
  { path: "/login", element: <Login /> },           
  { path: "/hospitais", element: <Hospitais /> },
  { path: "/medicos/:hospitalId", element: <Medicos /> },
  { path: "/agendar/:medicoId", element: <Agendar /> },
  { path: "/fila", element: <Fila /> },

]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
