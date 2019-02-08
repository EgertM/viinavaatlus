var content = [
];

$(document).ready(function () {
    $('.ui.floating.dropdown.labeled.icon.button').dropdown({
        on: 'click'
    });
    $('.ui.menu .ui.dropdown').dropdown({
        on: 'click'
    });
    $('.ui.menu a.item')
        .on('click', function () {
            $(this)
                .addClass('active')
                .siblings()
                .removeClass('active');
        });
    $('#searchButton').on('click', function () {
        search();
    });

    $('#searchBox').keydown(function (event) {
        var keypressed = event.keyCode || event.which;
        if (keypressed == 13) {
            search();
        }
    });
    window.addEventListener("load", function () {
        window.cookieconsent.initialise({
            "palette": {
                "popup": {
                    "background": "#eaf7f7",
                    "text": "#5c7291"
                },
                "button": {
                    "background": "#56cbdb",
                    "text": "#000000"
                }
            },
            "position": "top",
            "type": "opt-in",
            "content": {
                "message": "See lehekülg kasutab küpsiseid.",
                "dismiss": "Ei nõustu",
                "allow": "Luba küpsised"
            },

        })
    });
    console.log(Cookies.get("age"));
    if (Cookies.get("cookieconsent_status")=="allow" && Cookies.get("age") != 1) {
        confirmation()
    }
    else if(Cookies.get("cookieconsent_status")!="allow"){
        confirmation()
    }

    var ul, li, a;
    ul = document.getElementById("alkoList");
    console.log(ul);
    li = ul.getElementsByTagName('a');


    for(i=0;i<li.length;i++){
        var map = {};
        map['title']=li[i].textContent.toLowerCase();
        content.push(map);
    }
    console.log(content);

    $('.ui.search')
        .search({
            source: content
        })
    ;
});

function search() {
    window.location.href = "/search/" + removeEstonianLetters($("#searchBox").val()).toLowerCase();
}

function confirmation() {
    $('.ui.basic.modal')
        .modal('show')
    ;
    document.getElementById("declineButton").onclick = function () {
        Cookies.set("age", 0);
        location.href = "/limpa";
    };
    document.getElementById("confirmButton").onclick = function () {
        if(Cookies.get("cookieconsent_status")=="allow"){
            Cookies.set("age", 1);
        }
        else{
            Cookies.set("age",0);
        }
    }
}


function removeEstonianLetters(string) {
    string = string.replace(/ä/g, "a");
    string = string.replace(/ö/g, "o");
    string = string.replace(/õ/g, "o");
    string = string.replace(/ü/g, "u");
    return string;
}

function searchFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('searchBox');
    filter = input.value.toLowerCase();
    ul = document.getElementById("alkoList");
    li = ul.getElementsByTagName('a');

    for (i = 0; i < li.length; i++) {
        txtValue = li[i].textContent.toLowerCase();
        console.log(filter);
        if (txtValue.indexOf(filter) > -1) {
            li[i].style.display = "";
            ul.style.display = "inline";
        }else {
            li[i].style.display = "none";
        }
        if(input.value==""){
            li[i].style.display="none";
        }
    }
}



