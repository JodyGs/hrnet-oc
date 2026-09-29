/**
 * Champ date natif. Placeholder du plugin legacy jquery.datetimepicker :
 * remplacer l'implémentation par un date picker React en conservant cette API de props.
 * `value` et `onChange` utilisent des chaînes ISO (YYYY-MM-DD).
 */
export function DateInput({ id, value, onChange, required = false }) {
  return (
    <input
      id={id}
      name={id}
      type="date"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      required={required}
    />
  )
}
