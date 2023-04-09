import { unref, withCtx, createVNode, useSSRContext, defineAsyncComponent, defineCustomElement, createSSRApp, h } from "vue";
import { ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { Head, createInertiaApp } from "@inertiajs/vue3";
import createServer from "@inertiajs/vue3/server";
import { renderToString } from "@vue/server-renderer";
import { kebabCase } from "lodash-es";
import Vue3Icon from "vue3-icon";
const _sfc_main$1 = {
  __name: "Home",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>This is the title</title><meta name="description" content="Your page description"${_scopeId}><link rel="icon" type="image/svg+xml" href="/favicon.svg"${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, "This is the title"),
              createVNode("meta", {
                name: "description",
                content: "Your page description"
              }),
              createVNode("link", {
                rel: "icon",
                type: "image/svg+xml",
                href: "/favicon.svg"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="container mx-auto font-sans">This is the Home Page</div><!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Home.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1
}, Symbol.toStringTag, { value: "Module" }));
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><header class="bg-blue-800"><div class="container mx-auto text-white py-4">Header</div></header><main class="grow">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main><footer class="bg-slate-800"><div class="container mx-auto text-white py-4">Header</div></footer><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/layouts/Default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const DefaultLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
const app = "";
const resolveLoadingComponent = (component, loadingComponents) => {
  const path = component.replace(/\.vue$/, "Loading.vue");
  return loadingComponents[path];
};
const registerAsync = (app2, options) => {
  const prefix = options.namespace || "";
  const components = /* @__PURE__ */ Object.assign({});
  const loadingComponents = /* @__PURE__ */ Object.assign({});
  for (const component in components) {
    const name = resolveName(component);
    const isValid = validateComponent(name);
    if (!isValid)
      continue;
    const loadingComponent = resolveLoadingComponent(
      component,
      loadingComponents
    );
    if (loadingComponent) {
      app2.component(
        `${prefix}${name}`,
        defineAsyncComponent({
          loader: components[component],
          loadingComponent: loadingComponent.default,
          delay: 100
        })
      );
    } else {
      app2.component(
        `${prefix}${name}`,
        defineAsyncComponent(components[component])
      );
    }
  }
};
const registerSync = (app2, options) => {
  const prefix = options.namespace || "";
  const components = /* @__PURE__ */ Object.assign({});
  for (const component in components) {
    const name = resolveName(component);
    const isValid = validateComponent(name);
    if (!isValid)
      continue;
    app2.component(`${prefix}${name}`, components[component].default);
  }
};
const registerWeb = () => {
  const components = /* @__PURE__ */ Object.assign({});
  for (const component in components) {
    const name = resolveName(component, { kebab: true });
    const isValid = validateComponent(name);
    if (!isValid)
      continue;
    const customElement = defineCustomElement(components[component].default);
    customElements.define("bbe-" + name, customElement);
  }
};
const registerGlobal = (app2) => {
  app2.component("SvgIcon", Vue3Icon);
};
const resolveName = (component, config = {}) => {
  let name = component.match(/(?:^.*?(?:a?sync|web)\/)(.*?)(?:\.vue$)/i);
  if (!name || !name[1])
    return null;
  name = name[1].replace(/(^[a-z]|\/[a-z])/g, (value) => {
    return value.toUpperCase();
  }).replaceAll("/", "");
  if (config.kebab)
    return kebabCase(name);
  else
    return name;
};
const validateComponent = (name) => {
  if (!name)
    return false;
  else if (/loading$/i.test(name) === true)
    return false;
  else
    return true;
};
const registerComponents = {
  install: (app2, options) => {
    registerGlobal(app2);
    registerAsync(app2, options);
    registerSync(app2, options);
    registerWeb();
  }
};
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./pages/Home.vue": __vite_glob_0_0 });
      let page2 = pages[`./pages/${name}.vue`];
      page2.default.layout = page2.default.layout || DefaultLayout;
      return page2;
    },
    setup({ App, props, plugin }) {
      return createSSRApp({
        render: () => h(App, props)
      }).use(plugin).use(registerComponents, {
        namespace: ""
      });
    }
  })
);
