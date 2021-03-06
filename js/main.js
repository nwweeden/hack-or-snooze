"use strict";

// So we don't have to keep re-finding things on page, find DOM elements once:

const $body = $("body");

const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");
const $storyStars = $('.story-star');

const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");

const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");
const $mainNavLinks = $('.main-nav-links');
const $navSubmit = $('#nav-submit');
const $submitForm = $('.submit-form');
const $navFavorites = $('#nav-favorites');


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
    $submitForm,
  ];
  components.forEach(c => c.hide());
}

/** Overall function to kick off the app. */

async function start() {
  console.debug("starting");
  
  hideMainNavBar();
  // "Remember logged-in user" and log in, if credentials in localStorage
  
  let rememberedUser = await checkForRememberedUser();
  await checkForRememberedUser();
  
  storyList = await StoryList.getStories();

      /*DELETE LATER: fake stories for testing
      console.log("testing from User class, returnStoryObject(stuff): " + returnStoryObject('3550a781-eecd-487a-8aac-be934cfda4c9'))
      currentUser.favorites.push(returnStoryObject('3550a781-eecd-487a-8aac-be934cfda4c9'));
      currentUser.favorites.push(returnStoryObject('9460f5dd-8d0e-4131-9976-8cafe56176b2'));*/

  $storiesLoadingMsg.remove();
  
  putStoriesOnPage();
  if(rememberedUser !== null) showStars();
}


// Once the DOM is entirely loaded, begin the app
$(start);