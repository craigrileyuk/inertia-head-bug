import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/js/app.js"],
            ssr: "resources/js/ssr.js",
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        {
            name: "vite-for-wp--ssr",
            enforce: "post",
            config: (userConfig, { mode }) => {
                console.log(userConfig, mode);
                return userConfig;
            },
        },
    ],
    resolve: {
        alias: {
            components: resolve("resources/js/components"),
            composables: resolve("resources/js/composables"),
            layouts: resolve("resources/js/layouts"),
        },
    },
});
