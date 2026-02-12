import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        projects: [ 'packages/**' ],
        include: [ 'packages/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}' ],
        exclude: [ 'node_modules', 'dist', 'build', 'npm' ],
    }
});