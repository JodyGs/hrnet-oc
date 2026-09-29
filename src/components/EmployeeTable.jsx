import { useMemo, useState } from 'react'
import DataTable from 'react-data-table-component'
import { EMPLOYEE_COLUMNS } from '../features/employees/employeeColumns'

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100]

/** Convertit les colonnes de l'app au format attendu par react-data-table-component. */
function toTableColumns(columns) {
  return columns.map((column) => ({
    id: column.data,
    name: column.title,
    // Le tri se fait sur la valeur brute (dates ISO), le formatage uniquement à l'affichage.
    selector: (row) => row[column.data],
    format: column.format ? (row) => column.format(row[column.data]) : undefined,
    sortable: true,
  }))
}

/** Valeurs affichées d'une ligne, en minuscules, utilisées pour la recherche globale. */
function toSearchableText(employee, columns) {
  return columns
    .map((column) => {
      const value = employee[column.data] ?? ''
      return column.format ? column.format(value) : String(value)
    })
    .join(' ')
    .toLowerCase()
}

/**
 * Tableau des employés basé sur react-data-table-component (remplace le plugin legacy DataTables) :
 * tri par colonne, pagination et recherche globale.
 */
export function EmployeeTable({ employees, columns = EMPLOYEE_COLUMNS }) {
  const [search, setSearch] = useState('')

  const tableColumns = useMemo(() => toTableColumns(columns), [columns])

  const filteredEmployees = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return employees
    return employees.filter((employee) => toSearchableText(employee, columns).includes(query))
  }, [employees, columns, search])

  const searchField = (
    <label htmlFor="employee-search">
      Search:{' '}
      <input
        id="employee-search"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
    </label>
  )

  return (
    <div className="employee-table">
      <DataTable
        columns={tableColumns}
        data={filteredEmployees}
        keyField="id"
        subHeader={searchField}
        pagination
        paginationRowsPerPageOptions={PAGE_SIZE_OPTIONS}
        noDataComponent="No matching records found"
        persistTableHead
      />
    </div>
  )
}
