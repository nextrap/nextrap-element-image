import type {StorybookConfig} from "@storybook/web-components-vite";

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

    addons: [
        "@storybook/addon-links",
        "@chromatic-com/storybook",
        "@storybook/addon-docs"
    ],

    framework: {
        name: "@storybook/web-components-vite",
        options: {},
    },

    core: {
        disableTelemetry: true,
    },

    staticDirs: ['./static'],

    viteFinal: async (config) => {
        return {
            ...config,
            optimizeDeps: {
                include: ['lit', '@lit/reactive-element', '@lit-labs/ssr'],
            },
            build: {
                target: 'esnext',
            },
        };
    }
};

export default config;
