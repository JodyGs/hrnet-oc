import Select from 'react-select'

/**
 * Liste déroulante basée sur react-select (remplace le plugin legacy jQuery UI selectmenu).
 * `options` est une liste de `{ value, label }` ; `value` et `onChange` utilisent la valeur seule.
 */
export function SelectInput({ id, value, onChange, options }) {
  const selectedOption = options.find((option) => option.value === value) ?? null

  return (
    <Select
      inputId={id}
      name={id}
      options={options}
      value={selectedOption}
      onChange={(option) => onChange(option?.value ?? '')}
    />
  )
}
