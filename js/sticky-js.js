let Sticky = (function() {
    function _Sticky(domElement,posInter) {
        this.target = domElement;
        this.topValue = posInter || 0;
        this.start();
        this.addPlaceholder();
        this.bindEvent();
    }
    _Sticky.prototype.start = function() {
        this.initialOffsetTop = this.target.offsetTop;
    };
    _Sticky.prototype.wrap = function(wrapper,elements) {
        /*
        document.querySelector()取得的domElement没有length属性，则将其放入数组
        document.querySelectorAll()取得的domElement是一个NodeList类数组对象，有length属性
        */
        if (!elements.length) {
            elements = [elements];
        }
        for (var i = elements.length - 1; i >= 0; i--) {
            let child = (i > 0) ? wrapper.cloneNode(true) : wrapper;
            let element = elements[i];
            let parent = element.parentNode;
            let sibling = element.nextSibling;
            child.appendChild(element);
            if (sibling) {
                parent.insertBefore(child, sibling);
            } else {
                parent.appendChild(child);
            }
        }    
    }
    _Sticky.prototype.addPlaceholder = function() {
        let stickyWrap = document.createElement('div');
        stickyWrap.setAttribute('class','sticky-placeholder');
        this.wrap(stickyWrap,this.target);
    };
    _Sticky.prototype.bindEvent = function() {
        window.addEventListener('scroll',() => {
            let scrollY = window.scrollY;
            if (scrollY + this.topValue > this.initialOffsetTop) {
                this.target.classList.add('sticky');
                this.target.style.top = this.topValue + 'px';
            } else {
                this.target.classList.remove('sticky');
            }
        });
    };
    return {
        init: function(domElement,posInter) {
            new _Sticky(domElement,posInter);
        }
    }
})();

Sticky.init(document.querySelector('.top-bar'));
Sticky.init(document.querySelector('.demo'),60);
Sticky.init(document.querySelector('.btn-sticky'),200);