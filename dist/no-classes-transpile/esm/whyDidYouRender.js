/**
 * @welldone-software/why-did-you-render 4.0.1
 * MIT Licensed
 * Generated by Vitali Zaidman <vzaidman@gmail.com> (https://github.com/vzaidman)
 * Generated at 2020-02-02
 */

import _get from 'lodash/get';
import _isString from 'lodash/isString';
import _reduce from 'lodash/reduce';
import _has from 'lodash/has';
import _keys from 'lodash/keys';
import _isFunction from 'lodash/isFunction';
import _isRegExp from 'lodash/isRegExp';
import _isDate from 'lodash/isDate';
import _isPlainObject from 'lodash/isPlainObject';
import _isArray from 'lodash/isArray';
import _defaults from 'lodash/defaults';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var diffTypes = {
  'different': 'different',
  'deepEquals': 'deepEquals',
  'date': 'date',
  'regex': 'regex',
  'reactElement': 'reactElement',
  'function': 'function'
}; // copied from packages/shared/ReactSymbols.js in https://github.com/facebook/react

var hasSymbol = typeof Symbol === 'function' && Symbol["for"];
var REACT_MEMO_TYPE = hasSymbol ? Symbol["for"]('react.memo') : 0xead3;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol["for"]('react.forward_ref') : 0xead0;

var _diffTypesDescription;
var moreInfoUrl = 'http://bit.ly/wdyr02';
var moreInfoHooksUrl = 'http://bit.ly/wdyr3';
var diffTypesDescriptions = (_diffTypesDescription = {}, _defineProperty(_diffTypesDescription, diffTypes.different, 'different objects.'), _defineProperty(_diffTypesDescription, diffTypes.deepEquals, 'different objects that are equal by value.'), _defineProperty(_diffTypesDescription, diffTypes.date, 'different date objects with the same value.'), _defineProperty(_diffTypesDescription, diffTypes.regex, 'different regular expressions with the same value.'), _defineProperty(_diffTypesDescription, diffTypes.reactElement, 'different React elements with the same displayName.'), _defineProperty(_diffTypesDescription, diffTypes["function"], 'different functions with the same name.'), _diffTypesDescription);
var inHotReload = false;

function shouldLog(reason, Component, options) {
  if (inHotReload) {
    return false;
  }

  if (options.logOnDifferentValues) {
    return true;
  }

  if (Component.whyDidYouRender && Component.whyDidYouRender.logOnDifferentValues) {
    return true;
  }

  var hasDifferentValues = reason.propsDifferences && reason.propsDifferences.some(function (diff) {
    return diff.diffType === diffTypes.different;
  }) || reason.stateDifferences && reason.stateDifferences.some(function (diff) {
    return diff.diffType === diffTypes.different;
  }) || reason.hookDifferences && reason.hookDifferences.some(function (diff) {
    return diff.diffType === diffTypes.different;
  });
  return !hasDifferentValues;
}

function logDifference(_ref) {
  var Component = _ref.Component,
      displayName = _ref.displayName,
      hookName = _ref.hookName,
      prefixMessage = _ref.prefixMessage,
      diffObjType = _ref.diffObjType,
      differences = _ref.differences,
      values = _ref.values,
      options = _ref.options;

  if (differences && differences.length > 0) {
    options.consoleLog(_defineProperty({}, displayName, Component), "".concat(prefixMessage, " of ").concat(diffObjType, " changes:"));
    differences.forEach(function (_ref2) {
      var pathString = _ref2.pathString,
          diffType = _ref2.diffType,
          prevValue = _ref2.prevValue,
          nextValue = _ref2.nextValue;
      options.consoleGroup("%c".concat(diffObjType === 'hook' ? "[hook ".concat(hookName, " result]") : "".concat(diffObjType, "."), "%c").concat(pathString, "%c"), "color:".concat(options.diffNameColor, ";"), "color:".concat(options.diffPathColor, ";"), 'color:default;');
      options.consoleLog("".concat(diffTypesDescriptions[diffType], " (more info at ").concat(hookName ? moreInfoHooksUrl : moreInfoUrl, ")"));
      options.consoleLog(_defineProperty({}, "prev ".concat(pathString), prevValue), '!==', _defineProperty({}, "next ".concat(pathString), nextValue));
      options.consoleGroupEnd();
    });
  } else if (differences) {
    options.consoleLog(_defineProperty({}, displayName, Component), "".concat(prefixMessage, " the ").concat(diffObjType, " object itself changed but its values are all equal."), diffObjType === 'props' ? 'This could have been avoided by making the component pure, or by preventing its father from re-rendering.' : 'This usually means this component called setState when no changes in its state actually occurred.', "More info at ".concat(moreInfoUrl));
    options.consoleLog("prev ".concat(diffObjType, ":"), values.prev, ' !== ', values.next, ":next ".concat(diffObjType));
  }
}

