
function loadRecords() {
    
    var xmlHttp = null;
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    } else {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (xmlHttp != null) {
        xmlHttp.open("GET", "DisplayComments.jsp", true);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send();
    } else {
        alert("Your browser does not support Ajax!!");
    }

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            $("#AllComment").empty();
            $("#AllComment").append(xmlHttp.responseText);
        }
    };
}


function addComment() {
    var xmlHttp = null;

    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    } else {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (xmlHttp != null) {
        var name = document.getElementById("commentName").value;
        var comment = document.getElementById("commentMessage").value;

        var params = "formName=" + name + "&formComment=" + comment;
        xmlHttp.open("POST", "FormAddCommentServlet", true);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send(params);
    } else {
        alert("Your browser does not support Ajax!!");
    }

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            document.getElementById("commentTitle").innerHTML = "Comment Successfully Added";
            document.getElementById("commentTitle").style.color = "green";
            document.getElementById("formComment").reset();
            $("#commentNamePrompt").empty();
            $("#commentMessagePrompt").empty();
            $("#commentPrompt").empty();

            loadRecords();

            setTimeout(function () {
                document.getElementById("commentTitle").innerHTML = "Fill Form to Submit";
                document.getElementById("commentTitle").style.color = "black";
                $("#commentContainer").css("display", "none");
            }, 2000);

        }
    };
}

function validateName() {
    var name = document.getElementById("commentName").value;
    if (name.length == 0) {
        producePrompt("Name is Required", "commentNamePrompt", "red");
        return false;
    }
    if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
        producePrompt("First and Last Name Please", "commentNamePrompt", "red");
        return false;
    }
    producePrompt("Welcome " + name, "commentNamePrompt", "green");
    return true;
}

function validateComment() {
    var comment = document.getElementById("commentMessage").value;
    var required = 10;
    var left = required - comment.length;

    if (left > 0) {
        producePrompt(left + " Characters Required", "commentMessagePrompt", "red");
        return false;
    }
    producePrompt("Valid Comment", "commentMessagePrompt", "green");
    return true;
}

function validateCommentForm() {
    if (!validateName() || !validateComment()) {
        jsShow("commentPrompt");
        producePrompt("Form Must Be Valid To Submit", "commentPrompt", "red");
        setTimeout(function () {
            jsHide("commentPrompt");
        }, 2000);
        setTimeout(function () {
            jsHide("commentNamePrompt");
        }, 2000);
        setTimeout(function () {
            jsHide("commentMessagePrompt");
        }, 2000);
    } else {
        addComment();
    }
}

function jsShow(id) {
    document.getElementById(id).style.display = "block";
}

function jsHide(id) {
    document.getElementById(id).style.display = "none";
}


function producePrompt(message, promptLocation, color) {
    document.getElementById(promptLocation).innerHTML = message;
    document.getElementById(promptLocation).style.color = color;
}