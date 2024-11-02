/*
 * @Author: chenzhongsheng
 * @Date: 2023-12-28 15:44:11
 * @Description: Coding something
 */
export function log (...msg: any[]) {
    logBase(...msg);
}

const defMaxCount = 100000;

// @ts-ignore
function logInfo (color = 'white', max = defMaxCount, ) {
    return { max, color };
}

const allowIds: any = {
    'test': logInfo(),
};
let enableLog = true;

export function setEnableLog (v: boolean) {
    enableLog = v;
    console.log(`setEnableLog=${v}`);
}


export function logId (id: string, ...msg: any[]) {

    if (!enableLog) {return;}

    if (!id.startsWith('debug')) {
        const data = allowIds[id];
        if (!data) {return;}
    }

    logBase(id, ...msg);
}


function logBase (...msg: any[]) {
    const id = msg[0];
    const date = new Date();
    console.log(`%c【WASM ${date.toLocaleTimeString()}:${date.getMilliseconds()}】${msg.join(' ')}`, `color:${allowIds[id].color}`);
}

