import './index.css';

export function Home () {

    let count = 0;
    const msg = 'Alins';

    return <>
        <div>
            <img style={{ width: 200, marginTop: 100 }} src='/alins.png' />
        </div>
        <h1 class='title'>Hello {msg}</h1>
        <button onclick={count++}>Count is {count}</button>
    </>;
}