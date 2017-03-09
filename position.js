import wx from 'weixin-js-sdk'
/**
 * getLocation 通过wxsdk定位；getNavigatorLocation 通过网页定位
 * 在wx环境下可以使用 非微信且支持网页定位也可以方位定位
 * @return 定位坐标 失败返回值为null
 */
const getNavigatorLocation = () => {
    let res = {}
    return new Promise(function (resolve, reject) {
        // 判断浏览器是否支持
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (p) {
                res.latitude = p.coords.latitude
                res.longitude = p.coords.longitude
                resolve(res)
            }, function () {
                res.latitude = null
                res.longitude = null
                resolve(res)
            })
        } else {
            res.latitude = null
            res.longitude = null
            resolve(res)
        }
    })
}
const getLocation = () => {
    return new Promise(function (resolve, reject) {
        getNavigatorLocation().then(function (res) {
            if (res.latitude !== null) {
                resolve(res)
            } else {
                let res = {}
                wx.ready(function () {
                    wx.getLocation({
                        type: 'wgs84',              // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                        success: function (res) {
                            // res.latitude         // 纬度，浮点数，范围为90 ~ -90
                            // res.longitude        // 经度，浮点数，范围为180 ~ -180。
                            res.latitude = res.latitude
                            res.longitude = res.longitude
                            resolve(res)
                        },
                        fail: function (res) {
                            res.latitude = null
                            res.longitude = null
                            resolve(res)
                        },
                        cancel: function (res) {
                            // 拒绝授权
                            res.latitude = null
                            res.longitude = null
                            resolve(res)
                        }
                    })
                })
                wx.error(function () {
                    res.latitude = null
                    res.longitude = null
                    resolve(res)
                })
            }
        })
    })
}

export default getLocation
