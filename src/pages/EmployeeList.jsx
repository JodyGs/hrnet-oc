import { Link } from 'react-router'
import { EmployeeTable } from '../components/EmployeeTable'
import { useEmployees } from '../features/employees/useEmployees'

export function EmployeeList() {
  const { employees } = useEmployees()

  return (
    <>
      <title>HRnet - Current Employees</title>
      <div id="employee-div" className="container">
        <h1>Current Employees</h1>
        <EmployeeTable employees={employees} />
        <Link to="/">Home</Link>
      </div>
    </>
  )
}
