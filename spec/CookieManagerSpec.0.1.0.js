describe("CookieManager", function() {
    it("saves string in cookie", function() {
        expect(function() {
            var cm = new CookieManager();

            cm.set("test", "test");

            return document.cookie;
        }()).toContain("test");
    });

    it("gets string from cookie", function() {
        expect(function() {
            var cm = new CookieManager();

            return cm.get("test");
        }()).toContain("test");
    });
});