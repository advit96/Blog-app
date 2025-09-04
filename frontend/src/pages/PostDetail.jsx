import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import api from '../api/client'
import { useAuth } from '../state/AuthContext'

export default function PostDetail() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await api.get(`/posts/${slug}`)
        setPost(data)
      } catch (err) {
        setError('Failed to load post')
      }
    })()
  }, [slug])

  async function onDelete() {
    try {
      await api.delete(`/posts/${slug}`)
      navigate('/')
    } catch (err) {
      setError('Failed to delete')
    }
  }

  if (!post) return <p className="text-gray-600">Loading...</p>

  const canEdit = user && user.id === post.author?._id

  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-semibold tracking-tight">{post.title}</h2>
      {!!post.categories?.length && <p className="text-sm text-gray-600">Categories: {post.categories.join(', ')}</p>}
      <p className="text-sm text-gray-600">By {post.author?.name}</p>
      <p className="whitespace-pre-wrap leading-7 bg-white rounded-xl border border-gray-200 p-4 shadow-sm">{post.content}</p>
      {canEdit && (
        <div className="flex gap-2">
          <Link className="rounded-md border px-3 py-1.5 hover:bg-gray-50" to={`/post/${slug}/edit`}>Edit</Link>
          <button className="rounded-md border px-3 py-1.5 hover:bg-gray-50" onClick={onDelete}>Delete</button>
        </div>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}


