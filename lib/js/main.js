const usernameElement = document.getElementById("username");
const messageElement = document.getElementById("message");
const button = document.getElementById("submitButton");
const allMessages = document.getElementsByClassName("allMessages")[0];
// const allMessages = document.querySelector(".allMessages");
button.addEventListener("click", updateDB);

//Set database object here
const db = firebase.database().ref("message");
console.log(db);

/**
 * Updates the database with the username and message.
 */
function updateDB(event) {
  event.preventDefault();
  const username = usernameElement.value;
  const message = messageElement.value;

  usernameElement.value = "";
  messageElement.value = "";

  console.log(username + " : " + message);

  //Update database here
  const value = {
    username: username,
    message: message
  };
  db.push(value);
}

// Set database "child_added" event listener here
db.on("child_added", function(dataRow) {
  const value = dataRow.val();
  const p = document.createElement("p");
  p.innerText = `${value.username}: ${value.message}`;
  allMessages.appendChild(p);
});
