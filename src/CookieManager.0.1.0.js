(function(g, d, u) {
    var CookieManager = function(config) {
        this.key = config && config.key;
        this.key = config && config.name;
        this.value = config && config.value;
        this.expire = config && config.expire;
        this.path = config && config.path;
    };

    CookieManager.init = function() {
        return new this();
    };

    CookieManager.prototype.set = function() {
        var
            self = CookieManager,
            args = arguments,
            cookieData,
            config,
            name,
            value,
            expire = this.expire,
            path = this.path,

            init = function() {
                var t = {};

                if ("string" === typeof args[0]) {
                    name = args[0];
                    value = args[1];

                } else {
                    config = args[0];

                    name = config.name;
                    value = config.value;
                    expire = config.expire || expire;
                    path = config.path || path;
                }

                if ("object" === typeof value) {

                    if (self.Utils.isBrowserSupportsJSON()) {
                        value = self.Utils.escapeKeysInObj(value);
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
                if (expire) {
                    var expireDate = new Date();
                    expireDate.setDate(expireDate.getDate() + expire);

                    return expireDate.toUTCString();
                }
            },

            execute = function() {
                var expire = prepareExpiryDate(),
                    keys = {
                        expire: (function() {
                            var
                                separator = "-",

                                e = (function() {
                                    var t = new Date();
                                        t.setDate(t.getDate( + expire));

                                        return t; 
                                }()),

                                day = e.getDate(),
                                month = e.getMonth() + 1,
                                year = (function() {
                                    var y = e.getYear();

                                    if (y < 1000) {
                                        y = y +1900;
                                    }

                                    return y;
                                }());

                            return day + separator + month + separator + year;
                        }())
                    };

                cookieData = name + "=" + value;

                if (expire) {
                    cookieData += ",expires=" + keys.expire;
                }

                if (path) {
                    cookieData += ",path=" + path;
                }

                if (expire) {
                    cookieData += ";expires=" + expire;
                }

                if (path) {
                    cookieData += ";path=" + path;
                }

                document.cookie = cookieData;
            };

        init();
        execute();
    };

    CookieManager.prototype.get = function(name) {
        var
            self = CookieManager,
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

    CookieManager.prototype.delete = function(conf) {
        var self = this;

        if ("string" === typeof conf) {
            self.set({
                name: conf,
                value: conf,
                expire: -1
            });
        } else {
            self.set({
                name: conf.name,
                value: conf.value,
                expire: -1,
                path: conf.path
            });
        }
    };

    CookieManager.prototype.getNewInstance = function() {
        return new this.constructor();
    };

    CookieManager.Utils = {};

    CookieManager.Utils.isBrowserSupportsJSON = function() {
        return !!("JSON" in window);
    };

    CookieManager.Utils.unescapeKeysInObj = function(o) {
        var t = {};

        for (key in o) {
            t[decodeURIComponent(key)] = o[key];
        }

        return t;
    };

    CookieManager.Utils.escapeKeysInObj = function(o) {
        var t = {};

        for (key in o) {
            t[encodeURIComponent(key)] = o[key];
        }

        return t;
    };

    g.CookieManager = CookieManager;
}(window, document, undefined));