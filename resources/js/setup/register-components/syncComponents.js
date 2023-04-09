import { resolveName, validateComponent } from "./index";

export const registerSync = (app, options) => {
    const prefix = options.namespace || "";

    const components = import.meta.glob("../../components/sync/**/*.vue", {
        eager: true,
    });
    for (const component in components) {
        const name = resolveName(component);
        const isValid = validateComponent(name);
        if (!isValid) continue;

        app.component(`${prefix}${name}`, components[component].default);
    }
};
