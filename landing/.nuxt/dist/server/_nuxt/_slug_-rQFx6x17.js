import { u as useApi, H as Head, T as Title, M as Meta, V as VContainer } from "./VContainer-CvzQlK5R.js";
import { _ as __nuxt_component_0 } from "./nuxt-link-C-3FqTCY.js";
import { defineComponent, withAsyncContext, computed, ref, reactive, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, isRef, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { f as useI18n, g as useLocalePath, a4 as useRoute, c as useRuntimeConfig, _ as _export_sfc } from "../server.mjs";
import { u as useCartStore } from "./forwardRefs-BsiwRHAr.js";
import { V as VBreadcrumbs } from "./VBreadcrumbs-BZOGxRDH.js";
import { a as VIcon, d as VRow, e as VCol, V as VCard, b as VCardText, c as VBtn, _ as VProgressCircular } from "./VRow-DQkXkPiv.js";
import { V as VChip } from "./VChip-ChK3lbKv.js";
import { V as VTextField } from "./VTextField-w7s0k0rh.js";
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
import "./index-wObflqc9.js";
import "./VOverlay-DnwGKld0.js";
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
    const { data, pending } = ([__temp, __restore] = withAsyncContext(() => api.fetchTransfer(route.params.slug)), __temp = await __temp, __restore(), __temp);
    const transfer = computed(() => data.value?.data || data.value);
    const snack = ref(false);
    const form = reactive({ pickup_location: "", scheduled_at: "", quantity: 1 });
    function addToCart() {
      if (!transfer.value) return;
      cartStore.addItem({
        id: transfer.value.id,
        type: "transfer",
        name: transfer.value.name,
        price: parseFloat(transfer.value.price_usd),
        currency: "USD",
        quantity: form.quantity,
        slug: transfer.value.slug,
        pickup_location: form.pickup_location,
        scheduled_at: form.scheduled_at
      });
      snack.value = true;
    }
    const breadcrumbs = computed(() => [
      { title: "Home", href: localePath("/") },
      { title: t("transfers.title"), href: localePath("/transfers") },
      { title: transfer.value?.name || "", href: "" }
    ]);
    const productSchema = computed(() => transfer.value ? {
      "@context": "https://schema.org",
      "@type": "Product",
      name: transfer.value.name,
      description: transfer.value.description,
      offers: {
        "@type": "Offer",
        price: transfer.value.price_usd,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${config.public.siteUrl}${localePath(`/transfers/${transfer.value.slug}`)}`
      }
    } : {});
    const breadcrumbSchema = computed(() => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${config.public.siteUrl}${localePath("/")}` },
        { "@type": "ListItem", position: 2, name: t("transfers.title"), item: `${config.public.siteUrl}${localePath("/transfers")}` },
        { "@type": "ListItem", position: 3, name: transfer.value?.name || "" }
      ]
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = Head;
      const _component_Title = Title;
      const _component_Meta = Meta;
      const _component_NuxtLink = __nuxt_component_0;
      if (unref(transfer)) {
        _push(`<div${ssrRenderAttrs(_attrs)} data-v-fa9942c9>`);
        _push(ssrRenderComponent(_component_Head, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Title, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(transfer).meta_title || unref(transfer).name)} | Khiva Tour Guide`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(transfer).meta_title || unref(transfer).name) + " | Khiva Tour Guide", 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Meta, {
                name: "description",
                content: unref(transfer).meta_description || unref(transfer).description
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Meta, {
                property: "og:title",
                content: unref(transfer).meta_title || unref(transfer).name
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Meta, {
                property: "og:description",
                content: unref(transfer).meta_description || unref(transfer).description
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Meta, {
                property: "og:type",
                content: "product"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Title, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(transfer).meta_title || unref(transfer).name) + " | Khiva Tour Guide", 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_Meta, {
                  name: "description",
                  content: unref(transfer).meta_description || unref(transfer).description
                }, null, 8, ["content"]),
                createVNode(_component_Meta, {
                  property: "og:title",
                  content: unref(transfer).meta_title || unref(transfer).name
                }, null, 8, ["content"]),
                createVNode(_component_Meta, {
                  property: "og:description",
                  content: unref(transfer).meta_description || unref(transfer).description
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
        _push(`<script type="application/ld+json" data-v-fa9942c9>${JSON.stringify(unref(productSchema)) ?? ""}<\/script><script type="application/ld+json" data-v-fa9942c9>${JSON.stringify(unref(breadcrumbSchema)) ?? ""}<\/script><div class="page-hero" data-v-fa9942c9>`);
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
                    _push3(`Transfer`);
                  } else {
                    return [
                      createTextVNode("Transfer")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<h1 class="text-h3 font-weight-black text-white mb-2" data-v-fa9942c9${_scopeId}>${ssrInterpolate(unref(transfer).name)}</h1><div class="d-flex gap-4 flex-wrap" data-v-fa9942c9${_scopeId}><span class="text-white" style="${ssrRenderStyle({ "opacity": "0.8" })}" data-v-fa9942c9${_scopeId}>`);
              _push2(ssrRenderComponent(VIcon, { size: "18" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`mdi-map-marker-right`);
                  } else {
                    return [
                      createTextVNode("mdi-map-marker-right")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(unref(transfer).from_location)} → ${ssrInterpolate(unref(transfer).to_location)}</span><span class="text-white" style="${ssrRenderStyle({ "opacity": "0.8" })}" data-v-fa9942c9${_scopeId}>`);
              _push2(ssrRenderComponent(VIcon, { size: "18" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`mdi-account-group`);
                  } else {
                    return [
                      createTextVNode("mdi-account-group")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(unref(transfer).capacity)} ${ssrInterpolate(unref(t)("transfers.passengers"))}</span>`);
              if (unref(transfer).duration_hours) {
                _push2(`<span class="text-white" style="${ssrRenderStyle({ "opacity": "0.8" })}" data-v-fa9942c9${_scopeId}>`);
                _push2(ssrRenderComponent(VIcon, { size: "18" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`mdi-clock`);
                    } else {
                      return [
                        createTextVNode("mdi-clock")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(` ${ssrInterpolate(unref(transfer).duration_hours)}h </span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
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
                    createTextVNode("Transfer")
                  ]),
                  _: 1
                }),
                createVNode("h1", { class: "text-h3 font-weight-black text-white mb-2" }, toDisplayString(unref(transfer).name), 1),
                createVNode("div", { class: "d-flex gap-4 flex-wrap" }, [
                  createVNode("span", {
                    class: "text-white",
                    style: { "opacity": "0.8" }
                  }, [
                    createVNode(VIcon, { size: "18" }, {
                      default: withCtx(() => [
                        createTextVNode("mdi-map-marker-right")
                      ]),
                      _: 1
                    }),
                    createTextVNode(" " + toDisplayString(unref(transfer).from_location) + " → " + toDisplayString(unref(transfer).to_location), 1)
                  ]),
                  createVNode("span", {
                    class: "text-white",
                    style: { "opacity": "0.8" }
                  }, [
                    createVNode(VIcon, { size: "18" }, {
                      default: withCtx(() => [
                        createTextVNode("mdi-account-group")
                      ]),
                      _: 1
                    }),
                    createTextVNode(" " + toDisplayString(unref(transfer).capacity) + " " + toDisplayString(unref(t)("transfers.passengers")), 1)
                  ]),
                  unref(transfer).duration_hours ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "text-white",
                    style: { "opacity": "0.8" }
                  }, [
                    createVNode(VIcon, { size: "18" }, {
                      default: withCtx(() => [
                        createTextVNode("mdi-clock")
                      ]),
                      _: 1
                    }),
                    createTextVNode(" " + toDisplayString(unref(transfer).duration_hours) + "h ", 1)
                  ])) : createCommentVNode("", true)
                ])
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
                                      _push6(`<h2 class="text-h6 font-weight-bold mb-3" data-v-fa9942c9${_scopeId5}>Tavsif</h2><p class="text-body-1" style="${ssrRenderStyle({ "line-height": "1.8" })}" data-v-fa9942c9${_scopeId5}>${ssrInterpolate(unref(transfer).description)}</p>`);
                                    } else {
                                      return [
                                        createVNode("h2", { class: "text-h6 font-weight-bold mb-3" }, "Tavsif"),
                                        createVNode("p", {
                                          class: "text-body-1",
                                          style: { "line-height": "1.8" }
                                        }, toDisplayString(unref(transfer).description), 1)
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
                                      }, toDisplayString(unref(transfer).description), 1)
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
                                    }, toDisplayString(unref(transfer).description), 1)
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
                                      _push6(`<div class="text-h4 font-weight-black text-primary mb-1" data-v-fa9942c9${_scopeId5}>$${ssrInterpolate(unref(transfer).price_usd)}</div><div class="text-caption text-medium-emphasis mb-4" data-v-fa9942c9${_scopeId5}>${ssrInterpolate(unref(t)("transfers.capacity"))}</div>`);
                                      _push6(ssrRenderComponent(VTextField, {
                                        modelValue: unref(form).pickup_location,
                                        "onUpdate:modelValue": ($event) => unref(form).pickup_location = $event,
                                        label: "Kutib olinish joyi",
                                        variant: "outlined",
                                        rounded: "lg",
                                        density: "compact",
                                        class: "mb-3",
                                        "prepend-inner-icon": "mdi-map-marker"
                                      }, null, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VTextField, {
                                        modelValue: unref(form).scheduled_at,
                                        "onUpdate:modelValue": ($event) => unref(form).scheduled_at = $event,
                                        label: "Sana va vaqt",
                                        type: "datetime-local",
                                        variant: "outlined",
                                        rounded: "lg",
                                        density: "compact",
                                        class: "mb-3",
                                        "prepend-inner-icon": "mdi-calendar"
                                      }, null, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VTextField, {
                                        modelValue: unref(form).quantity,
                                        "onUpdate:modelValue": ($event) => unref(form).quantity = $event,
                                        modelModifiers: { number: true },
                                        label: "Yo'lovchilar soni",
                                        type: "number",
                                        min: "1",
                                        max: unref(transfer).capacity,
                                        variant: "outlined",
                                        rounded: "lg",
                                        density: "compact",
                                        class: "mb-4",
                                        "prepend-inner-icon": "mdi-account-group"
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
                                        createVNode("div", { class: "text-h4 font-weight-black text-primary mb-1" }, "$" + toDisplayString(unref(transfer).price_usd), 1),
                                        createVNode("div", { class: "text-caption text-medium-emphasis mb-4" }, toDisplayString(unref(t)("transfers.capacity")), 1),
                                        createVNode(VTextField, {
                                          modelValue: unref(form).pickup_location,
                                          "onUpdate:modelValue": ($event) => unref(form).pickup_location = $event,
                                          label: "Kutib olinish joyi",
                                          variant: "outlined",
                                          rounded: "lg",
                                          density: "compact",
                                          class: "mb-3",
                                          "prepend-inner-icon": "mdi-map-marker"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                        createVNode(VTextField, {
                                          modelValue: unref(form).scheduled_at,
                                          "onUpdate:modelValue": ($event) => unref(form).scheduled_at = $event,
                                          label: "Sana va vaqt",
                                          type: "datetime-local",
                                          variant: "outlined",
                                          rounded: "lg",
                                          density: "compact",
                                          class: "mb-3",
                                          "prepend-inner-icon": "mdi-calendar"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                        createVNode(VTextField, {
                                          modelValue: unref(form).quantity,
                                          "onUpdate:modelValue": ($event) => unref(form).quantity = $event,
                                          modelModifiers: { number: true },
                                          label: "Yo'lovchilar soni",
                                          type: "number",
                                          min: "1",
                                          max: unref(transfer).capacity,
                                          variant: "outlined",
                                          rounded: "lg",
                                          density: "compact",
                                          class: "mb-4",
                                          "prepend-inner-icon": "mdi-account-group"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "max"]),
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
                                      createVNode("div", { class: "text-h4 font-weight-black text-primary mb-1" }, "$" + toDisplayString(unref(transfer).price_usd), 1),
                                      createVNode("div", { class: "text-caption text-medium-emphasis mb-4" }, toDisplayString(unref(t)("transfers.capacity")), 1),
                                      createVNode(VTextField, {
                                        modelValue: unref(form).pickup_location,
                                        "onUpdate:modelValue": ($event) => unref(form).pickup_location = $event,
                                        label: "Kutib olinish joyi",
                                        variant: "outlined",
                                        rounded: "lg",
                                        density: "compact",
                                        class: "mb-3",
                                        "prepend-inner-icon": "mdi-map-marker"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode(VTextField, {
                                        modelValue: unref(form).scheduled_at,
                                        "onUpdate:modelValue": ($event) => unref(form).scheduled_at = $event,
                                        label: "Sana va vaqt",
                                        type: "datetime-local",
                                        variant: "outlined",
                                        rounded: "lg",
                                        density: "compact",
                                        class: "mb-3",
                                        "prepend-inner-icon": "mdi-calendar"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode(VTextField, {
                                        modelValue: unref(form).quantity,
                                        "onUpdate:modelValue": ($event) => unref(form).quantity = $event,
                                        modelModifiers: { number: true },
                                        label: "Yo'lovchilar soni",
                                        type: "number",
                                        min: "1",
                                        max: unref(transfer).capacity,
                                        variant: "outlined",
                                        rounded: "lg",
                                        density: "compact",
                                        class: "mb-4",
                                        "prepend-inner-icon": "mdi-account-group"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "max"]),
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
                                    createVNode("div", { class: "text-h4 font-weight-black text-primary mb-1" }, "$" + toDisplayString(unref(transfer).price_usd), 1),
                                    createVNode("div", { class: "text-caption text-medium-emphasis mb-4" }, toDisplayString(unref(t)("transfers.capacity")), 1),
                                    createVNode(VTextField, {
                                      modelValue: unref(form).pickup_location,
                                      "onUpdate:modelValue": ($event) => unref(form).pickup_location = $event,
                                      label: "Kutib olinish joyi",
                                      variant: "outlined",
                                      rounded: "lg",
                                      density: "compact",
                                      class: "mb-3",
                                      "prepend-inner-icon": "mdi-map-marker"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode(VTextField, {
                                      modelValue: unref(form).scheduled_at,
                                      "onUpdate:modelValue": ($event) => unref(form).scheduled_at = $event,
                                      label: "Sana va vaqt",
                                      type: "datetime-local",
                                      variant: "outlined",
                                      rounded: "lg",
                                      density: "compact",
                                      class: "mb-3",
                                      "prepend-inner-icon": "mdi-calendar"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode(VTextField, {
                                      modelValue: unref(form).quantity,
                                      "onUpdate:modelValue": ($event) => unref(form).quantity = $event,
                                      modelModifiers: { number: true },
                                      label: "Yo'lovchilar soni",
                                      type: "number",
                                      min: "1",
                                      max: unref(transfer).capacity,
                                      variant: "outlined",
                                      rounded: "lg",
                                      density: "compact",
                                      class: "mb-4",
                                      "prepend-inner-icon": "mdi-account-group"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "max"]),
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
                                  }, toDisplayString(unref(transfer).description), 1)
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
                                  createVNode("div", { class: "text-h4 font-weight-black text-primary mb-1" }, "$" + toDisplayString(unref(transfer).price_usd), 1),
                                  createVNode("div", { class: "text-caption text-medium-emphasis mb-4" }, toDisplayString(unref(t)("transfers.capacity")), 1),
                                  createVNode(VTextField, {
                                    modelValue: unref(form).pickup_location,
                                    "onUpdate:modelValue": ($event) => unref(form).pickup_location = $event,
                                    label: "Kutib olinish joyi",
                                    variant: "outlined",
                                    rounded: "lg",
                                    density: "compact",
                                    class: "mb-3",
                                    "prepend-inner-icon": "mdi-map-marker"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode(VTextField, {
                                    modelValue: unref(form).scheduled_at,
                                    "onUpdate:modelValue": ($event) => unref(form).scheduled_at = $event,
                                    label: "Sana va vaqt",
                                    type: "datetime-local",
                                    variant: "outlined",
                                    rounded: "lg",
                                    density: "compact",
                                    class: "mb-3",
                                    "prepend-inner-icon": "mdi-calendar"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode(VTextField, {
                                    modelValue: unref(form).quantity,
                                    "onUpdate:modelValue": ($event) => unref(form).quantity = $event,
                                    modelModifiers: { number: true },
                                    label: "Yo'lovchilar soni",
                                    type: "number",
                                    min: "1",
                                    max: unref(transfer).capacity,
                                    variant: "outlined",
                                    rounded: "lg",
                                    density: "compact",
                                    class: "mb-4",
                                    "prepend-inner-icon": "mdi-account-group"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "max"]),
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
                                }, toDisplayString(unref(transfer).description), 1)
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
                                createVNode("div", { class: "text-h4 font-weight-black text-primary mb-1" }, "$" + toDisplayString(unref(transfer).price_usd), 1),
                                createVNode("div", { class: "text-caption text-medium-emphasis mb-4" }, toDisplayString(unref(t)("transfers.capacity")), 1),
                                createVNode(VTextField, {
                                  modelValue: unref(form).pickup_location,
                                  "onUpdate:modelValue": ($event) => unref(form).pickup_location = $event,
                                  label: "Kutib olinish joyi",
                                  variant: "outlined",
                                  rounded: "lg",
                                  density: "compact",
                                  class: "mb-3",
                                  "prepend-inner-icon": "mdi-map-marker"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(VTextField, {
                                  modelValue: unref(form).scheduled_at,
                                  "onUpdate:modelValue": ($event) => unref(form).scheduled_at = $event,
                                  label: "Sana va vaqt",
                                  type: "datetime-local",
                                  variant: "outlined",
                                  rounded: "lg",
                                  density: "compact",
                                  class: "mb-3",
                                  "prepend-inner-icon": "mdi-calendar"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(VTextField, {
                                  modelValue: unref(form).quantity,
                                  "onUpdate:modelValue": ($event) => unref(form).quantity = $event,
                                  modelModifiers: { number: true },
                                  label: "Yo'lovchilar soni",
                                  type: "number",
                                  min: "1",
                                  max: unref(transfer).capacity,
                                  variant: "outlined",
                                  rounded: "lg",
                                  density: "compact",
                                  class: "mb-4",
                                  "prepend-inner-icon": "mdi-account-group"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "max"]),
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
        }, _attrs))} data-v-fa9942c9>`);
        _push(ssrRenderComponent(VProgressCircular, {
          indeterminate: "",
          color: "primary"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-center py-20" }, _attrs))} data-v-fa9942c9>`);
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
        _push(`<p class="text-h6 mt-4" data-v-fa9942c9>Transfer topilmadi</p>`);
        _push(ssrRenderComponent(VBtn, {
          to: unref(localePath)("/transfers"),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/transfers/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fa9942c9"]]);
export {
  _slug_ as default
};
//# sourceMappingURL=_slug_-rQFx6x17.js.map
