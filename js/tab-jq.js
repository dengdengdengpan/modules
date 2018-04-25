let Tab = (function() {
    function _Tab($Element) {
        this.target = $Element;
        this.bindEvent();
    }
    _Tab.prototype.bindEvent = function() {
        let that = this;
        this.target.on('click','.tab-bar > li',function(event) {
            let $clickedLi = $(event.currentTarget);
            let index = $clickedLi.index();
            that.show($clickedLi,index);
        });
    }
    _Tab.prototype.show = function($clickedLi,index) {
        let $contentLi = $clickedLi.closest('.tab').find('.tab-content > li').eq(index);
        $clickedLi.addClass('active').siblings().removeClass('active');
        $contentLi.addClass('active').siblings().removeClass('active');
    }
    return {
        init: function($Element) {
            $Element.each(function(index,element) {
                new _Tab($(element));
            });
        }
    }
})();

let tab = Tab.init($('.tab'));