import React, { useContext } from 'react'
import './task.css'
import { FaTrashAlt, FaCheck } from "react-icons/fa";
import { todoContext } from '../../Contexts/TaskContext';



const Task = ({ taskData }) => {

  const { addComplateTask, deleteIncomplateTask } = useContext(todoContext);


  const { task_name, id } = taskData;
  return (
    <div className='task_list_item '>
      <div className="task_list_item_inner">
        <p className='m-0'>{task_name}</p>
        <div className="task_icons">
          <button onClick={() => addComplateTask({
            type: 'COMPLATE_TASK',
            complate_task_name: task_name,
            complate_task_id: id,
          })} className='btn p-0 border-0'><FaCheck className='icon text-success' /></button>
          <button onClick={() => {
            deleteIncomplateTask({
              type: 'DELETE_ITEM_INCOMPLATE',
              dlt_id: id,
              isDltComplate: false,
            })
          }} className='btn p-0 border-0'><FaTrashAlt className='icon icon_delete text-danger' /></button>
        </div>
      </div>

    </div>
  )
}

export default Task