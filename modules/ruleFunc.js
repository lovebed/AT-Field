var ruleMan = {};

function FifoCache(size) {
  this._size = Math.max(size, 0);
  this._cacheKeys = [];
  this._cache = {};
}
FifoCache.prototype = {
  // Add an entry to the cache, evicting the (size)th-oldest entry if the cache
  // is full.
  set: function(key, value) {
    var alreadyCached = (key in this._cache);
    this._cache[key] = value;

    if (!alreadyCached) {
      this._cacheKeys.push(key); // add to the end
      if (this._cacheKeys.length > this._size) {
        delete this._cache[this._cacheKeys[0]];
        this._cacheKeys.shift(); // remove from the beginning
      }
    }
  },

  // Return an entry from the cache, or undefined if key is not in the cache.
  get: function(key) {
    return this._cache[key];
  }
};

ruleMan.cache = {
    webreq:new FifoCache(50),
    cook:new FifoCache(50),
    white:new FifoCache(50)
};

ruleMan.rules = {};

parseURL = function parseURL(url){
    var matches = /^(([^:]+(?::|$))(?:(?:\w+:)?\/\/)?(?:[^:@\/]*(?::[^:@\/]*)?@)?(([^:\/?#]*)(?::(\d*))?))((?:[^?#\/]*\/)*[^?#]*)(\?[^#]*)?(\#.*)?/.exec(url);
    // The key values are identical to the JS location object values for that key
    var keys = ["href", "origin", "protocol", "host", "hostname", "port",
              "pathname", "search", "hash"];
    var uri = {};
    for (var i=0; i<keys.length; i++)
        uri[keys[i]] = matches[i] || "";
    return uri;
};

extractDomain = function extractDomain(url){
    return parseURL(url).host;
};

ruleMan.init = function init(){
    ruleMan.loadRules();
};

ruleMan.loadRules = function loadRules(){
    var rules={
        webreq:optionsGetList("webreq"),
        cook:optionsGetList("cookie"),
        white:optionsGetList("white")
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

ruleMan.testWebReq = function testWebReq(instWebReq){
    //返回值表示是否应被拦截
    var cacheKey = instWebReq.url + " " + instWebReq.domain;
    var result = ruleMan.cache.webreq.get(cacheKey);
    if(result != undefined){
        return result;
    };
    result = false;
    var jsDomain = extractDomain(instWebReq.url);
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
            }else{
                result=false;
            };
        };
    };
    ruleMan.cache.cook.set(cacheKey,result);
    return result;
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
}