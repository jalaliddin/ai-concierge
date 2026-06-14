import { u as useApi, H as Head, T as Title, M as Meta, V as VContainer } from "./VContainer-CvzQlK5R.js";
import { _ as __nuxt_component_0 } from "./nuxt-link-C-3FqTCY.js";
import { defineComponent, withAsyncContext, computed, ref, withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, withModifiers, isRef, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
import { f as useI18n, g as useLocalePath, c as useRuntimeConfig, _ as _export_sfc } from "../server.mjs";
import { u as useCartStore } from "./forwardRefs-BsiwRHAr.js";
import { V as VBreadcrumbs } from "./VBreadcrumbs-BZOGxRDH.js";
import { a as VIcon, d as VRow, e as VCol, V as VCard, b as VCardText, c as VBtn } from "./VRow-DQkXkPiv.js";
import { V as VSkeletonLoader } from "./VSkeletonLoader-UZ0j__Io.js";
import { V as VSnackbar } from "./VSnackbar-Bc-6RLSI.js";
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
import "./VOverlay-DnwGKld0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { t } = useI18n();
    const localePath = useLocalePath();
    const config = useRuntimeConfig();
    const api = useApi();
    const cartStore = useCartStore();
    const { data, pending } = ([__temp, __restore] = withAsyncContext(() => api.fetchTransfers()), __temp = await __temp, __restore(), __temp);
    const transfers = computed(() => data.value?.data || data.value || []);
    const snack = ref(false);
    function addToCart(transfer) {
      cartStore.addItem({
        id: transfer.id,
        type: "transfer",
        name: transfer.name,
        price: parseFloat(transfer.price_usd),
        currency: "USD",
        quantity: 1,
        slug: transfer.slug
      });
      snack.value = true;
    }
    const breadcrumbs = [
      { title: "Home", href: localePath("/") },
      { title: t("transfers.title"), href: localePath("/transfers") }
    ];
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.title,
        item: `${config.public.siteUrl}${b.href}`
      }))
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = Head;
      const _component_Title = Title;
      const _component_Meta = Meta;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-6869e07b>`);
      _push(ssrRenderComponent(_component_Head, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Title, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("transfers.title"))} | Khiva Tour Guide`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("transfers.title")) + " | Khiva Tour Guide", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Meta, {
              name: "description",
              content: unref(t)("transfers.subtitle")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Meta, {
              property: "og:title",
              content: `${unref(t)("transfers.title")} | Khiva Tour Guide`
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Meta, {
              property: "og:description",
              content: unref(t)("transfers.subtitle")
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Title, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("transfers.title")) + " | Khiva Tour Guide", 1)
                ]),
                _: 1
              }),
              createVNode(_component_Meta, {
                name: "description",
                content: unref(t)("transfers.subtitle")
              }, null, 8, ["content"]),
              createVNode(_component_Meta, {
                property: "og:title",
                content: `${unref(t)("transfers.title")} | Khiva Tour Guide`
              }, null, 8, ["content"]),
              createVNode(_component_Meta, {
                property: "og:description",
                content: unref(t)("transfers.subtitle")
              }, null, 8, ["content"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<script type="application/ld+json" data-v-6869e07b>${JSON.stringify(breadcrumbSchema) ?? ""}<\/script><div class="page-hero" data-v-6869e07b>`);
      _push(ssrRenderComponent(VContainer, { class: "py-12" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBreadcrumbs, {
              items: breadcrumbs,
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
            _push2(`<h1 class="text-h3 font-weight-black text-white mb-2" data-v-6869e07b${_scopeId}>${ssrInterpolate(unref(t)("transfers.title"))}</h1><p class="text-white" style="${ssrRenderStyle({ "opacity": "0.8" })}" data-v-6869e07b${_scopeId}>${ssrInterpolate(unref(t)("transfers.subtitle"))}</p>`);
          } else {
            return [
              createVNode(VBreadcrumbs, {
                items: breadcrumbs,
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
              }),
              createVNode("h1", { class: "text-h3 font-weight-black text-white mb-2" }, toDisplayString(unref(t)("transfers.title")), 1),
              createVNode("p", {
                class: "text-white",
                style: { "opacity": "0.8" }
              }, toDisplayString(unref(t)("transfers.subtitle")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(VContainer, { class: "py-12" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(pending)) {
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(6, (i) => {
                      _push3(ssrRenderComponent(VCol, {
                        key: i,
                        cols: "12",
                        sm: "6",
                        md: "4"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(VSkeletonLoader, {
                              type: "card",
                              rounded: "xl"
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(VSkeletonLoader, {
                                type: "card",
                                rounded: "xl"
                              })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                        return createVNode(VCol, {
                          key: i,
                          cols: "12",
                          sm: "6",
                          md: "4"
                        }, {
                          default: withCtx(() => [
                            createVNode(VSkeletonLoader, {
                              type: "card",
                              rounded: "xl"
                            })
                          ]),
                          _: 1
                        });
                      }), 64))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(transfers), (transfer) => {
                      _push3(ssrRenderComponent(VCol, {
                        key: transfer.id,
                        cols: "12",
                        sm: "6",
                        md: "4"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(VCard, {
                              rounded: "xl",
                              class: "h-100",
                              hover: "",
                              to: unref(localePath)(`/transfers/${transfer.slug}`)
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="card-img d-flex align-center justify-center" data-v-6869e07b${_scopeId4}>`);
                                  _push5(ssrRenderComponent(VIcon, {
                                    size: "56",
                                    color: "white",
                                    style: { "opacity": "0.7" }
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`mdi-car-side`);
                                      } else {
                                        return [
                                          createTextVNode("mdi-car-side")
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(`</div>`);
                                  _push5(ssrRenderComponent(VCardText, { class: "pa-4" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<h2 class="text-body-1 font-weight-bold text-primary mb-1" data-v-6869e07b${_scopeId5}>${ssrInterpolate(transfer.name)}</h2><div class="text-caption text-medium-emphasis mb-1" data-v-6869e07b${_scopeId5}>`);
                                        _push6(ssrRenderComponent(VIcon, { size: "14" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`mdi-map-marker-right`);
                                            } else {
                                              return [
                                                createTextVNode("mdi-map-marker-right")
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(` ${ssrInterpolate(transfer.from_location)} → ${ssrInterpolate(transfer.to_location)}</div><div class="d-flex gap-3 text-caption text-medium-emphasis mb-3" data-v-6869e07b${_scopeId5}><span data-v-6869e07b${_scopeId5}>`);
                                        _push6(ssrRenderComponent(VIcon, { size: "14" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`mdi-account-group`);
                                            } else {
                                              return [
                                                createTextVNode("mdi-account-group")
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(` ${ssrInterpolate(transfer.capacity)} ${ssrInterpolate(unref(t)("transfers.passengers"))}</span>`);
                                        if (transfer.duration_hours) {
                                          _push6(`<span data-v-6869e07b${_scopeId5}>`);
                                          _push6(ssrRenderComponent(VIcon, { size: "14" }, {
                                            default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                _push7(`mdi-clock`);
                                              } else {
                                                return [
                                                  createTextVNode("mdi-clock")
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                          _push6(` ${ssrInterpolate(transfer.duration_hours)}h</span>`);
                                        } else {
                                          _push6(`<!---->`);
                                        }
                                        _push6(`</div><div class="d-flex align-center justify-space-between" data-v-6869e07b${_scopeId5}><span class="text-h6 font-weight-black text-primary" data-v-6869e07b${_scopeId5}>$${ssrInterpolate(transfer.price_usd)}</span>`);
                                        _push6(ssrRenderComponent(VBtn, {
                                          color: "cta",
                                          size: "small",
                                          rounded: "lg",
                                          onClick: ($event) => addToCart(transfer)
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(unref(t)("cart.add"))}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(unref(t)("cart.add")), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(`</div>`);
                                      } else {
                                        return [
                                          createVNode("h2", { class: "text-body-1 font-weight-bold text-primary mb-1" }, toDisplayString(transfer.name), 1),
                                          createVNode("div", { class: "text-caption text-medium-emphasis mb-1" }, [
                                            createVNode(VIcon, { size: "14" }, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-map-marker-right")
                                              ]),
                                              _: 1
                                            }),
                                            createTextVNode(" " + toDisplayString(transfer.from_location) + " → " + toDisplayString(transfer.to_location), 1)
                                          ]),
                                          createVNode("div", { class: "d-flex gap-3 text-caption text-medium-emphasis mb-3" }, [
                                            createVNode("span", null, [
                                              createVNode(VIcon, { size: "14" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("mdi-account-group")
                                                ]),
                                                _: 1
                                              }),
                                              createTextVNode(" " + toDisplayString(transfer.capacity) + " " + toDisplayString(unref(t)("transfers.passengers")), 1)
                                            ]),
                                            transfer.duration_hours ? (openBlock(), createBlock("span", { key: 0 }, [
                                              createVNode(VIcon, { size: "14" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("mdi-clock")
                                                ]),
                                                _: 1
                                              }),
                                              createTextVNode(" " + toDisplayString(transfer.duration_hours) + "h", 1)
                                            ])) : createCommentVNode("", true)
                                          ]),
                                          createVNode("div", { class: "d-flex align-center justify-space-between" }, [
                                            createVNode("span", { class: "text-h6 font-weight-black text-primary" }, "$" + toDisplayString(transfer.price_usd), 1),
                                            createVNode(VBtn, {
                                              color: "cta",
                                              size: "small",
                                              rounded: "lg",
                                              onClick: withModifiers(($event) => addToCart(transfer), ["prevent"])
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(unref(t)("cart.add")), 1)
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"])
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode("div", { class: "card-img d-flex align-center justify-center" }, [
                                      createVNode(VIcon, {
                                        size: "56",
                                        color: "white",
                                        style: { "opacity": "0.7" }
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-car-side")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    createVNode(VCardText, { class: "pa-4" }, {
                                      default: withCtx(() => [
                                        createVNode("h2", { class: "text-body-1 font-weight-bold text-primary mb-1" }, toDisplayString(transfer.name), 1),
                                        createVNode("div", { class: "text-caption text-medium-emphasis mb-1" }, [
                                          createVNode(VIcon, { size: "14" }, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-map-marker-right")
                                            ]),
                                            _: 1
                                          }),
                                          createTextVNode(" " + toDisplayString(transfer.from_location) + " → " + toDisplayString(transfer.to_location), 1)
                                        ]),
                                        createVNode("div", { class: "d-flex gap-3 text-caption text-medium-emphasis mb-3" }, [
                                          createVNode("span", null, [
                                            createVNode(VIcon, { size: "14" }, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-account-group")
                                              ]),
                                              _: 1
                                            }),
                                            createTextVNode(" " + toDisplayString(transfer.capacity) + " " + toDisplayString(unref(t)("transfers.passengers")), 1)
                                          ]),
                                          transfer.duration_hours ? (openBlock(), createBlock("span", { key: 0 }, [
                                            createVNode(VIcon, { size: "14" }, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-clock")
                                              ]),
                                              _: 1
                                            }),
                                            createTextVNode(" " + toDisplayString(transfer.duration_hours) + "h", 1)
                                          ])) : createCommentVNode("", true)
                                        ]),
                                        createVNode("div", { class: "d-flex align-center justify-space-between" }, [
                                          createVNode("span", { class: "text-h6 font-weight-black text-primary" }, "$" + toDisplayString(transfer.price_usd), 1),
                                          createVNode(VBtn, {
                                            color: "cta",
                                            size: "small",
                                            rounded: "lg",
                                            onClick: withModifiers(($event) => addToCart(transfer), ["prevent"])
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(unref(t)("cart.add")), 1)
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"])
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(VCard, {
                                rounded: "xl",
                                class: "h-100",
                                hover: "",
                                to: unref(localePath)(`/transfers/${transfer.slug}`)
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "card-img d-flex align-center justify-center" }, [
                                    createVNode(VIcon, {
                                      size: "56",
                                      color: "white",
                                      style: { "opacity": "0.7" }
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-car-side")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  createVNode(VCardText, { class: "pa-4" }, {
                                    default: withCtx(() => [
                                      createVNode("h2", { class: "text-body-1 font-weight-bold text-primary mb-1" }, toDisplayString(transfer.name), 1),
                                      createVNode("div", { class: "text-caption text-medium-emphasis mb-1" }, [
                                        createVNode(VIcon, { size: "14" }, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-map-marker-right")
                                          ]),
                                          _: 1
                                        }),
                                        createTextVNode(" " + toDisplayString(transfer.from_location) + " → " + toDisplayString(transfer.to_location), 1)
                                      ]),
                                      createVNode("div", { class: "d-flex gap-3 text-caption text-medium-emphasis mb-3" }, [
                                        createVNode("span", null, [
                                          createVNode(VIcon, { size: "14" }, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-account-group")
                                            ]),
                                            _: 1
                                          }),
                                          createTextVNode(" " + toDisplayString(transfer.capacity) + " " + toDisplayString(unref(t)("transfers.passengers")), 1)
                                        ]),
                                        transfer.duration_hours ? (openBlock(), createBlock("span", { key: 0 }, [
                                          createVNode(VIcon, { size: "14" }, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-clock")
                                            ]),
                                            _: 1
                                          }),
                                          createTextVNode(" " + toDisplayString(transfer.duration_hours) + "h", 1)
                                        ])) : createCommentVNode("", true)
                                      ]),
                                      createVNode("div", { class: "d-flex align-center justify-space-between" }, [
                                        createVNode("span", { class: "text-h6 font-weight-black text-primary" }, "$" + toDisplayString(transfer.price_usd), 1),
                                        createVNode(VBtn, {
                                          color: "cta",
                                          size: "small",
                                          rounded: "lg",
                                          onClick: withModifiers(($event) => addToCart(transfer), ["prevent"])
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(unref(t)("cart.add")), 1)
                                          ]),
                                          _: 1
                                        }, 8, ["onClick"])
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1032, ["to"])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(transfers), (transfer) => {
                        return openBlock(), createBlock(VCol, {
                          key: transfer.id,
                          cols: "12",
                          sm: "6",
                          md: "4"
                        }, {
                          default: withCtx(() => [
                            createVNode(VCard, {
                              rounded: "xl",
                              class: "h-100",
                              hover: "",
                              to: unref(localePath)(`/transfers/${transfer.slug}`)
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "card-img d-flex align-center justify-center" }, [
                                  createVNode(VIcon, {
                                    size: "56",
                                    color: "white",
                                    style: { "opacity": "0.7" }
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-car-side")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode(VCardText, { class: "pa-4" }, {
                                  default: withCtx(() => [
                                    createVNode("h2", { class: "text-body-1 font-weight-bold text-primary mb-1" }, toDisplayString(transfer.name), 1),
                                    createVNode("div", { class: "text-caption text-medium-emphasis mb-1" }, [
                                      createVNode(VIcon, { size: "14" }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-map-marker-right")
                                        ]),
                                        _: 1
                                      }),
                                      createTextVNode(" " + toDisplayString(transfer.from_location) + " → " + toDisplayString(transfer.to_location), 1)
                                    ]),
                                    createVNode("div", { class: "d-flex gap-3 text-caption text-medium-emphasis mb-3" }, [
                                      createVNode("span", null, [
                                        createVNode(VIcon, { size: "14" }, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-account-group")
                                          ]),
                                          _: 1
                                        }),
                                        createTextVNode(" " + toDisplayString(transfer.capacity) + " " + toDisplayString(unref(t)("transfers.passengers")), 1)
                                      ]),
                                      transfer.duration_hours ? (openBlock(), createBlock("span", { key: 0 }, [
                                        createVNode(VIcon, { size: "14" }, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-clock")
                                          ]),
                                          _: 1
                                        }),
                                        createTextVNode(" " + toDisplayString(transfer.duration_hours) + "h", 1)
                                      ])) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "d-flex align-center justify-space-between" }, [
                                      createVNode("span", { class: "text-h6 font-weight-black text-primary" }, "$" + toDisplayString(transfer.price_usd), 1),
                                      createVNode(VBtn, {
                                        color: "cta",
                                        size: "small",
                                        rounded: "lg",
                                        onClick: withModifiers(($event) => addToCart(transfer), ["prevent"])
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(t)("cart.add")), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])
                                    ])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1032, ["to"])
                          ]),
                          _: 2
                        }, 1024);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
          } else {
            return [
              unref(pending) ? (openBlock(), createBlock(VRow, { key: 0 }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                    return createVNode(VCol, {
                      key: i,
                      cols: "12",
                      sm: "6",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode(VSkeletonLoader, {
                          type: "card",
                          rounded: "xl"
                        })
                      ]),
                      _: 1
                    });
                  }), 64))
                ]),
                _: 1
              })) : (openBlock(), createBlock(VRow, { key: 1 }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(transfers), (transfer) => {
                    return openBlock(), createBlock(VCol, {
                      key: transfer.id,
                      cols: "12",
                      sm: "6",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode(VCard, {
                          rounded: "xl",
                          class: "h-100",
                          hover: "",
                          to: unref(localePath)(`/transfers/${transfer.slug}`)
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "card-img d-flex align-center justify-center" }, [
                              createVNode(VIcon, {
                                size: "56",
                                color: "white",
                                style: { "opacity": "0.7" }
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("mdi-car-side")
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode(VCardText, { class: "pa-4" }, {
                              default: withCtx(() => [
                                createVNode("h2", { class: "text-body-1 font-weight-bold text-primary mb-1" }, toDisplayString(transfer.name), 1),
                                createVNode("div", { class: "text-caption text-medium-emphasis mb-1" }, [
                                  createVNode(VIcon, { size: "14" }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-map-marker-right")
                                    ]),
                                    _: 1
                                  }),
                                  createTextVNode(" " + toDisplayString(transfer.from_location) + " → " + toDisplayString(transfer.to_location), 1)
                                ]),
                                createVNode("div", { class: "d-flex gap-3 text-caption text-medium-emphasis mb-3" }, [
                                  createVNode("span", null, [
                                    createVNode(VIcon, { size: "14" }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-account-group")
                                      ]),
                                      _: 1
                                    }),
                                    createTextVNode(" " + toDisplayString(transfer.capacity) + " " + toDisplayString(unref(t)("transfers.passengers")), 1)
                                  ]),
                                  transfer.duration_hours ? (openBlock(), createBlock("span", { key: 0 }, [
                                    createVNode(VIcon, { size: "14" }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-clock")
                                      ]),
                                      _: 1
                                    }),
                                    createTextVNode(" " + toDisplayString(transfer.duration_hours) + "h", 1)
                                  ])) : createCommentVNode("", true)
                                ]),
                                createVNode("div", { class: "d-flex align-center justify-space-between" }, [
                                  createVNode("span", { class: "text-h6 font-weight-black text-primary" }, "$" + toDisplayString(transfer.price_usd), 1),
                                  createVNode(VBtn, {
                                    color: "cta",
                                    size: "small",
                                    rounded: "lg",
                                    onClick: withModifiers(($event) => addToCart(transfer), ["prevent"])
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(t)("cart.add")), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ])
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1032, ["to"])
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ]),
                _: 1
              }))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VSnackbar, {
        modelValue: unref(snack),
        "onUpdate:modelValue": ($event) => isRef(snack) ? snack.value = $event : null,
        color: "success",
        timeout: "2000",
        location: "bottom right",
        rounded: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("cart.added"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("cart.added")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/transfers/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6869e07b"]]);
export {
  index as default
};
//# sourceMappingURL=index-ydWsMqGK.js.map
