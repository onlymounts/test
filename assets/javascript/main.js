/*!
 * @packet main;
 */
Module({
    name:"box",
    extend:"viewgroup",
    init:function(){
        var ths = this;
        this.dom.bind("mousewheel", function (e) {
            if (e.wheelDelta < 0) {
                ths.dom.transition().set("-all-transform").done(function(){
                    console.log("----end----");
                }).scope().transform().y("-100%");
            } else {
                ths.dom.transition().set("-all-transform").done(function(){
                    console.log("------enenened----");
                }).scope().transform().y(0);
            }
        });
    }
});
Module({
    name:"index",
    extend:"viewgroup",
    init:function(){}
});