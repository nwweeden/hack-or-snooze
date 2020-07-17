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
        <i class='far fa-star story-star' id='star-${story.storyId}'></i>
        <a class="story-link" href="${story.url}" target="a_blank">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by {story.username}</small>
      </li>
    `);
}
/***TODO***/
//1. add listeners to stars
    //option: delegate listener
//2. toggle the FA icon to filled in star DONE
//3a. add clicked story to user's stories[]
//3b. if favorite already, remove favorite from user's stories
//4. add addFavoriteToUserAndAPI() to User class (adds clicked story to API via 'add new favorites' POST)
//5. add removeFavoriteFromUserAndAPI() to User class 

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

//add toggling on stars and add/remove to favorites
$("#all-stories-list").on("click", "i", function(event){
  $(`#${event.target.id}`).toggleClass("far fa-star story-star").toggleClass("fas fa-star story-star")
    let starStoryId = event.target.id.slice(5);
    // console.log(starStoryId);
    let story = returnStoryObject(starStoryId);
    //compare to favorites
    let i = checkIfFavorited(story)
    if(i > -1){
      currentUser.favorites.splice(i,1)
    }
    else{
      currentUser.favorites.push(story)
    }
})

function returnStoryObject(starStoryID){
  for(let story of storyList.stories){
    if(story.storyId === starStoryID){
      return story;
    }
  }
}

function checkIfFavorited(story){
  for (let i = 0; i < currentUser.favorites.length; i++){
    if (currentUser.favorites[i] === story){
      return i;
    }
  }
  return -1;
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