/** Paire label + champ, rendue sans élément englobant pour conserver le markup legacy. */
export function FormField({ label, htmlFor, children }) {
  return (
    <>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </>
  )
}
