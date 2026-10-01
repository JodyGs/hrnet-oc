import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { dateToIso, isoToDate } from '../utils/date'
import './DateInput.css'

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

// Même plage d'années que le plugin legacy (1950 à 2050).
const FIRST_YEAR = 1950
const LAST_YEAR = 2050
const YEARS = Array.from({ length: LAST_YEAR - FIRST_YEAR + 1 }, (_, index) => FIRST_YEAR + index)

/** En-tête du calendrier, calqué sur celui du plugin legacy : mois précédent, aujourd'hui, mois, année, mois suivant. */
function CalendarHeader({ date, changeMonth, changeYear, decreaseMonth, increaseMonth }) {
  const goToToday = () => {
    const today = new Date()
    changeYear(today.getFullYear())
    changeMonth(today.getMonth())
  }

  return (
    <div className="date-input__header">
      <button type="button" className="date-input__nav date-input__nav--prev" aria-label="Previous month" onClick={decreaseMonth} />
      <button type="button" className="date-input__nav date-input__nav--today" aria-label="Today" onClick={goToToday} />
      <span className="date-input__label date-input__label--month">
        <select aria-label="Month" value={date.getMonth()} onChange={(event) => changeMonth(Number(event.target.value))}>
          {MONTHS.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>
      </span>
      <span className="date-input__label date-input__label--year">
        <select aria-label="Year" value={date.getFullYear()} onChange={(event) => changeYear(Number(event.target.value))}>
          {YEARS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </span>
      <button type="button" className="date-input__nav date-input__nav--next" aria-label="Next month" onClick={increaseMonth} />
    </div>
  )
}

/**
 * Sélecteur de date basé sur react-datepicker (remplace le plugin legacy jquery.datetimepicker).
 * `value` et `onChange` utilisent des chaînes ISO (YYYY-MM-DD) ; l'affichage est en MM/DD/YYYY.
 * L'apparence du plugin d'origine est reproduite dans `DateInput.css`.
 */
export function DateInput({ id, value, onChange, required = false }) {
  return (
    <DatePicker
      id={id}
      name={id}
      selected={isoToDate(value)}
      onChange={(date) => onChange(dateToIso(date))}
      dateFormat="MM/dd/yyyy"
      renderCustomHeader={CalendarHeader}
      formatWeekDay={(dayName) => dayName.slice(0, 3)}
      minDate={new Date(FIRST_YEAR, 0, 1)}
      maxDate={new Date(LAST_YEAR, 11, 31)}
      showPopperArrow={false}
      popperPlacement="bottom-start"
      popperClassName="date-input__popper"
      autoComplete="off"
      required={required}
    />
  )
}
