import { useCallback, useEffect, useMemo, useReducer } from 'react'
import { EmployeesContext } from './employeesContext'
import {
  ADD_EMPLOYEE,
  employeesReducer,
  loadEmployees,
  saveEmployees,
} from './employeesReducer'

export function EmployeesProvider({ children }) {
  const [employees, dispatch] = useReducer(employeesReducer, undefined, loadEmployees)

  useEffect(() => {
    saveEmployees(employees)
  }, [employees])

  const addEmployee = useCallback((employee) => {
    dispatch({
      type: ADD_EMPLOYEE,
      payload: { id: crypto.randomUUID(), ...employee },
    })
  }, [])

  const value = useMemo(() => ({ employees, addEmployee }), [employees, addEmployee])

  return <EmployeesContext value={value}>{children}</EmployeesContext>
}
