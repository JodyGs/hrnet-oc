import { useState } from 'react'
import { DateInput } from '../../components/DateInput'
import { FormField } from '../../components/FormField'
import { SelectInput } from '../../components/SelectInput'
import { DEPARTMENTS } from '../../data/departments'
import { STATES } from '../../data/states'

const STATE_OPTIONS = STATES.map((state) => ({ value: state.abbreviation, label: state.name }))
const DEPARTMENT_OPTIONS = DEPARTMENTS.map((department) => ({ value: department, label: department }))

const INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  startDate: '',
  street: '',
  city: '',
  state: STATE_OPTIONS[0].value,
  zipCode: '',
  department: DEPARTMENT_OPTIONS[0].value,
}

export function EmployeeForm({ onSubmit }) {
  const [values, setValues] = useState(INITIAL_VALUES)

  const setField = (field) => (value) => setValues((previous) => ({ ...previous, [field]: value }))
  const handleTextChange = (event) => setField(event.target.name)(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(values)
    setValues(INITIAL_VALUES)
  }

  return (
    <form id="create-employee" onSubmit={handleSubmit}>
      <FormField label="First Name" htmlFor="firstName">
        <input id="firstName" name="firstName" type="text" value={values.firstName} onChange={handleTextChange} required />
      </FormField>

      <FormField label="Last Name" htmlFor="lastName">
        <input id="lastName" name="lastName" type="text" value={values.lastName} onChange={handleTextChange} required />
      </FormField>

      <FormField label="Date of Birth" htmlFor="dateOfBirth">
        <DateInput id="dateOfBirth" value={values.dateOfBirth} onChange={setField('dateOfBirth')} />
      </FormField>

      <FormField label="Start Date" htmlFor="startDate">
        <DateInput id="startDate" value={values.startDate} onChange={setField('startDate')} />
      </FormField>

      <fieldset className="address">
        <legend>Address</legend>

        <FormField label="Street" htmlFor="street">
          <input id="street" name="street" type="text" value={values.street} onChange={handleTextChange} />
        </FormField>

        <FormField label="City" htmlFor="city">
          <input id="city" name="city" type="text" value={values.city} onChange={handleTextChange} />
        </FormField>

        <FormField label="State" htmlFor="state">
          <SelectInput id="state" value={values.state} onChange={setField('state')} options={STATE_OPTIONS} />
        </FormField>

        <FormField label="Zip Code" htmlFor="zipCode">
          <input id="zipCode" name="zipCode" type="number" value={values.zipCode} onChange={handleTextChange} />
        </FormField>
      </fieldset>

      <FormField label="Department" htmlFor="department">
        <SelectInput
          id="department"
          value={values.department}
          onChange={setField('department')}
          options={DEPARTMENT_OPTIONS}
        />
      </FormField>
    </form>
  )
}