function defaultNotifier(updateInfo) {
  var Component = updateInfo.Component,
      displayName = updateInfo.displayName,
      hookName = updateInfo.hookName,
      prevProps = updateInfo.prevProps,
      prevState = updateInfo.prevState,
      prevHook = updateInfo.prevHook,
      nextProps = updateInfo.nextProps,
      nextState = updateInfo.nextState,
      nextHook = updateInfo.nextHook,
      reason = updateInfo.reason,
      options = updateInfo.options;

  if (!shouldLog(reason, Component, options)) {
    return;
  }

  options.consoleGroup("%c".concat(displayName), "color: ".concat(options.titleColor, ";"));
  var prefixMessage = 'Re-rendered because';

  if (reason.propsDifferences) {
    logDifference({
      Component: Component,
      displayName: displayName,
      prefixMessage: prefixMessage,
      diffObjType: 'props',
      differences: reason.propsDifferences,
      values: {
        prev: prevProps,
        next: nextProps
      },
      options: options
    });
    prefixMessage = 'And because';
  }

  if (reason.stateDifferences) {
    logDifference({
      Component: Component,
      displayName: displayName,
      prefixMessage: prefixMessage,
      diffObjType: 'state',
      differences: reason.stateDifferences,
      values: {
        prev: prevState,
        next: nextState
      },
      options: options
    });
  }

  if (reason.hookDifferences) {
    logDifference({
      Component: Component,
      displayName: displayName,
      prefixMessage: prefixMessage,
      diffObjType: 'hook',
      differences: reason.hookDifferences,
      values: {
        prev: prevHook,
        next: nextHook
      },
      hookName: hookName,
      options: options
    });
  }

  if (!reason.propsDifferences && !reason.stateDifferences && !reason.hookDifferences) {
    options.consoleLog(_defineProperty({}, displayName, Component), 'Re-rendered although props and state objects are the same.', 'This usually means there was a call to this.forceUpdate() inside the component.', "more info at ".concat(moreInfoUrl));
  }

  options.consoleGroupEnd();
}
function createDefaultNotifier(hotReloadBufferMs) {
  if (hotReloadBufferMs) {
    if (typeof module !== 'undefined' && module.hot && module.hot.addStatusHandler) {
      module.hot.addStatusHandler(function (status) {
        if (status === 'idle') {
          inHotReload = true;
          setTimeout(function () {
            inHotReload = false;
          }, hotReloadBufferMs);
        }
      });
    }
  }

  return defaultNotifier;
}

var emptyFn = function emptyFn() {};

function normalizeOptions() {
  var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var consoleGroup = console.group;
  var consoleGroupEnd = console.groupEnd;

  if (userOptions.collapseGroups) {
    consoleGroup = console.groupCollapsed;
  } else if (userOptions.onlyLogs) {
    consoleGroup = console.log;
    consoleGroupEnd = emptyFn;
  }

  var notifier = userOptions.notifier || createDefaultNotifier('hotReloadBufferMs' in userOptions ? userOptions.hotReloadBufferMs : 500);
  return _objectSpread2({
    include: null,
    exclude: null,
    notifier: notifier,
    onlyLogs: false,
    consoleLog: console.log,
    consoleGroup: consoleGroup,
    consoleGroupEnd: consoleGroupEnd,
    logOnDifferentValues: false,
    trackHooks: true,
    titleColor: '#058',
    diffNameColor: 'blue',
    diffPathColor: 'red',
    trackExtraHooks: [],
    trackAllPureComponents: false
  }, userOptions);
}

function getDisplayName(type) {
  return type.displayName || type.name || type.type && getDisplayName(type.type) || type.render && getDisplayName(type.render) || (_isString(type) ? type : undefined);
}

var hasElementType = typeof Element !== 'undefined'; // copied from https://github.com/facebook/react/packages/shared/ReactSymbols.js

