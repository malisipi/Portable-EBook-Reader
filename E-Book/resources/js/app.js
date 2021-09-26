// For Special Launcher Support
if(window["NL_CWD"]==undefined){
    Neutralino={};
    Neutralino.app={};
    Neutralino.window={};
    Neutralino.app.exit = () => {location.href="/close"};
    Neutralino.app.open = (_json) => {window.open(_json.url,"","width=600,height=400")};
    Neutralino.window.setTitle = (_title) => {document.title=_title};
}
// 

theBrand={"name":"null","logo":""};

var getBrandInfo = new XMLHttpRequest();
getBrandInfo.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        theBrand=JSON.parse(this.responseText);
        Neutralino.window.setTitle(theBrand.name);
        document.querySelector("#managementBox_logo").src=theBrand.logo;
    }
};
getBrandInfo.open("GET", "brand.json", true);
getBrandInfo.send();

var getAppsSettings = new XMLHttpRequest();
getAppsSettings.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        appSettings=JSON.parse(this.responseText);
        if(appSettings["big_buttons"]=="1"){
            document.querySelector("head").innerHTML+="<style>\
            #status > *{zoom:1.5}\
            .drawing-board-controls {zoom:1.5}\
            </style>"
        }

        if(appSettings["show_clock"]=="0"){
            document.querySelector("head").innerHTML+="<style>\
            #status-clock{visibility:hidden}\
            </style>"
        }
    }
};
getAppsSettings.open("GET", "app.json", true);
getAppsSettings.send();

function loadBooks(_json){
    books=JSON.parse(_json);
    books.forEach((book,no) => {
        document.querySelector("#bookmanager").innerHTML+="<div class='book' onclick='openBook("+no+");'><img draggable='false' src='books/"+book.folder+"/"+book.forename+book.cover+"."+book.format+"'><br>"+book.name+"</div>"
    });
}

var getBooks = new XMLHttpRequest();
getBooks.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        loadBooks(this.responseText);
    }
};
getBooks.open("GET", "books/books.json", true);
getBooks.send();

new DrawingBoard.Board('paint', {background: false    ,webStorage: false, controls: ['Color',{Size:{type:'auto'}},{DrawingMode:{filler:false}},'Navigation'],controlsPosition:'top center'});
new DrawingBoard.Board('board', {background: "#ffffff",webStorage: false, controls: ['Color',{Size:{type:'auto'}},{DrawingMode:{filler:false}},'Navigation'],controlsPosition:'top center'});

function openBook(no){
    theBook=books[no];
    document.querySelector("#page_all").value=theBook.end-theBook.start+1;
    loadPage(1);
    document.querySelector("#bookmanager").hidden=true;
    if(document.querySelector(".view-right")==undefined){showHideSidebar();}
}

function loadPage(no){
    if(no=="back"||no=="forward"||no=="now"){
        var _no = document.querySelector("#page_now").value;
        if(no=="back") no=_no-1;
        if(no=="forward") no=_no-(-1);
        if(no=="now") no=_no-0;
    }
    if(no<1||no>document.querySelector("#page_all").value){
        var _no = document.querySelector("#page_now").value;
        if(_no<1||_no>(document.querySelector("#page_all").value-0)){
            document.querySelector("#page_now").value=document.querySelector("#page_all").value;
            if((document.querySelector("#page_all").value-0)!=0){
                loadPage("now");
            }
        }
        return false;
    }
    document.querySelector("#reader").src="view.html?page=books/"+theBook.folder+"/"+theBook.forename+(theBook.start+no-1)+"."+theBook.format;
    document.querySelector("#page_now").value=no;
}

function showExtras(){
    try{
        if(document.querySelector('#extras').hidden){
            document.querySelector('#extras').hidden=false;
            var _extra = theBook.extras[document.querySelector("#page_now").value];
            if(_extra!=undefined){
                document.querySelector("#extras").src="books/"+theBook.folder+"/"+_extra;
            }else{
                document.querySelector("#extras").src="data:text/html,<h1 align='center'>No Extra</h1>";
            }
        }else{
            document.querySelector('#extras').hidden=true;
        }
    }catch{
        document.querySelector("#extras").src="data:text/html,<h1 align='center'>Open A Book To View Extras</h1>";
    }
}

function showHideSidebar(){
    if(document.querySelector(".view-right")==undefined){
        document.querySelectorAll(".view-full").forEach((obj)=>{obj.className=obj.className.replace("view-full","view-right");});
    }else{
        document.querySelectorAll(".view-right").forEach((obj)=>{obj.className=obj.className.replace("view-right","view-full");});
    }
}

setInterval(()=>{document.querySelector("#status-clock").innerHTML=Date().toString().match(/..\:..\:../g)[0];},1000)