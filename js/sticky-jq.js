let Sticky = (function() {
    function _Sticky($Element,posInteger) {
        this.target = $Element;
        this.topValue = posInteger || 0;
        this.start();
        this.addPlaceholder();
        this.bindEvent();
    }
    _Sticky.prototype.start = function() {
        this.initialOffsetTop = this.target.offset().top;
    }
    _Sticky.prototype.addPlaceholder = function() {
        this.target.wrap('<div class="sticky-placeholder"></div>');
        let targetHeight = this.target.outerHeight(true);
        this.target.parent().height(targetHeight);
    }
    _Sticky.prototype.bindEvent = function() {
        $(window).on('scroll',() => {
            let scrollY = window.scrollY;
            if (scrollY  + this.topValue > this.initialOffsetTop) {
                this.target.addClass('sticky').css('top',this.topValue);
            } else {
                this.target.removeClass('sticky');
            }
        });
    };
    return {
        init: function($Element,posInteger) {
            new _Sticky($Element,posInteger);
        }
    }
})();

Sticky.init($('.top-bar'));
Sticky.init($('.demo'),60);
Sticky.init($('.btn-sticky'),200);


