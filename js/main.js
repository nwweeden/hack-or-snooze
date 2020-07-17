"use strict";

// So we don't have to keep re-finding things on page, find DOM elements once:

const $body = $("body");

const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");

const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");

const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");
const $mainNavLinks = $('.main-nav-links');
const $navSubmit = $('#nav-submit');
const $submitForm = $('.submit-form');


/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */

function hidePageComponents() {
  const components = [
    $allStoriesList,
    $loginForm,
    $signupForm,
  ];
  components.forEach(c => c.hide());
}

//hide the nav bar made just for signed in users
function hideMainNavBar() {
  console.debug('hideMainNavBar')
  const components = [
    $mainNavLinks,
    $submitForm
  ];
  components.forEach(c => c.hide());
}

/** Overall function to kick off the app. */

async function start() {
  console.debug("start");
  
  hideMainNavBar();
  // "Remember logged-in user" and log in, if credentials in localStorage
  
  await checkForRememberedUser();
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  
  putStoriesOnPage();
}


// Once the DOM is entirely loaded, begin the app
$(start);