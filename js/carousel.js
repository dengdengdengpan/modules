/**
 * 无限轮播思路
 * 页面上有4个图片，分别为图片1、图片2、图片3、图片4
 * 当点击 next 按钮时，图片的显示区域由图片1到图片2，再点击 next 按钮时，从图片2到图片3
 * 当显示区域是图片4的时候，再次点击 next 按钮时，这个时候显示区域应该出现图片1
 * 这里的处理方法是：在显示页面的时候就把图片1克隆一个到图片4的后面，这样就能显示图片1，同时通过修改css，将真正的图片1显示
 * 对于 pre 按钮也是一样的，当要从图片1显示图片4的时候，在显示页面的时候就克隆图片4的备份到图片1的前面
 * 同时修改css，将真正的图片4显示
 * 这样就是一个完整的无限轮播
 */

let Carousel = (function() {
    function _Carousel($ct) {
        this.$ct = $ct;
        this.start();
        this.bindEvent();
        this.autoPlay();
    }
    _Carousel.prototype.start = function() {
        this.getElements();
        this.setVariable();
        this.setCloneItem();  
        this.adjustImgList();
    };
    _Carousel.prototype.getElements = function() {
        this.$imgList = this.$ct.find('.img-list');
        this.$imgItems = this.$imgList.children();
        this.$nextBtn = this.$ct.find('.arrow-next');
        this.$preBtn = this.$ct.find('.arrow-pre');
        this.$pagination = this.$ct.find('.pagination');
    };
    _Carousel.prototype.setVariable = function() {
        this.beginImgCounts = this.$imgItems.length;
        this.imgWidth = this.$imgItems.first().width();
        this.curImgIndex = 0;
        this.isRolling = false;
    };
    _Carousel.prototype.setCloneItem = function() {
        // 将首尾图片所在 li 元素克隆后放到与自己位置相反处
        let $firstImg = this.$imgItems.first(),
            $lastImg = this.$imgItems.last();
        this.$imgList.append($firstImg.clone());
        this.$imgList.prepend($lastImg.clone());
    };
    _Carousel.prototype.adjustImgList = function() {
        // 重新设置 $imgList 的宽度
        let $imgList = this.$imgList,
            curImgCounts = $imgList.children().length;
        $imgList.width(this.imgWidth * curImgCounts);

        // 修改 $imgList css，使第一张图片正常显示
        $imgList.css('left', -this.imgWidth);
    };
    _Carousel.prototype.bindEvent = function() {
        let carousel = this;
        // $nextBtn 和 $preBtn 点击事件
        this.$nextBtn.on('click',function() {
            carousel.playNext(1);
        });
        this.$preBtn.on('click',function() {
            carousel.playPre(1);
        });
        // $pagination 中小圆点的点击事件
        this.$pagination.on('click','li',function() {
            let index = $(this).index();
            if (index > carousel.curImgIndex) {
                carousel.playNext(index - carousel.curImgIndex);
            } else if (index < carousel.curImgIndex) {
                carousel.playPre(carousel.curImgIndex - index)
            }
        });
        // 当鼠标进入图片区域则停止自动滚动
        this.$imgList.on('mouseenter','.item',function() {
            carousel.stopPlay();
        });
        // 当鼠标离开图片区域则继续滚动
        this.$imgList.on('mouseleave','.item',function() {
            carousel.autoPlay();
        });
    };
    _Carousel.prototype.playNext = function(n) {
        let carousel = this;
        // 优化体验，当在滚动时则不执行滚动下一个
        if (this.isRolling) {
            return;
        }
        this.isRolling = true;
        this.$imgList.animate({
            left: '-=' + this.imgWidth * n
        }, 1000, function() {
            carousel.curImgIndex += n;
            // 当图片从最后一张再向后滚动时为临界条件，即curImgIndex === beginImgCounts
            // 此时，将 $imgList 的 css 属性 left 设置为原始第一张图片所处的值
            // 同时将 curImgIndex 设置为0
            if (carousel.curImgIndex === carousel.beginImgCounts) {
                carousel.$imgList.css('left', -carousel.imgWidth);
                carousel.curImgIndex = 0;
            }
            carousel.isRolling = false;
            carousel.setPagination();
        });
    };
    _Carousel.prototype.playPre = function(n) {
        let carousel = this;
        // 优化体验，当在滚动时则不执行滚动上一个
        if (this.isRolling) {
            return;
        }
        this.isRolling = true;
        this.$imgList.animate({
            left: '+=' + this.imgWidth * n
        },1000,function() {
            carousel.curImgIndex -= n;
            // 当图片从第一张再向前滚动时为临界条件，即curImgIndex < 0
            // 此时，将 $imgList 的 css 属性 left 设置为原始最后一张图片所处的值
            // 同时将 curImgIndex 设置为 beginImgCounts - 1
            if (carousel.curImgIndex < 0) {
                carousel.$imgList.css('left', -carousel.beginImgCounts * carousel.imgWidth);
                carousel.curImgIndex = carousel.beginImgCounts - 1;
            }
            carousel.isRolling = false;
            carousel.setPagination();
        });
    };
    _Carousel.prototype.setPagination = function() {
        this.$pagination.find('li').removeClass('active')
                                   .eq(this.curImgIndex)
                                   .addClass('active');
    };
    _Carousel.prototype.autoPlay = function() {
        let carousel = this;
        this.intervalId = window.setInterval(function() {
            carousel.playNext(1);
        }, 2500);
    };
    _Carousel.prototype.stopPlay = function() {
        window.clearInterval(this.intervalId);
    }
    return {
        init: function($ct) {
            $ct.each(function(index,el) {
                new _Carousel($(el));
            });
        }
    }
})();

Carousel.init($('.carousel'));