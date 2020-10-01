var now = moment();
var today = now.format('dddd') 
var todaysDateDayAndMonth = now.format('MMM Do');
var currentHour = now.format('HH');
var timeBlocks = $(".time-block");
var saveButtons = $(".saveBtn");
var textAreaMessageArray = []
var textAreaMessageArray = JSON.parse(localStorage.getItem('localStoredMessages')) || [];
$("#currentDay").html(today + " " + todaysDateDayAndMonth);

fillTextAreaFromLocal()

updateTimeBlocks();

for (let i = 0; i < saveButtons.length; i++) {
    curButtonIteration = saveButtons[i];
    curButtonIteration.addEventListener('click', saveToLocal);
}

function saveToLocal() {
    for (let i = 0; i < timeBlocks.length; i++) {
        var curIterationTextInputValue = $(timeBlocks[i]).val();
        textAreaMessageArray.push(curIterationTextInputValue);   
    }
    //      userInitialsArray.push(JSON.parse(localStorage.getItem('localScoreboard')));
    //      localStorage.setItem('localScoreboard', JSON.stringify(userInitialsArray));
    localStorage.setItem('localStoredMessages', JSON.stringify(textAreaMessageArray));
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

function fillTextAreaFromLocal() {
    for (let i = 0; i < timeBlocks.length; i++) {
        var curIterationTextInputValue = $(timeBlocks[i]).val(textAreaMessageArray[i]);
        textAreaMessageArray.push(curIterationTextInputValue);   
    }
}