import { u as useApi, H as Head, T as Title, M as Meta, V as VContainer } from "./VContainer-CvzQlK5R.js";
import { defineComponent, withAsyncContext, computed, withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
import { f as useI18n, g as useLocalePath, _ as _export_sfc } from "../server.mjs";
import { d as VRow, e as VCol, V as VCard, a as VIcon, b as VCardText, c as VBtn } from "./VRow-DQkXkPiv.js";
import { V as VSkeletonLoader } from "./VSkeletonLoader-UZ0j__Io.js";
import "/home/eversoft/Projects/khivatourguide.com/app/landing/node_modules/ohash/dist/index.mjs";
import "@vue/shared";
import "/home/eversoft/Projects/khivatourguide.com/app/landing/node_modules/perfect-debounce/dist/index.mjs";
import "/home/eversoft/Projects/khivatourguide.com/app/landing/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/home/eversoft/Projects/khivatourguide.com/app/landing/node_modules/hookable/dist/index.mjs";
import "/home/eversoft/Projects/khivatourguide.com/app/landing/node_modules/unctx/dist/index.mjs";
import "/home/eversoft/Projects/khivatourguide.com/app/landing/node_modules/h3/dist/index.mjs";
import "pinia";
import "/home/eversoft/Projects/khivatourguide.com/app/landing/node_modules/defu/dist/defu.mjs";
import "@vue/devtools-api";
import "vue-router";
import "/home/eversoft/Projects/khivatourguide.com/app/landing/node_modules/ufo/dist/index.mjs";
import "/home/eversoft/Projects/khivatourguide.com/app/landing/node_modules/klona/dist/index.mjs";
import "/home/eversoft/Projects/khivatourguide.com/app/landing/node_modules/@unhead/vue/dist/index.mjs";
import "/home/eversoft/Projects/khivatourguide.com/app/landing/node_modules/consola/dist/index.mjs";
import "/home/eversoft/Projects/khivatourguide.com/app/landing/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/home/eversoft/Projects/khivatourguide.com/app/landing/node_modules/destr/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { t, locale } = useI18n();
    const localePath = useLocalePath();
    const api = useApi();
    const { data, pending } = ([__temp, __restore] = withAsyncContext(() => api.fetchPosts(locale.value)), __temp = await __temp, __restore(), __temp);
    const posts = computed(() => data.value?.data || data.value || []);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = Head;
      const _component_Title = Title;
      const _component_Meta = Meta;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-09e9873f>`);
      _push(ssrRenderComponent(_component_Head, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Title, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("blog.title"))} | Khiva Tour Guide`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("blog.title")) + " | Khiva Tour Guide", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Meta, {
              name: "description",
              content: unref(t)("blog.subtitle")
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Title, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("blog.title")) + " | Khiva Tour Guide", 1)
                ]),
                _: 1
              }),
              createVNode(_component_Meta, {
                name: "description",
                content: unref(t)("blog.subtitle")
              }, null, 8, ["content"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="page-hero" data-v-09e9873f>`);
      _push(ssrRenderComponent(VContainer, { class: "py-12" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="text-h3 font-weight-black text-white mb-2" data-v-09e9873f${_scopeId}>${ssrInterpolate(unref(t)("blog.title"))}</h1><p class="text-white" style="${ssrRenderStyle({ "opacity": "0.8" })}" data-v-09e9873f${_scopeId}>${ssrInterpolate(unref(t)("blog.subtitle"))}</p>`);
          } else {
            return [
              createVNode("h1", { class: "text-h3 font-weight-black text-white mb-2" }, toDisplayString(unref(t)("blog.title")), 1),
              createVNode("p", {
                class: "text-white",
                style: { "opacity": "0.8" }
              }, toDisplayString(unref(t)("blog.subtitle")), 1)
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
                              type: "article",
                              rounded: "xl"
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(VSkeletonLoader, {
                                type: "article",
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
                              type: "article",
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
                    ssrRenderList(unref(posts), (post) => {
                      _push3(ssrRenderComponent(VCol, {
                        key: post.id,
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
                              to: unref(localePath)(`/blog/${post.slug}`)
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="card-img d-flex align-center justify-center" data-v-09e9873f${_scopeId4}>`);
                                  _push5(ssrRenderComponent(VIcon, {
                                    size: "48",
                                    color: "white",
                                    style: { "opacity": "0.6" }
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`mdi-post-outline`);
                                      } else {
                                        return [
                                          createTextVNode("mdi-post-outline")
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(`</div>`);
                                  _push5(ssrRenderComponent(VCardText, { class: "pa-4" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<div class="text-caption text-medium-emphasis mb-2" data-v-09e9873f${_scopeId5}>`);
                                        _push6(ssrRenderComponent(VIcon, { size: "14" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`mdi-calendar`);
                                            } else {
                                              return [
                                                createTextVNode("mdi-calendar")
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(` ${ssrInterpolate(new Date(post.published_at || post.created_at).toLocaleDateString())}</div><h2 class="text-body-1 font-weight-bold text-primary mb-2 text-wrap" style="${ssrRenderStyle({ "line-height": "1.4" })}" data-v-09e9873f${_scopeId5}>${ssrInterpolate(post.title)}</h2><p class="text-body-2 text-medium-emphasis mb-4" style="${ssrRenderStyle({ "display": "-webkit-box", "-webkit-line-clamp": "3", "-webkit-box-orient": "vertical", "overflow": "hidden" })}" data-v-09e9873f${_scopeId5}>${ssrInterpolate(post.excerpt)}</p>`);
                                        _push6(ssrRenderComponent(VBtn, {
                                          variant: "text",
                                          color: "primary",
                                          size: "small",
                                          class: "pa-0"
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(unref(t)("blog.read_more"))} → `);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(unref(t)("blog.read_more")) + " → ", 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode("div", { class: "text-caption text-medium-emphasis mb-2" }, [
                                            createVNode(VIcon, { size: "14" }, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-calendar")
                                              ]),
                                              _: 1
                                            }),
                                            createTextVNode(" " + toDisplayString(new Date(post.published_at || post.created_at).toLocaleDateString()), 1)
                                          ]),
                                          createVNode("h2", {
                                            class: "text-body-1 font-weight-bold text-primary mb-2 text-wrap",
                                            style: { "line-height": "1.4" }
                                          }, toDisplayString(post.title), 1),
                                          createVNode("p", {
                                            class: "text-body-2 text-medium-emphasis mb-4",
                                            style: { "display": "-webkit-box", "-webkit-line-clamp": "3", "-webkit-box-orient": "vertical", "overflow": "hidden" }
                                          }, toDisplayString(post.excerpt), 1),
                                          createVNode(VBtn, {
                                            variant: "text",
                                            color: "primary",
                                            size: "small",
                                            class: "pa-0"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(unref(t)("blog.read_more")) + " → ", 1)
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
                                    createVNode("div", { class: "card-img d-flex align-center justify-center" }, [
                                      createVNode(VIcon, {
                                        size: "48",
                                        color: "white",
                                        style: { "opacity": "0.6" }
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-post-outline")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    createVNode(VCardText, { class: "pa-4" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "text-caption text-medium-emphasis mb-2" }, [
                                          createVNode(VIcon, { size: "14" }, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-calendar")
                                            ]),
                                            _: 1
                                          }),
                                          createTextVNode(" " + toDisplayString(new Date(post.published_at || post.created_at).toLocaleDateString()), 1)
                                        ]),
                                        createVNode("h2", {
                                          class: "text-body-1 font-weight-bold text-primary mb-2 text-wrap",
                                          style: { "line-height": "1.4" }
                                        }, toDisplayString(post.title), 1),
                                        createVNode("p", {
                                          class: "text-body-2 text-medium-emphasis mb-4",
                                          style: { "display": "-webkit-box", "-webkit-line-clamp": "3", "-webkit-box-orient": "vertical", "overflow": "hidden" }
                                        }, toDisplayString(post.excerpt), 1),
                                        createVNode(VBtn, {
                                          variant: "text",
                                          color: "primary",
                                          size: "small",
                                          class: "pa-0"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(unref(t)("blog.read_more")) + " → ", 1)
                                          ]),
                                          _: 1
                                        })
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
                                to: unref(localePath)(`/blog/${post.slug}`)
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "card-img d-flex align-center justify-center" }, [
                                    createVNode(VIcon, {
                                      size: "48",
                                      color: "white",
                                      style: { "opacity": "0.6" }
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-post-outline")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  createVNode(VCardText, { class: "pa-4" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "text-caption text-medium-emphasis mb-2" }, [
                                        createVNode(VIcon, { size: "14" }, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-calendar")
                                          ]),
                                          _: 1
                                        }),
                                        createTextVNode(" " + toDisplayString(new Date(post.published_at || post.created_at).toLocaleDateString()), 1)
                                      ]),
                                      createVNode("h2", {
                                        class: "text-body-1 font-weight-bold text-primary mb-2 text-wrap",
                                        style: { "line-height": "1.4" }
                                      }, toDisplayString(post.title), 1),
                                      createVNode("p", {
                                        class: "text-body-2 text-medium-emphasis mb-4",
                                        style: { "display": "-webkit-box", "-webkit-line-clamp": "3", "-webkit-box-orient": "vertical", "overflow": "hidden" }
                                      }, toDisplayString(post.excerpt), 1),
                                      createVNode(VBtn, {
                                        variant: "text",
                                        color: "primary",
                                        size: "small",
                                        class: "pa-0"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(t)("blog.read_more")) + " → ", 1)
                                        ]),
                                        _: 1
                                      })
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
                    if (!unref(posts).length) {
                      _push3(ssrRenderComponent(VCol, {
                        cols: "12",
                        class: "text-center py-16"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(VIcon, {
                              size: "64",
                              color: "grey-lighten-2"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`mdi-post-outline`);
                                } else {
                                  return [
                                    createTextVNode("mdi-post-outline")
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                            _push4(`<p class="text-medium-emphasis mt-4" data-v-09e9873f${_scopeId3}>Hozircha maqolalar yo&#39;q</p>`);
                          } else {
                            return [
                              createVNode(VIcon, {
                                size: "64",
                                color: "grey-lighten-2"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("mdi-post-outline")
                                ]),
                                _: 1
                              }),
                              createVNode("p", { class: "text-medium-emphasis mt-4" }, "Hozircha maqolalar yo'q")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(posts), (post) => {
                        return openBlock(), createBlock(VCol, {
                          key: post.id,
                          cols: "12",
                          sm: "6",
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
                                createVNode("div", { class: "card-img d-flex align-center justify-center" }, [
                                  createVNode(VIcon, {
                                    size: "48",
                                    color: "white",
                                    style: { "opacity": "0.6" }
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-post-outline")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode(VCardText, { class: "pa-4" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "text-caption text-medium-emphasis mb-2" }, [
                                      createVNode(VIcon, { size: "14" }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-calendar")
                                        ]),
                                        _: 1
                                      }),
                                      createTextVNode(" " + toDisplayString(new Date(post.published_at || post.created_at).toLocaleDateString()), 1)
                                    ]),
                                    createVNode("h2", {
                                      class: "text-body-1 font-weight-bold text-primary mb-2 text-wrap",
                                      style: { "line-height": "1.4" }
                                    }, toDisplayString(post.title), 1),
                                    createVNode("p", {
                                      class: "text-body-2 text-medium-emphasis mb-4",
                                      style: { "display": "-webkit-box", "-webkit-line-clamp": "3", "-webkit-box-orient": "vertical", "overflow": "hidden" }
                                    }, toDisplayString(post.excerpt), 1),
                                    createVNode(VBtn, {
                                      variant: "text",
                                      color: "primary",
                                      size: "small",
                                      class: "pa-0"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(t)("blog.read_more")) + " → ", 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1032, ["to"])
                          ]),
                          _: 2
                        }, 1024);
                      }), 128)),
                      !unref(posts).length ? (openBlock(), createBlock(VCol, {
                        key: 0,
                        cols: "12",
                        class: "text-center py-16"
                      }, {
                        default: withCtx(() => [
                          createVNode(VIcon, {
                            size: "64",
                            color: "grey-lighten-2"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("mdi-post-outline")
                            ]),
                            _: 1
                          }),
                          createVNode("p", { class: "text-medium-emphasis mt-4" }, "Hozircha maqolalar yo'q")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
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
                          type: "article",
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
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(posts), (post) => {
                    return openBlock(), createBlock(VCol, {
                      key: post.id,
                      cols: "12",
                      sm: "6",
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
                            createVNode("div", { class: "card-img d-flex align-center justify-center" }, [
                              createVNode(VIcon, {
                                size: "48",
                                color: "white",
                                style: { "opacity": "0.6" }
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("mdi-post-outline")
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode(VCardText, { class: "pa-4" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "text-caption text-medium-emphasis mb-2" }, [
                                  createVNode(VIcon, { size: "14" }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-calendar")
                                    ]),
                                    _: 1
                                  }),
                                  createTextVNode(" " + toDisplayString(new Date(post.published_at || post.created_at).toLocaleDateString()), 1)
                                ]),
                                createVNode("h2", {
                                  class: "text-body-1 font-weight-bold text-primary mb-2 text-wrap",
                                  style: { "line-height": "1.4" }
                                }, toDisplayString(post.title), 1),
                                createVNode("p", {
                                  class: "text-body-2 text-medium-emphasis mb-4",
                                  style: { "display": "-webkit-box", "-webkit-line-clamp": "3", "-webkit-box-orient": "vertical", "overflow": "hidden" }
                                }, toDisplayString(post.excerpt), 1),
                                createVNode(VBtn, {
                                  variant: "text",
                                  color: "primary",
                                  size: "small",
                                  class: "pa-0"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(t)("blog.read_more")) + " → ", 1)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1032, ["to"])
                      ]),
                      _: 2
                    }, 1024);
                  }), 128)),
                  !unref(posts).length ? (openBlock(), createBlock(VCol, {
                    key: 0,
                    cols: "12",
                    class: "text-center py-16"
                  }, {
                    default: withCtx(() => [
                      createVNode(VIcon, {
                        size: "64",
                        color: "grey-lighten-2"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("mdi-post-outline")
                        ]),
                        _: 1
                      }),
                      createVNode("p", { class: "text-medium-emphasis mt-4" }, "Hozircha maqolalar yo'q")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              }))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-09e9873f"]]);
export {
  index as default
};
//# sourceMappingURL=index-BPaXNxsL.js.map
