import { ELLIPSIS, getPageItems } from '../utils/pagination'

/** Pagination « Previous 1 2 3 Next », calquée sur celle du plugin legacy DataTables. */
export function TablePagination({ currentPage, pageCount, onChangePage }) {
  const isFirstPage = currentPage <= 1
  const isLastPage = currentPage >= pageCount

  return (
    <nav className="employee-table__paginate" aria-label="Pagination">
      <button
        type="button"
        className="employee-table__page"
        disabled={isFirstPage}
        onClick={() => onChangePage(currentPage - 1)}
      >
        Previous
      </button>
      <span>
        {getPageItems(currentPage, pageCount).map((item, index) =>
          item === ELLIPSIS ? (
            // Les points de suspension n'ont pas d'identifiant propre : leur position sert de clé.
            <span key={`${ELLIPSIS}-${index}`} className="employee-table__ellipsis">
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              className="employee-table__page"
              aria-current={item === currentPage ? 'page' : undefined}
              onClick={() => onChangePage(item)}
            >
              {item}
            </button>
          ),
        )}
      </span>
      <button
        type="button"
        className="employee-table__page"
        disabled={isLastPage}
        onClick={() => onChangePage(currentPage + 1)}
      >
        Next
      </button>
    </nav>
  )
}
