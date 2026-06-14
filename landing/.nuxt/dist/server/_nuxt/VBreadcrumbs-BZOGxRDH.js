import { createElementVNode, normalizeStyle, normalizeClass, computed, createVNode, mergeProps, toRef, Fragment } from "vue";
import { i as useRender, k as makeComponentProps, J as useLink, u as useDimension, v as useTextColor, m as makeTagProps, Q as makeRouterProps, j as makeDimensionProps, l as useBackgroundColor, y as useDensity, t as useRounded, q as makeRoundedProps, x as makeDensityProps, a as VIcon, w as VDefaultsProvider } from "./VRow-DQkXkPiv.js";
import { l as genericComponent, p as propsFactory, Y as pick, D as provideDefaults, L as IconValue } from "../server.mjs";
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
    useRender(() => createElementVNode("li", {
      "aria-hidden": "true",
      "class": normalizeClass(["v-breadcrumbs-divider", props.class]),
      "style": normalizeStyle(props.style)
    }, [slots?.default?.() ?? props.divider]));
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
    const isActive = computed(() => props.active || link.isActive?.value);
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
        default: () => [!link.isLink.value ? slots.default?.() ?? props.title : createElementVNode("a", mergeProps({
          "class": "v-breadcrumbs-item--link",
          "onClick": link.navigate.value
        }, link.linkProps), [slots.default?.() ?? props.title])]
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
        default: () => [hasPrepend && createElementVNode("li", {
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
          let {
            item,
            raw
          } = _ref2;
          return createElementVNode(Fragment, null, [slots.item?.({
            item,
            index
          }) ?? createVNode(VBreadcrumbsItem, mergeProps({
            "key": index,
            "disabled": index >= array.length - 1
          }, typeof item === "string" ? {
            title: item
          } : item), {
            default: slots.title ? () => slots.title?.({
              item,
              index
            }) : void 0
          }), index < array.length - 1 && createVNode(VBreadcrumbsDivider, null, {
            default: slots.divider ? () => slots.divider?.({
              item: raw,
              index
            }) : void 0
          })]);
        }), slots.default?.()]
      });
    });
    return {};
  }
});
export {
  VBreadcrumbs as V
};
//# sourceMappingURL=VBreadcrumbs-BZOGxRDH.js.map
