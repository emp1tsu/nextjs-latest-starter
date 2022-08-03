import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useState } from 'react'

const NewTodoForm = () => {
  const queryClient = useQueryClient()
  const [form, update] = useState({
    title: '',
    body: '',
  })
  const { mutate } = useMutation(
    () => {
      return fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify(form),
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todos'])
      },
    },
  )
  const saveTodo = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    update({ title: '', body: '' })
    mutate()
  }
  return (
    <form
      onSubmit={saveTodo}
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <label
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        タイトル
        <input
          style={{
            width: '500px',
            border: '1px solid',
          }}
          type="text"
          id="title"
          value={form.title}
          onChange={(e) => update({ ...form, title: e.target.value })}
        />
      </label>
      <label
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '16px',
        }}
      >
        内容
        <textarea
          style={{
            width: '500px',
            border: '1px solid',
          }}
          id="body"
          value={form.body}
          onChange={(e) => update({ ...form, body: e.target.value })}
        />
      </label>
      <button
        style={{
          width: '100px',
          marginTop: '16px',
          border: '1px solid',
        }}
      >
        Save
      </button>
    </form>
  )
}
export default NewTodoForm
