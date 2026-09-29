import { formatDate } from '../../utils/date'

/** Définition des colonnes de la liste des employés (même ordre que la config DataTables legacy). */
export const EMPLOYEE_COLUMNS = [
  { title: 'First Name', data: 'firstName' },
  { title: 'Last Name', data: 'lastName' },
  { title: 'Start Date', data: 'startDate', format: formatDate },
  { title: 'Department', data: 'department' },
  { title: 'Date of Birth', data: 'dateOfBirth', format: formatDate },
  { title: 'Street', data: 'street' },
  { title: 'City', data: 'city' },
  { title: 'State', data: 'state' },
  { title: 'Zip Code', data: 'zipCode' },
]
