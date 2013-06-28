
ruleMan = {};

ruleMan.cache = {
    webreq:new FifoCache(100),
    cook:new FifoCache(100),
    white:new FifoCache(100),
    norefer:new FifoCache(100)
};

ruleMan.rules = {};

ruleMan.init = function init(){
    ruleMan.loadRules();
};

ruleMan.refresh = function refresh(){
    ruleMan.loadRules();
    ruleMan.cache=undefined;
    ruleMan.cache = {
        webreq:new FifoCache(100),
        cook:new FifoCache(100),
        white:new FifoCache(100),
        norefer:new FifoCache(100)
    };
}

ruleMan.loadRules = function loadRules(){
    var rules={
        webreq:optionsGetList("webreq"),
        cook:optionsGetList("cookie"),
        white:optionsGetList("white"),
        norefer:optionsGetList("norefer")
    };
    console.log(rules);
    for (var i=0,l=rules.webreq.length;i<l;i++){
        rules.webreq[i].pattern=ruleMan.transRule(rules.webreq[i].pattern);
        rules.webreq[i].domain=ruleMan.transRule(rules.webreq[i].domain);
//        rules.webreq[i].flag=ruleMan.transRule(rules.webreq[i].flag);
        console.log("transed webreq"+i);
    };
    for (var i=0,l=rules.cook.length;i<l;i++){
        rules.cook[i].domain=ruleMan.transRule(rules.cook[i].domain);
        rules.cook[i].keypat=ruleMan.transRule(rules.cook[i].keypat);
        console.log("transed cook"+i);
    };
    for (var i=0,l=rules.white.length;i<l;i++){
        rules.white[i]=ruleMan.transRule(rules.white[i]);
        console.log("transed white"+i);
    };
    for (var i=0,l=rules.norefer.length;i<l;i++){
        rules.norefer[i].url=ruleMan.transRule(rules.norefer[i].url);
        rules.norefer[i].domain=ruleMan.transRule(rules.norefer[i].domain);
    }
    ruleMan.rules=rules;
};

ruleMan.transRule = function transRule(pattern){
    pattern = pattern.replace(/([\\\+\|\{\}\[\]\(\)\^\$\.\#])/g, "\\$1");
//  pattern = pattern.replace(/\./g, "\\.");
    pattern = pattern.replace(/\*/g, ".*");
    pattern = pattern.replace(/\?/g, ".");
//  var regexp = /*new RegExp*/("^" + pattern + "$");
    var regexp = pattern;
    return regexp;
};

ruleMan.regExpMatch = function regExpMatch(url,pattern){
    var regexp = new RegExp(pattern);
    return regexp.test(url);
};

ruleMan.testWhite = function testWhite(url){
    var cacheKey = url;
    var result = ruleMan.cache.white.get(cacheKey);
    if(result != undefined){
        return result;
    };
    result = false;
    for(var i=0,l=ruleMan.rules.white.length;i<l;i++){
        if(regExpMatch(url,ruleMan.rules.white[i])){
            result=true;
            break;
        };
    };
    ruleMan.cache.white.set(cacheKey,result);
    return result;
};

ruleMan.testWebReq = function testWebReq(instWebReq){
    //返回值表示是否应被拦截
    var cacheKey = instWebReq.url + " " + instWebReq.domain;
    var result = ruleMan.cache.webreq.get(cacheKey);
    if(result != undefined){
        return result;
    };
    result = false;
    var jsDomain = extractTool.domain(instWebReq.url);
    for(var i=0,l=ruleMan.rules.webreq.length;i<l;i++){
        if(ruleMan.regExpMatch(instWebReq.url,ruleMan.rules.webreq[i].pattern)){
            if(ruleMan.rules.webreq[i].domain != ""){
                if(ruleMan.rules.webreq[i].domain===instWebReq.domain){
                    result=false;
                    break;
                }else{
                    result=true;
                    break;
                };
            }else{
                result=true;
                break;
            };
        };
    };
    ruleMan.cache.webreq.set(cacheKey,result);
    return result;
};

ruleMan.testCook = function testCook(instCook){
    //返回值表示是否应被删除
    var cacheKey = instCook.domain + " " + instCook.key;
    var result = ruleMan.cache.cook.get(cacheKey);
    if(result!=undefined){
        return result;
    };
    result = false;
    for(var i=0,l=ruleMan.rules.cook.length;i<l;i++){
        if(ruleMan.regExpMatch(instCook.domain,ruleMan.rules.cook[i].domain)){
            if(ruleMan.regExpMatch(instCook.key,ruleMan.rules.cook[i].keypat)){
                result=true;
                break;
            }else{
                result=false;
            };
        };
    };
    ruleMan.cache.cook.set(cacheKey,result);
    return result;
};

ruleMan.testNoRefer = function testNoRefer(instRefer){
    //返回值表示是否应被去除
    var cacheKey = instRefer.url + " " + instRefer.domain;
    var result = ruleMan.cache.norefer.get(cacheKey);
    if(result!=undefined){
        return result;
    };
    result = false;
    for(var i=0,l=ruleMan.rules.norefer.length;i<l;i++){
        if(ruleMan.regExpMatch(instRefer.url,ruleMan.rules.norefer[i].url)){
            if(ruleMan.rules.norefer[i].domain != ""){
                if(ruleMan.rules.norefer[i].domain===instRefer.domain){
                    result=false;
                    break;
                }else{
                    result=true;
                    break;
                };
            }else{
                result=true;
                break;
            };
        };
    };
    ruleMan.cache.norefer.set(cacheKey,result);
    return result;
}