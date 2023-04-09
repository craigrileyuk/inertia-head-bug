import { createSSRApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import DefaultLayout from "layouts/Default.vue";
import { registerComponents } from "./setup";

createInertiaApp({
    resolve: async (name) => {
        const pages = import.meta.glob("./pages/**/*.vue", { eager: false });
        let page = await pages[`./pages/${name}.vue`]();
        page.default.layout = page.default.layout || DefaultLayout;
        return page;
    },
    setup({ el, App, props, plugin }) {
        createSSRApp({ render: () => h(App, props) })
            .use(plugin)
            .use(registerComponents, {
                namespace: "",
            })
            .mount(el);
    },
});
