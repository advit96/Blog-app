import { Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      <nav className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-6">
          <Link to="/" className="text-lg font-semibold tracking-tight">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">MinimalBlog</span>
          </Link>
          <Link to="/post/new" className="text-sm text-gray-600 hover:text-gray-900">New Post</Link>
          <div className="ml-auto flex items-center gap-3 text-sm">
            <Link to="/login" className="rounded-md px-3 py-1.5 text-gray-700 hover:bg-gray-100">Login</Link>
            <Link to="/signup" className="rounded-md bg-gray-900 px-3 py-1.5 text-white hover:bg-black">Signup</Link>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t bg-white/60">
        <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-gray-500">© {new Date().getFullYear()} MinimalBlog</div>
      </footer>
    </div>
  )
}

export default App
