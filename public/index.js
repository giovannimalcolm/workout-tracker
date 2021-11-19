init();

async function init() {
  //if theres no ID in the link then get the last workout data from the db
  if (location.search.split("=")[1] === undefined) {
    const workout = await API.getLastWorkout();
    //when that workout comes from the getLastWorkout function, 
    ///add the id from the db to the url
    if (workout) {
      //when the workout data comes update the url. 
      //will probably cause a refresh
      location.search = "?id=" + workout._id;
    } else {
      //hide the continue button if theres no workout data at all. 
      //only the "add exercise" button is there
      document.querySelector("#continue-btn").classList.add("d-none")
    }
  }
}

