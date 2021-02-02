const gameList= document.getElementById("gameList");
const button= document.getElementById("StButton");// address needed to delete button
const chooseGame = document.getElementById("ChooseGame");// address of the h3 element with "Choose your game: content
function getChallenges()
{
    button.remove();
    chooseGame.style.display = 'block';
    fetch("https://codecyprus.org/th/api/list")
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {
            let treasureHunts = jsonObject.treasureHunts;
            for (let i = 0; i < treasureHunts.length; i++) {
                let listItem = document.createElement("li");
                let uID = treasureHunts[i].uuid;
                console.log(uID);
                let startLink = "https://codecyprus.org/th/api/start?player=...&app=TSAApp&treasure-hunt-id=" + uID; // Name needed
                listItem.innerHTML = "<a href=" + startLink + ">" + treasureHunts[i].name + "</a>";
                gameList.appendChild(listItem);
            }
        });
}
