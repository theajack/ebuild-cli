import {MouseEvent} from 'react';

const Todo = ({onClick, completed, text}: {
    onClick: (e: MouseEvent) => void,
    completed: boolean,
    text: string
}) => (
    <li
        onClick={onClick}
        style={{
            textDecoration: completed ? 'line-through' : 'none'
        }}
    >
        {text}
    </li>
);

export default Todo;