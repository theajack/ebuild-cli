/*
 * @Author: chenzhongsheng
 * @Date: 2024-07-01 17:02:34
 * @Description: Coding something
 */
import Base64 from '../wasm/lib/ebuild_wasm_bg.min.js';

function base64ToBlobUrl (base64Data: string) {
    // 将 Base64 数据转换为二进制数据
    const binaryData = atob(base64Data);
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
    }

    // 创建 Blob 对象
    const blob = new Blob([ arrayBuffer ], { type: 'application/wasm' });

    // 创建 Blob URL
    return URL.createObjectURL(blob);
}

export function getWasmUrl () {
    return base64ToBlobUrl(Base64);
}
