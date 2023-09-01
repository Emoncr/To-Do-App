import React, { useContext } from 'react';
import { FaCheck, FaTrashAlt } from "react-icons/fa";
import { todoContext } from '../../Contexts/TaskContext';
import './task.css';
import { Draggable, } from 'react-beautiful-dnd';
import { MdDragIndicator } from 'react-icons/md'



const Task = ({ taskData }) => {
  const { addComplateTask, deleteIncomplateTask } = useContext(todoContext);
  const { task: { task_name, id }, index } = taskData;


  return (
    <Draggable
      draggableId={id}
      key={id}
      index={index}
    >
      {(provided) => (
        <div className='task_list_item'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="task_list_item_inner">
            <div className="task_content">
              <MdDragIndicator className='drag_icon' />
              <p className='m-0 '>{task_name}</p>
            </div>
            <div className="task_icons">
              <button onClick={() => addComplateTask({
                type: 'COMPLATE_TASK',
                complate_task_name: task_name,
                complate_task_id: id,
              })} className='btn p-0 border-0'><FaCheck className='icon text-dark' /></button>
              <button onClick={() => {
                deleteIncomplateTask({
                  type: 'DELETE_ITEM_INCOMPLATE',
                  dlt_id: id,
                  isDltComplate: false,
                })
              }} className='btn p-0 border-0'><FaTrashAlt className='icon icon_delete text-dark' /></button>
            </div>
          </div>
        </div>
      )
      }
    </Draggable>
  )
}

export default Task