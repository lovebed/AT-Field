var o = {

}
function init()
{
	$('#testBTN').click(function () {showAllWebReqRule(); });
	$('#btnNewWhiteRule').click(function () {showAllWhiteRule(); });
	showAllWebReqRule();
	showAllCookieRule();
	showAllWhiteRule()
}
function showAllWebReqRule()
{
	var list = optionsGetList("webreq");
	var len = list.length;
	for (var i = 0; i < 10; i++) 
	{
		addOneWebReqRule(list,i);		
	}
}
function addOneWebReqRule(j,k)
{
		var table = $("#webReqRulesTable");
		var row = $("#webReqRulesTable .templateRow").clone();
		row.removeClass("templateRow").addClass("webReqRow");	
		table.append(row);		
		var list = j;

		var show = list[k]["pattern"];
		var webRul = $(".webReqRow .pattern");
		webRul.removeClass("pattern").addClass("newpattern");		
		webRul.text(show);

		show = list[k]["domain"];
		webRul = $(".webReqRow .domain");
		webRul.removeClass("domain").addClass("newdomain");
		webRul.text(show);

		show = list[k]["flag"];
		webRul = $(".webReqRow .flag");
		webRul.removeClass("flag").addClass("newflag");
		webRul.text(show);		
}
function showAllCookieRule()
{
		var list = optionsGetList("cookie");
		var len = list.length;
		for (var i = 0; i < 10; i++) 
		{
			addOneCookieRule(list,i);		
		}
}
function addOneCookieRule(j,k)
{
		var table = $("#cookieRulesTable");
		var row = $("#cookieRulesTable .templateRow").clone();
		row.removeClass("templateRow").addClass("cookieRow");	
		table.append(row);		
		var list = j;

		var show = list[k]["domain"];
		var webRul = $(".cookieRow .domain");
		webRul.removeClass("domain").addClass("newdomain");		
		webRul.text(show);

		show = list[k]["keypat"];
		webRul = $(".cookieRow .keypat");
		webRul.removeClass("keypat").addClass("newkeypat");
		webRul.text(show);	
}
function showAllWhiteRule()
{
		var list = optionsGetList("white");
		var len = list.length;
		for (var i = 0; i < 10; i++) 
		{
			addOneWhiteRule(list,i);		
		}	


}
function addOneWhiteRule(j,k)
{
		var table = $("#whiteRulesTable");
		var row = $("#whiteRulesTable .templateRow").clone();
		row.removeClass("templateRow").addClass("whiteRow");	
		table.append(row);		
		var list = j;

		var show = list[k];
		var webRul = $(".whiteRow .domain");
		webRul.removeClass("domain").addClass("newdomain");		
		webRul.text(show);
}





$(document).ready(function () {

    $("#tabs").tabs();
  	init();
     
});
