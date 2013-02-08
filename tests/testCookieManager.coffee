should = chai.should()
err = (fn, msg) ->
    try 
        fn()
        config = 
            message: 'Expected an error'
        throw new chai.AssertionError config
    catch err
        console.log err 
        chai.expect(err.message).to.equal(msg)

person = JohnDoe = 
    name: "John"
    lastName: "Doe"
    age: "29"

persons =
    JohnDoe: JohnDoe
    JanKowalski:
        name: "Jan"
        lastName: "Kowalski"
        age: "23"
    clientsIDs:
        [0..5]

prepareExpiryDate = (expire) ->
    separator = "-"

    t = new Date
    t.setDate t.getDate() + expire

    year = t.getYear()

    if year < 1000
        year += 1900

    day = t.getDate()
    month = t.getMonth() + 1

    return day + separator + month + separator + year

describe "CookieManager", ->
    it.skip "should save string in cookie", ->
        (new CookieManager).set "testCookieFile", "test"
        document.cookie.should.to.contain "test"

    it.skip "should get string from cookie", ->
        retrivedData = (new CookieManager).get "testCookieFile"
        retrivedData.should.equal "test"

    it.skip "should save number in cookie", ->
        (new CookieManager).set "testCookieFile", 4
        document.cookie.should.to.contain 4

    it.skip "should get number from cookie", ->
        retrivedData = (new CookieManager).get "testCookieFile"
        retrivedData.should.to.equal 4

    it.skip "should save array in cookie", ->
        (new CookieManager).set "testCookieFile", [0..5]
        document.cookie.should.to.contain encodeURIComponent [0..5]

    it.skip "should save object in cookie", ->
        (new CookieManager).set "testCookieFile", person

        document.cookie.should.to.contain person.name
        document.cookie.should.to.contain person.lastName
        document.cookie.should.to.contain person.age

    it.skip "should get object from cookie", ->
        retrivedData = (new CookieManager).get "testCookieFile"
        retrivedData.should.to.deep.equal person

    it.skip "should save complicated object from cookie", ->
        (new CookieManager).set "testCookieFile", persons

        document.cookie.should.to.contain attr for attr of persons.JohnDoe
        document.cookie.should.to.contain attr for attr of persons.JanKowalski

    it.skip "should get complicated object from cookie", ->
        retrivedData = (new CookieManager).get "testCookieFile"
        retrivedData.should.to.deep.equal persons

    it.skip "should have given configuration", ->
        config = 
            expire: 30

        date = "expires="
        date += prepareExpiryDate 30

        (new CookieManager config).set "testCookieFile", "test"

        document.cookie.should.to.contain date

        config =
            expire: 30
            path: "/"

        (new CookieManager config).set "testCookieFile", "test"

        document.cookie.should.to.contain "path=/"

    it.skip "should rewrite configuration when saves data", ->
        expire = "expires=" + prepareExpiryDate(15)
        config =
            expire: 30
            path: "/"

        (new CookieManager config).set "testCookieFileConfig", "new string test", 15, "/?test=test"

        document.cookie.should.to.contain expire
        document.cookie.should.to.contain "path=/?test=test"

        (new CookieManager config).set "testCookieFileConfig", "new string test", {
            expire: 15
            path: "/?test=test"
        }

        document.cookie.should.to.contain expire
        document.cookie.should.to.contain "path=/?test=test"

        config2 =
            name: "testCookieFileConfig2"
            value: "new string test2"
            expire: 15
            path: "/?test=test"

        (new CookieManager config).set config2 

        document.cookie.should.to.contain config2.name
        document.cookie.should.to.contain config2.value
        document.cookie.should.to.contain config2.expire
        document.cookie.should.to.contain config2.path

    it "should delete cookie", ->
        cm = new CookieManager
        # cm.set "testCookieFile", "test"
        # cm.delete "testCookieFile"


        f = ->
            retrivedData = cm.get "testCookieFile"
            retrivedData.should.be.null
        expect(retrivedData).to.be.null;
        err f, "retrivedData is null"
