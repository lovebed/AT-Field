var o = {

}
function init()
{
	$('#btnNewWebReqRule').click(function () {showAllWebReqRule(); });
	$('#btnNewCookieRule').click(function () {showAllCookieRule(); });
	$('#btnNewWhiteRule').click(function () {showAllWhiteRule(); });
	showAllWebReqRule();
	showAllCookieRule();
	showAllWhiteRule()
}
function webdeleteFn(){
	var row = event.target.parentNode.parentNode;
	var childrow = event.target.parentNode.parentNode.childNodes[1];
	var num = $(childrow).text();
	deleteList("webreq",num);
	$(row).remove();
}
function cookiedeleteFn(){
	var row = event.target.parentNode.parentNode;
	var childrow = event.target.parentNode.parentNode.childNodes[1];
	var num = $(childrow).text();
	deleteList("cookie",num);
	$(row).remove();
}
function whitedeleteFn(){
	var row = event.target.parentNode.parentNode;
	var childrow = event.target.parentNode.parentNode.childNodes[1];
	var num = $(childrow).text();
	deleteList("white",num);
	$(row).remove();
}
function newOneWebReqRule(){
	var pattern1 = $("#newWebReqRow #addPattern").val();
	var domian1 = $("#newWebReqRow #addDomain").val();
	addListMember("webreq",["pattern","domain"],[pattern1,domian1]);
	var list = optionsGetList("webreq");
	var len = list.length-1;
	addOneWebReqRule(list,len);
}
function newOneCookieRule(){
	var domain1 = $("#newCookieRow #addDomain").val();
	var keypat1 = $("#newCookieRow #addKeypat").val();
	addListMember("cookie",["domain","keypat"],[domain1,keypat1]);
	var list = optionsGetList("cookie");
	var len = list.length-1;
	addOneCookieRule(list,len);

}
function newOneWhiteRule(){
	var domain1 = $("#newWhiteRow #addDomain").val();
	addListMember("white","",domain1);
	var list = optionsGetList("white");
	var len = list.length-1;
	addOneWhiteRule(list,len);
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





$(document).ready(function () {

    $("#tabs").tabs();
  	init();
     
});
