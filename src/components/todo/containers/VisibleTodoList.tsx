import {connect} from 'react-redux';
import {IToDo} from '../store/reducers/todos';
import {toggleTodo} from '../store/actions';
import TodoList from '../TodoList';

const getVisibleTodos = (todos: IToDo[], filter: string) => {
    switch (filter) {
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed);
        case 'SHOW_ALL':
        default:
            return todos;
    }
};

const mapStateToProps = (state: {
    todos: IToDo[];
    visibilityFilter: string;
}) => ({
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
});

const mapDispatchToProps = (dispatch: Function) => ({
    toggleTodo: (id: number) => dispatch(toggleTodo(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);