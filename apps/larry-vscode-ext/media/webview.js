"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __typeError = (msg) => {
    throw TypeError(msg);
  };
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
  var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
  var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
  var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
  var __privateWrapper = (obj, member, setter, getter) => ({
    set _(value) {
      __privateSet(obj, member, value, setter);
    },
    get _() {
      return __privateGet(obj, member, getter);
    }
  });

  // apps/larry-vscode-ext/node_modules/preact/dist/preact.module.js
  var preact_module_exports = {};
  __export(preact_module_exports, {
    Component: () => x,
    Fragment: () => k,
    cloneElement: () => K,
    createContext: () => Q,
    createElement: () => _,
    createRef: () => b,
    h: () => _,
    hydrate: () => J,
    isValidElement: () => t,
    options: () => l,
    render: () => G,
    toChildArray: () => H
  });
  function d(n3, l6) {
    for (var u5 in l6) n3[u5] = l6[u5];
    return n3;
  }
  function g(n3) {
    n3 && n3.parentNode && n3.parentNode.removeChild(n3);
  }
  function _(l6, u5, t4) {
    var i5, r4, o4, e4 = {};
    for (o4 in u5) "key" == o4 ? i5 = u5[o4] : "ref" == o4 ? r4 = u5[o4] : e4[o4] = u5[o4];
    if (arguments.length > 2 && (e4.children = arguments.length > 3 ? n.call(arguments, 2) : t4), "function" == typeof l6 && null != l6.defaultProps) for (o4 in l6.defaultProps) void 0 === e4[o4] && (e4[o4] = l6.defaultProps[o4]);
    return m(l6, e4, i5, r4, null);
  }
  function m(n3, t4, i5, r4, o4) {
    var e4 = { type: n3, props: t4, key: i5, ref: r4, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o4 ? ++u : o4, __i: -1, __u: 0 };
    return null == o4 && null != l.vnode && l.vnode(e4), e4;
  }
  function b() {
    return { current: null };
  }
  function k(n3) {
    return n3.children;
  }
  function x(n3, l6) {
    this.props = n3, this.context = l6;
  }
  function S(n3, l6) {
    if (null == l6) return n3.__ ? S(n3.__, n3.__i + 1) : null;
    for (var u5; l6 < n3.__k.length; l6++) if (null != (u5 = n3.__k[l6]) && null != u5.__e) return u5.__e;
    return "function" == typeof n3.type ? S(n3) : null;
  }
  function C(n3) {
    var l6, u5;
    if (null != (n3 = n3.__) && null != n3.__c) {
      for (n3.__e = n3.__c.base = null, l6 = 0; l6 < n3.__k.length; l6++) if (null != (u5 = n3.__k[l6]) && null != u5.__e) {
        n3.__e = n3.__c.base = u5.__e;
        break;
      }
      return C(n3);
    }
  }
  function M(n3) {
    (!n3.__d && (n3.__d = true) && i.push(n3) && !$.__r++ || r != l.debounceRendering) && ((r = l.debounceRendering) || o)($);
  }
  function $() {
    for (var n3, u5, t4, r4, o4, f5, c4, s4 = 1; i.length; ) i.length > s4 && i.sort(e), n3 = i.shift(), s4 = i.length, n3.__d && (t4 = void 0, r4 = void 0, o4 = (r4 = (u5 = n3).__v).__e, f5 = [], c4 = [], u5.__P && ((t4 = d({}, r4)).__v = r4.__v + 1, l.vnode && l.vnode(t4), O(u5.__P, t4, r4, u5.__n, u5.__P.namespaceURI, 32 & r4.__u ? [o4] : null, f5, null == o4 ? S(r4) : o4, !!(32 & r4.__u), c4), t4.__v = r4.__v, t4.__.__k[t4.__i] = t4, N(f5, t4, c4), r4.__e = r4.__ = null, t4.__e != o4 && C(t4)));
    $.__r = 0;
  }
  function I(n3, l6, u5, t4, i5, r4, o4, e4, f5, c4, s4) {
    var a4, h5, y5, w5, d5, g4, _5, m5 = t4 && t4.__k || v, b4 = l6.length;
    for (f5 = P(u5, l6, m5, f5, b4), a4 = 0; a4 < b4; a4++) null != (y5 = u5.__k[a4]) && (h5 = -1 == y5.__i ? p : m5[y5.__i] || p, y5.__i = a4, g4 = O(n3, y5, h5, i5, r4, o4, e4, f5, c4, s4), w5 = y5.__e, y5.ref && h5.ref != y5.ref && (h5.ref && B(h5.ref, null, y5), s4.push(y5.ref, y5.__c || w5, y5)), null == d5 && null != w5 && (d5 = w5), (_5 = !!(4 & y5.__u)) || h5.__k === y5.__k ? f5 = A(y5, f5, n3, _5) : "function" == typeof y5.type && void 0 !== g4 ? f5 = g4 : w5 && (f5 = w5.nextSibling), y5.__u &= -7);
    return u5.__e = d5, f5;
  }
  function P(n3, l6, u5, t4, i5) {
    var r4, o4, e4, f5, c4, s4 = u5.length, a4 = s4, h5 = 0;
    for (n3.__k = new Array(i5), r4 = 0; r4 < i5; r4++) null != (o4 = l6[r4]) && "boolean" != typeof o4 && "function" != typeof o4 ? (f5 = r4 + h5, (o4 = n3.__k[r4] = "string" == typeof o4 || "number" == typeof o4 || "bigint" == typeof o4 || o4.constructor == String ? m(null, o4, null, null, null) : w(o4) ? m(k, { children: o4 }, null, null, null) : null == o4.constructor && o4.__b > 0 ? m(o4.type, o4.props, o4.key, o4.ref ? o4.ref : null, o4.__v) : o4).__ = n3, o4.__b = n3.__b + 1, e4 = null, -1 != (c4 = o4.__i = L(o4, u5, f5, a4)) && (a4--, (e4 = u5[c4]) && (e4.__u |= 2)), null == e4 || null == e4.__v ? (-1 == c4 && (i5 > s4 ? h5-- : i5 < s4 && h5++), "function" != typeof o4.type && (o4.__u |= 4)) : c4 != f5 && (c4 == f5 - 1 ? h5-- : c4 == f5 + 1 ? h5++ : (c4 > f5 ? h5-- : h5++, o4.__u |= 4))) : n3.__k[r4] = null;
    if (a4) for (r4 = 0; r4 < s4; r4++) null != (e4 = u5[r4]) && 0 == (2 & e4.__u) && (e4.__e == t4 && (t4 = S(e4)), D(e4, e4));
    return t4;
  }
  function A(n3, l6, u5, t4) {
    var i5, r4;
    if ("function" == typeof n3.type) {
      for (i5 = n3.__k, r4 = 0; i5 && r4 < i5.length; r4++) i5[r4] && (i5[r4].__ = n3, l6 = A(i5[r4], l6, u5, t4));
      return l6;
    }
    n3.__e != l6 && (t4 && (l6 && n3.type && !l6.parentNode && (l6 = S(n3)), u5.insertBefore(n3.__e, l6 || null)), l6 = n3.__e);
    do {
      l6 = l6 && l6.nextSibling;
    } while (null != l6 && 8 == l6.nodeType);
    return l6;
  }
  function H(n3, l6) {
    return l6 = l6 || [], null == n3 || "boolean" == typeof n3 || (w(n3) ? n3.some(function(n4) {
      H(n4, l6);
    }) : l6.push(n3)), l6;
  }
  function L(n3, l6, u5, t4) {
    var i5, r4, o4, e4 = n3.key, f5 = n3.type, c4 = l6[u5], s4 = null != c4 && 0 == (2 & c4.__u);
    if (null === c4 && null == n3.key || s4 && e4 == c4.key && f5 == c4.type) return u5;
    if (t4 > (s4 ? 1 : 0)) {
      for (i5 = u5 - 1, r4 = u5 + 1; i5 >= 0 || r4 < l6.length; ) if (null != (c4 = l6[o4 = i5 >= 0 ? i5-- : r4++]) && 0 == (2 & c4.__u) && e4 == c4.key && f5 == c4.type) return o4;
    }
    return -1;
  }
  function T(n3, l6, u5) {
    "-" == l6[0] ? n3.setProperty(l6, null == u5 ? "" : u5) : n3[l6] = null == u5 ? "" : "number" != typeof u5 || y.test(l6) ? u5 : u5 + "px";
  }
  function j(n3, l6, u5, t4, i5) {
    var r4, o4;
    n: if ("style" == l6) if ("string" == typeof u5) n3.style.cssText = u5;
    else {
      if ("string" == typeof t4 && (n3.style.cssText = t4 = ""), t4) for (l6 in t4) u5 && l6 in u5 || T(n3.style, l6, "");
      if (u5) for (l6 in u5) t4 && u5[l6] == t4[l6] || T(n3.style, l6, u5[l6]);
    }
    else if ("o" == l6[0] && "n" == l6[1]) r4 = l6 != (l6 = l6.replace(f, "$1")), o4 = l6.toLowerCase(), l6 = o4 in n3 || "onFocusOut" == l6 || "onFocusIn" == l6 ? o4.slice(2) : l6.slice(2), n3.l || (n3.l = {}), n3.l[l6 + r4] = u5, u5 ? t4 ? u5.u = t4.u : (u5.u = c, n3.addEventListener(l6, r4 ? a : s, r4)) : n3.removeEventListener(l6, r4 ? a : s, r4);
    else {
      if ("http://www.w3.org/2000/svg" == i5) l6 = l6.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != l6 && "height" != l6 && "href" != l6 && "list" != l6 && "form" != l6 && "tabIndex" != l6 && "download" != l6 && "rowSpan" != l6 && "colSpan" != l6 && "role" != l6 && "popover" != l6 && l6 in n3) try {
        n3[l6] = null == u5 ? "" : u5;
        break n;
      } catch (n4) {
      }
      "function" == typeof u5 || (null == u5 || false === u5 && "-" != l6[4] ? n3.removeAttribute(l6) : n3.setAttribute(l6, "popover" == l6 && 1 == u5 ? "" : u5));
    }
  }
  function F(n3) {
    return function(u5) {
      if (this.l) {
        var t4 = this.l[u5.type + n3];
        if (null == u5.t) u5.t = c++;
        else if (u5.t < t4.u) return;
        return t4(l.event ? l.event(u5) : u5);
      }
    };
  }
  function O(n3, u5, t4, i5, r4, o4, e4, f5, c4, s4) {
    var a4, h5, p4, v5, y5, _5, m5, b4, S4, C5, M4, $4, P5, A4, H4, L4, T4, j5 = u5.type;
    if (null != u5.constructor) return null;
    128 & t4.__u && (c4 = !!(32 & t4.__u), o4 = [f5 = u5.__e = t4.__e]), (a4 = l.__b) && a4(u5);
    n: if ("function" == typeof j5) try {
      if (b4 = u5.props, S4 = "prototype" in j5 && j5.prototype.render, C5 = (a4 = j5.contextType) && i5[a4.__c], M4 = a4 ? C5 ? C5.props.value : a4.__ : i5, t4.__c ? m5 = (h5 = u5.__c = t4.__c).__ = h5.__E : (S4 ? u5.__c = h5 = new j5(b4, M4) : (u5.__c = h5 = new x(b4, M4), h5.constructor = j5, h5.render = E), C5 && C5.sub(h5), h5.props = b4, h5.state || (h5.state = {}), h5.context = M4, h5.__n = i5, p4 = h5.__d = true, h5.__h = [], h5._sb = []), S4 && null == h5.__s && (h5.__s = h5.state), S4 && null != j5.getDerivedStateFromProps && (h5.__s == h5.state && (h5.__s = d({}, h5.__s)), d(h5.__s, j5.getDerivedStateFromProps(b4, h5.__s))), v5 = h5.props, y5 = h5.state, h5.__v = u5, p4) S4 && null == j5.getDerivedStateFromProps && null != h5.componentWillMount && h5.componentWillMount(), S4 && null != h5.componentDidMount && h5.__h.push(h5.componentDidMount);
      else {
        if (S4 && null == j5.getDerivedStateFromProps && b4 !== v5 && null != h5.componentWillReceiveProps && h5.componentWillReceiveProps(b4, M4), !h5.__e && null != h5.shouldComponentUpdate && false === h5.shouldComponentUpdate(b4, h5.__s, M4) || u5.__v == t4.__v) {
          for (u5.__v != t4.__v && (h5.props = b4, h5.state = h5.__s, h5.__d = false), u5.__e = t4.__e, u5.__k = t4.__k, u5.__k.some(function(n4) {
            n4 && (n4.__ = u5);
          }), $4 = 0; $4 < h5._sb.length; $4++) h5.__h.push(h5._sb[$4]);
          h5._sb = [], h5.__h.length && e4.push(h5);
          break n;
        }
        null != h5.componentWillUpdate && h5.componentWillUpdate(b4, h5.__s, M4), S4 && null != h5.componentDidUpdate && h5.__h.push(function() {
          h5.componentDidUpdate(v5, y5, _5);
        });
      }
      if (h5.context = M4, h5.props = b4, h5.__P = n3, h5.__e = false, P5 = l.__r, A4 = 0, S4) {
        for (h5.state = h5.__s, h5.__d = false, P5 && P5(u5), a4 = h5.render(h5.props, h5.state, h5.context), H4 = 0; H4 < h5._sb.length; H4++) h5.__h.push(h5._sb[H4]);
        h5._sb = [];
      } else do {
        h5.__d = false, P5 && P5(u5), a4 = h5.render(h5.props, h5.state, h5.context), h5.state = h5.__s;
      } while (h5.__d && ++A4 < 25);
      h5.state = h5.__s, null != h5.getChildContext && (i5 = d(d({}, i5), h5.getChildContext())), S4 && !p4 && null != h5.getSnapshotBeforeUpdate && (_5 = h5.getSnapshotBeforeUpdate(v5, y5)), L4 = a4, null != a4 && a4.type === k && null == a4.key && (L4 = V(a4.props.children)), f5 = I(n3, w(L4) ? L4 : [L4], u5, t4, i5, r4, o4, e4, f5, c4, s4), h5.base = u5.__e, u5.__u &= -161, h5.__h.length && e4.push(h5), m5 && (h5.__E = h5.__ = null);
    } catch (n4) {
      if (u5.__v = null, c4 || null != o4) if (n4.then) {
        for (u5.__u |= c4 ? 160 : 128; f5 && 8 == f5.nodeType && f5.nextSibling; ) f5 = f5.nextSibling;
        o4[o4.indexOf(f5)] = null, u5.__e = f5;
      } else {
        for (T4 = o4.length; T4--; ) g(o4[T4]);
        z(u5);
      }
      else u5.__e = t4.__e, u5.__k = t4.__k, n4.then || z(u5);
      l.__e(n4, u5, t4);
    }
    else null == o4 && u5.__v == t4.__v ? (u5.__k = t4.__k, u5.__e = t4.__e) : f5 = u5.__e = q(t4.__e, u5, t4, i5, r4, o4, e4, c4, s4);
    return (a4 = l.diffed) && a4(u5), 128 & u5.__u ? void 0 : f5;
  }
  function z(n3) {
    n3 && n3.__c && (n3.__c.__e = true), n3 && n3.__k && n3.__k.forEach(z);
  }
  function N(n3, u5, t4) {
    for (var i5 = 0; i5 < t4.length; i5++) B(t4[i5], t4[++i5], t4[++i5]);
    l.__c && l.__c(u5, n3), n3.some(function(u6) {
      try {
        n3 = u6.__h, u6.__h = [], n3.some(function(n4) {
          n4.call(u6);
        });
      } catch (n4) {
        l.__e(n4, u6.__v);
      }
    });
  }
  function V(n3) {
    return "object" != typeof n3 || null == n3 || n3.__b && n3.__b > 0 ? n3 : w(n3) ? n3.map(V) : d({}, n3);
  }
  function q(u5, t4, i5, r4, o4, e4, f5, c4, s4) {
    var a4, h5, v5, y5, d5, _5, m5, b4 = i5.props, k4 = t4.props, x4 = t4.type;
    if ("svg" == x4 ? o4 = "http://www.w3.org/2000/svg" : "math" == x4 ? o4 = "http://www.w3.org/1998/Math/MathML" : o4 || (o4 = "http://www.w3.org/1999/xhtml"), null != e4) {
      for (a4 = 0; a4 < e4.length; a4++) if ((d5 = e4[a4]) && "setAttribute" in d5 == !!x4 && (x4 ? d5.localName == x4 : 3 == d5.nodeType)) {
        u5 = d5, e4[a4] = null;
        break;
      }
    }
    if (null == u5) {
      if (null == x4) return document.createTextNode(k4);
      u5 = document.createElementNS(o4, x4, k4.is && k4), c4 && (l.__m && l.__m(t4, e4), c4 = false), e4 = null;
    }
    if (null == x4) b4 === k4 || c4 && u5.data == k4 || (u5.data = k4);
    else {
      if (e4 = e4 && n.call(u5.childNodes), b4 = i5.props || p, !c4 && null != e4) for (b4 = {}, a4 = 0; a4 < u5.attributes.length; a4++) b4[(d5 = u5.attributes[a4]).name] = d5.value;
      for (a4 in b4) if (d5 = b4[a4], "children" == a4) ;
      else if ("dangerouslySetInnerHTML" == a4) v5 = d5;
      else if (!(a4 in k4)) {
        if ("value" == a4 && "defaultValue" in k4 || "checked" == a4 && "defaultChecked" in k4) continue;
        j(u5, a4, null, d5, o4);
      }
      for (a4 in k4) d5 = k4[a4], "children" == a4 ? y5 = d5 : "dangerouslySetInnerHTML" == a4 ? h5 = d5 : "value" == a4 ? _5 = d5 : "checked" == a4 ? m5 = d5 : c4 && "function" != typeof d5 || b4[a4] === d5 || j(u5, a4, d5, b4[a4], o4);
      if (h5) c4 || v5 && (h5.__html == v5.__html || h5.__html == u5.innerHTML) || (u5.innerHTML = h5.__html), t4.__k = [];
      else if (v5 && (u5.innerHTML = ""), I("template" == t4.type ? u5.content : u5, w(y5) ? y5 : [y5], t4, i5, r4, "foreignObject" == x4 ? "http://www.w3.org/1999/xhtml" : o4, e4, f5, e4 ? e4[0] : i5.__k && S(i5, 0), c4, s4), null != e4) for (a4 = e4.length; a4--; ) g(e4[a4]);
      c4 || (a4 = "value", "progress" == x4 && null == _5 ? u5.removeAttribute("value") : null != _5 && (_5 !== u5[a4] || "progress" == x4 && !_5 || "option" == x4 && _5 != b4[a4]) && j(u5, a4, _5, b4[a4], o4), a4 = "checked", null != m5 && m5 != u5[a4] && j(u5, a4, m5, b4[a4], o4));
    }
    return u5;
  }
  function B(n3, u5, t4) {
    try {
      if ("function" == typeof n3) {
        var i5 = "function" == typeof n3.__u;
        i5 && n3.__u(), i5 && null == u5 || (n3.__u = n3(u5));
      } else n3.current = u5;
    } catch (n4) {
      l.__e(n4, t4);
    }
  }
  function D(n3, u5, t4) {
    var i5, r4;
    if (l.unmount && l.unmount(n3), (i5 = n3.ref) && (i5.current && i5.current != n3.__e || B(i5, null, u5)), null != (i5 = n3.__c)) {
      if (i5.componentWillUnmount) try {
        i5.componentWillUnmount();
      } catch (n4) {
        l.__e(n4, u5);
      }
      i5.base = i5.__P = null;
    }
    if (i5 = n3.__k) for (r4 = 0; r4 < i5.length; r4++) i5[r4] && D(i5[r4], u5, t4 || "function" != typeof n3.type);
    t4 || g(n3.__e), n3.__c = n3.__ = n3.__e = void 0;
  }
  function E(n3, l6, u5) {
    return this.constructor(n3, u5);
  }
  function G(u5, t4, i5) {
    var r4, o4, e4, f5;
    t4 == document && (t4 = document.documentElement), l.__ && l.__(u5, t4), o4 = (r4 = "function" == typeof i5) ? null : i5 && i5.__k || t4.__k, e4 = [], f5 = [], O(t4, u5 = (!r4 && i5 || t4).__k = _(k, null, [u5]), o4 || p, p, t4.namespaceURI, !r4 && i5 ? [i5] : o4 ? null : t4.firstChild ? n.call(t4.childNodes) : null, e4, !r4 && i5 ? i5 : o4 ? o4.__e : t4.firstChild, r4, f5), N(e4, u5, f5);
  }
  function J(n3, l6) {
    G(n3, l6, J);
  }
  function K(l6, u5, t4) {
    var i5, r4, o4, e4, f5 = d({}, l6.props);
    for (o4 in l6.type && l6.type.defaultProps && (e4 = l6.type.defaultProps), u5) "key" == o4 ? i5 = u5[o4] : "ref" == o4 ? r4 = u5[o4] : f5[o4] = void 0 === u5[o4] && null != e4 ? e4[o4] : u5[o4];
    return arguments.length > 2 && (f5.children = arguments.length > 3 ? n.call(arguments, 2) : t4), m(l6.type, f5, i5 || l6.key, r4 || l6.ref, null);
  }
  function Q(n3) {
    function l6(n4) {
      var u5, t4;
      return this.getChildContext || (u5 = /* @__PURE__ */ new Set(), (t4 = {})[l6.__c] = this, this.getChildContext = function() {
        return t4;
      }, this.componentWillUnmount = function() {
        u5 = null;
      }, this.shouldComponentUpdate = function(n5) {
        this.props.value != n5.value && u5.forEach(function(n6) {
          n6.__e = true, M(n6);
        });
      }, this.sub = function(n5) {
        u5.add(n5);
        var l7 = n5.componentWillUnmount;
        n5.componentWillUnmount = function() {
          u5 && u5.delete(n5), l7 && l7.call(n5);
        };
      }), n4.children;
    }
    return l6.__c = "__cC" + h++, l6.__ = n3, l6.Provider = l6.__l = (l6.Consumer = function(n4, l7) {
      return n4.children(l7);
    }).contextType = l6, l6;
  }
  var n, l, u, t, i, r, o, e, f, c, s, a, h, p, v, y, w;
  var init_preact_module = __esm({
    "apps/larry-vscode-ext/node_modules/preact/dist/preact.module.js"() {
      p = {};
      v = [];
      y = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
      w = Array.isArray;
      n = v.slice, l = { __e: function(n3, l6, u5, t4) {
        for (var i5, r4, o4; l6 = l6.__; ) if ((i5 = l6.__c) && !i5.__) try {
          if ((r4 = i5.constructor) && null != r4.getDerivedStateFromError && (i5.setState(r4.getDerivedStateFromError(n3)), o4 = i5.__d), null != i5.componentDidCatch && (i5.componentDidCatch(n3, t4 || {}), o4 = i5.__d), o4) return i5.__E = i5;
        } catch (l7) {
          n3 = l7;
        }
        throw n3;
      } }, u = 0, t = function(n3) {
        return null != n3 && null == n3.constructor;
      }, x.prototype.setState = function(n3, l6) {
        var u5;
        u5 = null != this.__s && this.__s != this.state ? this.__s : this.__s = d({}, this.state), "function" == typeof n3 && (n3 = n3(d({}, u5), this.props)), n3 && d(u5, n3), null != n3 && this.__v && (l6 && this._sb.push(l6), M(this));
      }, x.prototype.forceUpdate = function(n3) {
        this.__v && (this.__e = true, n3 && this.__h.push(n3), M(this));
      }, x.prototype.render = k, i = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e = function(n3, l6) {
        return n3.__v.__b - l6.__v.__b;
      }, $.__r = 0, f = /(PointerCapture)$|Capture$/i, c = 0, s = F(false), a = F(true), h = 0;
    }
  });

  // apps/larry-vscode-ext/node_modules/preact/hooks/dist/hooks.module.js
  var hooks_module_exports = {};
  __export(hooks_module_exports, {
    useCallback: () => q2,
    useContext: () => x2,
    useDebugValue: () => P2,
    useEffect: () => y2,
    useErrorBoundary: () => b2,
    useId: () => g2,
    useImperativeHandle: () => F2,
    useLayoutEffect: () => _2,
    useMemo: () => T2,
    useReducer: () => h2,
    useRef: () => A2,
    useState: () => d2
  });
  function p2(n3, t4) {
    c2.__h && c2.__h(r2, n3, o2 || t4), o2 = 0;
    var u5 = r2.__H || (r2.__H = { __: [], __h: [] });
    return n3 >= u5.__.length && u5.__.push({}), u5.__[n3];
  }
  function d2(n3) {
    return o2 = 1, h2(D2, n3);
  }
  function h2(n3, u5, i5) {
    var o4 = p2(t2++, 2);
    if (o4.t = n3, !o4.__c && (o4.__ = [i5 ? i5(u5) : D2(void 0, u5), function(n4) {
      var t4 = o4.__N ? o4.__N[0] : o4.__[0], r4 = o4.t(t4, n4);
      t4 !== r4 && (o4.__N = [r4, o4.__[1]], o4.__c.setState({}));
    }], o4.__c = r2, !r2.__f)) {
      var f5 = function(n4, t4, r4) {
        if (!o4.__c.__H) return true;
        var u6 = o4.__c.__H.__.filter(function(n5) {
          return !!n5.__c;
        });
        if (u6.every(function(n5) {
          return !n5.__N;
        })) return !c4 || c4.call(this, n4, t4, r4);
        var i6 = o4.__c.props !== n4;
        return u6.forEach(function(n5) {
          if (n5.__N) {
            var t5 = n5.__[0];
            n5.__ = n5.__N, n5.__N = void 0, t5 !== n5.__[0] && (i6 = true);
          }
        }), c4 && c4.call(this, n4, t4, r4) || i6;
      };
      r2.__f = true;
      var c4 = r2.shouldComponentUpdate, e4 = r2.componentWillUpdate;
      r2.componentWillUpdate = function(n4, t4, r4) {
        if (this.__e) {
          var u6 = c4;
          c4 = void 0, f5(n4, t4, r4), c4 = u6;
        }
        e4 && e4.call(this, n4, t4, r4);
      }, r2.shouldComponentUpdate = f5;
    }
    return o4.__N || o4.__;
  }
  function y2(n3, u5) {
    var i5 = p2(t2++, 3);
    !c2.__s && C2(i5.__H, u5) && (i5.__ = n3, i5.u = u5, r2.__H.__h.push(i5));
  }
  function _2(n3, u5) {
    var i5 = p2(t2++, 4);
    !c2.__s && C2(i5.__H, u5) && (i5.__ = n3, i5.u = u5, r2.__h.push(i5));
  }
  function A2(n3) {
    return o2 = 5, T2(function() {
      return { current: n3 };
    }, []);
  }
  function F2(n3, t4, r4) {
    o2 = 6, _2(function() {
      if ("function" == typeof n3) {
        var r5 = n3(t4());
        return function() {
          n3(null), r5 && "function" == typeof r5 && r5();
        };
      }
      if (n3) return n3.current = t4(), function() {
        return n3.current = null;
      };
    }, null == r4 ? r4 : r4.concat(n3));
  }
  function T2(n3, r4) {
    var u5 = p2(t2++, 7);
    return C2(u5.__H, r4) && (u5.__ = n3(), u5.__H = r4, u5.__h = n3), u5.__;
  }
  function q2(n3, t4) {
    return o2 = 8, T2(function() {
      return n3;
    }, t4);
  }
  function x2(n3) {
    var u5 = r2.context[n3.__c], i5 = p2(t2++, 9);
    return i5.c = n3, u5 ? (null == i5.__ && (i5.__ = true, u5.sub(r2)), u5.props.value) : n3.__;
  }
  function P2(n3, t4) {
    c2.useDebugValue && c2.useDebugValue(t4 ? t4(n3) : n3);
  }
  function b2(n3) {
    var u5 = p2(t2++, 10), i5 = d2();
    return u5.__ = n3, r2.componentDidCatch || (r2.componentDidCatch = function(n4, t4) {
      u5.__ && u5.__(n4, t4), i5[1](n4);
    }), [i5[0], function() {
      i5[1](void 0);
    }];
  }
  function g2() {
    var n3 = p2(t2++, 11);
    if (!n3.__) {
      for (var u5 = r2.__v; null !== u5 && !u5.__m && null !== u5.__; ) u5 = u5.__;
      var i5 = u5.__m || (u5.__m = [0, 0]);
      n3.__ = "P" + i5[0] + "-" + i5[1]++;
    }
    return n3.__;
  }
  function j2() {
    for (var n3; n3 = f2.shift(); ) if (n3.__P && n3.__H) try {
      n3.__H.__h.forEach(z2), n3.__H.__h.forEach(B2), n3.__H.__h = [];
    } catch (t4) {
      n3.__H.__h = [], c2.__e(t4, n3.__v);
    }
  }
  function w2(n3) {
    var t4, r4 = function() {
      clearTimeout(u5), k2 && cancelAnimationFrame(t4), setTimeout(n3);
    }, u5 = setTimeout(r4, 35);
    k2 && (t4 = requestAnimationFrame(r4));
  }
  function z2(n3) {
    var t4 = r2, u5 = n3.__c;
    "function" == typeof u5 && (n3.__c = void 0, u5()), r2 = t4;
  }
  function B2(n3) {
    var t4 = r2;
    n3.__c = n3.__(), r2 = t4;
  }
  function C2(n3, t4) {
    return !n3 || n3.length !== t4.length || t4.some(function(t5, r4) {
      return t5 !== n3[r4];
    });
  }
  function D2(n3, t4) {
    return "function" == typeof t4 ? t4(n3) : t4;
  }
  var t2, r2, u2, i2, o2, f2, c2, e2, a2, v2, l2, m2, s2, k2;
  var init_hooks_module = __esm({
    "apps/larry-vscode-ext/node_modules/preact/hooks/dist/hooks.module.js"() {
      init_preact_module();
      o2 = 0;
      f2 = [];
      c2 = l;
      e2 = c2.__b;
      a2 = c2.__r;
      v2 = c2.diffed;
      l2 = c2.__c;
      m2 = c2.unmount;
      s2 = c2.__;
      c2.__b = function(n3) {
        r2 = null, e2 && e2(n3);
      }, c2.__ = function(n3, t4) {
        n3 && t4.__k && t4.__k.__m && (n3.__m = t4.__k.__m), s2 && s2(n3, t4);
      }, c2.__r = function(n3) {
        a2 && a2(n3), t2 = 0;
        var i5 = (r2 = n3.__c).__H;
        i5 && (u2 === r2 ? (i5.__h = [], r2.__h = [], i5.__.forEach(function(n4) {
          n4.__N && (n4.__ = n4.__N), n4.u = n4.__N = void 0;
        })) : (i5.__h.forEach(z2), i5.__h.forEach(B2), i5.__h = [], t2 = 0)), u2 = r2;
      }, c2.diffed = function(n3) {
        v2 && v2(n3);
        var t4 = n3.__c;
        t4 && t4.__H && (t4.__H.__h.length && (1 !== f2.push(t4) && i2 === c2.requestAnimationFrame || ((i2 = c2.requestAnimationFrame) || w2)(j2)), t4.__H.__.forEach(function(n4) {
          n4.u && (n4.__H = n4.u), n4.u = void 0;
        })), u2 = r2 = null;
      }, c2.__c = function(n3, t4) {
        t4.some(function(n4) {
          try {
            n4.__h.forEach(z2), n4.__h = n4.__h.filter(function(n5) {
              return !n5.__ || B2(n5);
            });
          } catch (r4) {
            t4.some(function(n5) {
              n5.__h && (n5.__h = []);
            }), t4 = [], c2.__e(r4, n4.__v);
          }
        }), l2 && l2(n3, t4);
      }, c2.unmount = function(n3) {
        m2 && m2(n3);
        var t4, r4 = n3.__c;
        r4 && r4.__H && (r4.__H.__.forEach(function(n4) {
          try {
            z2(n4);
          } catch (n5) {
            t4 = n5;
          }
        }), r4.__H = void 0, t4 && c2.__e(t4, r4.__v));
      };
      k2 = "function" == typeof requestAnimationFrame;
    }
  });

  // apps/larry-vscode-ext/node_modules/preact/compat/dist/compat.js
  var require_compat = __commonJS({
    "apps/larry-vscode-ext/node_modules/preact/compat/dist/compat.js"(exports) {
      var n3 = (init_preact_module(), __toCommonJS(preact_module_exports));
      var t4 = (init_hooks_module(), __toCommonJS(hooks_module_exports));
      function e4(n4, t5) {
        for (var e5 in t5) n4[e5] = t5[e5];
        return n4;
      }
      function r4(n4, t5) {
        for (var e5 in n4) if ("__source" !== e5 && !(e5 in t5)) return true;
        for (var r5 in t5) if ("__source" !== r5 && n4[r5] !== t5[r5]) return true;
        return false;
      }
      function u5(n4, e5) {
        var r5 = e5(), u6 = t4.useState({ t: { __: r5, u: e5 } }), i6 = u6[0].t, c5 = u6[1];
        return t4.useLayoutEffect(function() {
          i6.__ = r5, i6.u = e5, o4(i6) && c5({ t: i6 });
        }, [n4, r5, e5]), t4.useEffect(function() {
          return o4(i6) && c5({ t: i6 }), n4(function() {
            o4(i6) && c5({ t: i6 });
          });
        }, [n4]), r5;
      }
      function o4(n4) {
        var t5, e5, r5 = n4.u, u6 = n4.__;
        try {
          var o5 = r5();
          return !((t5 = u6) === (e5 = o5) && (0 !== t5 || 1 / t5 == 1 / e5) || t5 != t5 && e5 != e5);
        } catch (n5) {
          return true;
        }
      }
      function i5(n4) {
        n4();
      }
      function c4(n4) {
        return n4;
      }
      function l6() {
        return [false, i5];
      }
      var f5 = t4.useLayoutEffect;
      function a4(n4, t5) {
        this.props = n4, this.context = t5;
      }
      function s4(t5, e5) {
        function u6(n4) {
          var t6 = this.props.ref, u7 = t6 == n4.ref;
          return !u7 && t6 && (t6.call ? t6(null) : t6.current = null), e5 ? !e5(this.props, n4) || !u7 : r4(this.props, n4);
        }
        function o5(e6) {
          return this.shouldComponentUpdate = u6, n3.createElement(t5, e6);
        }
        return o5.displayName = "Memo(" + (t5.displayName || t5.name) + ")", o5.prototype.isReactComponent = true, o5.__f = true, o5.type = t5, o5;
      }
      (a4.prototype = new n3.Component()).isPureReactComponent = true, a4.prototype.shouldComponentUpdate = function(n4, t5) {
        return r4(this.props, n4) || r4(this.state, t5);
      };
      var p4 = n3.options.__b;
      n3.options.__b = function(n4) {
        n4.type && n4.type.__f && n4.ref && (n4.props.ref = n4.ref, n4.ref = null), p4 && p4(n4);
      };
      var h5 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
      function v5(n4) {
        function t5(t6) {
          var r5 = e4({}, t6);
          return delete r5.ref, n4(r5, t6.ref || null);
        }
        return t5.$$typeof = h5, t5.render = n4, t5.prototype.isReactComponent = t5.__f = true, t5.displayName = "ForwardRef(" + (n4.displayName || n4.name) + ")", t5;
      }
      var d5 = function(t5, e5) {
        return null == t5 ? null : n3.toChildArray(n3.toChildArray(t5).map(e5));
      };
      var m5 = { map: d5, forEach: d5, count: function(t5) {
        return t5 ? n3.toChildArray(t5).length : 0;
      }, only: function(t5) {
        var e5 = n3.toChildArray(t5);
        if (1 !== e5.length) throw "Children.only";
        return e5[0];
      }, toArray: n3.toChildArray };
      var x4 = n3.options.__e;
      n3.options.__e = function(n4, t5, e5, r5) {
        if (n4.then) {
          for (var u6, o5 = t5; o5 = o5.__; ) if ((u6 = o5.__c) && u6.__c) return null == t5.__e && (t5.__e = e5.__e, t5.__k = e5.__k), u6.__c(n4, t5);
        }
        x4(n4, t5, e5, r5);
      };
      var b4 = n3.options.unmount;
      function _5(n4, t5, r5) {
        return n4 && (n4.__c && n4.__c.__H && (n4.__c.__H.__.forEach(function(n5) {
          "function" == typeof n5.__c && n5.__c();
        }), n4.__c.__H = null), null != (n4 = e4({}, n4)).__c && (n4.__c.__P === r5 && (n4.__c.__P = t5), n4.__c.__e = true, n4.__c = null), n4.__k = n4.__k && n4.__k.map(function(n5) {
          return _5(n5, t5, r5);
        })), n4;
      }
      function y5(n4, t5, e5) {
        return n4 && e5 && (n4.__v = null, n4.__k = n4.__k && n4.__k.map(function(n5) {
          return y5(n5, t5, e5);
        }), n4.__c && n4.__c.__P === t5 && (n4.__e && e5.appendChild(n4.__e), n4.__c.__e = true, n4.__c.__P = e5)), n4;
      }
      function g4() {
        this.__u = 0, this.o = null, this.__b = null;
      }
      function S4(n4) {
        var t5 = n4.__.__c;
        return t5 && t5.__a && t5.__a(n4);
      }
      function E4(t5) {
        var e5, r5, u6;
        function o5(o6) {
          if (e5 || (e5 = t5()).then(function(n4) {
            r5 = n4.default || n4;
          }, function(n4) {
            u6 = n4;
          }), u6) throw u6;
          if (!r5) throw e5;
          return n3.createElement(r5, o6);
        }
        return o5.displayName = "Lazy", o5.__f = true, o5;
      }
      function C5() {
        this.i = null, this.l = null;
      }
      n3.options.unmount = function(n4) {
        var t5 = n4.__c;
        t5 && t5.__R && t5.__R(), t5 && 32 & n4.__u && (n4.type = null), b4 && b4(n4);
      }, (g4.prototype = new n3.Component()).__c = function(n4, t5) {
        var e5 = t5.__c, r5 = this;
        null == r5.o && (r5.o = []), r5.o.push(e5);
        var u6 = S4(r5.__v), o5 = false, i6 = function() {
          o5 || (o5 = true, e5.__R = null, u6 ? u6(c5) : c5());
        };
        e5.__R = i6;
        var c5 = function() {
          if (!--r5.__u) {
            if (r5.state.__a) {
              var n5 = r5.state.__a;
              r5.__v.__k[0] = y5(n5, n5.__c.__P, n5.__c.__O);
            }
            var t6;
            for (r5.setState({ __a: r5.__b = null }); t6 = r5.o.pop(); ) t6.forceUpdate();
          }
        };
        r5.__u++ || 32 & t5.__u || r5.setState({ __a: r5.__b = r5.__v.__k[0] }), n4.then(i6, i6);
      }, g4.prototype.componentWillUnmount = function() {
        this.o = [];
      }, g4.prototype.render = function(t5, e5) {
        if (this.__b) {
          if (this.__v.__k) {
            var r5 = document.createElement("div"), u6 = this.__v.__k[0].__c;
            this.__v.__k[0] = _5(this.__b, r5, u6.__O = u6.__P);
          }
          this.__b = null;
        }
        var o5 = e5.__a && n3.createElement(n3.Fragment, null, t5.fallback);
        return o5 && (o5.__u &= -33), [n3.createElement(n3.Fragment, null, e5.__a ? null : t5.children), o5];
      };
      var O4 = function(n4, t5, e5) {
        if (++e5[1] === e5[0] && n4.l.delete(t5), n4.props.revealOrder && ("t" !== n4.props.revealOrder[0] || !n4.l.size)) for (e5 = n4.i; e5; ) {
          for (; e5.length > 3; ) e5.pop()();
          if (e5[1] < e5[0]) break;
          n4.i = e5 = e5[2];
        }
      };
      function R2(n4) {
        return this.getChildContext = function() {
          return n4.context;
        }, n4.children;
      }
      function w5(t5) {
        var e5 = this, r5 = t5.p;
        if (e5.componentWillUnmount = function() {
          n3.render(null, e5.h), e5.h = null, e5.p = null;
        }, e5.p && e5.p !== r5 && e5.componentWillUnmount(), !e5.h) {
          for (var u6 = e5.__v; null !== u6 && !u6.__m && null !== u6.__; ) u6 = u6.__;
          e5.p = r5, e5.h = { nodeType: 1, parentNode: r5, childNodes: [], __k: { __m: u6.__m }, contains: function() {
            return true;
          }, insertBefore: function(n4, t6) {
            this.childNodes.push(n4), e5.p.insertBefore(n4, t6);
          }, removeChild: function(n4) {
            this.childNodes.splice(this.childNodes.indexOf(n4) >>> 1, 1), e5.p.removeChild(n4);
          } };
        }
        n3.render(n3.createElement(R2, { context: e5.context }, t5.__v), e5.h);
      }
      function j5(t5, e5) {
        var r5 = n3.createElement(w5, { __v: t5, p: e5 });
        return r5.containerInfo = e5, r5;
      }
      (C5.prototype = new n3.Component()).__a = function(n4) {
        var t5 = this, e5 = S4(t5.__v), r5 = t5.l.get(n4);
        return r5[0]++, function(u6) {
          var o5 = function() {
            t5.props.revealOrder ? (r5.push(u6), O4(t5, n4, r5)) : u6();
          };
          e5 ? e5(o5) : o5();
        };
      }, C5.prototype.render = function(t5) {
        this.i = null, this.l = /* @__PURE__ */ new Map();
        var e5 = n3.toChildArray(t5.children);
        t5.revealOrder && "b" === t5.revealOrder[0] && e5.reverse();
        for (var r5 = e5.length; r5--; ) this.l.set(e5[r5], this.i = [1, 0, this.i]);
        return t5.children;
      }, C5.prototype.componentDidUpdate = C5.prototype.componentDidMount = function() {
        var n4 = this;
        this.l.forEach(function(t5, e5) {
          O4(n4, e5, t5);
        });
      };
      var k4 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
      var I4 = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
      var N4 = /^on(Ani|Tra|Tou|BeforeInp|Compo)/;
      var M4 = /[A-Z0-9]/g;
      var T4 = "undefined" != typeof document;
      var A4 = function(n4) {
        return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(n4);
      };
      function D5(t5, e5, r5) {
        return null == e5.__k && (e5.textContent = ""), n3.render(t5, e5), "function" == typeof r5 && r5(), t5 ? t5.__c : null;
      }
      function L4(t5, e5, r5) {
        return n3.hydrate(t5, e5), "function" == typeof r5 && r5(), t5 ? t5.__c : null;
      }
      n3.Component.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t5) {
        Object.defineProperty(n3.Component.prototype, t5, { configurable: true, get: function() {
          return this["UNSAFE_" + t5];
        }, set: function(n4) {
          Object.defineProperty(this, t5, { configurable: true, writable: true, value: n4 });
        } });
      });
      var F5 = n3.options.event;
      function U2() {
      }
      function V4() {
        return this.cancelBubble;
      }
      function W2() {
        return this.defaultPrevented;
      }
      n3.options.event = function(n4) {
        return F5 && (n4 = F5(n4)), n4.persist = U2, n4.isPropagationStopped = V4, n4.isDefaultPrevented = W2, n4.nativeEvent = n4;
      };
      var P5;
      var z5 = { enumerable: false, configurable: true, get: function() {
        return this.class;
      } };
      var B5 = n3.options.vnode;
      n3.options.vnode = function(t5) {
        "string" == typeof t5.type && function(t6) {
          var e5 = t6.props, r5 = t6.type, u6 = {}, o5 = -1 === r5.indexOf("-");
          for (var i6 in e5) {
            var c5 = e5[i6];
            if (!("value" === i6 && "defaultValue" in e5 && null == c5 || T4 && "children" === i6 && "noscript" === r5 || "class" === i6 || "className" === i6)) {
              var l7 = i6.toLowerCase();
              "defaultValue" === i6 && "value" in e5 && null == e5.value ? i6 = "value" : "download" === i6 && true === c5 ? c5 = "" : "translate" === l7 && "no" === c5 ? c5 = false : "o" === l7[0] && "n" === l7[1] ? "ondoubleclick" === l7 ? i6 = "ondblclick" : "onchange" !== l7 || "input" !== r5 && "textarea" !== r5 || A4(e5.type) ? "onfocus" === l7 ? i6 = "onfocusin" : "onblur" === l7 ? i6 = "onfocusout" : N4.test(i6) && (i6 = l7) : l7 = i6 = "oninput" : o5 && I4.test(i6) ? i6 = i6.replace(M4, "-$&").toLowerCase() : null === c5 && (c5 = void 0), "oninput" === l7 && u6[i6 = l7] && (i6 = "oninputCapture"), u6[i6] = c5;
            }
          }
          "select" == r5 && u6.multiple && Array.isArray(u6.value) && (u6.value = n3.toChildArray(e5.children).forEach(function(n4) {
            n4.props.selected = -1 != u6.value.indexOf(n4.props.value);
          })), "select" == r5 && null != u6.defaultValue && (u6.value = n3.toChildArray(e5.children).forEach(function(n4) {
            n4.props.selected = u6.multiple ? -1 != u6.defaultValue.indexOf(n4.props.value) : u6.defaultValue == n4.props.value;
          })), e5.class && !e5.className ? (u6.class = e5.class, Object.defineProperty(u6, "className", z5)) : (e5.className && !e5.class || e5.class && e5.className) && (u6.class = u6.className = e5.className), t6.props = u6;
        }(t5), t5.$$typeof = k4, B5 && B5(t5);
      };
      var H4 = n3.options.__r;
      n3.options.__r = function(n4) {
        H4 && H4(n4), P5 = n4.__c;
      };
      var q5 = n3.options.diffed;
      n3.options.diffed = function(n4) {
        q5 && q5(n4);
        var t5 = n4.props, e5 = n4.__e;
        null != e5 && "textarea" === n4.type && "value" in t5 && t5.value !== e5.value && (e5.value = null == t5.value ? "" : t5.value), P5 = null;
      };
      var Z = { ReactCurrentDispatcher: { current: { readContext: function(n4) {
        return P5.__n[n4.__c].props.value;
      }, useCallback: t4.useCallback, useContext: t4.useContext, useDebugValue: t4.useDebugValue, useDeferredValue: c4, useEffect: t4.useEffect, useId: t4.useId, useImperativeHandle: t4.useImperativeHandle, useInsertionEffect: f5, useLayoutEffect: t4.useLayoutEffect, useMemo: t4.useMemo, useReducer: t4.useReducer, useRef: t4.useRef, useState: t4.useState, useSyncExternalStore: u5, useTransition: l6 } } };
      function Y(t5) {
        return n3.createElement.bind(null, t5);
      }
      function $4(n4) {
        return !!n4 && n4.$$typeof === k4;
      }
      function G2(t5) {
        return $4(t5) && t5.type === n3.Fragment;
      }
      function J3(n4) {
        return !!n4 && !!n4.displayName && ("string" == typeof n4.displayName || n4.displayName instanceof String) && n4.displayName.startsWith("Memo(");
      }
      function K3(t5) {
        return $4(t5) ? n3.cloneElement.apply(null, arguments) : t5;
      }
      function Q3(t5) {
        return !!t5.__k && (n3.render(null, t5), true);
      }
      function X3(n4) {
        return n4 && (n4.base || 1 === n4.nodeType && n4) || null;
      }
      var nn = function(n4, t5) {
        return n4(t5);
      };
      var tn = function(n4, t5) {
        return n4(t5);
      };
      var en = n3.Fragment;
      var rn = $4;
      var un = { useState: t4.useState, useId: t4.useId, useReducer: t4.useReducer, useEffect: t4.useEffect, useLayoutEffect: t4.useLayoutEffect, useInsertionEffect: f5, useTransition: l6, useDeferredValue: c4, useSyncExternalStore: u5, startTransition: i5, useRef: t4.useRef, useImperativeHandle: t4.useImperativeHandle, useMemo: t4.useMemo, useCallback: t4.useCallback, useContext: t4.useContext, useDebugValue: t4.useDebugValue, version: "18.3.1", Children: m5, render: D5, hydrate: L4, unmountComponentAtNode: Q3, createPortal: j5, createElement: n3.createElement, createContext: n3.createContext, createFactory: Y, cloneElement: K3, createRef: n3.createRef, Fragment: n3.Fragment, isValidElement: $4, isElement: rn, isFragment: G2, isMemo: J3, findDOMNode: X3, Component: n3.Component, PureComponent: a4, memo: s4, forwardRef: v5, flushSync: tn, unstable_batchedUpdates: nn, StrictMode: en, Suspense: g4, SuspenseList: C5, lazy: E4, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Z };
      Object.defineProperty(exports, "Component", { enumerable: true, get: function() {
        return n3.Component;
      } }), Object.defineProperty(exports, "Fragment", { enumerable: true, get: function() {
        return n3.Fragment;
      } }), Object.defineProperty(exports, "createContext", { enumerable: true, get: function() {
        return n3.createContext;
      } }), Object.defineProperty(exports, "createElement", { enumerable: true, get: function() {
        return n3.createElement;
      } }), Object.defineProperty(exports, "createRef", { enumerable: true, get: function() {
        return n3.createRef;
      } }), exports.Children = m5, exports.PureComponent = a4, exports.StrictMode = en, exports.Suspense = g4, exports.SuspenseList = C5, exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Z, exports.cloneElement = K3, exports.createFactory = Y, exports.createPortal = j5, exports.default = un, exports.findDOMNode = X3, exports.flushSync = tn, exports.forwardRef = v5, exports.hydrate = L4, exports.isElement = rn, exports.isFragment = G2, exports.isMemo = J3, exports.isValidElement = $4, exports.lazy = E4, exports.memo = s4, exports.render = D5, exports.startTransition = i5, exports.unmountComponentAtNode = Q3, exports.unstable_batchedUpdates = nn, exports.useDeferredValue = c4, exports.useInsertionEffect = f5, exports.useSyncExternalStore = u5, exports.useTransition = l6, exports.version = "18.3.1", Object.keys(t4).forEach(function(n4) {
        "default" === n4 || exports.hasOwnProperty(n4) || Object.defineProperty(exports, n4, { enumerable: true, get: function() {
          return t4[n4];
        } });
      });
    }
  });

  // apps/larry-vscode-ext/node_modules/preact/jsx-runtime/dist/jsxRuntime.js
  var require_jsxRuntime = __commonJS({
    "apps/larry-vscode-ext/node_modules/preact/jsx-runtime/dist/jsxRuntime.js"(exports) {
      var r4 = (init_preact_module(), __toCommonJS(preact_module_exports));
      var e4 = /["&<]/;
      function t4(r5) {
        if (0 === r5.length || false === e4.test(r5)) return r5;
        for (var t5 = 0, n4 = 0, o5 = "", f6 = ""; n4 < r5.length; n4++) {
          switch (r5.charCodeAt(n4)) {
            case 34:
              f6 = "&quot;";
              break;
            case 38:
              f6 = "&amp;";
              break;
            case 60:
              f6 = "&lt;";
              break;
            default:
              continue;
          }
          n4 !== t5 && (o5 += r5.slice(t5, n4)), o5 += f6, t5 = n4 + 1;
        }
        return n4 !== t5 && (o5 += r5.slice(t5, n4)), o5;
      }
      var n3 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
      var o4 = 0;
      var f5 = Array.isArray;
      function u5(e5, t5, n4, f6, u6, i6) {
        t5 || (t5 = {});
        var c5, a4, p4 = t5;
        if ("ref" in p4) for (a4 in p4 = {}, t5) "ref" == a4 ? c5 = t5[a4] : p4[a4] = t5[a4];
        var l6 = { type: e5, props: p4, key: n4, ref: c5, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --o4, __i: -1, __u: 0, __source: u6, __self: i6 };
        if ("function" == typeof e5 && (c5 = e5.defaultProps)) for (a4 in c5) void 0 === p4[a4] && (p4[a4] = c5[a4]);
        return r4.options.vnode && r4.options.vnode(l6), l6;
      }
      var i5 = {};
      var c4 = /[A-Z]/g;
      Object.defineProperty(exports, "Fragment", { enumerable: true, get: function() {
        return r4.Fragment;
      } }), exports.jsx = u5, exports.jsxAttr = function(e5, o5) {
        if (r4.options.attr) {
          var f6 = r4.options.attr(e5, o5);
          if ("string" == typeof f6) return f6;
        }
        if (o5 = function(r5) {
          return null !== r5 && "object" == typeof r5 && "function" == typeof r5.valueOf ? r5.valueOf() : r5;
        }(o5), "ref" === e5 || "key" === e5) return "";
        if ("style" === e5 && "object" == typeof o5) {
          var u6 = "";
          for (var a4 in o5) {
            var p4 = o5[a4];
            if (null != p4 && "" !== p4) {
              var l6 = "-" == a4[0] ? a4 : i5[a4] || (i5[a4] = a4.replace(c4, "-$&").toLowerCase()), s4 = ";";
              "number" != typeof p4 || l6.startsWith("--") || n3.test(l6) || (s4 = "px;"), u6 = u6 + l6 + ":" + p4 + s4;
            }
          }
          return e5 + '="' + t4(u6) + '"';
        }
        return null == o5 || false === o5 || "function" == typeof o5 || "object" == typeof o5 ? "" : true === o5 ? e5 : e5 + '="' + t4("" + o5) + '"';
      }, exports.jsxDEV = u5, exports.jsxEscape = function r5(e5) {
        if (null == e5 || "boolean" == typeof e5 || "function" == typeof e5) return null;
        if ("object" == typeof e5) {
          if (void 0 === e5.constructor) return e5;
          if (f5(e5)) {
            for (var n4 = 0; n4 < e5.length; n4++) e5[n4] = r5(e5[n4]);
            return e5;
          }
        }
        return t4("" + e5);
      }, exports.jsxTemplate = function(e5) {
        var t5 = u5(r4.Fragment, { tpl: e5, exprs: [].slice.call(arguments, 1) });
        return t5.key = t5.__v, t5;
      }, exports.jsxs = u5;
    }
  });

  // apps/larry-vscode-ext/webview/src/main.tsx
  init_preact_module();

  // node_modules/@tanstack/query-core/build/modern/subscribable.js
  var Subscribable = class {
    constructor() {
      this.listeners = /* @__PURE__ */ new Set();
      this.subscribe = this.subscribe.bind(this);
    }
    subscribe(listener) {
      this.listeners.add(listener);
      this.onSubscribe();
      return () => {
        this.listeners.delete(listener);
        this.onUnsubscribe();
      };
    }
    hasListeners() {
      return this.listeners.size > 0;
    }
    onSubscribe() {
    }
    onUnsubscribe() {
    }
  };

  // node_modules/@tanstack/query-core/build/modern/timeoutManager.js
  var defaultTimeoutProvider = {
    // We need the wrapper function syntax below instead of direct references to
    // global setTimeout etc.
    //
    // BAD: `setTimeout: setTimeout`
    // GOOD: `setTimeout: (cb, delay) => setTimeout(cb, delay)`
    //
    // If we use direct references here, then anything that wants to spy on or
    // replace the global setTimeout (like tests) won't work since we'll already
    // have a hard reference to the original implementation at the time when this
    // file was imported.
    setTimeout: (callback, delay) => setTimeout(callback, delay),
    clearTimeout: (timeoutId) => clearTimeout(timeoutId),
    setInterval: (callback, delay) => setInterval(callback, delay),
    clearInterval: (intervalId) => clearInterval(intervalId)
  };
  var _provider, _providerCalled, _a;
  var TimeoutManager = (_a = class {
    constructor() {
      // We cannot have TimeoutManager<T> as we must instantiate it with a concrete
      // type at app boot; and if we leave that type, then any new timer provider
      // would need to support ReturnType<typeof setTimeout>, which is infeasible.
      //
      // We settle for type safety for the TimeoutProvider type, and accept that
      // this class is unsafe internally to allow for extension.
      __privateAdd(this, _provider, defaultTimeoutProvider);
      __privateAdd(this, _providerCalled, false);
    }
    setTimeoutProvider(provider) {
      if (true) {
        if (__privateGet(this, _providerCalled) && provider !== __privateGet(this, _provider)) {
          console.error(
            `[timeoutManager]: Switching provider after calls to previous provider might result in unexpected behavior.`,
            { previous: __privateGet(this, _provider), provider }
          );
        }
      }
      __privateSet(this, _provider, provider);
      if (true) {
        __privateSet(this, _providerCalled, false);
      }
    }
    setTimeout(callback, delay) {
      if (true) {
        __privateSet(this, _providerCalled, true);
      }
      return __privateGet(this, _provider).setTimeout(callback, delay);
    }
    clearTimeout(timeoutId) {
      __privateGet(this, _provider).clearTimeout(timeoutId);
    }
    setInterval(callback, delay) {
      if (true) {
        __privateSet(this, _providerCalled, true);
      }
      return __privateGet(this, _provider).setInterval(callback, delay);
    }
    clearInterval(intervalId) {
      __privateGet(this, _provider).clearInterval(intervalId);
    }
  }, _provider = new WeakMap(), _providerCalled = new WeakMap(), _a);
  var timeoutManager = new TimeoutManager();
  function systemSetTimeoutZero(callback) {
    setTimeout(callback, 0);
  }

  // node_modules/@tanstack/query-core/build/modern/utils.js
  var isServer = typeof window === "undefined" || "Deno" in globalThis;
  function noop() {
  }
  function functionalUpdate(updater, input) {
    return typeof updater === "function" ? updater(input) : updater;
  }
  function isValidTimeout(value) {
    return typeof value === "number" && value >= 0 && value !== Infinity;
  }
  function timeUntilStale(updatedAt, staleTime) {
    return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
  }
  function resolveStaleTime(staleTime, query) {
    return typeof staleTime === "function" ? staleTime(query) : staleTime;
  }
  function resolveEnabled(enabled, query) {
    return typeof enabled === "function" ? enabled(query) : enabled;
  }
  function matchQuery(filters, query) {
    const {
      type = "all",
      exact,
      fetchStatus,
      predicate,
      queryKey,
      stale
    } = filters;
    if (queryKey) {
      if (exact) {
        if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) {
          return false;
        }
      } else if (!partialMatchKey(query.queryKey, queryKey)) {
        return false;
      }
    }
    if (type !== "all") {
      const isActive = query.isActive();
      if (type === "active" && !isActive) {
        return false;
      }
      if (type === "inactive" && isActive) {
        return false;
      }
    }
    if (typeof stale === "boolean" && query.isStale() !== stale) {
      return false;
    }
    if (fetchStatus && fetchStatus !== query.state.fetchStatus) {
      return false;
    }
    if (predicate && !predicate(query)) {
      return false;
    }
    return true;
  }
  function matchMutation(filters, mutation) {
    const { exact, status, predicate, mutationKey } = filters;
    if (mutationKey) {
      if (!mutation.options.mutationKey) {
        return false;
      }
      if (exact) {
        if (hashKey(mutation.options.mutationKey) !== hashKey(mutationKey)) {
          return false;
        }
      } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
        return false;
      }
    }
    if (status && mutation.state.status !== status) {
      return false;
    }
    if (predicate && !predicate(mutation)) {
      return false;
    }
    return true;
  }
  function hashQueryKeyByOptions(queryKey, options) {
    const hashFn = options?.queryKeyHashFn || hashKey;
    return hashFn(queryKey);
  }
  function hashKey(queryKey) {
    return JSON.stringify(
      queryKey,
      (_5, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
        result[key] = val[key];
        return result;
      }, {}) : val
    );
  }
  function partialMatchKey(a4, b4) {
    if (a4 === b4) {
      return true;
    }
    if (typeof a4 !== typeof b4) {
      return false;
    }
    if (a4 && b4 && typeof a4 === "object" && typeof b4 === "object") {
      return Object.keys(b4).every((key) => partialMatchKey(a4[key], b4[key]));
    }
    return false;
  }
  var hasOwn = Object.prototype.hasOwnProperty;
  function replaceEqualDeep(a4, b4) {
    if (a4 === b4) {
      return a4;
    }
    const array = isPlainArray(a4) && isPlainArray(b4);
    if (!array && !(isPlainObject(a4) && isPlainObject(b4))) return b4;
    const aItems = array ? a4 : Object.keys(a4);
    const aSize = aItems.length;
    const bItems = array ? b4 : Object.keys(b4);
    const bSize = bItems.length;
    const copy = array ? new Array(bSize) : {};
    let equalItems = 0;
    for (let i5 = 0; i5 < bSize; i5++) {
      const key = array ? i5 : bItems[i5];
      const aItem = a4[key];
      const bItem = b4[key];
      if (aItem === bItem) {
        copy[key] = aItem;
        if (array ? i5 < aSize : hasOwn.call(a4, key)) equalItems++;
        continue;
      }
      if (aItem === null || bItem === null || typeof aItem !== "object" || typeof bItem !== "object") {
        copy[key] = bItem;
        continue;
      }
      const v5 = replaceEqualDeep(aItem, bItem);
      copy[key] = v5;
      if (v5 === aItem) equalItems++;
    }
    return aSize === bSize && equalItems === aSize ? a4 : copy;
  }
  function shallowEqualObjects(a4, b4) {
    if (!b4 || Object.keys(a4).length !== Object.keys(b4).length) {
      return false;
    }
    for (const key in a4) {
      if (a4[key] !== b4[key]) {
        return false;
      }
    }
    return true;
  }
  function isPlainArray(value) {
    return Array.isArray(value) && value.length === Object.keys(value).length;
  }
  function isPlainObject(o4) {
    if (!hasObjectPrototype(o4)) {
      return false;
    }
    const ctor = o4.constructor;
    if (ctor === void 0) {
      return true;
    }
    const prot = ctor.prototype;
    if (!hasObjectPrototype(prot)) {
      return false;
    }
    if (!prot.hasOwnProperty("isPrototypeOf")) {
      return false;
    }
    if (Object.getPrototypeOf(o4) !== Object.prototype) {
      return false;
    }
    return true;
  }
  function hasObjectPrototype(o4) {
    return Object.prototype.toString.call(o4) === "[object Object]";
  }
  function sleep(timeout) {
    return new Promise((resolve) => {
      timeoutManager.setTimeout(resolve, timeout);
    });
  }
  function replaceData(prevData, data, options) {
    if (typeof options.structuralSharing === "function") {
      return options.structuralSharing(prevData, data);
    } else if (options.structuralSharing !== false) {
      if (true) {
        try {
          return replaceEqualDeep(prevData, data);
        } catch (error) {
          console.error(
            `Structural sharing requires data to be JSON serializable. To fix this, turn off structuralSharing or return JSON-serializable data from your queryFn. [${options.queryHash}]: ${error}`
          );
          throw error;
        }
      }
      return replaceEqualDeep(prevData, data);
    }
    return data;
  }
  function addToEnd(items, item, max = 0) {
    const newItems = [...items, item];
    return max && newItems.length > max ? newItems.slice(1) : newItems;
  }
  function addToStart(items, item, max = 0) {
    const newItems = [item, ...items];
    return max && newItems.length > max ? newItems.slice(0, -1) : newItems;
  }
  var skipToken = Symbol();
  function ensureQueryFn(options, fetchOptions) {
    if (true) {
      if (options.queryFn === skipToken) {
        console.error(
          `Attempted to invoke queryFn when set to skipToken. This is likely a configuration error. Query hash: '${options.queryHash}'`
        );
      }
    }
    if (!options.queryFn && fetchOptions?.initialPromise) {
      return () => fetchOptions.initialPromise;
    }
    if (!options.queryFn || options.queryFn === skipToken) {
      return () => Promise.reject(new Error(`Missing queryFn: '${options.queryHash}'`));
    }
    return options.queryFn;
  }
  function shouldThrowError(throwOnError, params) {
    if (typeof throwOnError === "function") {
      return throwOnError(...params);
    }
    return !!throwOnError;
  }

  // node_modules/@tanstack/query-core/build/modern/focusManager.js
  var _focused, _cleanup, _setup, _a2;
  var FocusManager = (_a2 = class extends Subscribable {
    constructor() {
      super();
      __privateAdd(this, _focused);
      __privateAdd(this, _cleanup);
      __privateAdd(this, _setup);
      __privateSet(this, _setup, (onFocus) => {
        if (!isServer && window.addEventListener) {
          const listener = () => onFocus();
          window.addEventListener("visibilitychange", listener, false);
          return () => {
            window.removeEventListener("visibilitychange", listener);
          };
        }
        return;
      });
    }
    onSubscribe() {
      if (!__privateGet(this, _cleanup)) {
        this.setEventListener(__privateGet(this, _setup));
      }
    }
    onUnsubscribe() {
      var _a12;
      if (!this.hasListeners()) {
        (_a12 = __privateGet(this, _cleanup)) == null ? void 0 : _a12.call(this);
        __privateSet(this, _cleanup, void 0);
      }
    }
    setEventListener(setup) {
      var _a12;
      __privateSet(this, _setup, setup);
      (_a12 = __privateGet(this, _cleanup)) == null ? void 0 : _a12.call(this);
      __privateSet(this, _cleanup, setup((focused) => {
        if (typeof focused === "boolean") {
          this.setFocused(focused);
        } else {
          this.onFocus();
        }
      }));
    }
    setFocused(focused) {
      const changed = __privateGet(this, _focused) !== focused;
      if (changed) {
        __privateSet(this, _focused, focused);
        this.onFocus();
      }
    }
    onFocus() {
      const isFocused = this.isFocused();
      this.listeners.forEach((listener) => {
        listener(isFocused);
      });
    }
    isFocused() {
      if (typeof __privateGet(this, _focused) === "boolean") {
        return __privateGet(this, _focused);
      }
      return globalThis.document?.visibilityState !== "hidden";
    }
  }, _focused = new WeakMap(), _cleanup = new WeakMap(), _setup = new WeakMap(), _a2);
  var focusManager = new FocusManager();

  // node_modules/@tanstack/query-core/build/modern/thenable.js
  function pendingThenable() {
    let resolve;
    let reject;
    const thenable = new Promise((_resolve, _reject) => {
      resolve = _resolve;
      reject = _reject;
    });
    thenable.status = "pending";
    thenable.catch(() => {
    });
    function finalize(data) {
      Object.assign(thenable, data);
      delete thenable.resolve;
      delete thenable.reject;
    }
    thenable.resolve = (value) => {
      finalize({
        status: "fulfilled",
        value
      });
      resolve(value);
    };
    thenable.reject = (reason) => {
      finalize({
        status: "rejected",
        reason
      });
      reject(reason);
    };
    return thenable;
  }

  // node_modules/@tanstack/query-core/build/modern/notifyManager.js
  var defaultScheduler = systemSetTimeoutZero;
  function createNotifyManager() {
    let queue = [];
    let transactions = 0;
    let notifyFn = (callback) => {
      callback();
    };
    let batchNotifyFn = (callback) => {
      callback();
    };
    let scheduleFn = defaultScheduler;
    const schedule = (callback) => {
      if (transactions) {
        queue.push(callback);
      } else {
        scheduleFn(() => {
          notifyFn(callback);
        });
      }
    };
    const flush = () => {
      const originalQueue = queue;
      queue = [];
      if (originalQueue.length) {
        scheduleFn(() => {
          batchNotifyFn(() => {
            originalQueue.forEach((callback) => {
              notifyFn(callback);
            });
          });
        });
      }
    };
    return {
      batch: (callback) => {
        let result;
        transactions++;
        try {
          result = callback();
        } finally {
          transactions--;
          if (!transactions) {
            flush();
          }
        }
        return result;
      },
      /**
       * All calls to the wrapped function will be batched.
       */
      batchCalls: (callback) => {
        return (...args) => {
          schedule(() => {
            callback(...args);
          });
        };
      },
      schedule,
      /**
       * Use this method to set a custom notify function.
       * This can be used to for example wrap notifications with `React.act` while running tests.
       */
      setNotifyFunction: (fn) => {
        notifyFn = fn;
      },
      /**
       * Use this method to set a custom function to batch notifications together into a single tick.
       * By default React Query will use the batch function provided by ReactDOM or React Native.
       */
      setBatchNotifyFunction: (fn) => {
        batchNotifyFn = fn;
      },
      setScheduler: (fn) => {
        scheduleFn = fn;
      }
    };
  }
  var notifyManager = createNotifyManager();

  // node_modules/@tanstack/query-core/build/modern/onlineManager.js
  var _online, _cleanup2, _setup2, _a3;
  var OnlineManager = (_a3 = class extends Subscribable {
    constructor() {
      super();
      __privateAdd(this, _online, true);
      __privateAdd(this, _cleanup2);
      __privateAdd(this, _setup2);
      __privateSet(this, _setup2, (onOnline) => {
        if (!isServer && window.addEventListener) {
          const onlineListener = () => onOnline(true);
          const offlineListener = () => onOnline(false);
          window.addEventListener("online", onlineListener, false);
          window.addEventListener("offline", offlineListener, false);
          return () => {
            window.removeEventListener("online", onlineListener);
            window.removeEventListener("offline", offlineListener);
          };
        }
        return;
      });
    }
    onSubscribe() {
      if (!__privateGet(this, _cleanup2)) {
        this.setEventListener(__privateGet(this, _setup2));
      }
    }
    onUnsubscribe() {
      var _a12;
      if (!this.hasListeners()) {
        (_a12 = __privateGet(this, _cleanup2)) == null ? void 0 : _a12.call(this);
        __privateSet(this, _cleanup2, void 0);
      }
    }
    setEventListener(setup) {
      var _a12;
      __privateSet(this, _setup2, setup);
      (_a12 = __privateGet(this, _cleanup2)) == null ? void 0 : _a12.call(this);
      __privateSet(this, _cleanup2, setup(this.setOnline.bind(this)));
    }
    setOnline(online) {
      const changed = __privateGet(this, _online) !== online;
      if (changed) {
        __privateSet(this, _online, online);
        this.listeners.forEach((listener) => {
          listener(online);
        });
      }
    }
    isOnline() {
      return __privateGet(this, _online);
    }
  }, _online = new WeakMap(), _cleanup2 = new WeakMap(), _setup2 = new WeakMap(), _a3);
  var onlineManager = new OnlineManager();

  // node_modules/@tanstack/query-core/build/modern/retryer.js
  function defaultRetryDelay(failureCount) {
    return Math.min(1e3 * 2 ** failureCount, 3e4);
  }
  function canFetch(networkMode) {
    return (networkMode ?? "online") === "online" ? onlineManager.isOnline() : true;
  }
  var CancelledError = class extends Error {
    constructor(options) {
      super("CancelledError");
      this.revert = options?.revert;
      this.silent = options?.silent;
    }
  };
  function createRetryer(config) {
    let isRetryCancelled = false;
    let failureCount = 0;
    let continueFn;
    const thenable = pendingThenable();
    const isResolved = () => thenable.status !== "pending";
    const cancel = (cancelOptions) => {
      if (!isResolved()) {
        const error = new CancelledError(cancelOptions);
        reject(error);
        config.onCancel?.(error);
      }
    };
    const cancelRetry = () => {
      isRetryCancelled = true;
    };
    const continueRetry = () => {
      isRetryCancelled = false;
    };
    const canContinue = () => focusManager.isFocused() && (config.networkMode === "always" || onlineManager.isOnline()) && config.canRun();
    const canStart = () => canFetch(config.networkMode) && config.canRun();
    const resolve = (value) => {
      if (!isResolved()) {
        continueFn?.();
        thenable.resolve(value);
      }
    };
    const reject = (value) => {
      if (!isResolved()) {
        continueFn?.();
        thenable.reject(value);
      }
    };
    const pause = () => {
      return new Promise((continueResolve) => {
        continueFn = (value) => {
          if (isResolved() || canContinue()) {
            continueResolve(value);
          }
        };
        config.onPause?.();
      }).then(() => {
        continueFn = void 0;
        if (!isResolved()) {
          config.onContinue?.();
        }
      });
    };
    const run = () => {
      if (isResolved()) {
        return;
      }
      let promiseOrValue;
      const initialPromise = failureCount === 0 ? config.initialPromise : void 0;
      try {
        promiseOrValue = initialPromise ?? config.fn();
      } catch (error) {
        promiseOrValue = Promise.reject(error);
      }
      Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
        if (isResolved()) {
          return;
        }
        const retry = config.retry ?? (isServer ? 0 : 3);
        const retryDelay = config.retryDelay ?? defaultRetryDelay;
        const delay = typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay;
        const shouldRetry = retry === true || typeof retry === "number" && failureCount < retry || typeof retry === "function" && retry(failureCount, error);
        if (isRetryCancelled || !shouldRetry) {
          reject(error);
          return;
        }
        failureCount++;
        config.onFail?.(failureCount, error);
        sleep(delay).then(() => {
          return canContinue() ? void 0 : pause();
        }).then(() => {
          if (isRetryCancelled) {
            reject(error);
          } else {
            run();
          }
        });
      });
    };
    return {
      promise: thenable,
      status: () => thenable.status,
      cancel,
      continue: () => {
        continueFn?.();
        return thenable;
      },
      cancelRetry,
      continueRetry,
      canStart,
      start: () => {
        if (canStart()) {
          run();
        } else {
          pause().then(run);
        }
        return thenable;
      }
    };
  }

  // node_modules/@tanstack/query-core/build/modern/removable.js
  var _gcTimeout, _a4;
  var Removable = (_a4 = class {
    constructor() {
      __privateAdd(this, _gcTimeout);
    }
    destroy() {
      this.clearGcTimeout();
    }
    scheduleGc() {
      this.clearGcTimeout();
      if (isValidTimeout(this.gcTime)) {
        __privateSet(this, _gcTimeout, timeoutManager.setTimeout(() => {
          this.optionalRemove();
        }, this.gcTime));
      }
    }
    updateGcTime(newGcTime) {
      this.gcTime = Math.max(
        this.gcTime || 0,
        newGcTime ?? (isServer ? Infinity : 5 * 60 * 1e3)
      );
    }
    clearGcTimeout() {
      if (__privateGet(this, _gcTimeout)) {
        timeoutManager.clearTimeout(__privateGet(this, _gcTimeout));
        __privateSet(this, _gcTimeout, void 0);
      }
    }
  }, _gcTimeout = new WeakMap(), _a4);

  // node_modules/@tanstack/query-core/build/modern/query.js
  var _initialState, _revertState, _cache, _client, _retryer, _defaultOptions, _abortSignalConsumed, _Query_instances, dispatch_fn, _a5;
  var Query = (_a5 = class extends Removable {
    constructor(config) {
      super();
      __privateAdd(this, _Query_instances);
      __privateAdd(this, _initialState);
      __privateAdd(this, _revertState);
      __privateAdd(this, _cache);
      __privateAdd(this, _client);
      __privateAdd(this, _retryer);
      __privateAdd(this, _defaultOptions);
      __privateAdd(this, _abortSignalConsumed);
      __privateSet(this, _abortSignalConsumed, false);
      __privateSet(this, _defaultOptions, config.defaultOptions);
      this.setOptions(config.options);
      this.observers = [];
      __privateSet(this, _client, config.client);
      __privateSet(this, _cache, __privateGet(this, _client).getQueryCache());
      this.queryKey = config.queryKey;
      this.queryHash = config.queryHash;
      __privateSet(this, _initialState, getDefaultState(this.options));
      this.state = config.state ?? __privateGet(this, _initialState);
      this.scheduleGc();
    }
    get meta() {
      return this.options.meta;
    }
    get promise() {
      return __privateGet(this, _retryer)?.promise;
    }
    setOptions(options) {
      this.options = { ...__privateGet(this, _defaultOptions), ...options };
      this.updateGcTime(this.options.gcTime);
      if (this.state && this.state.data === void 0) {
        const defaultState = getDefaultState(this.options);
        if (defaultState.data !== void 0) {
          this.setData(defaultState.data, {
            updatedAt: defaultState.dataUpdatedAt,
            manual: true
          });
          __privateSet(this, _initialState, defaultState);
        }
      }
    }
    optionalRemove() {
      if (!this.observers.length && this.state.fetchStatus === "idle") {
        __privateGet(this, _cache).remove(this);
      }
    }
    setData(newData, options) {
      const data = replaceData(this.state.data, newData, this.options);
      __privateMethod(this, _Query_instances, dispatch_fn).call(this, {
        data,
        type: "success",
        dataUpdatedAt: options?.updatedAt,
        manual: options?.manual
      });
      return data;
    }
    setState(state, setStateOptions) {
      __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "setState", state, setStateOptions });
    }
    cancel(options) {
      const promise = __privateGet(this, _retryer)?.promise;
      __privateGet(this, _retryer)?.cancel(options);
      return promise ? promise.then(noop).catch(noop) : Promise.resolve();
    }
    destroy() {
      super.destroy();
      this.cancel({ silent: true });
    }
    reset() {
      this.destroy();
      this.setState(__privateGet(this, _initialState));
    }
    isActive() {
      return this.observers.some(
        (observer) => resolveEnabled(observer.options.enabled, this) !== false
      );
    }
    isDisabled() {
      if (this.getObserversCount() > 0) {
        return !this.isActive();
      }
      return this.options.queryFn === skipToken || this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
    }
    isStatic() {
      if (this.getObserversCount() > 0) {
        return this.observers.some(
          (observer) => resolveStaleTime(observer.options.staleTime, this) === "static"
        );
      }
      return false;
    }
    isStale() {
      if (this.getObserversCount() > 0) {
        return this.observers.some(
          (observer) => observer.getCurrentResult().isStale
        );
      }
      return this.state.data === void 0 || this.state.isInvalidated;
    }
    isStaleByTime(staleTime = 0) {
      if (this.state.data === void 0) {
        return true;
      }
      if (staleTime === "static") {
        return false;
      }
      if (this.state.isInvalidated) {
        return true;
      }
      return !timeUntilStale(this.state.dataUpdatedAt, staleTime);
    }
    onFocus() {
      const observer = this.observers.find((x4) => x4.shouldFetchOnWindowFocus());
      observer?.refetch({ cancelRefetch: false });
      __privateGet(this, _retryer)?.continue();
    }
    onOnline() {
      const observer = this.observers.find((x4) => x4.shouldFetchOnReconnect());
      observer?.refetch({ cancelRefetch: false });
      __privateGet(this, _retryer)?.continue();
    }
    addObserver(observer) {
      if (!this.observers.includes(observer)) {
        this.observers.push(observer);
        this.clearGcTimeout();
        __privateGet(this, _cache).notify({ type: "observerAdded", query: this, observer });
      }
    }
    removeObserver(observer) {
      if (this.observers.includes(observer)) {
        this.observers = this.observers.filter((x4) => x4 !== observer);
        if (!this.observers.length) {
          if (__privateGet(this, _retryer)) {
            if (__privateGet(this, _abortSignalConsumed)) {
              __privateGet(this, _retryer).cancel({ revert: true });
            } else {
              __privateGet(this, _retryer).cancelRetry();
            }
          }
          this.scheduleGc();
        }
        __privateGet(this, _cache).notify({ type: "observerRemoved", query: this, observer });
      }
    }
    getObserversCount() {
      return this.observers.length;
    }
    invalidate() {
      if (!this.state.isInvalidated) {
        __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "invalidate" });
      }
    }
    async fetch(options, fetchOptions) {
      if (this.state.fetchStatus !== "idle" && // If the promise in the retyer is already rejected, we have to definitely
      // re-start the fetch; there is a chance that the query is still in a
      // pending state when that happens
      __privateGet(this, _retryer)?.status() !== "rejected") {
        if (this.state.data !== void 0 && fetchOptions?.cancelRefetch) {
          this.cancel({ silent: true });
        } else if (__privateGet(this, _retryer)) {
          __privateGet(this, _retryer).continueRetry();
          return __privateGet(this, _retryer).promise;
        }
      }
      if (options) {
        this.setOptions(options);
      }
      if (!this.options.queryFn) {
        const observer = this.observers.find((x4) => x4.options.queryFn);
        if (observer) {
          this.setOptions(observer.options);
        }
      }
      if (true) {
        if (!Array.isArray(this.options.queryKey)) {
          console.error(
            `As of v4, queryKey needs to be an Array. If you are using a string like 'repoData', please change it to an Array, e.g. ['repoData']`
          );
        }
      }
      const abortController = new AbortController();
      const addSignalProperty = (object) => {
        Object.defineProperty(object, "signal", {
          enumerable: true,
          get: () => {
            __privateSet(this, _abortSignalConsumed, true);
            return abortController.signal;
          }
        });
      };
      const fetchFn = () => {
        const queryFn = ensureQueryFn(this.options, fetchOptions);
        const createQueryFnContext = () => {
          const queryFnContext2 = {
            client: __privateGet(this, _client),
            queryKey: this.queryKey,
            meta: this.meta
          };
          addSignalProperty(queryFnContext2);
          return queryFnContext2;
        };
        const queryFnContext = createQueryFnContext();
        __privateSet(this, _abortSignalConsumed, false);
        if (this.options.persister) {
          return this.options.persister(
            queryFn,
            queryFnContext,
            this
          );
        }
        return queryFn(queryFnContext);
      };
      const createFetchContext = () => {
        const context2 = {
          fetchOptions,
          options: this.options,
          queryKey: this.queryKey,
          client: __privateGet(this, _client),
          state: this.state,
          fetchFn
        };
        addSignalProperty(context2);
        return context2;
      };
      const context = createFetchContext();
      this.options.behavior?.onFetch(context, this);
      __privateSet(this, _revertState, this.state);
      if (this.state.fetchStatus === "idle" || this.state.fetchMeta !== context.fetchOptions?.meta) {
        __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "fetch", meta: context.fetchOptions?.meta });
      }
      __privateSet(this, _retryer, createRetryer({
        initialPromise: fetchOptions?.initialPromise,
        fn: context.fetchFn,
        onCancel: (error) => {
          if (error instanceof CancelledError && error.revert) {
            this.setState({
              ...__privateGet(this, _revertState),
              fetchStatus: "idle"
            });
          }
          abortController.abort();
        },
        onFail: (failureCount, error) => {
          __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "failed", failureCount, error });
        },
        onPause: () => {
          __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "pause" });
        },
        onContinue: () => {
          __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "continue" });
        },
        retry: context.options.retry,
        retryDelay: context.options.retryDelay,
        networkMode: context.options.networkMode,
        canRun: () => true
      }));
      try {
        const data = await __privateGet(this, _retryer).start();
        if (data === void 0) {
          if (true) {
            console.error(
              `Query data cannot be undefined. Please make sure to return a value other than undefined from your query function. Affected query key: ${this.queryHash}`
            );
          }
          throw new Error(`${this.queryHash} data is undefined`);
        }
        this.setData(data);
        __privateGet(this, _cache).config.onSuccess?.(data, this);
        __privateGet(this, _cache).config.onSettled?.(
          data,
          this.state.error,
          this
        );
        return data;
      } catch (error) {
        if (error instanceof CancelledError) {
          if (error.silent) {
            return __privateGet(this, _retryer).promise;
          } else if (error.revert) {
            if (this.state.data === void 0) {
              throw error;
            }
            return this.state.data;
          }
        }
        __privateMethod(this, _Query_instances, dispatch_fn).call(this, {
          type: "error",
          error
        });
        __privateGet(this, _cache).config.onError?.(
          error,
          this
        );
        __privateGet(this, _cache).config.onSettled?.(
          this.state.data,
          error,
          this
        );
        throw error;
      } finally {
        this.scheduleGc();
      }
    }
  }, _initialState = new WeakMap(), _revertState = new WeakMap(), _cache = new WeakMap(), _client = new WeakMap(), _retryer = new WeakMap(), _defaultOptions = new WeakMap(), _abortSignalConsumed = new WeakMap(), _Query_instances = new WeakSet(), dispatch_fn = function(action) {
    const reducer = (state) => {
      switch (action.type) {
        case "failed":
          return {
            ...state,
            fetchFailureCount: action.failureCount,
            fetchFailureReason: action.error
          };
        case "pause":
          return {
            ...state,
            fetchStatus: "paused"
          };
        case "continue":
          return {
            ...state,
            fetchStatus: "fetching"
          };
        case "fetch":
          return {
            ...state,
            ...fetchState(state.data, this.options),
            fetchMeta: action.meta ?? null
          };
        case "success":
          const newState = {
            ...state,
            data: action.data,
            dataUpdateCount: state.dataUpdateCount + 1,
            dataUpdatedAt: action.dataUpdatedAt ?? Date.now(),
            error: null,
            isInvalidated: false,
            status: "success",
            ...!action.manual && {
              fetchStatus: "idle",
              fetchFailureCount: 0,
              fetchFailureReason: null
            }
          };
          __privateSet(this, _revertState, action.manual ? newState : void 0);
          return newState;
        case "error":
          const error = action.error;
          return {
            ...state,
            error,
            errorUpdateCount: state.errorUpdateCount + 1,
            errorUpdatedAt: Date.now(),
            fetchFailureCount: state.fetchFailureCount + 1,
            fetchFailureReason: error,
            fetchStatus: "idle",
            status: "error"
          };
        case "invalidate":
          return {
            ...state,
            isInvalidated: true
          };
        case "setState":
          return {
            ...state,
            ...action.state
          };
      }
    };
    this.state = reducer(this.state);
    notifyManager.batch(() => {
      this.observers.forEach((observer) => {
        observer.onQueryUpdate();
      });
      __privateGet(this, _cache).notify({ query: this, type: "updated", action });
    });
  }, _a5);
  function fetchState(data, options) {
    return {
      fetchFailureCount: 0,
      fetchFailureReason: null,
      fetchStatus: canFetch(options.networkMode) ? "fetching" : "paused",
      ...data === void 0 && {
        error: null,
        status: "pending"
      }
    };
  }
  function getDefaultState(options) {
    const data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
    const hasData = data !== void 0;
    const initialDataUpdatedAt = hasData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
    return {
      data,
      dataUpdateCount: 0,
      dataUpdatedAt: hasData ? initialDataUpdatedAt ?? Date.now() : 0,
      error: null,
      errorUpdateCount: 0,
      errorUpdatedAt: 0,
      fetchFailureCount: 0,
      fetchFailureReason: null,
      fetchMeta: null,
      isInvalidated: false,
      status: hasData ? "success" : "pending",
      fetchStatus: "idle"
    };
  }

  // node_modules/@tanstack/query-core/build/modern/queryObserver.js
  var _client2, _currentQuery, _currentQueryInitialState, _currentResult, _currentResultState, _currentResultOptions, _currentThenable, _selectError, _selectFn, _selectResult, _lastQueryWithDefinedData, _staleTimeoutId, _refetchIntervalId, _currentRefetchInterval, _trackedProps, _QueryObserver_instances, executeFetch_fn, updateStaleTimeout_fn, computeRefetchInterval_fn, updateRefetchInterval_fn, updateTimers_fn, clearStaleTimeout_fn, clearRefetchInterval_fn, updateQuery_fn, notify_fn, _a6;
  var QueryObserver = (_a6 = class extends Subscribable {
    constructor(client, options) {
      super();
      __privateAdd(this, _QueryObserver_instances);
      __privateAdd(this, _client2);
      __privateAdd(this, _currentQuery);
      __privateAdd(this, _currentQueryInitialState);
      __privateAdd(this, _currentResult);
      __privateAdd(this, _currentResultState);
      __privateAdd(this, _currentResultOptions);
      __privateAdd(this, _currentThenable);
      __privateAdd(this, _selectError);
      __privateAdd(this, _selectFn);
      __privateAdd(this, _selectResult);
      // This property keeps track of the last query with defined data.
      // It will be used to pass the previous data and query to the placeholder function between renders.
      __privateAdd(this, _lastQueryWithDefinedData);
      __privateAdd(this, _staleTimeoutId);
      __privateAdd(this, _refetchIntervalId);
      __privateAdd(this, _currentRefetchInterval);
      __privateAdd(this, _trackedProps, /* @__PURE__ */ new Set());
      this.options = options;
      __privateSet(this, _client2, client);
      __privateSet(this, _selectError, null);
      __privateSet(this, _currentThenable, pendingThenable());
      this.bindMethods();
      this.setOptions(options);
    }
    bindMethods() {
      this.refetch = this.refetch.bind(this);
    }
    onSubscribe() {
      if (this.listeners.size === 1) {
        __privateGet(this, _currentQuery).addObserver(this);
        if (shouldFetchOnMount(__privateGet(this, _currentQuery), this.options)) {
          __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
        } else {
          this.updateResult();
        }
        __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
      }
    }
    onUnsubscribe() {
      if (!this.hasListeners()) {
        this.destroy();
      }
    }
    shouldFetchOnReconnect() {
      return shouldFetchOn(
        __privateGet(this, _currentQuery),
        this.options,
        this.options.refetchOnReconnect
      );
    }
    shouldFetchOnWindowFocus() {
      return shouldFetchOn(
        __privateGet(this, _currentQuery),
        this.options,
        this.options.refetchOnWindowFocus
      );
    }
    destroy() {
      this.listeners = /* @__PURE__ */ new Set();
      __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
      __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
      __privateGet(this, _currentQuery).removeObserver(this);
    }
    setOptions(options) {
      const prevOptions = this.options;
      const prevQuery = __privateGet(this, _currentQuery);
      this.options = __privateGet(this, _client2).defaultQueryOptions(options);
      if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== "boolean") {
        throw new Error(
          "Expected enabled to be a boolean or a callback that returns a boolean"
        );
      }
      __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
      __privateGet(this, _currentQuery).setOptions(this.options);
      if (prevOptions._defaulted && !shallowEqualObjects(this.options, prevOptions)) {
        __privateGet(this, _client2).getQueryCache().notify({
          type: "observerOptionsUpdated",
          query: __privateGet(this, _currentQuery),
          observer: this
        });
      }
      const mounted = this.hasListeners();
      if (mounted && shouldFetchOptionally(
        __privateGet(this, _currentQuery),
        prevQuery,
        this.options,
        prevOptions
      )) {
        __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
      }
      this.updateResult();
      if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || resolveStaleTime(this.options.staleTime, __privateGet(this, _currentQuery)) !== resolveStaleTime(prevOptions.staleTime, __privateGet(this, _currentQuery)))) {
        __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
      }
      const nextRefetchInterval = __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this);
      if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || nextRefetchInterval !== __privateGet(this, _currentRefetchInterval))) {
        __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, nextRefetchInterval);
      }
    }
    getOptimisticResult(options) {
      const query = __privateGet(this, _client2).getQueryCache().build(__privateGet(this, _client2), options);
      const result = this.createResult(query, options);
      if (shouldAssignObserverCurrentProperties(this, result)) {
        __privateSet(this, _currentResult, result);
        __privateSet(this, _currentResultOptions, this.options);
        __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
      }
      return result;
    }
    getCurrentResult() {
      return __privateGet(this, _currentResult);
    }
    trackResult(result, onPropTracked) {
      return new Proxy(result, {
        get: (target, key) => {
          this.trackProp(key);
          onPropTracked?.(key);
          if (key === "promise" && !this.options.experimental_prefetchInRender && __privateGet(this, _currentThenable).status === "pending") {
            __privateGet(this, _currentThenable).reject(
              new Error(
                "experimental_prefetchInRender feature flag is not enabled"
              )
            );
          }
          return Reflect.get(target, key);
        }
      });
    }
    trackProp(key) {
      __privateGet(this, _trackedProps).add(key);
    }
    getCurrentQuery() {
      return __privateGet(this, _currentQuery);
    }
    refetch({ ...options } = {}) {
      return this.fetch({
        ...options
      });
    }
    fetchOptimistic(options) {
      const defaultedOptions = __privateGet(this, _client2).defaultQueryOptions(options);
      const query = __privateGet(this, _client2).getQueryCache().build(__privateGet(this, _client2), defaultedOptions);
      return query.fetch().then(() => this.createResult(query, defaultedOptions));
    }
    fetch(fetchOptions) {
      return __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this, {
        ...fetchOptions,
        cancelRefetch: fetchOptions.cancelRefetch ?? true
      }).then(() => {
        this.updateResult();
        return __privateGet(this, _currentResult);
      });
    }
    createResult(query, options) {
      const prevQuery = __privateGet(this, _currentQuery);
      const prevOptions = this.options;
      const prevResult = __privateGet(this, _currentResult);
      const prevResultState = __privateGet(this, _currentResultState);
      const prevResultOptions = __privateGet(this, _currentResultOptions);
      const queryChange = query !== prevQuery;
      const queryInitialState = queryChange ? query.state : __privateGet(this, _currentQueryInitialState);
      const { state } = query;
      let newState = { ...state };
      let isPlaceholderData = false;
      let data;
      if (options._optimisticResults) {
        const mounted = this.hasListeners();
        const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
        const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
        if (fetchOnMount || fetchOptionally) {
          newState = {
            ...newState,
            ...fetchState(state.data, query.options)
          };
        }
        if (options._optimisticResults === "isRestoring") {
          newState.fetchStatus = "idle";
        }
      }
      let { error, errorUpdatedAt, status } = newState;
      data = newState.data;
      let skipSelect = false;
      if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
        let placeholderData;
        if (prevResult?.isPlaceholderData && options.placeholderData === prevResultOptions?.placeholderData) {
          placeholderData = prevResult.data;
          skipSelect = true;
        } else {
          placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(
            __privateGet(this, _lastQueryWithDefinedData)?.state.data,
            __privateGet(this, _lastQueryWithDefinedData)
          ) : options.placeholderData;
        }
        if (placeholderData !== void 0) {
          status = "success";
          data = replaceData(
            prevResult?.data,
            placeholderData,
            options
          );
          isPlaceholderData = true;
        }
      }
      if (options.select && data !== void 0 && !skipSelect) {
        if (prevResult && data === prevResultState?.data && options.select === __privateGet(this, _selectFn)) {
          data = __privateGet(this, _selectResult);
        } else {
          try {
            __privateSet(this, _selectFn, options.select);
            data = options.select(data);
            data = replaceData(prevResult?.data, data, options);
            __privateSet(this, _selectResult, data);
            __privateSet(this, _selectError, null);
          } catch (selectError) {
            __privateSet(this, _selectError, selectError);
          }
        }
      }
      if (__privateGet(this, _selectError)) {
        error = __privateGet(this, _selectError);
        data = __privateGet(this, _selectResult);
        errorUpdatedAt = Date.now();
        status = "error";
      }
      const isFetching = newState.fetchStatus === "fetching";
      const isPending = status === "pending";
      const isError = status === "error";
      const isLoading = isPending && isFetching;
      const hasData = data !== void 0;
      const result = {
        status,
        fetchStatus: newState.fetchStatus,
        isPending,
        isSuccess: status === "success",
        isError,
        isInitialLoading: isLoading,
        isLoading,
        data,
        dataUpdatedAt: newState.dataUpdatedAt,
        error,
        errorUpdatedAt,
        failureCount: newState.fetchFailureCount,
        failureReason: newState.fetchFailureReason,
        errorUpdateCount: newState.errorUpdateCount,
        isFetched: newState.dataUpdateCount > 0 || newState.errorUpdateCount > 0,
        isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
        isFetching,
        isRefetching: isFetching && !isPending,
        isLoadingError: isError && !hasData,
        isPaused: newState.fetchStatus === "paused",
        isPlaceholderData,
        isRefetchError: isError && hasData,
        isStale: isStale(query, options),
        refetch: this.refetch,
        promise: __privateGet(this, _currentThenable),
        isEnabled: resolveEnabled(options.enabled, query) !== false
      };
      const nextResult = result;
      if (this.options.experimental_prefetchInRender) {
        const finalizeThenableIfPossible = (thenable) => {
          if (nextResult.status === "error") {
            thenable.reject(nextResult.error);
          } else if (nextResult.data !== void 0) {
            thenable.resolve(nextResult.data);
          }
        };
        const recreateThenable = () => {
          const pending = __privateSet(this, _currentThenable, nextResult.promise = pendingThenable());
          finalizeThenableIfPossible(pending);
        };
        const prevThenable = __privateGet(this, _currentThenable);
        switch (prevThenable.status) {
          case "pending":
            if (query.queryHash === prevQuery.queryHash) {
              finalizeThenableIfPossible(prevThenable);
            }
            break;
          case "fulfilled":
            if (nextResult.status === "error" || nextResult.data !== prevThenable.value) {
              recreateThenable();
            }
            break;
          case "rejected":
            if (nextResult.status !== "error" || nextResult.error !== prevThenable.reason) {
              recreateThenable();
            }
            break;
        }
      }
      return nextResult;
    }
    updateResult() {
      const prevResult = __privateGet(this, _currentResult);
      const nextResult = this.createResult(__privateGet(this, _currentQuery), this.options);
      __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
      __privateSet(this, _currentResultOptions, this.options);
      if (__privateGet(this, _currentResultState).data !== void 0) {
        __privateSet(this, _lastQueryWithDefinedData, __privateGet(this, _currentQuery));
      }
      if (shallowEqualObjects(nextResult, prevResult)) {
        return;
      }
      __privateSet(this, _currentResult, nextResult);
      const shouldNotifyListeners = () => {
        if (!prevResult) {
          return true;
        }
        const { notifyOnChangeProps } = this.options;
        const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
        if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !__privateGet(this, _trackedProps).size) {
          return true;
        }
        const includedProps = new Set(
          notifyOnChangePropsValue ?? __privateGet(this, _trackedProps)
        );
        if (this.options.throwOnError) {
          includedProps.add("error");
        }
        return Object.keys(__privateGet(this, _currentResult)).some((key) => {
          const typedKey = key;
          const changed = __privateGet(this, _currentResult)[typedKey] !== prevResult[typedKey];
          return changed && includedProps.has(typedKey);
        });
      };
      __privateMethod(this, _QueryObserver_instances, notify_fn).call(this, { listeners: shouldNotifyListeners() });
    }
    onQueryUpdate() {
      this.updateResult();
      if (this.hasListeners()) {
        __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
      }
    }
  }, _client2 = new WeakMap(), _currentQuery = new WeakMap(), _currentQueryInitialState = new WeakMap(), _currentResult = new WeakMap(), _currentResultState = new WeakMap(), _currentResultOptions = new WeakMap(), _currentThenable = new WeakMap(), _selectError = new WeakMap(), _selectFn = new WeakMap(), _selectResult = new WeakMap(), _lastQueryWithDefinedData = new WeakMap(), _staleTimeoutId = new WeakMap(), _refetchIntervalId = new WeakMap(), _currentRefetchInterval = new WeakMap(), _trackedProps = new WeakMap(), _QueryObserver_instances = new WeakSet(), executeFetch_fn = function(fetchOptions) {
    __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
    let promise = __privateGet(this, _currentQuery).fetch(
      this.options,
      fetchOptions
    );
    if (!fetchOptions?.throwOnError) {
      promise = promise.catch(noop);
    }
    return promise;
  }, updateStaleTimeout_fn = function() {
    __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
    const staleTime = resolveStaleTime(
      this.options.staleTime,
      __privateGet(this, _currentQuery)
    );
    if (isServer || __privateGet(this, _currentResult).isStale || !isValidTimeout(staleTime)) {
      return;
    }
    const time = timeUntilStale(__privateGet(this, _currentResult).dataUpdatedAt, staleTime);
    const timeout = time + 1;
    __privateSet(this, _staleTimeoutId, timeoutManager.setTimeout(() => {
      if (!__privateGet(this, _currentResult).isStale) {
        this.updateResult();
      }
    }, timeout));
  }, computeRefetchInterval_fn = function() {
    return (typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(__privateGet(this, _currentQuery)) : this.options.refetchInterval) ?? false;
  }, updateRefetchInterval_fn = function(nextInterval) {
    __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
    __privateSet(this, _currentRefetchInterval, nextInterval);
    if (isServer || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) === false || !isValidTimeout(__privateGet(this, _currentRefetchInterval)) || __privateGet(this, _currentRefetchInterval) === 0) {
      return;
    }
    __privateSet(this, _refetchIntervalId, timeoutManager.setInterval(() => {
      if (this.options.refetchIntervalInBackground || focusManager.isFocused()) {
        __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
      }
    }, __privateGet(this, _currentRefetchInterval)));
  }, updateTimers_fn = function() {
    __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
    __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this));
  }, clearStaleTimeout_fn = function() {
    if (__privateGet(this, _staleTimeoutId)) {
      timeoutManager.clearTimeout(__privateGet(this, _staleTimeoutId));
      __privateSet(this, _staleTimeoutId, void 0);
    }
  }, clearRefetchInterval_fn = function() {
    if (__privateGet(this, _refetchIntervalId)) {
      timeoutManager.clearInterval(__privateGet(this, _refetchIntervalId));
      __privateSet(this, _refetchIntervalId, void 0);
    }
  }, updateQuery_fn = function() {
    const query = __privateGet(this, _client2).getQueryCache().build(__privateGet(this, _client2), this.options);
    if (query === __privateGet(this, _currentQuery)) {
      return;
    }
    const prevQuery = __privateGet(this, _currentQuery);
    __privateSet(this, _currentQuery, query);
    __privateSet(this, _currentQueryInitialState, query.state);
    if (this.hasListeners()) {
      prevQuery?.removeObserver(this);
      query.addObserver(this);
    }
  }, notify_fn = function(notifyOptions) {
    notifyManager.batch(() => {
      if (notifyOptions.listeners) {
        this.listeners.forEach((listener) => {
          listener(__privateGet(this, _currentResult));
        });
      }
      __privateGet(this, _client2).getQueryCache().notify({
        query: __privateGet(this, _currentQuery),
        type: "observerResultsUpdated"
      });
    });
  }, _a6);
  function shouldLoadOnMount(query, options) {
    return resolveEnabled(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && options.retryOnMount === false);
  }
  function shouldFetchOnMount(query, options) {
    return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
  }
  function shouldFetchOn(query, options, field) {
    if (resolveEnabled(options.enabled, query) !== false && resolveStaleTime(options.staleTime, query) !== "static") {
      const value = typeof field === "function" ? field(query) : field;
      return value === "always" || value !== false && isStale(query, options);
    }
    return false;
  }
  function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
    return (query !== prevQuery || resolveEnabled(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
  }
  function isStale(query, options) {
    return resolveEnabled(options.enabled, query) !== false && query.isStaleByTime(resolveStaleTime(options.staleTime, query));
  }
  function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
    if (!shallowEqualObjects(observer.getCurrentResult(), optimisticResult)) {
      return true;
    }
    return false;
  }

  // node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js
  function infiniteQueryBehavior(pages) {
    return {
      onFetch: (context, query) => {
        const options = context.options;
        const direction = context.fetchOptions?.meta?.fetchMore?.direction;
        const oldPages = context.state.data?.pages || [];
        const oldPageParams = context.state.data?.pageParams || [];
        let result = { pages: [], pageParams: [] };
        let currentPage = 0;
        const fetchFn = async () => {
          let cancelled = false;
          const addSignalProperty = (object) => {
            Object.defineProperty(object, "signal", {
              enumerable: true,
              get: () => {
                if (context.signal.aborted) {
                  cancelled = true;
                } else {
                  context.signal.addEventListener("abort", () => {
                    cancelled = true;
                  });
                }
                return context.signal;
              }
            });
          };
          const queryFn = ensureQueryFn(context.options, context.fetchOptions);
          const fetchPage = async (data, param, previous) => {
            if (cancelled) {
              return Promise.reject();
            }
            if (param == null && data.pages.length) {
              return Promise.resolve(data);
            }
            const createQueryFnContext = () => {
              const queryFnContext2 = {
                client: context.client,
                queryKey: context.queryKey,
                pageParam: param,
                direction: previous ? "backward" : "forward",
                meta: context.options.meta
              };
              addSignalProperty(queryFnContext2);
              return queryFnContext2;
            };
            const queryFnContext = createQueryFnContext();
            const page = await queryFn(queryFnContext);
            const { maxPages } = context.options;
            const addTo = previous ? addToStart : addToEnd;
            return {
              pages: addTo(data.pages, page, maxPages),
              pageParams: addTo(data.pageParams, param, maxPages)
            };
          };
          if (direction && oldPages.length) {
            const previous = direction === "backward";
            const pageParamFn = previous ? getPreviousPageParam : getNextPageParam;
            const oldData = {
              pages: oldPages,
              pageParams: oldPageParams
            };
            const param = pageParamFn(options, oldData);
            result = await fetchPage(oldData, param, previous);
          } else {
            const remainingPages = pages ?? oldPages.length;
            do {
              const param = currentPage === 0 ? oldPageParams[0] ?? options.initialPageParam : getNextPageParam(options, result);
              if (currentPage > 0 && param == null) {
                break;
              }
              result = await fetchPage(result, param);
              currentPage++;
            } while (currentPage < remainingPages);
          }
          return result;
        };
        if (context.options.persister) {
          context.fetchFn = () => {
            return context.options.persister?.(
              fetchFn,
              {
                client: context.client,
                queryKey: context.queryKey,
                meta: context.options.meta,
                signal: context.signal
              },
              query
            );
          };
        } else {
          context.fetchFn = fetchFn;
        }
      }
    };
  }
  function getNextPageParam(options, { pages, pageParams }) {
    const lastIndex = pages.length - 1;
    return pages.length > 0 ? options.getNextPageParam(
      pages[lastIndex],
      pages,
      pageParams[lastIndex],
      pageParams
    ) : void 0;
  }
  function getPreviousPageParam(options, { pages, pageParams }) {
    return pages.length > 0 ? options.getPreviousPageParam?.(pages[0], pages, pageParams[0], pageParams) : void 0;
  }

  // node_modules/@tanstack/query-core/build/modern/mutation.js
  var _client3, _observers, _mutationCache, _retryer2, _Mutation_instances, dispatch_fn2, _a7;
  var Mutation = (_a7 = class extends Removable {
    constructor(config) {
      super();
      __privateAdd(this, _Mutation_instances);
      __privateAdd(this, _client3);
      __privateAdd(this, _observers);
      __privateAdd(this, _mutationCache);
      __privateAdd(this, _retryer2);
      __privateSet(this, _client3, config.client);
      this.mutationId = config.mutationId;
      __privateSet(this, _mutationCache, config.mutationCache);
      __privateSet(this, _observers, []);
      this.state = config.state || getDefaultState2();
      this.setOptions(config.options);
      this.scheduleGc();
    }
    setOptions(options) {
      this.options = options;
      this.updateGcTime(this.options.gcTime);
    }
    get meta() {
      return this.options.meta;
    }
    addObserver(observer) {
      if (!__privateGet(this, _observers).includes(observer)) {
        __privateGet(this, _observers).push(observer);
        this.clearGcTimeout();
        __privateGet(this, _mutationCache).notify({
          type: "observerAdded",
          mutation: this,
          observer
        });
      }
    }
    removeObserver(observer) {
      __privateSet(this, _observers, __privateGet(this, _observers).filter((x4) => x4 !== observer));
      this.scheduleGc();
      __privateGet(this, _mutationCache).notify({
        type: "observerRemoved",
        mutation: this,
        observer
      });
    }
    optionalRemove() {
      if (!__privateGet(this, _observers).length) {
        if (this.state.status === "pending") {
          this.scheduleGc();
        } else {
          __privateGet(this, _mutationCache).remove(this);
        }
      }
    }
    continue() {
      return __privateGet(this, _retryer2)?.continue() ?? // continuing a mutation assumes that variables are set, mutation must have been dehydrated before
      this.execute(this.state.variables);
    }
    async execute(variables) {
      const onContinue = () => {
        __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "continue" });
      };
      const mutationFnContext = {
        client: __privateGet(this, _client3),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      __privateSet(this, _retryer2, createRetryer({
        fn: () => {
          if (!this.options.mutationFn) {
            return Promise.reject(new Error("No mutationFn found"));
          }
          return this.options.mutationFn(variables, mutationFnContext);
        },
        onFail: (failureCount, error) => {
          __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "failed", failureCount, error });
        },
        onPause: () => {
          __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "pause" });
        },
        onContinue,
        retry: this.options.retry ?? 0,
        retryDelay: this.options.retryDelay,
        networkMode: this.options.networkMode,
        canRun: () => __privateGet(this, _mutationCache).canRun(this)
      }));
      const restored = this.state.status === "pending";
      const isPaused = !__privateGet(this, _retryer2).canStart();
      try {
        if (restored) {
          onContinue();
        } else {
          __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "pending", variables, isPaused });
          await __privateGet(this, _mutationCache).config.onMutate?.(
            variables,
            this,
            mutationFnContext
          );
          const context = await this.options.onMutate?.(
            variables,
            mutationFnContext
          );
          if (context !== this.state.context) {
            __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, {
              type: "pending",
              context,
              variables,
              isPaused
            });
          }
        }
        const data = await __privateGet(this, _retryer2).start();
        await __privateGet(this, _mutationCache).config.onSuccess?.(
          data,
          variables,
          this.state.context,
          this,
          mutationFnContext
        );
        await this.options.onSuccess?.(
          data,
          variables,
          this.state.context,
          mutationFnContext
        );
        await __privateGet(this, _mutationCache).config.onSettled?.(
          data,
          null,
          this.state.variables,
          this.state.context,
          this,
          mutationFnContext
        );
        await this.options.onSettled?.(
          data,
          null,
          variables,
          this.state.context,
          mutationFnContext
        );
        __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "success", data });
        return data;
      } catch (error) {
        try {
          await __privateGet(this, _mutationCache).config.onError?.(
            error,
            variables,
            this.state.context,
            this,
            mutationFnContext
          );
          await this.options.onError?.(
            error,
            variables,
            this.state.context,
            mutationFnContext
          );
          await __privateGet(this, _mutationCache).config.onSettled?.(
            void 0,
            error,
            this.state.variables,
            this.state.context,
            this,
            mutationFnContext
          );
          await this.options.onSettled?.(
            void 0,
            error,
            variables,
            this.state.context,
            mutationFnContext
          );
          throw error;
        } finally {
          __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "error", error });
        }
      } finally {
        __privateGet(this, _mutationCache).runNext(this);
      }
    }
  }, _client3 = new WeakMap(), _observers = new WeakMap(), _mutationCache = new WeakMap(), _retryer2 = new WeakMap(), _Mutation_instances = new WeakSet(), dispatch_fn2 = function(action) {
    const reducer = (state) => {
      switch (action.type) {
        case "failed":
          return {
            ...state,
            failureCount: action.failureCount,
            failureReason: action.error
          };
        case "pause":
          return {
            ...state,
            isPaused: true
          };
        case "continue":
          return {
            ...state,
            isPaused: false
          };
        case "pending":
          return {
            ...state,
            context: action.context,
            data: void 0,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: action.isPaused,
            status: "pending",
            variables: action.variables,
            submittedAt: Date.now()
          };
        case "success":
          return {
            ...state,
            data: action.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: "success",
            isPaused: false
          };
        case "error":
          return {
            ...state,
            data: void 0,
            error: action.error,
            failureCount: state.failureCount + 1,
            failureReason: action.error,
            isPaused: false,
            status: "error"
          };
      }
    };
    this.state = reducer(this.state);
    notifyManager.batch(() => {
      __privateGet(this, _observers).forEach((observer) => {
        observer.onMutationUpdate(action);
      });
      __privateGet(this, _mutationCache).notify({
        mutation: this,
        type: "updated",
        action
      });
    });
  }, _a7);
  function getDefaultState2() {
    return {
      context: void 0,
      data: void 0,
      error: null,
      failureCount: 0,
      failureReason: null,
      isPaused: false,
      status: "idle",
      variables: void 0,
      submittedAt: 0
    };
  }

  // node_modules/@tanstack/query-core/build/modern/mutationCache.js
  var _mutations, _scopes, _mutationId, _a8;
  var MutationCache = (_a8 = class extends Subscribable {
    constructor(config = {}) {
      super();
      __privateAdd(this, _mutations);
      __privateAdd(this, _scopes);
      __privateAdd(this, _mutationId);
      this.config = config;
      __privateSet(this, _mutations, /* @__PURE__ */ new Set());
      __privateSet(this, _scopes, /* @__PURE__ */ new Map());
      __privateSet(this, _mutationId, 0);
    }
    build(client, options, state) {
      const mutation = new Mutation({
        client,
        mutationCache: this,
        mutationId: ++__privateWrapper(this, _mutationId)._,
        options: client.defaultMutationOptions(options),
        state
      });
      this.add(mutation);
      return mutation;
    }
    add(mutation) {
      __privateGet(this, _mutations).add(mutation);
      const scope = scopeFor(mutation);
      if (typeof scope === "string") {
        const scopedMutations = __privateGet(this, _scopes).get(scope);
        if (scopedMutations) {
          scopedMutations.push(mutation);
        } else {
          __privateGet(this, _scopes).set(scope, [mutation]);
        }
      }
      this.notify({ type: "added", mutation });
    }
    remove(mutation) {
      if (__privateGet(this, _mutations).delete(mutation)) {
        const scope = scopeFor(mutation);
        if (typeof scope === "string") {
          const scopedMutations = __privateGet(this, _scopes).get(scope);
          if (scopedMutations) {
            if (scopedMutations.length > 1) {
              const index3 = scopedMutations.indexOf(mutation);
              if (index3 !== -1) {
                scopedMutations.splice(index3, 1);
              }
            } else if (scopedMutations[0] === mutation) {
              __privateGet(this, _scopes).delete(scope);
            }
          }
        }
      }
      this.notify({ type: "removed", mutation });
    }
    canRun(mutation) {
      const scope = scopeFor(mutation);
      if (typeof scope === "string") {
        const mutationsWithSameScope = __privateGet(this, _scopes).get(scope);
        const firstPendingMutation = mutationsWithSameScope?.find(
          (m5) => m5.state.status === "pending"
        );
        return !firstPendingMutation || firstPendingMutation === mutation;
      } else {
        return true;
      }
    }
    runNext(mutation) {
      const scope = scopeFor(mutation);
      if (typeof scope === "string") {
        const foundMutation = __privateGet(this, _scopes).get(scope)?.find((m5) => m5 !== mutation && m5.state.isPaused);
        return foundMutation?.continue() ?? Promise.resolve();
      } else {
        return Promise.resolve();
      }
    }
    clear() {
      notifyManager.batch(() => {
        __privateGet(this, _mutations).forEach((mutation) => {
          this.notify({ type: "removed", mutation });
        });
        __privateGet(this, _mutations).clear();
        __privateGet(this, _scopes).clear();
      });
    }
    getAll() {
      return Array.from(__privateGet(this, _mutations));
    }
    find(filters) {
      const defaultedFilters = { exact: true, ...filters };
      return this.getAll().find(
        (mutation) => matchMutation(defaultedFilters, mutation)
      );
    }
    findAll(filters = {}) {
      return this.getAll().filter((mutation) => matchMutation(filters, mutation));
    }
    notify(event) {
      notifyManager.batch(() => {
        this.listeners.forEach((listener) => {
          listener(event);
        });
      });
    }
    resumePausedMutations() {
      const pausedMutations = this.getAll().filter((x4) => x4.state.isPaused);
      return notifyManager.batch(
        () => Promise.all(
          pausedMutations.map((mutation) => mutation.continue().catch(noop))
        )
      );
    }
  }, _mutations = new WeakMap(), _scopes = new WeakMap(), _mutationId = new WeakMap(), _a8);
  function scopeFor(mutation) {
    return mutation.options.scope?.id;
  }

  // node_modules/@tanstack/query-core/build/modern/queryCache.js
  var _queries, _a9;
  var QueryCache = (_a9 = class extends Subscribable {
    constructor(config = {}) {
      super();
      __privateAdd(this, _queries);
      this.config = config;
      __privateSet(this, _queries, /* @__PURE__ */ new Map());
    }
    build(client, options, state) {
      const queryKey = options.queryKey;
      const queryHash = options.queryHash ?? hashQueryKeyByOptions(queryKey, options);
      let query = this.get(queryHash);
      if (!query) {
        query = new Query({
          client,
          queryKey,
          queryHash,
          options: client.defaultQueryOptions(options),
          state,
          defaultOptions: client.getQueryDefaults(queryKey)
        });
        this.add(query);
      }
      return query;
    }
    add(query) {
      if (!__privateGet(this, _queries).has(query.queryHash)) {
        __privateGet(this, _queries).set(query.queryHash, query);
        this.notify({
          type: "added",
          query
        });
      }
    }
    remove(query) {
      const queryInMap = __privateGet(this, _queries).get(query.queryHash);
      if (queryInMap) {
        query.destroy();
        if (queryInMap === query) {
          __privateGet(this, _queries).delete(query.queryHash);
        }
        this.notify({ type: "removed", query });
      }
    }
    clear() {
      notifyManager.batch(() => {
        this.getAll().forEach((query) => {
          this.remove(query);
        });
      });
    }
    get(queryHash) {
      return __privateGet(this, _queries).get(queryHash);
    }
    getAll() {
      return [...__privateGet(this, _queries).values()];
    }
    find(filters) {
      const defaultedFilters = { exact: true, ...filters };
      return this.getAll().find(
        (query) => matchQuery(defaultedFilters, query)
      );
    }
    findAll(filters = {}) {
      const queries = this.getAll();
      return Object.keys(filters).length > 0 ? queries.filter((query) => matchQuery(filters, query)) : queries;
    }
    notify(event) {
      notifyManager.batch(() => {
        this.listeners.forEach((listener) => {
          listener(event);
        });
      });
    }
    onFocus() {
      notifyManager.batch(() => {
        this.getAll().forEach((query) => {
          query.onFocus();
        });
      });
    }
    onOnline() {
      notifyManager.batch(() => {
        this.getAll().forEach((query) => {
          query.onOnline();
        });
      });
    }
  }, _queries = new WeakMap(), _a9);

  // node_modules/@tanstack/query-core/build/modern/queryClient.js
  var _queryCache, _mutationCache2, _defaultOptions2, _queryDefaults, _mutationDefaults, _mountCount, _unsubscribeFocus, _unsubscribeOnline, _a10;
  var QueryClient = (_a10 = class {
    constructor(config = {}) {
      __privateAdd(this, _queryCache);
      __privateAdd(this, _mutationCache2);
      __privateAdd(this, _defaultOptions2);
      __privateAdd(this, _queryDefaults);
      __privateAdd(this, _mutationDefaults);
      __privateAdd(this, _mountCount);
      __privateAdd(this, _unsubscribeFocus);
      __privateAdd(this, _unsubscribeOnline);
      __privateSet(this, _queryCache, config.queryCache || new QueryCache());
      __privateSet(this, _mutationCache2, config.mutationCache || new MutationCache());
      __privateSet(this, _defaultOptions2, config.defaultOptions || {});
      __privateSet(this, _queryDefaults, /* @__PURE__ */ new Map());
      __privateSet(this, _mutationDefaults, /* @__PURE__ */ new Map());
      __privateSet(this, _mountCount, 0);
    }
    mount() {
      __privateWrapper(this, _mountCount)._++;
      if (__privateGet(this, _mountCount) !== 1) return;
      __privateSet(this, _unsubscribeFocus, focusManager.subscribe(async (focused) => {
        if (focused) {
          await this.resumePausedMutations();
          __privateGet(this, _queryCache).onFocus();
        }
      }));
      __privateSet(this, _unsubscribeOnline, onlineManager.subscribe(async (online) => {
        if (online) {
          await this.resumePausedMutations();
          __privateGet(this, _queryCache).onOnline();
        }
      }));
    }
    unmount() {
      var _a12, _b;
      __privateWrapper(this, _mountCount)._--;
      if (__privateGet(this, _mountCount) !== 0) return;
      (_a12 = __privateGet(this, _unsubscribeFocus)) == null ? void 0 : _a12.call(this);
      __privateSet(this, _unsubscribeFocus, void 0);
      (_b = __privateGet(this, _unsubscribeOnline)) == null ? void 0 : _b.call(this);
      __privateSet(this, _unsubscribeOnline, void 0);
    }
    isFetching(filters) {
      return __privateGet(this, _queryCache).findAll({ ...filters, fetchStatus: "fetching" }).length;
    }
    isMutating(filters) {
      return __privateGet(this, _mutationCache2).findAll({ ...filters, status: "pending" }).length;
    }
    /**
     * Imperative (non-reactive) way to retrieve data for a QueryKey.
     * Should only be used in callbacks or functions where reading the latest data is necessary, e.g. for optimistic updates.
     *
     * Hint: Do not use this function inside a component, because it won't receive updates.
     * Use `useQuery` to create a `QueryObserver` that subscribes to changes.
     */
    getQueryData(queryKey) {
      const options = this.defaultQueryOptions({ queryKey });
      return __privateGet(this, _queryCache).get(options.queryHash)?.state.data;
    }
    ensureQueryData(options) {
      const defaultedOptions = this.defaultQueryOptions(options);
      const query = __privateGet(this, _queryCache).build(this, defaultedOptions);
      const cachedData = query.state.data;
      if (cachedData === void 0) {
        return this.fetchQuery(options);
      }
      if (options.revalidateIfStale && query.isStaleByTime(resolveStaleTime(defaultedOptions.staleTime, query))) {
        void this.prefetchQuery(defaultedOptions);
      }
      return Promise.resolve(cachedData);
    }
    getQueriesData(filters) {
      return __privateGet(this, _queryCache).findAll(filters).map(({ queryKey, state }) => {
        const data = state.data;
        return [queryKey, data];
      });
    }
    setQueryData(queryKey, updater, options) {
      const defaultedOptions = this.defaultQueryOptions({ queryKey });
      const query = __privateGet(this, _queryCache).get(
        defaultedOptions.queryHash
      );
      const prevData = query?.state.data;
      const data = functionalUpdate(updater, prevData);
      if (data === void 0) {
        return void 0;
      }
      return __privateGet(this, _queryCache).build(this, defaultedOptions).setData(data, { ...options, manual: true });
    }
    setQueriesData(filters, updater, options) {
      return notifyManager.batch(
        () => __privateGet(this, _queryCache).findAll(filters).map(({ queryKey }) => [
          queryKey,
          this.setQueryData(queryKey, updater, options)
        ])
      );
    }
    getQueryState(queryKey) {
      const options = this.defaultQueryOptions({ queryKey });
      return __privateGet(this, _queryCache).get(
        options.queryHash
      )?.state;
    }
    removeQueries(filters) {
      const queryCache = __privateGet(this, _queryCache);
      notifyManager.batch(() => {
        queryCache.findAll(filters).forEach((query) => {
          queryCache.remove(query);
        });
      });
    }
    resetQueries(filters, options) {
      const queryCache = __privateGet(this, _queryCache);
      return notifyManager.batch(() => {
        queryCache.findAll(filters).forEach((query) => {
          query.reset();
        });
        return this.refetchQueries(
          {
            type: "active",
            ...filters
          },
          options
        );
      });
    }
    cancelQueries(filters, cancelOptions = {}) {
      const defaultedCancelOptions = { revert: true, ...cancelOptions };
      const promises = notifyManager.batch(
        () => __privateGet(this, _queryCache).findAll(filters).map((query) => query.cancel(defaultedCancelOptions))
      );
      return Promise.all(promises).then(noop).catch(noop);
    }
    invalidateQueries(filters, options = {}) {
      return notifyManager.batch(() => {
        __privateGet(this, _queryCache).findAll(filters).forEach((query) => {
          query.invalidate();
        });
        if (filters?.refetchType === "none") {
          return Promise.resolve();
        }
        return this.refetchQueries(
          {
            ...filters,
            type: filters?.refetchType ?? filters?.type ?? "active"
          },
          options
        );
      });
    }
    refetchQueries(filters, options = {}) {
      const fetchOptions = {
        ...options,
        cancelRefetch: options.cancelRefetch ?? true
      };
      const promises = notifyManager.batch(
        () => __privateGet(this, _queryCache).findAll(filters).filter((query) => !query.isDisabled() && !query.isStatic()).map((query) => {
          let promise = query.fetch(void 0, fetchOptions);
          if (!fetchOptions.throwOnError) {
            promise = promise.catch(noop);
          }
          return query.state.fetchStatus === "paused" ? Promise.resolve() : promise;
        })
      );
      return Promise.all(promises).then(noop);
    }
    fetchQuery(options) {
      const defaultedOptions = this.defaultQueryOptions(options);
      if (defaultedOptions.retry === void 0) {
        defaultedOptions.retry = false;
      }
      const query = __privateGet(this, _queryCache).build(this, defaultedOptions);
      return query.isStaleByTime(
        resolveStaleTime(defaultedOptions.staleTime, query)
      ) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
    }
    prefetchQuery(options) {
      return this.fetchQuery(options).then(noop).catch(noop);
    }
    fetchInfiniteQuery(options) {
      options.behavior = infiniteQueryBehavior(options.pages);
      return this.fetchQuery(options);
    }
    prefetchInfiniteQuery(options) {
      return this.fetchInfiniteQuery(options).then(noop).catch(noop);
    }
    ensureInfiniteQueryData(options) {
      options.behavior = infiniteQueryBehavior(options.pages);
      return this.ensureQueryData(options);
    }
    resumePausedMutations() {
      if (onlineManager.isOnline()) {
        return __privateGet(this, _mutationCache2).resumePausedMutations();
      }
      return Promise.resolve();
    }
    getQueryCache() {
      return __privateGet(this, _queryCache);
    }
    getMutationCache() {
      return __privateGet(this, _mutationCache2);
    }
    getDefaultOptions() {
      return __privateGet(this, _defaultOptions2);
    }
    setDefaultOptions(options) {
      __privateSet(this, _defaultOptions2, options);
    }
    setQueryDefaults(queryKey, options) {
      __privateGet(this, _queryDefaults).set(hashKey(queryKey), {
        queryKey,
        defaultOptions: options
      });
    }
    getQueryDefaults(queryKey) {
      const defaults = [...__privateGet(this, _queryDefaults).values()];
      const result = {};
      defaults.forEach((queryDefault) => {
        if (partialMatchKey(queryKey, queryDefault.queryKey)) {
          Object.assign(result, queryDefault.defaultOptions);
        }
      });
      return result;
    }
    setMutationDefaults(mutationKey, options) {
      __privateGet(this, _mutationDefaults).set(hashKey(mutationKey), {
        mutationKey,
        defaultOptions: options
      });
    }
    getMutationDefaults(mutationKey) {
      const defaults = [...__privateGet(this, _mutationDefaults).values()];
      const result = {};
      defaults.forEach((queryDefault) => {
        if (partialMatchKey(mutationKey, queryDefault.mutationKey)) {
          Object.assign(result, queryDefault.defaultOptions);
        }
      });
      return result;
    }
    defaultQueryOptions(options) {
      if (options._defaulted) {
        return options;
      }
      const defaultedOptions = {
        ...__privateGet(this, _defaultOptions2).queries,
        ...this.getQueryDefaults(options.queryKey),
        ...options,
        _defaulted: true
      };
      if (!defaultedOptions.queryHash) {
        defaultedOptions.queryHash = hashQueryKeyByOptions(
          defaultedOptions.queryKey,
          defaultedOptions
        );
      }
      if (defaultedOptions.refetchOnReconnect === void 0) {
        defaultedOptions.refetchOnReconnect = defaultedOptions.networkMode !== "always";
      }
      if (defaultedOptions.throwOnError === void 0) {
        defaultedOptions.throwOnError = !!defaultedOptions.suspense;
      }
      if (!defaultedOptions.networkMode && defaultedOptions.persister) {
        defaultedOptions.networkMode = "offlineFirst";
      }
      if (defaultedOptions.queryFn === skipToken) {
        defaultedOptions.enabled = false;
      }
      return defaultedOptions;
    }
    defaultMutationOptions(options) {
      if (options?._defaulted) {
        return options;
      }
      return {
        ...__privateGet(this, _defaultOptions2).mutations,
        ...options?.mutationKey && this.getMutationDefaults(options.mutationKey),
        ...options,
        _defaulted: true
      };
    }
    clear() {
      __privateGet(this, _queryCache).clear();
      __privateGet(this, _mutationCache2).clear();
    }
  }, _queryCache = new WeakMap(), _mutationCache2 = new WeakMap(), _defaultOptions2 = new WeakMap(), _queryDefaults = new WeakMap(), _mutationDefaults = new WeakMap(), _mountCount = new WeakMap(), _unsubscribeFocus = new WeakMap(), _unsubscribeOnline = new WeakMap(), _a10);

  // node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js
  var React = __toESM(require_compat(), 1);
  var import_jsx_runtime = __toESM(require_jsxRuntime(), 1);
  var QueryClientContext = React.createContext(
    void 0
  );
  var useQueryClient = (queryClient2) => {
    const client = React.useContext(QueryClientContext);
    if (queryClient2) {
      return queryClient2;
    }
    if (!client) {
      throw new Error("No QueryClient set, use QueryClientProvider to set one");
    }
    return client;
  };
  var QueryClientProvider = ({
    client,
    children
  }) => {
    React.useEffect(() => {
      client.mount();
      return () => {
        client.unmount();
      };
    }, [client]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientContext.Provider, { value: client, children });
  };

  // node_modules/@tanstack/react-query/build/modern/IsRestoringProvider.js
  var React2 = __toESM(require_compat(), 1);
  var IsRestoringContext = React2.createContext(false);
  var useIsRestoring = () => React2.useContext(IsRestoringContext);
  var IsRestoringProvider = IsRestoringContext.Provider;

  // node_modules/@tanstack/react-query/build/modern/QueryErrorResetBoundary.js
  var React3 = __toESM(require_compat(), 1);
  var import_jsx_runtime2 = __toESM(require_jsxRuntime(), 1);
  function createValue() {
    let isReset = false;
    return {
      clearReset: () => {
        isReset = false;
      },
      reset: () => {
        isReset = true;
      },
      isReset: () => {
        return isReset;
      }
    };
  }
  var QueryErrorResetBoundaryContext = React3.createContext(createValue());
  var useQueryErrorResetBoundary = () => React3.useContext(QueryErrorResetBoundaryContext);

  // node_modules/@tanstack/react-query/build/modern/errorBoundaryUtils.js
  var React4 = __toESM(require_compat(), 1);
  var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary) => {
    if (options.suspense || options.throwOnError || options.experimental_prefetchInRender) {
      if (!errorResetBoundary.isReset()) {
        options.retryOnMount = false;
      }
    }
  };
  var useClearResetErrorBoundary = (errorResetBoundary) => {
    React4.useEffect(() => {
      errorResetBoundary.clearReset();
    }, [errorResetBoundary]);
  };
  var getHasError = ({
    result,
    errorResetBoundary,
    throwOnError,
    query,
    suspense
  }) => {
    return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === void 0 || shouldThrowError(throwOnError, [result.error, query]));
  };

  // node_modules/@tanstack/react-query/build/modern/suspense.js
  var ensureSuspenseTimers = (defaultedOptions) => {
    if (defaultedOptions.suspense) {
      const MIN_SUSPENSE_TIME_MS = 1e3;
      const clamp = (value) => value === "static" ? value : Math.max(value ?? MIN_SUSPENSE_TIME_MS, MIN_SUSPENSE_TIME_MS);
      const originalStaleTime = defaultedOptions.staleTime;
      defaultedOptions.staleTime = typeof originalStaleTime === "function" ? (...args) => clamp(originalStaleTime(...args)) : clamp(originalStaleTime);
      if (typeof defaultedOptions.gcTime === "number") {
        defaultedOptions.gcTime = Math.max(
          defaultedOptions.gcTime,
          MIN_SUSPENSE_TIME_MS
        );
      }
    }
  };
  var willFetch = (result, isRestoring) => result.isLoading && result.isFetching && !isRestoring;
  var shouldSuspend = (defaultedOptions, result) => defaultedOptions?.suspense && result.isPending;
  var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary) => observer.fetchOptimistic(defaultedOptions).catch(() => {
    errorResetBoundary.clearReset();
  });

  // node_modules/@tanstack/react-query/build/modern/useBaseQuery.js
  var React5 = __toESM(require_compat(), 1);
  function useBaseQuery(options, Observer, queryClient2) {
    if (true) {
      if (typeof options !== "object" || Array.isArray(options)) {
        throw new Error(
          'Bad argument type. Starting with v5, only the "Object" form is allowed when calling query related functions. Please use the error stack to find the culprit call. More info here: https://tanstack.com/query/latest/docs/react/guides/migrating-to-v5#supports-a-single-signature-one-object'
        );
      }
    }
    const isRestoring = useIsRestoring();
    const errorResetBoundary = useQueryErrorResetBoundary();
    const client = useQueryClient(queryClient2);
    const defaultedOptions = client.defaultQueryOptions(options);
    client.getDefaultOptions().queries?._experimental_beforeQuery?.(
      defaultedOptions
    );
    if (true) {
      if (!defaultedOptions.queryFn) {
        console.error(
          `[${defaultedOptions.queryHash}]: No queryFn was passed as an option, and no default queryFn was found. The queryFn parameter is only optional when using a default queryFn. More info here: https://tanstack.com/query/latest/docs/framework/react/guides/default-query-function`
        );
      }
    }
    defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
    ensureSuspenseTimers(defaultedOptions);
    ensurePreventErrorBoundaryRetry(defaultedOptions, errorResetBoundary);
    useClearResetErrorBoundary(errorResetBoundary);
    const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash);
    const [observer] = React5.useState(
      () => new Observer(
        client,
        defaultedOptions
      )
    );
    const result = observer.getOptimisticResult(defaultedOptions);
    const shouldSubscribe = !isRestoring && options.subscribed !== false;
    React5.useSyncExternalStore(
      React5.useCallback(
        (onStoreChange) => {
          const unsubscribe = shouldSubscribe ? observer.subscribe(notifyManager.batchCalls(onStoreChange)) : noop;
          observer.updateResult();
          return unsubscribe;
        },
        [observer, shouldSubscribe]
      ),
      () => observer.getCurrentResult(),
      () => observer.getCurrentResult()
    );
    React5.useEffect(() => {
      observer.setOptions(defaultedOptions);
    }, [defaultedOptions, observer]);
    if (shouldSuspend(defaultedOptions, result)) {
      throw fetchOptimistic(defaultedOptions, observer, errorResetBoundary);
    }
    if (getHasError({
      result,
      errorResetBoundary,
      throwOnError: defaultedOptions.throwOnError,
      query: client.getQueryCache().get(defaultedOptions.queryHash),
      suspense: defaultedOptions.suspense
    })) {
      throw result.error;
    }
    ;
    client.getDefaultOptions().queries?._experimental_afterQuery?.(
      defaultedOptions,
      result
    );
    if (defaultedOptions.experimental_prefetchInRender && !isServer && willFetch(result, isRestoring)) {
      const promise = isNewCacheEntry ? (
        // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
        fetchOptimistic(defaultedOptions, observer, errorResetBoundary)
      ) : (
        // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
        client.getQueryCache().get(defaultedOptions.queryHash)?.promise
      );
      promise?.catch(noop).finally(() => {
        observer.updateResult();
      });
    }
    return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
  }

  // node_modules/@tanstack/react-query/build/modern/useQuery.js
  function useQuery(options, queryClient2) {
    return useBaseQuery(options, QueryObserver, queryClient2);
  }

  // apps/larry-vscode-ext/webview/src/store/makeStore.tsx
  init_hooks_module();
  init_preact_module();

  // apps/larry-vscode-ext/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
  init_preact_module();
  init_preact_module();
  var f3 = 0;
  var i3 = Array.isArray;
  function u3(e4, t4, n3, o4, i5, u5) {
    t4 || (t4 = {});
    var a4, c4, p4 = t4;
    if ("ref" in p4) for (c4 in p4 = {}, t4) "ref" == c4 ? a4 = t4[c4] : p4[c4] = t4[c4];
    var l6 = { type: e4, props: p4, key: n3, ref: a4, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f3, __i: -1, __u: 0, __source: i5, __self: u5 };
    if ("function" == typeof e4 && (a4 = e4.defaultProps)) for (c4 in a4) void 0 === p4[c4] && (p4[c4] = a4[c4]);
    return l.vnode && l.vnode(l6), l6;
  }

  // apps/larry-vscode-ext/webview/src/store/makeStore.tsx
  function makeStore(initialState2, reducer) {
    const dispatchContext = Q((action) => {
    });
    const storeContext = Q(initialState2);
    const StoreProvider = ({
      children,
      initialState: propsInitialState
    }) => {
      const [store, dispatch] = h2(reducer, {
        ...initialState2,
        ...propsInitialState
      });
      return /* @__PURE__ */ u3(dispatchContext.Provider, { value: dispatch, children: /* @__PURE__ */ u3(storeContext.Provider, { value: store, children }) });
    };
    function useDispatch() {
      return x2(dispatchContext);
    }
    function useStore() {
      return x2(storeContext);
    }
    return [StoreProvider, useDispatch, useStore];
  }

  // apps/larry-vscode-ext/webview/src/store/store.ts
  var initialState = {
    currentThreadState: "idle",
    currentWorktreeName: void 0,
    currentThreadId: void 0,
    isInWorktree: false,
    apiUrl: "http://localhost:4210/larry/agents/google/v1",
    // Default to main repo URL
    currentThreadArtifacts: {},
    isLoadingWorktreeInfo: true,
    isLoadingApp: true,
    clientRequestId: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : "client-" + Math.random().toString(16).slice(2)
  };
  function extensionReducer(state, action) {
    switch (action.type) {
      case "SET_WORKTREE_DETECTION":
        return {
          ...state,
          isInWorktree: action.payload.isInWorktree,
          currentThreadId: action.payload.currentThreadId,
          currentWorktreeName: action.payload.worktreeName,
          apiUrl: action.payload.isInWorktree ? "http://localhost:4220/larry/agents/google/v1" : "http://localhost:4210/larry/agents/google/v1",
          isLoadingWorktreeInfo: false,
          isLoadingApp: false
          // App is ready when worktree detection is complete
        };
      case "SET_WORKTREE_READY":
        return {
          ...state,
          currentThreadState: "ready",
          currentThreadId: action.payload.threadId || state.currentThreadId,
          currentWorktreeName: action.payload.worktreeName || state.currentWorktreeName
        };
      case "SET_WORKTREE_SETUP_ERROR":
        return {
          ...state,
          currentThreadState: "error"
        };
      case "SET_THREAD_STATE":
        return {
          ...state,
          currentThreadState: action.payload
        };
      case "SET_CURRENT_THREAD_ID":
        return {
          ...state,
          currentThreadId: action.payload
        };
      case "SET_LOADING_WORKTREE_INFO":
        return {
          ...state,
          isLoadingWorktreeInfo: action.payload
        };
      case "SET_LOADING_APP":
        return {
          ...state,
          isLoadingApp: action.payload
        };
      case "SET_ARTIFACTS":
        return {
          ...state,
          currentThreadArtifacts: {
            ...state.currentThreadArtifacts,
            ...action.payload
          }
        };
      case "RESET_STATE":
        return {
          ...initialState,
          clientRequestId: state.clientRequestId
          // Keep the same client request ID
        };
      default:
        return state;
    }
  }
  var [ExtensionStoreProvider, useExtensionDispatch, useExtensionStore] = makeStore(initialState, extensionReducer);

  // apps/larry-vscode-ext/webview/src/views/MainRepoScreen.tsx
  init_hooks_module();

  // apps/larry-vscode-ext/webview/src/lib/http.ts
  async function fetchJSON(url, init) {
    const res = await fetch(url, init);
    if (!res.ok) {
      const text2 = await res.text();
      throw new Error(
        `${res.status} ${res.statusText}: ${text2 || "request failed"}`
      );
    }
    return res.json();
  }
  function withHeaders(base = {}, extra = {}) {
    const headers = new Headers(base.headers || {});
    Object.entries(extra).forEach(([k4, v5]) => headers.set(k4, v5));
    return { ...base, headers };
  }
  function uuid() {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto)
      return crypto.randomUUID();
    return "id-" + Math.random().toString(16).slice(2) + Date.now().toString(16);
  }
  async function fetchThreads(baseUrl) {
    return fetchJSON(`${baseUrl}/threads`);
  }
  async function fetchMachine(baseUrl, machineId) {
    return fetchJSON(
      `${baseUrl}/machines/${encodeURIComponent(machineId)}`
    );
  }
  async function createThread(params) {
    const { baseUrl, worktreeName, userTask, label, clientRequestId } = params;
    const idem = uuid();
    const init = withHeaders(
      {
        method: "POST",
        body: JSON.stringify({ worktreeName, userTask, label })
      },
      {
        "Content-Type": "application/json",
        "Idempotency-Key": idem,
        "Client-Request-Id": clientRequestId
      }
    );
    await fetchJSON(`${baseUrl}/threads/new`, init);
  }

  // apps/larry-vscode-ext/webview/src/lib/query.ts
  var queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 2
      }
    }
  });

  // apps/larry-vscode-ext/webview/src/hooks/useThreadsQuery.ts
  function useThreadsQuery(baseUrl) {
    return {
      isLoading: false,
      data: {
        items: [
          {
            id: "4c84718c-d1d0-4149-840f-0bdc56112062",
            label: "JIRA: MPR-788 - Update colors of...",
            worktreeName: "worktree-larry-mpr-788",
            createdAt: "2025-09-29T10:00:00.000Z",
            updatedAt: "2025-09-29T10:00:00.000Z"
          },
          {
            id: "4c84718c-d1d0-4149-840f-0bdc56112062-1",
            label: "JIRA: MPR-1021 - Implement DAL for...",
            worktreeName: "worktree-larry-mpr-1021",
            createdAt: "2025-09-29T10:00:00.000Z",
            updatedAt: "2025-09-29T10:00:00.000Z"
          },
          {
            id: "4c84718c-d1d0-4149-840f-0bdc56112062-2",
            label: "JIRA: MPR-991 - Support for email att...",
            worktreeName: "worktree-larry-mpr-991",
            createdAt: "2025-09-29T10:00:00.000Z",
            updatedAt: "2025-09-29T10:00:00.000Z"
          }
        ],
        nextCursor: null,
        requestId: "123"
      }
    };
    return useQuery(
      {
        queryKey: ["threads", { baseUrl }],
        queryFn: () => fetchThreads(baseUrl),
        refetchInterval: 5e3,
        staleTime: 4e3
      },
      queryClient
    );
  }

  // apps/larry-vscode-ext/webview/src/lib/vscode.ts
  var vscode = typeof acquireVsCodeApi === "function" ? acquireVsCodeApi() : {
    postMessage: (_5) => void 0
  };
  function postMessage(msg) {
    vscode.postMessage(msg);
  }
  function onMessage(cb) {
    const handler = (e4) => {
      cb(e4.data);
    };
    window.addEventListener("message", handler);
    return () => {
      window.removeEventListener("message", handler);
    };
  }

  // apps/larry-vscode-ext/webview/src/views/components/CustomSelect.tsx
  init_hooks_module();

  // node_modules/lucide-react/dist/esm/createLucideIcon.js
  var import_react2 = __toESM(require_compat());

  // node_modules/lucide-react/dist/esm/shared/src/utils.js
  var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  var mergeClasses = (...classes) => classes.filter((className, index3, array) => {
    return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index3;
  }).join(" ").trim();

  // node_modules/lucide-react/dist/esm/Icon.js
  var import_react = __toESM(require_compat());

  // node_modules/lucide-react/dist/esm/defaultAttributes.js
  var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };

  // node_modules/lucide-react/dist/esm/Icon.js
  var Icon = (0, import_react.forwardRef)(
    ({
      color = "currentColor",
      size = 24,
      strokeWidth = 2,
      absoluteStrokeWidth,
      className = "",
      children,
      iconNode,
      ...rest
    }, ref) => {
      return (0, import_react.createElement)(
        "svg",
        {
          ref,
          ...defaultAttributes,
          width: size,
          height: size,
          stroke: color,
          strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
          className: mergeClasses("lucide", className),
          ...rest
        },
        [
          ...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)),
          ...Array.isArray(children) ? children : [children]
        ]
      );
    }
  );

  // node_modules/lucide-react/dist/esm/createLucideIcon.js
  var createLucideIcon = (iconName, iconNode) => {
    const Component = (0, import_react2.forwardRef)(
      ({ className, ...props }, ref) => (0, import_react2.createElement)(Icon, {
        ref,
        iconNode,
        className: mergeClasses(`lucide-${toKebabCase(iconName)}`, className),
        ...props
      })
    );
    Component.displayName = `${iconName}`;
    return Component;
  };

  // node_modules/lucide-react/dist/esm/icons/chevron-down.js
  var ChevronDown = createLucideIcon("ChevronDown", [
    ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
  ]);

  // apps/larry-vscode-ext/webview/src/views/components/CustomSelect.tsx
  function CustomSelect({
    items,
    selectedId,
    onSelect,
    placeholder = "Select an item...",
    searchPlaceholder = "Search...",
    emptyMessage = "No items found",
    maxHeight = "50vh",
    size = "default"
  }) {
    const [isOpen, setIsOpen] = d2(false);
    const [searchText, setSearchText] = d2("");
    const [filteredItems, setFilteredItems] = d2(items);
    const inputRef = A2(null);
    const containerRef = A2(null);
    y2(() => {
      if (!searchText.trim()) {
        setFilteredItems(items);
      } else {
        const query = searchText.toLowerCase();
        const filtered = items.filter(
          (item) => (item.label + " " + item.worktreeName).toLowerCase().includes(query)
        );
        setFilteredItems(filtered);
      }
    }, [items, searchText]);
    y2(() => {
      setFilteredItems(items);
    }, [items]);
    const selectedItem = items.find((item) => item.id === selectedId);
    const handleInputClick = () => {
      setIsOpen(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    };
    const handleInputChange = (e4) => {
      setSearchText(e4.target.value);
      if (!isOpen) {
        setIsOpen(true);
      }
    };
    const handleItemSelect = (item) => {
      onSelect(item.id);
      setIsOpen(false);
      setSearchText("");
    };
    const handleKeyDown = (e4) => {
      if (e4.key === "Escape") {
        setIsOpen(false);
        setSearchText("");
      } else if (e4.key === "Enter" && filteredItems.length === 1) {
        handleItemSelect(filteredItems[0]);
      }
    };
    y2(() => {
      const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
          setIsOpen(false);
          setSearchText("");
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
    const containerWidth = size === "small" ? "45%" : "100%";
    const dropdownWidth = size === "small" ? "150%" : "100%";
    const dropdownMaxHeight = size === "small" ? "35vh" : maxHeight;
    return /* @__PURE__ */ u3("div", { ref: containerRef, className: "position-relative", style: { width: containerWidth }, children: [
      /* @__PURE__ */ u3("div", { className: "mb-1 mt-1 position-relative", style: { width: "100%" }, children: [
        /* @__PURE__ */ u3(
          "input",
          {
            ref: inputRef,
            className: `form-control ${size === "small" ? "input-sm" : "width-full"}`,
            placeholder: isOpen ? searchPlaceholder : placeholder,
            value: isOpen ? searchText : selectedItem ? `${selectedItem.label}` : "",
            onClick: handleInputClick,
            onChange: handleInputChange,
            onKeyDown: handleKeyDown,
            readOnly: !isOpen
          }
        ),
        /* @__PURE__ */ u3(
          ChevronDown,
          {
            size: size === "small" ? 14 : 16,
            style: {
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              color: "var(--vscode-input-foreground)"
            }
          }
        )
      ] }),
      isOpen && /* @__PURE__ */ u3(
        "div",
        {
          className: "Box position-absolute custom-select-list",
          style: {
            zIndex: 1e3,
            maxHeight: dropdownMaxHeight,
            overflow: "auto",
            top: "100%",
            left: 0,
            width: dropdownWidth
          },
          children: filteredItems.length === 0 ? /* @__PURE__ */ u3("div", { className: "p-3 color-fg-muted text-center", children: emptyMessage }) : /* @__PURE__ */ u3("ul", { className: "list-style-none", children: filteredItems.map((item, index3) => /* @__PURE__ */ u3(
            "li",
            {
              style: {
                backgroundColor: selectedId === item.id ? "var(--vscode-list-hoverBackground)" : "transparent",
                borderBottom: index3 === filteredItems.length - 1 ? "none" : "1px solid var(--borderColor-default)",
                cursor: "pointer",
                marginBottom: "2px",
                borderRadius: "6px"
              },
              className: "d-flex flex-justify-between",
              children: /* @__PURE__ */ u3(
                "button",
                {
                  className: "btn-invisible text-left width-full",
                  onClick: () => handleItemSelect(item),
                  children: [
                    /* @__PURE__ */ u3("div", { className: "text-bold", style: { fontSize: size === "small" ? "11px" : "12px" }, children: item.label }),
                    size !== "small" && /* @__PURE__ */ u3("div", { style: { fontSize: "9px" }, children: item.worktreeName })
                  ]
                }
              )
            },
            item.id
          )) })
        }
      )
    ] });
  }

  // apps/larry-vscode-ext/webview/src/views/components/AnimatedEllipsis.tsx
  function AnimatedEllipsis() {
    return /* @__PURE__ */ u3("span", { className: "AnimatedEllipsis" });
  }

  // apps/larry-vscode-ext/webview/src/views/MainRepoScreen.tsx
  function MainRepoScreen() {
    const { apiUrl, currentThreadState } = useExtensionStore();
    const { data, isLoading } = useThreadsQuery(apiUrl);
    const [newLabel, setNewLabel] = d2("");
    const [selectedThreadId, setSelectedThreadId] = d2(void 0);
    const [setupPhase, setSetupPhase] = d2("idle");
    y2(() => {
      if (currentThreadState === "ready") {
        setTimeout(() => {
          setSetupPhase("idle");
          setNewLabel("");
          setSelectedThreadId(void 0);
        }, 1500);
        return;
      }
      if (currentThreadState === "error") {
        setSetupPhase("error");
        setNewLabel("");
        setSelectedThreadId(void 0);
        return;
      }
      setSetupPhase(currentThreadState);
    }, [currentThreadState]);
    const items = data?.items ?? [];
    const selected = T2(() => {
      if (!selectedThreadId) return void 0;
      return items.find((t4) => t4.id === selectedThreadId);
    }, [items, selectedThreadId]);
    function openWorktreeExisting() {
      if (!selected) return;
      postMessage({
        type: "open_worktree",
        worktreeName: selected.worktreeName,
        threadId: selected.id,
        label: selected.label
      });
      setSetupPhase("setting_up_environment");
    }
    function openWorktreeNew() {
      setSelectedThreadId(void 0);
      if (!newLabel.trim()) return;
      postMessage({ type: "open_worktree", worktreeName: "", threadId: "", label: newLabel.trim() });
      setSetupPhase("creating_worktree");
    }
    return /* @__PURE__ */ u3("div", { className: "Box d-flex flex-column gap-3 p-3", children: [
      isLoading ? /* @__PURE__ */ u3("div", { className: "color-fg-muted", children: "Loading items..." }) : /* @__PURE__ */ u3(
        CustomSelect,
        {
          items,
          selectedId: selectedThreadId,
          onSelect: (id) => setSelectedThreadId(id),
          placeholder: "Pick a working item...",
          searchPlaceholder: "Pick a working item...",
          emptyMessage: "No working items found"
        }
      ),
      selectedThreadId ? /* @__PURE__ */ u3("div", { className: "pt-1 mt-2 mb-2", children: [
        setupPhase === "creating_worktree" && /* @__PURE__ */ u3("div", { children: [
          /* @__PURE__ */ u3("span", { style: { fontSize: "10px" }, className: "shimmer-loading", children: "Creating git worktree" }),
          /* @__PURE__ */ u3(AnimatedEllipsis, {})
        ] }),
        setupPhase === "creating_container" && /* @__PURE__ */ u3("div", { children: [
          /* @__PURE__ */ u3("span", { style: { fontSize: "10px" }, className: "shimmer-loading", children: "Creating docker container" }),
          /* @__PURE__ */ u3(AnimatedEllipsis, {})
        ] }),
        setupPhase === "setting_up_environment" && /* @__PURE__ */ u3("div", { children: [
          /* @__PURE__ */ u3("span", { style: { fontSize: "10px" }, className: "shimmer-loading", children: "Setting up environment" }),
          /* @__PURE__ */ u3(AnimatedEllipsis, {})
        ] }),
        setupPhase === "idle" && /* @__PURE__ */ u3("button", { className: "btn btn-primary", disabled: !selected || setupPhase !== "idle", onClick: openWorktreeExisting, children: "Start" })
      ] }) : null,
      /* @__PURE__ */ u3("div", { className: "border-top pt-3 mt-3", style: { position: "relative" }, children: [
        /* @__PURE__ */ u3("h6", { style: { position: "absolute", top: "-10px", left: "50%", transform: "translateX(-50%)", backgroundColor: "var(--vscode-tab-activeBackground)", color: "var(--vscode-foreground)", padding: "0 10px", fontSize: "12px" }, children: "OR" }),
        /* @__PURE__ */ u3("div", { className: "width-full mb-2", children: /* @__PURE__ */ u3(
          "input",
          {
            className: "form-control flex-1 width-full",
            placeholder: "Create new working item...",
            value: newLabel,
            onInput: (e4) => setNewLabel(e4.currentTarget.value)
          }
        ) }),
        /* @__PURE__ */ u3("div", { className: "width-full mb-2", children: /* @__PURE__ */ u3(
          CustomSelect,
          {
            items: [{
              id: "1",
              label: "Google",
              worktreeName: "",
              createdAt: (/* @__PURE__ */ new Date()).toISOString(),
              updatedAt: (/* @__PURE__ */ new Date()).toISOString()
            }, {
              id: "4",
              label: "MS 365",
              worktreeName: "",
              createdAt: (/* @__PURE__ */ new Date()).toISOString(),
              updatedAt: (/* @__PURE__ */ new Date()).toISOString()
            }, {
              id: "3",
              label: "React Components",
              worktreeName: "",
              createdAt: (/* @__PURE__ */ new Date()).toISOString(),
              updatedAt: (/* @__PURE__ */ new Date()).toISOString()
            }],
            selectedId: "1",
            size: "small",
            onSelect: () => void 0,
            placeholder: "Select agent...",
            searchPlaceholder: "Select agent...",
            emptyMessage: "No agents found"
          }
        ) }),
        /* @__PURE__ */ u3("div", { children: [
          setupPhase === "creating_worktree" && !selectedThreadId && /* @__PURE__ */ u3("div", { children: [
            /* @__PURE__ */ u3("span", { style: { fontSize: "10px" }, className: "shimmer-loading", children: "Creating git worktree" }),
            /* @__PURE__ */ u3(AnimatedEllipsis, {})
          ] }),
          setupPhase === "creating_container" && !selectedThreadId && /* @__PURE__ */ u3("div", { children: [
            /* @__PURE__ */ u3("span", { style: { fontSize: "10px" }, className: "shimmer-loading", children: "Creating docker container" }),
            /* @__PURE__ */ u3(AnimatedEllipsis, {})
          ] }),
          setupPhase === "setting_up_environment" && !selectedThreadId && /* @__PURE__ */ u3("div", { children: [
            /* @__PURE__ */ u3("span", { style: { fontSize: "10px" }, className: "shimmer-loading", children: "Setting up environment" }),
            /* @__PURE__ */ u3(AnimatedEllipsis, {})
          ] }),
          /* @__PURE__ */ u3("button", { className: `btn ${newLabel.trim() ? "btn-primary" : ""}`, disabled: !newLabel.trim() || setupPhase !== "idle", onClick: openWorktreeNew, children: "Start" })
        ] })
      ] }),
      setupPhase === "error" ? /* @__PURE__ */ u3("div", { className: "border-top pt-3 mt-2", children: /* @__PURE__ */ u3("div", { className: "text-danger", children: "Error setting up worktree" }) }) : null
    ] });
  }

  // apps/larry-vscode-ext/webview/src/views/WorktreeScreen.tsx
  init_hooks_module();

  // apps/larry-vscode-ext/webview/src/hooks/useMachineQuery.ts
  function useMachineQuery(baseUrl, machineId) {
    const query = useQuery(
      {
        enabled: !!machineId,
        queryKey: ["machine", { baseUrl, machineId }],
        queryFn: () => fetchMachine(baseUrl, machineId)
      },
      queryClient
    );
    return query;
  }

  // apps/larry-vscode-ext/webview/src/views/components/StateVisualization.tsx
  init_hooks_module();

  // apps/larry-vscode-ext/node_modules/marked/lib/marked.esm.js
  function L2() {
    return { async: false, breaks: false, extensions: null, gfm: true, hooks: null, pedantic: false, renderer: null, silent: false, tokenizer: null, walkTokens: null };
  }
  var O2 = L2();
  function H2(l6) {
    O2 = l6;
  }
  var E2 = { exec: () => null };
  function h3(l6, e4 = "") {
    let t4 = typeof l6 == "string" ? l6 : l6.source, n3 = { replace: (r4, i5) => {
      let s4 = typeof i5 == "string" ? i5 : i5.source;
      return s4 = s4.replace(m3.caret, "$1"), t4 = t4.replace(r4, s4), n3;
    }, getRegex: () => new RegExp(t4, e4) };
    return n3;
  }
  var m3 = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] /, listReplaceTask: /^\[[ xX]\] +/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (l6) => new RegExp(`^( {0,3}${l6})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (l6) => new RegExp(`^ {0,${Math.min(3, l6 - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (l6) => new RegExp(`^ {0,${Math.min(3, l6 - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (l6) => new RegExp(`^ {0,${Math.min(3, l6 - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (l6) => new RegExp(`^ {0,${Math.min(3, l6 - 1)}}#`), htmlBeginRegex: (l6) => new RegExp(`^ {0,${Math.min(3, l6 - 1)}}<(?:[a-z].*>|!--)`, "i") };
  var xe = /^(?:[ \t]*(?:\n|$))+/;
  var be = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
  var Re = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
  var C3 = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
  var Oe = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
  var j3 = /(?:[*+-]|\d{1,9}[.)])/;
  var se = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/;
  var ie = h3(se).replace(/bull/g, j3).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex();
  var Te = h3(se).replace(/bull/g, j3).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex();
  var F3 = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
  var we = /^[^\n]+/;
  var Q2 = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/;
  var ye = h3(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Q2).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
  var Pe = h3(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, j3).getRegex();
  var v3 = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
  var U = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
  var Se = h3("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", U).replace("tag", v3).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
  var oe = h3(F3).replace("hr", C3).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v3).getRegex();
  var $e = h3(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", oe).getRegex();
  var K2 = { blockquote: $e, code: be, def: ye, fences: Re, heading: Oe, hr: C3, html: Se, lheading: ie, list: Pe, newline: xe, paragraph: oe, table: E2, text: we };
  var re = h3("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", C3).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v3).getRegex();
  var _e = { ...K2, lheading: Te, table: re, paragraph: h3(F3).replace("hr", C3).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", re).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v3).getRegex() };
  var Le = { ...K2, html: h3(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", U).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: E2, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: h3(F3).replace("hr", C3).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", ie).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() };
  var Me = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
  var ze = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
  var ae = /^( {2,}|\\)\n(?!\s*$)/;
  var Ae = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
  var D3 = /[\p{P}\p{S}]/u;
  var W = /[\s\p{P}\p{S}]/u;
  var le = /[^\s\p{P}\p{S}]/u;
  var Ee = h3(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, W).getRegex();
  var ue = /(?!~)[\p{P}\p{S}]/u;
  var Ce = /(?!~)[\s\p{P}\p{S}]/u;
  var Ie = /(?:[^\s\p{P}\p{S}]|~)/u;
  var Be = /\[[^\[\]]*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)|`[^`]*?`|<(?! )[^<>]*?>/g;
  var pe = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/;
  var qe = h3(pe, "u").replace(/punct/g, D3).getRegex();
  var ve = h3(pe, "u").replace(/punct/g, ue).getRegex();
  var ce = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)";
  var De = h3(ce, "gu").replace(/notPunctSpace/g, le).replace(/punctSpace/g, W).replace(/punct/g, D3).getRegex();
  var Ze = h3(ce, "gu").replace(/notPunctSpace/g, Ie).replace(/punctSpace/g, Ce).replace(/punct/g, ue).getRegex();
  var Ge = h3("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, le).replace(/punctSpace/g, W).replace(/punct/g, D3).getRegex();
  var He = h3(/\\(punct)/, "gu").replace(/punct/g, D3).getRegex();
  var Ne = h3(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
  var je = h3(U).replace("(?:-->|$)", "-->").getRegex();
  var Fe = h3("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", je).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
  var q3 = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`[^`]*`|[^\[\]\\`])*?/;
  var Qe = h3(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", q3).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
  var he = h3(/^!?\[(label)\]\[(ref)\]/).replace("label", q3).replace("ref", Q2).getRegex();
  var de = h3(/^!?\[(ref)\](?:\[\])?/).replace("ref", Q2).getRegex();
  var Ue = h3("reflink|nolink(?!\\()", "g").replace("reflink", he).replace("nolink", de).getRegex();
  var X = { _backpedal: E2, anyPunctuation: He, autolink: Ne, blockSkip: Be, br: ae, code: ze, del: E2, emStrongLDelim: qe, emStrongRDelimAst: De, emStrongRDelimUnd: Ge, escape: Me, link: Qe, nolink: de, punctuation: Ee, reflink: he, reflinkSearch: Ue, tag: Fe, text: Ae, url: E2 };
  var Ke = { ...X, link: h3(/^!?\[(label)\]\((.*?)\)/).replace("label", q3).getRegex(), reflink: h3(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", q3).getRegex() };
  var N2 = { ...X, emStrongRDelimAst: Ze, emStrongLDelim: ve, url: h3(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/ };
  var We = { ...N2, br: h3(ae).replace("{2,}", "*").getRegex(), text: h3(N2.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() };
  var I2 = { normal: K2, gfm: _e, pedantic: Le };
  var M2 = { normal: X, gfm: N2, breaks: We, pedantic: Ke };
  var Xe = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  var ke = (l6) => Xe[l6];
  function w3(l6, e4) {
    if (e4) {
      if (m3.escapeTest.test(l6)) return l6.replace(m3.escapeReplace, ke);
    } else if (m3.escapeTestNoEncode.test(l6)) return l6.replace(m3.escapeReplaceNoEncode, ke);
    return l6;
  }
  function J2(l6) {
    try {
      l6 = encodeURI(l6).replace(m3.percentDecode, "%");
    } catch {
      return null;
    }
    return l6;
  }
  function V2(l6, e4) {
    let t4 = l6.replace(m3.findPipe, (i5, s4, o4) => {
      let a4 = false, u5 = s4;
      for (; --u5 >= 0 && o4[u5] === "\\"; ) a4 = !a4;
      return a4 ? "|" : " |";
    }), n3 = t4.split(m3.splitPipe), r4 = 0;
    if (n3[0].trim() || n3.shift(), n3.length > 0 && !n3.at(-1)?.trim() && n3.pop(), e4) if (n3.length > e4) n3.splice(e4);
    else for (; n3.length < e4; ) n3.push("");
    for (; r4 < n3.length; r4++) n3[r4] = n3[r4].trim().replace(m3.slashPipe, "|");
    return n3;
  }
  function z3(l6, e4, t4) {
    let n3 = l6.length;
    if (n3 === 0) return "";
    let r4 = 0;
    for (; r4 < n3; ) {
      let i5 = l6.charAt(n3 - r4 - 1);
      if (i5 === e4 && !t4) r4++;
      else if (i5 !== e4 && t4) r4++;
      else break;
    }
    return l6.slice(0, n3 - r4);
  }
  function ge(l6, e4) {
    if (l6.indexOf(e4[1]) === -1) return -1;
    let t4 = 0;
    for (let n3 = 0; n3 < l6.length; n3++) if (l6[n3] === "\\") n3++;
    else if (l6[n3] === e4[0]) t4++;
    else if (l6[n3] === e4[1] && (t4--, t4 < 0)) return n3;
    return t4 > 0 ? -2 : -1;
  }
  function fe(l6, e4, t4, n3, r4) {
    let i5 = e4.href, s4 = e4.title || null, o4 = l6[1].replace(r4.other.outputLinkReplace, "$1");
    n3.state.inLink = true;
    let a4 = { type: l6[0].charAt(0) === "!" ? "image" : "link", raw: t4, href: i5, title: s4, text: o4, tokens: n3.inlineTokens(o4) };
    return n3.state.inLink = false, a4;
  }
  function Je(l6, e4, t4) {
    let n3 = l6.match(t4.other.indentCodeCompensation);
    if (n3 === null) return e4;
    let r4 = n3[1];
    return e4.split(`
`).map((i5) => {
      let s4 = i5.match(t4.other.beginningSpace);
      if (s4 === null) return i5;
      let [o4] = s4;
      return o4.length >= r4.length ? i5.slice(r4.length) : i5;
    }).join(`
`);
  }
  var y3 = class {
    constructor(e4) {
      __publicField(this, "options");
      __publicField(this, "rules");
      __publicField(this, "lexer");
      this.options = e4 || O2;
    }
    space(e4) {
      let t4 = this.rules.block.newline.exec(e4);
      if (t4 && t4[0].length > 0) return { type: "space", raw: t4[0] };
    }
    code(e4) {
      let t4 = this.rules.block.code.exec(e4);
      if (t4) {
        let n3 = t4[0].replace(this.rules.other.codeRemoveIndent, "");
        return { type: "code", raw: t4[0], codeBlockStyle: "indented", text: this.options.pedantic ? n3 : z3(n3, `
`) };
      }
    }
    fences(e4) {
      let t4 = this.rules.block.fences.exec(e4);
      if (t4) {
        let n3 = t4[0], r4 = Je(n3, t4[3] || "", this.rules);
        return { type: "code", raw: n3, lang: t4[2] ? t4[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t4[2], text: r4 };
      }
    }
    heading(e4) {
      let t4 = this.rules.block.heading.exec(e4);
      if (t4) {
        let n3 = t4[2].trim();
        if (this.rules.other.endingHash.test(n3)) {
          let r4 = z3(n3, "#");
          (this.options.pedantic || !r4 || this.rules.other.endingSpaceChar.test(r4)) && (n3 = r4.trim());
        }
        return { type: "heading", raw: t4[0], depth: t4[1].length, text: n3, tokens: this.lexer.inline(n3) };
      }
    }
    hr(e4) {
      let t4 = this.rules.block.hr.exec(e4);
      if (t4) return { type: "hr", raw: z3(t4[0], `
`) };
    }
    blockquote(e4) {
      let t4 = this.rules.block.blockquote.exec(e4);
      if (t4) {
        let n3 = z3(t4[0], `
`).split(`
`), r4 = "", i5 = "", s4 = [];
        for (; n3.length > 0; ) {
          let o4 = false, a4 = [], u5;
          for (u5 = 0; u5 < n3.length; u5++) if (this.rules.other.blockquoteStart.test(n3[u5])) a4.push(n3[u5]), o4 = true;
          else if (!o4) a4.push(n3[u5]);
          else break;
          n3 = n3.slice(u5);
          let p4 = a4.join(`
`), c4 = p4.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
          r4 = r4 ? `${r4}
${p4}` : p4, i5 = i5 ? `${i5}
${c4}` : c4;
          let f5 = this.lexer.state.top;
          if (this.lexer.state.top = true, this.lexer.blockTokens(c4, s4, true), this.lexer.state.top = f5, n3.length === 0) break;
          let k4 = s4.at(-1);
          if (k4?.type === "code") break;
          if (k4?.type === "blockquote") {
            let x4 = k4, g4 = x4.raw + `
` + n3.join(`
`), T4 = this.blockquote(g4);
            s4[s4.length - 1] = T4, r4 = r4.substring(0, r4.length - x4.raw.length) + T4.raw, i5 = i5.substring(0, i5.length - x4.text.length) + T4.text;
            break;
          } else if (k4?.type === "list") {
            let x4 = k4, g4 = x4.raw + `
` + n3.join(`
`), T4 = this.list(g4);
            s4[s4.length - 1] = T4, r4 = r4.substring(0, r4.length - k4.raw.length) + T4.raw, i5 = i5.substring(0, i5.length - x4.raw.length) + T4.raw, n3 = g4.substring(s4.at(-1).raw.length).split(`
`);
            continue;
          }
        }
        return { type: "blockquote", raw: r4, tokens: s4, text: i5 };
      }
    }
    list(e4) {
      let t4 = this.rules.block.list.exec(e4);
      if (t4) {
        let n3 = t4[1].trim(), r4 = n3.length > 1, i5 = { type: "list", raw: "", ordered: r4, start: r4 ? +n3.slice(0, -1) : "", loose: false, items: [] };
        n3 = r4 ? `\\d{1,9}\\${n3.slice(-1)}` : `\\${n3}`, this.options.pedantic && (n3 = r4 ? n3 : "[*+-]");
        let s4 = this.rules.other.listItemRegex(n3), o4 = false;
        for (; e4; ) {
          let u5 = false, p4 = "", c4 = "";
          if (!(t4 = s4.exec(e4)) || this.rules.block.hr.test(e4)) break;
          p4 = t4[0], e4 = e4.substring(p4.length);
          let f5 = t4[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (Z) => " ".repeat(3 * Z.length)), k4 = e4.split(`
`, 1)[0], x4 = !f5.trim(), g4 = 0;
          if (this.options.pedantic ? (g4 = 2, c4 = f5.trimStart()) : x4 ? g4 = t4[1].length + 1 : (g4 = t4[2].search(this.rules.other.nonSpaceChar), g4 = g4 > 4 ? 1 : g4, c4 = f5.slice(g4), g4 += t4[1].length), x4 && this.rules.other.blankLine.test(k4) && (p4 += k4 + `
`, e4 = e4.substring(k4.length + 1), u5 = true), !u5) {
            let Z = this.rules.other.nextBulletRegex(g4), ee = this.rules.other.hrRegex(g4), te = this.rules.other.fencesBeginRegex(g4), ne = this.rules.other.headingBeginRegex(g4), me = this.rules.other.htmlBeginRegex(g4);
            for (; e4; ) {
              let G2 = e4.split(`
`, 1)[0], A4;
              if (k4 = G2, this.options.pedantic ? (k4 = k4.replace(this.rules.other.listReplaceNesting, "  "), A4 = k4) : A4 = k4.replace(this.rules.other.tabCharGlobal, "    "), te.test(k4) || ne.test(k4) || me.test(k4) || Z.test(k4) || ee.test(k4)) break;
              if (A4.search(this.rules.other.nonSpaceChar) >= g4 || !k4.trim()) c4 += `
` + A4.slice(g4);
              else {
                if (x4 || f5.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || te.test(f5) || ne.test(f5) || ee.test(f5)) break;
                c4 += `
` + k4;
              }
              !x4 && !k4.trim() && (x4 = true), p4 += G2 + `
`, e4 = e4.substring(G2.length + 1), f5 = A4.slice(g4);
            }
          }
          i5.loose || (o4 ? i5.loose = true : this.rules.other.doubleBlankLine.test(p4) && (o4 = true));
          let T4 = null, Y;
          this.options.gfm && (T4 = this.rules.other.listIsTask.exec(c4), T4 && (Y = T4[0] !== "[ ] ", c4 = c4.replace(this.rules.other.listReplaceTask, ""))), i5.items.push({ type: "list_item", raw: p4, task: !!T4, checked: Y, loose: false, text: c4, tokens: [] }), i5.raw += p4;
        }
        let a4 = i5.items.at(-1);
        if (a4) a4.raw = a4.raw.trimEnd(), a4.text = a4.text.trimEnd();
        else return;
        i5.raw = i5.raw.trimEnd();
        for (let u5 = 0; u5 < i5.items.length; u5++) if (this.lexer.state.top = false, i5.items[u5].tokens = this.lexer.blockTokens(i5.items[u5].text, []), !i5.loose) {
          let p4 = i5.items[u5].tokens.filter((f5) => f5.type === "space"), c4 = p4.length > 0 && p4.some((f5) => this.rules.other.anyLine.test(f5.raw));
          i5.loose = c4;
        }
        if (i5.loose) for (let u5 = 0; u5 < i5.items.length; u5++) i5.items[u5].loose = true;
        return i5;
      }
    }
    html(e4) {
      let t4 = this.rules.block.html.exec(e4);
      if (t4) return { type: "html", block: true, raw: t4[0], pre: t4[1] === "pre" || t4[1] === "script" || t4[1] === "style", text: t4[0] };
    }
    def(e4) {
      let t4 = this.rules.block.def.exec(e4);
      if (t4) {
        let n3 = t4[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), r4 = t4[2] ? t4[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", i5 = t4[3] ? t4[3].substring(1, t4[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t4[3];
        return { type: "def", tag: n3, raw: t4[0], href: r4, title: i5 };
      }
    }
    table(e4) {
      let t4 = this.rules.block.table.exec(e4);
      if (!t4 || !this.rules.other.tableDelimiter.test(t4[2])) return;
      let n3 = V2(t4[1]), r4 = t4[2].replace(this.rules.other.tableAlignChars, "").split("|"), i5 = t4[3]?.trim() ? t4[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], s4 = { type: "table", raw: t4[0], header: [], align: [], rows: [] };
      if (n3.length === r4.length) {
        for (let o4 of r4) this.rules.other.tableAlignRight.test(o4) ? s4.align.push("right") : this.rules.other.tableAlignCenter.test(o4) ? s4.align.push("center") : this.rules.other.tableAlignLeft.test(o4) ? s4.align.push("left") : s4.align.push(null);
        for (let o4 = 0; o4 < n3.length; o4++) s4.header.push({ text: n3[o4], tokens: this.lexer.inline(n3[o4]), header: true, align: s4.align[o4] });
        for (let o4 of i5) s4.rows.push(V2(o4, s4.header.length).map((a4, u5) => ({ text: a4, tokens: this.lexer.inline(a4), header: false, align: s4.align[u5] })));
        return s4;
      }
    }
    lheading(e4) {
      let t4 = this.rules.block.lheading.exec(e4);
      if (t4) return { type: "heading", raw: t4[0], depth: t4[2].charAt(0) === "=" ? 1 : 2, text: t4[1], tokens: this.lexer.inline(t4[1]) };
    }
    paragraph(e4) {
      let t4 = this.rules.block.paragraph.exec(e4);
      if (t4) {
        let n3 = t4[1].charAt(t4[1].length - 1) === `
` ? t4[1].slice(0, -1) : t4[1];
        return { type: "paragraph", raw: t4[0], text: n3, tokens: this.lexer.inline(n3) };
      }
    }
    text(e4) {
      let t4 = this.rules.block.text.exec(e4);
      if (t4) return { type: "text", raw: t4[0], text: t4[0], tokens: this.lexer.inline(t4[0]) };
    }
    escape(e4) {
      let t4 = this.rules.inline.escape.exec(e4);
      if (t4) return { type: "escape", raw: t4[0], text: t4[1] };
    }
    tag(e4) {
      let t4 = this.rules.inline.tag.exec(e4);
      if (t4) return !this.lexer.state.inLink && this.rules.other.startATag.test(t4[0]) ? this.lexer.state.inLink = true : this.lexer.state.inLink && this.rules.other.endATag.test(t4[0]) && (this.lexer.state.inLink = false), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t4[0]) ? this.lexer.state.inRawBlock = true : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t4[0]) && (this.lexer.state.inRawBlock = false), { type: "html", raw: t4[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: false, text: t4[0] };
    }
    link(e4) {
      let t4 = this.rules.inline.link.exec(e4);
      if (t4) {
        let n3 = t4[2].trim();
        if (!this.options.pedantic && this.rules.other.startAngleBracket.test(n3)) {
          if (!this.rules.other.endAngleBracket.test(n3)) return;
          let s4 = z3(n3.slice(0, -1), "\\");
          if ((n3.length - s4.length) % 2 === 0) return;
        } else {
          let s4 = ge(t4[2], "()");
          if (s4 === -2) return;
          if (s4 > -1) {
            let a4 = (t4[0].indexOf("!") === 0 ? 5 : 4) + t4[1].length + s4;
            t4[2] = t4[2].substring(0, s4), t4[0] = t4[0].substring(0, a4).trim(), t4[3] = "";
          }
        }
        let r4 = t4[2], i5 = "";
        if (this.options.pedantic) {
          let s4 = this.rules.other.pedanticHrefTitle.exec(r4);
          s4 && (r4 = s4[1], i5 = s4[3]);
        } else i5 = t4[3] ? t4[3].slice(1, -1) : "";
        return r4 = r4.trim(), this.rules.other.startAngleBracket.test(r4) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n3) ? r4 = r4.slice(1) : r4 = r4.slice(1, -1)), fe(t4, { href: r4 && r4.replace(this.rules.inline.anyPunctuation, "$1"), title: i5 && i5.replace(this.rules.inline.anyPunctuation, "$1") }, t4[0], this.lexer, this.rules);
      }
    }
    reflink(e4, t4) {
      let n3;
      if ((n3 = this.rules.inline.reflink.exec(e4)) || (n3 = this.rules.inline.nolink.exec(e4))) {
        let r4 = (n3[2] || n3[1]).replace(this.rules.other.multipleSpaceGlobal, " "), i5 = t4[r4.toLowerCase()];
        if (!i5) {
          let s4 = n3[0].charAt(0);
          return { type: "text", raw: s4, text: s4 };
        }
        return fe(n3, i5, n3[0], this.lexer, this.rules);
      }
    }
    emStrong(e4, t4, n3 = "") {
      let r4 = this.rules.inline.emStrongLDelim.exec(e4);
      if (!r4 || r4[3] && n3.match(this.rules.other.unicodeAlphaNumeric)) return;
      if (!(r4[1] || r4[2] || "") || !n3 || this.rules.inline.punctuation.exec(n3)) {
        let s4 = [...r4[0]].length - 1, o4, a4, u5 = s4, p4 = 0, c4 = r4[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
        for (c4.lastIndex = 0, t4 = t4.slice(-1 * e4.length + s4); (r4 = c4.exec(t4)) != null; ) {
          if (o4 = r4[1] || r4[2] || r4[3] || r4[4] || r4[5] || r4[6], !o4) continue;
          if (a4 = [...o4].length, r4[3] || r4[4]) {
            u5 += a4;
            continue;
          } else if ((r4[5] || r4[6]) && s4 % 3 && !((s4 + a4) % 3)) {
            p4 += a4;
            continue;
          }
          if (u5 -= a4, u5 > 0) continue;
          a4 = Math.min(a4, a4 + u5 + p4);
          let f5 = [...r4[0]][0].length, k4 = e4.slice(0, s4 + r4.index + f5 + a4);
          if (Math.min(s4, a4) % 2) {
            let g4 = k4.slice(1, -1);
            return { type: "em", raw: k4, text: g4, tokens: this.lexer.inlineTokens(g4) };
          }
          let x4 = k4.slice(2, -2);
          return { type: "strong", raw: k4, text: x4, tokens: this.lexer.inlineTokens(x4) };
        }
      }
    }
    codespan(e4) {
      let t4 = this.rules.inline.code.exec(e4);
      if (t4) {
        let n3 = t4[2].replace(this.rules.other.newLineCharGlobal, " "), r4 = this.rules.other.nonSpaceChar.test(n3), i5 = this.rules.other.startingSpaceChar.test(n3) && this.rules.other.endingSpaceChar.test(n3);
        return r4 && i5 && (n3 = n3.substring(1, n3.length - 1)), { type: "codespan", raw: t4[0], text: n3 };
      }
    }
    br(e4) {
      let t4 = this.rules.inline.br.exec(e4);
      if (t4) return { type: "br", raw: t4[0] };
    }
    del(e4) {
      let t4 = this.rules.inline.del.exec(e4);
      if (t4) return { type: "del", raw: t4[0], text: t4[2], tokens: this.lexer.inlineTokens(t4[2]) };
    }
    autolink(e4) {
      let t4 = this.rules.inline.autolink.exec(e4);
      if (t4) {
        let n3, r4;
        return t4[2] === "@" ? (n3 = t4[1], r4 = "mailto:" + n3) : (n3 = t4[1], r4 = n3), { type: "link", raw: t4[0], text: n3, href: r4, tokens: [{ type: "text", raw: n3, text: n3 }] };
      }
    }
    url(e4) {
      let t4;
      if (t4 = this.rules.inline.url.exec(e4)) {
        let n3, r4;
        if (t4[2] === "@") n3 = t4[0], r4 = "mailto:" + n3;
        else {
          let i5;
          do
            i5 = t4[0], t4[0] = this.rules.inline._backpedal.exec(t4[0])?.[0] ?? "";
          while (i5 !== t4[0]);
          n3 = t4[0], t4[1] === "www." ? r4 = "http://" + t4[0] : r4 = t4[0];
        }
        return { type: "link", raw: t4[0], text: n3, href: r4, tokens: [{ type: "text", raw: n3, text: n3 }] };
      }
    }
    inlineText(e4) {
      let t4 = this.rules.inline.text.exec(e4);
      if (t4) {
        let n3 = this.lexer.state.inRawBlock;
        return { type: "text", raw: t4[0], text: t4[0], escaped: n3 };
      }
    }
  };
  var b3 = class l3 {
    constructor(e4) {
      __publicField(this, "tokens");
      __publicField(this, "options");
      __publicField(this, "state");
      __publicField(this, "tokenizer");
      __publicField(this, "inlineQueue");
      this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e4 || O2, this.options.tokenizer = this.options.tokenizer || new y3(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: false, inRawBlock: false, top: true };
      let t4 = { other: m3, block: I2.normal, inline: M2.normal };
      this.options.pedantic ? (t4.block = I2.pedantic, t4.inline = M2.pedantic) : this.options.gfm && (t4.block = I2.gfm, this.options.breaks ? t4.inline = M2.breaks : t4.inline = M2.gfm), this.tokenizer.rules = t4;
    }
    static get rules() {
      return { block: I2, inline: M2 };
    }
    static lex(e4, t4) {
      return new l3(t4).lex(e4);
    }
    static lexInline(e4, t4) {
      return new l3(t4).inlineTokens(e4);
    }
    lex(e4) {
      e4 = e4.replace(m3.carriageReturn, `
`), this.blockTokens(e4, this.tokens);
      for (let t4 = 0; t4 < this.inlineQueue.length; t4++) {
        let n3 = this.inlineQueue[t4];
        this.inlineTokens(n3.src, n3.tokens);
      }
      return this.inlineQueue = [], this.tokens;
    }
    blockTokens(e4, t4 = [], n3 = false) {
      for (this.options.pedantic && (e4 = e4.replace(m3.tabCharGlobal, "    ").replace(m3.spaceLine, "")); e4; ) {
        let r4;
        if (this.options.extensions?.block?.some((s4) => (r4 = s4.call({ lexer: this }, e4, t4)) ? (e4 = e4.substring(r4.raw.length), t4.push(r4), true) : false)) continue;
        if (r4 = this.tokenizer.space(e4)) {
          e4 = e4.substring(r4.raw.length);
          let s4 = t4.at(-1);
          r4.raw.length === 1 && s4 !== void 0 ? s4.raw += `
` : t4.push(r4);
          continue;
        }
        if (r4 = this.tokenizer.code(e4)) {
          e4 = e4.substring(r4.raw.length);
          let s4 = t4.at(-1);
          s4?.type === "paragraph" || s4?.type === "text" ? (s4.raw += (s4.raw.endsWith(`
`) ? "" : `
`) + r4.raw, s4.text += `
` + r4.text, this.inlineQueue.at(-1).src = s4.text) : t4.push(r4);
          continue;
        }
        if (r4 = this.tokenizer.fences(e4)) {
          e4 = e4.substring(r4.raw.length), t4.push(r4);
          continue;
        }
        if (r4 = this.tokenizer.heading(e4)) {
          e4 = e4.substring(r4.raw.length), t4.push(r4);
          continue;
        }
        if (r4 = this.tokenizer.hr(e4)) {
          e4 = e4.substring(r4.raw.length), t4.push(r4);
          continue;
        }
        if (r4 = this.tokenizer.blockquote(e4)) {
          e4 = e4.substring(r4.raw.length), t4.push(r4);
          continue;
        }
        if (r4 = this.tokenizer.list(e4)) {
          e4 = e4.substring(r4.raw.length), t4.push(r4);
          continue;
        }
        if (r4 = this.tokenizer.html(e4)) {
          e4 = e4.substring(r4.raw.length), t4.push(r4);
          continue;
        }
        if (r4 = this.tokenizer.def(e4)) {
          e4 = e4.substring(r4.raw.length);
          let s4 = t4.at(-1);
          s4?.type === "paragraph" || s4?.type === "text" ? (s4.raw += (s4.raw.endsWith(`
`) ? "" : `
`) + r4.raw, s4.text += `
` + r4.raw, this.inlineQueue.at(-1).src = s4.text) : this.tokens.links[r4.tag] || (this.tokens.links[r4.tag] = { href: r4.href, title: r4.title }, t4.push(r4));
          continue;
        }
        if (r4 = this.tokenizer.table(e4)) {
          e4 = e4.substring(r4.raw.length), t4.push(r4);
          continue;
        }
        if (r4 = this.tokenizer.lheading(e4)) {
          e4 = e4.substring(r4.raw.length), t4.push(r4);
          continue;
        }
        let i5 = e4;
        if (this.options.extensions?.startBlock) {
          let s4 = 1 / 0, o4 = e4.slice(1), a4;
          this.options.extensions.startBlock.forEach((u5) => {
            a4 = u5.call({ lexer: this }, o4), typeof a4 == "number" && a4 >= 0 && (s4 = Math.min(s4, a4));
          }), s4 < 1 / 0 && s4 >= 0 && (i5 = e4.substring(0, s4 + 1));
        }
        if (this.state.top && (r4 = this.tokenizer.paragraph(i5))) {
          let s4 = t4.at(-1);
          n3 && s4?.type === "paragraph" ? (s4.raw += (s4.raw.endsWith(`
`) ? "" : `
`) + r4.raw, s4.text += `
` + r4.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s4.text) : t4.push(r4), n3 = i5.length !== e4.length, e4 = e4.substring(r4.raw.length);
          continue;
        }
        if (r4 = this.tokenizer.text(e4)) {
          e4 = e4.substring(r4.raw.length);
          let s4 = t4.at(-1);
          s4?.type === "text" ? (s4.raw += (s4.raw.endsWith(`
`) ? "" : `
`) + r4.raw, s4.text += `
` + r4.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s4.text) : t4.push(r4);
          continue;
        }
        if (e4) {
          let s4 = "Infinite loop on byte: " + e4.charCodeAt(0);
          if (this.options.silent) {
            console.error(s4);
            break;
          } else throw new Error(s4);
        }
      }
      return this.state.top = true, t4;
    }
    inline(e4, t4 = []) {
      return this.inlineQueue.push({ src: e4, tokens: t4 }), t4;
    }
    inlineTokens(e4, t4 = []) {
      let n3 = e4, r4 = null;
      if (this.tokens.links) {
        let o4 = Object.keys(this.tokens.links);
        if (o4.length > 0) for (; (r4 = this.tokenizer.rules.inline.reflinkSearch.exec(n3)) != null; ) o4.includes(r4[0].slice(r4[0].lastIndexOf("[") + 1, -1)) && (n3 = n3.slice(0, r4.index) + "[" + "a".repeat(r4[0].length - 2) + "]" + n3.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
      }
      for (; (r4 = this.tokenizer.rules.inline.anyPunctuation.exec(n3)) != null; ) n3 = n3.slice(0, r4.index) + "++" + n3.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
      for (; (r4 = this.tokenizer.rules.inline.blockSkip.exec(n3)) != null; ) n3 = n3.slice(0, r4.index) + "[" + "a".repeat(r4[0].length - 2) + "]" + n3.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
      let i5 = false, s4 = "";
      for (; e4; ) {
        i5 || (s4 = ""), i5 = false;
        let o4;
        if (this.options.extensions?.inline?.some((u5) => (o4 = u5.call({ lexer: this }, e4, t4)) ? (e4 = e4.substring(o4.raw.length), t4.push(o4), true) : false)) continue;
        if (o4 = this.tokenizer.escape(e4)) {
          e4 = e4.substring(o4.raw.length), t4.push(o4);
          continue;
        }
        if (o4 = this.tokenizer.tag(e4)) {
          e4 = e4.substring(o4.raw.length), t4.push(o4);
          continue;
        }
        if (o4 = this.tokenizer.link(e4)) {
          e4 = e4.substring(o4.raw.length), t4.push(o4);
          continue;
        }
        if (o4 = this.tokenizer.reflink(e4, this.tokens.links)) {
          e4 = e4.substring(o4.raw.length);
          let u5 = t4.at(-1);
          o4.type === "text" && u5?.type === "text" ? (u5.raw += o4.raw, u5.text += o4.text) : t4.push(o4);
          continue;
        }
        if (o4 = this.tokenizer.emStrong(e4, n3, s4)) {
          e4 = e4.substring(o4.raw.length), t4.push(o4);
          continue;
        }
        if (o4 = this.tokenizer.codespan(e4)) {
          e4 = e4.substring(o4.raw.length), t4.push(o4);
          continue;
        }
        if (o4 = this.tokenizer.br(e4)) {
          e4 = e4.substring(o4.raw.length), t4.push(o4);
          continue;
        }
        if (o4 = this.tokenizer.del(e4)) {
          e4 = e4.substring(o4.raw.length), t4.push(o4);
          continue;
        }
        if (o4 = this.tokenizer.autolink(e4)) {
          e4 = e4.substring(o4.raw.length), t4.push(o4);
          continue;
        }
        if (!this.state.inLink && (o4 = this.tokenizer.url(e4))) {
          e4 = e4.substring(o4.raw.length), t4.push(o4);
          continue;
        }
        let a4 = e4;
        if (this.options.extensions?.startInline) {
          let u5 = 1 / 0, p4 = e4.slice(1), c4;
          this.options.extensions.startInline.forEach((f5) => {
            c4 = f5.call({ lexer: this }, p4), typeof c4 == "number" && c4 >= 0 && (u5 = Math.min(u5, c4));
          }), u5 < 1 / 0 && u5 >= 0 && (a4 = e4.substring(0, u5 + 1));
        }
        if (o4 = this.tokenizer.inlineText(a4)) {
          e4 = e4.substring(o4.raw.length), o4.raw.slice(-1) !== "_" && (s4 = o4.raw.slice(-1)), i5 = true;
          let u5 = t4.at(-1);
          u5?.type === "text" ? (u5.raw += o4.raw, u5.text += o4.text) : t4.push(o4);
          continue;
        }
        if (e4) {
          let u5 = "Infinite loop on byte: " + e4.charCodeAt(0);
          if (this.options.silent) {
            console.error(u5);
            break;
          } else throw new Error(u5);
        }
      }
      return t4;
    }
  };
  var P3 = class {
    constructor(e4) {
      __publicField(this, "options");
      __publicField(this, "parser");
      this.options = e4 || O2;
    }
    space(e4) {
      return "";
    }
    code({ text: e4, lang: t4, escaped: n3 }) {
      let r4 = (t4 || "").match(m3.notSpaceStart)?.[0], i5 = e4.replace(m3.endingNewline, "") + `
`;
      return r4 ? '<pre><code class="language-' + w3(r4) + '">' + (n3 ? i5 : w3(i5, true)) + `</code></pre>
` : "<pre><code>" + (n3 ? i5 : w3(i5, true)) + `</code></pre>
`;
    }
    blockquote({ tokens: e4 }) {
      return `<blockquote>
${this.parser.parse(e4)}</blockquote>
`;
    }
    html({ text: e4 }) {
      return e4;
    }
    def(e4) {
      return "";
    }
    heading({ tokens: e4, depth: t4 }) {
      return `<h${t4}>${this.parser.parseInline(e4)}</h${t4}>
`;
    }
    hr(e4) {
      return `<hr>
`;
    }
    list(e4) {
      let t4 = e4.ordered, n3 = e4.start, r4 = "";
      for (let o4 = 0; o4 < e4.items.length; o4++) {
        let a4 = e4.items[o4];
        r4 += this.listitem(a4);
      }
      let i5 = t4 ? "ol" : "ul", s4 = t4 && n3 !== 1 ? ' start="' + n3 + '"' : "";
      return "<" + i5 + s4 + `>
` + r4 + "</" + i5 + `>
`;
    }
    listitem(e4) {
      let t4 = "";
      if (e4.task) {
        let n3 = this.checkbox({ checked: !!e4.checked });
        e4.loose ? e4.tokens[0]?.type === "paragraph" ? (e4.tokens[0].text = n3 + " " + e4.tokens[0].text, e4.tokens[0].tokens && e4.tokens[0].tokens.length > 0 && e4.tokens[0].tokens[0].type === "text" && (e4.tokens[0].tokens[0].text = n3 + " " + w3(e4.tokens[0].tokens[0].text), e4.tokens[0].tokens[0].escaped = true)) : e4.tokens.unshift({ type: "text", raw: n3 + " ", text: n3 + " ", escaped: true }) : t4 += n3 + " ";
      }
      return t4 += this.parser.parse(e4.tokens, !!e4.loose), `<li>${t4}</li>
`;
    }
    checkbox({ checked: e4 }) {
      return "<input " + (e4 ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
    }
    paragraph({ tokens: e4 }) {
      return `<p>${this.parser.parseInline(e4)}</p>
`;
    }
    table(e4) {
      let t4 = "", n3 = "";
      for (let i5 = 0; i5 < e4.header.length; i5++) n3 += this.tablecell(e4.header[i5]);
      t4 += this.tablerow({ text: n3 });
      let r4 = "";
      for (let i5 = 0; i5 < e4.rows.length; i5++) {
        let s4 = e4.rows[i5];
        n3 = "";
        for (let o4 = 0; o4 < s4.length; o4++) n3 += this.tablecell(s4[o4]);
        r4 += this.tablerow({ text: n3 });
      }
      return r4 && (r4 = `<tbody>${r4}</tbody>`), `<table>
<thead>
` + t4 + `</thead>
` + r4 + `</table>
`;
    }
    tablerow({ text: e4 }) {
      return `<tr>
${e4}</tr>
`;
    }
    tablecell(e4) {
      let t4 = this.parser.parseInline(e4.tokens), n3 = e4.header ? "th" : "td";
      return (e4.align ? `<${n3} align="${e4.align}">` : `<${n3}>`) + t4 + `</${n3}>
`;
    }
    strong({ tokens: e4 }) {
      return `<strong>${this.parser.parseInline(e4)}</strong>`;
    }
    em({ tokens: e4 }) {
      return `<em>${this.parser.parseInline(e4)}</em>`;
    }
    codespan({ text: e4 }) {
      return `<code>${w3(e4, true)}</code>`;
    }
    br(e4) {
      return "<br>";
    }
    del({ tokens: e4 }) {
      return `<del>${this.parser.parseInline(e4)}</del>`;
    }
    link({ href: e4, title: t4, tokens: n3 }) {
      let r4 = this.parser.parseInline(n3), i5 = J2(e4);
      if (i5 === null) return r4;
      e4 = i5;
      let s4 = '<a href="' + e4 + '"';
      return t4 && (s4 += ' title="' + w3(t4) + '"'), s4 += ">" + r4 + "</a>", s4;
    }
    image({ href: e4, title: t4, text: n3, tokens: r4 }) {
      r4 && (n3 = this.parser.parseInline(r4, this.parser.textRenderer));
      let i5 = J2(e4);
      if (i5 === null) return w3(n3);
      e4 = i5;
      let s4 = `<img src="${e4}" alt="${n3}"`;
      return t4 && (s4 += ` title="${w3(t4)}"`), s4 += ">", s4;
    }
    text(e4) {
      return "tokens" in e4 && e4.tokens ? this.parser.parseInline(e4.tokens) : "escaped" in e4 && e4.escaped ? e4.text : w3(e4.text);
    }
  };
  var S2 = class {
    strong({ text: e4 }) {
      return e4;
    }
    em({ text: e4 }) {
      return e4;
    }
    codespan({ text: e4 }) {
      return e4;
    }
    del({ text: e4 }) {
      return e4;
    }
    html({ text: e4 }) {
      return e4;
    }
    text({ text: e4 }) {
      return e4;
    }
    link({ text: e4 }) {
      return "" + e4;
    }
    image({ text: e4 }) {
      return "" + e4;
    }
    br() {
      return "";
    }
  };
  var R = class l4 {
    constructor(e4) {
      __publicField(this, "options");
      __publicField(this, "renderer");
      __publicField(this, "textRenderer");
      this.options = e4 || O2, this.options.renderer = this.options.renderer || new P3(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new S2();
    }
    static parse(e4, t4) {
      return new l4(t4).parse(e4);
    }
    static parseInline(e4, t4) {
      return new l4(t4).parseInline(e4);
    }
    parse(e4, t4 = true) {
      let n3 = "";
      for (let r4 = 0; r4 < e4.length; r4++) {
        let i5 = e4[r4];
        if (this.options.extensions?.renderers?.[i5.type]) {
          let o4 = i5, a4 = this.options.extensions.renderers[o4.type].call({ parser: this }, o4);
          if (a4 !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "def", "paragraph", "text"].includes(o4.type)) {
            n3 += a4 || "";
            continue;
          }
        }
        let s4 = i5;
        switch (s4.type) {
          case "space": {
            n3 += this.renderer.space(s4);
            continue;
          }
          case "hr": {
            n3 += this.renderer.hr(s4);
            continue;
          }
          case "heading": {
            n3 += this.renderer.heading(s4);
            continue;
          }
          case "code": {
            n3 += this.renderer.code(s4);
            continue;
          }
          case "table": {
            n3 += this.renderer.table(s4);
            continue;
          }
          case "blockquote": {
            n3 += this.renderer.blockquote(s4);
            continue;
          }
          case "list": {
            n3 += this.renderer.list(s4);
            continue;
          }
          case "html": {
            n3 += this.renderer.html(s4);
            continue;
          }
          case "def": {
            n3 += this.renderer.def(s4);
            continue;
          }
          case "paragraph": {
            n3 += this.renderer.paragraph(s4);
            continue;
          }
          case "text": {
            let o4 = s4, a4 = this.renderer.text(o4);
            for (; r4 + 1 < e4.length && e4[r4 + 1].type === "text"; ) o4 = e4[++r4], a4 += `
` + this.renderer.text(o4);
            t4 ? n3 += this.renderer.paragraph({ type: "paragraph", raw: a4, text: a4, tokens: [{ type: "text", raw: a4, text: a4, escaped: true }] }) : n3 += a4;
            continue;
          }
          default: {
            let o4 = 'Token with "' + s4.type + '" type was not found.';
            if (this.options.silent) return console.error(o4), "";
            throw new Error(o4);
          }
        }
      }
      return n3;
    }
    parseInline(e4, t4 = this.renderer) {
      let n3 = "";
      for (let r4 = 0; r4 < e4.length; r4++) {
        let i5 = e4[r4];
        if (this.options.extensions?.renderers?.[i5.type]) {
          let o4 = this.options.extensions.renderers[i5.type].call({ parser: this }, i5);
          if (o4 !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(i5.type)) {
            n3 += o4 || "";
            continue;
          }
        }
        let s4 = i5;
        switch (s4.type) {
          case "escape": {
            n3 += t4.text(s4);
            break;
          }
          case "html": {
            n3 += t4.html(s4);
            break;
          }
          case "link": {
            n3 += t4.link(s4);
            break;
          }
          case "image": {
            n3 += t4.image(s4);
            break;
          }
          case "strong": {
            n3 += t4.strong(s4);
            break;
          }
          case "em": {
            n3 += t4.em(s4);
            break;
          }
          case "codespan": {
            n3 += t4.codespan(s4);
            break;
          }
          case "br": {
            n3 += t4.br(s4);
            break;
          }
          case "del": {
            n3 += t4.del(s4);
            break;
          }
          case "text": {
            n3 += t4.text(s4);
            break;
          }
          default: {
            let o4 = 'Token with "' + s4.type + '" type was not found.';
            if (this.options.silent) return console.error(o4), "";
            throw new Error(o4);
          }
        }
      }
      return n3;
    }
  };
  var _a11;
  var $2 = (_a11 = class {
    constructor(e4) {
      __publicField(this, "options");
      __publicField(this, "block");
      this.options = e4 || O2;
    }
    preprocess(e4) {
      return e4;
    }
    postprocess(e4) {
      return e4;
    }
    processAllTokens(e4) {
      return e4;
    }
    provideLexer() {
      return this.block ? b3.lex : b3.lexInline;
    }
    provideParser() {
      return this.block ? R.parse : R.parseInline;
    }
  }, __publicField(_a11, "passThroughHooks", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"])), _a11);
  var B3 = class {
    constructor(...e4) {
      __publicField(this, "defaults", L2());
      __publicField(this, "options", this.setOptions);
      __publicField(this, "parse", this.parseMarkdown(true));
      __publicField(this, "parseInline", this.parseMarkdown(false));
      __publicField(this, "Parser", R);
      __publicField(this, "Renderer", P3);
      __publicField(this, "TextRenderer", S2);
      __publicField(this, "Lexer", b3);
      __publicField(this, "Tokenizer", y3);
      __publicField(this, "Hooks", $2);
      this.use(...e4);
    }
    walkTokens(e4, t4) {
      let n3 = [];
      for (let r4 of e4) switch (n3 = n3.concat(t4.call(this, r4)), r4.type) {
        case "table": {
          let i5 = r4;
          for (let s4 of i5.header) n3 = n3.concat(this.walkTokens(s4.tokens, t4));
          for (let s4 of i5.rows) for (let o4 of s4) n3 = n3.concat(this.walkTokens(o4.tokens, t4));
          break;
        }
        case "list": {
          let i5 = r4;
          n3 = n3.concat(this.walkTokens(i5.items, t4));
          break;
        }
        default: {
          let i5 = r4;
          this.defaults.extensions?.childTokens?.[i5.type] ? this.defaults.extensions.childTokens[i5.type].forEach((s4) => {
            let o4 = i5[s4].flat(1 / 0);
            n3 = n3.concat(this.walkTokens(o4, t4));
          }) : i5.tokens && (n3 = n3.concat(this.walkTokens(i5.tokens, t4)));
        }
      }
      return n3;
    }
    use(...e4) {
      let t4 = this.defaults.extensions || { renderers: {}, childTokens: {} };
      return e4.forEach((n3) => {
        let r4 = { ...n3 };
        if (r4.async = this.defaults.async || r4.async || false, n3.extensions && (n3.extensions.forEach((i5) => {
          if (!i5.name) throw new Error("extension name required");
          if ("renderer" in i5) {
            let s4 = t4.renderers[i5.name];
            s4 ? t4.renderers[i5.name] = function(...o4) {
              let a4 = i5.renderer.apply(this, o4);
              return a4 === false && (a4 = s4.apply(this, o4)), a4;
            } : t4.renderers[i5.name] = i5.renderer;
          }
          if ("tokenizer" in i5) {
            if (!i5.level || i5.level !== "block" && i5.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
            let s4 = t4[i5.level];
            s4 ? s4.unshift(i5.tokenizer) : t4[i5.level] = [i5.tokenizer], i5.start && (i5.level === "block" ? t4.startBlock ? t4.startBlock.push(i5.start) : t4.startBlock = [i5.start] : i5.level === "inline" && (t4.startInline ? t4.startInline.push(i5.start) : t4.startInline = [i5.start]));
          }
          "childTokens" in i5 && i5.childTokens && (t4.childTokens[i5.name] = i5.childTokens);
        }), r4.extensions = t4), n3.renderer) {
          let i5 = this.defaults.renderer || new P3(this.defaults);
          for (let s4 in n3.renderer) {
            if (!(s4 in i5)) throw new Error(`renderer '${s4}' does not exist`);
            if (["options", "parser"].includes(s4)) continue;
            let o4 = s4, a4 = n3.renderer[o4], u5 = i5[o4];
            i5[o4] = (...p4) => {
              let c4 = a4.apply(i5, p4);
              return c4 === false && (c4 = u5.apply(i5, p4)), c4 || "";
            };
          }
          r4.renderer = i5;
        }
        if (n3.tokenizer) {
          let i5 = this.defaults.tokenizer || new y3(this.defaults);
          for (let s4 in n3.tokenizer) {
            if (!(s4 in i5)) throw new Error(`tokenizer '${s4}' does not exist`);
            if (["options", "rules", "lexer"].includes(s4)) continue;
            let o4 = s4, a4 = n3.tokenizer[o4], u5 = i5[o4];
            i5[o4] = (...p4) => {
              let c4 = a4.apply(i5, p4);
              return c4 === false && (c4 = u5.apply(i5, p4)), c4;
            };
          }
          r4.tokenizer = i5;
        }
        if (n3.hooks) {
          let i5 = this.defaults.hooks || new $2();
          for (let s4 in n3.hooks) {
            if (!(s4 in i5)) throw new Error(`hook '${s4}' does not exist`);
            if (["options", "block"].includes(s4)) continue;
            let o4 = s4, a4 = n3.hooks[o4], u5 = i5[o4];
            $2.passThroughHooks.has(s4) ? i5[o4] = (p4) => {
              if (this.defaults.async) return Promise.resolve(a4.call(i5, p4)).then((f5) => u5.call(i5, f5));
              let c4 = a4.call(i5, p4);
              return u5.call(i5, c4);
            } : i5[o4] = (...p4) => {
              let c4 = a4.apply(i5, p4);
              return c4 === false && (c4 = u5.apply(i5, p4)), c4;
            };
          }
          r4.hooks = i5;
        }
        if (n3.walkTokens) {
          let i5 = this.defaults.walkTokens, s4 = n3.walkTokens;
          r4.walkTokens = function(o4) {
            let a4 = [];
            return a4.push(s4.call(this, o4)), i5 && (a4 = a4.concat(i5.call(this, o4))), a4;
          };
        }
        this.defaults = { ...this.defaults, ...r4 };
      }), this;
    }
    setOptions(e4) {
      return this.defaults = { ...this.defaults, ...e4 }, this;
    }
    lexer(e4, t4) {
      return b3.lex(e4, t4 ?? this.defaults);
    }
    parser(e4, t4) {
      return R.parse(e4, t4 ?? this.defaults);
    }
    parseMarkdown(e4) {
      return (n3, r4) => {
        let i5 = { ...r4 }, s4 = { ...this.defaults, ...i5 }, o4 = this.onError(!!s4.silent, !!s4.async);
        if (this.defaults.async === true && i5.async === false) return o4(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
        if (typeof n3 > "u" || n3 === null) return o4(new Error("marked(): input parameter is undefined or null"));
        if (typeof n3 != "string") return o4(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n3) + ", string expected"));
        s4.hooks && (s4.hooks.options = s4, s4.hooks.block = e4);
        let a4 = s4.hooks ? s4.hooks.provideLexer() : e4 ? b3.lex : b3.lexInline, u5 = s4.hooks ? s4.hooks.provideParser() : e4 ? R.parse : R.parseInline;
        if (s4.async) return Promise.resolve(s4.hooks ? s4.hooks.preprocess(n3) : n3).then((p4) => a4(p4, s4)).then((p4) => s4.hooks ? s4.hooks.processAllTokens(p4) : p4).then((p4) => s4.walkTokens ? Promise.all(this.walkTokens(p4, s4.walkTokens)).then(() => p4) : p4).then((p4) => u5(p4, s4)).then((p4) => s4.hooks ? s4.hooks.postprocess(p4) : p4).catch(o4);
        try {
          s4.hooks && (n3 = s4.hooks.preprocess(n3));
          let p4 = a4(n3, s4);
          s4.hooks && (p4 = s4.hooks.processAllTokens(p4)), s4.walkTokens && this.walkTokens(p4, s4.walkTokens);
          let c4 = u5(p4, s4);
          return s4.hooks && (c4 = s4.hooks.postprocess(c4)), c4;
        } catch (p4) {
          return o4(p4);
        }
      };
    }
    onError(e4, t4) {
      return (n3) => {
        if (n3.message += `
Please report this to https://github.com/markedjs/marked.`, e4) {
          let r4 = "<p>An error occurred:</p><pre>" + w3(n3.message + "", true) + "</pre>";
          return t4 ? Promise.resolve(r4) : r4;
        }
        if (t4) return Promise.reject(n3);
        throw n3;
      };
    }
  };
  var _3 = new B3();
  function d3(l6, e4) {
    return _3.parse(l6, e4);
  }
  d3.options = d3.setOptions = function(l6) {
    return _3.setOptions(l6), d3.defaults = _3.defaults, H2(d3.defaults), d3;
  };
  d3.getDefaults = L2;
  d3.defaults = O2;
  d3.use = function(...l6) {
    return _3.use(...l6), d3.defaults = _3.defaults, H2(d3.defaults), d3;
  };
  d3.walkTokens = function(l6, e4) {
    return _3.walkTokens(l6, e4);
  };
  d3.parseInline = _3.parseInline;
  d3.Parser = R;
  d3.parser = R.parse;
  d3.Renderer = P3;
  d3.TextRenderer = S2;
  d3.Lexer = b3;
  d3.lexer = b3.lex;
  d3.Tokenizer = y3;
  d3.Hooks = $2;
  d3.parse = d3;
  var Dt = d3.options;
  var Zt = d3.setOptions;
  var Gt = d3.use;
  var Ht = d3.walkTokens;
  var Nt = d3.parseInline;
  var Ft = R.parse;
  var Qt = b3.lex;

  // apps/larry-vscode-ext/node_modules/dompurify/dist/purify.es.mjs
  var {
    entries,
    setPrototypeOf,
    isFrozen,
    getPrototypeOf,
    getOwnPropertyDescriptor
  } = Object;
  var {
    freeze,
    seal,
    create
  } = Object;
  var {
    apply,
    construct
  } = typeof Reflect !== "undefined" && Reflect;
  if (!freeze) {
    freeze = function freeze2(x4) {
      return x4;
    };
  }
  if (!seal) {
    seal = function seal2(x4) {
      return x4;
    };
  }
  if (!apply) {
    apply = function apply2(func, thisArg) {
      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }
      return func.apply(thisArg, args);
    };
  }
  if (!construct) {
    construct = function construct2(Func) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      return new Func(...args);
    };
  }
  var arrayForEach = unapply(Array.prototype.forEach);
  var arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
  var arrayPop = unapply(Array.prototype.pop);
  var arrayPush = unapply(Array.prototype.push);
  var arraySplice = unapply(Array.prototype.splice);
  var stringToLowerCase = unapply(String.prototype.toLowerCase);
  var stringToString = unapply(String.prototype.toString);
  var stringMatch = unapply(String.prototype.match);
  var stringReplace = unapply(String.prototype.replace);
  var stringIndexOf = unapply(String.prototype.indexOf);
  var stringTrim = unapply(String.prototype.trim);
  var objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
  var regExpTest = unapply(RegExp.prototype.test);
  var typeErrorCreate = unconstruct(TypeError);
  function unapply(func) {
    return function(thisArg) {
      if (thisArg instanceof RegExp) {
        thisArg.lastIndex = 0;
      }
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }
      return apply(func, thisArg, args);
    };
  }
  function unconstruct(Func) {
    return function() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return construct(Func, args);
    };
  }
  function addToSet(set, array) {
    let transformCaseFunc = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : stringToLowerCase;
    if (setPrototypeOf) {
      setPrototypeOf(set, null);
    }
    let l6 = array.length;
    while (l6--) {
      let element = array[l6];
      if (typeof element === "string") {
        const lcElement = transformCaseFunc(element);
        if (lcElement !== element) {
          if (!isFrozen(array)) {
            array[l6] = lcElement;
          }
          element = lcElement;
        }
      }
      set[element] = true;
    }
    return set;
  }
  function cleanArray(array) {
    for (let index3 = 0; index3 < array.length; index3++) {
      const isPropertyExist = objectHasOwnProperty(array, index3);
      if (!isPropertyExist) {
        array[index3] = null;
      }
    }
    return array;
  }
  function clone(object) {
    const newObject = create(null);
    for (const [property, value] of entries(object)) {
      const isPropertyExist = objectHasOwnProperty(object, property);
      if (isPropertyExist) {
        if (Array.isArray(value)) {
          newObject[property] = cleanArray(value);
        } else if (value && typeof value === "object" && value.constructor === Object) {
          newObject[property] = clone(value);
        } else {
          newObject[property] = value;
        }
      }
    }
    return newObject;
  }
  function lookupGetter(object, prop) {
    while (object !== null) {
      const desc = getOwnPropertyDescriptor(object, prop);
      if (desc) {
        if (desc.get) {
          return unapply(desc.get);
        }
        if (typeof desc.value === "function") {
          return unapply(desc.value);
        }
      }
      object = getPrototypeOf(object);
    }
    function fallbackValue() {
      return null;
    }
    return fallbackValue;
  }
  var html$1 = freeze(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]);
  var svg$1 = freeze(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "slot", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]);
  var svgFilters = freeze(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]);
  var svgDisallowed = freeze(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]);
  var mathMl$1 = freeze(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]);
  var mathMlDisallowed = freeze(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]);
  var text = freeze(["#text"]);
  var html = freeze(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]);
  var svg = freeze(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]);
  var mathMl = freeze(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]);
  var xml = freeze(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]);
  var MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm);
  var ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
  var TMPLIT_EXPR = seal(/\$\{[\w\W]*/gm);
  var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/);
  var ARIA_ATTR = seal(/^aria-[\-\w]+$/);
  var IS_ALLOWED_URI = seal(
    /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
    // eslint-disable-line no-useless-escape
  );
  var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
  var ATTR_WHITESPACE = seal(
    /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
    // eslint-disable-line no-control-regex
  );
  var DOCTYPE_NAME = seal(/^html$/i);
  var CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);
  var EXPRESSIONS = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    ARIA_ATTR,
    ATTR_WHITESPACE,
    CUSTOM_ELEMENT,
    DATA_ATTR,
    DOCTYPE_NAME,
    ERB_EXPR,
    IS_ALLOWED_URI,
    IS_SCRIPT_OR_DATA,
    MUSTACHE_EXPR,
    TMPLIT_EXPR
  });
  var NODE_TYPE = {
    element: 1,
    attribute: 2,
    text: 3,
    cdataSection: 4,
    entityReference: 5,
    // Deprecated
    entityNode: 6,
    // Deprecated
    progressingInstruction: 7,
    comment: 8,
    document: 9,
    documentType: 10,
    documentFragment: 11,
    notation: 12
    // Deprecated
  };
  var getGlobal = function getGlobal2() {
    return typeof window === "undefined" ? null : window;
  };
  var _createTrustedTypesPolicy = function _createTrustedTypesPolicy2(trustedTypes, purifyHostElement) {
    if (typeof trustedTypes !== "object" || typeof trustedTypes.createPolicy !== "function") {
      return null;
    }
    let suffix = null;
    const ATTR_NAME = "data-tt-policy-suffix";
    if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
      suffix = purifyHostElement.getAttribute(ATTR_NAME);
    }
    const policyName = "dompurify" + (suffix ? "#" + suffix : "");
    try {
      return trustedTypes.createPolicy(policyName, {
        createHTML(html2) {
          return html2;
        },
        createScriptURL(scriptUrl) {
          return scriptUrl;
        }
      });
    } catch (_5) {
      console.warn("TrustedTypes policy " + policyName + " could not be created.");
      return null;
    }
  };
  var _createHooksMap = function _createHooksMap2() {
    return {
      afterSanitizeAttributes: [],
      afterSanitizeElements: [],
      afterSanitizeShadowDOM: [],
      beforeSanitizeAttributes: [],
      beforeSanitizeElements: [],
      beforeSanitizeShadowDOM: [],
      uponSanitizeAttribute: [],
      uponSanitizeElement: [],
      uponSanitizeShadowNode: []
    };
  };
  function createDOMPurify() {
    let window2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
    const DOMPurify = (root) => createDOMPurify(root);
    DOMPurify.version = "3.2.7";
    DOMPurify.removed = [];
    if (!window2 || !window2.document || window2.document.nodeType !== NODE_TYPE.document || !window2.Element) {
      DOMPurify.isSupported = false;
      return DOMPurify;
    }
    let {
      document: document2
    } = window2;
    const originalDocument = document2;
    const currentScript = originalDocument.currentScript;
    const {
      DocumentFragment,
      HTMLTemplateElement,
      Node,
      Element,
      NodeFilter,
      NamedNodeMap = window2.NamedNodeMap || window2.MozNamedAttrMap,
      HTMLFormElement,
      DOMParser,
      trustedTypes
    } = window2;
    const ElementPrototype = Element.prototype;
    const cloneNode = lookupGetter(ElementPrototype, "cloneNode");
    const remove = lookupGetter(ElementPrototype, "remove");
    const getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
    const getChildNodes = lookupGetter(ElementPrototype, "childNodes");
    const getParentNode = lookupGetter(ElementPrototype, "parentNode");
    if (typeof HTMLTemplateElement === "function") {
      const template = document2.createElement("template");
      if (template.content && template.content.ownerDocument) {
        document2 = template.content.ownerDocument;
      }
    }
    let trustedTypesPolicy;
    let emptyHTML = "";
    const {
      implementation,
      createNodeIterator,
      createDocumentFragment,
      getElementsByTagName
    } = document2;
    const {
      importNode
    } = originalDocument;
    let hooks = _createHooksMap();
    DOMPurify.isSupported = typeof entries === "function" && typeof getParentNode === "function" && implementation && implementation.createHTMLDocument !== void 0;
    const {
      MUSTACHE_EXPR: MUSTACHE_EXPR2,
      ERB_EXPR: ERB_EXPR2,
      TMPLIT_EXPR: TMPLIT_EXPR2,
      DATA_ATTR: DATA_ATTR2,
      ARIA_ATTR: ARIA_ATTR2,
      IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA2,
      ATTR_WHITESPACE: ATTR_WHITESPACE2,
      CUSTOM_ELEMENT: CUSTOM_ELEMENT2
    } = EXPRESSIONS;
    let {
      IS_ALLOWED_URI: IS_ALLOWED_URI$1
    } = EXPRESSIONS;
    let ALLOWED_TAGS = null;
    const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);
    let ALLOWED_ATTR = null;
    const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);
    let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
      tagNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      attributeNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      allowCustomizedBuiltInElements: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: false
      }
    }));
    let FORBID_TAGS = null;
    let FORBID_ATTR = null;
    let ALLOW_ARIA_ATTR = true;
    let ALLOW_DATA_ATTR = true;
    let ALLOW_UNKNOWN_PROTOCOLS = false;
    let ALLOW_SELF_CLOSE_IN_ATTR = true;
    let SAFE_FOR_TEMPLATES = false;
    let SAFE_FOR_XML = true;
    let WHOLE_DOCUMENT = false;
    let SET_CONFIG = false;
    let FORCE_BODY = false;
    let RETURN_DOM = false;
    let RETURN_DOM_FRAGMENT = false;
    let RETURN_TRUSTED_TYPE = false;
    let SANITIZE_DOM = true;
    let SANITIZE_NAMED_PROPS = false;
    const SANITIZE_NAMED_PROPS_PREFIX = "user-content-";
    let KEEP_CONTENT = true;
    let IN_PLACE = false;
    let USE_PROFILES = {};
    let FORBID_CONTENTS = null;
    const DEFAULT_FORBID_CONTENTS = addToSet({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
    let DATA_URI_TAGS = null;
    const DEFAULT_DATA_URI_TAGS = addToSet({}, ["audio", "video", "img", "source", "image", "track"]);
    let URI_SAFE_ATTRIBUTES = null;
    const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]);
    const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
    const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
    const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
    let NAMESPACE = HTML_NAMESPACE;
    let IS_EMPTY_INPUT = false;
    let ALLOWED_NAMESPACES = null;
    const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
    let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ["mi", "mo", "mn", "ms", "mtext"]);
    let HTML_INTEGRATION_POINTS = addToSet({}, ["annotation-xml"]);
    const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ["title", "style", "font", "a", "script"]);
    let PARSER_MEDIA_TYPE = null;
    const SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
    const DEFAULT_PARSER_MEDIA_TYPE = "text/html";
    let transformCaseFunc = null;
    let CONFIG = null;
    const formElement = document2.createElement("form");
    const isRegexOrFunction = function isRegexOrFunction2(testValue) {
      return testValue instanceof RegExp || testValue instanceof Function;
    };
    const _parseConfig = function _parseConfig2() {
      let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      if (CONFIG && CONFIG === cfg) {
        return;
      }
      if (!cfg || typeof cfg !== "object") {
        cfg = {};
      }
      cfg = clone(cfg);
      PARSER_MEDIA_TYPE = // eslint-disable-next-line unicorn/prefer-includes
      SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
      transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
      ALLOWED_TAGS = objectHasOwnProperty(cfg, "ALLOWED_TAGS") ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
      ALLOWED_ATTR = objectHasOwnProperty(cfg, "ALLOWED_ATTR") ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
      ALLOWED_NAMESPACES = objectHasOwnProperty(cfg, "ALLOWED_NAMESPACES") ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
      URI_SAFE_ATTRIBUTES = objectHasOwnProperty(cfg, "ADD_URI_SAFE_ATTR") ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR, transformCaseFunc) : DEFAULT_URI_SAFE_ATTRIBUTES;
      DATA_URI_TAGS = objectHasOwnProperty(cfg, "ADD_DATA_URI_TAGS") ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS, transformCaseFunc) : DEFAULT_DATA_URI_TAGS;
      FORBID_CONTENTS = objectHasOwnProperty(cfg, "FORBID_CONTENTS") ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
      FORBID_TAGS = objectHasOwnProperty(cfg, "FORBID_TAGS") ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : clone({});
      FORBID_ATTR = objectHasOwnProperty(cfg, "FORBID_ATTR") ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : clone({});
      USE_PROFILES = objectHasOwnProperty(cfg, "USE_PROFILES") ? cfg.USE_PROFILES : false;
      ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
      ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
      ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
      ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false;
      SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
      SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false;
      WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
      RETURN_DOM = cfg.RETURN_DOM || false;
      RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
      RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
      FORCE_BODY = cfg.FORCE_BODY || false;
      SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
      SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false;
      KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
      IN_PLACE = cfg.IN_PLACE || false;
      IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
      NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
      MATHML_TEXT_INTEGRATION_POINTS = cfg.MATHML_TEXT_INTEGRATION_POINTS || MATHML_TEXT_INTEGRATION_POINTS;
      HTML_INTEGRATION_POINTS = cfg.HTML_INTEGRATION_POINTS || HTML_INTEGRATION_POINTS;
      CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};
      if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
        CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
      }
      if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
        CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
      }
      if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === "boolean") {
        CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
      }
      if (SAFE_FOR_TEMPLATES) {
        ALLOW_DATA_ATTR = false;
      }
      if (RETURN_DOM_FRAGMENT) {
        RETURN_DOM = true;
      }
      if (USE_PROFILES) {
        ALLOWED_TAGS = addToSet({}, text);
        ALLOWED_ATTR = [];
        if (USE_PROFILES.html === true) {
          addToSet(ALLOWED_TAGS, html$1);
          addToSet(ALLOWED_ATTR, html);
        }
        if (USE_PROFILES.svg === true) {
          addToSet(ALLOWED_TAGS, svg$1);
          addToSet(ALLOWED_ATTR, svg);
          addToSet(ALLOWED_ATTR, xml);
        }
        if (USE_PROFILES.svgFilters === true) {
          addToSet(ALLOWED_TAGS, svgFilters);
          addToSet(ALLOWED_ATTR, svg);
          addToSet(ALLOWED_ATTR, xml);
        }
        if (USE_PROFILES.mathMl === true) {
          addToSet(ALLOWED_TAGS, mathMl$1);
          addToSet(ALLOWED_ATTR, mathMl);
          addToSet(ALLOWED_ATTR, xml);
        }
      }
      if (cfg.ADD_TAGS) {
        if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
          ALLOWED_TAGS = clone(ALLOWED_TAGS);
        }
        addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
      }
      if (cfg.ADD_ATTR) {
        if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
          ALLOWED_ATTR = clone(ALLOWED_ATTR);
        }
        addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
      }
      if (cfg.ADD_URI_SAFE_ATTR) {
        addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
      }
      if (cfg.FORBID_CONTENTS) {
        if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
          FORBID_CONTENTS = clone(FORBID_CONTENTS);
        }
        addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
      }
      if (KEEP_CONTENT) {
        ALLOWED_TAGS["#text"] = true;
      }
      if (WHOLE_DOCUMENT) {
        addToSet(ALLOWED_TAGS, ["html", "head", "body"]);
      }
      if (ALLOWED_TAGS.table) {
        addToSet(ALLOWED_TAGS, ["tbody"]);
        delete FORBID_TAGS.tbody;
      }
      if (cfg.TRUSTED_TYPES_POLICY) {
        if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== "function") {
          throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        }
        if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== "function") {
          throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        }
        trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
        emptyHTML = trustedTypesPolicy.createHTML("");
      } else {
        if (trustedTypesPolicy === void 0) {
          trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
        }
        if (trustedTypesPolicy !== null && typeof emptyHTML === "string") {
          emptyHTML = trustedTypesPolicy.createHTML("");
        }
      }
      if (freeze) {
        freeze(cfg);
      }
      CONFIG = cfg;
    };
    const ALL_SVG_TAGS = addToSet({}, [...svg$1, ...svgFilters, ...svgDisallowed]);
    const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
    const _checkValidNamespace = function _checkValidNamespace2(element) {
      let parent = getParentNode(element);
      if (!parent || !parent.tagName) {
        parent = {
          namespaceURI: NAMESPACE,
          tagName: "template"
        };
      }
      const tagName = stringToLowerCase(element.tagName);
      const parentTagName = stringToLowerCase(parent.tagName);
      if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
        return false;
      }
      if (element.namespaceURI === SVG_NAMESPACE) {
        if (parent.namespaceURI === HTML_NAMESPACE) {
          return tagName === "svg";
        }
        if (parent.namespaceURI === MATHML_NAMESPACE) {
          return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
        }
        return Boolean(ALL_SVG_TAGS[tagName]);
      }
      if (element.namespaceURI === MATHML_NAMESPACE) {
        if (parent.namespaceURI === HTML_NAMESPACE) {
          return tagName === "math";
        }
        if (parent.namespaceURI === SVG_NAMESPACE) {
          return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
        }
        return Boolean(ALL_MATHML_TAGS[tagName]);
      }
      if (element.namespaceURI === HTML_NAMESPACE) {
        if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
          return false;
        }
        if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
          return false;
        }
        return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
      }
      if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && ALLOWED_NAMESPACES[element.namespaceURI]) {
        return true;
      }
      return false;
    };
    const _forceRemove = function _forceRemove2(node) {
      arrayPush(DOMPurify.removed, {
        element: node
      });
      try {
        getParentNode(node).removeChild(node);
      } catch (_5) {
        remove(node);
      }
    };
    const _removeAttribute = function _removeAttribute2(name, element) {
      try {
        arrayPush(DOMPurify.removed, {
          attribute: element.getAttributeNode(name),
          from: element
        });
      } catch (_5) {
        arrayPush(DOMPurify.removed, {
          attribute: null,
          from: element
        });
      }
      element.removeAttribute(name);
      if (name === "is") {
        if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
          try {
            _forceRemove(element);
          } catch (_5) {
          }
        } else {
          try {
            element.setAttribute(name, "");
          } catch (_5) {
          }
        }
      }
    };
    const _initDocument = function _initDocument2(dirty) {
      let doc = null;
      let leadingWhitespace = null;
      if (FORCE_BODY) {
        dirty = "<remove></remove>" + dirty;
      } else {
        const matches = stringMatch(dirty, /^[\r\n\t ]+/);
        leadingWhitespace = matches && matches[0];
      }
      if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && NAMESPACE === HTML_NAMESPACE) {
        dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + "</body></html>";
      }
      const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
      if (NAMESPACE === HTML_NAMESPACE) {
        try {
          doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
        } catch (_5) {
        }
      }
      if (!doc || !doc.documentElement) {
        doc = implementation.createDocument(NAMESPACE, "template", null);
        try {
          doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
        } catch (_5) {
        }
      }
      const body = doc.body || doc.documentElement;
      if (dirty && leadingWhitespace) {
        body.insertBefore(document2.createTextNode(leadingWhitespace), body.childNodes[0] || null);
      }
      if (NAMESPACE === HTML_NAMESPACE) {
        return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
      }
      return WHOLE_DOCUMENT ? doc.documentElement : body;
    };
    const _createNodeIterator = function _createNodeIterator2(root) {
      return createNodeIterator.call(
        root.ownerDocument || root,
        root,
        // eslint-disable-next-line no-bitwise
        NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION,
        null
      );
    };
    const _isClobbered = function _isClobbered2(element) {
      return element instanceof HTMLFormElement && (typeof element.nodeName !== "string" || typeof element.textContent !== "string" || typeof element.removeChild !== "function" || !(element.attributes instanceof NamedNodeMap) || typeof element.removeAttribute !== "function" || typeof element.setAttribute !== "function" || typeof element.namespaceURI !== "string" || typeof element.insertBefore !== "function" || typeof element.hasChildNodes !== "function");
    };
    const _isNode = function _isNode2(value) {
      return typeof Node === "function" && value instanceof Node;
    };
    function _executeHooks(hooks2, currentNode, data) {
      arrayForEach(hooks2, (hook) => {
        hook.call(DOMPurify, currentNode, data, CONFIG);
      });
    }
    const _sanitizeElements = function _sanitizeElements2(currentNode) {
      let content = null;
      _executeHooks(hooks.beforeSanitizeElements, currentNode, null);
      if (_isClobbered(currentNode)) {
        _forceRemove(currentNode);
        return true;
      }
      const tagName = transformCaseFunc(currentNode.nodeName);
      _executeHooks(hooks.uponSanitizeElement, currentNode, {
        tagName,
        allowedTags: ALLOWED_TAGS
      });
      if (SAFE_FOR_XML && currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w!]/g, currentNode.innerHTML) && regExpTest(/<[/\w!]/g, currentNode.textContent)) {
        _forceRemove(currentNode);
        return true;
      }
      if (currentNode.nodeType === NODE_TYPE.progressingInstruction) {
        _forceRemove(currentNode);
        return true;
      }
      if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(/<[/\w]/g, currentNode.data)) {
        _forceRemove(currentNode);
        return true;
      }
      if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
        if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
          if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
            return false;
          }
          if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) {
            return false;
          }
        }
        if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
          const parentNode = getParentNode(currentNode) || currentNode.parentNode;
          const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
          if (childNodes && parentNode) {
            const childCount = childNodes.length;
            for (let i5 = childCount - 1; i5 >= 0; --i5) {
              const childClone = cloneNode(childNodes[i5], true);
              childClone.__removalCount = (currentNode.__removalCount || 0) + 1;
              parentNode.insertBefore(childClone, getNextSibling(currentNode));
            }
          }
        }
        _forceRemove(currentNode);
        return true;
      }
      if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
        _forceRemove(currentNode);
        return true;
      }
      if ((tagName === "noscript" || tagName === "noembed" || tagName === "noframes") && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
        _forceRemove(currentNode);
        return true;
      }
      if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
        content = currentNode.textContent;
        arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
          content = stringReplace(content, expr, " ");
        });
        if (currentNode.textContent !== content) {
          arrayPush(DOMPurify.removed, {
            element: currentNode.cloneNode()
          });
          currentNode.textContent = content;
        }
      }
      _executeHooks(hooks.afterSanitizeElements, currentNode, null);
      return false;
    };
    const _isValidAttribute = function _isValidAttribute2(lcTag, lcName, value) {
      if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document2 || value in formElement)) {
        return false;
      }
      if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR2, lcName)) ;
      else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR2, lcName)) ;
      else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
        if (
          // First condition does a very basic check if a) it's basically a valid custom element tagname AND
          // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
          // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
          _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName, lcTag)) || // Alternative, second condition checks if it's an `is`-attribute, AND
          // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
          lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))
        ) ;
        else {
          return false;
        }
      } else if (URI_SAFE_ATTRIBUTES[lcName]) ;
      else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE2, ""))) ;
      else if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag]) ;
      else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA2, stringReplace(value, ATTR_WHITESPACE2, ""))) ;
      else if (value) {
        return false;
      } else ;
      return true;
    };
    const _isBasicCustomElement = function _isBasicCustomElement2(tagName) {
      return tagName !== "annotation-xml" && stringMatch(tagName, CUSTOM_ELEMENT2);
    };
    const _sanitizeAttributes = function _sanitizeAttributes2(currentNode) {
      _executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
      const {
        attributes
      } = currentNode;
      if (!attributes || _isClobbered(currentNode)) {
        return;
      }
      const hookEvent = {
        attrName: "",
        attrValue: "",
        keepAttr: true,
        allowedAttributes: ALLOWED_ATTR,
        forceKeepAttr: void 0
      };
      let l6 = attributes.length;
      while (l6--) {
        const attr = attributes[l6];
        const {
          name,
          namespaceURI,
          value: attrValue
        } = attr;
        const lcName = transformCaseFunc(name);
        const initValue = attrValue;
        let value = name === "value" ? initValue : stringTrim(initValue);
        hookEvent.attrName = lcName;
        hookEvent.attrValue = value;
        hookEvent.keepAttr = true;
        hookEvent.forceKeepAttr = void 0;
        _executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
        value = hookEvent.attrValue;
        if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name")) {
          _removeAttribute(name, currentNode);
          value = SANITIZE_NAMED_PROPS_PREFIX + value;
        }
        if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|title|textarea)/i, value)) {
          _removeAttribute(name, currentNode);
          continue;
        }
        if (lcName === "attributename" && stringMatch(value, "href")) {
          _removeAttribute(name, currentNode);
          continue;
        }
        if (hookEvent.forceKeepAttr) {
          continue;
        }
        if (!hookEvent.keepAttr) {
          _removeAttribute(name, currentNode);
          continue;
        }
        if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
          _removeAttribute(name, currentNode);
          continue;
        }
        if (SAFE_FOR_TEMPLATES) {
          arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
            value = stringReplace(value, expr, " ");
          });
        }
        const lcTag = transformCaseFunc(currentNode.nodeName);
        if (!_isValidAttribute(lcTag, lcName, value)) {
          _removeAttribute(name, currentNode);
          continue;
        }
        if (trustedTypesPolicy && typeof trustedTypes === "object" && typeof trustedTypes.getAttributeType === "function") {
          if (namespaceURI) ;
          else {
            switch (trustedTypes.getAttributeType(lcTag, lcName)) {
              case "TrustedHTML": {
                value = trustedTypesPolicy.createHTML(value);
                break;
              }
              case "TrustedScriptURL": {
                value = trustedTypesPolicy.createScriptURL(value);
                break;
              }
            }
          }
        }
        if (value !== initValue) {
          try {
            if (namespaceURI) {
              currentNode.setAttributeNS(namespaceURI, name, value);
            } else {
              currentNode.setAttribute(name, value);
            }
            if (_isClobbered(currentNode)) {
              _forceRemove(currentNode);
            } else {
              arrayPop(DOMPurify.removed);
            }
          } catch (_5) {
            _removeAttribute(name, currentNode);
          }
        }
      }
      _executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
    };
    const _sanitizeShadowDOM = function _sanitizeShadowDOM2(fragment) {
      let shadowNode = null;
      const shadowIterator = _createNodeIterator(fragment);
      _executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
      while (shadowNode = shadowIterator.nextNode()) {
        _executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
        _sanitizeElements(shadowNode);
        _sanitizeAttributes(shadowNode);
        if (shadowNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM2(shadowNode.content);
        }
      }
      _executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
    };
    DOMPurify.sanitize = function(dirty) {
      let cfg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      let body = null;
      let importedNode = null;
      let currentNode = null;
      let returnNode = null;
      IS_EMPTY_INPUT = !dirty;
      if (IS_EMPTY_INPUT) {
        dirty = "<!-->";
      }
      if (typeof dirty !== "string" && !_isNode(dirty)) {
        if (typeof dirty.toString === "function") {
          dirty = dirty.toString();
          if (typeof dirty !== "string") {
            throw typeErrorCreate("dirty is not a string, aborting");
          }
        } else {
          throw typeErrorCreate("toString is not a function");
        }
      }
      if (!DOMPurify.isSupported) {
        return dirty;
      }
      if (!SET_CONFIG) {
        _parseConfig(cfg);
      }
      DOMPurify.removed = [];
      if (typeof dirty === "string") {
        IN_PLACE = false;
      }
      if (IN_PLACE) {
        if (dirty.nodeName) {
          const tagName = transformCaseFunc(dirty.nodeName);
          if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
            throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
          }
        }
      } else if (dirty instanceof Node) {
        body = _initDocument("<!---->");
        importedNode = body.ownerDocument.importNode(dirty, true);
        if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === "BODY") {
          body = importedNode;
        } else if (importedNode.nodeName === "HTML") {
          body = importedNode;
        } else {
          body.appendChild(importedNode);
        }
      } else {
        if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
        dirty.indexOf("<") === -1) {
          return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
        }
        body = _initDocument(dirty);
        if (!body) {
          return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
        }
      }
      if (body && FORCE_BODY) {
        _forceRemove(body.firstChild);
      }
      const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);
      while (currentNode = nodeIterator.nextNode()) {
        _sanitizeElements(currentNode);
        _sanitizeAttributes(currentNode);
        if (currentNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM(currentNode.content);
        }
      }
      if (IN_PLACE) {
        return dirty;
      }
      if (RETURN_DOM) {
        if (RETURN_DOM_FRAGMENT) {
          returnNode = createDocumentFragment.call(body.ownerDocument);
          while (body.firstChild) {
            returnNode.appendChild(body.firstChild);
          }
        } else {
          returnNode = body;
        }
        if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
          returnNode = importNode.call(originalDocument, returnNode, true);
        }
        return returnNode;
      }
      let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
      if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
        serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
      }
      if (SAFE_FOR_TEMPLATES) {
        arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
          serializedHTML = stringReplace(serializedHTML, expr, " ");
        });
      }
      return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
    };
    DOMPurify.setConfig = function() {
      let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      _parseConfig(cfg);
      SET_CONFIG = true;
    };
    DOMPurify.clearConfig = function() {
      CONFIG = null;
      SET_CONFIG = false;
    };
    DOMPurify.isValidAttribute = function(tag, attr, value) {
      if (!CONFIG) {
        _parseConfig({});
      }
      const lcTag = transformCaseFunc(tag);
      const lcName = transformCaseFunc(attr);
      return _isValidAttribute(lcTag, lcName, value);
    };
    DOMPurify.addHook = function(entryPoint, hookFunction) {
      if (typeof hookFunction !== "function") {
        return;
      }
      arrayPush(hooks[entryPoint], hookFunction);
    };
    DOMPurify.removeHook = function(entryPoint, hookFunction) {
      if (hookFunction !== void 0) {
        const index3 = arrayLastIndexOf(hooks[entryPoint], hookFunction);
        return index3 === -1 ? void 0 : arraySplice(hooks[entryPoint], index3, 1)[0];
      }
      return arrayPop(hooks[entryPoint]);
    };
    DOMPurify.removeHooks = function(entryPoint) {
      hooks[entryPoint] = [];
    };
    DOMPurify.removeAllHooks = function() {
      hooks = _createHooksMap();
    };
    return DOMPurify;
  }
  var purify = createDOMPurify();

  // apps/larry-vscode-ext/webview/src/hooks/useMarkdown.ts
  d3.setOptions({
    breaks: true,
    gfm: true
  });
  function useMarkdown() {
    return (content) => {
      const html2 = d3.parse(content);
      const decodedHtml = html2.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
      return purify.sanitize(decodedHtml);
    };
  }

  // apps/larry-vscode-ext/webview/src/views/components/GeneralMessageBubble.tsx
  function GeneralMessageBubble({ content, topActions, bottomActions, contentRef }) {
    const mark = useMarkdown();
    const formattedContent = mark(content);
    return /* @__PURE__ */ u3("div", { className: "mb-2 generalMessageBubbleWrapper", children: [
      topActions && /* @__PURE__ */ u3("div", { className: "topActions", children: topActions }),
      /* @__PURE__ */ u3("div", { className: `generalMessageBubble markdown-content markdown-body ${topActions ? "hasTopActions" : ""} ${bottomActions ? "hasBottomActions" : ""}`, ref: contentRef, children: /* @__PURE__ */ u3("span", { dangerouslySetInnerHTML: { __html: formattedContent } }) }),
      bottomActions && /* @__PURE__ */ u3("div", { className: "bottomActions", children: bottomActions })
    ] });
  }

  // apps/larry-vscode-ext/webview/src/views/components/states/ConfirmUserIntent.tsx
  function ConfirmUserIntent({ data, id }) {
    return /* @__PURE__ */ u3("div", { className: "confirm-user-intent", children: /* @__PURE__ */ u3(GeneralMessageBubble, { content: data.confirmationPrompt, topActions: null }, id) });
  }

  // node_modules/preact/dist/preact.module.js
  var n2;
  var l5;
  var u4;
  var t3;
  var i4;
  var r3;
  var o3;
  var e3;
  var f4;
  var c3;
  var s3;
  var a3;
  var h4;
  var p3 = {};
  var v4 = [];
  var y4 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  var w4 = Array.isArray;
  function d4(n3, l6) {
    for (var u5 in l6) n3[u5] = l6[u5];
    return n3;
  }
  function g3(n3) {
    n3 && n3.parentNode && n3.parentNode.removeChild(n3);
  }
  function _4(l6, u5, t4) {
    var i5, r4, o4, e4 = {};
    for (o4 in u5) "key" == o4 ? i5 = u5[o4] : "ref" == o4 ? r4 = u5[o4] : e4[o4] = u5[o4];
    if (arguments.length > 2 && (e4.children = arguments.length > 3 ? n2.call(arguments, 2) : t4), "function" == typeof l6 && null != l6.defaultProps) for (o4 in l6.defaultProps) void 0 === e4[o4] && (e4[o4] = l6.defaultProps[o4]);
    return m4(l6, e4, i5, r4, null);
  }
  function m4(n3, t4, i5, r4, o4) {
    var e4 = { type: n3, props: t4, key: i5, ref: r4, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o4 ? ++u4 : o4, __i: -1, __u: 0 };
    return null == o4 && null != l5.vnode && l5.vnode(e4), e4;
  }
  function k3(n3) {
    return n3.children;
  }
  function x3(n3, l6) {
    this.props = n3, this.context = l6;
  }
  function S3(n3, l6) {
    if (null == l6) return n3.__ ? S3(n3.__, n3.__i + 1) : null;
    for (var u5; l6 < n3.__k.length; l6++) if (null != (u5 = n3.__k[l6]) && null != u5.__e) return u5.__e;
    return "function" == typeof n3.type ? S3(n3) : null;
  }
  function C4(n3) {
    var l6, u5;
    if (null != (n3 = n3.__) && null != n3.__c) {
      for (n3.__e = n3.__c.base = null, l6 = 0; l6 < n3.__k.length; l6++) if (null != (u5 = n3.__k[l6]) && null != u5.__e) {
        n3.__e = n3.__c.base = u5.__e;
        break;
      }
      return C4(n3);
    }
  }
  function M3(n3) {
    (!n3.__d && (n3.__d = true) && i4.push(n3) && !$3.__r++ || r3 != l5.debounceRendering) && ((r3 = l5.debounceRendering) || o3)($3);
  }
  function $3() {
    for (var n3, u5, t4, r4, o4, f5, c4, s4 = 1; i4.length; ) i4.length > s4 && i4.sort(e3), n3 = i4.shift(), s4 = i4.length, n3.__d && (t4 = void 0, r4 = void 0, o4 = (r4 = (u5 = n3).__v).__e, f5 = [], c4 = [], u5.__P && ((t4 = d4({}, r4)).__v = r4.__v + 1, l5.vnode && l5.vnode(t4), O3(u5.__P, t4, r4, u5.__n, u5.__P.namespaceURI, 32 & r4.__u ? [o4] : null, f5, null == o4 ? S3(r4) : o4, !!(32 & r4.__u), c4), t4.__v = r4.__v, t4.__.__k[t4.__i] = t4, N3(f5, t4, c4), r4.__e = r4.__ = null, t4.__e != o4 && C4(t4)));
    $3.__r = 0;
  }
  function I3(n3, l6, u5, t4, i5, r4, o4, e4, f5, c4, s4) {
    var a4, h5, y5, w5, d5, g4, _5, m5 = t4 && t4.__k || v4, b4 = l6.length;
    for (f5 = P4(u5, l6, m5, f5, b4), a4 = 0; a4 < b4; a4++) null != (y5 = u5.__k[a4]) && (h5 = -1 == y5.__i ? p3 : m5[y5.__i] || p3, y5.__i = a4, g4 = O3(n3, y5, h5, i5, r4, o4, e4, f5, c4, s4), w5 = y5.__e, y5.ref && h5.ref != y5.ref && (h5.ref && B4(h5.ref, null, y5), s4.push(y5.ref, y5.__c || w5, y5)), null == d5 && null != w5 && (d5 = w5), (_5 = !!(4 & y5.__u)) || h5.__k === y5.__k ? f5 = A3(y5, f5, n3, _5) : "function" == typeof y5.type && void 0 !== g4 ? f5 = g4 : w5 && (f5 = w5.nextSibling), y5.__u &= -7);
    return u5.__e = d5, f5;
  }
  function P4(n3, l6, u5, t4, i5) {
    var r4, o4, e4, f5, c4, s4 = u5.length, a4 = s4, h5 = 0;
    for (n3.__k = new Array(i5), r4 = 0; r4 < i5; r4++) null != (o4 = l6[r4]) && "boolean" != typeof o4 && "function" != typeof o4 ? (f5 = r4 + h5, (o4 = n3.__k[r4] = "string" == typeof o4 || "number" == typeof o4 || "bigint" == typeof o4 || o4.constructor == String ? m4(null, o4, null, null, null) : w4(o4) ? m4(k3, { children: o4 }, null, null, null) : null == o4.constructor && o4.__b > 0 ? m4(o4.type, o4.props, o4.key, o4.ref ? o4.ref : null, o4.__v) : o4).__ = n3, o4.__b = n3.__b + 1, e4 = null, -1 != (c4 = o4.__i = L3(o4, u5, f5, a4)) && (a4--, (e4 = u5[c4]) && (e4.__u |= 2)), null == e4 || null == e4.__v ? (-1 == c4 && (i5 > s4 ? h5-- : i5 < s4 && h5++), "function" != typeof o4.type && (o4.__u |= 4)) : c4 != f5 && (c4 == f5 - 1 ? h5-- : c4 == f5 + 1 ? h5++ : (c4 > f5 ? h5-- : h5++, o4.__u |= 4))) : n3.__k[r4] = null;
    if (a4) for (r4 = 0; r4 < s4; r4++) null != (e4 = u5[r4]) && 0 == (2 & e4.__u) && (e4.__e == t4 && (t4 = S3(e4)), D4(e4, e4));
    return t4;
  }
  function A3(n3, l6, u5, t4) {
    var i5, r4;
    if ("function" == typeof n3.type) {
      for (i5 = n3.__k, r4 = 0; i5 && r4 < i5.length; r4++) i5[r4] && (i5[r4].__ = n3, l6 = A3(i5[r4], l6, u5, t4));
      return l6;
    }
    n3.__e != l6 && (t4 && (l6 && n3.type && !l6.parentNode && (l6 = S3(n3)), u5.insertBefore(n3.__e, l6 || null)), l6 = n3.__e);
    do {
      l6 = l6 && l6.nextSibling;
    } while (null != l6 && 8 == l6.nodeType);
    return l6;
  }
  function H3(n3, l6) {
    return l6 = l6 || [], null == n3 || "boolean" == typeof n3 || (w4(n3) ? n3.some(function(n4) {
      H3(n4, l6);
    }) : l6.push(n3)), l6;
  }
  function L3(n3, l6, u5, t4) {
    var i5, r4, o4, e4 = n3.key, f5 = n3.type, c4 = l6[u5], s4 = null != c4 && 0 == (2 & c4.__u);
    if (null === c4 && null == n3.key || s4 && e4 == c4.key && f5 == c4.type) return u5;
    if (t4 > (s4 ? 1 : 0)) {
      for (i5 = u5 - 1, r4 = u5 + 1; i5 >= 0 || r4 < l6.length; ) if (null != (c4 = l6[o4 = i5 >= 0 ? i5-- : r4++]) && 0 == (2 & c4.__u) && e4 == c4.key && f5 == c4.type) return o4;
    }
    return -1;
  }
  function T3(n3, l6, u5) {
    "-" == l6[0] ? n3.setProperty(l6, null == u5 ? "" : u5) : n3[l6] = null == u5 ? "" : "number" != typeof u5 || y4.test(l6) ? u5 : u5 + "px";
  }
  function j4(n3, l6, u5, t4, i5) {
    var r4, o4;
    n: if ("style" == l6) if ("string" == typeof u5) n3.style.cssText = u5;
    else {
      if ("string" == typeof t4 && (n3.style.cssText = t4 = ""), t4) for (l6 in t4) u5 && l6 in u5 || T3(n3.style, l6, "");
      if (u5) for (l6 in u5) t4 && u5[l6] == t4[l6] || T3(n3.style, l6, u5[l6]);
    }
    else if ("o" == l6[0] && "n" == l6[1]) r4 = l6 != (l6 = l6.replace(f4, "$1")), o4 = l6.toLowerCase(), l6 = o4 in n3 || "onFocusOut" == l6 || "onFocusIn" == l6 ? o4.slice(2) : l6.slice(2), n3.l || (n3.l = {}), n3.l[l6 + r4] = u5, u5 ? t4 ? u5.u = t4.u : (u5.u = c3, n3.addEventListener(l6, r4 ? a3 : s3, r4)) : n3.removeEventListener(l6, r4 ? a3 : s3, r4);
    else {
      if ("http://www.w3.org/2000/svg" == i5) l6 = l6.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != l6 && "height" != l6 && "href" != l6 && "list" != l6 && "form" != l6 && "tabIndex" != l6 && "download" != l6 && "rowSpan" != l6 && "colSpan" != l6 && "role" != l6 && "popover" != l6 && l6 in n3) try {
        n3[l6] = null == u5 ? "" : u5;
        break n;
      } catch (n4) {
      }
      "function" == typeof u5 || (null == u5 || false === u5 && "-" != l6[4] ? n3.removeAttribute(l6) : n3.setAttribute(l6, "popover" == l6 && 1 == u5 ? "" : u5));
    }
  }
  function F4(n3) {
    return function(u5) {
      if (this.l) {
        var t4 = this.l[u5.type + n3];
        if (null == u5.t) u5.t = c3++;
        else if (u5.t < t4.u) return;
        return t4(l5.event ? l5.event(u5) : u5);
      }
    };
  }
  function O3(n3, u5, t4, i5, r4, o4, e4, f5, c4, s4) {
    var a4, h5, p4, v5, y5, _5, m5, b4, S4, C5, M4, $4, P5, A4, H4, L4, T4, j5 = u5.type;
    if (null != u5.constructor) return null;
    128 & t4.__u && (c4 = !!(32 & t4.__u), o4 = [f5 = u5.__e = t4.__e]), (a4 = l5.__b) && a4(u5);
    n: if ("function" == typeof j5) try {
      if (b4 = u5.props, S4 = "prototype" in j5 && j5.prototype.render, C5 = (a4 = j5.contextType) && i5[a4.__c], M4 = a4 ? C5 ? C5.props.value : a4.__ : i5, t4.__c ? m5 = (h5 = u5.__c = t4.__c).__ = h5.__E : (S4 ? u5.__c = h5 = new j5(b4, M4) : (u5.__c = h5 = new x3(b4, M4), h5.constructor = j5, h5.render = E3), C5 && C5.sub(h5), h5.props = b4, h5.state || (h5.state = {}), h5.context = M4, h5.__n = i5, p4 = h5.__d = true, h5.__h = [], h5._sb = []), S4 && null == h5.__s && (h5.__s = h5.state), S4 && null != j5.getDerivedStateFromProps && (h5.__s == h5.state && (h5.__s = d4({}, h5.__s)), d4(h5.__s, j5.getDerivedStateFromProps(b4, h5.__s))), v5 = h5.props, y5 = h5.state, h5.__v = u5, p4) S4 && null == j5.getDerivedStateFromProps && null != h5.componentWillMount && h5.componentWillMount(), S4 && null != h5.componentDidMount && h5.__h.push(h5.componentDidMount);
      else {
        if (S4 && null == j5.getDerivedStateFromProps && b4 !== v5 && null != h5.componentWillReceiveProps && h5.componentWillReceiveProps(b4, M4), !h5.__e && null != h5.shouldComponentUpdate && false === h5.shouldComponentUpdate(b4, h5.__s, M4) || u5.__v == t4.__v) {
          for (u5.__v != t4.__v && (h5.props = b4, h5.state = h5.__s, h5.__d = false), u5.__e = t4.__e, u5.__k = t4.__k, u5.__k.some(function(n4) {
            n4 && (n4.__ = u5);
          }), $4 = 0; $4 < h5._sb.length; $4++) h5.__h.push(h5._sb[$4]);
          h5._sb = [], h5.__h.length && e4.push(h5);
          break n;
        }
        null != h5.componentWillUpdate && h5.componentWillUpdate(b4, h5.__s, M4), S4 && null != h5.componentDidUpdate && h5.__h.push(function() {
          h5.componentDidUpdate(v5, y5, _5);
        });
      }
      if (h5.context = M4, h5.props = b4, h5.__P = n3, h5.__e = false, P5 = l5.__r, A4 = 0, S4) {
        for (h5.state = h5.__s, h5.__d = false, P5 && P5(u5), a4 = h5.render(h5.props, h5.state, h5.context), H4 = 0; H4 < h5._sb.length; H4++) h5.__h.push(h5._sb[H4]);
        h5._sb = [];
      } else do {
        h5.__d = false, P5 && P5(u5), a4 = h5.render(h5.props, h5.state, h5.context), h5.state = h5.__s;
      } while (h5.__d && ++A4 < 25);
      h5.state = h5.__s, null != h5.getChildContext && (i5 = d4(d4({}, i5), h5.getChildContext())), S4 && !p4 && null != h5.getSnapshotBeforeUpdate && (_5 = h5.getSnapshotBeforeUpdate(v5, y5)), L4 = a4, null != a4 && a4.type === k3 && null == a4.key && (L4 = V3(a4.props.children)), f5 = I3(n3, w4(L4) ? L4 : [L4], u5, t4, i5, r4, o4, e4, f5, c4, s4), h5.base = u5.__e, u5.__u &= -161, h5.__h.length && e4.push(h5), m5 && (h5.__E = h5.__ = null);
    } catch (n4) {
      if (u5.__v = null, c4 || null != o4) if (n4.then) {
        for (u5.__u |= c4 ? 160 : 128; f5 && 8 == f5.nodeType && f5.nextSibling; ) f5 = f5.nextSibling;
        o4[o4.indexOf(f5)] = null, u5.__e = f5;
      } else {
        for (T4 = o4.length; T4--; ) g3(o4[T4]);
        z4(u5);
      }
      else u5.__e = t4.__e, u5.__k = t4.__k, n4.then || z4(u5);
      l5.__e(n4, u5, t4);
    }
    else null == o4 && u5.__v == t4.__v ? (u5.__k = t4.__k, u5.__e = t4.__e) : f5 = u5.__e = q4(t4.__e, u5, t4, i5, r4, o4, e4, c4, s4);
    return (a4 = l5.diffed) && a4(u5), 128 & u5.__u ? void 0 : f5;
  }
  function z4(n3) {
    n3 && n3.__c && (n3.__c.__e = true), n3 && n3.__k && n3.__k.forEach(z4);
  }
  function N3(n3, u5, t4) {
    for (var i5 = 0; i5 < t4.length; i5++) B4(t4[i5], t4[++i5], t4[++i5]);
    l5.__c && l5.__c(u5, n3), n3.some(function(u6) {
      try {
        n3 = u6.__h, u6.__h = [], n3.some(function(n4) {
          n4.call(u6);
        });
      } catch (n4) {
        l5.__e(n4, u6.__v);
      }
    });
  }
  function V3(n3) {
    return "object" != typeof n3 || null == n3 || n3.__b && n3.__b > 0 ? n3 : w4(n3) ? n3.map(V3) : d4({}, n3);
  }
  function q4(u5, t4, i5, r4, o4, e4, f5, c4, s4) {
    var a4, h5, v5, y5, d5, _5, m5, b4 = i5.props, k4 = t4.props, x4 = t4.type;
    if ("svg" == x4 ? o4 = "http://www.w3.org/2000/svg" : "math" == x4 ? o4 = "http://www.w3.org/1998/Math/MathML" : o4 || (o4 = "http://www.w3.org/1999/xhtml"), null != e4) {
      for (a4 = 0; a4 < e4.length; a4++) if ((d5 = e4[a4]) && "setAttribute" in d5 == !!x4 && (x4 ? d5.localName == x4 : 3 == d5.nodeType)) {
        u5 = d5, e4[a4] = null;
        break;
      }
    }
    if (null == u5) {
      if (null == x4) return document.createTextNode(k4);
      u5 = document.createElementNS(o4, x4, k4.is && k4), c4 && (l5.__m && l5.__m(t4, e4), c4 = false), e4 = null;
    }
    if (null == x4) b4 === k4 || c4 && u5.data == k4 || (u5.data = k4);
    else {
      if (e4 = e4 && n2.call(u5.childNodes), b4 = i5.props || p3, !c4 && null != e4) for (b4 = {}, a4 = 0; a4 < u5.attributes.length; a4++) b4[(d5 = u5.attributes[a4]).name] = d5.value;
      for (a4 in b4) if (d5 = b4[a4], "children" == a4) ;
      else if ("dangerouslySetInnerHTML" == a4) v5 = d5;
      else if (!(a4 in k4)) {
        if ("value" == a4 && "defaultValue" in k4 || "checked" == a4 && "defaultChecked" in k4) continue;
        j4(u5, a4, null, d5, o4);
      }
      for (a4 in k4) d5 = k4[a4], "children" == a4 ? y5 = d5 : "dangerouslySetInnerHTML" == a4 ? h5 = d5 : "value" == a4 ? _5 = d5 : "checked" == a4 ? m5 = d5 : c4 && "function" != typeof d5 || b4[a4] === d5 || j4(u5, a4, d5, b4[a4], o4);
      if (h5) c4 || v5 && (h5.__html == v5.__html || h5.__html == u5.innerHTML) || (u5.innerHTML = h5.__html), t4.__k = [];
      else if (v5 && (u5.innerHTML = ""), I3("template" == t4.type ? u5.content : u5, w4(y5) ? y5 : [y5], t4, i5, r4, "foreignObject" == x4 ? "http://www.w3.org/1999/xhtml" : o4, e4, f5, e4 ? e4[0] : i5.__k && S3(i5, 0), c4, s4), null != e4) for (a4 = e4.length; a4--; ) g3(e4[a4]);
      c4 || (a4 = "value", "progress" == x4 && null == _5 ? u5.removeAttribute("value") : null != _5 && (_5 !== u5[a4] || "progress" == x4 && !_5 || "option" == x4 && _5 != b4[a4]) && j4(u5, a4, _5, b4[a4], o4), a4 = "checked", null != m5 && m5 != u5[a4] && j4(u5, a4, m5, b4[a4], o4));
    }
    return u5;
  }
  function B4(n3, u5, t4) {
    try {
      if ("function" == typeof n3) {
        var i5 = "function" == typeof n3.__u;
        i5 && n3.__u(), i5 && null == u5 || (n3.__u = n3(u5));
      } else n3.current = u5;
    } catch (n4) {
      l5.__e(n4, t4);
    }
  }
  function D4(n3, u5, t4) {
    var i5, r4;
    if (l5.unmount && l5.unmount(n3), (i5 = n3.ref) && (i5.current && i5.current != n3.__e || B4(i5, null, u5)), null != (i5 = n3.__c)) {
      if (i5.componentWillUnmount) try {
        i5.componentWillUnmount();
      } catch (n4) {
        l5.__e(n4, u5);
      }
      i5.base = i5.__P = null;
    }
    if (i5 = n3.__k) for (r4 = 0; r4 < i5.length; r4++) i5[r4] && D4(i5[r4], u5, t4 || "function" != typeof n3.type);
    t4 || g3(n3.__e), n3.__c = n3.__ = n3.__e = void 0;
  }
  function E3(n3, l6, u5) {
    return this.constructor(n3, u5);
  }
  n2 = v4.slice, l5 = { __e: function(n3, l6, u5, t4) {
    for (var i5, r4, o4; l6 = l6.__; ) if ((i5 = l6.__c) && !i5.__) try {
      if ((r4 = i5.constructor) && null != r4.getDerivedStateFromError && (i5.setState(r4.getDerivedStateFromError(n3)), o4 = i5.__d), null != i5.componentDidCatch && (i5.componentDidCatch(n3, t4 || {}), o4 = i5.__d), o4) return i5.__E = i5;
    } catch (l7) {
      n3 = l7;
    }
    throw n3;
  } }, u4 = 0, t3 = function(n3) {
    return null != n3 && null == n3.constructor;
  }, x3.prototype.setState = function(n3, l6) {
    var u5;
    u5 = null != this.__s && this.__s != this.state ? this.__s : this.__s = d4({}, this.state), "function" == typeof n3 && (n3 = n3(d4({}, u5), this.props)), n3 && d4(u5, n3), null != n3 && this.__v && (l6 && this._sb.push(l6), M3(this));
  }, x3.prototype.forceUpdate = function(n3) {
    this.__v && (this.__e = true, n3 && this.__h.push(n3), M3(this));
  }, x3.prototype.render = k3, i4 = [], o3 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e3 = function(n3, l6) {
    return n3.__v.__b - l6.__v.__b;
  }, $3.__r = 0, f4 = /(PointerCapture)$|Capture$/i, c3 = 0, s3 = F4(false), a3 = F4(true), h4 = 0;

  // node_modules/lucide-preact/dist/esm/shared/src/utils.js
  var toKebabCase2 = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  var toCamelCase = (string) => string.replace(
    /^([A-Z])|[\s-_]+(\w)/g,
    (match, p1, p22) => p22 ? p22.toUpperCase() : p1.toLowerCase()
  );
  var toPascalCase = (string) => {
    const camelCase = toCamelCase(string);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
  };
  var mergeClasses2 = (...classes) => classes.filter((className, index3, array) => {
    return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index3;
  }).join(" ").trim();

  // node_modules/lucide-preact/dist/esm/defaultAttributes.js
  var defaultAttributes2 = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  };

  // node_modules/lucide-preact/dist/esm/Icon.js
  var Icon2 = ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    children,
    iconNode,
    class: classes = "",
    ...rest
  }) => _4(
    "svg",
    {
      ...defaultAttributes2,
      width: String(size),
      height: size,
      stroke: color,
      ["stroke-width"]: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      class: ["lucide", classes].join(" "),
      ...rest
    },
    [...iconNode.map(([tag, attrs]) => _4(tag, attrs)), ...H3(children)]
  );

  // node_modules/lucide-preact/dist/esm/createLucideIcon.js
  var createLucideIcon2 = (iconName, iconNode) => {
    const Component = ({ class: classes = "", children, ...props }) => _4(
      Icon2,
      {
        ...props,
        iconNode,
        class: mergeClasses2(
          `lucide-${toKebabCase2(toPascalCase(iconName))}`,
          `lucide-${toKebabCase2(iconName)}`,
          classes
        )
      },
      children
    );
    Component.displayName = toPascalCase(iconName);
    return Component;
  };

  // node_modules/lucide-preact/dist/esm/icons/check.js
  var Check = createLucideIcon2("check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);

  // node_modules/lucide-preact/dist/esm/icons/chevron-down.js
  var ChevronDown2 = createLucideIcon2("chevron-down", [
    ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
  ]);

  // node_modules/lucide-preact/dist/esm/icons/chevron-right.js
  var ChevronRight = createLucideIcon2("chevron-right", [
    ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
  ]);

  // node_modules/lucide-preact/dist/esm/icons/copy.js
  var Copy = createLucideIcon2("copy", [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ]);

  // node_modules/lucide-preact/dist/esm/icons/file-diff.js
  var FileDiff = createLucideIcon2("file-diff", [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
    ["path", { d: "M9 10h6", key: "9gxzsh" }],
    ["path", { d: "M12 13V7", key: "h0r20n" }],
    ["path", { d: "M9 17h6", key: "r8uit2" }]
  ]);

  // node_modules/lucide-preact/dist/esm/icons/file-minus-2.js
  var FileMinus2 = createLucideIcon2("file-minus-2", [
    ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4", key: "1pf5j1" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
    ["path", { d: "M3 15h6", key: "4e2qda" }]
  ]);

  // node_modules/lucide-preact/dist/esm/icons/file-plus-2.js
  var FilePlus2 = createLucideIcon2("file-plus-2", [
    ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4", key: "1pf5j1" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
    ["path", { d: "M3 15h6", key: "4e2qda" }],
    ["path", { d: "M6 12v6", key: "1u72j0" }]
  ]);

  // node_modules/lucide-preact/dist/esm/icons/file-symlink.js
  var FileSymlink = createLucideIcon2("file-symlink", [
    ["path", { d: "m10 18 3-3-3-3", key: "18f6ys" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
    [
      "path",
      {
        d: "M4 11V4a2 2 0 0 1 2-2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7",
        key: "50q2rw"
      }
    ]
  ]);

  // node_modules/lucide-preact/dist/esm/icons/send.js
  var Send = createLucideIcon2("send", [
    [
      "path",
      {
        d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
        key: "1ffxy3"
      }
    ],
    ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
  ]);

  // node_modules/lucide-preact/dist/esm/icons/x.js
  var X2 = createLucideIcon2("x", [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]);

  // node_modules/@babel/runtime/helpers/esm/extends.js
  function _extends() {
    return _extends = Object.assign ? Object.assign.bind() : function(n3) {
      for (var e4 = 1; e4 < arguments.length; e4++) {
        var t4 = arguments[e4];
        for (var r4 in t4) ({}).hasOwnProperty.call(t4, r4) && (n3[r4] = t4[r4]);
      }
      return n3;
    }, _extends.apply(null, arguments);
  }

  // node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
  function _objectWithoutPropertiesLoose(r4, e4) {
    if (null == r4) return {};
    var t4 = {};
    for (var n3 in r4) if ({}.hasOwnProperty.call(r4, n3)) {
      if (-1 !== e4.indexOf(n3)) continue;
      t4[n3] = r4[n3];
    }
    return t4;
  }

  // node_modules/react-textarea-autosize/dist/react-textarea-autosize.browser.esm.js
  var React8 = __toESM(require_compat());

  // node_modules/use-latest/dist/use-latest.esm.js
  var import_react4 = __toESM(require_compat());

  // node_modules/use-isomorphic-layout-effect/dist/use-isomorphic-layout-effect.browser.esm.js
  var import_react3 = __toESM(require_compat());
  var index = import_react3.useLayoutEffect;

  // node_modules/use-latest/dist/use-latest.esm.js
  var useLatest = function useLatest2(value) {
    var ref = import_react4.default.useRef(value);
    index(function() {
      ref.current = value;
    });
    return ref;
  };

  // node_modules/use-composed-ref/dist/use-composed-ref.esm.js
  var import_react5 = __toESM(require_compat());
  var updateRef = function updateRef2(ref, value) {
    if (typeof ref === "function") {
      ref(value);
      return;
    }
    ref.current = value;
  };
  var useComposedRef = function useComposedRef2(libRef, userRef) {
    var prevUserRef = import_react5.default.useRef();
    return import_react5.default.useCallback(function(instance) {
      libRef.current = instance;
      if (prevUserRef.current) {
        updateRef(prevUserRef.current, null);
      }
      prevUserRef.current = userRef;
      if (!userRef) {
        return;
      }
      updateRef(userRef, instance);
    }, [userRef]);
  };

  // node_modules/react-textarea-autosize/dist/react-textarea-autosize.browser.esm.js
  var HIDDEN_TEXTAREA_STYLE = {
    "min-height": "0",
    "max-height": "none",
    height: "0",
    visibility: "hidden",
    overflow: "hidden",
    position: "absolute",
    "z-index": "-1000",
    top: "0",
    right: "0",
    display: "block"
  };
  var forceHiddenStyles = function forceHiddenStyles2(node) {
    Object.keys(HIDDEN_TEXTAREA_STYLE).forEach(function(key) {
      node.style.setProperty(key, HIDDEN_TEXTAREA_STYLE[key], "important");
    });
  };
  var forceHiddenStyles$1 = forceHiddenStyles;
  var hiddenTextarea = null;
  var getHeight = function getHeight2(node, sizingData) {
    var height = node.scrollHeight;
    if (sizingData.sizingStyle.boxSizing === "border-box") {
      return height + sizingData.borderSize;
    }
    return height - sizingData.paddingSize;
  };
  function calculateNodeHeight(sizingData, value, minRows, maxRows) {
    if (minRows === void 0) {
      minRows = 1;
    }
    if (maxRows === void 0) {
      maxRows = Infinity;
    }
    if (!hiddenTextarea) {
      hiddenTextarea = document.createElement("textarea");
      hiddenTextarea.setAttribute("tabindex", "-1");
      hiddenTextarea.setAttribute("aria-hidden", "true");
      forceHiddenStyles$1(hiddenTextarea);
    }
    if (hiddenTextarea.parentNode === null) {
      document.body.appendChild(hiddenTextarea);
    }
    var paddingSize = sizingData.paddingSize, borderSize = sizingData.borderSize, sizingStyle = sizingData.sizingStyle;
    var boxSizing = sizingStyle.boxSizing;
    Object.keys(sizingStyle).forEach(function(_key) {
      var key = _key;
      hiddenTextarea.style[key] = sizingStyle[key];
    });
    forceHiddenStyles$1(hiddenTextarea);
    hiddenTextarea.value = value;
    var height = getHeight(hiddenTextarea, sizingData);
    hiddenTextarea.value = value;
    height = getHeight(hiddenTextarea, sizingData);
    hiddenTextarea.value = "x";
    var rowHeight = hiddenTextarea.scrollHeight - paddingSize;
    var minHeight = rowHeight * minRows;
    if (boxSizing === "border-box") {
      minHeight = minHeight + paddingSize + borderSize;
    }
    height = Math.max(minHeight, height);
    var maxHeight = rowHeight * maxRows;
    if (boxSizing === "border-box") {
      maxHeight = maxHeight + paddingSize + borderSize;
    }
    height = Math.min(maxHeight, height);
    return [height, rowHeight];
  }
  var noop2 = function noop3() {
  };
  var pick = function pick2(props, obj) {
    return props.reduce(function(acc, prop) {
      acc[prop] = obj[prop];
      return acc;
    }, {});
  };
  var SIZING_STYLE = [
    "borderBottomWidth",
    "borderLeftWidth",
    "borderRightWidth",
    "borderTopWidth",
    "boxSizing",
    "fontFamily",
    "fontSize",
    "fontStyle",
    "fontWeight",
    "letterSpacing",
    "lineHeight",
    "paddingBottom",
    "paddingLeft",
    "paddingRight",
    "paddingTop",
    // non-standard
    "tabSize",
    "textIndent",
    // non-standard
    "textRendering",
    "textTransform",
    "width",
    "wordBreak",
    "wordSpacing",
    "scrollbarGutter"
  ];
  var isIE = !!document.documentElement.currentStyle;
  var getSizingData = function getSizingData2(node) {
    var style = window.getComputedStyle(node);
    if (style === null) {
      return null;
    }
    var sizingStyle = pick(SIZING_STYLE, style);
    var boxSizing = sizingStyle.boxSizing;
    if (boxSizing === "") {
      return null;
    }
    if (isIE && boxSizing === "border-box") {
      sizingStyle.width = parseFloat(sizingStyle.width) + parseFloat(sizingStyle.borderRightWidth) + parseFloat(sizingStyle.borderLeftWidth) + parseFloat(sizingStyle.paddingRight) + parseFloat(sizingStyle.paddingLeft) + "px";
    }
    var paddingSize = parseFloat(sizingStyle.paddingBottom) + parseFloat(sizingStyle.paddingTop);
    var borderSize = parseFloat(sizingStyle.borderBottomWidth) + parseFloat(sizingStyle.borderTopWidth);
    return {
      sizingStyle,
      paddingSize,
      borderSize
    };
  };
  var getSizingData$1 = getSizingData;
  function useListener(target, type, listener) {
    var latestListener = useLatest(listener);
    React8.useLayoutEffect(function() {
      var handler = function handler2(ev) {
        return latestListener.current(ev);
      };
      if (!target) {
        return;
      }
      target.addEventListener(type, handler);
      return function() {
        return target.removeEventListener(type, handler);
      };
    }, []);
  }
  var useFormResetListener = function useFormResetListener2(libRef, listener) {
    useListener(document.body, "reset", function(ev) {
      if (libRef.current.form === ev.target) {
        listener(ev);
      }
    });
  };
  var useWindowResizeListener = function useWindowResizeListener2(listener) {
    useListener(window, "resize", listener);
  };
  var useFontsLoadedListener = function useFontsLoadedListener2(listener) {
    useListener(document.fonts, "loadingdone", listener);
  };
  var _excluded = ["cacheMeasurements", "maxRows", "minRows", "onChange", "onHeightChange"];
  var TextareaAutosize = function TextareaAutosize2(_ref, userRef) {
    var cacheMeasurements = _ref.cacheMeasurements, maxRows = _ref.maxRows, minRows = _ref.minRows, _ref$onChange = _ref.onChange, onChange = _ref$onChange === void 0 ? noop2 : _ref$onChange, _ref$onHeightChange = _ref.onHeightChange, onHeightChange = _ref$onHeightChange === void 0 ? noop2 : _ref$onHeightChange, props = _objectWithoutPropertiesLoose(_ref, _excluded);
    var isControlled = props.value !== void 0;
    var libRef = React8.useRef(null);
    var ref = useComposedRef(libRef, userRef);
    var heightRef = React8.useRef(0);
    var measurementsCacheRef = React8.useRef();
    var resizeTextarea = function resizeTextarea2() {
      var node = libRef.current;
      var nodeSizingData = cacheMeasurements && measurementsCacheRef.current ? measurementsCacheRef.current : getSizingData$1(node);
      if (!nodeSizingData) {
        return;
      }
      measurementsCacheRef.current = nodeSizingData;
      var _calculateNodeHeight = calculateNodeHeight(nodeSizingData, node.value || node.placeholder || "x", minRows, maxRows), height = _calculateNodeHeight[0], rowHeight = _calculateNodeHeight[1];
      if (heightRef.current !== height) {
        heightRef.current = height;
        node.style.setProperty("height", height + "px", "important");
        onHeightChange(height, {
          rowHeight
        });
      }
    };
    var handleChange = function handleChange2(event) {
      if (!isControlled) {
        resizeTextarea();
      }
      onChange(event);
    };
    {
      React8.useLayoutEffect(resizeTextarea);
      useFormResetListener(libRef, function() {
        if (!isControlled) {
          var currentValue = libRef.current.value;
          requestAnimationFrame(function() {
            var node = libRef.current;
            if (node && currentValue !== node.value) {
              resizeTextarea();
            }
          });
        }
      });
      useWindowResizeListener(resizeTextarea);
      useFontsLoadedListener(resizeTextarea);
      return /* @__PURE__ */ React8.createElement("textarea", _extends({}, props, {
        onChange: handleChange,
        ref
      }));
    }
  };
  var index2 = /* @__PURE__ */ React8.forwardRef(TextareaAutosize);

  // apps/larry-vscode-ext/webview/src/views/components/states/SpecReview.tsx
  init_hooks_module();

  // apps/larry-vscode-ext/webview/src/hooks/useContentFromLocalFile.ts
  init_hooks_module();
  function useContentFromLocalFile(filePath) {
    const [content, setContent] = d2(null);
    y2(() => {
      const cleanup = onMessage((msg) => {
        if (msg.type === "fileContent" && msg.filePath === filePath) {
          setContent(msg.content);
        }
      });
      postMessage({
        type: "readFile",
        filePath
      });
      return cleanup;
    }, [filePath]);
    return { content };
  }

  // apps/larry-vscode-ext/webview/src/views/components/states/SpecReview.tsx
  function SpecReview({ data, id, onAction, machineStatus }) {
    const file = data.file;
    const isPrev = id.includes("|prev-");
    const { content } = useContentFromLocalFile(file);
    const openFile = () => {
      postMessage({
        type: "openFile",
        file
      });
    };
    const approveSpec = () => {
      onAction("approveSpec");
    };
    const rejectSpec = () => {
      onAction("rejectSpec");
    };
    y2(() => {
      if (machineStatus === "running") {
        return;
      }
      openFile();
    }, []);
    const message = `I\u2019ve generated a **design specification**.
You can **review it directly in the generated file**, modify and save it.

> Keep in mind: I will use **this same file** to generate the **next state**.

---
${content}
`;
    return /* @__PURE__ */ u3("div", { className: "design-spec-review", children: content && /* @__PURE__ */ u3(GeneralMessageBubble, { content: message, topActions: /* @__PURE__ */ u3("div", { className: "text-button", onClick: openFile, children: [
      "Open file ",
      /* @__PURE__ */ u3(FileSymlink, { className: "file-icon" })
    ] }), bottomActions: /* @__PURE__ */ u3("div", { style: { display: "flex", justifyContent: "space-between", width: "100%" }, children: [
      machineStatus === "awaiting_human" && /* @__PURE__ */ u3("div", { style: { display: "flex", gap: "8px" }, children: [
        /* @__PURE__ */ u3("button", { className: "btn btn-primary", onClick: approveSpec, children: "Approve" }),
        /* @__PURE__ */ u3("button", { className: "btn", onClick: rejectSpec, children: "Reject" })
      ] }),
      /* @__PURE__ */ u3("div", { className: "text-button", onClick: openFile, children: [
        "Open file ",
        /* @__PURE__ */ u3(FileSymlink, { className: "file-icon" })
      ] })
    ] }) }) });
  }

  // apps/larry-vscode-ext/webview/src/hooks/useNextState.ts
  function useNextMachineState(baseUrl) {
    return {
      fetch: async ({ machineId, contextUpdate }) => {
        queryClient.setQueryData(
          ["machine", { baseUrl, machineId }],
          (prev) => {
            return {
              ...prev,
              status: "running"
            };
          }
        );
        return fetch(`${baseUrl}/machines/${machineId}/next`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Idempotency-Key": Math.random().toString(36).substring(2, 15)
          },
          body: JSON.stringify({
            contextUpdate
          })
        });
      }
    };
  }

  // apps/larry-vscode-ext/webview/src/views/components/states/ArchitectureReview/ArchitectureReview.tsx
  init_hooks_module();

  // apps/larry-vscode-ext/webview/src/views/components/states/ArchitectureReview/useParseCodeEdits.ts
  init_hooks_module();
  function parseCodeEdits(input) {
    const fileRegex = /^File:\s+(.+?)\s+\((ADDED|MODIFIED|DELETED)\)$/gm;
    const blocks = [];
    let match;
    while ((match = fileRegex.exec(input)) !== null) {
      const filePath = match[1].trim();
      const typeWord = match[2];
      const type = typeWord === "ADDED" ? "CREATE" : typeWord === "MODIFIED" ? "MODIFY" : "DELETE";
      const startIdx = match.index + match[0].length;
      const nextMatch = fileRegex.exec(input);
      const endIdx = nextMatch ? nextMatch.index : input.length;
      fileRegex.lastIndex = nextMatch ? nextMatch.index : input.length;
      const blockContent = input.slice(startIdx, endIdx).trim();
      const codeBlockMatch = blockContent.match(/```[\s\S]*?```/);
      const proposedChange = codeBlockMatch ? codeBlockMatch[0] : "";
      blocks.push({ filePath, type, proposedChange });
    }
    return blocks;
  }
  function useParseCodeEdits(content) {
    if (!content) {
      return [];
    }
    return T2(() => parseCodeEdits(content), [content]);
  }

  // apps/larry-vscode-ext/webview/src/views/components/states/ArchitectureReview/ArchitectureReview.tsx
  function ArchitectureReview({ data, id, onAction, machineStatus }) {
    const file = data.file;
    const { content } = useContentFromLocalFile(file);
    const codeEdits = useParseCodeEdits(content);
    const [copiedStates, setCopiedStates] = d2({});
    const [fileApprovals, setFileApprovals] = d2({});
    const [rejectionStates, setRejectionStates] = d2({});
    const codeBlockRefs = A2({});
    const handleIndividualApprove = (filePath) => {
      setFileApprovals((prev) => ({
        ...prev,
        [filePath]: { filePath, approved: true }
      }));
      setRejectionStates((prev) => {
        delete prev[filePath];
        return prev;
      });
    };
    const handleRejectClick = (filePath) => {
      setFileApprovals((prev) => ({
        ...prev,
        [filePath]: { filePath, approved: false }
      }));
      setRejectionStates((prev) => ({
        ...prev,
        [filePath]: { showInput: true, feedback: "", isSubmitted: false }
      }));
    };
    const handleFeedbackChange = (filePath, feedback) => {
      setRejectionStates((prev) => ({
        ...prev,
        [filePath]: { ...prev[filePath], feedback, isSubmitted: false }
      }));
    };
    const handleRejectSubmit = (filePath) => {
      setFileApprovals((prev) => {
        delete prev[filePath];
        return prev;
      });
      setRejectionStates((prev) => ({
        ...prev,
        [filePath]: { ...prev[filePath], isSubmitted: true }
      }));
    };
    const handleContinueClick = () => {
      const rejections = Object.keys(rejectionStates);
      if (rejections.length > 0) {
        const rejectionPayload = rejections.reduce((acc, rejectionKey) => {
          const rejection = rejectionStates[rejectionKey];
          return `${acc}
Rejected ${rejectionKey} with feedback: ${rejection.feedback}`;
        }, "");
        console.log(rejectionPayload);
        return;
        onAction("rejectArchitecture", rejectionPayload);
      }
      onAction("approveArchitecture");
    };
    const handleCopyClick = async (filePath, code) => {
      try {
        const codeBlockElement = codeBlockRefs.current[filePath];
        if (codeBlockElement) {
          const range = document.createRange();
          range.selectNodeContents(codeBlockElement);
          const selection = window.getSelection();
          if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
          }
        }
        await navigator.clipboard.writeText(code);
        setCopiedStates((prev) => ({ ...prev, [filePath]: true }));
        setTimeout(() => {
          setCopiedStates((prev) => ({ ...prev, [filePath]: false }));
        }, 5e3);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    };
    const lucideIconsMap = {
      CREATE: /* @__PURE__ */ u3(FilePlus2, { className: "create-icon" }),
      MODIFY: /* @__PURE__ */ u3(FileDiff, { className: "modify-icon" }),
      DELETE: /* @__PURE__ */ u3(FileMinus2, { className: "delete-icon" })
    };
    return /* @__PURE__ */ u3("div", { className: "ArchitectureReview", children: [
      /* @__PURE__ */ u3(GeneralMessageBubble, { content: "Please **review the changes** file by file and approve \u2705 or reject \u274C. Then press the **Continue** button to proceed." }),
      codeEdits.map((codeEdit) => {
        const approval = fileApprovals[codeEdit.filePath];
        const isApproved = approval?.approved === true;
        const isRejected = approval?.approved === false;
        const rejectionState = rejectionStates[codeEdit.filePath] || { showInput: false, feedback: "", isSubmitted: false };
        return /* @__PURE__ */ u3("div", { children: [
          /* @__PURE__ */ u3(
            GeneralMessageBubble,
            {
              topActions: /* @__PURE__ */ u3("div", { className: "codeBlockHeader", children: [
                lucideIconsMap[codeEdit.type],
                /* @__PURE__ */ u3("div", { children: codeEdit.filePath })
              ] }),
              bottomActions: /* @__PURE__ */ u3("div", { className: "codeBlockFooter", children: [
                /* @__PURE__ */ u3("div", { className: "actionButtons", children: [
                  /* @__PURE__ */ u3(
                    "div",
                    {
                      className: `d-flex text-button ${isApproved ? "selected" : ""}`,
                      onClick: () => handleIndividualApprove(codeEdit.filePath),
                      style: { cursor: "pointer" },
                      children: [
                        /* @__PURE__ */ u3(Check, { className: "check-icon" }),
                        "Approve"
                      ]
                    }
                  ),
                  /* @__PURE__ */ u3(
                    "div",
                    {
                      className: `d-flex text-button ${isRejected && rejectionState.showInput ? "selected" : ""}`,
                      onClick: () => handleRejectClick(codeEdit.filePath),
                      style: { cursor: "pointer" },
                      children: [
                        /* @__PURE__ */ u3(X2, { className: "reject-icon" }),
                        "Reject"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ u3("div", { className: "text-button", children: [
                  copiedStates[codeEdit.filePath] && /* @__PURE__ */ u3("span", { className: "copied-indicator", style: { marginLeft: "8px", fontSize: "12px", color: "#28a745" }, children: "Copied" }),
                  /* @__PURE__ */ u3(
                    Copy,
                    {
                      className: "copy-icon",
                      onClick: () => handleCopyClick(codeEdit.filePath, codeEdit.proposedChange),
                      style: { cursor: "pointer" }
                    }
                  )
                ] })
              ] }),
              content: codeEdit.proposedChange,
              contentRef: (el) => {
                codeBlockRefs.current[codeEdit.filePath] = el;
              }
            }
          ),
          rejectionState.showInput && /* @__PURE__ */ u3("div", { style: { display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }, children: [
            /* @__PURE__ */ u3(
              "textarea",
              {
                className: "form-control",
                placeholder: "Provide feedback",
                value: rejectionState.feedback,
                onChange: (e4) => handleFeedbackChange(codeEdit.filePath, e4.target.value),
                style: { padding: "4px 8px", fontSize: "14px" }
              }
            ),
            /* @__PURE__ */ u3(
              "button",
              {
                className: rejectionState.feedback && !rejectionState.isSubmitted ? "btn btn-primary" : "btn",
                disabled: !rejectionState.feedback || rejectionState.isSubmitted,
                onClick: () => handleRejectSubmit(codeEdit.filePath),
                children: rejectionState.isSubmitted ? "Rejected" : "Reject"
              }
            )
          ] })
        ] }, codeEdit.filePath);
      }),
      machineStatus === "awaiting_human" && /* @__PURE__ */ u3("hr", {}),
      machineStatus !== "awaiting_human" && /* @__PURE__ */ u3("div", { style: { marginTop: "16px", display: "flex", flexDirection: "column", alignItems: "flex-start" }, children: [
        /* @__PURE__ */ u3("button", { className: "btn btn-primary", onClick: handleContinueClick, children: "Continue" }),
        Object.keys(rejectionStates).length === 0 && /* @__PURE__ */ u3("small", { style: { marginTop: "8px", fontSize: "10px" }, children: "Approve all and continue." })
      ] })
    ] });
  }

  // apps/larry-vscode-ext/webview/src/views/components/states/CodeReview.tsx
  function CodeReview({ data, onAction, machineStatus }) {
    const file = data.file;
    const openFile = () => {
      postMessage({
        type: "openFile",
        file
      });
    };
    const approveSpec = () => {
      onAction("approveCodeReview");
    };
    const rejectSpec = () => {
      onAction("rejectCodeReview");
    };
    const message = `Review ts-morph code edits.`;
    return /* @__PURE__ */ u3("div", { className: "code-review", children: /* @__PURE__ */ u3(GeneralMessageBubble, { content: message, topActions: /* @__PURE__ */ u3("div", { className: "text-button", onClick: openFile, children: [
      "Open file ",
      /* @__PURE__ */ u3(FileSymlink, { className: "file-icon" })
    ] }), bottomActions: /* @__PURE__ */ u3("div", { style: { display: "flex", justifyContent: "space-between", width: "100%" }, children: [
      machineStatus === "awaiting_human" && /* @__PURE__ */ u3("div", { style: { display: "flex", gap: "8px" }, children: [
        /* @__PURE__ */ u3("button", { className: "btn btn-primary", onClick: approveSpec, children: "Approve" }),
        /* @__PURE__ */ u3("button", { className: "btn", onClick: rejectSpec, children: "Reject" })
      ] }),
      /* @__PURE__ */ u3("div", { className: "text-button", onClick: openFile, children: [
        "Open file ",
        /* @__PURE__ */ u3(FileSymlink, { className: "file-icon" })
      ] })
    ] }) }) });
  }

  // apps/larry-vscode-ext/webview/src/views/components/states/generateEditMachine.tsx
  function GenerateEditMachine({ data, onAction, machineStatus }) {
    const file = data.file;
    const openFile = () => {
      postMessage({
        type: "openFile",
        file
      });
    };
    const message = `Created code edits file: ${file}`;
    return /* @__PURE__ */ u3("div", { className: "code-review", children: /* @__PURE__ */ u3(GeneralMessageBubble, { content: message, topActions: /* @__PURE__ */ u3("div", { className: "text-button", onClick: openFile, children: [
      "Open file ",
      /* @__PURE__ */ u3(FileSymlink, { className: "file-icon" })
    ] }), bottomActions: /* @__PURE__ */ u3("div", { style: { display: "flex", justifyContent: "flex-end", width: "100%" }, children: /* @__PURE__ */ u3("div", { className: "text-button", onClick: openFile, children: [
      "Open file ",
      /* @__PURE__ */ u3(FileSymlink, { className: "file-icon" })
    ] }) }) }) });
  }

  // apps/larry-vscode-ext/webview/src/views/components/StateVisualization.tsx
  var SearchDocumentation = () => /* @__PURE__ */ u3("div", {});
  var stateComponentMap = {
    specReview: SpecReview,
    confirmUserIntent: ConfirmUserIntent,
    architectImplementation: ConfirmUserIntent,
    architectureReview: ArchitectureReview,
    searchDocumentation: SearchDocumentation,
    generateEditMachine: GenerateEditMachine,
    applyEdits: /* @__PURE__ */ u3("div", { children: "Applying approved code changes..." }),
    codeReview: CodeReview
  };
  function StateVisualization({ data, onSubmit }) {
    const { apiUrl } = useExtensionStore();
    const [optimisticState, setOptimisticState] = d2();
    const { fetch: fetchGetNextState } = useNextMachineState(apiUrl);
    const [specReviewRejected, setSpecReviewRejected] = d2(false);
    const [architectureReviewRejected, setArchitectureReviewRejected] = d2(false);
    const [architectureReviewPayload, setArchitectureReviewPayload] = d2(null);
    const [input, setInput] = d2({ placeholder: "Tell me more...", value: "" });
    const showInput = T2(() => {
      if (data?.currentState?.startsWith("confirmUserIntent") && data.status === "awaiting_human") {
        return true;
      }
      if (data?.currentState?.startsWith("specReview") && specReviewRejected) {
        return true;
      }
      if (data?.currentState?.startsWith("architectureReview") && architectureReviewRejected) {
        return true;
      }
    }, [data, specReviewRejected]);
    const getDeduplicatedStack = () => {
      if (!data.context?.stack) return [];
      const processedStack = [];
      const stateOccurrences = /* @__PURE__ */ new Map();
      for (const stateKey of data.context.stack) {
        const count = stateOccurrences.get(stateKey) || 0;
        stateOccurrences.set(stateKey, count + 1);
      }
      const seenStates = /* @__PURE__ */ new Map();
      for (const stateKey of data.context.stack) {
        const seenCount = seenStates.get(stateKey) || 0;
        const totalOccurrences = stateOccurrences.get(stateKey) || 0;
        seenStates.set(stateKey, seenCount + 1);
        const isLastOccurrence = seenCount + 1 === totalOccurrences;
        if (!isLastOccurrence) {
          processedStack.push(`${stateKey}|prev-${seenCount + 1}`);
        } else {
          processedStack.push(stateKey);
        }
      }
      return processedStack;
    };
    const initializeCollapsedStates = () => {
      const collapsed = /* @__PURE__ */ new Set();
      const currentStateKey = data.context?.currentState || data.context?.stateId;
      const deduplicatedStack = getDeduplicatedStack();
      deduplicatedStack.forEach((stateKey) => {
        if (stateKey !== currentStateKey) {
          collapsed.add(stateKey);
        }
      });
      return collapsed;
    };
    const [collapsedStates, setCollapsedStates] = d2(initializeCollapsedStates());
    const currentStateRef = A2(null);
    const scrollToBottom = () => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
      });
    };
    y2(() => {
      const currentStateKey = data.context?.currentState || data.context?.stateId;
      const newCollapsed = new Set(collapsedStates);
      const deduplicatedStack = getDeduplicatedStack();
      deduplicatedStack.forEach((stateKey) => {
        if (stateKey !== currentStateKey && !newCollapsed.has(stateKey)) {
          newCollapsed.add(stateKey);
        }
      });
      const currentStack = new Set(deduplicatedStack);
      for (const stateKey of newCollapsed) {
        if (!currentStack.has(stateKey)) {
          newCollapsed.delete(stateKey);
        }
      }
      setCollapsedStates(newCollapsed);
    }, [data.context?.stack, data.context?.currentState, data.context?.stateId]);
    y2(() => {
      if (currentStateRef.current) {
        currentStateRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
    }, [data.context?.currentState, data.context?.stateId]);
    y2(() => {
      if (data.status !== "running") {
        setOptimisticState(void 0);
      }
    }, [data.status]);
    const toggleCollapse = (stateKey) => {
      const newCollapsed = new Set(collapsedStates);
      if (newCollapsed.has(stateKey)) {
        newCollapsed.delete(stateKey);
      } else {
        newCollapsed.add(stateKey);
      }
      setCollapsedStates(newCollapsed);
    };
    const parseStateKey = (stateKey) => {
      const parts = stateKey.split("|");
      const stateName = parts[0];
      const stateId = parts[1];
      const isPrevious = parts.length > 2 && parts[2].startsWith("prev-");
      const previousNumber = isPrevious ? parts[2].replace("prev-", "") : null;
      return { stateName, stateId, isPrevious, previousNumber };
    };
    const renderStateComponent = (stateKey, onAction, machineStatus) => {
      const { stateName, stateId, isPrevious } = parseStateKey(stateKey);
      const Component = stateComponentMap[stateName];
      const originalKey = isPrevious ? `${stateName}|${stateId}` : stateKey;
      const stateData = data.context?.[originalKey];
      if (!Component) {
        return /* @__PURE__ */ u3("div", { className: "p-4 bg-red-50 rounded border", children: /* @__PURE__ */ u3("p", { className: "text-red-600", children: [
          "Unknown state type: ",
          stateName
        ] }) });
      }
      return /* @__PURE__ */ u3(Component, { data: stateData, id: stateId, onAction, machineStatus });
    };
    const isCurrentState = (stateKey) => {
      const { isPrevious } = parseStateKey(stateKey);
      if (isPrevious) return false;
      return data.context?.currentState === stateKey || data.context?.stateId === stateKey;
    };
    const continueToNextState = () => {
      fetchGetNextState({ machineId: data.id, contextUpdate: {} });
      setOptimisticState("running");
    };
    const handleSubmit = (e4) => {
      e4.preventDefault();
      if (!input.value.trim()) return;
      if (!data?.currentState) {
        console.error("Machine data is missing current state");
        return;
      }
      if (data.currentState.startsWith("specReview")) {
        const messages = data.context?.[data.currentState]?.messages;
        const lastMessage = messages?.slice().reverse().find((item) => item.user === void 0);
        lastMessage.user = input.value;
        fetchGetNextState({ machineId: data.id, contextUpdate: { [data.currentState]: { approved: false, messages } } });
        setSpecReviewRejected(false);
        return;
      }
      if (data.currentState.startsWith("architectureReview")) {
        const messages = data.context?.[data.currentState]?.messages;
        const lastMessage = messages?.slice().reverse().find((item) => item.user === void 0);
        lastMessage.user = `${architectureReviewPayload}

${input.value}`;
        fetchGetNextState({ machineId: data.id, contextUpdate: { [data.currentState]: { approved: false, messages } } });
        setArchitectureReviewRejected(false);
        setArchitectureReviewPayload(null);
        return;
      }
      fetchGetNextState({ machineId: data.id, contextUpdate: { [data.currentState]: { userResponse: input.value } } });
      setInput((curr) => ({ ...curr, value: "", placeholder: "Tell me more..." }));
      scrollToBottom();
    };
    const handleAction = (action, payload) => {
      if (action === "approveSpec" || action === "approveArchitecture" || action === "approveCodeReview") {
        setSpecReviewRejected(false);
        if (!data?.currentState) {
          console.error("Machine data is missing current state");
          return;
        }
        const messages = data.context?.[data.currentState]?.messages;
        const lastMessage = messages?.slice().reverse().find((item) => item.user === void 0);
        lastMessage.user = "Looks good, approved.";
        fetchGetNextState({ machineId: data.id, contextUpdate: { [data.currentState]: { approved: true, messages } } });
      } else if (action === "rejectSpec") {
        setInput((curr) => ({ ...curr, placeholder: "Please provide feedback on what you would like changed" }));
        setSpecReviewRejected(true);
      } else if (action === "rejectArchitecture") {
        if (!data?.currentState) {
          console.error("Machine data is missing current state");
          return;
        }
        const messages = data.context?.[data.currentState]?.messages;
        const lastMessage = messages?.slice().reverse().find((item) => item.user === void 0);
        lastMessage.user = payload;
        fetchGetNextState({ machineId: data.id, contextUpdate: { [data.currentState]: { approved: false, messages } } });
      } else if (action === "rejectCodeReview") {
        if (!data?.currentState) {
          console.error("Machine data is missing current state");
          return;
        }
        const messages = data.context?.[data.currentState]?.messages;
        const lastMessage = messages?.slice().reverse().find((item) => item.user === void 0);
        lastMessage.user = "Rejected.";
        fetchGetNextState({ machineId: data.id, contextUpdate: { [data.currentState]: { approved: false, messages } } });
      }
    };
    return /* @__PURE__ */ u3("div", { className: "flex flex-col h-screen max-w-4xl mx-auto", children: [
      /* @__PURE__ */ u3("div", { className: "flex-1 overflow-y-auto", style: { paddingBottom: "50px" }, children: [
        /* @__PURE__ */ u3("div", { className: "space-y-4", children: [
          data.context?.solution && /* @__PURE__ */ u3(GeneralMessageBubble, { content: "Hello! I'm **Larry**, your AI Coding assistant. \n I'm working in organized, state based way. Below you will see the states I'm in and the actions I'm taking.", topActions: null }),
          getDeduplicatedStack().map((stateKey, index3) => {
            const { stateName, isPrevious, previousNumber } = parseStateKey(stateKey);
            const formattedName = isPrevious ? `${stateName} (previous ${previousNumber})` : stateName;
            const isCurrent = isCurrentState(stateKey);
            const isCollapsed = collapsedStates.has(stateKey) && !isCurrent;
            return /* @__PURE__ */ u3(
              "div",
              {
                className: "mb-2",
                children: [
                  /* @__PURE__ */ u3(
                    "div",
                    {
                      ref: isCurrent ? currentStateRef : null,
                      className: `d-flex cursor-pointer`,
                      style: {
                        alignItems: "center",
                        cursor: "pointer",
                        opacity: isCurrent ? "1" : "0.5"
                      },
                      onClick: () => !isCurrent && toggleCollapse(stateKey),
                      children: [
                        /* @__PURE__ */ u3("div", { children: /* @__PURE__ */ u3("span", { className: "text-xs", children: [
                          "State: ",
                          formattedName
                        ] }) }),
                        !isCurrent && /* @__PURE__ */ u3("div", { className: "d-flex", style: {
                          opacity: isCurrent ? "1" : "0.5"
                        }, children: isCollapsed ? /* @__PURE__ */ u3(ChevronRight, { size: 16 }) : /* @__PURE__ */ u3(ChevronDown2, { size: 16 }) })
                      ]
                    }
                  ),
                  (isCurrent || !isCollapsed) && /* @__PURE__ */ u3("div", { className: "pb-3", children: renderStateComponent(stateKey, handleAction, data.status) })
                ]
              },
              stateKey
            );
          })
        ] }),
        (data.status === "running" || optimisticState === "running") && /* @__PURE__ */ u3("div", { children: [
          /* @__PURE__ */ u3("span", { className: "shimmer-loading", children: "Working" }),
          /* @__PURE__ */ u3(AnimatedEllipsis, {})
        ] }),
        data.status === "pending" && !optimisticState && /* @__PURE__ */ u3("div", { children: [
          /* @__PURE__ */ u3("div", { className: "mb-2", children: 'Cannot automatically proceed to next state. Click "Continue" button to proceed.' }),
          /* @__PURE__ */ u3(
            "button",
            {
              onClick: continueToNextState,
              type: "submit",
              className: "btn btn-primary",
              children: "Continue"
            }
          )
        ] })
      ] }),
      showInput && /* @__PURE__ */ u3("div", { style: { position: "fixed", left: 0, padding: "5px", background: "var(--vscode-editor-background)", bottom: 0, width: "100%" }, className: "sticky bottom-0 border-t shadow-lg", children: /* @__PURE__ */ u3("form", { onSubmit: handleSubmit, className: "d-flex gap-2", style: { position: "relative" }, children: [
        /* @__PURE__ */ u3(
          index2,
          {
            value: input.value,
            onInput: (e4) => setInput((curr) => ({ ...curr, value: e4.currentTarget.value })),
            placeholder: input.placeholder,
            minRows: 2,
            maxRows: 8,
            autoFocus: true,
            className: "form-control width-full pr-40"
          }
        ),
        /* @__PURE__ */ u3(
          "button",
          {
            type: "submit",
            className: "btn btn-primary",
            style: { borderRadius: "50% !important", width: "32px", paddingTop: "12px !important", height: "32px", position: "absolute", right: "5px", bottom: "6px", lineHeight: "30px !important" },
            children: /* @__PURE__ */ u3(Send, { size: 16, style: { position: "relative", top: "4px", left: "-2px" } })
          }
        )
      ] }) })
    ] });
  }

  // apps/larry-vscode-ext/webview/src/views/WorktreeScreen.tsx
  function WorktreeScreen() {
    const [firstMessage, setFirstMessage] = d2("");
    const [provisioning, setProvisioning] = d2(false);
    const { apiUrl, clientRequestId, currentThreadId, currentWorktreeName } = useExtensionStore();
    console.log("CURRENT THREAD ID::", currentThreadId);
    y2(() => {
      if (currentThreadId) {
        setProvisioning(false);
      }
    }, [currentThreadId]);
    const { data: machineData, isLoading } = useMachineQuery(apiUrl, currentThreadId);
    const { data: threadsData } = useThreadsQuery(apiUrl);
    y2(() => {
      console.log("MACHINE DATA::");
      console.log(machineData);
      console.log("THREADS DATA::");
      console.log(threadsData);
    }, [machineData, threadsData]);
    const currentThread = threadsData?.items?.find((t4) => t4.id === currentThreadId);
    const sessionLabel = currentThread?.label || "Session";
    async function startNewThread() {
      if (!firstMessage.trim()) return;
      if (!currentWorktreeName) {
        console.error("Worktree name is unknown. Please open from main screen or update the extension to pass worktreeName.");
        return;
      }
      setProvisioning(true);
      await createThread({
        baseUrl: apiUrl,
        worktreeName: currentWorktreeName || "test-001",
        userTask: firstMessage.trim(),
        label: firstMessage.trim(),
        clientRequestId
      });
    }
    const handleSubmit = async (input) => {
    };
    if (currentThreadId && machineData) {
      return /* @__PURE__ */ u3("div", { className: "min-h-screen", children: [
        /* @__PURE__ */ u3("div", { className: "d-flex flex-justify-between flex-items-center mb-2", children: /* @__PURE__ */ u3("h4", { className: "h3 m-0", children: sessionLabel }) }),
        isLoading ? /* @__PURE__ */ u3("div", { className: "color-fg-muted", children: "Loading history\u2026" }) : /* @__PURE__ */ u3(StateVisualization, { data: machineData, onSubmit: handleSubmit })
      ] });
    }
    return /* @__PURE__ */ u3("div", { className: "Box p-3 d-flex flex-column gap-2", children: [
      /* @__PURE__ */ u3("h2", { className: "h3 m-0", children: "New Session" }),
      /* @__PURE__ */ u3(
        "textarea",
        {
          className: "form-control",
          rows: 6,
          placeholder: "Hello, how can I help you today?",
          value: firstMessage,
          onInput: (e4) => setFirstMessage(e4.currentTarget.value)
        }
      ),
      /* @__PURE__ */ u3("div", { children: [
        provisioning && /* @__PURE__ */ u3("div", { className: "mt-1", children: [
          /* @__PURE__ */ u3("span", { className: "shimmer-loading", children: "Working on it" }),
          /* @__PURE__ */ u3(AnimatedEllipsis, {})
        ] }),
        !provisioning && /* @__PURE__ */ u3("button", { className: "btn btn-primary", disabled: !firstMessage.trim(), onClick: startNewThread, children: "Send" })
      ] })
    ] });
  }

  // apps/larry-vscode-ext/webview/src/views/components/Loader.tsx
  function Loader({ message = "Loading" }) {
    return /* @__PURE__ */ u3("div", { className: "flex items-center justify-center p-6", children: /* @__PURE__ */ u3("div", { className: "text-center", children: /* @__PURE__ */ u3("div", { className: "text-sm mb-2", children: [
      /* @__PURE__ */ u3("span", { className: "shimmer-loading", children: message }),
      /* @__PURE__ */ u3(AnimatedEllipsis, {})
    ] }) }) });
  }

  // apps/larry-vscode-ext/webview/src/views/AppRoot.tsx
  function AppRoot() {
    const { isInWorktree, isLoadingApp } = useExtensionStore();
    if (isLoadingApp) {
      return /* @__PURE__ */ u3("div", { className: "p-3", children: /* @__PURE__ */ u3(Loader, { message: "Initializing Larry" }) });
    }
    return /* @__PURE__ */ u3("div", { className: "p-3", children: isInWorktree ? /* @__PURE__ */ u3(WorktreeScreen, {}) : /* @__PURE__ */ u3(MainRepoScreen, {}) });
  }

  // apps/larry-vscode-ext/webview/src/views/BootChannel.tsx
  init_hooks_module();

  // apps/larry-vscode-ext/webview/src/lib/extension-sse-bridge.ts
  function handleForwardedSSE(msg, storeValues) {
    const { baseUrl, event, data } = msg;
    try {
      if (event === "thread.created") {
        const evt = JSON.parse(data);
        queryClient.setQueryData(
          ["threads", { baseUrl }],
          (prev) => {
            console.log("\u{1F4DD} Updating threads cache. Previous:", prev);
            if (!prev) return prev;
            const updated = {
              ...prev,
              items: [
                {
                  id: evt.threadId,
                  label: evt.label,
                  worktreeName: evt.worktreeName,
                  createdAt: (/* @__PURE__ */ new Date()).toISOString(),
                  updatedAt: (/* @__PURE__ */ new Date()).toISOString()
                },
                ...prev.items
              ]
            };
            console.log("Updated threads cache:", updated);
            return updated;
          }
        );
        if (evt.clientRequestId && evt.clientRequestId === storeValues.clientRequestId) {
          console.log("Setting currentThreadId to:", evt.machineId);
          storeValues.dispatch({
            type: "SET_CURRENT_THREAD_ID",
            payload: evt.machineId
            // machineId == threadId for now
          });
        }
        return;
      }
      if (event === "machine.updated") {
        const evt = JSON.parse(data);
        const m5 = evt.machine;
        console.log("\u{1F916} Processing machine.updated:", m5);
        queryClient.setQueryData(["machine", { baseUrl, machineId: m5.id }], m5);
        console.log("\u{1F4DD} Updated machine cache for:", m5.id);
        return;
      }
    } catch (error) {
      console.error("\u274C SSE Bridge error processing event:", error);
    }
  }

  // apps/larry-vscode-ext/webview/src/views/BootChannel.tsx
  function BootChannel() {
    const dispatch = useExtensionDispatch();
    const { clientRequestId } = useExtensionStore();
    y2(() => {
      const handleMessage = (msg) => {
        if (!msg || typeof msg !== "object") return;
        if (msg.type === "worktree_detection") {
          dispatch({
            type: "SET_WORKTREE_DETECTION",
            payload: {
              isInWorktree: !!msg.isInWorktree,
              currentThreadId: msg.currentThreadId || void 0,
              worktreeName: msg.worktreeName
            }
          });
        }
        if (msg.type === "worktree_ready") {
          dispatch({
            type: "SET_WORKTREE_READY",
            payload: {
              threadId: msg.threadId,
              worktreeName: msg.worktreeName
            }
          });
        }
        if (msg.type === "worktree_setup_error") {
          dispatch({ type: "SET_WORKTREE_SETUP_ERROR" });
        }
        if (msg.type === "update_thread_state") {
          dispatch({ type: "SET_THREAD_STATE", payload: msg.state });
        }
        console.log("\u{1F4E8} Webview received message:", msg);
        if (msg.type === "sse_event" && msg.baseUrl && msg.event && typeof msg.data === "string") {
          console.log("\u{1F4E8} Webview received SSE event:", msg);
          handleForwardedSSE(
            { baseUrl: msg.baseUrl, event: msg.event, data: msg.data },
            { clientRequestId, dispatch }
          );
        }
      };
      const cleanupListener = onMessage(handleMessage);
      postMessage({ type: "getCurrentWorktree" });
      return () => {
        if (typeof cleanupListener === "function") {
          cleanupListener();
        }
      };
    }, []);
    return null;
  }

  // apps/larry-vscode-ext/webview/src/main.tsx
  function Root() {
    const content = /* @__PURE__ */ u3(ExtensionStoreProvider, { children: [
      /* @__PURE__ */ u3(BootChannel, {}),
      /* @__PURE__ */ u3(AppRoot, {})
    ] });
    return /* @__PURE__ */ u3(QueryClientProvider, { client: queryClient, children: content });
  }
  G(/* @__PURE__ */ u3(Root, {}), document.getElementById("root"));
})();
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
  (**
   * @license lucide-react v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/defaultAttributes.js:
  (**
   * @license lucide-react v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/Icon.js:
  (**
   * @license lucide-react v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/createLucideIcon.js:
  (**
   * @license lucide-react v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/chevron-down.js:
  (**
   * @license lucide-react v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.454.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

dompurify/dist/purify.es.mjs:
  (*! @license DOMPurify 3.2.7 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.2.7/LICENSE *)

lucide-preact/dist/esm/shared/src/utils.js:
  (**
   * @license lucide-preact v0.544.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-preact/dist/esm/defaultAttributes.js:
  (**
   * @license lucide-preact v0.544.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-preact/dist/esm/Icon.js:
  (**
   * @license lucide-preact v0.544.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-preact/dist/esm/createLucideIcon.js:
  (**
   * @license lucide-preact v0.544.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-preact/dist/esm/icons/check.js:
  (**
   * @license lucide-preact v0.544.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-preact/dist/esm/icons/chevron-down.js:
  (**
   * @license lucide-preact v0.544.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-preact/dist/esm/icons/chevron-right.js:
  (**
   * @license lucide-preact v0.544.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-preact/dist/esm/icons/copy.js:
  (**
   * @license lucide-preact v0.544.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-preact/dist/esm/icons/file-diff.js:
  (**
   * @license lucide-preact v0.544.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-preact/dist/esm/icons/file-minus-2.js:
  (**
   * @license lucide-preact v0.544.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-preact/dist/esm/icons/file-plus-2.js:
  (**
   * @license lucide-preact v0.544.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-preact/dist/esm/icons/file-symlink.js:
  (**
   * @license lucide-preact v0.544.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-preact/dist/esm/icons/send.js:
  (**
   * @license lucide-preact v0.544.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-preact/dist/esm/icons/x.js:
  (**
   * @license lucide-preact v0.544.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-preact/dist/esm/lucide-preact.js:
  (**
   * @license lucide-preact v0.544.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=webview.js.map
