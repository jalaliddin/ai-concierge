import { u as useApi, H as Head, T as Title, M as Meta, V as VContainer } from './VContainer-CvzQlK5R.mjs';
import { defineComponent, withAsyncContext, computed, ref, withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, withModifiers, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc, f as useI18n, g as useLocalePath, c as useRuntimeConfig } from './server.mjs';
import { u as useCartStore } from './forwardRefs-BsiwRHAr.mjs';
import { V as VChip } from './VChip-ChK3lbKv.mjs';
import { V as VRow, a as VCol, c as VCard, d as VIcon, e as VCardText, b as VBtn } from './VRow-DQkXkPiv.mjs';
import { V as VSkeletonLoader } from './VSkeletonLoader-UZ0j__Io.mjs';
import { V as VSnackbar } from './VSnackbar-Bc-6RLSI.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'consola';
import 'vue-router';
import 'node:url';
import '@vue/shared';
import 'perfect-debounce';
import 'pinia';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import './index-wObflqc9.mjs';
import './VOverlay-DnwGKld0.mjs';

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
    const { data, pending } = ([__temp, __restore] = withAsyncContext(() => api.fetchServices()), __temp = await __temp, __restore(), __temp);
    const services = computed(() => {
      var _a;
      return ((_a = data.value) == null ? void 0 : _a.data) || data.value || [];
    });
    const activeCategory = ref("");
    const snack = ref(false);
    const categories = computed(() => {
      const cats = /* @__PURE__ */ new Set();
      services.value.forEach((s) => {
        if (s.category) cats.add(s.category);
      });
      return [
        { value: "", label: t("services.all") },
        ...[...cats].map((c) => ({ value: c, label: c }))
      ];
    });
    const filteredServices = computed(
      () => activeCategory.value ? services.value.filter((s) => s.category === activeCategory.value) : services.value
    );
    function addToCart(service) {
      cartStore.addItem({
        id: service.id,
        type: "service",
        name: service.name,
        price: parseFloat(service.price_usd),
        currency: "USD",
        quantity: 1,
        slug: service.slug
      });
      snack.value = true;
    }
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${config.public.siteUrl}${localePath("/")}` },
        { "@type": "ListItem", position: 2, name: t("services.title"), item: `${config.public.siteUrl}${localePath("/services")}` }
      ]
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Head = Head;
      const _component_Title = Title;
      const _component_Meta = Meta;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-0666a05b>`);
      _push(ssrRenderComponent(_component_Head, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Title, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("services.title"))} | Khiva Tour Guide`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("services.title")) + " | Khiva Tour Guide", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Meta, {
              name: "description",
              content: unref(t)("services.subtitle")
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Title, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("services.title")) + " | Khiva Tour Guide", 1)
                ]),
                _: 1
              }),
              createVNode(_component_Meta, {
                name: "description",
                content: unref(t)("services.subtitle")
              }, null, 8, ["content"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<script type="application/ld+json" data-v-0666a05b>${(_a = JSON.stringify(breadcrumbSchema)) != null ? _a : ""}<\/script><div class="page-hero" data-v-0666a05b>`);
      _push(ssrRenderComponent(VContainer, { class: "py-12" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="text-h3 font-weight-black text-white mb-2" data-v-0666a05b${_scopeId}>${ssrInterpolate(unref(t)("services.title"))}</h1><p class="text-white" style="${ssrRenderStyle({ "opacity": "0.8" })}" data-v-0666a05b${_scopeId}>${ssrInterpolate(unref(t)("services.subtitle"))}</p>`);
          } else {
            return [
              createVNode("h1", { class: "text-h3 font-weight-black text-white mb-2" }, toDisplayString(unref(t)("services.title")), 1),
              createVNode("p", {
                class: "text-white",
                style: { "opacity": "0.8" }
              }, toDisplayString(unref(t)("services.subtitle")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(VContainer, { class: "py-12" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="d-flex gap-2 flex-wrap mb-8" data-v-0666a05b${_scopeId}><!--[-->`);
            ssrRenderList(unref(categories), (cat) => {
              _push2(ssrRenderComponent(VChip, {
                key: cat.value,
                color: unref(activeCategory) === cat.value ? "primary" : "default",
                variant: unref(activeCategory) === cat.value ? "flat" : "outlined",
                onClick: ($event) => activeCategory.value = cat.value,
                class: "cursor-pointer"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(cat.label)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(cat.label), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
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
                    ssrRenderList(unref(filteredServices), (service) => {
                      _push3(ssrRenderComponent(VCol, {
                        key: service.id,
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
                              to: unref(localePath)(`/services/${service.slug}`)
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="card-img d-flex align-center justify-center" data-v-0666a05b${_scopeId4}>`);
                                  _push5(ssrRenderComponent(VIcon, {
                                    size: "56",
                                    color: "white",
                                    style: { "opacity": "0.7" }
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`mdi-map-marker-star`);
                                      } else {
                                        return [
                                          createTextVNode("mdi-map-marker-star")
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(`</div>`);
                                  _push5(ssrRenderComponent(VCardText, { class: "pa-4" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(VChip, {
                                          size: "x-small",
                                          color: "accent",
                                          variant: "flat",
                                          class: "mb-2"
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(service.category)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(service.category), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(`<h2 class="text-body-1 font-weight-bold text-primary mb-2 text-wrap" data-v-0666a05b${_scopeId5}>${ssrInterpolate(service.name)}</h2><p class="text-caption text-medium-emphasis mb-3" style="${ssrRenderStyle({ "display": "-webkit-box", "-webkit-line-clamp": "2", "-webkit-box-orient": "vertical", "overflow": "hidden" })}" data-v-0666a05b${_scopeId5}>${ssrInterpolate(service.description)}</p><div class="d-flex align-center justify-space-between" data-v-0666a05b${_scopeId5}><span class="text-h6 font-weight-black text-primary" data-v-0666a05b${_scopeId5}>$${ssrInterpolate(service.price_usd)}</span>`);
                                        _push6(ssrRenderComponent(VBtn, {
                                          color: "cta",
                                          size: "small",
                                          rounded: "lg",
                                          onClick: ($event) => addToCart(service)
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
                                          createVNode(VChip, {
                                            size: "x-small",
                                            color: "accent",
                                            variant: "flat",
                                            class: "mb-2"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(service.category), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode("h2", { class: "text-body-1 font-weight-bold text-primary mb-2 text-wrap" }, toDisplayString(service.name), 1),
                                          createVNode("p", {
                                            class: "text-caption text-medium-emphasis mb-3",
                                            style: { "display": "-webkit-box", "-webkit-line-clamp": "2", "-webkit-box-orient": "vertical", "overflow": "hidden" }
                                          }, toDisplayString(service.description), 1),
                                          createVNode("div", { class: "d-flex align-center justify-space-between" }, [
                                            createVNode("span", { class: "text-h6 font-weight-black text-primary" }, "$" + toDisplayString(service.price_usd), 1),
                                            createVNode(VBtn, {
                                              color: "cta",
                                              size: "small",
                                              rounded: "lg",
                                              onClick: withModifiers(($event) => addToCart(service), ["prevent"])
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
                                          createTextVNode("mdi-map-marker-star")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    createVNode(VCardText, { class: "pa-4" }, {
                                      default: withCtx(() => [
                                        createVNode(VChip, {
                                          size: "x-small",
                                          color: "accent",
                                          variant: "flat",
                                          class: "mb-2"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(service.category), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode("h2", { class: "text-body-1 font-weight-bold text-primary mb-2 text-wrap" }, toDisplayString(service.name), 1),
                                        createVNode("p", {
                                          class: "text-caption text-medium-emphasis mb-3",
                                          style: { "display": "-webkit-box", "-webkit-line-clamp": "2", "-webkit-box-orient": "vertical", "overflow": "hidden" }
                                        }, toDisplayString(service.description), 1),
                                        createVNode("div", { class: "d-flex align-center justify-space-between" }, [
                                          createVNode("span", { class: "text-h6 font-weight-black text-primary" }, "$" + toDisplayString(service.price_usd), 1),
                                          createVNode(VBtn, {
                                            color: "cta",
                                            size: "small",
                                            rounded: "lg",
                                            onClick: withModifiers(($event) => addToCart(service), ["prevent"])
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
                                to: unref(localePath)(`/services/${service.slug}`)
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "card-img d-flex align-center justify-center" }, [
                                    createVNode(VIcon, {
                                      size: "56",
                                      color: "white",
                                      style: { "opacity": "0.7" }
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-map-marker-star")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  createVNode(VCardText, { class: "pa-4" }, {
                                    default: withCtx(() => [
                                      createVNode(VChip, {
                                        size: "x-small",
                                        color: "accent",
                                        variant: "flat",
                                        class: "mb-2"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(service.category), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode("h2", { class: "text-body-1 font-weight-bold text-primary mb-2 text-wrap" }, toDisplayString(service.name), 1),
                                      createVNode("p", {
                                        class: "text-caption text-medium-emphasis mb-3",
                                        style: { "display": "-webkit-box", "-webkit-line-clamp": "2", "-webkit-box-orient": "vertical", "overflow": "hidden" }
                                      }, toDisplayString(service.description), 1),
                                      createVNode("div", { class: "d-flex align-center justify-space-between" }, [
                                        createVNode("span", { class: "text-h6 font-weight-black text-primary" }, "$" + toDisplayString(service.price_usd), 1),
                                        createVNode(VBtn, {
                                          color: "cta",
                                          size: "small",
                                          rounded: "lg",
                                          onClick: withModifiers(($event) => addToCart(service), ["prevent"])
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
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredServices), (service) => {
                        return openBlock(), createBlock(VCol, {
                          key: service.id,
                          cols: "12",
                          sm: "6",
                          md: "4"
                        }, {
                          default: withCtx(() => [
                            createVNode(VCard, {
                              rounded: "xl",
                              class: "h-100",
                              hover: "",
                              to: unref(localePath)(`/services/${service.slug}`)
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "card-img d-flex align-center justify-center" }, [
                                  createVNode(VIcon, {
                                    size: "56",
                                    color: "white",
                                    style: { "opacity": "0.7" }
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-map-marker-star")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode(VCardText, { class: "pa-4" }, {
                                  default: withCtx(() => [
                                    createVNode(VChip, {
                                      size: "x-small",
                                      color: "accent",
                                      variant: "flat",
                                      class: "mb-2"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(service.category), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode("h2", { class: "text-body-1 font-weight-bold text-primary mb-2 text-wrap" }, toDisplayString(service.name), 1),
                                    createVNode("p", {
                                      class: "text-caption text-medium-emphasis mb-3",
                                      style: { "display": "-webkit-box", "-webkit-line-clamp": "2", "-webkit-box-orient": "vertical", "overflow": "hidden" }
                                    }, toDisplayString(service.description), 1),
                                    createVNode("div", { class: "d-flex align-center justify-space-between" }, [
                                      createVNode("span", { class: "text-h6 font-weight-black text-primary" }, "$" + toDisplayString(service.price_usd), 1),
                                      createVNode(VBtn, {
                                        color: "cta",
                                        size: "small",
                                        rounded: "lg",
                                        onClick: withModifiers(($event) => addToCart(service), ["prevent"])
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
              createVNode("div", { class: "d-flex gap-2 flex-wrap mb-8" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(categories), (cat) => {
                  return openBlock(), createBlock(VChip, {
                    key: cat.value,
                    color: unref(activeCategory) === cat.value ? "primary" : "default",
                    variant: unref(activeCategory) === cat.value ? "flat" : "outlined",
                    onClick: ($event) => activeCategory.value = cat.value,
                    class: "cursor-pointer"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(cat.label), 1)
                    ]),
                    _: 2
                  }, 1032, ["color", "variant", "onClick"]);
                }), 128))
              ]),
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
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredServices), (service) => {
                    return openBlock(), createBlock(VCol, {
                      key: service.id,
                      cols: "12",
                      sm: "6",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode(VCard, {
                          rounded: "xl",
                          class: "h-100",
                          hover: "",
                          to: unref(localePath)(`/services/${service.slug}`)
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "card-img d-flex align-center justify-center" }, [
                              createVNode(VIcon, {
                                size: "56",
                                color: "white",
                                style: { "opacity": "0.7" }
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("mdi-map-marker-star")
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode(VCardText, { class: "pa-4" }, {
                              default: withCtx(() => [
                                createVNode(VChip, {
                                  size: "x-small",
                                  color: "accent",
                                  variant: "flat",
                                  class: "mb-2"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(service.category), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode("h2", { class: "text-body-1 font-weight-bold text-primary mb-2 text-wrap" }, toDisplayString(service.name), 1),
                                createVNode("p", {
                                  class: "text-caption text-medium-emphasis mb-3",
                                  style: { "display": "-webkit-box", "-webkit-line-clamp": "2", "-webkit-box-orient": "vertical", "overflow": "hidden" }
                                }, toDisplayString(service.description), 1),
                                createVNode("div", { class: "d-flex align-center justify-space-between" }, [
                                  createVNode("span", { class: "text-h6 font-weight-black text-primary" }, "$" + toDisplayString(service.price_usd), 1),
                                  createVNode(VBtn, {
                                    color: "cta",
                                    size: "small",
                                    rounded: "lg",
                                    onClick: withModifiers(($event) => addToCart(service), ["prevent"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/services/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0666a05b"]]);

export { index as default };
//# sourceMappingURL=index-DfyuHNTI.mjs.map
