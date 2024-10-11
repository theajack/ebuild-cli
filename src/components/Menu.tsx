import {ActivityIndicator, Menu, NavBar} from 'antd-mobile';
import {Component, MouseEvent} from 'react';

const data = [
    {
        value: '1',
        label: 'Food',
        children: [
            {
                label: 'All Foods',
                value: '1',
                disabled: false,
            },
            {
                label: 'Chinese Food',
                value: '2',
            }, {
                label: 'Hot Pot',
                value: '3',
            }, {
                label: 'Buffet',
                value: '4',
            }, {
                label: 'Fast Food',
                value: '5',
            }, {
                label: 'Snack',
                value: '6',
            }, {
                label: 'Bread',
                value: '7',
            }, {
                label: 'Fruit',
                value: '8',
            }, {
                label: 'Noodle',
                value: '9',
            }, {
                label: 'Leisure Food',
                value: '10',
            }],
    }, {
        value: '2',
        label: 'Supermarket',
        children: [
            {
                label: 'All Supermarkets',
                value: '1',
            }, {
                label: 'Supermarket',
                value: '2',
                disabled: true,
            }, {
                label: 'C-Store',
                value: '3',
            }, {
                label: 'Personal Care',
                value: '4',
            }],
    },
    {
        value: '3',
        label: 'Extra',
        isLeaf: true,
        children: [
            {
                label: 'you can not see',
                value: '1',
            },
        ],
    },
];

// interface Props {
//     updateUser: typeof updateUser
// }
// interface State {
//     userName: string
//     userPwd: string
// }
// export default class Home extends Component<Props, State> {
export default class MenuTest extends Component {
    // state = {date: new Date}
    // props = {date: new Date}
    // timerID: any;
    // constructor (props: {date: Date}) {
    //     super(props);
    //     this.props = props;
    // }
    // tick () {
    //     this.setState({
    //         date: new Date()
    //     });
    // }
    // componentDidMount () {
    //     this.timerID = setInterval(
    //         () => this.tick(),
    //         1000
    //     );
    // }
    // componentWillUnmount () {
    //     clearInterval(this.timerID);
    // }
    // render () {
    //     // console.log('Home=>', this.props);
    //     return (
    //         <div>
    //             <h2>Home</h2>
    //             <h1>Hello, world!</h1>
    //             <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
    //             <h2>It is {this.state.date.toLocaleTimeString()}!!!</h2>
    //         </div>
    //     );
    // }
    state = {
        initData: [],
        show: false,
    }
    props = {date: new Date}
    constructor (props: {date: Date}) {
        super(props);
        this.props = props;
    }
    onChange = (value: any) => {
        // const value = ['', ''];
        console.log(value);
        let label = '';
        data.forEach((dataItem: typeof data[0]) => {
            if (dataItem.value === value[0]) {
                label = dataItem.label;
                if (dataItem.children && value[1]) {
                    dataItem.children.forEach((cItem) => {
                        if (cItem.value === value[1]) {
                            label += ` ${cItem.label}`;
                        }
                    });
                }
            }
        });
        console.log(label);
    }
    handleClick = (e: MouseEvent) => {
        //   e: MouseEvent
        e.preventDefault(); // Fix event propagation on Android
        this.setState({
            show: !this.state.show,
        });
        // mock for async data loading
        this.setState({
            initData: data,
        });
    }

    onMaskClick = () => {
        this.setState({
            show: false,
        });
    }

    render () {
        const {initData, show} = this.state;
        const menuEl = (
            <Menu
                className="foo-menu"
                data={initData}
                value={['1', '3']}
                onChange={this.onChange}
                height={document.documentElement.clientHeight * 0.6}
            />
        );
        const loadingEl = (
            <div style={{width: '100%', height: document.documentElement.clientHeight * 0.6, display: 'flex', justifyContent: 'center'}}>
                <ActivityIndicator size="large" />
            </div>
        );
        return (
            <div className={show ? 'menu-active' : ''}>
                <div>
                    <NavBar
                        leftContent="Menu"
                        mode="light"
                        icon={<img src="https://gw.alipayobjects.com/zos/rmsportal/iXVHARNNlmdCGnwWxQPH.svg" className="am-icon am-icon-md" alt="" />}
                        onLeftClick={this.handleClick}
                        className="top-nav-bar"
                    >
                Here is title
                    </NavBar>
                </div>
                {show ? initData ? menuEl : loadingEl : null}
                {show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}
            </div>
        );
    }
}