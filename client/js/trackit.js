var trackit = (function($,self){
    var trackitobj = {
        trackinginfo : '',

        init : function(obj){
            var time = (typeof obj.time)? obj.time : 10000;
            console.log('appliction init');
            trackitobj.listener();
            trackitobj.starttimer(time);
        },
        listener : function(){
            $('#testarea').on('mousedown',function(e){
                console.log(e);
                trackitobj.trackinginfo['raw'] = e;
                trackitobj.trackinginfo['element'] = e.target;
                trackitobj.trackinginfo['text'] = $(e.target).text().trim() ;
                console.log(trackitobj.trackinginfo)
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
                    'data' : trackitobj.data,
                    'method' : 'POST'
                });
        }

    }

    return {
        init : trackitobj.init
    }

})($,window);
