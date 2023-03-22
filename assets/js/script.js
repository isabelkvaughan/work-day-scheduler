$(document).ready(function(){
//set date
var today = dayjs().format("dddd DD MMMM, YYYY");
  $('#currentDay').text("Today's date: " + today);

//set time
setInterval(function() {
  var time = dayjs().format("h:mm:ss a");
  $('#currentTime').text("Current time: " + time);
}, 1000);

createTimeBlocks()


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

      // Add the time-block element to the page
      document.querySelector("#time-blocks").appendChild(timeBlockEl);
  }


}});