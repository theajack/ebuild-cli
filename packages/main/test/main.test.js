/*
 * @Author: chenzhongsheng
 * @Date: 2024-10-10 20:03:12
 * @Description: Coding something
 */
import { expect, test } from 'vitest';
import { hello } from 'demo-utils';

test('hello', () => {
    expect(hello).toBe('Hello World!');
});