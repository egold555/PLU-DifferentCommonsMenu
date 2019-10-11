const meal = 'dinner';

const cors_api_url = 'https://cors-anywhere.herokuapp.com/';
const urlToPing = 'http://www.plu.edu/dining/menus/'+ meal + '/';

var x = new XMLHttpRequest();
x.open('GET', cors_api_url + urlToPing);
x.onload = x.onerror = function () {
    print(x.responseText);
};
x.send('');

var parser = new DOMParser();
var doc;

var rootElement;

function print(text) {


    doc = parser.parseFromString(text, "text/html");
    rootElement = doc.getElementsByClassName('entry-content')[0];

    console.log("food items")

    var monday = [];
    var tuesday = [];
    var wednesday = [];
    var thursday = [];
    var friday = [];
    var saturday = [];
    var sunday = [];


    for (var i = 3; i < rootElement.children.length; i++) {
        var foodHtmlRaw = rootElement.children[i].children[0].children[0].children[0];

        var everyFood = foodHtmlRaw.getElementsByClassName('plu-food-menu-item');

        for (var j = 0; j < everyFood.length; j++) {
            var theFood = everyFood[j];

            var item = new Object();

            item.name = theFood.getElementsByClassName('item-name')[0].innerText;
            item.restraunt = theFood.id;
            if (item.restraunt === "") {
                item.restraunt = "Soup";
            }
            item.day = foodHtmlRaw.children[2].innerHTML;

            if (theFood.getElementsByClassName('item-price').length > 0) {
                item.price = theFood.getElementsByClassName('item-price')[0].innerHTML;
            } else {
                item.price = "Free";
            }

            //Sort into categories by day
            if (item.day.includes("Monday")) {
                monday.push(item);
            } else if (item.day.includes("Tuesday")) {
                tuesday.push(item);
            } else if (item.day.includes("Wednesday")) {
                wednesday.push(item);
            } else if (item.day.includes("Thursday")) {
                thursday.push(item);
            } else if (item.day.includes("Friday")) {
                friday.push(item);
            } else if (item.day.includes("Saturday")) {
                saturday.push(item);
            } else {
                sunday.push(item);
            }

            //console.log(JSON.stringify(item))
            //console.log(theFood)
        }


    }

    //Monday
    //    console.log(monday[0].day);
    //    for (var i = 0; i < monday.length; i++) {
    //        var item = monday[i];
    //        console.log("    " + item.name);
    //        console.log("        " + item.restraunt);
    //        console.log("        " + item.price);
    //        console.log(" ");
    //    }
    //    console.log(" ");

    console.log("Monday: " + monday.length);
    console.log("Tuesday: " + tuesday.length);
    console.log("Wednesday: " + wednesday.length);
    console.log("Thursday: " + thursday.length);
    console.log("Friday: " + friday.length);
    console.log("Saturday: " + saturday.length);
    console.log("Sunday: " + sunday.length);

//    generateEmptyTable(Math.max(monday.length, tuesday.length, wednesday.length, thursday.length, friday.length, saturday.length, sunday.length));
//
//    window.setTimeout(function () {
//        
//        populateCellsFor(monday, 1);
//    populateCellsFor(tuesday, 2);
//    populateCellsFor(wednesday, 3);
//    populateCellsFor(thursday, 4);
//    populateCellsFor(friday, 5);
//        
//    }, 500);
    
    genAndPopulateTable([monday, tuesday, wednesday, thursday, friday, saturday, sunday]);

    

}

function genAndPopulateTable(arrayOfDays) {
    var amountOfRowsToGenerate = Math.max(arrayOfDays[0].length, arrayOfDays[1].length, arrayOfDays[2].length, arrayOfDays[3].length, arrayOfDays[4].length, arrayOfDays[5].length, arrayOfDays[6].length);
    
    for (var col = 0; col < amountOfRowsToGenerate; col++) {
        //$('#myTable tr:last').after
        
        var toAppend = "<tr>";
        for (var row = 0; row < 7; row++) {
            var item = arrayOfDays[row][col];
            console.log(row + ", " + col + " " + JSON.stringify(item));
            //$('#tableData').append('<td>ROW: ' + row + ', COL: ' + col + '</td>')
            if(item == undefined){
                 toAppend += "<td><p></p></td>";
            }
            else {
                 toAppend += "<td><p>" + item.name + "</p><p>" + item.price + "</p><p>" + item.restraunt + "</p></td>";
            }
           
            
        }
        toAppend += "</tr>";
        $('#tableData').append(toAppend);
    }
    
}
