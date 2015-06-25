var trackit = (function($,self){
    var trackitobj = {
        trackinginfo : new Array(),
        counter : 0,

        init : function(obj){
            var time = (typeof obj.time)? obj.time : 10000;
            console.log('appliction init');
            trackitobj.listener();
            trackitobj.starttimer(time);
        },
        listener : function(){
            $('#testarea').on('mousedown',function(e){
                var obj = {};
                obj.ele = e.target.outerHTML;
                trackit.trackinginfo.push(obj);
                console.log(trackitobj.trackinginfo);

                e.preventDefault();
            })
        },
        starttimer : function(time) {
            setInterval(function () {
                trackitobj.send();
            }, time);
        },
        send : function(){
            $.ajax({
                    'url' : 'http://localhost:8080/api',
                    'data' : {'data': JSON.stringify(trackitobj.trackinginfo) },
                    'method' : 'POST'
                });
        }

    }

    return trackitobj;

})($,window);
