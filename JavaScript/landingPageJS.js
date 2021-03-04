const gameList= document.getElementById("GameChoice");
const button= document.getElementById("StButton");// address needed to delete button
const nameForm= document.getElementById("nameForm");
const Fname = document.getElementById("Fname");
const Sname = document.getElementById("Sname");
const chooseGame = document.getElementById("ChooseGame");// address of the h3 element with "Choose your game: content

function getName()
{
    button.remove();
    nameForm.style.display="block";
    chooseGame.style.display = 'block';
    fetch("https://codecyprus.org/th/api/list")
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {
            let treasureHunts = jsonObject.treasureHunts;
            for (let i = 0; i < treasureHunts.length; i++) {
                let listItem = document.createElement("input");
                listItem.type="radio";
                listItem.name="Game"
                listItem.id=i.toString();
                let uID = treasureHunts[i].uuid;
                listItem.value=uID;
                let label = document.createElement("label");
                label.appendChild(listItem);

                label.innerHTML+=treasureHunts[i].name + "<br>";

                label.for=i.toString();
                console.log(uID);


                gameList.appendChild(label);


            }
        });
    document.getElementById("showGames").remove();





}

function startGame()
{
    if (document.getElementById(1).checked == false)
    {
        document.getElementById(0).checked = true;
    }
    let fullName = Fname.value + Sname.value;
    const buttons = document.querySelectorAll('input[name="Game"]');
    console.log(fullName);
    let Value;
    for (const button of buttons)
    {
        if (button.checked)
        {
            Value = button.value;
            break;
        }
    }
    console.log(Value);
    let startLink = "https://codecyprus.org/th/api/start?player=" + fullName + "&app=TSAApp&treasure-hunt-id=" + Value;
    console.log(startLink);
    fetch(startLink)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {
            let status = jsonObject.status;
            if (status=="ERROR")
            {
                document.getElementById("errorMessage").innerHTML=jsonObject.errorMessages;
            }
            else if (status=="OK")
            {
                let session = jsonObject.session;
                let numOfQuestions = jsonObject.numOfQuestions;
                setCookie("session", session, 30);
                setCookie("score", 0, 30);
                setCookie("numberOfQuestions", numOfQuestions, 30);
                window.location.href = 'start.html'
            }
            });


}

function resume()
{
    window.location.href = 'start.html'

}

function setCookie(cookieName, cookieValue, expireDays) {
    let date = new Date();
    date.setTime(date.getTime() + (expireDays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=start.html";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


