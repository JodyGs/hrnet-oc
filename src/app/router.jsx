import { createBrowserRouter } from 'react-router'
import { RootLayout } from '../layouts/RootLayout'
import { NotFound } from '../pages/NotFound'

// Chaque page est chargée à la demande : les librairies du formulaire
// et celles du tableau ne sont téléchargées que sur la route qui les utilise.
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    // Rien à afficher pendant le téléchargement de la page demandée (quelques millisecondes).
    hydrateFallbackElement: <></>,
    children: [
      {
        index: true,
        lazy: () => import('../pages/CreateEmployee').then((module) => ({ Component: module.CreateEmployee })),
      },
      {
        path: 'employees',
        lazy: () => import('../pages/EmployeeList').then((module) => ({ Component: module.EmployeeList })),
      },
      { path: '*', element: <NotFound /> },
    ],
  },
])
