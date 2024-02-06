import { X } from 'lucide-react'
import { FormEvent } from 'react'

interface FormUpdateProps {
  onHandleCloseModalEdit: () => void
  onUpdateTask: (event: FormEvent) => void
  title: string
  setTitle: (title: string) => void
}

export function FormUpdate({ onHandleCloseModalEdit, onUpdateTask, title, setTitle }: FormUpdateProps) {

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-700 flex items-center justify-center px-6">
      <div className="w-full max-w-[48rem]">
        <form onSubmit={onUpdateTask} className="w-full flex flex-col bg-gray-900 rounded-md p-5 relative"
        >
          <button onClick={onHandleCloseModalEdit} className="absolute top-4 right-4">
            <X className="w-6 h-6 text-violet-500" />
          </button>
          <h2 className="md:text-3xl text-gray-50 mb-4">Atualizar tarefa</h2>
          <div className="flex flex-col gap-2">
            <input
              className="w-full p-3 rounded bg-gray-800 text-gray-50 outline-none"
              type="text"
              onChange={e => setTitle(e.target.value)}
              value={title}
            />
            <button
              className="w-full p-3 rounded bg-violet-500 text-gray-50 hover:bg-violet-600"
              type="submit"
            >
              Atualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
