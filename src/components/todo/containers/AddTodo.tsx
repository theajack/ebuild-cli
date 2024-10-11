import {connect} from 'react-redux';
import {addTodo} from '../store/actions';

const AddTodo = ({dispatch}: {dispatch: Function}) => {
    let input: HTMLInputElement;

    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    if (!input.value.trim()) {
                        return;
                    }
                    dispatch(addTodo(input.value));
                    input.value = '';
                }}
            >
                <input ref={(node: HTMLInputElement) => (input = node)} />
                <button type="submit">Add Todo</button>
            </form>
        </div>
    );
};

export default connect()(AddTodo);