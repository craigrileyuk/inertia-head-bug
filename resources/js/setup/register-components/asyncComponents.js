import { defineAsyncComponent } from "vue";
import { resolveName, validateComponent } from "./index";

const resolveLoadingComponent = (component, loadingComponents) => {
    const path = component.replace(/\.vue$/, "Loading.vue");
    return loadingComponents[path];
};

export const registerAsync = (app, options) => {
    const prefix = options.namespace || "";

    const components = import.meta.glob([
        "../../components/async/**/*.vue",
        "!../../components/async/**/*Loading.vue",
    ]);
    const loadingComponents = import.meta.glob(
        "../../components/async/**/*Loading.vue",
        { eager: true }
    );

    for (const component in components) {
        const name = resolveName(component);
        const isValid = validateComponent(name);
        if (!isValid) continue;

        const loadingComponent = resolveLoadingComponent(
            component,
            loadingComponents
        );

        if (loadingComponent) {
            app.component(
                `${prefix}${name}`,
                defineAsyncComponent({
                    loader: components[component],
                    loadingComponent: loadingComponent.default,
                    delay: 100,
                })
            );
        } else {
            app.component(
                `${prefix}${name}`,
                defineAsyncComponent(components[component])
            );
        }
    }
};
