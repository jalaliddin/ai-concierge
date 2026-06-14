import { u as useApi, H as Head, T as Title, M as Meta, V as VContainer } from "./VContainer-CvzQlK5R.js";
import { _ as __nuxt_component_0 } from "./nuxt-link-C-3FqTCY.js";
import { defineComponent, withAsyncContext, computed, unref, withCtx, createTextVNode, toDisplayString, createVNode, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { f as useI18n, g as useLocalePath, a4 as useRoute, c as useRuntimeConfig, _ as _export_sfc } from "../server.mjs";
import { V as VBreadcrumbs } from "./VBreadcrumbs-BZOGxRDH.js";
import { a as VIcon, d as VRow, e as VCol, V as VCard, b as VCardText, c as VBtn, _ as VProgressCircular } from "./VRow-DQkXkPiv.js";
import "/home/eversoft/Projects/khivatourguide.com/app/landing/node_modules/ohash/dist/index.mjs";
import "@vue/shared";
import "/home/eversoft/Projects/khivatourguide.com/app/landing/node_modules/perfect-debounce/dist/index.mjs";
import "/home/eversoft/Projects/khivatourguide.com/app/landing/node_modules/ufo/dist/index.mjs";
import "/home/eversoft/Projects/khivatourguide.com/app/landing/node_modules/defu/dist/defu.mjs";
import "/home/eversoft/Projects/khivatourguide.com/app/landing/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/home/eversoft/Projects/khivatourguide.com/app/landing/node_modules/hookable/dist/index.mjs";
import "/home/eversoft/Projects/khivatourguide.com/app/landing/node_modules/unctx/dist/index.mjs";
import "/home/eversoft/Projects/khivatourguide.com/app/landing/node_modules/h3/dist/index.mjs";
import "pinia";
import "@vue/devtools-api";
import "vue-router";
import "/home/eversoft/Projects/khivatourguide.com/app/landing/node_modules/klona/dist/index.mjs";
import "/home/eversoft/Projects/khivatourguide.com/app/landing/node_modules/@unhead/vue/dist/index.mjs";
import "/home/eversoft/Projects/khivatourguide.com/app/landing/node_modules/consola/dist/index.mjs";
import "/home/eversoft/Projects/khivatourguide.com/app/landing/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/home/eversoft/Projects/khivatourguide.com/app/landing/node_modules/destr/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { t } = useI18n();
    const localePath = useLocalePath();
    const route = useRoute();
    const config = useRuntimeConfig();
    const api = useApi();
    const { data, pending } = ([__temp, __restore] = withAsyncContext(() => api.fetchPost(route.params.slug)), __temp = await __temp, __restore(), __temp);
    const post = computed(() => data.value?.data || data.value);
    const breadcrumbs = computed(() => [
      { title: "Home", href: localePath("/") },
      { title: t("blog.title"), href: localePath("/blog") },
      { title: post.value?.title || "", href: "" }
    ]);
    const articleSchema = computed(() => post.value ? {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.value.title,
      description: post.value.excerpt,
      datePublished: post.value.published_at || post.value.created_at,
      publisher: {
        "@type": "Organization",
        name: "Khiva Tour Guide",
        url: config.public.siteUrl
      }
    } : {});
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = Head;
      const _component_Title = Title;
      const _component_Meta = Meta;
      const _component_NuxtLink = __nuxt_component_0;
      if (unref(post)) {
        _push(`<div${ssrRenderAttrs(_attrs)} data-v-c179ebbd>`);
        _push(ssrRenderComponent(_component_Head, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Title, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(post).meta_title || unref(post).title)} | Khiva Tour Guide`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(post).meta_title || unref(post).title) + " | Khiva Tour Guide", 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Meta, {
                name: "description",
                content: unref(post).meta_description || unref(post).excerpt
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Meta, {
                property: "og:title",
                content: unref(post).meta_title || unref(post).title
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Meta, {
                property: "og:description",
                content: unref(post).meta_description || unref(post).excerpt
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Meta, {
                property: "og:type",
                content: "article"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Title, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(post).meta_title || unref(post).title) + " | Khiva Tour Guide", 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_Meta, {
                  name: "description",
                  content: unref(post).meta_description || unref(post).excerpt
                }, null, 8, ["content"]),
                createVNode(_component_Meta, {
                  property: "og:title",
                  content: unref(post).meta_title || unref(post).title
                }, null, 8, ["content"]),
                createVNode(_component_Meta, {
                  property: "og:description",
                  content: unref(post).meta_description || unref(post).excerpt
                }, null, 8, ["content"]),
                createVNode(_component_Meta, {
                  property: "og:type",
                  content: "article"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<script type="application/ld+json" data-v-c179ebbd>${JSON.stringify(unref(articleSchema)) ?? ""}<\/script><div class="page-hero" data-v-c179ebbd>`);
        _push(ssrRenderComponent(VContainer, { class: "py-10" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VBreadcrumbs, {
                items: unref(breadcrumbs),
                class: "pa-0 mb-4"
              }, {
                divider: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VIcon, {
                      size: "16",
                      color: "rgba(255,255,255,0.5)"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`mdi-chevron-right`);
                        } else {
                          return [
                            createTextVNode("mdi-chevron-right")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VIcon, {
                        size: "16",
                        color: "rgba(255,255,255,0.5)"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("mdi-chevron-right")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                title: withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_NuxtLink, {
                      to: item.href,
                      class: "text-white text-decoration-none",
                      style: { "opacity": "0.8" }
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(item.title)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(item.title), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_NuxtLink, {
                        to: item.href,
                        class: "text-white text-decoration-none",
                        style: { "opacity": "0.8" }
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(item.title), 1)
                        ]),
                        _: 2
                      }, 1032, ["to"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="text-caption text-white mb-2" style="${ssrRenderStyle({ "opacity": "0.7" })}" data-v-c179ebbd${_scopeId}>${ssrInterpolate(new Date(unref(post).published_at || unref(post).created_at).toLocaleDateString())}</div><h1 class="text-h3 font-weight-black text-white" data-v-c179ebbd${_scopeId}>${ssrInterpolate(unref(post).title)}</h1>`);
            } else {
              return [
                createVNode(VBreadcrumbs, {
                  items: unref(breadcrumbs),
                  class: "pa-0 mb-4"
                }, {
                  divider: withCtx(() => [
                    createVNode(VIcon, {
                      size: "16",
                      color: "rgba(255,255,255,0.5)"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("mdi-chevron-right")
                      ]),
                      _: 1
                    })
                  ]),
                  title: withCtx(({ item }) => [
                    createVNode(_component_NuxtLink, {
                      to: item.href,
                      class: "text-white text-decoration-none",
                      style: { "opacity": "0.8" }
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(item.title), 1)
                      ]),
                      _: 2
                    }, 1032, ["to"])
                  ]),
                  _: 1
                }, 8, ["items"]),
                createVNode("div", {
                  class: "text-caption text-white mb-2",
                  style: { "opacity": "0.7" }
                }, toDisplayString(new Date(unref(post).published_at || unref(post).created_at).toLocaleDateString()), 1),
                createVNode("h1", { class: "text-h3 font-weight-black text-white" }, toDisplayString(unref(post).title), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(VContainer, { class: "py-12" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VRow, { justify: "center" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "8"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VCard, { rounded: "xl" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VCardText, { class: "pa-8" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="post-body text-body-1" style="${ssrRenderStyle({ "line-height": "1.9", "white-space": "pre-wrap" })}" data-v-c179ebbd${_scopeId5}>${ssrInterpolate(unref(post).body)}</div>`);
                                    } else {
                                      return [
                                        createVNode("div", {
                                          class: "post-body text-body-1",
                                          style: { "line-height": "1.9", "white-space": "pre-wrap" }
                                        }, toDisplayString(unref(post).body), 1)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VCardText, { class: "pa-8" }, {
                                    default: withCtx(() => [
                                      createVNode("div", {
                                        class: "post-body text-body-1",
                                        style: { "line-height": "1.9", "white-space": "pre-wrap" }
                                      }, toDisplayString(unref(post).body), 1)
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`<div class="mt-8" data-v-c179ebbd${_scopeId3}>`);
                          _push4(ssrRenderComponent(VBtn, {
                            to: unref(localePath)("/blog"),
                            variant: "outlined",
                            color: "primary",
                            rounded: "lg"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` ← ${ssrInterpolate(unref(t)("blog.title"))}`);
                              } else {
                                return [
                                  createTextVNode(" ← " + toDisplayString(unref(t)("blog.title")), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode(VCard, { rounded: "xl" }, {
                              default: withCtx(() => [
                                createVNode(VCardText, { class: "pa-8" }, {
                                  default: withCtx(() => [
                                    createVNode("div", {
                                      class: "post-body text-body-1",
                                      style: { "line-height": "1.9", "white-space": "pre-wrap" }
                                    }, toDisplayString(unref(post).body), 1)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "mt-8" }, [
                              createVNode(VBtn, {
                                to: unref(localePath)("/blog"),
                                variant: "outlined",
                                color: "primary",
                                rounded: "lg"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" ← " + toDisplayString(unref(t)("blog.title")), 1)
                                ]),
                                _: 1
                              }, 8, ["to"])
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, {
                        cols: "12",
                        md: "8"
                      }, {
                        default: withCtx(() => [
                          createVNode(VCard, { rounded: "xl" }, {
                            default: withCtx(() => [
                              createVNode(VCardText, { class: "pa-8" }, {
                                default: withCtx(() => [
                                  createVNode("div", {
                                    class: "post-body text-body-1",
                                    style: { "line-height": "1.9", "white-space": "pre-wrap" }
                                  }, toDisplayString(unref(post).body), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "mt-8" }, [
                            createVNode(VBtn, {
                              to: unref(localePath)("/blog"),
                              variant: "outlined",
                              color: "primary",
                              rounded: "lg"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" ← " + toDisplayString(unref(t)("blog.title")), 1)
                              ]),
                              _: 1
                            }, 8, ["to"])
                          ])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(VRow, { justify: "center" }, {
                  default: withCtx(() => [
                    createVNode(VCol, {
                      cols: "12",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(VCard, { rounded: "xl" }, {
                          default: withCtx(() => [
                            createVNode(VCardText, { class: "pa-8" }, {
                              default: withCtx(() => [
                                createVNode("div", {
                                  class: "post-body text-body-1",
                                  style: { "line-height": "1.9", "white-space": "pre-wrap" }
                                }, toDisplayString(unref(post).body), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "mt-8" }, [
                          createVNode(VBtn, {
                            to: unref(localePath)("/blog"),
                            variant: "outlined",
                            color: "primary",
                            rounded: "lg"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" ← " + toDisplayString(unref(t)("blog.title")), 1)
                            ]),
                            _: 1
                          }, 8, ["to"])
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (unref(pending)) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "d-flex justify-center align-center",
          style: { "min-height": "50vh" }
        }, _attrs))} data-v-c179ebbd>`);
        _push(ssrRenderComponent(VProgressCircular, {
          indeterminate: "",
          color: "primary"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-center py-20" }, _attrs))} data-v-c179ebbd>`);
        _push(ssrRenderComponent(VIcon, {
          size: "64",
          color: "grey"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`mdi-alert-circle`);
            } else {
              return [
                createTextVNode("mdi-alert-circle")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<p class="text-h6 mt-4" data-v-c179ebbd>Maqola topilmadi</p>`);
        _push(ssrRenderComponent(VBtn, {
          to: unref(localePath)("/blog"),
          color: "primary",
          class: "mt-4"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`← Orqaga`);
            } else {
              return [
                createTextVNode("← Orqaga")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c179ebbd"]]);
export {
  _slug_ as default
};
//# sourceMappingURL=_slug_-DpOg6x85.js.map
