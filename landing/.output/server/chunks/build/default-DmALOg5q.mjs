import { _ as __nuxt_component_0 } from './nuxt-link-C-3FqTCY.mjs';
import { defineComponent, ref, computed, withCtx, unref, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, mergeProps, isRef, renderSlot, toRef, watchEffect, shallowRef, useId, inject, provide, watch, nextTick, readonly, toRaw, toValue, onScopeDispose, Transition, createElementVNode, normalizeStyle, normalizeClass, withDirectives, vShow, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderSlot, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc, f as useI18n, g as useLocalePath, aj as useSwitchLocalePath, l as genericComponent, C as provideTheme, m as useRtl, E as useProxiedModel, O as useToggleScope, U as useLocale, J as useTheme, ah as isClickInsideElement, D as provideDefaults, a1 as useDisplay, c as useRuntimeConfig, p as propsFactory, B as makeThemeProps, Z as omit, N as clamp, L as IconValue, af as focusChild, s as getCurrentInstance, V as EventProp, I as convertToUnit, a0 as makeDisplayProps, a7 as consoleError, q as isPrimitive, ag as getPropertyFromItem, F as wrapInArray, aa as acceleratedEasing, ab as deceleratedEasing, X as standardEasing, ac as pickWithRest, ad as defineComponent$1, ae as deprecate, ai as getNextElement, a3 as focusableChildren } from './server.mjs';
import { u as useCartStore, f as forwardRefs, a as animate, n as nullifyTransforms } from './forwardRefs-BsiwRHAr.mjs';
import { d as VIcon, b as VBtn, c as VCard, e as VCardText, V as VRow, a as VCol, u as useRender, t as createSimpleFunctional, F as useBackgroundColor, p as useRounded, q as useTextColor, n as useLocation, k as useDimension, N as useBorder, j as useDensity, l as useElevation, R as Ripple, Q as useLink, i as useVariant, a1 as useRouter, a2 as toPhysical, _ as useResizeObserver, m as makeComponentProps, B as makeDimensionProps, K as makeTransitionProps, w as makeTagProps, x as makeRoundedProps, z as makeLocationProps, v as makeVariantProps, A as makeElevationProps, C as makeDensityProps, X as makeBorderProps, U as makeRouterProps, a3 as getTargetBox, E as VImg, s as VDefaultsProvider, M as MaybeTransition, r as genOverlays, S as VAvatar } from './VRow-DQkXkPiv.mjs';
import { c as createLayout, d as useLayoutItem, u as useScopeId, e as VMenuSymbol, f as useFocusTrap, a as useLayout, g as makeLayoutProps, h as makeLayoutItemProps, m as makeVOverlayProps, i as makeFocusTrapProps, j as makeDelayProps, b as VOverlay, k as useDelay } from './VOverlay-DnwGKld0.mjs';
import { c as VExpandTransition } from './index-wObflqc9.mjs';
import { V as VDivider } from './VDivider-BPwYB-Z2.mjs';
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
import 'pinia';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

