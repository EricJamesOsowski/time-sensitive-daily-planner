var now = moment();
var today = now.format('dddd') 
var todaysDateDayAndMonth = now.format('MMM Do');
var currentHour = now.format('HH');
var timeBlocks = $(".time-block");
var saveButtons = $(".saveBtn");
var textAreaMessageArray = JSON.parse(localStorage.getItem('localStoredMessages')) || [];
$("#currentDay").html(today + " " + todaysDateDayAndMonth);

console.log(textAreaMessageArray);

fillTextAreaFromLocal();

updateTimeBlocks();

for (let i = 0; i < saveButtons.length; i++) {
    curButtonIteration = saveButtons[i];
    curButtonIteration.addEventListener('click', saveToLocal);
}

function saveToLocal() {
    textAreaMessageArray = [];
    for (let i = 0; i < timeBlocks.length; i++) {
        var curIterationTextInputValue = $(timeBlocks[i]).val();
        textAreaMessageArray.push(curIterationTextInputValue);
        console.log("text message array is "+textAreaMessageArray); 
    }
    clearLocalStorage();
    localStorage.setItem('localStoredMessages', JSON.stringify(textAreaMessageArray));
    toast("I have been saved!");
}

function updateTimeBlocks() {
    for (let i = 0; i < timeBlocks.length; i++) {

        var curIterationTimeBlockValue = $(timeBlocks[i]).attr('value');

        if (curIterationTimeBlockValue < currentHour) {
            $(timeBlocks[i]).addClass("past");
        }
        else if (curIterationTimeBlockValue > currentHour) {
            $(timeBlocks[i]).addClass("future");
        }
        else if (curIterationTimeBlockValue == currentHour) {
            $(timeBlocks[i]).addClass("present");
        }
    }
}

function clearMessagesFromScreen() {
    for (let i = 0; i < timeBlocks.length; i++) {
        var curIterationTimeBlockHtml = $(timeBlocks[i]).html("");
    }
}

function clearLocalStorage(){
    localStorage.clear();
}

function fillTextAreaFromLocal() {
    for (let i = 0; i < timeBlocks.length; i++) {
        var curIterationTextInputValue = $(timeBlocks[i]).val(textAreaMessageArray[i]);
        textAreaMessageArray.push(curIterationTextInputValue);   
    }
}


function toast (snackText) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = snackText;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1500);
}
