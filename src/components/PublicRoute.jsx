import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token')

  // If token exists, redirect to home
  if (token) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default PublicRoute