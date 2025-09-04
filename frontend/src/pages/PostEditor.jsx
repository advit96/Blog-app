import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/client'

export default function PostEditor() {
  const { slug } = useParams()
  const isEdit = Boolean(slug)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [categories, setCategories] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!isEdit) return
    ;(async () => {
      try {
        const { data } = await api.get(`/posts/${slug}`)
        setTitle(data.title)
        setContent(data.content)
        setCategories((data.categories || []).join(', '))
      } catch (err) {
        setError('Failed to load post')
      }
    })()
  }, [isEdit, slug])

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    const payload = { title, content, categories: categories.split(',').map((s) => s.trim()).filter(Boolean) }
    try {
      if (isEdit) {
        await api.put(`/posts/${slug}`, payload)
      } else {
        await api.post('/posts', payload)
      }
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed')
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="text-2xl font-semibold mb-4">{isEdit ? 'Edit Post' : 'New Post'}</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="block text-sm text-gray-600">Title</label>
          <input className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="space-y-1">
          <label className="block text-sm text-gray-600">Categories (comma-separated)</label>
          <input className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300" value={categories} onChange={(e) => setCategories(e.target.value)} />
        </div>
        <div className="space-y-1">
          <label className="block text-sm text-gray-600">Content</label>
          <textarea className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300" value={content} onChange={(e) => setContent(e.target.value)} rows={10} required />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="rounded-md bg-gray-900 text-white px-4 py-2 hover:bg-black">Save</button>
      </form>
    </div>
  )
}


