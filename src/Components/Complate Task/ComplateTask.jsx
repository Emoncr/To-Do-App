import React, { useContext } from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import { todoContext } from '../../Contexts/TaskContext';

const ComplateTask = ({ taskData }) => {
    const { complate_task_name, complate_task_id } = taskData;

    const { deleteIncomplateTask } = useContext(todoContext);


    return (
        <div className='task_list_item '>
            <div className="task_list_item_inner">
                <p className='m-0'>{complate_task_name}</p>
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

export default ComplateTask