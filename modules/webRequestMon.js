scriptLog={};

onBeforeRequestDealer = function onBeforeRequestDealer(details){
    if(details.tabId == -1)
        return {};
    var type = details.type;

    if(type == "main_frame"){
        recordFrame(details.tabId,details.url);
        return {};
    }


    //------脚本监视模块-------
    if(type==="script"){
        var refererDomain=extractTool.domain(getTabUrl(details.tabId));
        var refererDomain2nd=extractTool.domain2nd(refererDomain);        
        var reqUrl=extractTool.path(details.url);
        var requestDomain=extractTool.domain(reqUrl);
        var requestDomain2nd=extractTool.domain2nd(requestDomain);
        if(!(requestDomain2nd===refererDomain2nd)){
            if(scriptLog[reqUrl]===undefined){
                scriptLog[reqUrl]={};
                scriptLog[reqUrl].num=1;
                scriptLog[reqUrl].referer={};
            }else{
                scriptLog[reqUrl].num++;
            };
            if(scriptLog[reqUrl].referer[refererDomain]===undefined){
                scriptLog[reqUrl].referer[refererDomain]=1;
            }else{
                scriptLog[reqUrl].referer[refererDomain]++;
            }
        }
    }


    //------脚本监视模块-------


    //------脚本拦截模块-------
    //TODO:record tab information
    var instWebReq={};
    instWebReq.url=details.url;
    instWebReq.domain=extractTool.domain(getTabUrl(details.tabId));

    checkResult = ruleMan.testWebReq(instWebReq);
    if(checkResult){
        return {cancel:true};
    }else{
        return {};
    }
    //------脚本拦截模块-------
};
