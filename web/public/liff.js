window.onload = function (e) {
    // initialize and get basic information
    // https://developers.line.me/en/reference/liff/#initialize-liff-app
    liff.init(function (data) {
        initializeApp(data);
	    });
};

function initializeApp(data) {

    document.getElementById('useridfield').textContent = data.context.userId;
    var uid = data.context.userId ;
    //var x = document.createElement("IFRAME");
    var x = document.getElementById("myFrame");
    var url = "https://script.google.com/macros/s/AKfycbwa2eH7CptorI4pmq6hWy99pbv2JxfWw9r6c8d8Wxq00nyd9_IA/exec" +"?lineid="+uid ;
    x.setAttribute("src", url);
    document.body.appendChild(x);
  

}