var hasSymbol$1 = typeof Symbol === 'function' && Symbol["for"];
var REACT_ELEMENT_TYPE = hasSymbol$1 ? Symbol["for"]('react.element') : 0xeac7;

var isReactElement = function isReactElement(object) {
  return object.$$typeof === REACT_ELEMENT_TYPE;
}; // end


function trackDiff(a, b, diffsAccumulator, pathString, diffType) {
  diffsAccumulator.push({
    diffType: diffType,
    pathString: pathString,
    prevValue: a,
    nextValue: b
  });
  return diffType !== diffTypes.different;
}

function accumulateDeepEqualDiffs(a, b, diffsAccumulator) {
  var pathString = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

  if (a === b) {
    return true;
  }

  if (!a || !b) {
    return trackDiff(a, b, diffsAccumulator, pathString, diffTypes.different);
  }

  if (_isArray(a) && _isArray(b)) {
    var length = a.length;

    if (length !== b.length) {
      return trackDiff(a, b, diffsAccumulator, pathString, diffTypes.different);
    }

    var allChildrenDeepEqual = true;

    for (var i = length; i-- !== 0;) {
      if (!accumulateDeepEqualDiffs(a[i], b[i], diffsAccumulator, "".concat(pathString, "[").concat(i, "]"))) {
        allChildrenDeepEqual = false;
      }
    }

    return allChildrenDeepEqual ? trackDiff(a, b, diffsAccumulator, pathString, diffTypes.deepEquals) : trackDiff(a, b, diffsAccumulator, pathString, diffTypes.different);
  }

  if (_isDate(a) && _isDate(b)) {
    return a.getTime() === b.getTime() ? trackDiff(a, b, diffsAccumulator, pathString, diffTypes.date) : trackDiff(a, b, diffsAccumulator, pathString, diffTypes.different);
  }

  if (_isRegExp(a) && _isRegExp(b)) {
    return a.toString() === b.toString() ? trackDiff(a, b, diffsAccumulator, pathString, diffTypes.regex) : trackDiff(a, b, diffsAccumulator, pathString, diffTypes.different);
  }

  if (hasElementType && a instanceof Element && b instanceof Element) {
    return trackDiff(a, b, diffsAccumulator, pathString, diffTypes.different);
  }

  if (isReactElement(a) && isReactElement(b)) {
    if (a.type !== b.type) {
      return trackDiff(a, b, diffsAccumulator, pathString, diffTypes.different);
    } else {
      var reactElementPropsAreDeepEqual = accumulateDeepEqualDiffs(a.props, b.props, diffsAccumulator, "".concat(pathString, ".props"));
      return reactElementPropsAreDeepEqual ? trackDiff(a, b, diffsAccumulator, pathString, diffTypes.reactElement) : trackDiff(a, b, diffsAccumulator, pathString, diffTypes.different);
    }
  }

  if (_isFunction(a) && _isFunction(b)) {
    return a.name === b.name ? trackDiff(a, b, diffsAccumulator, pathString, diffTypes["function"]) : trackDiff(a, b, diffsAccumulator, pathString, diffTypes.different);
  }

  if (_isPlainObject(a) && _isPlainObject(b)) {
    var keys = _keys(a);

    var _length = keys.length;

    if (_length !== _keys(b).length) {
      return trackDiff(a, b, diffsAccumulator, pathString, diffTypes.different);
    }

    for (var _i = _length; _i-- !== 0;) {
      if (!_has(b, keys[_i])) {
        return trackDiff(a, b, diffsAccumulator, pathString, diffTypes.different);
      }
    }

    var _allChildrenDeepEqual = true;

    for (var _i2 = _length; _i2-- !== 0;) {
      var key = keys[_i2];

      if (!accumulateDeepEqualDiffs(a[key], b[key], diffsAccumulator, "".concat(pathString, ".").concat(key))) {
        _allChildrenDeepEqual = false;
      }
    }

    return _allChildrenDeepEqual ? trackDiff(a, b, diffsAccumulator, pathString, diffTypes.deepEquals) : trackDiff(a, b, diffsAccumulator, pathString, diffTypes.different);
  }

  return trackDiff(a, b, diffsAccumulator, pathString, diffTypes.different);
}

