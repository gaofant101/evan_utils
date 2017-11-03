var vendors = ['ms', 'moz', 'webkit', 'o']
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
                                    window[vendors[x] + 'CancelRequestAnimationFrame']
}

function requestAnimationFrame (status) {
    var lastTime = 0
    if (!status || !window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime()
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime))
            var id = window.setTimeout(function () { callback(currTime + timeToCall) }, timeToCall)
            lastTime = currTime + timeToCall
            return id
        }
    }
    if (!status || !window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id)
        }
    }
}
