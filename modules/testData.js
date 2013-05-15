var testWebReqList = [];
var testCookieList = [];
var testWhiteList = [];

webReqRule = function(pattern,domain,flag){
    this.pattern = pattern;
    this.domain = domain;
    this.flag = flag;
}

cookieRule = function(dompat,keypat){
    this.domain = dompat;
    this.keypat = keypat;
}

//construct webreqlist
for(var i=0;i<10;i++){
    testWebReqList[i] = new webReqRule("pattern"+i,"domain"+i,true);
}

for(var i=0;i<10;i++){
    testCookieList[i] = new cookieRule("domain"+i,"keypat"+i);
}

for(var i=0;i<10;i++){
    testWhiteList[i] = "domain"+i;
}

testWebReqList[9]= new webReqRule("http://zodiacg.net/js/gallery.js","");

storageSet("webReqRuleList",testWebReqList);
storageSet("cookieRuleList",testCookieList);
storageSet("domainWhiteList",testWhiteList);

ruleMan.init();