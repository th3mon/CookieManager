// Generated by CoffeeScript 1.4.0
(function() {
  var CookieManager;

  CookieManager = (function() {

    function CookieManager(config) {
      this.expire = config != null ? config.expire : void 0;
      this.path = config != null ? config.path : void 0;
    }

    CookieManager.prototype.set = function(name, value, expire, path) {
      var config, cookieData, date, prepareExpireDate;
      if ("object" === typeof expire) {
        config = expire;
      }
      if ("object" === typeof name) {
        config = name;
      }
      name = (config != null ? config.name : void 0) || name;
      value = (config != null ? config.value : void 0) || value;
      expire = (config != null ? config.expire : void 0) || expire || this.expire;
      path = (config != null ? config.path : void 0) || path || this.path;
      prepareExpireDate = function() {
        var date, day, month, separator, year;
        date = new Date;
        separator = "-";
        if (expire) {
          date.setDate(date.getDate() + expire);
          year = date.getYear();
          if (year < 1000) {
            year += 1900;
          }
          day = date.getDate();
          month = date.getMonth() + 1;
          expire = day + separator + month + separator + year;
          return date.toUTCString();
        }
      };
      if ("object" === typeof value) {
        value = encodeURIComponent(JSON.stringify(value));
      }
      cookieData = name + "=" + value;
      date = prepareExpireDate();
      if (expire) {
        cookieData += ",expires=" + expire;
      }
      if (path) {
        cookieData += ",path=" + path;
      }
      if (expire) {
        cookieData += ";expires=" + date;
      }
      if (path) {
        if (/\?/.test(path)) {
          path = path.split("?");
          path = path[0];
        }
        cookieData += ";path=" + path;
      }
      return document.cookie = cookieData;
    };

    CookieManager.prototype.get = function(name) {
      var getValueFormCookie, number, singleCookie, splittedCookie, trimLeft, value, _i, _len;
      splittedCookie = document.cookie.split(";");
      trimLeft = function(str) {
        var isFirstCharAWhiteSpace;
        isFirstCharAWhiteSpace = function() {
          return str.charAt(0) === " ";
        };
        if (isFirstCharAWhiteSpace()) {
          while (isFirstCharAWhiteSpace()) {
            str = str.substring(1, str.length);
          }
        }
        return str;
      };
      getValueFormCookie = function(cookie) {
        var nameEQ, value;
        nameEQ = name + "=";
        cookie = trimLeft(cookie);
        value = cookie.substring(nameEQ.length, cookie.length);
        return value;
      };
      for (_i = 0, _len = splittedCookie.length; _i < _len; _i++) {
        singleCookie = splittedCookie[_i];
        value = getValueFormCookie(singleCookie);
      }
      number = parseInt(value, 10);
      if ("string" === typeof value && -1 !== value.indexOf("%7B")) {
        value = JSON.parse(decodeURIComponent(value));
      }
      if ("number" === typeof number && NaN.toString() !== number.toString()) {
        value = number;
      }
      return value || null;
    };

    CookieManager.prototype["delete"] = function(name) {
      var config;
      config = {
        name: name,
        value: name,
        expire: -1
      };
      return this.set(config);
    };

    return CookieManager;

  })();

  window.CookieManager = CookieManager;

}).call(this);
