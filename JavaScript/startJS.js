const question = document.getElementById('question');
const answer = document.getElementById('answer');
const message = document.getElementById('message');
const scoreDir = document.getElementById('score');
const skipDir = document.getElementById('skip');

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
const session = getCookie('session')
function getQuestion()
{
    fetch("https://codecyprus.org/th/api/question?session=" + session)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {
            console.log(session);
            question.innerHTML = jsonObject.questionText;
            if (jsonObject.canBeSkipped==true)
            {
                skipDir.style.display='inline-block;';
            }
            else if (jsonObject.canBeSkipped==false)
            {
                skipDir.style.display='none';
            }
            updateScore();
        });
}

getQuestion();

function answerF()
{
    let ansValue = answer.value;
    let score = parseInt(getCookie('score'));
    fetch("https://codecyprus.org/th/api/answer?session="+session+ "&answer=" +ansValue)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject =>
        {
            console.log(jsonObject);
            if (jsonObject.status=='OK')
            {
                if (jsonObject.correct==true)
                {
                    updateScore();
                    message.innerText="Correct";
                    getQuestion();
                }
                else
                {
                    updateScore();
                    message.innerText="Incorrect";

                }
            }
            else
            {
                message.innerText=jsonObject.errorMessages;
            }

        });
}

function setCookie(cookieName, cookieValue, expireDays) {
    let date = new Date();
    date.setTime(date.getTime() + (expireDays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=start.html";
}
function updateScore()
{
    let score = 0;
    fetch("https://codecyprus.org/th/api/score?session="+session)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject =>
        {
            score = parseInt(jsonObject.score);

        });
    scoreDir.innerHTML="Score: " + score;
}

function skip()
{
    fetch("https://codecyprus.org/th/api/skip?session="+session)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject =>
        {
            updateScore()
            message.innerText=jsonObject.message;
            getQuestion();
        });
}

function getLocation()
{
    if (navigator.geolocation)
    {
        //TODO - Geolocation is supported by browser.
        navigator.geolocation.getCurrentPosition(sendPos);
    }
    else
        {
        alert("Geolocation is not supported by your browser.");
    }
}


//SetInterval(getLocation, 35000);
function sendPos(position) {

    fetch("https://codecyprus.org/th/api/location?session=ag9nfmNvZGVjeXBydXNvcmdyFAsSB1Nlc3Npb24YgICAoMa0gQoM&latitude="+position.coords.latitude+  "&longitude=" + position.coords.longitude)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject =>
        {
            console.log(jsonObject.status);
        });

}


