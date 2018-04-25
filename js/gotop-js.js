function GoTop(domElement) {
    this.target = domElement;
    this.bindEvent();
}
GoTop.prototype.bindEvent = function() {
    let elgotop = this.target;
    window.addEventListener('scroll',function() {
        let vertical = window.scrollY;
        if (vertical > 50) {
            elgotop.classList.add('active');
        } else {
            elgotop.classList.remove('active');
        }
    });
    this.target.addEventListener('click',function() {
        window.scrollTo(0,0);
    });
};

let goTop = new GoTop(document.querySelector('.go-top'));