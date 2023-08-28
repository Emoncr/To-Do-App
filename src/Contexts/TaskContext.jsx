import React, { createContext, useReducer } from 'react'
import { initialTask, taskReducer } from '../Reducers/TaskReducer';



export const todoContext = createContext();


const TaskContext = ({ children }) => {
    const [tasks, dispatch] = useReducer(taskReducer, initialTask)

    const addTask = ({ task_name, id }) => {
        dispatch({
            type: 'ADD_TASK',
            payload: { task_name, id }
        })
    }
    const addComplateTask = ({ complate_task_name, complate_task_id }) => {
        dispatch({
            type: 'COMPLATE_TASK',
            payload: { complate_task_name, complate_task_id }
        })
    }
    const deleteIncomplateTask = ({ dlt_id ,isDltComplate}) => {
        dispatch({
            type: 'DELETE_ITEM_INCOMPLATE',
            payload: { dlt_id ,isDltComplate}
        })
    }



    return (
        <todoContext.Provider value={{ tasks, addTask, addComplateTask, deleteIncomplateTask }}>
            {children}
        </todoContext.Provider>
    )
}

export default TaskContext