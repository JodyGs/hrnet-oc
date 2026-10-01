import { useState } from 'react'
import { Modal } from 'modale-passy'
import 'modale-passy/style.css'
import { Link } from 'react-router'
import { EmployeeForm } from '../features/employees/EmployeeForm'
import { useEmployees } from '../features/employees/useEmployees'

export function CreateEmployee() {
  const { addEmployee } = useEmployees()
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)

  const handleSubmit = (employee) => {
    addEmployee(employee)
    setIsConfirmationOpen(true)
  }

  return (
    <>
      <title>HRnet</title>
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container">
        <Link to="/employees">View Current Employees</Link>
        <h2>Create Employee</h2>
        <EmployeeForm onSubmit={handleSubmit} />
        {/* Hors du formulaire, comme dans la mise en page legacy ; le soumet quand même via l'attribut `form`. */}
        <button type="submit" form="create-employee">
          Save
        </button>
      </div>
      <Modal isOpen={isConfirmationOpen} onClose={() => setIsConfirmationOpen(false)} ariaLabel="Confirmation">
        Employee Created!
      </Modal>
    </>
  )
}
