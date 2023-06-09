$(document).ready(function(){
//set date
var today = dayjs().format("dddd DD MMMM, YYYY");
  $('#currentDay').text("Today's date: " + today);

//set time
setInterval(function() {
  var time = dayjs().format("h:mm:ss a");
  $('#currentTime').text("Current time: " + time);
}, 1000);

//run function to create time blocks
createTimeBlocks();

// define function to create time blocks
function createTimeBlocks() {

  //define start and end hour of the day
  var startHr = 9;
  var endHr = 17;

  // loop through hours to create individual time blocks
  for (var hour = startHr; hour <= endHr; hour++) {
    //create timeBlockEl
    var timeBlockEl = document.createElement("div");
    timeBlockEl.setAttribute("id", "hour-" + hour);
    timeBlockEl.classList.add("row", "time-block");

    // add hourEl and append to timeBlock
    var hourEl = document.createElement("div");
    hourEl.classList.add("col-2", "col-md-1", "hour", "text-center", "py-3");
    hourEl.textContent = hour <= 12 ? hour + "AM" : hour - 12 + "PM";
    timeBlockEl.appendChild(hourEl);

    // add textInput and append to timeBlock
    var textInput = document.createElement("textarea");
    textInput.classList.add("col-8", "col-md-10", "description");
    textInput.setAttribute("rows", "3");
    timeBlockEl.appendChild(textInput);

    // add saveBtn and append to timeBlock
    var saveBtn = document.createElement("button");
    saveBtn.classList.add("btn", "saveBtn", "col-2", "col-md-1");
    saveBtn.setAttribute("aria-label", "save");
    var saveIcon = document.createElement("i");
    saveIcon.classList.add("fas", "fa-save");
    saveIcon.setAttribute("aria-hidden", "true");
    saveBtn.appendChild(saveIcon);
    timeBlockEl.appendChild(saveBtn);

    // Get the saved text from localStorage
    var savedText = localStorage.getItem("hour-" + hour);
    // Set the text of the textInput to the saved text
    textInput.value = savedText;

    // Add the time-block element to the page
    document.querySelector("#time-blocks").appendChild(timeBlockEl);
  }
}

//set colour of timeblocks according to currentHr
//define currentHr
var currentHr = dayjs().hour();

// selected all elements with class time-block
var timeBlocks = document.querySelectorAll(".time-block");

// for each time block, run function on timeBlock
timeBlocks.forEach(function (timeBlock) {
  //get hour of the timeBlock by splitting hour- from id on timeBlock
  var timeBlockHr = parseInt(timeBlock.getAttribute("id").split("hour-")[1]);

  // add present class is timeBlockHr equals currentHr
  if (timeBlockHr === currentHr) {
    timeBlock.classList.add("present");
  }
  // add past class is timeBlockHr is less than the currentHr
  else if (timeBlockHr < currentHr) {
    timeBlock.classList.add("past");
  }
  // add future class otherwise
  else {
    timeBlock.classList.add("future");
  }
});

//save text function
function saveText(event) {
  var textInput = event.target.previousSibling;
  var textInputValue = textInput.value;
  var timeBlockId = event.target.parentNode.getAttribute("id");
  console.log("Timeblock:", timeBlockId);
  console.log("Text Input: ", textInputValue);
  localStorage.setItem(timeBlockId, textInputValue);
  var savedText = localStorage.getItem(timeBlockId);
  textInput.value = savedText;
}

document
  .querySelector("#time-blocks")
  .addEventListener("click", function (event) {
    if (event.target.matches(".saveBtn")) {
      saveText(event);
    }
  });
});