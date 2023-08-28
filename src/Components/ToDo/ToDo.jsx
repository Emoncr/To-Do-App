import { React, useContext, useState, } from 'react';
import { todoContext } from '../../Contexts/TaskContext';
import { useForm } from 'react-hook-form';
import './todo.css';
import Task from '../Task/Task';
import ComplateTask from '../Complate Task/ComplateTask';



const ToDo = () => {
  const [error, setError] = useState({
    isError: false,
    errorMessage: 'Write your task first...'
  })
  const { tasks, addTask } = useContext(todoContext);
  const { register, handleSubmit, reset } = useForm();
  console.log(tasks);

  const handleTaskSubmit = (data) => {
    console.log(data);
    data.task_name ? addTask({
      type: 'ADD_TASK',
      task_name: data.task_name,
      id: crypto.randomUUID(),
    }) : setError({ ...error, isError: true })
    reset()
  }

  const errorNotify = () => {
    error.isError && setTimeout(() => {
      setError({ ...error, isError: false })
    }, 3000);
  }
  errorNotify();




  return (
    <div className='todo'>
      <div className="tast_receiver">
        <form className='form_el' onSubmit={handleSubmit(handleTaskSubmit)}>
          <input className='form-control' placeholder='Add a To-Do..' {...register("task_name")} type="text" />
          <input className='btn btn-danger submit_button' type="submit" value="Add Task" />
        </form>
        {
          error.isError && <p className='error_text text-danger mt-1 fw-bold '>{error.errorMessage}</p>
        }
      </div>
      <div className="taskContainer d-flex items-center justify-center gap-2 mt-4">
        <div className="Incomplete_task  w-100">
          <p className='fs-6 fw-bold text-danger'>Incomplate Tasks:</p>
          {/* Incomplate task  */}
          {
            tasks && tasks.incomplate_todos.map(task => <Task key={task.id} taskData={task} />)
          }

        </div>
        <div className="divider  ">

        </div>
        <div className="complate_task w-100">
          <p className='fs-6 fw-bold text-success'>Complate Tasks:</p>
          {/* Your completed task rendering logic */}

          {
            tasks && tasks.complate_todos.map(task => <ComplateTask key={task.complate_task_id} taskData={task} />)
          }
        </div>
      </div>
    </div>
  )
}

export default ToDo;
