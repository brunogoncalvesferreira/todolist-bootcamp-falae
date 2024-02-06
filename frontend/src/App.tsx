import { FormEvent, useCallback, useEffect, useState } from 'react'
import { CardTasks } from './components/CardTask'
import { Header } from './components/Header'
import { Plus } from 'lucide-react'
import { api } from './lib/axios'
import { FormUpdate } from './components/FormUpdate'

export interface TasksProps {
  id: number
  title: string
  completed: boolean
}

export function App() {
  const [title, setTitle] = useState('')
  const [tasks, setTasks] = useState<TasksProps[]>([])
  const [edit, setEdit] = useState<null | TasksProps>(null)
  const [openModal, setOpenModal] = useState(false)

  const getTasks = useCallback(async () => {
    const response = await api.get('tasks')
    setTasks(response.data)
  }, [])

  useEffect(() => {
    getTasks()
  }, [getTasks])

  async function createTasks(event: FormEvent) {
    event.preventDefault()

    if (title === '') {
      return alert('Preencha o campo de tarefa')
    }

    const response = await api.post('tasks', {
      title,
      completed: false
    })
    setTasks([...tasks, response.data])
    getTasks()
    setTitle('')
  }

  async function deleteTask(id: number) {
    await api.delete(`tasks/${id}`)
    getTasks()
  }

  function handleOpenModalEdit(task: TasksProps) {
    setOpenModal(true)
    setEdit(task)
    setTitle(task.title)
  }

  function handleCloseModalEdit() {
    setOpenModal(false)
    setEdit(null)
    setTitle('')
  }

  async function updateTask(event: FormEvent) {
    event.preventDefault()

    await api.put(`tasks/${edit?.id}`, { title })
    getTasks()
  }

  async function handleUpdateIsCompleted(id: number) {
    await api.put(`tasks/${id}`, {
      completed: !tasks.find((task) => task.id === id)?.completed,
      title: tasks.find((task) => task.id === id)?.title,
    })
    getTasks()
  }

  const tasksCreated = tasks.length
  const tasksCompleted = tasks.filter((task) => task.completed).length

  return (
    <div className="min-h-screen bg-gray-950 pb-20 relative">
      <Header />

      <main className='max-w-[48rem] w-full mx-auto px-4'>
        <form onSubmit={createTasks} className="mt-10 flex items-center gap-2">
          <input
            onChange={e => setTitle(e.target.value)}
            value={title}
            className="flex-1 outline-none p-3 rounded bg-gray-800 text-gray-50"
            type="text"
            placeholder="Criar nova tarefa"
          />
          <button
            type="submit"
            disabled={title === ''}
            className="p-3 rounded bg-violet-500 text-gray-50 hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus />
          </button>
        </form>

        <div className="mt-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <strong className="text-gray-50">Tarefas criadas</strong>
            <span className="bg-violet-500 w-8 h-8 rounded-full flex items-center justify-center text-gray-50 font-bold">
              {tasksCreated}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <strong className="text-gray-50">Tarefas concluídas</strong>
            <span className="bg-violet-500 w-8 h-8 rounded-full flex items-center justify-center text-gray-50 font-bold">
              {tasksCompleted}
            </span>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          {tasks.map((task, index) => {
            return (
              <CardTasks
                key={index}
                id={task.id}
                title={task.title}
                completed={task.completed}
                onDeleteTask={deleteTask}
                onHandleOpenModalEdit={handleOpenModalEdit}
                task={task}
                ohHandleUpdateIsCompleted={handleUpdateIsCompleted}
              />
            )
          })}
        </div>

        {openModal && (
          <FormUpdate
            onHandleCloseModalEdit={handleCloseModalEdit}
            onUpdateTask={updateTask}
            title={title}
            setTitle={setTitle}
          />
        )}

      </main>
    </div>
  )
}