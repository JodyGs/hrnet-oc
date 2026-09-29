/**
 * Message de statut en ligne. Placeholder du plugin legacy jquery-modal :
 * remplacer l'implémentation par une modale React en conservant cette API de props.
 */
export function ConfirmationMessage({ isOpen, onClose, children }) {
  if (!isOpen) return null

  return (
    <div role="status">
      <p>{children}</p>
      <button type="button" onClick={onClose}>
        Close
      </button>
    </div>
  )
}