function calculateDeepEqualDiffs(a, b, initialPathString) {
  try {
    var diffs = [];
    accumulateDeepEqualDiffs(a, b, diffs, initialPathString);
    return diffs;
  } catch (error) {
    if (error.message && error.message.match(/stack|recursion/i) || error.number === -2146828260) {
      // warn on circular references, don't crash.
      // browsers throw different errors name and messages:
      // chrome/safari: "RangeError", "Maximum call stack size exceeded"
      // firefox: "InternalError", too much recursion"
      // edge: "Error", "Out of stack space"
      // eslint-disable-next-line no-console
      console.warn('Warning: why-did-you-render couldn\'t handle circular references in props.', error.name, error.message);
      return false;
    }

    throw error;
  }
}

var emptyObject = {};
function findObjectsDifferences(userPrevObj, userNextObj) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$shallow = _ref.shallow,
      shallow = _ref$shallow === void 0 ? true : _ref$shallow;

  if (userPrevObj === userNextObj) {
    return false;
  }

  if (!shallow) {
    return calculateDeepEqualDiffs(userPrevObj, userNextObj);
  }

  var prevObj = userPrevObj || emptyObject;
  var nextObj = userNextObj || emptyObject;
  var keysOfBothObjects = Object.keys(_objectSpread2({}, prevObj, {}, nextObj));
  return _reduce(keysOfBothObjects, function (result, key) {
    var deepEqualDiffs = calculateDeepEqualDiffs(prevObj[key], nextObj[key], key);

    if (deepEqualDiffs) {
      result = [].concat(_toConsumableArray(result), _toConsumableArray(deepEqualDiffs));
    }

    return result;
  }, []);
}

function getUpdateReason(prevProps, prevState, prevHook, nextProps, nextState, nextHook) {
  return {
    propsDifferences: findObjectsDifferences(prevProps, nextProps),
    stateDifferences: findObjectsDifferences(prevState, nextState),
    hookDifferences: findObjectsDifferences(prevHook, nextHook, {
      shallow: false
    })
  };
}

function getUpdateInfo(_ref) {
  var Component = _ref.Component,
      displayName = _ref.displayName,
      hookName = _ref.hookName,
      prevProps = _ref.prevProps,
      prevState = _ref.prevState,
      prevHook = _ref.prevHook,
      nextProps = _ref.nextProps,
      nextState = _ref.nextState,
      nextHook = _ref.nextHook,
      options = _ref.options;
  return {
    Component: Component,
    displayName: displayName,
    hookName: hookName,
    prevProps: prevProps,
    prevState: prevState,
    prevHook: prevHook,
    nextProps: nextProps,
    nextState: nextState,
    nextHook: nextHook,
    options: options,
    reason: getUpdateReason(prevProps, prevState, prevHook, nextProps, nextState, nextHook)
  };
}

// copied from https://github.com/facebook/react/blob/master/packages/react-reconciler/src/ReactTypeOfMode.js
var StrictMode = 1; // based on "findStrictRoot" from https://github.com/facebook/react/blob/master/packages/react-reconciler/src/ReactStrictModeWarnings.js
// notice: this is only used for class components. functional components doesn't re-rendered inside strict mode

function checkIfInsideAStrictModeTree(reactComponentInstance) {
  var reactInternalFiber = reactComponentInstance && reactComponentInstance._reactInternalFiber;

  while (reactInternalFiber) {
    if (reactInternalFiber.mode & StrictMode) {
      return true;
    }

    reactInternalFiber = reactInternalFiber["return"];
  }

  return false;
}
function isReactClassComponent(Component) {
  return Component.prototype && !!Component.prototype.isReactComponent;
}
function isMemoComponent(Component) {
  return Component.$$typeof === REACT_MEMO_TYPE;
}
function isForwardRefComponent(Component) {
  return Component.$$typeof === REACT_FORWARD_REF_TYPE;
}

function shouldInclude(displayName, options) {
  return options.include && options.include.length > 0 && options.include.some(function (regex) {
    return regex.test(displayName);
  });
}

function shouldExclude(displayName, options) {
  return options.exclude && options.exclude.length > 0 && options.exclude.some(function (regex) {
    return regex.test(displayName);
  });
}

