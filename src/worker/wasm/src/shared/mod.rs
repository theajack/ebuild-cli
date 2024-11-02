/*
 * @Author: chenzhongsheng
 * @Date: 2023-12-04 16:48:20
 * @Description: Coding something
 */
extern crate wasm_bindgen;

use once_cell::sync::Lazy;
use std::alloc::{alloc, Layout};
use wasm_bindgen::prelude::*;

use self::message::MessageCaller;

pub mod message;

// const MAX_COUNT: usize = 200000;
const MAX_COUNT: usize = 5242880; // 5mb

// 初始化 SHARE_BUFFER
// ! 解引用 Lazy 类型的实例时，实际上是获取了对内部值的引用。这个操作是非常高效的，不会引入额外的性能开销
static mut SHARE_BUFFER: Lazy<&'static mut [u8; MAX_COUNT]> = Lazy::new(|| init_buffer());

fn get_shared_data(n: usize) -> Vec<u8> {
    unsafe { (*SHARE_BUFFER)[0..n].to_vec() }
}

// ! 手动分配内存保证不会 由于借用等操作使得 js_sys::Uint8Array::view 的返回值失效
fn init_buffer() -> &'static mut [u8; MAX_COUNT] {
    let layout = Layout::array::<u8>(MAX_COUNT).unwrap();
    let ptr = unsafe { alloc(layout) as *mut u8 };
    // 通过指针创建切片
    let array = unsafe { std::slice::from_raw_parts_mut(ptr, MAX_COUNT) };
    let ptr: *mut [u8; MAX_COUNT] = array.as_mut_ptr() as *mut [u8; MAX_COUNT];
    let fixed_slice: &mut [u8; MAX_COUNT] = unsafe { &mut *ptr };
    fixed_slice
}

// ! 共享内存
#[wasm_bindgen]
pub fn init_shared_buffer(f: &js_sys::Function) {
    unsafe {
        let array = js_sys::Uint8Array::view(*SHARE_BUFFER);
        f.call1(&JsValue::NULL, &JsValue::from(array))
            .expect("The callback function should not throw");
    }
}

pub static mut MESSAGE_CALLER: Lazy<MessageCaller> = Lazy::new(|| MessageCaller::new());

// ! 主动向js worker 发送消息
pub fn send_data(buf: &[u8], extra: (u8, u8)) {
    // 额外消息可以扩展
    let n: usize = buf.len();
    if n > MAX_COUNT {
        send_log_id("nack_fec", &format!("n={n} extra={:?}", extra));
        panic!("SharedBuffer Over Max Count");
    }
    unsafe {
        // ! 使用 copy_from_slice 的性能最好
        (*SHARE_BUFFER)[..n].copy_from_slice(buf);
        // send_log(&format!("copy_from_slice succeed"));
        MESSAGE_CALLER
            .call
            .call2(
                &JsValue::NULL,
                &JsValue::from(n),
                &JsValue::from(&format!("{},{}", extra.0, extra.1)),
            )
            .expect("The callback function should not throw");
        // send_log(&format!("call js succeed"));
    }
}

// ! 主动向js 发送log
pub fn send_log(data: &str) {
    send_log_id("def", data)
}
// ! 主动向js 发送log
// #[cfg(debug_assertions)]
pub fn send_log_id(id: &str, data: &str) {
    unsafe {
        MESSAGE_CALLER
            .log
            .call2(&JsValue::NULL, &JsValue::from(id), &JsValue::from(data))
            .expect("The callback function should not throw");
    }
}

pub fn unreachable(data: &str) {
    send_log_id("unreachable", data)
}

#[wasm_bindgen]
pub fn regist_js_onmessage(f: js_sys::Function, log: js_sys::Function) {
    unsafe {
        MESSAGE_CALLER.call = f;
        MESSAGE_CALLER.log = log;
    }
}

// ! js 主动调用向wasm传递数据
#[wasm_bindgen]
pub fn send_to_wasm(n: usize, msg_type: u8) {
    let data = get_shared_data(n);
    // todo 收到js消息
    send_data(&data, (0, msg_type));
}
