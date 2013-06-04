//url提取处理部分
// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License

function parseUri (str) {
    var o   = parseUri.options,
        m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
        uri = {},
        i   = 14;

    while (i--) uri[o.key[i]] = m[i] || "";

    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
        if ($1) uri[o.q.name][$1] = $2;
    });

    return uri;
};

parseUri.options = {
    strictMode: false,
    key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
    q:   {
        name:   "queryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
};

extractTool={};

extractTool.domain = function (url){
    return parseUri(url).host;
};

extractTool.path = function (url){
    var parseRes=parseUri(url);
    return parseRes.protocol+"://"+parseRes.host+parseRes.path;
};

extractTool.domain2nd = function(domain) {
  var match = domain.match(/([^\.]+\.(?:co\.)?[^\.]+)\.?$/) || [domain, domain];
  return match[1].toLowerCase();
};

//先进先出缓存
function FifoCache(size) {
  this._size = Math.max(size, 0);
  this._cacheKeys = [];
  this._cache = {};
};

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

//frames管理
frames={};

recordFrame = function recordFrame(tabId,taburl){
    if(!(tabId in frames))
        frames[tabId] = {};
    frames[tabId] = {url: taburl};
};

getTabUrl = function getTabUrl(tabId){
    if(tabId in frames){
        return frames[tabId].url;
    }else{
        return undefined;
    }
};

onTabClosedHandler = function onTabClosedHandler(tabId){
  delete frames[tabId];
};