export const STORAGE_KEY = 'employees'

/** Lit la liste enregistrée par l'app (même clé que la version jQuery legacy). */
export function loadEmployees() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveEmployees(employees) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees))
  } catch {
    // Stockage plein ou indisponible (navigation privée) : l'état en mémoire reste fonctionnel.
  }
}
