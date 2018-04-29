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
        for (var i = 0; i < elements.length; i++) {
            //记录下此时elements[i]的元素父节点和紧跟其后的同级元素节点
            let parent = elements[i].parentElement;
            let sibling = elements[i].nextElementSibling;
            //将elements[i]作为wrapper的最后一个子节点插入，此时elements[i]从DOM中移除
            wrapper.appendChild(elements[i]);
            
            if (sibling) {
                parent.insertBefore(wrapper,sibling);
            } else {
                parent.appendChild(wrapper);
            }
        }   
    }
    _Sticky.prototype.addPlaceholder = function() {
        let stickyWrap = document.createElement('div');
        stickyWrap.setAttribute('class','sticky-placeholder');
        this.wrap(stickyWrap,this.target);
        let targetHeight = this.target.offsetHeight;
        console.log(targetHeight)
        this.target.parentElement.style.height = targetHeight + 'px';
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