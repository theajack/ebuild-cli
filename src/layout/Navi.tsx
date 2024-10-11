import {Drawer, List, NavBar, Icon} from 'antd-mobile';
import {Component} from 'react';
import {Link, Switch, Route} from 'react-router-dom';
import About from '../components/about/About';
import Home from '../components/Home';
import Topics from '../components/Topics';
import TodoApp from '../components/todo/TodoApp';
import Async from '../components/async/Async';
import Menu from '../components/Menu';

const routers = [{
    path: '/',
    name: 'Home',
}, {
    path: '/menu',
    name: 'MenuTest',
}, {
    path: '/topics',
    name: 'Topics',
}, {
    path: '/about',
    name: 'About',
}, {
    path: '/todo',
    name: 'Todo'
}, {
    path: '/async',
    name: 'Async'
}, ];

export default class Navi extends Component {
  state = {
      open: false,
  }
  onOpenChange = () => {
      this.setState({open: !this.state.open});
  }
  render () {
      const sidebar = (<List>
          {routers.map((item, index) => {
              return (<List.Item key={index}
                  thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                  multipleLine
              >
                  <Link to={item.path} onClick={this.onOpenChange}>{item.name}</Link>
              </List.Item>);
          })}
      </List>);

      return (<div>
          <NavBar className="naviBar" icon={<Icon type="ellipsis" />} onLeftClick={this.onOpenChange}>Basic</NavBar>
          <Drawer
              className="my-drawer"
              style={{minHeight: document.documentElement.clientHeight}}
              contentStyle={{color: '#A6A6A6', textAlign: 'center', paddingTop: 42}}
              sidebar={sidebar}
              open={this.state.open}
              onOpenChange={this.onOpenChange}
          >
              <Switch>
                  <Route path={'/todo'}>
                      <TodoApp />
                  </Route>
                  <Route path={'/about'}>
                      <About />
                  </Route>
                  <Route path={'/topics'}>
                      <Topics />
                  </Route>
                  <Route path={'/async'}>
                      <Async />
                  </Route>
                  <Route path={'/menu'}>
                      <Menu date={new Date}/>
                  </Route>
                  <Route path={'/'}>
                      <Home />
                  </Route>
              </Switch>
          </Drawer>
      </div>);
  }
}