var 
    strTest = "test",
    strPathTest = "/test",
    strNewTest = "new_test",
    strPathNewTest = "/",

    person = {
        name: "John",
        lastName: "Doe",
        age: "29"
    },

    expireDate = null,

    prepareExpiryDate = function(expire) {
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
    };

describe("CookieManager", function() {
    it("save string in cookie", function() {
        expect(function() {
            var cm = new CookieManager();

            cm.set(strTest, strTest);

            return document.cookie;
        }()).toContain(strTest);
    });

    it("get string from cookie", function() {
        expect(function() {
            var cm = new CookieManager();

            return cm.get(strTest);
        }()).toContain(strTest);
    });

    it("save number in cookie", function() {
        expect(function() {
            var cm = new CookieManager();

            cm.set(strTest, 3);

            return document.cookie;
        }()).toContain("test=3");
    });

    it("save object in cookie", function() {
        expect(function() {
            var cm = new CookieManager();

            cm.set(strTest, person);

            return document.cookie;
        }()).toContain("John");
    });

    it("get object from cookie", function() {
        expect(function() {
            var
                cm = new CookieManager();

            cm.set(strTest, person);

            return cm.get(strTest);
        }()).toEqual(person);
    });

    it("set configuration", function() {
        expect(function() {
            var cm = new CookieManager({
                expire: 30
            });

            cm.set(strTest, strTest);

            return document.cookie;
        }()).toContain(prepareExpiryDate(30));

        expect(function() {
            var cm = new CookieManager({
                expire: 30,
                path: "/"
            });

            cm.set(strTest, strTest);

            return document.cookie;
        }()).toContain("/");
    });

    it("rewrite configuration when saves data", function() {
        var
            expireDate = prepareExpiryDate(15),
            config = {
                expire: 30,
                path: strPathTest
            },

            configurationAllStrings = function() {
                var cm = new CookieManager(config);

                cm.set(strNewTest, strNewTest, 15, strPathNewTest);

                return document.cookie;
            },

            configurationConfigurationAsObject = function() {
                var cm = new CookieManager(config);

                cm.set(strNewTest, strNewTest, {
                    expire: 15,
                    path: strPathNewTest
                });

                return document.cookie;
            },

            configurationAllInObject = function() {
                var cm = new CookieManager(config);

                cm.set({
                    name: ""
                })
            };

        expect(configurationAllStrings()).toContain(expireDate);
        expect(configurationAllStrings()).toContain(strPathNewTest);

        expect(configurationConfigurationAsObject()).toContain(expireDate);
        expect(configurationConfigurationAsObject()).toContain(strPathNewTest);
    });

    it("delete cookie", function() {
        expect(function() {
            var cm = new CookieManager();

            // cm.set(strTest, strTest);
            cm.delete(strTest);
            cm.delete({
                value: strTest,
                name: strTest,
                path: "/"
            });

            return cm.get(strTest);
        }()).toBe(null);
    });
});