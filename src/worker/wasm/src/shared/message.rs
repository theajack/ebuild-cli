/*
 * @Author: chenzhongsheng
 * @Date: 2023-12-12 10:06:53
 * @Description: Coding something
 */

pub struct MessageCaller {
    pub call: js_sys::Function,
    pub log: js_sys::Function,
}

impl MessageCaller {
    pub fn new() -> MessageCaller {
        MessageCaller {
            call: js_sys::Function::new_no_args(""),
            log: js_sys::Function::new_no_args(""),
        }
    }
}
