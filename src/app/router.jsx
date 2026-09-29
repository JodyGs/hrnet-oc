import { createBrowserRouter } from 'react-router'
import { RootLayout } from '../layouts/RootLayout'
import { CreateEmployee } from '../pages/CreateEmployee'
import { EmployeeList } from '../pages/EmployeeList'
import { NotFound } from '../pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <CreateEmployee /> },
      { path: 'employees', element: <EmployeeList /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
