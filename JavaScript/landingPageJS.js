const gameList= document.getElementById("gameList");
const button= document.getElementById("StButton");// address needed to delete button
function getChallenges()
{
    fetch("https://codecyprus.org/th/api/list")
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {
            let treasureHunts = jsonObject.treasureHunts;
            button.remove();
            for (let i = 0; i < treasureHunts.length; i++) {
                let listItem = document.createElement("li");
                let uID = treasureHunts[i].uuid;
                console.log(uID);
                listItem.innerHTML = treasureHunts[i].name;
                gameList.appendChild(listItem);
            }
        });
}
