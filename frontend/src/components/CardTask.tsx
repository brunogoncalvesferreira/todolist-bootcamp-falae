import { CheckCircle, Circle, Edit, Trash2 } from 'lucide-react'
import { TasksProps } from '../App'


interface CardTasksProps {
  title: string
  id: number
  completed: boolean
  onDeleteTask: (id: number) => void
  task: TasksProps
  onHandleOpenModalEdit: (task: TasksProps) => void
  ohHandleUpdateIsCompleted: (id: number) => void
}

export function CardTasks({
  title,
  id,
  completed,
  onDeleteTask,
  task,
  onHandleOpenModalEdit,
  ohHandleUpdateIsCompleted }: CardTasksProps) {
  return (
    <div className="w-full flex items-center gap-4 bg-gray-800 p-4 rounded">
      <button onClick={() => ohHandleUpdateIsCompleted(id)}>
        {completed ? <CheckCircle className="text-green-400" /> : <Circle className="text-gray-500" />}
      </button>

      <p className={completed ? 'line-through flex-1 text-gray-50' : 'flex-1 text-gray-50'}>{title}</p>

      <div className="flex items-center gap-2">
        <button onClick={() => onHandleOpenModalEdit(task)}>
          <Edit className="text-green-400" />
        </button>
        <button onClick={() => onDeleteTask(id)}>
          <Trash2 className="text-red-400" />
        </button>
      </div>
    </div>
  )
}
