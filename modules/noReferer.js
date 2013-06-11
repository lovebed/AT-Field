onBeforeSendHeadersDealer = function onBeforeSendHeadersDealer(details){
    var rule="http://www\.google-analytics\.com/ga\.js";
    var ruleexp=new RegExp(rule);
    if(ruleexp.test(details.url)){
        var headers=details.requestHeaders;
        for (var j = 0, l = headers.length; j < l; j++) {
            if (headers[j].name == "Referer") {
                headers.splice(j,1);//移除referer元素
                break;
            }
        }        
        var blockingResponse={};
        blockingResponse.requestHeaders=headers;
        return blockingResponse;
    }
}