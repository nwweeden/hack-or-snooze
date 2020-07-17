"use strict";

// const $body = $("body");

// const $storiesLoadingMsg = $("#stories-loading-msg");
// const $allStoriesList = $("#all-stories-list");

// const $loginForm = $("#login-form");
// const $signupForm = $("#signup-form");

// const $navLogin = $("#nav-login");
// const $navUserProfile = $("#nav-user-profile");
// const $navLogOut = $("#nav-logout");

// This is the global list of the stories, an instance of StoryList
let storyList;


/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);
  const hostName = story.getHostName();

  // render all the rest of the story markup
  return $(`
      <li id="${story.storyId}">
        <i class='far fa-star story-star'></i>
        <a class="story-link" href="${story.url}" target="a_blank">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by {story.username}</small>
      </li>
    `);
}


/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  // empty out that part of the page
  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const markup = generateStoryMarkup(story);
    $allStoriesList.append(markup);
  }

  $allStoriesList.show();
}

//Grab the author, story and story url and call the api
async function getStoryInputAndAddStory(){
  let newStoryInput = {
    author: $('#submit-form-author').val(),
    title: $('#submit-form-title').val(),
    url: $('#submit-form-story-url').val()
  }
  // console.log(title, author, url)
 await storyList.addStory(currentUser, newStoryInput)
  // console.log(newStory);
  // console.log(storyList);
  putStoriesOnPage();
  $submitForm.hide();
}

$("#submit-btn").on('click', getStoryInputAndAddStory)

//show stars when user logs in
function showStars(){
  console.debug('showStar');
  $('.story-star').css('display','inline')
}