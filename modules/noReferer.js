onBeforeSendHeadersDealer = function onBeforeSendHeadersDealer(details){
    var instRefer = {};
    instRefer.url = details.url;
    instRefer.domain = extractTool.domain(getTabUrl(details.tabId));

    var checkResult = ruleMan.testNoRefer(instRefer);
    if(checkResult){
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