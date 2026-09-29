import { EMPLOYEE_COLUMNS } from '../features/employees/employeeColumns'

/**
 * Tableau HTML simple. Placeholder du plugin legacy DataTables
 * (le tri, la recherche et la pagination viendront avec la librairie intégrée).
 */
export function EmployeeTable({ employees, columns = EMPLOYEE_COLUMNS }) {
  return (
    <table id="employee-table" className="display">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.data} scope="col">
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {employees.length === 0 ? (
          <tr>
            <td colSpan={columns.length}>No data available in table</td>
          </tr>
        ) : (
          employees.map((employee) => (
            <tr key={employee.id}>
              {columns.map((column) => {
                const value = employee[column.data]
                return <td key={column.data}>{column.format ? column.format(value) : value}</td>
              })}
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}
