function saveTextAsFile(textToWrite, fileNameToSaveAs) {
    var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null) {
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    } else {
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}

function makebold() {
    document.getElementById("notesarea").style.fontWeight = "bold";;

}

function makeitalic() {
    document.getElementById("notesarea").style.fontStyle = "italic";
}

function cleartext() {
    document.getElementById("notesarea").value = ""
}

function fontsizechange() {
    var changefontsize = document.getElementById('fontsizedropdown');
    var textarea = document.getElementById("notesarea")
    textarea.style.fontSize = changefontsize.value + "px";

}

function fontchange() {
    var changeFontStyle = document.getElementById('changefontdropdown');
    document.getElementById("notesarea").style.fontFamily = changeFontStyle.value;



}

function onloadbody() {
    var textarea = document.getElementById("notesarea");
    textarea.style.fontSize = '24px';
    textarea.style.fontFamily = 'Arial';
}

function savenotes() {
    var nameofsubject = document.getElementById("subjectname");
    if (nameofsubject.value == "") {
        window.alert("Please enter the subject name");
        return;
    }
    var mainnotes = document.getElementById("notesarea");
    if (mainnotes.value == "") {
        window.alert("Please enter your notes");
        return;
    }

    if (document.getElementById(nameofsubject.value + 'hiddennotes') != null) {
        document.getElementById(nameofsubject.value + 'hiddennotes').value = mainnotes.value;
        return;
    }

    var sidebardiv = document.getElementById("sidebar");
    var newelement = document.createElement("a");
    var sidebarid = nameofsubject.value;
    newelement.onclick = (function() {
        var temp = nameofsubject.value;
        return function() { onsidebarclick(temp + ""); }

    })();
    var newsidebarname = document.createTextNode(nameofsubject.value);
    var hiddennotes = document.createElement('textarea');
    hiddennotes.value = mainnotes.value;
    hiddennotes.style.display = "none";
    hiddennotes.id = nameofsubject.value + 'hiddennotes';
    newelement.appendChild(hiddennotes);
    newelement.appendChild(newsidebarname);
    sidebardiv.appendChild(newelement);

}

function onsidebarclick(sidebarid) {
    var maintextarea = document.getElementById('notesarea');
    var subjecttitle = document.getElementById('subjectname');
    maintextarea.value = document.getElementById(sidebarid + 'hiddennotes').value;
    subjecttitle.value = sidebarid;
}