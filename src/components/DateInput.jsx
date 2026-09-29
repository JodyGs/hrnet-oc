import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { dateToIso, isoToDate } from '../utils/date'

/**
 * Sélecteur de date basé sur react-datepicker (remplace le plugin legacy jquery.datetimepicker).
 * `value` et `onChange` utilisent des chaînes ISO (YYYY-MM-DD) ; l'affichage est en MM/DD/YYYY.
 */
export function DateInput({ id, value, onChange, required = false }) {
  return (
    <DatePicker
      id={id}
      name={id}
      selected={isoToDate(value)}
      onChange={(date) => onChange(dateToIso(date))}
      dateFormat="MM/dd/yyyy"
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      autoComplete="off"
      required={required}
    />
  )
}
