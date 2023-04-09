import { kebabCase } from "lodash-es";
import { registerAsync } from "./asyncComponents";
import { registerSync } from "./syncComponents";
import { registerWeb } from "./webComponents";
import { registerGlobal } from "./globalComponents";

export const resolveName = (component, config = {}) => {
    let name = component.match(/(?:^.*?(?:a?sync|web)\/)(.*?)(?:\.vue$)/i);
    if (!name || !name[1]) return null;
    name = name[1]
        .replace(/(^[a-z]|\/[a-z])/g, (value) => {
            return value.toUpperCase();
        })
        .replaceAll("/", "");

    if (config.kebab) return kebabCase(name);
    else return name;
};

export const validateComponent = (name) => {
    if (!name) return false;
    else if (/loading$/i.test(name) === true) return false;
    else return true;
};

export const registerComponents = {
    install: (app, options) => {
        registerGlobal(app);
        registerAsync(app, options);
        registerSync(app, options);
        registerWeb();
    },
};
