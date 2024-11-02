/*
 * @Author: chenzhongsheng
 * @Date: 2023-12-06 16:11:10
 * @Description: Coding something
 */

pub struct Bytes();

impl Bytes {
    pub fn u32_to_u8s(i: u32) -> [u8; 4] {
        i.to_be_bytes()
        // [
        //     (i >> 24) as u8,
        //     (i >> 16) as u8,
        //     (i >> 8) as u8,
        //     (i & 0xFF) as u8,
        // ]
    }
    pub fn u16_to_u8s(i: u16) -> [u8; 2] {
        i.to_be_bytes()
        // [(i >> 8) as u8, (i & 0xFF) as u8]
    }

    pub fn read_u8(buffer: &Vec<u8>, start: usize) -> u8 {
        buffer[start]
    }

    pub fn read_u16(buffer: &Vec<u8>, start: usize) -> u16 {
        // let bytes: [u8; 2] = buffer[start..(start + 2)]
        //     .try_into()
        //     .expect("No enough bytes!");
        // (bytes[0] as u16) << 8 | bytes[1] as u16

        (buffer[start] as u16) << 8 | buffer[start + 1] as u16
    }

    pub fn read_u32(buffer: &Vec<u8>, start: usize) -> u32 {
        // let bytes: [u8; 4] = buffer[start..(start + 4)]
        //     .try_into()
        //     .expect("No enough bytes!");
        // (bytes[0] as u32) << 24 | (bytes[1] as u32) << 16 | (bytes[2] as u32) << 8 | bytes[3] as u32
        (buffer[start] as u32) << 24
            | (buffer[start + 1] as u32) << 16
            | (buffer[start + 2] as u32) << 8
            | buffer[start + 3] as u32
    }

    // 取u32从左数的第i个bit值, i从0开始，返回bool类型
    pub fn get_u32_i_value(v: u32, i: u8) -> bool {
        ((v >> (31 - i)) & 1) == 1
        // let n = 31 - i;
        // let mask = 1 << n; // 位掩码，将第 10 个位设置为 1
        // let bit = (v & mask) >> n; // 获取第 10 个位的值
        // bit == 1
    }
}
