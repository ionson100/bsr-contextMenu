'use strict';

var react = require('react');
var client = require('react-dom/client');

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  return stringify(rnds);
}

var MenuMap = new Map();
var ContextMenu = /** @class */ (function () {
    function ContextMenu(props) {
        var _this = this;
        this.contextAction = function (e) {
            e.preventDefault();
            _this.div.style.visibility = "hidden";
            MenuMap.forEach(function (menu) {
                {
                    menu.click();
                }
            });
            _this.innerRoot.render(_this.props.body);
            setTimeout(function () {
                var bodyH = _this.getHeight();
                var bodyW = _this.getWidth();
                var bodyB = _this.div.offsetHeight;
                var bodyBW = _this.div.offsetWidth;
                var YY = e.pageY;
                var WW = e.pageX;
                //alert(YY+" "+WW)
                if ((bodyH - YY) < bodyB + 50) {
                    _this.div.style.top = (YY - bodyB) + "px";
                    if (bodyW - WW < bodyBW + 50) {
                        _this.div.style.left = (WW - bodyBW) + "px";
                    }
                    else {
                        _this.div.style.left = WW + "px";
                    }
                }
                else {
                    _this.div.style.top = YY + "px";
                    if (bodyW - WW < bodyBW + 50) {
                        _this.div.style.left = (WW - bodyBW) + "px";
                    }
                    else {
                        _this.div.style.left = WW + "px";
                    }
                }
                _this.div.style.visibility = "visible";
            }, 50);
        };
        this.click = this.click.bind(this);
        this.props = props;
        this.div = document.createElement("div");
        this.div.className = "bsr-context-menu";
        this.div.style.visibility = "hidden";
        this.innerRoot = client.createRoot(this.div);
        document.body.appendChild(this.div);
        this.id = v4();
        this.div.onclick = function () {
            _this.click();
        };
        this.ContextMenuDidMount();
    }
    ContextMenu.prototype.click = function () {
        this.innerRoot.render(null);
        this.div.style.visibility = "hidden";
    };
    ContextMenu.prototype.getHeight = function () {
        var body = document.body, html = document.documentElement;
        return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    };
    ContextMenu.prototype.getWidth = function () {
        var body = document.body, html = document.documentElement;
        return Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
    };
    ContextMenu.prototype.ContextMenuDidMount = function () {
        var _a;
        window.addEventListener("click", this.click);
        (_a = this.props.target) === null || _a === void 0 ? void 0 : _a.addEventListener("contextmenu", this.contextAction);
        MenuMap.set(this.id, this);
    };
    ContextMenu.prototype.ContextMenuWillUnmount = function () {
        var _this = this;
        var _a;
        window.removeEventListener("click", this.click);
        (_a = this.props.target) === null || _a === void 0 ? void 0 : _a.removeEventListener("contextmenu", this.contextAction);
        MenuMap.delete(this.id);
        setTimeout(function () {
            _this.innerRoot.unmount();
            document.body.removeChild(_this.div);
            _this.props.target = undefined;
        });
    };
    return ContextMenu;
}());

var useContextMenu = function (target, body) {
    react.useEffect(function () {
        var menu;
        if (target === null || target === void 0 ? void 0 : target.current) {
            menu = new ContextMenu({ target: target.current, body: body });
        }
        return function () {
            menu === null || menu === void 0 ? void 0 : menu.ContextMenuWillUnmount();
        };
    }, [body, target]);
};

exports.ContextMenu = ContextMenu;
exports.useContextMenu = useContextMenu;
