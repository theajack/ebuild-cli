import {useRouteMatch, Switch, Link, Route} from 'react-router-dom';
import Topic from './Topic';

export default function Topics () {
    const match = useRouteMatch();
    console.log('match=>', match);
    return (
        <div>
            <h2>Topics</h2>
            <ul>
                <li>
                    <Link to={`${match.url}/components`}>Components</Link>
                </li>
                <li>
                    <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
                </li>
            </ul>
            
            {/*
                Topics页面有自己的<Switch>，其中包含更多的路线，建立在/topics路径之上
                您可以将第二个<Route>视为所有主题的“索引”页面，或者当未选择任何主题时显示的页面
            */}
            <Switch>
                <Route path={`${match.path}/:topicId`}>
                    <Topic />
                </Route>
                <Route path={match.path}>
                    <h3>Please select a topic.</h3>
                </Route>
            </Switch>
        </div>
    );
}