var o = {

}

function init()
{
	$('#btnRefreshWebReqRule').click(function () {refreshWebReqRule(); });
	$('#btnRefreshCookieRule').click(function () {refreshCookieRule(); });
	$('#btnRefreshWhiteRule').click(function () {refreshWhiteRule(); });
	$('#btnRefreshScriptLog').click(function () {refreshScriptLog(); });

	$(".webAdd").click(function () {newOneWebReqRule(); });	
	$(".cookieAdd").click(function () {newOneCookieRule(); });
	$(".whiteAdd").click(function () {newOneWhiteRule(); });
	showAllWebReqRule();
	showAllCookieRule();
	showAllWhiteRule();
	showAllWebReqRuletp();
	showAllScriptLog();
	$('.logRow').click(function () {
		$(event.target.parentNode.nextSibling).toggle();
	})
	$(".webDelete").click(function () {webdeleteFn();});
	$(".cookieDelete").click(function () {cookiedeleteFn();});
	$(".whiteDelete").click(function () {whitedeleteFn();});
//	$('#tab5').bind('tabsselect',function test(){
//	alert("lds");
//	});
}

function getScriptLog(){
	var scriptlogTab=[];
	var BG=chrome.extension.getBackgroundPage();
	var scriptlogObj=BG.scriptLog;
//	console.log(scriptlogObj);
	for(item in scriptlogObj){
		var tempItem={};
		tempItem.name=item;
		tempItem.num=scriptlogObj[item].num;
		tempItem.referer=[];
		for(innerItem in scriptlogObj[item].referer){
			tempItem.referer.push(innerItem);
		};
		scriptlogTab.push(tempItem);
	};
	return scriptlogTab;
};
function refreshBGrules(){
	//刷新后台页面规则
	var BG=chrome.extension.getBackgroundPage();
	BG.ruleMan.refresh();
}
function refreshWebReqRule(){
	removeAllWebReq();
	showAllWebReqRule();
	$(".webDelete").click(function () {webdeleteFn();});
}
function refreshCookieRule(){
	removeAllCookie();
	showAllCookieRule();
	$(".cookieDelete").click(function () {cookiedeleteFn();});
}
function refreshWhiteRule(){
	removeAllWhite();
	showAllWhiteRule();
	$(".whiteDelete").click(function () {whitedeleteFn();});
}
function refreshScriptLog(){
	$('.logRow').remove();
	$('.logRefer').remove();
	showAllScriptLog();
	$('.logRow').click(function () {
		$(event.target.parentNode.nextSibling).toggle();
	})
}

function webdeleteFn(){
	var row = event.target.parentNode.parentNode;
	var childrow = event.target.parentNode.parentNode.childNodes[1];
	var num = $(childrow).text();
	var r=confirm("确认删除？此操作将不可恢复！");
	if (r==true){
		deleteList("webreq",num);
		removeAllWebReq();
		showAllWebReqRule();
		$(".webDelete").click(function () {webdeleteFn();});
		refreshBGrules();
	}

}
function cookiedeleteFn(){
	var row = event.target.parentNode.parentNode;
	var childrow = event.target.parentNode.parentNode.childNodes[1];
	var num = $(childrow).text();
	var r=confirm("确认删除？此操作将不可恢复！");
	if (r==true){
		deleteList("cookie",num);
		removeAllCookie();
		showAllCookieRule();
		$(".cookieDelete").click(function () {cookiedeleteFn();});
		refreshBGrules();
	}
}
function whitedeleteFn(){
	var row = event.target.parentNode.parentNode;
	var childrow = event.target.parentNode.parentNode.childNodes[1];
	var num = $(childrow).text();
	var r=confirm("确认删除？此操作将不可恢复！");
	if (r==true){
		deleteList("white",num);
		removeAllWhite();
		showAllWhiteRule();
		$(".whiteDelete").click(function () {whitedeleteFn();});
		refreshBGrules();
	}
}
function removeAllWebReq(){
	$('.webReqRow').remove();
}
function removeAllCookie(){
	$('.cookieRow').remove();
}
function removeAllWhite(){
	$('.whiteRow').remove();
}
function newOneWebReqRule(){
	var pattern1 = $("#newWebReqRow #addPattern").val();
	var domian1 = $("#newWebReqRow #addDomain").val();
	if(pattern1=='')){
		alert("输入不能为空！");

	}else{
		addListMember("webreq",["pattern","domain"],[pattern1,domian1]);
		removeAllWebReq();
		showAllWebReqRule();
		$(".webDelete").click(function () {webdeleteFn();});
		refreshBGrules();
	}
}
function newOneCookieRule(){
	var domain1 = $("#newCookieRow #addDomain").val();
	var keypat1 = $("#newCookieRow #addKeypat").val();

	if((domain1=='')||(keypat1=='')){
		alert("输入不能为空！");

	}else{
		addListMember("cookie",["domain","keypat"],[domain1,keypat1]);
		removeAllCookie();
		showAllCookieRule();
		$(".cookieDelete").click(function () {cookiedeleteFn();});
		refreshBGrules();
	}
}
function newOneWhiteRule(){
	var domain1 = $("#newWhiteRow #addDomain").val();
	if(domain1==''){
		alert("输入不能为空！");

	}else{
		addListMember("white","",domain1);
		removeAllWhite();
		showAllWhiteRule();
		$(".whiteDelete").click(function () {whitedeleteFn();});
		refreshBGrules();
	}
}