function shouldTrack(_ref) {
  var Component = _ref.Component,
      displayName = _ref.displayName,
      options = _ref.options,
      React = _ref.React,
      isHookChange = _ref.isHookChange;

  if (shouldExclude(displayName, options)) {
    return false;
  }

  if (Component.whyDidYouRender === false) {
    return false;
  }

  if (isHookChange && Component.whyDidYouRender && Component.whyDidYouRender.trackHooks === false) {
    return false;
  }

  return !!(Component.whyDidYouRender || options.trackAllPureComponents && (Component && Component.prototype instanceof React.PureComponent || isMemoComponent(Component)) || shouldInclude(displayName, options));
}

function patchClassComponent(ClassComponent, displayName, React, options) {
  class WDYRPatchedClassComponent extends ClassComponent {
    constructor(props, context) {
      var _this;

      super(props, context);
      _this = this;
      this._WDYR = {
        renderNumber: 0
      };
      var origRender = super.render || this.render; // this probably means render is an arrow function or this.render.bind(this) was called on the original class

      var renderIsABindedFunction = origRender !== ClassComponent.prototype.render;

      if (renderIsABindedFunction) {
        this.render = function () {
          WDYRPatchedClassComponent.prototype.render.apply(_this);
          return origRender();
        };
      }
    }

    render() {
      this._WDYR.renderNumber++;

      if (!('isStrictMode' in this._WDYR)) {
        this._WDYR.isStrictMode = checkIfInsideAStrictModeTree(this);
      } // in strict mode- ignore every other render


      if (!(this._WDYR.isStrictMode && this._WDYR.renderNumber % 2 === 1)) {
        if (this._WDYR.prevProps) {
          options.notifier(getUpdateInfo({
            Component: ClassComponent,
            displayName: displayName,
            prevProps: this._WDYR.prevProps,
            prevState: this._WDYR.prevState,
            nextProps: this.props,
            nextState: this.state,
            options: options
          }));
        }

        this._WDYR.prevProps = this.props;
        this._WDYR.prevState = this.state;
      }

      return super.render ? super.render() : null;
    }

  }

  try {
    WDYRPatchedClassComponent.displayName = displayName;
  } catch (e) {// not crucial if displayName couldn't be set
  }

  _defaults(WDYRPatchedClassComponent, ClassComponent);

  return WDYRPatchedClassComponent;
}

var getFunctionalComponentFromStringComponent = function getFunctionalComponentFromStringComponent(componentTypeStr, React) {
  return function (props) {
    return React.createElement(componentTypeStr, props);
  };
};

function patchFunctionalOrStrComponent(FunctionalOrStringComponent, isPure, displayName, React, options) {
  var FunctionalComponent = typeof FunctionalOrStringComponent === 'string' ? getFunctionalComponentFromStringComponent(FunctionalOrStringComponent, React) : FunctionalOrStringComponent;

  function WDYRFunctionalComponent() {
    var nextProps = arguments[0];
    var ref = React.useRef();
    var prevProps = ref.current;
    ref.current = nextProps;

    if (prevProps) {
      var updateInfo = getUpdateInfo({
        Component: FunctionalComponent,
        displayName: displayName,
        prevProps: prevProps,
        nextProps: nextProps,
        options: options
      });
      var shouldNotify = updateInfo.reason.propsDifferences && !(isPure && updateInfo.reason.propsDifferences.length === 0);

      if (shouldNotify) {
        options.notifier(updateInfo);
      }
    }

    return FunctionalComponent.apply(void 0, arguments);
  }

  try {
    WDYRFunctionalComponent.displayName = displayName;
  } catch (e) {// not crucial if displayName couldn't be set
  }

  WDYRFunctionalComponent.ComponentForHooksTracking = FunctionalComponent;

  _defaults(WDYRFunctionalComponent, FunctionalComponent);

  return WDYRFunctionalComponent;
}

