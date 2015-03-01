/*!
 * @packet main;
 * @require touch;
 * @require media;
 */
Module({name: "boards", extend: "viewgroup", init: function () {
        this.dom.show();
        var b = this.dom.children().length;
        this.size = b;
        this.current = 0;
        this.dom.height(b * 100 + "%");
        this.dom.children().each(function () {
            $(this).height(100 / b + "%");
        });
        var a = this;
        this.position = 0;
        $("body").touch(function (f) {
            if (f.action === "down") {
                a.dom.transition().removeAll();
                a.position = a.dom.transform().y();
            } else {
                if (f.action === "move") {
                    var d = a.position + f.offsetY, c = 0;
                    if (d > 0 || d < -(a.size - 1) * $("body").height()) {
                        c = a.position + f.offsetY / 3;
                    } else {
                        c = d;
                    }
                    a.dom.transform().y(c);
                } else {
                    console.log(f.offsetY);
                    if (Math.abs(f.offsetY) > 10) {
                        if (f.direction === "top") {
                            a.nextBoard();
                        } else {
                            if (f.direction === "bottom") {
                                a.prevBoard();
                            } else {
                                a.gotoBoard(-1);
                            }
                        }
                    }
                }
            }
            f.preventDefault();
            f.stopPropagation();
        });
        this.gotoBoard(0);
    }, gotoBoard: function (a) {
        if (a >= 0 && a < this.size) {
            this.current = a;
            this.dom.transition().set("-all-transform").scope().transform().y(-a/this.size*100+"%");
            this.dom.children().each(function () {
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                }
            }).eq(a).addClass("active");
        } else {
            this.dom.transition().set("-all-transform").scope().transform().y(-this.current /this.size*100+"%");
        }
        return this;
    }, nextBoard: function () {
        this.gotoBoard(this.current + 1);
        return this;
    }, prevBoard: function () {
        this.gotoBoard(this.current - 1);
        return this;
    }});
Module({name: "music", extend: "view", option: {music: "music/angel.mp3"}, init: function (d) {
        var c = this;
        this.dom.hide();
        var b = require("media");
        this.audio = b.audio({onloadedmetadata: function () {
                c.audio.play();
                c.dom.show();
            }}).src(d.music).loop(true);
        this.dom.children(0).button(function () {
            if (!c.audio.isPlaying()) {
                c.dom.removeClass("pause");
                c.audio.play();
            } else {
                c.dom.addClass("pause");
                c.audio.pause();
            }
        });
    }});