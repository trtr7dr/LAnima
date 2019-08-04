class LAnima { //v 1.1
    constructor(scalexy) {
        if (scalexy === undefined)
            this.scaleXY = '0.62';
        else
            this.scaleXY = scalexy;

        this.data_list = ['data-effect', 'data-time', 'data-top', 'data-bottom', 'data-left', 'data-right', 'data-scale', 'data-opacity', 'data-styles'];
        this.all = document.getElementsByClassName('lanima');
        this.flag = false;
    }
    start() {
        var tmp;
        for (var i = 0; i < this.all.length; i++) {
            this.all[i]['data'] = this.get_attr(this.all[i]);
            if (this.all[i]['data']['data-time'] === 0)
                this.all[i]['data']['data-time'] = "0.3";
            switch (this.all[i]['data']['data-effect']) {
                case 'line':
                    if (this.all[i]['data']['data-top'] !== 0)
                        this.all[i]['data']['data-top'] = '-' + this.all[i]['data']['data-top'];
                    else
                        this.all[i]['data']['data-top'] = this.all[i]['data']['data-bottom'];

                    if (this.all[i]['data']['data-left'] !== 0)
                        this.all[i]['data']['data-left'] = '-' + this.all[i]['data']['data-left'];
                    else
                        this.all[i]['data']['data-left'] = this.all[i]['data']['data-right'];

                    tmp = 'scaleX(' + this.scaleXY + ') translate(' + this.all[i]['data']['data-left'] + ', ' + this.all[i]['data']['data-top'] + ');';
                    this.all[i].setAttribute("style", "transform:" + tmp + "-webkit-transform:" + tmp + "-moz-transform:" + tmp + "-ms-transform:" + tmp);
                    break;
                case 'scale':
                    tmp = 'scale(' + this.all[i]['data']['data-scale'] + ');';
                    this.all[i].setAttribute("style", "transform:" + tmp + "-webkit-transform:" + tmp + "-moz-transform:" + tmp + "-ms-transform:" + tmp);
                    break;
                case 'my':
                    tmp = this.all[i]['data']['data-styles'] + ';';
                    this.all[i].setAttribute("style", "transform:" + tmp + "-webkit-transform:" + tmp + "-moz-transform:" + tmp + "-ms-transform:" + tmp);
                    break;
            }
            this.all[i].style.opacity = this.all[i]['data']['data-opacity'];
        }
        this.ready();
    }
    get_attr(el) {
        var arr = [];
        var tmp;
        for (var i = 0; i < this.data_list.length; i++) {
            tmp = el.getAttribute(this.data_list[i]);
            if (tmp === null)
                tmp = 0;
            arr[this.data_list[i]] = tmp;
        }
        return arr;
    }
    ready() {
        this.flag = true;
    }
    go() {
        if (this.flag) {
            var tmp;
            for (var i = 0; i < this.all.length; i++) {
                tmp = this.all[i]['data']['data-time'] + 's;';
                this.all[i].setAttribute("style", "-webkit-transition:" + tmp + "transition:" + tmp + "-moz-transition:" + tmp + "-o-transition:" + tmp);
                //this.all[i].style.opacity = '1';

                this.all[i].style.transform = 'none';
            }
        } else {
            this.go();
        }
    }
}
let lanima = new LAnima();
lanima.start();

window.addEventListener("load", function() {
    lanima.go()
});