function patchMemoComponent(MemoComponent, displayName, React, options) {
  var InnerMemoComponent = MemoComponent.type;
  var isInnerMemoComponentAClassComponent = isReactClassComponent(InnerMemoComponent);
  var isInnerMemoComponentForwardRefs = isForwardRefComponent(InnerMemoComponent);
  var WrappedFunctionalComponent = isInnerMemoComponentForwardRefs ? InnerMemoComponent.render : InnerMemoComponent;
  var PatchedInnerComponent = isInnerMemoComponentAClassComponent ? patchClassComponent(WrappedFunctionalComponent, displayName, React, options) : patchFunctionalOrStrComponent(WrappedFunctionalComponent, true, displayName, React, options);

  try {
    PatchedInnerComponent.displayName = getDisplayName(WrappedFunctionalComponent);
  } catch (e) {// not crucial if displayName couldn't be set
  }

  PatchedInnerComponent.ComponentForHooksTracking = MemoComponent;

  _defaults(PatchedInnerComponent, WrappedFunctionalComponent);

  var WDYRMemoizedFunctionalComponent = React.memo(isInnerMemoComponentForwardRefs ? React.forwardRef(PatchedInnerComponent) : PatchedInnerComponent, MemoComponent.compare);

  try {
    WDYRMemoizedFunctionalComponent.displayName = displayName;
  } catch (e) {// not crucial if displayName couldn't be set
  }

  _defaults(WDYRMemoizedFunctionalComponent, MemoComponent);

  return WDYRMemoizedFunctionalComponent;
}

function patchForwardRefComponent(ForwardRefComponent, displayName, React, options) {
  var InnerForwardRefComponent = ForwardRefComponent.render;
  var isInnerComponentMemoized = isMemoComponent(InnerForwardRefComponent);
  var WrappedFunctionalComponent = isInnerComponentMemoized ? InnerForwardRefComponent.type : InnerForwardRefComponent;
  var WDYRWrappedByReactForwardRefFunctionalComponent = patchFunctionalOrStrComponent(WrappedFunctionalComponent, isInnerComponentMemoized, displayName, React, options);
  WDYRWrappedByReactForwardRefFunctionalComponent.displayName = getDisplayName(WrappedFunctionalComponent);
  WDYRWrappedByReactForwardRefFunctionalComponent.ComponentForHooksTracking = WrappedFunctionalComponent;

  _defaults(WDYRWrappedByReactForwardRefFunctionalComponent, WrappedFunctionalComponent);

  var WDYRForwardRefFunctionalComponent = React.forwardRef(isInnerComponentMemoized ? React.memo(WDYRWrappedByReactForwardRefFunctionalComponent, InnerForwardRefComponent.compare) : WDYRWrappedByReactForwardRefFunctionalComponent);

  try {
    WDYRForwardRefFunctionalComponent.displayName = displayName;
  } catch (e) {// not crucial if displayName couldn't be set
  }

  _defaults(WDYRForwardRefFunctionalComponent, ForwardRefComponent);

  return WDYRForwardRefFunctionalComponent;
}

function trackHookChanges(hookName, _ref, hookResult, React, options) {
  var hookPath = _ref.path;
  var ComponentHookDispatchedFromInstance = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner.current;
  var prevHookResultRef = React.useRef();

  if (!ComponentHookDispatchedFromInstance) {
    return hookResult;
  }

  var Component = ComponentHookDispatchedFromInstance.type.ComponentForHooksTracking || ComponentHookDispatchedFromInstance.type;
  var displayName = getDisplayName(Component);
  var isShouldTrack = shouldTrack({
    Component: Component,
    displayName: displayName,
    options: options,
    React: React,
    isHookChange: true
  });

  if (!isShouldTrack) {
    return hookResult;
  }

  var prevHookResult = prevHookResultRef.current;
  prevHookResultRef.current = hookResult;

  if (prevHookResult) {
    var notification = getUpdateInfo({
      Component: Component,
      displayName: displayName,
      hookName: hookName,
      prevHook: hookPath ? _get(prevHookResult, hookPath) : prevHookResult,
      nextHook: hookPath ? _get(hookResult, hookPath) : hookResult,
      options: options
    });

    if (notification.reason.hookDifferences) {
      options.notifier(notification);
    }
  }

  return hookResult;
}

function createPatchedComponent(componentsMap, Component, displayName, React, options) {
  if (isMemoComponent(Component)) {
    return patchMemoComponent(Component, displayName, React, options);
  }

  if (isForwardRefComponent(Component)) {
    return patchForwardRefComponent(Component, displayName, React, options);
  }

  if (isReactClassComponent(Component)) {
    return patchClassComponent(Component, displayName, React, options);
  }

  return patchFunctionalOrStrComponent(Component, false, displayName, React, options);
}