function showAllWebReqRule(){
	var list = optionsGetList("webreq");
	var len = list.length;
	for (var i = 0; i < len; i++) 
	{
		addOneWebReqRule(list,i);		
	}
}
function addOneWebReqRule(j,k){
		var table = $("#webReqRulesTable");
		var row = $("#webReqRulesTable .templateRow").clone();
		row.removeClass("templateRow").addClass("webReqRow");	
		table.append(row);		
		var list = j;

		var show = k;
		var webRul = $(".webReqRow .webseq");
		webRul.removeClass("webseq").addClass("newwebseq");		
		webRul.text(show);		

		var show = list[k]["pattern"];
		var webRul = $(".webReqRow .pattern");
		webRul.removeClass("pattern").addClass("newpattern");		
		webRul.text(show);

		show = list[k]["domain"];
		webRul = $(".webReqRow .domain");
		webRul.removeClass("domain").addClass("newdomain");
		webRul.text(show);	
}
function showAllWebReqRuletp(){
	var list = optionsGetList("webreq");
	var len = list.length;
	for (var i = 0; i < len; i++) 
	{
		addOneWebReqRuletp(list,i);		
	}
}
function addOneWebReqRuletp(j,k){
		var table = $("#webReqRulesTabletp");
		var row = $("#webReqRulesTabletp .templateRowtp").clone();
		row.removeClass("templateRowtp").addClass("webReqRow1");	
		table.append(row);		
		var list = j;
		var show = list[k]["pattern"];
		var webRul = $(".webReqRow1 .pattern1");
		webRul.removeClass("pattern1").addClass("newpattern1");		
		webRul.text(show);

		show = list[k]["domain"];
		webRul = $(".webReqRow1 .domain1");
		webRul.removeClass("domain1").addClass("newdomain1");
		webRul.text(show);	
}
function showAllCookieRule(){
		var list = optionsGetList("cookie");
		var len = list.length;
		for (var i = 0; i < len; i++) 
		{
			addOneCookieRule(list,i);		
		}
}
function addOneCookieRule(j,k){
		var table = $("#cookieRulesTable");
		var row = $("#cookieRulesTable .templateRow").clone();
		row.removeClass("templateRow").addClass("cookieRow");	
		table.append(row);		
		var list = j;

		var show = k;
		var webRul = $(".cookieRow .cookieseq");
		webRul.removeClass("cookieseq").addClass("newcookieseq");		
		webRul.text(show);

		var show = list[k]["domain"];
		var webRul = $(".cookieRow .domain");
		webRul.removeClass("domain").addClass("newdomain");		
		webRul.text(show);

		show = list[k]["keypat"];
		webRul = $(".cookieRow .keypat");
		webRul.removeClass("keypat").addClass("newkeypat");
		webRul.text(show);	
}
function showAllWhiteRule(){
		var list = optionsGetList("white");
		var len = list.length;
		for (var i = 0; i < len; i++) 
		{
			addOneWhiteRule(list,i);		
		}	
}
function addOneWhiteRule(j,k){
		var table = $("#whiteRulesTable");
		var row = $("#whiteRulesTable .templateRow").clone();
		row.removeClass("templateRow").addClass("whiteRow");	
		table.append(row);		
		var list = j;

		var show = k;
		var webRul = $(".whiteRow .whiteseq");
		webRul.removeClass("whiteseq").addClass("newwhiteseq");		
		webRul.text(show);

		var show = list[k];
		var webRul = $(".whiteRow .domain");
		webRul.removeClass("domain").addClass("newdomain");		
		webRul.text(show);
}
function showAllScriptLog(){
	var log = getScriptLog();
	var len = log.length;
	var sortedLog = bubbleSort(log,len);

	if(len>0)
	{
		for (var i = 0; i < len; i++) 
		{
			addOneScriptLog(sortedLog,i);		
		}	
	}else{
		alert("插件运行期间未捕获到数据，让插件再跑一会儿吧！");
	}
	$('.logRefer').hide();

}
function bubbleSort(arr, len)
{
    var i,j,t;
     for(i=0;i<len-1;i++)
    {
        for(j=0;j<len-i-1;j++)
        {
            if(arr[j+1].num>arr[j].num)
            {
              t=arr[j+1];
              arr[j+1]=arr[j];
              arr[j]=t;
             }
        }
    }
    return arr;
 
}

function addOneScriptLog(log,k){
	
	var table = $("#scriptLog");
	var row = $("#scriptLog .templateRow").clone();
	row.removeClass("templateRow").addClass("logRow");	
	table.append(row);
	row = $("#scriptLog .templateRow2").clone();
	row.removeClass("templateRow2").addClass("logRefer");	
	table.append(row);			

	var show = log[k].name;
	var webRul = $(".logRow .logName");
	webRul.removeClass("logName").addClass("newlogName");		
	webRul.text(show);

	show = log[k].num;
	webRul = $(".logRow .logNum");
	webRul.removeClass("logNum").addClass("newlogNum");		
	webRul.text(show);

	var tatalReferer = log[k].referer;
	var rlen = tatalReferer.length;
	show = "";
	for (var i = 0; i < rlen; i++) 
	{
		show += tatalReferer[i]+'<br>';	
	}

//	var show1 = log[k].referer;
//	show = show1[0];
	webRul = $(".logRefer .logReferArr");
	webRul.removeClass("logReferArr").addClass("newlogReferArr");		
	webRul.html(show);

}





$(document).ready(function () {

    $("#tabs").tabs();
  	init();
     
});
