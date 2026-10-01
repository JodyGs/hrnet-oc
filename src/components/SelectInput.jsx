import Select from 'react-select'
import './SelectInput.css'

function DropdownIndicator() {
  return <span className="select-input__triangle" aria-hidden="true" />
}

const COMPONENTS = { DropdownIndicator, IndicatorSeparator: null }

/**
 * Liste déroulante basée sur react-select (remplace le plugin legacy jQuery UI selectmenu).
 * `options` est une liste de `{ value, label }` ; `value` et `onChange` utilisent la valeur seule.
 * Les styles par défaut de la librairie sont désactivés (`unstyled`) : l'apparence du plugin
 * d'origine est reproduite dans `SelectInput.css`.
 */
export function SelectInput({ id, value, onChange, options }) {
  const selectedOption = options.find((option) => option.value === value) ?? null

  return (
    <Select
      unstyled
      className="select-input"
      classNamePrefix="select-input"
      components={COMPONENTS}
      isSearchable={false}
      menuPlacement="bottom"
      menuShouldScrollIntoView={false}
      inputId={id}
      name={id}
      options={options}
      value={selectedOption}
      onChange={(option) => onChange(option?.value ?? '')}
    />
  )
}
