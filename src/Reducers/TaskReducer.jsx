export const initialTask = {
    incomplate_todos: [],
    complate_todos: [],
}
export const taskReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TASK":
            const { task_name, id } = action.payload;
            const newTask = {
                task_name,
                id,
            }
            const newTodosAry = [...state.incomplate_todos, newTask]
            return { ...state, incomplate_todos: newTodosAry }
        case "COMPLATE_TASK":
            const { complate_task_name, complate_task_id } = action.payload;
            const newTaskComplate = {
                complate_task_name,
                complate_task_id,
            }
            const newTodosAryComplate = [...state.complate_todos, newTaskComplate]
            const incomplateTodosNew = state.incomplate_todos.filter(todos => todos.id != complate_task_id)
            return { ...state, complate_todos: newTodosAryComplate, incomplate_todos: incomplateTodosNew }


        //========Handling Deleting Items IN TASKS=======//
        case 'DELETE_ITEM_INCOMPLATE':
            const { dlt_id, isDltComplate } = action.payload;
            const restTaskItems = isDltComplate ?
                state.complate_todos.filter(todo => todo.complate_task_id != dlt_id)
                :
                state.incomplate_todos.filter(todo => todo.id != dlt_id)

            return isDltComplate ? { ...state, complate_todos: restTaskItems, } : { ...state, incomplate_todos: restTaskItems, }



        default:
            return state;
    }
}