cookieOnChangeDealer = function cookieOnChangeDealer(changeInfo){
    if(changeInfo.removed===true){
        return;
    };
    var instCook={};
    instCook.domain=changeInfo.cookie.domain;
    instCook.key=changeInfo.cookie.name;

    checkResult=ruleMan.testCookie(instCook);
    if(!checkResult){
        return;
    }else{
        var removeDetail={};
        removeDetail.url=changeInfo.cookie.domain;
        removeDetail.name=changeInfo.cookie.name;
        chrome.cookies.remove(removeDetail);
        return;
    };
};

chrome.cookies.onChanged.addListener(cookieOnChangeDealer);