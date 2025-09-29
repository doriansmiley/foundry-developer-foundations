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
  function d(n4, l6) {
    for (var u7 in l6) n4[u7] = l6[u7];
    return n4;
  }
  function g(n4) {
    n4 && n4.parentNode && n4.parentNode.removeChild(n4);
  }
  function _(l6, u7, t6) {
    var i7, r6, o6, e6 = {};
    for (o6 in u7) "key" == o6 ? i7 = u7[o6] : "ref" == o6 ? r6 = u7[o6] : e6[o6] = u7[o6];
    if (arguments.length > 2 && (e6.children = arguments.length > 3 ? n.call(arguments, 2) : t6), "function" == typeof l6 && null != l6.defaultProps) for (o6 in l6.defaultProps) void 0 === e6[o6] && (e6[o6] = l6.defaultProps[o6]);
    return m(l6, e6, i7, r6, null);
  }
  function m(n4, t6, i7, r6, o6) {
    var e6 = { type: n4, props: t6, key: i7, ref: r6, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o6 ? ++u : o6, __i: -1, __u: 0 };
    return null == o6 && null != l.vnode && l.vnode(e6), e6;
  }
  function b() {
    return { current: null };
  }
  function k(n4) {
    return n4.children;
  }
  function x(n4, l6) {
    this.props = n4, this.context = l6;
  }
  function S(n4, l6) {
    if (null == l6) return n4.__ ? S(n4.__, n4.__i + 1) : null;
    for (var u7; l6 < n4.__k.length; l6++) if (null != (u7 = n4.__k[l6]) && null != u7.__e) return u7.__e;
    return "function" == typeof n4.type ? S(n4) : null;
  }
  function C(n4) {
    var l6, u7;
    if (null != (n4 = n4.__) && null != n4.__c) {
      for (n4.__e = n4.__c.base = null, l6 = 0; l6 < n4.__k.length; l6++) if (null != (u7 = n4.__k[l6]) && null != u7.__e) {
        n4.__e = n4.__c.base = u7.__e;
        break;
      }
      return C(n4);
    }
  }
  function M(n4) {
    (!n4.__d && (n4.__d = true) && i.push(n4) && !$.__r++ || r != l.debounceRendering) && ((r = l.debounceRendering) || o)($);
  }
  function $() {
    for (var n4, u7, t6, r6, o6, f7, c6, s6 = 1; i.length; ) i.length > s6 && i.sort(e), n4 = i.shift(), s6 = i.length, n4.__d && (t6 = void 0, r6 = void 0, o6 = (r6 = (u7 = n4).__v).__e, f7 = [], c6 = [], u7.__P && ((t6 = d({}, r6)).__v = r6.__v + 1, l.vnode && l.vnode(t6), O(u7.__P, t6, r6, u7.__n, u7.__P.namespaceURI, 32 & r6.__u ? [o6] : null, f7, null == o6 ? S(r6) : o6, !!(32 & r6.__u), c6), t6.__v = r6.__v, t6.__.__k[t6.__i] = t6, N(f7, t6, c6), r6.__e = r6.__ = null, t6.__e != o6 && C(t6)));
    $.__r = 0;
  }
  function I(n4, l6, u7, t6, i7, r6, o6, e6, f7, c6, s6) {
    var a6, h7, y7, w7, d6, g6, _5, m6 = t6 && t6.__k || v, b5 = l6.length;
    for (f7 = P(u7, l6, m6, f7, b5), a6 = 0; a6 < b5; a6++) null != (y7 = u7.__k[a6]) && (h7 = -1 == y7.__i ? p : m6[y7.__i] || p, y7.__i = a6, g6 = O(n4, y7, h7, i7, r6, o6, e6, f7, c6, s6), w7 = y7.__e, y7.ref && h7.ref != y7.ref && (h7.ref && B(h7.ref, null, y7), s6.push(y7.ref, y7.__c || w7, y7)), null == d6 && null != w7 && (d6 = w7), (_5 = !!(4 & y7.__u)) || h7.__k === y7.__k ? f7 = A(y7, f7, n4, _5) : "function" == typeof y7.type && void 0 !== g6 ? f7 = g6 : w7 && (f7 = w7.nextSibling), y7.__u &= -7);
    return u7.__e = d6, f7;
  }
  function P(n4, l6, u7, t6, i7) {
    var r6, o6, e6, f7, c6, s6 = u7.length, a6 = s6, h7 = 0;
    for (n4.__k = new Array(i7), r6 = 0; r6 < i7; r6++) null != (o6 = l6[r6]) && "boolean" != typeof o6 && "function" != typeof o6 ? (f7 = r6 + h7, (o6 = n4.__k[r6] = "string" == typeof o6 || "number" == typeof o6 || "bigint" == typeof o6 || o6.constructor == String ? m(null, o6, null, null, null) : w(o6) ? m(k, { children: o6 }, null, null, null) : null == o6.constructor && o6.__b > 0 ? m(o6.type, o6.props, o6.key, o6.ref ? o6.ref : null, o6.__v) : o6).__ = n4, o6.__b = n4.__b + 1, e6 = null, -1 != (c6 = o6.__i = L(o6, u7, f7, a6)) && (a6--, (e6 = u7[c6]) && (e6.__u |= 2)), null == e6 || null == e6.__v ? (-1 == c6 && (i7 > s6 ? h7-- : i7 < s6 && h7++), "function" != typeof o6.type && (o6.__u |= 4)) : c6 != f7 && (c6 == f7 - 1 ? h7-- : c6 == f7 + 1 ? h7++ : (c6 > f7 ? h7-- : h7++, o6.__u |= 4))) : n4.__k[r6] = null;
    if (a6) for (r6 = 0; r6 < s6; r6++) null != (e6 = u7[r6]) && 0 == (2 & e6.__u) && (e6.__e == t6 && (t6 = S(e6)), D(e6, e6));
    return t6;
  }
  function A(n4, l6, u7, t6) {
    var i7, r6;
    if ("function" == typeof n4.type) {
      for (i7 = n4.__k, r6 = 0; i7 && r6 < i7.length; r6++) i7[r6] && (i7[r6].__ = n4, l6 = A(i7[r6], l6, u7, t6));
      return l6;
    }
    n4.__e != l6 && (t6 && (l6 && n4.type && !l6.parentNode && (l6 = S(n4)), u7.insertBefore(n4.__e, l6 || null)), l6 = n4.__e);
    do {
      l6 = l6 && l6.nextSibling;
    } while (null != l6 && 8 == l6.nodeType);
    return l6;
  }
  function H(n4, l6) {
    return l6 = l6 || [], null == n4 || "boolean" == typeof n4 || (w(n4) ? n4.some(function(n5) {
      H(n5, l6);
    }) : l6.push(n4)), l6;
  }
  function L(n4, l6, u7, t6) {
    var i7, r6, o6, e6 = n4.key, f7 = n4.type, c6 = l6[u7], s6 = null != c6 && 0 == (2 & c6.__u);
    if (null === c6 && null == n4.key || s6 && e6 == c6.key && f7 == c6.type) return u7;
    if (t6 > (s6 ? 1 : 0)) {
      for (i7 = u7 - 1, r6 = u7 + 1; i7 >= 0 || r6 < l6.length; ) if (null != (c6 = l6[o6 = i7 >= 0 ? i7-- : r6++]) && 0 == (2 & c6.__u) && e6 == c6.key && f7 == c6.type) return o6;
    }
    return -1;
  }
  function T(n4, l6, u7) {
    "-" == l6[0] ? n4.setProperty(l6, null == u7 ? "" : u7) : n4[l6] = null == u7 ? "" : "number" != typeof u7 || y.test(l6) ? u7 : u7 + "px";
  }
  function j(n4, l6, u7, t6, i7) {
    var r6, o6;
    n: if ("style" == l6) if ("string" == typeof u7) n4.style.cssText = u7;
    else {
      if ("string" == typeof t6 && (n4.style.cssText = t6 = ""), t6) for (l6 in t6) u7 && l6 in u7 || T(n4.style, l6, "");
      if (u7) for (l6 in u7) t6 && u7[l6] == t6[l6] || T(n4.style, l6, u7[l6]);
    }
    else if ("o" == l6[0] && "n" == l6[1]) r6 = l6 != (l6 = l6.replace(f, "$1")), o6 = l6.toLowerCase(), l6 = o6 in n4 || "onFocusOut" == l6 || "onFocusIn" == l6 ? o6.slice(2) : l6.slice(2), n4.l || (n4.l = {}), n4.l[l6 + r6] = u7, u7 ? t6 ? u7.u = t6.u : (u7.u = c, n4.addEventListener(l6, r6 ? a : s, r6)) : n4.removeEventListener(l6, r6 ? a : s, r6);
    else {
      if ("http://www.w3.org/2000/svg" == i7) l6 = l6.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != l6 && "height" != l6 && "href" != l6 && "list" != l6 && "form" != l6 && "tabIndex" != l6 && "download" != l6 && "rowSpan" != l6 && "colSpan" != l6 && "role" != l6 && "popover" != l6 && l6 in n4) try {
        n4[l6] = null == u7 ? "" : u7;
        break n;
      } catch (n5) {
      }
      "function" == typeof u7 || (null == u7 || false === u7 && "-" != l6[4] ? n4.removeAttribute(l6) : n4.setAttribute(l6, "popover" == l6 && 1 == u7 ? "" : u7));
    }
  }
  function F(n4) {
    return function(u7) {
      if (this.l) {
        var t6 = this.l[u7.type + n4];
        if (null == u7.t) u7.t = c++;
        else if (u7.t < t6.u) return;
        return t6(l.event ? l.event(u7) : u7);
      }
    };
  }
  function O(n4, u7, t6, i7, r6, o6, e6, f7, c6, s6) {
    var a6, h7, p7, v6, y7, _5, m6, b5, S3, C5, M3, $3, P4, A5, H2, L3, T5, j5 = u7.type;
    if (null != u7.constructor) return null;
    128 & t6.__u && (c6 = !!(32 & t6.__u), o6 = [f7 = u7.__e = t6.__e]), (a6 = l.__b) && a6(u7);
    n: if ("function" == typeof j5) try {
      if (b5 = u7.props, S3 = "prototype" in j5 && j5.prototype.render, C5 = (a6 = j5.contextType) && i7[a6.__c], M3 = a6 ? C5 ? C5.props.value : a6.__ : i7, t6.__c ? m6 = (h7 = u7.__c = t6.__c).__ = h7.__E : (S3 ? u7.__c = h7 = new j5(b5, M3) : (u7.__c = h7 = new x(b5, M3), h7.constructor = j5, h7.render = E), C5 && C5.sub(h7), h7.props = b5, h7.state || (h7.state = {}), h7.context = M3, h7.__n = i7, p7 = h7.__d = true, h7.__h = [], h7._sb = []), S3 && null == h7.__s && (h7.__s = h7.state), S3 && null != j5.getDerivedStateFromProps && (h7.__s == h7.state && (h7.__s = d({}, h7.__s)), d(h7.__s, j5.getDerivedStateFromProps(b5, h7.__s))), v6 = h7.props, y7 = h7.state, h7.__v = u7, p7) S3 && null == j5.getDerivedStateFromProps && null != h7.componentWillMount && h7.componentWillMount(), S3 && null != h7.componentDidMount && h7.__h.push(h7.componentDidMount);
      else {
        if (S3 && null == j5.getDerivedStateFromProps && b5 !== v6 && null != h7.componentWillReceiveProps && h7.componentWillReceiveProps(b5, M3), !h7.__e && null != h7.shouldComponentUpdate && false === h7.shouldComponentUpdate(b5, h7.__s, M3) || u7.__v == t6.__v) {
          for (u7.__v != t6.__v && (h7.props = b5, h7.state = h7.__s, h7.__d = false), u7.__e = t6.__e, u7.__k = t6.__k, u7.__k.some(function(n5) {
            n5 && (n5.__ = u7);
          }), $3 = 0; $3 < h7._sb.length; $3++) h7.__h.push(h7._sb[$3]);
          h7._sb = [], h7.__h.length && e6.push(h7);
          break n;
        }
        null != h7.componentWillUpdate && h7.componentWillUpdate(b5, h7.__s, M3), S3 && null != h7.componentDidUpdate && h7.__h.push(function() {
          h7.componentDidUpdate(v6, y7, _5);
        });
      }
      if (h7.context = M3, h7.props = b5, h7.__P = n4, h7.__e = false, P4 = l.__r, A5 = 0, S3) {
        for (h7.state = h7.__s, h7.__d = false, P4 && P4(u7), a6 = h7.render(h7.props, h7.state, h7.context), H2 = 0; H2 < h7._sb.length; H2++) h7.__h.push(h7._sb[H2]);
        h7._sb = [];
      } else do {
        h7.__d = false, P4 && P4(u7), a6 = h7.render(h7.props, h7.state, h7.context), h7.state = h7.__s;
      } while (h7.__d && ++A5 < 25);
      h7.state = h7.__s, null != h7.getChildContext && (i7 = d(d({}, i7), h7.getChildContext())), S3 && !p7 && null != h7.getSnapshotBeforeUpdate && (_5 = h7.getSnapshotBeforeUpdate(v6, y7)), L3 = a6, null != a6 && a6.type === k && null == a6.key && (L3 = V(a6.props.children)), f7 = I(n4, w(L3) ? L3 : [L3], u7, t6, i7, r6, o6, e6, f7, c6, s6), h7.base = u7.__e, u7.__u &= -161, h7.__h.length && e6.push(h7), m6 && (h7.__E = h7.__ = null);
    } catch (n5) {
      if (u7.__v = null, c6 || null != o6) if (n5.then) {
        for (u7.__u |= c6 ? 160 : 128; f7 && 8 == f7.nodeType && f7.nextSibling; ) f7 = f7.nextSibling;
        o6[o6.indexOf(f7)] = null, u7.__e = f7;
      } else {
        for (T5 = o6.length; T5--; ) g(o6[T5]);
        z(u7);
      }
      else u7.__e = t6.__e, u7.__k = t6.__k, n5.then || z(u7);
      l.__e(n5, u7, t6);
    }
    else null == o6 && u7.__v == t6.__v ? (u7.__k = t6.__k, u7.__e = t6.__e) : f7 = u7.__e = q(t6.__e, u7, t6, i7, r6, o6, e6, c6, s6);
    return (a6 = l.diffed) && a6(u7), 128 & u7.__u ? void 0 : f7;
  }
  function z(n4) {
    n4 && n4.__c && (n4.__c.__e = true), n4 && n4.__k && n4.__k.forEach(z);
  }
  function N(n4, u7, t6) {
    for (var i7 = 0; i7 < t6.length; i7++) B(t6[i7], t6[++i7], t6[++i7]);
    l.__c && l.__c(u7, n4), n4.some(function(u8) {
      try {
        n4 = u8.__h, u8.__h = [], n4.some(function(n5) {
          n5.call(u8);
        });
      } catch (n5) {
        l.__e(n5, u8.__v);
      }
    });
  }
  function V(n4) {
    return "object" != typeof n4 || null == n4 || n4.__b && n4.__b > 0 ? n4 : w(n4) ? n4.map(V) : d({}, n4);
  }
  function q(u7, t6, i7, r6, o6, e6, f7, c6, s6) {
    var a6, h7, v6, y7, d6, _5, m6, b5 = i7.props, k5 = t6.props, x5 = t6.type;
    if ("svg" == x5 ? o6 = "http://www.w3.org/2000/svg" : "math" == x5 ? o6 = "http://www.w3.org/1998/Math/MathML" : o6 || (o6 = "http://www.w3.org/1999/xhtml"), null != e6) {
      for (a6 = 0; a6 < e6.length; a6++) if ((d6 = e6[a6]) && "setAttribute" in d6 == !!x5 && (x5 ? d6.localName == x5 : 3 == d6.nodeType)) {
        u7 = d6, e6[a6] = null;
        break;
      }
    }
    if (null == u7) {
      if (null == x5) return document.createTextNode(k5);
      u7 = document.createElementNS(o6, x5, k5.is && k5), c6 && (l.__m && l.__m(t6, e6), c6 = false), e6 = null;
    }
    if (null == x5) b5 === k5 || c6 && u7.data == k5 || (u7.data = k5);
    else {
      if (e6 = e6 && n.call(u7.childNodes), b5 = i7.props || p, !c6 && null != e6) for (b5 = {}, a6 = 0; a6 < u7.attributes.length; a6++) b5[(d6 = u7.attributes[a6]).name] = d6.value;
      for (a6 in b5) if (d6 = b5[a6], "children" == a6) ;
      else if ("dangerouslySetInnerHTML" == a6) v6 = d6;
      else if (!(a6 in k5)) {
        if ("value" == a6 && "defaultValue" in k5 || "checked" == a6 && "defaultChecked" in k5) continue;
        j(u7, a6, null, d6, o6);
      }
      for (a6 in k5) d6 = k5[a6], "children" == a6 ? y7 = d6 : "dangerouslySetInnerHTML" == a6 ? h7 = d6 : "value" == a6 ? _5 = d6 : "checked" == a6 ? m6 = d6 : c6 && "function" != typeof d6 || b5[a6] === d6 || j(u7, a6, d6, b5[a6], o6);
      if (h7) c6 || v6 && (h7.__html == v6.__html || h7.__html == u7.innerHTML) || (u7.innerHTML = h7.__html), t6.__k = [];
      else if (v6 && (u7.innerHTML = ""), I("template" == t6.type ? u7.content : u7, w(y7) ? y7 : [y7], t6, i7, r6, "foreignObject" == x5 ? "http://www.w3.org/1999/xhtml" : o6, e6, f7, e6 ? e6[0] : i7.__k && S(i7, 0), c6, s6), null != e6) for (a6 = e6.length; a6--; ) g(e6[a6]);
      c6 || (a6 = "value", "progress" == x5 && null == _5 ? u7.removeAttribute("value") : null != _5 && (_5 !== u7[a6] || "progress" == x5 && !_5 || "option" == x5 && _5 != b5[a6]) && j(u7, a6, _5, b5[a6], o6), a6 = "checked", null != m6 && m6 != u7[a6] && j(u7, a6, m6, b5[a6], o6));
    }
    return u7;
  }
  function B(n4, u7, t6) {
    try {
      if ("function" == typeof n4) {
        var i7 = "function" == typeof n4.__u;
        i7 && n4.__u(), i7 && null == u7 || (n4.__u = n4(u7));
      } else n4.current = u7;
    } catch (n5) {
      l.__e(n5, t6);
    }
  }
  function D(n4, u7, t6) {
    var i7, r6;
    if (l.unmount && l.unmount(n4), (i7 = n4.ref) && (i7.current && i7.current != n4.__e || B(i7, null, u7)), null != (i7 = n4.__c)) {
      if (i7.componentWillUnmount) try {
        i7.componentWillUnmount();
      } catch (n5) {
        l.__e(n5, u7);
      }
      i7.base = i7.__P = null;
    }
    if (i7 = n4.__k) for (r6 = 0; r6 < i7.length; r6++) i7[r6] && D(i7[r6], u7, t6 || "function" != typeof n4.type);
    t6 || g(n4.__e), n4.__c = n4.__ = n4.__e = void 0;
  }
  function E(n4, l6, u7) {
    return this.constructor(n4, u7);
  }
  function G(u7, t6, i7) {
    var r6, o6, e6, f7;
    t6 == document && (t6 = document.documentElement), l.__ && l.__(u7, t6), o6 = (r6 = "function" == typeof i7) ? null : i7 && i7.__k || t6.__k, e6 = [], f7 = [], O(t6, u7 = (!r6 && i7 || t6).__k = _(k, null, [u7]), o6 || p, p, t6.namespaceURI, !r6 && i7 ? [i7] : o6 ? null : t6.firstChild ? n.call(t6.childNodes) : null, e6, !r6 && i7 ? i7 : o6 ? o6.__e : t6.firstChild, r6, f7), N(e6, u7, f7);
  }
  function J(n4, l6) {
    G(n4, l6, J);
  }
  function K(l6, u7, t6) {
    var i7, r6, o6, e6, f7 = d({}, l6.props);
    for (o6 in l6.type && l6.type.defaultProps && (e6 = l6.type.defaultProps), u7) "key" == o6 ? i7 = u7[o6] : "ref" == o6 ? r6 = u7[o6] : f7[o6] = void 0 === u7[o6] && null != e6 ? e6[o6] : u7[o6];
    return arguments.length > 2 && (f7.children = arguments.length > 3 ? n.call(arguments, 2) : t6), m(l6.type, f7, i7 || l6.key, r6 || l6.ref, null);
  }
  function Q(n4) {
    function l6(n5) {
      var u7, t6;
      return this.getChildContext || (u7 = /* @__PURE__ */ new Set(), (t6 = {})[l6.__c] = this, this.getChildContext = function() {
        return t6;
      }, this.componentWillUnmount = function() {
        u7 = null;
      }, this.shouldComponentUpdate = function(n6) {
        this.props.value != n6.value && u7.forEach(function(n7) {
          n7.__e = true, M(n7);
        });
      }, this.sub = function(n6) {
        u7.add(n6);
        var l7 = n6.componentWillUnmount;
        n6.componentWillUnmount = function() {
          u7 && u7.delete(n6), l7 && l7.call(n6);
        };
      }), n5.children;
    }
    return l6.__c = "__cC" + h++, l6.__ = n4, l6.Provider = l6.__l = (l6.Consumer = function(n5, l7) {
      return n5.children(l7);
    }).contextType = l6, l6;
  }
  var n, l, u, t, i, r, o, e, f, c, s, a, h, p, v, y, w;
  var init_preact_module = __esm({
    "apps/larry-vscode-ext/node_modules/preact/dist/preact.module.js"() {
      p = {};
      v = [];
      y = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
      w = Array.isArray;
      n = v.slice, l = { __e: function(n4, l6, u7, t6) {
        for (var i7, r6, o6; l6 = l6.__; ) if ((i7 = l6.__c) && !i7.__) try {
          if ((r6 = i7.constructor) && null != r6.getDerivedStateFromError && (i7.setState(r6.getDerivedStateFromError(n4)), o6 = i7.__d), null != i7.componentDidCatch && (i7.componentDidCatch(n4, t6 || {}), o6 = i7.__d), o6) return i7.__E = i7;
        } catch (l7) {
          n4 = l7;
        }
        throw n4;
      } }, u = 0, t = function(n4) {
        return null != n4 && null == n4.constructor;
      }, x.prototype.setState = function(n4, l6) {
        var u7;
        u7 = null != this.__s && this.__s != this.state ? this.__s : this.__s = d({}, this.state), "function" == typeof n4 && (n4 = n4(d({}, u7), this.props)), n4 && d(u7, n4), null != n4 && this.__v && (l6 && this._sb.push(l6), M(this));
      }, x.prototype.forceUpdate = function(n4) {
        this.__v && (this.__e = true, n4 && this.__h.push(n4), M(this));
      }, x.prototype.render = k, i = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e = function(n4, l6) {
        return n4.__v.__b - l6.__v.__b;
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
  function p2(n4, t6) {
    c2.__h && c2.__h(r2, n4, o2 || t6), o2 = 0;
    var u7 = r2.__H || (r2.__H = { __: [], __h: [] });
    return n4 >= u7.__.length && u7.__.push({}), u7.__[n4];
  }
  function d2(n4) {
    return o2 = 1, h2(D2, n4);
  }
  function h2(n4, u7, i7) {
    var o6 = p2(t2++, 2);
    if (o6.t = n4, !o6.__c && (o6.__ = [i7 ? i7(u7) : D2(void 0, u7), function(n5) {
      var t6 = o6.__N ? o6.__N[0] : o6.__[0], r6 = o6.t(t6, n5);
      t6 !== r6 && (o6.__N = [r6, o6.__[1]], o6.__c.setState({}));
    }], o6.__c = r2, !r2.__f)) {
      var f7 = function(n5, t6, r6) {
        if (!o6.__c.__H) return true;
        var u8 = o6.__c.__H.__.filter(function(n6) {
          return !!n6.__c;
        });
        if (u8.every(function(n6) {
          return !n6.__N;
        })) return !c6 || c6.call(this, n5, t6, r6);
        var i8 = o6.__c.props !== n5;
        return u8.forEach(function(n6) {
          if (n6.__N) {
            var t7 = n6.__[0];
            n6.__ = n6.__N, n6.__N = void 0, t7 !== n6.__[0] && (i8 = true);
          }
        }), c6 && c6.call(this, n5, t6, r6) || i8;
      };
      r2.__f = true;
      var c6 = r2.shouldComponentUpdate, e6 = r2.componentWillUpdate;
      r2.componentWillUpdate = function(n5, t6, r6) {
        if (this.__e) {
          var u8 = c6;
          c6 = void 0, f7(n5, t6, r6), c6 = u8;
        }
        e6 && e6.call(this, n5, t6, r6);
      }, r2.shouldComponentUpdate = f7;
    }
    return o6.__N || o6.__;
  }
  function y2(n4, u7) {
    var i7 = p2(t2++, 3);
    !c2.__s && C2(i7.__H, u7) && (i7.__ = n4, i7.u = u7, r2.__H.__h.push(i7));
  }
  function _2(n4, u7) {
    var i7 = p2(t2++, 4);
    !c2.__s && C2(i7.__H, u7) && (i7.__ = n4, i7.u = u7, r2.__h.push(i7));
  }
  function A2(n4) {
    return o2 = 5, T2(function() {
      return { current: n4 };
    }, []);
  }
  function F2(n4, t6, r6) {
    o2 = 6, _2(function() {
      if ("function" == typeof n4) {
        var r7 = n4(t6());
        return function() {
          n4(null), r7 && "function" == typeof r7 && r7();
        };
      }
      if (n4) return n4.current = t6(), function() {
        return n4.current = null;
      };
    }, null == r6 ? r6 : r6.concat(n4));
  }
  function T2(n4, r6) {
    var u7 = p2(t2++, 7);
    return C2(u7.__H, r6) && (u7.__ = n4(), u7.__H = r6, u7.__h = n4), u7.__;
  }
  function q2(n4, t6) {
    return o2 = 8, T2(function() {
      return n4;
    }, t6);
  }
  function x2(n4) {
    var u7 = r2.context[n4.__c], i7 = p2(t2++, 9);
    return i7.c = n4, u7 ? (null == i7.__ && (i7.__ = true, u7.sub(r2)), u7.props.value) : n4.__;
  }
  function P2(n4, t6) {
    c2.useDebugValue && c2.useDebugValue(t6 ? t6(n4) : n4);
  }
  function b2(n4) {
    var u7 = p2(t2++, 10), i7 = d2();
    return u7.__ = n4, r2.componentDidCatch || (r2.componentDidCatch = function(n5, t6) {
      u7.__ && u7.__(n5, t6), i7[1](n5);
    }), [i7[0], function() {
      i7[1](void 0);
    }];
  }
  function g2() {
    var n4 = p2(t2++, 11);
    if (!n4.__) {
      for (var u7 = r2.__v; null !== u7 && !u7.__m && null !== u7.__; ) u7 = u7.__;
      var i7 = u7.__m || (u7.__m = [0, 0]);
      n4.__ = "P" + i7[0] + "-" + i7[1]++;
    }
    return n4.__;
  }
  function j2() {
    for (var n4; n4 = f2.shift(); ) if (n4.__P && n4.__H) try {
      n4.__H.__h.forEach(z2), n4.__H.__h.forEach(B2), n4.__H.__h = [];
    } catch (t6) {
      n4.__H.__h = [], c2.__e(t6, n4.__v);
    }
  }
  function w2(n4) {
    var t6, r6 = function() {
      clearTimeout(u7), k2 && cancelAnimationFrame(t6), setTimeout(n4);
    }, u7 = setTimeout(r6, 35);
    k2 && (t6 = requestAnimationFrame(r6));
  }
  function z2(n4) {
    var t6 = r2, u7 = n4.__c;
    "function" == typeof u7 && (n4.__c = void 0, u7()), r2 = t6;
  }
  function B2(n4) {
    var t6 = r2;
    n4.__c = n4.__(), r2 = t6;
  }
  function C2(n4, t6) {
    return !n4 || n4.length !== t6.length || t6.some(function(t7, r6) {
      return t7 !== n4[r6];
    });
  }
  function D2(n4, t6) {
    return "function" == typeof t6 ? t6(n4) : t6;
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
      c2.__b = function(n4) {
        r2 = null, e2 && e2(n4);
      }, c2.__ = function(n4, t6) {
        n4 && t6.__k && t6.__k.__m && (n4.__m = t6.__k.__m), s2 && s2(n4, t6);
      }, c2.__r = function(n4) {
        a2 && a2(n4), t2 = 0;
        var i7 = (r2 = n4.__c).__H;
        i7 && (u2 === r2 ? (i7.__h = [], r2.__h = [], i7.__.forEach(function(n5) {
          n5.__N && (n5.__ = n5.__N), n5.u = n5.__N = void 0;
        })) : (i7.__h.forEach(z2), i7.__h.forEach(B2), i7.__h = [], t2 = 0)), u2 = r2;
      }, c2.diffed = function(n4) {
        v2 && v2(n4);
        var t6 = n4.__c;
        t6 && t6.__H && (t6.__H.__h.length && (1 !== f2.push(t6) && i2 === c2.requestAnimationFrame || ((i2 = c2.requestAnimationFrame) || w2)(j2)), t6.__H.__.forEach(function(n5) {
          n5.u && (n5.__H = n5.u), n5.u = void 0;
        })), u2 = r2 = null;
      }, c2.__c = function(n4, t6) {
        t6.some(function(n5) {
          try {
            n5.__h.forEach(z2), n5.__h = n5.__h.filter(function(n6) {
              return !n6.__ || B2(n6);
            });
          } catch (r6) {
            t6.some(function(n6) {
              n6.__h && (n6.__h = []);
            }), t6 = [], c2.__e(r6, n5.__v);
          }
        }), l2 && l2(n4, t6);
      }, c2.unmount = function(n4) {
        m2 && m2(n4);
        var t6, r6 = n4.__c;
        r6 && r6.__H && (r6.__H.__.forEach(function(n5) {
          try {
            z2(n5);
          } catch (n6) {
            t6 = n6;
          }
        }), r6.__H = void 0, t6 && c2.__e(t6, r6.__v));
      };
      k2 = "function" == typeof requestAnimationFrame;
    }
  });

  // apps/larry-vscode-ext/node_modules/preact/compat/dist/compat.js
  var require_compat = __commonJS({
    "apps/larry-vscode-ext/node_modules/preact/compat/dist/compat.js"(exports) {
      var n4 = (init_preact_module(), __toCommonJS(preact_module_exports));
      var t6 = (init_hooks_module(), __toCommonJS(hooks_module_exports));
      function e6(n5, t7) {
        for (var e7 in t7) n5[e7] = t7[e7];
        return n5;
      }
      function r6(n5, t7) {
        for (var e7 in n5) if ("__source" !== e7 && !(e7 in t7)) return true;
        for (var r7 in t7) if ("__source" !== r7 && n5[r7] !== t7[r7]) return true;
        return false;
      }
      function u7(n5, e7) {
        var r7 = e7(), u8 = t6.useState({ t: { __: r7, u: e7 } }), i8 = u8[0].t, c7 = u8[1];
        return t6.useLayoutEffect(function() {
          i8.__ = r7, i8.u = e7, o6(i8) && c7({ t: i8 });
        }, [n5, r7, e7]), t6.useEffect(function() {
          return o6(i8) && c7({ t: i8 }), n5(function() {
            o6(i8) && c7({ t: i8 });
          });
        }, [n5]), r7;
      }
      function o6(n5) {
        var t7, e7, r7 = n5.u, u8 = n5.__;
        try {
          var o7 = r7();
          return !((t7 = u8) === (e7 = o7) && (0 !== t7 || 1 / t7 == 1 / e7) || t7 != t7 && e7 != e7);
        } catch (n6) {
          return true;
        }
      }
      function i7(n5) {
        n5();
      }
      function c6(n5) {
        return n5;
      }
      function l6() {
        return [false, i7];
      }
      var f7 = t6.useLayoutEffect;
      function a6(n5, t7) {
        this.props = n5, this.context = t7;
      }
      function s6(t7, e7) {
        function u8(n5) {
          var t8 = this.props.ref, u9 = t8 == n5.ref;
          return !u9 && t8 && (t8.call ? t8(null) : t8.current = null), e7 ? !e7(this.props, n5) || !u9 : r6(this.props, n5);
        }
        function o7(e8) {
          return this.shouldComponentUpdate = u8, n4.createElement(t7, e8);
        }
        return o7.displayName = "Memo(" + (t7.displayName || t7.name) + ")", o7.prototype.isReactComponent = true, o7.__f = true, o7.type = t7, o7;
      }
      (a6.prototype = new n4.Component()).isPureReactComponent = true, a6.prototype.shouldComponentUpdate = function(n5, t7) {
        return r6(this.props, n5) || r6(this.state, t7);
      };
      var p7 = n4.options.__b;
      n4.options.__b = function(n5) {
        n5.type && n5.type.__f && n5.ref && (n5.props.ref = n5.ref, n5.ref = null), p7 && p7(n5);
      };
      var h7 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
      function v6(n5) {
        function t7(t8) {
          var r7 = e6({}, t8);
          return delete r7.ref, n5(r7, t8.ref || null);
        }
        return t7.$$typeof = h7, t7.render = n5, t7.prototype.isReactComponent = t7.__f = true, t7.displayName = "ForwardRef(" + (n5.displayName || n5.name) + ")", t7;
      }
      var d6 = function(t7, e7) {
        return null == t7 ? null : n4.toChildArray(n4.toChildArray(t7).map(e7));
      };
      var m6 = { map: d6, forEach: d6, count: function(t7) {
        return t7 ? n4.toChildArray(t7).length : 0;
      }, only: function(t7) {
        var e7 = n4.toChildArray(t7);
        if (1 !== e7.length) throw "Children.only";
        return e7[0];
      }, toArray: n4.toChildArray };
      var x5 = n4.options.__e;
      n4.options.__e = function(n5, t7, e7, r7) {
        if (n5.then) {
          for (var u8, o7 = t7; o7 = o7.__; ) if ((u8 = o7.__c) && u8.__c) return null == t7.__e && (t7.__e = e7.__e, t7.__k = e7.__k), u8.__c(n5, t7);
        }
        x5(n5, t7, e7, r7);
      };
      var b5 = n4.options.unmount;
      function _5(n5, t7, r7) {
        return n5 && (n5.__c && n5.__c.__H && (n5.__c.__H.__.forEach(function(n6) {
          "function" == typeof n6.__c && n6.__c();
        }), n5.__c.__H = null), null != (n5 = e6({}, n5)).__c && (n5.__c.__P === r7 && (n5.__c.__P = t7), n5.__c.__e = true, n5.__c = null), n5.__k = n5.__k && n5.__k.map(function(n6) {
          return _5(n6, t7, r7);
        })), n5;
      }
      function y7(n5, t7, e7) {
        return n5 && e7 && (n5.__v = null, n5.__k = n5.__k && n5.__k.map(function(n6) {
          return y7(n6, t7, e7);
        }), n5.__c && n5.__c.__P === t7 && (n5.__e && e7.appendChild(n5.__e), n5.__c.__e = true, n5.__c.__P = e7)), n5;
      }
      function g6() {
        this.__u = 0, this.o = null, this.__b = null;
      }
      function S3(n5) {
        var t7 = n5.__.__c;
        return t7 && t7.__a && t7.__a(n5);
      }
      function E4(t7) {
        var e7, r7, u8;
        function o7(o8) {
          if (e7 || (e7 = t7()).then(function(n5) {
            r7 = n5.default || n5;
          }, function(n5) {
            u8 = n5;
          }), u8) throw u8;
          if (!r7) throw e7;
          return n4.createElement(r7, o8);
        }
        return o7.displayName = "Lazy", o7.__f = true, o7;
      }
      function C5() {
        this.i = null, this.l = null;
      }
      n4.options.unmount = function(n5) {
        var t7 = n5.__c;
        t7 && t7.__R && t7.__R(), t7 && 32 & n5.__u && (n5.type = null), b5 && b5(n5);
      }, (g6.prototype = new n4.Component()).__c = function(n5, t7) {
        var e7 = t7.__c, r7 = this;
        null == r7.o && (r7.o = []), r7.o.push(e7);
        var u8 = S3(r7.__v), o7 = false, i8 = function() {
          o7 || (o7 = true, e7.__R = null, u8 ? u8(c7) : c7());
        };
        e7.__R = i8;
        var c7 = function() {
          if (!--r7.__u) {
            if (r7.state.__a) {
              var n6 = r7.state.__a;
              r7.__v.__k[0] = y7(n6, n6.__c.__P, n6.__c.__O);
            }
            var t8;
            for (r7.setState({ __a: r7.__b = null }); t8 = r7.o.pop(); ) t8.forceUpdate();
          }
        };
        r7.__u++ || 32 & t7.__u || r7.setState({ __a: r7.__b = r7.__v.__k[0] }), n5.then(i8, i8);
      }, g6.prototype.componentWillUnmount = function() {
        this.o = [];
      }, g6.prototype.render = function(t7, e7) {
        if (this.__b) {
          if (this.__v.__k) {
            var r7 = document.createElement("div"), u8 = this.__v.__k[0].__c;
            this.__v.__k[0] = _5(this.__b, r7, u8.__O = u8.__P);
          }
          this.__b = null;
        }
        var o7 = e7.__a && n4.createElement(n4.Fragment, null, t7.fallback);
        return o7 && (o7.__u &= -33), [n4.createElement(n4.Fragment, null, e7.__a ? null : t7.children), o7];
      };
      var O3 = function(n5, t7, e7) {
        if (++e7[1] === e7[0] && n5.l.delete(t7), n5.props.revealOrder && ("t" !== n5.props.revealOrder[0] || !n5.l.size)) for (e7 = n5.i; e7; ) {
          for (; e7.length > 3; ) e7.pop()();
          if (e7[1] < e7[0]) break;
          n5.i = e7 = e7[2];
        }
      };
      function R(n5) {
        return this.getChildContext = function() {
          return n5.context;
        }, n5.children;
      }
      function w7(t7) {
        var e7 = this, r7 = t7.p;
        if (e7.componentWillUnmount = function() {
          n4.render(null, e7.h), e7.h = null, e7.p = null;
        }, e7.p && e7.p !== r7 && e7.componentWillUnmount(), !e7.h) {
          for (var u8 = e7.__v; null !== u8 && !u8.__m && null !== u8.__; ) u8 = u8.__;
          e7.p = r7, e7.h = { nodeType: 1, parentNode: r7, childNodes: [], __k: { __m: u8.__m }, contains: function() {
            return true;
          }, insertBefore: function(n5, t8) {
            this.childNodes.push(n5), e7.p.insertBefore(n5, t8);
          }, removeChild: function(n5) {
            this.childNodes.splice(this.childNodes.indexOf(n5) >>> 1, 1), e7.p.removeChild(n5);
          } };
        }
        n4.render(n4.createElement(R, { context: e7.context }, t7.__v), e7.h);
      }
      function j5(t7, e7) {
        var r7 = n4.createElement(w7, { __v: t7, p: e7 });
        return r7.containerInfo = e7, r7;
      }
      (C5.prototype = new n4.Component()).__a = function(n5) {
        var t7 = this, e7 = S3(t7.__v), r7 = t7.l.get(n5);
        return r7[0]++, function(u8) {
          var o7 = function() {
            t7.props.revealOrder ? (r7.push(u8), O3(t7, n5, r7)) : u8();
          };
          e7 ? e7(o7) : o7();
        };
      }, C5.prototype.render = function(t7) {
        this.i = null, this.l = /* @__PURE__ */ new Map();
        var e7 = n4.toChildArray(t7.children);
        t7.revealOrder && "b" === t7.revealOrder[0] && e7.reverse();
        for (var r7 = e7.length; r7--; ) this.l.set(e7[r7], this.i = [1, 0, this.i]);
        return t7.children;
      }, C5.prototype.componentDidUpdate = C5.prototype.componentDidMount = function() {
        var n5 = this;
        this.l.forEach(function(t7, e7) {
          O3(n5, e7, t7);
        });
      };
      var k5 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
      var I3 = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
      var N3 = /^on(Ani|Tra|Tou|BeforeInp|Compo)/;
      var M3 = /[A-Z0-9]/g;
      var T5 = "undefined" != typeof document;
      var A5 = function(n5) {
        return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(n5);
      };
      function D5(t7, e7, r7) {
        return null == e7.__k && (e7.textContent = ""), n4.render(t7, e7), "function" == typeof r7 && r7(), t7 ? t7.__c : null;
      }
      function L3(t7, e7, r7) {
        return n4.hydrate(t7, e7), "function" == typeof r7 && r7(), t7 ? t7.__c : null;
      }
      n4.Component.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t7) {
        Object.defineProperty(n4.Component.prototype, t7, { configurable: true, get: function() {
          return this["UNSAFE_" + t7];
        }, set: function(n5) {
          Object.defineProperty(this, t7, { configurable: true, writable: true, value: n5 });
        } });
      });
      var F5 = n4.options.event;
      function U() {
      }
      function V3() {
        return this.cancelBubble;
      }
      function W() {
        return this.defaultPrevented;
      }
      n4.options.event = function(n5) {
        return F5 && (n5 = F5(n5)), n5.persist = U, n5.isPropagationStopped = V3, n5.isDefaultPrevented = W, n5.nativeEvent = n5;
      };
      var P4;
      var z5 = { enumerable: false, configurable: true, get: function() {
        return this.class;
      } };
      var B5 = n4.options.vnode;
      n4.options.vnode = function(t7) {
        "string" == typeof t7.type && function(t8) {
          var e7 = t8.props, r7 = t8.type, u8 = {}, o7 = -1 === r7.indexOf("-");
          for (var i8 in e7) {
            var c7 = e7[i8];
            if (!("value" === i8 && "defaultValue" in e7 && null == c7 || T5 && "children" === i8 && "noscript" === r7 || "class" === i8 || "className" === i8)) {
              var l7 = i8.toLowerCase();
              "defaultValue" === i8 && "value" in e7 && null == e7.value ? i8 = "value" : "download" === i8 && true === c7 ? c7 = "" : "translate" === l7 && "no" === c7 ? c7 = false : "o" === l7[0] && "n" === l7[1] ? "ondoubleclick" === l7 ? i8 = "ondblclick" : "onchange" !== l7 || "input" !== r7 && "textarea" !== r7 || A5(e7.type) ? "onfocus" === l7 ? i8 = "onfocusin" : "onblur" === l7 ? i8 = "onfocusout" : N3.test(i8) && (i8 = l7) : l7 = i8 = "oninput" : o7 && I3.test(i8) ? i8 = i8.replace(M3, "-$&").toLowerCase() : null === c7 && (c7 = void 0), "oninput" === l7 && u8[i8 = l7] && (i8 = "oninputCapture"), u8[i8] = c7;
            }
          }
          "select" == r7 && u8.multiple && Array.isArray(u8.value) && (u8.value = n4.toChildArray(e7.children).forEach(function(n5) {
            n5.props.selected = -1 != u8.value.indexOf(n5.props.value);
          })), "select" == r7 && null != u8.defaultValue && (u8.value = n4.toChildArray(e7.children).forEach(function(n5) {
            n5.props.selected = u8.multiple ? -1 != u8.defaultValue.indexOf(n5.props.value) : u8.defaultValue == n5.props.value;
          })), e7.class && !e7.className ? (u8.class = e7.class, Object.defineProperty(u8, "className", z5)) : (e7.className && !e7.class || e7.class && e7.className) && (u8.class = u8.className = e7.className), t8.props = u8;
        }(t7), t7.$$typeof = k5, B5 && B5(t7);
      };
      var H2 = n4.options.__r;
      n4.options.__r = function(n5) {
        H2 && H2(n5), P4 = n5.__c;
      };
      var q5 = n4.options.diffed;
      n4.options.diffed = function(n5) {
        q5 && q5(n5);
        var t7 = n5.props, e7 = n5.__e;
        null != e7 && "textarea" === n5.type && "value" in t7 && t7.value !== e7.value && (e7.value = null == t7.value ? "" : t7.value), P4 = null;
      };
      var Z = { ReactCurrentDispatcher: { current: { readContext: function(n5) {
        return P4.__n[n5.__c].props.value;
      }, useCallback: t6.useCallback, useContext: t6.useContext, useDebugValue: t6.useDebugValue, useDeferredValue: c6, useEffect: t6.useEffect, useId: t6.useId, useImperativeHandle: t6.useImperativeHandle, useInsertionEffect: f7, useLayoutEffect: t6.useLayoutEffect, useMemo: t6.useMemo, useReducer: t6.useReducer, useRef: t6.useRef, useState: t6.useState, useSyncExternalStore: u7, useTransition: l6 } } };
      function Y(t7) {
        return n4.createElement.bind(null, t7);
      }
      function $3(n5) {
        return !!n5 && n5.$$typeof === k5;
      }
      function G2(t7) {
        return $3(t7) && t7.type === n4.Fragment;
      }
      function J2(n5) {
        return !!n5 && !!n5.displayName && ("string" == typeof n5.displayName || n5.displayName instanceof String) && n5.displayName.startsWith("Memo(");
      }
      function K2(t7) {
        return $3(t7) ? n4.cloneElement.apply(null, arguments) : t7;
      }
      function Q2(t7) {
        return !!t7.__k && (n4.render(null, t7), true);
      }
      function X(n5) {
        return n5 && (n5.base || 1 === n5.nodeType && n5) || null;
      }
      var nn = function(n5, t7) {
        return n5(t7);
      };
      var tn = function(n5, t7) {
        return n5(t7);
      };
      var en = n4.Fragment;
      var rn = $3;
      var un = { useState: t6.useState, useId: t6.useId, useReducer: t6.useReducer, useEffect: t6.useEffect, useLayoutEffect: t6.useLayoutEffect, useInsertionEffect: f7, useTransition: l6, useDeferredValue: c6, useSyncExternalStore: u7, startTransition: i7, useRef: t6.useRef, useImperativeHandle: t6.useImperativeHandle, useMemo: t6.useMemo, useCallback: t6.useCallback, useContext: t6.useContext, useDebugValue: t6.useDebugValue, version: "18.3.1", Children: m6, render: D5, hydrate: L3, unmountComponentAtNode: Q2, createPortal: j5, createElement: n4.createElement, createContext: n4.createContext, createFactory: Y, cloneElement: K2, createRef: n4.createRef, Fragment: n4.Fragment, isValidElement: $3, isElement: rn, isFragment: G2, isMemo: J2, findDOMNode: X, Component: n4.Component, PureComponent: a6, memo: s6, forwardRef: v6, flushSync: tn, unstable_batchedUpdates: nn, StrictMode: en, Suspense: g6, SuspenseList: C5, lazy: E4, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Z };
      Object.defineProperty(exports, "Component", { enumerable: true, get: function() {
        return n4.Component;
      } }), Object.defineProperty(exports, "Fragment", { enumerable: true, get: function() {
        return n4.Fragment;
      } }), Object.defineProperty(exports, "createContext", { enumerable: true, get: function() {
        return n4.createContext;
      } }), Object.defineProperty(exports, "createElement", { enumerable: true, get: function() {
        return n4.createElement;
      } }), Object.defineProperty(exports, "createRef", { enumerable: true, get: function() {
        return n4.createRef;
      } }), exports.Children = m6, exports.PureComponent = a6, exports.StrictMode = en, exports.Suspense = g6, exports.SuspenseList = C5, exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Z, exports.cloneElement = K2, exports.createFactory = Y, exports.createPortal = j5, exports.default = un, exports.findDOMNode = X, exports.flushSync = tn, exports.forwardRef = v6, exports.hydrate = L3, exports.isElement = rn, exports.isFragment = G2, exports.isMemo = J2, exports.isValidElement = $3, exports.lazy = E4, exports.memo = s6, exports.render = D5, exports.startTransition = i7, exports.unmountComponentAtNode = Q2, exports.unstable_batchedUpdates = nn, exports.useDeferredValue = c6, exports.useInsertionEffect = f7, exports.useSyncExternalStore = u7, exports.useTransition = l6, exports.version = "18.3.1", Object.keys(t6).forEach(function(n5) {
        "default" === n5 || exports.hasOwnProperty(n5) || Object.defineProperty(exports, n5, { enumerable: true, get: function() {
          return t6[n5];
        } });
      });
    }
  });

  // apps/larry-vscode-ext/node_modules/preact/jsx-runtime/dist/jsxRuntime.js
  var require_jsxRuntime = __commonJS({
    "apps/larry-vscode-ext/node_modules/preact/jsx-runtime/dist/jsxRuntime.js"(exports) {
      var r6 = (init_preact_module(), __toCommonJS(preact_module_exports));
      var e6 = /["&<]/;
      function t6(r7) {
        if (0 === r7.length || false === e6.test(r7)) return r7;
        for (var t7 = 0, n5 = 0, o7 = "", f8 = ""; n5 < r7.length; n5++) {
          switch (r7.charCodeAt(n5)) {
            case 34:
              f8 = "&quot;";
              break;
            case 38:
              f8 = "&amp;";
              break;
            case 60:
              f8 = "&lt;";
              break;
            default:
              continue;
          }
          n5 !== t7 && (o7 += r7.slice(t7, n5)), o7 += f8, t7 = n5 + 1;
        }
        return n5 !== t7 && (o7 += r7.slice(t7, n5)), o7;
      }
      var n4 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
      var o6 = 0;
      var f7 = Array.isArray;
      function u7(e7, t7, n5, f8, u8, i8) {
        t7 || (t7 = {});
        var c7, a6, p7 = t7;
        if ("ref" in p7) for (a6 in p7 = {}, t7) "ref" == a6 ? c7 = t7[a6] : p7[a6] = t7[a6];
        var l6 = { type: e7, props: p7, key: n5, ref: c7, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --o6, __i: -1, __u: 0, __source: u8, __self: i8 };
        if ("function" == typeof e7 && (c7 = e7.defaultProps)) for (a6 in c7) void 0 === p7[a6] && (p7[a6] = c7[a6]);
        return r6.options.vnode && r6.options.vnode(l6), l6;
      }
      var i7 = {};
      var c6 = /[A-Z]/g;
      Object.defineProperty(exports, "Fragment", { enumerable: true, get: function() {
        return r6.Fragment;
      } }), exports.jsx = u7, exports.jsxAttr = function(e7, o7) {
        if (r6.options.attr) {
          var f8 = r6.options.attr(e7, o7);
          if ("string" == typeof f8) return f8;
        }
        if (o7 = function(r7) {
          return null !== r7 && "object" == typeof r7 && "function" == typeof r7.valueOf ? r7.valueOf() : r7;
        }(o7), "ref" === e7 || "key" === e7) return "";
        if ("style" === e7 && "object" == typeof o7) {
          var u8 = "";
          for (var a6 in o7) {
            var p7 = o7[a6];
            if (null != p7 && "" !== p7) {
              var l6 = "-" == a6[0] ? a6 : i7[a6] || (i7[a6] = a6.replace(c6, "-$&").toLowerCase()), s6 = ";";
              "number" != typeof p7 || l6.startsWith("--") || n4.test(l6) || (s6 = "px;"), u8 = u8 + l6 + ":" + p7 + s6;
            }
          }
          return e7 + '="' + t6(u8) + '"';
        }
        return null == o7 || false === o7 || "function" == typeof o7 || "object" == typeof o7 ? "" : true === o7 ? e7 : e7 + '="' + t6("" + o7) + '"';
      }, exports.jsxDEV = u7, exports.jsxEscape = function r7(e7) {
        if (null == e7 || "boolean" == typeof e7 || "function" == typeof e7) return null;
        if ("object" == typeof e7) {
          if (void 0 === e7.constructor) return e7;
          if (f7(e7)) {
            for (var n5 = 0; n5 < e7.length; n5++) e7[n5] = r7(e7[n5]);
            return e7;
          }
        }
        return t6("" + e7);
      }, exports.jsxTemplate = function(e7) {
        var t7 = u7(r6.Fragment, { tpl: e7, exprs: [].slice.call(arguments, 1) });
        return t7.key = t7.__v, t7;
      }, exports.jsxs = u7;
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
  function partialMatchKey(a6, b5) {
    if (a6 === b5) {
      return true;
    }
    if (typeof a6 !== typeof b5) {
      return false;
    }
    if (a6 && b5 && typeof a6 === "object" && typeof b5 === "object") {
      return Object.keys(b5).every((key) => partialMatchKey(a6[key], b5[key]));
    }
    return false;
  }
  var hasOwn = Object.prototype.hasOwnProperty;
  function replaceEqualDeep(a6, b5) {
    if (a6 === b5) {
      return a6;
    }
    const array = isPlainArray(a6) && isPlainArray(b5);
    if (!array && !(isPlainObject(a6) && isPlainObject(b5))) return b5;
    const aItems = array ? a6 : Object.keys(a6);
    const aSize = aItems.length;
    const bItems = array ? b5 : Object.keys(b5);
    const bSize = bItems.length;
    const copy = array ? new Array(bSize) : {};
    let equalItems = 0;
    for (let i7 = 0; i7 < bSize; i7++) {
      const key = array ? i7 : bItems[i7];
      const aItem = a6[key];
      const bItem = b5[key];
      if (aItem === bItem) {
        copy[key] = aItem;
        if (array ? i7 < aSize : hasOwn.call(a6, key)) equalItems++;
        continue;
      }
      if (aItem === null || bItem === null || typeof aItem !== "object" || typeof bItem !== "object") {
        copy[key] = bItem;
        continue;
      }
      const v6 = replaceEqualDeep(aItem, bItem);
      copy[key] = v6;
      if (v6 === aItem) equalItems++;
    }
    return aSize === bSize && equalItems === aSize ? a6 : copy;
  }
  function shallowEqualObjects(a6, b5) {
    if (!b5 || Object.keys(a6).length !== Object.keys(b5).length) {
      return false;
    }
    for (const key in a6) {
      if (a6[key] !== b5[key]) {
        return false;
      }
    }
    return true;
  }
  function isPlainArray(value) {
    return Array.isArray(value) && value.length === Object.keys(value).length;
  }
  function isPlainObject(o6) {
    if (!hasObjectPrototype(o6)) {
      return false;
    }
    const ctor = o6.constructor;
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
    if (Object.getPrototypeOf(o6) !== Object.prototype) {
      return false;
    }
    return true;
  }
  function hasObjectPrototype(o6) {
    return Object.prototype.toString.call(o6) === "[object Object]";
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
      var _a11;
      if (!this.hasListeners()) {
        (_a11 = __privateGet(this, _cleanup)) == null ? void 0 : _a11.call(this);
        __privateSet(this, _cleanup, void 0);
      }
    }
    setEventListener(setup) {
      var _a11;
      __privateSet(this, _setup, setup);
      (_a11 = __privateGet(this, _cleanup)) == null ? void 0 : _a11.call(this);
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
      var _a11;
      if (!this.hasListeners()) {
        (_a11 = __privateGet(this, _cleanup2)) == null ? void 0 : _a11.call(this);
        __privateSet(this, _cleanup2, void 0);
      }
    }
    setEventListener(setup) {
      var _a11;
      __privateSet(this, _setup2, setup);
      (_a11 = __privateGet(this, _cleanup2)) == null ? void 0 : _a11.call(this);
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
      const observer = this.observers.find((x5) => x5.shouldFetchOnWindowFocus());
      observer?.refetch({ cancelRefetch: false });
      __privateGet(this, _retryer)?.continue();
    }
    onOnline() {
      const observer = this.observers.find((x5) => x5.shouldFetchOnReconnect());
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
        this.observers = this.observers.filter((x5) => x5 !== observer);
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
        const observer = this.observers.find((x5) => x5.options.queryFn);
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
      __privateSet(this, _observers, __privateGet(this, _observers).filter((x5) => x5 !== observer));
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
              const index = scopedMutations.indexOf(mutation);
              if (index !== -1) {
                scopedMutations.splice(index, 1);
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
          (m6) => m6.state.status === "pending"
        );
        return !firstPendingMutation || firstPendingMutation === mutation;
      } else {
        return true;
      }
    }
    runNext(mutation) {
      const scope = scopeFor(mutation);
      if (typeof scope === "string") {
        const foundMutation = __privateGet(this, _scopes).get(scope)?.find((m6) => m6 !== mutation && m6.state.isPaused);
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
      const pausedMutations = this.getAll().filter((x5) => x5.state.isPaused);
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
      var _a11, _b;
      __privateWrapper(this, _mountCount)._--;
      if (__privateGet(this, _mountCount) !== 0) return;
      (_a11 = __privateGet(this, _unsubscribeFocus)) == null ? void 0 : _a11.call(this);
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
  var useQueryClient = (queryClient3) => {
    const client = React.useContext(QueryClientContext);
    if (queryClient3) {
      return queryClient3;
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
  function useBaseQuery(options, Observer, queryClient3) {
    if (true) {
      if (typeof options !== "object" || Array.isArray(options)) {
        throw new Error(
          'Bad argument type. Starting with v5, only the "Object" form is allowed when calling query related functions. Please use the error stack to find the culprit call. More info here: https://tanstack.com/query/latest/docs/react/guides/migrating-to-v5#supports-a-single-signature-one-object'
        );
      }
    }
    const isRestoring = useIsRestoring();
    const errorResetBoundary = useQueryErrorResetBoundary();
    const client = useQueryClient(queryClient3);
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
  function useQuery(options, queryClient3) {
    return useBaseQuery(options, QueryObserver, queryClient3);
  }

  // apps/larry-vscode-ext/webview/src/views/AppRoot.tsx
  init_hooks_module();

  // node_modules/preact/dist/preact.module.js
  var n2;
  var l3;
  var u3;
  var t3;
  var i3;
  var r3;
  var o3;
  var e3;
  var f3;
  var c3;
  var s3;
  var a3;
  var h3;
  var p3 = {};
  var v3 = [];
  var y3 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  var w3 = Array.isArray;
  function d3(n4, l6) {
    for (var u7 in l6) n4[u7] = l6[u7];
    return n4;
  }
  function g3(n4) {
    n4 && n4.parentNode && n4.parentNode.removeChild(n4);
  }
  function m3(n4, t6, i7, r6, o6) {
    var e6 = { type: n4, props: t6, key: i7, ref: r6, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o6 ? ++u3 : o6, __i: -1, __u: 0 };
    return null == o6 && null != l3.vnode && l3.vnode(e6), e6;
  }
  function k3(n4) {
    return n4.children;
  }
  function x3(n4, l6) {
    this.props = n4, this.context = l6;
  }
  function S2(n4, l6) {
    if (null == l6) return n4.__ ? S2(n4.__, n4.__i + 1) : null;
    for (var u7; l6 < n4.__k.length; l6++) if (null != (u7 = n4.__k[l6]) && null != u7.__e) return u7.__e;
    return "function" == typeof n4.type ? S2(n4) : null;
  }
  function C3(n4) {
    var l6, u7;
    if (null != (n4 = n4.__) && null != n4.__c) {
      for (n4.__e = n4.__c.base = null, l6 = 0; l6 < n4.__k.length; l6++) if (null != (u7 = n4.__k[l6]) && null != u7.__e) {
        n4.__e = n4.__c.base = u7.__e;
        break;
      }
      return C3(n4);
    }
  }
  function M2(n4) {
    (!n4.__d && (n4.__d = true) && i3.push(n4) && !$2.__r++ || r3 != l3.debounceRendering) && ((r3 = l3.debounceRendering) || o3)($2);
  }
  function $2() {
    for (var n4, u7, t6, r6, o6, f7, c6, s6 = 1; i3.length; ) i3.length > s6 && i3.sort(e3), n4 = i3.shift(), s6 = i3.length, n4.__d && (t6 = void 0, r6 = void 0, o6 = (r6 = (u7 = n4).__v).__e, f7 = [], c6 = [], u7.__P && ((t6 = d3({}, r6)).__v = r6.__v + 1, l3.vnode && l3.vnode(t6), O2(u7.__P, t6, r6, u7.__n, u7.__P.namespaceURI, 32 & r6.__u ? [o6] : null, f7, null == o6 ? S2(r6) : o6, !!(32 & r6.__u), c6), t6.__v = r6.__v, t6.__.__k[t6.__i] = t6, N2(f7, t6, c6), r6.__e = r6.__ = null, t6.__e != o6 && C3(t6)));
    $2.__r = 0;
  }
  function I2(n4, l6, u7, t6, i7, r6, o6, e6, f7, c6, s6) {
    var a6, h7, y7, w7, d6, g6, _5, m6 = t6 && t6.__k || v3, b5 = l6.length;
    for (f7 = P3(u7, l6, m6, f7, b5), a6 = 0; a6 < b5; a6++) null != (y7 = u7.__k[a6]) && (h7 = -1 == y7.__i ? p3 : m6[y7.__i] || p3, y7.__i = a6, g6 = O2(n4, y7, h7, i7, r6, o6, e6, f7, c6, s6), w7 = y7.__e, y7.ref && h7.ref != y7.ref && (h7.ref && B3(h7.ref, null, y7), s6.push(y7.ref, y7.__c || w7, y7)), null == d6 && null != w7 && (d6 = w7), (_5 = !!(4 & y7.__u)) || h7.__k === y7.__k ? f7 = A3(y7, f7, n4, _5) : "function" == typeof y7.type && void 0 !== g6 ? f7 = g6 : w7 && (f7 = w7.nextSibling), y7.__u &= -7);
    return u7.__e = d6, f7;
  }
  function P3(n4, l6, u7, t6, i7) {
    var r6, o6, e6, f7, c6, s6 = u7.length, a6 = s6, h7 = 0;
    for (n4.__k = new Array(i7), r6 = 0; r6 < i7; r6++) null != (o6 = l6[r6]) && "boolean" != typeof o6 && "function" != typeof o6 ? (f7 = r6 + h7, (o6 = n4.__k[r6] = "string" == typeof o6 || "number" == typeof o6 || "bigint" == typeof o6 || o6.constructor == String ? m3(null, o6, null, null, null) : w3(o6) ? m3(k3, { children: o6 }, null, null, null) : null == o6.constructor && o6.__b > 0 ? m3(o6.type, o6.props, o6.key, o6.ref ? o6.ref : null, o6.__v) : o6).__ = n4, o6.__b = n4.__b + 1, e6 = null, -1 != (c6 = o6.__i = L2(o6, u7, f7, a6)) && (a6--, (e6 = u7[c6]) && (e6.__u |= 2)), null == e6 || null == e6.__v ? (-1 == c6 && (i7 > s6 ? h7-- : i7 < s6 && h7++), "function" != typeof o6.type && (o6.__u |= 4)) : c6 != f7 && (c6 == f7 - 1 ? h7-- : c6 == f7 + 1 ? h7++ : (c6 > f7 ? h7-- : h7++, o6.__u |= 4))) : n4.__k[r6] = null;
    if (a6) for (r6 = 0; r6 < s6; r6++) null != (e6 = u7[r6]) && 0 == (2 & e6.__u) && (e6.__e == t6 && (t6 = S2(e6)), D3(e6, e6));
    return t6;
  }
  function A3(n4, l6, u7, t6) {
    var i7, r6;
    if ("function" == typeof n4.type) {
      for (i7 = n4.__k, r6 = 0; i7 && r6 < i7.length; r6++) i7[r6] && (i7[r6].__ = n4, l6 = A3(i7[r6], l6, u7, t6));
      return l6;
    }
    n4.__e != l6 && (t6 && (l6 && n4.type && !l6.parentNode && (l6 = S2(n4)), u7.insertBefore(n4.__e, l6 || null)), l6 = n4.__e);
    do {
      l6 = l6 && l6.nextSibling;
    } while (null != l6 && 8 == l6.nodeType);
    return l6;
  }
  function L2(n4, l6, u7, t6) {
    var i7, r6, o6, e6 = n4.key, f7 = n4.type, c6 = l6[u7], s6 = null != c6 && 0 == (2 & c6.__u);
    if (null === c6 && null == n4.key || s6 && e6 == c6.key && f7 == c6.type) return u7;
    if (t6 > (s6 ? 1 : 0)) {
      for (i7 = u7 - 1, r6 = u7 + 1; i7 >= 0 || r6 < l6.length; ) if (null != (c6 = l6[o6 = i7 >= 0 ? i7-- : r6++]) && 0 == (2 & c6.__u) && e6 == c6.key && f7 == c6.type) return o6;
    }
    return -1;
  }
  function T3(n4, l6, u7) {
    "-" == l6[0] ? n4.setProperty(l6, null == u7 ? "" : u7) : n4[l6] = null == u7 ? "" : "number" != typeof u7 || y3.test(l6) ? u7 : u7 + "px";
  }
  function j3(n4, l6, u7, t6, i7) {
    var r6, o6;
    n: if ("style" == l6) if ("string" == typeof u7) n4.style.cssText = u7;
    else {
      if ("string" == typeof t6 && (n4.style.cssText = t6 = ""), t6) for (l6 in t6) u7 && l6 in u7 || T3(n4.style, l6, "");
      if (u7) for (l6 in u7) t6 && u7[l6] == t6[l6] || T3(n4.style, l6, u7[l6]);
    }
    else if ("o" == l6[0] && "n" == l6[1]) r6 = l6 != (l6 = l6.replace(f3, "$1")), o6 = l6.toLowerCase(), l6 = o6 in n4 || "onFocusOut" == l6 || "onFocusIn" == l6 ? o6.slice(2) : l6.slice(2), n4.l || (n4.l = {}), n4.l[l6 + r6] = u7, u7 ? t6 ? u7.u = t6.u : (u7.u = c3, n4.addEventListener(l6, r6 ? a3 : s3, r6)) : n4.removeEventListener(l6, r6 ? a3 : s3, r6);
    else {
      if ("http://www.w3.org/2000/svg" == i7) l6 = l6.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != l6 && "height" != l6 && "href" != l6 && "list" != l6 && "form" != l6 && "tabIndex" != l6 && "download" != l6 && "rowSpan" != l6 && "colSpan" != l6 && "role" != l6 && "popover" != l6 && l6 in n4) try {
        n4[l6] = null == u7 ? "" : u7;
        break n;
      } catch (n5) {
      }
      "function" == typeof u7 || (null == u7 || false === u7 && "-" != l6[4] ? n4.removeAttribute(l6) : n4.setAttribute(l6, "popover" == l6 && 1 == u7 ? "" : u7));
    }
  }
  function F3(n4) {
    return function(u7) {
      if (this.l) {
        var t6 = this.l[u7.type + n4];
        if (null == u7.t) u7.t = c3++;
        else if (u7.t < t6.u) return;
        return t6(l3.event ? l3.event(u7) : u7);
      }
    };
  }
  function O2(n4, u7, t6, i7, r6, o6, e6, f7, c6, s6) {
    var a6, h7, p7, v6, y7, _5, m6, b5, S3, C5, M3, $3, P4, A5, H2, L3, T5, j5 = u7.type;
    if (null != u7.constructor) return null;
    128 & t6.__u && (c6 = !!(32 & t6.__u), o6 = [f7 = u7.__e = t6.__e]), (a6 = l3.__b) && a6(u7);
    n: if ("function" == typeof j5) try {
      if (b5 = u7.props, S3 = "prototype" in j5 && j5.prototype.render, C5 = (a6 = j5.contextType) && i7[a6.__c], M3 = a6 ? C5 ? C5.props.value : a6.__ : i7, t6.__c ? m6 = (h7 = u7.__c = t6.__c).__ = h7.__E : (S3 ? u7.__c = h7 = new j5(b5, M3) : (u7.__c = h7 = new x3(b5, M3), h7.constructor = j5, h7.render = E2), C5 && C5.sub(h7), h7.props = b5, h7.state || (h7.state = {}), h7.context = M3, h7.__n = i7, p7 = h7.__d = true, h7.__h = [], h7._sb = []), S3 && null == h7.__s && (h7.__s = h7.state), S3 && null != j5.getDerivedStateFromProps && (h7.__s == h7.state && (h7.__s = d3({}, h7.__s)), d3(h7.__s, j5.getDerivedStateFromProps(b5, h7.__s))), v6 = h7.props, y7 = h7.state, h7.__v = u7, p7) S3 && null == j5.getDerivedStateFromProps && null != h7.componentWillMount && h7.componentWillMount(), S3 && null != h7.componentDidMount && h7.__h.push(h7.componentDidMount);
      else {
        if (S3 && null == j5.getDerivedStateFromProps && b5 !== v6 && null != h7.componentWillReceiveProps && h7.componentWillReceiveProps(b5, M3), !h7.__e && null != h7.shouldComponentUpdate && false === h7.shouldComponentUpdate(b5, h7.__s, M3) || u7.__v == t6.__v) {
          for (u7.__v != t6.__v && (h7.props = b5, h7.state = h7.__s, h7.__d = false), u7.__e = t6.__e, u7.__k = t6.__k, u7.__k.some(function(n5) {
            n5 && (n5.__ = u7);
          }), $3 = 0; $3 < h7._sb.length; $3++) h7.__h.push(h7._sb[$3]);
          h7._sb = [], h7.__h.length && e6.push(h7);
          break n;
        }
        null != h7.componentWillUpdate && h7.componentWillUpdate(b5, h7.__s, M3), S3 && null != h7.componentDidUpdate && h7.__h.push(function() {
          h7.componentDidUpdate(v6, y7, _5);
        });
      }
      if (h7.context = M3, h7.props = b5, h7.__P = n4, h7.__e = false, P4 = l3.__r, A5 = 0, S3) {
        for (h7.state = h7.__s, h7.__d = false, P4 && P4(u7), a6 = h7.render(h7.props, h7.state, h7.context), H2 = 0; H2 < h7._sb.length; H2++) h7.__h.push(h7._sb[H2]);
        h7._sb = [];
      } else do {
        h7.__d = false, P4 && P4(u7), a6 = h7.render(h7.props, h7.state, h7.context), h7.state = h7.__s;
      } while (h7.__d && ++A5 < 25);
      h7.state = h7.__s, null != h7.getChildContext && (i7 = d3(d3({}, i7), h7.getChildContext())), S3 && !p7 && null != h7.getSnapshotBeforeUpdate && (_5 = h7.getSnapshotBeforeUpdate(v6, y7)), L3 = a6, null != a6 && a6.type === k3 && null == a6.key && (L3 = V2(a6.props.children)), f7 = I2(n4, w3(L3) ? L3 : [L3], u7, t6, i7, r6, o6, e6, f7, c6, s6), h7.base = u7.__e, u7.__u &= -161, h7.__h.length && e6.push(h7), m6 && (h7.__E = h7.__ = null);
    } catch (n5) {
      if (u7.__v = null, c6 || null != o6) if (n5.then) {
        for (u7.__u |= c6 ? 160 : 128; f7 && 8 == f7.nodeType && f7.nextSibling; ) f7 = f7.nextSibling;
        o6[o6.indexOf(f7)] = null, u7.__e = f7;
      } else {
        for (T5 = o6.length; T5--; ) g3(o6[T5]);
        z3(u7);
      }
      else u7.__e = t6.__e, u7.__k = t6.__k, n5.then || z3(u7);
      l3.__e(n5, u7, t6);
    }
    else null == o6 && u7.__v == t6.__v ? (u7.__k = t6.__k, u7.__e = t6.__e) : f7 = u7.__e = q3(t6.__e, u7, t6, i7, r6, o6, e6, c6, s6);
    return (a6 = l3.diffed) && a6(u7), 128 & u7.__u ? void 0 : f7;
  }
  function z3(n4) {
    n4 && n4.__c && (n4.__c.__e = true), n4 && n4.__k && n4.__k.forEach(z3);
  }
  function N2(n4, u7, t6) {
    for (var i7 = 0; i7 < t6.length; i7++) B3(t6[i7], t6[++i7], t6[++i7]);
    l3.__c && l3.__c(u7, n4), n4.some(function(u8) {
      try {
        n4 = u8.__h, u8.__h = [], n4.some(function(n5) {
          n5.call(u8);
        });
      } catch (n5) {
        l3.__e(n5, u8.__v);
      }
    });
  }
  function V2(n4) {
    return "object" != typeof n4 || null == n4 || n4.__b && n4.__b > 0 ? n4 : w3(n4) ? n4.map(V2) : d3({}, n4);
  }
  function q3(u7, t6, i7, r6, o6, e6, f7, c6, s6) {
    var a6, h7, v6, y7, d6, _5, m6, b5 = i7.props, k5 = t6.props, x5 = t6.type;
    if ("svg" == x5 ? o6 = "http://www.w3.org/2000/svg" : "math" == x5 ? o6 = "http://www.w3.org/1998/Math/MathML" : o6 || (o6 = "http://www.w3.org/1999/xhtml"), null != e6) {
      for (a6 = 0; a6 < e6.length; a6++) if ((d6 = e6[a6]) && "setAttribute" in d6 == !!x5 && (x5 ? d6.localName == x5 : 3 == d6.nodeType)) {
        u7 = d6, e6[a6] = null;
        break;
      }
    }
    if (null == u7) {
      if (null == x5) return document.createTextNode(k5);
      u7 = document.createElementNS(o6, x5, k5.is && k5), c6 && (l3.__m && l3.__m(t6, e6), c6 = false), e6 = null;
    }
    if (null == x5) b5 === k5 || c6 && u7.data == k5 || (u7.data = k5);
    else {
      if (e6 = e6 && n2.call(u7.childNodes), b5 = i7.props || p3, !c6 && null != e6) for (b5 = {}, a6 = 0; a6 < u7.attributes.length; a6++) b5[(d6 = u7.attributes[a6]).name] = d6.value;
      for (a6 in b5) if (d6 = b5[a6], "children" == a6) ;
      else if ("dangerouslySetInnerHTML" == a6) v6 = d6;
      else if (!(a6 in k5)) {
        if ("value" == a6 && "defaultValue" in k5 || "checked" == a6 && "defaultChecked" in k5) continue;
        j3(u7, a6, null, d6, o6);
      }
      for (a6 in k5) d6 = k5[a6], "children" == a6 ? y7 = d6 : "dangerouslySetInnerHTML" == a6 ? h7 = d6 : "value" == a6 ? _5 = d6 : "checked" == a6 ? m6 = d6 : c6 && "function" != typeof d6 || b5[a6] === d6 || j3(u7, a6, d6, b5[a6], o6);
      if (h7) c6 || v6 && (h7.__html == v6.__html || h7.__html == u7.innerHTML) || (u7.innerHTML = h7.__html), t6.__k = [];
      else if (v6 && (u7.innerHTML = ""), I2("template" == t6.type ? u7.content : u7, w3(y7) ? y7 : [y7], t6, i7, r6, "foreignObject" == x5 ? "http://www.w3.org/1999/xhtml" : o6, e6, f7, e6 ? e6[0] : i7.__k && S2(i7, 0), c6, s6), null != e6) for (a6 = e6.length; a6--; ) g3(e6[a6]);
      c6 || (a6 = "value", "progress" == x5 && null == _5 ? u7.removeAttribute("value") : null != _5 && (_5 !== u7[a6] || "progress" == x5 && !_5 || "option" == x5 && _5 != b5[a6]) && j3(u7, a6, _5, b5[a6], o6), a6 = "checked", null != m6 && m6 != u7[a6] && j3(u7, a6, m6, b5[a6], o6));
    }
    return u7;
  }
  function B3(n4, u7, t6) {
    try {
      if ("function" == typeof n4) {
        var i7 = "function" == typeof n4.__u;
        i7 && n4.__u(), i7 && null == u7 || (n4.__u = n4(u7));
      } else n4.current = u7;
    } catch (n5) {
      l3.__e(n5, t6);
    }
  }
  function D3(n4, u7, t6) {
    var i7, r6;
    if (l3.unmount && l3.unmount(n4), (i7 = n4.ref) && (i7.current && i7.current != n4.__e || B3(i7, null, u7)), null != (i7 = n4.__c)) {
      if (i7.componentWillUnmount) try {
        i7.componentWillUnmount();
      } catch (n5) {
        l3.__e(n5, u7);
      }
      i7.base = i7.__P = null;
    }
    if (i7 = n4.__k) for (r6 = 0; r6 < i7.length; r6++) i7[r6] && D3(i7[r6], u7, t6 || "function" != typeof n4.type);
    t6 || g3(n4.__e), n4.__c = n4.__ = n4.__e = void 0;
  }
  function E2(n4, l6, u7) {
    return this.constructor(n4, u7);
  }
  n2 = v3.slice, l3 = { __e: function(n4, l6, u7, t6) {
    for (var i7, r6, o6; l6 = l6.__; ) if ((i7 = l6.__c) && !i7.__) try {
      if ((r6 = i7.constructor) && null != r6.getDerivedStateFromError && (i7.setState(r6.getDerivedStateFromError(n4)), o6 = i7.__d), null != i7.componentDidCatch && (i7.componentDidCatch(n4, t6 || {}), o6 = i7.__d), o6) return i7.__E = i7;
    } catch (l7) {
      n4 = l7;
    }
    throw n4;
  } }, u3 = 0, t3 = function(n4) {
    return null != n4 && null == n4.constructor;
  }, x3.prototype.setState = function(n4, l6) {
    var u7;
    u7 = null != this.__s && this.__s != this.state ? this.__s : this.__s = d3({}, this.state), "function" == typeof n4 && (n4 = n4(d3({}, u7), this.props)), n4 && d3(u7, n4), null != n4 && this.__v && (l6 && this._sb.push(l6), M2(this));
  }, x3.prototype.forceUpdate = function(n4) {
    this.__v && (this.__e = true, n4 && this.__h.push(n4), M2(this));
  }, x3.prototype.render = k3, i3 = [], o3 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e3 = function(n4, l6) {
    return n4.__v.__b - l6.__v.__b;
  }, $2.__r = 0, f3 = /(PointerCapture)$|Capture$/i, c3 = 0, s3 = F3(false), a3 = F3(true), h3 = 0;

  // node_modules/preact/hooks/dist/hooks.module.js
  var t4;
  var r4;
  var u4;
  var i4;
  var o4 = 0;
  var f4 = [];
  var c4 = l3;
  var e4 = c4.__b;
  var a4 = c4.__r;
  var v4 = c4.diffed;
  var l4 = c4.__c;
  var m4 = c4.unmount;
  var s4 = c4.__;
  function p4(n4, t6) {
    c4.__h && c4.__h(r4, n4, o4 || t6), o4 = 0;
    var u7 = r4.__H || (r4.__H = { __: [], __h: [] });
    return n4 >= u7.__.length && u7.__.push({}), u7.__[n4];
  }
  function d4(n4) {
    return o4 = 1, h4(D4, n4);
  }
  function h4(n4, u7, i7) {
    var o6 = p4(t4++, 2);
    if (o6.t = n4, !o6.__c && (o6.__ = [i7 ? i7(u7) : D4(void 0, u7), function(n5) {
      var t6 = o6.__N ? o6.__N[0] : o6.__[0], r6 = o6.t(t6, n5);
      t6 !== r6 && (o6.__N = [r6, o6.__[1]], o6.__c.setState({}));
    }], o6.__c = r4, !r4.__f)) {
      var f7 = function(n5, t6, r6) {
        if (!o6.__c.__H) return true;
        var u8 = o6.__c.__H.__.filter(function(n6) {
          return !!n6.__c;
        });
        if (u8.every(function(n6) {
          return !n6.__N;
        })) return !c6 || c6.call(this, n5, t6, r6);
        var i8 = o6.__c.props !== n5;
        return u8.forEach(function(n6) {
          if (n6.__N) {
            var t7 = n6.__[0];
            n6.__ = n6.__N, n6.__N = void 0, t7 !== n6.__[0] && (i8 = true);
          }
        }), c6 && c6.call(this, n5, t6, r6) || i8;
      };
      r4.__f = true;
      var c6 = r4.shouldComponentUpdate, e6 = r4.componentWillUpdate;
      r4.componentWillUpdate = function(n5, t6, r6) {
        if (this.__e) {
          var u8 = c6;
          c6 = void 0, f7(n5, t6, r6), c6 = u8;
        }
        e6 && e6.call(this, n5, t6, r6);
      }, r4.shouldComponentUpdate = f7;
    }
    return o6.__N || o6.__;
  }
  function T4(n4, r6) {
    var u7 = p4(t4++, 7);
    return C4(u7.__H, r6) && (u7.__ = n4(), u7.__H = r6, u7.__h = n4), u7.__;
  }
  function j4() {
    for (var n4; n4 = f4.shift(); ) if (n4.__P && n4.__H) try {
      n4.__H.__h.forEach(z4), n4.__H.__h.forEach(B4), n4.__H.__h = [];
    } catch (t6) {
      n4.__H.__h = [], c4.__e(t6, n4.__v);
    }
  }
  c4.__b = function(n4) {
    r4 = null, e4 && e4(n4);
  }, c4.__ = function(n4, t6) {
    n4 && t6.__k && t6.__k.__m && (n4.__m = t6.__k.__m), s4 && s4(n4, t6);
  }, c4.__r = function(n4) {
    a4 && a4(n4), t4 = 0;
    var i7 = (r4 = n4.__c).__H;
    i7 && (u4 === r4 ? (i7.__h = [], r4.__h = [], i7.__.forEach(function(n5) {
      n5.__N && (n5.__ = n5.__N), n5.u = n5.__N = void 0;
    })) : (i7.__h.forEach(z4), i7.__h.forEach(B4), i7.__h = [], t4 = 0)), u4 = r4;
  }, c4.diffed = function(n4) {
    v4 && v4(n4);
    var t6 = n4.__c;
    t6 && t6.__H && (t6.__H.__h.length && (1 !== f4.push(t6) && i4 === c4.requestAnimationFrame || ((i4 = c4.requestAnimationFrame) || w4)(j4)), t6.__H.__.forEach(function(n5) {
      n5.u && (n5.__H = n5.u), n5.u = void 0;
    })), u4 = r4 = null;
  }, c4.__c = function(n4, t6) {
    t6.some(function(n5) {
      try {
        n5.__h.forEach(z4), n5.__h = n5.__h.filter(function(n6) {
          return !n6.__ || B4(n6);
        });
      } catch (r6) {
        t6.some(function(n6) {
          n6.__h && (n6.__h = []);
        }), t6 = [], c4.__e(r6, n5.__v);
      }
    }), l4 && l4(n4, t6);
  }, c4.unmount = function(n4) {
    m4 && m4(n4);
    var t6, r6 = n4.__c;
    r6 && r6.__H && (r6.__H.__.forEach(function(n5) {
      try {
        z4(n5);
      } catch (n6) {
        t6 = n6;
      }
    }), r6.__H = void 0, t6 && c4.__e(t6, r6.__v));
  };
  var k4 = "function" == typeof requestAnimationFrame;
  function w4(n4) {
    var t6, r6 = function() {
      clearTimeout(u7), k4 && cancelAnimationFrame(t6), setTimeout(n4);
    }, u7 = setTimeout(r6, 35);
    k4 && (t6 = requestAnimationFrame(r6));
  }
  function z4(n4) {
    var t6 = r4, u7 = n4.__c;
    "function" == typeof u7 && (n4.__c = void 0, u7()), r4 = t6;
  }
  function B4(n4) {
    var t6 = r4;
    n4.__c = n4.__(), r4 = t6;
  }
  function C4(n4, t6) {
    return !n4 || n4.length !== t6.length || t6.some(function(t7, r6) {
      return t7 !== n4[r6];
    });
  }
  function D4(n4, t6) {
    return "function" == typeof t6 ? t6(n4) : t6;
  }

  // node_modules/@preact/signals-core/dist/signals-core.module.js
  var i5 = Symbol.for("preact-signals");
  function t5() {
    if (!(s5 > 1)) {
      var i7, t6 = false;
      while (void 0 !== h5) {
        var r6 = h5;
        h5 = void 0;
        f5++;
        while (void 0 !== r6) {
          var o6 = r6.o;
          r6.o = void 0;
          r6.f &= -3;
          if (!(8 & r6.f) && c5(r6)) try {
            r6.c();
          } catch (r7) {
            if (!t6) {
              i7 = r7;
              t6 = true;
            }
          }
          r6 = o6;
        }
      }
      f5 = 0;
      s5--;
      if (t6) throw i7;
    } else s5--;
  }
  function r5(i7) {
    if (s5 > 0) return i7();
    s5++;
    try {
      return i7();
    } finally {
      t5();
    }
  }
  var o5 = void 0;
  function n3(i7) {
    var t6 = o5;
    o5 = void 0;
    try {
      return i7();
    } finally {
      o5 = t6;
    }
  }
  var h5 = void 0;
  var s5 = 0;
  var f5 = 0;
  var v5 = 0;
  function e5(i7) {
    if (void 0 !== o5) {
      var t6 = i7.n;
      if (void 0 === t6 || t6.t !== o5) {
        t6 = { i: 0, S: i7, p: o5.s, n: void 0, t: o5, e: void 0, x: void 0, r: t6 };
        if (void 0 !== o5.s) o5.s.n = t6;
        o5.s = t6;
        i7.n = t6;
        if (32 & o5.f) i7.S(t6);
        return t6;
      } else if (-1 === t6.i) {
        t6.i = 0;
        if (void 0 !== t6.n) {
          t6.n.p = t6.p;
          if (void 0 !== t6.p) t6.p.n = t6.n;
          t6.p = o5.s;
          t6.n = void 0;
          o5.s.n = t6;
          o5.s = t6;
        }
        return t6;
      }
    }
  }
  function u5(i7, t6) {
    this.v = i7;
    this.i = 0;
    this.n = void 0;
    this.t = void 0;
    this.W = null == t6 ? void 0 : t6.watched;
    this.Z = null == t6 ? void 0 : t6.unwatched;
    this.name = null == t6 ? void 0 : t6.name;
  }
  u5.prototype.brand = i5;
  u5.prototype.h = function() {
    return true;
  };
  u5.prototype.S = function(i7) {
    var t6 = this, r6 = this.t;
    if (r6 !== i7 && void 0 === i7.e) {
      i7.x = r6;
      this.t = i7;
      if (void 0 !== r6) r6.e = i7;
      else n3(function() {
        var i8;
        null == (i8 = t6.W) || i8.call(t6);
      });
    }
  };
  u5.prototype.U = function(i7) {
    var t6 = this;
    if (void 0 !== this.t) {
      var r6 = i7.e, o6 = i7.x;
      if (void 0 !== r6) {
        r6.x = o6;
        i7.e = void 0;
      }
      if (void 0 !== o6) {
        o6.e = r6;
        i7.x = void 0;
      }
      if (i7 === this.t) {
        this.t = o6;
        if (void 0 === o6) n3(function() {
          var i8;
          null == (i8 = t6.Z) || i8.call(t6);
        });
      }
    }
  };
  u5.prototype.subscribe = function(i7) {
    var t6 = this;
    return E3(function() {
      var r6 = t6.value, n4 = o5;
      o5 = void 0;
      try {
        i7(r6);
      } finally {
        o5 = n4;
      }
    }, { name: "sub" });
  };
  u5.prototype.valueOf = function() {
    return this.value;
  };
  u5.prototype.toString = function() {
    return this.value + "";
  };
  u5.prototype.toJSON = function() {
    return this.value;
  };
  u5.prototype.peek = function() {
    var i7 = o5;
    o5 = void 0;
    try {
      return this.value;
    } finally {
      o5 = i7;
    }
  };
  Object.defineProperty(u5.prototype, "value", { get: function() {
    var i7 = e5(this);
    if (void 0 !== i7) i7.i = this.i;
    return this.v;
  }, set: function(i7) {
    if (i7 !== this.v) {
      if (f5 > 100) throw new Error("Cycle detected");
      this.v = i7;
      this.i++;
      v5++;
      s5++;
      try {
        for (var r6 = this.t; void 0 !== r6; r6 = r6.x) r6.t.N();
      } finally {
        t5();
      }
    }
  } });
  function d5(i7, t6) {
    return new u5(i7, t6);
  }
  function c5(i7) {
    for (var t6 = i7.s; void 0 !== t6; t6 = t6.n) if (t6.S.i !== t6.i || !t6.S.h() || t6.S.i !== t6.i) return true;
    return false;
  }
  function a5(i7) {
    for (var t6 = i7.s; void 0 !== t6; t6 = t6.n) {
      var r6 = t6.S.n;
      if (void 0 !== r6) t6.r = r6;
      t6.S.n = t6;
      t6.i = -1;
      if (void 0 === t6.n) {
        i7.s = t6;
        break;
      }
    }
  }
  function l5(i7) {
    var t6 = i7.s, r6 = void 0;
    while (void 0 !== t6) {
      var o6 = t6.p;
      if (-1 === t6.i) {
        t6.S.U(t6);
        if (void 0 !== o6) o6.n = t6.n;
        if (void 0 !== t6.n) t6.n.p = o6;
      } else r6 = t6;
      t6.S.n = t6.r;
      if (void 0 !== t6.r) t6.r = void 0;
      t6 = o6;
    }
    i7.s = r6;
  }
  function y4(i7, t6) {
    u5.call(this, void 0);
    this.x = i7;
    this.s = void 0;
    this.g = v5 - 1;
    this.f = 4;
    this.W = null == t6 ? void 0 : t6.watched;
    this.Z = null == t6 ? void 0 : t6.unwatched;
    this.name = null == t6 ? void 0 : t6.name;
  }
  y4.prototype = new u5();
  y4.prototype.h = function() {
    this.f &= -3;
    if (1 & this.f) return false;
    if (32 == (36 & this.f)) return true;
    this.f &= -5;
    if (this.g === v5) return true;
    this.g = v5;
    this.f |= 1;
    if (this.i > 0 && !c5(this)) {
      this.f &= -2;
      return true;
    }
    var i7 = o5;
    try {
      a5(this);
      o5 = this;
      var t6 = this.x();
      if (16 & this.f || this.v !== t6 || 0 === this.i) {
        this.v = t6;
        this.f &= -17;
        this.i++;
      }
    } catch (i8) {
      this.v = i8;
      this.f |= 16;
      this.i++;
    }
    o5 = i7;
    l5(this);
    this.f &= -2;
    return true;
  };
  y4.prototype.S = function(i7) {
    if (void 0 === this.t) {
      this.f |= 36;
      for (var t6 = this.s; void 0 !== t6; t6 = t6.n) t6.S.S(t6);
    }
    u5.prototype.S.call(this, i7);
  };
  y4.prototype.U = function(i7) {
    if (void 0 !== this.t) {
      u5.prototype.U.call(this, i7);
      if (void 0 === this.t) {
        this.f &= -33;
        for (var t6 = this.s; void 0 !== t6; t6 = t6.n) t6.S.U(t6);
      }
    }
  };
  y4.prototype.N = function() {
    if (!(2 & this.f)) {
      this.f |= 6;
      for (var i7 = this.t; void 0 !== i7; i7 = i7.x) i7.t.N();
    }
  };
  Object.defineProperty(y4.prototype, "value", { get: function() {
    if (1 & this.f) throw new Error("Cycle detected");
    var i7 = e5(this);
    this.h();
    if (void 0 !== i7) i7.i = this.i;
    if (16 & this.f) throw this.v;
    return this.v;
  } });
  function w5(i7, t6) {
    return new y4(i7, t6);
  }
  function _3(i7) {
    var r6 = i7.u;
    i7.u = void 0;
    if ("function" == typeof r6) {
      s5++;
      var n4 = o5;
      o5 = void 0;
      try {
        r6();
      } catch (t6) {
        i7.f &= -2;
        i7.f |= 8;
        b3(i7);
        throw t6;
      } finally {
        o5 = n4;
        t5();
      }
    }
  }
  function b3(i7) {
    for (var t6 = i7.s; void 0 !== t6; t6 = t6.n) t6.S.U(t6);
    i7.x = void 0;
    i7.s = void 0;
    _3(i7);
  }
  function g4(i7) {
    if (o5 !== this) throw new Error("Out-of-order effect");
    l5(this);
    o5 = i7;
    this.f &= -2;
    if (8 & this.f) b3(this);
    t5();
  }
  function p5(i7, t6) {
    this.x = i7;
    this.u = void 0;
    this.s = void 0;
    this.o = void 0;
    this.f = 32;
    this.name = null == t6 ? void 0 : t6.name;
  }
  p5.prototype.c = function() {
    var i7 = this.S();
    try {
      if (8 & this.f) return;
      if (void 0 === this.x) return;
      var t6 = this.x();
      if ("function" == typeof t6) this.u = t6;
    } finally {
      i7();
    }
  };
  p5.prototype.S = function() {
    if (1 & this.f) throw new Error("Cycle detected");
    this.f |= 1;
    this.f &= -9;
    _3(this);
    a5(this);
    s5++;
    var i7 = o5;
    o5 = this;
    return g4.bind(this, i7);
  };
  p5.prototype.N = function() {
    if (!(2 & this.f)) {
      this.f |= 2;
      this.o = h5;
      h5 = this;
    }
  };
  p5.prototype.d = function() {
    this.f |= 8;
    if (!(1 & this.f)) b3(this);
  };
  p5.prototype.dispose = function() {
    this.d();
  };
  function E3(i7, t6) {
    var r6 = new p5(i7, t6);
    try {
      r6.c();
    } catch (i8) {
      r6.d();
      throw i8;
    }
    var o6 = r6.d.bind(r6);
    o6[Symbol.dispose] = o6;
    return o6;
  }

  // node_modules/@preact/signals/dist/signals.module.js
  var h6;
  var w6;
  var p6;
  var m5 = [];
  E3(function() {
    h6 = this.N;
  })();
  function y6(i7, t6) {
    l3[i7] = t6.bind(null, l3[i7] || function() {
    });
  }
  function _4(i7) {
    if (p6) p6();
    p6 = i7 && i7.S();
  }
  function g5(i7) {
    var n4 = this, r6 = i7.data, f7 = useSignal(r6);
    f7.value = r6;
    var e6 = T4(function() {
      var i8 = n4, r7 = n4.__v;
      while (r7 = r7.__) if (r7.__c) {
        r7.__c.__$f |= 4;
        break;
      }
      var o6 = w5(function() {
        var i9 = f7.value.value;
        return 0 === i9 ? 0 : true === i9 ? "" : i9 || "";
      }), e7 = w5(function() {
        return !Array.isArray(o6.value) && !t3(o6.value);
      }), u8 = E3(function() {
        this.N = F4;
        if (e7.value) {
          var n5 = o6.value;
          if (i8.__v && i8.__v.__e && 3 === i8.__v.__e.nodeType) i8.__v.__e.data = n5;
        }
      }), c7 = n4.__$u.d;
      n4.__$u.d = function() {
        u8();
        c7.call(this);
      };
      return [e7, o6];
    }, []), u7 = e6[0], c6 = e6[1];
    return u7.value ? c6.peek() : c6.value;
  }
  g5.displayName = "ReactiveTextNode";
  Object.defineProperties(u5.prototype, { constructor: { configurable: true, value: void 0 }, type: { configurable: true, value: g5 }, props: { configurable: true, get: function() {
    return { data: this };
  } }, __b: { configurable: true, value: 1 } });
  y6("__b", function(i7, n4) {
    if ("function" == typeof n4.type && "undefined" != typeof window && window.__PREACT_SIGNALS_DEVTOOLS__) window.__PREACT_SIGNALS_DEVTOOLS__.exitComponent();
    if ("string" == typeof n4.type) {
      var t6, r6 = n4.props;
      for (var o6 in r6) if ("children" !== o6) {
        var f7 = r6[o6];
        if (f7 instanceof u5) {
          if (!t6) n4.__np = t6 = {};
          t6[o6] = f7;
          r6[o6] = f7.peek();
        }
      }
    }
    i7(n4);
  });
  y6("__r", function(i7, n4) {
    if ("function" == typeof n4.type && "undefined" != typeof window && window.__PREACT_SIGNALS_DEVTOOLS__) window.__PREACT_SIGNALS_DEVTOOLS__.enterComponent(n4.type.displayName || n4.type.name || "Unknown");
    if (n4.type !== k3) {
      _4();
      var t6, o6 = n4.__c;
      if (o6) {
        o6.__$f &= -2;
        if (void 0 === (t6 = o6.__$u)) o6.__$u = t6 = function(i8) {
          var n5;
          E3(function() {
            n5 = this;
          });
          n5.c = function() {
            o6.__$f |= 1;
            o6.setState({});
          };
          return n5;
        }();
      }
      w6 = o6;
      _4(t6);
    }
    i7(n4);
  });
  y6("__e", function(i7, n4, t6, r6) {
    if ("undefined" != typeof window && window.__PREACT_SIGNALS_DEVTOOLS__) window.__PREACT_SIGNALS_DEVTOOLS__.exitComponent();
    _4();
    w6 = void 0;
    i7(n4, t6, r6);
  });
  y6("diffed", function(i7, n4) {
    if ("function" == typeof n4.type && "undefined" != typeof window && window.__PREACT_SIGNALS_DEVTOOLS__) window.__PREACT_SIGNALS_DEVTOOLS__.exitComponent();
    _4();
    w6 = void 0;
    var t6;
    if ("string" == typeof n4.type && (t6 = n4.__e)) {
      var r6 = n4.__np, o6 = n4.props;
      if (r6) {
        var f7 = t6.U;
        if (f7) for (var e6 in f7) {
          var u7 = f7[e6];
          if (void 0 !== u7 && !(e6 in r6)) {
            u7.d();
            f7[e6] = void 0;
          }
        }
        else {
          f7 = {};
          t6.U = f7;
        }
        for (var a6 in r6) {
          var c6 = f7[a6], v6 = r6[a6];
          if (void 0 === c6) {
            c6 = b4(t6, a6, v6, o6);
            f7[a6] = c6;
          } else c6.o(v6, o6);
        }
      }
    }
    i7(n4);
  });
  function b4(i7, n4, t6, r6) {
    var o6 = n4 in i7 && void 0 === i7.ownerSVGElement, f7 = d5(t6);
    return { o: function(i8, n5) {
      f7.value = i8;
      r6 = n5;
    }, d: E3(function() {
      this.N = F4;
      var t7 = f7.value.value;
      if (r6[n4] !== t7) {
        r6[n4] = t7;
        if (o6) i7[n4] = t7;
        else if (t7) i7.setAttribute(n4, t7);
        else i7.removeAttribute(n4);
      }
    }) };
  }
  y6("unmount", function(i7, n4) {
    if ("string" == typeof n4.type) {
      var t6 = n4.__e;
      if (t6) {
        var r6 = t6.U;
        if (r6) {
          t6.U = void 0;
          for (var o6 in r6) {
            var f7 = r6[o6];
            if (f7) f7.d();
          }
        }
      }
    } else {
      var e6 = n4.__c;
      if (e6) {
        var u7 = e6.__$u;
        if (u7) {
          e6.__$u = void 0;
          u7.d();
        }
      }
    }
    i7(n4);
  });
  y6("__h", function(i7, n4, t6, r6) {
    if (r6 < 3 || 9 === r6) n4.__$f |= 2;
    i7(n4, t6, r6);
  });
  x3.prototype.shouldComponentUpdate = function(i7, n4) {
    var t6 = this.__$u, r6 = t6 && void 0 !== t6.s;
    for (var o6 in n4) return true;
    if (this.__f || "boolean" == typeof this.u && true === this.u) {
      var f7 = 2 & this.__$f;
      if (!(r6 || f7 || 4 & this.__$f)) return true;
      if (1 & this.__$f) return true;
    } else {
      if (!(r6 || 4 & this.__$f)) return true;
      if (3 & this.__$f) return true;
    }
    for (var e6 in i7) if ("__source" !== e6 && i7[e6] !== this.props[e6]) return true;
    for (var u7 in this.props) if (!(u7 in i7)) return true;
    return false;
  };
  function useSignal(i7, n4) {
    return d4(function() {
      return d5(i7, n4);
    })[0];
  }
  var q4 = function(i7) {
    queueMicrotask(function() {
      queueMicrotask(i7);
    });
  };
  function x4() {
    r5(function() {
      var i7;
      while (i7 = m5.shift()) h6.call(i7);
    });
  }
  function F4() {
    if (1 === m5.push(this)) (l3.requestAnimationFrame || q4)(x4);
  }

  // apps/larry-vscode-ext/webview/src/signals/store.ts
  var isLoadingWorktreeInfo = d5(true);
  var isInWorktree = d5(false);
  var currentThreadId = d5(void 0);
  var worktreeName = d5(void 0);
  var setupPhase = d5(
    "idle"
  );
  var selectedThreadId = d5(void 0);
  var searchText = d5("");
  var clientRequestId = d5(
    typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : "client-" + Math.random().toString(16).slice(2)
  );
  var sseBaseMain = d5(void 0);
  var sseBaseWorktree = d5(void 0);
  var baseUrl = w5(
    () => isInWorktree.value ? "http://localhost:3000/larry/agents/google/v1" : "http://localhost:4210/larry/agents/google/v1"
  );

  // apps/larry-vscode-ext/webview/src/views/MainRepoScreen.tsx
  init_hooks_module();

  // apps/larry-vscode-ext/webview/src/lib/http.ts
  async function fetchJSON(url, init) {
    const res = await fetch(url, init);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `${res.status} ${res.statusText}: ${text || "request failed"}`
      );
    }
    return res.json();
  }
  function withHeaders(base = {}, extra = {}) {
    const headers = new Headers(base.headers || {});
    Object.entries(extra).forEach(([k5, v6]) => headers.set(k5, v6));
    return { ...base, headers };
  }
  function uuid() {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto)
      return crypto.randomUUID();
    return "id-" + Math.random().toString(16).slice(2) + Date.now().toString(16);
  }
  async function fetchThreads(baseUrl2) {
    return fetchJSON(`${baseUrl2}/threads`);
  }
  async function fetchMachine(baseUrl2, machineId) {
    return fetchJSON(
      `${baseUrl2}/machines/${encodeURIComponent(machineId)}`
    );
  }
  async function createThread(params) {
    const { baseUrl: baseUrl2, worktreeName: worktreeName2, userTask, label, clientRequestId: clientRequestId2 } = params;
    const idem = uuid();
    const init = withHeaders(
      {
        method: "POST",
        body: JSON.stringify({ worktreeName: worktreeName2, userTask, label })
      },
      {
        "Content-Type": "application/json",
        "Idempotency-Key": idem,
        "Client-Request-Id": clientRequestId2
      }
    );
    await fetchJSON(`${baseUrl2}/threads/new`, init);
  }

  // apps/larry-vscode-ext/webview/src/hooks/useThreadsQuery.ts
  function useThreadsQuery(baseUrl2) {
    return useQuery({
      queryKey: ["threads", { baseUrl: baseUrl2 }],
      queryFn: () => fetchThreads(baseUrl2),
      refetchInterval: 5e3,
      staleTime: 4e3
    });
  }

  // apps/larry-vscode-ext/webview/src/lib/vscode.ts
  var vscode = typeof acquireVsCodeApi === "function" ? acquireVsCodeApi() : {
    postMessage: (_5) => void 0
  };
  function postMessage(msg) {
    vscode.postMessage(msg);
  }
  function onMessage(cb) {
    const handler = (e6) => {
      cb(e6.data);
    };
    window.addEventListener("message", handler);
    return () => {
      window.removeEventListener("message", handler);
    };
  }

  // apps/larry-vscode-ext/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
  init_preact_module();
  init_preact_module();
  var f6 = 0;
  var i6 = Array.isArray;
  function u6(e6, t6, n4, o6, i7, u7) {
    t6 || (t6 = {});
    var a6, c6, p7 = t6;
    if ("ref" in p7) for (c6 in p7 = {}, t6) "ref" == c6 ? a6 = t6[c6] : p7[c6] = t6[c6];
    var l6 = { type: e6, props: p7, key: n4, ref: a6, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f6, __i: -1, __u: 0, __source: i7, __self: u7 };
    if ("function" == typeof e6 && (a6 = e6.defaultProps)) for (c6 in a6) void 0 === p7[c6] && (p7[c6] = a6[c6]);
    return l.vnode && l.vnode(l6), l6;
  }

  // apps/larry-vscode-ext/webview/src/views/components/ThreadsList.tsx
  function ThreadsList(props) {
    const { items, selectedId, onSelect } = props;
    if (!items.length) {
      return /* @__PURE__ */ u6("div", { className: "color-fg-muted", children: "No threads yet." });
    }
    return /* @__PURE__ */ u6("div", { className: "Box overflow-auto", style: { maxHeight: "50vh" }, children: /* @__PURE__ */ u6("ul", { className: "list-style-none", children: items.map((t6) => /* @__PURE__ */ u6("li", { className: `d-flex flex-justify-between px-2 py-2 ${selectedId === t6.id ? "color-bg-subtle" : ""}`, children: [
      /* @__PURE__ */ u6("button", { className: "btn-invisible text-left", onClick: () => onSelect(t6.id), children: [
        /* @__PURE__ */ u6("div", { className: "text-bold", children: t6.label }),
        /* @__PURE__ */ u6("div", { className: "color-fg-muted text-small", children: t6.worktreeName })
      ] }),
      /* @__PURE__ */ u6("span", { className: "Label Label--secondary", children: new Date(t6.updatedAt).toLocaleString() })
    ] }, t6.id)) }) });
  }

  // apps/larry-vscode-ext/webview/src/views/components/AnimatedEllipsis.tsx
  function AnimatedEllipsis() {
    return /* @__PURE__ */ u6("span", { className: "AnimatedEllipsis" });
  }

  // apps/larry-vscode-ext/webview/src/views/MainRepoScreen.tsx
  function MainRepoScreen() {
    const { data, isLoading } = useThreadsQuery(baseUrl.value);
    const [newLabel, setNewLabel] = d2("");
    const [newWorktree, setNewWorktree] = d2("");
    const items = data?.items ?? [];
    const filtered = T2(() => {
      const q5 = searchText.value.toLowerCase();
      if (!q5) return items;
      return items.filter((t6) => (t6.label + " " + t6.worktreeName).toLowerCase().includes(q5));
    }, [items, searchText.value]);
    const selected = T2(() => {
      if (!selectedThreadId.value) return void 0;
      return items.find((t6) => t6.id === selectedThreadId.value);
    }, [items, selectedThreadId.value]);
    function openWorktreeExisting() {
      if (!selected) return;
      postMessage({
        type: "open_worktree",
        worktreeName: selected.worktreeName,
        threadId: selected.id,
        label: selected.label
      });
      setupPhase.value = "setting_up";
    }
    function openWorktreeNew() {
      if (!newLabel.trim()) return;
      postMessage({ type: "open_worktree", worktreeName: newWorktree || "", threadId: "", label: newLabel.trim() });
      setupPhase.value = "setting_up";
    }
    return /* @__PURE__ */ u6("div", { className: "Box d-flex flex-column gap-3 p-3", children: [
      /* @__PURE__ */ u6("div", { className: "d-flex flex-justify-between flex-items-center", children: /* @__PURE__ */ u6("h2", { className: "h3 m-0", children: "Threads" }) }),
      /* @__PURE__ */ u6("div", { className: "width-full mb-1 mt-1", children: /* @__PURE__ */ u6(
        "input",
        {
          className: "form-control input-sm width-full",
          placeholder: "Search threads...",
          value: searchText.value,
          onInput: (e6) => searchText.value = e6.currentTarget.value
        }
      ) }),
      isLoading ? /* @__PURE__ */ u6("div", { className: "color-fg-muted", children: "Loading threads\u2026" }) : /* @__PURE__ */ u6(ThreadsList, { items: filtered, selectedId: selectedThreadId.value, onSelect: (id) => selectedThreadId.value = id }),
      selectedThreadId.value ? /* @__PURE__ */ u6("div", { className: "border-top pt-3 mt-2", children: /* @__PURE__ */ u6("button", { className: "btn btn-primary", disabled: !selected || setupPhase.value === "setting_up", onClick: openWorktreeExisting, children: setupPhase.value === "setting_up" ? /* @__PURE__ */ u6(k, { children: [
        "Setting up ",
        /* @__PURE__ */ u6(AnimatedEllipsis, {})
      ] }) : "Open worktree" }) }) : null,
      /* @__PURE__ */ u6("div", { className: "border-top pt-3 mt-2", children: [
        /* @__PURE__ */ u6("h4", { className: "h4", children: "Or create a new thread" }),
        /* @__PURE__ */ u6("div", { className: "width-full mb-2", children: /* @__PURE__ */ u6(
          "input",
          {
            className: "form-control input-sm flex-1 width-full",
            placeholder: "Thread label (required)",
            value: newLabel,
            onInput: (e6) => setNewLabel(e6.currentTarget.value)
          }
        ) }),
        /* @__PURE__ */ u6("div", { children: /* @__PURE__ */ u6("button", { className: `btn ${newLabel.trim() ? "btn-primary" : ""}`, disabled: !newLabel.trim() || setupPhase.value === "setting_up", onClick: openWorktreeNew, children: setupPhase.value === "setting_up" ? /* @__PURE__ */ u6(k, { children: [
          "Setting up ",
          /* @__PURE__ */ u6(AnimatedEllipsis, {})
        ] }) : "Open worktree" }) })
      ] })
    ] });
  }

  // apps/larry-vscode-ext/webview/src/views/WorktreeScreen.tsx
  init_hooks_module();

  // apps/larry-vscode-ext/webview/src/hooks/useMachineQuery.ts
  function useMachineQuery(baseUrl2, machineId) {
    return useQuery({
      enabled: !!machineId,
      queryKey: ["machine", { baseUrl: baseUrl2, machineId }],
      queryFn: () => fetchMachine(baseUrl2, machineId)
    });
  }

  // apps/larry-vscode-ext/webview/src/hooks/useGlobalSSE.ts
  init_hooks_module();

  // apps/larry-vscode-ext/webview/src/lib/sse.ts
  function openSSE(url, handlers, onStatus) {
    let es = null;
    let closed = false;
    let backoff = 1e3;
    const connect = () => {
      if (closed) return;
      es = new EventSource(url);
      es.addEventListener("open", () => {
        backoff = 1e3;
        onStatus?.("open");
      });
      es.addEventListener("error", () => {
        onStatus?.("error");
        es?.close();
        if (closed) return;
        setTimeout(connect, backoff);
        backoff = Math.min(backoff * 2, 3e4);
      });
      Object.keys(handlers).forEach((evt) => {
        es.addEventListener(evt, (e6) => {
          try {
            const data = JSON.parse(e6.data);
            handlers[evt]?.(data);
          } catch {
          }
        });
      });
    };
    connect();
    return {
      close: () => {
        closed = true;
        es?.close();
        onStatus?.("closed");
      }
    };
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

  // apps/larry-vscode-ext/webview/src/hooks/useGlobalSSE.ts
  function useGlobalSSE(params) {
    const {
      baseUrl: baseUrl2,
      topics,
      clientRequestId: clientRequestId2,
      onThreadCreated,
      onMachineUpdated
    } = params;
    const ctrlRef = A2(null);
    y2(() => {
      const sseBase = isInWorktree.value ? sseBaseWorktree.value : sseBaseMain.value;
      const url = (sseBase ?? `${baseUrl2}/events`) + `?topics=${encodeURIComponent(topics.join(","))}`;
      ctrlRef.current = openSSE(url, {
        "thread.created": (evt) => {
          queryClient.setQueryData(
            ["threads", { baseUrl: baseUrl2 }],
            (prev) => {
              if (!prev) return prev;
              return {
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
            }
          );
          onThreadCreated?.(evt);
        },
        "machine.updated": (evt) => {
          const m6 = evt.machine;
          queryClient.setQueryData(["machine", { baseUrl: baseUrl2, machineId: m6.id }], m6);
          onMachineUpdated?.(evt);
        }
      });
      return () => ctrlRef.current?.close();
    }, [
      baseUrl2,
      topics.join(","),
      clientRequestId2,
      sseBaseMain.value,
      sseBaseWorktree.value,
      isInWorktree.value
    ]);
  }

  // apps/larry-vscode-ext/webview/src/hooks/useMachineSSE.ts
  init_hooks_module();
  function useMachineSSE(baseUrl2, machineId) {
    const ctrlRef = A2(null);
    y2(() => {
      if (!machineId) return;
      const proxiedBase = sseBaseWorktree.value?.replace(/\/events$/, "");
      const baseForEvents = proxiedBase ?? baseUrl2;
      const url = `${baseForEvents}/machines/${encodeURIComponent(
        machineId
      )}/events`;
      ctrlRef.current = openSSE(url, {
        "machine.updated": (evt) => {
          const m6 = evt.machine;
          queryClient.setQueryData(["machine", { baseUrl: baseUrl2, machineId: m6.id }], m6);
        }
      });
      return () => ctrlRef.current?.close();
    }, [baseUrl2, machineId, sseBaseWorktree.value]);
  }

  // apps/larry-vscode-ext/webview/src/views/WorktreeScreen.tsx
  function WorktreeScreen() {
    const [firstMessage, setFirstMessage] = d2("");
    const [provisioning, setProvisioning] = d2(false);
    const machineId = currentThreadId.value;
    const { data, isLoading } = useMachineQuery(baseUrl.value, machineId);
    useMachineSSE(baseUrl.value, machineId);
    useGlobalSSE({
      baseUrl: baseUrl.value,
      topics: ["thread.created", "machine.updated"],
      clientRequestId: clientRequestId.value,
      onThreadCreated: (evt) => {
        if (evt.clientRequestId && evt.clientRequestId !== clientRequestId.value) return;
        currentThreadId.value = evt.machineId;
        setProvisioning(false);
      }
    });
    async function startNewThread() {
      if (!firstMessage.trim()) return;
      if (!worktreeName.value) {
        console.error("Worktree name is unknown. Please open from main screen or update the extension to pass worktreeName.");
        return;
      }
      setProvisioning(true);
      await createThread({
        baseUrl: baseUrl.value,
        worktreeName: worktreeName.value,
        userTask: firstMessage.trim(),
        label: firstMessage.trim(),
        clientRequestId: clientRequestId.value
      });
    }
    if (machineId) {
      return /* @__PURE__ */ u6("div", { className: "Box p-3", children: [
        /* @__PURE__ */ u6("div", { className: "d-flex flex-justify-between flex-items-center mb-2", children: [
          /* @__PURE__ */ u6("h2", { className: "h3 m-0", children: "Session" }),
          /* @__PURE__ */ u6("span", { className: "Label Label--primary", children: data?.status || "running" })
        ] }),
        isLoading ? /* @__PURE__ */ u6("div", { className: "color-fg-muted", children: "Loading history\u2026" }) : /* @__PURE__ */ u6("pre", { className: "p-2 overflow-auto", style: { maxHeight: "60vh" }, children: JSON.stringify(data?.context ?? data?.currentStateContext ?? {}, null, 2) })
      ] });
    }
    return /* @__PURE__ */ u6("div", { className: "Box p-3 d-flex flex-column gap-2", children: [
      /* @__PURE__ */ u6("h2", { className: "h3 m-0", children: "New Session" }),
      /* @__PURE__ */ u6(
        "textarea",
        {
          className: "form-control",
          rows: 6,
          placeholder: "Hello, how can I help you today?",
          value: firstMessage,
          onInput: (e6) => setFirstMessage(e6.currentTarget.value)
        }
      ),
      /* @__PURE__ */ u6("div", { children: /* @__PURE__ */ u6("button", { className: "btn btn-primary", disabled: !firstMessage.trim() || provisioning, onClick: startNewThread, children: provisioning ? /* @__PURE__ */ u6(k, { children: [
        "Thinking",
        /* @__PURE__ */ u6(AnimatedEllipsis, {})
      ] }) : "Send" }) })
    ] });
  }

  // apps/larry-vscode-ext/webview/src/views/components/Loader.tsx
  function Loader({ message = "Loading" }) {
    return /* @__PURE__ */ u6("div", { className: "flex items-center justify-center p-6", children: /* @__PURE__ */ u6("div", { className: "text-center", children: [
      /* @__PURE__ */ u6("div", { className: "text-sm text-gray-500 mb-2", children: [
        message,
        /* @__PURE__ */ u6(AnimatedEllipsis, {})
      ] }),
      /* @__PURE__ */ u6("div", { className: "animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full mx-auto" })
    ] }) });
  }

  // apps/larry-vscode-ext/webview/src/views/AppRoot.tsx
  function AppRoot() {
    const [isLoading, setIsLoading] = d2(true);
    if (typeof window !== "undefined") {
      window.setAppLoading = setIsLoading;
    }
    if (isLoading) {
      return /* @__PURE__ */ u6("div", { className: "p-3", children: /* @__PURE__ */ u6(Loader, { message: "Initializing Larry" }) });
    }
    return /* @__PURE__ */ u6("div", { className: "p-3", children: isInWorktree.value ? /* @__PURE__ */ u6(WorktreeScreen, {}) : /* @__PURE__ */ u6(MainRepoScreen, {}) });
  }

  // apps/larry-vscode-ext/webview/src/views/BootChannel.tsx
  init_hooks_module();
  function BootChannel() {
    y2(() => {
      const handleMessage = (msg) => {
        if (!msg || typeof msg !== "object") return;
        if (msg.type === "worktree_detection") {
          isInWorktree.value = !!msg.isInWorktree;
          currentThreadId.value = msg.currentThreadId || void 0;
          if (msg.worktreeName) worktreeName.value = msg.worktreeName;
          isLoadingWorktreeInfo.value = false;
          if (typeof window !== "undefined" && window.setAppLoading) {
            window.setAppLoading(false);
          }
        }
        if (msg.type === "worktree_ready") {
          setupPhase.value = "ready";
          if (msg.threadId) currentThreadId.value = msg.threadId;
          if (msg.worktreeName) worktreeName.value = msg.worktreeName;
        }
        if (msg.type === "worktree_setup_error") {
          setupPhase.value = "error";
        }
        if (msg?.type === "server_endpoints" && msg.sseBase) {
          sseBaseMain.value = msg.sseBase.main;
          sseBaseWorktree.value = msg.sseBase.worktree;
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
  var queryClient2 = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 2
      },
      mutations: {
        retry: 0
      }
    }
  });
  function Root() {
    return /* @__PURE__ */ u6(QueryClientProvider, { client: queryClient2, children: /* @__PURE__ */ u6("div", { children: [
      /* @__PURE__ */ u6(BootChannel, {}),
      /* @__PURE__ */ u6(AppRoot, {})
    ] }) });
  }
  G(/* @__PURE__ */ u6(Root, {}), document.getElementById("root"));
})();
//# sourceMappingURL=webview.js.map
