import { u as useApi, H as Head, T as Title, M as Meta, V as VContainer } from './VContainer-CvzQlK5R.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-C-3FqTCY.mjs';
import { defineComponent, withAsyncContext, computed, ref, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, isRef, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc, f as useI18n, g as useLocalePath, a4 as useRoute, c as useRuntimeConfig } from './server.mjs';
import { u as useCartStore } from './forwardRefs-BsiwRHAr.mjs';
import { V as VBreadcrumbs } from './VBreadcrumbs-BZOGxRDH.mjs';
import { d as VIcon, V as VRow, a as VCol, c as VCard, e as VCardText, E as VImg, b as VBtn, D as VProgressCircular } from './VRow-DQkXkPiv.mjs';
import { V as VChip } from './VChip-ChK3lbKv.mjs';
import { V as VTextField } from './VTextField-w7s0k0rh.mjs';
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
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { t } = useI18n();
    const localePath = useLocalePath();
    const route = useRoute();
    const config = useRuntimeConfig();
    const api = useApi();
    const cartStore = useCartStore();
    const { data, pending } = ([__temp, __restore] = withAsyncContext(() => api.fetchService(route.params.slug)), __temp = await __temp, __restore(), __temp);
    const service = computed(() => {
      var _a;
      return ((_a = data.value) == null ? void 0 : _a.data) || data.value;
    });
    const gallery = computed(() => {
      var _a;
      const g = (_a = service.value) == null ? void 0 : _a.gallery;
      if (!g) return [];
      if (Array.isArray(g)) return g;
      try {
        return JSON.parse(g);
      } catch {
        return [];
      }
    });
    const snack = ref(false);
    const quantity = ref(1);
    function addToCart() {
      if (!service.value) return;
      cartStore.addItem({
        id: service.value.id,
        type: "service",
        name: service.value.name,
        price: parseFloat(service.value.price_usd),
        currency: "USD",
        quantity: quantity.value,
        slug: service.value.slug
      });
      snack.value = true;
    }
    const breadcrumbs = computed(() => {
      var _a;
      return [
        { title: "Home", href: localePath("/") },
        { title: t("services.title"), href: localePath("/services") },
        { title: ((_a = service.value) == null ? void 0 : _a.name) || "", href: "" }
      ];
    });
    const touristTripSchema = computed(() => service.value ? {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: service.value.name,
      description: service.value.description,
      offers: {
        "@type": "Offer",
        price: service.value.price_usd,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock"
      },
      touristType: service.value.category
    } : {});
    const breadcrumbSchema = computed(() => {
      var _a;
      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${config.public.siteUrl}${localePath("/")}` },
          { "@type": "ListItem", position: 2, name: t("services.title"), item: `${config.public.siteUrl}${localePath("/services")}` },
          { "@type": "ListItem", position: 3, name: ((_a = service.value) == null ? void 0 : _a.name) || "" }
        ]
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_Head = Head;
      const _component_Title = Title;
      const _component_Meta = Meta;
      const _component_NuxtLink = __nuxt_component_0;
      if (unref(service)) {
        _push(`<div${ssrRenderAttrs(_attrs)} data-v-71869f50>`);
        _push(ssrRenderComponent(_component_Head, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Title, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(service).meta_title || unref(service).name)} | Khiva Tour Guide`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(service).meta_title || unref(service).name) + " | Khiva Tour Guide", 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Meta, {
                name: "description",
                content: unref(service).meta_description || unref(service).description
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Meta, {
                property: "og:title",
                content: unref(service).meta_title || unref(service).name
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Meta, {
                property: "og:description",
                content: unref(service).meta_description || unref(service).description
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Meta, {
                property: "og:type",
                content: "product"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Title, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(service).meta_title || unref(service).name) + " | Khiva Tour Guide", 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_Meta, {
                  name: "description",
                  content: unref(service).meta_description || unref(service).description
                }, null, 8, ["content"]),
                createVNode(_component_Meta, {
                  property: "og:title",
                  content: unref(service).meta_title || unref(service).name
                }, null, 8, ["content"]),
                createVNode(_component_Meta, {
                  property: "og:description",
                  content: unref(service).meta_description || unref(service).description
                }, null, 8, ["content"]),
                createVNode(_component_Meta, {
                  property: "og:type",
                  content: "product"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<script type="application/ld+json" data-v-71869f50>${(_a = JSON.stringify(unref(touristTripSchema))) != null ? _a : ""}<\/script><script type="application/ld+json" data-v-71869f50>${(_b = JSON.stringify(unref(breadcrumbSchema))) != null ? _b : ""}<\/script><div class="page-hero" data-v-71869f50>`);
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
              _push2(ssrRenderComponent(VChip, {
                color: "accent",
                size: "small",
                class: "mb-3"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(service).category)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(service).category), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<h1 class="text-h3 font-weight-black text-white mb-2" data-v-71869f50${_scopeId}>${ssrInterpolate(unref(service).name)}</h1>`);
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
                createVNode(VChip, {
                  color: "accent",
                  size: "small",
                  class: "mb-3"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(service).category), 1)
                  ]),
                  _: 1
                }),
                createVNode("h1", { class: "text-h3 font-weight-black text-white mb-2" }, toDisplayString(unref(service).name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(VContainer, { class: "py-12" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "8"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VCard, {
                            rounded: "xl",
                            class: "mb-6"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VCardText, { class: "pa-6" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<h2 class="text-h6 font-weight-bold mb-3" data-v-71869f50${_scopeId5}>Tavsif</h2><p class="text-body-1" style="${ssrRenderStyle({ "line-height": "1.8" })}" data-v-71869f50${_scopeId5}>${ssrInterpolate(unref(service).description)}</p>`);
                                      if (unref(gallery).length) {
                                        _push6(`<div class="mt-6" data-v-71869f50${_scopeId5}><h3 class="text-body-1 font-weight-bold mb-3" data-v-71869f50${_scopeId5}>Galereya</h3>`);
                                        _push6(ssrRenderComponent(VRow, { dense: "" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<!--[-->`);
                                              ssrRenderList(unref(gallery), (img, i) => {
                                                _push7(ssrRenderComponent(VCol, {
                                                  key: i,
                                                  cols: "6",
                                                  md: "4"
                                                }, {
                                                  default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(ssrRenderComponent(VImg, {
                                                        src: img,
                                                        rounded: "lg",
                                                        "aspect-ratio": "1",
                                                        cover: "",
                                                        class: "bg-grey-lighten-3"
                                                      }, null, _parent8, _scopeId7));
                                                    } else {
                                                      return [
                                                        createVNode(VImg, {
                                                          src: img,
                                                          rounded: "lg",
                                                          "aspect-ratio": "1",
                                                          cover: "",
                                                          class: "bg-grey-lighten-3"
                                                        }, null, 8, ["src"])
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                              });
                                              _push7(`<!--]-->`);
                                            } else {
                                              return [
                                                (openBlock(true), createBlock(Fragment, null, renderList(unref(gallery), (img, i) => {
                                                  return openBlock(), createBlock(VCol, {
                                                    key: i,
                                                    cols: "6",
                                                    md: "4"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(VImg, {
                                                        src: img,
                                                        rounded: "lg",
                                                        "aspect-ratio": "1",
                                                        cover: "",
                                                        class: "bg-grey-lighten-3"
                                                      }, null, 8, ["src"])
                                                    ]),
                                                    _: 2
                                                  }, 1024);
                                                }), 128))
                                              ];
                                            }
                                          }),
                                          _: 1
                                        }, _parent6, _scopeId5));
                                        _push6(`</div>`);
                                      } else {
                                        _push6(`<!---->`);
                                      }
                                    } else {
                                      return [
                                        createVNode("h2", { class: "text-h6 font-weight-bold mb-3" }, "Tavsif"),
                                        createVNode("p", {
                                          class: "text-body-1",
                                          style: { "line-height": "1.8" }
                                        }, toDisplayString(unref(service).description), 1),
                                        unref(gallery).length ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "mt-6"
                                        }, [
                                          createVNode("h3", { class: "text-body-1 font-weight-bold mb-3" }, "Galereya"),
                                          createVNode(VRow, { dense: "" }, {
                                            default: withCtx(() => [
                                              (openBlock(true), createBlock(Fragment, null, renderList(unref(gallery), (img, i) => {
                                                return openBlock(), createBlock(VCol, {
                                                  key: i,
                                                  cols: "6",
                                                  md: "4"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(VImg, {
                                                      src: img,
                                                      rounded: "lg",
                                                      "aspect-ratio": "1",
                                                      cover: "",
                                                      class: "bg-grey-lighten-3"
                                                    }, null, 8, ["src"])
                                                  ]),
                                                  _: 2
                                                }, 1024);
                                              }), 128))
                                            ]),
                                            _: 1
                                          })
                                        ])) : createCommentVNode("", true)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VCardText, { class: "pa-6" }, {
                                    default: withCtx(() => [
                                      createVNode("h2", { class: "text-h6 font-weight-bold mb-3" }, "Tavsif"),
                                      createVNode("p", {
                                        class: "text-body-1",
                                        style: { "line-height": "1.8" }
                                      }, toDisplayString(unref(service).description), 1),
                                      unref(gallery).length ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "mt-6"
                                      }, [
                                        createVNode("h3", { class: "text-body-1 font-weight-bold mb-3" }, "Galereya"),
                                        createVNode(VRow, { dense: "" }, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(unref(gallery), (img, i) => {
                                              return openBlock(), createBlock(VCol, {
                                                key: i,
                                                cols: "6",
                                                md: "4"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(VImg, {
                                                    src: img,
                                                    rounded: "lg",
                                                    "aspect-ratio": "1",
                                                    cover: "",
                                                    class: "bg-grey-lighten-3"
                                                  }, null, 8, ["src"])
                                                ]),
                                                _: 2
                                              }, 1024);
                                            }), 128))
                                          ]),
                                          _: 1
                                        })
                                      ])) : createCommentVNode("", true)
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VCard, {
                              rounded: "xl",
                              class: "mb-6"
                            }, {
                              default: withCtx(() => [
                                createVNode(VCardText, { class: "pa-6" }, {
                                  default: withCtx(() => [
                                    createVNode("h2", { class: "text-h6 font-weight-bold mb-3" }, "Tavsif"),
                                    createVNode("p", {
                                      class: "text-body-1",
                                      style: { "line-height": "1.8" }
                                    }, toDisplayString(unref(service).description), 1),
                                    unref(gallery).length ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "mt-6"
                                    }, [
                                      createVNode("h3", { class: "text-body-1 font-weight-bold mb-3" }, "Galereya"),
                                      createVNode(VRow, { dense: "" }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(unref(gallery), (img, i) => {
                                            return openBlock(), createBlock(VCol, {
                                              key: i,
                                              cols: "6",
                                              md: "4"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(VImg, {
                                                  src: img,
                                                  rounded: "lg",
                                                  "aspect-ratio": "1",
                                                  cover: "",
                                                  class: "bg-grey-lighten-3"
                                                }, null, 8, ["src"])
                                              ]),
                                              _: 2
                                            }, 1024);
                                          }), 128))
                                        ]),
                                        _: 1
                                      })
                                    ])) : createCommentVNode("", true)
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
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VCard, {
                            rounded: "xl",
                            class: "sticky-card"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VCardText, { class: "pa-6" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="text-h4 font-weight-black text-primary mb-1" data-v-71869f50${_scopeId5}>$${ssrInterpolate(unref(service).price_usd)}</div><div class="text-caption text-medium-emphasis mb-4" data-v-71869f50${_scopeId5}>${ssrInterpolate(unref(t)("transfers.capacity"))}</div>`);
                                      _push6(ssrRenderComponent(VTextField, {
                                        modelValue: unref(quantity),
                                        "onUpdate:modelValue": ($event) => isRef(quantity) ? quantity.value = $event : null,
                                        modelModifiers: { number: true },
                                        label: "Miqdor",
                                        type: "number",
                                        min: "1",
                                        variant: "outlined",
                                        rounded: "lg",
                                        density: "compact",
                                        class: "mb-4",
                                        "prepend-inner-icon": "mdi-counter"
                                      }, null, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VBtn, {
                                        color: "cta",
                                        block: "",
                                        size: "large",
                                        rounded: "lg",
                                        onClick: addToCart
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
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode("div", { class: "text-h4 font-weight-black text-primary mb-1" }, "$" + toDisplayString(unref(service).price_usd), 1),
                                        createVNode("div", { class: "text-caption text-medium-emphasis mb-4" }, toDisplayString(unref(t)("transfers.capacity")), 1),
                                        createVNode(VTextField, {
                                          modelValue: unref(quantity),
                                          "onUpdate:modelValue": ($event) => isRef(quantity) ? quantity.value = $event : null,
                                          modelModifiers: { number: true },
                                          label: "Miqdor",
                                          type: "number",
                                          min: "1",
                                          variant: "outlined",
                                          rounded: "lg",
                                          density: "compact",
                                          class: "mb-4",
                                          "prepend-inner-icon": "mdi-counter"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                        createVNode(VBtn, {
                                          color: "cta",
                                          block: "",
                                          size: "large",
                                          rounded: "lg",
                                          onClick: addToCart
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(unref(t)("cart.add")), 1)
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VCardText, { class: "pa-6" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "text-h4 font-weight-black text-primary mb-1" }, "$" + toDisplayString(unref(service).price_usd), 1),
                                      createVNode("div", { class: "text-caption text-medium-emphasis mb-4" }, toDisplayString(unref(t)("transfers.capacity")), 1),
                                      createVNode(VTextField, {
                                        modelValue: unref(quantity),
                                        "onUpdate:modelValue": ($event) => isRef(quantity) ? quantity.value = $event : null,
                                        modelModifiers: { number: true },
                                        label: "Miqdor",
                                        type: "number",
                                        min: "1",
                                        variant: "outlined",
                                        rounded: "lg",
                                        density: "compact",
                                        class: "mb-4",
                                        "prepend-inner-icon": "mdi-counter"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode(VBtn, {
                                        color: "cta",
                                        block: "",
                                        size: "large",
                                        rounded: "lg",
                                        onClick: addToCart
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(t)("cart.add")), 1)
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
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VCard, {
                              rounded: "xl",
                              class: "sticky-card"
                            }, {
                              default: withCtx(() => [
                                createVNode(VCardText, { class: "pa-6" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "text-h4 font-weight-black text-primary mb-1" }, "$" + toDisplayString(unref(service).price_usd), 1),
                                    createVNode("div", { class: "text-caption text-medium-emphasis mb-4" }, toDisplayString(unref(t)("transfers.capacity")), 1),
                                    createVNode(VTextField, {
                                      modelValue: unref(quantity),
                                      "onUpdate:modelValue": ($event) => isRef(quantity) ? quantity.value = $event : null,
                                      modelModifiers: { number: true },
                                      label: "Miqdor",
                                      type: "number",
                                      min: "1",
                                      variant: "outlined",
                                      rounded: "lg",
                                      density: "compact",
                                      class: "mb-4",
                                      "prepend-inner-icon": "mdi-counter"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode(VBtn, {
                                      color: "cta",
                                      block: "",
                                      size: "large",
                                      rounded: "lg",
                                      onClick: addToCart
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(t)("cart.add")), 1)
                                      ]),
                                      _: 1
                                    })
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
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, {
                        cols: "12",
                        md: "8"
                      }, {
                        default: withCtx(() => [
                          createVNode(VCard, {
                            rounded: "xl",
                            class: "mb-6"
                          }, {
                            default: withCtx(() => [
                              createVNode(VCardText, { class: "pa-6" }, {
                                default: withCtx(() => [
                                  createVNode("h2", { class: "text-h6 font-weight-bold mb-3" }, "Tavsif"),
                                  createVNode("p", {
                                    class: "text-body-1",
                                    style: { "line-height": "1.8" }
                                  }, toDisplayString(unref(service).description), 1),
                                  unref(gallery).length ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "mt-6"
                                  }, [
                                    createVNode("h3", { class: "text-body-1 font-weight-bold mb-3" }, "Galereya"),
                                    createVNode(VRow, { dense: "" }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(gallery), (img, i) => {
                                          return openBlock(), createBlock(VCol, {
                                            key: i,
                                            cols: "6",
                                            md: "4"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VImg, {
                                                src: img,
                                                rounded: "lg",
                                                "aspect-ratio": "1",
                                                cover: "",
                                                class: "bg-grey-lighten-3"
                                              }, null, 8, ["src"])
                                            ]),
                                            _: 2
                                          }, 1024);
                                        }), 128))
                                      ]),
                                      _: 1
                                    })
                                  ])) : createCommentVNode("", true)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        md: "4"
                      }, {
                        default: withCtx(() => [
                          createVNode(VCard, {
                            rounded: "xl",
                            class: "sticky-card"
                          }, {
                            default: withCtx(() => [
                              createVNode(VCardText, { class: "pa-6" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "text-h4 font-weight-black text-primary mb-1" }, "$" + toDisplayString(unref(service).price_usd), 1),
                                  createVNode("div", { class: "text-caption text-medium-emphasis mb-4" }, toDisplayString(unref(t)("transfers.capacity")), 1),
                                  createVNode(VTextField, {
                                    modelValue: unref(quantity),
                                    "onUpdate:modelValue": ($event) => isRef(quantity) ? quantity.value = $event : null,
                                    modelModifiers: { number: true },
                                    label: "Miqdor",
                                    type: "number",
                                    min: "1",
                                    variant: "outlined",
                                    rounded: "lg",
                                    density: "compact",
                                    class: "mb-4",
                                    "prepend-inner-icon": "mdi-counter"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode(VBtn, {
                                    color: "cta",
                                    block: "",
                                    size: "large",
                                    rounded: "lg",
                                    onClick: addToCart
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(t)("cart.add")), 1)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
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
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(VRow, null, {
                  default: withCtx(() => [
                    createVNode(VCol, {
                      cols: "12",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(VCard, {
                          rounded: "xl",
                          class: "mb-6"
                        }, {
                          default: withCtx(() => [
                            createVNode(VCardText, { class: "pa-6" }, {
                              default: withCtx(() => [
                                createVNode("h2", { class: "text-h6 font-weight-bold mb-3" }, "Tavsif"),
                                createVNode("p", {
                                  class: "text-body-1",
                                  style: { "line-height": "1.8" }
                                }, toDisplayString(unref(service).description), 1),
                                unref(gallery).length ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "mt-6"
                                }, [
                                  createVNode("h3", { class: "text-body-1 font-weight-bold mb-3" }, "Galereya"),
                                  createVNode(VRow, { dense: "" }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(gallery), (img, i) => {
                                        return openBlock(), createBlock(VCol, {
                                          key: i,
                                          cols: "6",
                                          md: "4"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VImg, {
                                              src: img,
                                              rounded: "lg",
                                              "aspect-ratio": "1",
                                              cover: "",
                                              class: "bg-grey-lighten-3"
                                            }, null, 8, ["src"])
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 128))
                                    ]),
                                    _: 1
                                  })
                                ])) : createCommentVNode("", true)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode(VCard, {
                          rounded: "xl",
                          class: "sticky-card"
                        }, {
                          default: withCtx(() => [
                            createVNode(VCardText, { class: "pa-6" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "text-h4 font-weight-black text-primary mb-1" }, "$" + toDisplayString(unref(service).price_usd), 1),
                                createVNode("div", { class: "text-caption text-medium-emphasis mb-4" }, toDisplayString(unref(t)("transfers.capacity")), 1),
                                createVNode(VTextField, {
                                  modelValue: unref(quantity),
                                  "onUpdate:modelValue": ($event) => isRef(quantity) ? quantity.value = $event : null,
                                  modelModifiers: { number: true },
                                  label: "Miqdor",
                                  type: "number",
                                  min: "1",
                                  variant: "outlined",
                                  rounded: "lg",
                                  density: "compact",
                                  class: "mb-4",
                                  "prepend-inner-icon": "mdi-counter"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(VBtn, {
                                  color: "cta",
                                  block: "",
                                  size: "large",
                                  rounded: "lg",
                                  onClick: addToCart
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(t)("cart.add")), 1)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
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
      } else if (unref(pending)) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "d-flex justify-center align-center",
          style: { "min-height": "50vh" }
        }, _attrs))} data-v-71869f50>`);
        _push(ssrRenderComponent(VProgressCircular, {
          indeterminate: "",
          color: "primary"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-center py-20" }, _attrs))} data-v-71869f50>`);
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
        _push(`<p class="text-h6 mt-4" data-v-71869f50>Xizmat topilmadi</p>`);
        _push(ssrRenderComponent(VBtn, {
          to: unref(localePath)("/services"),
          color: "primary",
          class: "mt-4"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u2190 Orqaga`);
            } else {
              return [
                createTextVNode("\u2190 Orqaga")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/services/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-71869f50"]]);

export { _slug_ as default };
//# sourceMappingURL=_slug_-CIF-JKBu.mjs.map
