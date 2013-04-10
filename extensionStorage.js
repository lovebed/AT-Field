//插件选项存储管理模块

//Function: storage_get
//Parameter: key: string
//Return Value: value if key exists and is a JSON data, otherwise undefined
storage_get = function(key){
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

//Function: storage_set
//Parameter: key: string, value: object
//Return Value: undefined
storage_set = function(key,value){
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

