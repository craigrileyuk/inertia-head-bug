import { createInertiaApp } from "@inertiajs/vue3";
import createServer from "@inertiajs/vue3/server";
import { renderToString } from "@vue/server-renderer";
import { createSSRApp, h } from "vue";
import DefaultLayout from "layouts/Default.vue";
import { registerComponents } from "./setup";

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        resolve: (name) => {
            const pages = import.meta.glob("./pages/**/*.vue", { eager: true });
            let page = pages[`./pages/${name}.vue`];
            page.default.layout = page.default.layout || DefaultLayout;
            return page;
        },
        setup({ App, props, plugin }) {
            return createSSRApp({
                render: () => h(App, props),
            })
                .use(plugin)
                .use(registerComponents, {
                    namespace: "",
                });
        },
    })
);
