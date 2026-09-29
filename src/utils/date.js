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
