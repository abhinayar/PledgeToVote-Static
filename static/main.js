/**
 * EVC - Pledge to Vote
 * Main JS file. Created by Abhi Nayar
 * https://abhinayar.design || https://linkedin.com/in/abhinayar
 *
 * Questions? Contact developer at anayar[2]@gmail.com (no brackets)
 * Created: 09/05/2018 | Last Edit: 09/05/2018
 */

// Create the global data struct
var globalData = {
  stepNum: 1,
  ofAge: -1,
  contact: {
    fname: "",
    lname: "",
    dob: -1,
  },
  voterRegStatus: -1,
  sharedPledge: -1,
  clickedBallotInfo: -1,
};

// Wait till document is ready, trigger jquery funct.
$(function () {
  // Unhide the current step in the globalData
  $('.main-step-' + globalData.stepNum).addClass('shown');

  // Check doc. status
  console.log("Document is ready");

  // ACTIVATE THE LIST ITEMS
  // This will insert data into the globalData and adjust the UI
  $('.topicListItem').on('click', function (e) {
    e.preventDefault();
    // Get the step number of this item
    var stepNum = parseInt($(this).data('step'));
    // Get the toggleVal
    var toggleItem = $(this).data('toggle-item'),
      toggleVal = $(this).data('toggle');
    // We only ADD to the globalData if this is a positive entry...

    // There are now 3 possibilities:
    // 1. User has never picked an option (globalData[toggleItem] === -1)
    // 2. User has already picked an option & it is THIS one (globalData[toggleItem] !== -1 && globalData[toggleItem] === toggleVal)
    // 3. User has already picked an option & it is NOT this one (globalData[toggleItem] !== -1 && !globalData[toggleItem] === toggleVal)

    // 1. User has never picked an option...
    // ... set the option value
    // ... give this item the active class
    // ... remove active class on ALL others (just to be sure)
    // ... make button active
    if (globalData[toggleItem] === -1) {
      console.log(1);
      // Set option value
      globalData[toggleItem] = toggleVal;
      // Remove active class on ALL items
      $('.topicListItem').removeClass('active');
      // Give item active class
      $(this).addClass('active');
      // Make the button active
      $('button.step-' + stepNum).addClass('active');
    }

    // 2. User has already picked an option, THIS one...
    // ... reset the option value to -1
    // ... remove the active class from this item (& all others just to be sure)
    // ... reset the button status to false
    else if (checkStepData(stepNum) && globalData[toggleItem] === toggleVal) {
      console.log(2);
      // Reset option value
      globalData[toggleItem] = -1;
      // Remove active class on ALL items
      $('.topicListItem').removeClass('active');
      // Reset the button status to inactive
      $('button.step-' + stepNum).removeClass('active');
    }

    // 3. User has already picked an option, NOT THIS one...
    // ... set the option value to this value
    // ... remove the active class from all toggleItems
    // ... add active class to this item
    // ... add active class to the button
    else if (checkStepData(stepNum) && globalData[toggleItem] !== toggleVal) {
      console.log(3);
      // Reset option value
      globalData[toggleItem] = toggleVal;
      // Remove active class on ALL items
      $('.topicListItem').removeClass('active');
      // Add active class to THIS item
      $(this).addClass('active');
      // Reset the button status to inactive
      $('button.step-' + stepNum).addClass('active');
    }

    // 4. Something is wrong. The step data doesn't check out BUt there is currently data in the globalData
    // ... reset the globalData
    // ... remove all active classes from items & buttons
    else {
      console.log(4);
      // Reset option value
      globalData[toggleItem] = -1;
      // Remove active class on ALL items
      $('.topicListItem').removeClass('active');
      // Reset the button status to inactive
      $('button.step-' + stepNum).removeClass('active');
    }

    console.log(globalData);
  });

  // MAKE BUTTONS CLICKABLE
  // Adjusts the stepNum and switches the UI to the new step
  $('.stepButton').on('click', function (e) {
    // Get the button from the span
    // The span wraps the whole button and for some weird reason
    // clicks aren't propogating through...
    let that = $(this);
    console.log("Button clicked, ", that);

    // Get the step to go to
    var curStep = parseInt($(that).data('cur-step')),
      goToStep = parseInt($(that).data('next-step'));
    // Validate the data
    if (checkStepData(curStep)) {
      // Change the globalData to reflect this
      $('.step').removeClass('shown')
      // Hide this step and unhide that one
      $('.main-step-' + goToStep).addClass('shown');
    } else {
      alert("Please check your selection and try again!");
    }
  });
});

function checkStepData(stepNum) {
  if (stepNum === 1) {
    var curVal = globalData["ofAge"];
    if (curVal === "yes" || curVal === "no") {
      return true;
    } else {
      return false;
    }
  }
  if (stepNum === 2) {
    var curVal = globalData["voterRegStatus"];
    if (curVal === "yes" || curVal === "maybe" || curVal === "no") {
      return true;
    } else {
      return false;
    }
  }
}
