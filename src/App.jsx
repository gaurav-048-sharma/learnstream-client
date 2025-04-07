import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar' 
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'

import Dashboard from './components/Dashboard/Dashboard'  // Add this

import ProtectedRoute from './components/ProtectedRoute'  // Add this
import PublicRoute from './components/PublicRoute'
import './index.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Protected Routes */}
          {/* <Route
            path="/"
            element={
              <ProtectedRoute>
                <CourseList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/:id"
            element={
              <ProtectedRoute>
                <CourseDetail />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requireInstructor={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
