import { resolveName, validateComponent } from "./index";
import { defineCustomElement } from "vue";

export const registerWeb = () => {
  const components = import.meta.glob("../../components/web/**/*.vue", {
    eager: true,
  });
  for (const component in components) {
    const name = resolveName(component, { kebab: true });
    const isValid = validateComponent(name);
    if (!isValid) continue;

    const customElement = defineCustomElement(components[component].default);
    customElements.define("bbe-" + name, customElement);
  }
};
