import {Button, WhiteSpace, WingBlank} from 'antd-mobile';
import {Component} from 'react';

export default class Home extends Component {

    render () {
        return (
            <WingBlank>
                <h2>Home</h2>
                <Button>default</Button><WhiteSpace />
                <Button disabled>default disabled</Button><WhiteSpace />
            </WingBlank>
        );
    }
}