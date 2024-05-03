// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = "YOUR COHORT NAME HERE";
const API_URL = "https://fsa-puppy-bowl.herokuapp.com/api/2404-ftb-et-web-ft/players";
const wrapper = document.getElementById("wrapper");

/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */


//control to wait for the data from API then save it 
const fetchAllPlayers = async () => {
  try {
    // TODO
    const response = await fetch(API_URL);
    const result =  await response.json();
    const allPlayers = result.data.players;
    return allPlayers;

    
   
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};



// /**
//  * Fetches a single player from the API.
//  * @param {number} playerId
//  * @returns {Object} the player object
//  */
const fetchSinglePlayer = async (playerId) => {
  try {
    // TODO
    const singleUrl = `${API_URL}/${playerId}`;
    const response = await fetch(singleUrl);
    return await response.json();
 

  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};
console.log(fetchSinglePlayer(5101));

// /**
//  * Adds a new player to the roster via the API.
//  * @param {Object} playerObj the player to add
//  * @returns {Object} the player returned by the API
//  */
/**
 * Adds a new player to the roster via the API.
 * @param {Object} playerObj the player to add
 * @returns {Promise<Object>} the player returned by the API
 */


const addNewPlayer = async (playerObj) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playerObj)
        });
    } catch (error) {
        console.error("Error adding new player:", error);
    }
};
 
// console.log(addNewPlayer(playerObj));
// /**
//  * Removes a player from the roster via the API.
//  * @param {number} playerId the ID of the player to remove
//  */
const playerId =5113;
const removePlayer = async (playerId) => {
  try {
    const response = await fetch(`${API_URL}/${playerId}`,{

     method:"DELETE"
    }
  )
  return await response.json();

    // TODO
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};




const renderAllPlayers = () => {
  // TODO

  fetchAllPlayers().then((allPlayers)=>{
 allPlayers.forEach((player)=>{
 renderSinglePlayer(player)
  
 })
})

};

// // /**
// //  * Updates `<main>` to display a single player.
// //  * The player is displayed in a card with the following information:
// //  * - name
// //  * - id
// //  * - breed
// //  * - image (with alt text of the player's name)
// //  * - team name, if the player has one, or "Unassigned"
// //  *
// //  * The card also contains a "Back to all players" button that, when clicked,
// //  * will call `renderAllPlayers` to re-render the full list of players.
// //  * @param {Object} player an object representing a single player
// //  */
const renderSinglePlayer = (player) => {
  // TODO
  
   const ele = document.createElement("div");
   const playerEle = document.createElement("h3");
   const imgEle = document.createElement("img");
   imgEle.setAttribute("src", player.imageUrl);
   imgEle.setAttribute("alt", player.name);
   playerEle.innerHTML=player.name;
   ele.appendChild(playerEle);
   ele.appendChild(imgEle);
   wrapper.appendChild(ele);
  };


// // /**
// //  * Fills in `<form id="new-player-form">` with the appropriate inputs and a submit button.
// //  * When the form is submitted, it should call `addNewPlayer`, fetch all players,
// //  * and then render all players to the DOM.
// //  */
const renderNewPlayerForm = () => {
  
      // Attach an event listener to the submit button
      document.getElementById("submit").addEventListener("click", async (event) => {
          event.preventDefault(); // Prevent the default form submission behavior

          // Collecting form data
          const formId = document.getElementById("id").value;
          const formName = document.getElementById("name").value;
          const formBreed = document.getElementById("breed").value;
          const formStatus = document.getElementById("status").value;
          const formImage = document.getElementById("imageUrl").value;
          const formCreate = document.getElementById("createdAt").value;
          const formUpdate = document.getElementById("updatedAt").value;
          const formTeamId = document.getElementById("teamId").value;
          const formCohortId = document.getElementById("cohortId").value;

          // Creating a player object from the form data
          const playerObj = {
              id: formId,
              name: formName,
              breed: formBreed,
              status: formStatus,
              imageUrl: formImage,
              createdAt: formCreate,
              updatedAt: formUpdate,
              teamId: formTeamId,
              cohortId: formCohortId
          };
          

          




  })

};

// Ensure this function is called when the document is fully loaded, or the script is placed at the end of the body.


// // /**
// //  * Initializes the app by fetching all players and rendering them to the DOM.
// //  */
const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);

  renderNewPlayerForm();
};

// // // This script will be run using Node when testing, so here we're doing a quick
// // // check to see if we're in Node or the browser, and exporting the functions
// // // we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    addNewPlayer,
    removePlayer,
    renderAllPlayers,
    renderSinglePlayer,
    renderNewPlayerForm,
  };
} else {
  init();
}
