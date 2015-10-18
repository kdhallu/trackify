$.trackify = (function($){
    "use strict"
    var trackitObj = trackitObj || {};
    var timmerInterval = 3000;
    var url = 'http://localhost:8080/';
    var eventBucket = [];
    var maxBucketOverFlowSize = 5;
    var caputredEveObj = {};
    var listeners = 'click';

    trackitObj.eventBucket = function (eventObj){
        eventBucket.push(eventObj);
        caputredEveObj.id = $(this).attr('id');

        if(eventBucket.length % maxBucketOverFlowSize == 0){
            console.log('bucket size reached');
            trackitObj.sendEvents(caputredEveObj)
        }
    };

    /* custom event triggered */
    trackitObj.handleOnEventTriggered = function(){
        if(eventBucket.length = maxBucketOverFlowSize){
            console.log('bucket size reached');
            trackitObj.sendEvents(eventBucket)
        }
    };

    trackitObj.setup = function () {
        console.log('trackify setup complete');
        trackitObj.timmer();
    };

    /* send events to the server */
    trackitObj.sendEvents = function(_data){
        $.ajax({
            url: url,
            data : JSON.stringify(_data),
            method : "post",
            success: function(result){
                /* Empty the bucket */
                caputredEveObj.length = -1;
            }
         });
    };

    trackitObj.handleReload = function(){
        /* if user reloads the page quickly send the whole bucket tot the server */

    };

    trackitObj.run = function(opts){
        var $target = $();
        for(var key in opts.target){
            $target = $target.add(opts.target[key]);
        }

        $target.on(listeners,function(e){
            trackitObj.eventBucket.call(this,e);
            e.preventDefault();
        });
    };

    trackitObj.timmer = function(){
        setInterval(function(){
            if(caputredEveObj.length){
                trackitObj.sendEvents(caputredEveObj);
            }else{
                console.log('bucket empty')
            }
        },timmerInterval)
    };


    /* setup before initialize */
    trackitObj.setup();
    //$('body').on('trackifyEventTrigger',trackitObj.handleOnEventTriggered);

    return {
        run : trackitObj.run
    }
})(jQuery);
