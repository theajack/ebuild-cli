import React from 'react';
import Todo from './Todo';
import {IToDo} from './store/reducers/todos';

const TodoList = ({todos, toggleTodo}: {
    todos: IToDo[];
    toggleTodo: Function
}) => (
    <ul>
        {todos.map(todo => (
            <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)} />
        ))}
    </ul>
);

export default TodoList;