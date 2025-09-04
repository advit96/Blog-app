import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import PostsList from './pages/PostsList.jsx'
import PostDetail from './pages/PostDetail.jsx'
import PostEditor from './pages/PostEditor.jsx'
import { AuthProvider } from './state/AuthContext.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <PostsList /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'post/new', element: <PostEditor /> },
      { path: 'post/:slug', element: <PostDetail /> },
      { path: 'post/:slug/edit', element: <PostEditor /> }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
