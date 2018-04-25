function GoTop($element) {
    this.target = $element;
    this.bindEvent();
}
GoTop.prototype.bindEvent = function() {
    let $gotop = this.target;
    $(window).on('scroll',function() {
        let vertical = $(window).scrollTop();
        if (vertical > 50) {
            $gotop.addClass('active');
        } else {
            $gotop.removeClass('active');
        }
    });
    this.target.on('click',function() {
        $(window).scrollTop(0);
    });
};

let goTop = new GoTop($('.go-top'));