function getPatchedComponent(componentsMap, Component, displayName, React, options) {
  if (componentsMap.has(Component)) {
    return componentsMap.get(Component);
  }

  var WDYRPatchedComponent = createPatchedComponent(componentsMap, Component, displayName, React, options);
  componentsMap.set(Component, WDYRPatchedComponent);
  return WDYRPatchedComponent;
}

var hooksConfig = {
  useState: {
    path: '0'
  },
  useReducer: {
    path: '0'
  },
  useContext: true,
  useMemo: true
};
function whyDidYouRender(React, userOptions) {
  var options = normalizeOptions(userOptions);
  var origCreateElement = React.createElement;
  var origCreateFactory = React.createFactory;
  var componentsMap = new WeakMap();

  React.createElement = function (componentNameOrComponent) {
    var isShouldTrack = null;
    var displayName = null;
    var WDYRPatchedComponent = null;

    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    try {
      isShouldTrack = (typeof componentNameOrComponent === 'function' || isMemoComponent(componentNameOrComponent) || isForwardRefComponent(componentNameOrComponent)) && shouldTrack({
        Component: componentNameOrComponent,
        displayName: getDisplayName(componentNameOrComponent),
        React: React,
        options: options
      });

      if (isShouldTrack) {
        displayName = componentNameOrComponent && componentNameOrComponent.whyDidYouRender && componentNameOrComponent.whyDidYouRender.customName || getDisplayName(componentNameOrComponent);
        WDYRPatchedComponent = getPatchedComponent(componentsMap, componentNameOrComponent, displayName, React, options);
        return origCreateElement.apply(React, [WDYRPatchedComponent].concat(rest));
      }
    } catch (e) {
      options.consoleLog('whyDidYouRender error. Please file a bug at https://github.com/welldone-software/why-did-you-render/issues.', {
        errorInfo: {
          error: e,
          componentNameOrComponent: componentNameOrComponent,
          rest: rest,
          options: options,
          isShouldTrack: isShouldTrack,
          displayName: displayName,
          WDYRPatchedComponent: WDYRPatchedComponent
        }
      });
    }

    return origCreateElement.apply(React, [componentNameOrComponent].concat(rest));
  };

  Object.assign(React.createElement, origCreateElement);

  React.createFactory = function (type) {
    var factory = React.createElement.bind(null, type);
    factory.type = type;
    return factory;
  };

  Object.assign(React.createFactory, origCreateFactory);

  if (options.trackHooks) {
    var nativeHooks = Object.entries(hooksConfig).map(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          hookName = _ref3[0],
          hookTrackingConfig = _ref3[1];

      return [React, hookName, hookTrackingConfig];
    });
    var hooksToTrack = [].concat(_toConsumableArray(nativeHooks), _toConsumableArray(options.trackExtraHooks));
    hooksToTrack.forEach(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 3),
          hookParent = _ref5[0],
          hookName = _ref5[1],
          _ref5$ = _ref5[2],
          hookTrackingConfig = _ref5$ === void 0 ? {} : _ref5$;

      var originalHook = hookParent[hookName];
      var newHookName = hookName[0].toUpperCase() + hookName.slice(1);

      var newHook = function newHook() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        var hookResult = originalHook.call.apply(originalHook, [this].concat(args));
        trackHookChanges(hookName, hookTrackingConfig, hookResult, React, options);
        return hookResult;
      };

      Object.defineProperty(newHook, 'name', {
        value: newHookName,
        writable: false
      });
      Object.assign(newHook, {
        originalHook: originalHook
      });
      hookParent[hookName] = newHook;
    });
  }

  React.__REVERT_WHY_DID_YOU_RENDER__ = function () {
    Object.assign(React, {
      createElement: origCreateElement,
      createFactory: origCreateFactory
    });
    componentsMap = null;
    var hooksToRevert = [].concat(_toConsumableArray(Object.keys(hooksConfig).map(function (hookName) {
      return [React, hookName];
    })), _toConsumableArray(options.trackExtraHooks));
    hooksToRevert.forEach(function (_ref6) {
      var _ref7 = _slicedToArray(_ref6, 2),
          hookParent = _ref7[0],
          hookName = _ref7[1];

      if (hookParent[hookName].originalHook) {
        hookParent[hookName] = hookParent[hookName].originalHook;
      }
    });
    delete React.__REVERT_WHY_DID_YOU_RENDER__;
  };

  return React;
}

whyDidYouRender.defaultNotifier = defaultNotifier;

export default whyDidYouRender;
