import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import api from '../api/client'

export default function PostsList() {
  const [items, setItems] = useState([])
  const [pagination, setPagination] = useState({ page: 1, pages: 1, limit: 10, total: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()

  const page = Number(searchParams.get('page') || 1)
  const q = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const { data } = await api.get('/posts', { params: { page, q, category } })
        setItems(data.items)
        setPagination(data.pagination)
      } catch (err) {
        setError('Failed to load posts')
      } finally {
        setLoading(false)
      }
    })()
  }, [page, q, category])

  function onSearch(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const q = form.get('q')
    const category = form.get('category')
    const params = {}
    if (q) params.q = q
    if (category) params.category = category
    setSearchParams(params)
  }

  if (loading) return <p className="text-gray-600">Loading...</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <div>
      <form onSubmit={onSearch} className="mb-6 grid grid-cols-1 sm:grid-cols-[1fr_200px_auto] gap-3">
        <input className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm focus:border-gray-300 focus:ring-2 focus:ring-gray-200" name="q" placeholder="Search posts" defaultValue={q} />
        <input className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm focus:border-gray-300 focus:ring-2 focus:ring-gray-200" name="category" placeholder="Category" defaultValue={category} />
        <button type="submit" className="rounded-lg bg-gray-900 text-white px-4 py-2 shadow hover:bg-black">Search</button>
      </form>
      <ul className="grid gap-4 sm:grid-cols-2">
        {items.map((p) => (
          <li key={p._id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
            <Link className="block text-lg font-semibold" to={`/post/${p.slug}`}>{p.title}</Link>
            <div className="mt-1 text-sm text-gray-500">By {p.author?.name}</div>
            {!!p.categories?.length && (
              <div className="mt-2 flex flex-wrap gap-2">
                {p.categories.map((c) => (
                  <span key={c} className="rounded-full bg-gray-100 px-3 py-0.5 text-xs text-gray-600">{c}</span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-center gap-3">
        <button className="rounded-md border px-3 py-1.5 disabled:opacity-50" disabled={pagination.page <= 1} onClick={() => setSearchParams({ page: String(pagination.page - 1), q, category })}>Prev</button>
        <span className="text-sm text-gray-600">
          Page {pagination.page} / {pagination.pages}
        </span>
        <button className="rounded-md border px-3 py-1.5 disabled:opacity-50" disabled={pagination.page >= pagination.pages} onClick={() => setSearchParams({ page: String(pagination.page + 1), q, category })}>Next</button>
      </div>
    </div>
  )
}


