var getShareImages = {
    defaultimg:"defaultimg.png",
    _allImgs:null,
    init:function(){
        getShareImages._allImgs = document.getElementsByTagName("img");
        if(getShareImages._allImgs.length == 0){                    
            return getShareImages.defaultimg;
        }else{
            return getShareImages.checkRepeat();
        }
    },
    _srcs:{},
    allImgs:[],
    checkRepeat:function(){
        var len = getShareImages._allImgs.length;
        for (var i = 0; i < len; i++) {
            var _img = getShareImages._allImgs[i];
              // 过滤掉不可以见的图片
              if(_img.style.display == 'none' || _img.style.visibility == 'hidden'){
                  continue;
              }

              if(getShareImages._srcs[_img.src]){

              }else{
                  getShareImages._srcs[_img.src] = 1;
                  getShareImages.allImgs.push(_img);
              }
        };
        return getShareImages.checkCondition();

    },
    results:[],
    checkCondition:function(){
        var len = getShareImages.allImgs.length;
        var img;
        var loadedCount = 0;
        for (var i = 0; i < len && i < 10; i++) {
            img = getShareImages.allImgs[i];
            if(img.width >= 200 || img.height >= 200){
                loadedCount++;
                getShareImages.results.push(img);
                return img.src;
            } 
        };
        if(loadedCount == getShareImages.results.length){
            return getShareImages.defaultimg;
        }
    }
}
getShareImages.init();
