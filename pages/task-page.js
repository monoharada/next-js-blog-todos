import { useEffect } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link';
import { getAllTasksData } from '../lib/tasks';
import Task from '../components/Task'
import useSwr from 'swr'
import StateContextProvider from '../context/StateContext'
import TaskForm from '../components/TaskFrom'

const fetcher = (url) => fetch(url).then((res) => res.json())
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`

const taskPage = ({ staticfiltredTasks }) => {

  const { data: tasks, mutate } = useSwr(apiUrl, fetcher, {
    initialData: staticfiltredTasks
  })
  const filteredTasks = tasks?.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  )
  useEffect(() => {
    mutate()
  }, [])

  return (
    <StateContextProvider>

      <Layout title="task-page">
        <TaskForm taskCreated={mutate} />
        <ul>
          {filteredTasks &&
            filteredTasks.map((task) =>
              <Task key={task.id} task={task} taskDeleted={mutate} />
            )
          }
        </ul>
        <Link href="/main-page">
          <div className="flex cursor-pointer mt-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
            <span>back to main page</span>
          </div>
        </Link>
      </Layout >
    </StateContextProvider>
  )
}

export default taskPage

export async function getStaticProps() {
  const staticfiltredTasks = await getAllTasksData()

  return {
    props: {
      staticfiltredTasks
    },
    revalidate: 3,
  }
}
