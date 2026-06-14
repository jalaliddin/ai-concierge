import { u as useApi, H as Head, T as Title, V as VContainer } from "./VContainer-CvzQlK5R.js";
import { ref, createElementVNode, normalizeStyle, normalizeClass, computed, shallowRef, watchEffect, watch, nextTick, createVNode, mergeProps, Fragment, withDirectives, vModelText, defineComponent, reactive, withCtx, unref, createTextVNode, toDisplayString, isRef, openBlock, createBlock, createCommentVNode, withModifiers, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { l as genericComponent, p as propsFactory, E as useProxiedModel, a1 as useDisplay, I as convertToUnit, Z as omit, N as clamp, $ as filterInputAttrs, W as callEvent, f as useI18n, g as useLocalePath, _ as _export_sfc } from "../server.mjs";
import { f as forwardRefs, u as useCartStore } from "./forwardRefs-BsiwRHAr.js";
import { i as useRender, k as makeComponentProps, I as Intersect, a as VIcon, c as VBtn, d as VRow, e as VCol, V as VCard, f as VCardTitle, b as VCardText } from "./VRow-DQkXkPiv.js";
import { V as VChip } from "./VChip-ChK3lbKv.js";
import { c as createForm, m as makeFormProps, u as useFocus, a as useAutocomplete, b as makeVFieldProps, d as makeVInputProps, e as makeAutocompleteProps, f as VInput, g as VField, h as VCounter, i as useAutofocus, V as VTextField } from "./VTextField-w7s0k0rh.js";
import { V as VAlert } from "./VAlert-CthPvHJX.js";
import { V as VDivider } from "./VDivider-BPwYB-Z2.js";
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
import "./index-wObflqc9.js";
const makeVFormProps = propsFactory({
  ...makeComponentProps(),
  ...makeFormProps()
}, "VForm");
const VForm = genericComponent()({
  name: "VForm",
  props: makeVFormProps(),
  emits: {
    "update:modelValue": (val) => true,
    submit: (e) => true
  },
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const form = createForm(props);
    const formRef = ref();
    function onReset(e) {
      e.preventDefault();
      form.reset();
    }
    function onSubmit(_e) {
      const e = _e;
      const ready = form.validate();
      e.then = ready.then.bind(ready);
      e.catch = ready.catch.bind(ready);
      e.finally = ready.finally.bind(ready);
      emit("submit", e);
      if (!e.defaultPrevented) {
        ready.then((_ref2) => {
          let {
            valid
          } = _ref2;
          if (valid) {
            formRef.value?.submit();
          }
        });
      }
      e.preventDefault();
    }
    useRender(() => createElementVNode("form", {
      "ref": formRef,
      "class": normalizeClass(["v-form", props.class]),
      "style": normalizeStyle(props.style),
      "novalidate": true,
      "onReset": onReset,
      "onSubmit": onSubmit
    }, [slots.default?.(form)]));
    return forwardRefs(form, formRef);
  }
});
const makeVTextareaProps = propsFactory({
  autoGrow: Boolean,
  autofocus: Boolean,
  counter: [Boolean, Number, String],
  counterValue: Function,
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  noResize: Boolean,
  rows: {
    type: [Number, String],
    default: 5,
    validator: (v) => !isNaN(parseFloat(v))
  },
  maxHeight: {
    type: [Number, String],
    validator: (v) => !isNaN(parseFloat(v))
  },
  maxRows: {
    type: [Number, String],
    validator: (v) => !isNaN(parseFloat(v))
  },
  suffix: String,
  modelModifiers: Object,
  ...makeAutocompleteProps(),
  ...omit(makeVInputProps(), ["direction"]),
  ...makeVFieldProps()
}, "VTextarea");
const VTextarea = genericComponent()({
  name: "VTextarea",
  directives: {
    vIntersect: Intersect
  },
  inheritAttrs: false,
  props: makeVTextareaProps(),
  emits: {
    "click:control": (e) => true,
    "mousedown:control": (e) => true,
    "update:focused": (focused) => true,
    "update:modelValue": (val) => true,
    "update:rows": (rows) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const {
      onIntersect
    } = useAutofocus(props);
    const counterValue = computed(() => {
      return typeof props.counterValue === "function" ? props.counterValue(model.value) : (model.value || "").toString().length;
    });
    const max = computed(() => {
      if (attrs.maxlength) return attrs.maxlength;
      if (!props.counter || typeof props.counter !== "number" && typeof props.counter !== "string") return void 0;
      return props.counter;
    });
    const vInputRef = ref();
    const vFieldRef = ref();
    const controlHeight = shallowRef("");
    const textareaRef = ref();
    const scrollbarWidth = ref(0);
    const {
      platform
    } = useDisplay();
    const autocomplete = useAutocomplete(props);
    const isActive = computed(() => props.persistentPlaceholder || isFocused.value || props.active);
    function onFocus() {
      if (autocomplete.isSuppressing.value) {
        autocomplete.update();
      }
      if (textareaRef.value !== (void 0).activeElement) {
        textareaRef.value?.focus();
      }
      if (!isFocused.value) focus();
    }
    function onControlClick(e) {
      onFocus();
      emit("click:control", e);
    }
    function onControlMousedown(e) {
      emit("mousedown:control", e);
    }
    function onClear(e) {
      e.stopPropagation();
      onFocus();
      nextTick(() => {
        model.value = "";
        callEvent(props["onClick:clear"], e);
      });
    }
    function onInput(e) {
      const el = e.target;
      if (!props.modelModifiers?.trim) {
        model.value = el.value;
        return;
      }
      const value = el.value;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      model.value = value;
      nextTick(() => {
        let offset = 0;
        if (value.trimStart().length === el.value.length) {
          offset = value.length - el.value.length;
        }
        if (start != null) el.selectionStart = start - offset;
        if (end != null) el.selectionEnd = end - offset;
      });
    }
    const sizerRef = ref();
    const rows = ref(Number(props.rows));
    const isPlainOrUnderlined = computed(() => ["plain", "underlined"].includes(props.variant));
    watchEffect(() => {
      if (!props.autoGrow) rows.value = Number(props.rows);
    });
    function calculateInputHeight() {
      nextTick(() => {
        if (!textareaRef.value) return;
        if (platform.value.firefox) {
          scrollbarWidth.value = 12;
          return;
        }
        const {
          offsetWidth,
          clientWidth
        } = textareaRef.value;
        scrollbarWidth.value = Math.max(0, offsetWidth - clientWidth);
      });
      if (!props.autoGrow) return;
      nextTick(() => {
        if (!sizerRef.value || !vFieldRef.value) return;
        const style = getComputedStyle(sizerRef.value);
        const fieldStyle = getComputedStyle(vFieldRef.value.$el);
        const padding = parseFloat(style.getPropertyValue("--v-field-padding-top")) + parseFloat(style.getPropertyValue("--v-input-padding-top")) + parseFloat(style.getPropertyValue("--v-field-padding-bottom"));
        const height = sizerRef.value.scrollHeight;
        const lineHeight = parseFloat(style.lineHeight);
        const minHeight = Math.max(parseFloat(props.rows) * lineHeight + padding, parseFloat(fieldStyle.getPropertyValue("--v-input-control-height")));
        const maxHeight = props.maxHeight ? parseFloat(props.maxHeight) : parseFloat(props.maxRows) * lineHeight + padding || Infinity;
        const newHeight = clamp(height ?? 0, minHeight, maxHeight);
        rows.value = Math.floor((newHeight - padding) / lineHeight);
        controlHeight.value = convertToUnit(newHeight);
      });
    }
    watch(model, calculateInputHeight);
    watch(() => props.rows, calculateInputHeight);
    watch(() => props.maxHeight, calculateInputHeight);
    watch(() => props.maxRows, calculateInputHeight);
    watch(() => props.density, calculateInputHeight);
    watch(rows, (val) => {
      emit("update:rows", val);
    });
    let observer;
    watch(sizerRef, (val) => {
      if (val) {
        observer = new ResizeObserver(calculateInputHeight);
        observer.observe(sizerRef.value);
      } else {
        observer?.disconnect();
      }
    });
    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter || props.counterValue);
      const hasDetails = !!(hasCounter || slots.details);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const {
        modelValue: _,
        ...inputProps
      } = VInput.filterProps(props);
      const fieldProps = {
        ...VField.filterProps(props),
        "onClick:clear": onClear
      };
      return createVNode(VInput, mergeProps({
        "ref": vInputRef,
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-textarea v-text-field", {
          "v-textarea--prefixed": props.prefix,
          "v-textarea--suffixed": props.suffix,
          "v-text-field--prefixed": props.prefix,
          "v-text-field--suffixed": props.suffix,
          "v-textarea--auto-grow": props.autoGrow,
          "v-textarea--no-resize": props.noResize || props.autoGrow,
          "v-input--plain-underlined": isPlainOrUnderlined.value
        }, props.class],
        "style": [{
          "--v-textarea-max-height": props.maxHeight ? convertToUnit(props.maxHeight) : void 0,
          "--v-textarea-scroll-bar-width": convertToUnit(scrollbarWidth.value)
        }, props.style]
      }, rootAttrs, inputProps, {
        "centerAffix": rows.value === 1 && !isPlainOrUnderlined.value,
        "focused": isFocused.value
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            id,
            isDisabled,
            isDirty,
            isReadonly,
            isValid,
            hasDetails: hasDetails2
          } = _ref2;
          return createVNode(VField, mergeProps({
            "ref": vFieldRef,
            "style": {
              "--v-textarea-control-height": controlHeight.value
            },
            "onClick": onControlClick,
            "onMousedown": onControlMousedown,
            "onClick:prependInner": props["onClick:prependInner"],
            "onClick:appendInner": props["onClick:appendInner"]
          }, fieldProps, {
            "id": id.value,
            "active": isActive.value || isDirty.value,
            "labelId": `${id.value}-label`,
            "centerAffix": rows.value === 1 && !isPlainOrUnderlined.value,
            "dirty": isDirty.value || props.dirty,
            "disabled": isDisabled.value,
            "focused": isFocused.value,
            "details": hasDetails2.value,
            "error": isValid.value === false
          }), {
            ...slots,
            default: (_ref3) => {
              let {
                props: {
                  class: fieldClass,
                  ...slotProps
                },
                controlRef
              } = _ref3;
              return createElementVNode(Fragment, null, [props.prefix && createElementVNode("span", {
                "class": "v-text-field__prefix"
              }, [props.prefix]), withDirectives(createElementVNode("textarea", mergeProps({
                "ref": (val) => textareaRef.value = controlRef.value = val,
                "class": fieldClass,
                "value": model.value,
                "onInput": onInput,
                "autofocus": props.autofocus,
                "readonly": isReadonly.value,
                "disabled": isDisabled.value,
                "placeholder": props.placeholder,
                "rows": props.rows,
                "name": autocomplete.fieldName.value,
                "autocomplete": autocomplete.fieldAutocomplete.value,
                "onFocus": onFocus,
                "onBlur": blur,
                "aria-labelledby": `${id.value}-label`
              }, slotProps, inputAttrs), null), [[Intersect, {
                handler: onIntersect
              }, null, {
                once: true
              }]]), props.autoGrow && withDirectives(createElementVNode("textarea", {
                "class": normalizeClass([fieldClass, "v-textarea__sizer"]),
                "id": `${slotProps.id}-sizer`,
                "onUpdate:modelValue": ($event) => model.value = $event,
                "ref": sizerRef,
                "readonly": true,
                "aria-hidden": "true"
              }, null), [[vModelText, model.value]]), props.suffix && createElementVNode("span", {
                "class": "v-text-field__suffix"
              }, [props.suffix])]);
            }
          });
        },
        details: hasDetails ? (slotProps) => createElementVNode(Fragment, null, [slots.details?.(slotProps), hasCounter && createElementVNode(Fragment, null, [createElementVNode("span", null, null), createVNode(VCounter, {
          "active": props.persistentCounter || isFocused.value,
          "value": counterValue.value,
          "max": max.value,
          "disabled": props.disabled
        }, slots.counter)])]) : void 0
      });
    });
    return forwardRefs({}, vInputRef, vFieldRef, textareaRef);
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "checkout",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const localePath = useLocalePath();
    const cartStore = useCartStore();
    const api = useApi();
    const formRef = ref();
    const formValid = ref(false);
    const submitting = ref(false);
    const submitError = ref("");
    const orderResult = ref(null);
    const honeypot = ref("");
    const form = reactive({
      customer_name: "",
      customer_email: "",
      customer_phone: "",
      passengers: 1,
      scheduled_at: "",
      notes: ""
    });
    const required = (v) => !!v || "Majburiy maydon";
    const emailRule = (v) => /.+@.+\..+/.test(v) || "To'g'ri email kiriting";
    async function submitOrder() {
      if (honeypot.value) return;
      if (!formValid.value) return;
      submitting.value = true;
      submitError.value = "";
      try {
        const payload = {
          ...form,
          items: cartStore.items.map((i) => ({
            itemable_type: i.type === "transfer" ? "App\\Models\\Transfer" : "App\\Models\\Service",
            itemable_id: i.id,
            quantity: i.quantity
          }))
        };
        orderResult.value = await api.placeOrder(payload);
        cartStore.clearCart();
      } catch (err) {
        submitError.value = err?.data?.message || "Xato yuz berdi. Qayta urinib ko'ring.";
      } finally {
        submitting.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = Head;
      const _component_Title = Title;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-c8ff2d9e>`);
      _push(ssrRenderComponent(_component_Head, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Title, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("checkout.title"))} | Khiva Tour Guide`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("checkout.title")) + " | Khiva Tour Guide", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Title, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("checkout.title")) + " | Khiva Tour Guide", 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="page-hero" data-v-c8ff2d9e>`);
      _push(ssrRenderComponent(VContainer, { class: "py-10" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="text-h3 font-weight-black text-white" data-v-c8ff2d9e${_scopeId}>${ssrInterpolate(unref(t)("checkout.title"))}</h1>`);
          } else {
            return [
              createVNode("h1", { class: "text-h3 font-weight-black text-white" }, toDisplayString(unref(t)("checkout.title")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(VContainer, { class: "py-12" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(cartStore).items.length === 0 && !unref(orderResult)) {
              _push2(`<div class="text-center py-20" data-v-c8ff2d9e${_scopeId}>`);
              _push2(ssrRenderComponent(VIcon, {
                size: "80",
                color: "grey-lighten-2"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`mdi-cart-off`);
                  } else {
                    return [
                      createTextVNode("mdi-cart-off")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<p class="text-h6 text-medium-emphasis mt-4" data-v-c8ff2d9e${_scopeId}>${ssrInterpolate(unref(t)("cart.empty"))}</p>`);
              _push2(ssrRenderComponent(VBtn, {
                to: unref(localePath)("/transfers"),
                color: "primary",
                class: "mt-4",
                rounded: "lg"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(t)("transfers.title"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(t)("transfers.title")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else if (unref(orderResult)) {
              _push2(`<div class="text-center py-16" data-v-c8ff2d9e${_scopeId}>`);
              _push2(ssrRenderComponent(VIcon, {
                size: "80",
                color: "success",
                class: "mb-4"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`mdi-check-circle`);
                  } else {
                    return [
                      createTextVNode("mdi-check-circle")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<h2 class="text-h4 font-weight-bold mb-2" data-v-c8ff2d9e${_scopeId}>${ssrInterpolate(unref(t)("checkout.success"))}</h2><p class="text-medium-emphasis mb-6" data-v-c8ff2d9e${_scopeId}>${ssrInterpolate(unref(t)("checkout.success_msg"))}</p>`);
              _push2(ssrRenderComponent(VChip, {
                color: "primary",
                size: "large",
                class: "mb-6"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(t)("checkout.order_number"))}: ${ssrInterpolate(unref(orderResult).order_number)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(t)("checkout.order_number")) + ": " + toDisplayString(unref(orderResult).order_number), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<br data-v-c8ff2d9e${_scopeId}>`);
              _push2(ssrRenderComponent(VBtn, {
                to: unref(localePath)("/"),
                color: "cta",
                size: "large",
                rounded: "lg",
                class: "mt-4"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Bosh sahifaga qaytish `);
                  } else {
                    return [
                      createTextVNode(" Bosh sahifaga qaytish ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
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
                                _push5(ssrRenderComponent(VCardTitle, { class: "pa-6 pb-0 text-h6 font-weight-bold" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Ma&#39;lumotlaringiz`);
                                    } else {
                                      return [
                                        createTextVNode("Ma'lumotlaringiz")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VCardText, { class: "pa-6" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VForm, {
                                        ref_key: "formRef",
                                        ref: formRef,
                                        modelValue: unref(formValid),
                                        "onUpdate:modelValue": ($event) => isRef(formValid) ? formValid.value = $event : null,
                                        onSubmit: submitOrder
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VRow, { dense: "" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(VCol, {
                                                    cols: "12",
                                                    sm: "6"
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(ssrRenderComponent(VTextField, {
                                                          modelValue: unref(form).customer_name,
                                                          "onUpdate:modelValue": ($event) => unref(form).customer_name = $event,
                                                          label: unref(t)("checkout.name"),
                                                          rules: [required],
                                                          variant: "outlined",
                                                          rounded: "lg",
                                                          density: "compact"
                                                        }, null, _parent9, _scopeId8));
                                                      } else {
                                                        return [
                                                          createVNode(VTextField, {
                                                            modelValue: unref(form).customer_name,
                                                            "onUpdate:modelValue": ($event) => unref(form).customer_name = $event,
                                                            label: unref(t)("checkout.name"),
                                                            rules: [required],
                                                            variant: "outlined",
                                                            rounded: "lg",
                                                            density: "compact"
                                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(VCol, {
                                                    cols: "12",
                                                    sm: "6"
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(ssrRenderComponent(VTextField, {
                                                          modelValue: unref(form).customer_email,
                                                          "onUpdate:modelValue": ($event) => unref(form).customer_email = $event,
                                                          label: unref(t)("checkout.email"),
                                                          rules: [required, emailRule],
                                                          type: "email",
                                                          variant: "outlined",
                                                          rounded: "lg",
                                                          density: "compact"
                                                        }, null, _parent9, _scopeId8));
                                                      } else {
                                                        return [
                                                          createVNode(VTextField, {
                                                            modelValue: unref(form).customer_email,
                                                            "onUpdate:modelValue": ($event) => unref(form).customer_email = $event,
                                                            label: unref(t)("checkout.email"),
                                                            rules: [required, emailRule],
                                                            type: "email",
                                                            variant: "outlined",
                                                            rounded: "lg",
                                                            density: "compact"
                                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(VCol, {
                                                    cols: "12",
                                                    sm: "6"
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(ssrRenderComponent(VTextField, {
                                                          modelValue: unref(form).customer_phone,
                                                          "onUpdate:modelValue": ($event) => unref(form).customer_phone = $event,
                                                          label: unref(t)("checkout.phone"),
                                                          rules: [required],
                                                          variant: "outlined",
                                                          rounded: "lg",
                                                          density: "compact"
                                                        }, null, _parent9, _scopeId8));
                                                      } else {
                                                        return [
                                                          createVNode(VTextField, {
                                                            modelValue: unref(form).customer_phone,
                                                            "onUpdate:modelValue": ($event) => unref(form).customer_phone = $event,
                                                            label: unref(t)("checkout.phone"),
                                                            rules: [required],
                                                            variant: "outlined",
                                                            rounded: "lg",
                                                            density: "compact"
                                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(VCol, {
                                                    cols: "12",
                                                    sm: "6"
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(ssrRenderComponent(VTextField, {
                                                          modelValue: unref(form).passengers,
                                                          "onUpdate:modelValue": ($event) => unref(form).passengers = $event,
                                                          modelModifiers: { number: true },
                                                          label: unref(t)("checkout.passengers"),
                                                          type: "number",
                                                          min: "1",
                                                          variant: "outlined",
                                                          rounded: "lg",
                                                          density: "compact"
                                                        }, null, _parent9, _scopeId8));
                                                      } else {
                                                        return [
                                                          createVNode(VTextField, {
                                                            modelValue: unref(form).passengers,
                                                            "onUpdate:modelValue": ($event) => unref(form).passengers = $event,
                                                            modelModifiers: { number: true },
                                                            label: unref(t)("checkout.passengers"),
                                                            type: "number",
                                                            min: "1",
                                                            variant: "outlined",
                                                            rounded: "lg",
                                                            density: "compact"
                                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(VCol, { cols: "12" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(ssrRenderComponent(VTextField, {
                                                          modelValue: unref(form).scheduled_at,
                                                          "onUpdate:modelValue": ($event) => unref(form).scheduled_at = $event,
                                                          label: unref(t)("checkout.date"),
                                                          type: "datetime-local",
                                                          variant: "outlined",
                                                          rounded: "lg",
                                                          density: "compact"
                                                        }, null, _parent9, _scopeId8));
                                                      } else {
                                                        return [
                                                          createVNode(VTextField, {
                                                            modelValue: unref(form).scheduled_at,
                                                            "onUpdate:modelValue": ($event) => unref(form).scheduled_at = $event,
                                                            label: unref(t)("checkout.date"),
                                                            type: "datetime-local",
                                                            variant: "outlined",
                                                            rounded: "lg",
                                                            density: "compact"
                                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(VCol, { cols: "12" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(ssrRenderComponent(VTextarea, {
                                                          modelValue: unref(form).notes,
                                                          "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                                                          label: unref(t)("checkout.notes"),
                                                          variant: "outlined",
                                                          rounded: "lg",
                                                          density: "compact",
                                                          rows: "3",
                                                          "auto-grow": ""
                                                        }, null, _parent9, _scopeId8));
                                                      } else {
                                                        return [
                                                          createVNode(VTextarea, {
                                                            modelValue: unref(form).notes,
                                                            "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                                                            label: unref(t)("checkout.notes"),
                                                            variant: "outlined",
                                                            rounded: "lg",
                                                            density: "compact",
                                                            rows: "3",
                                                            "auto-grow": ""
                                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(VCol, {
                                                      cols: "12",
                                                      sm: "6"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(VTextField, {
                                                          modelValue: unref(form).customer_name,
                                                          "onUpdate:modelValue": ($event) => unref(form).customer_name = $event,
                                                          label: unref(t)("checkout.name"),
                                                          rules: [required],
                                                          variant: "outlined",
                                                          rounded: "lg",
                                                          density: "compact"
                                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(VCol, {
                                                      cols: "12",
                                                      sm: "6"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(VTextField, {
                                                          modelValue: unref(form).customer_email,
                                                          "onUpdate:modelValue": ($event) => unref(form).customer_email = $event,
                                                          label: unref(t)("checkout.email"),
                                                          rules: [required, emailRule],
                                                          type: "email",
                                                          variant: "outlined",
                                                          rounded: "lg",
                                                          density: "compact"
                                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(VCol, {
                                                      cols: "12",
                                                      sm: "6"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(VTextField, {
                                                          modelValue: unref(form).customer_phone,
                                                          "onUpdate:modelValue": ($event) => unref(form).customer_phone = $event,
                                                          label: unref(t)("checkout.phone"),
                                                          rules: [required],
                                                          variant: "outlined",
                                                          rounded: "lg",
                                                          density: "compact"
                                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(VCol, {
                                                      cols: "12",
                                                      sm: "6"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(VTextField, {
                                                          modelValue: unref(form).passengers,
                                                          "onUpdate:modelValue": ($event) => unref(form).passengers = $event,
                                                          modelModifiers: { number: true },
                                                          label: unref(t)("checkout.passengers"),
                                                          type: "number",
                                                          min: "1",
                                                          variant: "outlined",
                                                          rounded: "lg",
                                                          density: "compact"
                                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(VCol, { cols: "12" }, {
                                                      default: withCtx(() => [
                                                        createVNode(VTextField, {
                                                          modelValue: unref(form).scheduled_at,
                                                          "onUpdate:modelValue": ($event) => unref(form).scheduled_at = $event,
                                                          label: unref(t)("checkout.date"),
                                                          type: "datetime-local",
                                                          variant: "outlined",
                                                          rounded: "lg",
                                                          density: "compact"
                                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(VCol, { cols: "12" }, {
                                                      default: withCtx(() => [
                                                        createVNode(VTextarea, {
                                                          modelValue: unref(form).notes,
                                                          "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                                                          label: unref(t)("checkout.notes"),
                                                          variant: "outlined",
                                                          rounded: "lg",
                                                          density: "compact",
                                                          rows: "3",
                                                          "auto-grow": ""
                                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                                      ]),
                                                      _: 1
                                                    })
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(`<div style="${ssrRenderStyle({ "position": "absolute", "left": "-9999px", "opacity": "0", "pointer-events": "none" })}" aria-hidden="true" data-v-c8ff2d9e${_scopeId6}><input${ssrRenderAttr("value", unref(honeypot))} tabindex="-1" autocomplete="off" data-v-c8ff2d9e${_scopeId6}></div>`);
                                            if (unref(submitError)) {
                                              _push7(ssrRenderComponent(VAlert, {
                                                type: "error",
                                                class: "mb-4",
                                                rounded: "lg"
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(unref(submitError))}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(unref(submitError)), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 1
                                              }, _parent7, _scopeId6));
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                            _push7(ssrRenderComponent(VBtn, {
                                              type: "submit",
                                              color: "cta",
                                              size: "large",
                                              block: "",
                                              rounded: "lg",
                                              loading: unref(submitting),
                                              disabled: !unref(formValid)
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(unref(t)("checkout.submit"))}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(unref(t)("checkout.submit")), 1)
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VRow, { dense: "" }, {
                                                default: withCtx(() => [
                                                  createVNode(VCol, {
                                                    cols: "12",
                                                    sm: "6"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(VTextField, {
                                                        modelValue: unref(form).customer_name,
                                                        "onUpdate:modelValue": ($event) => unref(form).customer_name = $event,
                                                        label: unref(t)("checkout.name"),
                                                        rules: [required],
                                                        variant: "outlined",
                                                        rounded: "lg",
                                                        density: "compact"
                                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(VCol, {
                                                    cols: "12",
                                                    sm: "6"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(VTextField, {
                                                        modelValue: unref(form).customer_email,
                                                        "onUpdate:modelValue": ($event) => unref(form).customer_email = $event,
                                                        label: unref(t)("checkout.email"),
                                                        rules: [required, emailRule],
                                                        type: "email",
                                                        variant: "outlined",
                                                        rounded: "lg",
                                                        density: "compact"
                                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(VCol, {
                                                    cols: "12",
                                                    sm: "6"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(VTextField, {
                                                        modelValue: unref(form).customer_phone,
                                                        "onUpdate:modelValue": ($event) => unref(form).customer_phone = $event,
                                                        label: unref(t)("checkout.phone"),
                                                        rules: [required],
                                                        variant: "outlined",
                                                        rounded: "lg",
                                                        density: "compact"
                                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(VCol, {
                                                    cols: "12",
                                                    sm: "6"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(VTextField, {
                                                        modelValue: unref(form).passengers,
                                                        "onUpdate:modelValue": ($event) => unref(form).passengers = $event,
                                                        modelModifiers: { number: true },
                                                        label: unref(t)("checkout.passengers"),
                                                        type: "number",
                                                        min: "1",
                                                        variant: "outlined",
                                                        rounded: "lg",
                                                        density: "compact"
                                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(VCol, { cols: "12" }, {
                                                    default: withCtx(() => [
                                                      createVNode(VTextField, {
                                                        modelValue: unref(form).scheduled_at,
                                                        "onUpdate:modelValue": ($event) => unref(form).scheduled_at = $event,
                                                        label: unref(t)("checkout.date"),
                                                        type: "datetime-local",
                                                        variant: "outlined",
                                                        rounded: "lg",
                                                        density: "compact"
                                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(VCol, { cols: "12" }, {
                                                    default: withCtx(() => [
                                                      createVNode(VTextarea, {
                                                        modelValue: unref(form).notes,
                                                        "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                                                        label: unref(t)("checkout.notes"),
                                                        variant: "outlined",
                                                        rounded: "lg",
                                                        density: "compact",
                                                        rows: "3",
                                                        "auto-grow": ""
                                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              }),
                                              createVNode("div", {
                                                style: { "position": "absolute", "left": "-9999px", "opacity": "0", "pointer-events": "none" },
                                                "aria-hidden": "true"
                                              }, [
                                                withDirectives(createVNode("input", {
                                                  "onUpdate:modelValue": ($event) => isRef(honeypot) ? honeypot.value = $event : null,
                                                  tabindex: "-1",
                                                  autocomplete: "off"
                                                }, null, 8, ["onUpdate:modelValue"]), [
                                                  [vModelText, unref(honeypot)]
                                                ])
                                              ]),
                                              unref(submitError) ? (openBlock(), createBlock(VAlert, {
                                                key: 0,
                                                type: "error",
                                                class: "mb-4",
                                                rounded: "lg"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(unref(submitError)), 1)
                                                ]),
                                                _: 1
                                              })) : createCommentVNode("", true),
                                              createVNode(VBtn, {
                                                type: "submit",
                                                color: "cta",
                                                size: "large",
                                                block: "",
                                                rounded: "lg",
                                                loading: unref(submitting),
                                                disabled: !unref(formValid)
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(unref(t)("checkout.submit")), 1)
                                                ]),
                                                _: 1
                                              }, 8, ["loading", "disabled"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VForm, {
                                          ref_key: "formRef",
                                          ref: formRef,
                                          modelValue: unref(formValid),
                                          "onUpdate:modelValue": ($event) => isRef(formValid) ? formValid.value = $event : null,
                                          onSubmit: withModifiers(submitOrder, ["prevent"])
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VRow, { dense: "" }, {
                                              default: withCtx(() => [
                                                createVNode(VCol, {
                                                  cols: "12",
                                                  sm: "6"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(VTextField, {
                                                      modelValue: unref(form).customer_name,
                                                      "onUpdate:modelValue": ($event) => unref(form).customer_name = $event,
                                                      label: unref(t)("checkout.name"),
                                                      rules: [required],
                                                      variant: "outlined",
                                                      rounded: "lg",
                                                      density: "compact"
                                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(VCol, {
                                                  cols: "12",
                                                  sm: "6"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(VTextField, {
                                                      modelValue: unref(form).customer_email,
                                                      "onUpdate:modelValue": ($event) => unref(form).customer_email = $event,
                                                      label: unref(t)("checkout.email"),
                                                      rules: [required, emailRule],
                                                      type: "email",
                                                      variant: "outlined",
                                                      rounded: "lg",
                                                      density: "compact"
                                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(VCol, {
                                                  cols: "12",
                                                  sm: "6"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(VTextField, {
                                                      modelValue: unref(form).customer_phone,
                                                      "onUpdate:modelValue": ($event) => unref(form).customer_phone = $event,
                                                      label: unref(t)("checkout.phone"),
                                                      rules: [required],
                                                      variant: "outlined",
                                                      rounded: "lg",
                                                      density: "compact"
                                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(VCol, {
                                                  cols: "12",
                                                  sm: "6"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(VTextField, {
                                                      modelValue: unref(form).passengers,
                                                      "onUpdate:modelValue": ($event) => unref(form).passengers = $event,
                                                      modelModifiers: { number: true },
                                                      label: unref(t)("checkout.passengers"),
                                                      type: "number",
                                                      min: "1",
                                                      variant: "outlined",
                                                      rounded: "lg",
                                                      density: "compact"
                                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(VCol, { cols: "12" }, {
                                                  default: withCtx(() => [
                                                    createVNode(VTextField, {
                                                      modelValue: unref(form).scheduled_at,
                                                      "onUpdate:modelValue": ($event) => unref(form).scheduled_at = $event,
                                                      label: unref(t)("checkout.date"),
                                                      type: "datetime-local",
                                                      variant: "outlined",
                                                      rounded: "lg",
                                                      density: "compact"
                                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(VCol, { cols: "12" }, {
                                                  default: withCtx(() => [
                                                    createVNode(VTextarea, {
                                                      modelValue: unref(form).notes,
                                                      "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                                                      label: unref(t)("checkout.notes"),
                                                      variant: "outlined",
                                                      rounded: "lg",
                                                      density: "compact",
                                                      rows: "3",
                                                      "auto-grow": ""
                                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("div", {
                                              style: { "position": "absolute", "left": "-9999px", "opacity": "0", "pointer-events": "none" },
                                              "aria-hidden": "true"
                                            }, [
                                              withDirectives(createVNode("input", {
                                                "onUpdate:modelValue": ($event) => isRef(honeypot) ? honeypot.value = $event : null,
                                                tabindex: "-1",
                                                autocomplete: "off"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelText, unref(honeypot)]
                                              ])
                                            ]),
                                            unref(submitError) ? (openBlock(), createBlock(VAlert, {
                                              key: 0,
                                              type: "error",
                                              class: "mb-4",
                                              rounded: "lg"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(unref(submitError)), 1)
                                              ]),
                                              _: 1
                                            })) : createCommentVNode("", true),
                                            createVNode(VBtn, {
                                              type: "submit",
                                              color: "cta",
                                              size: "large",
                                              block: "",
                                              rounded: "lg",
                                              loading: unref(submitting),
                                              disabled: !unref(formValid)
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(unref(t)("checkout.submit")), 1)
                                              ]),
                                              _: 1
                                            }, 8, ["loading", "disabled"])
                                          ]),
                                          _: 1
                                        }, 8, ["modelValue", "onUpdate:modelValue"])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VCardTitle, { class: "pa-6 pb-0 text-h6 font-weight-bold" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Ma'lumotlaringiz")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCardText, { class: "pa-6" }, {
                                    default: withCtx(() => [
                                      createVNode(VForm, {
                                        ref_key: "formRef",
                                        ref: formRef,
                                        modelValue: unref(formValid),
                                        "onUpdate:modelValue": ($event) => isRef(formValid) ? formValid.value = $event : null,
                                        onSubmit: withModifiers(submitOrder, ["prevent"])
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VRow, { dense: "" }, {
                                            default: withCtx(() => [
                                              createVNode(VCol, {
                                                cols: "12",
                                                sm: "6"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(VTextField, {
                                                    modelValue: unref(form).customer_name,
                                                    "onUpdate:modelValue": ($event) => unref(form).customer_name = $event,
                                                    label: unref(t)("checkout.name"),
                                                    rules: [required],
                                                    variant: "outlined",
                                                    rounded: "lg",
                                                    density: "compact"
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(VCol, {
                                                cols: "12",
                                                sm: "6"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(VTextField, {
                                                    modelValue: unref(form).customer_email,
                                                    "onUpdate:modelValue": ($event) => unref(form).customer_email = $event,
                                                    label: unref(t)("checkout.email"),
                                                    rules: [required, emailRule],
                                                    type: "email",
                                                    variant: "outlined",
                                                    rounded: "lg",
                                                    density: "compact"
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(VCol, {
                                                cols: "12",
                                                sm: "6"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(VTextField, {
                                                    modelValue: unref(form).customer_phone,
                                                    "onUpdate:modelValue": ($event) => unref(form).customer_phone = $event,
                                                    label: unref(t)("checkout.phone"),
                                                    rules: [required],
                                                    variant: "outlined",
                                                    rounded: "lg",
                                                    density: "compact"
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(VCol, {
                                                cols: "12",
                                                sm: "6"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(VTextField, {
                                                    modelValue: unref(form).passengers,
                                                    "onUpdate:modelValue": ($event) => unref(form).passengers = $event,
                                                    modelModifiers: { number: true },
                                                    label: unref(t)("checkout.passengers"),
                                                    type: "number",
                                                    min: "1",
                                                    variant: "outlined",
                                                    rounded: "lg",
                                                    density: "compact"
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(VCol, { cols: "12" }, {
                                                default: withCtx(() => [
                                                  createVNode(VTextField, {
                                                    modelValue: unref(form).scheduled_at,
                                                    "onUpdate:modelValue": ($event) => unref(form).scheduled_at = $event,
                                                    label: unref(t)("checkout.date"),
                                                    type: "datetime-local",
                                                    variant: "outlined",
                                                    rounded: "lg",
                                                    density: "compact"
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(VCol, { cols: "12" }, {
                                                default: withCtx(() => [
                                                  createVNode(VTextarea, {
                                                    modelValue: unref(form).notes,
                                                    "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                                                    label: unref(t)("checkout.notes"),
                                                    variant: "outlined",
                                                    rounded: "lg",
                                                    density: "compact",
                                                    rows: "3",
                                                    "auto-grow": ""
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("div", {
                                            style: { "position": "absolute", "left": "-9999px", "opacity": "0", "pointer-events": "none" },
                                            "aria-hidden": "true"
                                          }, [
                                            withDirectives(createVNode("input", {
                                              "onUpdate:modelValue": ($event) => isRef(honeypot) ? honeypot.value = $event : null,
                                              tabindex: "-1",
                                              autocomplete: "off"
                                            }, null, 8, ["onUpdate:modelValue"]), [
                                              [vModelText, unref(honeypot)]
                                            ])
                                          ]),
                                          unref(submitError) ? (openBlock(), createBlock(VAlert, {
                                            key: 0,
                                            type: "error",
                                            class: "mb-4",
                                            rounded: "lg"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(unref(submitError)), 1)
                                            ]),
                                            _: 1
                                          })) : createCommentVNode("", true),
                                          createVNode(VBtn, {
                                            type: "submit",
                                            color: "cta",
                                            size: "large",
                                            block: "",
                                            rounded: "lg",
                                            loading: unref(submitting),
                                            disabled: !unref(formValid)
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(unref(t)("checkout.submit")), 1)
                                            ]),
                                            _: 1
                                          }, 8, ["loading", "disabled"])
                                        ]),
                                        _: 1
                                      }, 8, ["modelValue", "onUpdate:modelValue"])
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
                                createVNode(VCardTitle, { class: "pa-6 pb-0 text-h6 font-weight-bold" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Ma'lumotlaringiz")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCardText, { class: "pa-6" }, {
                                  default: withCtx(() => [
                                    createVNode(VForm, {
                                      ref_key: "formRef",
                                      ref: formRef,
                                      modelValue: unref(formValid),
                                      "onUpdate:modelValue": ($event) => isRef(formValid) ? formValid.value = $event : null,
                                      onSubmit: withModifiers(submitOrder, ["prevent"])
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VRow, { dense: "" }, {
                                          default: withCtx(() => [
                                            createVNode(VCol, {
                                              cols: "12",
                                              sm: "6"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(VTextField, {
                                                  modelValue: unref(form).customer_name,
                                                  "onUpdate:modelValue": ($event) => unref(form).customer_name = $event,
                                                  label: unref(t)("checkout.name"),
                                                  rules: [required],
                                                  variant: "outlined",
                                                  rounded: "lg",
                                                  density: "compact"
                                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(VCol, {
                                              cols: "12",
                                              sm: "6"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(VTextField, {
                                                  modelValue: unref(form).customer_email,
                                                  "onUpdate:modelValue": ($event) => unref(form).customer_email = $event,
                                                  label: unref(t)("checkout.email"),
                                                  rules: [required, emailRule],
                                                  type: "email",
                                                  variant: "outlined",
                                                  rounded: "lg",
                                                  density: "compact"
                                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(VCol, {
                                              cols: "12",
                                              sm: "6"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(VTextField, {
                                                  modelValue: unref(form).customer_phone,
                                                  "onUpdate:modelValue": ($event) => unref(form).customer_phone = $event,
                                                  label: unref(t)("checkout.phone"),
                                                  rules: [required],
                                                  variant: "outlined",
                                                  rounded: "lg",
                                                  density: "compact"
                                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(VCol, {
                                              cols: "12",
                                              sm: "6"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(VTextField, {
                                                  modelValue: unref(form).passengers,
                                                  "onUpdate:modelValue": ($event) => unref(form).passengers = $event,
                                                  modelModifiers: { number: true },
                                                  label: unref(t)("checkout.passengers"),
                                                  type: "number",
                                                  min: "1",
                                                  variant: "outlined",
                                                  rounded: "lg",
                                                  density: "compact"
                                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(VCol, { cols: "12" }, {
                                              default: withCtx(() => [
                                                createVNode(VTextField, {
                                                  modelValue: unref(form).scheduled_at,
                                                  "onUpdate:modelValue": ($event) => unref(form).scheduled_at = $event,
                                                  label: unref(t)("checkout.date"),
                                                  type: "datetime-local",
                                                  variant: "outlined",
                                                  rounded: "lg",
                                                  density: "compact"
                                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(VCol, { cols: "12" }, {
                                              default: withCtx(() => [
                                                createVNode(VTextarea, {
                                                  modelValue: unref(form).notes,
                                                  "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                                                  label: unref(t)("checkout.notes"),
                                                  variant: "outlined",
                                                  rounded: "lg",
                                                  density: "compact",
                                                  rows: "3",
                                                  "auto-grow": ""
                                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("div", {
                                          style: { "position": "absolute", "left": "-9999px", "opacity": "0", "pointer-events": "none" },
                                          "aria-hidden": "true"
                                        }, [
                                          withDirectives(createVNode("input", {
                                            "onUpdate:modelValue": ($event) => isRef(honeypot) ? honeypot.value = $event : null,
                                            tabindex: "-1",
                                            autocomplete: "off"
                                          }, null, 8, ["onUpdate:modelValue"]), [
                                            [vModelText, unref(honeypot)]
                                          ])
                                        ]),
                                        unref(submitError) ? (openBlock(), createBlock(VAlert, {
                                          key: 0,
                                          type: "error",
                                          class: "mb-4",
                                          rounded: "lg"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(unref(submitError)), 1)
                                          ]),
                                          _: 1
                                        })) : createCommentVNode("", true),
                                        createVNode(VBtn, {
                                          type: "submit",
                                          color: "cta",
                                          size: "large",
                                          block: "",
                                          rounded: "lg",
                                          loading: unref(submitting),
                                          disabled: !unref(formValid)
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(unref(t)("checkout.submit")), 1)
                                          ]),
                                          _: 1
                                        }, 8, ["loading", "disabled"])
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue", "onUpdate:modelValue"])
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
                                _push5(ssrRenderComponent(VCardTitle, { class: "pa-5 pb-0 text-body-1 font-weight-bold" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(unref(t)("cart.title"))}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(unref(t)("cart.title")), 1)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VCardText, { class: "pa-5" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList(unref(cartStore).items, (item) => {
                                        _push6(`<div class="d-flex justify-space-between align-center py-2 border-b" data-v-c8ff2d9e${_scopeId5}><div data-v-c8ff2d9e${_scopeId5}><div class="text-body-2 font-weight-medium" data-v-c8ff2d9e${_scopeId5}>${ssrInterpolate(item.name)}</div><div class="text-caption text-medium-emphasis" data-v-c8ff2d9e${_scopeId5}>× ${ssrInterpolate(item.quantity)}</div></div><span class="text-body-2 font-weight-bold" data-v-c8ff2d9e${_scopeId5}>$${ssrInterpolate((item.price * item.quantity).toFixed(2))}</span></div>`);
                                      });
                                      _push6(`<!--]-->`);
                                      _push6(ssrRenderComponent(VDivider, { class: "my-3" }, null, _parent6, _scopeId5));
                                      _push6(`<div class="d-flex justify-space-between text-h6 font-weight-bold" data-v-c8ff2d9e${_scopeId5}><span data-v-c8ff2d9e${_scopeId5}>${ssrInterpolate(unref(t)("cart.total"))}</span><span data-v-c8ff2d9e${_scopeId5}>$${ssrInterpolate(unref(cartStore).total.toFixed(2))}</span></div>`);
                                    } else {
                                      return [
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(cartStore).items, (item) => {
                                          return openBlock(), createBlock("div", {
                                            key: `${item.type}-${item.id}`,
                                            class: "d-flex justify-space-between align-center py-2 border-b"
                                          }, [
                                            createVNode("div", null, [
                                              createVNode("div", { class: "text-body-2 font-weight-medium" }, toDisplayString(item.name), 1),
                                              createVNode("div", { class: "text-caption text-medium-emphasis" }, "× " + toDisplayString(item.quantity), 1)
                                            ]),
                                            createVNode("span", { class: "text-body-2 font-weight-bold" }, "$" + toDisplayString((item.price * item.quantity).toFixed(2)), 1)
                                          ]);
                                        }), 128)),
                                        createVNode(VDivider, { class: "my-3" }),
                                        createVNode("div", { class: "d-flex justify-space-between text-h6 font-weight-bold" }, [
                                          createVNode("span", null, toDisplayString(unref(t)("cart.total")), 1),
                                          createVNode("span", null, "$" + toDisplayString(unref(cartStore).total.toFixed(2)), 1)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VCardTitle, { class: "pa-5 pb-0 text-body-1 font-weight-bold" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(t)("cart.title")), 1)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCardText, { class: "pa-5" }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(cartStore).items, (item) => {
                                        return openBlock(), createBlock("div", {
                                          key: `${item.type}-${item.id}`,
                                          class: "d-flex justify-space-between align-center py-2 border-b"
                                        }, [
                                          createVNode("div", null, [
                                            createVNode("div", { class: "text-body-2 font-weight-medium" }, toDisplayString(item.name), 1),
                                            createVNode("div", { class: "text-caption text-medium-emphasis" }, "× " + toDisplayString(item.quantity), 1)
                                          ]),
                                          createVNode("span", { class: "text-body-2 font-weight-bold" }, "$" + toDisplayString((item.price * item.quantity).toFixed(2)), 1)
                                        ]);
                                      }), 128)),
                                      createVNode(VDivider, { class: "my-3" }),
                                      createVNode("div", { class: "d-flex justify-space-between text-h6 font-weight-bold" }, [
                                        createVNode("span", null, toDisplayString(unref(t)("cart.total")), 1),
                                        createVNode("span", null, "$" + toDisplayString(unref(cartStore).total.toFixed(2)), 1)
                                      ])
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
                                createVNode(VCardTitle, { class: "pa-5 pb-0 text-body-1 font-weight-bold" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(t)("cart.title")), 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCardText, { class: "pa-5" }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(cartStore).items, (item) => {
                                      return openBlock(), createBlock("div", {
                                        key: `${item.type}-${item.id}`,
                                        class: "d-flex justify-space-between align-center py-2 border-b"
                                      }, [
                                        createVNode("div", null, [
                                          createVNode("div", { class: "text-body-2 font-weight-medium" }, toDisplayString(item.name), 1),
                                          createVNode("div", { class: "text-caption text-medium-emphasis" }, "× " + toDisplayString(item.quantity), 1)
                                        ]),
                                        createVNode("span", { class: "text-body-2 font-weight-bold" }, "$" + toDisplayString((item.price * item.quantity).toFixed(2)), 1)
                                      ]);
                                    }), 128)),
                                    createVNode(VDivider, { class: "my-3" }),
                                    createVNode("div", { class: "d-flex justify-space-between text-h6 font-weight-bold" }, [
                                      createVNode("span", null, toDisplayString(unref(t)("cart.total")), 1),
                                      createVNode("span", null, "$" + toDisplayString(unref(cartStore).total.toFixed(2)), 1)
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
                              createVNode(VCardTitle, { class: "pa-6 pb-0 text-h6 font-weight-bold" }, {
                                default: withCtx(() => [
                                  createTextVNode("Ma'lumotlaringiz")
                                ]),
                                _: 1
                              }),
                              createVNode(VCardText, { class: "pa-6" }, {
                                default: withCtx(() => [
                                  createVNode(VForm, {
                                    ref_key: "formRef",
                                    ref: formRef,
                                    modelValue: unref(formValid),
                                    "onUpdate:modelValue": ($event) => isRef(formValid) ? formValid.value = $event : null,
                                    onSubmit: withModifiers(submitOrder, ["prevent"])
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VRow, { dense: "" }, {
                                        default: withCtx(() => [
                                          createVNode(VCol, {
                                            cols: "12",
                                            sm: "6"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VTextField, {
                                                modelValue: unref(form).customer_name,
                                                "onUpdate:modelValue": ($event) => unref(form).customer_name = $event,
                                                label: unref(t)("checkout.name"),
                                                rules: [required],
                                                variant: "outlined",
                                                rounded: "lg",
                                                density: "compact"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(VCol, {
                                            cols: "12",
                                            sm: "6"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VTextField, {
                                                modelValue: unref(form).customer_email,
                                                "onUpdate:modelValue": ($event) => unref(form).customer_email = $event,
                                                label: unref(t)("checkout.email"),
                                                rules: [required, emailRule],
                                                type: "email",
                                                variant: "outlined",
                                                rounded: "lg",
                                                density: "compact"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(VCol, {
                                            cols: "12",
                                            sm: "6"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VTextField, {
                                                modelValue: unref(form).customer_phone,
                                                "onUpdate:modelValue": ($event) => unref(form).customer_phone = $event,
                                                label: unref(t)("checkout.phone"),
                                                rules: [required],
                                                variant: "outlined",
                                                rounded: "lg",
                                                density: "compact"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(VCol, {
                                            cols: "12",
                                            sm: "6"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VTextField, {
                                                modelValue: unref(form).passengers,
                                                "onUpdate:modelValue": ($event) => unref(form).passengers = $event,
                                                modelModifiers: { number: true },
                                                label: unref(t)("checkout.passengers"),
                                                type: "number",
                                                min: "1",
                                                variant: "outlined",
                                                rounded: "lg",
                                                density: "compact"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(VCol, { cols: "12" }, {
                                            default: withCtx(() => [
                                              createVNode(VTextField, {
                                                modelValue: unref(form).scheduled_at,
                                                "onUpdate:modelValue": ($event) => unref(form).scheduled_at = $event,
                                                label: unref(t)("checkout.date"),
                                                type: "datetime-local",
                                                variant: "outlined",
                                                rounded: "lg",
                                                density: "compact"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(VCol, { cols: "12" }, {
                                            default: withCtx(() => [
                                              createVNode(VTextarea, {
                                                modelValue: unref(form).notes,
                                                "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                                                label: unref(t)("checkout.notes"),
                                                variant: "outlined",
                                                rounded: "lg",
                                                density: "compact",
                                                rows: "3",
                                                "auto-grow": ""
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("div", {
                                        style: { "position": "absolute", "left": "-9999px", "opacity": "0", "pointer-events": "none" },
                                        "aria-hidden": "true"
                                      }, [
                                        withDirectives(createVNode("input", {
                                          "onUpdate:modelValue": ($event) => isRef(honeypot) ? honeypot.value = $event : null,
                                          tabindex: "-1",
                                          autocomplete: "off"
                                        }, null, 8, ["onUpdate:modelValue"]), [
                                          [vModelText, unref(honeypot)]
                                        ])
                                      ]),
                                      unref(submitError) ? (openBlock(), createBlock(VAlert, {
                                        key: 0,
                                        type: "error",
                                        class: "mb-4",
                                        rounded: "lg"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(submitError)), 1)
                                        ]),
                                        _: 1
                                      })) : createCommentVNode("", true),
                                      createVNode(VBtn, {
                                        type: "submit",
                                        color: "cta",
                                        size: "large",
                                        block: "",
                                        rounded: "lg",
                                        loading: unref(submitting),
                                        disabled: !unref(formValid)
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(t)("checkout.submit")), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["loading", "disabled"])
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue"])
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
                              createVNode(VCardTitle, { class: "pa-5 pb-0 text-body-1 font-weight-bold" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(t)("cart.title")), 1)
                                ]),
                                _: 1
                              }),
                              createVNode(VCardText, { class: "pa-5" }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(cartStore).items, (item) => {
                                    return openBlock(), createBlock("div", {
                                      key: `${item.type}-${item.id}`,
                                      class: "d-flex justify-space-between align-center py-2 border-b"
                                    }, [
                                      createVNode("div", null, [
                                        createVNode("div", { class: "text-body-2 font-weight-medium" }, toDisplayString(item.name), 1),
                                        createVNode("div", { class: "text-caption text-medium-emphasis" }, "× " + toDisplayString(item.quantity), 1)
                                      ]),
                                      createVNode("span", { class: "text-body-2 font-weight-bold" }, "$" + toDisplayString((item.price * item.quantity).toFixed(2)), 1)
                                    ]);
                                  }), 128)),
                                  createVNode(VDivider, { class: "my-3" }),
                                  createVNode("div", { class: "d-flex justify-space-between text-h6 font-weight-bold" }, [
                                    createVNode("span", null, toDisplayString(unref(t)("cart.total")), 1),
                                    createVNode("span", null, "$" + toDisplayString(unref(cartStore).total.toFixed(2)), 1)
                                  ])
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
            }
          } else {
            return [
              unref(cartStore).items.length === 0 && !unref(orderResult) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "text-center py-20"
              }, [
                createVNode(VIcon, {
                  size: "80",
                  color: "grey-lighten-2"
                }, {
                  default: withCtx(() => [
                    createTextVNode("mdi-cart-off")
                  ]),
                  _: 1
                }),
                createVNode("p", { class: "text-h6 text-medium-emphasis mt-4" }, toDisplayString(unref(t)("cart.empty")), 1),
                createVNode(VBtn, {
                  to: unref(localePath)("/transfers"),
                  color: "primary",
                  class: "mt-4",
                  rounded: "lg"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("transfers.title")), 1)
                  ]),
                  _: 1
                }, 8, ["to"])
              ])) : unref(orderResult) ? (openBlock(), createBlock("div", {
                key: 1,
                class: "text-center py-16"
              }, [
                createVNode(VIcon, {
                  size: "80",
                  color: "success",
                  class: "mb-4"
                }, {
                  default: withCtx(() => [
                    createTextVNode("mdi-check-circle")
                  ]),
                  _: 1
                }),
                createVNode("h2", { class: "text-h4 font-weight-bold mb-2" }, toDisplayString(unref(t)("checkout.success")), 1),
                createVNode("p", { class: "text-medium-emphasis mb-6" }, toDisplayString(unref(t)("checkout.success_msg")), 1),
                createVNode(VChip, {
                  color: "primary",
                  size: "large",
                  class: "mb-6"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("checkout.order_number")) + ": " + toDisplayString(unref(orderResult).order_number), 1)
                  ]),
                  _: 1
                }),
                createVNode("br"),
                createVNode(VBtn, {
                  to: unref(localePath)("/"),
                  color: "cta",
                  size: "large",
                  rounded: "lg",
                  class: "mt-4"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Bosh sahifaga qaytish ")
                  ]),
                  _: 1
                }, 8, ["to"])
              ])) : (openBlock(), createBlock(VRow, { key: 2 }, {
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
                          createVNode(VCardTitle, { class: "pa-6 pb-0 text-h6 font-weight-bold" }, {
                            default: withCtx(() => [
                              createTextVNode("Ma'lumotlaringiz")
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, { class: "pa-6" }, {
                            default: withCtx(() => [
                              createVNode(VForm, {
                                ref_key: "formRef",
                                ref: formRef,
                                modelValue: unref(formValid),
                                "onUpdate:modelValue": ($event) => isRef(formValid) ? formValid.value = $event : null,
                                onSubmit: withModifiers(submitOrder, ["prevent"])
                              }, {
                                default: withCtx(() => [
                                  createVNode(VRow, { dense: "" }, {
                                    default: withCtx(() => [
                                      createVNode(VCol, {
                                        cols: "12",
                                        sm: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(form).customer_name,
                                            "onUpdate:modelValue": ($event) => unref(form).customer_name = $event,
                                            label: unref(t)("checkout.name"),
                                            rules: [required],
                                            variant: "outlined",
                                            rounded: "lg",
                                            density: "compact"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        sm: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(form).customer_email,
                                            "onUpdate:modelValue": ($event) => unref(form).customer_email = $event,
                                            label: unref(t)("checkout.email"),
                                            rules: [required, emailRule],
                                            type: "email",
                                            variant: "outlined",
                                            rounded: "lg",
                                            density: "compact"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        sm: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(form).customer_phone,
                                            "onUpdate:modelValue": ($event) => unref(form).customer_phone = $event,
                                            label: unref(t)("checkout.phone"),
                                            rules: [required],
                                            variant: "outlined",
                                            rounded: "lg",
                                            density: "compact"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        sm: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(form).passengers,
                                            "onUpdate:modelValue": ($event) => unref(form).passengers = $event,
                                            modelModifiers: { number: true },
                                            label: unref(t)("checkout.passengers"),
                                            type: "number",
                                            min: "1",
                                            variant: "outlined",
                                            rounded: "lg",
                                            density: "compact"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "12" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(form).scheduled_at,
                                            "onUpdate:modelValue": ($event) => unref(form).scheduled_at = $event,
                                            label: unref(t)("checkout.date"),
                                            type: "datetime-local",
                                            variant: "outlined",
                                            rounded: "lg",
                                            density: "compact"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "12" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextarea, {
                                            modelValue: unref(form).notes,
                                            "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                                            label: unref(t)("checkout.notes"),
                                            variant: "outlined",
                                            rounded: "lg",
                                            density: "compact",
                                            rows: "3",
                                            "auto-grow": ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("div", {
                                    style: { "position": "absolute", "left": "-9999px", "opacity": "0", "pointer-events": "none" },
                                    "aria-hidden": "true"
                                  }, [
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => isRef(honeypot) ? honeypot.value = $event : null,
                                      tabindex: "-1",
                                      autocomplete: "off"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, unref(honeypot)]
                                    ])
                                  ]),
                                  unref(submitError) ? (openBlock(), createBlock(VAlert, {
                                    key: 0,
                                    type: "error",
                                    class: "mb-4",
                                    rounded: "lg"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(submitError)), 1)
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true),
                                  createVNode(VBtn, {
                                    type: "submit",
                                    color: "cta",
                                    size: "large",
                                    block: "",
                                    rounded: "lg",
                                    loading: unref(submitting),
                                    disabled: !unref(formValid)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(t)("checkout.submit")), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["loading", "disabled"])
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
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
                          createVNode(VCardTitle, { class: "pa-5 pb-0 text-body-1 font-weight-bold" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(t)("cart.title")), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, { class: "pa-5" }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(cartStore).items, (item) => {
                                return openBlock(), createBlock("div", {
                                  key: `${item.type}-${item.id}`,
                                  class: "d-flex justify-space-between align-center py-2 border-b"
                                }, [
                                  createVNode("div", null, [
                                    createVNode("div", { class: "text-body-2 font-weight-medium" }, toDisplayString(item.name), 1),
                                    createVNode("div", { class: "text-caption text-medium-emphasis" }, "× " + toDisplayString(item.quantity), 1)
                                  ]),
                                  createVNode("span", { class: "text-body-2 font-weight-bold" }, "$" + toDisplayString((item.price * item.quantity).toFixed(2)), 1)
                                ]);
                              }), 128)),
                              createVNode(VDivider, { class: "my-3" }),
                              createVNode("div", { class: "d-flex justify-space-between text-h6 font-weight-bold" }, [
                                createVNode("span", null, toDisplayString(unref(t)("cart.total")), 1),
                                createVNode("span", null, "$" + toDisplayString(unref(cartStore).total.toFixed(2)), 1)
                              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const checkout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c8ff2d9e"]]);
export {
  checkout as default
};
//# sourceMappingURL=checkout-BUGWmA8o.js.map
