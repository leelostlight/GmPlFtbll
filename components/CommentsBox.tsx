'use client'

import { useState, useEffect } from 'react'

interface Comment {
  id: string
  author: string
  text: string
  timestamp: string
}

interface CommentsBoxProps {
  gameId: string
}

export default function CommentsBox({ gameId }: CommentsBoxProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [author, setAuthor] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchComments()
  }, [gameId])

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments/${gameId}`)
      if (response.ok) {
        const data = await response.json()
        setComments(data.comments || [])
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !author.trim()) return

    try {
      const response = await fetch(`/api/comments/${gameId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author,
          text: newComment,
        }),
      })

      if (response.ok) {
        setNewComment('')
        fetchComments()
      }
    } catch (error) {
      console.error('Failed to post comment:', error)
    }
  }

  if (loading) {
    return <div style={{ marginTop: '2rem' }}>Loading comments...</div>
  }

  return (
    <div style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Comments</h2>
      
      <div style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
        {comments.length === 0 ? (
          <p style={{ color: '#666' }}>No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <strong>{comment.author}</strong>
                <span style={{ color: '#666', fontSize: '0.875rem' }}>
                  {new Date(comment.timestamp).toLocaleString()}
                </span>
              </div>
              <p>{comment.text}</p>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={4}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px', fontFamily: 'inherit' }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '0.5rem 1.5rem',
            backgroundColor: '#0066cc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Post Comment
        </button>
      </form>
    </div>
  )
}

