/*
* @Author: f
* @Date:   2017-01-10 15:59:26
* @Last Modified by:   gaofan
* @Last Modified time: 2017-03-09 11:13:52
*/
/* global XMLHttpRequest */
window.URL = window.URL || window.webkitURL  // Take care of vendor prefixes.
const loadingScreen = {
    newAudioContext: function () {
        return new (window.AudioContext || window.webkitAudioContext)()
    },
    isArray: function (value) {
        if (typeof Array.isArray === 'function') {
            return Array.isArray(value)
        } else {
            return Object.prototype.toString.call(value) === '[object Array]'
        }
    },
    isNecessarySource: function (remoteSource) {
        /**
         * [判断并返回是不是必要的资源]
         * @type {[type]}
         */
        if (!remoteSource) {
            return null
        }
        return remoteSource.type === TypeEnmu.INTRO ||
            remoteSource.type === TypeEnmu.DEFY ||
            remoteSource.type === TypeEnmu.S_SAME ||
            remoteSource.type === TypeEnmu.J_SAME ||
            remoteSource.type === TypeEnmu.B_SAME
    },
    xhr: function (url, responseType) {
        let _self = this
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest()
            xhr.open('GET', url, true)
            xhr.responseType = responseType
            // xhr.timeout = 3000
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status >= 200 && this.status < 300 || this.status === 304) {
                        /**
                         * 如果请求成功计数器＋1
                         * 并且执行loadingNum计数
                         */
                        _self.itemNum += 1
                        _self.loadingNum(_self.itemNum)
                        resolve(this.response)
                    } else {
                        console.log('状态吗错误')
                        resolve(null)
                    }
                }
            }
            // xhr.ontimeout = function () {
            //     console.log('请求超时')
            //     resolve(null)
            // }
            xhr.onerror = function () {
                console.log('请求出错')
                resolve(null)
            }
            xhr.send()
        })
    },
    addStream: function (remoteSource, type, data) {
        let newType = remoteSource.type
        for (let i = 0, len = this.rawSource.length; i < len; i++) {
            let rawType = this.rawSource[i].type
            if (newType === rawType) {
                // console.log(newType + ' old : new ' + rawType) 1291587
                switch (type) {
                case 'pic_stream':
                    this.rawSource[i].pic_stream = data
                    break
                case 'pic_stream2':
                    this.rawSource[i].pic_stream2 = data
                    break
                case 'audio_stream':
                    this.rawSource[i].audio_stream = data
                    break
                default:
                    console.log('addStream 传入类型错误')
                }
            }
        }
    },
    loadingImg: function (remoteSource) {
        if (!remoteSource.imgUrl) {
            _self.callback(null)
            return
        }
        // 判断null....
        let _self = this
        _self.xhr(remoteSource.imgUrl, 'blob')
        .then(function (data) {
            if (data === null) {
                // 请求错误返回为空的null...添加到数组末尾重新再来一次,并且总数＋1
                console.log('loadingImg 请求出错')
                _self.newSource.push(remoteSource)
                _self.totalNum += 1
            } else {
                let img = document.createElement('img')
                img.onload = function () {
                    // 成功的处理.....
                    _self.addStream(remoteSource, 'pic_stream', data)
                    window.URL.revokeObjectURL(img.src) // Clean up after yourself.
                }
                img.src = window.URL.createObjectURL(data)
            }
        })
        if (remoteSource.imgUrl2) {
            _self.xhr(remoteSource.imgUrl2, 'blob')
            .then(function (data) {
                if (data === null) {
                    // 请求错误返回为空的null...添加到数组末尾重新再来一次,并且总数＋1
                    console.log('loadingImg2 请求出错')
                    _self.newSource.push(remoteSource)
                    _self.totalNum += 1
                } else {
                    let img = document.createElement('img')
                    img.onload = function () {
                        // 成功的处理.....
                        _self.addStream(remoteSource, 'pic_stream2', data)
                        window.URL.revokeObjectURL(img.src) // Clean up after yourself.
                    }
                    img.src = window.URL.createObjectURL(data)
                }
            })
        }
    },
    loadingAudio: function (remoteSource) {
        if (!remoteSource.audioUrl) {
            _self.callback(null)
            return
        }
        let _self = this
        _self.xhr(remoteSource.audioUrl, 'arraybuffer')
        .then(function (data) {
            if (data === null) {
                // 请求错误返回为空的null...添加到数组末尾重新再来一次,并且总数＋1
                console.log('loadingAudio 请求出错')
                _self.newSource.push(remoteSource)
                _self.totalNum += 1
            } else {
                if (_self.newAudioContext) {
                    _self.addStream(remoteSource, 'audio_stream', data)
                }
                // 成功的处理...
            }
        })
    },
    loadingNum: function (num) {
        // console.log(num + '和' + this.totalNum)
        this.scope.loadingNum = Math.ceil(num / this.totalNum * 100)
        if (num / this.totalNum === 1) {
            this.scope.isLoadSuccess = true
        }
    },
    shiftSource: function () {
        let remoteSource = this.newSource.shift()
        if (!remoteSource) {
            // _source已经空了
            return
        } else {
            this.loadingImg(remoteSource)
            this.loadingAudio(remoteSource)
            this.shiftSource()
        }
    },
    loading: function (scope, _source, totalNum, callback) {
        if (!this.isArray(_source)) {
            callback && callback(null)
            return
        }
        /* 初始化 */
        this.scope = null
        this.itemNum = 0
        this.totalNum = 0
        this.newSource = []
        this.rawSource = _source
        this.callback = function () {}
        /* 赋值 */
        this.totalNum = totalNum
        this.scope = scope
        this.newSource = this.newSource.concat(_source)
        this.callback = callback
        // console.log(this.totalNum)
        this.shiftSource()
    }
}

export default loadingScreen
