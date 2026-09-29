import { use } from 'react'
import { EmployeesContext } from './employeesContext'

export function useEmployees() {
  const context = use(EmployeesContext)
  if (!context) {
    throw new Error('useEmployees must be used inside <EmployeesProvider>')
  }
  return context
}
