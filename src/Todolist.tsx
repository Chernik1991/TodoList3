import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTasks: (newTitle: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState<string>('')
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    const onClickAddTaskHandler = () => {
        props.addTasks(title)
        setTitle('')
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClickAddTaskHandler()
        }
    }
    const onClickChangeFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(value)

    }
    const onClickRemoveTaskHandler=(tId:string)=>{
        props.removeTask(tId)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onKeyPress={onKeyPressHandler} onChange={onChangeInputHandler}/>
            <button onClick={onClickAddTaskHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    // const onClickRemoveTaskHandler=()=>{
                    //     props.removeTask(t.id)

                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={()=>onClickRemoveTaskHandler(t.id)}>x
                                </button>
                            </li>
                        )
                    }
                )
            }
        </ul>
        <div>
            <button onClick={() => {
                onClickChangeFilterHandler('all')
            }}>All
            </button>
            <button onClick={() => {
                onClickChangeFilterHandler('active')
            }}>Active
            </button>
            <button onClick={() => {
                onClickChangeFilterHandler('completed')
            }}>Completed
            </button>
        </div>
    </div>
}
