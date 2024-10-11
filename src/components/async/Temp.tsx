import React from 'react';
import {connect} from 'react-redux';
import {changeName} from './store/actions';

const Temp = ({changeName, name}: {
    changeName: Function
    name: string
}) => {
    return (
        <div style={{padding: '10px'}}>
            <div>name: {name}</div>
            <input
                value={name}
                onChange={ (e) => {
                    changeName(e.target.value);
                }}
            />
            
        </div>
    );
};

const mapStateToProps = (state: {
    name: string;
}) => ({
    name: state.name
});

const mapDispatchToProps = (dispatch: Function) => ({
    changeName: (name: string) => dispatch(changeName(name))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Temp);