import { React, useContext, useState, } from 'react';
import { todoContext } from '../../Contexts/TaskContext';
import { useForm } from 'react-hook-form';
import './todo.css';
import Task from '../Task/Task';
import ComplateTask from '../Complate Task/ComplateTask';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const ToDo = () => {
  const [error, setError] = useState({
    isError: false,
    errorMessage: 'Write your task first...'
  })
  const { tasks, addTask, addComplateTask } = useContext(todoContext);
  const { register, handleSubmit, reset } = useForm();


  const handleTaskSubmit = (data) => {
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

  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (destination.index === source.index) {
      return
    }

    if (destination.droppableId === source.droppableId) {
      if (destination.droppableId === "incomplete_section") {
        itemListing(tasks.incomplate_todos)
      }
      else if (destination.droppableId === "complete_section") {
        itemListing(tasks.complate_todos)
      }
    }
    else {
      if (destination.droppableId === "complete_section") {
        moveTask(tasks.incomplate_todos, true)
      }
      else if (destination.droppableId === "incomplete_section") {
        moveTask(tasks.complate_todos, false)
      }
    }

    function itemListing(destinationAry) {
      const removeItem = destinationAry.splice(source.index, 1)[0];
      destinationAry.splice(destination.index, 0, removeItem);
    }

    function moveTask(ary, isComplate) {
      const removeItemToSource = ary.splice(source.index, 1)[0];
      if (!isComplate) {
        const { complate_task_name, complate_task_id } = removeItemToSource;
        addTask({
          type: 'ADD_TASK',
          task_name: complate_task_name,
          id: complate_task_id,
        })
      }
      else if (isComplate) {
        const { task_name, id } = removeItemToSource;
        addComplateTask({
          type: 'COMPLATE_TASK',
          complate_task_name: task_name,
          complate_task_id: id,
        })
      }
    }
  }


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
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="taskContainer d-flex items-center justify-center gap-2 mt-4">
          <div className="Incomplete_task  w-100">
            <p className='fs-6 fw-bold text-danger'>Incomplate Tasks:</p>
            {/* Incomplate task  */}
            <Droppable className='p-5 bg-danger' droppableId='incomplete_section'>
              {(provided, snapshot) => (
                <div
                  className="task_container"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ backgroundColor: snapshot.isDraggingOver && '#ccc' }}
                >
                  <div className="inner">
                    {tasks && tasks.incomplate_todos.map((task, index) => <Task key={task.id} taskData={{ task, index }} />)}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className="divider  ">
          </div>
          <div className="complate_task w-100">
            <p className='fs-6 fw-bold text-success'>Complate Tasks:</p>
            <Droppable droppableId='complete_section'>
              {(provided, snapshot) => (
                <div
                  className="task_container"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{ backgroundColor: snapshot.isDraggingOver && '#ccc' }}

                >
                  <div className="inner">
                    {tasks && tasks.complate_todos.map((task, index) => <ComplateTask key={task.complate_task_id} taskData={{ task, index }} />)}
                  </div>
                  {provided.placeholder}
                </div>
              )}

            </Droppable>

          </div>
        </div>
      </DragDropContext>
    </div>
  )
}

export default ToDo;
