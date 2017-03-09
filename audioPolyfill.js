export default {
    polyfill () {
        /**
         * [解决android iOS 中自动播放]
         */
        let isUnlocked = false
        window.addEventListener('touchend', function () {
            if (isUnlocked) return
            // create empty buffer
            if (!window.newAudioContext) return
            var buffer = window.newAudioContext.createBuffer(1, 1, 22050)
            var source = window.newAudioContext.createBufferSource()
            source.buffer = buffer

            // connect to output (your speakers)
            source.connect(window.newAudioContext.destination)

            if (!source.start) {
                source.start = source.noteOn
                source.stop = source.noteOff
            }
            // play the file
            source.start(0)
        }, false)
    }
}
