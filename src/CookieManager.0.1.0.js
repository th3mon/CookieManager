(function(g, d, u) {
    var CookieManager = function() {};

    CookieManager.init = function() {
        return new this();
    };

    CookieManager.prototype.set = function() {
        var
            // self = this,
            args = arguments,
            cookieData,
            config,
            name,
            value,
            expireDays,
            path,

            init = function() {
                var t = {};

                if ("string" === typeof args[0]) {
                    name = args[0];
                    value = args[1];

                } else {
                    config = args[0];

                    name = config.name;
                    value = config.value;
                    expireDays = config.expireDays;
                    path = config.path;
                }

                if ("object" === typeof value) {

                    if (this.Utils.isBrowserSupportsJSON()) {
                        value = this.Utils.escapeKeysInObj(value);
                        value = JSON.stringify(value);
                    } else {
                        throw {
                            message: "Your browser don't support JSON :-("
                        };
                    }
                } else {
                    value = encodeURIComponent(value);
                }

            },

            prepareExpiryDate = function () {
                if (expireDays) {
                    var expireDate = new Date();
                    expireDate.setDate(expireDate.getDate() + expireDays);

                    return expireDate.toUTCString();
                }
            },

            execute = function() {
                cookieData = name + "=" + value;

                if (expireDays) {
                    cookieData += ";expires=" + prepareExpiryDate();
                }

                if (path) {
                    cookieData += "; path=" + path;
                }

                document.cookie = cookieData;
            };

        init();
        execute();
    };

    CookieManager.prototype.get = function(name) {
        var
            self = this,
            nameEQ = name + "=",
            splittedCookie = document.cookie.split(";"),
            value = "",
            parsed = {},
            ret = null,
            i,
            singleCookie,

            trimLeft = function(str) {
                while (str.charAt(0) === ' '){
                    str = str.substring(1, str.length);
                }

                return str;
            };

        i = splittedCookie.length;
        // TODO: sproboj zastosowac for'a
        do {
            i--;

            if (-1 === i) {
                return;
            }

            singleCookie = trimLeft(splittedCookie[i]);

            if (singleCookie.indexOf(nameEQ) === 0) {
                value = singleCookie.substring(nameEQ.length, singleCookie.length);

                if(-1 !== value.indexOf("{")) {
                    while("object" !== typeof value) {
                        value = JSON.parse(value);
                    }

                    ret = self.Utils.unescapeKeysInObj(value);
                } else if (value === "undefined") {
                    ret = undefined;
                } else {
                    ret = decodeURIComponent(value);
                }
            }

        } while ((null === ret) && i);

        return ret;
    };

    CookieManager.prototype.remove = function(conf) {
        var self = this;

        if ("string" === typeof conf) {
            self.set({
                name: conf,
                expireDays: -1
            });
        } else {
            self.set({
                name: conf.name,
                value: conf.value,
                expireDays: -1,
                path: conf.path
            });
        }
    };

    CookieManager.prototype.getNewInstance = function() {
        return new this.constructor();
    };

    CookieManager.Utils = function() {};

    CookieManager.Utils.prototype.isBrowserSupportsJSON = function() {
        return !!("JSON" in window);
    };

    CookieManager.Utils.prototype.unescapeKeysInObj = function(o) {
        var t = {};

        for (key in o) {
            t[decodeURIComponent(key)] = o[key];
        }

        return t;
    };

    g.CookieManager = CookieManager;
}(window, document, undefined));