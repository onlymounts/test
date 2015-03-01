/*!
 * @packet main;
 * @require touch;
 * @require media;
 */
Module({
    name: "boards",
    extend: "viewgroup",
    init: function () {
        var size = this.dom.children().length;
        this.size = size;
        this.current = 0;
        this.dom.height(size * 100 + "%");
        this.dom.children().each(function () {
            $(this).height(100 / size + "%");
        });
        var ths = this;
        this.position = 0;
        $("body").touch(function (e) {
            if (e.action === "down") {
                ths.dom.transition().removeAll();
                ths.position = ths.dom.transform().y();
            } else if (e.action === "move") {
                var a = ths.position + e.offsetY, b = 0;
                if (a > 0 || a < -(ths.size - 1) * $("body").height()) {
                    b = ths.position + e.offsetY / 3;
                } else {
                    b = a;
                }
                ths.dom.transform().y(b);
            } else {
                console.log(e.offsetY);
                if(Math.abs(e.offsetY)>10){
                    if (e.direction === "top") {
                        ths.nextBoard();
                    } else if (e.direction === "bottom") {
                        ths.prevBoard();
                    } else {
                        ths.gotoBoard(-1);
                    }
                }
            }
            e.preventDefault();
            e.stopPropagation();
        });
        this.gotoBoard(0);
    },
    gotoBoard: function (num) {
        if (num >= 0 && num < this.size) {
            this.current = num;
            this.dom.transition().set("-all-transform").scope().transform().y(-num * $("body").height());
            this.dom.children().each(function () {
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                }
            }).eq(num).addClass("active");
        } else {
            this.dom.transition().set("-all-transform").scope().transform().y(-this.current * $("body").height());
        }
        return this;
    },
    nextBoard: function () {
        this.gotoBoard(this.current + 1);
        return this;
    },
    prevBoard: function () {
        this.gotoBoard(this.current - 1);
        return this;
    }
});
Module({
    name: "music",
    extend: "view",
    option:{
        music:"music/angel.mp3"
    },
    init: function (option) {
        var ths=this;
        this.dom.hide();
        var a = require("media");
        this.audio = a.audio({
            onloadedmetadata: function () {
                ths.audio.play();
                ths.dom.show();
            }
        }).src(option.music).loop(true);
        this.dom.children(0).button(function () {
            if(!ths.audio.isPlaying()){
                ths.dom.removeClass("pause");
                ths.audio.play();
            }else{
                ths.dom.addClass("pause");
                ths.audio.pause();
            }
        });
    }
});