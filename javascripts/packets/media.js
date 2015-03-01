/*!
 * @packet media;
 */
var audio=function(c){this.option=c;var d=new Audio();var a=this;for(var b in c){if(/^on/.test(b)&&c[b]){d.addEventListener(b.substring(2,b.length),function(g){var f=a.option["on"+g.type];if(f){if(g.type==="progress"){g.percent=a.getLoadedPercent()}if(g.type==="timeupdate"){g.percent=a.getPlayedPercent()}f.call(a,g)}})}}this.audio=d};audio.prototype.src=function(a){if(arguments.length===1){this.audio.src=a;return this}else{return this.audio.src}};audio.prototype.preload=function(b){if(arguments.length===1){this.audio.preload=b;return this}else{return this.audio.preload}};audio.prototype.seeking=function(){return this.audio.seeking};audio.prototype.readyState=function(){return this.audio.readyState()};audio.prototype.toggle=function(){if(this.audio.paused){this.audio.play()}else{this.audio.pause()}return this};audio.prototype.isPlaying=function(){return !this.audio.paused};audio.prototype.load=function(){this.audio.load();return this};audio.prototype.play=function(){this.audio.play();return this};audio.prototype.pause=function(){this.audio.pause();return this};audio.prototype.volume=function(a){if(arguments.length===1){this.audio.volume=a;return this}else{return this.audio.volume}};audio.prototype.mute=function(a){if(arguments.length===1){this.audio.muted=a;return this}else{return this.audio.muted}};audio.prototype.isEnd=function(){return this.audio.ended};audio.prototype.loop=function(a){if(arguments.length===1){this.audio.loop=a;return this}else{return this.audio.loop}};audio.prototype.defaultPlayRate=function(){return this.audio.defaultPlaybackRate};audio.prototype.playRate=function(b){if(arguments.length===1){this.audio.playbackRate=b;return this}else{return this.audio.playbackRate}};audio.prototype.autoPlay=function(a){if(arguments.length===1){this.audio.autoPlay=a;return this}else{return this.audio.autoPlay}};audio.prototype.currentTime=function(a){if(arguments.length===1&&typeof a==="number"){this.audio.currentTime=a;return this}else{if(arguments.length===1){return audio.formatTime(this.audio.currentTime,a)}else{return this.audio.currentTime}}};audio.prototype.startTime=function(a){if(arguments.length===1){return audio.formatTime(this.audio.currentTime,a)}else{return this.audio.currentTime}};audio.prototype.error=function(){return this.audio.error};audio.prototype.canPlayType=function(a){return this.audio.canPlayType(a)};audio.prototype.getLoadedPercent=function(){try{return Math.round(this.audio.buffered.end(this.audio.buffered.length-1)/this.audio.duration*100)}catch(a){return 0}};audio.prototype.getPlayedPercent=function(){try{return Math.round(this.audio.currentTime/this.audio.duration*100)}catch(a){return 0}};audio.prototype.getAudio=function(){return this.audio};audio.formatTime=function(b,e){if(!e){e="hh:mm:ss"}var d=Math.floor(b/3600);var a=Math.floor((b-d*3600)/60);var c=Math.round(b-d*3600-a*60);e=e.replace(/h*/,function(h,g,k){if(h!==""){d=d+"";if(h.length<=d.length){return d}else{var f="";for(var j=0;j<(h.length-d.length);j++){f+="0"}f+=d;return f}}else{return""}}).replace(/m+/,function(g,f,k){if(g!==""){a=a+"";if(g.length<=a.length){return a}else{var j="";for(var h=0;h<(g.length-a.length);h++){j+="0"}j+=a;return j}}else{return""}});e=e.replace(/s+/g,function(h,g,k){if(h!==""){c=c+"";if(h.length<=c.length){return c}else{var f="";for(var j=0;j<(h.length-c.length);j++){f+="0"}f+=c;return f}}else{return""}});return e};audio.prototype.getTotalTime=function(a){if(arguments.length===1){return audio.formatTime(this.audio.duration,a)}else{return this.audio.duration}};var videowapper=function(b){var a={src:""};this.option=$.extend(a,b);this.video=new video()};module.exports={audio:function(b){var a={onloadstart:null,onprogress:null,onplay:null,onpause:null,onended:null,ontimeupdate:null,oncanplaythrough:null,oncanplay:null,onsuspend:null,onabort:null,onerror:null,onstalled:null,onloadedmetadata:null,onwaiting:null,onplaying:null,onseeking:null};$.extend(a,b);return new audio(a)},video:function(){}};