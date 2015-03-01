/*!
 * @packet main;
 * @require touch;
 * @require media;
 */
Module({name: "boards", extend: "viewgroup", init: function () {
        this.dom.show();
        var c = this.dom.children().length;
        this.size = c;
        this.current = 0;
        this.dom.height(c * 100 + "%");
        this.dom.children().each(function () {
            $(this).height(100 / c + "%")
        });
        var d = this;
        this.position = 0;
        $("body").touch(function (a) {
            if (a.action === "down") {
                d.dom.transition().removeAll();
                d.position = d.dom.transform().y()
            } else {
                if (a.action === "move") {
                    var b = d.position + a.offsetY, e = 0;
                    if (b > 0 || b < -(d.size - 1) * $("body").height()) {
                        e = d.position + a.offsetY / 3
                    } else {
                        e = b
                    }
                    d.dom.transform().y(e)
                } else {
                    console.log(a.offsetY);
                    if (Math.abs(a.offsetY) > 10) {
                        if (a.direction === "top") {
                            d.nextBoard()
                        } else {
                            if (a.direction === "bottom") {
                                d.prevBoard()
                            } else {
                                d.gotoBoard(-1)
                            }
                        }
                    }
                }
            }
            a.preventDefault();
            a.stopPropagation()
        });
        this.gotoBoard(0)
    }, gotoBoard: function (b) {
        if (b >= 0 && b < this.size) {
            this.current = b;
            this.dom.transition().set("-all-transform").scope().transform().y(-b/this.size*100+"%");
            this.dom.children().each(function () {
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active")
                }
            }).eq(b).addClass("active")
        } else {
            this.dom.transition().set("-all-transform").scope().transform().y(-this.current/this.size*100+"%")
        }
        return this
    }, nextBoard: function () {
        this.gotoBoard(this.current + 1);
        return this
    }, prevBoard: function () {
        this.gotoBoard(this.current - 1);
        return this
    }});
Module({name: "music", extend: "view", option: {music: "music/angel.mp3"}, init: function (e) {
        var f = this;
        this.dom.hide();
        var a = require("media");
        this.audio = a.audio({onloadedmetadata: function () {
                f.audio.play();
                f.dom.show()
            }}).src(e.music).loop(true);
        this.dom.children(0).button(function () {
            if (!f.audio.isPlaying()) {
                f.dom.removeClass("pause");
                f.audio.play()
            } else {
                f.dom.addClass("pause");
                f.audio.pause()
            }
        })
    }});