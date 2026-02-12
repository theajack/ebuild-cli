import { createApp } from 'vue';
import App from './components/App.vue';

import './styles/tailwind.css';
import './styles/index.less';


// 提供创建 Vue 应用的工具函数
export function createHelloWorldApp (container: string | Element) {
    const app = createApp(App);
    const el = typeof container === 'string'
        ? document.querySelector(container)
        : container;

    if (el) {
        app.mount(el);
    }

    return app;
}

createHelloWorldApp('#app');
