import { useCallback, useEffect, useMemo, useState } from 'react'
import { EmployeesContext } from './employeesContext'
import { loadEmployees, saveEmployees } from './employeesStorage'

export function EmployeesProvider({ children }) {
  const [employees, setEmployees] = useState(loadEmployees)

  useEffect(() => {
    saveEmployees(employees)
  }, [employees])

  const addEmployee = useCallback((employee) => {
    setEmployees((previous) => [...previous, { id: crypto.randomUUID(), ...employee }])
  }, [])

  const value = useMemo(() => ({ employees, addEmployee }), [employees, addEmployee])

  return <EmployeesContext value={value}>{children}</EmployeesContext>
}
