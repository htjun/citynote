function gg(i, c) {
  for (var s = 0; s < c.length; s++) {
    const r = c[s]
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const f in r)
        if (f !== "default" && !(f in i)) {
          const m = Object.getOwnPropertyDescriptor(r, f)
          m &&
            Object.defineProperty(
              i,
              f,
              m.get ? m : { enumerable: !0, get: () => r[f] }
            )
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(i, Symbol.toStringTag, { value: "Module" })
  )
}
;(function () {
  const c = document.createElement("link").relList
  if (c && c.supports && c.supports("modulepreload")) return
  for (const f of document.querySelectorAll('link[rel="modulepreload"]')) r(f)
  new MutationObserver((f) => {
    for (const m of f)
      if (m.type === "childList")
        for (const y of m.addedNodes)
          y.tagName === "LINK" && y.rel === "modulepreload" && r(y)
  }).observe(document, { childList: !0, subtree: !0 })
  function s(f) {
    const m = {}
    return (
      f.integrity && (m.integrity = f.integrity),
      f.referrerPolicy && (m.referrerPolicy = f.referrerPolicy),
      f.crossOrigin === "use-credentials"
        ? (m.credentials = "include")
        : f.crossOrigin === "anonymous"
          ? (m.credentials = "omit")
          : (m.credentials = "same-origin"),
      m
    )
  }
  function r(f) {
    if (f.ep) return
    f.ep = !0
    const m = s(f)
    fetch(f.href, m)
  }
})()
function pg(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default")
    ? i.default
    : i
}
var Jr = { exports: {} },
  Zn = {}
var Om
function bg() {
  if (Om) return Zn
  Om = 1
  var i = Symbol.for("react.transitional.element"),
    c = Symbol.for("react.fragment")
  function s(r, f, m) {
    var y = null
    if (
      (m !== void 0 && (y = "" + m),
      f.key !== void 0 && (y = "" + f.key),
      "key" in f)
    ) {
      m = {}
      for (var x in f) x !== "key" && (m[x] = f[x])
    } else m = f
    return (
      (f = m.ref),
      { $$typeof: i, type: r, key: y, ref: f !== void 0 ? f : null, props: m }
    )
  }
  return ((Zn.Fragment = c), (Zn.jsx = s), (Zn.jsxs = s), Zn)
}
var Nm
function Sg() {
  return (Nm || ((Nm = 1), (Jr.exports = bg())), Jr.exports)
}
var N = Sg(),
  $r = { exports: {} },
  ue = {}
var _m
function xg() {
  if (_m) return ue
  _m = 1
  var i = Symbol.for("react.transitional.element"),
    c = Symbol.for("react.portal"),
    s = Symbol.for("react.fragment"),
    r = Symbol.for("react.strict_mode"),
    f = Symbol.for("react.profiler"),
    m = Symbol.for("react.consumer"),
    y = Symbol.for("react.context"),
    x = Symbol.for("react.forward_ref"),
    g = Symbol.for("react.suspense"),
    h = Symbol.for("react.memo"),
    C = Symbol.for("react.lazy"),
    E = Symbol.for("react.activity"),
    w = Symbol.iterator
  function q(b) {
    return b === null || typeof b != "object"
      ? null
      : ((b = (w && b[w]) || b["@@iterator"]),
        typeof b == "function" ? b : null)
  }
  var X = {
      isMounted: function () {
        return !1
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    B = Object.assign,
    H = {}
  function $(b, j, G) {
    ;((this.props = b),
      (this.context = j),
      (this.refs = H),
      (this.updater = G || X))
  }
  ;(($.prototype.isReactComponent = {}),
    ($.prototype.setState = function (b, j) {
      if (typeof b != "object" && typeof b != "function" && b != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        )
      this.updater.enqueueSetState(this, b, j, "setState")
    }),
    ($.prototype.forceUpdate = function (b) {
      this.updater.enqueueForceUpdate(this, b, "forceUpdate")
    }))
  function ne() {}
  ne.prototype = $.prototype
  function I(b, j, G) {
    ;((this.props = b),
      (this.context = j),
      (this.refs = H),
      (this.updater = G || X))
  }
  var K = (I.prototype = new ne())
  ;((K.constructor = I), B(K, $.prototype), (K.isPureReactComponent = !0))
  var fe = Array.isArray
  function de() {}
  var ee = { H: null, A: null, T: null, S: null },
    V = Object.prototype.hasOwnProperty
  function be(b, j, G) {
    var Q = G.ref
    return {
      $$typeof: i,
      type: b,
      key: j,
      ref: Q !== void 0 ? Q : null,
      props: G,
    }
  }
  function ce(b, j) {
    return be(b.type, j, b.props)
  }
  function Me(b) {
    return typeof b == "object" && b !== null && b.$$typeof === i
  }
  function De(b) {
    var j = { "=": "=0", ":": "=2" }
    return (
      "$" +
      b.replace(/[=:]/g, function (G) {
        return j[G]
      })
    )
  }
  var at = /\/+/g
  function tt(b, j) {
    return typeof b == "object" && b !== null && b.key != null
      ? De("" + b.key)
      : j.toString(36)
  }
  function Ne(b) {
    switch (b.status) {
      case "fulfilled":
        return b.value
      case "rejected":
        throw b.reason
      default:
        switch (
          (typeof b.status == "string"
            ? b.then(de, de)
            : ((b.status = "pending"),
              b.then(
                function (j) {
                  b.status === "pending" &&
                    ((b.status = "fulfilled"), (b.value = j))
                },
                function (j) {
                  b.status === "pending" &&
                    ((b.status = "rejected"), (b.reason = j))
                }
              )),
          b.status)
        ) {
          case "fulfilled":
            return b.value
          case "rejected":
            throw b.reason
        }
    }
    throw b
  }
  function _(b, j, G, Q, F) {
    var te = typeof b
    ;(te === "undefined" || te === "boolean") && (b = null)
    var ge = !1
    if (b === null) ge = !0
    else
      switch (te) {
        case "bigint":
        case "string":
        case "number":
          ge = !0
          break
        case "object":
          switch (b.$$typeof) {
            case i:
            case c:
              ge = !0
              break
            case C:
              return ((ge = b._init), _(ge(b._payload), j, G, Q, F))
          }
      }
    if (ge)
      return (
        (F = F(b)),
        (ge = Q === "" ? "." + tt(b, 0) : Q),
        fe(F)
          ? ((G = ""),
            ge != null && (G = ge.replace(at, "$&/") + "/"),
            _(F, j, G, "", function (dl) {
              return dl
            }))
          : F != null &&
            (Me(F) &&
              (F = ce(
                F,
                G +
                  (F.key == null || (b && b.key === F.key)
                    ? ""
                    : ("" + F.key).replace(at, "$&/") + "/") +
                  ge
              )),
            j.push(F)),
        1
      )
    ge = 0
    var Ke = Q === "" ? "." : Q + ":"
    if (fe(b))
      for (var oe = 0; oe < b.length; oe++)
        ((Q = b[oe]), (te = Ke + tt(Q, oe)), (ge += _(Q, j, G, te, F)))
    else if (((oe = q(b)), typeof oe == "function"))
      for (b = oe.call(b), oe = 0; !(Q = b.next()).done; )
        ((Q = Q.value), (te = Ke + tt(Q, oe++)), (ge += _(Q, j, G, te, F)))
    else if (te === "object") {
      if (typeof b.then == "function") return _(Ne(b), j, G, Q, F)
      throw (
        (j = String(b)),
        Error(
          "Objects are not valid as a React child (found: " +
            (j === "[object Object]"
              ? "object with keys {" + Object.keys(b).join(", ") + "}"
              : j) +
            "). If you meant to render a collection of children, use an array instead."
        )
      )
    }
    return ge
  }
  function L(b, j, G) {
    if (b == null) return b
    var Q = [],
      F = 0
    return (
      _(b, Q, "", "", function (te) {
        return j.call(G, te, F++)
      }),
      Q
    )
  }
  function le(b) {
    if (b._status === -1) {
      var j = b._result
      ;((j = j()),
        j.then(
          function (G) {
            ;(b._status === 0 || b._status === -1) &&
              ((b._status = 1), (b._result = G))
          },
          function (G) {
            ;(b._status === 0 || b._status === -1) &&
              ((b._status = 2), (b._result = G))
          }
        ),
        b._status === -1 && ((b._status = 0), (b._result = j)))
    }
    if (b._status === 1) return b._result.default
    throw b._result
  }
  var Se =
      typeof reportError == "function"
        ? reportError
        : function (b) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var j = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof b == "object" &&
                  b !== null &&
                  typeof b.message == "string"
                    ? String(b.message)
                    : String(b),
                error: b,
              })
              if (!window.dispatchEvent(j)) return
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", b)
              return
            }
            console.error(b)
          },
    Y = {
      map: L,
      forEach: function (b, j, G) {
        L(
          b,
          function () {
            j.apply(this, arguments)
          },
          G
        )
      },
      count: function (b) {
        var j = 0
        return (
          L(b, function () {
            j++
          }),
          j
        )
      },
      toArray: function (b) {
        return (
          L(b, function (j) {
            return j
          }) || []
        )
      },
      only: function (b) {
        if (!Me(b))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          )
        return b
      },
    }
  return (
    (ue.Activity = E),
    (ue.Children = Y),
    (ue.Component = $),
    (ue.Fragment = s),
    (ue.Profiler = f),
    (ue.PureComponent = I),
    (ue.StrictMode = r),
    (ue.Suspense = g),
    (ue.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ee),
    (ue.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (b) {
        return ee.H.useMemoCache(b)
      },
    }),
    (ue.cache = function (b) {
      return function () {
        return b.apply(null, arguments)
      }
    }),
    (ue.cacheSignal = function () {
      return null
    }),
    (ue.cloneElement = function (b, j, G) {
      if (b == null)
        throw Error(
          "The argument must be a React element, but you passed " + b + "."
        )
      var Q = B({}, b.props),
        F = b.key
      if (j != null)
        for (te in (j.key !== void 0 && (F = "" + j.key), j))
          !V.call(j, te) ||
            te === "key" ||
            te === "__self" ||
            te === "__source" ||
            (te === "ref" && j.ref === void 0) ||
            (Q[te] = j[te])
      var te = arguments.length - 2
      if (te === 1) Q.children = G
      else if (1 < te) {
        for (var ge = Array(te), Ke = 0; Ke < te; Ke++)
          ge[Ke] = arguments[Ke + 2]
        Q.children = ge
      }
      return be(b.type, F, Q)
    }),
    (ue.createContext = function (b) {
      return (
        (b = {
          $$typeof: y,
          _currentValue: b,
          _currentValue2: b,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (b.Provider = b),
        (b.Consumer = { $$typeof: m, _context: b }),
        b
      )
    }),
    (ue.createElement = function (b, j, G) {
      var Q,
        F = {},
        te = null
      if (j != null)
        for (Q in (j.key !== void 0 && (te = "" + j.key), j))
          V.call(j, Q) &&
            Q !== "key" &&
            Q !== "__self" &&
            Q !== "__source" &&
            (F[Q] = j[Q])
      var ge = arguments.length - 2
      if (ge === 1) F.children = G
      else if (1 < ge) {
        for (var Ke = Array(ge), oe = 0; oe < ge; oe++)
          Ke[oe] = arguments[oe + 2]
        F.children = Ke
      }
      if (b && b.defaultProps)
        for (Q in ((ge = b.defaultProps), ge)) F[Q] === void 0 && (F[Q] = ge[Q])
      return be(b, te, F)
    }),
    (ue.createRef = function () {
      return { current: null }
    }),
    (ue.forwardRef = function (b) {
      return { $$typeof: x, render: b }
    }),
    (ue.isValidElement = Me),
    (ue.lazy = function (b) {
      return { $$typeof: C, _payload: { _status: -1, _result: b }, _init: le }
    }),
    (ue.memo = function (b, j) {
      return { $$typeof: h, type: b, compare: j === void 0 ? null : j }
    }),
    (ue.startTransition = function (b) {
      var j = ee.T,
        G = {}
      ee.T = G
      try {
        var Q = b(),
          F = ee.S
        ;(F !== null && F(G, Q),
          typeof Q == "object" &&
            Q !== null &&
            typeof Q.then == "function" &&
            Q.then(de, Se))
      } catch (te) {
        Se(te)
      } finally {
        ;(j !== null && G.types !== null && (j.types = G.types), (ee.T = j))
      }
    }),
    (ue.unstable_useCacheRefresh = function () {
      return ee.H.useCacheRefresh()
    }),
    (ue.use = function (b) {
      return ee.H.use(b)
    }),
    (ue.useActionState = function (b, j, G) {
      return ee.H.useActionState(b, j, G)
    }),
    (ue.useCallback = function (b, j) {
      return ee.H.useCallback(b, j)
    }),
    (ue.useContext = function (b) {
      return ee.H.useContext(b)
    }),
    (ue.useDebugValue = function () {}),
    (ue.useDeferredValue = function (b, j) {
      return ee.H.useDeferredValue(b, j)
    }),
    (ue.useEffect = function (b, j) {
      return ee.H.useEffect(b, j)
    }),
    (ue.useEffectEvent = function (b) {
      return ee.H.useEffectEvent(b)
    }),
    (ue.useId = function () {
      return ee.H.useId()
    }),
    (ue.useImperativeHandle = function (b, j, G) {
      return ee.H.useImperativeHandle(b, j, G)
    }),
    (ue.useInsertionEffect = function (b, j) {
      return ee.H.useInsertionEffect(b, j)
    }),
    (ue.useLayoutEffect = function (b, j) {
      return ee.H.useLayoutEffect(b, j)
    }),
    (ue.useMemo = function (b, j) {
      return ee.H.useMemo(b, j)
    }),
    (ue.useOptimistic = function (b, j) {
      return ee.H.useOptimistic(b, j)
    }),
    (ue.useReducer = function (b, j, G) {
      return ee.H.useReducer(b, j, G)
    }),
    (ue.useRef = function (b) {
      return ee.H.useRef(b)
    }),
    (ue.useState = function (b) {
      return ee.H.useState(b)
    }),
    (ue.useSyncExternalStore = function (b, j, G) {
      return ee.H.useSyncExternalStore(b, j, G)
    }),
    (ue.useTransition = function () {
      return ee.H.useTransition()
    }),
    (ue.version = "19.2.3"),
    ue
  )
}
var Mm
function mo() {
  return (Mm || ((Mm = 1), ($r.exports = xg())), $r.exports)
}
var A = mo()
const Eg = pg(A),
  zg = gg({ __proto__: null, default: Eg }, [A])
var Wr = { exports: {} },
  Kn = {},
  Fr = { exports: {} },
  Ir = {}
var Dm
function Tg() {
  return (
    Dm ||
      ((Dm = 1),
      (function (i) {
        function c(_, L) {
          var le = _.length
          _.push(L)
          e: for (; 0 < le; ) {
            var Se = (le - 1) >>> 1,
              Y = _[Se]
            if (0 < f(Y, L)) ((_[Se] = L), (_[le] = Y), (le = Se))
            else break e
          }
        }
        function s(_) {
          return _.length === 0 ? null : _[0]
        }
        function r(_) {
          if (_.length === 0) return null
          var L = _[0],
            le = _.pop()
          if (le !== L) {
            _[0] = le
            e: for (var Se = 0, Y = _.length, b = Y >>> 1; Se < b; ) {
              var j = 2 * (Se + 1) - 1,
                G = _[j],
                Q = j + 1,
                F = _[Q]
              if (0 > f(G, le))
                Q < Y && 0 > f(F, G)
                  ? ((_[Se] = F), (_[Q] = le), (Se = Q))
                  : ((_[Se] = G), (_[j] = le), (Se = j))
              else if (Q < Y && 0 > f(F, le))
                ((_[Se] = F), (_[Q] = le), (Se = Q))
              else break e
            }
          }
          return L
        }
        function f(_, L) {
          var le = _.sortIndex - L.sortIndex
          return le !== 0 ? le : _.id - L.id
        }
        if (
          ((i.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var m = performance
          i.unstable_now = function () {
            return m.now()
          }
        } else {
          var y = Date,
            x = y.now()
          i.unstable_now = function () {
            return y.now() - x
          }
        }
        var g = [],
          h = [],
          C = 1,
          E = null,
          w = 3,
          q = !1,
          X = !1,
          B = !1,
          H = !1,
          $ = typeof setTimeout == "function" ? setTimeout : null,
          ne = typeof clearTimeout == "function" ? clearTimeout : null,
          I = typeof setImmediate < "u" ? setImmediate : null
        function K(_) {
          for (var L = s(h); L !== null; ) {
            if (L.callback === null) r(h)
            else if (L.startTime <= _)
              (r(h), (L.sortIndex = L.expirationTime), c(g, L))
            else break
            L = s(h)
          }
        }
        function fe(_) {
          if (((B = !1), K(_), !X))
            if (s(g) !== null) ((X = !0), de || ((de = !0), De()))
            else {
              var L = s(h)
              L !== null && Ne(fe, L.startTime - _)
            }
        }
        var de = !1,
          ee = -1,
          V = 5,
          be = -1
        function ce() {
          return H ? !0 : !(i.unstable_now() - be < V)
        }
        function Me() {
          if (((H = !1), de)) {
            var _ = i.unstable_now()
            be = _
            var L = !0
            try {
              e: {
                ;((X = !1), B && ((B = !1), ne(ee), (ee = -1)), (q = !0))
                var le = w
                try {
                  t: {
                    for (
                      K(_), E = s(g);
                      E !== null && !(E.expirationTime > _ && ce());
                    ) {
                      var Se = E.callback
                      if (typeof Se == "function") {
                        ;((E.callback = null), (w = E.priorityLevel))
                        var Y = Se(E.expirationTime <= _)
                        if (((_ = i.unstable_now()), typeof Y == "function")) {
                          ;((E.callback = Y), K(_), (L = !0))
                          break t
                        }
                        ;(E === s(g) && r(g), K(_))
                      } else r(g)
                      E = s(g)
                    }
                    if (E !== null) L = !0
                    else {
                      var b = s(h)
                      ;(b !== null && Ne(fe, b.startTime - _), (L = !1))
                    }
                  }
                  break e
                } finally {
                  ;((E = null), (w = le), (q = !1))
                }
                L = void 0
              }
            } finally {
              L ? De() : (de = !1)
            }
          }
        }
        var De
        if (typeof I == "function")
          De = function () {
            I(Me)
          }
        else if (typeof MessageChannel < "u") {
          var at = new MessageChannel(),
            tt = at.port2
          ;((at.port1.onmessage = Me),
            (De = function () {
              tt.postMessage(null)
            }))
        } else
          De = function () {
            $(Me, 0)
          }
        function Ne(_, L) {
          ee = $(function () {
            _(i.unstable_now())
          }, L)
        }
        ;((i.unstable_IdlePriority = 5),
          (i.unstable_ImmediatePriority = 1),
          (i.unstable_LowPriority = 4),
          (i.unstable_NormalPriority = 3),
          (i.unstable_Profiling = null),
          (i.unstable_UserBlockingPriority = 2),
          (i.unstable_cancelCallback = function (_) {
            _.callback = null
          }),
          (i.unstable_forceFrameRate = function (_) {
            0 > _ || 125 < _
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (V = 0 < _ ? Math.floor(1e3 / _) : 5)
          }),
          (i.unstable_getCurrentPriorityLevel = function () {
            return w
          }),
          (i.unstable_next = function (_) {
            switch (w) {
              case 1:
              case 2:
              case 3:
                var L = 3
                break
              default:
                L = w
            }
            var le = w
            w = L
            try {
              return _()
            } finally {
              w = le
            }
          }),
          (i.unstable_requestPaint = function () {
            H = !0
          }),
          (i.unstable_runWithPriority = function (_, L) {
            switch (_) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break
              default:
                _ = 3
            }
            var le = w
            w = _
            try {
              return L()
            } finally {
              w = le
            }
          }),
          (i.unstable_scheduleCallback = function (_, L, le) {
            var Se = i.unstable_now()
            switch (
              (typeof le == "object" && le !== null
                ? ((le = le.delay),
                  (le = typeof le == "number" && 0 < le ? Se + le : Se))
                : (le = Se),
              _)
            ) {
              case 1:
                var Y = -1
                break
              case 2:
                Y = 250
                break
              case 5:
                Y = 1073741823
                break
              case 4:
                Y = 1e4
                break
              default:
                Y = 5e3
            }
            return (
              (Y = le + Y),
              (_ = {
                id: C++,
                callback: L,
                priorityLevel: _,
                startTime: le,
                expirationTime: Y,
                sortIndex: -1,
              }),
              le > Se
                ? ((_.sortIndex = le),
                  c(h, _),
                  s(g) === null &&
                    _ === s(h) &&
                    (B ? (ne(ee), (ee = -1)) : (B = !0), Ne(fe, le - Se)))
                : ((_.sortIndex = Y),
                  c(g, _),
                  X || q || ((X = !0), de || ((de = !0), De()))),
              _
            )
          }),
          (i.unstable_shouldYield = ce),
          (i.unstable_wrapCallback = function (_) {
            var L = w
            return function () {
              var le = w
              w = L
              try {
                return _.apply(this, arguments)
              } finally {
                w = le
              }
            }
          }))
      })(Ir)),
    Ir
  )
}
var Um
function Ag() {
  return (Um || ((Um = 1), (Fr.exports = Tg())), Fr.exports)
}
var Pr = { exports: {} },
  lt = {}
var jm
function Rg() {
  if (jm) return lt
  jm = 1
  var i = mo()
  function c(g) {
    var h = "https://react.dev/errors/" + g
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1])
      for (var C = 2; C < arguments.length; C++)
        h += "&args[]=" + encodeURIComponent(arguments[C])
    }
    return (
      "Minified React error #" +
      g +
      "; visit " +
      h +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    )
  }
  function s() {}
  var r = {
      d: {
        f: s,
        r: function () {
          throw Error(c(522))
        },
        D: s,
        C: s,
        L: s,
        m: s,
        X: s,
        S: s,
        M: s,
      },
      p: 0,
      findDOMNode: null,
    },
    f = Symbol.for("react.portal")
  function m(g, h, C) {
    var E =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null
    return {
      $$typeof: f,
      key: E == null ? null : "" + E,
      children: g,
      containerInfo: h,
      implementation: C,
    }
  }
  var y = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE
  function x(g, h) {
    if (g === "font") return ""
    if (typeof h == "string") return h === "use-credentials" ? h : ""
  }
  return (
    (lt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r),
    (lt.createPortal = function (g, h) {
      var C =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null
      if (!h || (h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11))
        throw Error(c(299))
      return m(g, h, null, C)
    }),
    (lt.flushSync = function (g) {
      var h = y.T,
        C = r.p
      try {
        if (((y.T = null), (r.p = 2), g)) return g()
      } finally {
        ;((y.T = h), (r.p = C), r.d.f())
      }
    }),
    (lt.preconnect = function (g, h) {
      typeof g == "string" &&
        (h
          ? ((h = h.crossOrigin),
            (h =
              typeof h == "string"
                ? h === "use-credentials"
                  ? h
                  : ""
                : void 0))
          : (h = null),
        r.d.C(g, h))
    }),
    (lt.prefetchDNS = function (g) {
      typeof g == "string" && r.d.D(g)
    }),
    (lt.preinit = function (g, h) {
      if (typeof g == "string" && h && typeof h.as == "string") {
        var C = h.as,
          E = x(C, h.crossOrigin),
          w = typeof h.integrity == "string" ? h.integrity : void 0,
          q = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0
        C === "style"
          ? r.d.S(g, typeof h.precedence == "string" ? h.precedence : void 0, {
              crossOrigin: E,
              integrity: w,
              fetchPriority: q,
            })
          : C === "script" &&
            r.d.X(g, {
              crossOrigin: E,
              integrity: w,
              fetchPriority: q,
              nonce: typeof h.nonce == "string" ? h.nonce : void 0,
            })
      }
    }),
    (lt.preinitModule = function (g, h) {
      if (typeof g == "string")
        if (typeof h == "object" && h !== null) {
          if (h.as == null || h.as === "script") {
            var C = x(h.as, h.crossOrigin)
            r.d.M(g, {
              crossOrigin: C,
              integrity: typeof h.integrity == "string" ? h.integrity : void 0,
              nonce: typeof h.nonce == "string" ? h.nonce : void 0,
            })
          }
        } else h == null && r.d.M(g)
    }),
    (lt.preload = function (g, h) {
      if (
        typeof g == "string" &&
        typeof h == "object" &&
        h !== null &&
        typeof h.as == "string"
      ) {
        var C = h.as,
          E = x(C, h.crossOrigin)
        r.d.L(g, C, {
          crossOrigin: E,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0,
          nonce: typeof h.nonce == "string" ? h.nonce : void 0,
          type: typeof h.type == "string" ? h.type : void 0,
          fetchPriority:
            typeof h.fetchPriority == "string" ? h.fetchPriority : void 0,
          referrerPolicy:
            typeof h.referrerPolicy == "string" ? h.referrerPolicy : void 0,
          imageSrcSet:
            typeof h.imageSrcSet == "string" ? h.imageSrcSet : void 0,
          imageSizes: typeof h.imageSizes == "string" ? h.imageSizes : void 0,
          media: typeof h.media == "string" ? h.media : void 0,
        })
      }
    }),
    (lt.preloadModule = function (g, h) {
      if (typeof g == "string")
        if (h) {
          var C = x(h.as, h.crossOrigin)
          r.d.m(g, {
            as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
            crossOrigin: C,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0,
          })
        } else r.d.m(g)
    }),
    (lt.requestFormReset = function (g) {
      r.d.r(g)
    }),
    (lt.unstable_batchedUpdates = function (g, h) {
      return g(h)
    }),
    (lt.useFormState = function (g, h, C) {
      return y.H.useFormState(g, h, C)
    }),
    (lt.useFormStatus = function () {
      return y.H.useHostTransitionStatus()
    }),
    (lt.version = "19.2.3"),
    lt
  )
}
var wm
function Cg() {
  if (wm) return Pr.exports
  wm = 1
  function i() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i)
      } catch (c) {
        console.error(c)
      }
  }
  return (i(), (Pr.exports = Rg()), Pr.exports)
}
var Hm
function Og() {
  if (Hm) return Kn
  Hm = 1
  var i = Ag(),
    c = mo(),
    s = Cg()
  function r(e) {
    var t = "https://react.dev/errors/" + e
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1])
      for (var l = 2; l < arguments.length; l++)
        t += "&args[]=" + encodeURIComponent(arguments[l])
    }
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    )
  }
  function f(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11))
  }
  function m(e) {
    var t = e,
      l = e
    if (e.alternate) for (; t.return; ) t = t.return
    else {
      e = t
      do ((t = e), (t.flags & 4098) !== 0 && (l = t.return), (e = t.return))
      while (e)
    }
    return t.tag === 3 ? l : null
  }
  function y(e) {
    if (e.tag === 13) {
      var t = e.memoizedState
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated
    }
    return null
  }
  function x(e) {
    if (e.tag === 31) {
      var t = e.memoizedState
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated
    }
    return null
  }
  function g(e) {
    if (m(e) !== e) throw Error(r(188))
  }
  function h(e) {
    var t = e.alternate
    if (!t) {
      if (((t = m(e)), t === null)) throw Error(r(188))
      return t !== e ? null : e
    }
    for (var l = e, a = t; ; ) {
      var n = l.return
      if (n === null) break
      var u = n.alternate
      if (u === null) {
        if (((a = n.return), a !== null)) {
          l = a
          continue
        }
        break
      }
      if (n.child === u.child) {
        for (u = n.child; u; ) {
          if (u === l) return (g(n), e)
          if (u === a) return (g(n), t)
          u = u.sibling
        }
        throw Error(r(188))
      }
      if (l.return !== a.return) ((l = n), (a = u))
      else {
        for (var o = !1, d = n.child; d; ) {
          if (d === l) {
            ;((o = !0), (l = n), (a = u))
            break
          }
          if (d === a) {
            ;((o = !0), (a = n), (l = u))
            break
          }
          d = d.sibling
        }
        if (!o) {
          for (d = u.child; d; ) {
            if (d === l) {
              ;((o = !0), (l = u), (a = n))
              break
            }
            if (d === a) {
              ;((o = !0), (a = u), (l = n))
              break
            }
            d = d.sibling
          }
          if (!o) throw Error(r(189))
        }
      }
      if (l.alternate !== a) throw Error(r(190))
    }
    if (l.tag !== 3) throw Error(r(188))
    return l.stateNode.current === l ? e : t
  }
  function C(e) {
    var t = e.tag
    if (t === 5 || t === 26 || t === 27 || t === 6) return e
    for (e = e.child; e !== null; ) {
      if (((t = C(e)), t !== null)) return t
      e = e.sibling
    }
    return null
  }
  var E = Object.assign,
    w = Symbol.for("react.element"),
    q = Symbol.for("react.transitional.element"),
    X = Symbol.for("react.portal"),
    B = Symbol.for("react.fragment"),
    H = Symbol.for("react.strict_mode"),
    $ = Symbol.for("react.profiler"),
    ne = Symbol.for("react.consumer"),
    I = Symbol.for("react.context"),
    K = Symbol.for("react.forward_ref"),
    fe = Symbol.for("react.suspense"),
    de = Symbol.for("react.suspense_list"),
    ee = Symbol.for("react.memo"),
    V = Symbol.for("react.lazy"),
    be = Symbol.for("react.activity"),
    ce = Symbol.for("react.memo_cache_sentinel"),
    Me = Symbol.iterator
  function De(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (Me && e[Me]) || e["@@iterator"]),
        typeof e == "function" ? e : null)
  }
  var at = Symbol.for("react.client.reference")
  function tt(e) {
    if (e == null) return null
    if (typeof e == "function")
      return e.$$typeof === at ? null : e.displayName || e.name || null
    if (typeof e == "string") return e
    switch (e) {
      case B:
        return "Fragment"
      case $:
        return "Profiler"
      case H:
        return "StrictMode"
      case fe:
        return "Suspense"
      case de:
        return "SuspenseList"
      case be:
        return "Activity"
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case X:
          return "Portal"
        case I:
          return e.displayName || "Context"
        case ne:
          return (e._context.displayName || "Context") + ".Consumer"
        case K:
          var t = e.render
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          )
        case ee:
          return (
            (t = e.displayName || null), t !== null ? t : tt(e.type) || "Memo"
          )
        case V:
          ;((t = e._payload), (e = e._init))
          try {
            return tt(e(t))
          } catch {}
      }
    return null
  }
  var Ne = Array.isArray,
    _ = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    L = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    le = { pending: !1, data: null, method: null, action: null },
    Se = [],
    Y = -1
  function b(e) {
    return { current: e }
  }
  function j(e) {
    0 > Y || ((e.current = Se[Y]), (Se[Y] = null), Y--)
  }
  function G(e, t) {
    ;(Y++, (Se[Y] = e.current), (e.current = t))
  }
  var Q = b(null),
    F = b(null),
    te = b(null),
    ge = b(null)
  function Ke(e, t) {
    switch ((G(te, t), G(F, e), G(Q, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Fd(e) : 0
        break
      default:
        if (((e = t.tagName), (t = t.namespaceURI)))
          ((t = Fd(t)), (e = Id(t, e)))
        else
          switch (e) {
            case "svg":
              e = 1
              break
            case "math":
              e = 2
              break
            default:
              e = 0
          }
    }
    ;(j(Q), G(Q, e))
  }
  function oe() {
    ;(j(Q), j(F), j(te))
  }
  function dl(e) {
    e.memoizedState !== null && G(ge, e)
    var t = Q.current,
      l = Id(t, e.type)
    t !== l && (G(F, e), G(Q, l))
  }
  function Qt(e) {
    ;(F.current === e && (j(Q), j(F)),
      ge.current === e && (j(ge), (Vn._currentValue = le)))
  }
  var ml, sa
  function zt(e) {
    if (ml === void 0)
      try {
        throw Error()
      } catch (l) {
        var t = l.stack.trim().match(/\n( *(at )?)/)
        ;((ml = (t && t[1]) || ""),
          (sa =
            -1 <
            l.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < l.stack.indexOf("@")
                ? "@unknown:0:0"
                : ""))
      }
    return (
      `
` +
      ml +
      e +
      sa
    )
  }
  var Mi = !1
  function Di(e, t) {
    if (!e || Mi) return ""
    Mi = !0
    var l = Error.prepareStackTrace
    Error.prepareStackTrace = void 0
    try {
      var a = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var U = function () {
                throw Error()
              }
              if (
                (Object.defineProperty(U.prototype, "props", {
                  set: function () {
                    throw Error()
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(U, [])
                } catch (O) {
                  var R = O
                }
                Reflect.construct(e, [], U)
              } else {
                try {
                  U.call()
                } catch (O) {
                  R = O
                }
                e.call(U.prototype)
              }
            } else {
              try {
                throw Error()
              } catch (O) {
                R = O
              }
              ;(U = e()) &&
                typeof U.catch == "function" &&
                U.catch(function () {})
            }
          } catch (O) {
            if (O && R && typeof O.stack == "string") return [O.stack, R.stack]
          }
          return [null, null]
        },
      }
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot"
      var n = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      )
      n &&
        n.configurable &&
        Object.defineProperty(a.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        })
      var u = a.DetermineComponentFrameRoot(),
        o = u[0],
        d = u[1]
      if (o && d) {
        var v = o.split(`
`),
          T = d.split(`
`)
        for (
          n = a = 0;
          a < v.length && !v[a].includes("DetermineComponentFrameRoot");
        )
          a++
        for (; n < T.length && !T[n].includes("DetermineComponentFrameRoot"); )
          n++
        if (a === v.length || n === T.length)
          for (
            a = v.length - 1, n = T.length - 1;
            1 <= a && 0 <= n && v[a] !== T[n];
          )
            n--
        for (; 1 <= a && 0 <= n; a--, n--)
          if (v[a] !== T[n]) {
            if (a !== 1 || n !== 1)
              do
                if ((a--, n--, 0 > n || v[a] !== T[n])) {
                  var M =
                    `
` + v[a].replace(" at new ", " at ")
                  return (
                    e.displayName &&
                      M.includes("<anonymous>") &&
                      (M = M.replace("<anonymous>", e.displayName)),
                    M
                  )
                }
              while (1 <= a && 0 <= n)
            break
          }
      }
    } finally {
      ;((Mi = !1), (Error.prepareStackTrace = l))
    }
    return (l = e ? e.displayName || e.name : "") ? zt(l) : ""
  }
  function Jh(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return zt(e.type)
      case 16:
        return zt("Lazy")
      case 13:
        return e.child !== t && t !== null
          ? zt("Suspense Fallback")
          : zt("Suspense")
      case 19:
        return zt("SuspenseList")
      case 0:
      case 15:
        return Di(e.type, !1)
      case 11:
        return Di(e.type.render, !1)
      case 1:
        return Di(e.type, !0)
      case 31:
        return zt("Activity")
      default:
        return ""
    }
  }
  function Co(e) {
    try {
      var t = "",
        l = null
      do ((t += Jh(e, l)), (l = e), (e = e.return))
      while (e)
      return t
    } catch (a) {
      return (
        `
Error generating stack: ` +
        a.message +
        `
` +
        a.stack
      )
    }
  }
  var Ui = Object.prototype.hasOwnProperty,
    ji = i.unstable_scheduleCallback,
    wi = i.unstable_cancelCallback,
    $h = i.unstable_shouldYield,
    Wh = i.unstable_requestPaint,
    dt = i.unstable_now,
    Fh = i.unstable_getCurrentPriorityLevel,
    Oo = i.unstable_ImmediatePriority,
    No = i.unstable_UserBlockingPriority,
    lu = i.unstable_NormalPriority,
    Ih = i.unstable_LowPriority,
    _o = i.unstable_IdlePriority,
    Ph = i.log,
    ey = i.unstable_setDisableYieldValue,
    Pa = null,
    mt = null
  function hl(e) {
    if (
      (typeof Ph == "function" && ey(e),
      mt && typeof mt.setStrictMode == "function")
    )
      try {
        mt.setStrictMode(Pa, e)
      } catch {}
  }
  var ht = Math.clz32 ? Math.clz32 : ay,
    ty = Math.log,
    ly = Math.LN2
  function ay(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((ty(e) / ly) | 0)) | 0)
  }
  var au = 256,
    nu = 262144,
    uu = 4194304
  function Xl(e) {
    var t = e & 42
    if (t !== 0) return t
    switch (e & -e) {
      case 1:
        return 1
      case 2:
        return 2
      case 4:
        return 4
      case 8:
        return 8
      case 16:
        return 16
      case 32:
        return 32
      case 64:
        return 64
      case 128:
        return 128
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e & 261888
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560
      case 67108864:
        return 67108864
      case 134217728:
        return 134217728
      case 268435456:
        return 268435456
      case 536870912:
        return 536870912
      case 1073741824:
        return 0
      default:
        return e
    }
  }
  function iu(e, t, l) {
    var a = e.pendingLanes
    if (a === 0) return 0
    var n = 0,
      u = e.suspendedLanes,
      o = e.pingedLanes
    e = e.warmLanes
    var d = a & 134217727
    return (
      d !== 0
        ? ((a = d & ~u),
          a !== 0
            ? (n = Xl(a))
            : ((o &= d),
              o !== 0
                ? (n = Xl(o))
                : l || ((l = d & ~e), l !== 0 && (n = Xl(l)))))
        : ((d = a & ~u),
          d !== 0
            ? (n = Xl(d))
            : o !== 0
              ? (n = Xl(o))
              : l || ((l = a & ~e), l !== 0 && (n = Xl(l)))),
      n === 0
        ? 0
        : t !== 0 &&
            t !== n &&
            (t & u) === 0 &&
            ((u = n & -n),
            (l = t & -t),
            u >= l || (u === 32 && (l & 4194048) !== 0))
          ? t
          : n
    )
  }
  function en(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0
  }
  function ny(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1
      default:
        return -1
    }
  }
  function Mo() {
    var e = uu
    return ((uu <<= 1), (uu & 62914560) === 0 && (uu = 4194304), e)
  }
  function Hi(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e)
    return t
  }
  function tn(e, t) {
    ;((e.pendingLanes |= t),
      t !== 268435456 &&
        ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)))
  }
  function uy(e, t, l, a, n, u) {
    var o = e.pendingLanes
    ;((e.pendingLanes = l),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= l),
      (e.entangledLanes &= l),
      (e.errorRecoveryDisabledLanes &= l),
      (e.shellSuspendCounter = 0))
    var d = e.entanglements,
      v = e.expirationTimes,
      T = e.hiddenUpdates
    for (l = o & ~l; 0 < l; ) {
      var M = 31 - ht(l),
        U = 1 << M
      ;((d[M] = 0), (v[M] = -1))
      var R = T[M]
      if (R !== null)
        for (T[M] = null, M = 0; M < R.length; M++) {
          var O = R[M]
          O !== null && (O.lane &= -536870913)
        }
      l &= ~U
    }
    ;(a !== 0 && Do(e, a, 0),
      u !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(o & ~t)))
  }
  function Do(e, t, l) {
    ;((e.pendingLanes |= t), (e.suspendedLanes &= ~t))
    var a = 31 - ht(t)
    ;((e.entangledLanes |= t),
      (e.entanglements[a] = e.entanglements[a] | 1073741824 | (l & 261930)))
  }
  function Uo(e, t) {
    var l = (e.entangledLanes |= t)
    for (e = e.entanglements; l; ) {
      var a = 31 - ht(l),
        n = 1 << a
      ;((n & t) | (e[a] & t) && (e[a] |= t), (l &= ~n))
    }
  }
  function jo(e, t) {
    var l = t & -t
    return (
      (l = (l & 42) !== 0 ? 1 : Bi(l)),
      (l & (e.suspendedLanes | t)) !== 0 ? 0 : l
    )
  }
  function Bi(e) {
    switch (e) {
      case 2:
        e = 1
        break
      case 8:
        e = 4
        break
      case 32:
        e = 16
        break
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128
        break
      case 268435456:
        e = 134217728
        break
      default:
        e = 0
    }
    return e
  }
  function Li(e) {
    return (
      (e &= -e),
      2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    )
  }
  function wo() {
    var e = L.p
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : xm(e.type))
  }
  function Ho(e, t) {
    var l = L.p
    try {
      return ((L.p = e), t())
    } finally {
      L.p = l
    }
  }
  var yl = Math.random().toString(36).slice(2),
    We = "__reactFiber$" + yl,
    ut = "__reactProps$" + yl,
    fa = "__reactContainer$" + yl,
    qi = "__reactEvents$" + yl,
    iy = "__reactListeners$" + yl,
    cy = "__reactHandles$" + yl,
    Bo = "__reactResources$" + yl,
    ln = "__reactMarker$" + yl
  function Yi(e) {
    ;(delete e[We], delete e[ut], delete e[qi], delete e[iy], delete e[cy])
  }
  function da(e) {
    var t = e[We]
    if (t) return t
    for (var l = e.parentNode; l; ) {
      if ((t = l[fa] || l[We])) {
        if (
          ((l = t.alternate),
          t.child !== null || (l !== null && l.child !== null))
        )
          for (e = um(e); e !== null; ) {
            if ((l = e[We])) return l
            e = um(e)
          }
        return t
      }
      ;((e = l), (l = e.parentNode))
    }
    return null
  }
  function ma(e) {
    if ((e = e[We] || e[fa])) {
      var t = e.tag
      if (
        t === 5 ||
        t === 6 ||
        t === 13 ||
        t === 31 ||
        t === 26 ||
        t === 27 ||
        t === 3
      )
        return e
    }
    return null
  }
  function an(e) {
    var t = e.tag
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode
    throw Error(r(33))
  }
  function ha(e) {
    var t = e[Bo]
    return (
      t ||
        (t = e[Bo] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    )
  }
  function Je(e) {
    e[ln] = !0
  }
  var Lo = new Set(),
    qo = {}
  function Ql(e, t) {
    ;(ya(e, t), ya(e + "Capture", t))
  }
  function ya(e, t) {
    for (qo[e] = t, e = 0; e < t.length; e++) Lo.add(t[e])
  }
  var ry = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ),
    Yo = {},
    Go = {}
  function oy(e) {
    return Ui.call(Go, e)
      ? !0
      : Ui.call(Yo, e)
        ? !1
        : ry.test(e)
          ? (Go[e] = !0)
          : ((Yo[e] = !0), !1)
  }
  function cu(e, t, l) {
    if (oy(t))
      if (l === null) e.removeAttribute(t)
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t)
            return
          case "boolean":
            var a = t.toLowerCase().slice(0, 5)
            if (a !== "data-" && a !== "aria-") {
              e.removeAttribute(t)
              return
            }
        }
        e.setAttribute(t, "" + l)
      }
  }
  function ru(e, t, l) {
    if (l === null) e.removeAttribute(t)
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t)
          return
      }
      e.setAttribute(t, "" + l)
    }
  }
  function kt(e, t, l, a) {
    if (a === null) e.removeAttribute(l)
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(l)
          return
      }
      e.setAttributeNS(t, l, "" + a)
    }
  }
  function Tt(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e
      case "object":
        return e
      default:
        return ""
    }
  }
  function Vo(e) {
    var t = e.type
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    )
  }
  function sy(e, t, l) {
    var a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t)
    if (
      !e.hasOwnProperty(t) &&
      typeof a < "u" &&
      typeof a.get == "function" &&
      typeof a.set == "function"
    ) {
      var n = a.get,
        u = a.set
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return n.call(this)
          },
          set: function (o) {
            ;((l = "" + o), u.call(this, o))
          },
        }),
        Object.defineProperty(e, t, { enumerable: a.enumerable }),
        {
          getValue: function () {
            return l
          },
          setValue: function (o) {
            l = "" + o
          },
          stopTracking: function () {
            ;((e._valueTracker = null), delete e[t])
          },
        }
      )
    }
  }
  function Gi(e) {
    if (!e._valueTracker) {
      var t = Vo(e) ? "checked" : "value"
      e._valueTracker = sy(e, t, "" + e[t])
    }
  }
  function Xo(e) {
    if (!e) return !1
    var t = e._valueTracker
    if (!t) return !0
    var l = t.getValue(),
      a = ""
    return (
      e && (a = Vo(e) ? (e.checked ? "true" : "false") : e.value),
      (e = a),
      e !== l ? (t.setValue(e), !0) : !1
    )
  }
  function ou(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null
    try {
      return e.activeElement || e.body
    } catch {
      return e.body
    }
  }
  var fy = /[\n"\\]/g
  function At(e) {
    return e.replace(fy, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " "
    })
  }
  function Vi(e, t, l, a, n, u, o, d) {
    ;((e.name = ""),
      o != null &&
      typeof o != "function" &&
      typeof o != "symbol" &&
      typeof o != "boolean"
        ? (e.type = o)
        : e.removeAttribute("type"),
      t != null
        ? o === "number"
          ? ((t === 0 && e.value === "") || e.value != t) &&
            (e.value = "" + Tt(t))
          : e.value !== "" + Tt(t) && (e.value = "" + Tt(t))
        : (o !== "submit" && o !== "reset") || e.removeAttribute("value"),
      t != null
        ? Xi(e, o, Tt(t))
        : l != null
          ? Xi(e, o, Tt(l))
          : a != null && e.removeAttribute("value"),
      n == null && u != null && (e.defaultChecked = !!u),
      n != null &&
        (e.checked = n && typeof n != "function" && typeof n != "symbol"),
      d != null &&
      typeof d != "function" &&
      typeof d != "symbol" &&
      typeof d != "boolean"
        ? (e.name = "" + Tt(d))
        : e.removeAttribute("name"))
  }
  function Qo(e, t, l, a, n, u, o, d) {
    if (
      (u != null &&
        typeof u != "function" &&
        typeof u != "symbol" &&
        typeof u != "boolean" &&
        (e.type = u),
      t != null || l != null)
    ) {
      if (!((u !== "submit" && u !== "reset") || t != null)) {
        Gi(e)
        return
      }
      ;((l = l != null ? "" + Tt(l) : ""),
        (t = t != null ? "" + Tt(t) : l),
        d || t === e.value || (e.value = t),
        (e.defaultValue = t))
    }
    ;((a = a ?? n),
      (a = typeof a != "function" && typeof a != "symbol" && !!a),
      (e.checked = d ? e.checked : !!a),
      (e.defaultChecked = !!a),
      o != null &&
        typeof o != "function" &&
        typeof o != "symbol" &&
        typeof o != "boolean" &&
        (e.name = o),
      Gi(e))
  }
  function Xi(e, t, l) {
    ;(t === "number" && ou(e.ownerDocument) === e) ||
      e.defaultValue === "" + l ||
      (e.defaultValue = "" + l)
  }
  function va(e, t, l, a) {
    if (((e = e.options), t)) {
      t = {}
      for (var n = 0; n < l.length; n++) t["$" + l[n]] = !0
      for (l = 0; l < e.length; l++)
        ((n = t.hasOwnProperty("$" + e[l].value)),
          e[l].selected !== n && (e[l].selected = n),
          n && a && (e[l].defaultSelected = !0))
    } else {
      for (l = "" + Tt(l), t = null, n = 0; n < e.length; n++) {
        if (e[n].value === l) {
          ;((e[n].selected = !0), a && (e[n].defaultSelected = !0))
          return
        }
        t !== null || e[n].disabled || (t = e[n])
      }
      t !== null && (t.selected = !0)
    }
  }
  function ko(e, t, l) {
    if (
      t != null &&
      ((t = "" + Tt(t)), t !== e.value && (e.value = t), l == null)
    ) {
      e.defaultValue !== t && (e.defaultValue = t)
      return
    }
    e.defaultValue = l != null ? "" + Tt(l) : ""
  }
  function Zo(e, t, l, a) {
    if (t == null) {
      if (a != null) {
        if (l != null) throw Error(r(92))
        if (Ne(a)) {
          if (1 < a.length) throw Error(r(93))
          a = a[0]
        }
        l = a
      }
      ;(l == null && (l = ""), (t = l))
    }
    ;((l = Tt(t)),
      (e.defaultValue = l),
      (a = e.textContent),
      a === l && a !== "" && a !== null && (e.value = a),
      Gi(e))
  }
  function ga(e, t) {
    if (t) {
      var l = e.firstChild
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = t
        return
      }
    }
    e.textContent = t
  }
  var dy = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  )
  function Ko(e, t, l) {
    var a = t.indexOf("--") === 0
    l == null || typeof l == "boolean" || l === ""
      ? a
        ? e.setProperty(t, "")
        : t === "float"
          ? (e.cssFloat = "")
          : (e[t] = "")
      : a
        ? e.setProperty(t, l)
        : typeof l != "number" || l === 0 || dy.has(t)
          ? t === "float"
            ? (e.cssFloat = l)
            : (e[t] = ("" + l).trim())
          : (e[t] = l + "px")
  }
  function Jo(e, t, l) {
    if (t != null && typeof t != "object") throw Error(r(62))
    if (((e = e.style), l != null)) {
      for (var a in l)
        !l.hasOwnProperty(a) ||
          (t != null && t.hasOwnProperty(a)) ||
          (a.indexOf("--") === 0
            ? e.setProperty(a, "")
            : a === "float"
              ? (e.cssFloat = "")
              : (e[a] = ""))
      for (var n in t)
        ((a = t[n]), t.hasOwnProperty(n) && l[n] !== a && Ko(e, n, a))
    } else for (var u in t) t.hasOwnProperty(u) && Ko(e, u, t[u])
  }
  function Qi(e) {
    if (e.indexOf("-") === -1) return !1
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1
      default:
        return !0
    }
  }
  var my = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    hy =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i
  function su(e) {
    return hy.test("" + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e
  }
  function Zt() {}
  var ki = null
  function Zi(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    )
  }
  var pa = null,
    ba = null
  function $o(e) {
    var t = ma(e)
    if (t && (e = t.stateNode)) {
      var l = e[ut] || null
      e: switch (((e = t.stateNode), t.type)) {
        case "input":
          if (
            (Vi(
              e,
              l.value,
              l.defaultValue,
              l.defaultValue,
              l.checked,
              l.defaultChecked,
              l.type,
              l.name
            ),
            (t = l.name),
            l.type === "radio" && t != null)
          ) {
            for (l = e; l.parentNode; ) l = l.parentNode
            for (
              l = l.querySelectorAll(
                'input[name="' + At("" + t) + '"][type="radio"]'
              ),
                t = 0;
              t < l.length;
              t++
            ) {
              var a = l[t]
              if (a !== e && a.form === e.form) {
                var n = a[ut] || null
                if (!n) throw Error(r(90))
                Vi(
                  a,
                  n.value,
                  n.defaultValue,
                  n.defaultValue,
                  n.checked,
                  n.defaultChecked,
                  n.type,
                  n.name
                )
              }
            }
            for (t = 0; t < l.length; t++)
              ((a = l[t]), a.form === e.form && Xo(a))
          }
          break e
        case "textarea":
          ko(e, l.value, l.defaultValue)
          break e
        case "select":
          ;((t = l.value), t != null && va(e, !!l.multiple, t, !1))
      }
    }
  }
  var Ki = !1
  function Wo(e, t, l) {
    if (Ki) return e(t, l)
    Ki = !0
    try {
      var a = e(t)
      return a
    } finally {
      if (
        ((Ki = !1),
        (pa !== null || ba !== null) &&
          (Fu(), pa && ((t = pa), (e = ba), (ba = pa = null), $o(t), e)))
      )
        for (t = 0; t < e.length; t++) $o(e[t])
    }
  }
  function nn(e, t) {
    var l = e.stateNode
    if (l === null) return null
    var a = l[ut] || null
    if (a === null) return null
    l = a[t]
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ;((a = !a.disabled) ||
          ((e = e.type),
          (a = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !a))
        break e
      default:
        e = !1
    }
    if (e) return null
    if (l && typeof l != "function") throw Error(r(231, t, typeof l))
    return l
  }
  var Kt = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    Ji = !1
  if (Kt)
    try {
      var un = {}
      ;(Object.defineProperty(un, "passive", {
        get: function () {
          Ji = !0
        },
      }),
        window.addEventListener("test", un, un),
        window.removeEventListener("test", un, un))
    } catch {
      Ji = !1
    }
  var vl = null,
    $i = null,
    fu = null
  function Fo() {
    if (fu) return fu
    var e,
      t = $i,
      l = t.length,
      a,
      n = "value" in vl ? vl.value : vl.textContent,
      u = n.length
    for (e = 0; e < l && t[e] === n[e]; e++);
    var o = l - e
    for (a = 1; a <= o && t[l - a] === n[u - a]; a++);
    return (fu = n.slice(e, 1 < a ? 1 - a : void 0))
  }
  function du(e) {
    var t = e.keyCode
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    )
  }
  function mu() {
    return !0
  }
  function Io() {
    return !1
  }
  function it(e) {
    function t(l, a, n, u, o) {
      ;((this._reactName = l),
        (this._targetInst = n),
        (this.type = a),
        (this.nativeEvent = u),
        (this.target = o),
        (this.currentTarget = null))
      for (var d in e)
        e.hasOwnProperty(d) && ((l = e[d]), (this[d] = l ? l(u) : u[d]))
      return (
        (this.isDefaultPrevented = (
          u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1
        )
          ? mu
          : Io),
        (this.isPropagationStopped = Io),
        this
      )
    }
    return (
      E(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0
          var l = this.nativeEvent
          l &&
            (l.preventDefault
              ? l.preventDefault()
              : typeof l.returnValue != "unknown" && (l.returnValue = !1),
            (this.isDefaultPrevented = mu))
        },
        stopPropagation: function () {
          var l = this.nativeEvent
          l &&
            (l.stopPropagation
              ? l.stopPropagation()
              : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0),
            (this.isPropagationStopped = mu))
        },
        persist: function () {},
        isPersistent: mu,
      }),
      t
    )
  }
  var kl = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now()
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    hu = it(kl),
    cn = E({}, kl, { view: 0, detail: 0 }),
    yy = it(cn),
    Wi,
    Fi,
    rn,
    yu = E({}, cn, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Pi,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== rn &&
              (rn && e.type === "mousemove"
                ? ((Wi = e.screenX - rn.screenX), (Fi = e.screenY - rn.screenY))
                : (Fi = Wi = 0),
              (rn = e)),
            Wi)
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : Fi
      },
    }),
    Po = it(yu),
    vy = E({}, yu, { dataTransfer: 0 }),
    gy = it(vy),
    py = E({}, cn, { relatedTarget: 0 }),
    Ii = it(py),
    by = E({}, kl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Sy = it(by),
    xy = E({}, kl, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData
      },
    }),
    Ey = it(xy),
    zy = E({}, kl, { data: 0 }),
    es = it(zy),
    Ty = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    Ay = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    Ry = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    }
  function Cy(e) {
    var t = this.nativeEvent
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = Ry[e])
        ? !!t[e]
        : !1
  }
  function Pi() {
    return Cy
  }
  var Oy = E({}, cn, {
      key: function (e) {
        if (e.key) {
          var t = Ty[e.key] || e.key
          if (t !== "Unidentified") return t
        }
        return e.type === "keypress"
          ? ((e = du(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
            ? Ay[e.keyCode] || "Unidentified"
            : ""
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Pi,
      charCode: function (e) {
        return e.type === "keypress" ? du(e) : 0
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
      },
      which: function (e) {
        return e.type === "keypress"
          ? du(e)
          : e.type === "keydown" || e.type === "keyup"
            ? e.keyCode
            : 0
      },
    }),
    Ny = it(Oy),
    _y = E({}, yu, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    ts = it(_y),
    My = E({}, cn, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Pi,
    }),
    Dy = it(My),
    Uy = E({}, kl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    jy = it(Uy),
    wy = E({}, yu, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
              ? -e.wheelDelta
              : 0
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Hy = it(wy),
    By = E({}, kl, { newState: 0, oldState: 0 }),
    Ly = it(By),
    qy = [9, 13, 27, 32],
    ec = Kt && "CompositionEvent" in window,
    on = null
  Kt && "documentMode" in document && (on = document.documentMode)
  var Yy = Kt && "TextEvent" in window && !on,
    ls = Kt && (!ec || (on && 8 < on && 11 >= on)),
    as = " ",
    ns = !1
  function us(e, t) {
    switch (e) {
      case "keyup":
        return qy.indexOf(t.keyCode) !== -1
      case "keydown":
        return t.keyCode !== 229
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0
      default:
        return !1
    }
  }
  function is(e) {
    return ((e = e.detail), typeof e == "object" && "data" in e ? e.data : null)
  }
  var Sa = !1
  function Gy(e, t) {
    switch (e) {
      case "compositionend":
        return is(t)
      case "keypress":
        return t.which !== 32 ? null : ((ns = !0), as)
      case "textInput":
        return ((e = t.data), e === as && ns ? null : e)
      default:
        return null
    }
  }
  function Vy(e, t) {
    if (Sa)
      return e === "compositionend" || (!ec && us(e, t))
        ? ((e = Fo()), (fu = $i = vl = null), (Sa = !1), e)
        : null
    switch (e) {
      case "paste":
        return null
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char
          if (t.which) return String.fromCharCode(t.which)
        }
        return null
      case "compositionend":
        return ls && t.locale !== "ko" ? null : t.data
      default:
        return null
    }
  }
  var Xy = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  }
  function cs(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase()
    return t === "input" ? !!Xy[e.type] : t === "textarea"
  }
  function rs(e, t, l, a) {
    ;(pa ? (ba ? ba.push(a) : (ba = [a])) : (pa = a),
      (t = ni(t, "onChange")),
      0 < t.length &&
        ((l = new hu("onChange", "change", null, l, a)),
        e.push({ event: l, listeners: t })))
  }
  var sn = null,
    fn = null
  function Qy(e) {
    kd(e, 0)
  }
  function vu(e) {
    var t = an(e)
    if (Xo(t)) return e
  }
  function os(e, t) {
    if (e === "change") return t
  }
  var ss = !1
  if (Kt) {
    var tc
    if (Kt) {
      var lc = "oninput" in document
      if (!lc) {
        var fs = document.createElement("div")
        ;(fs.setAttribute("oninput", "return;"),
          (lc = typeof fs.oninput == "function"))
      }
      tc = lc
    } else tc = !1
    ss = tc && (!document.documentMode || 9 < document.documentMode)
  }
  function ds() {
    sn && (sn.detachEvent("onpropertychange", ms), (fn = sn = null))
  }
  function ms(e) {
    if (e.propertyName === "value" && vu(fn)) {
      var t = []
      ;(rs(t, fn, e, Zi(e)), Wo(Qy, t))
    }
  }
  function ky(e, t, l) {
    e === "focusin"
      ? (ds(), (sn = t), (fn = l), sn.attachEvent("onpropertychange", ms))
      : e === "focusout" && ds()
  }
  function Zy(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return vu(fn)
  }
  function Ky(e, t) {
    if (e === "click") return vu(t)
  }
  function Jy(e, t) {
    if (e === "input" || e === "change") return vu(t)
  }
  function $y(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t)
  }
  var yt = typeof Object.is == "function" ? Object.is : $y
  function dn(e, t) {
    if (yt(e, t)) return !0
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1
    var l = Object.keys(e),
      a = Object.keys(t)
    if (l.length !== a.length) return !1
    for (a = 0; a < l.length; a++) {
      var n = l[a]
      if (!Ui.call(t, n) || !yt(e[n], t[n])) return !1
    }
    return !0
  }
  function hs(e) {
    for (; e && e.firstChild; ) e = e.firstChild
    return e
  }
  function ys(e, t) {
    var l = hs(e)
    e = 0
    for (var a; l; ) {
      if (l.nodeType === 3) {
        if (((a = e + l.textContent.length), e <= t && a >= t))
          return { node: l, offset: t - e }
        e = a
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling
            break e
          }
          l = l.parentNode
        }
        l = void 0
      }
      l = hs(l)
    }
  }
  function vs(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? vs(e, t.parentNode)
            : "contains" in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1
  }
  function gs(e) {
    e =
      e != null &&
      e.ownerDocument != null &&
      e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window
    for (var t = ou(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof t.contentWindow.location.href == "string"
      } catch {
        l = !1
      }
      if (l) e = t.contentWindow
      else break
      t = ou(e.document)
    }
    return t
  }
  function ac(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase()
    return (
      t &&
      ((t === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        t === "textarea" ||
        e.contentEditable === "true")
    )
  }
  var Wy = Kt && "documentMode" in document && 11 >= document.documentMode,
    xa = null,
    nc = null,
    mn = null,
    uc = !1
  function ps(e, t, l) {
    var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument
    uc ||
      xa == null ||
      xa !== ou(a) ||
      ((a = xa),
      "selectionStart" in a && ac(a)
        ? (a = { start: a.selectionStart, end: a.selectionEnd })
        : ((a = (
            (a.ownerDocument && a.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset,
          })),
      (mn && dn(mn, a)) ||
        ((mn = a),
        (a = ni(nc, "onSelect")),
        0 < a.length &&
          ((t = new hu("onSelect", "select", null, t, l)),
          e.push({ event: t, listeners: a }),
          (t.target = xa))))
  }
  function Zl(e, t) {
    var l = {}
    return (
      (l[e.toLowerCase()] = t.toLowerCase()),
      (l["Webkit" + e] = "webkit" + t),
      (l["Moz" + e] = "moz" + t),
      l
    )
  }
  var Ea = {
      animationend: Zl("Animation", "AnimationEnd"),
      animationiteration: Zl("Animation", "AnimationIteration"),
      animationstart: Zl("Animation", "AnimationStart"),
      transitionrun: Zl("Transition", "TransitionRun"),
      transitionstart: Zl("Transition", "TransitionStart"),
      transitioncancel: Zl("Transition", "TransitionCancel"),
      transitionend: Zl("Transition", "TransitionEnd"),
    },
    ic = {},
    bs = {}
  Kt &&
    ((bs = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Ea.animationend.animation,
      delete Ea.animationiteration.animation,
      delete Ea.animationstart.animation),
    "TransitionEvent" in window || delete Ea.transitionend.transition)
  function Kl(e) {
    if (ic[e]) return ic[e]
    if (!Ea[e]) return e
    var t = Ea[e],
      l
    for (l in t) if (t.hasOwnProperty(l) && l in bs) return (ic[e] = t[l])
    return e
  }
  var Ss = Kl("animationend"),
    xs = Kl("animationiteration"),
    Es = Kl("animationstart"),
    Fy = Kl("transitionrun"),
    Iy = Kl("transitionstart"),
    Py = Kl("transitioncancel"),
    zs = Kl("transitionend"),
    Ts = new Map(),
    cc =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      )
  cc.push("scrollEnd")
  function wt(e, t) {
    ;(Ts.set(e, t), Ql(t, [e]))
  }
  var gu =
      typeof reportError == "function"
        ? reportError
        : function (e) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var t = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof e == "object" &&
                  e !== null &&
                  typeof e.message == "string"
                    ? String(e.message)
                    : String(e),
                error: e,
              })
              if (!window.dispatchEvent(t)) return
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", e)
              return
            }
            console.error(e)
          },
    Rt = [],
    za = 0,
    rc = 0
  function pu() {
    for (var e = za, t = (rc = za = 0); t < e; ) {
      var l = Rt[t]
      Rt[t++] = null
      var a = Rt[t]
      Rt[t++] = null
      var n = Rt[t]
      Rt[t++] = null
      var u = Rt[t]
      if (((Rt[t++] = null), a !== null && n !== null)) {
        var o = a.pending
        ;(o === null ? (n.next = n) : ((n.next = o.next), (o.next = n)),
          (a.pending = n))
      }
      u !== 0 && As(l, n, u)
    }
  }
  function bu(e, t, l, a) {
    ;((Rt[za++] = e),
      (Rt[za++] = t),
      (Rt[za++] = l),
      (Rt[za++] = a),
      (rc |= a),
      (e.lanes |= a),
      (e = e.alternate),
      e !== null && (e.lanes |= a))
  }
  function oc(e, t, l, a) {
    return (bu(e, t, l, a), Su(e))
  }
  function Jl(e, t) {
    return (bu(e, null, null, t), Su(e))
  }
  function As(e, t, l) {
    e.lanes |= l
    var a = e.alternate
    a !== null && (a.lanes |= l)
    for (var n = !1, u = e.return; u !== null; )
      ((u.childLanes |= l),
        (a = u.alternate),
        a !== null && (a.childLanes |= l),
        u.tag === 22 &&
          ((e = u.stateNode), e === null || e._visibility & 1 || (n = !0)),
        (e = u),
        (u = u.return))
    return e.tag === 3
      ? ((u = e.stateNode),
        n &&
          t !== null &&
          ((n = 31 - ht(l)),
          (e = u.hiddenUpdates),
          (a = e[n]),
          a === null ? (e[n] = [t]) : a.push(t),
          (t.lane = l | 536870912)),
        u)
      : null
  }
  function Su(e) {
    if (50 < wn) throw ((wn = 0), (pr = null), Error(r(185)))
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return))
    return e.tag === 3 ? e.stateNode : null
  }
  var Ta = {}
  function ev(e, t, l, a) {
    ;((this.tag = e),
      (this.key = l),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = a),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null))
  }
  function vt(e, t, l, a) {
    return new ev(e, t, l, a)
  }
  function sc(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent))
  }
  function Jt(e, t) {
    var l = e.alternate
    return (
      l === null
        ? ((l = vt(e.tag, t, e.key, e.mode)),
          (l.elementType = e.elementType),
          (l.type = e.type),
          (l.stateNode = e.stateNode),
          (l.alternate = e),
          (e.alternate = l))
        : ((l.pendingProps = t),
          (l.type = e.type),
          (l.flags = 0),
          (l.subtreeFlags = 0),
          (l.deletions = null)),
      (l.flags = e.flags & 65011712),
      (l.childLanes = e.childLanes),
      (l.lanes = e.lanes),
      (l.child = e.child),
      (l.memoizedProps = e.memoizedProps),
      (l.memoizedState = e.memoizedState),
      (l.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (l.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (l.sibling = e.sibling),
      (l.index = e.index),
      (l.ref = e.ref),
      (l.refCleanup = e.refCleanup),
      l
    )
  }
  function Rs(e, t) {
    e.flags &= 65011714
    var l = e.alternate
    return (
      l === null
        ? ((e.childLanes = 0),
          (e.lanes = t),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = l.childLanes),
          (e.lanes = l.lanes),
          (e.child = l.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = l.memoizedProps),
          (e.memoizedState = l.memoizedState),
          (e.updateQueue = l.updateQueue),
          (e.type = l.type),
          (t = l.dependencies),
          (e.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      e
    )
  }
  function xu(e, t, l, a, n, u) {
    var o = 0
    if (((a = e), typeof e == "function")) sc(e) && (o = 1)
    else if (typeof e == "string")
      o = ug(e, l, Q.current)
        ? 26
        : e === "html" || e === "head" || e === "body"
          ? 27
          : 5
    else
      e: switch (e) {
        case be:
          return ((e = vt(31, l, t, n)), (e.elementType = be), (e.lanes = u), e)
        case B:
          return $l(l.children, n, u, t)
        case H:
          ;((o = 8), (n |= 24))
          break
        case $:
          return (
            (e = vt(12, l, t, n | 2)), (e.elementType = $), (e.lanes = u), e
          )
        case fe:
          return ((e = vt(13, l, t, n)), (e.elementType = fe), (e.lanes = u), e)
        case de:
          return ((e = vt(19, l, t, n)), (e.elementType = de), (e.lanes = u), e)
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case I:
                o = 10
                break e
              case ne:
                o = 9
                break e
              case K:
                o = 11
                break e
              case ee:
                o = 14
                break e
              case V:
                ;((o = 16), (a = null))
                break e
            }
          ;((o = 29),
            (l = Error(r(130, e === null ? "null" : typeof e, ""))),
            (a = null))
      }
    return (
      (t = vt(o, l, t, n)), (t.elementType = e), (t.type = a), (t.lanes = u), t
    )
  }
  function $l(e, t, l, a) {
    return ((e = vt(7, e, a, t)), (e.lanes = l), e)
  }
  function fc(e, t, l) {
    return ((e = vt(6, e, null, t)), (e.lanes = l), e)
  }
  function Cs(e) {
    var t = vt(18, null, null, 0)
    return ((t.stateNode = e), t)
  }
  function dc(e, t, l) {
    return (
      (t = vt(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = l),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    )
  }
  var Os = new WeakMap()
  function Ct(e, t) {
    if (typeof e == "object" && e !== null) {
      var l = Os.get(e)
      return l !== void 0
        ? l
        : ((t = { value: e, source: t, stack: Co(t) }), Os.set(e, t), t)
    }
    return { value: e, source: t, stack: Co(t) }
  }
  var Aa = [],
    Ra = 0,
    Eu = null,
    hn = 0,
    Ot = [],
    Nt = 0,
    gl = null,
    qt = 1,
    Yt = ""
  function $t(e, t) {
    ;((Aa[Ra++] = hn), (Aa[Ra++] = Eu), (Eu = e), (hn = t))
  }
  function Ns(e, t, l) {
    ;((Ot[Nt++] = qt), (Ot[Nt++] = Yt), (Ot[Nt++] = gl), (gl = e))
    var a = qt
    e = Yt
    var n = 32 - ht(a) - 1
    ;((a &= ~(1 << n)), (l += 1))
    var u = 32 - ht(t) + n
    if (30 < u) {
      var o = n - (n % 5)
      ;((u = (a & ((1 << o) - 1)).toString(32)),
        (a >>= o),
        (n -= o),
        (qt = (1 << (32 - ht(t) + n)) | (l << n) | a),
        (Yt = u + e))
    } else ((qt = (1 << u) | (l << n) | a), (Yt = e))
  }
  function mc(e) {
    e.return !== null && ($t(e, 1), Ns(e, 1, 0))
  }
  function hc(e) {
    for (; e === Eu; )
      ((Eu = Aa[--Ra]), (Aa[Ra] = null), (hn = Aa[--Ra]), (Aa[Ra] = null))
    for (; e === gl; )
      ((gl = Ot[--Nt]),
        (Ot[Nt] = null),
        (Yt = Ot[--Nt]),
        (Ot[Nt] = null),
        (qt = Ot[--Nt]),
        (Ot[Nt] = null))
  }
  function _s(e, t) {
    ;((Ot[Nt++] = qt),
      (Ot[Nt++] = Yt),
      (Ot[Nt++] = gl),
      (qt = t.id),
      (Yt = t.overflow),
      (gl = e))
  }
  var Fe = null,
    Ue = null,
    pe = !1,
    pl = null,
    _t = !1,
    yc = Error(r(519))
  function bl(e) {
    var t = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1]
          ? "text"
          : "HTML",
        ""
      )
    )
    throw (yn(Ct(t, e)), yc)
  }
  function Ms(e) {
    var t = e.stateNode,
      l = e.type,
      a = e.memoizedProps
    switch (((t[We] = e), (t[ut] = a), l)) {
      case "dialog":
        ;(he("cancel", t), he("close", t))
        break
      case "iframe":
      case "object":
      case "embed":
        he("load", t)
        break
      case "video":
      case "audio":
        for (l = 0; l < Bn.length; l++) he(Bn[l], t)
        break
      case "source":
        he("error", t)
        break
      case "img":
      case "image":
      case "link":
        ;(he("error", t), he("load", t))
        break
      case "details":
        he("toggle", t)
        break
      case "input":
        ;(he("invalid", t),
          Qo(
            t,
            a.value,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name,
            !0
          ))
        break
      case "select":
        he("invalid", t)
        break
      case "textarea":
        ;(he("invalid", t), Zo(t, a.value, a.defaultValue, a.children))
    }
    ;((l = a.children),
      (typeof l != "string" && typeof l != "number" && typeof l != "bigint") ||
      t.textContent === "" + l ||
      a.suppressHydrationWarning === !0 ||
      $d(t.textContent, l)
        ? (a.popover != null && (he("beforetoggle", t), he("toggle", t)),
          a.onScroll != null && he("scroll", t),
          a.onScrollEnd != null && he("scrollend", t),
          a.onClick != null && (t.onclick = Zt),
          (t = !0))
        : (t = !1),
      t || bl(e, !0))
  }
  function Ds(e) {
    for (Fe = e.return; Fe; )
      switch (Fe.tag) {
        case 5:
        case 31:
        case 13:
          _t = !1
          return
        case 27:
        case 3:
          _t = !0
          return
        default:
          Fe = Fe.return
      }
  }
  function Ca(e) {
    if (e !== Fe) return !1
    if (!pe) return (Ds(e), (pe = !0), !1)
    var t = e.tag,
      l
    if (
      ((l = t !== 3 && t !== 27) &&
        ((l = t === 5) &&
          ((l = e.type),
          (l =
            !(l !== "form" && l !== "button") || Ur(e.type, e.memoizedProps))),
        (l = !l)),
      l && Ue && bl(e),
      Ds(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(r(317))
      Ue = nm(e)
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(r(317))
      Ue = nm(e)
    } else
      t === 27
        ? ((t = Ue), Ul(e.type) ? ((e = Lr), (Lr = null), (Ue = e)) : (Ue = t))
        : (Ue = Fe ? Dt(e.stateNode.nextSibling) : null)
    return !0
  }
  function Wl() {
    ;((Ue = Fe = null), (pe = !1))
  }
  function vc() {
    var e = pl
    return (
      e !== null &&
        (st === null ? (st = e) : st.push.apply(st, e), (pl = null)),
      e
    )
  }
  function yn(e) {
    pl === null ? (pl = [e]) : pl.push(e)
  }
  var gc = b(null),
    Fl = null,
    Wt = null
  function Sl(e, t, l) {
    ;(G(gc, t._currentValue), (t._currentValue = l))
  }
  function Ft(e) {
    ;((e._currentValue = gc.current), j(gc))
  }
  function pc(e, t, l) {
    for (; e !== null; ) {
      var a = e.alternate
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), a !== null && (a.childLanes |= t))
          : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t),
        e === l)
      )
        break
      e = e.return
    }
  }
  function bc(e, t, l, a) {
    var n = e.child
    for (n !== null && (n.return = e); n !== null; ) {
      var u = n.dependencies
      if (u !== null) {
        var o = n.child
        u = u.firstContext
        e: for (; u !== null; ) {
          var d = u
          u = n
          for (var v = 0; v < t.length; v++)
            if (d.context === t[v]) {
              ;((u.lanes |= l),
                (d = u.alternate),
                d !== null && (d.lanes |= l),
                pc(u.return, l, e),
                a || (o = null))
              break e
            }
          u = d.next
        }
      } else if (n.tag === 18) {
        if (((o = n.return), o === null)) throw Error(r(341))
        ;((o.lanes |= l),
          (u = o.alternate),
          u !== null && (u.lanes |= l),
          pc(o, l, e),
          (o = null))
      } else o = n.child
      if (o !== null) o.return = n
      else
        for (o = n; o !== null; ) {
          if (o === e) {
            o = null
            break
          }
          if (((n = o.sibling), n !== null)) {
            ;((n.return = o.return), (o = n))
            break
          }
          o = o.return
        }
      n = o
    }
  }
  function Oa(e, t, l, a) {
    e = null
    for (var n = t, u = !1; n !== null; ) {
      if (!u) {
        if ((n.flags & 524288) !== 0) u = !0
        else if ((n.flags & 262144) !== 0) break
      }
      if (n.tag === 10) {
        var o = n.alternate
        if (o === null) throw Error(r(387))
        if (((o = o.memoizedProps), o !== null)) {
          var d = n.type
          yt(n.pendingProps.value, o.value) ||
            (e !== null ? e.push(d) : (e = [d]))
        }
      } else if (n === ge.current) {
        if (((o = n.alternate), o === null)) throw Error(r(387))
        o.memoizedState.memoizedState !== n.memoizedState.memoizedState &&
          (e !== null ? e.push(Vn) : (e = [Vn]))
      }
      n = n.return
    }
    ;(e !== null && bc(t, e, l, a), (t.flags |= 262144))
  }
  function zu(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!yt(e.context._currentValue, e.memoizedValue)) return !0
      e = e.next
    }
    return !1
  }
  function Il(e) {
    ;((Fl = e),
      (Wt = null),
      (e = e.dependencies),
      e !== null && (e.firstContext = null))
  }
  function Ie(e) {
    return Us(Fl, e)
  }
  function Tu(e, t) {
    return (Fl === null && Il(e), Us(e, t))
  }
  function Us(e, t) {
    var l = t._currentValue
    if (((t = { context: t, memoizedValue: l, next: null }), Wt === null)) {
      if (e === null) throw Error(r(308))
      ;((Wt = t),
        (e.dependencies = { lanes: 0, firstContext: t }),
        (e.flags |= 524288))
    } else Wt = Wt.next = t
    return l
  }
  var tv =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (l, a) {
                  e.push(a)
                },
              })
            this.abort = function () {
              ;((t.aborted = !0),
                e.forEach(function (l) {
                  return l()
                }))
            }
          },
    lv = i.unstable_scheduleCallback,
    av = i.unstable_NormalPriority,
    Ge = {
      $$typeof: I,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    }
  function Sc() {
    return { controller: new tv(), data: new Map(), refCount: 0 }
  }
  function vn(e) {
    ;(e.refCount--,
      e.refCount === 0 &&
        lv(av, function () {
          e.controller.abort()
        }))
  }
  var gn = null,
    xc = 0,
    Na = 0,
    _a = null
  function nv(e, t) {
    if (gn === null) {
      var l = (gn = [])
      ;((xc = 0),
        (Na = Tr()),
        (_a = {
          status: "pending",
          value: void 0,
          then: function (a) {
            l.push(a)
          },
        }))
    }
    return (xc++, t.then(js, js), t)
  }
  function js() {
    if (--xc === 0 && gn !== null) {
      _a !== null && (_a.status = "fulfilled")
      var e = gn
      ;((gn = null), (Na = 0), (_a = null))
      for (var t = 0; t < e.length; t++) (0, e[t])()
    }
  }
  function uv(e, t) {
    var l = [],
      a = {
        status: "pending",
        value: null,
        reason: null,
        then: function (n) {
          l.push(n)
        },
      }
    return (
      e.then(
        function () {
          ;((a.status = "fulfilled"), (a.value = t))
          for (var n = 0; n < l.length; n++) (0, l[n])(t)
        },
        function (n) {
          for (a.status = "rejected", a.reason = n, n = 0; n < l.length; n++)
            (0, l[n])(void 0)
        }
      ),
      a
    )
  }
  var ws = _.S
  _.S = function (e, t) {
    ;((bd = dt()),
      typeof t == "object" &&
        t !== null &&
        typeof t.then == "function" &&
        nv(e, t),
      ws !== null && ws(e, t))
  }
  var Pl = b(null)
  function Ec() {
    var e = Pl.current
    return e !== null ? e : _e.pooledCache
  }
  function Au(e, t) {
    t === null ? G(Pl, Pl.current) : G(Pl, t.pool)
  }
  function Hs() {
    var e = Ec()
    return e === null ? null : { parent: Ge._currentValue, pool: e }
  }
  var Ma = Error(r(460)),
    zc = Error(r(474)),
    Ru = Error(r(542)),
    Cu = { then: function () {} }
  function Bs(e) {
    return ((e = e.status), e === "fulfilled" || e === "rejected")
  }
  function Ls(e, t, l) {
    switch (
      ((l = e[l]),
      l === void 0 ? e.push(t) : l !== t && (t.then(Zt, Zt), (t = l)),
      t.status)
    ) {
      case "fulfilled":
        return t.value
      case "rejected":
        throw ((e = t.reason), Ys(e), e)
      default:
        if (typeof t.status == "string") t.then(Zt, Zt)
        else {
          if (((e = _e), e !== null && 100 < e.shellSuspendCounter))
            throw Error(r(482))
          ;((e = t),
            (e.status = "pending"),
            e.then(
              function (a) {
                if (t.status === "pending") {
                  var n = t
                  ;((n.status = "fulfilled"), (n.value = a))
                }
              },
              function (a) {
                if (t.status === "pending") {
                  var n = t
                  ;((n.status = "rejected"), (n.reason = a))
                }
              }
            ))
        }
        switch (t.status) {
          case "fulfilled":
            return t.value
          case "rejected":
            throw ((e = t.reason), Ys(e), e)
        }
        throw ((ta = t), Ma)
    }
  }
  function ea(e) {
    try {
      var t = e._init
      return t(e._payload)
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function"
        ? ((ta = l), Ma)
        : l
    }
  }
  var ta = null
  function qs() {
    if (ta === null) throw Error(r(459))
    var e = ta
    return ((ta = null), e)
  }
  function Ys(e) {
    if (e === Ma || e === Ru) throw Error(r(483))
  }
  var Da = null,
    pn = 0
  function Ou(e) {
    var t = pn
    return ((pn += 1), Da === null && (Da = []), Ls(Da, e, t))
  }
  function bn(e, t) {
    ;((t = t.props.ref), (e.ref = t !== void 0 ? t : null))
  }
  function Nu(e, t) {
    throw t.$$typeof === w
      ? Error(r(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          r(
            31,
            e === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : e
          )
        ))
  }
  function Gs(e) {
    function t(S, p) {
      if (e) {
        var z = S.deletions
        z === null ? ((S.deletions = [p]), (S.flags |= 16)) : z.push(p)
      }
    }
    function l(S, p) {
      if (!e) return null
      for (; p !== null; ) (t(S, p), (p = p.sibling))
      return null
    }
    function a(S) {
      for (var p = new Map(); S !== null; )
        (S.key !== null ? p.set(S.key, S) : p.set(S.index, S), (S = S.sibling))
      return p
    }
    function n(S, p) {
      return ((S = Jt(S, p)), (S.index = 0), (S.sibling = null), S)
    }
    function u(S, p, z) {
      return (
        (S.index = z),
        e
          ? ((z = S.alternate),
            z !== null
              ? ((z = z.index), z < p ? ((S.flags |= 67108866), p) : z)
              : ((S.flags |= 67108866), p))
          : ((S.flags |= 1048576), p)
      )
    }
    function o(S) {
      return (e && S.alternate === null && (S.flags |= 67108866), S)
    }
    function d(S, p, z, D) {
      return p === null || p.tag !== 6
        ? ((p = fc(z, S.mode, D)), (p.return = S), p)
        : ((p = n(p, z)), (p.return = S), p)
    }
    function v(S, p, z, D) {
      var P = z.type
      return P === B
        ? M(S, p, z.props.children, D, z.key)
        : p !== null &&
            (p.elementType === P ||
              (typeof P == "object" &&
                P !== null &&
                P.$$typeof === V &&
                ea(P) === p.type))
          ? ((p = n(p, z.props)), bn(p, z), (p.return = S), p)
          : ((p = xu(z.type, z.key, z.props, null, S.mode, D)),
            bn(p, z),
            (p.return = S),
            p)
    }
    function T(S, p, z, D) {
      return p === null ||
        p.tag !== 4 ||
        p.stateNode.containerInfo !== z.containerInfo ||
        p.stateNode.implementation !== z.implementation
        ? ((p = dc(z, S.mode, D)), (p.return = S), p)
        : ((p = n(p, z.children || [])), (p.return = S), p)
    }
    function M(S, p, z, D, P) {
      return p === null || p.tag !== 7
        ? ((p = $l(z, S.mode, D, P)), (p.return = S), p)
        : ((p = n(p, z)), (p.return = S), p)
    }
    function U(S, p, z) {
      if (
        (typeof p == "string" && p !== "") ||
        typeof p == "number" ||
        typeof p == "bigint"
      )
        return ((p = fc("" + p, S.mode, z)), (p.return = S), p)
      if (typeof p == "object" && p !== null) {
        switch (p.$$typeof) {
          case q:
            return (
              (z = xu(p.type, p.key, p.props, null, S.mode, z)),
              bn(z, p),
              (z.return = S),
              z
            )
          case X:
            return ((p = dc(p, S.mode, z)), (p.return = S), p)
          case V:
            return ((p = ea(p)), U(S, p, z))
        }
        if (Ne(p) || De(p))
          return ((p = $l(p, S.mode, z, null)), (p.return = S), p)
        if (typeof p.then == "function") return U(S, Ou(p), z)
        if (p.$$typeof === I) return U(S, Tu(S, p), z)
        Nu(S, p)
      }
      return null
    }
    function R(S, p, z, D) {
      var P = p !== null ? p.key : null
      if (
        (typeof z == "string" && z !== "") ||
        typeof z == "number" ||
        typeof z == "bigint"
      )
        return P !== null ? null : d(S, p, "" + z, D)
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case q:
            return z.key === P ? v(S, p, z, D) : null
          case X:
            return z.key === P ? T(S, p, z, D) : null
          case V:
            return ((z = ea(z)), R(S, p, z, D))
        }
        if (Ne(z) || De(z)) return P !== null ? null : M(S, p, z, D, null)
        if (typeof z.then == "function") return R(S, p, Ou(z), D)
        if (z.$$typeof === I) return R(S, p, Tu(S, z), D)
        Nu(S, z)
      }
      return null
    }
    function O(S, p, z, D, P) {
      if (
        (typeof D == "string" && D !== "") ||
        typeof D == "number" ||
        typeof D == "bigint"
      )
        return ((S = S.get(z) || null), d(p, S, "" + D, P))
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case q:
            return (
              (S = S.get(D.key === null ? z : D.key) || null), v(p, S, D, P)
            )
          case X:
            return (
              (S = S.get(D.key === null ? z : D.key) || null), T(p, S, D, P)
            )
          case V:
            return ((D = ea(D)), O(S, p, z, D, P))
        }
        if (Ne(D) || De(D)) return ((S = S.get(z) || null), M(p, S, D, P, null))
        if (typeof D.then == "function") return O(S, p, z, Ou(D), P)
        if (D.$$typeof === I) return O(S, p, z, Tu(p, D), P)
        Nu(p, D)
      }
      return null
    }
    function k(S, p, z, D) {
      for (
        var P = null, xe = null, W = p, re = (p = 0), ve = null;
        W !== null && re < z.length;
        re++
      ) {
        W.index > re ? ((ve = W), (W = null)) : (ve = W.sibling)
        var Ee = R(S, W, z[re], D)
        if (Ee === null) {
          W === null && (W = ve)
          break
        }
        ;(e && W && Ee.alternate === null && t(S, W),
          (p = u(Ee, p, re)),
          xe === null ? (P = Ee) : (xe.sibling = Ee),
          (xe = Ee),
          (W = ve))
      }
      if (re === z.length) return (l(S, W), pe && $t(S, re), P)
      if (W === null) {
        for (; re < z.length; re++)
          ((W = U(S, z[re], D)),
            W !== null &&
              ((p = u(W, p, re)),
              xe === null ? (P = W) : (xe.sibling = W),
              (xe = W)))
        return (pe && $t(S, re), P)
      }
      for (W = a(W); re < z.length; re++)
        ((ve = O(W, S, re, z[re], D)),
          ve !== null &&
            (e &&
              ve.alternate !== null &&
              W.delete(ve.key === null ? re : ve.key),
            (p = u(ve, p, re)),
            xe === null ? (P = ve) : (xe.sibling = ve),
            (xe = ve)))
      return (
        e &&
          W.forEach(function (Ll) {
            return t(S, Ll)
          }),
        pe && $t(S, re),
        P
      )
    }
    function ae(S, p, z, D) {
      if (z == null) throw Error(r(151))
      for (
        var P = null, xe = null, W = p, re = (p = 0), ve = null, Ee = z.next();
        W !== null && !Ee.done;
        re++, Ee = z.next()
      ) {
        W.index > re ? ((ve = W), (W = null)) : (ve = W.sibling)
        var Ll = R(S, W, Ee.value, D)
        if (Ll === null) {
          W === null && (W = ve)
          break
        }
        ;(e && W && Ll.alternate === null && t(S, W),
          (p = u(Ll, p, re)),
          xe === null ? (P = Ll) : (xe.sibling = Ll),
          (xe = Ll),
          (W = ve))
      }
      if (Ee.done) return (l(S, W), pe && $t(S, re), P)
      if (W === null) {
        for (; !Ee.done; re++, Ee = z.next())
          ((Ee = U(S, Ee.value, D)),
            Ee !== null &&
              ((p = u(Ee, p, re)),
              xe === null ? (P = Ee) : (xe.sibling = Ee),
              (xe = Ee)))
        return (pe && $t(S, re), P)
      }
      for (W = a(W); !Ee.done; re++, Ee = z.next())
        ((Ee = O(W, S, re, Ee.value, D)),
          Ee !== null &&
            (e &&
              Ee.alternate !== null &&
              W.delete(Ee.key === null ? re : Ee.key),
            (p = u(Ee, p, re)),
            xe === null ? (P = Ee) : (xe.sibling = Ee),
            (xe = Ee)))
      return (
        e &&
          W.forEach(function (vg) {
            return t(S, vg)
          }),
        pe && $t(S, re),
        P
      )
    }
    function Oe(S, p, z, D) {
      if (
        (typeof z == "object" &&
          z !== null &&
          z.type === B &&
          z.key === null &&
          (z = z.props.children),
        typeof z == "object" && z !== null)
      ) {
        switch (z.$$typeof) {
          case q:
            e: {
              for (var P = z.key; p !== null; ) {
                if (p.key === P) {
                  if (((P = z.type), P === B)) {
                    if (p.tag === 7) {
                      ;(l(S, p.sibling),
                        (D = n(p, z.props.children)),
                        (D.return = S),
                        (S = D))
                      break e
                    }
                  } else if (
                    p.elementType === P ||
                    (typeof P == "object" &&
                      P !== null &&
                      P.$$typeof === V &&
                      ea(P) === p.type)
                  ) {
                    ;(l(S, p.sibling),
                      (D = n(p, z.props)),
                      bn(D, z),
                      (D.return = S),
                      (S = D))
                    break e
                  }
                  l(S, p)
                  break
                } else t(S, p)
                p = p.sibling
              }
              z.type === B
                ? ((D = $l(z.props.children, S.mode, D, z.key)),
                  (D.return = S),
                  (S = D))
                : ((D = xu(z.type, z.key, z.props, null, S.mode, D)),
                  bn(D, z),
                  (D.return = S),
                  (S = D))
            }
            return o(S)
          case X:
            e: {
              for (P = z.key; p !== null; ) {
                if (p.key === P)
                  if (
                    p.tag === 4 &&
                    p.stateNode.containerInfo === z.containerInfo &&
                    p.stateNode.implementation === z.implementation
                  ) {
                    ;(l(S, p.sibling),
                      (D = n(p, z.children || [])),
                      (D.return = S),
                      (S = D))
                    break e
                  } else {
                    l(S, p)
                    break
                  }
                else t(S, p)
                p = p.sibling
              }
              ;((D = dc(z, S.mode, D)), (D.return = S), (S = D))
            }
            return o(S)
          case V:
            return ((z = ea(z)), Oe(S, p, z, D))
        }
        if (Ne(z)) return k(S, p, z, D)
        if (De(z)) {
          if (((P = De(z)), typeof P != "function")) throw Error(r(150))
          return ((z = P.call(z)), ae(S, p, z, D))
        }
        if (typeof z.then == "function") return Oe(S, p, Ou(z), D)
        if (z.$$typeof === I) return Oe(S, p, Tu(S, z), D)
        Nu(S, z)
      }
      return (typeof z == "string" && z !== "") ||
        typeof z == "number" ||
        typeof z == "bigint"
        ? ((z = "" + z),
          p !== null && p.tag === 6
            ? (l(S, p.sibling), (D = n(p, z)), (D.return = S), (S = D))
            : (l(S, p), (D = fc(z, S.mode, D)), (D.return = S), (S = D)),
          o(S))
        : l(S, p)
    }
    return function (S, p, z, D) {
      try {
        pn = 0
        var P = Oe(S, p, z, D)
        return ((Da = null), P)
      } catch (W) {
        if (W === Ma || W === Ru) throw W
        var xe = vt(29, W, null, S.mode)
        return ((xe.lanes = D), (xe.return = S), xe)
      }
    }
  }
  var la = Gs(!0),
    Vs = Gs(!1),
    xl = !1
  function Tc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    }
  }
  function Ac(e, t) {
    ;((e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        }))
  }
  function El(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null }
  }
  function zl(e, t, l) {
    var a = e.updateQueue
    if (a === null) return null
    if (((a = a.shared), (ze & 2) !== 0)) {
      var n = a.pending
      return (
        n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (a.pending = t),
        (t = Su(e)),
        As(e, null, l),
        t
      )
    }
    return (bu(e, a, t, l), Su(e))
  }
  function Sn(e, t, l) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (l & 4194048) !== 0))
    ) {
      var a = t.lanes
      ;((a &= e.pendingLanes), (l |= a), (t.lanes = l), Uo(e, l))
    }
  }
  function Rc(e, t) {
    var l = e.updateQueue,
      a = e.alternate
    if (a !== null && ((a = a.updateQueue), l === a)) {
      var n = null,
        u = null
      if (((l = l.firstBaseUpdate), l !== null)) {
        do {
          var o = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null,
          }
          ;(u === null ? (n = u = o) : (u = u.next = o), (l = l.next))
        } while (l !== null)
        u === null ? (n = u = t) : (u = u.next = t)
      } else n = u = t
      ;((l = {
        baseState: a.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: u,
        shared: a.shared,
        callbacks: a.callbacks,
      }),
        (e.updateQueue = l))
      return
    }
    ;((e = l.lastBaseUpdate),
      e === null ? (l.firstBaseUpdate = t) : (e.next = t),
      (l.lastBaseUpdate = t))
  }
  var Cc = !1
  function xn() {
    if (Cc) {
      var e = _a
      if (e !== null) throw e
    }
  }
  function En(e, t, l, a) {
    Cc = !1
    var n = e.updateQueue
    xl = !1
    var u = n.firstBaseUpdate,
      o = n.lastBaseUpdate,
      d = n.shared.pending
    if (d !== null) {
      n.shared.pending = null
      var v = d,
        T = v.next
      ;((v.next = null), o === null ? (u = T) : (o.next = T), (o = v))
      var M = e.alternate
      M !== null &&
        ((M = M.updateQueue),
        (d = M.lastBaseUpdate),
        d !== o &&
          (d === null ? (M.firstBaseUpdate = T) : (d.next = T),
          (M.lastBaseUpdate = v)))
    }
    if (u !== null) {
      var U = n.baseState
      ;((o = 0), (M = T = v = null), (d = u))
      do {
        var R = d.lane & -536870913,
          O = R !== d.lane
        if (O ? (ye & R) === R : (a & R) === R) {
          ;(R !== 0 && R === Na && (Cc = !0),
            M !== null &&
              (M = M.next =
                {
                  lane: 0,
                  tag: d.tag,
                  payload: d.payload,
                  callback: null,
                  next: null,
                }))
          e: {
            var k = e,
              ae = d
            R = t
            var Oe = l
            switch (ae.tag) {
              case 1:
                if (((k = ae.payload), typeof k == "function")) {
                  U = k.call(Oe, U, R)
                  break e
                }
                U = k
                break e
              case 3:
                k.flags = (k.flags & -65537) | 128
              case 0:
                if (
                  ((k = ae.payload),
                  (R = typeof k == "function" ? k.call(Oe, U, R) : k),
                  R == null)
                )
                  break e
                U = E({}, U, R)
                break e
              case 2:
                xl = !0
            }
          }
          ;((R = d.callback),
            R !== null &&
              ((e.flags |= 64),
              O && (e.flags |= 8192),
              (O = n.callbacks),
              O === null ? (n.callbacks = [R]) : O.push(R)))
        } else
          ((O = {
            lane: R,
            tag: d.tag,
            payload: d.payload,
            callback: d.callback,
            next: null,
          }),
            M === null ? ((T = M = O), (v = U)) : (M = M.next = O),
            (o |= R))
        if (((d = d.next), d === null)) {
          if (((d = n.shared.pending), d === null)) break
          ;((O = d),
            (d = O.next),
            (O.next = null),
            (n.lastBaseUpdate = O),
            (n.shared.pending = null))
        }
      } while (!0)
      ;(M === null && (v = U),
        (n.baseState = v),
        (n.firstBaseUpdate = T),
        (n.lastBaseUpdate = M),
        u === null && (n.shared.lanes = 0),
        (Ol |= o),
        (e.lanes = o),
        (e.memoizedState = U))
    }
  }
  function Xs(e, t) {
    if (typeof e != "function") throw Error(r(191, e))
    e.call(t)
  }
  function Qs(e, t) {
    var l = e.callbacks
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++) Xs(l[e], t)
  }
  var Ua = b(null),
    _u = b(0)
  function ks(e, t) {
    ;((e = il), G(_u, e), G(Ua, t), (il = e | t.baseLanes))
  }
  function Oc() {
    ;(G(_u, il), G(Ua, Ua.current))
  }
  function Nc() {
    ;((il = _u.current), j(Ua), j(_u))
  }
  var gt = b(null),
    Mt = null
  function Tl(e) {
    var t = e.alternate
    ;(G(qe, qe.current & 1),
      G(gt, e),
      Mt === null &&
        (t === null || Ua.current !== null || t.memoizedState !== null) &&
        (Mt = e))
  }
  function _c(e) {
    ;(G(qe, qe.current), G(gt, e), Mt === null && (Mt = e))
  }
  function Zs(e) {
    e.tag === 22 ? (G(qe, qe.current), G(gt, e), Mt === null && (Mt = e)) : Al()
  }
  function Al() {
    ;(G(qe, qe.current), G(gt, gt.current))
  }
  function pt(e) {
    ;(j(gt), Mt === e && (Mt = null), j(qe))
  }
  var qe = b(0)
  function Mu(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState
        if (l !== null && ((l = l.dehydrated), l === null || Hr(l) || Br(l)))
          return t
      } else if (
        t.tag === 19 &&
        (t.memoizedProps.revealOrder === "forwards" ||
          t.memoizedProps.revealOrder === "backwards" ||
          t.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
          t.memoizedProps.revealOrder === "together")
      ) {
        if ((t.flags & 128) !== 0) return t
      } else if (t.child !== null) {
        ;((t.child.return = t), (t = t.child))
        continue
      }
      if (t === e) break
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null
        t = t.return
      }
      ;((t.sibling.return = t.return), (t = t.sibling))
    }
    return null
  }
  var It = 0,
    ie = null,
    Re = null,
    Ve = null,
    Du = !1,
    ja = !1,
    aa = !1,
    Uu = 0,
    zn = 0,
    wa = null,
    iv = 0
  function Be() {
    throw Error(r(321))
  }
  function Mc(e, t) {
    if (t === null) return !1
    for (var l = 0; l < t.length && l < e.length; l++)
      if (!yt(e[l], t[l])) return !1
    return !0
  }
  function Dc(e, t, l, a, n, u) {
    return (
      (It = u),
      (ie = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (_.H = e === null || e.memoizedState === null ? _f : Kc),
      (aa = !1),
      (u = l(a, n)),
      (aa = !1),
      ja && (u = Js(t, l, a, n)),
      Ks(e),
      u
    )
  }
  function Ks(e) {
    _.H = Rn
    var t = Re !== null && Re.next !== null
    if (((It = 0), (Ve = Re = ie = null), (Du = !1), (zn = 0), (wa = null), t))
      throw Error(r(300))
    e === null || Xe || ((e = e.dependencies), e !== null && zu(e) && (Xe = !0))
  }
  function Js(e, t, l, a) {
    ie = e
    var n = 0
    do {
      if ((ja && (wa = null), (zn = 0), (ja = !1), 25 <= n)) throw Error(r(301))
      if (((n += 1), (Ve = Re = null), e.updateQueue != null)) {
        var u = e.updateQueue
        ;((u.lastEffect = null),
          (u.events = null),
          (u.stores = null),
          u.memoCache != null && (u.memoCache.index = 0))
      }
      ;((_.H = Mf), (u = t(l, a)))
    } while (ja)
    return u
  }
  function cv() {
    var e = _.H,
      t = e.useState()[0]
    return (
      (t = typeof t.then == "function" ? Tn(t) : t),
      (e = e.useState()[0]),
      (Re !== null ? Re.memoizedState : null) !== e && (ie.flags |= 1024),
      t
    )
  }
  function Uc() {
    var e = Uu !== 0
    return ((Uu = 0), e)
  }
  function jc(e, t, l) {
    ;((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l))
  }
  function wc(e) {
    if (Du) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue
        ;(t !== null && (t.pending = null), (e = e.next))
      }
      Du = !1
    }
    ;((It = 0), (Ve = Re = ie = null), (ja = !1), (zn = Uu = 0), (wa = null))
  }
  function nt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    }
    return (Ve === null ? (ie.memoizedState = Ve = e) : (Ve = Ve.next = e), Ve)
  }
  function Ye() {
    if (Re === null) {
      var e = ie.alternate
      e = e !== null ? e.memoizedState : null
    } else e = Re.next
    var t = Ve === null ? ie.memoizedState : Ve.next
    if (t !== null) ((Ve = t), (Re = e))
    else {
      if (e === null)
        throw ie.alternate === null ? Error(r(467)) : Error(r(310))
      ;((Re = e),
        (e = {
          memoizedState: Re.memoizedState,
          baseState: Re.baseState,
          baseQueue: Re.baseQueue,
          queue: Re.queue,
          next: null,
        }),
        Ve === null ? (ie.memoizedState = Ve = e) : (Ve = Ve.next = e))
    }
    return Ve
  }
  function ju() {
    return { lastEffect: null, events: null, stores: null, memoCache: null }
  }
  function Tn(e) {
    var t = zn
    return (
      (zn += 1),
      wa === null && (wa = []),
      (e = Ls(wa, e, t)),
      (t = ie),
      (Ve === null ? t.memoizedState : Ve.next) === null &&
        ((t = t.alternate),
        (_.H = t === null || t.memoizedState === null ? _f : Kc)),
      e
    )
  }
  function wu(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Tn(e)
      if (e.$$typeof === I) return Ie(e)
    }
    throw Error(r(438, String(e)))
  }
  function Hc(e) {
    var t = null,
      l = ie.updateQueue
    if ((l !== null && (t = l.memoCache), t == null)) {
      var a = ie.alternate
      a !== null &&
        ((a = a.updateQueue),
        a !== null &&
          ((a = a.memoCache),
          a != null &&
            (t = {
              data: a.data.map(function (n) {
                return n.slice()
              }),
              index: 0,
            })))
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      l === null && ((l = ju()), (ie.updateQueue = l)),
      (l.memoCache = t),
      (l = t.data[t.index]),
      l === void 0)
    )
      for (l = t.data[t.index] = Array(e), a = 0; a < e; a++) l[a] = ce
    return (t.index++, l)
  }
  function Pt(e, t) {
    return typeof t == "function" ? t(e) : t
  }
  function Hu(e) {
    var t = Ye()
    return Bc(t, Re, e)
  }
  function Bc(e, t, l) {
    var a = e.queue
    if (a === null) throw Error(r(311))
    a.lastRenderedReducer = l
    var n = e.baseQueue,
      u = a.pending
    if (u !== null) {
      if (n !== null) {
        var o = n.next
        ;((n.next = u.next), (u.next = o))
      }
      ;((t.baseQueue = n = u), (a.pending = null))
    }
    if (((u = e.baseState), n === null)) e.memoizedState = u
    else {
      t = n.next
      var d = (o = null),
        v = null,
        T = t,
        M = !1
      do {
        var U = T.lane & -536870913
        if (U !== T.lane ? (ye & U) === U : (It & U) === U) {
          var R = T.revertLane
          if (R === 0)
            (v !== null &&
              (v = v.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: T.action,
                  hasEagerState: T.hasEagerState,
                  eagerState: T.eagerState,
                  next: null,
                }),
              U === Na && (M = !0))
          else if ((It & R) === R) {
            ;((T = T.next), R === Na && (M = !0))
            continue
          } else
            ((U = {
              lane: 0,
              revertLane: T.revertLane,
              gesture: null,
              action: T.action,
              hasEagerState: T.hasEagerState,
              eagerState: T.eagerState,
              next: null,
            }),
              v === null ? ((d = v = U), (o = u)) : (v = v.next = U),
              (ie.lanes |= R),
              (Ol |= R))
          ;((U = T.action),
            aa && l(u, U),
            (u = T.hasEagerState ? T.eagerState : l(u, U)))
        } else
          ((R = {
            lane: U,
            revertLane: T.revertLane,
            gesture: T.gesture,
            action: T.action,
            hasEagerState: T.hasEagerState,
            eagerState: T.eagerState,
            next: null,
          }),
            v === null ? ((d = v = R), (o = u)) : (v = v.next = R),
            (ie.lanes |= U),
            (Ol |= U))
        T = T.next
      } while (T !== null && T !== t)
      if (
        (v === null ? (o = u) : (v.next = d),
        !yt(u, e.memoizedState) && ((Xe = !0), M && ((l = _a), l !== null)))
      )
        throw l
      ;((e.memoizedState = u),
        (e.baseState = o),
        (e.baseQueue = v),
        (a.lastRenderedState = u))
    }
    return (n === null && (a.lanes = 0), [e.memoizedState, a.dispatch])
  }
  function Lc(e) {
    var t = Ye(),
      l = t.queue
    if (l === null) throw Error(r(311))
    l.lastRenderedReducer = e
    var a = l.dispatch,
      n = l.pending,
      u = t.memoizedState
    if (n !== null) {
      l.pending = null
      var o = (n = n.next)
      do ((u = e(u, o.action)), (o = o.next))
      while (o !== n)
      ;(yt(u, t.memoizedState) || (Xe = !0),
        (t.memoizedState = u),
        t.baseQueue === null && (t.baseState = u),
        (l.lastRenderedState = u))
    }
    return [u, a]
  }
  function $s(e, t, l) {
    var a = ie,
      n = Ye(),
      u = pe
    if (u) {
      if (l === void 0) throw Error(r(407))
      l = l()
    } else l = t()
    var o = !yt((Re || n).memoizedState, l)
    if (
      (o && ((n.memoizedState = l), (Xe = !0)),
      (n = n.queue),
      Gc(Is.bind(null, a, n, e), [e]),
      n.getSnapshot !== t || o || (Ve !== null && Ve.memoizedState.tag & 1))
    ) {
      if (
        ((a.flags |= 2048),
        Ha(9, { destroy: void 0 }, Fs.bind(null, a, n, l, t), null),
        _e === null)
      )
        throw Error(r(349))
      u || (It & 127) !== 0 || Ws(a, t, l)
    }
    return l
  }
  function Ws(e, t, l) {
    ;((e.flags |= 16384),
      (e = { getSnapshot: t, value: l }),
      (t = ie.updateQueue),
      t === null
        ? ((t = ju()), (ie.updateQueue = t), (t.stores = [e]))
        : ((l = t.stores), l === null ? (t.stores = [e]) : l.push(e)))
  }
  function Fs(e, t, l, a) {
    ;((t.value = l), (t.getSnapshot = a), Ps(t) && ef(e))
  }
  function Is(e, t, l) {
    return l(function () {
      Ps(t) && ef(e)
    })
  }
  function Ps(e) {
    var t = e.getSnapshot
    e = e.value
    try {
      var l = t()
      return !yt(e, l)
    } catch {
      return !0
    }
  }
  function ef(e) {
    var t = Jl(e, 2)
    t !== null && ft(t, e, 2)
  }
  function qc(e) {
    var t = nt()
    if (typeof e == "function") {
      var l = e
      if (((e = l()), aa)) {
        hl(!0)
        try {
          l()
        } finally {
          hl(!1)
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Pt,
        lastRenderedState: e,
      }),
      t
    )
  }
  function tf(e, t, l, a) {
    return ((e.baseState = l), Bc(e, Re, typeof a == "function" ? a : Pt))
  }
  function rv(e, t, l, a, n) {
    if (qu(e)) throw Error(r(485))
    if (((e = t.action), e !== null)) {
      var u = {
        payload: n,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (o) {
          u.listeners.push(o)
        },
      }
      ;(_.T !== null ? l(!0) : (u.isTransition = !1),
        a(u),
        (l = t.pending),
        l === null
          ? ((u.next = t.pending = u), lf(t, u))
          : ((u.next = l.next), (t.pending = l.next = u)))
    }
  }
  function lf(e, t) {
    var l = t.action,
      a = t.payload,
      n = e.state
    if (t.isTransition) {
      var u = _.T,
        o = {}
      _.T = o
      try {
        var d = l(n, a),
          v = _.S
        ;(v !== null && v(o, d), af(e, t, d))
      } catch (T) {
        Yc(e, t, T)
      } finally {
        ;(u !== null && o.types !== null && (u.types = o.types), (_.T = u))
      }
    } else
      try {
        ;((u = l(n, a)), af(e, t, u))
      } catch (T) {
        Yc(e, t, T)
      }
  }
  function af(e, t, l) {
    l !== null && typeof l == "object" && typeof l.then == "function"
      ? l.then(
          function (a) {
            nf(e, t, a)
          },
          function (a) {
            return Yc(e, t, a)
          }
        )
      : nf(e, t, l)
  }
  function nf(e, t, l) {
    ;((t.status = "fulfilled"),
      (t.value = l),
      uf(t),
      (e.state = l),
      (t = e.pending),
      t !== null &&
        ((l = t.next),
        l === t ? (e.pending = null) : ((l = l.next), (t.next = l), lf(e, l))))
  }
  function Yc(e, t, l) {
    var a = e.pending
    if (((e.pending = null), a !== null)) {
      a = a.next
      do ((t.status = "rejected"), (t.reason = l), uf(t), (t = t.next))
      while (t !== a)
    }
    e.action = null
  }
  function uf(e) {
    e = e.listeners
    for (var t = 0; t < e.length; t++) (0, e[t])()
  }
  function cf(e, t) {
    return t
  }
  function rf(e, t) {
    if (pe) {
      var l = _e.formState
      if (l !== null) {
        e: {
          var a = ie
          if (pe) {
            if (Ue) {
              t: {
                for (var n = Ue, u = _t; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null
                    break t
                  }
                  if (((n = Dt(n.nextSibling)), n === null)) {
                    n = null
                    break t
                  }
                }
                ;((u = n.data), (n = u === "F!" || u === "F" ? n : null))
              }
              if (n) {
                ;((Ue = Dt(n.nextSibling)), (a = n.data === "F!"))
                break e
              }
            }
            bl(a)
          }
          a = !1
        }
        a && (t = l[0])
      }
    }
    return (
      (l = nt()),
      (l.memoizedState = l.baseState = t),
      (a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: cf,
        lastRenderedState: t,
      }),
      (l.queue = a),
      (l = Cf.bind(null, ie, a)),
      (a.dispatch = l),
      (a = qc(!1)),
      (u = Zc.bind(null, ie, !1, a.queue)),
      (a = nt()),
      (n = { state: t, dispatch: null, action: e, pending: null }),
      (a.queue = n),
      (l = rv.bind(null, ie, n, u, l)),
      (n.dispatch = l),
      (a.memoizedState = e),
      [t, l, !1]
    )
  }
  function of(e) {
    var t = Ye()
    return sf(t, Re, e)
  }
  function sf(e, t, l) {
    if (
      ((t = Bc(e, t, cf)[0]),
      (e = Hu(Pt)[0]),
      typeof t == "object" && t !== null && typeof t.then == "function")
    )
      try {
        var a = Tn(t)
      } catch (o) {
        throw o === Ma ? Ru : o
      }
    else a = t
    t = Ye()
    var n = t.queue,
      u = n.dispatch
    return (
      l !== t.memoizedState &&
        ((ie.flags |= 2048),
        Ha(9, { destroy: void 0 }, ov.bind(null, n, l), null)),
      [a, u, e]
    )
  }
  function ov(e, t) {
    e.action = t
  }
  function ff(e) {
    var t = Ye(),
      l = Re
    if (l !== null) return sf(t, l, e)
    ;(Ye(), (t = t.memoizedState), (l = Ye()))
    var a = l.queue.dispatch
    return ((l.memoizedState = e), [t, a, !1])
  }
  function Ha(e, t, l, a) {
    return (
      (e = { tag: e, create: l, deps: a, inst: t, next: null }),
      (t = ie.updateQueue),
      t === null && ((t = ju()), (ie.updateQueue = t)),
      (l = t.lastEffect),
      l === null
        ? (t.lastEffect = e.next = e)
        : ((a = l.next), (l.next = e), (e.next = a), (t.lastEffect = e)),
      e
    )
  }
  function df() {
    return Ye().memoizedState
  }
  function Bu(e, t, l, a) {
    var n = nt()
    ;((ie.flags |= e),
      (n.memoizedState = Ha(
        1 | t,
        { destroy: void 0 },
        l,
        a === void 0 ? null : a
      )))
  }
  function Lu(e, t, l, a) {
    var n = Ye()
    a = a === void 0 ? null : a
    var u = n.memoizedState.inst
    Re !== null && a !== null && Mc(a, Re.memoizedState.deps)
      ? (n.memoizedState = Ha(t, u, l, a))
      : ((ie.flags |= e), (n.memoizedState = Ha(1 | t, u, l, a)))
  }
  function mf(e, t) {
    Bu(8390656, 8, e, t)
  }
  function Gc(e, t) {
    Lu(2048, 8, e, t)
  }
  function sv(e) {
    ie.flags |= 4
    var t = ie.updateQueue
    if (t === null) ((t = ju()), (ie.updateQueue = t), (t.events = [e]))
    else {
      var l = t.events
      l === null ? (t.events = [e]) : l.push(e)
    }
  }
  function hf(e) {
    var t = Ye().memoizedState
    return (
      sv({ ref: t, nextImpl: e }),
      function () {
        if ((ze & 2) !== 0) throw Error(r(440))
        return t.impl.apply(void 0, arguments)
      }
    )
  }
  function yf(e, t) {
    return Lu(4, 2, e, t)
  }
  function vf(e, t) {
    return Lu(4, 4, e, t)
  }
  function gf(e, t) {
    if (typeof t == "function") {
      e = e()
      var l = t(e)
      return function () {
        typeof l == "function" ? l() : t(null)
      }
    }
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null
        }
      )
  }
  function pf(e, t, l) {
    ;((l = l != null ? l.concat([e]) : null), Lu(4, 4, gf.bind(null, t, e), l))
  }
  function Vc() {}
  function bf(e, t) {
    var l = Ye()
    t = t === void 0 ? null : t
    var a = l.memoizedState
    return t !== null && Mc(t, a[1]) ? a[0] : ((l.memoizedState = [e, t]), e)
  }
  function Sf(e, t) {
    var l = Ye()
    t = t === void 0 ? null : t
    var a = l.memoizedState
    if (t !== null && Mc(t, a[1])) return a[0]
    if (((a = e()), aa)) {
      hl(!0)
      try {
        e()
      } finally {
        hl(!1)
      }
    }
    return ((l.memoizedState = [a, t]), a)
  }
  function Xc(e, t, l) {
    return l === void 0 || ((It & 1073741824) !== 0 && (ye & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = l), (e = xd()), (ie.lanes |= e), (Ol |= e), l)
  }
  function xf(e, t, l, a) {
    return yt(l, t)
      ? l
      : Ua.current !== null
        ? ((e = Xc(e, l, a)), yt(e, t) || (Xe = !0), e)
        : (It & 42) === 0 || ((It & 1073741824) !== 0 && (ye & 261930) === 0)
          ? ((Xe = !0), (e.memoizedState = l))
          : ((e = xd()), (ie.lanes |= e), (Ol |= e), t)
  }
  function Ef(e, t, l, a, n) {
    var u = L.p
    L.p = u !== 0 && 8 > u ? u : 8
    var o = _.T,
      d = {}
    ;((_.T = d), Zc(e, !1, t, l))
    try {
      var v = n(),
        T = _.S
      if (
        (T !== null && T(d, v),
        v !== null && typeof v == "object" && typeof v.then == "function")
      ) {
        var M = uv(v, a)
        An(e, t, M, xt(e))
      } else An(e, t, a, xt(e))
    } catch (U) {
      An(e, t, { then: function () {}, status: "rejected", reason: U }, xt())
    } finally {
      ;((L.p = u),
        o !== null && d.types !== null && (o.types = d.types),
        (_.T = o))
    }
  }
  function fv() {}
  function Qc(e, t, l, a) {
    if (e.tag !== 5) throw Error(r(476))
    var n = zf(e).queue
    Ef(
      e,
      n,
      t,
      le,
      l === null
        ? fv
        : function () {
            return (Tf(e), l(a))
          }
    )
  }
  function zf(e) {
    var t = e.memoizedState
    if (t !== null) return t
    t = {
      memoizedState: le,
      baseState: le,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Pt,
        lastRenderedState: le,
      },
      next: null,
    }
    var l = {}
    return (
      (t.next = {
        memoizedState: l,
        baseState: l,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Pt,
          lastRenderedState: l,
        },
        next: null,
      }),
      (e.memoizedState = t),
      (e = e.alternate),
      e !== null && (e.memoizedState = t),
      t
    )
  }
  function Tf(e) {
    var t = zf(e)
    ;(t.next === null && (t = e.alternate.memoizedState),
      An(e, t.next.queue, {}, xt()))
  }
  function kc() {
    return Ie(Vn)
  }
  function Af() {
    return Ye().memoizedState
  }
  function Rf() {
    return Ye().memoizedState
  }
  function dv(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = xt()
          e = El(l)
          var a = zl(t, e, l)
          ;(a !== null && (ft(a, t, l), Sn(a, t, l)),
            (t = { cache: Sc() }),
            (e.payload = t))
          return
      }
      t = t.return
    }
  }
  function mv(e, t, l) {
    var a = xt()
    ;((l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      qu(e)
        ? Of(t, l)
        : ((l = oc(e, t, l, a)), l !== null && (ft(l, e, a), Nf(l, t, a))))
  }
  function Cf(e, t, l) {
    var a = xt()
    An(e, t, l, a)
  }
  function An(e, t, l, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }
    if (qu(e)) Of(t, n)
    else {
      var u = e.alternate
      if (
        e.lanes === 0 &&
        (u === null || u.lanes === 0) &&
        ((u = t.lastRenderedReducer), u !== null)
      )
        try {
          var o = t.lastRenderedState,
            d = u(o, l)
          if (((n.hasEagerState = !0), (n.eagerState = d), yt(d, o)))
            return (bu(e, t, n, 0), _e === null && pu(), !1)
        } catch {}
      if (((l = oc(e, t, n, a)), l !== null))
        return (ft(l, e, a), Nf(l, t, a), !0)
    }
    return !1
  }
  function Zc(e, t, l, a) {
    if (
      ((a = {
        lane: 2,
        revertLane: Tr(),
        gesture: null,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      qu(e))
    ) {
      if (t) throw Error(r(479))
    } else ((t = oc(e, l, a, 2)), t !== null && ft(t, e, 2))
  }
  function qu(e) {
    var t = e.alternate
    return e === ie || (t !== null && t === ie)
  }
  function Of(e, t) {
    ja = Du = !0
    var l = e.pending
    ;(l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
      (e.pending = t))
  }
  function Nf(e, t, l) {
    if ((l & 4194048) !== 0) {
      var a = t.lanes
      ;((a &= e.pendingLanes), (l |= a), (t.lanes = l), Uo(e, l))
    }
  }
  var Rn = {
    readContext: Ie,
    use: wu,
    useCallback: Be,
    useContext: Be,
    useEffect: Be,
    useImperativeHandle: Be,
    useLayoutEffect: Be,
    useInsertionEffect: Be,
    useMemo: Be,
    useReducer: Be,
    useRef: Be,
    useState: Be,
    useDebugValue: Be,
    useDeferredValue: Be,
    useTransition: Be,
    useSyncExternalStore: Be,
    useId: Be,
    useHostTransitionStatus: Be,
    useFormState: Be,
    useActionState: Be,
    useOptimistic: Be,
    useMemoCache: Be,
    useCacheRefresh: Be,
  }
  Rn.useEffectEvent = Be
  var _f = {
      readContext: Ie,
      use: wu,
      useCallback: function (e, t) {
        return ((nt().memoizedState = [e, t === void 0 ? null : t]), e)
      },
      useContext: Ie,
      useEffect: mf,
      useImperativeHandle: function (e, t, l) {
        ;((l = l != null ? l.concat([e]) : null),
          Bu(4194308, 4, gf.bind(null, t, e), l))
      },
      useLayoutEffect: function (e, t) {
        return Bu(4194308, 4, e, t)
      },
      useInsertionEffect: function (e, t) {
        Bu(4, 2, e, t)
      },
      useMemo: function (e, t) {
        var l = nt()
        t = t === void 0 ? null : t
        var a = e()
        if (aa) {
          hl(!0)
          try {
            e()
          } finally {
            hl(!1)
          }
        }
        return ((l.memoizedState = [a, t]), a)
      },
      useReducer: function (e, t, l) {
        var a = nt()
        if (l !== void 0) {
          var n = l(t)
          if (aa) {
            hl(!0)
            try {
              l(t)
            } finally {
              hl(!1)
            }
          }
        } else n = t
        return (
          (a.memoizedState = a.baseState = n),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: n,
          }),
          (a.queue = e),
          (e = e.dispatch = mv.bind(null, ie, e)),
          [a.memoizedState, e]
        )
      },
      useRef: function (e) {
        var t = nt()
        return ((e = { current: e }), (t.memoizedState = e))
      },
      useState: function (e) {
        e = qc(e)
        var t = e.queue,
          l = Cf.bind(null, ie, t)
        return ((t.dispatch = l), [e.memoizedState, l])
      },
      useDebugValue: Vc,
      useDeferredValue: function (e, t) {
        var l = nt()
        return Xc(l, e, t)
      },
      useTransition: function () {
        var e = qc(!1)
        return (
          (e = Ef.bind(null, ie, e.queue, !0, !1)),
          (nt().memoizedState = e),
          [!1, e]
        )
      },
      useSyncExternalStore: function (e, t, l) {
        var a = ie,
          n = nt()
        if (pe) {
          if (l === void 0) throw Error(r(407))
          l = l()
        } else {
          if (((l = t()), _e === null)) throw Error(r(349))
          ;(ye & 127) !== 0 || Ws(a, t, l)
        }
        n.memoizedState = l
        var u = { value: l, getSnapshot: t }
        return (
          (n.queue = u),
          mf(Is.bind(null, a, u, e), [e]),
          (a.flags |= 2048),
          Ha(9, { destroy: void 0 }, Fs.bind(null, a, u, l, t), null),
          l
        )
      },
      useId: function () {
        var e = nt(),
          t = _e.identifierPrefix
        if (pe) {
          var l = Yt,
            a = qt
          ;((l = (a & ~(1 << (32 - ht(a) - 1))).toString(32) + l),
            (t = "_" + t + "R_" + l),
            (l = Uu++),
            0 < l && (t += "H" + l.toString(32)),
            (t += "_"))
        } else ((l = iv++), (t = "_" + t + "r_" + l.toString(32) + "_"))
        return (e.memoizedState = t)
      },
      useHostTransitionStatus: kc,
      useFormState: rf,
      useActionState: rf,
      useOptimistic: function (e) {
        var t = nt()
        t.memoizedState = t.baseState = e
        var l = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        }
        return (
          (t.queue = l),
          (t = Zc.bind(null, ie, !0, l)),
          (l.dispatch = t),
          [e, t]
        )
      },
      useMemoCache: Hc,
      useCacheRefresh: function () {
        return (nt().memoizedState = dv.bind(null, ie))
      },
      useEffectEvent: function (e) {
        var t = nt(),
          l = { impl: e }
        return (
          (t.memoizedState = l),
          function () {
            if ((ze & 2) !== 0) throw Error(r(440))
            return l.impl.apply(void 0, arguments)
          }
        )
      },
    },
    Kc = {
      readContext: Ie,
      use: wu,
      useCallback: bf,
      useContext: Ie,
      useEffect: Gc,
      useImperativeHandle: pf,
      useInsertionEffect: yf,
      useLayoutEffect: vf,
      useMemo: Sf,
      useReducer: Hu,
      useRef: df,
      useState: function () {
        return Hu(Pt)
      },
      useDebugValue: Vc,
      useDeferredValue: function (e, t) {
        var l = Ye()
        return xf(l, Re.memoizedState, e, t)
      },
      useTransition: function () {
        var e = Hu(Pt)[0],
          t = Ye().memoizedState
        return [typeof e == "boolean" ? e : Tn(e), t]
      },
      useSyncExternalStore: $s,
      useId: Af,
      useHostTransitionStatus: kc,
      useFormState: of,
      useActionState: of,
      useOptimistic: function (e, t) {
        var l = Ye()
        return tf(l, Re, e, t)
      },
      useMemoCache: Hc,
      useCacheRefresh: Rf,
    }
  Kc.useEffectEvent = hf
  var Mf = {
    readContext: Ie,
    use: wu,
    useCallback: bf,
    useContext: Ie,
    useEffect: Gc,
    useImperativeHandle: pf,
    useInsertionEffect: yf,
    useLayoutEffect: vf,
    useMemo: Sf,
    useReducer: Lc,
    useRef: df,
    useState: function () {
      return Lc(Pt)
    },
    useDebugValue: Vc,
    useDeferredValue: function (e, t) {
      var l = Ye()
      return Re === null ? Xc(l, e, t) : xf(l, Re.memoizedState, e, t)
    },
    useTransition: function () {
      var e = Lc(Pt)[0],
        t = Ye().memoizedState
      return [typeof e == "boolean" ? e : Tn(e), t]
    },
    useSyncExternalStore: $s,
    useId: Af,
    useHostTransitionStatus: kc,
    useFormState: ff,
    useActionState: ff,
    useOptimistic: function (e, t) {
      var l = Ye()
      return Re !== null
        ? tf(l, Re, e, t)
        : ((l.baseState = e), [e, l.queue.dispatch])
    },
    useMemoCache: Hc,
    useCacheRefresh: Rf,
  }
  Mf.useEffectEvent = hf
  function Jc(e, t, l, a) {
    ;((t = e.memoizedState),
      (l = l(a, t)),
      (l = l == null ? t : E({}, t, l)),
      (e.memoizedState = l),
      e.lanes === 0 && (e.updateQueue.baseState = l))
  }
  var $c = {
    enqueueSetState: function (e, t, l) {
      e = e._reactInternals
      var a = xt(),
        n = El(a)
      ;((n.payload = t),
        l != null && (n.callback = l),
        (t = zl(e, n, a)),
        t !== null && (ft(t, e, a), Sn(t, e, a)))
    },
    enqueueReplaceState: function (e, t, l) {
      e = e._reactInternals
      var a = xt(),
        n = El(a)
      ;((n.tag = 1),
        (n.payload = t),
        l != null && (n.callback = l),
        (t = zl(e, n, a)),
        t !== null && (ft(t, e, a), Sn(t, e, a)))
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals
      var l = xt(),
        a = El(l)
      ;((a.tag = 2),
        t != null && (a.callback = t),
        (t = zl(e, a, l)),
        t !== null && (ft(t, e, l), Sn(t, e, l)))
    },
  }
  function Df(e, t, l, a, n, u, o) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(a, u, o)
        : t.prototype && t.prototype.isPureReactComponent
          ? !dn(l, a) || !dn(n, u)
          : !0
    )
  }
  function Uf(e, t, l, a) {
    ;((e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(l, a),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(l, a),
      t.state !== e && $c.enqueueReplaceState(t, t.state, null))
  }
  function na(e, t) {
    var l = t
    if ("ref" in t) {
      l = {}
      for (var a in t) a !== "ref" && (l[a] = t[a])
    }
    if ((e = e.defaultProps)) {
      l === t && (l = E({}, l))
      for (var n in e) l[n] === void 0 && (l[n] = e[n])
    }
    return l
  }
  function jf(e) {
    gu(e)
  }
  function wf(e) {
    console.error(e)
  }
  function Hf(e) {
    gu(e)
  }
  function Yu(e, t) {
    try {
      var l = e.onUncaughtError
      l(t.value, { componentStack: t.stack })
    } catch (a) {
      setTimeout(function () {
        throw a
      })
    }
  }
  function Bf(e, t, l) {
    try {
      var a = e.onCaughtError
      a(l.value, {
        componentStack: l.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      })
    } catch (n) {
      setTimeout(function () {
        throw n
      })
    }
  }
  function Wc(e, t, l) {
    return (
      (l = El(l)),
      (l.tag = 3),
      (l.payload = { element: null }),
      (l.callback = function () {
        Yu(e, t)
      }),
      l
    )
  }
  function Lf(e) {
    return ((e = El(e)), (e.tag = 3), e)
  }
  function qf(e, t, l, a) {
    var n = l.type.getDerivedStateFromError
    if (typeof n == "function") {
      var u = a.value
      ;((e.payload = function () {
        return n(u)
      }),
        (e.callback = function () {
          Bf(t, l, a)
        }))
    }
    var o = l.stateNode
    o !== null &&
      typeof o.componentDidCatch == "function" &&
      (e.callback = function () {
        ;(Bf(t, l, a),
          typeof n != "function" &&
            (Nl === null ? (Nl = new Set([this])) : Nl.add(this)))
        var d = a.stack
        this.componentDidCatch(a.value, { componentStack: d !== null ? d : "" })
      })
  }
  function hv(e, t, l, a, n) {
    if (
      ((l.flags |= 32768),
      a !== null && typeof a == "object" && typeof a.then == "function")
    ) {
      if (
        ((t = l.alternate),
        t !== null && Oa(t, l, n, !0),
        (l = gt.current),
        l !== null)
      ) {
        switch (l.tag) {
          case 31:
          case 13:
            return (
              Mt === null ? Iu() : l.alternate === null && Le === 0 && (Le = 3),
              (l.flags &= -257),
              (l.flags |= 65536),
              (l.lanes = n),
              a === Cu
                ? (l.flags |= 16384)
                : ((t = l.updateQueue),
                  t === null ? (l.updateQueue = new Set([a])) : t.add(a),
                  xr(e, a, n)),
              !1
            )
          case 22:
            return (
              (l.flags |= 65536),
              a === Cu
                ? (l.flags |= 16384)
                : ((t = l.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([a]),
                      }),
                      (l.updateQueue = t))
                    : ((l = t.retryQueue),
                      l === null ? (t.retryQueue = new Set([a])) : l.add(a)),
                  xr(e, a, n)),
              !1
            )
        }
        throw Error(r(435, l.tag))
      }
      return (xr(e, a, n), Iu(), !1)
    }
    if (pe)
      return (
        (t = gt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = n),
            a !== yc && ((e = Error(r(422), { cause: a })), yn(Ct(e, l))))
          : (a !== yc && ((t = Error(r(423), { cause: a })), yn(Ct(t, l))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (n &= -n),
            (e.lanes |= n),
            (a = Ct(a, l)),
            (n = Wc(e.stateNode, a, n)),
            Rc(e, n),
            Le !== 4 && (Le = 2)),
        !1
      )
    var u = Error(r(520), { cause: a })
    if (
      ((u = Ct(u, l)),
      jn === null ? (jn = [u]) : jn.push(u),
      Le !== 4 && (Le = 2),
      t === null)
    )
      return !0
    ;((a = Ct(a, l)), (l = t))
    do {
      switch (l.tag) {
        case 3:
          return (
            (l.flags |= 65536),
            (e = n & -n),
            (l.lanes |= e),
            (e = Wc(l.stateNode, a, e)),
            Rc(l, e),
            !1
          )
        case 1:
          if (
            ((t = l.type),
            (u = l.stateNode),
            (l.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == "function" ||
                (u !== null &&
                  typeof u.componentDidCatch == "function" &&
                  (Nl === null || !Nl.has(u)))))
          )
            return (
              (l.flags |= 65536),
              (n &= -n),
              (l.lanes |= n),
              (n = Lf(n)),
              qf(n, e, l, a),
              Rc(l, n),
              !1
            )
      }
      l = l.return
    } while (l !== null)
    return !1
  }
  var Fc = Error(r(461)),
    Xe = !1
  function Pe(e, t, l, a) {
    t.child = e === null ? Vs(t, null, l, a) : la(t, e.child, l, a)
  }
  function Yf(e, t, l, a, n) {
    l = l.render
    var u = t.ref
    if ("ref" in a) {
      var o = {}
      for (var d in a) d !== "ref" && (o[d] = a[d])
    } else o = a
    return (
      Il(t),
      (a = Dc(e, t, l, o, u, n)),
      (d = Uc()),
      e !== null && !Xe
        ? (jc(e, t, n), el(e, t, n))
        : (pe && d && mc(t), (t.flags |= 1), Pe(e, t, a, n), t.child)
    )
  }
  function Gf(e, t, l, a, n) {
    if (e === null) {
      var u = l.type
      return typeof u == "function" &&
        !sc(u) &&
        u.defaultProps === void 0 &&
        l.compare === null
        ? ((t.tag = 15), (t.type = u), Vf(e, t, u, a, n))
        : ((e = xu(l.type, null, a, t, t.mode, n)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e))
    }
    if (((u = e.child), !ur(e, n))) {
      var o = u.memoizedProps
      if (
        ((l = l.compare), (l = l !== null ? l : dn), l(o, a) && e.ref === t.ref)
      )
        return el(e, t, n)
    }
    return (
      (t.flags |= 1),
      (e = Jt(u, a)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    )
  }
  function Vf(e, t, l, a, n) {
    if (e !== null) {
      var u = e.memoizedProps
      if (dn(u, a) && e.ref === t.ref)
        if (((Xe = !1), (t.pendingProps = a = u), ur(e, n)))
          (e.flags & 131072) !== 0 && (Xe = !0)
        else return ((t.lanes = e.lanes), el(e, t, n))
    }
    return Ic(e, t, l, a, n)
  }
  function Xf(e, t, l, a) {
    var n = a.children,
      u = e !== null ? e.memoizedState : null
    if (
      (e === null &&
        t.stateNode === null &&
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      a.mode === "hidden")
    ) {
      if ((t.flags & 128) !== 0) {
        if (((u = u !== null ? u.baseLanes | l : l), e !== null)) {
          for (a = t.child = e.child, n = 0; a !== null; )
            ((n = n | a.lanes | a.childLanes), (a = a.sibling))
          a = n & ~u
        } else ((a = 0), (t.child = null))
        return Qf(e, t, u, l, a)
      }
      if ((l & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && Au(t, u !== null ? u.cachePool : null),
          u !== null ? ks(t, u) : Oc(),
          Zs(t))
      else
        return (
          (a = t.lanes = 536870912),
          Qf(e, t, u !== null ? u.baseLanes | l : l, l, a)
        )
    } else
      u !== null
        ? (Au(t, u.cachePool), ks(t, u), Al(), (t.memoizedState = null))
        : (e !== null && Au(t, null), Oc(), Al())
    return (Pe(e, t, n, l), t.child)
  }
  function Cn(e, t) {
    return (
      (e !== null && e.tag === 22) ||
        t.stateNode !== null ||
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      t.sibling
    )
  }
  function Qf(e, t, l, a, n) {
    var u = Ec()
    return (
      (u = u === null ? null : { parent: Ge._currentValue, pool: u }),
      (t.memoizedState = { baseLanes: l, cachePool: u }),
      e !== null && Au(t, null),
      Oc(),
      Zs(t),
      e !== null && Oa(e, t, a, !0),
      (t.childLanes = n),
      null
    )
  }
  function Gu(e, t) {
    return (
      (t = Xu({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    )
  }
  function kf(e, t, l) {
    return (
      la(t, e.child, null, l),
      (e = Gu(t, t.pendingProps)),
      (e.flags |= 2),
      pt(t),
      (t.memoizedState = null),
      e
    )
  }
  function yv(e, t, l) {
    var a = t.pendingProps,
      n = (t.flags & 128) !== 0
    if (((t.flags &= -129), e === null)) {
      if (pe) {
        if (a.mode === "hidden")
          return ((e = Gu(t, a)), (t.lanes = 536870912), Cn(null, e))
        if (
          (_c(t),
          (e = Ue)
            ? ((e = am(e, _t)),
              (e = e !== null && e.data === "&" ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: gl !== null ? { id: qt, overflow: Yt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = Cs(e)),
                (l.return = t),
                (t.child = l),
                (Fe = t),
                (Ue = null)))
            : (e = null),
          e === null)
        )
          throw bl(t)
        return ((t.lanes = 536870912), null)
      }
      return Gu(t, a)
    }
    var u = e.memoizedState
    if (u !== null) {
      var o = u.dehydrated
      if ((_c(t), n))
        if (t.flags & 256) ((t.flags &= -257), (t = kf(e, t, l)))
        else if (t.memoizedState !== null)
          ((t.child = e.child), (t.flags |= 128), (t = null))
        else throw Error(r(558))
      else if (
        (Xe || Oa(e, t, l, !1), (n = (l & e.childLanes) !== 0), Xe || n)
      ) {
        if (
          ((a = _e),
          a !== null && ((o = jo(a, l)), o !== 0 && o !== u.retryLane))
        )
          throw ((u.retryLane = o), Jl(e, o), ft(a, e, o), Fc)
        ;(Iu(), (t = kf(e, t, l)))
      } else
        ((e = u.treeContext),
          (Ue = Dt(o.nextSibling)),
          (Fe = t),
          (pe = !0),
          (pl = null),
          (_t = !1),
          e !== null && _s(t, e),
          (t = Gu(t, a)),
          (t.flags |= 4096))
      return t
    }
    return (
      (e = Jt(e.child, { mode: a.mode, children: a.children })),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    )
  }
  function Vu(e, t) {
    var l = t.ref
    if (l === null) e !== null && e.ref !== null && (t.flags |= 4194816)
    else {
      if (typeof l != "function" && typeof l != "object") throw Error(r(284))
      ;(e === null || e.ref !== l) && (t.flags |= 4194816)
    }
  }
  function Ic(e, t, l, a, n) {
    return (
      Il(t),
      (l = Dc(e, t, l, a, void 0, n)),
      (a = Uc()),
      e !== null && !Xe
        ? (jc(e, t, n), el(e, t, n))
        : (pe && a && mc(t), (t.flags |= 1), Pe(e, t, l, n), t.child)
    )
  }
  function Zf(e, t, l, a, n, u) {
    return (
      Il(t),
      (t.updateQueue = null),
      (l = Js(t, a, l, n)),
      Ks(e),
      (a = Uc()),
      e !== null && !Xe
        ? (jc(e, t, u), el(e, t, u))
        : (pe && a && mc(t), (t.flags |= 1), Pe(e, t, l, u), t.child)
    )
  }
  function Kf(e, t, l, a, n) {
    if ((Il(t), t.stateNode === null)) {
      var u = Ta,
        o = l.contextType
      ;(typeof o == "object" && o !== null && (u = Ie(o)),
        (u = new l(a, u)),
        (t.memoizedState =
          u.state !== null && u.state !== void 0 ? u.state : null),
        (u.updater = $c),
        (t.stateNode = u),
        (u._reactInternals = t),
        (u = t.stateNode),
        (u.props = a),
        (u.state = t.memoizedState),
        (u.refs = {}),
        Tc(t),
        (o = l.contextType),
        (u.context = typeof o == "object" && o !== null ? Ie(o) : Ta),
        (u.state = t.memoizedState),
        (o = l.getDerivedStateFromProps),
        typeof o == "function" && (Jc(t, l, o, a), (u.state = t.memoizedState)),
        typeof l.getDerivedStateFromProps == "function" ||
          typeof u.getSnapshotBeforeUpdate == "function" ||
          (typeof u.UNSAFE_componentWillMount != "function" &&
            typeof u.componentWillMount != "function") ||
          ((o = u.state),
          typeof u.componentWillMount == "function" && u.componentWillMount(),
          typeof u.UNSAFE_componentWillMount == "function" &&
            u.UNSAFE_componentWillMount(),
          o !== u.state && $c.enqueueReplaceState(u, u.state, null),
          En(t, a, u, n),
          xn(),
          (u.state = t.memoizedState)),
        typeof u.componentDidMount == "function" && (t.flags |= 4194308),
        (a = !0))
    } else if (e === null) {
      u = t.stateNode
      var d = t.memoizedProps,
        v = na(l, d)
      u.props = v
      var T = u.context,
        M = l.contextType
      ;((o = Ta), typeof M == "object" && M !== null && (o = Ie(M)))
      var U = l.getDerivedStateFromProps
      ;((M =
        typeof U == "function" ||
        typeof u.getSnapshotBeforeUpdate == "function"),
        (d = t.pendingProps !== d),
        M ||
          (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
            typeof u.componentWillReceiveProps != "function") ||
          ((d || T !== o) && Uf(t, u, a, o)),
        (xl = !1))
      var R = t.memoizedState
      ;((u.state = R),
        En(t, a, u, n),
        xn(),
        (T = t.memoizedState),
        d || R !== T || xl
          ? (typeof U == "function" && (Jc(t, l, U, a), (T = t.memoizedState)),
            (v = xl || Df(t, l, v, a, R, T, o))
              ? (M ||
                  (typeof u.UNSAFE_componentWillMount != "function" &&
                    typeof u.componentWillMount != "function") ||
                  (typeof u.componentWillMount == "function" &&
                    u.componentWillMount(),
                  typeof u.UNSAFE_componentWillMount == "function" &&
                    u.UNSAFE_componentWillMount()),
                typeof u.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof u.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = a),
                (t.memoizedState = T)),
            (u.props = a),
            (u.state = T),
            (u.context = o),
            (a = v))
          : (typeof u.componentDidMount == "function" && (t.flags |= 4194308),
            (a = !1)))
    } else {
      ;((u = t.stateNode),
        Ac(e, t),
        (o = t.memoizedProps),
        (M = na(l, o)),
        (u.props = M),
        (U = t.pendingProps),
        (R = u.context),
        (T = l.contextType),
        (v = Ta),
        typeof T == "object" && T !== null && (v = Ie(T)),
        (d = l.getDerivedStateFromProps),
        (T =
          typeof d == "function" ||
          typeof u.getSnapshotBeforeUpdate == "function") ||
          (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
            typeof u.componentWillReceiveProps != "function") ||
          ((o !== U || R !== v) && Uf(t, u, a, v)),
        (xl = !1),
        (R = t.memoizedState),
        (u.state = R),
        En(t, a, u, n),
        xn())
      var O = t.memoizedState
      o !== U ||
      R !== O ||
      xl ||
      (e !== null && e.dependencies !== null && zu(e.dependencies))
        ? (typeof d == "function" && (Jc(t, l, d, a), (O = t.memoizedState)),
          (M =
            xl ||
            Df(t, l, M, a, R, O, v) ||
            (e !== null && e.dependencies !== null && zu(e.dependencies)))
            ? (T ||
                (typeof u.UNSAFE_componentWillUpdate != "function" &&
                  typeof u.componentWillUpdate != "function") ||
                (typeof u.componentWillUpdate == "function" &&
                  u.componentWillUpdate(a, O, v),
                typeof u.UNSAFE_componentWillUpdate == "function" &&
                  u.UNSAFE_componentWillUpdate(a, O, v)),
              typeof u.componentDidUpdate == "function" && (t.flags |= 4),
              typeof u.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof u.componentDidUpdate != "function" ||
                (o === e.memoizedProps && R === e.memoizedState) ||
                (t.flags |= 4),
              typeof u.getSnapshotBeforeUpdate != "function" ||
                (o === e.memoizedProps && R === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = a),
              (t.memoizedState = O)),
          (u.props = a),
          (u.state = O),
          (u.context = v),
          (a = M))
        : (typeof u.componentDidUpdate != "function" ||
            (o === e.memoizedProps && R === e.memoizedState) ||
            (t.flags |= 4),
          typeof u.getSnapshotBeforeUpdate != "function" ||
            (o === e.memoizedProps && R === e.memoizedState) ||
            (t.flags |= 1024),
          (a = !1))
    }
    return (
      (u = a),
      Vu(e, t),
      (a = (t.flags & 128) !== 0),
      u || a
        ? ((u = t.stateNode),
          (l =
            a && typeof l.getDerivedStateFromError != "function"
              ? null
              : u.render()),
          (t.flags |= 1),
          e !== null && a
            ? ((t.child = la(t, e.child, null, n)),
              (t.child = la(t, null, l, n)))
            : Pe(e, t, l, n),
          (t.memoizedState = u.state),
          (e = t.child))
        : (e = el(e, t, n)),
      e
    )
  }
  function Jf(e, t, l, a) {
    return (Wl(), (t.flags |= 256), Pe(e, t, l, a), t.child)
  }
  var Pc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  }
  function er(e) {
    return { baseLanes: e, cachePool: Hs() }
  }
  function tr(e, t, l) {
    return ((e = e !== null ? e.childLanes & ~l : 0), t && (e |= St), e)
  }
  function $f(e, t, l) {
    var a = t.pendingProps,
      n = !1,
      u = (t.flags & 128) !== 0,
      o
    if (
      ((o = u) ||
        (o =
          e !== null && e.memoizedState === null ? !1 : (qe.current & 2) !== 0),
      o && ((n = !0), (t.flags &= -129)),
      (o = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (pe) {
        if (
          (n ? Tl(t) : Al(),
          (e = Ue)
            ? ((e = am(e, _t)),
              (e = e !== null && e.data !== "&" ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: gl !== null ? { id: qt, overflow: Yt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = Cs(e)),
                (l.return = t),
                (t.child = l),
                (Fe = t),
                (Ue = null)))
            : (e = null),
          e === null)
        )
          throw bl(t)
        return (Br(e) ? (t.lanes = 32) : (t.lanes = 536870912), null)
      }
      var d = a.children
      return (
        (a = a.fallback),
        n
          ? (Al(),
            (n = t.mode),
            (d = Xu({ mode: "hidden", children: d }, n)),
            (a = $l(a, n, l, null)),
            (d.return = t),
            (a.return = t),
            (d.sibling = a),
            (t.child = d),
            (a = t.child),
            (a.memoizedState = er(l)),
            (a.childLanes = tr(e, o, l)),
            (t.memoizedState = Pc),
            Cn(null, a))
          : (Tl(t), lr(t, d))
      )
    }
    var v = e.memoizedState
    if (v !== null && ((d = v.dehydrated), d !== null)) {
      if (u)
        t.flags & 256
          ? (Tl(t), (t.flags &= -257), (t = ar(e, t, l)))
          : t.memoizedState !== null
            ? (Al(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (Al(),
              (d = a.fallback),
              (n = t.mode),
              (a = Xu({ mode: "visible", children: a.children }, n)),
              (d = $l(d, n, l, null)),
              (d.flags |= 2),
              (a.return = t),
              (d.return = t),
              (a.sibling = d),
              (t.child = a),
              la(t, e.child, null, l),
              (a = t.child),
              (a.memoizedState = er(l)),
              (a.childLanes = tr(e, o, l)),
              (t.memoizedState = Pc),
              (t = Cn(null, a)))
      else if ((Tl(t), Br(d))) {
        if (((o = d.nextSibling && d.nextSibling.dataset), o)) var T = o.dgst
        ;((o = T),
          (a = Error(r(419))),
          (a.stack = ""),
          (a.digest = o),
          yn({ value: a, source: null, stack: null }),
          (t = ar(e, t, l)))
      } else if (
        (Xe || Oa(e, t, l, !1), (o = (l & e.childLanes) !== 0), Xe || o)
      ) {
        if (
          ((o = _e),
          o !== null && ((a = jo(o, l)), a !== 0 && a !== v.retryLane))
        )
          throw ((v.retryLane = a), Jl(e, a), ft(o, e, a), Fc)
        ;(Hr(d) || Iu(), (t = ar(e, t, l)))
      } else
        Hr(d)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = v.treeContext),
            (Ue = Dt(d.nextSibling)),
            (Fe = t),
            (pe = !0),
            (pl = null),
            (_t = !1),
            e !== null && _s(t, e),
            (t = lr(t, a.children)),
            (t.flags |= 4096))
      return t
    }
    return n
      ? (Al(),
        (d = a.fallback),
        (n = t.mode),
        (v = e.child),
        (T = v.sibling),
        (a = Jt(v, { mode: "hidden", children: a.children })),
        (a.subtreeFlags = v.subtreeFlags & 65011712),
        T !== null ? (d = Jt(T, d)) : ((d = $l(d, n, l, null)), (d.flags |= 2)),
        (d.return = t),
        (a.return = t),
        (a.sibling = d),
        (t.child = a),
        Cn(null, a),
        (a = t.child),
        (d = e.child.memoizedState),
        d === null
          ? (d = er(l))
          : ((n = d.cachePool),
            n !== null
              ? ((v = Ge._currentValue),
                (n = n.parent !== v ? { parent: v, pool: v } : n))
              : (n = Hs()),
            (d = { baseLanes: d.baseLanes | l, cachePool: n })),
        (a.memoizedState = d),
        (a.childLanes = tr(e, o, l)),
        (t.memoizedState = Pc),
        Cn(e.child, a))
      : (Tl(t),
        (l = e.child),
        (e = l.sibling),
        (l = Jt(l, { mode: "visible", children: a.children })),
        (l.return = t),
        (l.sibling = null),
        e !== null &&
          ((o = t.deletions),
          o === null ? ((t.deletions = [e]), (t.flags |= 16)) : o.push(e)),
        (t.child = l),
        (t.memoizedState = null),
        l)
  }
  function lr(e, t) {
    return (
      (t = Xu({ mode: "visible", children: t }, e.mode)),
      (t.return = e),
      (e.child = t)
    )
  }
  function Xu(e, t) {
    return ((e = vt(22, e, null, t)), (e.lanes = 0), e)
  }
  function ar(e, t, l) {
    return (
      la(t, e.child, null, l),
      (e = lr(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    )
  }
  function Wf(e, t, l) {
    e.lanes |= t
    var a = e.alternate
    ;(a !== null && (a.lanes |= t), pc(e.return, t, l))
  }
  function nr(e, t, l, a, n, u) {
    var o = e.memoizedState
    o === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: a,
          tail: l,
          tailMode: n,
          treeForkCount: u,
        })
      : ((o.isBackwards = t),
        (o.rendering = null),
        (o.renderingStartTime = 0),
        (o.last = a),
        (o.tail = l),
        (o.tailMode = n),
        (o.treeForkCount = u))
  }
  function Ff(e, t, l) {
    var a = t.pendingProps,
      n = a.revealOrder,
      u = a.tail
    a = a.children
    var o = qe.current,
      d = (o & 2) !== 0
    if (
      (d ? ((o = (o & 1) | 2), (t.flags |= 128)) : (o &= 1),
      G(qe, o),
      Pe(e, t, a, l),
      (a = pe ? hn : 0),
      !d && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Wf(e, l, t)
        else if (e.tag === 19) Wf(e, l, t)
        else if (e.child !== null) {
          ;((e.child.return = e), (e = e.child))
          continue
        }
        if (e === t) break e
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e
          e = e.return
        }
        ;((e.sibling.return = e.return), (e = e.sibling))
      }
    switch (n) {
      case "forwards":
        for (l = t.child, n = null; l !== null; )
          ((e = l.alternate),
            e !== null && Mu(e) === null && (n = l),
            (l = l.sibling))
        ;((l = n),
          l === null
            ? ((n = t.child), (t.child = null))
            : ((n = l.sibling), (l.sibling = null)),
          nr(t, !1, n, l, u, a))
        break
      case "backwards":
      case "unstable_legacy-backwards":
        for (l = null, n = t.child, t.child = null; n !== null; ) {
          if (((e = n.alternate), e !== null && Mu(e) === null)) {
            t.child = n
            break
          }
          ;((e = n.sibling), (n.sibling = l), (l = n), (n = e))
        }
        nr(t, !0, l, null, u, a)
        break
      case "together":
        nr(t, !1, null, null, void 0, a)
        break
      default:
        t.memoizedState = null
    }
    return t.child
  }
  function el(e, t, l) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (Ol |= t.lanes),
      (l & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((Oa(e, t, l, !1), (l & t.childLanes) === 0)) return null
      } else return null
    if (e !== null && t.child !== e.child) throw Error(r(153))
    if (t.child !== null) {
      for (
        e = t.child, l = Jt(e, e.pendingProps), t.child = l, l.return = t;
        e.sibling !== null;
      )
        ((e = e.sibling),
          (l = l.sibling = Jt(e, e.pendingProps)),
          (l.return = t))
      l.sibling = null
    }
    return t.child
  }
  function ur(e, t) {
    return (e.lanes & t) !== 0
      ? !0
      : ((e = e.dependencies), !!(e !== null && zu(e)))
  }
  function vv(e, t, l) {
    switch (t.tag) {
      case 3:
        ;(Ke(t, t.stateNode.containerInfo),
          Sl(t, Ge, e.memoizedState.cache),
          Wl())
        break
      case 27:
      case 5:
        dl(t)
        break
      case 4:
        Ke(t, t.stateNode.containerInfo)
        break
      case 10:
        Sl(t, t.type, t.memoizedProps.value)
        break
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), _c(t), null)
        break
      case 13:
        var a = t.memoizedState
        if (a !== null)
          return a.dehydrated !== null
            ? (Tl(t), (t.flags |= 128), null)
            : (l & t.child.childLanes) !== 0
              ? $f(e, t, l)
              : (Tl(t), (e = el(e, t, l)), e !== null ? e.sibling : null)
        Tl(t)
        break
      case 19:
        var n = (e.flags & 128) !== 0
        if (
          ((a = (l & t.childLanes) !== 0),
          a || (Oa(e, t, l, !1), (a = (l & t.childLanes) !== 0)),
          n)
        ) {
          if (a) return Ff(e, t, l)
          t.flags |= 128
        }
        if (
          ((n = t.memoizedState),
          n !== null &&
            ((n.rendering = null), (n.tail = null), (n.lastEffect = null)),
          G(qe, qe.current),
          a)
        )
          break
        return null
      case 22:
        return ((t.lanes = 0), Xf(e, t, l, t.pendingProps))
      case 24:
        Sl(t, Ge, e.memoizedState.cache)
    }
    return el(e, t, l)
  }
  function If(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) Xe = !0
      else {
        if (!ur(e, l) && (t.flags & 128) === 0) return ((Xe = !1), vv(e, t, l))
        Xe = (e.flags & 131072) !== 0
      }
    else ((Xe = !1), pe && (t.flags & 1048576) !== 0 && Ns(t, hn, t.index))
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var a = t.pendingProps
          if (((e = ea(t.elementType)), (t.type = e), typeof e == "function"))
            sc(e)
              ? ((a = na(e, a)), (t.tag = 1), (t = Kf(null, t, e, a, l)))
              : ((t.tag = 0), (t = Ic(null, t, e, a, l)))
          else {
            if (e != null) {
              var n = e.$$typeof
              if (n === K) {
                ;((t.tag = 11), (t = Yf(null, t, e, a, l)))
                break e
              } else if (n === ee) {
                ;((t.tag = 14), (t = Gf(null, t, e, a, l)))
                break e
              }
            }
            throw ((t = tt(e) || e), Error(r(306, t, "")))
          }
        }
        return t
      case 0:
        return Ic(e, t, t.type, t.pendingProps, l)
      case 1:
        return ((a = t.type), (n = na(a, t.pendingProps)), Kf(e, t, a, n, l))
      case 3:
        e: {
          if ((Ke(t, t.stateNode.containerInfo), e === null))
            throw Error(r(387))
          a = t.pendingProps
          var u = t.memoizedState
          ;((n = u.element), Ac(e, t), En(t, a, null, l))
          var o = t.memoizedState
          if (
            ((a = o.cache),
            Sl(t, Ge, a),
            a !== u.cache && bc(t, [Ge], l, !0),
            xn(),
            (a = o.element),
            u.isDehydrated)
          )
            if (
              ((u = { element: a, isDehydrated: !1, cache: o.cache }),
              (t.updateQueue.baseState = u),
              (t.memoizedState = u),
              t.flags & 256)
            ) {
              t = Jf(e, t, a, l)
              break e
            } else if (a !== n) {
              ;((n = Ct(Error(r(424)), t)), yn(n), (t = Jf(e, t, a, l)))
              break e
            } else
              for (
                e = t.stateNode.containerInfo,
                  e.nodeType === 9
                    ? (e = e.body)
                    : (e = e.nodeName === "HTML" ? e.ownerDocument.body : e),
                  Ue = Dt(e.firstChild),
                  Fe = t,
                  pe = !0,
                  pl = null,
                  _t = !0,
                  l = Vs(t, null, a, l),
                  t.child = l;
                l;
              )
                ((l.flags = (l.flags & -3) | 4096), (l = l.sibling))
          else {
            if ((Wl(), a === n)) {
              t = el(e, t, l)
              break e
            }
            Pe(e, t, a, l)
          }
          t = t.child
        }
        return t
      case 26:
        return (
          Vu(e, t),
          e === null
            ? (l = om(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = l)
              : pe ||
                ((l = t.type),
                (e = t.pendingProps),
                (a = ui(te.current).createElement(l)),
                (a[We] = t),
                (a[ut] = e),
                et(a, l, e),
                Je(a),
                (t.stateNode = a))
            : (t.memoizedState = om(
                t.type,
                e.memoizedProps,
                t.pendingProps,
                e.memoizedState
              )),
          null
        )
      case 27:
        return (
          dl(t),
          e === null &&
            pe &&
            ((a = t.stateNode = im(t.type, t.pendingProps, te.current)),
            (Fe = t),
            (_t = !0),
            (n = Ue),
            Ul(t.type) ? ((Lr = n), (Ue = Dt(a.firstChild))) : (Ue = n)),
          Pe(e, t, t.pendingProps.children, l),
          Vu(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        )
      case 5:
        return (
          e === null &&
            pe &&
            ((n = a = Ue) &&
              ((a = Zv(a, t.type, t.pendingProps, _t)),
              a !== null
                ? ((t.stateNode = a),
                  (Fe = t),
                  (Ue = Dt(a.firstChild)),
                  (_t = !1),
                  (n = !0))
                : (n = !1)),
            n || bl(t)),
          dl(t),
          (n = t.type),
          (u = t.pendingProps),
          (o = e !== null ? e.memoizedProps : null),
          (a = u.children),
          Ur(n, u) ? (a = null) : o !== null && Ur(n, o) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((n = Dc(e, t, cv, null, null, l)), (Vn._currentValue = n)),
          Vu(e, t),
          Pe(e, t, a, l),
          t.child
        )
      case 6:
        return (
          e === null &&
            pe &&
            ((e = l = Ue) &&
              ((l = Kv(l, t.pendingProps, _t)),
              l !== null
                ? ((t.stateNode = l), (Fe = t), (Ue = null), (e = !0))
                : (e = !1)),
            e || bl(t)),
          null
        )
      case 13:
        return $f(e, t, l)
      case 4:
        return (
          Ke(t, t.stateNode.containerInfo),
          (a = t.pendingProps),
          e === null ? (t.child = la(t, null, a, l)) : Pe(e, t, a, l),
          t.child
        )
      case 11:
        return Yf(e, t, t.type, t.pendingProps, l)
      case 7:
        return (Pe(e, t, t.pendingProps, l), t.child)
      case 8:
        return (Pe(e, t, t.pendingProps.children, l), t.child)
      case 12:
        return (Pe(e, t, t.pendingProps.children, l), t.child)
      case 10:
        return (
          (a = t.pendingProps),
          Sl(t, t.type, a.value),
          Pe(e, t, a.children, l),
          t.child
        )
      case 9:
        return (
          (n = t.type._context),
          (a = t.pendingProps.children),
          Il(t),
          (n = Ie(n)),
          (a = a(n)),
          (t.flags |= 1),
          Pe(e, t, a, l),
          t.child
        )
      case 14:
        return Gf(e, t, t.type, t.pendingProps, l)
      case 15:
        return Vf(e, t, t.type, t.pendingProps, l)
      case 19:
        return Ff(e, t, l)
      case 31:
        return yv(e, t, l)
      case 22:
        return Xf(e, t, l, t.pendingProps)
      case 24:
        return (
          Il(t),
          (a = Ie(Ge)),
          e === null
            ? ((n = Ec()),
              n === null &&
                ((n = _e),
                (u = Sc()),
                (n.pooledCache = u),
                u.refCount++,
                u !== null && (n.pooledCacheLanes |= l),
                (n = u)),
              (t.memoizedState = { parent: a, cache: n }),
              Tc(t),
              Sl(t, Ge, n))
            : ((e.lanes & l) !== 0 && (Ac(e, t), En(t, null, null, l), xn()),
              (n = e.memoizedState),
              (u = t.memoizedState),
              n.parent !== a
                ? ((n = { parent: a, cache: a }),
                  (t.memoizedState = n),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = n),
                  Sl(t, Ge, a))
                : ((a = u.cache),
                  Sl(t, Ge, a),
                  a !== n.cache && bc(t, [Ge], l, !0))),
          Pe(e, t, t.pendingProps.children, l),
          t.child
        )
      case 29:
        throw t.pendingProps
    }
    throw Error(r(156, t.tag))
  }
  function tl(e) {
    e.flags |= 4
  }
  function ir(e, t, l, a, n) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (n & 335544128) === n))
        if (e.stateNode.complete) e.flags |= 8192
        else if (Ad()) e.flags |= 8192
        else throw ((ta = Cu), zc)
    } else e.flags &= -16777217
  }
  function Pf(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217
    else if (((e.flags |= 16777216), !hm(t)))
      if (Ad()) e.flags |= 8192
      else throw ((ta = Cu), zc)
  }
  function Qu(e, t) {
    ;(t !== null && (e.flags |= 4),
      e.flags & 16384 &&
        ((t = e.tag !== 22 ? Mo() : 536870912), (e.lanes |= t), (Ya |= t)))
  }
  function On(e, t) {
    if (!pe)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail
          for (var l = null; t !== null; )
            (t.alternate !== null && (l = t), (t = t.sibling))
          l === null ? (e.tail = null) : (l.sibling = null)
          break
        case "collapsed":
          l = e.tail
          for (var a = null; l !== null; )
            (l.alternate !== null && (a = l), (l = l.sibling))
          a === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (a.sibling = null)
      }
  }
  function je(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      l = 0,
      a = 0
    if (t)
      for (var n = e.child; n !== null; )
        ((l |= n.lanes | n.childLanes),
          (a |= n.subtreeFlags & 65011712),
          (a |= n.flags & 65011712),
          (n.return = e),
          (n = n.sibling))
    else
      for (n = e.child; n !== null; )
        ((l |= n.lanes | n.childLanes),
          (a |= n.subtreeFlags),
          (a |= n.flags),
          (n.return = e),
          (n = n.sibling))
    return ((e.subtreeFlags |= a), (e.childLanes = l), t)
  }
  function gv(e, t, l) {
    var a = t.pendingProps
    switch ((hc(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (je(t), null)
      case 1:
        return (je(t), null)
      case 3:
        return (
          (l = t.stateNode),
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          Ft(Ge),
          oe(),
          l.pendingContext &&
            ((l.context = l.pendingContext), (l.pendingContext = null)),
          (e === null || e.child === null) &&
            (Ca(t)
              ? tl(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), vc())),
          je(t),
          null
        )
      case 26:
        var n = t.type,
          u = t.memoizedState
        return (
          e === null
            ? (tl(t),
              u !== null ? (je(t), Pf(t, u)) : (je(t), ir(t, n, null, a, l)))
            : u
              ? u !== e.memoizedState
                ? (tl(t), je(t), Pf(t, u))
                : (je(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps),
                e !== a && tl(t),
                je(t),
                ir(t, n, e, a, l)),
          null
        )
      case 27:
        if (
          (Qt(t),
          (l = te.current),
          (n = t.type),
          e !== null && t.stateNode != null)
        )
          e.memoizedProps !== a && tl(t)
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(r(166))
            return (je(t), null)
          }
          ;((e = Q.current),
            Ca(t) ? Ms(t) : ((e = im(n, a, l)), (t.stateNode = e), tl(t)))
        }
        return (je(t), null)
      case 5:
        if ((Qt(t), (n = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== a && tl(t)
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(r(166))
            return (je(t), null)
          }
          if (((u = Q.current), Ca(t))) Ms(t)
          else {
            var o = ui(te.current)
            switch (u) {
              case 1:
                u = o.createElementNS("http://www.w3.org/2000/svg", n)
                break
              case 2:
                u = o.createElementNS("http://www.w3.org/1998/Math/MathML", n)
                break
              default:
                switch (n) {
                  case "svg":
                    u = o.createElementNS("http://www.w3.org/2000/svg", n)
                    break
                  case "math":
                    u = o.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      n
                    )
                    break
                  case "script":
                    ;((u = o.createElement("div")),
                      (u.innerHTML = "<script><\/script>"),
                      (u = u.removeChild(u.firstChild)))
                    break
                  case "select":
                    ;((u =
                      typeof a.is == "string"
                        ? o.createElement("select", { is: a.is })
                        : o.createElement("select")),
                      a.multiple
                        ? (u.multiple = !0)
                        : a.size && (u.size = a.size))
                    break
                  default:
                    u =
                      typeof a.is == "string"
                        ? o.createElement(n, { is: a.is })
                        : o.createElement(n)
                }
            }
            ;((u[We] = t), (u[ut] = a))
            e: for (o = t.child; o !== null; ) {
              if (o.tag === 5 || o.tag === 6) u.appendChild(o.stateNode)
              else if (o.tag !== 4 && o.tag !== 27 && o.child !== null) {
                ;((o.child.return = o), (o = o.child))
                continue
              }
              if (o === t) break e
              for (; o.sibling === null; ) {
                if (o.return === null || o.return === t) break e
                o = o.return
              }
              ;((o.sibling.return = o.return), (o = o.sibling))
            }
            t.stateNode = u
            e: switch ((et(u, n, a), n)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus
                break e
              case "img":
                a = !0
                break e
              default:
                a = !1
            }
            a && tl(t)
          }
        }
        return (
          je(t),
          ir(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, l),
          null
        )
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== a && tl(t)
        else {
          if (typeof a != "string" && t.stateNode === null) throw Error(r(166))
          if (((e = te.current), Ca(t))) {
            if (
              ((e = t.stateNode),
              (l = t.memoizedProps),
              (a = null),
              (n = Fe),
              n !== null)
            )
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps
              }
            ;((e[We] = t),
              (e = !!(
                e.nodeValue === l ||
                (a !== null && a.suppressHydrationWarning === !0) ||
                $d(e.nodeValue, l)
              )),
              e || bl(t, !0))
          } else ((e = ui(e).createTextNode(a)), (e[We] = t), (t.stateNode = e))
        }
        return (je(t), null)
      case 31:
        if (((l = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((a = Ca(t)), l !== null)) {
            if (e === null) {
              if (!a) throw Error(r(318))
              if (
                ((e = t.memoizedState),
                (e = e !== null ? e.dehydrated : null),
                !e)
              )
                throw Error(r(557))
              e[We] = t
            } else
              (Wl(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4))
            ;(je(t), (e = !1))
          } else
            ((l = vc()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = l),
              (e = !0))
          if (!e) return t.flags & 256 ? (pt(t), t) : (pt(t), null)
          if ((t.flags & 128) !== 0) throw Error(r(558))
        }
        return (je(t), null)
      case 13:
        if (
          ((a = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((n = Ca(t)), a !== null && a.dehydrated !== null)) {
            if (e === null) {
              if (!n) throw Error(r(318))
              if (
                ((n = t.memoizedState),
                (n = n !== null ? n.dehydrated : null),
                !n)
              )
                throw Error(r(317))
              n[We] = t
            } else
              (Wl(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4))
            ;(je(t), (n = !1))
          } else
            ((n = vc()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = n),
              (n = !0))
          if (!n) return t.flags & 256 ? (pt(t), t) : (pt(t), null)
        }
        return (
          pt(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = l), t)
            : ((l = a !== null),
              (e = e !== null && e.memoizedState !== null),
              l &&
                ((a = t.child),
                (n = null),
                a.alternate !== null &&
                  a.alternate.memoizedState !== null &&
                  a.alternate.memoizedState.cachePool !== null &&
                  (n = a.alternate.memoizedState.cachePool.pool),
                (u = null),
                a.memoizedState !== null &&
                  a.memoizedState.cachePool !== null &&
                  (u = a.memoizedState.cachePool.pool),
                u !== n && (a.flags |= 2048)),
              l !== e && l && (t.child.flags |= 8192),
              Qu(t, t.updateQueue),
              je(t),
              null)
        )
      case 4:
        return (oe(), e === null && Or(t.stateNode.containerInfo), je(t), null)
      case 10:
        return (Ft(t.type), je(t), null)
      case 19:
        if ((j(qe), (a = t.memoizedState), a === null)) return (je(t), null)
        if (((n = (t.flags & 128) !== 0), (u = a.rendering), u === null))
          if (n) On(a, !1)
          else {
            if (Le !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((u = Mu(e)), u !== null)) {
                  for (
                    t.flags |= 128,
                      On(a, !1),
                      e = u.updateQueue,
                      t.updateQueue = e,
                      Qu(t, e),
                      t.subtreeFlags = 0,
                      e = l,
                      l = t.child;
                    l !== null;
                  )
                    (Rs(l, e), (l = l.sibling))
                  return (
                    G(qe, (qe.current & 1) | 2),
                    pe && $t(t, a.treeForkCount),
                    t.child
                  )
                }
                e = e.sibling
              }
            a.tail !== null &&
              dt() > $u &&
              ((t.flags |= 128), (n = !0), On(a, !1), (t.lanes = 4194304))
          }
        else {
          if (!n)
            if (((e = Mu(u)), e !== null)) {
              if (
                ((t.flags |= 128),
                (n = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                Qu(t, e),
                On(a, !0),
                a.tail === null &&
                  a.tailMode === "hidden" &&
                  !u.alternate &&
                  !pe)
              )
                return (je(t), null)
            } else
              2 * dt() - a.renderingStartTime > $u &&
                l !== 536870912 &&
                ((t.flags |= 128), (n = !0), On(a, !1), (t.lanes = 4194304))
          a.isBackwards
            ? ((u.sibling = t.child), (t.child = u))
            : ((e = a.last),
              e !== null ? (e.sibling = u) : (t.child = u),
              (a.last = u))
        }
        return a.tail !== null
          ? ((e = a.tail),
            (a.rendering = e),
            (a.tail = e.sibling),
            (a.renderingStartTime = dt()),
            (e.sibling = null),
            (l = qe.current),
            G(qe, n ? (l & 1) | 2 : l & 1),
            pe && $t(t, a.treeForkCount),
            e)
          : (je(t), null)
      case 22:
      case 23:
        return (
          pt(t),
          Nc(),
          (a = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== a && (t.flags |= 8192)
            : a && (t.flags |= 8192),
          a
            ? (l & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (je(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : je(t),
          (l = t.updateQueue),
          l !== null && Qu(t, l.retryQueue),
          (l = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (l = e.memoizedState.cachePool.pool),
          (a = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (a = t.memoizedState.cachePool.pool),
          a !== l && (t.flags |= 2048),
          e !== null && j(Pl),
          null
        )
      case 24:
        return (
          (l = null),
          e !== null && (l = e.memoizedState.cache),
          t.memoizedState.cache !== l && (t.flags |= 2048),
          Ft(Ge),
          je(t),
          null
        )
      case 25:
        return null
      case 30:
        return null
    }
    throw Error(r(156, t.tag))
  }
  function pv(e, t) {
    switch ((hc(t), t.tag)) {
      case 1:
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        )
      case 3:
        return (
          Ft(Ge),
          oe(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((t.flags = (e & -65537) | 128), t)
            : null
        )
      case 26:
      case 27:
      case 5:
        return (Qt(t), null)
      case 31:
        if (t.memoizedState !== null) {
          if ((pt(t), t.alternate === null)) throw Error(r(340))
          Wl()
        }
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        )
      case 13:
        if (
          (pt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(r(340))
          Wl()
        }
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        )
      case 19:
        return (j(qe), null)
      case 4:
        return (oe(), null)
      case 10:
        return (Ft(t.type), null)
      case 22:
      case 23:
        return (
          pt(t),
          Nc(),
          e !== null && j(Pl),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        )
      case 24:
        return (Ft(Ge), null)
      case 25:
        return null
      default:
        return null
    }
  }
  function ed(e, t) {
    switch ((hc(t), t.tag)) {
      case 3:
        ;(Ft(Ge), oe())
        break
      case 26:
      case 27:
      case 5:
        Qt(t)
        break
      case 4:
        oe()
        break
      case 31:
        t.memoizedState !== null && pt(t)
        break
      case 13:
        pt(t)
        break
      case 19:
        j(qe)
        break
      case 10:
        Ft(t.type)
        break
      case 22:
      case 23:
        ;(pt(t), Nc(), e !== null && j(Pl))
        break
      case 24:
        Ft(Ge)
    }
  }
  function Nn(e, t) {
    try {
      var l = t.updateQueue,
        a = l !== null ? l.lastEffect : null
      if (a !== null) {
        var n = a.next
        l = n
        do {
          if ((l.tag & e) === e) {
            a = void 0
            var u = l.create,
              o = l.inst
            ;((a = u()), (o.destroy = a))
          }
          l = l.next
        } while (l !== n)
      }
    } catch (d) {
      Ae(t, t.return, d)
    }
  }
  function Rl(e, t, l) {
    try {
      var a = t.updateQueue,
        n = a !== null ? a.lastEffect : null
      if (n !== null) {
        var u = n.next
        a = u
        do {
          if ((a.tag & e) === e) {
            var o = a.inst,
              d = o.destroy
            if (d !== void 0) {
              ;((o.destroy = void 0), (n = t))
              var v = l,
                T = d
              try {
                T()
              } catch (M) {
                Ae(n, v, M)
              }
            }
          }
          a = a.next
        } while (a !== u)
      }
    } catch (M) {
      Ae(t, t.return, M)
    }
  }
  function td(e) {
    var t = e.updateQueue
    if (t !== null) {
      var l = e.stateNode
      try {
        Qs(t, l)
      } catch (a) {
        Ae(e, e.return, a)
      }
    }
  }
  function ld(e, t, l) {
    ;((l.props = na(e.type, e.memoizedProps)), (l.state = e.memoizedState))
    try {
      l.componentWillUnmount()
    } catch (a) {
      Ae(e, t, a)
    }
  }
  function _n(e, t) {
    try {
      var l = e.ref
      if (l !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var a = e.stateNode
            break
          case 30:
            a = e.stateNode
            break
          default:
            a = e.stateNode
        }
        typeof l == "function" ? (e.refCleanup = l(a)) : (l.current = a)
      }
    } catch (n) {
      Ae(e, t, n)
    }
  }
  function Gt(e, t) {
    var l = e.ref,
      a = e.refCleanup
    if (l !== null)
      if (typeof a == "function")
        try {
          a()
        } catch (n) {
          Ae(e, t, n)
        } finally {
          ;((e.refCleanup = null),
            (e = e.alternate),
            e != null && (e.refCleanup = null))
        }
      else if (typeof l == "function")
        try {
          l(null)
        } catch (n) {
          Ae(e, t, n)
        }
      else l.current = null
  }
  function ad(e) {
    var t = e.type,
      l = e.memoizedProps,
      a = e.stateNode
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && a.focus()
          break e
        case "img":
          l.src ? (a.src = l.src) : l.srcSet && (a.srcset = l.srcSet)
      }
    } catch (n) {
      Ae(e, e.return, n)
    }
  }
  function cr(e, t, l) {
    try {
      var a = e.stateNode
      ;(Yv(a, e.type, l, t), (a[ut] = t))
    } catch (n) {
      Ae(e, e.return, n)
    }
  }
  function nd(e) {
    return (
      e.tag === 5 ||
      e.tag === 3 ||
      e.tag === 26 ||
      (e.tag === 27 && Ul(e.type)) ||
      e.tag === 4
    )
  }
  function rr(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || nd(e.return)) return null
        e = e.return
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if (
          (e.tag === 27 && Ul(e.type)) ||
          e.flags & 2 ||
          e.child === null ||
          e.tag === 4
        )
          continue e
        ;((e.child.return = e), (e = e.child))
      }
      if (!(e.flags & 2)) return e.stateNode
    }
  }
  function or(e, t, l) {
    var a = e.tag
    if (a === 5 || a === 6)
      ((e = e.stateNode),
        t
          ? (l.nodeType === 9
              ? l.body
              : l.nodeName === "HTML"
                ? l.ownerDocument.body
                : l
            ).insertBefore(e, t)
          : ((t =
              l.nodeType === 9
                ? l.body
                : l.nodeName === "HTML"
                  ? l.ownerDocument.body
                  : l),
            t.appendChild(e),
            (l = l._reactRootContainer),
            l != null || t.onclick !== null || (t.onclick = Zt)))
    else if (
      a !== 4 &&
      (a === 27 && Ul(e.type) && ((l = e.stateNode), (t = null)),
      (e = e.child),
      e !== null)
    )
      for (or(e, t, l), e = e.sibling; e !== null; )
        (or(e, t, l), (e = e.sibling))
  }
  function ku(e, t, l) {
    var a = e.tag
    if (a === 5 || a === 6)
      ((e = e.stateNode), t ? l.insertBefore(e, t) : l.appendChild(e))
    else if (
      a !== 4 &&
      (a === 27 && Ul(e.type) && (l = e.stateNode), (e = e.child), e !== null)
    )
      for (ku(e, t, l), e = e.sibling; e !== null; )
        (ku(e, t, l), (e = e.sibling))
  }
  function ud(e) {
    var t = e.stateNode,
      l = e.memoizedProps
    try {
      for (var a = e.type, n = t.attributes; n.length; )
        t.removeAttributeNode(n[0])
      ;(et(t, a, l), (t[We] = e), (t[ut] = l))
    } catch (u) {
      Ae(e, e.return, u)
    }
  }
  var ll = !1,
    Qe = !1,
    sr = !1,
    id = typeof WeakSet == "function" ? WeakSet : Set,
    $e = null
  function bv(e, t) {
    if (((e = e.containerInfo), (Mr = di), (e = gs(e)), ac(e))) {
      if ("selectionStart" in e)
        var l = { start: e.selectionStart, end: e.selectionEnd }
      else
        e: {
          l = ((l = e.ownerDocument) && l.defaultView) || window
          var a = l.getSelection && l.getSelection()
          if (a && a.rangeCount !== 0) {
            l = a.anchorNode
            var n = a.anchorOffset,
              u = a.focusNode
            a = a.focusOffset
            try {
              ;(l.nodeType, u.nodeType)
            } catch {
              l = null
              break e
            }
            var o = 0,
              d = -1,
              v = -1,
              T = 0,
              M = 0,
              U = e,
              R = null
            t: for (;;) {
              for (
                var O;
                U !== l || (n !== 0 && U.nodeType !== 3) || (d = o + n),
                  U !== u || (a !== 0 && U.nodeType !== 3) || (v = o + a),
                  U.nodeType === 3 && (o += U.nodeValue.length),
                  (O = U.firstChild) !== null;
              )
                ((R = U), (U = O))
              for (;;) {
                if (U === e) break t
                if (
                  (R === l && ++T === n && (d = o),
                  R === u && ++M === a && (v = o),
                  (O = U.nextSibling) !== null)
                )
                  break
                ;((U = R), (R = U.parentNode))
              }
              U = O
            }
            l = d === -1 || v === -1 ? null : { start: d, end: v }
          } else l = null
        }
      l = l || { start: 0, end: 0 }
    } else l = null
    for (
      Dr = { focusedElem: e, selectionRange: l }, di = !1, $e = t;
      $e !== null;
    )
      if (
        ((t = $e), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null)
      )
        ((e.return = t), ($e = e))
      else
        for (; $e !== null; ) {
          switch (((t = $e), (u = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              if (
                (e & 4) !== 0 &&
                ((e = t.updateQueue),
                (e = e !== null ? e.events : null),
                e !== null)
              )
                for (l = 0; l < e.length; l++)
                  ((n = e[l]), (n.ref.impl = n.nextImpl))
              break
            case 11:
            case 15:
              break
            case 1:
              if ((e & 1024) !== 0 && u !== null) {
                ;((e = void 0),
                  (l = t),
                  (n = u.memoizedProps),
                  (u = u.memoizedState),
                  (a = l.stateNode))
                try {
                  var k = na(l.type, n)
                  ;((e = a.getSnapshotBeforeUpdate(k, u)),
                    (a.__reactInternalSnapshotBeforeUpdate = e))
                } catch (ae) {
                  Ae(l, l.return, ae)
                }
              }
              break
            case 3:
              if ((e & 1024) !== 0) {
                if (
                  ((e = t.stateNode.containerInfo), (l = e.nodeType), l === 9)
                )
                  wr(e)
                else if (l === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      wr(e)
                      break
                    default:
                      e.textContent = ""
                  }
              }
              break
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break
            default:
              if ((e & 1024) !== 0) throw Error(r(163))
          }
          if (((e = t.sibling), e !== null)) {
            ;((e.return = t.return), ($e = e))
            break
          }
          $e = t.return
        }
  }
  function cd(e, t, l) {
    var a = l.flags
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        ;(nl(e, l), a & 4 && Nn(5, l))
        break
      case 1:
        if ((nl(e, l), a & 4))
          if (((e = l.stateNode), t === null))
            try {
              e.componentDidMount()
            } catch (o) {
              Ae(l, l.return, o)
            }
          else {
            var n = na(l.type, t.memoizedProps)
            t = t.memoizedState
            try {
              e.componentDidUpdate(n, t, e.__reactInternalSnapshotBeforeUpdate)
            } catch (o) {
              Ae(l, l.return, o)
            }
          }
        ;(a & 64 && td(l), a & 512 && _n(l, l.return))
        break
      case 3:
        if ((nl(e, l), a & 64 && ((e = l.updateQueue), e !== null))) {
          if (((t = null), l.child !== null))
            switch (l.child.tag) {
              case 27:
              case 5:
                t = l.child.stateNode
                break
              case 1:
                t = l.child.stateNode
            }
          try {
            Qs(e, t)
          } catch (o) {
            Ae(l, l.return, o)
          }
        }
        break
      case 27:
        t === null && a & 4 && ud(l)
      case 26:
      case 5:
        ;(nl(e, l), t === null && a & 4 && ad(l), a & 512 && _n(l, l.return))
        break
      case 12:
        nl(e, l)
        break
      case 31:
        ;(nl(e, l), a & 4 && sd(e, l))
        break
      case 13:
        ;(nl(e, l),
          a & 4 && fd(e, l),
          a & 64 &&
            ((e = l.memoizedState),
            e !== null &&
              ((e = e.dehydrated),
              e !== null && ((l = Ov.bind(null, l)), Jv(e, l)))))
        break
      case 22:
        if (((a = l.memoizedState !== null || ll), !a)) {
          ;((t = (t !== null && t.memoizedState !== null) || Qe), (n = ll))
          var u = Qe
          ;((ll = a),
            (Qe = t) && !u ? ul(e, l, (l.subtreeFlags & 8772) !== 0) : nl(e, l),
            (ll = n),
            (Qe = u))
        }
        break
      case 30:
        break
      default:
        nl(e, l)
    }
  }
  function rd(e) {
    var t = e.alternate
    ;(t !== null && ((e.alternate = null), rd(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && Yi(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null))
  }
  var we = null,
    ct = !1
  function al(e, t, l) {
    for (l = l.child; l !== null; ) (od(e, t, l), (l = l.sibling))
  }
  function od(e, t, l) {
    if (mt && typeof mt.onCommitFiberUnmount == "function")
      try {
        mt.onCommitFiberUnmount(Pa, l)
      } catch {}
    switch (l.tag) {
      case 26:
        ;(Qe || Gt(l, t),
          al(e, t, l),
          l.memoizedState
            ? l.memoizedState.count--
            : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l)))
        break
      case 27:
        Qe || Gt(l, t)
        var a = we,
          n = ct
        ;(Ul(l.type) && ((we = l.stateNode), (ct = !1)),
          al(e, t, l),
          qn(l.stateNode),
          (we = a),
          (ct = n))
        break
      case 5:
        Qe || Gt(l, t)
      case 6:
        if (
          ((a = we),
          (n = ct),
          (we = null),
          al(e, t, l),
          (we = a),
          (ct = n),
          we !== null)
        )
          if (ct)
            try {
              ;(we.nodeType === 9
                ? we.body
                : we.nodeName === "HTML"
                  ? we.ownerDocument.body
                  : we
              ).removeChild(l.stateNode)
            } catch (u) {
              Ae(l, t, u)
            }
          else
            try {
              we.removeChild(l.stateNode)
            } catch (u) {
              Ae(l, t, u)
            }
        break
      case 18:
        we !== null &&
          (ct
            ? ((e = we),
              tm(
                e.nodeType === 9
                  ? e.body
                  : e.nodeName === "HTML"
                    ? e.ownerDocument.body
                    : e,
                l.stateNode
              ),
              Ja(e))
            : tm(we, l.stateNode))
        break
      case 4:
        ;((a = we),
          (n = ct),
          (we = l.stateNode.containerInfo),
          (ct = !0),
          al(e, t, l),
          (we = a),
          (ct = n))
        break
      case 0:
      case 11:
      case 14:
      case 15:
        ;(Rl(2, l, t), Qe || Rl(4, l, t), al(e, t, l))
        break
      case 1:
        ;(Qe ||
          (Gt(l, t),
          (a = l.stateNode),
          typeof a.componentWillUnmount == "function" && ld(l, t, a)),
          al(e, t, l))
        break
      case 21:
        al(e, t, l)
        break
      case 22:
        ;((Qe = (a = Qe) || l.memoizedState !== null), al(e, t, l), (Qe = a))
        break
      default:
        al(e, t, l)
    }
  }
  function sd(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
    ) {
      e = e.dehydrated
      try {
        Ja(e)
      } catch (l) {
        Ae(t, t.return, l)
      }
    }
  }
  function fd(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null &&
        ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        Ja(e)
      } catch (l) {
        Ae(t, t.return, l)
      }
  }
  function Sv(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode
        return (t === null && (t = e.stateNode = new id()), t)
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new id()),
          t
        )
      default:
        throw Error(r(435, e.tag))
    }
  }
  function Zu(e, t) {
    var l = Sv(e)
    t.forEach(function (a) {
      if (!l.has(a)) {
        l.add(a)
        var n = Nv.bind(null, e, a)
        a.then(n, n)
      }
    })
  }
  function rt(e, t) {
    var l = t.deletions
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var n = l[a],
          u = e,
          o = t,
          d = o
        e: for (; d !== null; ) {
          switch (d.tag) {
            case 27:
              if (Ul(d.type)) {
                ;((we = d.stateNode), (ct = !1))
                break e
              }
              break
            case 5:
              ;((we = d.stateNode), (ct = !1))
              break e
            case 3:
            case 4:
              ;((we = d.stateNode.containerInfo), (ct = !0))
              break e
          }
          d = d.return
        }
        if (we === null) throw Error(r(160))
        ;(od(u, o, n),
          (we = null),
          (ct = !1),
          (u = n.alternate),
          u !== null && (u.return = null),
          (n.return = null))
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; ) (dd(t, e), (t = t.sibling))
  }
  var Ht = null
  function dd(e, t) {
    var l = e.alternate,
      a = e.flags
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ;(rt(t, e),
          ot(e),
          a & 4 && (Rl(3, e, e.return), Nn(3, e), Rl(5, e, e.return)))
        break
      case 1:
        ;(rt(t, e),
          ot(e),
          a & 512 && (Qe || l === null || Gt(l, l.return)),
          a & 64 &&
            ll &&
            ((e = e.updateQueue),
            e !== null &&
              ((a = e.callbacks),
              a !== null &&
                ((l = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = l === null ? a : l.concat(a))))))
        break
      case 26:
        var n = Ht
        if (
          (rt(t, e),
          ot(e),
          a & 512 && (Qe || l === null || Gt(l, l.return)),
          a & 4)
        ) {
          var u = l !== null ? l.memoizedState : null
          if (((a = e.memoizedState), l === null))
            if (a === null)
              if (e.stateNode === null) {
                e: {
                  ;((a = e.type),
                    (l = e.memoizedProps),
                    (n = n.ownerDocument || n))
                  t: switch (a) {
                    case "title":
                      ;((u = n.getElementsByTagName("title")[0]),
                        (!u ||
                          u[ln] ||
                          u[We] ||
                          u.namespaceURI === "http://www.w3.org/2000/svg" ||
                          u.hasAttribute("itemprop")) &&
                          ((u = n.createElement(a)),
                          n.head.insertBefore(
                            u,
                            n.querySelector("head > title")
                          )),
                        et(u, a, l),
                        (u[We] = e),
                        Je(u),
                        (a = u))
                      break e
                    case "link":
                      var o = dm("link", "href", n).get(a + (l.href || ""))
                      if (o) {
                        for (var d = 0; d < o.length; d++)
                          if (
                            ((u = o[d]),
                            u.getAttribute("href") ===
                              (l.href == null || l.href === ""
                                ? null
                                : l.href) &&
                              u.getAttribute("rel") ===
                                (l.rel == null ? null : l.rel) &&
                              u.getAttribute("title") ===
                                (l.title == null ? null : l.title) &&
                              u.getAttribute("crossorigin") ===
                                (l.crossOrigin == null ? null : l.crossOrigin))
                          ) {
                            o.splice(d, 1)
                            break t
                          }
                      }
                      ;((u = n.createElement(a)),
                        et(u, a, l),
                        n.head.appendChild(u))
                      break
                    case "meta":
                      if (
                        (o = dm("meta", "content", n).get(
                          a + (l.content || "")
                        ))
                      ) {
                        for (d = 0; d < o.length; d++)
                          if (
                            ((u = o[d]),
                            u.getAttribute("content") ===
                              (l.content == null ? null : "" + l.content) &&
                              u.getAttribute("name") ===
                                (l.name == null ? null : l.name) &&
                              u.getAttribute("property") ===
                                (l.property == null ? null : l.property) &&
                              u.getAttribute("http-equiv") ===
                                (l.httpEquiv == null ? null : l.httpEquiv) &&
                              u.getAttribute("charset") ===
                                (l.charSet == null ? null : l.charSet))
                          ) {
                            o.splice(d, 1)
                            break t
                          }
                      }
                      ;((u = n.createElement(a)),
                        et(u, a, l),
                        n.head.appendChild(u))
                      break
                    default:
                      throw Error(r(468, a))
                  }
                  ;((u[We] = e), Je(u), (a = u))
                }
                e.stateNode = a
              } else mm(n, e.type, e.stateNode)
            else e.stateNode = fm(n, a, e.memoizedProps)
          else
            u !== a
              ? (u === null
                  ? l.stateNode !== null &&
                    ((l = l.stateNode), l.parentNode.removeChild(l))
                  : u.count--,
                a === null
                  ? mm(n, e.type, e.stateNode)
                  : fm(n, a, e.memoizedProps))
              : a === null &&
                e.stateNode !== null &&
                cr(e, e.memoizedProps, l.memoizedProps)
        }
        break
      case 27:
        ;(rt(t, e),
          ot(e),
          a & 512 && (Qe || l === null || Gt(l, l.return)),
          l !== null && a & 4 && cr(e, e.memoizedProps, l.memoizedProps))
        break
      case 5:
        if (
          (rt(t, e),
          ot(e),
          a & 512 && (Qe || l === null || Gt(l, l.return)),
          e.flags & 32)
        ) {
          n = e.stateNode
          try {
            ga(n, "")
          } catch (k) {
            Ae(e, e.return, k)
          }
        }
        ;(a & 4 &&
          e.stateNode != null &&
          ((n = e.memoizedProps), cr(e, n, l !== null ? l.memoizedProps : n)),
          a & 1024 && (sr = !0))
        break
      case 6:
        if ((rt(t, e), ot(e), a & 4)) {
          if (e.stateNode === null) throw Error(r(162))
          ;((a = e.memoizedProps), (l = e.stateNode))
          try {
            l.nodeValue = a
          } catch (k) {
            Ae(e, e.return, k)
          }
        }
        break
      case 3:
        if (
          ((ri = null),
          (n = Ht),
          (Ht = ii(t.containerInfo)),
          rt(t, e),
          (Ht = n),
          ot(e),
          a & 4 && l !== null && l.memoizedState.isDehydrated)
        )
          try {
            Ja(t.containerInfo)
          } catch (k) {
            Ae(e, e.return, k)
          }
        sr && ((sr = !1), md(e))
        break
      case 4:
        ;((a = Ht),
          (Ht = ii(e.stateNode.containerInfo)),
          rt(t, e),
          ot(e),
          (Ht = a))
        break
      case 12:
        ;(rt(t, e), ot(e))
        break
      case 31:
        ;(rt(t, e),
          ot(e),
          a & 4 &&
            ((a = e.updateQueue),
            a !== null && ((e.updateQueue = null), Zu(e, a))))
        break
      case 13:
        ;(rt(t, e),
          ot(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) !=
              (l !== null && l.memoizedState !== null) &&
            (Ju = dt()),
          a & 4 &&
            ((a = e.updateQueue),
            a !== null && ((e.updateQueue = null), Zu(e, a))))
        break
      case 22:
        n = e.memoizedState !== null
        var v = l !== null && l.memoizedState !== null,
          T = ll,
          M = Qe
        if (
          ((ll = T || n),
          (Qe = M || v),
          rt(t, e),
          (Qe = M),
          (ll = T),
          ot(e),
          a & 8192)
        )
          e: for (
            t = e.stateNode,
              t._visibility = n ? t._visibility & -2 : t._visibility | 1,
              n && (l === null || v || ll || Qe || ua(e)),
              l = null,
              t = e;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                v = l = t
                try {
                  if (((u = v.stateNode), n))
                    ((o = u.style),
                      typeof o.setProperty == "function"
                        ? o.setProperty("display", "none", "important")
                        : (o.display = "none"))
                  else {
                    d = v.stateNode
                    var U = v.memoizedProps.style,
                      R =
                        U != null && U.hasOwnProperty("display")
                          ? U.display
                          : null
                    d.style.display =
                      R == null || typeof R == "boolean" ? "" : ("" + R).trim()
                  }
                } catch (k) {
                  Ae(v, v.return, k)
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                v = t
                try {
                  v.stateNode.nodeValue = n ? "" : v.memoizedProps
                } catch (k) {
                  Ae(v, v.return, k)
                }
              }
            } else if (t.tag === 18) {
              if (l === null) {
                v = t
                try {
                  var O = v.stateNode
                  n ? lm(O, !0) : lm(v.stateNode, !1)
                } catch (k) {
                  Ae(v, v.return, k)
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) ||
                t.memoizedState === null ||
                t === e) &&
              t.child !== null
            ) {
              ;((t.child.return = t), (t = t.child))
              continue
            }
            if (t === e) break e
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e
              ;(l === t && (l = null), (t = t.return))
            }
            ;(l === t && (l = null),
              (t.sibling.return = t.return),
              (t = t.sibling))
          }
        a & 4 &&
          ((a = e.updateQueue),
          a !== null &&
            ((l = a.retryQueue),
            l !== null && ((a.retryQueue = null), Zu(e, l))))
        break
      case 19:
        ;(rt(t, e),
          ot(e),
          a & 4 &&
            ((a = e.updateQueue),
            a !== null && ((e.updateQueue = null), Zu(e, a))))
        break
      case 30:
        break
      case 21:
        break
      default:
        ;(rt(t, e), ot(e))
    }
  }
  function ot(e) {
    var t = e.flags
    if (t & 2) {
      try {
        for (var l, a = e.return; a !== null; ) {
          if (nd(a)) {
            l = a
            break
          }
          a = a.return
        }
        if (l == null) throw Error(r(160))
        switch (l.tag) {
          case 27:
            var n = l.stateNode,
              u = rr(e)
            ku(e, u, n)
            break
          case 5:
            var o = l.stateNode
            l.flags & 32 && (ga(o, ""), (l.flags &= -33))
            var d = rr(e)
            ku(e, d, o)
            break
          case 3:
          case 4:
            var v = l.stateNode.containerInfo,
              T = rr(e)
            or(e, T, v)
            break
          default:
            throw Error(r(161))
        }
      } catch (M) {
        Ae(e, e.return, M)
      }
      e.flags &= -3
    }
    t & 4096 && (e.flags &= -4097)
  }
  function md(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e
        ;(md(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (e = e.sibling))
      }
  }
  function nl(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (cd(e, t.alternate, t), (t = t.sibling))
  }
  function ua(e) {
    for (e = e.child; e !== null; ) {
      var t = e
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ;(Rl(4, t, t.return), ua(t))
          break
        case 1:
          Gt(t, t.return)
          var l = t.stateNode
          ;(typeof l.componentWillUnmount == "function" && ld(t, t.return, l),
            ua(t))
          break
        case 27:
          qn(t.stateNode)
        case 26:
        case 5:
          ;(Gt(t, t.return), ua(t))
          break
        case 22:
          t.memoizedState === null && ua(t)
          break
        case 30:
          ua(t)
          break
        default:
          ua(t)
      }
      e = e.sibling
    }
  }
  function ul(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate,
        n = e,
        u = t,
        o = u.flags
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          ;(ul(n, u, l), Nn(4, u))
          break
        case 1:
          if (
            (ul(n, u, l),
            (a = u),
            (n = a.stateNode),
            typeof n.componentDidMount == "function")
          )
            try {
              n.componentDidMount()
            } catch (T) {
              Ae(a, a.return, T)
            }
          if (((a = u), (n = a.updateQueue), n !== null)) {
            var d = a.stateNode
            try {
              var v = n.shared.hiddenCallbacks
              if (v !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < v.length; n++)
                  Xs(v[n], d)
            } catch (T) {
              Ae(a, a.return, T)
            }
          }
          ;(l && o & 64 && td(u), _n(u, u.return))
          break
        case 27:
          ud(u)
        case 26:
        case 5:
          ;(ul(n, u, l), l && a === null && o & 4 && ad(u), _n(u, u.return))
          break
        case 12:
          ul(n, u, l)
          break
        case 31:
          ;(ul(n, u, l), l && o & 4 && sd(n, u))
          break
        case 13:
          ;(ul(n, u, l), l && o & 4 && fd(n, u))
          break
        case 22:
          ;(u.memoizedState === null && ul(n, u, l), _n(u, u.return))
          break
        case 30:
          break
        default:
          ul(n, u, l)
      }
      t = t.sibling
    }
  }
  function fr(e, t) {
    var l = null
    ;(e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (l = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== l && (e != null && e.refCount++, l != null && vn(l)))
  }
  function dr(e, t) {
    ;((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && vn(e)))
  }
  function Bt(e, t, l, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) (hd(e, t, l, a), (t = t.sibling))
  }
  function hd(e, t, l, a) {
    var n = t.flags
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        ;(Bt(e, t, l, a), n & 2048 && Nn(9, t))
        break
      case 1:
        Bt(e, t, l, a)
        break
      case 3:
        ;(Bt(e, t, l, a),
          n & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && vn(e))))
        break
      case 12:
        if (n & 2048) {
          ;(Bt(e, t, l, a), (e = t.stateNode))
          try {
            var u = t.memoizedProps,
              o = u.id,
              d = u.onPostCommit
            typeof d == "function" &&
              d(
                o,
                t.alternate === null ? "mount" : "update",
                e.passiveEffectDuration,
                -0
              )
          } catch (v) {
            Ae(t, t.return, v)
          }
        } else Bt(e, t, l, a)
        break
      case 31:
        Bt(e, t, l, a)
        break
      case 13:
        Bt(e, t, l, a)
        break
      case 23:
        break
      case 22:
        ;((u = t.stateNode),
          (o = t.alternate),
          t.memoizedState !== null
            ? u._visibility & 2
              ? Bt(e, t, l, a)
              : Mn(e, t)
            : u._visibility & 2
              ? Bt(e, t, l, a)
              : ((u._visibility |= 2),
                Ba(e, t, l, a, (t.subtreeFlags & 10256) !== 0 || !1)),
          n & 2048 && fr(o, t))
        break
      case 24:
        ;(Bt(e, t, l, a), n & 2048 && dr(t.alternate, t))
        break
      default:
        Bt(e, t, l, a)
    }
  }
  function Ba(e, t, l, a, n) {
    for (
      n = n && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child;
      t !== null;
    ) {
      var u = e,
        o = t,
        d = l,
        v = a,
        T = o.flags
      switch (o.tag) {
        case 0:
        case 11:
        case 15:
          ;(Ba(u, o, d, v, n), Nn(8, o))
          break
        case 23:
          break
        case 22:
          var M = o.stateNode
          ;(o.memoizedState !== null
            ? M._visibility & 2
              ? Ba(u, o, d, v, n)
              : Mn(u, o)
            : ((M._visibility |= 2), Ba(u, o, d, v, n)),
            n && T & 2048 && fr(o.alternate, o))
          break
        case 24:
          ;(Ba(u, o, d, v, n), n && T & 2048 && dr(o.alternate, o))
          break
        default:
          Ba(u, o, d, v, n)
      }
      t = t.sibling
    }
  }
  function Mn(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e,
          a = t,
          n = a.flags
        switch (a.tag) {
          case 22:
            ;(Mn(l, a), n & 2048 && fr(a.alternate, a))
            break
          case 24:
            ;(Mn(l, a), n & 2048 && dr(a.alternate, a))
            break
          default:
            Mn(l, a)
        }
        t = t.sibling
      }
  }
  var Dn = 8192
  function La(e, t, l) {
    if (e.subtreeFlags & Dn)
      for (e = e.child; e !== null; ) (yd(e, t, l), (e = e.sibling))
  }
  function yd(e, t, l) {
    switch (e.tag) {
      case 26:
        ;(La(e, t, l),
          e.flags & Dn &&
            e.memoizedState !== null &&
            ig(l, Ht, e.memoizedState, e.memoizedProps))
        break
      case 5:
        La(e, t, l)
        break
      case 3:
      case 4:
        var a = Ht
        ;((Ht = ii(e.stateNode.containerInfo)), La(e, t, l), (Ht = a))
        break
      case 22:
        e.memoizedState === null &&
          ((a = e.alternate),
          a !== null && a.memoizedState !== null
            ? ((a = Dn), (Dn = 16777216), La(e, t, l), (Dn = a))
            : La(e, t, l))
        break
      default:
        La(e, t, l)
    }
  }
  function vd(e) {
    var t = e.alternate
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null
      do ((t = e.sibling), (e.sibling = null), (e = t))
      while (e !== null)
    }
  }
  function Un(e) {
    var t = e.deletions
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l]
          ;(($e = a), pd(a, e))
        }
      vd(e)
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) (gd(e), (e = e.sibling))
  }
  function gd(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        ;(Un(e), e.flags & 2048 && Rl(9, e, e.return))
        break
      case 3:
        Un(e)
        break
      case 12:
        Un(e)
        break
      case 22:
        var t = e.stateNode
        e.memoizedState !== null &&
        t._visibility & 2 &&
        (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), Ku(e))
          : Un(e)
        break
      default:
        Un(e)
    }
  }
  function Ku(e) {
    var t = e.deletions
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l]
          ;(($e = a), pd(a, e))
        }
      vd(e)
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          ;(Rl(8, t, t.return), Ku(t))
          break
        case 22:
          ;((l = t.stateNode),
            l._visibility & 2 && ((l._visibility &= -3), Ku(t)))
          break
        default:
          Ku(t)
      }
      e = e.sibling
    }
  }
  function pd(e, t) {
    for (; $e !== null; ) {
      var l = $e
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          Rl(8, l, t)
          break
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var a = l.memoizedState.cachePool.pool
            a != null && a.refCount++
          }
          break
        case 24:
          vn(l.memoizedState.cache)
      }
      if (((a = l.child), a !== null)) ((a.return = l), ($e = a))
      else
        e: for (l = e; $e !== null; ) {
          a = $e
          var n = a.sibling,
            u = a.return
          if ((rd(a), a === l)) {
            $e = null
            break e
          }
          if (n !== null) {
            ;((n.return = u), ($e = n))
            break e
          }
          $e = u
        }
    }
  }
  var xv = {
      getCacheForType: function (e) {
        var t = Ie(Ge),
          l = t.data.get(e)
        return (l === void 0 && ((l = e()), t.data.set(e, l)), l)
      },
      cacheSignal: function () {
        return Ie(Ge).controller.signal
      },
    },
    Ev = typeof WeakMap == "function" ? WeakMap : Map,
    ze = 0,
    _e = null,
    me = null,
    ye = 0,
    Te = 0,
    bt = null,
    Cl = !1,
    qa = !1,
    mr = !1,
    il = 0,
    Le = 0,
    Ol = 0,
    ia = 0,
    hr = 0,
    St = 0,
    Ya = 0,
    jn = null,
    st = null,
    yr = !1,
    Ju = 0,
    bd = 0,
    $u = 1 / 0,
    Wu = null,
    Nl = null,
    ke = 0,
    _l = null,
    Ga = null,
    cl = 0,
    vr = 0,
    gr = null,
    Sd = null,
    wn = 0,
    pr = null
  function xt() {
    return (ze & 2) !== 0 && ye !== 0 ? ye & -ye : _.T !== null ? Tr() : wo()
  }
  function xd() {
    if (St === 0)
      if ((ye & 536870912) === 0 || pe) {
        var e = nu
        ;((nu <<= 1), (nu & 3932160) === 0 && (nu = 262144), (St = e))
      } else St = 536870912
    return ((e = gt.current), e !== null && (e.flags |= 32), St)
  }
  function ft(e, t, l) {
    ;(((e === _e && (Te === 2 || Te === 9)) ||
      e.cancelPendingCommit !== null) &&
      (Va(e, 0), Ml(e, ye, St, !1)),
      tn(e, l),
      ((ze & 2) === 0 || e !== _e) &&
        (e === _e &&
          ((ze & 2) === 0 && (ia |= l), Le === 4 && Ml(e, ye, St, !1)),
        Vt(e)))
  }
  function Ed(e, t, l) {
    if ((ze & 6) !== 0) throw Error(r(327))
    var a = (!l && (t & 127) === 0 && (t & e.expiredLanes) === 0) || en(e, t),
      n = a ? Av(e, t) : Sr(e, t, !0),
      u = a
    do {
      if (n === 0) {
        qa && !a && Ml(e, t, 0, !1)
        break
      } else {
        if (((l = e.current.alternate), u && !zv(l))) {
          ;((n = Sr(e, t, !1)), (u = !1))
          continue
        }
        if (n === 2) {
          if (((u = t), e.errorRecoveryDisabledLanes & u)) var o = 0
          else
            ((o = e.pendingLanes & -536870913),
              (o = o !== 0 ? o : o & 536870912 ? 536870912 : 0))
          if (o !== 0) {
            t = o
            e: {
              var d = e
              n = jn
              var v = d.current.memoizedState.isDehydrated
              if ((v && (Va(d, o).flags |= 256), (o = Sr(d, o, !1)), o !== 2)) {
                if (mr && !v) {
                  ;((d.errorRecoveryDisabledLanes |= u), (ia |= u), (n = 4))
                  break e
                }
                ;((u = st),
                  (st = n),
                  u !== null && (st === null ? (st = u) : st.push.apply(st, u)))
              }
              n = o
            }
            if (((u = !1), n !== 2)) continue
          }
        }
        if (n === 1) {
          ;(Va(e, 0), Ml(e, t, 0, !0))
          break
        }
        e: {
          switch (((a = e), (u = n), u)) {
            case 0:
            case 1:
              throw Error(r(345))
            case 4:
              if ((t & 4194048) !== t) break
            case 6:
              Ml(a, t, St, !Cl)
              break e
            case 2:
              st = null
              break
            case 3:
            case 5:
              break
            default:
              throw Error(r(329))
          }
          if ((t & 62914560) === t && ((n = Ju + 300 - dt()), 10 < n)) {
            if ((Ml(a, t, St, !Cl), iu(a, 0, !0) !== 0)) break e
            ;((cl = t),
              (a.timeoutHandle = Pd(
                zd.bind(
                  null,
                  a,
                  l,
                  st,
                  Wu,
                  yr,
                  t,
                  St,
                  ia,
                  Ya,
                  Cl,
                  u,
                  "Throttled",
                  -0,
                  0
                ),
                n
              )))
            break e
          }
          zd(a, l, st, Wu, yr, t, St, ia, Ya, Cl, u, null, -0, 0)
        }
      }
      break
    } while (!0)
    Vt(e)
  }
  function zd(e, t, l, a, n, u, o, d, v, T, M, U, R, O) {
    if (
      ((e.timeoutHandle = -1),
      (U = t.subtreeFlags),
      U & 8192 || (U & 16785408) === 16785408)
    ) {
      ;((U = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Zt,
      }),
        yd(t, u, U))
      var k =
        (u & 62914560) === u ? Ju - dt() : (u & 4194048) === u ? bd - dt() : 0
      if (((k = cg(U, k)), k !== null)) {
        ;((cl = u),
          (e.cancelPendingCommit = k(
            Md.bind(null, e, t, u, l, a, n, o, d, v, M, U, null, R, O)
          )),
          Ml(e, u, o, !T))
        return
      }
    }
    Md(e, t, u, l, a, n, o, d, v)
  }
  function zv(e) {
    for (var t = e; ; ) {
      var l = t.tag
      if (
        (l === 0 || l === 11 || l === 15) &&
        t.flags & 16384 &&
        ((l = t.updateQueue), l !== null && ((l = l.stores), l !== null))
      )
        for (var a = 0; a < l.length; a++) {
          var n = l[a],
            u = n.getSnapshot
          n = n.value
          try {
            if (!yt(u(), n)) return !1
          } catch {
            return !1
          }
        }
      if (((l = t.child), t.subtreeFlags & 16384 && l !== null))
        ((l.return = t), (t = l))
      else {
        if (t === e) break
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0
          t = t.return
        }
        ;((t.sibling.return = t.return), (t = t.sibling))
      }
    }
    return !0
  }
  function Ml(e, t, l, a) {
    ;((t &= ~hr),
      (t &= ~ia),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      a && (e.warmLanes |= t),
      (a = e.expirationTimes))
    for (var n = t; 0 < n; ) {
      var u = 31 - ht(n),
        o = 1 << u
      ;((a[u] = -1), (n &= ~o))
    }
    l !== 0 && Do(e, l, t)
  }
  function Fu() {
    return (ze & 6) === 0 ? (Hn(0), !1) : !0
  }
  function br() {
    if (me !== null) {
      if (Te === 0) var e = me.return
      else ((e = me), (Wt = Fl = null), wc(e), (Da = null), (pn = 0), (e = me))
      for (; e !== null; ) (ed(e.alternate, e), (e = e.return))
      me = null
    }
  }
  function Va(e, t) {
    var l = e.timeoutHandle
    ;(l !== -1 && ((e.timeoutHandle = -1), Xv(l)),
      (l = e.cancelPendingCommit),
      l !== null && ((e.cancelPendingCommit = null), l()),
      (cl = 0),
      br(),
      (_e = e),
      (me = l = Jt(e.current, null)),
      (ye = t),
      (Te = 0),
      (bt = null),
      (Cl = !1),
      (qa = en(e, t)),
      (mr = !1),
      (Ya = St = hr = ia = Ol = Le = 0),
      (st = jn = null),
      (yr = !1),
      (t & 8) !== 0 && (t |= t & 32))
    var a = e.entangledLanes
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var n = 31 - ht(a),
          u = 1 << n
        ;((t |= e[n]), (a &= ~u))
      }
    return ((il = t), pu(), l)
  }
  function Td(e, t) {
    ;((ie = null),
      (_.H = Rn),
      t === Ma || t === Ru
        ? ((t = qs()), (Te = 3))
        : t === zc
          ? ((t = qs()), (Te = 4))
          : (Te =
              t === Fc
                ? 8
                : t !== null &&
                    typeof t == "object" &&
                    typeof t.then == "function"
                  ? 6
                  : 1),
      (bt = t),
      me === null && ((Le = 1), Yu(e, Ct(t, e.current))))
  }
  function Ad() {
    var e = gt.current
    return e === null
      ? !0
      : (ye & 4194048) === ye
        ? Mt === null
        : (ye & 62914560) === ye || (ye & 536870912) !== 0
          ? e === Mt
          : !1
  }
  function Rd() {
    var e = _.H
    return ((_.H = Rn), e === null ? Rn : e)
  }
  function Cd() {
    var e = _.A
    return ((_.A = xv), e)
  }
  function Iu() {
    ;((Le = 4),
      Cl || ((ye & 4194048) !== ye && gt.current !== null) || (qa = !0),
      ((Ol & 134217727) === 0 && (ia & 134217727) === 0) ||
        _e === null ||
        Ml(_e, ye, St, !1))
  }
  function Sr(e, t, l) {
    var a = ze
    ze |= 2
    var n = Rd(),
      u = Cd()
    ;((_e !== e || ye !== t) && ((Wu = null), Va(e, t)), (t = !1))
    var o = Le
    e: do
      try {
        if (Te !== 0 && me !== null) {
          var d = me,
            v = bt
          switch (Te) {
            case 8:
              ;(br(), (o = 6))
              break e
            case 3:
            case 2:
            case 9:
            case 6:
              gt.current === null && (t = !0)
              var T = Te
              if (((Te = 0), (bt = null), Xa(e, d, v, T), l && qa)) {
                o = 0
                break e
              }
              break
            default:
              ;((T = Te), (Te = 0), (bt = null), Xa(e, d, v, T))
          }
        }
        ;(Tv(), (o = Le))
        break
      } catch (M) {
        Td(e, M)
      }
    while (!0)
    return (
      t && e.shellSuspendCounter++,
      (Wt = Fl = null),
      (ze = a),
      (_.H = n),
      (_.A = u),
      me === null && ((_e = null), (ye = 0), pu()),
      o
    )
  }
  function Tv() {
    for (; me !== null; ) Od(me)
  }
  function Av(e, t) {
    var l = ze
    ze |= 2
    var a = Rd(),
      n = Cd()
    _e !== e || ye !== t
      ? ((Wu = null), ($u = dt() + 500), Va(e, t))
      : (qa = en(e, t))
    e: do
      try {
        if (Te !== 0 && me !== null) {
          t = me
          var u = bt
          t: switch (Te) {
            case 1:
              ;((Te = 0), (bt = null), Xa(e, t, u, 1))
              break
            case 2:
            case 9:
              if (Bs(u)) {
                ;((Te = 0), (bt = null), Nd(t))
                break
              }
              ;((t = function () {
                ;((Te !== 2 && Te !== 9) || _e !== e || (Te = 7), Vt(e))
              }),
                u.then(t, t))
              break e
            case 3:
              Te = 7
              break e
            case 4:
              Te = 5
              break e
            case 7:
              Bs(u)
                ? ((Te = 0), (bt = null), Nd(t))
                : ((Te = 0), (bt = null), Xa(e, t, u, 7))
              break
            case 5:
              var o = null
              switch (me.tag) {
                case 26:
                  o = me.memoizedState
                case 5:
                case 27:
                  var d = me
                  if (o ? hm(o) : d.stateNode.complete) {
                    ;((Te = 0), (bt = null))
                    var v = d.sibling
                    if (v !== null) me = v
                    else {
                      var T = d.return
                      T !== null ? ((me = T), Pu(T)) : (me = null)
                    }
                    break t
                  }
              }
              ;((Te = 0), (bt = null), Xa(e, t, u, 5))
              break
            case 6:
              ;((Te = 0), (bt = null), Xa(e, t, u, 6))
              break
            case 8:
              ;(br(), (Le = 6))
              break e
            default:
              throw Error(r(462))
          }
        }
        Rv()
        break
      } catch (M) {
        Td(e, M)
      }
    while (!0)
    return (
      (Wt = Fl = null),
      (_.H = a),
      (_.A = n),
      (ze = l),
      me !== null ? 0 : ((_e = null), (ye = 0), pu(), Le)
    )
  }
  function Rv() {
    for (; me !== null && !$h(); ) Od(me)
  }
  function Od(e) {
    var t = If(e.alternate, e, il)
    ;((e.memoizedProps = e.pendingProps), t === null ? Pu(e) : (me = t))
  }
  function Nd(e) {
    var t = e,
      l = t.alternate
    switch (t.tag) {
      case 15:
      case 0:
        t = Zf(l, t, t.pendingProps, t.type, void 0, ye)
        break
      case 11:
        t = Zf(l, t, t.pendingProps, t.type.render, t.ref, ye)
        break
      case 5:
        wc(t)
      default:
        ;(ed(l, t), (t = me = Rs(t, il)), (t = If(l, t, il)))
    }
    ;((e.memoizedProps = e.pendingProps), t === null ? Pu(e) : (me = t))
  }
  function Xa(e, t, l, a) {
    ;((Wt = Fl = null), wc(t), (Da = null), (pn = 0))
    var n = t.return
    try {
      if (hv(e, n, t, l, ye)) {
        ;((Le = 1), Yu(e, Ct(l, e.current)), (me = null))
        return
      }
    } catch (u) {
      if (n !== null) throw ((me = n), u)
      ;((Le = 1), Yu(e, Ct(l, e.current)), (me = null))
      return
    }
    t.flags & 32768
      ? (pe || a === 1
          ? (e = !0)
          : qa || (ye & 536870912) !== 0
            ? (e = !1)
            : ((Cl = e = !0),
              (a === 2 || a === 9 || a === 3 || a === 6) &&
                ((a = gt.current),
                a !== null && a.tag === 13 && (a.flags |= 16384))),
        _d(t, e))
      : Pu(t)
  }
  function Pu(e) {
    var t = e
    do {
      if ((t.flags & 32768) !== 0) {
        _d(t, Cl)
        return
      }
      e = t.return
      var l = gv(t.alternate, t, il)
      if (l !== null) {
        me = l
        return
      }
      if (((t = t.sibling), t !== null)) {
        me = t
        return
      }
      me = t = e
    } while (t !== null)
    Le === 0 && (Le = 5)
  }
  function _d(e, t) {
    do {
      var l = pv(e.alternate, e)
      if (l !== null) {
        ;((l.flags &= 32767), (me = l))
        return
      }
      if (
        ((l = e.return),
        l !== null &&
          ((l.flags |= 32768), (l.subtreeFlags = 0), (l.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        me = e
        return
      }
      me = e = l
    } while (e !== null)
    ;((Le = 6), (me = null))
  }
  function Md(e, t, l, a, n, u, o, d, v) {
    e.cancelPendingCommit = null
    do ei()
    while (ke !== 0)
    if ((ze & 6) !== 0) throw Error(r(327))
    if (t !== null) {
      if (t === e.current) throw Error(r(177))
      if (
        ((u = t.lanes | t.childLanes),
        (u |= rc),
        uy(e, l, u, o, d, v),
        e === _e && ((me = _e = null), (ye = 0)),
        (Ga = t),
        (_l = e),
        (cl = l),
        (vr = u),
        (gr = n),
        (Sd = a),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            _v(lu, function () {
              return (Hd(), null)
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (a = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || a)
      ) {
        ;((a = _.T), (_.T = null), (n = L.p), (L.p = 2), (o = ze), (ze |= 4))
        try {
          bv(e, t, l)
        } finally {
          ;((ze = o), (L.p = n), (_.T = a))
        }
      }
      ;((ke = 1), Dd(), Ud(), jd())
    }
  }
  function Dd() {
    if (ke === 1) {
      ke = 0
      var e = _l,
        t = Ga,
        l = (t.flags & 13878) !== 0
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        ;((l = _.T), (_.T = null))
        var a = L.p
        L.p = 2
        var n = ze
        ze |= 4
        try {
          dd(t, e)
          var u = Dr,
            o = gs(e.containerInfo),
            d = u.focusedElem,
            v = u.selectionRange
          if (
            o !== d &&
            d &&
            d.ownerDocument &&
            vs(d.ownerDocument.documentElement, d)
          ) {
            if (v !== null && ac(d)) {
              var T = v.start,
                M = v.end
              if ((M === void 0 && (M = T), "selectionStart" in d))
                ((d.selectionStart = T),
                  (d.selectionEnd = Math.min(M, d.value.length)))
              else {
                var U = d.ownerDocument || document,
                  R = (U && U.defaultView) || window
                if (R.getSelection) {
                  var O = R.getSelection(),
                    k = d.textContent.length,
                    ae = Math.min(v.start, k),
                    Oe = v.end === void 0 ? ae : Math.min(v.end, k)
                  !O.extend && ae > Oe && ((o = Oe), (Oe = ae), (ae = o))
                  var S = ys(d, ae),
                    p = ys(d, Oe)
                  if (
                    S &&
                    p &&
                    (O.rangeCount !== 1 ||
                      O.anchorNode !== S.node ||
                      O.anchorOffset !== S.offset ||
                      O.focusNode !== p.node ||
                      O.focusOffset !== p.offset)
                  ) {
                    var z = U.createRange()
                    ;(z.setStart(S.node, S.offset),
                      O.removeAllRanges(),
                      ae > Oe
                        ? (O.addRange(z), O.extend(p.node, p.offset))
                        : (z.setEnd(p.node, p.offset), O.addRange(z)))
                  }
                }
              }
            }
            for (U = [], O = d; (O = O.parentNode); )
              O.nodeType === 1 &&
                U.push({ element: O, left: O.scrollLeft, top: O.scrollTop })
            for (
              typeof d.focus == "function" && d.focus(), d = 0;
              d < U.length;
              d++
            ) {
              var D = U[d]
              ;((D.element.scrollLeft = D.left), (D.element.scrollTop = D.top))
            }
          }
          ;((di = !!Mr), (Dr = Mr = null))
        } finally {
          ;((ze = n), (L.p = a), (_.T = l))
        }
      }
      ;((e.current = t), (ke = 2))
    }
  }
  function Ud() {
    if (ke === 2) {
      ke = 0
      var e = _l,
        t = Ga,
        l = (t.flags & 8772) !== 0
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        ;((l = _.T), (_.T = null))
        var a = L.p
        L.p = 2
        var n = ze
        ze |= 4
        try {
          cd(e, t.alternate, t)
        } finally {
          ;((ze = n), (L.p = a), (_.T = l))
        }
      }
      ke = 3
    }
  }
  function jd() {
    if (ke === 4 || ke === 3) {
      ;((ke = 0), Wh())
      var e = _l,
        t = Ga,
        l = cl,
        a = Sd
      ;(t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (ke = 5)
        : ((ke = 0), (Ga = _l = null), wd(e, e.pendingLanes))
      var n = e.pendingLanes
      if (
        (n === 0 && (Nl = null),
        Li(l),
        (t = t.stateNode),
        mt && typeof mt.onCommitFiberRoot == "function")
      )
        try {
          mt.onCommitFiberRoot(Pa, t, void 0, (t.current.flags & 128) === 128)
        } catch {}
      if (a !== null) {
        ;((t = _.T), (n = L.p), (L.p = 2), (_.T = null))
        try {
          for (var u = e.onRecoverableError, o = 0; o < a.length; o++) {
            var d = a[o]
            u(d.value, { componentStack: d.stack })
          }
        } finally {
          ;((_.T = t), (L.p = n))
        }
      }
      ;((cl & 3) !== 0 && ei(),
        Vt(e),
        (n = e.pendingLanes),
        (l & 261930) !== 0 && (n & 42) !== 0
          ? e === pr
            ? wn++
            : ((wn = 0), (pr = e))
          : (wn = 0),
        Hn(0))
    }
  }
  function wd(e, t) {
    ;(e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), vn(t)))
  }
  function ei() {
    return (Dd(), Ud(), jd(), Hd())
  }
  function Hd() {
    if (ke !== 5) return !1
    var e = _l,
      t = vr
    vr = 0
    var l = Li(cl),
      a = _.T,
      n = L.p
    try {
      ;((L.p = 32 > l ? 32 : l), (_.T = null), (l = gr), (gr = null))
      var u = _l,
        o = cl
      if (((ke = 0), (Ga = _l = null), (cl = 0), (ze & 6) !== 0))
        throw Error(r(331))
      var d = ze
      if (
        ((ze |= 4),
        gd(u.current),
        hd(u, u.current, o, l),
        (ze = d),
        Hn(0, !1),
        mt && typeof mt.onPostCommitFiberRoot == "function")
      )
        try {
          mt.onPostCommitFiberRoot(Pa, u)
        } catch {}
      return !0
    } finally {
      ;((L.p = n), (_.T = a), wd(e, t))
    }
  }
  function Bd(e, t, l) {
    ;((t = Ct(l, t)),
      (t = Wc(e.stateNode, t, 2)),
      (e = zl(e, t, 2)),
      e !== null && (tn(e, 2), Vt(e)))
  }
  function Ae(e, t, l) {
    if (e.tag === 3) Bd(e, e, l)
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Bd(t, e, l)
          break
        } else if (t.tag === 1) {
          var a = t.stateNode
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof a.componentDidCatch == "function" &&
              (Nl === null || !Nl.has(a)))
          ) {
            ;((e = Ct(l, e)),
              (l = Lf(2)),
              (a = zl(t, l, 2)),
              a !== null && (qf(l, a, t, e), tn(a, 2), Vt(a)))
            break
          }
        }
        t = t.return
      }
  }
  function xr(e, t, l) {
    var a = e.pingCache
    if (a === null) {
      a = e.pingCache = new Ev()
      var n = new Set()
      a.set(t, n)
    } else ((n = a.get(t)), n === void 0 && ((n = new Set()), a.set(t, n)))
    n.has(l) ||
      ((mr = !0), n.add(l), (e = Cv.bind(null, e, t, l)), t.then(e, e))
  }
  function Cv(e, t, l) {
    var a = e.pingCache
    ;(a !== null && a.delete(t),
      (e.pingedLanes |= e.suspendedLanes & l),
      (e.warmLanes &= ~l),
      _e === e &&
        (ye & l) === l &&
        (Le === 4 || (Le === 3 && (ye & 62914560) === ye && 300 > dt() - Ju)
          ? (ze & 2) === 0 && Va(e, 0)
          : (hr |= l),
        Ya === ye && (Ya = 0)),
      Vt(e))
  }
  function Ld(e, t) {
    ;(t === 0 && (t = Mo()), (e = Jl(e, t)), e !== null && (tn(e, t), Vt(e)))
  }
  function Ov(e) {
    var t = e.memoizedState,
      l = 0
    ;(t !== null && (l = t.retryLane), Ld(e, l))
  }
  function Nv(e, t) {
    var l = 0
    switch (e.tag) {
      case 31:
      case 13:
        var a = e.stateNode,
          n = e.memoizedState
        n !== null && (l = n.retryLane)
        break
      case 19:
        a = e.stateNode
        break
      case 22:
        a = e.stateNode._retryCache
        break
      default:
        throw Error(r(314))
    }
    ;(a !== null && a.delete(t), Ld(e, l))
  }
  function _v(e, t) {
    return ji(e, t)
  }
  var ti = null,
    Qa = null,
    Er = !1,
    li = !1,
    zr = !1,
    Dl = 0
  function Vt(e) {
    ;(e !== Qa &&
      e.next === null &&
      (Qa === null ? (ti = Qa = e) : (Qa = Qa.next = e)),
      (li = !0),
      Er || ((Er = !0), Dv()))
  }
  function Hn(e, t) {
    if (!zr && li) {
      zr = !0
      do
        for (var l = !1, a = ti; a !== null; ) {
          if (e !== 0) {
            var n = a.pendingLanes
            if (n === 0) var u = 0
            else {
              var o = a.suspendedLanes,
                d = a.pingedLanes
              ;((u = (1 << (31 - ht(42 | e) + 1)) - 1),
                (u &= n & ~(o & ~d)),
                (u = u & 201326741 ? (u & 201326741) | 1 : u ? u | 2 : 0))
            }
            u !== 0 && ((l = !0), Vd(a, u))
          } else
            ((u = ye),
              (u = iu(
                a,
                a === _e ? u : 0,
                a.cancelPendingCommit !== null || a.timeoutHandle !== -1
              )),
              (u & 3) === 0 || en(a, u) || ((l = !0), Vd(a, u)))
          a = a.next
        }
      while (l)
      zr = !1
    }
  }
  function Mv() {
    qd()
  }
  function qd() {
    li = Er = !1
    var e = 0
    Dl !== 0 && Vv() && (e = Dl)
    for (var t = dt(), l = null, a = ti; a !== null; ) {
      var n = a.next,
        u = Yd(a, t)
      ;(u === 0
        ? ((a.next = null),
          l === null ? (ti = n) : (l.next = n),
          n === null && (Qa = l))
        : ((l = a), (e !== 0 || (u & 3) !== 0) && (li = !0)),
        (a = n))
    }
    ;((ke !== 0 && ke !== 5) || Hn(e), Dl !== 0 && (Dl = 0))
  }
  function Yd(e, t) {
    for (
      var l = e.suspendedLanes,
        a = e.pingedLanes,
        n = e.expirationTimes,
        u = e.pendingLanes & -62914561;
      0 < u;
    ) {
      var o = 31 - ht(u),
        d = 1 << o,
        v = n[o]
      ;(v === -1
        ? ((d & l) === 0 || (d & a) !== 0) && (n[o] = ny(d, t))
        : v <= t && (e.expiredLanes |= d),
        (u &= ~d))
    }
    if (
      ((t = _e),
      (l = ye),
      (l = iu(
        e,
        e === t ? l : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      (a = e.callbackNode),
      l === 0 ||
        (e === t && (Te === 2 || Te === 9)) ||
        e.cancelPendingCommit !== null)
    )
      return (
        a !== null && a !== null && wi(a),
        (e.callbackNode = null),
        (e.callbackPriority = 0)
      )
    if ((l & 3) === 0 || en(e, l)) {
      if (((t = l & -l), t === e.callbackPriority)) return t
      switch ((a !== null && wi(a), Li(l))) {
        case 2:
        case 8:
          l = No
          break
        case 32:
          l = lu
          break
        case 268435456:
          l = _o
          break
        default:
          l = lu
      }
      return (
        (a = Gd.bind(null, e)),
        (l = ji(l, a)),
        (e.callbackPriority = t),
        (e.callbackNode = l),
        t
      )
    }
    return (
      a !== null && a !== null && wi(a),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    )
  }
  function Gd(e, t) {
    if (ke !== 0 && ke !== 5)
      return ((e.callbackNode = null), (e.callbackPriority = 0), null)
    var l = e.callbackNode
    if (ei() && e.callbackNode !== l) return null
    var a = ye
    return (
      (a = iu(
        e,
        e === _e ? a : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      a === 0
        ? null
        : (Ed(e, a, t),
          Yd(e, dt()),
          e.callbackNode != null && e.callbackNode === l
            ? Gd.bind(null, e)
            : null)
    )
  }
  function Vd(e, t) {
    if (ei()) return null
    Ed(e, t, !0)
  }
  function Dv() {
    Qv(function () {
      ;(ze & 6) !== 0 ? ji(Oo, Mv) : qd()
    })
  }
  function Tr() {
    if (Dl === 0) {
      var e = Na
      ;(e === 0 && ((e = au), (au <<= 1), (au & 261888) === 0 && (au = 256)),
        (Dl = e))
    }
    return Dl
  }
  function Xd(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean"
      ? null
      : typeof e == "function"
        ? e
        : su("" + e)
  }
  function Qd(e, t) {
    var l = t.ownerDocument.createElement("input")
    return (
      (l.name = t.name),
      (l.value = t.value),
      e.id && l.setAttribute("form", e.id),
      t.parentNode.insertBefore(l, t),
      (e = new FormData(e)),
      l.parentNode.removeChild(l),
      e
    )
  }
  function Uv(e, t, l, a, n) {
    if (t === "submit" && l && l.stateNode === n) {
      var u = Xd((n[ut] || null).action),
        o = a.submitter
      o &&
        ((t = (t = o[ut] || null)
          ? Xd(t.formAction)
          : o.getAttribute("formAction")),
        t !== null && ((u = t), (o = null)))
      var d = new hu("action", "action", null, a, n)
      e.push({
        event: d,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (a.defaultPrevented) {
                if (Dl !== 0) {
                  var v = o ? Qd(n, o) : new FormData(n)
                  Qc(
                    l,
                    { pending: !0, data: v, method: n.method, action: u },
                    null,
                    v
                  )
                }
              } else
                typeof u == "function" &&
                  (d.preventDefault(),
                  (v = o ? Qd(n, o) : new FormData(n)),
                  Qc(
                    l,
                    { pending: !0, data: v, method: n.method, action: u },
                    u,
                    v
                  ))
            },
            currentTarget: n,
          },
        ],
      })
    }
  }
  for (var Ar = 0; Ar < cc.length; Ar++) {
    var Rr = cc[Ar],
      jv = Rr.toLowerCase(),
      wv = Rr[0].toUpperCase() + Rr.slice(1)
    wt(jv, "on" + wv)
  }
  ;(wt(Ss, "onAnimationEnd"),
    wt(xs, "onAnimationIteration"),
    wt(Es, "onAnimationStart"),
    wt("dblclick", "onDoubleClick"),
    wt("focusin", "onFocus"),
    wt("focusout", "onBlur"),
    wt(Fy, "onTransitionRun"),
    wt(Iy, "onTransitionStart"),
    wt(Py, "onTransitionCancel"),
    wt(zs, "onTransitionEnd"),
    ya("onMouseEnter", ["mouseout", "mouseover"]),
    ya("onMouseLeave", ["mouseout", "mouseover"]),
    ya("onPointerEnter", ["pointerout", "pointerover"]),
    ya("onPointerLeave", ["pointerout", "pointerover"]),
    Ql(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ),
    Ql(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ),
    Ql("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Ql(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ),
    Ql(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ),
    Ql(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    ))
  var Bn =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    Hv = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(Bn)
    )
  function kd(e, t) {
    t = (t & 4) !== 0
    for (var l = 0; l < e.length; l++) {
      var a = e[l],
        n = a.event
      a = a.listeners
      e: {
        var u = void 0
        if (t)
          for (var o = a.length - 1; 0 <= o; o--) {
            var d = a[o],
              v = d.instance,
              T = d.currentTarget
            if (((d = d.listener), v !== u && n.isPropagationStopped())) break e
            ;((u = d), (n.currentTarget = T))
            try {
              u(n)
            } catch (M) {
              gu(M)
            }
            ;((n.currentTarget = null), (u = v))
          }
        else
          for (o = 0; o < a.length; o++) {
            if (
              ((d = a[o]),
              (v = d.instance),
              (T = d.currentTarget),
              (d = d.listener),
              v !== u && n.isPropagationStopped())
            )
              break e
            ;((u = d), (n.currentTarget = T))
            try {
              u(n)
            } catch (M) {
              gu(M)
            }
            ;((n.currentTarget = null), (u = v))
          }
      }
    }
  }
  function he(e, t) {
    var l = t[qi]
    l === void 0 && (l = t[qi] = new Set())
    var a = e + "__bubble"
    l.has(a) || (Zd(t, e, 2, !1), l.add(a))
  }
  function Cr(e, t, l) {
    var a = 0
    ;(t && (a |= 4), Zd(l, e, a, t))
  }
  var ai = "_reactListening" + Math.random().toString(36).slice(2)
  function Or(e) {
    if (!e[ai]) {
      ;((e[ai] = !0),
        Lo.forEach(function (l) {
          l !== "selectionchange" && (Hv.has(l) || Cr(l, !1, e), Cr(l, !0, e))
        }))
      var t = e.nodeType === 9 ? e : e.ownerDocument
      t === null || t[ai] || ((t[ai] = !0), Cr("selectionchange", !1, t))
    }
  }
  function Zd(e, t, l, a) {
    switch (xm(t)) {
      case 2:
        var n = sg
        break
      case 8:
        n = fg
        break
      default:
        n = Xr
    }
    ;((l = n.bind(null, t, l, e)),
      (n = void 0),
      !Ji ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (n = !0),
      a
        ? n !== void 0
          ? e.addEventListener(t, l, { capture: !0, passive: n })
          : e.addEventListener(t, l, !0)
        : n !== void 0
          ? e.addEventListener(t, l, { passive: n })
          : e.addEventListener(t, l, !1))
  }
  function Nr(e, t, l, a, n) {
    var u = a
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      e: for (;;) {
        if (a === null) return
        var o = a.tag
        if (o === 3 || o === 4) {
          var d = a.stateNode.containerInfo
          if (d === n) break
          if (o === 4)
            for (o = a.return; o !== null; ) {
              var v = o.tag
              if ((v === 3 || v === 4) && o.stateNode.containerInfo === n)
                return
              o = o.return
            }
          for (; d !== null; ) {
            if (((o = da(d)), o === null)) return
            if (((v = o.tag), v === 5 || v === 6 || v === 26 || v === 27)) {
              a = u = o
              continue e
            }
            d = d.parentNode
          }
        }
        a = a.return
      }
    Wo(function () {
      var T = u,
        M = Zi(l),
        U = []
      e: {
        var R = Ts.get(e)
        if (R !== void 0) {
          var O = hu,
            k = e
          switch (e) {
            case "keypress":
              if (du(l) === 0) break e
            case "keydown":
            case "keyup":
              O = Ny
              break
            case "focusin":
              ;((k = "focus"), (O = Ii))
              break
            case "focusout":
              ;((k = "blur"), (O = Ii))
              break
            case "beforeblur":
            case "afterblur":
              O = Ii
              break
            case "click":
              if (l.button === 2) break e
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              O = Po
              break
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              O = gy
              break
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              O = Dy
              break
            case Ss:
            case xs:
            case Es:
              O = Sy
              break
            case zs:
              O = jy
              break
            case "scroll":
            case "scrollend":
              O = yy
              break
            case "wheel":
              O = Hy
              break
            case "copy":
            case "cut":
            case "paste":
              O = Ey
              break
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              O = ts
              break
            case "toggle":
            case "beforetoggle":
              O = Ly
          }
          var ae = (t & 4) !== 0,
            Oe = !ae && (e === "scroll" || e === "scrollend"),
            S = ae ? (R !== null ? R + "Capture" : null) : R
          ae = []
          for (var p = T, z; p !== null; ) {
            var D = p
            if (
              ((z = D.stateNode),
              (D = D.tag),
              (D !== 5 && D !== 26 && D !== 27) ||
                z === null ||
                S === null ||
                ((D = nn(p, S)), D != null && ae.push(Ln(p, D, z))),
              Oe)
            )
              break
            p = p.return
          }
          0 < ae.length &&
            ((R = new O(R, k, null, l, M)), U.push({ event: R, listeners: ae }))
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((R = e === "mouseover" || e === "pointerover"),
            (O = e === "mouseout" || e === "pointerout"),
            R &&
              l !== ki &&
              (k = l.relatedTarget || l.fromElement) &&
              (da(k) || k[fa]))
          )
            break e
          if (
            (O || R) &&
            ((R =
              M.window === M
                ? M
                : (R = M.ownerDocument)
                  ? R.defaultView || R.parentWindow
                  : window),
            O
              ? ((k = l.relatedTarget || l.toElement),
                (O = T),
                (k = k ? da(k) : null),
                k !== null &&
                  ((Oe = m(k)),
                  (ae = k.tag),
                  k !== Oe || (ae !== 5 && ae !== 27 && ae !== 6)) &&
                  (k = null))
              : ((O = null), (k = T)),
            O !== k)
          ) {
            if (
              ((ae = Po),
              (D = "onMouseLeave"),
              (S = "onMouseEnter"),
              (p = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((ae = ts),
                (D = "onPointerLeave"),
                (S = "onPointerEnter"),
                (p = "pointer")),
              (Oe = O == null ? R : an(O)),
              (z = k == null ? R : an(k)),
              (R = new ae(D, p + "leave", O, l, M)),
              (R.target = Oe),
              (R.relatedTarget = z),
              (D = null),
              da(M) === T &&
                ((ae = new ae(S, p + "enter", k, l, M)),
                (ae.target = z),
                (ae.relatedTarget = Oe),
                (D = ae)),
              (Oe = D),
              O && k)
            )
              t: {
                for (ae = Bv, S = O, p = k, z = 0, D = S; D; D = ae(D)) z++
                D = 0
                for (var P = p; P; P = ae(P)) D++
                for (; 0 < z - D; ) ((S = ae(S)), z--)
                for (; 0 < D - z; ) ((p = ae(p)), D--)
                for (; z--; ) {
                  if (S === p || (p !== null && S === p.alternate)) {
                    ae = S
                    break t
                  }
                  ;((S = ae(S)), (p = ae(p)))
                }
                ae = null
              }
            else ae = null
            ;(O !== null && Kd(U, R, O, ae, !1),
              k !== null && Oe !== null && Kd(U, Oe, k, ae, !0))
          }
        }
        e: {
          if (
            ((R = T ? an(T) : window),
            (O = R.nodeName && R.nodeName.toLowerCase()),
            O === "select" || (O === "input" && R.type === "file"))
          )
            var xe = os
          else if (cs(R))
            if (ss) xe = Jy
            else {
              xe = Zy
              var W = ky
            }
          else
            ((O = R.nodeName),
              !O ||
              O.toLowerCase() !== "input" ||
              (R.type !== "checkbox" && R.type !== "radio")
                ? T && Qi(T.elementType) && (xe = os)
                : (xe = Ky))
          if (xe && (xe = xe(e, T))) {
            rs(U, xe, l, M)
            break e
          }
          ;(W && W(e, R, T),
            e === "focusout" &&
              T &&
              R.type === "number" &&
              T.memoizedProps.value != null &&
              Xi(R, "number", R.value))
        }
        switch (((W = T ? an(T) : window), e)) {
          case "focusin":
            ;(cs(W) || W.contentEditable === "true") &&
              ((xa = W), (nc = T), (mn = null))
            break
          case "focusout":
            mn = nc = xa = null
            break
          case "mousedown":
            uc = !0
            break
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ;((uc = !1), ps(U, l, M))
            break
          case "selectionchange":
            if (Wy) break
          case "keydown":
          case "keyup":
            ps(U, l, M)
        }
        var re
        if (ec)
          e: {
            switch (e) {
              case "compositionstart":
                var ve = "onCompositionStart"
                break e
              case "compositionend":
                ve = "onCompositionEnd"
                break e
              case "compositionupdate":
                ve = "onCompositionUpdate"
                break e
            }
            ve = void 0
          }
        else
          Sa
            ? us(e, l) && (ve = "onCompositionEnd")
            : e === "keydown" &&
              l.keyCode === 229 &&
              (ve = "onCompositionStart")
        ;(ve &&
          (ls &&
            l.locale !== "ko" &&
            (Sa || ve !== "onCompositionStart"
              ? ve === "onCompositionEnd" && Sa && (re = Fo())
              : ((vl = M),
                ($i = "value" in vl ? vl.value : vl.textContent),
                (Sa = !0))),
          (W = ni(T, ve)),
          0 < W.length &&
            ((ve = new es(ve, e, null, l, M)),
            U.push({ event: ve, listeners: W }),
            re
              ? (ve.data = re)
              : ((re = is(l)), re !== null && (ve.data = re)))),
          (re = Yy ? Gy(e, l) : Vy(e, l)) &&
            ((ve = ni(T, "onBeforeInput")),
            0 < ve.length &&
              ((W = new es("onBeforeInput", "beforeinput", null, l, M)),
              U.push({ event: W, listeners: ve }),
              (W.data = re))),
          Uv(U, e, T, l, M))
      }
      kd(U, t)
    })
  }
  function Ln(e, t, l) {
    return { instance: e, listener: t, currentTarget: l }
  }
  function ni(e, t) {
    for (var l = t + "Capture", a = []; e !== null; ) {
      var n = e,
        u = n.stateNode
      if (
        ((n = n.tag),
        (n !== 5 && n !== 26 && n !== 27) ||
          u === null ||
          ((n = nn(e, l)),
          n != null && a.unshift(Ln(e, n, u)),
          (n = nn(e, t)),
          n != null && a.push(Ln(e, n, u))),
        e.tag === 3)
      )
        return a
      e = e.return
    }
    return []
  }
  function Bv(e) {
    if (e === null) return null
    do e = e.return
    while (e && e.tag !== 5 && e.tag !== 27)
    return e || null
  }
  function Kd(e, t, l, a, n) {
    for (var u = t._reactName, o = []; l !== null && l !== a; ) {
      var d = l,
        v = d.alternate,
        T = d.stateNode
      if (((d = d.tag), v !== null && v === a)) break
      ;((d !== 5 && d !== 26 && d !== 27) ||
        T === null ||
        ((v = T),
        n
          ? ((T = nn(l, u)), T != null && o.unshift(Ln(l, T, v)))
          : n || ((T = nn(l, u)), T != null && o.push(Ln(l, T, v)))),
        (l = l.return))
    }
    o.length !== 0 && e.push({ event: t, listeners: o })
  }
  var Lv = /\r\n?/g,
    qv = /\u0000|\uFFFD/g
  function Jd(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        Lv,
        `
`
      )
      .replace(qv, "")
  }
  function $d(e, t) {
    return ((t = Jd(t)), Jd(e) === t)
  }
  function Ce(e, t, l, a, n, u) {
    switch (l) {
      case "children":
        typeof a == "string"
          ? t === "body" || (t === "textarea" && a === "") || ga(e, a)
          : (typeof a == "number" || typeof a == "bigint") &&
            t !== "body" &&
            ga(e, "" + a)
        break
      case "className":
        ru(e, "class", a)
        break
      case "tabIndex":
        ru(e, "tabindex", a)
        break
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ru(e, l, a)
        break
      case "style":
        Jo(e, a, u)
        break
      case "data":
        if (t !== "object") {
          ru(e, "data", a)
          break
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || l !== "href")) {
          e.removeAttribute(l)
          break
        }
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "symbol" ||
          typeof a == "boolean"
        ) {
          e.removeAttribute(l)
          break
        }
        ;((a = su("" + a)), e.setAttribute(l, a))
        break
      case "action":
      case "formAction":
        if (typeof a == "function") {
          e.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          )
          break
        } else
          typeof u == "function" &&
            (l === "formAction"
              ? (t !== "input" && Ce(e, t, "name", n.name, n, null),
                Ce(e, t, "formEncType", n.formEncType, n, null),
                Ce(e, t, "formMethod", n.formMethod, n, null),
                Ce(e, t, "formTarget", n.formTarget, n, null))
              : (Ce(e, t, "encType", n.encType, n, null),
                Ce(e, t, "method", n.method, n, null),
                Ce(e, t, "target", n.target, n, null)))
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          e.removeAttribute(l)
          break
        }
        ;((a = su("" + a)), e.setAttribute(l, a))
        break
      case "onClick":
        a != null && (e.onclick = Zt)
        break
      case "onScroll":
        a != null && he("scroll", e)
        break
      case "onScrollEnd":
        a != null && he("scrollend", e)
        break
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(r(61))
          if (((l = a.__html), l != null)) {
            if (n.children != null) throw Error(r(60))
            e.innerHTML = l
          }
        }
        break
      case "multiple":
        e.multiple = a && typeof a != "function" && typeof a != "symbol"
        break
      case "muted":
        e.muted = a && typeof a != "function" && typeof a != "symbol"
        break
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break
      case "autoFocus":
        break
      case "xlinkHref":
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "boolean" ||
          typeof a == "symbol"
        ) {
          e.removeAttribute("xlink:href")
          break
        }
        ;((l = su("" + a)),
          e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", l))
        break
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol"
          ? e.setAttribute(l, "" + a)
          : e.removeAttribute(l)
        break
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol"
          ? e.setAttribute(l, "")
          : e.removeAttribute(l)
        break
      case "capture":
      case "download":
        a === !0
          ? e.setAttribute(l, "")
          : a !== !1 &&
              a != null &&
              typeof a != "function" &&
              typeof a != "symbol"
            ? e.setAttribute(l, a)
            : e.removeAttribute(l)
        break
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null &&
        typeof a != "function" &&
        typeof a != "symbol" &&
        !isNaN(a) &&
        1 <= a
          ? e.setAttribute(l, a)
          : e.removeAttribute(l)
        break
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a)
          ? e.removeAttribute(l)
          : e.setAttribute(l, a)
        break
      case "popover":
        ;(he("beforetoggle", e), he("toggle", e), cu(e, "popover", a))
        break
      case "xlinkActuate":
        kt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", a)
        break
      case "xlinkArcrole":
        kt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", a)
        break
      case "xlinkRole":
        kt(e, "http://www.w3.org/1999/xlink", "xlink:role", a)
        break
      case "xlinkShow":
        kt(e, "http://www.w3.org/1999/xlink", "xlink:show", a)
        break
      case "xlinkTitle":
        kt(e, "http://www.w3.org/1999/xlink", "xlink:title", a)
        break
      case "xlinkType":
        kt(e, "http://www.w3.org/1999/xlink", "xlink:type", a)
        break
      case "xmlBase":
        kt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", a)
        break
      case "xmlLang":
        kt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", a)
        break
      case "xmlSpace":
        kt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", a)
        break
      case "is":
        cu(e, "is", a)
        break
      case "innerText":
      case "textContent":
        break
      default:
        ;(!(2 < l.length) ||
          (l[0] !== "o" && l[0] !== "O") ||
          (l[1] !== "n" && l[1] !== "N")) &&
          ((l = my.get(l) || l), cu(e, l, a))
    }
  }
  function _r(e, t, l, a, n, u) {
    switch (l) {
      case "style":
        Jo(e, a, u)
        break
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(r(61))
          if (((l = a.__html), l != null)) {
            if (n.children != null) throw Error(r(60))
            e.innerHTML = l
          }
        }
        break
      case "children":
        typeof a == "string"
          ? ga(e, a)
          : (typeof a == "number" || typeof a == "bigint") && ga(e, "" + a)
        break
      case "onScroll":
        a != null && he("scroll", e)
        break
      case "onScrollEnd":
        a != null && he("scrollend", e)
        break
      case "onClick":
        a != null && (e.onclick = Zt)
        break
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break
      case "innerText":
      case "textContent":
        break
      default:
        if (!qo.hasOwnProperty(l))
          e: {
            if (
              l[0] === "o" &&
              l[1] === "n" &&
              ((n = l.endsWith("Capture")),
              (t = l.slice(2, n ? l.length - 7 : void 0)),
              (u = e[ut] || null),
              (u = u != null ? u[l] : null),
              typeof u == "function" && e.removeEventListener(t, u, n),
              typeof a == "function")
            ) {
              ;(typeof u != "function" &&
                u !== null &&
                (l in e
                  ? (e[l] = null)
                  : e.hasAttribute(l) && e.removeAttribute(l)),
                e.addEventListener(t, a, n))
              break e
            }
            l in e ? (e[l] = a) : a === !0 ? e.setAttribute(l, "") : cu(e, l, a)
          }
    }
  }
  function et(e, t, l) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break
      case "img":
        ;(he("error", e), he("load", e))
        var a = !1,
          n = !1,
          u
        for (u in l)
          if (l.hasOwnProperty(u)) {
            var o = l[u]
            if (o != null)
              switch (u) {
                case "src":
                  a = !0
                  break
                case "srcSet":
                  n = !0
                  break
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, t))
                default:
                  Ce(e, t, u, o, l, null)
              }
          }
        ;(n && Ce(e, t, "srcSet", l.srcSet, l, null),
          a && Ce(e, t, "src", l.src, l, null))
        return
      case "input":
        he("invalid", e)
        var d = (u = o = n = null),
          v = null,
          T = null
        for (a in l)
          if (l.hasOwnProperty(a)) {
            var M = l[a]
            if (M != null)
              switch (a) {
                case "name":
                  n = M
                  break
                case "type":
                  o = M
                  break
                case "checked":
                  v = M
                  break
                case "defaultChecked":
                  T = M
                  break
                case "value":
                  u = M
                  break
                case "defaultValue":
                  d = M
                  break
                case "children":
                case "dangerouslySetInnerHTML":
                  if (M != null) throw Error(r(137, t))
                  break
                default:
                  Ce(e, t, a, M, l, null)
              }
          }
        Qo(e, u, d, v, T, o, n, !1)
        return
      case "select":
        ;(he("invalid", e), (a = o = u = null))
        for (n in l)
          if (l.hasOwnProperty(n) && ((d = l[n]), d != null))
            switch (n) {
              case "value":
                u = d
                break
              case "defaultValue":
                o = d
                break
              case "multiple":
                a = d
              default:
                Ce(e, t, n, d, l, null)
            }
        ;((t = u),
          (l = o),
          (e.multiple = !!a),
          t != null ? va(e, !!a, t, !1) : l != null && va(e, !!a, l, !0))
        return
      case "textarea":
        ;(he("invalid", e), (u = n = a = null))
        for (o in l)
          if (l.hasOwnProperty(o) && ((d = l[o]), d != null))
            switch (o) {
              case "value":
                a = d
                break
              case "defaultValue":
                n = d
                break
              case "children":
                u = d
                break
              case "dangerouslySetInnerHTML":
                if (d != null) throw Error(r(91))
                break
              default:
                Ce(e, t, o, d, l, null)
            }
        Zo(e, a, n, u)
        return
      case "option":
        for (v in l)
          l.hasOwnProperty(v) &&
            ((a = l[v]), a != null) &&
            (v === "selected"
              ? (e.selected =
                  a && typeof a != "function" && typeof a != "symbol")
              : Ce(e, t, v, a, l, null))
        return
      case "dialog":
        ;(he("beforetoggle", e),
          he("toggle", e),
          he("cancel", e),
          he("close", e))
        break
      case "iframe":
      case "object":
        he("load", e)
        break
      case "video":
      case "audio":
        for (a = 0; a < Bn.length; a++) he(Bn[a], e)
        break
      case "image":
        ;(he("error", e), he("load", e))
        break
      case "details":
        he("toggle", e)
        break
      case "embed":
      case "source":
      case "link":
        ;(he("error", e), he("load", e))
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (T in l)
          if (l.hasOwnProperty(T) && ((a = l[T]), a != null))
            switch (T) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, t))
              default:
                Ce(e, t, T, a, l, null)
            }
        return
      default:
        if (Qi(t)) {
          for (M in l)
            l.hasOwnProperty(M) &&
              ((a = l[M]), a !== void 0 && _r(e, t, M, a, l, void 0))
          return
        }
    }
    for (d in l)
      l.hasOwnProperty(d) && ((a = l[d]), a != null && Ce(e, t, d, a, l, null))
  }
  function Yv(e, t, l, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break
      case "input":
        var n = null,
          u = null,
          o = null,
          d = null,
          v = null,
          T = null,
          M = null
        for (O in l) {
          var U = l[O]
          if (l.hasOwnProperty(O) && U != null)
            switch (O) {
              case "checked":
                break
              case "value":
                break
              case "defaultValue":
                v = U
              default:
                a.hasOwnProperty(O) || Ce(e, t, O, null, a, U)
            }
        }
        for (var R in a) {
          var O = a[R]
          if (((U = l[R]), a.hasOwnProperty(R) && (O != null || U != null)))
            switch (R) {
              case "type":
                u = O
                break
              case "name":
                n = O
                break
              case "checked":
                T = O
                break
              case "defaultChecked":
                M = O
                break
              case "value":
                o = O
                break
              case "defaultValue":
                d = O
                break
              case "children":
              case "dangerouslySetInnerHTML":
                if (O != null) throw Error(r(137, t))
                break
              default:
                O !== U && Ce(e, t, R, O, a, U)
            }
        }
        Vi(e, o, d, v, T, M, u, n)
        return
      case "select":
        O = o = d = R = null
        for (u in l)
          if (((v = l[u]), l.hasOwnProperty(u) && v != null))
            switch (u) {
              case "value":
                break
              case "multiple":
                O = v
              default:
                a.hasOwnProperty(u) || Ce(e, t, u, null, a, v)
            }
        for (n in a)
          if (
            ((u = a[n]),
            (v = l[n]),
            a.hasOwnProperty(n) && (u != null || v != null))
          )
            switch (n) {
              case "value":
                R = u
                break
              case "defaultValue":
                d = u
                break
              case "multiple":
                o = u
              default:
                u !== v && Ce(e, t, n, u, a, v)
            }
        ;((t = d),
          (l = o),
          (a = O),
          R != null
            ? va(e, !!l, R, !1)
            : !!a != !!l &&
              (t != null ? va(e, !!l, t, !0) : va(e, !!l, l ? [] : "", !1)))
        return
      case "textarea":
        O = R = null
        for (d in l)
          if (
            ((n = l[d]),
            l.hasOwnProperty(d) && n != null && !a.hasOwnProperty(d))
          )
            switch (d) {
              case "value":
                break
              case "children":
                break
              default:
                Ce(e, t, d, null, a, n)
            }
        for (o in a)
          if (
            ((n = a[o]),
            (u = l[o]),
            a.hasOwnProperty(o) && (n != null || u != null))
          )
            switch (o) {
              case "value":
                R = n
                break
              case "defaultValue":
                O = n
                break
              case "children":
                break
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(r(91))
                break
              default:
                n !== u && Ce(e, t, o, n, a, u)
            }
        ko(e, R, O)
        return
      case "option":
        for (var k in l)
          ((R = l[k]),
            l.hasOwnProperty(k) &&
              R != null &&
              !a.hasOwnProperty(k) &&
              (k === "selected" ? (e.selected = !1) : Ce(e, t, k, null, a, R)))
        for (v in a)
          ((R = a[v]),
            (O = l[v]),
            a.hasOwnProperty(v) &&
              R !== O &&
              (R != null || O != null) &&
              (v === "selected"
                ? (e.selected =
                    R && typeof R != "function" && typeof R != "symbol")
                : Ce(e, t, v, R, a, O)))
        return
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var ae in l)
          ((R = l[ae]),
            l.hasOwnProperty(ae) &&
              R != null &&
              !a.hasOwnProperty(ae) &&
              Ce(e, t, ae, null, a, R))
        for (T in a)
          if (
            ((R = a[T]),
            (O = l[T]),
            a.hasOwnProperty(T) && R !== O && (R != null || O != null))
          )
            switch (T) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (R != null) throw Error(r(137, t))
                break
              default:
                Ce(e, t, T, R, a, O)
            }
        return
      default:
        if (Qi(t)) {
          for (var Oe in l)
            ((R = l[Oe]),
              l.hasOwnProperty(Oe) &&
                R !== void 0 &&
                !a.hasOwnProperty(Oe) &&
                _r(e, t, Oe, void 0, a, R))
          for (M in a)
            ((R = a[M]),
              (O = l[M]),
              !a.hasOwnProperty(M) ||
                R === O ||
                (R === void 0 && O === void 0) ||
                _r(e, t, M, R, a, O))
          return
        }
    }
    for (var S in l)
      ((R = l[S]),
        l.hasOwnProperty(S) &&
          R != null &&
          !a.hasOwnProperty(S) &&
          Ce(e, t, S, null, a, R))
    for (U in a)
      ((R = a[U]),
        (O = l[U]),
        !a.hasOwnProperty(U) ||
          R === O ||
          (R == null && O == null) ||
          Ce(e, t, U, R, a, O))
  }
  function Wd(e) {
    switch (e) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0
      default:
        return !1
    }
  }
  function Gv() {
    if (typeof performance.getEntriesByType == "function") {
      for (
        var e = 0, t = 0, l = performance.getEntriesByType("resource"), a = 0;
        a < l.length;
        a++
      ) {
        var n = l[a],
          u = n.transferSize,
          o = n.initiatorType,
          d = n.duration
        if (u && d && Wd(o)) {
          for (o = 0, d = n.responseEnd, a += 1; a < l.length; a++) {
            var v = l[a],
              T = v.startTime
            if (T > d) break
            var M = v.transferSize,
              U = v.initiatorType
            M &&
              Wd(U) &&
              ((v = v.responseEnd), (o += M * (v < d ? 1 : (d - T) / (v - T))))
          }
          if ((--a, (t += (8 * (u + o)) / (n.duration / 1e3)), e++, 10 < e))
            break
        }
      }
      if (0 < e) return t / e / 1e6
    }
    return navigator.connection &&
      ((e = navigator.connection.downlink), typeof e == "number")
      ? e
      : 5
  }
  var Mr = null,
    Dr = null
  function ui(e) {
    return e.nodeType === 9 ? e : e.ownerDocument
  }
  function Fd(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1
      case "http://www.w3.org/1998/Math/MathML":
        return 2
      default:
        return 0
    }
  }
  function Id(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1
        case "math":
          return 2
        default:
          return 0
      }
    return e === 1 && t === "foreignObject" ? 0 : e
  }
  function Ur(e, t) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      typeof t.children == "bigint" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    )
  }
  var jr = null
  function Vv() {
    var e = window.event
    return e && e.type === "popstate"
      ? e === jr
        ? !1
        : ((jr = e), !0)
      : ((jr = null), !1)
  }
  var Pd = typeof setTimeout == "function" ? setTimeout : void 0,
    Xv = typeof clearTimeout == "function" ? clearTimeout : void 0,
    em = typeof Promise == "function" ? Promise : void 0,
    Qv =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof em < "u"
          ? function (e) {
              return em.resolve(null).then(e).catch(kv)
            }
          : Pd
  function kv(e) {
    setTimeout(function () {
      throw e
    })
  }
  function Ul(e) {
    return e === "head"
  }
  function tm(e, t) {
    var l = t,
      a = 0
    do {
      var n = l.nextSibling
      if ((e.removeChild(l), n && n.nodeType === 8))
        if (((l = n.data), l === "/$" || l === "/&")) {
          if (a === 0) {
            ;(e.removeChild(n), Ja(t))
            return
          }
          a--
        } else if (
          l === "$" ||
          l === "$?" ||
          l === "$~" ||
          l === "$!" ||
          l === "&"
        )
          a++
        else if (l === "html") qn(e.ownerDocument.documentElement)
        else if (l === "head") {
          ;((l = e.ownerDocument.head), qn(l))
          for (var u = l.firstChild; u; ) {
            var o = u.nextSibling,
              d = u.nodeName
            ;(u[ln] ||
              d === "SCRIPT" ||
              d === "STYLE" ||
              (d === "LINK" && u.rel.toLowerCase() === "stylesheet") ||
              l.removeChild(u),
              (u = o))
          }
        } else l === "body" && qn(e.ownerDocument.body)
      l = n
    } while (l)
    Ja(t)
  }
  function lm(e, t) {
    var l = e
    e = 0
    do {
      var a = l.nextSibling
      if (
        (l.nodeType === 1
          ? t
            ? ((l._stashedDisplay = l.style.display),
              (l.style.display = "none"))
            : ((l.style.display = l._stashedDisplay || ""),
              l.getAttribute("style") === "" && l.removeAttribute("style"))
          : l.nodeType === 3 &&
            (t
              ? ((l._stashedText = l.nodeValue), (l.nodeValue = ""))
              : (l.nodeValue = l._stashedText || "")),
        a && a.nodeType === 8)
      )
        if (((l = a.data), l === "/$")) {
          if (e === 0) break
          e--
        } else (l !== "$" && l !== "$?" && l !== "$~" && l !== "$!") || e++
      l = a
    } while (l)
  }
  function wr(e) {
    var t = e.firstChild
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t
      switch (((t = t.nextSibling), l.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          ;(wr(l), Yi(l))
          continue
        case "SCRIPT":
        case "STYLE":
          continue
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue
      }
      e.removeChild(l)
    }
  }
  function Zv(e, t, l, a) {
    for (; e.nodeType === 1; ) {
      var n = l
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (e.nodeName !== "INPUT" || e.type !== "hidden")) break
      } else if (a) {
        if (!e[ln])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break
              return e
            case "link":
              if (
                ((u = e.getAttribute("rel")),
                u === "stylesheet" && e.hasAttribute("data-precedence"))
              )
                break
              if (
                u !== n.rel ||
                e.getAttribute("href") !==
                  (n.href == null || n.href === "" ? null : n.href) ||
                e.getAttribute("crossorigin") !==
                  (n.crossOrigin == null ? null : n.crossOrigin) ||
                e.getAttribute("title") !== (n.title == null ? null : n.title)
              )
                break
              return e
            case "style":
              if (e.hasAttribute("data-precedence")) break
              return e
            case "script":
              if (
                ((u = e.getAttribute("src")),
                (u !== (n.src == null ? null : n.src) ||
                  e.getAttribute("type") !== (n.type == null ? null : n.type) ||
                  e.getAttribute("crossorigin") !==
                    (n.crossOrigin == null ? null : n.crossOrigin)) &&
                  u &&
                  e.hasAttribute("async") &&
                  !e.hasAttribute("itemprop"))
              )
                break
              return e
            default:
              return e
          }
      } else if (t === "input" && e.type === "hidden") {
        var u = n.name == null ? null : "" + n.name
        if (n.type === "hidden" && e.getAttribute("name") === u) return e
      } else return e
      if (((e = Dt(e.nextSibling)), e === null)) break
    }
    return null
  }
  function Kv(e, t, l) {
    if (t === "") return null
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !l) ||
        ((e = Dt(e.nextSibling)), e === null)
      )
        return null
    return e
  }
  function am(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !t) ||
        ((e = Dt(e.nextSibling)), e === null)
      )
        return null
    return e
  }
  function Hr(e) {
    return e.data === "$?" || e.data === "$~"
  }
  function Br(e) {
    return (
      e.data === "$!" ||
      (e.data === "$?" && e.ownerDocument.readyState !== "loading")
    )
  }
  function Jv(e, t) {
    var l = e.ownerDocument
    if (e.data === "$~") e._reactRetry = t
    else if (e.data !== "$?" || l.readyState !== "loading") t()
    else {
      var a = function () {
        ;(t(), l.removeEventListener("DOMContentLoaded", a))
      }
      ;(l.addEventListener("DOMContentLoaded", a), (e._reactRetry = a))
    }
  }
  function Dt(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType
      if (t === 1 || t === 3) break
      if (t === 8) {
        if (
          ((t = e.data),
          t === "$" ||
            t === "$!" ||
            t === "$?" ||
            t === "$~" ||
            t === "&" ||
            t === "F!" ||
            t === "F")
        )
          break
        if (t === "/$" || t === "/&") return null
      }
    }
    return e
  }
  var Lr = null
  function nm(e) {
    e = e.nextSibling
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data
        if (l === "/$" || l === "/&") {
          if (t === 0) return Dt(e.nextSibling)
          t--
        } else
          (l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&") ||
            t++
      }
      e = e.nextSibling
    }
    return null
  }
  function um(e) {
    e = e.previousSibling
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data
        if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
          if (t === 0) return e
          t--
        } else (l !== "/$" && l !== "/&") || t++
      }
      e = e.previousSibling
    }
    return null
  }
  function im(e, t, l) {
    switch (((t = ui(l)), e)) {
      case "html":
        if (((e = t.documentElement), !e)) throw Error(r(452))
        return e
      case "head":
        if (((e = t.head), !e)) throw Error(r(453))
        return e
      case "body":
        if (((e = t.body), !e)) throw Error(r(454))
        return e
      default:
        throw Error(r(451))
    }
  }
  function qn(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0])
    Yi(e)
  }
  var Ut = new Map(),
    cm = new Set()
  function ii(e) {
    return typeof e.getRootNode == "function"
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument
  }
  var rl = L.d
  L.d = { f: $v, r: Wv, D: Fv, C: Iv, L: Pv, m: eg, X: lg, S: tg, M: ag }
  function $v() {
    var e = rl.f(),
      t = Fu()
    return e || t
  }
  function Wv(e) {
    var t = ma(e)
    t !== null && t.tag === 5 && t.type === "form" ? Tf(t) : rl.r(e)
  }
  var ka = typeof document > "u" ? null : document
  function rm(e, t, l) {
    var a = ka
    if (a && typeof t == "string" && t) {
      var n = At(t)
      ;((n = 'link[rel="' + e + '"][href="' + n + '"]'),
        typeof l == "string" && (n += '[crossorigin="' + l + '"]'),
        cm.has(n) ||
          (cm.add(n),
          (e = { rel: e, crossOrigin: l, href: t }),
          a.querySelector(n) === null &&
            ((t = a.createElement("link")),
            et(t, "link", e),
            Je(t),
            a.head.appendChild(t))))
    }
  }
  function Fv(e) {
    ;(rl.D(e), rm("dns-prefetch", e, null))
  }
  function Iv(e, t) {
    ;(rl.C(e, t), rm("preconnect", e, t))
  }
  function Pv(e, t, l) {
    rl.L(e, t, l)
    var a = ka
    if (a && e && t) {
      var n = 'link[rel="preload"][as="' + At(t) + '"]'
      t === "image" && l && l.imageSrcSet
        ? ((n += '[imagesrcset="' + At(l.imageSrcSet) + '"]'),
          typeof l.imageSizes == "string" &&
            (n += '[imagesizes="' + At(l.imageSizes) + '"]'))
        : (n += '[href="' + At(e) + '"]')
      var u = n
      switch (t) {
        case "style":
          u = Za(e)
          break
        case "script":
          u = Ka(e)
      }
      Ut.has(u) ||
        ((e = E(
          {
            rel: "preload",
            href: t === "image" && l && l.imageSrcSet ? void 0 : e,
            as: t,
          },
          l
        )),
        Ut.set(u, e),
        a.querySelector(n) !== null ||
          (t === "style" && a.querySelector(Yn(u))) ||
          (t === "script" && a.querySelector(Gn(u))) ||
          ((t = a.createElement("link")),
          et(t, "link", e),
          Je(t),
          a.head.appendChild(t)))
    }
  }
  function eg(e, t) {
    rl.m(e, t)
    var l = ka
    if (l && e) {
      var a = t && typeof t.as == "string" ? t.as : "script",
        n =
          'link[rel="modulepreload"][as="' + At(a) + '"][href="' + At(e) + '"]',
        u = n
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Ka(e)
      }
      if (
        !Ut.has(u) &&
        ((e = E({ rel: "modulepreload", href: e }, t)),
        Ut.set(u, e),
        l.querySelector(n) === null)
      ) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(Gn(u))) return
        }
        ;((a = l.createElement("link")),
          et(a, "link", e),
          Je(a),
          l.head.appendChild(a))
      }
    }
  }
  function tg(e, t, l) {
    rl.S(e, t, l)
    var a = ka
    if (a && e) {
      var n = ha(a).hoistableStyles,
        u = Za(e)
      t = t || "default"
      var o = n.get(u)
      if (!o) {
        var d = { loading: 0, preload: null }
        if ((o = a.querySelector(Yn(u)))) d.loading = 5
        else {
          ;((e = E({ rel: "stylesheet", href: e, "data-precedence": t }, l)),
            (l = Ut.get(u)) && qr(e, l))
          var v = (o = a.createElement("link"))
          ;(Je(v),
            et(v, "link", e),
            (v._p = new Promise(function (T, M) {
              ;((v.onload = T), (v.onerror = M))
            })),
            v.addEventListener("load", function () {
              d.loading |= 1
            }),
            v.addEventListener("error", function () {
              d.loading |= 2
            }),
            (d.loading |= 4),
            ci(o, t, a))
        }
        ;((o = { type: "stylesheet", instance: o, count: 1, state: d }),
          n.set(u, o))
      }
    }
  }
  function lg(e, t) {
    rl.X(e, t)
    var l = ka
    if (l && e) {
      var a = ha(l).hoistableScripts,
        n = Ka(e),
        u = a.get(n)
      u ||
        ((u = l.querySelector(Gn(n))),
        u ||
          ((e = E({ src: e, async: !0 }, t)),
          (t = Ut.get(n)) && Yr(e, t),
          (u = l.createElement("script")),
          Je(u),
          et(u, "link", e),
          l.head.appendChild(u)),
        (u = { type: "script", instance: u, count: 1, state: null }),
        a.set(n, u))
    }
  }
  function ag(e, t) {
    rl.M(e, t)
    var l = ka
    if (l && e) {
      var a = ha(l).hoistableScripts,
        n = Ka(e),
        u = a.get(n)
      u ||
        ((u = l.querySelector(Gn(n))),
        u ||
          ((e = E({ src: e, async: !0, type: "module" }, t)),
          (t = Ut.get(n)) && Yr(e, t),
          (u = l.createElement("script")),
          Je(u),
          et(u, "link", e),
          l.head.appendChild(u)),
        (u = { type: "script", instance: u, count: 1, state: null }),
        a.set(n, u))
    }
  }
  function om(e, t, l, a) {
    var n = (n = te.current) ? ii(n) : null
    if (!n) throw Error(r(446))
    switch (e) {
      case "meta":
      case "title":
        return null
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string"
          ? ((t = Za(l.href)),
            (l = ha(n).hoistableStyles),
            (a = l.get(t)),
            a ||
              ((a = { type: "style", instance: null, count: 0, state: null }),
              l.set(t, a)),
            a)
          : { type: "void", instance: null, count: 0, state: null }
      case "link":
        if (
          l.rel === "stylesheet" &&
          typeof l.href == "string" &&
          typeof l.precedence == "string"
        ) {
          e = Za(l.href)
          var u = ha(n).hoistableStyles,
            o = u.get(e)
          if (
            (o ||
              ((n = n.ownerDocument || n),
              (o = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              u.set(e, o),
              (u = n.querySelector(Yn(e))) &&
                !u._p &&
                ((o.instance = u), (o.state.loading = 5)),
              Ut.has(e) ||
                ((l = {
                  rel: "preload",
                  as: "style",
                  href: l.href,
                  crossOrigin: l.crossOrigin,
                  integrity: l.integrity,
                  media: l.media,
                  hrefLang: l.hrefLang,
                  referrerPolicy: l.referrerPolicy,
                }),
                Ut.set(e, l),
                u || ng(n, e, l, o.state))),
            t && a === null)
          )
            throw Error(r(528, ""))
          return o
        }
        if (t && a !== null) throw Error(r(529, ""))
        return null
      case "script":
        return (
          (t = l.async),
          (l = l.src),
          typeof l == "string" &&
          t &&
          typeof t != "function" &&
          typeof t != "symbol"
            ? ((t = Ka(l)),
              (l = ha(n).hoistableScripts),
              (a = l.get(t)),
              a ||
                ((a = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                l.set(t, a)),
              a)
            : { type: "void", instance: null, count: 0, state: null }
        )
      default:
        throw Error(r(444, e))
    }
  }
  function Za(e) {
    return 'href="' + At(e) + '"'
  }
  function Yn(e) {
    return 'link[rel="stylesheet"][' + e + "]"
  }
  function sm(e) {
    return E({}, e, { "data-precedence": e.precedence, precedence: null })
  }
  function ng(e, t, l, a) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]")
      ? (a.loading = 1)
      : ((t = e.createElement("link")),
        (a.preload = t),
        t.addEventListener("load", function () {
          return (a.loading |= 1)
        }),
        t.addEventListener("error", function () {
          return (a.loading |= 2)
        }),
        et(t, "link", l),
        Je(t),
        e.head.appendChild(t))
  }
  function Ka(e) {
    return '[src="' + At(e) + '"]'
  }
  function Gn(e) {
    return "script[async]" + e
  }
  function fm(e, t, l) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var a = e.querySelector('style[data-href~="' + At(l.href) + '"]')
          if (a) return ((t.instance = a), Je(a), a)
          var n = E({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null,
          })
          return (
            (a = (e.ownerDocument || e).createElement("style")),
            Je(a),
            et(a, "style", n),
            ci(a, l.precedence, e),
            (t.instance = a)
          )
        case "stylesheet":
          n = Za(l.href)
          var u = e.querySelector(Yn(n))
          if (u) return ((t.state.loading |= 4), (t.instance = u), Je(u), u)
          ;((a = sm(l)),
            (n = Ut.get(n)) && qr(a, n),
            (u = (e.ownerDocument || e).createElement("link")),
            Je(u))
          var o = u
          return (
            (o._p = new Promise(function (d, v) {
              ;((o.onload = d), (o.onerror = v))
            })),
            et(u, "link", a),
            (t.state.loading |= 4),
            ci(u, l.precedence, e),
            (t.instance = u)
          )
        case "script":
          return (
            (u = Ka(l.src)),
            (n = e.querySelector(Gn(u)))
              ? ((t.instance = n), Je(n), n)
              : ((a = l),
                (n = Ut.get(u)) && ((a = E({}, l)), Yr(a, n)),
                (e = e.ownerDocument || e),
                (n = e.createElement("script")),
                Je(n),
                et(n, "link", a),
                e.head.appendChild(n),
                (t.instance = n))
          )
        case "void":
          return null
        default:
          throw Error(r(443, t.type))
      }
    else
      t.type === "stylesheet" &&
        (t.state.loading & 4) === 0 &&
        ((a = t.instance), (t.state.loading |= 4), ci(a, l.precedence, e))
    return t.instance
  }
  function ci(e, t, l) {
    for (
      var a = l.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ),
        n = a.length ? a[a.length - 1] : null,
        u = n,
        o = 0;
      o < a.length;
      o++
    ) {
      var d = a[o]
      if (d.dataset.precedence === t) u = d
      else if (u !== n) break
    }
    u
      ? u.parentNode.insertBefore(e, u.nextSibling)
      : ((t = l.nodeType === 9 ? l.head : l), t.insertBefore(e, t.firstChild))
  }
  function qr(e, t) {
    ;(e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title))
  }
  function Yr(e, t) {
    ;(e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity))
  }
  var ri = null
  function dm(e, t, l) {
    if (ri === null) {
      var a = new Map(),
        n = (ri = new Map())
      n.set(l, a)
    } else ((n = ri), (a = n.get(l)), a || ((a = new Map()), n.set(l, a)))
    if (a.has(e)) return a
    for (
      a.set(e, null), l = l.getElementsByTagName(e), n = 0;
      n < l.length;
      n++
    ) {
      var u = l[n]
      if (
        !(
          u[ln] ||
          u[We] ||
          (e === "link" && u.getAttribute("rel") === "stylesheet")
        ) &&
        u.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var o = u.getAttribute(t) || ""
        o = e + o
        var d = a.get(o)
        d ? d.push(u) : a.set(o, [u])
      }
    }
    return a
  }
  function mm(e, t, l) {
    ;((e = e.ownerDocument || e),
      e.head.insertBefore(
        l,
        t === "title" ? e.querySelector("head > title") : null
      ))
  }
  function ug(e, t, l) {
    if (l === 1 || t.itemProp != null) return !1
    switch (e) {
      case "meta":
      case "title":
        return !0
      case "style":
        if (
          typeof t.precedence != "string" ||
          typeof t.href != "string" ||
          t.href === ""
        )
          break
        return !0
      case "link":
        if (
          typeof t.rel != "string" ||
          typeof t.href != "string" ||
          t.href === "" ||
          t.onLoad ||
          t.onError
        )
          break
        return t.rel === "stylesheet"
          ? ((e = t.disabled), typeof t.precedence == "string" && e == null)
          : !0
      case "script":
        if (
          t.async &&
          typeof t.async != "function" &&
          typeof t.async != "symbol" &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == "string"
        )
          return !0
    }
    return !1
  }
  function hm(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0)
  }
  function ig(e, t, l, a) {
    if (
      l.type === "stylesheet" &&
      (typeof a.media != "string" || matchMedia(a.media).matches !== !1) &&
      (l.state.loading & 4) === 0
    ) {
      if (l.instance === null) {
        var n = Za(a.href),
          u = t.querySelector(Yn(n))
        if (u) {
          ;((t = u._p),
            t !== null &&
              typeof t == "object" &&
              typeof t.then == "function" &&
              (e.count++, (e = oi.bind(e)), t.then(e, e)),
            (l.state.loading |= 4),
            (l.instance = u),
            Je(u))
          return
        }
        ;((u = t.ownerDocument || t),
          (a = sm(a)),
          (n = Ut.get(n)) && qr(a, n),
          (u = u.createElement("link")),
          Je(u))
        var o = u
        ;((o._p = new Promise(function (d, v) {
          ;((o.onload = d), (o.onerror = v))
        })),
          et(u, "link", a),
          (l.instance = u))
      }
      ;(e.stylesheets === null && (e.stylesheets = new Map()),
        e.stylesheets.set(l, t),
        (t = l.state.preload) &&
          (l.state.loading & 3) === 0 &&
          (e.count++,
          (l = oi.bind(e)),
          t.addEventListener("load", l),
          t.addEventListener("error", l)))
    }
  }
  var Gr = 0
  function cg(e, t) {
    return (
      e.stylesheets && e.count === 0 && fi(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (l) {
            var a = setTimeout(function () {
              if ((e.stylesheets && fi(e, e.stylesheets), e.unsuspend)) {
                var u = e.unsuspend
                ;((e.unsuspend = null), u())
              }
            }, 6e4 + t)
            0 < e.imgBytes && Gr === 0 && (Gr = 62500 * Gv())
            var n = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 &&
                    (e.stylesheets && fi(e, e.stylesheets), e.unsuspend))
                ) {
                  var u = e.unsuspend
                  ;((e.unsuspend = null), u())
                }
              },
              (e.imgBytes > Gr ? 50 : 800) + t
            )
            return (
              (e.unsuspend = l),
              function () {
                ;((e.unsuspend = null), clearTimeout(a), clearTimeout(n))
              }
            )
          }
        : null
    )
  }
  function oi() {
    if (
      (this.count--,
      this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
    ) {
      if (this.stylesheets) fi(this, this.stylesheets)
      else if (this.unsuspend) {
        var e = this.unsuspend
        ;((this.unsuspend = null), e())
      }
    }
  }
  var si = null
  function fi(e, t) {
    ;((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++,
        (si = new Map()),
        t.forEach(rg, e),
        (si = null),
        oi.call(e)))
  }
  function rg(e, t) {
    if (!(t.state.loading & 4)) {
      var l = si.get(e)
      if (l) var a = l.get(null)
      else {
        ;((l = new Map()), si.set(e, l))
        for (
          var n = e.querySelectorAll(
              "link[data-precedence],style[data-precedence]"
            ),
            u = 0;
          u < n.length;
          u++
        ) {
          var o = n[u]
          ;(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") &&
            (l.set(o.dataset.precedence, o), (a = o))
        }
        a && l.set(null, a)
      }
      ;((n = t.instance),
        (o = n.getAttribute("data-precedence")),
        (u = l.get(o) || a),
        u === a && l.set(null, n),
        l.set(o, n),
        this.count++,
        (a = oi.bind(this)),
        n.addEventListener("load", a),
        n.addEventListener("error", a),
        u
          ? u.parentNode.insertBefore(n, u.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e),
            e.insertBefore(n, e.firstChild)),
        (t.state.loading |= 4))
    }
  }
  var Vn = {
    $$typeof: I,
    Provider: null,
    Consumer: null,
    _currentValue: le,
    _currentValue2: le,
    _threadCount: 0,
  }
  function og(e, t, l, a, n, u, o, d, v) {
    ;((this.tag = 1),
      (this.containerInfo = e),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = Hi(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Hi(0)),
      (this.hiddenUpdates = Hi(null)),
      (this.identifierPrefix = a),
      (this.onUncaughtError = n),
      (this.onCaughtError = u),
      (this.onRecoverableError = o),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = v),
      (this.incompleteTransitions = new Map()))
  }
  function ym(e, t, l, a, n, u, o, d, v, T, M, U) {
    return (
      (e = new og(e, t, l, o, v, T, M, U, d)),
      (t = 1),
      u === !0 && (t |= 24),
      (u = vt(3, null, null, t)),
      (e.current = u),
      (u.stateNode = e),
      (t = Sc()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (u.memoizedState = { element: a, isDehydrated: l, cache: t }),
      Tc(u),
      e
    )
  }
  function vm(e) {
    return e ? ((e = Ta), e) : Ta
  }
  function gm(e, t, l, a, n, u) {
    ;((n = vm(n)),
      a.context === null ? (a.context = n) : (a.pendingContext = n),
      (a = El(t)),
      (a.payload = { element: l }),
      (u = u === void 0 ? null : u),
      u !== null && (a.callback = u),
      (l = zl(e, a, t)),
      l !== null && (ft(l, e, t), Sn(l, e, t)))
  }
  function pm(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var l = e.retryLane
      e.retryLane = l !== 0 && l < t ? l : t
    }
  }
  function Vr(e, t) {
    ;(pm(e, t), (e = e.alternate) && pm(e, t))
  }
  function bm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Jl(e, 67108864)
      ;(t !== null && ft(t, e, 67108864), Vr(e, 67108864))
    }
  }
  function Sm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = xt()
      t = Bi(t)
      var l = Jl(e, t)
      ;(l !== null && ft(l, e, t), Vr(e, t))
    }
  }
  var di = !0
  function sg(e, t, l, a) {
    var n = _.T
    _.T = null
    var u = L.p
    try {
      ;((L.p = 2), Xr(e, t, l, a))
    } finally {
      ;((L.p = u), (_.T = n))
    }
  }
  function fg(e, t, l, a) {
    var n = _.T
    _.T = null
    var u = L.p
    try {
      ;((L.p = 8), Xr(e, t, l, a))
    } finally {
      ;((L.p = u), (_.T = n))
    }
  }
  function Xr(e, t, l, a) {
    if (di) {
      var n = Qr(a)
      if (n === null) (Nr(e, t, a, mi, l), Em(e, a))
      else if (mg(n, e, t, l, a)) a.stopPropagation()
      else if ((Em(e, a), t & 4 && -1 < dg.indexOf(e))) {
        for (; n !== null; ) {
          var u = ma(n)
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (((u = u.stateNode), u.current.memoizedState.isDehydrated)) {
                  var o = Xl(u.pendingLanes)
                  if (o !== 0) {
                    var d = u
                    for (d.pendingLanes |= 2, d.entangledLanes |= 2; o; ) {
                      var v = 1 << (31 - ht(o))
                      ;((d.entanglements[1] |= v), (o &= ~v))
                    }
                    ;(Vt(u), (ze & 6) === 0 && (($u = dt() + 500), Hn(0)))
                  }
                }
                break
              case 31:
              case 13:
                ;((d = Jl(u, 2)), d !== null && ft(d, u, 2), Fu(), Vr(u, 2))
            }
          if (((u = Qr(a)), u === null && Nr(e, t, a, mi, l), u === n)) break
          n = u
        }
        n !== null && a.stopPropagation()
      } else Nr(e, t, a, null, l)
    }
  }
  function Qr(e) {
    return ((e = Zi(e)), kr(e))
  }
  var mi = null
  function kr(e) {
    if (((mi = null), (e = da(e)), e !== null)) {
      var t = m(e)
      if (t === null) e = null
      else {
        var l = t.tag
        if (l === 13) {
          if (((e = y(t)), e !== null)) return e
          e = null
        } else if (l === 31) {
          if (((e = x(t)), e !== null)) return e
          e = null
        } else if (l === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null
          e = null
        } else t !== e && (e = null)
      }
    }
    return ((mi = e), null)
  }
  function xm(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8
      case "message":
        switch (Fh()) {
          case Oo:
            return 2
          case No:
            return 8
          case lu:
          case Ih:
            return 32
          case _o:
            return 268435456
          default:
            return 32
        }
      default:
        return 32
    }
  }
  var Zr = !1,
    jl = null,
    wl = null,
    Hl = null,
    Xn = new Map(),
    Qn = new Map(),
    Bl = [],
    dg =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " "
      )
  function Em(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        jl = null
        break
      case "dragenter":
      case "dragleave":
        wl = null
        break
      case "mouseover":
      case "mouseout":
        Hl = null
        break
      case "pointerover":
      case "pointerout":
        Xn.delete(t.pointerId)
        break
      case "gotpointercapture":
      case "lostpointercapture":
        Qn.delete(t.pointerId)
    }
  }
  function kn(e, t, l, a, n, u) {
    return e === null || e.nativeEvent !== u
      ? ((e = {
          blockedOn: t,
          domEventName: l,
          eventSystemFlags: a,
          nativeEvent: u,
          targetContainers: [n],
        }),
        t !== null && ((t = ma(t)), t !== null && bm(t)),
        e)
      : ((e.eventSystemFlags |= a),
        (t = e.targetContainers),
        n !== null && t.indexOf(n) === -1 && t.push(n),
        e)
  }
  function mg(e, t, l, a, n) {
    switch (t) {
      case "focusin":
        return ((jl = kn(jl, e, t, l, a, n)), !0)
      case "dragenter":
        return ((wl = kn(wl, e, t, l, a, n)), !0)
      case "mouseover":
        return ((Hl = kn(Hl, e, t, l, a, n)), !0)
      case "pointerover":
        var u = n.pointerId
        return (Xn.set(u, kn(Xn.get(u) || null, e, t, l, a, n)), !0)
      case "gotpointercapture":
        return (
          (u = n.pointerId), Qn.set(u, kn(Qn.get(u) || null, e, t, l, a, n)), !0
        )
    }
    return !1
  }
  function zm(e) {
    var t = da(e.target)
    if (t !== null) {
      var l = m(t)
      if (l !== null) {
        if (((t = l.tag), t === 13)) {
          if (((t = y(l)), t !== null)) {
            ;((e.blockedOn = t),
              Ho(e.priority, function () {
                Sm(l)
              }))
            return
          }
        } else if (t === 31) {
          if (((t = x(l)), t !== null)) {
            ;((e.blockedOn = t),
              Ho(e.priority, function () {
                Sm(l)
              }))
            return
          }
        } else if (t === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null
          return
        }
      }
    }
    e.blockedOn = null
  }
  function hi(e) {
    if (e.blockedOn !== null) return !1
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = Qr(e.nativeEvent)
      if (l === null) {
        l = e.nativeEvent
        var a = new l.constructor(l.type, l)
        ;((ki = a), l.target.dispatchEvent(a), (ki = null))
      } else return ((t = ma(l)), t !== null && bm(t), (e.blockedOn = l), !1)
      t.shift()
    }
    return !0
  }
  function Tm(e, t, l) {
    hi(e) && l.delete(t)
  }
  function hg() {
    ;((Zr = !1),
      jl !== null && hi(jl) && (jl = null),
      wl !== null && hi(wl) && (wl = null),
      Hl !== null && hi(Hl) && (Hl = null),
      Xn.forEach(Tm),
      Qn.forEach(Tm))
  }
  function yi(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Zr ||
        ((Zr = !0), i.unstable_scheduleCallback(i.unstable_NormalPriority, hg)))
  }
  var vi = null
  function Am(e) {
    vi !== e &&
      ((vi = e),
      i.unstable_scheduleCallback(i.unstable_NormalPriority, function () {
        vi === e && (vi = null)
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t],
            a = e[t + 1],
            n = e[t + 2]
          if (typeof a != "function") {
            if (kr(a || l) === null) continue
            break
          }
          var u = ma(l)
          u !== null &&
            (e.splice(t, 3),
            (t -= 3),
            Qc(u, { pending: !0, data: n, method: l.method, action: a }, a, n))
        }
      }))
  }
  function Ja(e) {
    function t(v) {
      return yi(v, e)
    }
    ;(jl !== null && yi(jl, e),
      wl !== null && yi(wl, e),
      Hl !== null && yi(Hl, e),
      Xn.forEach(t),
      Qn.forEach(t))
    for (var l = 0; l < Bl.length; l++) {
      var a = Bl[l]
      a.blockedOn === e && (a.blockedOn = null)
    }
    for (; 0 < Bl.length && ((l = Bl[0]), l.blockedOn === null); )
      (zm(l), l.blockedOn === null && Bl.shift())
    if (((l = (e.ownerDocument || e).$$reactFormReplay), l != null))
      for (a = 0; a < l.length; a += 3) {
        var n = l[a],
          u = l[a + 1],
          o = n[ut] || null
        if (typeof u == "function") o || Am(l)
        else if (o) {
          var d = null
          if (u && u.hasAttribute("formAction")) {
            if (((n = u), (o = u[ut] || null))) d = o.formAction
            else if (kr(n) !== null) continue
          } else d = o.action
          ;(typeof d == "function"
            ? (l[a + 1] = d)
            : (l.splice(a, 3), (a -= 3)),
            Am(l))
        }
      }
  }
  function Rm() {
    function e(u) {
      u.canIntercept &&
        u.info === "react-transition" &&
        u.intercept({
          handler: function () {
            return new Promise(function (o) {
              return (n = o)
            })
          },
          focusReset: "manual",
          scroll: "manual",
        })
    }
    function t() {
      ;(n !== null && (n(), (n = null)), a || setTimeout(l, 20))
    }
    function l() {
      if (!a && !navigation.transition) {
        var u = navigation.currentEntry
        u &&
          u.url != null &&
          navigation.navigate(u.url, {
            state: u.getState(),
            info: "react-transition",
            history: "replace",
          })
      }
    }
    if (typeof navigation == "object") {
      var a = !1,
        n = null
      return (
        navigation.addEventListener("navigate", e),
        navigation.addEventListener("navigatesuccess", t),
        navigation.addEventListener("navigateerror", t),
        setTimeout(l, 100),
        function () {
          ;((a = !0),
            navigation.removeEventListener("navigate", e),
            navigation.removeEventListener("navigatesuccess", t),
            navigation.removeEventListener("navigateerror", t),
            n !== null && (n(), (n = null)))
        }
      )
    }
  }
  function Kr(e) {
    this._internalRoot = e
  }
  ;((gi.prototype.render = Kr.prototype.render =
    function (e) {
      var t = this._internalRoot
      if (t === null) throw Error(r(409))
      var l = t.current,
        a = xt()
      gm(l, a, e, t, null, null)
    }),
    (gi.prototype.unmount = Kr.prototype.unmount =
      function () {
        var e = this._internalRoot
        if (e !== null) {
          this._internalRoot = null
          var t = e.containerInfo
          ;(gm(e.current, 2, null, e, null, null), Fu(), (t[fa] = null))
        }
      }))
  function gi(e) {
    this._internalRoot = e
  }
  gi.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = wo()
      e = { blockedOn: null, target: e, priority: t }
      for (var l = 0; l < Bl.length && t !== 0 && t < Bl[l].priority; l++);
      ;(Bl.splice(l, 0, e), l === 0 && zm(e))
    }
  }
  var Cm = c.version
  if (Cm !== "19.2.3") throw Error(r(527, Cm, "19.2.3"))
  L.findDOMNode = function (e) {
    var t = e._reactInternals
    if (t === void 0)
      throw typeof e.render == "function"
        ? Error(r(188))
        : ((e = Object.keys(e).join(",")), Error(r(268, e)))
    return (
      (e = h(t)),
      (e = e !== null ? C(e) : null),
      (e = e === null ? null : e.stateNode),
      e
    )
  }
  var yg = {
    bundleType: 0,
    version: "19.2.3",
    rendererPackageName: "react-dom",
    currentDispatcherRef: _,
    reconcilerVersion: "19.2.3",
  }
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var pi = __REACT_DEVTOOLS_GLOBAL_HOOK__
    if (!pi.isDisabled && pi.supportsFiber)
      try {
        ;((Pa = pi.inject(yg)), (mt = pi))
      } catch {}
  }
  return (
    (Kn.createRoot = function (e, t) {
      if (!f(e)) throw Error(r(299))
      var l = !1,
        a = "",
        n = jf,
        u = wf,
        o = Hf
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (l = !0),
          t.identifierPrefix !== void 0 && (a = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (n = t.onUncaughtError),
          t.onCaughtError !== void 0 && (u = t.onCaughtError),
          t.onRecoverableError !== void 0 && (o = t.onRecoverableError)),
        (t = ym(e, 1, !1, null, null, l, a, null, n, u, o, Rm)),
        (e[fa] = t.current),
        Or(e),
        new Kr(t)
      )
    }),
    (Kn.hydrateRoot = function (e, t, l) {
      if (!f(e)) throw Error(r(299))
      var a = !1,
        n = "",
        u = jf,
        o = wf,
        d = Hf,
        v = null
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (a = !0),
          l.identifierPrefix !== void 0 && (n = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (u = l.onUncaughtError),
          l.onCaughtError !== void 0 && (o = l.onCaughtError),
          l.onRecoverableError !== void 0 && (d = l.onRecoverableError),
          l.formState !== void 0 && (v = l.formState)),
        (t = ym(e, 1, !0, t, l ?? null, a, n, v, u, o, d, Rm)),
        (t.context = vm(null)),
        (l = t.current),
        (a = xt()),
        (a = Bi(a)),
        (n = El(a)),
        (n.callback = null),
        zl(l, n, a),
        (l = a),
        (t.current.lanes = l),
        tn(t, l),
        Vt(t),
        (e[fa] = t.current),
        Or(e),
        new gi(t)
      )
    }),
    (Kn.version = "19.2.3"),
    Kn
  )
}
var Bm
function Ng() {
  if (Bm) return Wr.exports
  Bm = 1
  function i() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i)
      } catch (c) {
        console.error(c)
      }
  }
  return (i(), (Wr.exports = Og()), Wr.exports)
}
var _g = Ng()
var Lm = "popstate"
function qm(i) {
  return (
    typeof i == "object" &&
    i != null &&
    "pathname" in i &&
    "search" in i &&
    "hash" in i &&
    "state" in i &&
    "key" in i
  )
}
function Mg(i = {}) {
  function c(r, f) {
    let m = f.state?.masked,
      { pathname: y, search: x, hash: g } = m || r.location
    return io(
      "",
      { pathname: y, search: x, hash: g },
      (f.state && f.state.usr) || null,
      (f.state && f.state.key) || "default",
      m
        ? {
            pathname: r.location.pathname,
            search: r.location.search,
            hash: r.location.hash,
          }
        : void 0
    )
  }
  function s(r, f) {
    return typeof f == "string" ? f : Fn(f)
  }
  return Ug(c, s, null, i)
}
function He(i, c) {
  if (i === !1 || i === null || typeof i > "u") throw new Error(c)
}
function Lt(i, c) {
  if (!i) {
    typeof console < "u" && console.warn(c)
    try {
      throw new Error(c)
    } catch {}
  }
}
function Dg() {
  return Math.random().toString(36).substring(2, 10)
}
function Ym(i, c) {
  return {
    usr: i.state,
    key: i.key,
    idx: c,
    masked: i.unstable_mask
      ? { pathname: i.pathname, search: i.search, hash: i.hash }
      : void 0,
  }
}
function io(i, c, s = null, r, f) {
  return {
    pathname: typeof i == "string" ? i : i.pathname,
    search: "",
    hash: "",
    ...(typeof c == "string" ? Wa(c) : c),
    state: s,
    key: (c && c.key) || r || Dg(),
    unstable_mask: f,
  }
}
function Fn({ pathname: i = "/", search: c = "", hash: s = "" }) {
  return (
    c && c !== "?" && (i += c.charAt(0) === "?" ? c : "?" + c),
    s && s !== "#" && (i += s.charAt(0) === "#" ? s : "#" + s),
    i
  )
}
function Wa(i) {
  let c = {}
  if (i) {
    let s = i.indexOf("#")
    s >= 0 && ((c.hash = i.substring(s)), (i = i.substring(0, s)))
    let r = i.indexOf("?")
    ;(r >= 0 && ((c.search = i.substring(r)), (i = i.substring(0, r))),
      i && (c.pathname = i))
  }
  return c
}
function Ug(i, c, s, r = {}) {
  let { window: f = document.defaultView, v5Compat: m = !1 } = r,
    y = f.history,
    x = "POP",
    g = null,
    h = C()
  h == null && ((h = 0), y.replaceState({ ...y.state, idx: h }, ""))
  function C() {
    return (y.state || { idx: null }).idx
  }
  function E() {
    x = "POP"
    let H = C(),
      $ = H == null ? null : H - h
    ;((h = H), g && g({ action: x, location: B.location, delta: $ }))
  }
  function w(H, $) {
    x = "PUSH"
    let ne = qm(H) ? H : io(B.location, H, $)
    h = C() + 1
    let I = Ym(ne, h),
      K = B.createHref(ne.unstable_mask || ne)
    try {
      y.pushState(I, "", K)
    } catch (fe) {
      if (fe instanceof DOMException && fe.name === "DataCloneError") throw fe
      f.location.assign(K)
    }
    m && g && g({ action: x, location: B.location, delta: 1 })
  }
  function q(H, $) {
    x = "REPLACE"
    let ne = qm(H) ? H : io(B.location, H, $)
    h = C()
    let I = Ym(ne, h),
      K = B.createHref(ne.unstable_mask || ne)
    ;(y.replaceState(I, "", K),
      m && g && g({ action: x, location: B.location, delta: 0 }))
  }
  function X(H) {
    return jg(H)
  }
  let B = {
    get action() {
      return x
    },
    get location() {
      return i(f, y)
    },
    listen(H) {
      if (g) throw new Error("A history only accepts one active listener")
      return (
        f.addEventListener(Lm, E),
        (g = H),
        () => {
          ;(f.removeEventListener(Lm, E), (g = null))
        }
      )
    },
    createHref(H) {
      return c(f, H)
    },
    createURL: X,
    encodeLocation(H) {
      let $ = X(H)
      return { pathname: $.pathname, search: $.search, hash: $.hash }
    },
    push: w,
    replace: q,
    go(H) {
      return y.go(H)
    },
  }
  return B
}
function jg(i, c = !1) {
  let s = "http://localhost"
  ;(typeof window < "u" &&
    (s =
      window.location.origin !== "null"
        ? window.location.origin
        : window.location.href),
    He(s, "No window.location.(origin|href) available to create URL"))
  let r = typeof i == "string" ? i : Fn(i)
  return (
    (r = r.replace(/ $/, "%20")),
    !c && r.startsWith("//") && (r = s + r),
    new URL(r, s)
  )
}
function ah(i, c, s = "/") {
  return wg(i, c, s, !1)
}
function wg(i, c, s, r) {
  let f = typeof c == "string" ? Wa(c) : c,
    m = sl(f.pathname || "/", s)
  if (m == null) return null
  let y = nh(i)
  Hg(y)
  let x = null
  for (let g = 0; x == null && g < y.length; ++g) {
    let h = Kg(m)
    x = kg(y[g], h, r)
  }
  return x
}
function nh(i, c = [], s = [], r = "", f = !1) {
  let m = (y, x, g = f, h) => {
    let C = {
      relativePath: h === void 0 ? y.path || "" : h,
      caseSensitive: y.caseSensitive === !0,
      childrenIndex: x,
      route: y,
    }
    if (C.relativePath.startsWith("/")) {
      if (!C.relativePath.startsWith(r) && g) return
      ;(He(
        C.relativePath.startsWith(r),
        `Absolute route path "${C.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (C.relativePath = C.relativePath.slice(r.length)))
    }
    let E = Xt([r, C.relativePath]),
      w = s.concat(C)
    ;(y.children &&
      y.children.length > 0 &&
      (He(
        y.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${E}".`
      ),
      nh(y.children, c, w, E, g)),
      !(y.path == null && !y.index) &&
        c.push({ path: E, score: Xg(E, y.index), routesMeta: w }))
  }
  return (
    i.forEach((y, x) => {
      if (y.path === "" || !y.path?.includes("?")) m(y, x)
      else for (let g of uh(y.path)) m(y, x, !0, g)
    }),
    c
  )
}
function uh(i) {
  let c = i.split("/")
  if (c.length === 0) return []
  let [s, ...r] = c,
    f = s.endsWith("?"),
    m = s.replace(/\?$/, "")
  if (r.length === 0) return f ? [m, ""] : [m]
  let y = uh(r.join("/")),
    x = []
  return (
    x.push(...y.map((g) => (g === "" ? m : [m, g].join("/")))),
    f && x.push(...y),
    x.map((g) => (i.startsWith("/") && g === "" ? "/" : g))
  )
}
function Hg(i) {
  i.sort((c, s) =>
    c.score !== s.score
      ? s.score - c.score
      : Qg(
          c.routesMeta.map((r) => r.childrenIndex),
          s.routesMeta.map((r) => r.childrenIndex)
        )
  )
}
var Bg = /^:[\w-]+$/,
  Lg = 3,
  qg = 2,
  Yg = 1,
  Gg = 10,
  Vg = -2,
  Gm = (i) => i === "*"
function Xg(i, c) {
  let s = i.split("/"),
    r = s.length
  return (
    s.some(Gm) && (r += Vg),
    c && (r += qg),
    s
      .filter((f) => !Gm(f))
      .reduce((f, m) => f + (Bg.test(m) ? Lg : m === "" ? Yg : Gg), r)
  )
}
function Qg(i, c) {
  return i.length === c.length && i.slice(0, -1).every((r, f) => r === c[f])
    ? i[i.length - 1] - c[c.length - 1]
    : 0
}
function kg(i, c, s = !1) {
  let { routesMeta: r } = i,
    f = {},
    m = "/",
    y = []
  for (let x = 0; x < r.length; ++x) {
    let g = r[x],
      h = x === r.length - 1,
      C = m === "/" ? c : c.slice(m.length) || "/",
      E = Ai(
        { path: g.relativePath, caseSensitive: g.caseSensitive, end: h },
        C
      ),
      w = g.route
    if (
      (!E &&
        h &&
        s &&
        !r[r.length - 1].route.index &&
        (E = Ai(
          { path: g.relativePath, caseSensitive: g.caseSensitive, end: !1 },
          C
        )),
      !E)
    )
      return null
    ;(Object.assign(f, E.params),
      y.push({
        params: f,
        pathname: Xt([m, E.pathname]),
        pathnameBase: Fg(Xt([m, E.pathnameBase])),
        route: w,
      }),
      E.pathnameBase !== "/" && (m = Xt([m, E.pathnameBase])))
  }
  return y
}
function Ai(i, c) {
  typeof i == "string" && (i = { path: i, caseSensitive: !1, end: !0 })
  let [s, r] = Zg(i.path, i.caseSensitive, i.end),
    f = c.match(s)
  if (!f) return null
  let m = f[0],
    y = m.replace(/(.)\/+$/, "$1"),
    x = f.slice(1)
  return {
    params: r.reduce((h, { paramName: C, isOptional: E }, w) => {
      if (C === "*") {
        let X = x[w] || ""
        y = m.slice(0, m.length - X.length).replace(/(.)\/+$/, "$1")
      }
      const q = x[w]
      return (
        E && !q ? (h[C] = void 0) : (h[C] = (q || "").replace(/%2F/g, "/")), h
      )
    }, {}),
    pathname: m,
    pathnameBase: y,
    pattern: i,
  }
}
function Zg(i, c = !1, s = !0) {
  Lt(
    i === "*" || !i.endsWith("*") || i.endsWith("/*"),
    `Route path "${i}" will be treated as if it were "${i.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${i.replace(/\*$/, "/*")}".`
  )
  let r = [],
    f =
      "^" +
      i
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(/\/:([\w-]+)(\?)?/g, (y, x, g, h, C) => {
          if ((r.push({ paramName: x, isOptional: g != null }), g)) {
            let E = C.charAt(h + y.length)
            return E && E !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?"
          }
          return "/([^\\/]+)"
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2")
  return (
    i.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (f += i === "*" || i === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : s
        ? (f += "\\/*$")
        : i !== "" && i !== "/" && (f += "(?:(?=\\/|$))"),
    [new RegExp(f, c ? void 0 : "i"), r]
  )
}
function Kg(i) {
  try {
    return i
      .split("/")
      .map((c) => decodeURIComponent(c).replace(/\//g, "%2F"))
      .join("/")
  } catch (c) {
    return (
      Lt(
        !1,
        `The URL path "${i}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${c}).`
      ),
      i
    )
  }
}
function sl(i, c) {
  if (c === "/") return i
  if (!i.toLowerCase().startsWith(c.toLowerCase())) return null
  let s = c.endsWith("/") ? c.length - 1 : c.length,
    r = i.charAt(s)
  return r && r !== "/" ? null : i.slice(s) || "/"
}
var Jg = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i
function $g(i, c = "/") {
  let {
      pathname: s,
      search: r = "",
      hash: f = "",
    } = typeof i == "string" ? Wa(i) : i,
    m
  return (
    s
      ? ((s = s.replace(/\/\/+/g, "/")),
        s.startsWith("/") ? (m = Vm(s.substring(1), "/")) : (m = Vm(s, c)))
      : (m = c),
    { pathname: m, search: Ig(r), hash: Pg(f) }
  )
}
function Vm(i, c) {
  let s = c.replace(/\/+$/, "").split("/")
  return (
    i.split("/").forEach((f) => {
      f === ".." ? s.length > 1 && s.pop() : f !== "." && s.push(f)
    }),
    s.length > 1 ? s.join("/") : "/"
  )
}
function eo(i, c, s, r) {
  return `Cannot include a '${i}' character in a manually specified \`to.${c}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${s}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`
}
function Wg(i) {
  return i.filter(
    (c, s) => s === 0 || (c.route.path && c.route.path.length > 0)
  )
}
function ho(i) {
  let c = Wg(i)
  return c.map((s, r) => (r === c.length - 1 ? s.pathname : s.pathnameBase))
}
function Oi(i, c, s, r = !1) {
  let f
  typeof i == "string"
    ? (f = Wa(i))
    : ((f = { ...i }),
      He(
        !f.pathname || !f.pathname.includes("?"),
        eo("?", "pathname", "search", f)
      ),
      He(
        !f.pathname || !f.pathname.includes("#"),
        eo("#", "pathname", "hash", f)
      ),
      He(!f.search || !f.search.includes("#"), eo("#", "search", "hash", f)))
  let m = i === "" || f.pathname === "",
    y = m ? "/" : f.pathname,
    x
  if (y == null) x = s
  else {
    let E = c.length - 1
    if (!r && y.startsWith("..")) {
      let w = y.split("/")
      for (; w[0] === ".."; ) (w.shift(), (E -= 1))
      f.pathname = w.join("/")
    }
    x = E >= 0 ? c[E] : "/"
  }
  let g = $g(f, x),
    h = y && y !== "/" && y.endsWith("/"),
    C = (m || y === ".") && s.endsWith("/")
  return (!g.pathname.endsWith("/") && (h || C) && (g.pathname += "/"), g)
}
var Xt = (i) => i.join("/").replace(/\/\/+/g, "/"),
  Fg = (i) => i.replace(/\/+$/, "").replace(/^\/*/, "/"),
  Ig = (i) => (!i || i === "?" ? "" : i.startsWith("?") ? i : "?" + i),
  Pg = (i) => (!i || i === "#" ? "" : i.startsWith("#") ? i : "#" + i),
  ep = class {
    constructor(i, c, s, r = !1) {
      ;((this.status = i),
        (this.statusText = c || ""),
        (this.internal = r),
        s instanceof Error
          ? ((this.data = s.toString()), (this.error = s))
          : (this.data = s))
    }
  }
function tp(i) {
  return (
    i != null &&
    typeof i.status == "number" &&
    typeof i.statusText == "string" &&
    typeof i.internal == "boolean" &&
    "data" in i
  )
}
function lp(i) {
  return (
    i
      .map((c) => c.route.path)
      .filter(Boolean)
      .join("/")
      .replace(/\/\/*/g, "/") || "/"
  )
}
var ih =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u"
function ch(i, c) {
  let s = i
  if (typeof s != "string" || !Jg.test(s))
    return { absoluteURL: void 0, isExternal: !1, to: s }
  let r = s,
    f = !1
  if (ih)
    try {
      let m = new URL(window.location.href),
        y = s.startsWith("//") ? new URL(m.protocol + s) : new URL(s),
        x = sl(y.pathname, c)
      y.origin === m.origin && x != null
        ? (s = x + y.search + y.hash)
        : (f = !0)
    } catch {
      Lt(
        !1,
        `<Link to="${s}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      )
    }
  return { absoluteURL: r, isExternal: f, to: s }
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0")
var rh = ["POST", "PUT", "PATCH", "DELETE"]
new Set(rh)
var ap = ["GET", ...rh]
new Set(ap)
var Fa = A.createContext(null)
Fa.displayName = "DataRouter"
var Ni = A.createContext(null)
Ni.displayName = "DataRouterState"
var np = A.createContext(!1),
  oh = A.createContext({ isTransitioning: !1 })
oh.displayName = "ViewTransition"
var up = A.createContext(new Map())
up.displayName = "Fetchers"
var ip = A.createContext(null)
ip.displayName = "Await"
var Et = A.createContext(null)
Et.displayName = "Navigation"
var eu = A.createContext(null)
eu.displayName = "Location"
var jt = A.createContext({ outlet: null, matches: [], isDataRoute: !1 })
jt.displayName = "Route"
var yo = A.createContext(null)
yo.displayName = "RouteError"
var sh = "REACT_ROUTER_ERROR",
  cp = "REDIRECT",
  rp = "ROUTE_ERROR_RESPONSE"
function op(i) {
  if (i.startsWith(`${sh}:${cp}:{`))
    try {
      let c = JSON.parse(i.slice(28))
      if (
        typeof c == "object" &&
        c &&
        typeof c.status == "number" &&
        typeof c.statusText == "string" &&
        typeof c.location == "string" &&
        typeof c.reloadDocument == "boolean" &&
        typeof c.replace == "boolean"
      )
        return c
    } catch {}
}
function sp(i) {
  if (i.startsWith(`${sh}:${rp}:{`))
    try {
      let c = JSON.parse(i.slice(40))
      if (
        typeof c == "object" &&
        c &&
        typeof c.status == "number" &&
        typeof c.statusText == "string"
      )
        return new ep(c.status, c.statusText, c.data)
    } catch {}
}
function fp(i, { relative: c } = {}) {
  He(Ia(), "useHref() may be used only in the context of a <Router> component.")
  let { basename: s, navigator: r } = A.useContext(Et),
    { hash: f, pathname: m, search: y } = tu(i, { relative: c }),
    x = m
  return (
    s !== "/" && (x = m === "/" ? s : Xt([s, m])),
    r.createHref({ pathname: x, search: y, hash: f })
  )
}
function Ia() {
  return A.useContext(eu) != null
}
function fl() {
  return (
    He(
      Ia(),
      "useLocation() may be used only in the context of a <Router> component."
    ),
    A.useContext(eu).location
  )
}
var fh =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered."
function dh(i) {
  A.useContext(Et).static || A.useLayoutEffect(i)
}
function mh() {
  let { isDataRoute: i } = A.useContext(jt)
  return i ? Cp() : dp()
}
function dp() {
  He(
    Ia(),
    "useNavigate() may be used only in the context of a <Router> component."
  )
  let i = A.useContext(Fa),
    { basename: c, navigator: s } = A.useContext(Et),
    { matches: r } = A.useContext(jt),
    { pathname: f } = fl(),
    m = JSON.stringify(ho(r)),
    y = A.useRef(!1)
  return (
    dh(() => {
      y.current = !0
    }),
    A.useCallback(
      (g, h = {}) => {
        if ((Lt(y.current, fh), !y.current)) return
        if (typeof g == "number") {
          s.go(g)
          return
        }
        let C = Oi(g, JSON.parse(m), f, h.relative === "path")
        ;(i == null &&
          c !== "/" &&
          (C.pathname = C.pathname === "/" ? c : Xt([c, C.pathname])),
          (h.replace ? s.replace : s.push)(C, h.state, h))
      },
      [c, s, m, f, i]
    )
  )
}
var mp = A.createContext(null)
function hp(i) {
  let c = A.useContext(jt).outlet
  return A.useMemo(
    () => c && A.createElement(mp.Provider, { value: i }, c),
    [c, i]
  )
}
function yp() {
  let { matches: i } = A.useContext(jt),
    c = i[i.length - 1]
  return c ? c.params : {}
}
function tu(i, { relative: c } = {}) {
  let { matches: s } = A.useContext(jt),
    { pathname: r } = fl(),
    f = JSON.stringify(ho(s))
  return A.useMemo(() => Oi(i, JSON.parse(f), r, c === "path"), [i, f, r, c])
}
function vp(i, c) {
  return hh(i, c)
}
function hh(i, c, s) {
  He(
    Ia(),
    "useRoutes() may be used only in the context of a <Router> component."
  )
  let { navigator: r } = A.useContext(Et),
    { matches: f } = A.useContext(jt),
    m = f[f.length - 1],
    y = m ? m.params : {},
    x = m ? m.pathname : "/",
    g = m ? m.pathnameBase : "/",
    h = m && m.route
  {
    let H = (h && h.path) || ""
    vh(
      x,
      !h || H.endsWith("*") || H.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${x}" (under <Route path="${H}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${H}"> to <Route path="${H === "/" ? "*" : `${H}/*`}">.`
    )
  }
  let C = fl(),
    E
  if (c) {
    let H = typeof c == "string" ? Wa(c) : c
    ;(He(
      g === "/" || H.pathname?.startsWith(g),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${g}" but pathname "${H.pathname}" was given in the \`location\` prop.`
    ),
      (E = H))
  } else E = C
  let w = E.pathname || "/",
    q = w
  if (g !== "/") {
    let H = g.replace(/^\//, "").split("/")
    q = "/" + w.replace(/^\//, "").split("/").slice(H.length).join("/")
  }
  let X = ah(i, { pathname: q })
  ;(Lt(
    h || X != null,
    `No routes matched location "${E.pathname}${E.search}${E.hash}" `
  ),
    Lt(
      X == null ||
        X[X.length - 1].route.element !== void 0 ||
        X[X.length - 1].route.Component !== void 0 ||
        X[X.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${E.pathname}${E.search}${E.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ))
  let B = xp(
    X &&
      X.map((H) =>
        Object.assign({}, H, {
          params: Object.assign({}, y, H.params),
          pathname: Xt([
            g,
            r.encodeLocation
              ? r.encodeLocation(
                  H.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23")
                ).pathname
              : H.pathname,
          ]),
          pathnameBase:
            H.pathnameBase === "/"
              ? g
              : Xt([
                  g,
                  r.encodeLocation
                    ? r.encodeLocation(
                        H.pathnameBase
                          .replace(/\?/g, "%3F")
                          .replace(/#/g, "%23")
                      ).pathname
                    : H.pathnameBase,
                ]),
        })
      ),
    f,
    s
  )
  return c && B
    ? A.createElement(
        eu.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              unstable_mask: void 0,
              ...E,
            },
            navigationType: "POP",
          },
        },
        B
      )
    : B
}
function gp() {
  let i = Rp(),
    c = tp(i)
      ? `${i.status} ${i.statusText}`
      : i instanceof Error
        ? i.message
        : JSON.stringify(i),
    s = i instanceof Error ? i.stack : null,
    r = "rgba(200,200,200, 0.5)",
    f = { padding: "0.5rem", backgroundColor: r },
    m = { padding: "2px 4px", backgroundColor: r },
    y = null
  return (
    console.error("Error handled by React Router default ErrorBoundary:", i),
    (y = A.createElement(
      A.Fragment,
      null,
      A.createElement("p", null, "💿 Hey developer 👋"),
      A.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        A.createElement("code", { style: m }, "ErrorBoundary"),
        " or",
        " ",
        A.createElement("code", { style: m }, "errorElement"),
        " prop on your route."
      )
    )),
    A.createElement(
      A.Fragment,
      null,
      A.createElement("h2", null, "Unexpected Application Error!"),
      A.createElement("h3", { style: { fontStyle: "italic" } }, c),
      s ? A.createElement("pre", { style: f }, s) : null,
      y
    )
  )
}
var pp = A.createElement(gp, null),
  yh = class extends A.Component {
    constructor(i) {
      ;(super(i),
        (this.state = {
          location: i.location,
          revalidation: i.revalidation,
          error: i.error,
        }))
    }
    static getDerivedStateFromError(i) {
      return { error: i }
    }
    static getDerivedStateFromProps(i, c) {
      return c.location !== i.location ||
        (c.revalidation !== "idle" && i.revalidation === "idle")
        ? { error: i.error, location: i.location, revalidation: i.revalidation }
        : {
            error: i.error !== void 0 ? i.error : c.error,
            location: c.location,
            revalidation: i.revalidation || c.revalidation,
          }
    }
    componentDidCatch(i, c) {
      this.props.onError
        ? this.props.onError(i, c)
        : console.error(
            "React Router caught the following error during render",
            i
          )
    }
    render() {
      let i = this.state.error
      if (
        this.context &&
        typeof i == "object" &&
        i &&
        "digest" in i &&
        typeof i.digest == "string"
      ) {
        const s = sp(i.digest)
        s && (i = s)
      }
      let c =
        i !== void 0
          ? A.createElement(
              jt.Provider,
              { value: this.props.routeContext },
              A.createElement(yo.Provider, {
                value: i,
                children: this.props.component,
              })
            )
          : this.props.children
      return this.context ? A.createElement(bp, { error: i }, c) : c
    }
  }
yh.contextType = np
var to = new WeakMap()
function bp({ children: i, error: c }) {
  let { basename: s } = A.useContext(Et)
  if (
    typeof c == "object" &&
    c &&
    "digest" in c &&
    typeof c.digest == "string"
  ) {
    let r = op(c.digest)
    if (r) {
      let f = to.get(c)
      if (f) throw f
      let m = ch(r.location, s)
      if (ih && !to.get(c))
        if (m.isExternal || r.reloadDocument)
          window.location.href = m.absoluteURL || m.to
        else {
          const y = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(m.to, {
              replace: r.replace,
            })
          )
          throw (to.set(c, y), y)
        }
      return A.createElement("meta", {
        httpEquiv: "refresh",
        content: `0;url=${m.absoluteURL || m.to}`,
      })
    }
  }
  return i
}
function Sp({ routeContext: i, match: c, children: s }) {
  let r = A.useContext(Fa)
  return (
    r &&
      r.static &&
      r.staticContext &&
      (c.route.errorElement || c.route.ErrorBoundary) &&
      (r.staticContext._deepestRenderedBoundaryId = c.route.id),
    A.createElement(jt.Provider, { value: i }, s)
  )
}
function xp(i, c = [], s) {
  let r = s?.state
  if (i == null) {
    if (!r) return null
    if (r.errors) i = r.matches
    else if (c.length === 0 && !r.initialized && r.matches.length > 0)
      i = r.matches
    else return null
  }
  let f = i,
    m = r?.errors
  if (m != null) {
    let C = f.findIndex((E) => E.route.id && m?.[E.route.id] !== void 0)
    ;(He(
      C >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(m).join(",")}`
    ),
      (f = f.slice(0, Math.min(f.length, C + 1))))
  }
  let y = !1,
    x = -1
  if (s && r) {
    y = r.renderFallback
    for (let C = 0; C < f.length; C++) {
      let E = f[C]
      if (
        ((E.route.HydrateFallback || E.route.hydrateFallbackElement) && (x = C),
        E.route.id)
      ) {
        let { loaderData: w, errors: q } = r,
          X =
            E.route.loader &&
            !w.hasOwnProperty(E.route.id) &&
            (!q || q[E.route.id] === void 0)
        if (E.route.lazy || X) {
          ;(s.isStatic && (y = !0),
            x >= 0 ? (f = f.slice(0, x + 1)) : (f = [f[0]]))
          break
        }
      }
    }
  }
  let g = s?.onError,
    h =
      r && g
        ? (C, E) => {
            g(C, {
              location: r.location,
              params: r.matches?.[0]?.params ?? {},
              unstable_pattern: lp(r.matches),
              errorInfo: E,
            })
          }
        : void 0
  return f.reduceRight((C, E, w) => {
    let q,
      X = !1,
      B = null,
      H = null
    r &&
      ((q = m && E.route.id ? m[E.route.id] : void 0),
      (B = E.route.errorElement || pp),
      y &&
        (x < 0 && w === 0
          ? (vh(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration"
            ),
            (X = !0),
            (H = null))
          : x === w &&
            ((X = !0), (H = E.route.hydrateFallbackElement || null))))
    let $ = c.concat(f.slice(0, w + 1)),
      ne = () => {
        let I
        return (
          q
            ? (I = B)
            : X
              ? (I = H)
              : E.route.Component
                ? (I = A.createElement(E.route.Component, null))
                : E.route.element
                  ? (I = E.route.element)
                  : (I = C),
          A.createElement(Sp, {
            match: E,
            routeContext: { outlet: C, matches: $, isDataRoute: r != null },
            children: I,
          })
        )
      }
    return r && (E.route.ErrorBoundary || E.route.errorElement || w === 0)
      ? A.createElement(yh, {
          location: r.location,
          revalidation: r.revalidation,
          component: B,
          error: q,
          children: ne(),
          routeContext: { outlet: null, matches: $, isDataRoute: !0 },
          onError: h,
        })
      : ne()
  }, null)
}
function vo(i) {
  return `${i} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}
function Ep(i) {
  let c = A.useContext(Fa)
  return (He(c, vo(i)), c)
}
function zp(i) {
  let c = A.useContext(Ni)
  return (He(c, vo(i)), c)
}
function Tp(i) {
  let c = A.useContext(jt)
  return (He(c, vo(i)), c)
}
function go(i) {
  let c = Tp(i),
    s = c.matches[c.matches.length - 1]
  return (
    He(
      s.route.id,
      `${i} can only be used on routes that contain a unique "id"`
    ),
    s.route.id
  )
}
function Ap() {
  return go("useRouteId")
}
function Rp() {
  let i = A.useContext(yo),
    c = zp("useRouteError"),
    s = go("useRouteError")
  return i !== void 0 ? i : c.errors?.[s]
}
function Cp() {
  let { router: i } = Ep("useNavigate"),
    c = go("useNavigate"),
    s = A.useRef(!1)
  return (
    dh(() => {
      s.current = !0
    }),
    A.useCallback(
      async (f, m = {}) => {
        ;(Lt(s.current, fh),
          s.current &&
            (typeof f == "number"
              ? await i.navigate(f)
              : await i.navigate(f, { fromRouteId: c, ...m })))
      },
      [i, c]
    )
  )
}
var Xm = {}
function vh(i, c, s) {
  !c && !Xm[i] && ((Xm[i] = !0), Lt(!1, s))
}
A.memo(Op)
function Op({ routes: i, future: c, state: s, isStatic: r, onError: f }) {
  return hh(i, void 0, { state: s, isStatic: r, onError: f })
}
function Np({ to: i, replace: c, state: s, relative: r }) {
  He(
    Ia(),
    "<Navigate> may be used only in the context of a <Router> component."
  )
  let { static: f } = A.useContext(Et)
  Lt(
    !f,
    "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change."
  )
  let { matches: m } = A.useContext(jt),
    { pathname: y } = fl(),
    x = mh(),
    g = Oi(i, ho(m), y, r === "path"),
    h = JSON.stringify(g)
  return (
    A.useEffect(() => {
      x(JSON.parse(h), { replace: c, state: s, relative: r })
    }, [x, h, r, c, s]),
    null
  )
}
function _p(i) {
  return hp(i.context)
}
function ra(i) {
  He(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>."
  )
}
function Mp({
  basename: i = "/",
  children: c = null,
  location: s,
  navigationType: r = "POP",
  navigator: f,
  static: m = !1,
  unstable_useTransitions: y,
}) {
  He(
    !Ia(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  )
  let x = i.replace(/^\/*/, "/"),
    g = A.useMemo(
      () => ({
        basename: x,
        navigator: f,
        static: m,
        unstable_useTransitions: y,
        future: {},
      }),
      [x, f, m, y]
    )
  typeof s == "string" && (s = Wa(s))
  let {
      pathname: h = "/",
      search: C = "",
      hash: E = "",
      state: w = null,
      key: q = "default",
      unstable_mask: X,
    } = s,
    B = A.useMemo(() => {
      let H = sl(h, x)
      return H == null
        ? null
        : {
            location: {
              pathname: H,
              search: C,
              hash: E,
              state: w,
              key: q,
              unstable_mask: X,
            },
            navigationType: r,
          }
    }, [x, h, C, E, w, q, r, X])
  return (
    Lt(
      B != null,
      `<Router basename="${x}"> is not able to match the URL "${h}${C}${E}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    B == null
      ? null
      : A.createElement(
          Et.Provider,
          { value: g },
          A.createElement(eu.Provider, { children: c, value: B })
        )
  )
}
function Dp({ children: i, location: c }) {
  return vp(co(i), c)
}
function co(i, c = []) {
  let s = []
  return (
    A.Children.forEach(i, (r, f) => {
      if (!A.isValidElement(r)) return
      let m = [...c, f]
      if (r.type === A.Fragment) {
        s.push.apply(s, co(r.props.children, m))
        return
      }
      ;(He(
        r.type === ra,
        `[${typeof r.type == "string" ? r.type : r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        He(
          !r.props.index || !r.props.children,
          "An index route cannot have child routes."
        ))
      let y = {
        id: r.props.id || m.join("-"),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        middleware: r.props.middleware,
        loader: r.props.loader,
        action: r.props.action,
        hydrateFallbackElement: r.props.hydrateFallbackElement,
        HydrateFallback: r.props.HydrateFallback,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.hasErrorBoundary === !0 ||
          r.props.ErrorBoundary != null ||
          r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      }
      ;(r.props.children && (y.children = co(r.props.children, m)), s.push(y))
    }),
    s
  )
}
var Ei = "get",
  zi = "application/x-www-form-urlencoded"
function _i(i) {
  return typeof HTMLElement < "u" && i instanceof HTMLElement
}
function Up(i) {
  return _i(i) && i.tagName.toLowerCase() === "button"
}
function jp(i) {
  return _i(i) && i.tagName.toLowerCase() === "form"
}
function wp(i) {
  return _i(i) && i.tagName.toLowerCase() === "input"
}
function Hp(i) {
  return !!(i.metaKey || i.altKey || i.ctrlKey || i.shiftKey)
}
function Bp(i, c) {
  return i.button === 0 && (!c || c === "_self") && !Hp(i)
}
var bi = null
function Lp() {
  if (bi === null)
    try {
      ;(new FormData(document.createElement("form"), 0), (bi = !1))
    } catch {
      bi = !0
    }
  return bi
}
var qp = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
])
function lo(i) {
  return i != null && !qp.has(i)
    ? (Lt(
        !1,
        `"${i}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${zi}"`
      ),
      null)
    : i
}
function Yp(i, c) {
  let s, r, f, m, y
  if (jp(i)) {
    let x = i.getAttribute("action")
    ;((r = x ? sl(x, c) : null),
      (s = i.getAttribute("method") || Ei),
      (f = lo(i.getAttribute("enctype")) || zi),
      (m = new FormData(i)))
  } else if (Up(i) || (wp(i) && (i.type === "submit" || i.type === "image"))) {
    let x = i.form
    if (x == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      )
    let g = i.getAttribute("formaction") || x.getAttribute("action")
    if (
      ((r = g ? sl(g, c) : null),
      (s = i.getAttribute("formmethod") || x.getAttribute("method") || Ei),
      (f =
        lo(i.getAttribute("formenctype")) ||
        lo(x.getAttribute("enctype")) ||
        zi),
      (m = new FormData(x, i)),
      !Lp())
    ) {
      let { name: h, type: C, value: E } = i
      if (C === "image") {
        let w = h ? `${h}.` : ""
        ;(m.append(`${w}x`, "0"), m.append(`${w}y`, "0"))
      } else h && m.append(h, E)
    }
  } else {
    if (_i(i))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      )
    ;((s = Ei), (r = null), (f = zi), (y = i))
  }
  return (
    m && f === "text/plain" && ((y = m), (m = void 0)),
    { action: r, method: s.toLowerCase(), encType: f, formData: m, body: y }
  )
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0")
function po(i, c) {
  if (i === !1 || i === null || typeof i > "u") throw new Error(c)
}
function Gp(i, c, s, r) {
  let f =
    typeof i == "string"
      ? new URL(
          i,
          typeof window > "u" ? "server://singlefetch/" : window.location.origin
        )
      : i
  return (
    s
      ? f.pathname.endsWith("/")
        ? (f.pathname = `${f.pathname}_.${r}`)
        : (f.pathname = `${f.pathname}.${r}`)
      : f.pathname === "/"
        ? (f.pathname = `_root.${r}`)
        : c && sl(f.pathname, c) === "/"
          ? (f.pathname = `${c.replace(/\/$/, "")}/_root.${r}`)
          : (f.pathname = `${f.pathname.replace(/\/$/, "")}.${r}`),
    f
  )
}
async function Vp(i, c) {
  if (i.id in c) return c[i.id]
  try {
    let s = await import(i.module)
    return ((c[i.id] = s), s)
  } catch (s) {
    return (
      console.error(
        `Error loading route module \`${i.module}\`, reloading page...`
      ),
      console.error(s),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    )
  }
}
function Xp(i) {
  return i == null
    ? !1
    : i.href == null
      ? i.rel === "preload" &&
        typeof i.imageSrcSet == "string" &&
        typeof i.imageSizes == "string"
      : typeof i.rel == "string" && typeof i.href == "string"
}
async function Qp(i, c, s) {
  let r = await Promise.all(
    i.map(async (f) => {
      let m = c.routes[f.route.id]
      if (m) {
        let y = await Vp(m, s)
        return y.links ? y.links() : []
      }
      return []
    })
  )
  return Jp(
    r
      .flat(1)
      .filter(Xp)
      .filter((f) => f.rel === "stylesheet" || f.rel === "preload")
      .map((f) =>
        f.rel === "stylesheet"
          ? { ...f, rel: "prefetch", as: "style" }
          : { ...f, rel: "prefetch" }
      )
  )
}
function Qm(i, c, s, r, f, m) {
  let y = (g, h) => (s[h] ? g.route.id !== s[h].route.id : !0),
    x = (g, h) =>
      s[h].pathname !== g.pathname ||
      (s[h].route.path?.endsWith("*") && s[h].params["*"] !== g.params["*"])
  return m === "assets"
    ? c.filter((g, h) => y(g, h) || x(g, h))
    : m === "data"
      ? c.filter((g, h) => {
          let C = r.routes[g.route.id]
          if (!C || !C.hasLoader) return !1
          if (y(g, h) || x(g, h)) return !0
          if (g.route.shouldRevalidate) {
            let E = g.route.shouldRevalidate({
              currentUrl: new URL(
                f.pathname + f.search + f.hash,
                window.origin
              ),
              currentParams: s[0]?.params || {},
              nextUrl: new URL(i, window.origin),
              nextParams: g.params,
              defaultShouldRevalidate: !0,
            })
            if (typeof E == "boolean") return E
          }
          return !0
        })
      : []
}
function kp(i, c, { includeHydrateFallback: s } = {}) {
  return Zp(
    i
      .map((r) => {
        let f = c.routes[r.route.id]
        if (!f) return []
        let m = [f.module]
        return (
          f.clientActionModule && (m = m.concat(f.clientActionModule)),
          f.clientLoaderModule && (m = m.concat(f.clientLoaderModule)),
          s &&
            f.hydrateFallbackModule &&
            (m = m.concat(f.hydrateFallbackModule)),
          f.imports && (m = m.concat(f.imports)),
          m
        )
      })
      .flat(1)
  )
}
function Zp(i) {
  return [...new Set(i)]
}
function Kp(i) {
  let c = {},
    s = Object.keys(i).sort()
  for (let r of s) c[r] = i[r]
  return c
}
function Jp(i, c) {
  let s = new Set()
  return (
    new Set(c),
    i.reduce((r, f) => {
      let m = JSON.stringify(Kp(f))
      return (s.has(m) || (s.add(m), r.push({ key: m, link: f })), r)
    }, [])
  )
}
function gh() {
  let i = A.useContext(Fa)
  return (
    po(
      i,
      "You must render this element inside a <DataRouterContext.Provider> element"
    ),
    i
  )
}
function $p() {
  let i = A.useContext(Ni)
  return (
    po(
      i,
      "You must render this element inside a <DataRouterStateContext.Provider> element"
    ),
    i
  )
}
var bo = A.createContext(void 0)
bo.displayName = "FrameworkContext"
function ph() {
  let i = A.useContext(bo)
  return (
    po(i, "You must render this element inside a <HydratedRouter> element"), i
  )
}
function Wp(i, c) {
  let s = A.useContext(bo),
    [r, f] = A.useState(!1),
    [m, y] = A.useState(!1),
    {
      onFocus: x,
      onBlur: g,
      onMouseEnter: h,
      onMouseLeave: C,
      onTouchStart: E,
    } = c,
    w = A.useRef(null)
  ;(A.useEffect(() => {
    if ((i === "render" && y(!0), i === "viewport")) {
      let B = ($) => {
          $.forEach((ne) => {
            y(ne.isIntersecting)
          })
        },
        H = new IntersectionObserver(B, { threshold: 0.5 })
      return (
        w.current && H.observe(w.current),
        () => {
          H.disconnect()
        }
      )
    }
  }, [i]),
    A.useEffect(() => {
      if (r) {
        let B = setTimeout(() => {
          y(!0)
        }, 100)
        return () => {
          clearTimeout(B)
        }
      }
    }, [r]))
  let q = () => {
      f(!0)
    },
    X = () => {
      ;(f(!1), y(!1))
    }
  return s
    ? i !== "intent"
      ? [m, w, {}]
      : [
          m,
          w,
          {
            onFocus: Jn(x, q),
            onBlur: Jn(g, X),
            onMouseEnter: Jn(h, q),
            onMouseLeave: Jn(C, X),
            onTouchStart: Jn(E, q),
          },
        ]
    : [!1, w, {}]
}
function Jn(i, c) {
  return (s) => {
    ;(i && i(s), s.defaultPrevented || c(s))
  }
}
function Fp({ page: i, ...c }) {
  let { router: s } = gh(),
    r = A.useMemo(() => ah(s.routes, i, s.basename), [s.routes, i, s.basename])
  return r ? A.createElement(Pp, { page: i, matches: r, ...c }) : null
}
function Ip(i) {
  let { manifest: c, routeModules: s } = ph(),
    [r, f] = A.useState([])
  return (
    A.useEffect(() => {
      let m = !1
      return (
        Qp(i, c, s).then((y) => {
          m || f(y)
        }),
        () => {
          m = !0
        }
      )
    }, [i, c, s]),
    r
  )
}
function Pp({ page: i, matches: c, ...s }) {
  let r = fl(),
    { future: f, manifest: m, routeModules: y } = ph(),
    { basename: x } = gh(),
    { loaderData: g, matches: h } = $p(),
    C = A.useMemo(() => Qm(i, c, h, m, r, "data"), [i, c, h, m, r]),
    E = A.useMemo(() => Qm(i, c, h, m, r, "assets"), [i, c, h, m, r]),
    w = A.useMemo(() => {
      if (i === r.pathname + r.search + r.hash) return []
      let B = new Set(),
        H = !1
      if (
        (c.forEach((ne) => {
          let I = m.routes[ne.route.id]
          !I ||
            !I.hasLoader ||
            ((!C.some((K) => K.route.id === ne.route.id) &&
              ne.route.id in g &&
              y[ne.route.id]?.shouldRevalidate) ||
            I.hasClientLoader
              ? (H = !0)
              : B.add(ne.route.id))
        }),
        B.size === 0)
      )
        return []
      let $ = Gp(i, x, f.unstable_trailingSlashAwareDataRequests, "data")
      return (
        H &&
          B.size > 0 &&
          $.searchParams.set(
            "_routes",
            c
              .filter((ne) => B.has(ne.route.id))
              .map((ne) => ne.route.id)
              .join(",")
          ),
        [$.pathname + $.search]
      )
    }, [x, f.unstable_trailingSlashAwareDataRequests, g, r, m, C, c, i, y]),
    q = A.useMemo(() => kp(E, m), [E, m]),
    X = Ip(E)
  return A.createElement(
    A.Fragment,
    null,
    w.map((B) =>
      A.createElement("link", {
        key: B,
        rel: "prefetch",
        as: "fetch",
        href: B,
        ...s,
      })
    ),
    q.map((B) =>
      A.createElement("link", { key: B, rel: "modulepreload", href: B, ...s })
    ),
    X.map(({ key: B, link: H }) =>
      A.createElement("link", {
        key: B,
        nonce: s.nonce,
        ...H,
        crossOrigin: H.crossOrigin ?? s.crossOrigin,
      })
    )
  )
}
function eb(...i) {
  return (c) => {
    i.forEach((s) => {
      typeof s == "function" ? s(c) : s != null && (s.current = c)
    })
  }
}
var tb =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u"
try {
  tb && (window.__reactRouterVersion = "7.13.1")
} catch {}
function lb({
  basename: i,
  children: c,
  unstable_useTransitions: s,
  window: r,
}) {
  let f = A.useRef()
  f.current == null && (f.current = Mg({ window: r, v5Compat: !0 }))
  let m = f.current,
    [y, x] = A.useState({ action: m.action, location: m.location }),
    g = A.useCallback(
      (h) => {
        s === !1 ? x(h) : A.startTransition(() => x(h))
      },
      [s]
    )
  return (
    A.useLayoutEffect(() => m.listen(g), [m, g]),
    A.createElement(Mp, {
      basename: i,
      children: c,
      location: y.location,
      navigationType: y.action,
      navigator: m,
      unstable_useTransitions: s,
    })
  )
}
var bh = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  In = A.forwardRef(function (
    {
      onClick: c,
      discover: s = "render",
      prefetch: r = "none",
      relative: f,
      reloadDocument: m,
      replace: y,
      unstable_mask: x,
      state: g,
      target: h,
      to: C,
      preventScrollReset: E,
      viewTransition: w,
      unstable_defaultShouldRevalidate: q,
      ...X
    },
    B
  ) {
    let {
        basename: H,
        navigator: $,
        unstable_useTransitions: ne,
      } = A.useContext(Et),
      I = typeof C == "string" && bh.test(C),
      K = ch(C, H)
    C = K.to
    let fe = fp(C, { relative: f }),
      de = fl(),
      ee = null
    if (x) {
      let Ne = Oi(x, [], de.unstable_mask ? de.unstable_mask.pathname : "/", !0)
      ;(H !== "/" &&
        (Ne.pathname = Ne.pathname === "/" ? H : Xt([H, Ne.pathname])),
        (ee = $.createHref(Ne)))
    }
    let [V, be, ce] = Wp(r, X),
      Me = ub(C, {
        replace: y,
        unstable_mask: x,
        state: g,
        target: h,
        preventScrollReset: E,
        relative: f,
        viewTransition: w,
        unstable_defaultShouldRevalidate: q,
        unstable_useTransitions: ne,
      })
    function De(Ne) {
      ;(c && c(Ne), Ne.defaultPrevented || Me(Ne))
    }
    let at = !(K.isExternal || m),
      tt = A.createElement("a", {
        ...X,
        ...ce,
        href: (at ? ee : void 0) || K.absoluteURL || fe,
        onClick: at ? De : c,
        ref: eb(B, be),
        target: h,
        "data-discover": !I && s === "render" ? "true" : void 0,
      })
    return V && !I
      ? A.createElement(A.Fragment, null, tt, A.createElement(Fp, { page: fe }))
      : tt
  })
In.displayName = "Link"
var Sh = A.forwardRef(function (
  {
    "aria-current": c = "page",
    caseSensitive: s = !1,
    className: r = "",
    end: f = !1,
    style: m,
    to: y,
    viewTransition: x,
    children: g,
    ...h
  },
  C
) {
  let E = tu(y, { relative: h.relative }),
    w = fl(),
    q = A.useContext(Ni),
    { navigator: X, basename: B } = A.useContext(Et),
    H = q != null && sb(E) && x === !0,
    $ = X.encodeLocation ? X.encodeLocation(E).pathname : E.pathname,
    ne = w.pathname,
    I =
      q && q.navigation && q.navigation.location
        ? q.navigation.location.pathname
        : null
  ;(s ||
    ((ne = ne.toLowerCase()),
    (I = I ? I.toLowerCase() : null),
    ($ = $.toLowerCase())),
    I && B && (I = sl(I, B) || I))
  const K = $ !== "/" && $.endsWith("/") ? $.length - 1 : $.length
  let fe = ne === $ || (!f && ne.startsWith($) && ne.charAt(K) === "/"),
    de =
      I != null &&
      (I === $ || (!f && I.startsWith($) && I.charAt($.length) === "/")),
    ee = { isActive: fe, isPending: de, isTransitioning: H },
    V = fe ? c : void 0,
    be
  typeof r == "function"
    ? (be = r(ee))
    : (be = [
        r,
        fe ? "active" : null,
        de ? "pending" : null,
        H ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "))
  let ce = typeof m == "function" ? m(ee) : m
  return A.createElement(
    In,
    {
      ...h,
      "aria-current": V,
      className: be,
      ref: C,
      style: ce,
      to: y,
      viewTransition: x,
    },
    typeof g == "function" ? g(ee) : g
  )
})
Sh.displayName = "NavLink"
var ab = A.forwardRef(
  (
    {
      discover: i = "render",
      fetcherKey: c,
      navigate: s,
      reloadDocument: r,
      replace: f,
      state: m,
      method: y = Ei,
      action: x,
      onSubmit: g,
      relative: h,
      preventScrollReset: C,
      viewTransition: E,
      unstable_defaultShouldRevalidate: w,
      ...q
    },
    X
  ) => {
    let { unstable_useTransitions: B } = A.useContext(Et),
      H = rb(),
      $ = ob(x, { relative: h }),
      ne = y.toLowerCase() === "get" ? "get" : "post",
      I = typeof x == "string" && bh.test(x),
      K = (fe) => {
        if ((g && g(fe), fe.defaultPrevented)) return
        fe.preventDefault()
        let de = fe.nativeEvent.submitter,
          ee = de?.getAttribute("formmethod") || y,
          V = () =>
            H(de || fe.currentTarget, {
              fetcherKey: c,
              method: ee,
              navigate: s,
              replace: f,
              state: m,
              relative: h,
              preventScrollReset: C,
              viewTransition: E,
              unstable_defaultShouldRevalidate: w,
            })
        B && s !== !1 ? A.startTransition(() => V()) : V()
      }
    return A.createElement("form", {
      ref: X,
      method: ne,
      action: $,
      onSubmit: r ? g : K,
      ...q,
      "data-discover": !I && i === "render" ? "true" : void 0,
    })
  }
)
ab.displayName = "Form"
function nb(i) {
  return `${i} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}
function xh(i) {
  let c = A.useContext(Fa)
  return (He(c, nb(i)), c)
}
function ub(
  i,
  {
    target: c,
    replace: s,
    unstable_mask: r,
    state: f,
    preventScrollReset: m,
    relative: y,
    viewTransition: x,
    unstable_defaultShouldRevalidate: g,
    unstable_useTransitions: h,
  } = {}
) {
  let C = mh(),
    E = fl(),
    w = tu(i, { relative: y })
  return A.useCallback(
    (q) => {
      if (Bp(q, c)) {
        q.preventDefault()
        let X = s !== void 0 ? s : Fn(E) === Fn(w),
          B = () =>
            C(i, {
              replace: X,
              unstable_mask: r,
              state: f,
              preventScrollReset: m,
              relative: y,
              viewTransition: x,
              unstable_defaultShouldRevalidate: g,
            })
        h ? A.startTransition(() => B()) : B()
      }
    },
    [E, C, w, s, r, f, c, i, m, y, x, g, h]
  )
}
var ib = 0,
  cb = () => `__${String(++ib)}__`
function rb() {
  let { router: i } = xh("useSubmit"),
    { basename: c } = A.useContext(Et),
    s = Ap(),
    r = i.fetch,
    f = i.navigate
  return A.useCallback(
    async (m, y = {}) => {
      let { action: x, method: g, encType: h, formData: C, body: E } = Yp(m, c)
      if (y.navigate === !1) {
        let w = y.fetcherKey || cb()
        await r(w, s, y.action || x, {
          unstable_defaultShouldRevalidate: y.unstable_defaultShouldRevalidate,
          preventScrollReset: y.preventScrollReset,
          formData: C,
          body: E,
          formMethod: y.method || g,
          formEncType: y.encType || h,
          flushSync: y.flushSync,
        })
      } else
        await f(y.action || x, {
          unstable_defaultShouldRevalidate: y.unstable_defaultShouldRevalidate,
          preventScrollReset: y.preventScrollReset,
          formData: C,
          body: E,
          formMethod: y.method || g,
          formEncType: y.encType || h,
          replace: y.replace,
          state: y.state,
          fromRouteId: s,
          flushSync: y.flushSync,
          viewTransition: y.viewTransition,
        })
    },
    [r, f, c, s]
  )
}
function ob(i, { relative: c } = {}) {
  let { basename: s } = A.useContext(Et),
    r = A.useContext(jt)
  He(r, "useFormAction must be used inside a RouteContext")
  let [f] = r.matches.slice(-1),
    m = { ...tu(i || ".", { relative: c }) },
    y = fl()
  if (i == null) {
    m.search = y.search
    let x = new URLSearchParams(m.search),
      g = x.getAll("index")
    if (g.some((C) => C === "")) {
      ;(x.delete("index"),
        g.filter((E) => E).forEach((E) => x.append("index", E)))
      let C = x.toString()
      m.search = C ? `?${C}` : ""
    }
  }
  return (
    (!i || i === ".") &&
      f.route.index &&
      (m.search = m.search ? m.search.replace(/^\?/, "?index&") : "?index"),
    s !== "/" && (m.pathname = m.pathname === "/" ? s : Xt([s, m.pathname])),
    Fn(m)
  )
}
function sb(i, { relative: c } = {}) {
  let s = A.useContext(oh)
  He(
    s != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  )
  let { basename: r } = xh("useViewTransitionState"),
    f = tu(i, { relative: c })
  if (!s.isTransitioning) return !1
  let m = sl(s.currentLocation.pathname, r) || s.currentLocation.pathname,
    y = sl(s.nextLocation.pathname, r) || s.nextLocation.pathname
  return Ai(f.pathname, y) != null || Ai(f.pathname, m) != null
}
function ro(i, c) {
  if (i && !c) return i
  if (!i && c) return c
  if (i || c) return { ...i, ...c }
}
const Wn = {}
function So(i, c, s, r, f) {
  let m = { ...oo(i, Wn) }
  return (c && (m = Ti(m, c)), s && (m = Ti(m, s)), r && (m = Ti(m, r)), m)
}
function fb(i) {
  if (i.length === 0) return Wn
  if (i.length === 1) return oo(i[0], Wn)
  let c = { ...oo(i[0], Wn) }
  for (let s = 1; s < i.length; s += 1) c = Ti(c, i[s])
  return c
}
function Ti(i, c) {
  return Eh(c) ? c(i) : db(i, c)
}
function db(i, c) {
  if (!c) return i
  for (const s in c) {
    const r = c[s]
    switch (s) {
      case "style": {
        i[s] = ro(i.style, r)
        break
      }
      case "className": {
        i[s] = zh(i.className, r)
        break
      }
      default:
        mb(s, r) ? (i[s] = hb(i[s], r)) : (i[s] = r)
    }
  }
  return i
}
function mb(i, c) {
  const s = i.charCodeAt(0),
    r = i.charCodeAt(1),
    f = i.charCodeAt(2)
  return (
    s === 111 &&
    r === 110 &&
    f >= 65 &&
    f <= 90 &&
    (typeof c == "function" || typeof c > "u")
  )
}
function Eh(i) {
  return typeof i == "function"
}
function oo(i, c) {
  return Eh(i) ? i(c) : (i ?? Wn)
}
function hb(i, c) {
  return c
    ? i
      ? (s) => {
          if (yb(s)) {
            const f = s
            so(f)
            const m = c(f)
            return (f.baseUIHandlerPrevented || i?.(f), m)
          }
          const r = c(s)
          return (i?.(s), r)
        }
      : c
    : i
}
function so(i) {
  return (
    (i.preventBaseUIHandler = () => {
      i.baseUIHandlerPrevented = !0
    }),
    i
  )
}
function zh(i, c) {
  return c ? (i ? c + " " + i : c) : i
}
function yb(i) {
  return i != null && typeof i == "object" && "nativeEvent" in i
}
function Th(i, ...c) {
  const s = new URL("https://base-ui.com/production-error")
  return (
    s.searchParams.set("code", i.toString()),
    c.forEach((r) => s.searchParams.append("args[]", r)),
    `Base UI error #${i}; visit ${s} for the full message.`
  )
}
const km = {}
function xo(i, c) {
  const s = A.useRef(km)
  return (s.current === km && (s.current = i(c)), s)
}
function Zm(i, c, s, r) {
  const f = xo(Ah).current
  return (gb(f, i, c, s, r) && Rh(f, [i, c, s, r]), f.callback)
}
function vb(i) {
  const c = xo(Ah).current
  return (pb(c, i) && Rh(c, i), c.callback)
}
function Ah() {
  return { callback: null, cleanup: null, refs: [] }
}
function gb(i, c, s, r, f) {
  return (
    i.refs[0] !== c || i.refs[1] !== s || i.refs[2] !== r || i.refs[3] !== f
  )
}
function pb(i, c) {
  return i.refs.length !== c.length || i.refs.some((s, r) => s !== c[r])
}
function Rh(i, c) {
  if (((i.refs = c), c.every((s) => s == null))) {
    i.callback = null
    return
  }
  i.callback = (s) => {
    if ((i.cleanup && (i.cleanup(), (i.cleanup = null)), s != null)) {
      const r = Array(c.length).fill(null)
      for (let f = 0; f < c.length; f += 1) {
        const m = c[f]
        if (m != null)
          switch (typeof m) {
            case "function": {
              const y = m(s)
              typeof y == "function" && (r[f] = y)
              break
            }
            case "object": {
              m.current = s
              break
            }
          }
      }
      i.cleanup = () => {
        for (let f = 0; f < c.length; f += 1) {
          const m = c[f]
          if (m != null)
            switch (typeof m) {
              case "function": {
                const y = r[f]
                typeof y == "function" ? y() : m(null)
                break
              }
              case "object": {
                m.current = null
                break
              }
            }
        }
      }
    }
  }
}
const bb = parseInt(A.version, 10)
function Sb(i) {
  return bb >= i
}
function Km(i) {
  if (!A.isValidElement(i)) return null
  const c = i,
    s = c.props
  return (Sb(19) ? s?.ref : c.ref) ?? null
}
function xb(i, c) {
  const s = {}
  for (const r in i) {
    const f = i[r]
    if (c?.hasOwnProperty(r)) {
      const m = c[r](f)
      m != null && Object.assign(s, m)
      continue
    }
    f === !0
      ? (s[`data-${r.toLowerCase()}`] = "")
      : f && (s[`data-${r.toLowerCase()}`] = f.toString())
  }
  return s
}
function Eb(i, c) {
  return typeof i == "function" ? i(c) : i
}
function zb(i, c) {
  return typeof i == "function" ? i(c) : i
}
const $a = Object.freeze({})
function Ch(i, c, s = {}) {
  const r = c.render,
    f = Tb(c, s)
  if (s.enabled === !1) return null
  const m = s.state ?? $a
  return Rb(i, r, f, m)
}
function Tb(i, c = {}) {
  const { className: s, style: r, render: f } = i,
    {
      state: m = $a,
      ref: y,
      props: x,
      stateAttributesMapping: g,
      enabled: h = !0,
    } = c,
    C = h ? Eb(s, m) : void 0,
    E = h ? zb(r, m) : void 0,
    w = h ? xb(m, g) : $a,
    q = h ? (ro(w, Array.isArray(x) ? fb(x) : x) ?? $a) : $a
  return (
    typeof document < "u" &&
      (h
        ? Array.isArray(y)
          ? (q.ref = vb([q.ref, Km(f), ...y]))
          : (q.ref = Zm(q.ref, Km(f), y))
        : Zm(null, null)),
    h
      ? (C !== void 0 && (q.className = zh(q.className, C)),
        E !== void 0 && (q.style = ro(q.style, E)),
        q)
      : $a
  )
}
const Ab = Symbol.for("react.lazy")
function Rb(i, c, s, r) {
  if (c) {
    if (typeof c == "function") return c(s, r)
    const f = So(s, c.props)
    f.ref = s.ref
    let m = c
    return (
      m?.$$typeof === Ab && (m = A.Children.toArray(c)[0]), A.cloneElement(m, f)
    )
  }
  if (i && typeof i == "string") return Cb(i, s)
  throw new Error(Th(8))
}
function Cb(i, c) {
  return i === "button"
    ? A.createElement("button", { type: "button", ...c, key: c.key })
    : i === "img"
      ? A.createElement("img", { alt: "", ...c, key: c.key })
      : A.createElement(i, c)
}
function Ob(i) {
  return Ch(i.defaultTagName ?? "div", i, i)
}
function Oh(i) {
  var c,
    s,
    r = ""
  if (typeof i == "string" || typeof i == "number") r += i
  else if (typeof i == "object")
    if (Array.isArray(i)) {
      var f = i.length
      for (c = 0; c < f; c++)
        i[c] && (s = Oh(i[c])) && (r && (r += " "), (r += s))
    } else for (s in i) i[s] && (r && (r += " "), (r += s))
  return r
}
function Nh() {
  for (var i, c, s = 0, r = "", f = arguments.length; s < f; s++)
    (i = arguments[s]) && (c = Oh(i)) && (r && (r += " "), (r += c))
  return r
}
const Jm = (i) => (typeof i == "boolean" ? `${i}` : i === 0 ? "0" : i),
  $m = Nh,
  _h = (i, c) => (s) => {
    var r
    if (c?.variants == null) return $m(i, s?.class, s?.className)
    const { variants: f, defaultVariants: m } = c,
      y = Object.keys(f).map((h) => {
        const C = s?.[h],
          E = m?.[h]
        if (C === null) return null
        const w = Jm(C) || Jm(E)
        return f[h][w]
      }),
      x =
        s &&
        Object.entries(s).reduce((h, C) => {
          let [E, w] = C
          return (w === void 0 || (h[E] = w), h)
        }, {}),
      g =
        c == null || (r = c.compoundVariants) === null || r === void 0
          ? void 0
          : r.reduce((h, C) => {
              let { class: E, className: w, ...q } = C
              return Object.entries(q).every((X) => {
                let [B, H] = X
                return Array.isArray(H)
                  ? H.includes({ ...m, ...x }[B])
                  : { ...m, ...x }[B] === H
              })
                ? [...h, E, w]
                : h
            }, [])
    return $m(i, y, g, s?.class, s?.className)
  },
  Nb = (i, c) => {
    const s = new Array(i.length + c.length)
    for (let r = 0; r < i.length; r++) s[r] = i[r]
    for (let r = 0; r < c.length; r++) s[i.length + r] = c[r]
    return s
  },
  _b = (i, c) => ({ classGroupId: i, validator: c }),
  Mh = (i = new Map(), c = null, s) => ({
    nextPart: i,
    validators: c,
    classGroupId: s,
  }),
  Ri = "-",
  Wm = [],
  Mb = "arbitrary..",
  Db = (i) => {
    const c = jb(i),
      { conflictingClassGroups: s, conflictingClassGroupModifiers: r } = i
    return {
      getClassGroupId: (y) => {
        if (y.startsWith("[") && y.endsWith("]")) return Ub(y)
        const x = y.split(Ri),
          g = x[0] === "" && x.length > 1 ? 1 : 0
        return Dh(x, g, c)
      },
      getConflictingClassGroupIds: (y, x) => {
        if (x) {
          const g = r[y],
            h = s[y]
          return g ? (h ? Nb(h, g) : g) : h || Wm
        }
        return s[y] || Wm
      },
    }
  },
  Dh = (i, c, s) => {
    if (i.length - c === 0) return s.classGroupId
    const f = i[c],
      m = s.nextPart.get(f)
    if (m) {
      const h = Dh(i, c + 1, m)
      if (h) return h
    }
    const y = s.validators
    if (y === null) return
    const x = c === 0 ? i.join(Ri) : i.slice(c).join(Ri),
      g = y.length
    for (let h = 0; h < g; h++) {
      const C = y[h]
      if (C.validator(x)) return C.classGroupId
    }
  },
  Ub = (i) =>
    i.slice(1, -1).indexOf(":") === -1
      ? void 0
      : (() => {
          const c = i.slice(1, -1),
            s = c.indexOf(":"),
            r = c.slice(0, s)
          return r ? Mb + r : void 0
        })(),
  jb = (i) => {
    const { theme: c, classGroups: s } = i
    return wb(s, c)
  },
  wb = (i, c) => {
    const s = Mh()
    for (const r in i) {
      const f = i[r]
      Eo(f, s, r, c)
    }
    return s
  },
  Eo = (i, c, s, r) => {
    const f = i.length
    for (let m = 0; m < f; m++) {
      const y = i[m]
      Hb(y, c, s, r)
    }
  },
  Hb = (i, c, s, r) => {
    if (typeof i == "string") {
      Bb(i, c, s)
      return
    }
    if (typeof i == "function") {
      Lb(i, c, s, r)
      return
    }
    qb(i, c, s, r)
  },
  Bb = (i, c, s) => {
    const r = i === "" ? c : Uh(c, i)
    r.classGroupId = s
  },
  Lb = (i, c, s, r) => {
    if (Yb(i)) {
      Eo(i(r), c, s, r)
      return
    }
    ;(c.validators === null && (c.validators = []), c.validators.push(_b(s, i)))
  },
  qb = (i, c, s, r) => {
    const f = Object.entries(i),
      m = f.length
    for (let y = 0; y < m; y++) {
      const [x, g] = f[y]
      Eo(g, Uh(c, x), s, r)
    }
  },
  Uh = (i, c) => {
    let s = i
    const r = c.split(Ri),
      f = r.length
    for (let m = 0; m < f; m++) {
      const y = r[m]
      let x = s.nextPart.get(y)
      ;(x || ((x = Mh()), s.nextPart.set(y, x)), (s = x))
    }
    return s
  },
  Yb = (i) => "isThemeGetter" in i && i.isThemeGetter === !0,
  Gb = (i) => {
    if (i < 1) return { get: () => {}, set: () => {} }
    let c = 0,
      s = Object.create(null),
      r = Object.create(null)
    const f = (m, y) => {
      ;((s[m] = y), c++, c > i && ((c = 0), (r = s), (s = Object.create(null))))
    }
    return {
      get(m) {
        let y = s[m]
        if (y !== void 0) return y
        if ((y = r[m]) !== void 0) return (f(m, y), y)
      },
      set(m, y) {
        m in s ? (s[m] = y) : f(m, y)
      },
    }
  },
  fo = "!",
  Fm = ":",
  Vb = [],
  Im = (i, c, s, r, f) => ({
    modifiers: i,
    hasImportantModifier: c,
    baseClassName: s,
    maybePostfixModifierPosition: r,
    isExternal: f,
  }),
  Xb = (i) => {
    const { prefix: c, experimentalParseClassName: s } = i
    let r = (f) => {
      const m = []
      let y = 0,
        x = 0,
        g = 0,
        h
      const C = f.length
      for (let B = 0; B < C; B++) {
        const H = f[B]
        if (y === 0 && x === 0) {
          if (H === Fm) {
            ;(m.push(f.slice(g, B)), (g = B + 1))
            continue
          }
          if (H === "/") {
            h = B
            continue
          }
        }
        H === "[" ? y++ : H === "]" ? y-- : H === "(" ? x++ : H === ")" && x--
      }
      const E = m.length === 0 ? f : f.slice(g)
      let w = E,
        q = !1
      E.endsWith(fo)
        ? ((w = E.slice(0, -1)), (q = !0))
        : E.startsWith(fo) && ((w = E.slice(1)), (q = !0))
      const X = h && h > g ? h - g : void 0
      return Im(m, q, w, X)
    }
    if (c) {
      const f = c + Fm,
        m = r
      r = (y) =>
        y.startsWith(f) ? m(y.slice(f.length)) : Im(Vb, !1, y, void 0, !0)
    }
    if (s) {
      const f = r
      r = (m) => s({ className: m, parseClassName: f })
    }
    return r
  },
  Qb = (i) => {
    const c = new Map()
    return (
      i.orderSensitiveModifiers.forEach((s, r) => {
        c.set(s, 1e6 + r)
      }),
      (s) => {
        const r = []
        let f = []
        for (let m = 0; m < s.length; m++) {
          const y = s[m],
            x = y[0] === "[",
            g = c.has(y)
          x || g
            ? (f.length > 0 && (f.sort(), r.push(...f), (f = [])), r.push(y))
            : f.push(y)
        }
        return (f.length > 0 && (f.sort(), r.push(...f)), r)
      }
    )
  },
  kb = (i) => ({
    cache: Gb(i.cacheSize),
    parseClassName: Xb(i),
    sortModifiers: Qb(i),
    ...Db(i),
  }),
  Zb = /\s+/,
  Kb = (i, c) => {
    const {
        parseClassName: s,
        getClassGroupId: r,
        getConflictingClassGroupIds: f,
        sortModifiers: m,
      } = c,
      y = [],
      x = i.trim().split(Zb)
    let g = ""
    for (let h = x.length - 1; h >= 0; h -= 1) {
      const C = x[h],
        {
          isExternal: E,
          modifiers: w,
          hasImportantModifier: q,
          baseClassName: X,
          maybePostfixModifierPosition: B,
        } = s(C)
      if (E) {
        g = C + (g.length > 0 ? " " + g : g)
        continue
      }
      let H = !!B,
        $ = r(H ? X.substring(0, B) : X)
      if (!$) {
        if (!H) {
          g = C + (g.length > 0 ? " " + g : g)
          continue
        }
        if ((($ = r(X)), !$)) {
          g = C + (g.length > 0 ? " " + g : g)
          continue
        }
        H = !1
      }
      const ne = w.length === 0 ? "" : w.length === 1 ? w[0] : m(w).join(":"),
        I = q ? ne + fo : ne,
        K = I + $
      if (y.indexOf(K) > -1) continue
      y.push(K)
      const fe = f($, H)
      for (let de = 0; de < fe.length; ++de) {
        const ee = fe[de]
        y.push(I + ee)
      }
      g = C + (g.length > 0 ? " " + g : g)
    }
    return g
  },
  Jb = (...i) => {
    let c = 0,
      s,
      r,
      f = ""
    for (; c < i.length; )
      (s = i[c++]) && (r = jh(s)) && (f && (f += " "), (f += r))
    return f
  },
  jh = (i) => {
    if (typeof i == "string") return i
    let c,
      s = ""
    for (let r = 0; r < i.length; r++)
      i[r] && (c = jh(i[r])) && (s && (s += " "), (s += c))
    return s
  },
  $b = (i, ...c) => {
    let s, r, f, m
    const y = (g) => {
        const h = c.reduce((C, E) => E(C), i())
        return (
          (s = kb(h)), (r = s.cache.get), (f = s.cache.set), (m = x), x(g)
        )
      },
      x = (g) => {
        const h = r(g)
        if (h) return h
        const C = Kb(g, s)
        return (f(g, C), C)
      }
    return ((m = y), (...g) => m(Jb(...g)))
  },
  Wb = [],
  Ze = (i) => {
    const c = (s) => s[i] || Wb
    return ((c.isThemeGetter = !0), c)
  },
  wh = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  Hh = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  Fb = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,
  Ib = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  Pb =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  e0 = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  t0 = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  l0 =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  ql = (i) => Fb.test(i),
  se = (i) => !!i && !Number.isNaN(Number(i)),
  Yl = (i) => !!i && Number.isInteger(Number(i)),
  ao = (i) => i.endsWith("%") && se(i.slice(0, -1)),
  ol = (i) => Ib.test(i),
  Bh = () => !0,
  a0 = (i) => Pb.test(i) && !e0.test(i),
  zo = () => !1,
  n0 = (i) => t0.test(i),
  u0 = (i) => l0.test(i),
  i0 = (i) => !Z(i) && !J(i),
  c0 = (i) => Gl(i, Yh, zo),
  Z = (i) => wh.test(i),
  ca = (i) => Gl(i, Gh, a0),
  Pm = (i) => Gl(i, y0, se),
  r0 = (i) => Gl(i, Xh, Bh),
  o0 = (i) => Gl(i, Vh, zo),
  eh = (i) => Gl(i, Lh, zo),
  s0 = (i) => Gl(i, qh, u0),
  Si = (i) => Gl(i, Qh, n0),
  J = (i) => Hh.test(i),
  $n = (i) => oa(i, Gh),
  f0 = (i) => oa(i, Vh),
  th = (i) => oa(i, Lh),
  d0 = (i) => oa(i, Yh),
  m0 = (i) => oa(i, qh),
  xi = (i) => oa(i, Qh, !0),
  h0 = (i) => oa(i, Xh, !0),
  Gl = (i, c, s) => {
    const r = wh.exec(i)
    return r ? (r[1] ? c(r[1]) : s(r[2])) : !1
  },
  oa = (i, c, s = !1) => {
    const r = Hh.exec(i)
    return r ? (r[1] ? c(r[1]) : s) : !1
  },
  Lh = (i) => i === "position" || i === "percentage",
  qh = (i) => i === "image" || i === "url",
  Yh = (i) => i === "length" || i === "size" || i === "bg-size",
  Gh = (i) => i === "length",
  y0 = (i) => i === "number",
  Vh = (i) => i === "family-name",
  Xh = (i) => i === "number" || i === "weight",
  Qh = (i) => i === "shadow",
  v0 = () => {
    const i = Ze("color"),
      c = Ze("font"),
      s = Ze("text"),
      r = Ze("font-weight"),
      f = Ze("tracking"),
      m = Ze("leading"),
      y = Ze("breakpoint"),
      x = Ze("container"),
      g = Ze("spacing"),
      h = Ze("radius"),
      C = Ze("shadow"),
      E = Ze("inset-shadow"),
      w = Ze("text-shadow"),
      q = Ze("drop-shadow"),
      X = Ze("blur"),
      B = Ze("perspective"),
      H = Ze("aspect"),
      $ = Ze("ease"),
      ne = Ze("animate"),
      I = () => [
        "auto",
        "avoid",
        "all",
        "avoid-page",
        "page",
        "left",
        "right",
        "column",
      ],
      K = () => [
        "center",
        "top",
        "bottom",
        "left",
        "right",
        "top-left",
        "left-top",
        "top-right",
        "right-top",
        "bottom-right",
        "right-bottom",
        "bottom-left",
        "left-bottom",
      ],
      fe = () => [...K(), J, Z],
      de = () => ["auto", "hidden", "clip", "visible", "scroll"],
      ee = () => ["auto", "contain", "none"],
      V = () => [J, Z, g],
      be = () => [ql, "full", "auto", ...V()],
      ce = () => [Yl, "none", "subgrid", J, Z],
      Me = () => ["auto", { span: ["full", Yl, J, Z] }, Yl, J, Z],
      De = () => [Yl, "auto", J, Z],
      at = () => ["auto", "min", "max", "fr", J, Z],
      tt = () => [
        "start",
        "end",
        "center",
        "between",
        "around",
        "evenly",
        "stretch",
        "baseline",
        "center-safe",
        "end-safe",
      ],
      Ne = () => [
        "start",
        "end",
        "center",
        "stretch",
        "center-safe",
        "end-safe",
      ],
      _ = () => ["auto", ...V()],
      L = () => [
        ql,
        "auto",
        "full",
        "dvw",
        "dvh",
        "lvw",
        "lvh",
        "svw",
        "svh",
        "min",
        "max",
        "fit",
        ...V(),
      ],
      le = () => [
        ql,
        "screen",
        "full",
        "dvw",
        "lvw",
        "svw",
        "min",
        "max",
        "fit",
        ...V(),
      ],
      Se = () => [
        ql,
        "screen",
        "full",
        "lh",
        "dvh",
        "lvh",
        "svh",
        "min",
        "max",
        "fit",
        ...V(),
      ],
      Y = () => [i, J, Z],
      b = () => [...K(), th, eh, { position: [J, Z] }],
      j = () => ["no-repeat", { repeat: ["", "x", "y", "space", "round"] }],
      G = () => ["auto", "cover", "contain", d0, c0, { size: [J, Z] }],
      Q = () => [ao, $n, ca],
      F = () => ["", "none", "full", h, J, Z],
      te = () => ["", se, $n, ca],
      ge = () => ["solid", "dashed", "dotted", "double"],
      Ke = () => [
        "normal",
        "multiply",
        "screen",
        "overlay",
        "darken",
        "lighten",
        "color-dodge",
        "color-burn",
        "hard-light",
        "soft-light",
        "difference",
        "exclusion",
        "hue",
        "saturation",
        "color",
        "luminosity",
      ],
      oe = () => [se, ao, th, eh],
      dl = () => ["", "none", X, J, Z],
      Qt = () => ["none", se, J, Z],
      ml = () => ["none", se, J, Z],
      sa = () => [se, J, Z],
      zt = () => [ql, "full", ...V()]
    return {
      cacheSize: 500,
      theme: {
        animate: ["spin", "ping", "pulse", "bounce"],
        aspect: ["video"],
        blur: [ol],
        breakpoint: [ol],
        color: [Bh],
        container: [ol],
        "drop-shadow": [ol],
        ease: ["in", "out", "in-out"],
        font: [i0],
        "font-weight": [
          "thin",
          "extralight",
          "light",
          "normal",
          "medium",
          "semibold",
          "bold",
          "extrabold",
          "black",
        ],
        "inset-shadow": [ol],
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
        perspective: [
          "dramatic",
          "near",
          "normal",
          "midrange",
          "distant",
          "none",
        ],
        radius: [ol],
        shadow: [ol],
        spacing: ["px", se],
        text: [ol],
        "text-shadow": [ol],
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"],
      },
      classGroups: {
        aspect: [{ aspect: ["auto", "square", ql, Z, J, H] }],
        container: ["container"],
        columns: [{ columns: [se, Z, J, x] }],
        "break-after": [{ "break-after": I() }],
        "break-before": [{ "break-before": I() }],
        "break-inside": [
          { "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] },
        ],
        "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
        box: [{ box: ["border", "content"] }],
        display: [
          "block",
          "inline-block",
          "inline",
          "flex",
          "inline-flex",
          "table",
          "inline-table",
          "table-caption",
          "table-cell",
          "table-column",
          "table-column-group",
          "table-footer-group",
          "table-header-group",
          "table-row-group",
          "table-row",
          "flow-root",
          "grid",
          "inline-grid",
          "contents",
          "list-item",
          "hidden",
        ],
        sr: ["sr-only", "not-sr-only"],
        float: [{ float: ["right", "left", "none", "start", "end"] }],
        clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
        isolation: ["isolate", "isolation-auto"],
        "object-fit": [
          { object: ["contain", "cover", "fill", "none", "scale-down"] },
        ],
        "object-position": [{ object: fe() }],
        overflow: [{ overflow: de() }],
        "overflow-x": [{ "overflow-x": de() }],
        "overflow-y": [{ "overflow-y": de() }],
        overscroll: [{ overscroll: ee() }],
        "overscroll-x": [{ "overscroll-x": ee() }],
        "overscroll-y": [{ "overscroll-y": ee() }],
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        inset: [{ inset: be() }],
        "inset-x": [{ "inset-x": be() }],
        "inset-y": [{ "inset-y": be() }],
        start: [{ "inset-s": be(), start: be() }],
        end: [{ "inset-e": be(), end: be() }],
        "inset-bs": [{ "inset-bs": be() }],
        "inset-be": [{ "inset-be": be() }],
        top: [{ top: be() }],
        right: [{ right: be() }],
        bottom: [{ bottom: be() }],
        left: [{ left: be() }],
        visibility: ["visible", "invisible", "collapse"],
        z: [{ z: [Yl, "auto", J, Z] }],
        basis: [{ basis: [ql, "full", "auto", x, ...V()] }],
        "flex-direction": [
          { flex: ["row", "row-reverse", "col", "col-reverse"] },
        ],
        "flex-wrap": [{ flex: ["nowrap", "wrap", "wrap-reverse"] }],
        flex: [{ flex: [se, ql, "auto", "initial", "none", Z] }],
        grow: [{ grow: ["", se, J, Z] }],
        shrink: [{ shrink: ["", se, J, Z] }],
        order: [{ order: [Yl, "first", "last", "none", J, Z] }],
        "grid-cols": [{ "grid-cols": ce() }],
        "col-start-end": [{ col: Me() }],
        "col-start": [{ "col-start": De() }],
        "col-end": [{ "col-end": De() }],
        "grid-rows": [{ "grid-rows": ce() }],
        "row-start-end": [{ row: Me() }],
        "row-start": [{ "row-start": De() }],
        "row-end": [{ "row-end": De() }],
        "grid-flow": [
          { "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
        ],
        "auto-cols": [{ "auto-cols": at() }],
        "auto-rows": [{ "auto-rows": at() }],
        gap: [{ gap: V() }],
        "gap-x": [{ "gap-x": V() }],
        "gap-y": [{ "gap-y": V() }],
        "justify-content": [{ justify: [...tt(), "normal"] }],
        "justify-items": [{ "justify-items": [...Ne(), "normal"] }],
        "justify-self": [{ "justify-self": ["auto", ...Ne()] }],
        "align-content": [{ content: ["normal", ...tt()] }],
        "align-items": [{ items: [...Ne(), { baseline: ["", "last"] }] }],
        "align-self": [{ self: ["auto", ...Ne(), { baseline: ["", "last"] }] }],
        "place-content": [{ "place-content": tt() }],
        "place-items": [{ "place-items": [...Ne(), "baseline"] }],
        "place-self": [{ "place-self": ["auto", ...Ne()] }],
        p: [{ p: V() }],
        px: [{ px: V() }],
        py: [{ py: V() }],
        ps: [{ ps: V() }],
        pe: [{ pe: V() }],
        pbs: [{ pbs: V() }],
        pbe: [{ pbe: V() }],
        pt: [{ pt: V() }],
        pr: [{ pr: V() }],
        pb: [{ pb: V() }],
        pl: [{ pl: V() }],
        m: [{ m: _() }],
        mx: [{ mx: _() }],
        my: [{ my: _() }],
        ms: [{ ms: _() }],
        me: [{ me: _() }],
        mbs: [{ mbs: _() }],
        mbe: [{ mbe: _() }],
        mt: [{ mt: _() }],
        mr: [{ mr: _() }],
        mb: [{ mb: _() }],
        ml: [{ ml: _() }],
        "space-x": [{ "space-x": V() }],
        "space-x-reverse": ["space-x-reverse"],
        "space-y": [{ "space-y": V() }],
        "space-y-reverse": ["space-y-reverse"],
        size: [{ size: L() }],
        "inline-size": [{ inline: ["auto", ...le()] }],
        "min-inline-size": [{ "min-inline": ["auto", ...le()] }],
        "max-inline-size": [{ "max-inline": ["none", ...le()] }],
        "block-size": [{ block: ["auto", ...Se()] }],
        "min-block-size": [{ "min-block": ["auto", ...Se()] }],
        "max-block-size": [{ "max-block": ["none", ...Se()] }],
        w: [{ w: [x, "screen", ...L()] }],
        "min-w": [{ "min-w": [x, "screen", "none", ...L()] }],
        "max-w": [
          { "max-w": [x, "screen", "none", "prose", { screen: [y] }, ...L()] },
        ],
        h: [{ h: ["screen", "lh", ...L()] }],
        "min-h": [{ "min-h": ["screen", "lh", "none", ...L()] }],
        "max-h": [{ "max-h": ["screen", "lh", ...L()] }],
        "font-size": [{ text: ["base", s, $n, ca] }],
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        "font-style": ["italic", "not-italic"],
        "font-weight": [{ font: [r, h0, r0] }],
        "font-stretch": [
          {
            "font-stretch": [
              "ultra-condensed",
              "extra-condensed",
              "condensed",
              "semi-condensed",
              "normal",
              "semi-expanded",
              "expanded",
              "extra-expanded",
              "ultra-expanded",
              ao,
              Z,
            ],
          },
        ],
        "font-family": [{ font: [f0, o0, c] }],
        "font-features": [{ "font-features": [Z] }],
        "fvn-normal": ["normal-nums"],
        "fvn-ordinal": ["ordinal"],
        "fvn-slashed-zero": ["slashed-zero"],
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
        tracking: [{ tracking: [f, J, Z] }],
        "line-clamp": [{ "line-clamp": [se, "none", J, Pm] }],
        leading: [{ leading: [m, ...V()] }],
        "list-image": [{ "list-image": ["none", J, Z] }],
        "list-style-position": [{ list: ["inside", "outside"] }],
        "list-style-type": [{ list: ["disc", "decimal", "none", J, Z] }],
        "text-alignment": [
          { text: ["left", "center", "right", "justify", "start", "end"] },
        ],
        "placeholder-color": [{ placeholder: Y() }],
        "text-color": [{ text: Y() }],
        "text-decoration": [
          "underline",
          "overline",
          "line-through",
          "no-underline",
        ],
        "text-decoration-style": [{ decoration: [...ge(), "wavy"] }],
        "text-decoration-thickness": [
          { decoration: [se, "from-font", "auto", J, ca] },
        ],
        "text-decoration-color": [{ decoration: Y() }],
        "underline-offset": [{ "underline-offset": [se, "auto", J, Z] }],
        "text-transform": [
          "uppercase",
          "lowercase",
          "capitalize",
          "normal-case",
        ],
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
        indent: [{ indent: V() }],
        "vertical-align": [
          {
            align: [
              "baseline",
              "top",
              "middle",
              "bottom",
              "text-top",
              "text-bottom",
              "sub",
              "super",
              J,
              Z,
            ],
          },
        ],
        whitespace: [
          {
            whitespace: [
              "normal",
              "nowrap",
              "pre",
              "pre-line",
              "pre-wrap",
              "break-spaces",
            ],
          },
        ],
        break: [{ break: ["normal", "words", "all", "keep"] }],
        wrap: [{ wrap: ["break-word", "anywhere", "normal"] }],
        hyphens: [{ hyphens: ["none", "manual", "auto"] }],
        content: [{ content: ["none", J, Z] }],
        "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
        "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
        "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
        "bg-position": [{ bg: b() }],
        "bg-repeat": [{ bg: j() }],
        "bg-size": [{ bg: G() }],
        "bg-image": [
          {
            bg: [
              "none",
              {
                linear: [
                  { to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
                  Yl,
                  J,
                  Z,
                ],
                radial: ["", J, Z],
                conic: [Yl, J, Z],
              },
              m0,
              s0,
            ],
          },
        ],
        "bg-color": [{ bg: Y() }],
        "gradient-from-pos": [{ from: Q() }],
        "gradient-via-pos": [{ via: Q() }],
        "gradient-to-pos": [{ to: Q() }],
        "gradient-from": [{ from: Y() }],
        "gradient-via": [{ via: Y() }],
        "gradient-to": [{ to: Y() }],
        rounded: [{ rounded: F() }],
        "rounded-s": [{ "rounded-s": F() }],
        "rounded-e": [{ "rounded-e": F() }],
        "rounded-t": [{ "rounded-t": F() }],
        "rounded-r": [{ "rounded-r": F() }],
        "rounded-b": [{ "rounded-b": F() }],
        "rounded-l": [{ "rounded-l": F() }],
        "rounded-ss": [{ "rounded-ss": F() }],
        "rounded-se": [{ "rounded-se": F() }],
        "rounded-ee": [{ "rounded-ee": F() }],
        "rounded-es": [{ "rounded-es": F() }],
        "rounded-tl": [{ "rounded-tl": F() }],
        "rounded-tr": [{ "rounded-tr": F() }],
        "rounded-br": [{ "rounded-br": F() }],
        "rounded-bl": [{ "rounded-bl": F() }],
        "border-w": [{ border: te() }],
        "border-w-x": [{ "border-x": te() }],
        "border-w-y": [{ "border-y": te() }],
        "border-w-s": [{ "border-s": te() }],
        "border-w-e": [{ "border-e": te() }],
        "border-w-bs": [{ "border-bs": te() }],
        "border-w-be": [{ "border-be": te() }],
        "border-w-t": [{ "border-t": te() }],
        "border-w-r": [{ "border-r": te() }],
        "border-w-b": [{ "border-b": te() }],
        "border-w-l": [{ "border-l": te() }],
        "divide-x": [{ "divide-x": te() }],
        "divide-x-reverse": ["divide-x-reverse"],
        "divide-y": [{ "divide-y": te() }],
        "divide-y-reverse": ["divide-y-reverse"],
        "border-style": [{ border: [...ge(), "hidden", "none"] }],
        "divide-style": [{ divide: [...ge(), "hidden", "none"] }],
        "border-color": [{ border: Y() }],
        "border-color-x": [{ "border-x": Y() }],
        "border-color-y": [{ "border-y": Y() }],
        "border-color-s": [{ "border-s": Y() }],
        "border-color-e": [{ "border-e": Y() }],
        "border-color-bs": [{ "border-bs": Y() }],
        "border-color-be": [{ "border-be": Y() }],
        "border-color-t": [{ "border-t": Y() }],
        "border-color-r": [{ "border-r": Y() }],
        "border-color-b": [{ "border-b": Y() }],
        "border-color-l": [{ "border-l": Y() }],
        "divide-color": [{ divide: Y() }],
        "outline-style": [{ outline: [...ge(), "none", "hidden"] }],
        "outline-offset": [{ "outline-offset": [se, J, Z] }],
        "outline-w": [{ outline: ["", se, $n, ca] }],
        "outline-color": [{ outline: Y() }],
        shadow: [{ shadow: ["", "none", C, xi, Si] }],
        "shadow-color": [{ shadow: Y() }],
        "inset-shadow": [{ "inset-shadow": ["none", E, xi, Si] }],
        "inset-shadow-color": [{ "inset-shadow": Y() }],
        "ring-w": [{ ring: te() }],
        "ring-w-inset": ["ring-inset"],
        "ring-color": [{ ring: Y() }],
        "ring-offset-w": [{ "ring-offset": [se, ca] }],
        "ring-offset-color": [{ "ring-offset": Y() }],
        "inset-ring-w": [{ "inset-ring": te() }],
        "inset-ring-color": [{ "inset-ring": Y() }],
        "text-shadow": [{ "text-shadow": ["none", w, xi, Si] }],
        "text-shadow-color": [{ "text-shadow": Y() }],
        opacity: [{ opacity: [se, J, Z] }],
        "mix-blend": [
          { "mix-blend": [...Ke(), "plus-darker", "plus-lighter"] },
        ],
        "bg-blend": [{ "bg-blend": Ke() }],
        "mask-clip": [
          {
            "mask-clip": [
              "border",
              "padding",
              "content",
              "fill",
              "stroke",
              "view",
            ],
          },
          "mask-no-clip",
        ],
        "mask-composite": [
          { mask: ["add", "subtract", "intersect", "exclude"] },
        ],
        "mask-image-linear-pos": [{ "mask-linear": [se] }],
        "mask-image-linear-from-pos": [{ "mask-linear-from": oe() }],
        "mask-image-linear-to-pos": [{ "mask-linear-to": oe() }],
        "mask-image-linear-from-color": [{ "mask-linear-from": Y() }],
        "mask-image-linear-to-color": [{ "mask-linear-to": Y() }],
        "mask-image-t-from-pos": [{ "mask-t-from": oe() }],
        "mask-image-t-to-pos": [{ "mask-t-to": oe() }],
        "mask-image-t-from-color": [{ "mask-t-from": Y() }],
        "mask-image-t-to-color": [{ "mask-t-to": Y() }],
        "mask-image-r-from-pos": [{ "mask-r-from": oe() }],
        "mask-image-r-to-pos": [{ "mask-r-to": oe() }],
        "mask-image-r-from-color": [{ "mask-r-from": Y() }],
        "mask-image-r-to-color": [{ "mask-r-to": Y() }],
        "mask-image-b-from-pos": [{ "mask-b-from": oe() }],
        "mask-image-b-to-pos": [{ "mask-b-to": oe() }],
        "mask-image-b-from-color": [{ "mask-b-from": Y() }],
        "mask-image-b-to-color": [{ "mask-b-to": Y() }],
        "mask-image-l-from-pos": [{ "mask-l-from": oe() }],
        "mask-image-l-to-pos": [{ "mask-l-to": oe() }],
        "mask-image-l-from-color": [{ "mask-l-from": Y() }],
        "mask-image-l-to-color": [{ "mask-l-to": Y() }],
        "mask-image-x-from-pos": [{ "mask-x-from": oe() }],
        "mask-image-x-to-pos": [{ "mask-x-to": oe() }],
        "mask-image-x-from-color": [{ "mask-x-from": Y() }],
        "mask-image-x-to-color": [{ "mask-x-to": Y() }],
        "mask-image-y-from-pos": [{ "mask-y-from": oe() }],
        "mask-image-y-to-pos": [{ "mask-y-to": oe() }],
        "mask-image-y-from-color": [{ "mask-y-from": Y() }],
        "mask-image-y-to-color": [{ "mask-y-to": Y() }],
        "mask-image-radial": [{ "mask-radial": [J, Z] }],
        "mask-image-radial-from-pos": [{ "mask-radial-from": oe() }],
        "mask-image-radial-to-pos": [{ "mask-radial-to": oe() }],
        "mask-image-radial-from-color": [{ "mask-radial-from": Y() }],
        "mask-image-radial-to-color": [{ "mask-radial-to": Y() }],
        "mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
        "mask-image-radial-size": [
          {
            "mask-radial": [
              { closest: ["side", "corner"], farthest: ["side", "corner"] },
            ],
          },
        ],
        "mask-image-radial-pos": [{ "mask-radial-at": K() }],
        "mask-image-conic-pos": [{ "mask-conic": [se] }],
        "mask-image-conic-from-pos": [{ "mask-conic-from": oe() }],
        "mask-image-conic-to-pos": [{ "mask-conic-to": oe() }],
        "mask-image-conic-from-color": [{ "mask-conic-from": Y() }],
        "mask-image-conic-to-color": [{ "mask-conic-to": Y() }],
        "mask-mode": [{ mask: ["alpha", "luminance", "match"] }],
        "mask-origin": [
          {
            "mask-origin": [
              "border",
              "padding",
              "content",
              "fill",
              "stroke",
              "view",
            ],
          },
        ],
        "mask-position": [{ mask: b() }],
        "mask-repeat": [{ mask: j() }],
        "mask-size": [{ mask: G() }],
        "mask-type": [{ "mask-type": ["alpha", "luminance"] }],
        "mask-image": [{ mask: ["none", J, Z] }],
        filter: [{ filter: ["", "none", J, Z] }],
        blur: [{ blur: dl() }],
        brightness: [{ brightness: [se, J, Z] }],
        contrast: [{ contrast: [se, J, Z] }],
        "drop-shadow": [{ "drop-shadow": ["", "none", q, xi, Si] }],
        "drop-shadow-color": [{ "drop-shadow": Y() }],
        grayscale: [{ grayscale: ["", se, J, Z] }],
        "hue-rotate": [{ "hue-rotate": [se, J, Z] }],
        invert: [{ invert: ["", se, J, Z] }],
        saturate: [{ saturate: [se, J, Z] }],
        sepia: [{ sepia: ["", se, J, Z] }],
        "backdrop-filter": [{ "backdrop-filter": ["", "none", J, Z] }],
        "backdrop-blur": [{ "backdrop-blur": dl() }],
        "backdrop-brightness": [{ "backdrop-brightness": [se, J, Z] }],
        "backdrop-contrast": [{ "backdrop-contrast": [se, J, Z] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": ["", se, J, Z] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [se, J, Z] }],
        "backdrop-invert": [{ "backdrop-invert": ["", se, J, Z] }],
        "backdrop-opacity": [{ "backdrop-opacity": [se, J, Z] }],
        "backdrop-saturate": [{ "backdrop-saturate": [se, J, Z] }],
        "backdrop-sepia": [{ "backdrop-sepia": ["", se, J, Z] }],
        "border-collapse": [{ border: ["collapse", "separate"] }],
        "border-spacing": [{ "border-spacing": V() }],
        "border-spacing-x": [{ "border-spacing-x": V() }],
        "border-spacing-y": [{ "border-spacing-y": V() }],
        "table-layout": [{ table: ["auto", "fixed"] }],
        caption: [{ caption: ["top", "bottom"] }],
        transition: [
          {
            transition: [
              "",
              "all",
              "colors",
              "opacity",
              "shadow",
              "transform",
              "none",
              J,
              Z,
            ],
          },
        ],
        "transition-behavior": [{ transition: ["normal", "discrete"] }],
        duration: [{ duration: [se, "initial", J, Z] }],
        ease: [{ ease: ["linear", "initial", $, J, Z] }],
        delay: [{ delay: [se, J, Z] }],
        animate: [{ animate: ["none", ne, J, Z] }],
        backface: [{ backface: ["hidden", "visible"] }],
        perspective: [{ perspective: [B, J, Z] }],
        "perspective-origin": [{ "perspective-origin": fe() }],
        rotate: [{ rotate: Qt() }],
        "rotate-x": [{ "rotate-x": Qt() }],
        "rotate-y": [{ "rotate-y": Qt() }],
        "rotate-z": [{ "rotate-z": Qt() }],
        scale: [{ scale: ml() }],
        "scale-x": [{ "scale-x": ml() }],
        "scale-y": [{ "scale-y": ml() }],
        "scale-z": [{ "scale-z": ml() }],
        "scale-3d": ["scale-3d"],
        skew: [{ skew: sa() }],
        "skew-x": [{ "skew-x": sa() }],
        "skew-y": [{ "skew-y": sa() }],
        transform: [{ transform: [J, Z, "", "none", "gpu", "cpu"] }],
        "transform-origin": [{ origin: fe() }],
        "transform-style": [{ transform: ["3d", "flat"] }],
        translate: [{ translate: zt() }],
        "translate-x": [{ "translate-x": zt() }],
        "translate-y": [{ "translate-y": zt() }],
        "translate-z": [{ "translate-z": zt() }],
        "translate-none": ["translate-none"],
        accent: [{ accent: Y() }],
        appearance: [{ appearance: ["none", "auto"] }],
        "caret-color": [{ caret: Y() }],
        "color-scheme": [
          {
            scheme: [
              "normal",
              "dark",
              "light",
              "light-dark",
              "only-dark",
              "only-light",
            ],
          },
        ],
        cursor: [
          {
            cursor: [
              "auto",
              "default",
              "pointer",
              "wait",
              "text",
              "move",
              "help",
              "not-allowed",
              "none",
              "context-menu",
              "progress",
              "cell",
              "crosshair",
              "vertical-text",
              "alias",
              "copy",
              "no-drop",
              "grab",
              "grabbing",
              "all-scroll",
              "col-resize",
              "row-resize",
              "n-resize",
              "e-resize",
              "s-resize",
              "w-resize",
              "ne-resize",
              "nw-resize",
              "se-resize",
              "sw-resize",
              "ew-resize",
              "ns-resize",
              "nesw-resize",
              "nwse-resize",
              "zoom-in",
              "zoom-out",
              J,
              Z,
            ],
          },
        ],
        "field-sizing": [{ "field-sizing": ["fixed", "content"] }],
        "pointer-events": [{ "pointer-events": ["auto", "none"] }],
        resize: [{ resize: ["none", "", "y", "x"] }],
        "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
        "scroll-m": [{ "scroll-m": V() }],
        "scroll-mx": [{ "scroll-mx": V() }],
        "scroll-my": [{ "scroll-my": V() }],
        "scroll-ms": [{ "scroll-ms": V() }],
        "scroll-me": [{ "scroll-me": V() }],
        "scroll-mbs": [{ "scroll-mbs": V() }],
        "scroll-mbe": [{ "scroll-mbe": V() }],
        "scroll-mt": [{ "scroll-mt": V() }],
        "scroll-mr": [{ "scroll-mr": V() }],
        "scroll-mb": [{ "scroll-mb": V() }],
        "scroll-ml": [{ "scroll-ml": V() }],
        "scroll-p": [{ "scroll-p": V() }],
        "scroll-px": [{ "scroll-px": V() }],
        "scroll-py": [{ "scroll-py": V() }],
        "scroll-ps": [{ "scroll-ps": V() }],
        "scroll-pe": [{ "scroll-pe": V() }],
        "scroll-pbs": [{ "scroll-pbs": V() }],
        "scroll-pbe": [{ "scroll-pbe": V() }],
        "scroll-pt": [{ "scroll-pt": V() }],
        "scroll-pr": [{ "scroll-pr": V() }],
        "scroll-pb": [{ "scroll-pb": V() }],
        "scroll-pl": [{ "scroll-pl": V() }],
        "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
        "snap-stop": [{ snap: ["normal", "always"] }],
        "snap-type": [{ snap: ["none", "x", "y", "both"] }],
        "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
        touch: [{ touch: ["auto", "none", "manipulation"] }],
        "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
        "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
        "touch-pz": ["touch-pinch-zoom"],
        select: [{ select: ["none", "text", "all", "auto"] }],
        "will-change": [
          { "will-change": ["auto", "scroll", "contents", "transform", J, Z] },
        ],
        fill: [{ fill: ["none", ...Y()] }],
        "stroke-w": [{ stroke: [se, $n, ca, Pm] }],
        stroke: [{ stroke: ["none", ...Y()] }],
        "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
      },
      conflictingClassGroups: {
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: [
          "inset-x",
          "inset-y",
          "inset-bs",
          "inset-be",
          "start",
          "end",
          "top",
          "right",
          "bottom",
          "left",
        ],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
        mx: ["mr", "ml"],
        my: ["mt", "mb"],
        size: ["w", "h"],
        "font-size": ["leading"],
        "fvn-normal": [
          "fvn-ordinal",
          "fvn-slashed-zero",
          "fvn-figure",
          "fvn-spacing",
          "fvn-fraction",
        ],
        "fvn-ordinal": ["fvn-normal"],
        "fvn-slashed-zero": ["fvn-normal"],
        "fvn-figure": ["fvn-normal"],
        "fvn-spacing": ["fvn-normal"],
        "fvn-fraction": ["fvn-normal"],
        "line-clamp": ["display", "overflow"],
        rounded: [
          "rounded-s",
          "rounded-e",
          "rounded-t",
          "rounded-r",
          "rounded-b",
          "rounded-l",
          "rounded-ss",
          "rounded-se",
          "rounded-ee",
          "rounded-es",
          "rounded-tl",
          "rounded-tr",
          "rounded-br",
          "rounded-bl",
        ],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": [
          "border-w-x",
          "border-w-y",
          "border-w-s",
          "border-w-e",
          "border-w-bs",
          "border-w-be",
          "border-w-t",
          "border-w-r",
          "border-w-b",
          "border-w-l",
        ],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": [
          "border-color-x",
          "border-color-y",
          "border-color-s",
          "border-color-e",
          "border-color-bs",
          "border-color-be",
          "border-color-t",
          "border-color-r",
          "border-color-b",
          "border-color-l",
        ],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        translate: ["translate-x", "translate-y", "translate-none"],
        "translate-none": [
          "translate",
          "translate-x",
          "translate-y",
          "translate-z",
        ],
        "scroll-m": [
          "scroll-mx",
          "scroll-my",
          "scroll-ms",
          "scroll-me",
          "scroll-mbs",
          "scroll-mbe",
          "scroll-mt",
          "scroll-mr",
          "scroll-mb",
          "scroll-ml",
        ],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": [
          "scroll-px",
          "scroll-py",
          "scroll-ps",
          "scroll-pe",
          "scroll-pbs",
          "scroll-pbe",
          "scroll-pt",
          "scroll-pr",
          "scroll-pb",
          "scroll-pl",
        ],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"],
      },
      conflictingClassGroupModifiers: { "font-size": ["leading"] },
      orderSensitiveModifiers: [
        "*",
        "**",
        "after",
        "backdrop",
        "before",
        "details-content",
        "file",
        "first-letter",
        "first-line",
        "marker",
        "placeholder",
        "selection",
      ],
    }
  },
  g0 = $b(v0)
function Vl(...i) {
  return g0(Nh(i))
}
const p0 = _h(
  "h-5 gap-1 rounded-none border border-transparent px-2 py-0.5 text-xs font-medium transition-all has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-3! inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive overflow-hidden group/badge",
  {
    defaultVariants: { variant: "default" },
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        destructive:
          "bg-destructive/10 [a]:hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive dark:bg-destructive/20",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
      },
    },
  }
)
function Ci({ className: i, variant: c = "default", render: s, ...r }) {
  return Ob({
    defaultTagName: "span",
    props: So({ className: Vl(p0({ variant: c }), i) }, r),
    render: s,
    state: { slot: "badge", variant: c },
  })
}
const b0 = [
  { to: "/cities", label: "Cities" },
  { to: "/agents", label: "Agents" },
  { to: "/schedules", label: "Schedules" },
]
function S0() {
  return N.jsx("div", {
    className: "min-h-screen bg-background text-foreground",
    children: N.jsxs("div", {
      className: "flex min-h-screen flex-col md:flex-row",
      children: [
        N.jsxs("nav", {
          className:
            "border-border/80 bg-card border-b px-3 py-4 md:w-60 md:shrink-0 md:border-r md:border-b-0",
          children: [
            N.jsx("div", {
              className: "px-2 pb-4",
              children: N.jsx("p", {
                className: "text-sm font-semibold tracking-tight",
                children: "Citynote Admin",
              }),
            }),
            N.jsx("ul", {
              className: "grid gap-1 md:block md:space-y-1",
              children: b0.map((i) =>
                N.jsx(
                  "li",
                  {
                    children: N.jsx(Sh, {
                      to: i.to,
                      className: ({ isActive: c }) =>
                        Vl(
                          "text-muted-foreground hover:text-foreground hover:bg-muted block rounded-none border border-transparent px-3 py-2 text-sm font-medium transition-colors",
                          c && "text-foreground border-border/80 bg-muted"
                        ),
                      children: i.label,
                    }),
                  },
                  i.to
                )
              ),
            }),
            N.jsx("div", {
              className: "border-border/70 mt-4 border-t pt-3",
              children: N.jsx(Ci, {
                variant: "secondary",
                className: "font-mono text-[11px]",
                children: "DEV ONLY",
              }),
            }),
          ],
        }),
        N.jsx("main", {
          className: "flex-1 bg-background",
          children: N.jsx("div", {
            className: "mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-8",
            children: N.jsx(_p, {}),
          }),
        }),
      ],
    }),
  })
}
function Pn({ className: i, size: c = "default", ...s }) {
  return N.jsx("div", {
    "data-slot": "card",
    "data-size": c,
    className: Vl(
      "ring-foreground/10 bg-card text-card-foreground group/card flex flex-col gap-4 overflow-hidden rounded-none py-4 text-xs/relaxed ring-1 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-2 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-none *:[img:last-child]:rounded-none",
      i
    ),
    ...s,
  })
}
function To({ className: i, ...c }) {
  return N.jsx("div", {
    "data-slot": "card-header",
    className: Vl(
      "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-none px-4 group-data-[size=sm]/card:px-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3",
      i
    ),
    ...c,
  })
}
function Ao({ className: i, ...c }) {
  return N.jsx("div", {
    "data-slot": "card-title",
    className: Vl("text-sm font-medium group-data-[size=sm]/card:text-sm", i),
    ...c,
  })
}
function kh({ className: i, ...c }) {
  return N.jsx("div", {
    "data-slot": "card-description",
    className: Vl("text-muted-foreground text-xs/relaxed", i),
    ...c,
  })
}
function Ro({ className: i, ...c }) {
  return N.jsx("div", {
    "data-slot": "card-content",
    className: Vl("px-4 group-data-[size=sm]/card:px-3", i),
    ...c,
  })
}
const x0 = {
    melbourne: {
      slug: "melbourne",
      weatherQuery: "-37.8136,144.9631",
      localCurrency: "AUD",
      newsProfile: {
        cityAliases: ["melbourne", "victoria"],
        countryAliases: ["australia", "australian", "victorian"],
        impactKeywords: [
          "disruption",
          "transport",
          "train",
          "tram",
          "bus",
          "incident",
          "fire",
          "emergency",
          "warning",
          "alert",
          "policy",
          "visa",
          "travel advisory",
          "flood",
          "storm",
          "inflation",
          "interest rate",
        ],
        excludedAmbiguities: ["melbourne florida", "florida usa"],
      },
      newsFallbackLinks: [
        {
          title: "Visit Melbourne updates",
          url: "https://www.visitmelbourne.com/",
          source: "Visit Melbourne",
        },
        {
          title: "Victoria transport disruptions",
          url: "https://www.ptv.vic.gov.au/disruptions/",
          source: "PTV",
        },
      ],
    },
    seoul: {
      slug: "seoul",
      weatherQuery: "37.5665,126.9780",
      localCurrency: "KRW",
      newsProfile: {
        cityAliases: ["seoul"],
        countryAliases: ["south korea", "republic of korea", "korea", "korean"],
        impactKeywords: [
          "subway",
          "metro",
          "transport",
          "strike",
          "warning",
          "advisory",
          "visa",
          "entry",
          "policy",
          "typhoon",
          "flood",
          "air quality",
          "missile",
          "north korea",
          "security",
          "emergency",
        ],
        excludedAmbiguities: [],
      },
      newsFallbackLinks: [
        {
          title: "Visit Seoul updates",
          url: "https://english.visitseoul.net/",
          source: "Visit Seoul",
        },
        {
          title: "Korea tourism updates",
          url: "https://english.visitkorea.or.kr/",
          source: "Visit Korea",
        },
      ],
    },
  },
  no = Object.values(x0)
function E0() {
  return N.jsxs("div", {
    className: "space-y-6",
    children: [
      N.jsxs("header", {
        className: "flex flex-wrap items-center gap-3",
        children: [
          N.jsx("h1", {
            className: "text-xl font-semibold tracking-tight",
            children: "Cities",
          }),
          N.jsxs(Ci, {
            variant: "outline",
            className: "font-mono text-[11px]",
            children: [no.length, " configured"],
          }),
        ],
      }),
      N.jsx(Pn, {
        className: "gap-0 overflow-hidden py-0",
        children: N.jsx("div", {
          className: "overflow-x-auto",
          children: N.jsxs("table", {
            className: "min-w-full text-xs",
            children: [
              N.jsx("thead", {
                className: "bg-muted/40",
                children: N.jsxs("tr", {
                  children: [
                    N.jsx("th", {
                      className:
                        "text-muted-foreground border-border/80 border-b px-3 py-2 text-left text-[11px] font-medium uppercase tracking-wide whitespace-nowrap",
                      children: "Slug",
                    }),
                    N.jsx("th", {
                      className:
                        "text-muted-foreground border-border/80 border-b px-3 py-2 text-left text-[11px] font-medium uppercase tracking-wide whitespace-nowrap",
                      children: "Currency",
                    }),
                    N.jsx("th", {
                      className:
                        "text-muted-foreground border-border/80 border-b px-3 py-2 text-left text-[11px] font-medium uppercase tracking-wide whitespace-nowrap",
                      children: "Weather Query",
                    }),
                    N.jsx("th", {
                      className:
                        "text-muted-foreground border-border/80 border-b px-3 py-2 text-left text-[11px] font-medium uppercase tracking-wide whitespace-nowrap",
                      children: "News Aliases",
                    }),
                    N.jsx("th", {
                      className:
                        "text-muted-foreground border-border/80 border-b px-3 py-2 text-left text-[11px] font-medium uppercase tracking-wide whitespace-nowrap",
                      children: "Fallback Links",
                    }),
                  ],
                }),
              }),
              N.jsx("tbody", {
                children: no.map((i) =>
                  N.jsxs(
                    "tr",
                    {
                      className: "border-border/60 border-b last:border-b-0",
                      children: [
                        N.jsx("td", {
                          className: "px-3 py-2 align-top text-xs",
                          children: N.jsx(In, {
                            to: `/cities/${i.slug}`,
                            className:
                              "text-primary font-mono text-xs font-medium hover:underline",
                            children: i.slug,
                          }),
                        }),
                        N.jsx("td", {
                          className: "px-3 py-2 align-top text-xs",
                          children: i.localCurrency,
                        }),
                        N.jsx("td", {
                          className: "px-3 py-2 align-top text-xs",
                          children: N.jsx("code", {
                            className:
                              "bg-muted rounded-none px-1.5 py-0.5 font-mono text-[11px]",
                            children: i.weatherQuery,
                          }),
                        }),
                        N.jsx("td", {
                          className: "px-3 py-2 align-top text-xs",
                          children: i.newsProfile.cityAliases.join(", "),
                        }),
                        N.jsx("td", {
                          className: "px-3 py-2 align-top text-xs",
                          children: i.newsFallbackLinks.length,
                        }),
                      ],
                    },
                    i.slug
                  )
                ),
              }),
            ],
          }),
        }),
      }),
      N.jsx("div", {
        className: "space-y-3",
        children: no.map((i) =>
          N.jsx(
            Pn,
            {
              className: "gap-0 overflow-hidden py-0",
              children: N.jsxs("details", {
                className: "group",
                children: [
                  N.jsxs("summary", {
                    className:
                      "hover:bg-muted/40 cursor-pointer px-4 py-3 text-sm font-medium transition-colors",
                    children: [
                      N.jsx("span", {
                        className: "font-mono text-xs",
                        children: i.slug,
                      }),
                      N.jsxs("span", {
                        className: "text-muted-foreground",
                        children: [" ", "- full runtime config"],
                      }),
                    ],
                  }),
                  N.jsx("div", {
                    className: "border-border/70 border-t",
                    children: N.jsx("pre", {
                      className:
                        "bg-muted/30 max-h-96 overflow-auto px-4 py-4 font-mono text-[11px] leading-relaxed",
                      children: JSON.stringify(i, null, 2),
                    }),
                  }),
                ],
              }),
            },
            i.slug
          )
        ),
      }),
    ],
  })
}
function z0() {
  return typeof window < "u"
}
function T0(i) {
  var c
  return (
    (i == null || (c = i.ownerDocument) == null ? void 0 : c.defaultView) ||
    window
  )
}
function A0(i) {
  return z0() ? i instanceof HTMLElement || i instanceof T0(i).HTMLElement : !1
}
const uo = zg[`useInsertionEffect${Math.random().toFixed(1)}`.slice(0, -3)],
  R0 = uo && uo !== A.useLayoutEffect ? uo : (i) => i()
function lh(i) {
  const c = xo(C0).current
  return ((c.next = i), R0(c.effect), c.trampoline)
}
function C0() {
  const i = {
    next: void 0,
    callback: O0,
    trampoline: (...c) => i.callback?.(...c),
    effect: () => {
      i.callback = i.next
    },
  }
  return i
}
function O0() {}
const N0 = () => {},
  _0 = typeof document < "u" ? A.useLayoutEffect : N0,
  M0 = A.createContext(void 0)
function D0(i = !1) {
  const c = A.useContext(M0)
  if (c === void 0 && !i) throw new Error(Th(16))
  return c
}
function U0(i) {
  const {
      focusableWhenDisabled: c,
      disabled: s,
      composite: r = !1,
      tabIndex: f = 0,
      isNativeButton: m,
    } = i,
    y = r && c !== !1,
    x = r && c === !1
  return {
    props: A.useMemo(() => {
      const h = {
        onKeyDown(C) {
          s && c && C.key !== "Tab" && C.preventDefault()
        },
      }
      return (
        r || ((h.tabIndex = f), !m && s && (h.tabIndex = c ? f : -1)),
        ((m && (c || y)) || (!m && s)) && (h["aria-disabled"] = s),
        m && (!c || x) && (h.disabled = s),
        h
      )
    }, [r, s, c, y, x, m, f]),
  }
}
function j0(i = {}) {
  const {
      disabled: c = !1,
      focusableWhenDisabled: s,
      tabIndex: r = 0,
      native: f = !0,
    } = i,
    m = A.useRef(null),
    y = D0(!0) !== void 0,
    x = lh(() => {
      const w = m.current
      return !!(w?.tagName === "A" && w?.href)
    }),
    { props: g } = U0({
      focusableWhenDisabled: s,
      disabled: c,
      composite: y,
      tabIndex: r,
      isNativeButton: f,
    }),
    h = A.useCallback(() => {
      const w = m.current
      w0(w) &&
        y &&
        c &&
        g.disabled === void 0 &&
        w.disabled &&
        (w.disabled = !1)
    }, [c, g.disabled, y])
  _0(h, [h])
  const C = A.useCallback(
      (w = {}) => {
        const {
          onClick: q,
          onMouseDown: X,
          onKeyUp: B,
          onKeyDown: H,
          onPointerDown: $,
          ...ne
        } = w
        return So(
          {
            type: f ? "button" : void 0,
            onClick(K) {
              if (c) {
                K.preventDefault()
                return
              }
              q?.(K)
            },
            onMouseDown(K) {
              c || X?.(K)
            },
            onKeyDown(K) {
              if ((c || (so(K), H?.(K)), K.baseUIHandlerPrevented)) return
              const fe = K.target === K.currentTarget && !f && !x() && !c,
                de = K.key === "Enter",
                ee = K.key === " "
              fe && ((ee || de) && K.preventDefault(), de && q?.(K))
            },
            onKeyUp(K) {
              ;(c || (so(K), B?.(K)),
                !K.baseUIHandlerPrevented &&
                  K.target === K.currentTarget &&
                  !f &&
                  !c &&
                  K.key === " " &&
                  q?.(K))
            },
            onPointerDown(K) {
              if (c) {
                K.preventDefault()
                return
              }
              $?.(K)
            },
          },
          f ? void 0 : { role: "button" },
          g,
          ne
        )
      },
      [c, g, f, x]
    ),
    E = lh((w) => {
      ;((m.current = w), h())
    })
  return { getButtonProps: C, buttonRef: E }
}
function w0(i) {
  return A0(i) && i.tagName === "BUTTON"
}
const H0 = A.forwardRef(function (c, s) {
    const {
        render: r,
        className: f,
        disabled: m = !1,
        focusableWhenDisabled: y = !1,
        nativeButton: x = !0,
        ...g
      } = c,
      { getButtonProps: h, buttonRef: C } = j0({
        disabled: m,
        focusableWhenDisabled: y,
        native: x,
      })
    return Ch("button", c, {
      state: { disabled: m },
      ref: [s, C],
      props: [g, h],
    })
  }),
  B0 = _h(
    "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-none border border-transparent bg-clip-padding text-xs font-medium focus-visible:ring-1 aria-invalid:ring-1 [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none",
    {
      defaultVariants: { size: "default", variant: "default" },
      variants: {
        size: {
          default:
            "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
          xs: "h-6 gap-1 rounded-none px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
          sm: "h-7 gap-1 rounded-none px-2.5 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
          lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
          icon: "size-8",
          "icon-xs": "size-6 rounded-none [&_svg:not([class*='size-'])]:size-3",
          "icon-sm": "size-7 rounded-none",
          "icon-lg": "size-9",
        },
        variant: {
          default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
          outline:
            "border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground",
          secondary:
            "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
          ghost:
            "hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground",
          destructive:
            "bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/20 text-destructive focus-visible:border-destructive/40 dark:hover:bg-destructive/30",
          link: "text-primary underline-offset-4 hover:underline",
        },
      },
    }
  )
function Zh({
  className: i,
  variant: c = "default",
  size: s = "default",
  ...r
}) {
  return N.jsx(H0, {
    "data-slot": "button",
    className: Vl(B0({ className: i, size: s, variant: c })),
    ...r,
  })
}
const L0 = [
  { key: "atAGlance", label: "At a Glance" },
  { key: "climate", label: "Climate" },
  { key: "costOfLiving", label: "Cost of Living" },
  { key: "gettingAround", label: "Getting Around" },
  { key: "connectivity", label: "Connectivity" },
  { key: "neighborhoods", label: "Neighborhoods" },
  { key: "foodDrink", label: "Food & Drink" },
  { key: "languageCulture", label: "Language & Culture" },
  { key: "safetyHealth", label: "Safety & Health" },
  { key: "practicalInfo", label: "Practical Info" },
  { key: "ruleTraps", label: "Rule Traps" },
]
function q0() {
  const { slug: i } = yp(),
    [c, s] = A.useState(null),
    [r, f] = A.useState(!1),
    [m, y] = A.useState(!1),
    [x, g] = A.useState(!0),
    [h, C] = A.useState(null),
    [E, w] = A.useState({}),
    [q, X] = A.useState(null),
    [B, H] = A.useState(null),
    [$, ne] = A.useState(null),
    [I, K] = A.useState(!1),
    [fe, de] = A.useState(null)
  A.useEffect(() => {
    i &&
      (g(!0),
      C(null),
      Promise.all([
        fetch(`/api/cities/${i}`).then((ce) => ce.json()),
        fetch("/api/status").then((ce) => ce.json()),
      ])
        .then(([ce, Me]) => {
          if (ce.error) {
            C(ce.error)
            return
          }
          ;(s(ce.city), f(Me.apiConfigured), y(!0))
        })
        .catch((ce) => C(ce.message))
        .finally(() => g(!1)))
  }, [i])
  async function ee(ce) {
    if (i) {
      ;(X(ce), H(null))
      try {
        const De = await (
          await fetch(`/api/cities/${i}/validate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ section: ce }),
          })
        ).json()
        if (De.error) {
          H(De.error)
          return
        }
        w((at) => ({ ...at, [ce]: De.result }))
      } catch (Me) {
        H(Me instanceof Error ? Me.message : "Validation request failed")
      } finally {
        X(null)
      }
    }
  }
  async function V() {
    if (i) {
      ;(K(!0), de(null))
      try {
        const Me = await (
          await fetch(`/api/cities/${i}/search-news`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
          })
        ).json()
        if (Me.error) {
          de(Me.error)
          return
        }
        ne(Me)
      } catch (ce) {
        de(ce instanceof Error ? ce.message : "News search request failed")
      } finally {
        K(!1)
      }
    }
  }
  if (x)
    return N.jsx("div", {
      className: "text-muted-foreground px-1 py-6 text-sm",
      children: "Loading city data...",
    })
  if (h || !c)
    return N.jsxs("div", {
      className: "space-y-3",
      children: [
        N.jsx(In, {
          to: "/cities",
          className:
            "text-muted-foreground hover:text-foreground inline-flex items-center text-xs transition-colors",
          children: "← Cities",
        }),
        N.jsx("div", {
          className:
            "border-destructive/30 bg-destructive/10 text-destructive rounded-none border px-3 py-2 text-xs",
          children: h ?? "City not found",
        }),
      ],
    })
  const be = L0.filter((ce) => c[ce.key] != null)
  return N.jsxs("div", {
    className: "space-y-6",
    children: [
      N.jsx(In, {
        to: "/cities",
        className:
          "text-muted-foreground hover:text-foreground inline-flex items-center text-xs transition-colors",
        children: "← Cities",
      }),
      N.jsxs("div", {
        className: "flex flex-wrap items-start justify-between gap-3",
        children: [
          N.jsxs("div", {
            children: [
              N.jsxs("h1", {
                className: "text-xl font-semibold tracking-tight",
                children: [c.name, ", ", c.country],
              }),
              N.jsx("p", {
                className: "text-muted-foreground mt-1 text-sm",
                children: c.tagline,
              }),
            ],
          }),
          N.jsx(Y0, { configured: r, checked: m }),
        ],
      }),
      !r &&
        m &&
        N.jsx("div", {
          className:
            "rounded-none border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-900",
          children:
            "RESEARCH_API_KEY is not set. Export it in your shell before running the admin tool.",
        }),
      B
        ? N.jsx("div", {
            className:
              "border-destructive/30 bg-destructive/10 text-destructive rounded-none border px-3 py-2 text-xs",
            children: B,
          })
        : null,
      N.jsx("div", {
        className: "space-y-3",
        children: be.map((ce) =>
          N.jsx(
            G0,
            {
              sectionKey: ce.key,
              label: ce.label,
              data: c[ce.key],
              result: E[ce.key],
              isValidating: q === ce.key,
              anyValidating: q !== null,
              apiConfigured: r,
              onValidate: () => ee(ce.key),
            },
            ce.key
          )
        ),
      }),
      N.jsx(X0, {
        results: $,
        error: fe,
        isSearching: I,
        apiConfigured: r,
        onSearch: V,
      }),
    ],
  })
}
function Y0({ configured: i, checked: c }) {
  return c
    ? i
      ? N.jsx(Ci, {
          variant: "secondary",
          className:
            "border-emerald-600/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
          children: "Research API connected",
        })
      : N.jsx(Ci, {
          variant: "destructive",
          className: "border-destructive/20 bg-destructive/10",
          children: "API key missing",
        })
    : null
}
function G0({
  sectionKey: i,
  label: c,
  data: s,
  result: r,
  isValidating: f,
  anyValidating: m,
  apiConfigured: y,
  onValidate: x,
}) {
  const g = f || m || !y
  return N.jsxs(Pn, {
    className: "gap-0 overflow-hidden py-0",
    "data-section": i,
    children: [
      N.jsx(To, {
        className: "border-b px-4 py-3",
        children: N.jsxs("div", {
          className: "flex flex-wrap items-center justify-between gap-2",
          children: [
            N.jsx(Ao, { children: c }),
            N.jsx(Zh, {
              onClick: x,
              disabled: g,
              size: "xs",
              variant: "outline",
              children: f ? "Validating..." : "Validate",
            }),
          ],
        }),
      }),
      N.jsxs(Ro, {
        className: "px-0 pb-0",
        children: [
          N.jsxs("details", {
            children: [
              N.jsx("summary", {
                className:
                  "text-muted-foreground hover:bg-muted/40 cursor-pointer px-4 py-2 text-[11px] transition-colors",
                children: "Current data",
              }),
              N.jsx("pre", {
                className:
                  "bg-muted/30 border-border/60 max-h-72 overflow-auto border-t px-4 py-3 font-mono text-[11px] leading-relaxed",
                children: JSON.stringify(s, null, 2),
              }),
            ],
          }),
          r ? N.jsx(V0, { result: r }) : null,
        ],
      }),
    ],
  })
}
function V0({ result: i }) {
  return N.jsxs("div", {
    className: "border-border/60 bg-primary/5 border-t px-4 py-4",
    children: [
      N.jsxs("div", {
        className:
          "text-muted-foreground mb-3 flex flex-col gap-1 text-[11px] sm:flex-row sm:items-center sm:justify-between",
        children: [
          N.jsxs("span", {
            children: ["Validated ", new Date(i.validatedAt).toLocaleString()],
          }),
          N.jsxs("span", {
            className: "font-mono",
            children: [i.model, " - ", i.usage.total_tokens, " tokens"],
          }),
        ],
      }),
      N.jsx("div", {
        className: "space-y-1 text-xs leading-relaxed",
        children: i.sonarFindings
          .split(`
`)
          .map((c, s) =>
            c.startsWith("## ")
              ? N.jsx(
                  "h4",
                  {
                    className: "pt-2 text-xs font-semibold",
                    children: c.replace("## ", ""),
                  },
                  s
                )
              : c.startsWith("- **OUTDATED") || c.startsWith("- OUTDATED")
                ? N.jsx(
                    "p",
                    { className: "text-destructive font-medium", children: c },
                    s
                  )
                : c.startsWith("- **CURRENT") || c.startsWith("- CURRENT")
                  ? N.jsx(
                      "p",
                      {
                        className:
                          "font-medium text-emerald-700 dark:text-emerald-300",
                        children: c,
                      },
                      s
                    )
                  : c.trim() === ""
                    ? N.jsx("div", { className: "h-2" }, s)
                    : N.jsx("p", { children: c }, s)
          ),
      }),
      i.citations.length > 0
        ? N.jsxs("div", {
            className: "border-border/60 mt-3 border-t pt-3",
            children: [
              N.jsx("p", {
                className: "text-muted-foreground text-[11px] font-medium",
                children: "Sources:",
              }),
              N.jsx("ul", {
                className: "mt-1 list-disc space-y-1 pl-4 text-xs",
                children: i.citations.map((c, s) =>
                  N.jsx(
                    "li",
                    {
                      children: N.jsx("a", {
                        href: c,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "text-primary break-all hover:underline",
                        children: Q0(c),
                      }),
                    },
                    s
                  )
                ),
              }),
            ],
          })
        : null,
    ],
  })
}
function X0({
  results: i,
  error: c,
  isSearching: s,
  apiConfigured: r,
  onSearch: f,
}) {
  return N.jsxs(Pn, {
    children: [
      N.jsx(To, {
        className: "border-b",
        children: N.jsxs("div", {
          className: "flex flex-wrap items-center justify-between gap-2",
          children: [
            N.jsxs("div", {
              children: [
                N.jsx(Ao, { children: "News Preview" }),
                N.jsx(kh, {
                  className: "mt-1",
                  children:
                    "Preview city news from the search API. This will replace the current RSS-based news provider.",
                }),
              ],
            }),
            N.jsx(Zh, {
              onClick: f,
              disabled: s || !r,
              size: "xs",
              variant: "outline",
              children: s ? "Searching..." : "Search News",
            }),
          ],
        }),
      }),
      N.jsxs(Ro, {
        className: "space-y-4 pt-4",
        children: [
          c
            ? N.jsx("div", {
                className:
                  "border-destructive/30 bg-destructive/10 text-destructive rounded-none border px-3 py-2 text-xs",
                children: c,
              })
            : null,
          i
            ? N.jsxs("div", {
                className: "space-y-3",
                children: [
                  N.jsxs("div", {
                    className: "text-muted-foreground text-xs italic",
                    children: [
                      'Query: "',
                      i.query,
                      '" - ',
                      i.results.length,
                      " results -",
                      " ",
                      new Date(i.searchedAt).toLocaleString(),
                    ],
                  }),
                  i.results.map((m, y) =>
                    N.jsxs(
                      "article",
                      {
                        className:
                          "border-border/60 space-y-1 border-t pt-3 first:border-t-0 first:pt-0",
                        children: [
                          N.jsx("a", {
                            href: m.url,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className:
                              "text-primary block text-sm font-medium hover:underline",
                            children: m.title,
                          }),
                          m.date
                            ? N.jsx("p", {
                                className: "text-muted-foreground text-[11px]",
                                children: m.date,
                              })
                            : null,
                          m.snippet
                            ? N.jsx("p", {
                                className:
                                  "text-muted-foreground text-xs leading-relaxed",
                                children:
                                  m.snippet.length > 300
                                    ? `${m.snippet.slice(0, 300)}...`
                                    : m.snippet,
                              })
                            : null,
                        ],
                      },
                      y
                    )
                  ),
                ],
              })
            : null,
        ],
      }),
    ],
  })
}
function Q0(i) {
  try {
    const c = new URL(i),
      s = c.pathname.length > 40 ? `${c.pathname.slice(0, 40)}...` : c.pathname
    return `${c.hostname}${s}`
  } catch {
    return i.length > 60 ? `${i.slice(0, 60)}...` : i
  }
}
function Kh({ title: i, description: c, items: s, icon: r }) {
  return N.jsxs(Pn, {
    className: "max-w-3xl",
    children: [
      N.jsxs(To, {
        className: "border-b",
        children: [
          r
            ? N.jsx("div", {
                className: "text-muted-foreground text-sm",
                children: r,
              })
            : null,
          N.jsx(Ao, { children: i }),
          N.jsx(kh, { children: c }),
        ],
      }),
      N.jsx(Ro, {
        className: "pt-4",
        children: N.jsx("ul", {
          className: "text-muted-foreground list-disc space-y-2 pl-5 text-sm",
          children: s.map((f) => N.jsx("li", { children: f }, f)),
        }),
      }),
    ],
  })
}
function k0() {
  return N.jsxs("div", {
    className: "space-y-6",
    children: [
      N.jsx("h1", {
        className: "text-xl font-semibold tracking-tight",
        children: "Agent Orchestration",
      }),
      N.jsx(Kh, {
        title: "Agent orchestration",
        description: "Agent orchestration will be configured here.",
        icon: N.jsx("span", {
          className: "font-mono text-xs uppercase",
          children: "Agents",
        }),
        items: [
          "Register and manage AI agents",
          "Define agent pipelines and workflows",
          "Monitor agent execution status",
          "View logs and output",
        ],
      }),
    ],
  })
}
function Z0() {
  return N.jsxs("div", {
    className: "space-y-6",
    children: [
      N.jsx("h1", {
        className: "text-xl font-semibold tracking-tight",
        children: "Schedules",
      }),
      N.jsx(Kh, {
        title: "Task scheduling",
        description: "Task scheduling will be configured here.",
        icon: N.jsx("span", {
          className: "font-mono text-xs uppercase",
          children: "Schedules",
        }),
        items: [
          "Create and manage scheduled tasks",
          "Set cron expressions and intervals",
          "View execution history",
          "Enable and disable schedules",
        ],
      }),
    ],
  })
}
function K0() {
  return N.jsx(lb, {
    children: N.jsx(Dp, {
      children: N.jsxs(ra, {
        element: N.jsx(S0, {}),
        children: [
          N.jsx(ra, {
            index: !0,
            element: N.jsx(Np, { to: "/cities", replace: !0 }),
          }),
          N.jsx(ra, { path: "cities", element: N.jsx(E0, {}) }),
          N.jsx(ra, { path: "cities/:slug", element: N.jsx(q0, {}) }),
          N.jsx(ra, { path: "agents", element: N.jsx(k0, {}) }),
          N.jsx(ra, { path: "schedules", element: N.jsx(Z0, {}) }),
        ],
      }),
    }),
  })
}
_g.createRoot(document.querySelector("#root")).render(
  N.jsx(A.StrictMode, { children: N.jsx(K0, {}) })
)
