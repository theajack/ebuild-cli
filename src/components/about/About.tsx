import src from './images/webassembly.png';
import bg from './images/logo.jpg';

// import {changeName, changeNameAsync} from './store/actions';
// import store from './store';

// const a = require('');
// console.log(a);
export default function About (props: object) {
    console.log('About=>', props);
    const styleObject = {
        width: '100px',
        height: '100px',
        // backgroundImage: `url(${require('../assets/images/logo.jpg').default})`,
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover'
    };
    return <h2>
        About
        <div style={styleObject}></div>
        <img src={src} alt=""/>
    </h2>;
}