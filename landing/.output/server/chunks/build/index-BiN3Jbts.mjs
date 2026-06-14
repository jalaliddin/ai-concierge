import { u as useApi, H as Head, T as Title, M as Meta, L as Link, V as VContainer } from './VContainer-CvzQlK5R.mjs';
import { defineComponent, withAsyncContext, computed, ref, withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, isRef, withKeys, createCommentVNode, inject, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList } from 'vue/server-renderer';
import { u as useCartStore } from './forwardRefs-BsiwRHAr.mjs';
import { _ as _export_sfc, f as useI18n, g as useLocalePath, c as useRuntimeConfig } from './server.mjs';
import { V as VRow, a as VCol, b as VBtn, c as VCard, d as VIcon, e as VCardText, f as VCardTitle, g as VCardSubtitle, h as VCardActions } from './VRow-DQkXkPiv.mjs';
import { V as VChip } from './VChip-ChK3lbKv.mjs';
import { V as VSkeletonLoader } from './VSkeletonLoader-UZ0j__Io.mjs';
import { V as VTextField } from './VTextField-w7s0k0rh.mjs';
import { V as VAlert } from './VAlert-CthPvHJX.mjs';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "TransferCard",
  __ssrInlineRender: true,
  props: {
    transfer: {}
  },
  setup(__props) {
    const { t } = useI18n();
    const cartStore = useCartStore();
    const props = __props;
    inject("snackbar", () => {
    });
    function addToCart() {
      cartStore.addItem({
        id: props.transfer.id,
        type: "transfer",
        name: props.transfer.name,
        price: parseFloat(props.transfer.price_usd),
        currency: "USD",
        quantity: 1,
        slug: props.transfer.slug
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VCard, mergeProps({
        rounded: "xl",
        class: "h-100 transfer-card",
        hover: ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card-image d-flex align-center justify-center" data-v-93362c6d${_scopeId}>`);
            _push2(ssrRenderComponent(VIcon, {
              size: "48",
              color: "white",
              style: { "opacity": "0.7" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`mdi-car-side`);
                } else {
                  return [
                    createTextVNode("mdi-car-side")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(VCardText, { class: "pa-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="d-flex align-center mb-2" data-v-93362c6d${_scopeId2}>`);
                  _push3(ssrRenderComponent(VChip, {
                    size: "x-small",
                    color: "accent",
                    variant: "flat",
                    class: "mr-2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Transfer`);
                      } else {
                        return [
                          createTextVNode("Transfer")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<span class="text-caption text-medium-emphasis" data-v-93362c6d${_scopeId2}>`);
                  _push3(ssrRenderComponent(VIcon, { size: "14" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`mdi-account-group`);
                      } else {
                        return [
                          createTextVNode("mdi-account-group")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(` ${ssrInterpolate(__props.transfer.capacity)} ${ssrInterpolate(unref(t)("transfers.passengers"))}</span></div><h3 class="text-body-1 font-weight-bold text-primary mb-1 text-wrap" style="${ssrRenderStyle({ "line-height": "1.3" })}" data-v-93362c6d${_scopeId2}>${ssrInterpolate(__props.transfer.name)}</h3><div class="text-caption text-medium-emphasis mb-1" data-v-93362c6d${_scopeId2}>`);
                  _push3(ssrRenderComponent(VIcon, { size: "14" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`mdi-map-marker-right`);
                      } else {
                        return [
                          createTextVNode("mdi-map-marker-right")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(` ${ssrInterpolate(__props.transfer.from_location)} \u2192 ${ssrInterpolate(__props.transfer.to_location)}</div>`);
                  if (__props.transfer.duration_hours) {
                    _push3(`<div class="text-caption text-medium-emphasis mb-3" data-v-93362c6d${_scopeId2}>`);
                    _push3(ssrRenderComponent(VIcon, { size: "14" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`mdi-clock-outline`);
                        } else {
                          return [
                            createTextVNode("mdi-clock-outline")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(` ${ssrInterpolate(__props.transfer.duration_hours)}h </div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="d-flex align-center justify-space-between" data-v-93362c6d${_scopeId2}><div data-v-93362c6d${_scopeId2}><span class="text-h6 font-weight-black text-primary" data-v-93362c6d${_scopeId2}>$${ssrInterpolate(__props.transfer.price_usd)}</span><span class="text-caption text-medium-emphasis ml-1" data-v-93362c6d${_scopeId2}>/${ssrInterpolate(unref(t)("transfers.capacity"))}</span></div>`);
                  _push3(ssrRenderComponent(VBtn, {
                    color: "cta",
                    size: "small",
                    rounded: "lg",
                    onClick: addToCart
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(t)("cart.add"))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(t)("cart.add")), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "d-flex align-center mb-2" }, [
                      createVNode(VChip, {
                        size: "x-small",
                        color: "accent",
                        variant: "flat",
                        class: "mr-2"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Transfer")
                        ]),
                        _: 1
                      }),
                      createVNode("span", { class: "text-caption text-medium-emphasis" }, [
                        createVNode(VIcon, { size: "14" }, {
                          default: withCtx(() => [
                            createTextVNode("mdi-account-group")
                          ]),
                          _: 1
                        }),
                        createTextVNode(" " + toDisplayString(__props.transfer.capacity) + " " + toDisplayString(unref(t)("transfers.passengers")), 1)
                      ])
                    ]),
                    createVNode("h3", {
                      class: "text-body-1 font-weight-bold text-primary mb-1 text-wrap",
                      style: { "line-height": "1.3" }
                    }, toDisplayString(__props.transfer.name), 1),
                    createVNode("div", { class: "text-caption text-medium-emphasis mb-1" }, [
                      createVNode(VIcon, { size: "14" }, {
                        default: withCtx(() => [
                          createTextVNode("mdi-map-marker-right")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" " + toDisplayString(__props.transfer.from_location) + " \u2192 " + toDisplayString(__props.transfer.to_location), 1)
                    ]),
                    __props.transfer.duration_hours ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-caption text-medium-emphasis mb-3"
                    }, [
                      createVNode(VIcon, { size: "14" }, {
                        default: withCtx(() => [
                          createTextVNode("mdi-clock-outline")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" " + toDisplayString(__props.transfer.duration_hours) + "h ", 1)
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "d-flex align-center justify-space-between" }, [
                      createVNode("div", null, [
                        createVNode("span", { class: "text-h6 font-weight-black text-primary" }, "$" + toDisplayString(__props.transfer.price_usd), 1),
                        createVNode("span", { class: "text-caption text-medium-emphasis ml-1" }, "/" + toDisplayString(unref(t)("transfers.capacity")), 1)
                      ]),
                      createVNode(VBtn, {
                        color: "cta",
                        size: "small",
                        rounded: "lg",
                        onClick: addToCart
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("cart.add")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "card-image d-flex align-center justify-center" }, [
                createVNode(VIcon, {
                  size: "48",
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
                  createVNode("div", { class: "d-flex align-center mb-2" }, [
                    createVNode(VChip, {
                      size: "x-small",
                      color: "accent",
                      variant: "flat",
                      class: "mr-2"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Transfer")
                      ]),
                      _: 1
                    }),
                    createVNode("span", { class: "text-caption text-medium-emphasis" }, [
                      createVNode(VIcon, { size: "14" }, {
                        default: withCtx(() => [
                          createTextVNode("mdi-account-group")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" " + toDisplayString(__props.transfer.capacity) + " " + toDisplayString(unref(t)("transfers.passengers")), 1)
                    ])
                  ]),
                  createVNode("h3", {
                    class: "text-body-1 font-weight-bold text-primary mb-1 text-wrap",
                    style: { "line-height": "1.3" }
                  }, toDisplayString(__props.transfer.name), 1),
                  createVNode("div", { class: "text-caption text-medium-emphasis mb-1" }, [
                    createVNode(VIcon, { size: "14" }, {
                      default: withCtx(() => [
                        createTextVNode("mdi-map-marker-right")
                      ]),
                      _: 1
                    }),
                    createTextVNode(" " + toDisplayString(__props.transfer.from_location) + " \u2192 " + toDisplayString(__props.transfer.to_location), 1)
                  ]),
                  __props.transfer.duration_hours ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-caption text-medium-emphasis mb-3"
                  }, [
                    createVNode(VIcon, { size: "14" }, {
                      default: withCtx(() => [
                        createTextVNode("mdi-clock-outline")
                      ]),
                      _: 1
                    }),
                    createTextVNode(" " + toDisplayString(__props.transfer.duration_hours) + "h ", 1)
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "d-flex align-center justify-space-between" }, [
                    createVNode("div", null, [
                      createVNode("span", { class: "text-h6 font-weight-black text-primary" }, "$" + toDisplayString(__props.transfer.price_usd), 1),
                      createVNode("span", { class: "text-caption text-medium-emphasis ml-1" }, "/" + toDisplayString(unref(t)("transfers.capacity")), 1)
                    ]),
                    createVNode(VBtn, {
                      color: "cta",
                      size: "small",
                      rounded: "lg",
                      onClick: addToCart
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(t)("cart.add")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TransferCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-93362c6d"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ServiceCard",
  __ssrInlineRender: true,
  props: {
    service: {}
  },
  setup(__props) {
    const { t } = useI18n();
    const cartStore = useCartStore();
    const props = __props;
    function addToCart() {
      cartStore.addItem({
        id: props.service.id,
        type: "service",
        name: props.service.name,
        price: parseFloat(props.service.price_usd),
        currency: "USD",
        quantity: 1,
        slug: props.service.slug
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VCard, mergeProps({
        rounded: "xl",
        class: "h-100 service-card",
        hover: ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card-image d-flex align-center justify-center" data-v-02195fa8${_scopeId}>`);
            _push2(ssrRenderComponent(VIcon, {
              size: "48",
              color: "white",
              style: { "opacity": "0.7" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`mdi-map-marker-star`);
                } else {
                  return [
                    createTextVNode("mdi-map-marker-star")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(VCardText, { class: "pa-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="d-flex align-center mb-2" data-v-02195fa8${_scopeId2}>`);
                  _push3(ssrRenderComponent(VChip, {
                    size: "x-small",
                    color: "primary",
                    variant: "flat",
                    class: "mr-2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(__props.service.category || "Tour")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(__props.service.category || "Tour"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><h3 class="text-body-1 font-weight-bold text-primary mb-2 text-wrap" style="${ssrRenderStyle({ "line-height": "1.3" })}" data-v-02195fa8${_scopeId2}>${ssrInterpolate(__props.service.name)}</h3><p class="text-body-2 text-medium-emphasis mb-3" style="${ssrRenderStyle({ "display": "-webkit-box", "-webkit-line-clamp": "2", "-webkit-box-orient": "vertical", "overflow": "hidden" })}" data-v-02195fa8${_scopeId2}>${ssrInterpolate(__props.service.description)}</p><div class="d-flex align-center justify-space-between" data-v-02195fa8${_scopeId2}><span class="text-h6 font-weight-black text-primary" data-v-02195fa8${_scopeId2}>$${ssrInterpolate(__props.service.price_usd)}</span>`);
                  _push3(ssrRenderComponent(VBtn, {
                    color: "cta",
                    size: "small",
                    rounded: "lg",
                    onClick: addToCart
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(t)("cart.add"))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(t)("cart.add")), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "d-flex align-center mb-2" }, [
                      createVNode(VChip, {
                        size: "x-small",
                        color: "primary",
                        variant: "flat",
                        class: "mr-2"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.service.category || "Tour"), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("h3", {
                      class: "text-body-1 font-weight-bold text-primary mb-2 text-wrap",
                      style: { "line-height": "1.3" }
                    }, toDisplayString(__props.service.name), 1),
                    createVNode("p", {
                      class: "text-body-2 text-medium-emphasis mb-3",
                      style: { "display": "-webkit-box", "-webkit-line-clamp": "2", "-webkit-box-orient": "vertical", "overflow": "hidden" }
                    }, toDisplayString(__props.service.description), 1),
                    createVNode("div", { class: "d-flex align-center justify-space-between" }, [
                      createVNode("span", { class: "text-h6 font-weight-black text-primary" }, "$" + toDisplayString(__props.service.price_usd), 1),
                      createVNode(VBtn, {
                        color: "cta",
                        size: "small",
                        rounded: "lg",
                        onClick: addToCart
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("cart.add")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "card-image d-flex align-center justify-center" }, [
                createVNode(VIcon, {
                  size: "48",
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
                  createVNode("div", { class: "d-flex align-center mb-2" }, [
                    createVNode(VChip, {
                      size: "x-small",
                      color: "primary",
                      variant: "flat",
                      class: "mr-2"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(__props.service.category || "Tour"), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("h3", {
                    class: "text-body-1 font-weight-bold text-primary mb-2 text-wrap",
                    style: { "line-height": "1.3" }
                  }, toDisplayString(__props.service.name), 1),
                  createVNode("p", {
                    class: "text-body-2 text-medium-emphasis mb-3",
                    style: { "display": "-webkit-box", "-webkit-line-clamp": "2", "-webkit-box-orient": "vertical", "overflow": "hidden" }
                  }, toDisplayString(__props.service.description), 1),
                  createVNode("div", { class: "d-flex align-center justify-space-between" }, [
                    createVNode("span", { class: "text-h6 font-weight-black text-primary" }, "$" + toDisplayString(__props.service.price_usd), 1),
                    createVNode(VBtn, {
                      color: "cta",
                      size: "small",
                      rounded: "lg",
                      onClick: addToCart
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(t)("cart.add")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ServiceCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-02195fa8"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { t, locale } = useI18n();
    const localePath = useLocalePath();
    const config = useRuntimeConfig();
    const api = useApi();
    const { data: catalog, pending } = ([__temp, __restore] = withAsyncContext(() => api.fetchCatalog()), __temp = await __temp, __restore(), __temp);
    const transfers = computed(() => {
      var _a;
      return (_a = catalog.value) == null ? void 0 : _a.transfers;
    });
    const { data: postsData } = ([__temp, __restore] = withAsyncContext(() => api.fetchPosts(locale.value)), __temp = await __temp, __restore(), __temp);
    const posts = computed(() => {
      var _a;
      return ((_a = postsData.value) == null ? void 0 : _a.data) || postsData.value || [];
    });
    const trackNumber = ref("");
    const tracking = ref(false);
    const trackResult = ref(null);
    const trackError = ref("");
    async function trackOrder() {
      if (!trackNumber.value.trim()) return;
      tracking.value = true;
      trackError.value = "";
      trackResult.value = null;
      try {
        trackResult.value = await api.trackOrder(trackNumber.value.trim());
      } catch {
        trackError.value = "Buyurtma topilmadi.";
      } finally {
        tracking.value = false;
      }
    }
    function statusColor(status) {
      const map = { pending: "warning", confirmed: "info", completed: "success", cancelled: "error" };
      return map[status] || "default";
    }
    const stats = [
      { value: "500+", label: "Mijozlar" },
      { value: "7", label: "Transfer yo'nalishlari" },
      { value: "4+", label: "Yillik tajriba" },
      { value: "100%", label: "Mamnunlik" }
    ];
    const features = [
      { icon: "mdi-car-side", color: "primary", title: "Xususiy transfer", desc: "Qulay va xavfsiz xususiy avtomobil bilan siz uchun." },
      { icon: "mdi-shield-check", color: "success", title: "Ishonchli", desc: "To'lov tasdiqlangandan keyin bron aniq." },
      { icon: "mdi-translate", color: "accent", title: "3 tilda", desc: "O'zbek, rus va ingliz tillarida xizmat." },
      { icon: "mdi-headset", color: "cta", title: "24/7 qo'llab-quvvatlash", desc: "WhatsApp va Telegram orqali har doim bog'laning." }
    ];
    const travelAgencySchema = {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      name: "Khiva Tour Guide",
      url: config.public.siteUrl,
      description: t("hero.subtitle"),
      address: {
        "@type": "PostalAddress",
        addressLocality: "Khiva",
        addressCountry: "UZ"
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: ["Uzbek", "Russian", "English"]
      },
      sameAs: [
        `https://wa.me/${config.public.whatsapp}`,
        `https://t.me/${config.public.telegram}`
      ]
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_Head = Head;
      const _component_Title = Title;
      const _component_Meta = Meta;
      const _component_Link = Link;
      const _component_TransferCard = __nuxt_component_4;
      const _component_ServiceCard = __nuxt_component_5;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-d7406e46>`);
      _push(ssrRenderComponent(_component_Head, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Title, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("hero.title"))} | Khiva Tour Guide`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("hero.title")) + " | Khiva Tour Guide", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Meta, {
              name: "description",
              content: unref(t)("hero.subtitle")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Meta, {
              property: "og:title",
              content: `${unref(t)("hero.title")} | Khiva Tour Guide`
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Meta, {
              property: "og:description",
              content: unref(t)("hero.subtitle")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Meta, {
              property: "og:type",
              content: "website"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Meta, {
              property: "og:url",
              content: `${unref(config).public.siteUrl}${unref(localePath)("/")}`
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Link, {
              rel: "alternate",
              hreflang: "en",
              href: `${unref(config).public.siteUrl}/en`
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Link, {
              rel: "alternate",
              hreflang: "ru",
              href: `${unref(config).public.siteUrl}/ru`
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Link, {
              rel: "alternate",
              hreflang: "uz",
              href: `${unref(config).public.siteUrl}/uz`
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Link, {
              rel: "alternate",
              hreflang: "x-default",
              href: `${unref(config).public.siteUrl}/en`
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Title, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("hero.title")) + " | Khiva Tour Guide", 1)
                ]),
                _: 1
              }),
              createVNode(_component_Meta, {
                name: "description",
                content: unref(t)("hero.subtitle")
              }, null, 8, ["content"]),
              createVNode(_component_Meta, {
                property: "og:title",
                content: `${unref(t)("hero.title")} | Khiva Tour Guide`
              }, null, 8, ["content"]),
              createVNode(_component_Meta, {
                property: "og:description",
                content: unref(t)("hero.subtitle")
              }, null, 8, ["content"]),
              createVNode(_component_Meta, {
                property: "og:type",
                content: "website"
              }),
              createVNode(_component_Meta, {
                property: "og:url",
                content: `${unref(config).public.siteUrl}${unref(localePath)("/")}`
              }, null, 8, ["content"]),
              createVNode(_component_Link, {
                rel: "alternate",
                hreflang: "en",
                href: `${unref(config).public.siteUrl}/en`
              }, null, 8, ["href"]),
              createVNode(_component_Link, {
                rel: "alternate",
                hreflang: "ru",
                href: `${unref(config).public.siteUrl}/ru`
              }, null, 8, ["href"]),
              createVNode(_component_Link, {
                rel: "alternate",
                hreflang: "uz",
                href: `${unref(config).public.siteUrl}/uz`
              }, null, 8, ["href"]),
              createVNode(_component_Link, {
                rel: "alternate",
                hreflang: "x-default",
                href: `${unref(config).public.siteUrl}/en`
              }, null, 8, ["href"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<script type="application/ld+json" data-v-d7406e46>${(_a = JSON.stringify(travelAgencySchema)) != null ? _a : ""}<\/script><section class="hero-section" data-v-d7406e46>`);
      _push(ssrRenderComponent(VContainer, { class: "py-16" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, {
              align: "center",
              justify: "center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    md: "8",
                    class: "text-center"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-caption text-accent mb-2 font-weight-medium" style="${ssrRenderStyle({ "letter-spacing": "3px", "text-transform": "uppercase" })}" data-v-d7406e46${_scopeId3}> Khiva, Uzbekistan </div><h1 class="text-h3 text-md-h2 font-weight-black text-white mb-4" style="${ssrRenderStyle({ "line-height": "1.15" })}" data-v-d7406e46${_scopeId3}>${ssrInterpolate(unref(t)("hero.title"))}</h1><p class="text-h6 text-white mb-8" style="${ssrRenderStyle({ "opacity": "0.85", "font-weight": "400", "max-width": "580px", "margin": "0 auto 2rem" })}" data-v-d7406e46${_scopeId3}>${ssrInterpolate(unref(t)("hero.subtitle"))}</p><div class="d-flex gap-4 justify-center flex-wrap" data-v-d7406e46${_scopeId3}>`);
                        _push4(ssrRenderComponent(VBtn, {
                          to: unref(localePath)("/checkout"),
                          color: "cta",
                          size: "x-large",
                          rounded: "lg",
                          elevation: "0",
                          class: "font-weight-bold px-8"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(t)("hero.cta"))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(t)("hero.cta")), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          to: unref(localePath)("/transfers"),
                          variant: "outlined",
                          size: "x-large",
                          rounded: "lg",
                          class: "text-white font-weight-bold px-8",
                          style: { "border-color": "rgba(255,255,255,0.5)" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(t)("hero.cta2"))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(t)("hero.cta2")), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", {
                            class: "text-caption text-accent mb-2 font-weight-medium",
                            style: { "letter-spacing": "3px", "text-transform": "uppercase" }
                          }, " Khiva, Uzbekistan "),
                          createVNode("h1", {
                            class: "text-h3 text-md-h2 font-weight-black text-white mb-4",
                            style: { "line-height": "1.15" }
                          }, toDisplayString(unref(t)("hero.title")), 1),
                          createVNode("p", {
                            class: "text-h6 text-white mb-8",
                            style: { "opacity": "0.85", "font-weight": "400", "max-width": "580px", "margin": "0 auto 2rem" }
                          }, toDisplayString(unref(t)("hero.subtitle")), 1),
                          createVNode("div", { class: "d-flex gap-4 justify-center flex-wrap" }, [
                            createVNode(VBtn, {
                              to: unref(localePath)("/checkout"),
                              color: "cta",
                              size: "x-large",
                              rounded: "lg",
                              elevation: "0",
                              class: "font-weight-bold px-8"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(t)("hero.cta")), 1)
                              ]),
                              _: 1
                            }, 8, ["to"]),
                            createVNode(VBtn, {
                              to: unref(localePath)("/transfers"),
                              variant: "outlined",
                              size: "x-large",
                              rounded: "lg",
                              class: "text-white font-weight-bold px-8",
                              style: { "border-color": "rgba(255,255,255,0.5)" }
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(t)("hero.cta2")), 1)
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
                      md: "8",
                      class: "text-center"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", {
                          class: "text-caption text-accent mb-2 font-weight-medium",
                          style: { "letter-spacing": "3px", "text-transform": "uppercase" }
                        }, " Khiva, Uzbekistan "),
                        createVNode("h1", {
                          class: "text-h3 text-md-h2 font-weight-black text-white mb-4",
                          style: { "line-height": "1.15" }
                        }, toDisplayString(unref(t)("hero.title")), 1),
                        createVNode("p", {
                          class: "text-h6 text-white mb-8",
                          style: { "opacity": "0.85", "font-weight": "400", "max-width": "580px", "margin": "0 auto 2rem" }
                        }, toDisplayString(unref(t)("hero.subtitle")), 1),
                        createVNode("div", { class: "d-flex gap-4 justify-center flex-wrap" }, [
                          createVNode(VBtn, {
                            to: unref(localePath)("/checkout"),
                            color: "cta",
                            size: "x-large",
                            rounded: "lg",
                            elevation: "0",
                            class: "font-weight-bold px-8"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(t)("hero.cta")), 1)
                            ]),
                            _: 1
                          }, 8, ["to"]),
                          createVNode(VBtn, {
                            to: unref(localePath)("/transfers"),
                            variant: "outlined",
                            size: "x-large",
                            rounded: "lg",
                            class: "text-white font-weight-bold px-8",
                            style: { "border-color": "rgba(255,255,255,0.5)" }
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(t)("hero.cta2")), 1)
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
              createVNode(VRow, {
                align: "center",
                justify: "center"
              }, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    md: "8",
                    class: "text-center"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", {
                        class: "text-caption text-accent mb-2 font-weight-medium",
                        style: { "letter-spacing": "3px", "text-transform": "uppercase" }
                      }, " Khiva, Uzbekistan "),
                      createVNode("h1", {
                        class: "text-h3 text-md-h2 font-weight-black text-white mb-4",
                        style: { "line-height": "1.15" }
                      }, toDisplayString(unref(t)("hero.title")), 1),
                      createVNode("p", {
                        class: "text-h6 text-white mb-8",
                        style: { "opacity": "0.85", "font-weight": "400", "max-width": "580px", "margin": "0 auto 2rem" }
                      }, toDisplayString(unref(t)("hero.subtitle")), 1),
                      createVNode("div", { class: "d-flex gap-4 justify-center flex-wrap" }, [
                        createVNode(VBtn, {
                          to: unref(localePath)("/checkout"),
                          color: "cta",
                          size: "x-large",
                          rounded: "lg",
                          elevation: "0",
                          class: "font-weight-bold px-8"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(t)("hero.cta")), 1)
                          ]),
                          _: 1
                        }, 8, ["to"]),
                        createVNode(VBtn, {
                          to: unref(localePath)("/transfers"),
                          variant: "outlined",
                          size: "x-large",
                          rounded: "lg",
                          class: "text-white font-weight-bold px-8",
                          style: { "border-color": "rgba(255,255,255,0.5)" }
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(t)("hero.cta2")), 1)
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
      _push(`<div class="stats-bar" data-v-d7406e46>`);
      _push(ssrRenderComponent(VContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { justify: "center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(stats, (stat) => {
                    _push3(ssrRenderComponent(VCol, {
                      key: stat.value,
                      cols: "6",
                      sm: "3",
                      class: "text-center"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="text-h5 font-weight-black text-accent" data-v-d7406e46${_scopeId3}>${ssrInterpolate(stat.value)}</div><div class="text-caption text-white" style="${ssrRenderStyle({ "opacity": "0.8" })}" data-v-d7406e46${_scopeId3}>${ssrInterpolate(stat.label)}</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "text-h5 font-weight-black text-accent" }, toDisplayString(stat.value), 1),
                            createVNode("div", {
                              class: "text-caption text-white",
                              style: { "opacity": "0.8" }
                            }, toDisplayString(stat.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(stats, (stat) => {
                      return createVNode(VCol, {
                        key: stat.value,
                        cols: "6",
                        sm: "3",
                        class: "text-center"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-h5 font-weight-black text-accent" }, toDisplayString(stat.value), 1),
                          createVNode("div", {
                            class: "text-caption text-white",
                            style: { "opacity": "0.8" }
                          }, toDisplayString(stat.label), 1)
                        ]),
                        _: 2
                      }, 1024);
                    }), 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VRow, { justify: "center" }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(stats, (stat) => {
                    return createVNode(VCol, {
                      key: stat.value,
                      cols: "6",
                      sm: "3",
                      class: "text-center"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-h5 font-weight-black text-accent" }, toDisplayString(stat.value), 1),
                        createVNode("div", {
                          class: "text-caption text-white",
                          style: { "opacity": "0.8" }
                        }, toDisplayString(stat.label), 1)
                      ]),
                      _: 2
                    }, 1024);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section><section class="py-14" data-v-d7406e46>`);
      _push(ssrRenderComponent(VContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="text-center mb-10" data-v-d7406e46${_scopeId}><h2 class="text-h4 font-weight-bold text-primary mb-2" data-v-d7406e46${_scopeId}>${ssrInterpolate(unref(t)("transfers.title"))}</h2><p class="text-medium-emphasis" data-v-d7406e46${_scopeId}>${ssrInterpolate(unref(t)("transfers.subtitle"))}</p></div>`);
            if (unref(pending)) {
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(4, (i) => {
                      _push3(ssrRenderComponent(VCol, {
                        key: i,
                        cols: "12",
                        sm: "6",
                        lg: "3"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(VSkeletonLoader, {
                              type: "card",
                              rounded: "lg"
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(VSkeletonLoader, {
                                type: "card",
                                rounded: "lg"
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
                      (openBlock(), createBlock(Fragment, null, renderList(4, (i) => {
                        return createVNode(VCol, {
                          key: i,
                          cols: "12",
                          sm: "6",
                          lg: "3"
                        }, {
                          default: withCtx(() => [
                            createVNode(VSkeletonLoader, {
                              type: "card",
                              rounded: "lg"
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
                  var _a2, _b2;
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList((_a2 = unref(transfers)) == null ? void 0 : _a2.slice(0, 4), (transfer) => {
                      _push3(ssrRenderComponent(VCol, {
                        key: transfer.id,
                        cols: "12",
                        sm: "6",
                        lg: "3"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_TransferCard, { transfer }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_TransferCard, { transfer }, null, 8, ["transfer"])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList((_b2 = unref(transfers)) == null ? void 0 : _b2.slice(0, 4), (transfer) => {
                        return openBlock(), createBlock(VCol, {
                          key: transfer.id,
                          cols: "12",
                          sm: "6",
                          lg: "3"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_TransferCard, { transfer }, null, 8, ["transfer"])
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
            _push2(`<div class="text-center mt-8" data-v-d7406e46${_scopeId}>`);
            _push2(ssrRenderComponent(VBtn, {
              to: unref(localePath)("/transfers"),
              variant: "outlined",
              color: "primary",
              size: "large",
              rounded: "lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("transfers.title"))} \u2192 `);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("transfers.title")) + " \u2192 ", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "text-center mb-10" }, [
                createVNode("h2", { class: "text-h4 font-weight-bold text-primary mb-2" }, toDisplayString(unref(t)("transfers.title")), 1),
                createVNode("p", { class: "text-medium-emphasis" }, toDisplayString(unref(t)("transfers.subtitle")), 1)
              ]),
              unref(pending) ? (openBlock(), createBlock(VRow, { key: 0 }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(4, (i) => {
                    return createVNode(VCol, {
                      key: i,
                      cols: "12",
                      sm: "6",
                      lg: "3"
                    }, {
                      default: withCtx(() => [
                        createVNode(VSkeletonLoader, {
                          type: "card",
                          rounded: "lg"
                        })
                      ]),
                      _: 1
                    });
                  }), 64))
                ]),
                _: 1
              })) : (openBlock(), createBlock(VRow, { key: 1 }, {
                default: withCtx(() => {
                  var _a2;
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList((_a2 = unref(transfers)) == null ? void 0 : _a2.slice(0, 4), (transfer) => {
                      return openBlock(), createBlock(VCol, {
                        key: transfer.id,
                        cols: "12",
                        sm: "6",
                        lg: "3"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_TransferCard, { transfer }, null, 8, ["transfer"])
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ];
                }),
                _: 1
              })),
              createVNode("div", { class: "text-center mt-8" }, [
                createVNode(VBtn, {
                  to: unref(localePath)("/transfers"),
                  variant: "outlined",
                  color: "primary",
                  size: "large",
                  rounded: "lg"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("transfers.title")) + " \u2192 ", 1)
                  ]),
                  _: 1
                }, 8, ["to"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section class="py-14 bg-surface-variant" data-v-d7406e46>`);
      _push(ssrRenderComponent(VContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="text-center mb-10" data-v-d7406e46${_scopeId}><h2 class="text-h4 font-weight-bold text-primary mb-2" data-v-d7406e46${_scopeId}>${ssrInterpolate(unref(t)("services.title"))}</h2><p class="text-medium-emphasis" data-v-d7406e46${_scopeId}>${ssrInterpolate(unref(t)("services.subtitle"))}</p></div>`);
            if (unref(pending)) {
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(3, (i) => {
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
                              rounded: "lg"
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(VSkeletonLoader, {
                                type: "card",
                                rounded: "lg"
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
                      (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                        return createVNode(VCol, {
                          key: i,
                          cols: "12",
                          sm: "6",
                          md: "4"
                        }, {
                          default: withCtx(() => [
                            createVNode(VSkeletonLoader, {
                              type: "card",
                              rounded: "lg"
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
                  var _a2, _b2, _c, _d;
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList((_b2 = (_a2 = unref(catalog)) == null ? void 0 : _a2.services) == null ? void 0 : _b2.slice(0, 3), (service) => {
                      _push3(ssrRenderComponent(VCol, {
                        key: service.id,
                        cols: "12",
                        sm: "6",
                        md: "4"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_ServiceCard, { service }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_ServiceCard, { service }, null, 8, ["service"])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList((_d = (_c = unref(catalog)) == null ? void 0 : _c.services) == null ? void 0 : _d.slice(0, 3), (service) => {
                        return openBlock(), createBlock(VCol, {
                          key: service.id,
                          cols: "12",
                          sm: "6",
                          md: "4"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_ServiceCard, { service }, null, 8, ["service"])
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
            _push2(`<div class="text-center mt-8" data-v-d7406e46${_scopeId}>`);
            _push2(ssrRenderComponent(VBtn, {
              to: unref(localePath)("/services"),
              variant: "outlined",
              color: "primary",
              size: "large",
              rounded: "lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("services.title"))} \u2192 `);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("services.title")) + " \u2192 ", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "text-center mb-10" }, [
                createVNode("h2", { class: "text-h4 font-weight-bold text-primary mb-2" }, toDisplayString(unref(t)("services.title")), 1),
                createVNode("p", { class: "text-medium-emphasis" }, toDisplayString(unref(t)("services.subtitle")), 1)
              ]),
              unref(pending) ? (openBlock(), createBlock(VRow, { key: 0 }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                    return createVNode(VCol, {
                      key: i,
                      cols: "12",
                      sm: "6",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode(VSkeletonLoader, {
                          type: "card",
                          rounded: "lg"
                        })
                      ]),
                      _: 1
                    });
                  }), 64))
                ]),
                _: 1
              })) : (openBlock(), createBlock(VRow, { key: 1 }, {
                default: withCtx(() => {
                  var _a2, _b2;
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList((_b2 = (_a2 = unref(catalog)) == null ? void 0 : _a2.services) == null ? void 0 : _b2.slice(0, 3), (service) => {
                      return openBlock(), createBlock(VCol, {
                        key: service.id,
                        cols: "12",
                        sm: "6",
                        md: "4"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_ServiceCard, { service }, null, 8, ["service"])
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ];
                }),
                _: 1
              })),
              createVNode("div", { class: "text-center mt-8" }, [
                createVNode(VBtn, {
                  to: unref(localePath)("/services"),
                  variant: "outlined",
                  color: "primary",
                  size: "large",
                  rounded: "lg"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("services.title")) + " \u2192 ", 1)
                  ]),
                  _: 1
                }, 8, ["to"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section class="py-14" data-v-d7406e46>`);
      _push(ssrRenderComponent(VContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="text-center mb-10" data-v-d7406e46${_scopeId}><h2 class="text-h4 font-weight-bold text-primary mb-2" data-v-d7406e46${_scopeId}>Nima uchun biz?</h2></div>`);
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(features, (feature) => {
                    _push3(ssrRenderComponent(VCol, {
                      key: feature.icon,
                      cols: "12",
                      sm: "6",
                      md: "3"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VCard, {
                            rounded: "xl",
                            variant: "flat",
                            class: "text-center pa-6 h-100",
                            color: "background"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VIcon, {
                                  color: feature.color,
                                  size: "48",
                                  class: "mb-4"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(feature.icon)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(feature.icon), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(`<h3 class="text-h6 font-weight-bold mb-2" data-v-d7406e46${_scopeId4}>${ssrInterpolate(feature.title)}</h3><p class="text-medium-emphasis text-body-2" data-v-d7406e46${_scopeId4}>${ssrInterpolate(feature.desc)}</p>`);
                              } else {
                                return [
                                  createVNode(VIcon, {
                                    color: feature.color,
                                    size: "48",
                                    class: "mb-4"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(feature.icon), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["color"]),
                                  createVNode("h3", { class: "text-h6 font-weight-bold mb-2" }, toDisplayString(feature.title), 1),
                                  createVNode("p", { class: "text-medium-emphasis text-body-2" }, toDisplayString(feature.desc), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VCard, {
                              rounded: "xl",
                              variant: "flat",
                              class: "text-center pa-6 h-100",
                              color: "background"
                            }, {
                              default: withCtx(() => [
                                createVNode(VIcon, {
                                  color: feature.color,
                                  size: "48",
                                  class: "mb-4"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(feature.icon), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["color"]),
                                createVNode("h3", { class: "text-h6 font-weight-bold mb-2" }, toDisplayString(feature.title), 1),
                                createVNode("p", { class: "text-medium-emphasis text-body-2" }, toDisplayString(feature.desc), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(features, (feature) => {
                      return createVNode(VCol, {
                        key: feature.icon,
                        cols: "12",
                        sm: "6",
                        md: "3"
                      }, {
                        default: withCtx(() => [
                          createVNode(VCard, {
                            rounded: "xl",
                            variant: "flat",
                            class: "text-center pa-6 h-100",
                            color: "background"
                          }, {
                            default: withCtx(() => [
                              createVNode(VIcon, {
                                color: feature.color,
                                size: "48",
                                class: "mb-4"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(feature.icon), 1)
                                ]),
                                _: 2
                              }, 1032, ["color"]),
                              createVNode("h3", { class: "text-h6 font-weight-bold mb-2" }, toDisplayString(feature.title), 1),
                              createVNode("p", { class: "text-medium-emphasis text-body-2" }, toDisplayString(feature.desc), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024);
                    }), 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "text-center mb-10" }, [
                createVNode("h2", { class: "text-h4 font-weight-bold text-primary mb-2" }, "Nima uchun biz?")
              ]),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(features, (feature) => {
                    return createVNode(VCol, {
                      key: feature.icon,
                      cols: "12",
                      sm: "6",
                      md: "3"
                    }, {
                      default: withCtx(() => [
                        createVNode(VCard, {
                          rounded: "xl",
                          variant: "flat",
                          class: "text-center pa-6 h-100",
                          color: "background"
                        }, {
                          default: withCtx(() => [
                            createVNode(VIcon, {
                              color: feature.color,
                              size: "48",
                              class: "mb-4"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(feature.icon), 1)
                              ]),
                              _: 2
                            }, 1032, ["color"]),
                            createVNode("h3", { class: "text-h6 font-weight-bold mb-2" }, toDisplayString(feature.title), 1),
                            createVNode("p", { class: "text-medium-emphasis text-body-2" }, toDisplayString(feature.desc), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section class="py-14 bg-primary" data-v-d7406e46>`);
      _push(ssrRenderComponent(VContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { justify: "center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    md: "6",
                    class: "text-center"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<h2 class="text-h4 font-weight-bold text-white mb-2" data-v-d7406e46${_scopeId3}>${ssrInterpolate(unref(t)("track.title"))}</h2><p class="text-white mb-6" style="${ssrRenderStyle({ "opacity": "0.8" })}" data-v-d7406e46${_scopeId3}>${ssrInterpolate(unref(t)("track.placeholder"))}</p><div class="d-flex gap-3" data-v-d7406e46${_scopeId3}>`);
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(trackNumber),
                          "onUpdate:modelValue": ($event) => isRef(trackNumber) ? trackNumber.value = $event : null,
                          placeholder: unref(t)("track.placeholder"),
                          variant: "solo",
                          rounded: "lg",
                          "hide-details": "",
                          "bg-color": "white",
                          onKeyup: trackOrder
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          color: "cta",
                          size: "large",
                          rounded: "lg",
                          loading: unref(tracking),
                          onClick: trackOrder
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(t)("track.btn"))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(t)("track.btn")), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                        if (unref(trackResult)) {
                          _push4(ssrRenderComponent(VCard, {
                            class: "mt-4 text-left",
                            rounded: "lg"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VCardText, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="d-flex justify-between mb-2" data-v-d7406e46${_scopeId5}><span class="font-weight-bold" data-v-d7406e46${_scopeId5}>${ssrInterpolate(unref(trackResult).order_number)}</span>`);
                                      _push6(ssrRenderComponent(VChip, {
                                        color: statusColor(unref(trackResult).status),
                                        size: "small"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(unref(trackResult).status)}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(unref(trackResult).status), 1)
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(`</div><div class="text-body-2 text-medium-emphasis" data-v-d7406e46${_scopeId5}>${ssrInterpolate(unref(t)("track.total"))}: $${ssrInterpolate(unref(trackResult).total_price)}</div>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "d-flex justify-between mb-2" }, [
                                          createVNode("span", { class: "font-weight-bold" }, toDisplayString(unref(trackResult).order_number), 1),
                                          createVNode(VChip, {
                                            color: statusColor(unref(trackResult).status),
                                            size: "small"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(unref(trackResult).status), 1)
                                            ]),
                                            _: 1
                                          }, 8, ["color"])
                                        ]),
                                        createVNode("div", { class: "text-body-2 text-medium-emphasis" }, toDisplayString(unref(t)("track.total")) + ": $" + toDisplayString(unref(trackResult).total_price), 1)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VCardText, null, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "d-flex justify-between mb-2" }, [
                                        createVNode("span", { class: "font-weight-bold" }, toDisplayString(unref(trackResult).order_number), 1),
                                        createVNode(VChip, {
                                          color: statusColor(unref(trackResult).status),
                                          size: "small"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(unref(trackResult).status), 1)
                                          ]),
                                          _: 1
                                        }, 8, ["color"])
                                      ]),
                                      createVNode("div", { class: "text-body-2 text-medium-emphasis" }, toDisplayString(unref(t)("track.total")) + ": $" + toDisplayString(unref(trackResult).total_price), 1)
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(trackError)) {
                          _push4(ssrRenderComponent(VAlert, {
                            type: "error",
                            class: "mt-4",
                            rounded: "lg"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(unref(trackError))}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(unref(trackError)), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode("h2", { class: "text-h4 font-weight-bold text-white mb-2" }, toDisplayString(unref(t)("track.title")), 1),
                          createVNode("p", {
                            class: "text-white mb-6",
                            style: { "opacity": "0.8" }
                          }, toDisplayString(unref(t)("track.placeholder")), 1),
                          createVNode("div", { class: "d-flex gap-3" }, [
                            createVNode(VTextField, {
                              modelValue: unref(trackNumber),
                              "onUpdate:modelValue": ($event) => isRef(trackNumber) ? trackNumber.value = $event : null,
                              placeholder: unref(t)("track.placeholder"),
                              variant: "solo",
                              rounded: "lg",
                              "hide-details": "",
                              "bg-color": "white",
                              onKeyup: withKeys(trackOrder, ["enter"])
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                            createVNode(VBtn, {
                              color: "cta",
                              size: "large",
                              rounded: "lg",
                              loading: unref(tracking),
                              onClick: trackOrder
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(t)("track.btn")), 1)
                              ]),
                              _: 1
                            }, 8, ["loading"])
                          ]),
                          unref(trackResult) ? (openBlock(), createBlock(VCard, {
                            key: 0,
                            class: "mt-4 text-left",
                            rounded: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode(VCardText, null, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "d-flex justify-between mb-2" }, [
                                    createVNode("span", { class: "font-weight-bold" }, toDisplayString(unref(trackResult).order_number), 1),
                                    createVNode(VChip, {
                                      color: statusColor(unref(trackResult).status),
                                      size: "small"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(trackResult).status), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["color"])
                                  ]),
                                  createVNode("div", { class: "text-body-2 text-medium-emphasis" }, toDisplayString(unref(t)("track.total")) + ": $" + toDisplayString(unref(trackResult).total_price), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          unref(trackError) ? (openBlock(), createBlock(VAlert, {
                            key: 1,
                            type: "error",
                            class: "mt-4",
                            rounded: "lg"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(trackError)), 1)
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "12",
                      md: "6",
                      class: "text-center"
                    }, {
                      default: withCtx(() => [
                        createVNode("h2", { class: "text-h4 font-weight-bold text-white mb-2" }, toDisplayString(unref(t)("track.title")), 1),
                        createVNode("p", {
                          class: "text-white mb-6",
                          style: { "opacity": "0.8" }
                        }, toDisplayString(unref(t)("track.placeholder")), 1),
                        createVNode("div", { class: "d-flex gap-3" }, [
                          createVNode(VTextField, {
                            modelValue: unref(trackNumber),
                            "onUpdate:modelValue": ($event) => isRef(trackNumber) ? trackNumber.value = $event : null,
                            placeholder: unref(t)("track.placeholder"),
                            variant: "solo",
                            rounded: "lg",
                            "hide-details": "",
                            "bg-color": "white",
                            onKeyup: withKeys(trackOrder, ["enter"])
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                          createVNode(VBtn, {
                            color: "cta",
                            size: "large",
                            rounded: "lg",
                            loading: unref(tracking),
                            onClick: trackOrder
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(t)("track.btn")), 1)
                            ]),
                            _: 1
                          }, 8, ["loading"])
                        ]),
                        unref(trackResult) ? (openBlock(), createBlock(VCard, {
                          key: 0,
                          class: "mt-4 text-left",
                          rounded: "lg"
                        }, {
                          default: withCtx(() => [
                            createVNode(VCardText, null, {
                              default: withCtx(() => [
                                createVNode("div", { class: "d-flex justify-between mb-2" }, [
                                  createVNode("span", { class: "font-weight-bold" }, toDisplayString(unref(trackResult).order_number), 1),
                                  createVNode(VChip, {
                                    color: statusColor(unref(trackResult).status),
                                    size: "small"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(trackResult).status), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["color"])
                                ]),
                                createVNode("div", { class: "text-body-2 text-medium-emphasis" }, toDisplayString(unref(t)("track.total")) + ": $" + toDisplayString(unref(trackResult).total_price), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        unref(trackError) ? (openBlock(), createBlock(VAlert, {
                          key: 1,
                          type: "error",
                          class: "mt-4",
                          rounded: "lg"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(trackError)), 1)
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
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
                    md: "6",
                    class: "text-center"
                  }, {
                    default: withCtx(() => [
                      createVNode("h2", { class: "text-h4 font-weight-bold text-white mb-2" }, toDisplayString(unref(t)("track.title")), 1),
                      createVNode("p", {
                        class: "text-white mb-6",
                        style: { "opacity": "0.8" }
                      }, toDisplayString(unref(t)("track.placeholder")), 1),
                      createVNode("div", { class: "d-flex gap-3" }, [
                        createVNode(VTextField, {
                          modelValue: unref(trackNumber),
                          "onUpdate:modelValue": ($event) => isRef(trackNumber) ? trackNumber.value = $event : null,
                          placeholder: unref(t)("track.placeholder"),
                          variant: "solo",
                          rounded: "lg",
                          "hide-details": "",
                          "bg-color": "white",
                          onKeyup: withKeys(trackOrder, ["enter"])
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                        createVNode(VBtn, {
                          color: "cta",
                          size: "large",
                          rounded: "lg",
                          loading: unref(tracking),
                          onClick: trackOrder
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(t)("track.btn")), 1)
                          ]),
                          _: 1
                        }, 8, ["loading"])
                      ]),
                      unref(trackResult) ? (openBlock(), createBlock(VCard, {
                        key: 0,
                        class: "mt-4 text-left",
                        rounded: "lg"
                      }, {
                        default: withCtx(() => [
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "d-flex justify-between mb-2" }, [
                                createVNode("span", { class: "font-weight-bold" }, toDisplayString(unref(trackResult).order_number), 1),
                                createVNode(VChip, {
                                  color: statusColor(unref(trackResult).status),
                                  size: "small"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(trackResult).status), 1)
                                  ]),
                                  _: 1
                                }, 8, ["color"])
                              ]),
                              createVNode("div", { class: "text-body-2 text-medium-emphasis" }, toDisplayString(unref(t)("track.total")) + ": $" + toDisplayString(unref(trackResult).total_price), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      unref(trackError) ? (openBlock(), createBlock(VAlert, {
                        key: 1,
                        type: "error",
                        class: "mt-4",
                        rounded: "lg"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(trackError)), 1)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
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
      _push(`</section>`);
      if ((_b = unref(posts)) == null ? void 0 : _b.length) {
        _push(`<section class="py-14" data-v-d7406e46>`);
        _push(ssrRenderComponent(VContainer, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="text-center mb-10" data-v-d7406e46${_scopeId}><h2 class="text-h4 font-weight-bold text-primary mb-2" data-v-d7406e46${_scopeId}>${ssrInterpolate(unref(t)("blog.title"))}</h2><p class="text-medium-emphasis" data-v-d7406e46${_scopeId}>${ssrInterpolate(unref(t)("blog.subtitle"))}</p></div>`);
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(posts).slice(0, 3), (post) => {
                      _push3(ssrRenderComponent(VCol, {
                        key: post.id,
                        cols: "12",
                        md: "4"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(VCard, {
                              rounded: "xl",
                              class: "h-100",
                              hover: "",
                              to: unref(localePath)(`/blog/${post.slug}`)
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(VCardTitle, { class: "text-wrap pt-4 px-4 text-body-1 font-weight-bold" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(post.title)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(post.title), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(VCardSubtitle, { class: "px-4" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(new Date(post.published_at).toLocaleDateString())}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(new Date(post.published_at).toLocaleDateString()), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(VCardText, { class: "text-medium-emphasis text-body-2" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      var _a2, _b2;
                                      if (_push6) {
                                        _push6(`${ssrInterpolate((_a2 = post.excerpt) == null ? void 0 : _a2.substring(0, 120))}... `);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString((_b2 = post.excerpt) == null ? void 0 : _b2.substring(0, 120)) + "... ", 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(VCardActions, { class: "px-4 pb-4" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(VBtn, {
                                          variant: "text",
                                          color: "primary",
                                          size: "small"
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(unref(t)("blog.read_more"))} \u2192`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(unref(t)("blog.read_more")) + " \u2192", 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(VBtn, {
                                            variant: "text",
                                            color: "primary",
                                            size: "small"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(unref(t)("blog.read_more")) + " \u2192", 1)
                                            ]),
                                            _: 1
                                          })
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(VCardTitle, { class: "text-wrap pt-4 px-4 text-body-1 font-weight-bold" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(post.title), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(VCardSubtitle, { class: "px-4" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(new Date(post.published_at).toLocaleDateString()), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(VCardText, { class: "text-medium-emphasis text-body-2" }, {
                                      default: withCtx(() => {
                                        var _a2;
                                        return [
                                          createTextVNode(toDisplayString((_a2 = post.excerpt) == null ? void 0 : _a2.substring(0, 120)) + "... ", 1)
                                        ];
                                      }),
                                      _: 2
                                    }, 1024),
                                    createVNode(VCardActions, { class: "px-4 pb-4" }, {
                                      default: withCtx(() => [
                                        createVNode(VBtn, {
                                          variant: "text",
                                          color: "primary",
                                          size: "small"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(unref(t)("blog.read_more")) + " \u2192", 1)
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
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
                                to: unref(localePath)(`/blog/${post.slug}`)
                              }, {
                                default: withCtx(() => [
                                  createVNode(VCardTitle, { class: "text-wrap pt-4 px-4 text-body-1 font-weight-bold" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(post.title), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(VCardSubtitle, { class: "px-4" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(new Date(post.published_at).toLocaleDateString()), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(VCardText, { class: "text-medium-emphasis text-body-2" }, {
                                    default: withCtx(() => {
                                      var _a2;
                                      return [
                                        createTextVNode(toDisplayString((_a2 = post.excerpt) == null ? void 0 : _a2.substring(0, 120)) + "... ", 1)
                                      ];
                                    }),
                                    _: 2
                                  }, 1024),
                                  createVNode(VCardActions, { class: "px-4 pb-4" }, {
                                    default: withCtx(() => [
                                      createVNode(VBtn, {
                                        variant: "text",
                                        color: "primary",
                                        size: "small"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(t)("blog.read_more")) + " \u2192", 1)
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
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
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(posts).slice(0, 3), (post) => {
                        return openBlock(), createBlock(VCol, {
                          key: post.id,
                          cols: "12",
                          md: "4"
                        }, {
                          default: withCtx(() => [
                            createVNode(VCard, {
                              rounded: "xl",
                              class: "h-100",
                              hover: "",
                              to: unref(localePath)(`/blog/${post.slug}`)
                            }, {
                              default: withCtx(() => [
                                createVNode(VCardTitle, { class: "text-wrap pt-4 px-4 text-body-1 font-weight-bold" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(post.title), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(VCardSubtitle, { class: "px-4" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(new Date(post.published_at).toLocaleDateString()), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(VCardText, { class: "text-medium-emphasis text-body-2" }, {
                                  default: withCtx(() => {
                                    var _a2;
                                    return [
                                      createTextVNode(toDisplayString((_a2 = post.excerpt) == null ? void 0 : _a2.substring(0, 120)) + "... ", 1)
                                    ];
                                  }),
                                  _: 2
                                }, 1024),
                                createVNode(VCardActions, { class: "px-4 pb-4" }, {
                                  default: withCtx(() => [
                                    createVNode(VBtn, {
                                      variant: "text",
                                      color: "primary",
                                      size: "small"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(t)("blog.read_more")) + " \u2192", 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
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
            } else {
              return [
                createVNode("div", { class: "text-center mb-10" }, [
                  createVNode("h2", { class: "text-h4 font-weight-bold text-primary mb-2" }, toDisplayString(unref(t)("blog.title")), 1),
                  createVNode("p", { class: "text-medium-emphasis" }, toDisplayString(unref(t)("blog.subtitle")), 1)
                ]),
                createVNode(VRow, null, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(posts).slice(0, 3), (post) => {
                      return openBlock(), createBlock(VCol, {
                        key: post.id,
                        cols: "12",
                        md: "4"
                      }, {
                        default: withCtx(() => [
                          createVNode(VCard, {
                            rounded: "xl",
                            class: "h-100",
                            hover: "",
                            to: unref(localePath)(`/blog/${post.slug}`)
                          }, {
                            default: withCtx(() => [
                              createVNode(VCardTitle, { class: "text-wrap pt-4 px-4 text-body-1 font-weight-bold" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(post.title), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(VCardSubtitle, { class: "px-4" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(new Date(post.published_at).toLocaleDateString()), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(VCardText, { class: "text-medium-emphasis text-body-2" }, {
                                default: withCtx(() => {
                                  var _a2;
                                  return [
                                    createTextVNode(toDisplayString((_a2 = post.excerpt) == null ? void 0 : _a2.substring(0, 120)) + "... ", 1)
                                  ];
                                }),
                                _: 2
                              }, 1024),
                              createVNode(VCardActions, { class: "px-4 pb-4" }, {
                                default: withCtx(() => [
                                  createVNode(VBtn, {
                                    variant: "text",
                                    color: "primary",
                                    size: "small"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(t)("blog.read_more")) + " \u2192", 1)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 2
                          }, 1032, ["to"])
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d7406e46"]]);

export { index as default };
//# sourceMappingURL=index-BiN3Jbts.mjs.map
