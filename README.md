# HRnet

Wealth Health's internal application to create and view employee records, migrated from jQuery to React.

## Stack

- [Vite](https://vite.dev/) 8 + React 19
- [React Router](https://reactrouter.com/) 8 (`createBrowserRouter`, `RouterProvider` from `react-router/dom`)
- State: React Context + `useReducer`, persisted in `localStorage` (same `employees` key as the legacy app)
- Lint: [oxlint](https://oxc.rs/docs/guide/usage/linter)

## Scripts

```bash
npm install
npm run dev       # dev server on http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the build (use this for Lighthouse audits)
npm run lint
```

## Structure

```
src/
  app/router.jsx                  routes: / (create), /employees (list), * (404)
  layouts/RootLayout.jsx
  pages/                          CreateEmployee, EmployeeList, NotFound
  features/employees/             store (context, reducer, provider, hook), form, table columns
  components/                     UI components, including the plugin placeholders below
  data/                           states, departments
  utils/date.js                   ISO date -> MM/DD/YYYY
```

## jQuery plugins

The four legacy jQuery plugins have been removed and replaced by React components:

| Legacy plugin           | Replacement                                             | Component                                 |
| ----------------------- | ------------------------------------------------------- | ----------------------------------------- |
| jquery.datetimepicker   | [react-datepicker](https://reactdatepicker.com/)         | `src/components/DateInput.jsx`            |
| jQuery UI selectmenu    | [react-select](https://react-select.com/)                | `src/components/SelectInput.jsx`          |
| DataTables              | [react-data-table-component](https://reactdatatable.com/) | `src/components/EmployeeTable.jsx`        |
| jquery-modal            | Custom React component (in progress)                    | `src/components/ConfirmationMessage.jsx`  |

Each page is lazy-loaded, so the form libraries and the table library are only downloaded on the route that uses them.

Dates are stored as ISO strings (`YYYY-MM-DD`) so they sort correctly, and are formatted as `MM/DD/YYYY` at display time.
