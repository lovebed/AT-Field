frames={}

onBeforeRequestDealer = function onBeforeRequestDealer(details){
    if(details.tabId == -1)
        return {};
    var type = details.type;

    if(type == "main_frame"){
        recordFrame(details.tabId,details.url);
        return {};
    }

    //TODO:record tab information
    instWebReq={};
    instWebReq.url=details.url;
    instWebReq.domain=extractDomain(getTabUrl(details.tabId));

    checkResult = ruleMan.testWebReq(instWebReq);
    if(checkResult){
        return {cancel:true};
    }else{
        return {};
    }
};

recordFrame = function recordFrame(tabId,taburl){
    if(!(tabId in frames))
        frames[tabId] = {};
    frames[tabId] = {url: taburl};
}

getTabUrl = function getTabUrl(tabId){
    if(tabId in frames){
        return frames[tabId].url;
    }else{
        return undefined;
    }
}

chrome.webRequest.onBeforeRequest.addListener(onBeforeRequestDealer, {urls: ["http://*/*", "https://*/*"]}, ["blocking"]);