function throttle(fn, delay) {
  let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    leading: true,
    trailing: true
  };
  let timeoutId = 0;
  let lastExec = 0;
  let throttling = false;
  let start = 0;
  function clear() {
    clearTimeout(timeoutId);
    throttling = false;
    start = 0;
  }
  const wrap = function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    clearTimeout(timeoutId);
    const now = Date.now();
    if (!start) start = now;
    const elapsed = now - Math.max(start, lastExec);
    function invoke() {
      lastExec = Date.now();
      timeoutId = setTimeout(clear, delay);
      fn(...args);
    }
    if (!throttling) {
      throttling = true;
      if (options.leading) {
        invoke();
      }
    } else if (elapsed >= delay) {
      invoke();
    } else if (options.trailing) {
      timeoutId = setTimeout(invoke, delay - elapsed);
    }
  };
  wrap.clear = clear;
  wrap.immediate = fn;
  return wrap;
}
const makeVDialogTransitionProps = propsFactory({
  target: [Object, Array]
}, "v-dialog-transition");
const saved = /* @__PURE__ */ new WeakMap();
const VDialogTransition = genericComponent()({
  name: "VDialogTransition",
  props: makeVDialogTransitionProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const functions = {
      onBeforeEnter(el) {
        el.style.pointerEvents = "none";
        el.style.visibility = "hidden";
      },
      async onEnter(el, done) {
        var _a;
        await new Promise((resolve) => requestAnimationFrame(resolve));
        await new Promise((resolve) => requestAnimationFrame(resolve));
        el.style.visibility = "";
        const dimensions = getDimensions(props.target, el);
        const {
          x,
          y,
          sx,
          sy,
          speed
        } = dimensions;
        saved.set(el, dimensions);
        {
          const animation = animate(el, [{
            transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`,
            opacity: 0
          }, {}], {
            duration: 225 * speed,
            easing: deceleratedEasing
          });
          (_a = getChildren(el)) == null ? void 0 : _a.forEach((el2) => {
            animate(el2, [{
              opacity: 0
            }, {
              opacity: 0,
              offset: 0.33
            }, {}], {
              duration: 225 * 2 * speed,
              easing: standardEasing
            });
          });
          animation.finished.then(() => done());
        }
      },
      onAfterEnter(el) {
        el.style.removeProperty("pointer-events");
      },
      onBeforeLeave(el) {
        el.style.pointerEvents = "none";
      },
      async onLeave(el, done) {
        var _a;
        await new Promise((resolve) => requestAnimationFrame(resolve));
        let dimensions;
        if (!saved.has(el) || Array.isArray(props.target) || props.target.offsetParent || props.target.getClientRects().length) {
          dimensions = getDimensions(props.target, el);
        } else {
          dimensions = saved.get(el);
        }
        const {
          x,
          y,
          sx,
          sy,
          speed
        } = dimensions;
        {
          const animation = animate(el, [{}, {
            transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`,
            opacity: 0
          }], {
            duration: 125 * speed,
            easing: acceleratedEasing
          });
          animation.finished.then(() => done());
          (_a = getChildren(el)) == null ? void 0 : _a.forEach((el2) => {
            animate(el2, [{}, {
              opacity: 0,
              offset: 0.2
            }, {
              opacity: 0
            }], {
              duration: 125 * 2 * speed,
              easing: standardEasing
            });
          });
        }
      },
      onAfterLeave(el) {
        el.style.removeProperty("pointer-events");
      }
    };
    return () => {
      return props.target ? createVNode(Transition, mergeProps({
        "name": "dialog-transition"
      }, functions, {
        "css": false
      }), slots) : createVNode(Transition, {
        "name": "dialog-transition"
      }, slots);
    };
  }
});
function getChildren(el) {
  var _a;
  const els = (_a = el.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")) == null ? void 0 : _a.children;
  return els && [...els];
}
function getDimensions(target, el) {
  const targetBox = getTargetBox(target);
  const elBox = nullifyTransforms(el);
  const [originX, originY] = getComputedStyle(el).transformOrigin.split(" ").map((v) => parseFloat(v));
  const [anchorSide, anchorOffset] = getComputedStyle(el).getPropertyValue("--v-overlay-anchor-origin").split(" ");
  let offsetX = targetBox.left + targetBox.width / 2;
  if (anchorSide === "left" || anchorOffset === "left") {
    offsetX -= targetBox.width / 2;
  } else if (anchorSide === "right" || anchorOffset === "right") {
    offsetX += targetBox.width / 2;
  }
  let offsetY = targetBox.top + targetBox.height / 2;
  if (anchorSide === "top" || anchorOffset === "top") {
    offsetY -= targetBox.height / 2;
  } else if (anchorSide === "bottom" || anchorOffset === "bottom") {
    offsetY += targetBox.height / 2;
  }
  const tsx = targetBox.width / elBox.width;
  const tsy = targetBox.height / elBox.height;
  const maxs = Math.max(1, tsx, tsy);
  const sx = tsx / maxs || 0;
  const sy = tsy / maxs || 0;
  const asa = elBox.width * elBox.height / ((void 0).innerWidth * (void 0).innerHeight);
  const speed = asa > 0.12 ? Math.min(1.5, (asa - 0.12) * 10 + 1) : 1;
  return {
    x: offsetX - (originX + elBox.left),
    y: offsetY - (originY + elBox.top),
    sx,
    sy,
    speed
  };
}
const VSpacer = createSimpleFunctional("v-spacer", "div", "VSpacer");
const makeVAppProps = propsFactory({
  ...makeComponentProps(),
  ...omit(makeLayoutProps(), ["fullHeight"]),
  ...makeThemeProps()
}, "VApp");
const VApp = genericComponent()({
  name: "VApp",
  props: makeVAppProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const theme = provideTheme(props);
    const {
      layoutClasses,
      getLayoutItem,
      items,
      layoutRef
    } = createLayout({
      ...props,
      fullHeight: true
    });
    const {
      rtlClasses
    } = useRtl();
    useRender(() => {
      var _a;
      return createElementVNode("div", {
        "ref": layoutRef,
        "class": normalizeClass(["v-application", theme.themeClasses.value, layoutClasses.value, rtlClasses.value, props.class]),
        "style": normalizeStyle([props.style])
      }, [createElementVNode("div", {
        "class": "v-application__wrap"
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]);
    });
    return {
      getLayoutItem,
      items,
      theme
    };
  }
});
const makeVToolbarTitleProps = propsFactory({
  text: String,
  ...makeComponentProps(),
  ...makeTagProps()
}, "VToolbarTitle");
const VToolbarTitle = genericComponent()({
  name: "VToolbarTitle",
  props: makeVToolbarTitleProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      const hasText = !!(slots.default || slots.text || props.text);
      return createVNode(props.tag, {
        "class": normalizeClass(["v-toolbar-title", props.class]),
        "style": normalizeStyle(props.style)
      }, {
        default: () => {
          var _a;
          return [hasText && createElementVNode("div", {
            "class": "v-toolbar-title__placeholder"
          }, [slots.text ? slots.text() : props.text, (_a = slots.default) == null ? void 0 : _a.call(slots)])];
        }
      });
    });
    return {};
  }
});
const allowedDensities = [null, "prominent", "default", "comfortable", "compact"];
const makeVToolbarProps = propsFactory({
  absolute: Boolean,
  collapse: Boolean,
  collapsePosition: {
    type: String,
    default: "start"
  },
  color: String,
  density: {
    type: String,
    default: "default",
    validator: (v) => allowedDensities.includes(v)
  },
  extended: {
    type: Boolean,
    default: null
  },
  extensionHeight: {
    type: [Number, String],
    default: 48
  },
  flat: Boolean,
  floating: Boolean,
  height: {
    type: [Number, String],
    default: 64
  },
  image: String,
  title: String,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeElevationProps(),
  ...makeLocationProps(),
  ...makeRoundedProps(),
  ...makeTagProps({
    tag: "header"
  }),
  ...makeThemeProps()
}, "VToolbar");
const VToolbar = genericComponent()({
  name: "VToolbar",
  props: makeVToolbarProps(),
  setup(props, _ref) {
    var _a;
    let {
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      borderClasses
    } = useBorder(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      themeClasses
    } = provideTheme(props);
    const {
      rtlClasses
    } = useRtl();
    const isExtended = shallowRef(props.extended === null ? !!((_a = slots.extension) == null ? void 0 : _a.call(slots)) : props.extended);
    const contentHeight = computed(() => parseInt(Number(props.height) + (props.density === "prominent" ? Number(props.height) : 0) - (props.density === "comfortable" ? 8 : 0) - (props.density === "compact" ? 16 : 0), 10));
    const extensionHeight = computed(() => isExtended.value ? parseInt(Number(props.extensionHeight) + (props.density === "prominent" ? Number(props.extensionHeight) : 0) - (props.density === "comfortable" ? 4 : 0) - (props.density === "compact" ? 8 : 0), 10) : 0);
    provideDefaults({
      VBtn: {
        variant: "text"
      }
    });
    useRender(() => {
      var _a2;
      const hasTitle = !!(props.title || slots.title);
      const hasImage = !!(slots.image || props.image);
      const extension = (_a2 = slots.extension) == null ? void 0 : _a2.call(slots);
      isExtended.value = props.extended === null ? !!extension : props.extended;
      return createVNode(props.tag, {
        "class": normalizeClass(["v-toolbar", `v-toolbar--collapse-${props.collapsePosition}`, {
          "v-toolbar--absolute": props.absolute,
          "v-toolbar--collapse": props.collapse,
          "v-toolbar--flat": props.flat,
          "v-toolbar--floating": props.floating,
          [`v-toolbar--density-${props.density}`]: true
        }, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value, themeClasses.value, rtlClasses.value, props.class]),
        "style": normalizeStyle([backgroundColorStyles.value, locationStyles.value, props.style])
      }, {
        default: () => [hasImage && createElementVNode("div", {
          "key": "image",
          "class": "v-toolbar__image"
        }, [!slots.image ? createVNode(VImg, {
          "key": "image-img",
          "cover": true,
          "src": props.image
        }, null) : createVNode(VDefaultsProvider, {
          "key": "image-defaults",
          "disabled": !props.image,
          "defaults": {
            VImg: {
              cover: true,
              src: props.image
            }
          }
        }, slots.image)]), createVNode(VDefaultsProvider, {
          "defaults": {
            VTabs: {
              height: convertToUnit(contentHeight.value)
            }
          }
        }, {
          default: () => {
            var _a3, _b, _c;
            return [createElementVNode("div", {
              "class": "v-toolbar__content",
              "style": {
                height: convertToUnit(contentHeight.value)
              }
            }, [slots.prepend && createElementVNode("div", {
              "class": "v-toolbar__prepend"
            }, [(_a3 = slots.prepend) == null ? void 0 : _a3.call(slots)]), hasTitle && createVNode(VToolbarTitle, {
              "key": "title",
              "text": props.title
            }, {
              text: slots.title
            }), (_b = slots.default) == null ? void 0 : _b.call(slots), slots.append && createElementVNode("div", {
              "class": "v-toolbar__append"
            }, [(_c = slots.append) == null ? void 0 : _c.call(slots)])])];
          }
        }), createVNode(VDefaultsProvider, {
          "defaults": {
            VTabs: {
              height: convertToUnit(extensionHeight.value)
            }
          }
        }, {
          default: () => [createVNode(VExpandTransition, null, {
            default: () => [isExtended.value && createElementVNode("div", {
              "class": "v-toolbar__extension",
              "style": {
                height: convertToUnit(extensionHeight.value)
              }
            }, [extension])]
          })]
        })]
      });
    });
    return {
      contentHeight,
      extensionHeight
    };
  }
});
const makeScrollProps = propsFactory({
  scrollTarget: {
    type: String
  },
  scrollThreshold: {
    type: [String, Number],
    default: 300
  }
}, "scroll");
function useScroll(props) {
  let args = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    canScroll,
    layoutSize
  } = args;
  let previousScroll = 0;
  let previousScrollHeight = 0;
  const target = ref(null);
  const currentScroll = shallowRef(0);
  const savedScroll = shallowRef(0);
  const currentThreshold = shallowRef(0);
  const isScrollActive = shallowRef(false);
  const isScrollingUp = shallowRef(false);
  const isAtBottom = shallowRef(false);
  const reachedBottomWhileScrollingDown = shallowRef(false);
  const hasEnoughScrollableSpace = shallowRef(true);
  const scrollThreshold = computed(() => {
    return Number(props.scrollThreshold);
  });
  const scrollRatio = computed(() => {
    return clamp((scrollThreshold.value - currentScroll.value) / scrollThreshold.value || 0);
  });
  function getScrollMetrics(targetEl) {
    const clientHeight = "window" in targetEl ? (void 0).innerHeight : targetEl.clientHeight;
    const scrollHeight = "window" in targetEl ? (void 0).documentElement.scrollHeight : targetEl.scrollHeight;
    return {
      clientHeight,
      scrollHeight
    };
  }
  function checkScrollableSpace() {
    const targetEl = target.value;
    if (!targetEl) return;
    const {
      clientHeight,
      scrollHeight
    } = getScrollMetrics(targetEl);
    const maxScrollableDistance = scrollHeight - clientHeight;
    const elementHeight = (layoutSize == null ? void 0 : layoutSize.value) || 0;
    const minRequiredDistance = scrollThreshold.value + elementHeight;
    hasEnoughScrollableSpace.value = maxScrollableDistance > minRequiredDistance;
  }
  function onScroll() {
    const targetEl = target.value;
    if (!targetEl || canScroll && !canScroll.value) return;
    previousScroll = currentScroll.value;
    currentScroll.value = "window" in targetEl ? targetEl.pageYOffset : targetEl.scrollTop;
    const currentScrollHeight = targetEl instanceof Window ? (void 0).documentElement.scrollHeight : targetEl.scrollHeight;
    if (previousScrollHeight !== currentScrollHeight) {
      if (currentScrollHeight > previousScrollHeight) {
        checkScrollableSpace();
      }
      previousScrollHeight = currentScrollHeight;
    }
    isScrollingUp.value = currentScroll.value < previousScroll;
    currentThreshold.value = Math.abs(currentScroll.value - scrollThreshold.value);
    const {
      clientHeight,
      scrollHeight
    } = getScrollMetrics(targetEl);
    const atBottom = currentScroll.value + clientHeight >= scrollHeight - 5;
    if (!isScrollingUp.value && atBottom && currentScroll.value >= scrollThreshold.value && hasEnoughScrollableSpace.value) {
      reachedBottomWhileScrollingDown.value = true;
    }
    const scrollJumped = Math.abs(currentScroll.value - previousScroll) > 100;
    const atTop = currentScroll.value <= 5;
    const scrolledUpSignificantly = isScrollingUp.value && previousScroll - currentScroll.value > 1;
    if (scrolledUpSignificantly && !atBottom || scrollJumped && currentScroll.value < scrollThreshold.value || atTop) {
      reachedBottomWhileScrollingDown.value = false;
    }
    isAtBottom.value = atBottom;
  }
  watch(isScrollingUp, () => {
    savedScroll.value = savedScroll.value || currentScroll.value;
  });
  watch(isScrollActive, () => {
    savedScroll.value = 0;
  });
  canScroll && watch(canScroll, onScroll, {
    immediate: true
  });
  return {
    scrollThreshold,
    currentScroll,
    currentThreshold,
    isScrollActive,
    scrollRatio,
    // required only for testing
    // probably can be removed
    // later (2 chars chlng)
    isScrollingUp,
    savedScroll,
    isAtBottom,
    reachedBottomWhileScrollingDown,
    hasEnoughScrollableSpace
  };
}
function useSsrBoot() {
  const isBooted = shallowRef(false);
  const ssrBootStyles = toRef(() => !isBooted.value ? {
    transition: "none !important"
  } : void 0);
  return {
    ssrBootStyles,
    isBooted: readonly(isBooted)
  };
}
const makeVAppBarProps = propsFactory({
  scrollBehavior: String,
  modelValue: {
    type: Boolean,
    default: true
  },
  location: {
    type: String,
    default: "top",
    validator: (value) => ["top", "bottom"].includes(value)
  },
  ...omit(makeVToolbarProps(), ["location"]),
  ...makeLayoutItemProps(),
  ...makeScrollProps(),
  height: {
    type: [Number, String],
    default: 64
  }
}, "VAppBar");
const VAppBar = genericComponent()({
  name: "VAppBar",
  props: makeVAppBarProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const vToolbarRef = ref();
    const isActive = useProxiedModel(props, "modelValue");
    const scrollBehavior = computed(() => {
      var _a, _b;
      const behavior = new Set((_b = (_a = props.scrollBehavior) == null ? void 0 : _a.split(" ")) != null ? _b : []);
      return {
        hide: behavior.has("hide"),
        fullyHide: behavior.has("fully-hide"),
        inverted: behavior.has("inverted"),
        collapse: behavior.has("collapse"),
        elevate: behavior.has("elevate"),
        fadeImage: behavior.has("fade-image")
        // shrink: behavior.has('shrink'),
      };
    });
    const canScroll = computed(() => {
      const behavior = scrollBehavior.value;
      return behavior.hide || behavior.fullyHide || behavior.inverted || behavior.collapse || behavior.elevate || behavior.fadeImage || // behavior.shrink ||
      !isActive.value;
    });
    const appBarHeight = computed(() => {
      var _a, _b, _c, _d;
      const height2 = (_b = (_a = vToolbarRef.value) == null ? void 0 : _a.contentHeight) != null ? _b : 0;
      const extensionHeight = (_d = (_c = vToolbarRef.value) == null ? void 0 : _c.extensionHeight) != null ? _d : 0;
      return height2 + extensionHeight;
    });
    const {
      currentScroll,
      scrollThreshold,
      isScrollingUp,
      scrollRatio,
      isAtBottom,
      reachedBottomWhileScrollingDown,
      hasEnoughScrollableSpace
    } = useScroll(props, {
      canScroll,
      layoutSize: appBarHeight
    });
    const canHide = toRef(() => scrollBehavior.value.hide || scrollBehavior.value.fullyHide);
    const isCollapsed = computed(() => props.collapse || scrollBehavior.value.collapse && (scrollBehavior.value.inverted ? scrollRatio.value > 0 : scrollRatio.value === 0));
    const isFlat = computed(() => props.flat || scrollBehavior.value.fullyHide && !isActive.value || scrollBehavior.value.elevate && (scrollBehavior.value.inverted ? currentScroll.value > 0 : currentScroll.value === 0));
    const opacity = computed(() => scrollBehavior.value.fadeImage ? scrollBehavior.value.inverted ? 1 - scrollRatio.value : scrollRatio.value : void 0);
    const height = computed(() => {
      var _a, _b, _c, _d;
      if (scrollBehavior.value.hide && scrollBehavior.value.inverted) return 0;
      const height2 = (_b = (_a = vToolbarRef.value) == null ? void 0 : _a.contentHeight) != null ? _b : 0;
      const extensionHeight = (_d = (_c = vToolbarRef.value) == null ? void 0 : _c.extensionHeight) != null ? _d : 0;
      if (!canHide.value) return height2 + extensionHeight;
      return currentScroll.value < scrollThreshold.value || scrollBehavior.value.fullyHide ? height2 + extensionHeight : height2;
    });
    useToggleScope(() => !!props.scrollBehavior, () => {
      watchEffect(() => {
        if (!canHide.value) {
          isActive.value = true;
          return;
        }
        if (scrollBehavior.value.inverted) {
          isActive.value = currentScroll.value > scrollThreshold.value;
          return;
        }
        if (!hasEnoughScrollableSpace.value) {
          isActive.value = true;
          return;
        }
        if (reachedBottomWhileScrollingDown.value) {
          isActive.value = false;
          return;
        }
        isActive.value = isScrollingUp.value && !isAtBottom.value || currentScroll.value < scrollThreshold.value;
      });
    });
    const {
      ssrBootStyles
    } = useSsrBoot();
    const {
      layoutItemStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: toRef(() => props.location),
      layoutSize: height,
      elementSize: shallowRef(void 0),
      active: isActive,
      absolute: toRef(() => props.absolute)
    });
    useRender(() => {
      const toolbarProps = omit(VToolbar.filterProps(props), ["location"]);
      return createVNode(VToolbar, mergeProps({
        "ref": vToolbarRef,
        "class": ["v-app-bar", {
          "v-app-bar--bottom": props.location === "bottom"
        }, props.class],
        "style": [{
          ...layoutItemStyles.value,
          "--v-toolbar-image-opacity": opacity.value,
          height: void 0,
          ...ssrBootStyles.value
        }, props.style]
      }, toolbarProps, {
        "collapse": isCollapsed.value,
        "flat": isFlat.value
      }), slots);
    });
    return {};
  }
});
const makeVBadgeProps = propsFactory({
  bordered: Boolean,
  color: String,
  content: [Number, String],
  dot: Boolean,
  floating: Boolean,
  icon: IconValue,
  inline: Boolean,
  label: {
    type: String,
    default: "$vuetify.badge"
  },
  max: [Number, String],
  modelValue: {
    type: Boolean,
    default: true
  },
  offsetX: [Number, String],
  offsetY: [Number, String],
  textColor: String,
  ...makeComponentProps(),
  ...makeLocationProps({
    location: "top end"
  }),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeTransitionProps({
    transition: "scale-rotate-transition"
  }),
  ...makeDimensionProps()
}, "VBadge");
const VBadge = genericComponent()({
  name: "VBadge",
  inheritAttrs: false,
  props: makeVBadgeProps(),
  setup(props, ctx) {
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      t
    } = useLocale();
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => props.textColor);
    const {
      themeClasses
    } = useTheme();
    const {
      locationStyles
    } = useLocation(props, true, (side) => {
      var _a, _b;
      const base = props.floating ? props.dot ? 2 : 4 : props.dot ? 8 : 12;
      return base + (["top", "bottom"].includes(side) ? Number((_a = props.offsetY) != null ? _a : 0) : ["left", "right"].includes(side) ? Number((_b = props.offsetX) != null ? _b : 0) : 0);
    });
    const {
      dimensionStyles
    } = useDimension(props);
    useRender(() => {
      const value = Number(props.content);
      const content = !props.max || isNaN(value) ? props.content : value <= Number(props.max) ? value : `${props.max}+`;
      const [badgeAttrs, attrs] = pickWithRest(ctx.attrs, ["aria-atomic", "aria-label", "aria-live", "role", "title"]);
      return createVNode(props.tag, mergeProps({
        "class": ["v-badge", {
          "v-badge--bordered": props.bordered,
          "v-badge--dot": props.dot,
          "v-badge--floating": props.floating,
          "v-badge--inline": props.inline
        }, props.class]
      }, attrs, {
        "style": props.style
      }), {
        default: () => {
          var _a, _b;
          return [createElementVNode("div", {
            "class": "v-badge__wrapper"
          }, [(_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a), createVNode(MaybeTransition, {
            "transition": props.transition
          }, {
            default: () => {
              var _a2, _b2;
              return [withDirectives(createElementVNode("span", mergeProps({
                "class": ["v-badge__badge", themeClasses.value, backgroundColorClasses.value, roundedClasses.value, textColorClasses.value],
                "style": [backgroundColorStyles.value, textColorStyles.value, dimensionStyles.value, props.inline ? {} : locationStyles.value],
                "aria-atomic": "true",
                "aria-label": t(props.label, value),
                "aria-live": "polite",
                "role": "status"
              }, badgeAttrs), [props.dot ? void 0 : ctx.slots.badge ? (_b2 = (_a2 = ctx.slots).badge) == null ? void 0 : _b2.call(_a2) : props.icon ? createVNode(VIcon, {
                "icon": props.icon
              }, null) : content]), [[vShow, props.modelValue]])];
            }
          })])];
        }
      });
    });
    return {};
  }
});
const makeVFooterProps = propsFactory({
  app: Boolean,
  color: String,
  height: {
    type: [Number, String],
    default: "auto"
  },
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeElevationProps(),
  ...makeLayoutItemProps(),
  ...makeRoundedProps(),
  ...makeTagProps({
    tag: "footer"
  }),
  ...makeThemeProps()
}, "VFooter");
const VFooter = genericComponent()({
  name: "VFooter",
  props: makeVFooterProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const layoutItemStyles = ref();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      borderClasses
    } = useBorder(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const autoHeight = shallowRef(32);
    const {
      resizeRef
    } = useResizeObserver();
    const height = computed(() => props.height === "auto" ? autoHeight.value : parseInt(props.height, 10));
    useToggleScope(() => props.app, () => {
      const layout = useLayoutItem({
        id: props.name,
        order: computed(() => parseInt(props.order, 10)),
        position: toRef(() => "bottom"),
        layoutSize: height,
        elementSize: computed(() => props.height === "auto" ? void 0 : height.value),
        active: toRef(() => props.app),
        absolute: toRef(() => props.absolute)
      });
      watchEffect(() => {
        layoutItemStyles.value = layout.layoutItemStyles.value;
      });
    });
    useRender(() => createVNode(props.tag, {
      "ref": resizeRef,
      "class": normalizeClass(["v-footer", themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value, props.class]),
      "style": normalizeStyle([backgroundColorStyles.value, props.app ? layoutItemStyles.value : {
        height: convertToUnit(props.height)
      }, props.style])
    }, slots));
    return {};
  }
});
const ListKey = /* @__PURE__ */ Symbol.for("vuetify:list");
function createList() {
  let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
    filterable: false
  };
  const parent = inject(ListKey, {
    filterable: false,
    hasPrepend: shallowRef(false),
    updateHasPrepend: () => null,
    trackingIndex: shallowRef(-1),
    navigationStrategy: shallowRef("focus"),
    uid: ""
  });
  const {
    filterable,
    trackingIndex = parent.trackingIndex,
    navigationStrategy = parent.navigationStrategy,
    uid = parent.uid || useId()
  } = options;
  const data = {
    filterable: parent.filterable || filterable,
    hasPrepend: shallowRef(false),
    updateHasPrepend: (value) => {
      if (value) data.hasPrepend.value = value;
    },
    trackingIndex,
    navigationStrategy,
    uid
  };
  provide(ListKey, data);
  return parent;
}
function useList() {
  return inject(ListKey, null);
}
const independentActiveStrategy = (mandatory) => {
  const strategy = {
    activate: (_ref) => {
      let {
        id,
        value,
        activated
      } = _ref;
      id = toRaw(id);
      if (mandatory && !value && activated.size === 1 && activated.has(id)) return activated;
      if (value) {
        activated.add(id);
      } else {
        activated.delete(id);
      }
      return activated;
    },
    in: (v, children, parents) => {
      let set = /* @__PURE__ */ new Set();
      if (v != null) {
        for (const id of wrapInArray(v)) {
          set = strategy.activate({
            id,
            value: true,
            activated: new Set(set),
            children,
            parents
          });
        }
      }
      return set;
    },
    out: (v) => {
      return Array.from(v);
    }
  };
  return strategy;
};
const independentSingleActiveStrategy = (mandatory) => {
  const parentStrategy = independentActiveStrategy(mandatory);
  const strategy = {
    activate: (_ref2) => {
      let {
        activated,
        id,
        ...rest
      } = _ref2;
      id = toRaw(id);
      const singleSelected = activated.has(id) ? /* @__PURE__ */ new Set([id]) : /* @__PURE__ */ new Set();
      return parentStrategy.activate({
        ...rest,
        id,
        activated: singleSelected
      });
    },
    in: (v, children, parents) => {
      let set = /* @__PURE__ */ new Set();
      if (v != null) {
        const arr = wrapInArray(v);
        if (arr.length) {
          set = parentStrategy.in(arr.slice(0, 1), children, parents);
        }
      }
      return set;
    },
    out: (v, children, parents) => {
      return parentStrategy.out(v, children, parents);
    }
  };
  return strategy;
};
const leafActiveStrategy = (mandatory) => {
  const parentStrategy = independentActiveStrategy(mandatory);
  const strategy = {
    activate: (_ref3) => {
      let {
        id,
        activated,
        children,
        ...rest
      } = _ref3;
      id = toRaw(id);
      if (children.has(id)) return activated;
      return parentStrategy.activate({
        id,
        activated,
        children,
        ...rest
      });
    },
    in: parentStrategy.in,
    out: parentStrategy.out
  };
  return strategy;
};
const leafSingleActiveStrategy = (mandatory) => {
  const parentStrategy = independentSingleActiveStrategy(mandatory);
  const strategy = {
    activate: (_ref4) => {
      let {
        id,
        activated,
        children,
        ...rest
      } = _ref4;
      id = toRaw(id);
      if (children.has(id)) return activated;
      return parentStrategy.activate({
        id,
        activated,
        children,
        ...rest
      });
    },
    in: parentStrategy.in,
    out: parentStrategy.out
  };
  return strategy;
};
const singleOpenStrategy = {
  open: (_ref) => {
    let {
      id,
      value,
      opened,
      parents
    } = _ref;
    if (value) {
      const newOpened = /* @__PURE__ */ new Set();
      newOpened.add(id);
      let parent = parents.get(id);
      while (parent != null) {
        newOpened.add(parent);
        parent = parents.get(parent);
      }
      return newOpened;
    } else {
      opened.delete(id);
      return opened;
    }
  },
  select: () => null
};
const multipleOpenStrategy = {
  open: (_ref2) => {
    let {
      id,
      value,
      opened,
      parents
    } = _ref2;
    if (value) {
      let parent = parents.get(id);
      opened.add(id);
      while (parent != null && parent !== id) {
        opened.add(parent);
        parent = parents.get(parent);
      }
      return opened;
    } else {
      opened.delete(id);
    }
    return opened;
  },
  select: () => null
};
const listOpenStrategy = {
  open: multipleOpenStrategy.open,
  select: (_ref3) => {
    let {
      id,
      value,
      opened,
      parents
    } = _ref3;
    if (!value) return opened;
    const path = [];
    let parent = parents.get(id);
    while (parent != null) {
      path.push(parent);
      parent = parents.get(parent);
    }
    return new Set(path);
  }
};
const independentSelectStrategy = (mandatory) => {
  const strategy = {
    select: (_ref) => {
      let {
        id,
        value,
        selected
      } = _ref;
      id = toRaw(id);
      if (mandatory && !value) {
        const on = Array.from(selected.entries()).reduce((arr, _ref2) => {
          let [key, value2] = _ref2;
          if (value2 === "on") arr.push(key);
          return arr;
        }, []);
        if (on.length === 1 && on[0] === id) return selected;
      }
      selected.set(id, value ? "on" : "off");
      return selected;
    },
    in: (v, children, parents, disabled) => {
      const map = /* @__PURE__ */ new Map();
      for (const id of v || []) {
        strategy.select({
          id,
          value: true,
          selected: map,
          children,
          parents,
          disabled
        });
      }
      return map;
    },
    out: (v) => {
      const arr = [];
      for (const [key, value] of v.entries()) {
        if (value === "on") arr.push(key);
      }
      return arr;
    }
  };
  return strategy;
};
const independentSingleSelectStrategy = (mandatory) => {
  const parentStrategy = independentSelectStrategy(mandatory);
  const strategy = {
    select: (_ref3) => {
      let {
        selected,
        id,
        ...rest
      } = _ref3;
      id = toRaw(id);
      const singleSelected = selected.has(id) ? /* @__PURE__ */ new Map([[id, selected.get(id)]]) : /* @__PURE__ */ new Map();
      return parentStrategy.select({
        ...rest,
        id,
        selected: singleSelected
      });
    },
    in: (v, children, parents, disabled) => {
      if (v == null ? void 0 : v.length) {
        return parentStrategy.in(v.slice(0, 1), children, parents, disabled);
      }
      return /* @__PURE__ */ new Map();
    },
    out: (v, children, parents) => {
      return parentStrategy.out(v, children, parents);
    }
  };
  return strategy;
};
const leafSelectStrategy = (mandatory) => {
  const parentStrategy = independentSelectStrategy(mandatory);
  const strategy = {
    select: (_ref4) => {
      let {
        id,
        selected,
        children,
        ...rest
      } = _ref4;
      id = toRaw(id);
      if (children.has(id)) return selected;
      return parentStrategy.select({
        id,
        selected,
        children,
        ...rest
      });
    },
    in: parentStrategy.in,
    out: parentStrategy.out
  };
  return strategy;
};
const leafSingleSelectStrategy = (mandatory) => {
  const parentStrategy = independentSingleSelectStrategy(mandatory);
  const strategy = {
    select: (_ref5) => {
      let {
        id,
        selected,
        children,
        ...rest
      } = _ref5;
      id = toRaw(id);
      if (children.has(id)) return selected;
      return parentStrategy.select({
        id,
        selected,
        children,
        ...rest
      });
    },
    in: parentStrategy.in,
    out: parentStrategy.out
  };
  return strategy;
};
const classicSelectStrategy = (mandatory) => {
  const strategy = {
    select: (_ref6) => {
      let {
        id,
        value,
        selected,
        children,
        parents,
        disabled
      } = _ref6;
      id = toRaw(id);
      const original = new Map(selected);
      const items = [id];
      while (items.length) {
        const item = items.shift();
        if (!disabled.has(item)) {
          selected.set(toRaw(item), value ? "on" : "off");
        }
        if (children.has(item)) {
          items.push(...children.get(item));
        }
      }
      let parent = toRaw(parents.get(id));
      while (parent) {
        let everySelected = true;
        let noneSelected = true;
        for (const child of children.get(parent)) {
          const cid = toRaw(child);
          if (disabled.has(cid)) continue;
          if (selected.get(cid) !== "on") everySelected = false;
          if (selected.has(cid) && selected.get(cid) !== "off") noneSelected = false;
          if (!everySelected && !noneSelected) break;
        }
        selected.set(parent, everySelected ? "on" : noneSelected ? "off" : "indeterminate");
        parent = toRaw(parents.get(parent));
      }
      if (mandatory && !value) {
        const on = Array.from(selected.entries()).reduce((arr, _ref7) => {
          let [key, value2] = _ref7;
          if (value2 === "on") arr.push(key);
          return arr;
        }, []);
        if (on.length === 0) return original;
      }
      return selected;
    },
    in: (v, children, parents) => {
      let map = /* @__PURE__ */ new Map();
      for (const id of v || []) {
        map = strategy.select({
          id,
          value: true,
          selected: map,
          children,
          parents,
          disabled: /* @__PURE__ */ new Set()
        });
      }
      return map;
    },
    out: (v, children) => {
      const arr = [];
      for (const [key, value] of v.entries()) {
        if (value === "on" && !children.has(key)) arr.push(key);
      }
      return arr;
    }
  };
  return strategy;
};
const trunkSelectStrategy = (mandatory) => {
  const parentStrategy = classicSelectStrategy(mandatory);
  const strategy = {
    select: parentStrategy.select,
    in: parentStrategy.in,
    out: (v, children, parents) => {
      const arr = [];
      for (const [key, value] of v.entries()) {
        if (value === "on") {
          if (parents.has(key)) {
            const parent = parents.get(key);
            if (v.get(parent) === "on") continue;
          }
          arr.push(key);
        }
      }
      return arr;
    }
  };
  return strategy;
};
const branchSelectStrategy = (mandatory) => {
  const parentStrategy = classicSelectStrategy(mandatory);
  const strategy = {
    select: parentStrategy.select,
    in: (v, children, parents, disabled) => {
      let map = /* @__PURE__ */ new Map();
      for (const id of v || []) {
        if (children.has(id)) continue;
        map = strategy.select({
          id,
          value: true,
          selected: map,
          children,
          parents,
          disabled
        });
      }
      return map;
    },
    out: (v) => {
      const arr = [];
      for (const [key, value] of v.entries()) {
        if (value === "on" || value === "indeterminate") {
          arr.push(key);
        }
      }
      return arr;
    }
  };
  return strategy;
};
const VNestedSymbol = /* @__PURE__ */ Symbol.for("vuetify:nested");
const emptyNested = {
  id: shallowRef(),
  root: {
    itemsRegistration: ref("render"),
    register: () => null,
    unregister: () => null,
    updateDisabled: () => null,
    children: ref(/* @__PURE__ */ new Map()),
    parents: ref(/* @__PURE__ */ new Map()),
    disabled: ref(/* @__PURE__ */ new Set()),
    open: () => null,
    openOnSelect: () => null,
    activate: () => null,
    select: () => null,
    activatable: ref(false),
    scrollToActive: ref(false),
    selectable: ref(false),
    opened: ref(/* @__PURE__ */ new Set()),
    activated: ref(/* @__PURE__ */ new Set()),
    selected: ref(/* @__PURE__ */ new Map()),
    selectedValues: ref([]),
    getPath: () => []
  }
};
const makeNestedProps = propsFactory({
  activatable: Boolean,
  selectable: Boolean,
  activeStrategy: [String, Function, Object],
  selectStrategy: [String, Function, Object],
  openStrategy: [String, Object],
  opened: null,
  activated: null,
  selected: null,
  mandatory: Boolean,
  itemsRegistration: {
    type: String,
    default: "render"
  }
}, "nested");
const useNested = (props, _ref) => {
  let {
    items,
    returnObject,
    scrollToActive
  } = _ref;
  const children = shallowRef(/* @__PURE__ */ new Map());
  const parents = shallowRef(/* @__PURE__ */ new Map());
  const disabled = shallowRef(/* @__PURE__ */ new Set());
  const opened = useProxiedModel(props, "opened", props.opened, (v) => new Set(Array.isArray(v) ? v.map((i) => toRaw(i)) : v), (v) => [...v.values()]);
  const activeStrategy = computed(() => {
    if (typeof props.activeStrategy === "object") return props.activeStrategy;
    if (typeof props.activeStrategy === "function") return props.activeStrategy(props.mandatory);
    switch (props.activeStrategy) {
      case "leaf":
        return leafActiveStrategy(props.mandatory);
      case "single-leaf":
        return leafSingleActiveStrategy(props.mandatory);
      case "independent":
        return independentActiveStrategy(props.mandatory);
      case "single-independent":
      default:
        return independentSingleActiveStrategy(props.mandatory);
    }
  });
  const selectStrategy = computed(() => {
    if (typeof props.selectStrategy === "object") return props.selectStrategy;
    if (typeof props.selectStrategy === "function") return props.selectStrategy(props.mandatory);
    switch (props.selectStrategy) {
      case "single-leaf":
        return leafSingleSelectStrategy(props.mandatory);
      case "leaf":
        return leafSelectStrategy(props.mandatory);
      case "independent":
        return independentSelectStrategy(props.mandatory);
      case "single-independent":
        return independentSingleSelectStrategy(props.mandatory);
      case "trunk":
        return trunkSelectStrategy(props.mandatory);
      case "branch":
        return branchSelectStrategy(props.mandatory);
      case "classic":
      default:
        return classicSelectStrategy(props.mandatory);
    }
  });
  const openStrategy = computed(() => {
    if (typeof props.openStrategy === "object") return props.openStrategy;
    switch (props.openStrategy) {
      case "list":
        return listOpenStrategy;
      case "single":
        return singleOpenStrategy;
      case "multiple":
      default:
        return multipleOpenStrategy;
    }
  });
  const activated = useProxiedModel(props, "activated", props.activated, (v) => activeStrategy.value.in(v, children.value, parents.value), (v) => activeStrategy.value.out(v, children.value, parents.value));
  const selected = useProxiedModel(props, "selected", props.selected, (v) => selectStrategy.value.in(v, children.value, parents.value, disabled.value), (v) => selectStrategy.value.out(v, children.value, parents.value));
  function getPath(id) {
    const path = [];
    let parent = toRaw(id);
    while (parent !== void 0) {
      path.unshift(parent);
      parent = parents.value.get(parent);
    }
    return path;
  }
  const vm = getCurrentInstance("nested");
  const nodeIds = /* @__PURE__ */ new Set();
  const itemsUpdatePropagation = throttle(() => {
    nextTick(() => {
      children.value = new Map(children.value);
      parents.value = new Map(parents.value);
    });
  }, 100);
  watch(() => [items.value, toValue(returnObject)], () => {
    if (props.itemsRegistration === "props") {
      updateInternalMaps();
    }
  }, {
    immediate: true
  });
  function updateInternalMaps() {
    const _parents = /* @__PURE__ */ new Map();
    const _children = /* @__PURE__ */ new Map();
    const _disabled = /* @__PURE__ */ new Set();
    const getValue = toValue(returnObject) ? (item) => toRaw(item.raw) : (item) => item.value;
    const stack = [...items.value];
    let i = 0;
    while (i < stack.length) {
      const item = stack[i++];
      const itemValue = getValue(item);
      if (item.children) {
        const childValues = [];
        for (const child of item.children) {
          const childValue = getValue(child);
          _parents.set(childValue, itemValue);
          childValues.push(childValue);
          stack.push(child);
        }
        _children.set(itemValue, childValues);
      }
      if (item.props.disabled) {
        _disabled.add(itemValue);
      }
    }
    children.value = _children;
    parents.value = _parents;
    disabled.value = _disabled;
  }
  const nested = {
    id: shallowRef(),
    root: {
      opened,
      activatable: toRef(() => props.activatable),
      scrollToActive: toRef(() => toValue(scrollToActive)),
      selectable: toRef(() => props.selectable),
      activated,
      selected,
      selectedValues: computed(() => {
        const arr = [];
        for (const [key, value] of selected.value.entries()) {
          if (value === "on") arr.push(key);
        }
        return arr;
      }),
      itemsRegistration: toRef(() => props.itemsRegistration),
      register: (id, parentId, isDisabled, isGroup) => {
        if (nodeIds.has(id)) {
          const path = getPath(id).map(String).join(" -> ");
          const newPath = getPath(parentId).concat(id).map(String).join(" -> ");
          consoleError(`Multiple nodes with the same ID
	${path}
	${newPath}`);
          return;
        } else {
          nodeIds.add(id);
        }
        parentId && id !== parentId && parents.value.set(id, parentId);
        isDisabled && disabled.value.add(id);
        isGroup && children.value.set(id, []);
        if (parentId != null) {
          children.value.set(parentId, [...children.value.get(parentId) || [], id]);
        }
        itemsUpdatePropagation();
      },
      unregister: (id) => {
        var _a;
        nodeIds.delete(id);
        children.value.delete(id);
        disabled.value.delete(id);
        const parent = parents.value.get(id);
        if (parent) {
          const list = (_a = children.value.get(parent)) != null ? _a : [];
          children.value.set(parent, list.filter((child) => child !== id));
        }
        parents.value.delete(id);
        itemsUpdatePropagation();
      },
      updateDisabled: (id, isDisabled) => {
        if (isDisabled) {
          disabled.value.add(id);
        } else {
          disabled.value.delete(id);
        }
      },
      open: (id, value, event) => {
        vm.emit("click:open", {
          id,
          value,
          path: getPath(id),
          event
        });
        const newOpened = openStrategy.value.open({
          id,
          value,
          opened: new Set(opened.value),
          children: children.value,
          parents: parents.value,
          event
        });
        newOpened && (opened.value = newOpened);
      },
      openOnSelect: (id, value, event) => {
        const newOpened = openStrategy.value.select({
          id,
          value,
          selected: new Map(selected.value),
          opened: new Set(opened.value),
          children: children.value,
          parents: parents.value,
          event
        });
        newOpened && (opened.value = newOpened);
      },
      select: (id, value, event) => {
        vm.emit("click:select", {
          id,
          value,
          path: getPath(id),
          event
        });
        const newSelected = selectStrategy.value.select({
          id,
          value,
          selected: new Map(selected.value),
          children: children.value,
          parents: parents.value,
          disabled: disabled.value,
          event
        });
        newSelected && (selected.value = newSelected);
        nested.root.openOnSelect(id, value, event);
      },
      activate: (id, value, event) => {
        if (!props.activatable) {
          return nested.root.select(id, true, event);
        }
        vm.emit("click:activate", {
          id,
          value,
          path: getPath(id),
          event
        });
        const newActivated = activeStrategy.value.activate({
          id,
          value,
          activated: new Set(activated.value),
          children: children.value,
          parents: parents.value,
          event
        });
        if (newActivated.size !== activated.value.size) {
          activated.value = newActivated;
        } else {
          for (const value2 of newActivated) {
            if (!activated.value.has(value2)) {
              activated.value = newActivated;
              return;
            }
          }
          for (const value2 of activated.value) {
            if (!newActivated.has(value2)) {
              activated.value = newActivated;
              return;
            }
          }
        }
      },
      children,
      parents,
      disabled,
      getPath
    }
  };
  provide(VNestedSymbol, nested);
  return nested.root;
};
const useNestedItem = (id, isDisabled, isGroup) => {
  const parent = inject(VNestedSymbol, emptyNested);
  const uidSymbol = /* @__PURE__ */ Symbol("nested item");
  const computedId = computed(() => {
    const idValue = toRaw(toValue(id));
    return idValue !== void 0 ? idValue : uidSymbol;
  });
  const item = {
    ...parent,
    id: computedId,
    open: (open, e) => parent.root.open(computedId.value, open, e),
    openOnSelect: (open, e) => parent.root.openOnSelect(computedId.value, open, e),
    isOpen: computed(() => parent.root.opened.value.has(computedId.value)),
    parent: computed(() => parent.root.parents.value.get(computedId.value)),
    activate: (activated, e) => parent.root.activate(computedId.value, activated, e),
    isActivated: computed(() => parent.root.activated.value.has(computedId.value)),
    scrollToActive: parent.root.scrollToActive,
    select: (selected, e) => parent.root.select(computedId.value, selected, e),
    isSelected: computed(() => parent.root.selected.value.get(computedId.value) === "on"),
    isIndeterminate: computed(() => parent.root.selected.value.get(computedId.value) === "indeterminate"),
    isLeaf: computed(() => !parent.root.children.value.get(computedId.value)),
    isGroupActivator: parent.isGroupActivator
  };
  watch(computedId, (val, oldVal) => {
    if (parent.isGroupActivator || parent.root.itemsRegistration.value === "props") return;
    parent.root.unregister(oldVal);
    nextTick(() => {
      parent.root.register(val, parent.id.value, toValue(isDisabled), isGroup);
    });
  });
  watch(() => toValue(isDisabled), (val) => {
    parent.root.updateDisabled(computedId.value, val);
  });
  isGroup && provide(VNestedSymbol, item);
  return item;
};
const useNestedGroupActivator = () => {
  const parent = inject(VNestedSymbol, emptyNested);
  provide(VNestedSymbol, {
    ...parent,
    isGroupActivator: true
  });
};
const VListGroupActivator = defineComponent$1({
  name: "VListGroupActivator",
  setup(_, _ref) {
    let {
      slots
    } = _ref;
    useNestedGroupActivator();
    return () => {
      var _a;
      return (_a = slots.default) == null ? void 0 : _a.call(slots);
    };
  }
});
const makeVListGroupProps = propsFactory({
  /* @deprecated */
  activeColor: String,
  baseColor: String,
  color: String,
  collapseIcon: {
    type: IconValue,
    default: "$collapse"
  },
  disabled: Boolean,
  expandIcon: {
    type: IconValue,
    default: "$expand"
  },
  rawId: [String, Number],
  prependIcon: IconValue,
  appendIcon: IconValue,
  fluid: Boolean,
  subgroup: Boolean,
  title: String,
  value: null,
  ...makeComponentProps(),
  ...makeTagProps()
}, "VListGroup");
const VListGroup = genericComponent()({
  name: "VListGroup",
  props: makeVListGroupProps(),
  setup(props, _ref2) {
    let {
      slots
    } = _ref2;
    const {
      isOpen,
      open,
      id: _id
    } = useNestedItem(() => props.value, () => props.disabled, true);
    const id = computed(() => {
      var _a;
      return `v-list-group--id-${String((_a = props.rawId) != null ? _a : _id.value)}`;
    });
    const list = useList();
    const {
      isBooted
    } = useSsrBoot();
    const parent = inject(VNestedSymbol);
    const renderWhenClosed = toRef(() => {
      var _a;
      return ((_a = parent == null ? void 0 : parent.root) == null ? void 0 : _a.itemsRegistration.value) === "render";
    });
    function onClick(e) {
      var _a;
      if (["INPUT", "TEXTAREA"].includes((_a = e.target) == null ? void 0 : _a.tagName)) return;
      open(!isOpen.value, e);
    }
    const activatorProps = computed(() => ({
      onClick,
      class: "v-list-group__header",
      id: id.value
    }));
    const toggleIcon = computed(() => isOpen.value ? props.collapseIcon : props.expandIcon);
    const activatorDefaults = computed(() => ({
      VListItem: {
        activeColor: props.activeColor,
        baseColor: props.baseColor,
        color: props.color,
        prependIcon: props.prependIcon || props.subgroup && toggleIcon.value,
        appendIcon: props.appendIcon || !props.subgroup && toggleIcon.value,
        title: props.title,
        value: props.value
      }
    }));
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(["v-list-group", {
        "v-list-group--prepend": list == null ? void 0 : list.hasPrepend.value,
        "v-list-group--fluid": props.fluid,
        "v-list-group--subgroup": props.subgroup,
        "v-list-group--open": isOpen.value
      }, props.class]),
      "style": normalizeStyle(props.style)
    }, {
      default: () => [slots.activator && createVNode(VDefaultsProvider, {
        "defaults": activatorDefaults.value
      }, {
        default: () => [createVNode(VListGroupActivator, null, {
          default: () => [slots.activator({
            props: activatorProps.value,
            isOpen: isOpen.value
          })]
        })]
      }), createVNode(MaybeTransition, {
        "transition": {
          component: VExpandTransition
        },
        "disabled": !isBooted.value
      }, {
        default: () => {
          var _a, _b;
          return [renderWhenClosed.value ? withDirectives(createElementVNode("div", {
            "class": "v-list-group__items",
            "role": "group",
            "aria-labelledby": id.value
          }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]), [[vShow, isOpen.value]]) : isOpen.value && createElementVNode("div", {
            "class": "v-list-group__items",
            "role": "group",
            "aria-labelledby": id.value
          }, [(_b = slots.default) == null ? void 0 : _b.call(slots)])];
        }
      })]
    }));
    return {
      isOpen
    };
  }
});
const makeVListItemSubtitleProps = propsFactory({
  opacity: [Number, String],
  ...makeComponentProps(),
  ...makeTagProps()
}, "VListItemSubtitle");
const VListItemSubtitle = genericComponent()({
  name: "VListItemSubtitle",
  props: makeVListItemSubtitleProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(["v-list-item-subtitle", props.class]),
      "style": normalizeStyle([{
        "--v-list-item-subtitle-opacity": props.opacity
      }, props.style])
    }, slots));
    return {};
  }
});
const VListItemTitle = createSimpleFunctional("v-list-item-title");
const makeVListItemProps = propsFactory({
  active: {
    type: Boolean,
    default: void 0
  },
  activeClass: String,
  /* @deprecated */
  activeColor: String,
  appendAvatar: String,
  appendIcon: IconValue,
  baseColor: String,
  disabled: Boolean,
  lines: [Boolean, String],
  link: {
    type: Boolean,
    default: void 0
  },
  nav: Boolean,
  prependAvatar: String,
  prependIcon: IconValue,
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  slim: Boolean,
  prependGap: [Number, String],
  subtitle: {
    type: [String, Number, Boolean],
    default: void 0
  },
  title: {
    type: [String, Number, Boolean],
    default: void 0
  },
  value: null,
  index: Number,
  tabindex: [Number, String],
  onClick: EventProp(),
  onClickOnce: EventProp(),
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "text"
  })
}, "VListItem");
const VListItem = genericComponent()({
  name: "VListItem",
  directives: {
    vRipple: Ripple
  },
  props: makeVListItemProps(),
  emits: {
    click: (e) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots,
      emit
    } = _ref;
    const link = useLink(props, attrs);
    const rootEl = ref();
    const id = computed(() => props.value === void 0 ? link.href.value : props.value);
    const {
      activate,
      isActivated,
      select,
      isOpen,
      isSelected,
      isIndeterminate,
      isGroupActivator,
      root,
      parent,
      openOnSelect,
      scrollToActive,
      id: uid
    } = useNestedItem(id, () => props.disabled, false);
    const list = useList();
    const isActive = computed(() => {
      var _a;
      return props.active !== false && (props.active || ((_a = link.isActive) == null ? void 0 : _a.value) || (root.activatable.value ? isActivated.value : isSelected.value));
    });
    const isLink = toRef(() => props.link !== false && link.isLink.value);
    const isSelectable = computed(() => !!list && (root.selectable.value || root.activatable.value || props.value != null));
    const isClickable = computed(() => !props.disabled && props.link !== false && (props.link || link.isClickable.value || isSelectable.value));
    const isTracked = computed(() => list && list.navigationStrategy.value === "track" && props.index !== void 0 && list.trackingIndex.value === props.index);
    const role = computed(() => list ? isLink.value ? "link" : isSelectable.value ? "option" : "listitem" : void 0);
    const ariaSelected = computed(() => {
      if (!isSelectable.value) return void 0;
      return root.activatable.value ? isActivated.value : root.selectable.value ? isSelected.value : isActive.value;
    });
    const roundedProps = toRef(() => props.rounded || props.nav);
    const color = toRef(() => {
      var _a;
      return (_a = props.color) != null ? _a : props.activeColor;
    });
    const variantProps = toRef(() => {
      var _a;
      return {
        color: isActive.value ? (_a = color.value) != null ? _a : props.baseColor : props.baseColor,
        variant: props.variant
      };
    });
    watch(() => {
      var _a;
      return (_a = link.isActive) == null ? void 0 : _a.value;
    }, (val) => {
      if (!val) return;
      handleActiveLink();
    });
    watch(isActivated, (val) => {
      var _a;
      if (!val || !scrollToActive) return;
      (_a = rootEl.value) == null ? void 0 : _a.scrollIntoView({
        block: "nearest",
        behavior: "instant"
      });
    });
    watch(isTracked, (val) => {
      var _a;
      if (!val) return;
      (_a = rootEl.value) == null ? void 0 : _a.scrollIntoView({
        block: "nearest",
        behavior: "instant"
      });
    });
    function handleActiveLink() {
      if (parent.value != null) {
        root.open(parent.value, true);
      }
      openOnSelect(true);
    }
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(variantProps);
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(roundedProps);
    const lineClasses = toRef(() => props.lines ? `v-list-item--${props.lines}-line` : void 0);
    const rippleOptions = toRef(() => props.ripple !== void 0 && !!props.ripple && (list == null ? void 0 : list.filterable) ? {
      keys: ["Enter"]
    } : props.ripple);
    const slotProps = computed(() => ({
      isActive: isActive.value,
      select,
      isOpen: isOpen.value,
      isSelected: isSelected.value,
      isIndeterminate: isIndeterminate.value,
      isDisabled: props.disabled
    }));
    function onClick(e) {
      var _a, _b, _c;
      emit("click", e);
      if (["INPUT", "TEXTAREA"].includes((_a = e.target) == null ? void 0 : _a.tagName)) return;
      if (!isClickable.value) return;
      (_c = (_b = link.navigate).value) == null ? void 0 : _c.call(_b, e);
      if (isGroupActivator) return;
      if (root.activatable.value) {
        activate(!isActivated.value, e);
      } else if (root.selectable.value) {
        select(!isSelected.value, e);
      } else if (props.value != null && !isLink.value) {
        select(!isSelected.value, e);
      }
    }
    function onKeyDown(e) {
      const target = e.target;
      if (["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      if (e.key === "Enter" || e.key === " " && !(list == null ? void 0 : list.filterable)) {
        e.preventDefault();
        e.stopPropagation();
        e.target.dispatchEvent(new MouseEvent("click", e));
      }
    }
    useRender(() => {
      var _a;
      const Tag = isLink.value ? "a" : props.tag;
      const hasTitle = slots.title || props.title != null;
      const hasSubtitle = slots.subtitle || props.subtitle != null;
      const hasAppendMedia = !!(props.appendAvatar || props.appendIcon);
      const hasAppend = !!(hasAppendMedia || slots.append);
      const hasPrependMedia = !!(props.prependAvatar || props.prependIcon);
      const hasPrepend = !!(hasPrependMedia || slots.prepend);
      list == null ? void 0 : list.updateHasPrepend(hasPrepend);
      if (props.activeColor) {
        deprecate("active-color", ["color", "base-color"]);
      }
      return withDirectives(createVNode(Tag, mergeProps(link.linkProps, {
        "ref": rootEl,
        "id": props.index !== void 0 && list ? `v-list-item-${list.uid}-${props.index}` : void 0,
        "class": ["v-list-item", {
          "v-list-item--active": isActive.value,
          "v-list-item--disabled": props.disabled,
          "v-list-item--link": isClickable.value,
          "v-list-item--nav": props.nav,
          "v-list-item--prepend": !hasPrepend && (list == null ? void 0 : list.hasPrepend.value),
          "v-list-item--slim": props.slim,
          "v-list-item--focus-visible": isTracked.value,
          [`${props.activeClass}`]: props.activeClass && isActive.value
        }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, lineClasses.value, roundedClasses.value, variantClasses.value, props.class],
        "style": [{
          "--v-list-prepend-gap": convertToUnit(props.prependGap)
        }, colorStyles.value, dimensionStyles.value, props.style],
        "tabindex": (_a = props.tabindex) != null ? _a : isClickable.value ? list ? -2 : 0 : void 0,
        "aria-selected": ariaSelected.value,
        "role": role.value,
        "onClick": onClick,
        "onKeydown": isClickable.value && !isLink.value && onKeyDown
      }), {
        default: () => {
          var _a2;
          return [genOverlays(isClickable.value || isActive.value, "v-list-item"), hasPrepend && createElementVNode("div", {
            "key": "prepend",
            "class": "v-list-item__prepend"
          }, [!slots.prepend ? createElementVNode(Fragment, null, [props.prependAvatar && createVNode(VAvatar, {
            "key": "prepend-avatar",
            "density": props.density,
            "image": props.prependAvatar
          }, null), props.prependIcon && createVNode(VIcon, {
            "key": "prepend-icon",
            "density": props.density,
            "icon": props.prependIcon
          }, null)]) : createVNode(VDefaultsProvider, {
            "key": "prepend-defaults",
            "defaults": {
              VAvatar: {
                density: props.density,
                image: props.prependAvatar
              },
              VIcon: {
                density: props.density,
                icon: props.prependIcon
              },
              VListItemAction: {
                start: true
              },
              VCheckboxBtn: {
                density: props.density
              }
            }
          }, {
            default: () => {
              var _a3;
              return [(_a3 = slots.prepend) == null ? void 0 : _a3.call(slots, slotProps.value)];
            }
          }), createElementVNode("div", {
            "class": "v-list-item__spacer"
          }, null)]), createElementVNode("div", {
            "class": "v-list-item__content",
            "data-no-activator": ""
          }, [hasTitle && createVNode(VListItemTitle, {
            "key": "title"
          }, {
            default: () => {
              var _a3, _b;
              return [(_b = (_a3 = slots.title) == null ? void 0 : _a3.call(slots, {
                title: props.title
              })) != null ? _b : toDisplayString(props.title)];
            }
          }), hasSubtitle && createVNode(VListItemSubtitle, {
            "key": "subtitle"
          }, {
            default: () => {
              var _a3, _b;
              return [(_b = (_a3 = slots.subtitle) == null ? void 0 : _a3.call(slots, {
                subtitle: props.subtitle
              })) != null ? _b : toDisplayString(props.subtitle)];
            }
          }), (_a2 = slots.default) == null ? void 0 : _a2.call(slots, slotProps.value)]), hasAppend && createElementVNode("div", {
            "key": "append",
            "class": "v-list-item__append"
          }, [!slots.append ? createElementVNode(Fragment, null, [props.appendIcon && createVNode(VIcon, {
            "key": "append-icon",
            "density": props.density,
            "icon": props.appendIcon
          }, null), props.appendAvatar && createVNode(VAvatar, {
            "key": "append-avatar",
            "density": props.density,
            "image": props.appendAvatar
          }, null)]) : createVNode(VDefaultsProvider, {
            "key": "append-defaults",
            "defaults": {
              VAvatar: {
                density: props.density,
                image: props.appendAvatar
              },
              VIcon: {
                density: props.density,
                icon: props.appendIcon
              },
              VListItemAction: {
                end: true
              },
              VCheckboxBtn: {
                density: props.density
              }
            }
          }, {
            default: () => {
              var _a3;
              return [(_a3 = slots.append) == null ? void 0 : _a3.call(slots, slotProps.value)];
            }
          }), createElementVNode("div", {
            "class": "v-list-item__spacer"
          }, null)])];
        }
      }), [[Ripple, isClickable.value && rippleOptions.value]]);
    });
    return {
      activate,
      isActivated,
      isGroupActivator,
      isSelected,
      list,
      select,
      root,
      id: uid,
      link
    };
  }
});
const makeVListSubheaderProps = propsFactory({
  color: String,
  inset: Boolean,
  sticky: Boolean,
  title: String,
  ...makeComponentProps(),
  ...makeTagProps()
}, "VListSubheader");
const VListSubheader = genericComponent()({
  name: "VListSubheader",
  props: makeVListSubheaderProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => props.color);
    useRender(() => {
      const hasText = !!(slots.default || props.title);
      return createVNode(props.tag, {
        "class": normalizeClass(["v-list-subheader", {
          "v-list-subheader--inset": props.inset,
          "v-list-subheader--sticky": props.sticky
        }, textColorClasses.value, props.class]),
        "style": normalizeStyle([{
          textColorStyles
        }, props.style])
      }, {
        default: () => {
          var _a, _b;
          return [hasText && createElementVNode("div", {
            "class": "v-list-subheader__text"
          }, [(_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) != null ? _b : props.title])];
        }
      });
    });
    return {};
  }
});
const makeVListChildrenProps = propsFactory({
  items: Array,
  returnObject: Boolean
}, "VListChildren");
const VListChildren = genericComponent()({
  name: "VListChildren",
  props: makeVListChildrenProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    createList();
    return () => {
      var _a, _b, _c;
      return (_c = (_a = slots.default) == null ? void 0 : _a.call(slots)) != null ? _c : (_b = props.items) == null ? void 0 : _b.map((_ref2, index) => {
        var _a2, _b2, _c2, _d;
        let {
          children,
          props: itemProps,
          type,
          raw: item
        } = _ref2;
        if (type === "divider") {
          return (_b2 = (_a2 = slots.divider) == null ? void 0 : _a2.call(slots, {
            props: itemProps
          })) != null ? _b2 : createVNode(VDivider, itemProps, null);
        }
        if (type === "subheader") {
          return (_d = (_c2 = slots.subheader) == null ? void 0 : _c2.call(slots, {
            props: itemProps
          })) != null ? _d : createVNode(VListSubheader, itemProps, null);
        }
        const slotsWithItem = {
          subtitle: slots.subtitle ? (slotProps) => {
            var _a3;
            return (_a3 = slots.subtitle) == null ? void 0 : _a3.call(slots, {
              ...slotProps,
              item
            });
          } : void 0,
          prepend: slots.prepend ? (slotProps) => {
            var _a3;
            return (_a3 = slots.prepend) == null ? void 0 : _a3.call(slots, {
              ...slotProps,
              item
            });
          } : void 0,
          append: slots.append ? (slotProps) => {
            var _a3;
            return (_a3 = slots.append) == null ? void 0 : _a3.call(slots, {
              ...slotProps,
              item
            });
          } : void 0,
          title: slots.title ? (slotProps) => {
            var _a3;
            return (_a3 = slots.title) == null ? void 0 : _a3.call(slots, {
              ...slotProps,
              item
            });
          } : void 0
        };
        const listGroupProps = VListGroup.filterProps(itemProps);
        return children ? createVNode(VListGroup, mergeProps(listGroupProps, {
          "value": props.returnObject ? item : itemProps == null ? void 0 : itemProps.value,
          "rawId": itemProps == null ? void 0 : itemProps.value
        }), {
          activator: (_ref3) => {
            let {
              props: activatorProps
            } = _ref3;
            const listItemProps = mergeProps(itemProps, activatorProps, {
              value: props.returnObject ? item : itemProps.value
            });
            return slots.header ? slots.header({
              props: listItemProps
            }) : createVNode(VListItem, mergeProps(listItemProps, {
              "index": index
            }), slotsWithItem);
          },
          default: () => createVNode(VListChildren, {
            "items": children,
            "returnObject": props.returnObject
          }, slots)
        }) : slots.item ? slots.item({
          props: {
            ...itemProps,
            index
          }
        }) : createVNode(VListItem, mergeProps(itemProps, {
          "index": index,
          "value": props.returnObject ? item : itemProps.value
        }), slotsWithItem);
      });
    };
  }
});
const makeItemsProps = propsFactory({
  items: {
    type: Array,
    default: () => []
  },
  itemTitle: {
    type: [String, Array, Function],
    default: "title"
  },
  itemValue: {
    type: [String, Array, Function],
    default: "value"
  },
  itemChildren: {
    type: [Boolean, String, Array, Function],
    default: "children"
  },
  itemProps: {
    type: [Boolean, String, Array, Function],
    default: "props"
  },
  itemType: {
    type: [Boolean, String, Array, Function],
    default: "type"
  },
  returnObject: Boolean,
  valueComparator: Function
}, "list-items");
const itemTypes = /* @__PURE__ */ new Set(["item", "divider", "subheader"]);
function transformItem(props, item) {
  const title = isPrimitive(item) ? item : getPropertyFromItem(item, props.itemTitle);
  const value = isPrimitive(item) ? item : getPropertyFromItem(item, props.itemValue, void 0);
  const children = getPropertyFromItem(item, props.itemChildren);
  const itemProps = props.itemProps === true ? omit(item, ["children"]) : getPropertyFromItem(item, props.itemProps);
  let type = getPropertyFromItem(item, props.itemType, "item");
  if (!itemTypes.has(type)) {
    type = "item";
  }
  const _props = {
    title,
    value,
    ...itemProps
  };
  return {
    type,
    title: _props.title,
    value: _props.value,
    props: _props,
    children: type === "item" && children ? transformItems(props, children) : void 0,
    raw: item
  };
}
function transformItems(props, items) {
  const array = [];
  for (const item of items) {
    array.push(transformItem(props, item));
  }
  return array;
}
function useListItems(props) {
  const items = computed(() => transformItems(props, props.items));
  return {
    items
  };
}
const makeVListProps = propsFactory({
  baseColor: String,
  /* @deprecated */
  activeColor: String,
  activeClass: String,
  bgColor: String,
  disabled: Boolean,
  filterable: Boolean,
  expandIcon: IconValue,
  collapseIcon: IconValue,
  lines: {
    type: [Boolean, String],
    default: "one"
  },
  slim: Boolean,
  prependGap: [Number, String],
  indent: [Number, String],
  nav: Boolean,
  navigationStrategy: {
    type: String,
    default: "focus"
  },
  navigationIndex: Number,
  "onClick:open": EventProp(),
  "onClick:select": EventProp(),
  "onUpdate:opened": EventProp(),
  ...makeNestedProps({
    selectStrategy: "single-leaf",
    openStrategy: "list"
  }),
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeItemsProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "text"
  })
}, "VList");
const VList = genericComponent()({
  name: "VList",
  props: makeVListProps(),
  emits: {
    "update:selected": (value) => true,
    "update:activated": (value) => true,
    "update:opened": (value) => true,
    "update:navigationIndex": (value) => true,
    "click:open": (value) => true,
    "click:activate": (value) => true,
    "click:select": (value) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots,
      emit
    } = _ref;
    const {
      items
    } = useListItems(props);
    const {
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.bgColor);
    const {
      borderClasses
    } = useBorder(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      children,
      open,
      parents,
      select,
      getPath
    } = useNested(props, {
      items,
      returnObject: toRef(() => props.returnObject),
      scrollToActive: toRef(() => props.navigationStrategy === "track")
    });
    const lineClasses = toRef(() => props.lines ? `v-list--${props.lines}-line` : void 0);
    const activeColor = toRef(() => props.activeColor);
    const baseColor = toRef(() => props.baseColor);
    const color = toRef(() => props.color);
    const isSelectable = toRef(() => props.selectable || props.activatable);
    const navigationIndex = useProxiedModel(props, "navigationIndex", -1, (v) => v != null ? v : -1);
    const uid = useId();
    createList({
      filterable: props.filterable,
      trackingIndex: navigationIndex,
      navigationStrategy: toRef(() => props.navigationStrategy),
      uid
    });
    watch(items, () => {
      if (props.navigationStrategy === "track") {
        navigationIndex.value = -1;
      }
    });
    provideDefaults({
      VListGroup: {
        activeColor,
        baseColor,
        color,
        expandIcon: toRef(() => props.expandIcon),
        collapseIcon: toRef(() => props.collapseIcon)
      },
      VListItem: {
        activeClass: toRef(() => props.activeClass),
        activeColor,
        baseColor,
        color,
        density: toRef(() => props.density),
        disabled: toRef(() => props.disabled),
        lines: toRef(() => props.lines),
        nav: toRef(() => props.nav),
        slim: toRef(() => props.slim),
        variant: toRef(() => props.variant),
        tabindex: toRef(() => props.navigationStrategy === "track" ? -1 : void 0)
      }
    });
    const isFocused = shallowRef(false);
    const contentRef = ref();
    function onFocusin(e) {
      isFocused.value = true;
    }
    function onFocusout(e) {
      isFocused.value = false;
    }
    function onFocus(e) {
      var _a;
      if (props.navigationStrategy === "track") {
        if (!~navigationIndex.value) {
          navigationIndex.value = getNextIndex("first");
        }
      } else if (!isFocused.value && !(e.relatedTarget && ((_a = contentRef.value) == null ? void 0 : _a.contains(e.relatedTarget)))) focus();
    }
    function onBlur() {
      if (props.navigationStrategy === "track") {
        navigationIndex.value = -1;
      }
    }
    function getNavigationDirection(key) {
      switch (key) {
        case "ArrowDown":
          return "next";
        case "ArrowUp":
          return "prev";
        case "Home":
          return "first";
        case "End":
          return "last";
        default:
          return null;
      }
    }
    function getNextIndex(direction) {
      const itemCount = items.value.length;
      if (itemCount === 0) return -1;
      let nextIndex;
      if (direction === "first") {
        nextIndex = 0;
      } else if (direction === "last") {
        nextIndex = itemCount - 1;
      } else {
        nextIndex = navigationIndex.value + (direction === "next" ? 1 : -1);
        if (nextIndex < 0) nextIndex = itemCount - 1;
        if (nextIndex >= itemCount) nextIndex = 0;
      }
      const startIndex = nextIndex;
      let attempts = 0;
      while (attempts < itemCount) {
        const item = items.value[nextIndex];
        if (item && item.type !== "divider" && item.type !== "subheader") {
          return nextIndex;
        }
        nextIndex += direction === "next" || direction === "first" ? 1 : -1;
        if (nextIndex < 0) nextIndex = itemCount - 1;
        if (nextIndex >= itemCount) nextIndex = 0;
        if (nextIndex === startIndex) return -1;
        attempts++;
      }
      return -1;
    }
    function onKeydown(e) {
      const target = e.target;
      if (!contentRef.value || target.tagName === "INPUT" && ["Home", "End"].includes(e.key) || target.tagName === "TEXTAREA") {
        return;
      }
      const direction = getNavigationDirection(e.key);
      if (direction !== null) {
        e.preventDefault();
        if (props.navigationStrategy === "track") {
          const nextIndex = getNextIndex(direction);
          if (nextIndex !== -1) {
            navigationIndex.value = nextIndex;
          }
        } else {
          focus(direction);
        }
      }
    }
    function onMousedown(e) {
      isFocused.value = true;
    }
    function focus(location, options) {
      if (contentRef.value) {
        return focusChild(contentRef.value, location, options);
      }
    }
    useRender(() => {
      var _a, _b;
      const indent = (_a = props.indent) != null ? _a : props.prependGap ? Number(props.prependGap) + 24 : void 0;
      const ariaMultiselectable = isSelectable.value ? (_b = attrs.ariaMultiselectable) != null ? _b : !String(props.selectStrategy).startsWith("single-") : void 0;
      return createVNode(props.tag, {
        "ref": contentRef,
        "class": normalizeClass(["v-list", {
          "v-list--disabled": props.disabled,
          "v-list--nav": props.nav,
          "v-list--slim": props.slim
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, lineClasses.value, roundedClasses.value, props.class]),
        "style": normalizeStyle([{
          "--v-list-indent": convertToUnit(indent),
          "--v-list-group-prepend": indent ? "0px" : void 0,
          "--v-list-prepend-gap": convertToUnit(props.prependGap)
        }, backgroundColorStyles.value, dimensionStyles.value, props.style]),
        "tabindex": props.disabled ? -1 : 0,
        "role": isSelectable.value ? "listbox" : "list",
        "aria-activedescendant": props.navigationStrategy === "track" && navigationIndex.value >= 0 ? `v-list-item-${uid}-${navigationIndex.value}` : void 0,
        "aria-multiselectable": ariaMultiselectable,
        "onFocusin": onFocusin,
        "onFocusout": onFocusout,
        "onFocus": onFocus,
        "onBlur": onBlur,
        "onKeydown": onKeydown,
        "onMousedown": onMousedown
      }, {
        default: () => [createVNode(VListChildren, {
          "items": items.value,
          "returnObject": props.returnObject
        }, slots)]
      });
    });
    return {
      open,
      select,
      focus,
      children,
      parents,
      getPath,
      navigationIndex
    };
  }
});
const makeVMainProps = propsFactory({
  scrollable: Boolean,
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeTagProps({
    tag: "main"
  })
}, "VMain");
const VMain = genericComponent()({
  name: "VMain",
  props: makeVMainProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      mainStyles
    } = useLayout();
    const {
      ssrBootStyles
    } = useSsrBoot();
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(["v-main", {
        "v-main--scrollable": props.scrollable
      }, props.class]),
      "style": normalizeStyle([mainStyles.value, ssrBootStyles.value, dimensionStyles.value, props.style])
    }, {
      default: () => {
        var _a, _b;
        return [props.scrollable ? createElementVNode("div", {
          "class": "v-main__scroller"
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]) : (_b = slots.default) == null ? void 0 : _b.call(slots)];
      }
    }));
    return {};
  }
});
const makeVMenuProps = propsFactory({
  // TODO
  // disableKeys: Boolean,
  id: String,
  submenu: Boolean,
  ...omit(makeVOverlayProps({
    captureFocus: true,
    closeDelay: 250,
    closeOnContentClick: true,
    locationStrategy: "connected",
    location: void 0,
    openDelay: 300,
    scrim: false,
    scrollStrategy: "reposition",
    transition: {
      component: VDialogTransition
    }
  }), ["absolute"])
}, "VMenu");
const VMenu = genericComponent()({
  name: "VMenu",
  props: makeVMenuProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const isActive = useProxiedModel(props, "modelValue");
    const {
      scopeId
    } = useScopeId();
    const {
      isRtl
    } = useRtl();
    const uid = useId();
    const id = toRef(() => props.id || `v-menu-${uid}`);
    const overlay = ref();
    const parent = inject(VMenuSymbol, null);
    const openChildren = shallowRef(/* @__PURE__ */ new Set());
    provide(VMenuSymbol, {
      register() {
        openChildren.value.add(uid);
      },
      unregister() {
        openChildren.value.delete(uid);
      },
      closeParents(e) {
        setTimeout(() => {
          var _a;
          if (!openChildren.value.size && !props.persistent && (e == null || ((_a = overlay.value) == null ? void 0 : _a.contentEl) && !isClickInsideElement(e, overlay.value.contentEl))) {
            isActive.value = false;
            parent == null ? void 0 : parent.closeParents();
          }
        }, 40);
      }
    });
    watch(isActive, (val) => {
      val ? parent == null ? void 0 : parent.register() : parent == null ? void 0 : parent.unregister();
    }, {
      immediate: true
    });
    function onClickOutside(e) {
      parent == null ? void 0 : parent.closeParents(e);
    }
    function onKeydown(e) {
      var _a, _b, _c, _d, _e;
      if (props.disabled) return;
      if (e.key === "Tab" || e.key === "Enter" && !props.closeOnContentClick) {
        if (e.key === "Enter" && (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement && !!e.target.closest("form"))) return;
        if (e.key === "Enter") e.preventDefault();
        const nextElement = getNextElement(focusableChildren((_a = overlay.value) == null ? void 0 : _a.contentEl, false), e.shiftKey ? "prev" : "next", (el) => el.tabIndex >= 0);
        if (!nextElement && !props.retainFocus) {
          isActive.value = false;
          (_c = (_b = overlay.value) == null ? void 0 : _b.activatorEl) == null ? void 0 : _c.focus();
        }
      } else if (props.submenu && e.key === (isRtl.value ? "ArrowRight" : "ArrowLeft")) {
        isActive.value = false;
        (_e = (_d = overlay.value) == null ? void 0 : _d.activatorEl) == null ? void 0 : _e.focus();
      }
    }
    function onActivatorKeydown(e) {
      var _a;
      if (props.disabled) return;
      const el = (_a = overlay.value) == null ? void 0 : _a.contentEl;
      if (el && isActive.value) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          e.stopImmediatePropagation();
          focusChild(el, "next");
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          e.stopImmediatePropagation();
          focusChild(el, "prev");
        } else if (props.submenu) {
          if (e.key === (isRtl.value ? "ArrowRight" : "ArrowLeft")) {
            isActive.value = false;
          } else if (e.key === (isRtl.value ? "ArrowLeft" : "ArrowRight")) {
            e.preventDefault();
            focusChild(el, "first");
          }
        }
      } else if (props.submenu ? e.key === (isRtl.value ? "ArrowLeft" : "ArrowRight") : ["ArrowDown", "ArrowUp"].includes(e.key)) {
        isActive.value = true;
        e.preventDefault();
        setTimeout(() => setTimeout(() => onActivatorKeydown(e)));
      }
    }
    const activatorProps = computed(() => mergeProps({
      "aria-haspopup": "menu",
      "aria-expanded": String(isActive.value),
      "aria-controls": id.value,
      "aria-owns": id.value,
      onKeydown: onActivatorKeydown
    }, props.activatorProps));
    useRender(() => {
      var _a;
      const overlayProps = VOverlay.filterProps(props);
      return createVNode(VOverlay, mergeProps({
        "ref": overlay,
        "id": id.value,
        "class": ["v-menu", props.class],
        "style": props.style
      }, overlayProps, {
        "modelValue": isActive.value,
        "onUpdate:modelValue": ($event) => isActive.value = $event,
        "absolute": true,
        "activatorProps": activatorProps.value,
        "location": (_a = props.location) != null ? _a : props.submenu ? "end" : "bottom",
        "onClick:outside": onClickOutside,
        "onKeydown": onKeydown
      }, scopeId), {
        activator: slots.activator,
        default: function() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createVNode(VDefaultsProvider, {
            "root": "VMenu"
          }, {
            default: () => {
              var _a2;
              return [(_a2 = slots.default) == null ? void 0 : _a2.call(slots, ...args)];
            }
          });
        }
      });
    });
    return forwardRefs({
      id,
      \u03A8openChildren: openChildren
    }, overlay);
  }
});
function useSticky(_ref) {
  let {
    isSticky,
    layoutItemStyles
  } = _ref;
  const isStuck = shallowRef(false);
  const stuckPosition = shallowRef(0);
  const stickyStyles = computed(() => {
    const side = typeof isStuck.value === "boolean" ? "top" : isStuck.value;
    return [isSticky.value ? {
      top: "auto",
      bottom: "auto",
      height: void 0
    } : void 0, isStuck.value ? {
      [side]: convertToUnit(stuckPosition.value)
    } : {
      top: layoutItemStyles.value.top
    }];
  });
  return {
    isStuck,
    stickyStyles
  };
}
function useTouch(_ref) {
  let {
    el,
    width,
    position
  } = _ref;
  computed(() => ["left", "right"].includes(position.value));
  const isDragging = shallowRef(false);
  const dragProgress = shallowRef(0);
  shallowRef(0);
  const dragStyles = computed(() => {
    return isDragging.value ? {
      transform: position.value === "left" ? `translateX(calc(-100% + ${dragProgress.value * width.value}px))` : position.value === "right" ? `translateX(calc(100% - ${dragProgress.value * width.value}px))` : position.value === "top" ? `translateY(calc(-100% + ${dragProgress.value * width.value}px))` : position.value === "bottom" ? `translateY(calc(100% - ${dragProgress.value * width.value}px))` : oops(),
      transition: "none"
    } : void 0;
  });
  useToggleScope(isDragging, () => {
    var _a, _b, _c, _d;
    const transform = (_b = (_a = el.value) == null ? void 0 : _a.style.transform) != null ? _b : null;
    const transition = (_d = (_c = el.value) == null ? void 0 : _c.style.transition) != null ? _d : null;
    watchEffect(() => {
      var _a2, _b2, _c2, _d2;
      (_b2 = el.value) == null ? void 0 : _b2.style.setProperty("transform", ((_a2 = dragStyles.value) == null ? void 0 : _a2.transform) || "none");
      (_d2 = el.value) == null ? void 0 : _d2.style.setProperty("transition", ((_c2 = dragStyles.value) == null ? void 0 : _c2.transition) || null);
    });
    onScopeDispose(() => {
      var _a2, _b2;
      (_a2 = el.value) == null ? void 0 : _a2.style.setProperty("transform", transform);
      (_b2 = el.value) == null ? void 0 : _b2.style.setProperty("transition", transition);
    });
  });
  return {
    isDragging,
    dragProgress,
    dragStyles
  };
}
function oops() {
  throw new Error();
}
const locations = ["start", "end", "left", "right", "top", "bottom"];
const makeVNavigationDrawerProps = propsFactory({
  color: String,
  disableResizeWatcher: Boolean,
  disableRouteWatcher: Boolean,
  expandOnHover: Boolean,
  floating: Boolean,
  modelValue: {
    type: Boolean,
    default: null
  },
  permanent: Boolean,
  rail: {
    type: Boolean,
    default: null
  },
  railWidth: {
    type: [Number, String],
    default: 56
  },
  scrim: {
    type: [Boolean, String],
    default: true
  },
  image: String,
  temporary: Boolean,
  persistent: Boolean,
  touchless: Boolean,
  width: {
    type: [Number, String],
    default: 256
  },
  location: {
    type: String,
    default: "start",
    validator: (value) => locations.includes(value)
  },
  sticky: Boolean,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDelayProps(),
  ...makeDisplayProps({
    mobile: null
  }),
  ...makeElevationProps(),
  ...makeLayoutItemProps(),
  ...makeRoundedProps(),
  ...omit(makeFocusTrapProps(), ["disableInitialFocus"]),
  ...makeTagProps({
    tag: "nav"
  }),
  ...makeThemeProps()
}, "VNavigationDrawer");
const VNavigationDrawer = genericComponent()({
  name: "VNavigationDrawer",
  props: makeVNavigationDrawerProps(),
  emits: {
    "update:modelValue": (val) => true,
    "update:rail": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      isRtl
    } = useRtl();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      displayClasses,
      mobile
    } = useDisplay(props);
    const {
      roundedClasses
    } = useRounded(props);
    const router = useRouter();
    const isActive = useProxiedModel(props, "modelValue", null, (v) => !!v);
    const {
      ssrBootStyles
    } = useSsrBoot();
    const {
      scopeId
    } = useScopeId();
    const rootEl = ref();
    const isHovering = shallowRef(false);
    const {
      runOpenDelay,
      runCloseDelay
    } = useDelay(props, (value) => {
      isHovering.value = value;
    });
    const width = computed(() => {
      return props.rail && props.expandOnHover && isHovering.value ? Number(props.width) : Number(props.rail ? props.railWidth : props.width);
    });
    const location = computed(() => {
      return toPhysical(props.location, isRtl.value);
    });
    const isPersistent = toRef(() => props.persistent);
    const isTemporary = computed(() => !props.permanent && (mobile.value || props.temporary));
    const isSticky = computed(() => props.sticky && !isTemporary.value && location.value !== "bottom");
    useFocusTrap(props, {
      isActive,
      localTop: isTemporary,
      contentEl: rootEl
    });
    useToggleScope(() => props.expandOnHover && props.rail != null, () => {
      watch(isHovering, (val) => emit("update:rail", !val));
    });
    useToggleScope(() => !props.disableResizeWatcher, () => {
      watch(isTemporary, (val) => !props.permanent && nextTick(() => isActive.value = !val));
    });
    useToggleScope(() => !props.disableRouteWatcher && !!router, () => {
      watch(router.currentRoute, () => isTemporary.value && (isActive.value = false));
    });
    watch(() => props.permanent, (val) => {
      if (val) isActive.value = true;
    });
    if (props.modelValue == null && !isTemporary.value) {
      isActive.value = props.permanent || !mobile.value;
    }
    const {
      isDragging,
      dragProgress
    } = useTouch({
      el: rootEl,
      width,
      touchless: toRef(() => props.touchless),
      position: location
    });
    const layoutSize = computed(() => {
      const size = isTemporary.value ? 0 : props.rail && props.expandOnHover ? Number(props.railWidth) : width.value;
      return isDragging.value ? size * dragProgress.value : size;
    });
    const {
      layoutItemStyles,
      layoutItemScrimStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: location,
      layoutSize,
      elementSize: width,
      active: readonly(isActive),
      disableTransitions: toRef(() => isDragging.value),
      absolute: computed(() => (
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        props.absolute || isSticky.value && typeof isStuck.value !== "string"
      ))
    });
    const {
      isStuck,
      stickyStyles
    } = useSticky({
      isSticky,
      layoutItemStyles
    });
    const scrimColor = useBackgroundColor(() => {
      return typeof props.scrim === "string" ? props.scrim : null;
    });
    const scrimStyles = computed(() => ({
      ...isDragging.value ? {
        opacity: dragProgress.value * 0.2,
        transition: "none"
      } : void 0,
      ...layoutItemScrimStyles.value
    }));
    provideDefaults({
      VList: {
        bgColor: "transparent"
      }
    });
    useRender(() => {
      const hasImage = slots.image || props.image;
      return createElementVNode(Fragment, null, [createVNode(props.tag, mergeProps({
        "ref": rootEl,
        "onMouseenter": runOpenDelay,
        "onMouseleave": runCloseDelay,
        "class": ["v-navigation-drawer", `v-navigation-drawer--${location.value}`, {
          "v-navigation-drawer--expand-on-hover": props.expandOnHover,
          "v-navigation-drawer--floating": props.floating,
          "v-navigation-drawer--is-hovering": isHovering.value,
          "v-navigation-drawer--rail": props.rail,
          "v-navigation-drawer--temporary": isTemporary.value,
          "v-navigation-drawer--persistent": isPersistent.value,
          "v-navigation-drawer--active": isActive.value,
          "v-navigation-drawer--sticky": isSticky.value
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, displayClasses.value, elevationClasses.value, roundedClasses.value, props.class],
        "style": [backgroundColorStyles.value, layoutItemStyles.value, ssrBootStyles.value, stickyStyles.value, props.style],
        "inert": !isActive.value
      }, scopeId, attrs), {
        default: () => {
          var _a, _b, _c;
          return [hasImage && createElementVNode("div", {
            "key": "image",
            "class": "v-navigation-drawer__img"
          }, [!slots.image ? createVNode(VImg, {
            "key": "image-img",
            "alt": "",
            "cover": true,
            "height": "inherit",
            "src": props.image
          }, null) : createVNode(VDefaultsProvider, {
            "key": "image-defaults",
            "disabled": !props.image,
            "defaults": {
              VImg: {
                alt: "",
                cover: true,
                height: "inherit",
                src: props.image
              }
            }
          }, slots.image)]), slots.prepend && createElementVNode("div", {
            "class": "v-navigation-drawer__prepend"
          }, [(_a = slots.prepend) == null ? void 0 : _a.call(slots)]), createElementVNode("div", {
            "class": "v-navigation-drawer__content"
          }, [(_b = slots.default) == null ? void 0 : _b.call(slots)]), slots.append && createElementVNode("div", {
            "class": "v-navigation-drawer__append"
          }, [(_c = slots.append) == null ? void 0 : _c.call(slots)])];
        }
      }), createVNode(Transition, {
        "name": "fade-transition"
      }, {
        default: () => [isTemporary.value && (isDragging.value || isActive.value) && !!props.scrim && createElementVNode("div", mergeProps({
          "class": ["v-navigation-drawer__scrim", scrimColor.backgroundColorClasses.value],
          "style": [scrimStyles.value, scrimColor.backgroundColorStyles.value],
          "onClick": () => {
            if (isPersistent.value) return;
            isActive.value = false;
          }
        }, scopeId), null)]
      })]);
    });
    return {
      isStuck
    };
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const { t, locale, locales, setLocale } = useI18n();
    const localePath = useLocalePath();
    const switchLocalePath = useSwitchLocalePath();
    const cartStore = useCartStore();
    const config = useRuntimeConfig();
    const cartDrawer = ref(false);
    const mobileDrawer = ref(false);
    const currentLocale = computed(() => locale.value);
    const availableLocales = computed(() => locales.value);
    const navItems = [
      { to: "/", label: "nav.home", icon: "mdi-home" },
      { to: "/transfers", label: "nav.transfers", icon: "mdi-car" },
      { to: "/services", label: "nav.tours", icon: "mdi-map-marker-star" },
      { to: "/blog", label: "nav.blog", icon: "mdi-post" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(ssrRenderComponent(VApp, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VAppBar, {
              color: "primary",
              elevation: "1",
              height: 64
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="d-flex align-center w-100 px-4" data-v-738ec9c2${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_NuxtLink, {
                    to: unref(localePath)("/"),
                    class: "text-decoration-none d-flex align-center"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VIcon, {
                          color: "accent",
                          size: "28",
                          class: "mr-2"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`mdi-compass-rose`);
                            } else {
                              return [
                                createTextVNode("mdi-compass-rose")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<span class="text-white font-weight-bold text-body-1 d-none d-sm-block" data-v-738ec9c2${_scopeId3}>Khiva Tour Guide</span>`);
                      } else {
                        return [
                          createVNode(VIcon, {
                            color: "accent",
                            size: "28",
                            class: "mr-2"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("mdi-compass-rose")
                            ]),
                            _: 1
                          }),
                          createVNode("span", { class: "text-white font-weight-bold text-body-1 d-none d-sm-block" }, "Khiva Tour Guide")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VSpacer, null, null, _parent3, _scopeId2));
                  _push3(`<div class="d-none d-md-flex align-center gap-2" data-v-738ec9c2${_scopeId2}><!--[-->`);
                  ssrRenderList(navItems, (item) => {
                    _push3(ssrRenderComponent(_component_NuxtLink, {
                      key: item.to,
                      to: unref(localePath)(item.to),
                      class: "text-white text-decoration-none text-body-2 px-3 py-2 nav-link"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(t)(item.label))}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(t)(item.label)), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></div>`);
                  _push3(ssrRenderComponent(VBtn, {
                    icon: "",
                    class: "ml-2",
                    onClick: ($event) => cartDrawer.value = !unref(cartDrawer)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBadge, {
                          content: unref(cartStore).items.length,
                          "model-value": unref(cartStore).items.length > 0,
                          color: "cta"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VIcon, { color: "white" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`mdi-cart`);
                                  } else {
                                    return [
                                      createTextVNode("mdi-cart")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VIcon, { color: "white" }, {
                                  default: withCtx(() => [
                                    createTextVNode("mdi-cart")
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
                          createVNode(VBadge, {
                            content: unref(cartStore).items.length,
                            "model-value": unref(cartStore).items.length > 0,
                            color: "cta"
                          }, {
                            default: withCtx(() => [
                              createVNode(VIcon, { color: "white" }, {
                                default: withCtx(() => [
                                  createTextVNode("mdi-cart")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["content", "model-value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VMenu, null, {
                    activator: withCtx(({ props }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, mergeProps(props, {
                          variant: "text",
                          size: "small",
                          class: "ml-1"
                        }), {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            var _a, _b;
                            if (_push5) {
                              _push5(`<span class="text-white text-caption" data-v-738ec9c2${_scopeId4}>${ssrInterpolate((_a = unref(currentLocale)) == null ? void 0 : _a.toUpperCase())}</span>`);
                              _push5(ssrRenderComponent(VIcon, {
                                color: "white",
                                size: "16"
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`mdi-chevron-down`);
                                  } else {
                                    return [
                                      createTextVNode("mdi-chevron-down")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("span", { class: "text-white text-caption" }, toDisplayString((_b = unref(currentLocale)) == null ? void 0 : _b.toUpperCase()), 1),
                                createVNode(VIcon, {
                                  color: "white",
                                  size: "16"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("mdi-chevron-down")
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
                          createVNode(VBtn, mergeProps(props, {
                            variant: "text",
                            size: "small",
                            class: "ml-1"
                          }), {
                            default: withCtx(() => {
                              var _a;
                              return [
                                createVNode("span", { class: "text-white text-caption" }, toDisplayString((_a = unref(currentLocale)) == null ? void 0 : _a.toUpperCase()), 1),
                                createVNode(VIcon, {
                                  color: "white",
                                  size: "16"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("mdi-chevron-down")
                                  ]),
                                  _: 1
                                })
                              ];
                            }),
                            _: 1
                          }, 16)
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VList, {
                          density: "compact",
                          rounded: "lg"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(unref(availableLocales), (loc) => {
                                _push5(ssrRenderComponent(VListItem, {
                                  key: loc.code,
                                  onClick: ($event) => unref(switchLocalePath)(loc.code),
                                  title: loc.name,
                                  value: loc.code
                                }, null, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(availableLocales), (loc) => {
                                  return openBlock(), createBlock(VListItem, {
                                    key: loc.code,
                                    onClick: ($event) => unref(switchLocalePath)(loc.code),
                                    title: loc.name,
                                    value: loc.code
                                  }, null, 8, ["onClick", "title", "value"]);
                                }), 128))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VList, {
                            density: "compact",
                            rounded: "lg"
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(availableLocales), (loc) => {
                                return openBlock(), createBlock(VListItem, {
                                  key: loc.code,
                                  onClick: ($event) => unref(switchLocalePath)(loc.code),
                                  title: loc.name,
                                  value: loc.code
                                }, null, 8, ["onClick", "title", "value"]);
                              }), 128))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VBtn, {
                    icon: "",
                    class: "d-md-none ml-1",
                    onClick: ($event) => mobileDrawer.value = !unref(mobileDrawer)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VIcon, { color: "white" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`mdi-menu`);
                            } else {
                              return [
                                createTextVNode("mdi-menu")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VIcon, { color: "white" }, {
                            default: withCtx(() => [
                              createTextVNode("mdi-menu")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "d-flex align-center w-100 px-4" }, [
                      createVNode(_component_NuxtLink, {
                        to: unref(localePath)("/"),
                        class: "text-decoration-none d-flex align-center"
                      }, {
                        default: withCtx(() => [
                          createVNode(VIcon, {
                            color: "accent",
                            size: "28",
                            class: "mr-2"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("mdi-compass-rose")
                            ]),
                            _: 1
                          }),
                          createVNode("span", { class: "text-white font-weight-bold text-body-1 d-none d-sm-block" }, "Khiva Tour Guide")
                        ]),
                        _: 1
                      }, 8, ["to"]),
                      createVNode(VSpacer),
                      createVNode("div", { class: "d-none d-md-flex align-center gap-2" }, [
                        (openBlock(), createBlock(Fragment, null, renderList(navItems, (item) => {
                          return createVNode(_component_NuxtLink, {
                            key: item.to,
                            to: unref(localePath)(item.to),
                            class: "text-white text-decoration-none text-body-2 px-3 py-2 nav-link"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(t)(item.label)), 1)
                            ]),
                            _: 2
                          }, 1032, ["to"]);
                        }), 64))
                      ]),
                      createVNode(VBtn, {
                        icon: "",
                        class: "ml-2",
                        onClick: ($event) => cartDrawer.value = !unref(cartDrawer)
                      }, {
                        default: withCtx(() => [
                          createVNode(VBadge, {
                            content: unref(cartStore).items.length,
                            "model-value": unref(cartStore).items.length > 0,
                            color: "cta"
                          }, {
                            default: withCtx(() => [
                              createVNode(VIcon, { color: "white" }, {
                                default: withCtx(() => [
                                  createTextVNode("mdi-cart")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["content", "model-value"])
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(VMenu, null, {
                        activator: withCtx(({ props }) => [
                          createVNode(VBtn, mergeProps(props, {
                            variant: "text",
                            size: "small",
                            class: "ml-1"
                          }), {
                            default: withCtx(() => {
                              var _a;
                              return [
                                createVNode("span", { class: "text-white text-caption" }, toDisplayString((_a = unref(currentLocale)) == null ? void 0 : _a.toUpperCase()), 1),
                                createVNode(VIcon, {
                                  color: "white",
                                  size: "16"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("mdi-chevron-down")
                                  ]),
                                  _: 1
                                })
                              ];
                            }),
                            _: 1
                          }, 16)
                        ]),
                        default: withCtx(() => [
                          createVNode(VList, {
                            density: "compact",
                            rounded: "lg"
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(availableLocales), (loc) => {
                                return openBlock(), createBlock(VListItem, {
                                  key: loc.code,
                                  onClick: ($event) => unref(switchLocalePath)(loc.code),
                                  title: loc.name,
                                  value: loc.code
                                }, null, 8, ["onClick", "title", "value"]);
                              }), 128))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VBtn, {
                        icon: "",
                        class: "d-md-none ml-1",
                        onClick: ($event) => mobileDrawer.value = !unref(mobileDrawer)
                      }, {
                        default: withCtx(() => [
                          createVNode(VIcon, { color: "white" }, {
                            default: withCtx(() => [
                              createTextVNode("mdi-menu")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VNavigationDrawer, {
              modelValue: unref(mobileDrawer),
              "onUpdate:modelValue": ($event) => isRef(mobileDrawer) ? mobileDrawer.value = $event : null,
              location: "right",
              temporary: "",
              color: "primary"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VList, {
                    density: "compact",
                    nav: "",
                    class: "mt-4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(navItems, (item) => {
                          _push4(ssrRenderComponent(VListItem, {
                            key: item.to,
                            to: unref(localePath)(item.to),
                            title: unref(t)(item.label),
                            "prepend-icon": item.icon,
                            "active-color": "accent",
                            rounded: "lg",
                            onClick: ($event) => mobileDrawer.value = false
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(navItems, (item) => {
                            return createVNode(VListItem, {
                              key: item.to,
                              to: unref(localePath)(item.to),
                              title: unref(t)(item.label),
                              "prepend-icon": item.icon,
                              "active-color": "accent",
                              rounded: "lg",
                              onClick: ($event) => mobileDrawer.value = false
                            }, null, 8, ["to", "title", "prepend-icon", "onClick"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VList, {
                      density: "compact",
                      nav: "",
                      class: "mt-4"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(navItems, (item) => {
                          return createVNode(VListItem, {
                            key: item.to,
                            to: unref(localePath)(item.to),
                            title: unref(t)(item.label),
                            "prepend-icon": item.icon,
                            "active-color": "accent",
                            rounded: "lg",
                            onClick: ($event) => mobileDrawer.value = false
                          }, null, 8, ["to", "title", "prepend-icon", "onClick"]);
                        }), 64))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VNavigationDrawer, {
              modelValue: unref(cartDrawer),
              "onUpdate:modelValue": ($event) => isRef(cartDrawer) ? cartDrawer.value = $event : null,
              location: "right",
              width: "360",
              temporary: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="pa-4" data-v-738ec9c2${_scopeId2}><div class="d-flex align-center mb-4" data-v-738ec9c2${_scopeId2}><h3 class="text-h6 font-weight-bold" data-v-738ec9c2${_scopeId2}>${ssrInterpolate(unref(t)("cart.title"))}</h3>`);
                  _push3(ssrRenderComponent(VSpacer, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VBtn, {
                    icon: "",
                    size: "small",
                    onClick: ($event) => cartDrawer.value = false
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VIcon, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`mdi-close`);
                            } else {
                              return [
                                createTextVNode("mdi-close")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VIcon, null, {
                            default: withCtx(() => [
                              createTextVNode("mdi-close")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (unref(cartStore).items.length === 0) {
                    _push3(`<div class="text-center py-12" data-v-738ec9c2${_scopeId2}>`);
                    _push3(ssrRenderComponent(VIcon, {
                      size: "48",
                      color: "grey-lighten-2"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`mdi-cart-outline`);
                        } else {
                          return [
                            createTextVNode("mdi-cart-outline")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<p class="text-medium-emphasis mt-2" data-v-738ec9c2${_scopeId2}>${ssrInterpolate(unref(t)("cart.empty"))}</p></div>`);
                  } else {
                    _push3(`<div data-v-738ec9c2${_scopeId2}><!--[-->`);
                    ssrRenderList(unref(cartStore).items, (item) => {
                      _push3(ssrRenderComponent(VCard, {
                        key: `${item.type}-${item.id}`,
                        class: "mb-3",
                        rounded: "lg",
                        variant: "outlined"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(VCardText, { class: "pa-3" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="d-flex justify-between align-start" data-v-738ec9c2${_scopeId4}><div class="flex-grow-1 mr-2" data-v-738ec9c2${_scopeId4}><div class="text-body-2 font-weight-medium" data-v-738ec9c2${_scopeId4}>${ssrInterpolate(item.name)}</div><div class="text-caption text-medium-emphasis" data-v-738ec9c2${_scopeId4}>$${ssrInterpolate(item.price)} \xD7 ${ssrInterpolate(item.quantity)}</div></div><div class="text-right" data-v-738ec9c2${_scopeId4}><div class="text-body-2 font-weight-bold" data-v-738ec9c2${_scopeId4}>$${ssrInterpolate((item.price * item.quantity).toFixed(2))}</div>`);
                                  _push5(ssrRenderComponent(VBtn, {
                                    icon: "",
                                    size: "x-small",
                                    variant: "text",
                                    color: "error",
                                    onClick: ($event) => unref(cartStore).removeItem(item.id, item.type)
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(VIcon, { size: "16" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`mdi-delete`);
                                            } else {
                                              return [
                                                createTextVNode("mdi-delete")
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(VIcon, { size: "16" }, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-delete")
                                            ]),
                                            _: 1
                                          })
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(`</div></div>`);
                                } else {
                                  return [
                                    createVNode("div", { class: "d-flex justify-between align-start" }, [
                                      createVNode("div", { class: "flex-grow-1 mr-2" }, [
                                        createVNode("div", { class: "text-body-2 font-weight-medium" }, toDisplayString(item.name), 1),
                                        createVNode("div", { class: "text-caption text-medium-emphasis" }, "$" + toDisplayString(item.price) + " \xD7 " + toDisplayString(item.quantity), 1)
                                      ]),
                                      createVNode("div", { class: "text-right" }, [
                                        createVNode("div", { class: "text-body-2 font-weight-bold" }, "$" + toDisplayString((item.price * item.quantity).toFixed(2)), 1),
                                        createVNode(VBtn, {
                                          icon: "",
                                          size: "x-small",
                                          variant: "text",
                                          color: "error",
                                          onClick: ($event) => unref(cartStore).removeItem(item.id, item.type)
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VIcon, { size: "16" }, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-delete")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }, 8, ["onClick"])
                                      ])
                                    ])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(VCardText, { class: "pa-3" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "d-flex justify-between align-start" }, [
                                    createVNode("div", { class: "flex-grow-1 mr-2" }, [
                                      createVNode("div", { class: "text-body-2 font-weight-medium" }, toDisplayString(item.name), 1),
                                      createVNode("div", { class: "text-caption text-medium-emphasis" }, "$" + toDisplayString(item.price) + " \xD7 " + toDisplayString(item.quantity), 1)
                                    ]),
                                    createVNode("div", { class: "text-right" }, [
                                      createVNode("div", { class: "text-body-2 font-weight-bold" }, "$" + toDisplayString((item.price * item.quantity).toFixed(2)), 1),
                                      createVNode(VBtn, {
                                        icon: "",
                                        size: "x-small",
                                        variant: "text",
                                        color: "error",
                                        onClick: ($event) => unref(cartStore).removeItem(item.id, item.type)
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VIcon, { size: "16" }, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-delete")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])
                                    ])
                                  ])
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
                    _push3(ssrRenderComponent(VDivider, { class: "my-3" }, null, _parent3, _scopeId2));
                    _push3(`<div class="d-flex justify-between text-h6 font-weight-bold mb-4" data-v-738ec9c2${_scopeId2}><span data-v-738ec9c2${_scopeId2}>${ssrInterpolate(unref(t)("cart.total"))}</span><span data-v-738ec9c2${_scopeId2}>$${ssrInterpolate(unref(cartStore).total.toFixed(2))}</span></div>`);
                    _push3(ssrRenderComponent(VBtn, {
                      to: unref(localePath)("/checkout"),
                      color: "cta",
                      block: "",
                      size: "large",
                      rounded: "lg",
                      onClick: ($event) => cartDrawer.value = false
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(t)("cart.checkout"))}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(t)("cart.checkout")), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VBtn, {
                      variant: "text",
                      color: "error",
                      size: "small",
                      block: "",
                      class: "mt-2",
                      onClick: ($event) => unref(cartStore).clearCart()
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(t)("cart.clear"))}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(t)("cart.clear")), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "pa-4" }, [
                      createVNode("div", { class: "d-flex align-center mb-4" }, [
                        createVNode("h3", { class: "text-h6 font-weight-bold" }, toDisplayString(unref(t)("cart.title")), 1),
                        createVNode(VSpacer),
                        createVNode(VBtn, {
                          icon: "",
                          size: "small",
                          onClick: ($event) => cartDrawer.value = false
                        }, {
                          default: withCtx(() => [
                            createVNode(VIcon, null, {
                              default: withCtx(() => [
                                createTextVNode("mdi-close")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      unref(cartStore).items.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-center py-12"
                      }, [
                        createVNode(VIcon, {
                          size: "48",
                          color: "grey-lighten-2"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("mdi-cart-outline")
                          ]),
                          _: 1
                        }),
                        createVNode("p", { class: "text-medium-emphasis mt-2" }, toDisplayString(unref(t)("cart.empty")), 1)
                      ])) : (openBlock(), createBlock("div", { key: 1 }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(cartStore).items, (item) => {
                          return openBlock(), createBlock(VCard, {
                            key: `${item.type}-${item.id}`,
                            class: "mb-3",
                            rounded: "lg",
                            variant: "outlined"
                          }, {
                            default: withCtx(() => [
                              createVNode(VCardText, { class: "pa-3" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "d-flex justify-between align-start" }, [
                                    createVNode("div", { class: "flex-grow-1 mr-2" }, [
                                      createVNode("div", { class: "text-body-2 font-weight-medium" }, toDisplayString(item.name), 1),
                                      createVNode("div", { class: "text-caption text-medium-emphasis" }, "$" + toDisplayString(item.price) + " \xD7 " + toDisplayString(item.quantity), 1)
                                    ]),
                                    createVNode("div", { class: "text-right" }, [
                                      createVNode("div", { class: "text-body-2 font-weight-bold" }, "$" + toDisplayString((item.price * item.quantity).toFixed(2)), 1),
                                      createVNode(VBtn, {
                                        icon: "",
                                        size: "x-small",
                                        variant: "text",
                                        color: "error",
                                        onClick: ($event) => unref(cartStore).removeItem(item.id, item.type)
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VIcon, { size: "16" }, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-delete")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])
                                    ])
                                  ])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024);
                        }), 128)),
                        createVNode(VDivider, { class: "my-3" }),
                        createVNode("div", { class: "d-flex justify-between text-h6 font-weight-bold mb-4" }, [
                          createVNode("span", null, toDisplayString(unref(t)("cart.total")), 1),
                          createVNode("span", null, "$" + toDisplayString(unref(cartStore).total.toFixed(2)), 1)
                        ]),
                        createVNode(VBtn, {
                          to: unref(localePath)("/checkout"),
                          color: "cta",
                          block: "",
                          size: "large",
                          rounded: "lg",
                          onClick: ($event) => cartDrawer.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(t)("cart.checkout")), 1)
                          ]),
                          _: 1
                        }, 8, ["to", "onClick"]),
                        createVNode(VBtn, {
                          variant: "text",
                          color: "error",
                          size: "small",
                          block: "",
                          class: "mt-2",
                          onClick: ($event) => unref(cartStore).clearCart()
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(t)("cart.clear")), 1)
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]))
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VMain, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VFooter, {
              color: "primary",
              class: "pa-0 mt-12"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="w-100 pa-8" data-v-738ec9c2${_scopeId2}>`);
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          md: "4"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="d-flex align-center mb-3" data-v-738ec9c2${_scopeId4}>`);
                              _push5(ssrRenderComponent(VIcon, {
                                color: "accent",
                                class: "mr-2"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`mdi-compass-rose`);
                                  } else {
                                    return [
                                      createTextVNode("mdi-compass-rose")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<span class="text-white font-weight-bold text-h6" data-v-738ec9c2${_scopeId4}>Khiva Tour Guide</span></div><p class="text-white text-body-2" style="${ssrRenderStyle({ "opacity": "0.7" })}" data-v-738ec9c2${_scopeId4}>${ssrInterpolate(unref(t)("footer.description"))}</p>`);
                            } else {
                              return [
                                createVNode("div", { class: "d-flex align-center mb-3" }, [
                                  createVNode(VIcon, {
                                    color: "accent",
                                    class: "mr-2"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-compass-rose")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("span", { class: "text-white font-weight-bold text-h6" }, "Khiva Tour Guide")
                                ]),
                                createVNode("p", {
                                  class: "text-white text-body-2",
                                  style: { "opacity": "0.7" }
                                }, toDisplayString(unref(t)("footer.description")), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          md: "4"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<h4 class="text-white font-weight-bold mb-3" data-v-738ec9c2${_scopeId4}>${ssrInterpolate(unref(t)("footer.contact"))}</h4><div class="d-flex flex-column gap-2" data-v-738ec9c2${_scopeId4}><a${ssrRenderAttr("href", `https://wa.me/${unref(config).public.whatsapp}`)} target="_blank" class="text-white text-decoration-none text-body-2 d-flex align-center" data-v-738ec9c2${_scopeId4}>`);
                              _push5(ssrRenderComponent(VIcon, {
                                size: "18",
                                class: "mr-2",
                                color: "success"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`mdi-whatsapp`);
                                  } else {
                                    return [
                                      createTextVNode("mdi-whatsapp")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(` WhatsApp </a><a${ssrRenderAttr("href", `https://t.me/${unref(config).public.telegram}`)} target="_blank" class="text-white text-decoration-none text-body-2 d-flex align-center" data-v-738ec9c2${_scopeId4}>`);
                              _push5(ssrRenderComponent(VIcon, {
                                size: "18",
                                class: "mr-2",
                                color: "info"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`mdi-send`);
                                  } else {
                                    return [
                                      createTextVNode("mdi-send")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(` Telegram </a></div>`);
                            } else {
                              return [
                                createVNode("h4", { class: "text-white font-weight-bold mb-3" }, toDisplayString(unref(t)("footer.contact")), 1),
                                createVNode("div", { class: "d-flex flex-column gap-2" }, [
                                  createVNode("a", {
                                    href: `https://wa.me/${unref(config).public.whatsapp}`,
                                    target: "_blank",
                                    class: "text-white text-decoration-none text-body-2 d-flex align-center"
                                  }, [
                                    createVNode(VIcon, {
                                      size: "18",
                                      class: "mr-2",
                                      color: "success"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-whatsapp")
                                      ]),
                                      _: 1
                                    }),
                                    createTextVNode(" WhatsApp ")
                                  ], 8, ["href"]),
                                  createVNode("a", {
                                    href: `https://t.me/${unref(config).public.telegram}`,
                                    target: "_blank",
                                    class: "text-white text-decoration-none text-body-2 d-flex align-center"
                                  }, [
                                    createVNode(VIcon, {
                                      size: "18",
                                      class: "mr-2",
                                      color: "info"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-send")
                                      ]),
                                      _: 1
                                    }),
                                    createTextVNode(" Telegram ")
                                  ], 8, ["href"])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          md: "4"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<h4 class="text-white font-weight-bold mb-3" data-v-738ec9c2${_scopeId4}>Menu</h4><div class="d-flex flex-column gap-1" data-v-738ec9c2${_scopeId4}><!--[-->`);
                              ssrRenderList(navItems, (item) => {
                                _push5(ssrRenderComponent(_component_NuxtLink, {
                                  key: item.to,
                                  to: unref(localePath)(item.to),
                                  class: "text-white text-decoration-none text-body-2",
                                  style: { "opacity": "0.8" }
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(unref(t)(item.label))}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(unref(t)(item.label)), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]--></div>`);
                            } else {
                              return [
                                createVNode("h4", { class: "text-white font-weight-bold mb-3" }, "Menu"),
                                createVNode("div", { class: "d-flex flex-column gap-1" }, [
                                  (openBlock(), createBlock(Fragment, null, renderList(navItems, (item) => {
                                    return createVNode(_component_NuxtLink, {
                                      key: item.to,
                                      to: unref(localePath)(item.to),
                                      class: "text-white text-decoration-none text-body-2",
                                      style: { "opacity": "0.8" }
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(t)(item.label)), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["to"]);
                                  }), 64))
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, {
                            cols: "12",
                            md: "4"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "d-flex align-center mb-3" }, [
                                createVNode(VIcon, {
                                  color: "accent",
                                  class: "mr-2"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("mdi-compass-rose")
                                  ]),
                                  _: 1
                                }),
                                createVNode("span", { class: "text-white font-weight-bold text-h6" }, "Khiva Tour Guide")
                              ]),
                              createVNode("p", {
                                class: "text-white text-body-2",
                                style: { "opacity": "0.7" }
                              }, toDisplayString(unref(t)("footer.description")), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "4"
                          }, {
                            default: withCtx(() => [
                              createVNode("h4", { class: "text-white font-weight-bold mb-3" }, toDisplayString(unref(t)("footer.contact")), 1),
                              createVNode("div", { class: "d-flex flex-column gap-2" }, [
                                createVNode("a", {
                                  href: `https://wa.me/${unref(config).public.whatsapp}`,
                                  target: "_blank",
                                  class: "text-white text-decoration-none text-body-2 d-flex align-center"
                                }, [
                                  createVNode(VIcon, {
                                    size: "18",
                                    class: "mr-2",
                                    color: "success"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-whatsapp")
                                    ]),
                                    _: 1
                                  }),
                                  createTextVNode(" WhatsApp ")
                                ], 8, ["href"]),
                                createVNode("a", {
                                  href: `https://t.me/${unref(config).public.telegram}`,
                                  target: "_blank",
                                  class: "text-white text-decoration-none text-body-2 d-flex align-center"
                                }, [
                                  createVNode(VIcon, {
                                    size: "18",
                                    class: "mr-2",
                                    color: "info"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-send")
                                    ]),
                                    _: 1
                                  }),
                                  createTextVNode(" Telegram ")
                                ], 8, ["href"])
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "4"
                          }, {
                            default: withCtx(() => [
                              createVNode("h4", { class: "text-white font-weight-bold mb-3" }, "Menu"),
                              createVNode("div", { class: "d-flex flex-column gap-1" }, [
                                (openBlock(), createBlock(Fragment, null, renderList(navItems, (item) => {
                                  return createVNode(_component_NuxtLink, {
                                    key: item.to,
                                    to: unref(localePath)(item.to),
                                    class: "text-white text-decoration-none text-body-2",
                                    style: { "opacity": "0.8" }
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(t)(item.label)), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["to"]);
                                }), 64))
                              ])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VDivider, {
                    color: "rgba(255,255,255,0.1)",
                    class: "my-4"
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="text-center text-white text-caption" style="${ssrRenderStyle({ "opacity": "0.5" })}" data-v-738ec9c2${_scopeId2}> \xA9 ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Khiva Tour Guide. ${ssrInterpolate(unref(t)("footer.rights"))}. </p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "w-100 pa-8" }, [
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "12",
                            md: "4"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "d-flex align-center mb-3" }, [
                                createVNode(VIcon, {
                                  color: "accent",
                                  class: "mr-2"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("mdi-compass-rose")
                                  ]),
                                  _: 1
                                }),
                                createVNode("span", { class: "text-white font-weight-bold text-h6" }, "Khiva Tour Guide")
                              ]),
                              createVNode("p", {
                                class: "text-white text-body-2",
                                style: { "opacity": "0.7" }
                              }, toDisplayString(unref(t)("footer.description")), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "4"
                          }, {
                            default: withCtx(() => [
                              createVNode("h4", { class: "text-white font-weight-bold mb-3" }, toDisplayString(unref(t)("footer.contact")), 1),
                              createVNode("div", { class: "d-flex flex-column gap-2" }, [
                                createVNode("a", {
                                  href: `https://wa.me/${unref(config).public.whatsapp}`,
                                  target: "_blank",
                                  class: "text-white text-decoration-none text-body-2 d-flex align-center"
                                }, [
                                  createVNode(VIcon, {
                                    size: "18",
                                    class: "mr-2",
                                    color: "success"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-whatsapp")
                                    ]),
                                    _: 1
                                  }),
                                  createTextVNode(" WhatsApp ")
                                ], 8, ["href"]),
                                createVNode("a", {
                                  href: `https://t.me/${unref(config).public.telegram}`,
                                  target: "_blank",
                                  class: "text-white text-decoration-none text-body-2 d-flex align-center"
                                }, [
                                  createVNode(VIcon, {
                                    size: "18",
                                    class: "mr-2",
                                    color: "info"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-send")
                                    ]),
                                    _: 1
                                  }),
                                  createTextVNode(" Telegram ")
                                ], 8, ["href"])
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "4"
                          }, {
                            default: withCtx(() => [
                              createVNode("h4", { class: "text-white font-weight-bold mb-3" }, "Menu"),
                              createVNode("div", { class: "d-flex flex-column gap-1" }, [
                                (openBlock(), createBlock(Fragment, null, renderList(navItems, (item) => {
                                  return createVNode(_component_NuxtLink, {
                                    key: item.to,
                                    to: unref(localePath)(item.to),
                                    class: "text-white text-decoration-none text-body-2",
                                    style: { "opacity": "0.8" }
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(t)(item.label)), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["to"]);
                                }), 64))
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VDivider, {
                        color: "rgba(255,255,255,0.1)",
                        class: "my-4"
                      }),
                      createVNode("p", {
                        class: "text-center text-white text-caption",
                        style: { "opacity": "0.5" }
                      }, " \xA9 " + toDisplayString((/* @__PURE__ */ new Date()).getFullYear()) + " Khiva Tour Guide. " + toDisplayString(unref(t)("footer.rights")) + ". ", 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="floating-contacts" data-v-738ec9c2${_scopeId}><a${ssrRenderAttr("href", `https://wa.me/${unref(config).public.whatsapp}`)} target="_blank" class="floating-btn whatsapp-btn" data-v-738ec9c2${_scopeId}>`);
            _push2(ssrRenderComponent(VIcon, { color: "white" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`mdi-whatsapp`);
                } else {
                  return [
                    createTextVNode("mdi-whatsapp")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</a><a${ssrRenderAttr("href", `https://t.me/${unref(config).public.telegram}`)} target="_blank" class="floating-btn telegram-btn" data-v-738ec9c2${_scopeId}>`);
            _push2(ssrRenderComponent(VIcon, { color: "white" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`mdi-send`);
                } else {
                  return [
                    createTextVNode("mdi-send")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</a></div>`);
          } else {
            return [
              createVNode(VAppBar, {
                color: "primary",
                elevation: "1",
                height: 64
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "d-flex align-center w-100 px-4" }, [
                    createVNode(_component_NuxtLink, {
                      to: unref(localePath)("/"),
                      class: "text-decoration-none d-flex align-center"
                    }, {
                      default: withCtx(() => [
                        createVNode(VIcon, {
                          color: "accent",
                          size: "28",
                          class: "mr-2"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("mdi-compass-rose")
                          ]),
                          _: 1
                        }),
                        createVNode("span", { class: "text-white font-weight-bold text-body-1 d-none d-sm-block" }, "Khiva Tour Guide")
                      ]),
                      _: 1
                    }, 8, ["to"]),
                    createVNode(VSpacer),
                    createVNode("div", { class: "d-none d-md-flex align-center gap-2" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(navItems, (item) => {
                        return createVNode(_component_NuxtLink, {
                          key: item.to,
                          to: unref(localePath)(item.to),
                          class: "text-white text-decoration-none text-body-2 px-3 py-2 nav-link"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(t)(item.label)), 1)
                          ]),
                          _: 2
                        }, 1032, ["to"]);
                      }), 64))
                    ]),
                    createVNode(VBtn, {
                      icon: "",
                      class: "ml-2",
                      onClick: ($event) => cartDrawer.value = !unref(cartDrawer)
                    }, {
                      default: withCtx(() => [
                        createVNode(VBadge, {
                          content: unref(cartStore).items.length,
                          "model-value": unref(cartStore).items.length > 0,
                          color: "cta"
                        }, {
                          default: withCtx(() => [
                            createVNode(VIcon, { color: "white" }, {
                              default: withCtx(() => [
                                createTextVNode("mdi-cart")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["content", "model-value"])
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(VMenu, null, {
                      activator: withCtx(({ props }) => [
                        createVNode(VBtn, mergeProps(props, {
                          variant: "text",
                          size: "small",
                          class: "ml-1"
                        }), {
                          default: withCtx(() => {
                            var _a;
                            return [
                              createVNode("span", { class: "text-white text-caption" }, toDisplayString((_a = unref(currentLocale)) == null ? void 0 : _a.toUpperCase()), 1),
                              createVNode(VIcon, {
                                color: "white",
                                size: "16"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("mdi-chevron-down")
                                ]),
                                _: 1
                              })
                            ];
                          }),
                          _: 1
                        }, 16)
                      ]),
                      default: withCtx(() => [
                        createVNode(VList, {
                          density: "compact",
                          rounded: "lg"
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(availableLocales), (loc) => {
                              return openBlock(), createBlock(VListItem, {
                                key: loc.code,
                                onClick: ($event) => unref(switchLocalePath)(loc.code),
                                title: loc.name,
                                value: loc.code
                              }, null, 8, ["onClick", "title", "value"]);
                            }), 128))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VBtn, {
                      icon: "",
                      class: "d-md-none ml-1",
                      onClick: ($event) => mobileDrawer.value = !unref(mobileDrawer)
                    }, {
                      default: withCtx(() => [
                        createVNode(VIcon, { color: "white" }, {
                          default: withCtx(() => [
                            createTextVNode("mdi-menu")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])
                ]),
                _: 1
              }),
              createVNode(VNavigationDrawer, {
                modelValue: unref(mobileDrawer),
                "onUpdate:modelValue": ($event) => isRef(mobileDrawer) ? mobileDrawer.value = $event : null,
                location: "right",
                temporary: "",
                color: "primary"
              }, {
                default: withCtx(() => [
                  createVNode(VList, {
                    density: "compact",
                    nav: "",
                    class: "mt-4"
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(navItems, (item) => {
                        return createVNode(VListItem, {
                          key: item.to,
                          to: unref(localePath)(item.to),
                          title: unref(t)(item.label),
                          "prepend-icon": item.icon,
                          "active-color": "accent",
                          rounded: "lg",
                          onClick: ($event) => mobileDrawer.value = false
                        }, null, 8, ["to", "title", "prepend-icon", "onClick"]);
                      }), 64))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(VNavigationDrawer, {
                modelValue: unref(cartDrawer),
                "onUpdate:modelValue": ($event) => isRef(cartDrawer) ? cartDrawer.value = $event : null,
                location: "right",
                width: "360",
                temporary: ""
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "pa-4" }, [
                    createVNode("div", { class: "d-flex align-center mb-4" }, [
                      createVNode("h3", { class: "text-h6 font-weight-bold" }, toDisplayString(unref(t)("cart.title")), 1),
                      createVNode(VSpacer),
                      createVNode(VBtn, {
                        icon: "",
                        size: "small",
                        onClick: ($event) => cartDrawer.value = false
                      }, {
                        default: withCtx(() => [
                          createVNode(VIcon, null, {
                            default: withCtx(() => [
                              createTextVNode("mdi-close")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    unref(cartStore).items.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-center py-12"
                    }, [
                      createVNode(VIcon, {
                        size: "48",
                        color: "grey-lighten-2"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("mdi-cart-outline")
                        ]),
                        _: 1
                      }),
                      createVNode("p", { class: "text-medium-emphasis mt-2" }, toDisplayString(unref(t)("cart.empty")), 1)
                    ])) : (openBlock(), createBlock("div", { key: 1 }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(cartStore).items, (item) => {
                        return openBlock(), createBlock(VCard, {
                          key: `${item.type}-${item.id}`,
                          class: "mb-3",
                          rounded: "lg",
                          variant: "outlined"
                        }, {
                          default: withCtx(() => [
                            createVNode(VCardText, { class: "pa-3" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "d-flex justify-between align-start" }, [
                                  createVNode("div", { class: "flex-grow-1 mr-2" }, [
                                    createVNode("div", { class: "text-body-2 font-weight-medium" }, toDisplayString(item.name), 1),
                                    createVNode("div", { class: "text-caption text-medium-emphasis" }, "$" + toDisplayString(item.price) + " \xD7 " + toDisplayString(item.quantity), 1)
                                  ]),
                                  createVNode("div", { class: "text-right" }, [
                                    createVNode("div", { class: "text-body-2 font-weight-bold" }, "$" + toDisplayString((item.price * item.quantity).toFixed(2)), 1),
                                    createVNode(VBtn, {
                                      icon: "",
                                      size: "x-small",
                                      variant: "text",
                                      color: "error",
                                      onClick: ($event) => unref(cartStore).removeItem(item.id, item.type)
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VIcon, { size: "16" }, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-delete")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ])
                                ])
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024);
                      }), 128)),
                      createVNode(VDivider, { class: "my-3" }),
                      createVNode("div", { class: "d-flex justify-between text-h6 font-weight-bold mb-4" }, [
                        createVNode("span", null, toDisplayString(unref(t)("cart.total")), 1),
                        createVNode("span", null, "$" + toDisplayString(unref(cartStore).total.toFixed(2)), 1)
                      ]),
                      createVNode(VBtn, {
                        to: unref(localePath)("/checkout"),
                        color: "cta",
                        block: "",
                        size: "large",
                        rounded: "lg",
                        onClick: ($event) => cartDrawer.value = false
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("cart.checkout")), 1)
                        ]),
                        _: 1
                      }, 8, ["to", "onClick"]),
                      createVNode(VBtn, {
                        variant: "text",
                        color: "error",
                        size: "small",
                        block: "",
                        class: "mt-2",
                        onClick: ($event) => unref(cartStore).clearCart()
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("cart.clear")), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]))
                  ])
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(VMain, null, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", {}, void 0, true)
                ]),
                _: 3
              }),
              createVNode(VFooter, {
                color: "primary",
                class: "pa-0 mt-12"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "w-100 pa-8" }, [
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode(VCol, {
                          cols: "12",
                          md: "4"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "d-flex align-center mb-3" }, [
                              createVNode(VIcon, {
                                color: "accent",
                                class: "mr-2"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("mdi-compass-rose")
                                ]),
                                _: 1
                              }),
                              createVNode("span", { class: "text-white font-weight-bold text-h6" }, "Khiva Tour Guide")
                            ]),
                            createVNode("p", {
                              class: "text-white text-body-2",
                              style: { "opacity": "0.7" }
                            }, toDisplayString(unref(t)("footer.description")), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          md: "4"
                        }, {
                          default: withCtx(() => [
                            createVNode("h4", { class: "text-white font-weight-bold mb-3" }, toDisplayString(unref(t)("footer.contact")), 1),
                            createVNode("div", { class: "d-flex flex-column gap-2" }, [
                              createVNode("a", {
                                href: `https://wa.me/${unref(config).public.whatsapp}`,
                                target: "_blank",
                                class: "text-white text-decoration-none text-body-2 d-flex align-center"
                              }, [
                                createVNode(VIcon, {
                                  size: "18",
                                  class: "mr-2",
                                  color: "success"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("mdi-whatsapp")
                                  ]),
                                  _: 1
                                }),
                                createTextVNode(" WhatsApp ")
                              ], 8, ["href"]),
                              createVNode("a", {
                                href: `https://t.me/${unref(config).public.telegram}`,
                                target: "_blank",
                                class: "text-white text-decoration-none text-body-2 d-flex align-center"
                              }, [
                                createVNode(VIcon, {
                                  size: "18",
                                  class: "mr-2",
                                  color: "info"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("mdi-send")
                                  ]),
                                  _: 1
                                }),
                                createTextVNode(" Telegram ")
                              ], 8, ["href"])
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          md: "4"
                        }, {
                          default: withCtx(() => [
                            createVNode("h4", { class: "text-white font-weight-bold mb-3" }, "Menu"),
                            createVNode("div", { class: "d-flex flex-column gap-1" }, [
                              (openBlock(), createBlock(Fragment, null, renderList(navItems, (item) => {
                                return createVNode(_component_NuxtLink, {
                                  key: item.to,
                                  to: unref(localePath)(item.to),
                                  class: "text-white text-decoration-none text-body-2",
                                  style: { "opacity": "0.8" }
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(t)(item.label)), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["to"]);
                              }), 64))
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VDivider, {
                      color: "rgba(255,255,255,0.1)",
                      class: "my-4"
                    }),
                    createVNode("p", {
                      class: "text-center text-white text-caption",
                      style: { "opacity": "0.5" }
                    }, " \xA9 " + toDisplayString((/* @__PURE__ */ new Date()).getFullYear()) + " Khiva Tour Guide. " + toDisplayString(unref(t)("footer.rights")) + ". ", 1)
                  ])
                ]),
                _: 1
              }),
              createVNode("div", { class: "floating-contacts" }, [
                createVNode("a", {
                  href: `https://wa.me/${unref(config).public.whatsapp}`,
                  target: "_blank",
                  class: "floating-btn whatsapp-btn"
                }, [
                  createVNode(VIcon, { color: "white" }, {
                    default: withCtx(() => [
                      createTextVNode("mdi-whatsapp")
                    ]),
                    _: 1
                  })
                ], 8, ["href"]),
                createVNode("a", {
                  href: `https://t.me/${unref(config).public.telegram}`,
                  target: "_blank",
                  class: "floating-btn telegram-btn"
                }, [
                  createVNode(VIcon, { color: "white" }, {
                    default: withCtx(() => [
                      createTextVNode("mdi-send")
                    ]),
                    _: 1
                  })
                ], 8, ["href"])
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-738ec9c2"]]);

export { _default as default };
//# sourceMappingURL=default-DmALOg5q.mjs.map
