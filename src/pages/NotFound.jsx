import { Link } from 'react-router'

export function NotFound() {
  return (
    <>
      <title>HRnet - Page not found</title>
      <div className="container">
        <h1>Page not found</h1>
        <Link to="/">Home</Link>
      </div>
    </>
  )
}
