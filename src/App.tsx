import {BrowserRouter} from 'react-router-dom';
import Navi from './layout/Navi';
import './style/App.sass';

export default function App () {
    return (
        <BrowserRouter>
            <Navi />
        </BrowserRouter>
    );
}