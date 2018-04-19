let GoTop = function() {
    let _GoTop = function(domElement) {
        this.target = domElement;
        this.bindEvent();
    };
    _GoTop.prototype.bindEvent = function() {
        let that = this;
        window.addEventListener('scroll',function() {
            let vertical = window.scrollY;
            if (vertical > 50) {
                that.target.classList.add('active');
            } else {
                that.target.classList.remove('active');
            }
        });
        this.target.addEventListener('click',function() {
            window.scrollTo(0,0);
        });
    };
    return {
        init: function(domElement) {
            new _GoTop(domElement);
        }
    }
}();

GoTop.init(document.querySelector('.go-top'));