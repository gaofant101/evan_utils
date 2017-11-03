const isMobile = {
    /**
     * [Examples]
     * if( isMobile.iOS() ) alert('iOS')
     */
    Android: function () {
        return /Android/i.test(navigator.userAgent)
    },
    BlackBerry: function () {
        return /BlackBerry/i.test(navigator.userAgent)
    },
    iOS6Plus: function () {
        return isMobile.iOS() && ((window.devicePixelRatio || 1) === 3) && (window.newAudioContext.sampleRate === 44100)
    },
    iOSPlus: function () {
        return isMobile.iOS() && ((window.devicePixelRatio || 1) === 3)
    },
    iOS7: function () {
        return isMobile.iOS() && navigator.userAgent.indexOf('OS 7') > 0
    },
    iOSExtra: function () {
        if (!isMobile.iOS()) {
            return false
        }
        var ns = navigator.userAgent
        var e1 = ns.indexOf('6.3.13') > 0 && ns.indexOf('602.1.5.0') > 0
        var e2 = ns.indexOf('6.3.29') > 0 && ns.indexOf('602.2.14') > 0
        return (e1 || e2)
    },
    iOS: function () {
        return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)
    },
    Opera: function () {
        return /Opera Mini/i.test(navigator.userAgent)
    },
    Windows: function () {
        return /IEMobile/i.test(navigator.userAgent)
    },
    weixin: function () {
        return /MicroMessenger/i.test(navigator.userAgent)
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows())
    }
}
