import React, { useContext } from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import { todoContext } from '../../Contexts/TaskContext';
import { Draggable } from 'react-beautiful-dnd';
import { MdDragIndicator } from 'react-icons/md'
const ComplateTask = ({ taskData }) => {
    const { task: { complate_task_name, complate_task_id }, index } = taskData;
    const { deleteIncomplateTask } = useContext(todoContext);

    return (
        <Draggable
            draggableId={complate_task_id}
            key={complate_task_id}
            index={index}
        >
            {
                (provided) => (
                    <div className='task_list_item'
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <div className="task_list_item_inner">
                            <div className="task_content">
                                <MdDragIndicator className='drag_icon' />
                                <p className='m-0 '>{complate_task_name}</p>
                            </div>
                            <div className="task_icons">
                                <button onClick={() => {
                                    deleteIncomplateTask({
                                        type: 'DELETE_ITEM_INCOMPLATE',
                                        dlt_id: complate_task_id,
                                        isDltComplate: true,
                                    })
                                }} className='btn p-0 border-0'><FaTrashAlt className='icon icon_delete text-danger' /></button>
                            </div>
                        </div>
                    </div>
                )
            }
        </Draggable>
    )
}

export default ComplateTask