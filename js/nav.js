"use strict";

// const $body = $("body");

// const $storiesLoadingMsg = $("#stories-loading-msg");
// const $allStoriesList = $("#all-stories-list");

// const $loginForm = $("#login-form");
// const $signupForm = $("#signup-form");

// const $navLogin = $("#nav-login");
// const $navUserProfile = $("#nav-user-profile");
// const $navLogOut = $("#nav-logout");

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);


/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);


/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $navLogin.hide();
  $navLogOut.show();
  $mainNavLinks.show();
  $allStoriesList.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

/** When a user clicks on the submit form, the form drops down */
function showSubmitForm(){
  console.debug('showSubmitForm');
  $submitForm.show();
}

$navSubmit.on('click',showSubmitForm)