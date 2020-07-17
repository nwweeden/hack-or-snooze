"use strict";
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

/** Gets list of stories from server, generates their HTML, and puts on page. */
function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  // empty out that part of the page
  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  //for (let story of storyList.stories) {

  for (let i = 0; i < storyList.stories.length; i++){ //loop through all current stories
    let markup = generateStoryMarkup(storyList.stories[i]); //CORRECT

    if(currentUser){
      console.log(currentUser.favorites)
      for (let favorite of currentUser.favorites){
        if (storyList.stories[i].storyId === favorite.storyId){
          console.log(favorite.storyId)
          //let debugVar = $("i")
            $(`#star-${favorite.storyId}`).toggleClass("far fas")
          }
      }
      showStars(); //CORRECT
    }

    $allStoriesList.append(markup);
  }
  $allStoriesList.show();
}

//add toggling on stars and add/remove to favorites
$("#all-stories-list").on("click", "i", function(event){
  $(`#${event.target.id}`).toggleClass("far fa-star story-star").toggleClass("fas fa-star story-star")//this works
    let starStoryId = event.target.id.slice(5); //get story ID from star ID
    //console.log("story id: " + starStoryId)
    // console.log("currentUser.favorites: " + currentUser.favorites)
    let story = returnStoryObject(starStoryId); //make new Story from story ID
    //compare to favorites
    let idx = checkIfFavorited(story) // index of story here or -1
    if(idx > -1){//if found, remove from favorites
      currentUser.removeFavToUserAndAPI(story, idx);
    }
    else{
      currentUser.addFavToUserAndAPI(story)
    }
})

function returnStoryObject(starStoryID){
  for(let story of storyList.stories){
    if(story.storyId === starStoryID){
      return story;
    }
  }
}

/** Checks if a story is in user's favorites.
 * @return {number} index of story if found, -1 if not.
 */
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
  showStars();
  $submitForm.hide();
}

$("#submit-btn").on('click', getStoryInputAndAddStory)

//show stars when user logs in
function showStars(){
  console.debug('showStar');
  $('.story-star').css('display','inline')
}

//when a user clicks on favorites, only show favorited stories
function putFavoritesOnPage(){
  console.debug("onlyShowFavoritedStories");

  // empty out that part of the page
  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of currentUser.favorites) {
    const markup = generateStoryMarkup(story);
    $allStoriesList.append(markup);
  }
  $allStoriesList.show();
}

$navFavorites.on("click", putFavoritesOnPage);