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
  function d(n2, l3) {
    for (var u4 in l3) n2[u4] = l3[u4];
    return n2;
  }
  function g(n2) {
    n2 && n2.parentNode && n2.parentNode.removeChild(n2);
  }
  function _(l3, u4, t3) {
    var i4, r3, o3, e3 = {};
    for (o3 in u4) "key" == o3 ? i4 = u4[o3] : "ref" == o3 ? r3 = u4[o3] : e3[o3] = u4[o3];
    if (arguments.length > 2 && (e3.children = arguments.length > 3 ? n.call(arguments, 2) : t3), "function" == typeof l3 && null != l3.defaultProps) for (o3 in l3.defaultProps) void 0 === e3[o3] && (e3[o3] = l3.defaultProps[o3]);
    return m(l3, e3, i4, r3, null);
  }
  function m(n2, t3, i4, r3, o3) {
    var e3 = { type: n2, props: t3, key: i4, ref: r3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o3 ? ++u : o3, __i: -1, __u: 0 };
    return null == o3 && null != l.vnode && l.vnode(e3), e3;
  }
  function b() {
    return { current: null };
  }
  function k(n2) {
    return n2.children;
  }
  function x(n2, l3) {
    this.props = n2, this.context = l3;
  }
  function S(n2, l3) {
    if (null == l3) return n2.__ ? S(n2.__, n2.__i + 1) : null;
    for (var u4; l3 < n2.__k.length; l3++) if (null != (u4 = n2.__k[l3]) && null != u4.__e) return u4.__e;
    return "function" == typeof n2.type ? S(n2) : null;
  }
  function C(n2) {
    var l3, u4;
    if (null != (n2 = n2.__) && null != n2.__c) {
      for (n2.__e = n2.__c.base = null, l3 = 0; l3 < n2.__k.length; l3++) if (null != (u4 = n2.__k[l3]) && null != u4.__e) {
        n2.__e = n2.__c.base = u4.__e;
        break;
      }
      return C(n2);
    }
  }
  function M(n2) {
    (!n2.__d && (n2.__d = true) && i.push(n2) && !$.__r++ || r != l.debounceRendering) && ((r = l.debounceRendering) || o)($);
  }
  function $() {
    for (var n2, u4, t3, r3, o3, f4, c3, s3 = 1; i.length; ) i.length > s3 && i.sort(e), n2 = i.shift(), s3 = i.length, n2.__d && (t3 = void 0, r3 = void 0, o3 = (r3 = (u4 = n2).__v).__e, f4 = [], c3 = [], u4.__P && ((t3 = d({}, r3)).__v = r3.__v + 1, l.vnode && l.vnode(t3), O(u4.__P, t3, r3, u4.__n, u4.__P.namespaceURI, 32 & r3.__u ? [o3] : null, f4, null == o3 ? S(r3) : o3, !!(32 & r3.__u), c3), t3.__v = r3.__v, t3.__.__k[t3.__i] = t3, N(f4, t3, c3), r3.__e = r3.__ = null, t3.__e != o3 && C(t3)));
    $.__r = 0;
  }
  function I(n2, l3, u4, t3, i4, r3, o3, e3, f4, c3, s3) {
    var a3, h3, y3, w3, d3, g3, _3, m3 = t3 && t3.__k || v, b3 = l3.length;
    for (f4 = P(u4, l3, m3, f4, b3), a3 = 0; a3 < b3; a3++) null != (y3 = u4.__k[a3]) && (h3 = -1 == y3.__i ? p : m3[y3.__i] || p, y3.__i = a3, g3 = O(n2, y3, h3, i4, r3, o3, e3, f4, c3, s3), w3 = y3.__e, y3.ref && h3.ref != y3.ref && (h3.ref && B(h3.ref, null, y3), s3.push(y3.ref, y3.__c || w3, y3)), null == d3 && null != w3 && (d3 = w3), (_3 = !!(4 & y3.__u)) || h3.__k === y3.__k ? f4 = A(y3, f4, n2, _3) : "function" == typeof y3.type && void 0 !== g3 ? f4 = g3 : w3 && (f4 = w3.nextSibling), y3.__u &= -7);
    return u4.__e = d3, f4;
  }
  function P(n2, l3, u4, t3, i4) {
    var r3, o3, e3, f4, c3, s3 = u4.length, a3 = s3, h3 = 0;
    for (n2.__k = new Array(i4), r3 = 0; r3 < i4; r3++) null != (o3 = l3[r3]) && "boolean" != typeof o3 && "function" != typeof o3 ? (f4 = r3 + h3, (o3 = n2.__k[r3] = "string" == typeof o3 || "number" == typeof o3 || "bigint" == typeof o3 || o3.constructor == String ? m(null, o3, null, null, null) : w(o3) ? m(k, { children: o3 }, null, null, null) : null == o3.constructor && o3.__b > 0 ? m(o3.type, o3.props, o3.key, o3.ref ? o3.ref : null, o3.__v) : o3).__ = n2, o3.__b = n2.__b + 1, e3 = null, -1 != (c3 = o3.__i = L(o3, u4, f4, a3)) && (a3--, (e3 = u4[c3]) && (e3.__u |= 2)), null == e3 || null == e3.__v ? (-1 == c3 && (i4 > s3 ? h3-- : i4 < s3 && h3++), "function" != typeof o3.type && (o3.__u |= 4)) : c3 != f4 && (c3 == f4 - 1 ? h3-- : c3 == f4 + 1 ? h3++ : (c3 > f4 ? h3-- : h3++, o3.__u |= 4))) : n2.__k[r3] = null;
    if (a3) for (r3 = 0; r3 < s3; r3++) null != (e3 = u4[r3]) && 0 == (2 & e3.__u) && (e3.__e == t3 && (t3 = S(e3)), D(e3, e3));
    return t3;
  }
  function A(n2, l3, u4, t3) {
    var i4, r3;
    if ("function" == typeof n2.type) {
      for (i4 = n2.__k, r3 = 0; i4 && r3 < i4.length; r3++) i4[r3] && (i4[r3].__ = n2, l3 = A(i4[r3], l3, u4, t3));
      return l3;
    }
    n2.__e != l3 && (t3 && (l3 && n2.type && !l3.parentNode && (l3 = S(n2)), u4.insertBefore(n2.__e, l3 || null)), l3 = n2.__e);
    do {
      l3 = l3 && l3.nextSibling;
    } while (null != l3 && 8 == l3.nodeType);
    return l3;
  }
  function H(n2, l3) {
    return l3 = l3 || [], null == n2 || "boolean" == typeof n2 || (w(n2) ? n2.some(function(n3) {
      H(n3, l3);
    }) : l3.push(n2)), l3;
  }
  function L(n2, l3, u4, t3) {
    var i4, r3, o3, e3 = n2.key, f4 = n2.type, c3 = l3[u4], s3 = null != c3 && 0 == (2 & c3.__u);
    if (null === c3 && null == n2.key || s3 && e3 == c3.key && f4 == c3.type) return u4;
    if (t3 > (s3 ? 1 : 0)) {
      for (i4 = u4 - 1, r3 = u4 + 1; i4 >= 0 || r3 < l3.length; ) if (null != (c3 = l3[o3 = i4 >= 0 ? i4-- : r3++]) && 0 == (2 & c3.__u) && e3 == c3.key && f4 == c3.type) return o3;
    }
    return -1;
  }
  function T(n2, l3, u4) {
    "-" == l3[0] ? n2.setProperty(l3, null == u4 ? "" : u4) : n2[l3] = null == u4 ? "" : "number" != typeof u4 || y.test(l3) ? u4 : u4 + "px";
  }
  function j(n2, l3, u4, t3, i4) {
    var r3, o3;
    n: if ("style" == l3) if ("string" == typeof u4) n2.style.cssText = u4;
    else {
      if ("string" == typeof t3 && (n2.style.cssText = t3 = ""), t3) for (l3 in t3) u4 && l3 in u4 || T(n2.style, l3, "");
      if (u4) for (l3 in u4) t3 && u4[l3] == t3[l3] || T(n2.style, l3, u4[l3]);
    }
    else if ("o" == l3[0] && "n" == l3[1]) r3 = l3 != (l3 = l3.replace(f, "$1")), o3 = l3.toLowerCase(), l3 = o3 in n2 || "onFocusOut" == l3 || "onFocusIn" == l3 ? o3.slice(2) : l3.slice(2), n2.l || (n2.l = {}), n2.l[l3 + r3] = u4, u4 ? t3 ? u4.u = t3.u : (u4.u = c, n2.addEventListener(l3, r3 ? a : s, r3)) : n2.removeEventListener(l3, r3 ? a : s, r3);
    else {
      if ("http://www.w3.org/2000/svg" == i4) l3 = l3.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != l3 && "height" != l3 && "href" != l3 && "list" != l3 && "form" != l3 && "tabIndex" != l3 && "download" != l3 && "rowSpan" != l3 && "colSpan" != l3 && "role" != l3 && "popover" != l3 && l3 in n2) try {
        n2[l3] = null == u4 ? "" : u4;
        break n;
      } catch (n3) {
      }
      "function" == typeof u4 || (null == u4 || false === u4 && "-" != l3[4] ? n2.removeAttribute(l3) : n2.setAttribute(l3, "popover" == l3 && 1 == u4 ? "" : u4));
    }
  }
  function F(n2) {
    return function(u4) {
      if (this.l) {
        var t3 = this.l[u4.type + n2];
        if (null == u4.t) u4.t = c++;
        else if (u4.t < t3.u) return;
        return t3(l.event ? l.event(u4) : u4);
      }
    };
  }
  function O(n2, u4, t3, i4, r3, o3, e3, f4, c3, s3) {
    var a3, h3, p3, v3, y3, _3, m3, b3, S2, C3, M2, $2, P3, A3, H2, L2, T3, j3 = u4.type;
    if (null != u4.constructor) return null;
    128 & t3.__u && (c3 = !!(32 & t3.__u), o3 = [f4 = u4.__e = t3.__e]), (a3 = l.__b) && a3(u4);
    n: if ("function" == typeof j3) try {
      if (b3 = u4.props, S2 = "prototype" in j3 && j3.prototype.render, C3 = (a3 = j3.contextType) && i4[a3.__c], M2 = a3 ? C3 ? C3.props.value : a3.__ : i4, t3.__c ? m3 = (h3 = u4.__c = t3.__c).__ = h3.__E : (S2 ? u4.__c = h3 = new j3(b3, M2) : (u4.__c = h3 = new x(b3, M2), h3.constructor = j3, h3.render = E), C3 && C3.sub(h3), h3.props = b3, h3.state || (h3.state = {}), h3.context = M2, h3.__n = i4, p3 = h3.__d = true, h3.__h = [], h3._sb = []), S2 && null == h3.__s && (h3.__s = h3.state), S2 && null != j3.getDerivedStateFromProps && (h3.__s == h3.state && (h3.__s = d({}, h3.__s)), d(h3.__s, j3.getDerivedStateFromProps(b3, h3.__s))), v3 = h3.props, y3 = h3.state, h3.__v = u4, p3) S2 && null == j3.getDerivedStateFromProps && null != h3.componentWillMount && h3.componentWillMount(), S2 && null != h3.componentDidMount && h3.__h.push(h3.componentDidMount);
      else {
        if (S2 && null == j3.getDerivedStateFromProps && b3 !== v3 && null != h3.componentWillReceiveProps && h3.componentWillReceiveProps(b3, M2), !h3.__e && null != h3.shouldComponentUpdate && false === h3.shouldComponentUpdate(b3, h3.__s, M2) || u4.__v == t3.__v) {
          for (u4.__v != t3.__v && (h3.props = b3, h3.state = h3.__s, h3.__d = false), u4.__e = t3.__e, u4.__k = t3.__k, u4.__k.some(function(n3) {
            n3 && (n3.__ = u4);
          }), $2 = 0; $2 < h3._sb.length; $2++) h3.__h.push(h3._sb[$2]);
          h3._sb = [], h3.__h.length && e3.push(h3);
          break n;
        }
        null != h3.componentWillUpdate && h3.componentWillUpdate(b3, h3.__s, M2), S2 && null != h3.componentDidUpdate && h3.__h.push(function() {
          h3.componentDidUpdate(v3, y3, _3);
        });
      }
      if (h3.context = M2, h3.props = b3, h3.__P = n2, h3.__e = false, P3 = l.__r, A3 = 0, S2) {
        for (h3.state = h3.__s, h3.__d = false, P3 && P3(u4), a3 = h3.render(h3.props, h3.state, h3.context), H2 = 0; H2 < h3._sb.length; H2++) h3.__h.push(h3._sb[H2]);
        h3._sb = [];
      } else do {
        h3.__d = false, P3 && P3(u4), a3 = h3.render(h3.props, h3.state, h3.context), h3.state = h3.__s;
      } while (h3.__d && ++A3 < 25);
      h3.state = h3.__s, null != h3.getChildContext && (i4 = d(d({}, i4), h3.getChildContext())), S2 && !p3 && null != h3.getSnapshotBeforeUpdate && (_3 = h3.getSnapshotBeforeUpdate(v3, y3)), L2 = a3, null != a3 && a3.type === k && null == a3.key && (L2 = V(a3.props.children)), f4 = I(n2, w(L2) ? L2 : [L2], u4, t3, i4, r3, o3, e3, f4, c3, s3), h3.base = u4.__e, u4.__u &= -161, h3.__h.length && e3.push(h3), m3 && (h3.__E = h3.__ = null);
    } catch (n3) {
      if (u4.__v = null, c3 || null != o3) if (n3.then) {
        for (u4.__u |= c3 ? 160 : 128; f4 && 8 == f4.nodeType && f4.nextSibling; ) f4 = f4.nextSibling;
        o3[o3.indexOf(f4)] = null, u4.__e = f4;
      } else {
        for (T3 = o3.length; T3--; ) g(o3[T3]);
        z(u4);
      }
      else u4.__e = t3.__e, u4.__k = t3.__k, n3.then || z(u4);
      l.__e(n3, u4, t3);
    }
    else null == o3 && u4.__v == t3.__v ? (u4.__k = t3.__k, u4.__e = t3.__e) : f4 = u4.__e = q(t3.__e, u4, t3, i4, r3, o3, e3, c3, s3);
    return (a3 = l.diffed) && a3(u4), 128 & u4.__u ? void 0 : f4;
  }
  function z(n2) {
    n2 && n2.__c && (n2.__c.__e = true), n2 && n2.__k && n2.__k.forEach(z);
  }
  function N(n2, u4, t3) {
    for (var i4 = 0; i4 < t3.length; i4++) B(t3[i4], t3[++i4], t3[++i4]);
    l.__c && l.__c(u4, n2), n2.some(function(u5) {
      try {
        n2 = u5.__h, u5.__h = [], n2.some(function(n3) {
          n3.call(u5);
        });
      } catch (n3) {
        l.__e(n3, u5.__v);
      }
    });
  }
  function V(n2) {
    return "object" != typeof n2 || null == n2 || n2.__b && n2.__b > 0 ? n2 : w(n2) ? n2.map(V) : d({}, n2);
  }
  function q(u4, t3, i4, r3, o3, e3, f4, c3, s3) {
    var a3, h3, v3, y3, d3, _3, m3, b3 = i4.props, k3 = t3.props, x3 = t3.type;
    if ("svg" == x3 ? o3 = "http://www.w3.org/2000/svg" : "math" == x3 ? o3 = "http://www.w3.org/1998/Math/MathML" : o3 || (o3 = "http://www.w3.org/1999/xhtml"), null != e3) {
      for (a3 = 0; a3 < e3.length; a3++) if ((d3 = e3[a3]) && "setAttribute" in d3 == !!x3 && (x3 ? d3.localName == x3 : 3 == d3.nodeType)) {
        u4 = d3, e3[a3] = null;
        break;
      }
    }
    if (null == u4) {
      if (null == x3) return document.createTextNode(k3);
      u4 = document.createElementNS(o3, x3, k3.is && k3), c3 && (l.__m && l.__m(t3, e3), c3 = false), e3 = null;
    }
    if (null == x3) b3 === k3 || c3 && u4.data == k3 || (u4.data = k3);
    else {
      if (e3 = e3 && n.call(u4.childNodes), b3 = i4.props || p, !c3 && null != e3) for (b3 = {}, a3 = 0; a3 < u4.attributes.length; a3++) b3[(d3 = u4.attributes[a3]).name] = d3.value;
      for (a3 in b3) if (d3 = b3[a3], "children" == a3) ;
      else if ("dangerouslySetInnerHTML" == a3) v3 = d3;
      else if (!(a3 in k3)) {
        if ("value" == a3 && "defaultValue" in k3 || "checked" == a3 && "defaultChecked" in k3) continue;
        j(u4, a3, null, d3, o3);
      }
      for (a3 in k3) d3 = k3[a3], "children" == a3 ? y3 = d3 : "dangerouslySetInnerHTML" == a3 ? h3 = d3 : "value" == a3 ? _3 = d3 : "checked" == a3 ? m3 = d3 : c3 && "function" != typeof d3 || b3[a3] === d3 || j(u4, a3, d3, b3[a3], o3);
      if (h3) c3 || v3 && (h3.__html == v3.__html || h3.__html == u4.innerHTML) || (u4.innerHTML = h3.__html), t3.__k = [];
      else if (v3 && (u4.innerHTML = ""), I("template" == t3.type ? u4.content : u4, w(y3) ? y3 : [y3], t3, i4, r3, "foreignObject" == x3 ? "http://www.w3.org/1999/xhtml" : o3, e3, f4, e3 ? e3[0] : i4.__k && S(i4, 0), c3, s3), null != e3) for (a3 = e3.length; a3--; ) g(e3[a3]);
      c3 || (a3 = "value", "progress" == x3 && null == _3 ? u4.removeAttribute("value") : null != _3 && (_3 !== u4[a3] || "progress" == x3 && !_3 || "option" == x3 && _3 != b3[a3]) && j(u4, a3, _3, b3[a3], o3), a3 = "checked", null != m3 && m3 != u4[a3] && j(u4, a3, m3, b3[a3], o3));
    }
    return u4;
  }
  function B(n2, u4, t3) {
    try {
      if ("function" == typeof n2) {
        var i4 = "function" == typeof n2.__u;
        i4 && n2.__u(), i4 && null == u4 || (n2.__u = n2(u4));
      } else n2.current = u4;
    } catch (n3) {
      l.__e(n3, t3);
    }
  }
  function D(n2, u4, t3) {
    var i4, r3;
    if (l.unmount && l.unmount(n2), (i4 = n2.ref) && (i4.current && i4.current != n2.__e || B(i4, null, u4)), null != (i4 = n2.__c)) {
      if (i4.componentWillUnmount) try {
        i4.componentWillUnmount();
      } catch (n3) {
        l.__e(n3, u4);
      }
      i4.base = i4.__P = null;
    }
    if (i4 = n2.__k) for (r3 = 0; r3 < i4.length; r3++) i4[r3] && D(i4[r3], u4, t3 || "function" != typeof n2.type);
    t3 || g(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
  }
  function E(n2, l3, u4) {
    return this.constructor(n2, u4);
  }
  function G(u4, t3, i4) {
    var r3, o3, e3, f4;
    t3 == document && (t3 = document.documentElement), l.__ && l.__(u4, t3), o3 = (r3 = "function" == typeof i4) ? null : i4 && i4.__k || t3.__k, e3 = [], f4 = [], O(t3, u4 = (!r3 && i4 || t3).__k = _(k, null, [u4]), o3 || p, p, t3.namespaceURI, !r3 && i4 ? [i4] : o3 ? null : t3.firstChild ? n.call(t3.childNodes) : null, e3, !r3 && i4 ? i4 : o3 ? o3.__e : t3.firstChild, r3, f4), N(e3, u4, f4);
  }
  function J(n2, l3) {
    G(n2, l3, J);
  }
  function K(l3, u4, t3) {
    var i4, r3, o3, e3, f4 = d({}, l3.props);
    for (o3 in l3.type && l3.type.defaultProps && (e3 = l3.type.defaultProps), u4) "key" == o3 ? i4 = u4[o3] : "ref" == o3 ? r3 = u4[o3] : f4[o3] = void 0 === u4[o3] && null != e3 ? e3[o3] : u4[o3];
    return arguments.length > 2 && (f4.children = arguments.length > 3 ? n.call(arguments, 2) : t3), m(l3.type, f4, i4 || l3.key, r3 || l3.ref, null);
  }
  function Q(n2) {
    function l3(n3) {
      var u4, t3;
      return this.getChildContext || (u4 = /* @__PURE__ */ new Set(), (t3 = {})[l3.__c] = this, this.getChildContext = function() {
        return t3;
      }, this.componentWillUnmount = function() {
        u4 = null;
      }, this.shouldComponentUpdate = function(n4) {
        this.props.value != n4.value && u4.forEach(function(n5) {
          n5.__e = true, M(n5);
        });
      }, this.sub = function(n4) {
        u4.add(n4);
        var l4 = n4.componentWillUnmount;
        n4.componentWillUnmount = function() {
          u4 && u4.delete(n4), l4 && l4.call(n4);
        };
      }), n3.children;
    }
    return l3.__c = "__cC" + h++, l3.__ = n2, l3.Provider = l3.__l = (l3.Consumer = function(n3, l4) {
      return n3.children(l4);
    }).contextType = l3, l3;
  }
  var n, l, u, t, i, r, o, e, f, c, s, a, h, p, v, y, w;
  var init_preact_module = __esm({
    "apps/larry-vscode-ext/node_modules/preact/dist/preact.module.js"() {
      p = {};
      v = [];
      y = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
      w = Array.isArray;
      n = v.slice, l = { __e: function(n2, l3, u4, t3) {
        for (var i4, r3, o3; l3 = l3.__; ) if ((i4 = l3.__c) && !i4.__) try {
          if ((r3 = i4.constructor) && null != r3.getDerivedStateFromError && (i4.setState(r3.getDerivedStateFromError(n2)), o3 = i4.__d), null != i4.componentDidCatch && (i4.componentDidCatch(n2, t3 || {}), o3 = i4.__d), o3) return i4.__E = i4;
        } catch (l4) {
          n2 = l4;
        }
        throw n2;
      } }, u = 0, t = function(n2) {
        return null != n2 && null == n2.constructor;
      }, x.prototype.setState = function(n2, l3) {
        var u4;
        u4 = null != this.__s && this.__s != this.state ? this.__s : this.__s = d({}, this.state), "function" == typeof n2 && (n2 = n2(d({}, u4), this.props)), n2 && d(u4, n2), null != n2 && this.__v && (l3 && this._sb.push(l3), M(this));
      }, x.prototype.forceUpdate = function(n2) {
        this.__v && (this.__e = true, n2 && this.__h.push(n2), M(this));
      }, x.prototype.render = k, i = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e = function(n2, l3) {
        return n2.__v.__b - l3.__v.__b;
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
  function p2(n2, t3) {
    c2.__h && c2.__h(r2, n2, o2 || t3), o2 = 0;
    var u4 = r2.__H || (r2.__H = { __: [], __h: [] });
    return n2 >= u4.__.length && u4.__.push({}), u4.__[n2];
  }
  function d2(n2) {
    return o2 = 1, h2(D2, n2);
  }
  function h2(n2, u4, i4) {
    var o3 = p2(t2++, 2);
    if (o3.t = n2, !o3.__c && (o3.__ = [i4 ? i4(u4) : D2(void 0, u4), function(n3) {
      var t3 = o3.__N ? o3.__N[0] : o3.__[0], r3 = o3.t(t3, n3);
      t3 !== r3 && (o3.__N = [r3, o3.__[1]], o3.__c.setState({}));
    }], o3.__c = r2, !r2.__f)) {
      var f4 = function(n3, t3, r3) {
        if (!o3.__c.__H) return true;
        var u5 = o3.__c.__H.__.filter(function(n4) {
          return !!n4.__c;
        });
        if (u5.every(function(n4) {
          return !n4.__N;
        })) return !c3 || c3.call(this, n3, t3, r3);
        var i5 = o3.__c.props !== n3;
        return u5.forEach(function(n4) {
          if (n4.__N) {
            var t4 = n4.__[0];
            n4.__ = n4.__N, n4.__N = void 0, t4 !== n4.__[0] && (i5 = true);
          }
        }), c3 && c3.call(this, n3, t3, r3) || i5;
      };
      r2.__f = true;
      var c3 = r2.shouldComponentUpdate, e3 = r2.componentWillUpdate;
      r2.componentWillUpdate = function(n3, t3, r3) {
        if (this.__e) {
          var u5 = c3;
          c3 = void 0, f4(n3, t3, r3), c3 = u5;
        }
        e3 && e3.call(this, n3, t3, r3);
      }, r2.shouldComponentUpdate = f4;
    }
    return o3.__N || o3.__;
  }
  function y2(n2, u4) {
    var i4 = p2(t2++, 3);
    !c2.__s && C2(i4.__H, u4) && (i4.__ = n2, i4.u = u4, r2.__H.__h.push(i4));
  }
  function _2(n2, u4) {
    var i4 = p2(t2++, 4);
    !c2.__s && C2(i4.__H, u4) && (i4.__ = n2, i4.u = u4, r2.__h.push(i4));
  }
  function A2(n2) {
    return o2 = 5, T2(function() {
      return { current: n2 };
    }, []);
  }
  function F2(n2, t3, r3) {
    o2 = 6, _2(function() {
      if ("function" == typeof n2) {
        var r4 = n2(t3());
        return function() {
          n2(null), r4 && "function" == typeof r4 && r4();
        };
      }
      if (n2) return n2.current = t3(), function() {
        return n2.current = null;
      };
    }, null == r3 ? r3 : r3.concat(n2));
  }
  function T2(n2, r3) {
    var u4 = p2(t2++, 7);
    return C2(u4.__H, r3) && (u4.__ = n2(), u4.__H = r3, u4.__h = n2), u4.__;
  }
  function q2(n2, t3) {
    return o2 = 8, T2(function() {
      return n2;
    }, t3);
  }
  function x2(n2) {
    var u4 = r2.context[n2.__c], i4 = p2(t2++, 9);
    return i4.c = n2, u4 ? (null == i4.__ && (i4.__ = true, u4.sub(r2)), u4.props.value) : n2.__;
  }
  function P2(n2, t3) {
    c2.useDebugValue && c2.useDebugValue(t3 ? t3(n2) : n2);
  }
  function b2(n2) {
    var u4 = p2(t2++, 10), i4 = d2();
    return u4.__ = n2, r2.componentDidCatch || (r2.componentDidCatch = function(n3, t3) {
      u4.__ && u4.__(n3, t3), i4[1](n3);
    }), [i4[0], function() {
      i4[1](void 0);
    }];
  }
  function g2() {
    var n2 = p2(t2++, 11);
    if (!n2.__) {
      for (var u4 = r2.__v; null !== u4 && !u4.__m && null !== u4.__; ) u4 = u4.__;
      var i4 = u4.__m || (u4.__m = [0, 0]);
      n2.__ = "P" + i4[0] + "-" + i4[1]++;
    }
    return n2.__;
  }
  function j2() {
    for (var n2; n2 = f2.shift(); ) if (n2.__P && n2.__H) try {
      n2.__H.__h.forEach(z2), n2.__H.__h.forEach(B2), n2.__H.__h = [];
    } catch (t3) {
      n2.__H.__h = [], c2.__e(t3, n2.__v);
    }
  }
  function w2(n2) {
    var t3, r3 = function() {
      clearTimeout(u4), k2 && cancelAnimationFrame(t3), setTimeout(n2);
    }, u4 = setTimeout(r3, 35);
    k2 && (t3 = requestAnimationFrame(r3));
  }
  function z2(n2) {
    var t3 = r2, u4 = n2.__c;
    "function" == typeof u4 && (n2.__c = void 0, u4()), r2 = t3;
  }
  function B2(n2) {
    var t3 = r2;
    n2.__c = n2.__(), r2 = t3;
  }
  function C2(n2, t3) {
    return !n2 || n2.length !== t3.length || t3.some(function(t4, r3) {
      return t4 !== n2[r3];
    });
  }
  function D2(n2, t3) {
    return "function" == typeof t3 ? t3(n2) : t3;
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
      c2.__b = function(n2) {
        r2 = null, e2 && e2(n2);
      }, c2.__ = function(n2, t3) {
        n2 && t3.__k && t3.__k.__m && (n2.__m = t3.__k.__m), s2 && s2(n2, t3);
      }, c2.__r = function(n2) {
        a2 && a2(n2), t2 = 0;
        var i4 = (r2 = n2.__c).__H;
        i4 && (u2 === r2 ? (i4.__h = [], r2.__h = [], i4.__.forEach(function(n3) {
          n3.__N && (n3.__ = n3.__N), n3.u = n3.__N = void 0;
        })) : (i4.__h.forEach(z2), i4.__h.forEach(B2), i4.__h = [], t2 = 0)), u2 = r2;
      }, c2.diffed = function(n2) {
        v2 && v2(n2);
        var t3 = n2.__c;
        t3 && t3.__H && (t3.__H.__h.length && (1 !== f2.push(t3) && i2 === c2.requestAnimationFrame || ((i2 = c2.requestAnimationFrame) || w2)(j2)), t3.__H.__.forEach(function(n3) {
          n3.u && (n3.__H = n3.u), n3.u = void 0;
        })), u2 = r2 = null;
      }, c2.__c = function(n2, t3) {
        t3.some(function(n3) {
          try {
            n3.__h.forEach(z2), n3.__h = n3.__h.filter(function(n4) {
              return !n4.__ || B2(n4);
            });
          } catch (r3) {
            t3.some(function(n4) {
              n4.__h && (n4.__h = []);
            }), t3 = [], c2.__e(r3, n3.__v);
          }
        }), l2 && l2(n2, t3);
      }, c2.unmount = function(n2) {
        m2 && m2(n2);
        var t3, r3 = n2.__c;
        r3 && r3.__H && (r3.__H.__.forEach(function(n3) {
          try {
            z2(n3);
          } catch (n4) {
            t3 = n4;
          }
        }), r3.__H = void 0, t3 && c2.__e(t3, r3.__v));
      };
      k2 = "function" == typeof requestAnimationFrame;
    }
  });

  // apps/larry-vscode-ext/node_modules/preact/compat/dist/compat.js
  var require_compat = __commonJS({
    "apps/larry-vscode-ext/node_modules/preact/compat/dist/compat.js"(exports) {
      var n2 = (init_preact_module(), __toCommonJS(preact_module_exports));
      var t3 = (init_hooks_module(), __toCommonJS(hooks_module_exports));
      function e3(n3, t4) {
        for (var e4 in t4) n3[e4] = t4[e4];
        return n3;
      }
      function r3(n3, t4) {
        for (var e4 in n3) if ("__source" !== e4 && !(e4 in t4)) return true;
        for (var r4 in t4) if ("__source" !== r4 && n3[r4] !== t4[r4]) return true;
        return false;
      }
      function u4(n3, e4) {
        var r4 = e4(), u5 = t3.useState({ t: { __: r4, u: e4 } }), i5 = u5[0].t, c4 = u5[1];
        return t3.useLayoutEffect(function() {
          i5.__ = r4, i5.u = e4, o3(i5) && c4({ t: i5 });
        }, [n3, r4, e4]), t3.useEffect(function() {
          return o3(i5) && c4({ t: i5 }), n3(function() {
            o3(i5) && c4({ t: i5 });
          });
        }, [n3]), r4;
      }
      function o3(n3) {
        var t4, e4, r4 = n3.u, u5 = n3.__;
        try {
          var o4 = r4();
          return !((t4 = u5) === (e4 = o4) && (0 !== t4 || 1 / t4 == 1 / e4) || t4 != t4 && e4 != e4);
        } catch (n4) {
          return true;
        }
      }
      function i4(n3) {
        n3();
      }
      function c3(n3) {
        return n3;
      }
      function l3() {
        return [false, i4];
      }
      var f4 = t3.useLayoutEffect;
      function a3(n3, t4) {
        this.props = n3, this.context = t4;
      }
      function s3(t4, e4) {
        function u5(n3) {
          var t5 = this.props.ref, u6 = t5 == n3.ref;
          return !u6 && t5 && (t5.call ? t5(null) : t5.current = null), e4 ? !e4(this.props, n3) || !u6 : r3(this.props, n3);
        }
        function o4(e5) {
          return this.shouldComponentUpdate = u5, n2.createElement(t4, e5);
        }
        return o4.displayName = "Memo(" + (t4.displayName || t4.name) + ")", o4.prototype.isReactComponent = true, o4.__f = true, o4.type = t4, o4;
      }
      (a3.prototype = new n2.Component()).isPureReactComponent = true, a3.prototype.shouldComponentUpdate = function(n3, t4) {
        return r3(this.props, n3) || r3(this.state, t4);
      };
      var p3 = n2.options.__b;
      n2.options.__b = function(n3) {
        n3.type && n3.type.__f && n3.ref && (n3.props.ref = n3.ref, n3.ref = null), p3 && p3(n3);
      };
      var h3 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
      function v3(n3) {
        function t4(t5) {
          var r4 = e3({}, t5);
          return delete r4.ref, n3(r4, t5.ref || null);
        }
        return t4.$$typeof = h3, t4.render = n3, t4.prototype.isReactComponent = t4.__f = true, t4.displayName = "ForwardRef(" + (n3.displayName || n3.name) + ")", t4;
      }
      var d3 = function(t4, e4) {
        return null == t4 ? null : n2.toChildArray(n2.toChildArray(t4).map(e4));
      };
      var m3 = { map: d3, forEach: d3, count: function(t4) {
        return t4 ? n2.toChildArray(t4).length : 0;
      }, only: function(t4) {
        var e4 = n2.toChildArray(t4);
        if (1 !== e4.length) throw "Children.only";
        return e4[0];
      }, toArray: n2.toChildArray };
      var x3 = n2.options.__e;
      n2.options.__e = function(n3, t4, e4, r4) {
        if (n3.then) {
          for (var u5, o4 = t4; o4 = o4.__; ) if ((u5 = o4.__c) && u5.__c) return null == t4.__e && (t4.__e = e4.__e, t4.__k = e4.__k), u5.__c(n3, t4);
        }
        x3(n3, t4, e4, r4);
      };
      var b3 = n2.options.unmount;
      function _3(n3, t4, r4) {
        return n3 && (n3.__c && n3.__c.__H && (n3.__c.__H.__.forEach(function(n4) {
          "function" == typeof n4.__c && n4.__c();
        }), n3.__c.__H = null), null != (n3 = e3({}, n3)).__c && (n3.__c.__P === r4 && (n3.__c.__P = t4), n3.__c.__e = true, n3.__c = null), n3.__k = n3.__k && n3.__k.map(function(n4) {
          return _3(n4, t4, r4);
        })), n3;
      }
      function y3(n3, t4, e4) {
        return n3 && e4 && (n3.__v = null, n3.__k = n3.__k && n3.__k.map(function(n4) {
          return y3(n4, t4, e4);
        }), n3.__c && n3.__c.__P === t4 && (n3.__e && e4.appendChild(n3.__e), n3.__c.__e = true, n3.__c.__P = e4)), n3;
      }
      function g3() {
        this.__u = 0, this.o = null, this.__b = null;
      }
      function S2(n3) {
        var t4 = n3.__.__c;
        return t4 && t4.__a && t4.__a(n3);
      }
      function E2(t4) {
        var e4, r4, u5;
        function o4(o5) {
          if (e4 || (e4 = t4()).then(function(n3) {
            r4 = n3.default || n3;
          }, function(n3) {
            u5 = n3;
          }), u5) throw u5;
          if (!r4) throw e4;
          return n2.createElement(r4, o5);
        }
        return o4.displayName = "Lazy", o4.__f = true, o4;
      }
      function C3() {
        this.i = null, this.l = null;
      }
      n2.options.unmount = function(n3) {
        var t4 = n3.__c;
        t4 && t4.__R && t4.__R(), t4 && 32 & n3.__u && (n3.type = null), b3 && b3(n3);
      }, (g3.prototype = new n2.Component()).__c = function(n3, t4) {
        var e4 = t4.__c, r4 = this;
        null == r4.o && (r4.o = []), r4.o.push(e4);
        var u5 = S2(r4.__v), o4 = false, i5 = function() {
          o4 || (o4 = true, e4.__R = null, u5 ? u5(c4) : c4());
        };
        e4.__R = i5;
        var c4 = function() {
          if (!--r4.__u) {
            if (r4.state.__a) {
              var n4 = r4.state.__a;
              r4.__v.__k[0] = y3(n4, n4.__c.__P, n4.__c.__O);
            }
            var t5;
            for (r4.setState({ __a: r4.__b = null }); t5 = r4.o.pop(); ) t5.forceUpdate();
          }
        };
        r4.__u++ || 32 & t4.__u || r4.setState({ __a: r4.__b = r4.__v.__k[0] }), n3.then(i5, i5);
      }, g3.prototype.componentWillUnmount = function() {
        this.o = [];
      }, g3.prototype.render = function(t4, e4) {
        if (this.__b) {
          if (this.__v.__k) {
            var r4 = document.createElement("div"), u5 = this.__v.__k[0].__c;
            this.__v.__k[0] = _3(this.__b, r4, u5.__O = u5.__P);
          }
          this.__b = null;
        }
        var o4 = e4.__a && n2.createElement(n2.Fragment, null, t4.fallback);
        return o4 && (o4.__u &= -33), [n2.createElement(n2.Fragment, null, e4.__a ? null : t4.children), o4];
      };
      var O2 = function(n3, t4, e4) {
        if (++e4[1] === e4[0] && n3.l.delete(t4), n3.props.revealOrder && ("t" !== n3.props.revealOrder[0] || !n3.l.size)) for (e4 = n3.i; e4; ) {
          for (; e4.length > 3; ) e4.pop()();
          if (e4[1] < e4[0]) break;
          n3.i = e4 = e4[2];
        }
      };
      function R(n3) {
        return this.getChildContext = function() {
          return n3.context;
        }, n3.children;
      }
      function w3(t4) {
        var e4 = this, r4 = t4.p;
        if (e4.componentWillUnmount = function() {
          n2.render(null, e4.h), e4.h = null, e4.p = null;
        }, e4.p && e4.p !== r4 && e4.componentWillUnmount(), !e4.h) {
          for (var u5 = e4.__v; null !== u5 && !u5.__m && null !== u5.__; ) u5 = u5.__;
          e4.p = r4, e4.h = { nodeType: 1, parentNode: r4, childNodes: [], __k: { __m: u5.__m }, contains: function() {
            return true;
          }, insertBefore: function(n3, t5) {
            this.childNodes.push(n3), e4.p.insertBefore(n3, t5);
          }, removeChild: function(n3) {
            this.childNodes.splice(this.childNodes.indexOf(n3) >>> 1, 1), e4.p.removeChild(n3);
          } };
        }
        n2.render(n2.createElement(R, { context: e4.context }, t4.__v), e4.h);
      }
      function j3(t4, e4) {
        var r4 = n2.createElement(w3, { __v: t4, p: e4 });
        return r4.containerInfo = e4, r4;
      }
      (C3.prototype = new n2.Component()).__a = function(n3) {
        var t4 = this, e4 = S2(t4.__v), r4 = t4.l.get(n3);
        return r4[0]++, function(u5) {
          var o4 = function() {
            t4.props.revealOrder ? (r4.push(u5), O2(t4, n3, r4)) : u5();
          };
          e4 ? e4(o4) : o4();
        };
      }, C3.prototype.render = function(t4) {
        this.i = null, this.l = /* @__PURE__ */ new Map();
        var e4 = n2.toChildArray(t4.children);
        t4.revealOrder && "b" === t4.revealOrder[0] && e4.reverse();
        for (var r4 = e4.length; r4--; ) this.l.set(e4[r4], this.i = [1, 0, this.i]);
        return t4.children;
      }, C3.prototype.componentDidUpdate = C3.prototype.componentDidMount = function() {
        var n3 = this;
        this.l.forEach(function(t4, e4) {
          O2(n3, e4, t4);
        });
      };
      var k3 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
      var I2 = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
      var N2 = /^on(Ani|Tra|Tou|BeforeInp|Compo)/;
      var M2 = /[A-Z0-9]/g;
      var T3 = "undefined" != typeof document;
      var A3 = function(n3) {
        return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(n3);
      };
      function D3(t4, e4, r4) {
        return null == e4.__k && (e4.textContent = ""), n2.render(t4, e4), "function" == typeof r4 && r4(), t4 ? t4.__c : null;
      }
      function L2(t4, e4, r4) {
        return n2.hydrate(t4, e4), "function" == typeof r4 && r4(), t4 ? t4.__c : null;
      }
      n2.Component.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t4) {
        Object.defineProperty(n2.Component.prototype, t4, { configurable: true, get: function() {
          return this["UNSAFE_" + t4];
        }, set: function(n3) {
          Object.defineProperty(this, t4, { configurable: true, writable: true, value: n3 });
        } });
      });
      var F3 = n2.options.event;
      function U() {
      }
      function V2() {
        return this.cancelBubble;
      }
      function W() {
        return this.defaultPrevented;
      }
      n2.options.event = function(n3) {
        return F3 && (n3 = F3(n3)), n3.persist = U, n3.isPropagationStopped = V2, n3.isDefaultPrevented = W, n3.nativeEvent = n3;
      };
      var P3;
      var z3 = { enumerable: false, configurable: true, get: function() {
        return this.class;
      } };
      var B3 = n2.options.vnode;
      n2.options.vnode = function(t4) {
        "string" == typeof t4.type && function(t5) {
          var e4 = t5.props, r4 = t5.type, u5 = {}, o4 = -1 === r4.indexOf("-");
          for (var i5 in e4) {
            var c4 = e4[i5];
            if (!("value" === i5 && "defaultValue" in e4 && null == c4 || T3 && "children" === i5 && "noscript" === r4 || "class" === i5 || "className" === i5)) {
              var l4 = i5.toLowerCase();
              "defaultValue" === i5 && "value" in e4 && null == e4.value ? i5 = "value" : "download" === i5 && true === c4 ? c4 = "" : "translate" === l4 && "no" === c4 ? c4 = false : "o" === l4[0] && "n" === l4[1] ? "ondoubleclick" === l4 ? i5 = "ondblclick" : "onchange" !== l4 || "input" !== r4 && "textarea" !== r4 || A3(e4.type) ? "onfocus" === l4 ? i5 = "onfocusin" : "onblur" === l4 ? i5 = "onfocusout" : N2.test(i5) && (i5 = l4) : l4 = i5 = "oninput" : o4 && I2.test(i5) ? i5 = i5.replace(M2, "-$&").toLowerCase() : null === c4 && (c4 = void 0), "oninput" === l4 && u5[i5 = l4] && (i5 = "oninputCapture"), u5[i5] = c4;
            }
          }
          "select" == r4 && u5.multiple && Array.isArray(u5.value) && (u5.value = n2.toChildArray(e4.children).forEach(function(n3) {
            n3.props.selected = -1 != u5.value.indexOf(n3.props.value);
          })), "select" == r4 && null != u5.defaultValue && (u5.value = n2.toChildArray(e4.children).forEach(function(n3) {
            n3.props.selected = u5.multiple ? -1 != u5.defaultValue.indexOf(n3.props.value) : u5.defaultValue == n3.props.value;
          })), e4.class && !e4.className ? (u5.class = e4.class, Object.defineProperty(u5, "className", z3)) : (e4.className && !e4.class || e4.class && e4.className) && (u5.class = u5.className = e4.className), t5.props = u5;
        }(t4), t4.$$typeof = k3, B3 && B3(t4);
      };
      var H2 = n2.options.__r;
      n2.options.__r = function(n3) {
        H2 && H2(n3), P3 = n3.__c;
      };
      var q3 = n2.options.diffed;
      n2.options.diffed = function(n3) {
        q3 && q3(n3);
        var t4 = n3.props, e4 = n3.__e;
        null != e4 && "textarea" === n3.type && "value" in t4 && t4.value !== e4.value && (e4.value = null == t4.value ? "" : t4.value), P3 = null;
      };
      var Z = { ReactCurrentDispatcher: { current: { readContext: function(n3) {
        return P3.__n[n3.__c].props.value;
      }, useCallback: t3.useCallback, useContext: t3.useContext, useDebugValue: t3.useDebugValue, useDeferredValue: c3, useEffect: t3.useEffect, useId: t3.useId, useImperativeHandle: t3.useImperativeHandle, useInsertionEffect: f4, useLayoutEffect: t3.useLayoutEffect, useMemo: t3.useMemo, useReducer: t3.useReducer, useRef: t3.useRef, useState: t3.useState, useSyncExternalStore: u4, useTransition: l3 } } };
      function Y(t4) {
        return n2.createElement.bind(null, t4);
      }
      function $2(n3) {
        return !!n3 && n3.$$typeof === k3;
      }
      function G2(t4) {
        return $2(t4) && t4.type === n2.Fragment;
      }
      function J2(n3) {
        return !!n3 && !!n3.displayName && ("string" == typeof n3.displayName || n3.displayName instanceof String) && n3.displayName.startsWith("Memo(");
      }
      function K2(t4) {
        return $2(t4) ? n2.cloneElement.apply(null, arguments) : t4;
      }
      function Q2(t4) {
        return !!t4.__k && (n2.render(null, t4), true);
      }
      function X(n3) {
        return n3 && (n3.base || 1 === n3.nodeType && n3) || null;
      }
      var nn = function(n3, t4) {
        return n3(t4);
      };
      var tn = function(n3, t4) {
        return n3(t4);
      };
      var en = n2.Fragment;
      var rn = $2;
      var un = { useState: t3.useState, useId: t3.useId, useReducer: t3.useReducer, useEffect: t3.useEffect, useLayoutEffect: t3.useLayoutEffect, useInsertionEffect: f4, useTransition: l3, useDeferredValue: c3, useSyncExternalStore: u4, startTransition: i4, useRef: t3.useRef, useImperativeHandle: t3.useImperativeHandle, useMemo: t3.useMemo, useCallback: t3.useCallback, useContext: t3.useContext, useDebugValue: t3.useDebugValue, version: "18.3.1", Children: m3, render: D3, hydrate: L2, unmountComponentAtNode: Q2, createPortal: j3, createElement: n2.createElement, createContext: n2.createContext, createFactory: Y, cloneElement: K2, createRef: n2.createRef, Fragment: n2.Fragment, isValidElement: $2, isElement: rn, isFragment: G2, isMemo: J2, findDOMNode: X, Component: n2.Component, PureComponent: a3, memo: s3, forwardRef: v3, flushSync: tn, unstable_batchedUpdates: nn, StrictMode: en, Suspense: g3, SuspenseList: C3, lazy: E2, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Z };
      Object.defineProperty(exports, "Component", { enumerable: true, get: function() {
        return n2.Component;
      } }), Object.defineProperty(exports, "Fragment", { enumerable: true, get: function() {
        return n2.Fragment;
      } }), Object.defineProperty(exports, "createContext", { enumerable: true, get: function() {
        return n2.createContext;
      } }), Object.defineProperty(exports, "createElement", { enumerable: true, get: function() {
        return n2.createElement;
      } }), Object.defineProperty(exports, "createRef", { enumerable: true, get: function() {
        return n2.createRef;
      } }), exports.Children = m3, exports.PureComponent = a3, exports.StrictMode = en, exports.Suspense = g3, exports.SuspenseList = C3, exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Z, exports.cloneElement = K2, exports.createFactory = Y, exports.createPortal = j3, exports.default = un, exports.findDOMNode = X, exports.flushSync = tn, exports.forwardRef = v3, exports.hydrate = L2, exports.isElement = rn, exports.isFragment = G2, exports.isMemo = J2, exports.isValidElement = $2, exports.lazy = E2, exports.memo = s3, exports.render = D3, exports.startTransition = i4, exports.unmountComponentAtNode = Q2, exports.unstable_batchedUpdates = nn, exports.useDeferredValue = c3, exports.useInsertionEffect = f4, exports.useSyncExternalStore = u4, exports.useTransition = l3, exports.version = "18.3.1", Object.keys(t3).forEach(function(n3) {
        "default" === n3 || exports.hasOwnProperty(n3) || Object.defineProperty(exports, n3, { enumerable: true, get: function() {
          return t3[n3];
        } });
      });
    }
  });

  // apps/larry-vscode-ext/node_modules/preact/jsx-runtime/dist/jsxRuntime.js
  var require_jsxRuntime = __commonJS({
    "apps/larry-vscode-ext/node_modules/preact/jsx-runtime/dist/jsxRuntime.js"(exports) {
      var r3 = (init_preact_module(), __toCommonJS(preact_module_exports));
      var e3 = /["&<]/;
      function t3(r4) {
        if (0 === r4.length || false === e3.test(r4)) return r4;
        for (var t4 = 0, n3 = 0, o4 = "", f5 = ""; n3 < r4.length; n3++) {
          switch (r4.charCodeAt(n3)) {
            case 34:
              f5 = "&quot;";
              break;
            case 38:
              f5 = "&amp;";
              break;
            case 60:
              f5 = "&lt;";
              break;
            default:
              continue;
          }
          n3 !== t4 && (o4 += r4.slice(t4, n3)), o4 += f5, t4 = n3 + 1;
        }
        return n3 !== t4 && (o4 += r4.slice(t4, n3)), o4;
      }
      var n2 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
      var o3 = 0;
      var f4 = Array.isArray;
      function u4(e4, t4, n3, f5, u5, i5) {
        t4 || (t4 = {});
        var c4, a3, p3 = t4;
        if ("ref" in p3) for (a3 in p3 = {}, t4) "ref" == a3 ? c4 = t4[a3] : p3[a3] = t4[a3];
        var l3 = { type: e4, props: p3, key: n3, ref: c4, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --o3, __i: -1, __u: 0, __source: u5, __self: i5 };
        if ("function" == typeof e4 && (c4 = e4.defaultProps)) for (a3 in c4) void 0 === p3[a3] && (p3[a3] = c4[a3]);
        return r3.options.vnode && r3.options.vnode(l3), l3;
      }
      var i4 = {};
      var c3 = /[A-Z]/g;
      Object.defineProperty(exports, "Fragment", { enumerable: true, get: function() {
        return r3.Fragment;
      } }), exports.jsx = u4, exports.jsxAttr = function(e4, o4) {
        if (r3.options.attr) {
          var f5 = r3.options.attr(e4, o4);
          if ("string" == typeof f5) return f5;
        }
        if (o4 = function(r4) {
          return null !== r4 && "object" == typeof r4 && "function" == typeof r4.valueOf ? r4.valueOf() : r4;
        }(o4), "ref" === e4 || "key" === e4) return "";
        if ("style" === e4 && "object" == typeof o4) {
          var u5 = "";
          for (var a3 in o4) {
            var p3 = o4[a3];
            if (null != p3 && "" !== p3) {
              var l3 = "-" == a3[0] ? a3 : i4[a3] || (i4[a3] = a3.replace(c3, "-$&").toLowerCase()), s3 = ";";
              "number" != typeof p3 || l3.startsWith("--") || n2.test(l3) || (s3 = "px;"), u5 = u5 + l3 + ":" + p3 + s3;
            }
          }
          return e4 + '="' + t3(u5) + '"';
        }
        return null == o4 || false === o4 || "function" == typeof o4 || "object" == typeof o4 ? "" : true === o4 ? e4 : e4 + '="' + t3("" + o4) + '"';
      }, exports.jsxDEV = u4, exports.jsxEscape = function r4(e4) {
        if (null == e4 || "boolean" == typeof e4 || "function" == typeof e4) return null;
        if ("object" == typeof e4) {
          if (void 0 === e4.constructor) return e4;
          if (f4(e4)) {
            for (var n3 = 0; n3 < e4.length; n3++) e4[n3] = r4(e4[n3]);
            return e4;
          }
        }
        return t3("" + e4);
      }, exports.jsxTemplate = function(e4) {
        var t4 = u4(r3.Fragment, { tpl: e4, exprs: [].slice.call(arguments, 1) });
        return t4.key = t4.__v, t4;
      }, exports.jsxs = u4;
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
      (_3, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
        result[key] = val[key];
        return result;
      }, {}) : val
    );
  }
  function partialMatchKey(a3, b3) {
    if (a3 === b3) {
      return true;
    }
    if (typeof a3 !== typeof b3) {
      return false;
    }
    if (a3 && b3 && typeof a3 === "object" && typeof b3 === "object") {
      return Object.keys(b3).every((key) => partialMatchKey(a3[key], b3[key]));
    }
    return false;
  }
  var hasOwn = Object.prototype.hasOwnProperty;
  function replaceEqualDeep(a3, b3) {
    if (a3 === b3) {
      return a3;
    }
    const array = isPlainArray(a3) && isPlainArray(b3);
    if (!array && !(isPlainObject(a3) && isPlainObject(b3))) return b3;
    const aItems = array ? a3 : Object.keys(a3);
    const aSize = aItems.length;
    const bItems = array ? b3 : Object.keys(b3);
    const bSize = bItems.length;
    const copy = array ? new Array(bSize) : {};
    let equalItems = 0;
    for (let i4 = 0; i4 < bSize; i4++) {
      const key = array ? i4 : bItems[i4];
      const aItem = a3[key];
      const bItem = b3[key];
      if (aItem === bItem) {
        copy[key] = aItem;
        if (array ? i4 < aSize : hasOwn.call(a3, key)) equalItems++;
        continue;
      }
      if (aItem === null || bItem === null || typeof aItem !== "object" || typeof bItem !== "object") {
        copy[key] = bItem;
        continue;
      }
      const v3 = replaceEqualDeep(aItem, bItem);
      copy[key] = v3;
      if (v3 === aItem) equalItems++;
    }
    return aSize === bSize && equalItems === aSize ? a3 : copy;
  }
  function shallowEqualObjects(a3, b3) {
    if (!b3 || Object.keys(a3).length !== Object.keys(b3).length) {
      return false;
    }
    for (const key in a3) {
      if (a3[key] !== b3[key]) {
        return false;
      }
    }
    return true;
  }
  function isPlainArray(value) {
    return Array.isArray(value) && value.length === Object.keys(value).length;
  }
  function isPlainObject(o3) {
    if (!hasObjectPrototype(o3)) {
      return false;
    }
    const ctor = o3.constructor;
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
    if (Object.getPrototypeOf(o3) !== Object.prototype) {
      return false;
    }
    return true;
  }
  function hasObjectPrototype(o3) {
    return Object.prototype.toString.call(o3) === "[object Object]";
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
      const observer = this.observers.find((x3) => x3.shouldFetchOnWindowFocus());
      observer?.refetch({ cancelRefetch: false });
      __privateGet(this, _retryer)?.continue();
    }
    onOnline() {
      const observer = this.observers.find((x3) => x3.shouldFetchOnReconnect());
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
        this.observers = this.observers.filter((x3) => x3 !== observer);
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
        const observer = this.observers.find((x3) => x3.options.queryFn);
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
      __privateSet(this, _observers, __privateGet(this, _observers).filter((x3) => x3 !== observer));
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
          (m3) => m3.state.status === "pending"
        );
        return !firstPendingMutation || firstPendingMutation === mutation;
      } else {
        return true;
      }
    }
    runNext(mutation) {
      const scope = scopeFor(mutation);
      if (typeof scope === "string") {
        const foundMutation = __privateGet(this, _scopes).get(scope)?.find((m3) => m3 !== mutation && m3.state.isPaused);
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
      const pausedMutations = this.getAll().filter((x3) => x3.state.isPaused);
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
  function u3(e3, t3, n2, o3, i4, u4) {
    t3 || (t3 = {});
    var a3, c3, p3 = t3;
    if ("ref" in p3) for (c3 in p3 = {}, t3) "ref" == c3 ? a3 = t3[c3] : p3[c3] = t3[c3];
    var l3 = { type: e3, props: p3, key: n2, ref: a3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f3, __i: -1, __u: 0, __source: i4, __self: u4 };
    if ("function" == typeof e3 && (a3 = e3.defaultProps)) for (c3 in a3) void 0 === p3[c3] && (p3[c3] = a3[c3]);
    return l.vnode && l.vnode(l3), l3;
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
      const text = await res.text();
      throw new Error(
        `${res.status} ${res.statusText}: ${text || "request failed"}`
      );
    }
    return res.json();
  }
  async function fetchThreads(baseUrl) {
    return fetchJSON(`${baseUrl}/threads`);
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
    postMessage: (_3) => void 0
  };
  function postMessage(msg) {
    vscode.postMessage(msg);
  }
  function onMessage(cb) {
    const handler = (e3) => {
      cb(e3.data);
    };
    window.addEventListener("message", handler);
    return () => {
      window.removeEventListener("message", handler);
    };
  }

  // apps/larry-vscode-ext/webview/src/views/components/CustomSelect.tsx
  var import_react3 = __toESM(require_compat());

  // node_modules/lucide-react/dist/esm/createLucideIcon.js
  var import_react2 = __toESM(require_compat());

  // node_modules/lucide-react/dist/esm/shared/src/utils.js
  var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  var mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
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
    const [isOpen, setIsOpen] = (0, import_react3.useState)(false);
    const [searchText, setSearchText] = (0, import_react3.useState)("");
    const [filteredItems, setFilteredItems] = (0, import_react3.useState)(items);
    const inputRef = (0, import_react3.useRef)(null);
    const containerRef = (0, import_react3.useRef)(null);
    (0, import_react3.useEffect)(() => {
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
    (0, import_react3.useEffect)(() => {
      setFilteredItems(items);
    }, [items]);
    const selectedItem = items.find((item) => item.id === selectedId);
    const handleInputClick = () => {
      setIsOpen(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    };
    const handleInputChange = (e3) => {
      setSearchText(e3.target.value);
      if (!isOpen) {
        setIsOpen(true);
      }
    };
    const handleItemSelect = (item) => {
      onSelect(item.id);
      setIsOpen(false);
      setSearchText("");
    };
    const handleKeyDown = (e3) => {
      if (e3.key === "Escape") {
        setIsOpen(false);
        setSearchText("");
      } else if (e3.key === "Enter" && filteredItems.length === 1) {
        handleItemSelect(filteredItems[0]);
      }
    };
    (0, import_react3.useEffect)(() => {
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
          children: filteredItems.length === 0 ? /* @__PURE__ */ u3("div", { className: "p-3 color-fg-muted text-center", children: emptyMessage }) : /* @__PURE__ */ u3("ul", { className: "list-style-none", children: filteredItems.map((item, index) => /* @__PURE__ */ u3(
            "li",
            {
              style: {
                backgroundColor: selectedId === item.id ? "var(--vscode-list-hoverBackground)" : "transparent",
                borderBottom: index === filteredItems.length - 1 ? "none" : "1px solid var(--borderColor-default)",
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
      return items.find((t3) => t3.id === selectedThreadId);
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
            onInput: (e3) => setNewLabel(e3.currentTarget.value)
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
    return /* @__PURE__ */ u3("div", { className: "p-3", children: /* @__PURE__ */ u3(MainRepoScreen, {}) });
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
        const m3 = evt.machine;
        console.log("\u{1F916} Processing machine.updated:", m3);
        queryClient.setQueryData(["machine", { baseUrl, machineId: m3.id }], m3);
        console.log("\u{1F4DD} Updated machine cache for:", m3.id);
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
*/
//# sourceMappingURL=webview.js.map
