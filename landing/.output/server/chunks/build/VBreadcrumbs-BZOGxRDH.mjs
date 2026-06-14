import { toRef, computed, createVNode, normalizeStyle, normalizeClass, createElementVNode, Fragment, mergeProps } from 'vue';
import { F as useBackgroundColor, j as useDensity, p as useRounded, u as useRender, d as VIcon, s as VDefaultsProvider, Q as useLink, k as useDimension, q as useTextColor, w as makeTagProps, x as makeRoundedProps, C as makeDensityProps, m as makeComponentProps, U as makeRouterProps, B as makeDimensionProps } from './VRow-DQkXkPiv.mjs';
import { l as genericComponent, D as provideDefaults, p as propsFactory, L as IconValue, Y as pick } from './server.mjs';

const makeVBreadcrumbsDividerProps = propsFactory({
  divider: [Number, String],
  ...makeComponentProps()
}, "VBreadcrumbsDivider");
const VBreadcrumbsDivider = genericComponent()({
  name: "VBreadcrumbsDivider",
  props: makeVBreadcrumbsDividerProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      var _a, _b;
      return createElementVNode("li", {
        "aria-hidden": "true",
        "class": normalizeClass(["v-breadcrumbs-divider", props.class]),
        "style": normalizeStyle(props.style)
      }, [(_b = (_a = slots == null ? void 0 : slots.default) == null ? void 0 : _a.call(slots)) != null ? _b : props.divider]);
    });
    return {};
  }
});
const makeVBreadcrumbsItemProps = propsFactory({
  active: Boolean,
  activeClass: String,
  activeColor: String,
  color: String,
  disabled: Boolean,
  title: String,
  ...makeComponentProps(),
  ...pick(makeDimensionProps(), ["width", "maxWidth"]),
  ...makeRouterProps(),
  ...makeTagProps({
    tag: "li"
  })
}, "VBreadcrumbsItem");
const VBreadcrumbsItem = genericComponent()({
  name: "VBreadcrumbsItem",
  props: makeVBreadcrumbsItemProps(),
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const link = useLink(props, attrs);
    const isActive = computed(() => {
      var _a;
      return props.active || ((_a = link.isActive) == null ? void 0 : _a.value);
    });
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => isActive.value ? props.activeColor : props.color);
    useRender(() => {
      return createVNode(props.tag, {
        "class": normalizeClass(["v-breadcrumbs-item", {
          "v-breadcrumbs-item--active": isActive.value,
          "v-breadcrumbs-item--disabled": props.disabled,
          [`${props.activeClass}`]: isActive.value && props.activeClass
        }, textColorClasses.value, props.class]),
        "style": normalizeStyle([textColorStyles.value, dimensionStyles.value, props.style]),
        "aria-current": isActive.value ? "page" : void 0
      }, {
        default: () => {
          var _a, _b, _c, _d;
          return [!link.isLink.value ? (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) != null ? _b : props.title : createElementVNode("a", mergeProps({
            "class": "v-breadcrumbs-item--link",
            "onClick": link.navigate.value
          }, link.linkProps), [(_d = (_c = slots.default) == null ? void 0 : _c.call(slots)) != null ? _d : props.title])];
        }
      });
    });
    return {};
  }
});
const makeVBreadcrumbsProps = propsFactory({
  activeClass: String,
  activeColor: String,
  bgColor: String,
  color: String,
  disabled: Boolean,
  divider: {
    type: String,
    default: "/"
  },
  icon: IconValue,
  items: {
    type: Array,
    default: () => []
  },
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeRoundedProps(),
  ...makeTagProps({
    tag: "ul"
  })
}, "VBreadcrumbs");
const VBreadcrumbs = genericComponent()({
  name: "VBreadcrumbs",
  props: makeVBreadcrumbsProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.bgColor);
    const {
      densityClasses
    } = useDensity(props);
    const {
      roundedClasses
    } = useRounded(props);
    provideDefaults({
      VBreadcrumbsDivider: {
        divider: toRef(() => props.divider)
      },
      VBreadcrumbsItem: {
        activeClass: toRef(() => props.activeClass),
        activeColor: toRef(() => props.activeColor),
        color: toRef(() => props.color),
        disabled: toRef(() => props.disabled)
      }
    });
    const items = computed(() => props.items.map((item) => {
      return typeof item === "string" ? {
        item: {
          title: item
        },
        raw: item
      } : {
        item,
        raw: item
      };
    }));
    useRender(() => {
      const hasPrepend = !!(slots.prepend || props.icon);
      return createVNode(props.tag, {
        "class": normalizeClass(["v-breadcrumbs", backgroundColorClasses.value, densityClasses.value, roundedClasses.value, props.class]),
        "style": normalizeStyle([backgroundColorStyles.value, props.style])
      }, {
        default: () => {
          var _a;
          return [hasPrepend && createElementVNode("li", {
            "key": "prepend",
            "class": "v-breadcrumbs__prepend"
          }, [!slots.prepend ? createVNode(VIcon, {
            "key": "prepend-icon",
            "start": true,
            "icon": props.icon
          }, null) : createVNode(VDefaultsProvider, {
            "key": "prepend-defaults",
            "disabled": !props.icon,
            "defaults": {
              VIcon: {
                icon: props.icon,
                start: true
              }
            }
          }, slots.prepend)]), items.value.map((_ref2, index, array) => {
            var _a2, _b;
            let {
              item,
              raw
            } = _ref2;
            return createElementVNode(Fragment, null, [(_b = (_a2 = slots.item) == null ? void 0 : _a2.call(slots, {
              item,
              index
            })) != null ? _b : createVNode(VBreadcrumbsItem, mergeProps({
              "key": index,
              "disabled": index >= array.length - 1
            }, typeof item === "string" ? {
              title: item
            } : item), {
              default: slots.title ? () => {
                var _a3;
                return (_a3 = slots.title) == null ? void 0 : _a3.call(slots, {
                  item,
                  index
                });
              } : void 0
            }), index < array.length - 1 && createVNode(VBreadcrumbsDivider, null, {
              default: slots.divider ? () => {
                var _a3;
                return (_a3 = slots.divider) == null ? void 0 : _a3.call(slots, {
                  item: raw,
                  index
                });
              } : void 0
            })]);
          }), (_a = slots.default) == null ? void 0 : _a.call(slots)];
        }
      });
    });
    return {};
  }
});

export { VBreadcrumbs as V };
//# sourceMappingURL=VBreadcrumbs-BZOGxRDH.mjs.map
