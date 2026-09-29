/**
 * Formate une date ISO (YYYY-MM-DD) en MM/DD/YYYY, le format utilisé par l'app legacy.
 * Les dates sont stockées en ISO pour être triées correctement ; le formatage se fait à l'affichage.
 */
export function formatDate(isoDate) {
  if (!isoDate) return ''
  const [year, month, day] = isoDate.split('-')
  if (!year || !month || !day) return isoDate
  return `${month}/${day}/${year}`
}

/**
 * Convertit une date ISO (YYYY-MM-DD) en objet Date à minuit heure locale.
 * `new Date('YYYY-MM-DD')` serait interprété en UTC et pourrait afficher la veille selon le fuseau.
 */
export function isoToDate(isoDate) {
  if (!isoDate) return null
  const [year, month, day] = isoDate.split('-').map(Number)
  if (!year || !month || !day) return null
  return new Date(year, month - 1, day)
}

/** Convertit un objet Date en date ISO (YYYY-MM-DD) selon l'heure locale. */
export function dateToIso(date) {
  if (!date) return ''
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}
