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

let $ct = $('.carousel'),
    $imgList = $ct.find('.img-list'),
    $imgItems = $imgList.children(),
    $nextBtn = $ct.find('.arrow-next'),
    $preBtn = $ct.find('.arrow-pre'),
    $pagination = $ct.find('.pagination'),
    beginImgCounts = $imgItems.length,
    imgWidth = $imgItems.first().width(),
    curImgIndex = 0,
    isRolling = false,
    intervalId;


// 将首尾图片所在 li 元素克隆后放到与自己位置相反处
let $firstImg = $imgItems.first(),
    $lastImg = $imgItems.last();
$imgList.append($firstImg.clone());
$imgList.prepend($lastImg.clone());

// 重新设置 $imgList 的宽度
let curImgCounts = $imgList.children().length;
$imgList.width(imgWidth * curImgCounts);

// 修改 $imgList css，使第一张图片正常显示
$imgList.css('left', -imgWidth);

// $nextBtn 和 $preBtn 点击事件
$nextBtn.on('click',function() {
    playNext(1);
});
$preBtn.on('click',function() {
    playPre(1);
});
// $pagination 中小圆点的点击事件
$pagination.on('click','li',function() {
    let index = $(this).index();
    if (index > curImgIndex) {
        playNext(index - curImgIndex);
    } else if (index < curImgIndex) {
        playPre(curImgIndex - index)
    }
});

// 设置自动滚动
autoPlay();

// 当鼠标进入图片区域则停止自动滚动
$imgList.on('mouseenter','.item',function() {
    stopPlay();
});
// 当鼠标离开图片区域则继续滚动
$imgList.on('mouseleave','.item',function() {
    autoPlay();
});

function playNext(n) {
    // 优化体验，当在滚动时则不执行滚动下一个
    if (isRolling) {
        return;
    }
    isRolling = true;
    $imgList.animate({
        left: '-=' + imgWidth * n
    },1000,function() {
        curImgIndex += n;
        // 当图片从最后一张再向后滚动时为临界条件，即curImgIndex === beginImgCounts
        // 此时，将 $imgList 的 css 属性 left 设置为原始第一张图片所处的值
        // 同时将 curImgIndex 设置为0
        if (curImgIndex === beginImgCounts) {
            $imgList.css('left', -imgWidth);
            curImgIndex = 0;
        }
        isRolling = false;
        setPagination();
    });
}

function playPre(n) {
    // 优化体验，当在滚动时则不执行滚动上一个
    if (isRolling) {
        return;
    }
    isRolling = true;
    $imgList.animate({
        left: '+=' + imgWidth * n
    },1000,function() {
        curImgIndex -= n;
        // 当图片从第一张再向前滚动时为临界条件，即curImgIndex < 0
        // 此时，将 $imgList 的 css 属性 left 设置为原始最后一张图片所处的值
        // 同时将 curImgIndex 设置为 beginImgCounts - 1
        if (curImgIndex < 0) {
            $imgList.css('left', -beginImgCounts * imgWidth);
            curImgIndex = beginImgCounts - 1;
        }
        isRolling = false;
        setPagination();
    });
}

function setPagination() {
    $pagination.find('li').removeClass('active')
                          .eq(curImgIndex)
                          .addClass('active');
}

function autoPlay() {
    intervalId = window.setInterval(function() {
        playNext(1);
    },2500);
    return intervalId;
}
function stopPlay() {
    window.clearInterval(intervalId);
}