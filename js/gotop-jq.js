let GoTop = function() {
    let _GoTop = function($element) {
        this.target = $element;
        this.bindEvent();
    };
    _GoTop.prototype.bindEvent = function() {
        let that = this;
        $(window).on('scroll',function() {
            let vertical = $(window).scrollTop();
            if (vertical > 50) {
                that.target.addClass('active');
            } else {
                that.target.removeClass('active');
            }
        });
        this.target.on('click',function() {
            $(window).scrollTop(0);
        });
    };
    return {
        init: function($element) {
            new _GoTop($element);
        }
    }
}();

GoTop.init($('.go-top'));