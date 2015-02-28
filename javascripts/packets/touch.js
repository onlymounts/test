/*!
 * @packet touch;
 */
var currentTime = function () {
    return new Date().getTime();
};
var eventAgent = {
    events: (function () {
        if ((/AppleWebKit.*Mobile.*/).test(window.navigator.userAgent)) {
            return {
                type: "mobile",
                down: "touchstart",
                move: "touchmove",
                up: "touchend"
            };
        } else {
            return {
                type: "pc",
                down: "mousedown",
                move: "mousemove",
                up: "mouseup"
            };
        }
    })(),
    onmove: function (fn) {
        this.dom.bind(eventAgent.events["move"], eventAgent._move);
        return this;
    },
    ondown: function (fn) {
        this.dom.bind(eventAgent.events["down"], eventAgent._down);
        return this;
    },
    onup: function (fn) {
        this.dom.bind(eventAgent.events["up"], eventAgent._up);
        return this;
    },
    type: function () {
        return eventAgent.events.type;
    },
    _down: function (e) {
        var ths = e.currentTarget.datasets._touch_;
        e.action = "down";
        ths.direction = "none";
        e.direction = ths.direction;
        ths.isdown = true;
        ths.ismove = false;
        ths.movefirst = true;
        ths.itime = currentTime();

        ths.xis = e.touches ? e.touches[0].pageX : e.pageX;
        ths.yis = e.touches ? e.touches[0].pageY : e.pageY;
        ths.cxis = ths.xis;
        ths.cyis = ths.yis;
        e.xis = ths.xis;
        e.yis = ths.yis;
        ths._x = ths.xis;
        ths._y = ths.yis;
        ths._ontouch.call(ths.dom, e);
    },
    _move: function (e) {
        var ths = e.currentTarget.datasets._touch_;
        if (ths.isdown) {
            e.action = "move";
            ths.ismove = true;
            ths.cxis = e.touches ? e.touches[0].pageX : e.pageX;
            ths.cyis = e.touches ? e.touches[0].pageY : e.pageY;
            e.xis = ths.cxis;
            e.yis = ths.cyis;
            e.offsetX = ths.cxis - ths.xis;
            e.offsetY = ths.cyis - ths.yis;
            if (ths.movefirst) {
                ths.movefirst = false;
                if (Math.abs(e.offsetX) > Math.abs(e.offsetY)) {
                    ths.oishv = "h";
                } else {
                    ths.oishv = "v";
                }
                if (ths.oishv === "h") {
                    if (ths.cxis > ths.xis) {
                        ths.odirection = "right";
                    } else {
                        ths.odirection = "left";
                    }
                } else {
                    if (ths.cyis > ths.yis) {
                        ths.odirection = "bottom";
                    } else {
                        ths.odirection = "top";
                    }
                }
            }
            var _offsetx = ths.cxis - ths._x;
            var _offsety = ths.cyis - ths._y;
            if (Math.abs(_offsetx) > Math.abs(_offsety)) {
                ths.ishv = "h";
            } else {
                ths.ishv = "v";
            }
            if (ths.ishv === "h") {
                if (ths.cxis > ths._x) {
                    ths.direction = "right";
                } else {
                    ths.direction = "left";
                }
            } else {
                if (ths.cyis > ths._y) {
                    ths.direction = "bottom";
                } else {
                    ths.direction = "top";
                }
            }
            e.direction = ths.direction;
            e.odirection = ths.odirection;
            ths._x = ths.cxis;
            ths._y = ths.cyis;
            ths._ontouch.call(ths.dom, e);
        }
    },
    _up: function (e) {
        var ths = e.currentTarget.datasets._touch_;
        if (ths.isdown) {
            e.action = "up";
            ths.isdown = false;
            e.timeLast = new Date().getTime() - ths.itime;
            e.offsetY = ths.cyis - ths.yis;
            e.offsetX = ths.cxis - ths.xis;
            e.ismove = ths.ismove;
            e.xis = ths.cxis;
            e.yis = ths.cyis;
            e.direction = ths.direction;
            e.odirection = ths.odirection;
            ths._ontouch.call(ths.dom, e);
            ths.ismove = false;
        }
    }
};
$.fn.touch = function (ontouch) {
    if (!this.data("_touch_")) {
        var a = new agent(this, ontouch);
        this.data("_touch_", a);
        return a;
    } else {
        return this.data("_touch_");
    }
};
var agent = function (dom, ontouch) {
    this.dom = dom;
    this._ontouch = ontouch;
    this.xis = 0;
    this.yis = 0;
    this.cxis = 0;
    this.cyis = 0;
    this.direction = "";
    this.isdown = false;
    this.ismove = false;
    this.itime = 0;
    this.movefirst = false;
    this.ishv = "h";
    this.dom.css({
        "-webkit-user-select": "none",
        "-webkit-touch-callout": "none",
        "-webkit-user-drag": "none",
        "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
    });
    eventAgent.ondown.call(this);
    eventAgent.onmove.call(this);
    eventAgent.onup.call(this);
    return this;
};
agent.prototype.ontouch = function (fn) {
    this._ontouch = fn;
    return this;
};
$.fn.button=function(fn){
    var ths=this;
    this.css("position","relative");
    this.touch(function(e){
        if(e.action==="up"){
            if(!e.ismove&&e.timeLast>30){
                var n=$("<div class='nnbtn'></div>").appendTo(ths);
                setTimeout(function(){
                    n.transition().set("opacity").done(function(){
                        this.remove();
                        fn&&fn.call(ths);
                    }).scope().toggleClass("hover");
                },0);
            }
        }
    });
};
$.fn.touchAsbutton = function (option) {
    var ops = {
        hoverClass: "hover",
        onclick: null
    };
    $.extend(ops, option);
    var ishover = true, tiout = null, ismove = false;
    this.touch(function (e) {
        if (e.action === "down") {
            var ths = this;
            ishover = true;
            ismove = false;
            tiout = setTimeout(function () {
                if (ishover) {
                    ths.addClass(ops.hoverClass);
                }
            }, 100);
        } else if (e.action === "move") {
            ishover = false;
            ismove = true;
            this.removeClass(ops.hoverClass);
        } else {
            var ths = this, tiiout = null;
            tiiout = setTimeout(function () {
                ths.removeClass(ops.hoverClass);
                clearTimeout(tiout);
                if (!ismove) {
                    if (ops.onclick) {
                        ops.onclick.call(ths, e);
                    }
                    clearTimeout(tiiout);
                }
            }, 150);
//                e.stopPropagation();
        }
        e.preventDefault();
    });
    return this;
};
$.fn.swipeLeft = function (fn) {
    this.touch(function (e) {
        if (e.action === "up") {
            this.find("span").html(e.direction);
            if (e.timeLast < 200 && e.direction === "left") {
                if (fn) {
                    fn.call(this);
                }
            }
        }
        e.preventDefault();
    });
    return this;
};
$.fn.swipeRight = function (fn) {
    this.touch(function (e) {
        if (e.action === "up") {
            this.find("span").html(e.direction);
            if (e.timeLast < 200 && e.direction === "right") {
                if (fn) {
                    fn.call(this);
                }
            }
        }
        e.preventDefault();
    });
    return this;
};
$.fn.swipeTop = function () {
    this.touch(function (e) {
        if (e.action === "up") {
            if (e.timeLast < 200 && e.direction === "top") {
                if (fn) {
                    fn.call(this);
                }
            }
        }
        e.preventDefault();
    });
    return this;
};
$.fn.swipeBottom = function () {
    this.touch(function (e) {
        if (e.action === "up") {
            if (e.timeLast < 200 && e.direction === "bottom") {
                if (fn) {
                    fn.call(this);
                }
            }
        }
        e.preventDefault();
    });
    return this;
};
$.fn.tap = function (fn) {
    this.touch(function (e) {
        if (e.action === "up") {
            if (!e.ismove && e.timeLast < 200) {
                if (fn) {
                    fn.call(this, e);
                }
            }
        }
        e.preventDefault();
    });
    return this;
};
$.fn.longTap = function (fn) {
    this.touch(function (e) {
        if (e.action === "up") {
            if (!e.ismove && e.timeLast >= 1000) {
                if (fn) {
                    fn.call(this, e);
                }
            }
        }
        e.preventDefault();
    });
    return this;
};
$.fn.doubleTap = function (fn) {
    var times = 0;
    this.touch(function (e) {
        if (e.action === "down") {
        } else if (e.action === "up") {
            if (!e.ismove && e.timeLast < 200) {
                times++;
                if (times === 2) {
                    if (fn) {
                        fn.call(this);
                    }
                    times = 0;
                }
            }
        }
        e.preventDefault();
    });
    return this;
};