import { useMemo, useState } from 'react'
import DataTable from 'react-data-table-component'
import { EMPLOYEE_COLUMNS } from '../features/employees/employeeColumns'
import { TablePagination } from './TablePagination'
import './EmployeeTable.css'

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100]

// Mêmes messages que DataTables : liste vide, ou recherche sans résultat.
const EMPTY_TABLE_MESSAGE = 'No data available in table'
const NO_MATCH_MESSAGE = 'No matching records found'

// La pagination de la librairie est remplacée par celle affichée sous le tableau.
function HiddenPagination() {
  return null
}

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

/** Texte « Showing 1 to 10 of 25 entries », comme DataTables. */
function getInfoText({ page, pageSize, matchCount, totalCount }) {
  const first = matchCount === 0 ? 0 : (page - 1) * pageSize + 1
  const last = Math.min(page * pageSize, matchCount)
  const filtered = matchCount < totalCount ? ` (filtered from ${totalCount} total entries)` : ''
  return `Showing ${first} to ${last} of ${matchCount} entries${filtered}`
}

/**
 * Tableau des employés basé sur react-data-table-component (remplace le plugin legacy DataTables) :
 * tri par colonne (première colonne par défaut), pagination et recherche globale.
 * La disposition et l'apparence de DataTables sont reproduites dans `EmployeeTable.css`.
 */
export function EmployeeTable({ employees, columns = EMPLOYEE_COLUMNS }) {
  const [search, setSearch] = useState('')
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0])
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState({ columnId: columns[0]?.data, isAscending: true })

  const tableColumns = useMemo(() => toTableColumns(columns), [columns])

  const filteredEmployees = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return employees
    return employees.filter((employee) => toSearchableText(employee, columns).includes(query))
  }, [employees, columns, search])

  const pageCount = Math.ceil(filteredEmployees.length / pageSize)
  const currentPage = Math.min(page, Math.max(pageCount, 1))

  // Comme DataTables, tout changement de recherche, de tri ou de taille de page ramène à la première page.
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    setPage(1)
  }

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value))
    setPage(1)
  }

  const handleSort = (column, direction) => {
    setSort({ columnId: column.id, isAscending: direction === 'asc' })
    setPage(1)
  }

  return (
    <div className="employee-table">
      {/* La colonne triée est légèrement plus foncée, comme dans DataTables. */}
      <style>{`.employee-table .rdt_TableCell[data-column-id="${sort.columnId}"] { background-color: var(--employee-table-sorted-cell); }`}</style>

      <div className="employee-table__controls">
        <label>
          Show{' '}
          <select value={pageSize} onChange={handlePageSizeChange}>
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>{' '}
          entries
        </label>
        <label>
          Search:
          <input type="search" value={search} onChange={handleSearchChange} />
        </label>
      </div>

      {/*
        La librairie ne lit la taille de page qu'au montage : la `key` recrée le tableau quand elle change,
        et le tri en cours lui est repassé comme tri initial pour ne pas le perdre.
      */}
      <DataTable
        key={pageSize}
        columns={tableColumns}
        data={filteredEmployees}
        keyField="id"
        defaultSortFieldId={sort.columnId}
        defaultSortAsc={sort.isAscending}
        onSort={handleSort}
        pagination
        paginationPerPage={pageSize}
        paginationPage={currentPage}
        paginationComponent={HiddenPagination}
        noDataComponent={employees.length === 0 ? EMPTY_TABLE_MESSAGE : NO_MATCH_MESSAGE}
        persistTableHead
      />

      <div className="employee-table__footer">
        <div className="employee-table__info" role="status" aria-live="polite">
          {getInfoText({
            page: currentPage,
            pageSize,
            matchCount: filteredEmployees.length,
            totalCount: employees.length,
          })}
        </div>
        <TablePagination currentPage={currentPage} pageCount={pageCount} onChangePage={setPage} />
      </div>
    </div>
  )
}
