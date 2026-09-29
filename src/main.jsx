import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import { router } from './app/router'
import { EmployeesProvider } from './features/employees/EmployeesProvider'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EmployeesProvider>
      <RouterProvider router={router} />
    </EmployeesProvider>
  </StrictMode>,
)
