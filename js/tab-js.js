let Tab = (function() {
    function _Tab(domElement) {
        this.target = domElement;
        this.getElement();
        this.bindEvent();
    }
    _Tab.prototype.getElement = function() {
        this.barLis = this.target.querySelectorAll('.tab-bar > li');
        this.contentLis = this.target.querySelectorAll('.tab-content > li');
    };
    _Tab.prototype.bindEvent = function() {
        let that = this;
        this.barLis.forEach(function(barLi) {
            barLi.addEventListener('click',function(event) {
                let clickedLi = event.currentTarget;
                let index = Array.prototype.indexOf.call(that.barLis,clickedLi);
                that.show(index);
            });
        })
    };
    _Tab.prototype.show = function(index) {
        this.barLis.forEach(function(barLi) {
            barLi.classList.remove('active');
        });
        this.barLis[index].classList.add('active');
        this.contentLis.forEach(function(contentLi) {
            contentLi.classList.remove('active');
        });
        this.contentLis[index].classList.add('active');
    };
    return {
        init: function(domElement) {
            domElement.forEach(function(element) {
                new _Tab(element);
            });
        }
    }
})();

let tab = Tab.init(document.querySelectorAll('.tab'));