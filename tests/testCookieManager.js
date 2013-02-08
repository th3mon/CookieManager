// Generated by CoffeeScript 1.4.0
(function() {
  var JohnDoe, err, person, persons, prepareExpiryDate, should;

  should = chai.should();

  err = function(fn, msg) {
    var config;
    try {
      fn();
      config = {
        message: 'Expected an error'
      };
      throw new chai.AssertionError(config);
    } catch (err) {
      console.log(err);
      return chai.expect(err.message).to.equal(msg);
    }
  };

  person = JohnDoe = {
    name: "John",
    lastName: "Doe",
    age: "29"
  };

  persons = {
    JohnDoe: JohnDoe,
    JanKowalski: {
      name: "Jan",
      lastName: "Kowalski",
      age: "23"
    },
    clientsIDs: [0, 1, 2, 3, 4, 5]
  };

  prepareExpiryDate = function(expire) {
    var day, month, separator, t, year;
    separator = "-";
    t = new Date;
    t.setDate(t.getDate() + expire);
    year = t.getYear();
    if (year < 1000) {
      year += 1900;
    }
    day = t.getDate();
    month = t.getMonth() + 1;
    return day + separator + month + separator + year;
  };

  describe("CookieManager", function() {
    it.skip("should save string in cookie", function() {
      (new CookieManager).set("testCookieFile", "test");
      return document.cookie.should.to.contain("test");
    });
    it.skip("should get string from cookie", function() {
      var retrivedData;
      retrivedData = (new CookieManager).get("testCookieFile");
      return retrivedData.should.equal("test");
    });
    it.skip("should save number in cookie", function() {
      (new CookieManager).set("testCookieFile", 4);
      return document.cookie.should.to.contain(4);
    });
    it.skip("should get number from cookie", function() {
      var retrivedData;
      retrivedData = (new CookieManager).get("testCookieFile");
      return retrivedData.should.to.equal(4);
    });
    it.skip("should save array in cookie", function() {
      (new CookieManager).set("testCookieFile", [0, 1, 2, 3, 4, 5]);
      return document.cookie.should.to.contain(encodeURIComponent([0, 1, 2, 3, 4, 5]));
    });
    it.skip("should save object in cookie", function() {
      (new CookieManager).set("testCookieFile", person);
      document.cookie.should.to.contain(person.name);
      document.cookie.should.to.contain(person.lastName);
      return document.cookie.should.to.contain(person.age);
    });
    it.skip("should get object from cookie", function() {
      var retrivedData;
      retrivedData = (new CookieManager).get("testCookieFile");
      return retrivedData.should.to.deep.equal(person);
    });
    it.skip("should save complicated object from cookie", function() {
      var attr, _results;
      (new CookieManager).set("testCookieFile", persons);
      for (attr in persons.JohnDoe) {
        document.cookie.should.to.contain(attr);
      }
      _results = [];
      for (attr in persons.JanKowalski) {
        _results.push(document.cookie.should.to.contain(attr));
      }
      return _results;
    });
    it.skip("should get complicated object from cookie", function() {
      var retrivedData;
      retrivedData = (new CookieManager).get("testCookieFile");
      return retrivedData.should.to.deep.equal(persons);
    });
    it.skip("should have given configuration", function() {
      var config, date;
      config = {
        expire: 30
      };
      date = "expires=";
      date += prepareExpiryDate(30);
      (new CookieManager(config)).set("testCookieFile", "test");
      document.cookie.should.to.contain(date);
      config = {
        expire: 30,
        path: "/"
      };
      (new CookieManager(config)).set("testCookieFile", "test");
      return document.cookie.should.to.contain("path=/");
    });
    it.skip("should rewrite configuration when saves data", function() {
      var config, config2, expire;
      expire = "expires=" + prepareExpiryDate(15);
      config = {
        expire: 30,
        path: "/"
      };
      (new CookieManager(config)).set("testCookieFileConfig", "new string test", 15, "/?test=test");
      document.cookie.should.to.contain(expire);
      document.cookie.should.to.contain("path=/?test=test");
      (new CookieManager(config)).set("testCookieFileConfig", "new string test", {
        expire: 15,
        path: "/?test=test"
      });
      document.cookie.should.to.contain(expire);
      document.cookie.should.to.contain("path=/?test=test");
      config2 = {
        name: "testCookieFileConfig2",
        value: "new string test2",
        expire: 15,
        path: "/?test=test"
      };
      (new CookieManager(config)).set(config2);
      document.cookie.should.to.contain(config2.name);
      document.cookie.should.to.contain(config2.value);
      document.cookie.should.to.contain(config2.expire);
      return document.cookie.should.to.contain(config2.path);
    });
    return it("should delete cookie", function() {
      var cm, f;
      cm = new CookieManager;
      f = function() {
        var retrivedData;
        retrivedData = cm.get("testCookieFile");
        return retrivedData.should.be["null"];
      };
      expect(retrivedData).to.be["null"];
      return err(f, "retrivedData is null");
    });
  });

}).call(this);
