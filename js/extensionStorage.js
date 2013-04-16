//插件选项存储管理模块

//Function: storageGet
//Parameter: key: string
//Return Value: value if key exists and is a JSON data, otherwise undefined
storageGet = function(key){
    var json = localStorage.getItem(key);
    if(json == null){
        return undefined;
    }
    try{
        return JSON.parse(json);
    }catch(e){
        console.log("Parse JSON failed for" + key);
        return undefined;
    }
}

//Function: storageSet
//Parameter: key: string, value: object
//Return Value: undefined
storageSet = function(key,value){
    if(value === undefined){
        localStorage.removeItem(key);
        return;
    }
    try{
        localStorage.setItem(key, JSON.stringify(value));
    } catch(ex) {
        if(ex.name=="QUOTA_EXCEEDED_ERROR"){
            alert("Storage Quota Exceeded");
        }
    }
}

//Function: optionsGetList
//Parameter: key: string[webreq,cookie,white]
//Return Value: Parsed JSON object if key is a valid list name.
optionsGetList = function(key){
    switch(key){
        case "webreq":
            return storageGet("webReqRuleList");
            break;
        case "cookie":
            return storageGet("cookieRuleList");
            break;
        case "white":
            return storageGet("domainWhiteList");
            break;
        default:
            console.log("Invalid optionsGetList Call: " + key);
            return undefined;
    }
}

//Function: optionsGetKey
//Parameter: key: string
//Return Value: value if the options key exists.
optionsGetKey = function(key){
    var optionsList=storageGet("optionsStorage");
    if(optionsList.key == undefined){
        console.log("Invalid optionsGetKey Call: " + key);
        return undefined;
    }
    return optionsList.key;
}