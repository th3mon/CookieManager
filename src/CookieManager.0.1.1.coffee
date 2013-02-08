class CookieManager
    constructor: (config) ->
        @expire = config?.expire
        @path = config?.path

    set: (name, value, expire, path) ->
        if "object" is typeof expire then config = expire
        if "object" is typeof name then config = name

        name = config?.name || name
        value = config?.value || value
        expire = config?.expire || expire || @expire
        path = config?.path || path || @path

        prepareExpireDate = ->
            date = new Date
            separator = "-"

            if expire
                date.setDate date.getDate() + expire

                year = date.getYear()

                if year < 1000
                    year += 1900

                day = date.getDate()
                month = date.getMonth() + 1
                expire = day + separator + month + separator + year

                return date.toUTCString();

        if "object" is typeof value
            value = encodeURIComponent JSON.stringify value

        cookieData = name + "=" + value
        date = prepareExpireDate()

        if expire 
            cookieData += ",expires=" + expire
        if path
            cookieData += ",path=" + path
        if expire 
            cookieData += ";expires=" + date
        if path
            if /\?/.test path
                path =  path.split "?"
                path =  path[0]
            cookieData += ";path=" + path

        document.cookie = cookieData

    get: (name) ->
        splittedCookie = document.cookie.split ";"

        trimLeft = (str) ->
            isFirstCharAWhiteSpace = ->
                return str.charAt(0) is " "
            if isFirstCharAWhiteSpace()
                str = str.substring 1, str.length while isFirstCharAWhiteSpace()

            return str

        getValueFormCookie = (cookie) ->
            nameEQ = name + "="
            cookie = trimLeft cookie
            value = cookie.substring nameEQ.length, cookie.length

            return value
        
        value = getValueFormCookie singleCookie for singleCookie in splittedCookie

        number = parseInt value, 10

        if "string" is typeof value and -1 isnt value.indexOf "%7B"
            value = JSON.parse decodeURIComponent value
        if "number" is typeof number and NaN.toString() isnt number.toString() then value = number

        return value || null

    delete: (name) ->
        config = 
            name: name
            value: name
            expire: -1

        @set config


window.CookieManager = CookieManager    
