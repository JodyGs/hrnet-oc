export const ELLIPSIS = 'ellipsis'

const MAX_BUTTONS = 7

function range(start, end) {
  return Array.from({ length: end - start }, (_, index) => start + index)
}

/**
 * Numéros de page à afficher, avec des points de suspension au-delà de 7 pages
 * (même découpage que DataTables). Les pages sont numérotées à partir de 1.
 */
export function getPageItems(currentPage, pageCount) {
  if (pageCount <= MAX_BUTTONS) return range(1, pageCount + 1)

  const half = Math.floor(MAX_BUTTONS / 2)

  if (currentPage <= half + 1) {
    return [...range(1, MAX_BUTTONS - 1), ELLIPSIS, pageCount]
  }
  if (currentPage >= pageCount - half) {
    return [1, ELLIPSIS, ...range(pageCount - (MAX_BUTTONS - 3), pageCount + 1)]
  }
  return [1, ELLIPSIS, ...range(currentPage - 1, currentPage + 2), ELLIPSIS, pageCount]
}
