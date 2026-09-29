/**
 * Select natif. Placeholder du plugin legacy jQuery UI selectmenu :
 * remplacer l'implémentation par un select React en conservant cette API de props.
 * `options` est une liste de `{ value, label }`.
 */
export function SelectInput({ id, value, onChange, options }) {
  return (
    <select id={id} name={id} value={value} onChange={(event) => onChange(event.target.value)}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
