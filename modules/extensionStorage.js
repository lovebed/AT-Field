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
    if(optionsList === undefined || optionsList[key] === undefined){
        console.log("Invalid optionsGetKey Call: " + key);
        return undefined;
    }
    return optionsList.key;
}

optionsSetKey = function(key,value){
    var optionsList=storageGet("optionsStorage");
    if(optionsList===undefined){
        optionsList = {};
    }
    optionsList[key]=value;
    storageSet("optionsStorage",optionsList);
    return;
}

webReqRule1 = function(attribute,value){
        this[attribute[0]] = value[0];
        this[attribute[1]] = value[1];
    }

cookieRule1 = function(attribute,value){
        this[attribute[0]] = value[0];
        this[attribute[1]] = value[1];

    }
white1 = function(attribute,value){
        this[attribute[0]] = value[0];
               
    }

addListMember = function(key,attribute,value,num)
{
   var list = optionsGetList(key);
    var leng=list.length;
    
    switch(key){
        case "webreq":
        list[leng]=new webReqRule1(attribute,value);
        storageSet("webReqRuleList",list);
            break;
        case "cookie":
        list[leng]= new cookieRule1(attribute,value);
        storageSet("cookieRuleList",list);
            break;
        case "white":
        list[leng]= new white1(attribute,value);
        storageSet("domainWhiteList",list);
            break;
        }   
        return true;
}

//key:"webreq","cookie","white"    num:要改变的第num个对象的  attribute：要改变的第num个对象的属性   value：改变后的值
//Return Value:true,false
changeListAttribute = function(key,num,attribute,value){
    var list = optionsGetList(key);
    list[num][attribute]=value;
    switch(key){
        case "webreq":
        storageSet("webReqRuleList",list);
            break;
        case "cookie":
        storageSet("cookieRuleList",list);
            break;
        case "white":
        storageSet("domainWhiteList",list);
            break;
        }
    return true; 

}

//key:"webreq","cookie","white"      attributee:要查找的key的属性    value：要查找的attributee的值
//Return Value:num,num[0]:匹配的个数,num[j]: key的第j个对象符合查找条件
findListattribute = function(key,attributee,value){
    var list = optionsGetList(key);
    var num=[];
    var i=0;
    var j=0;
    var re =new RegExp(value);
    for ( i = list.length - 1; i >= 0; i--) {
        if(re.test(list[i][attributee]))
          {
            num[j+1]=i;j++;
           } 
    }
    num[0]=j;
    return num;
}
//key:"webreq","cookie","white"    num:要删除第几个
//Return Value:true,false
deleteList = function(key,num){
    var list = optionsGetList(key);
    if(num> list.length) return false;
    list.splice(num,1);
    switch(key){
        case "webreq":
        storageSet("webReqRuleList",list);
            break;
        case "cookie":
        storageSet("cookieRuleList",list);
            break;
        case "white":
        storageSet("domainWhiteList",list);
            break;
        }
    
    return true;
}
