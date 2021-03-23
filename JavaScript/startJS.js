const question = document.getElementById('question');
var answer;
const messageDir = document.getElementById('message');
const scoreDir = document.getElementById('score');
const skipDir = document.getElementById('skip');
const skipWindow = document.getElementById('skipConf');
const infoWindow = document.getElementById('Info');
var cameraNumber=0;

function getCookie(cname) {   // code from the https://www.w3schools.com
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
    hideAll();
    fetch("https://codecyprus.org/th/api/question?session=" + session)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {
            console.log(session);
            if (jsonObject.questionType === "INTEGER" || jsonObject.questionType === "NUMERIC" )
            {
                document.getElementById("answerNum").style.display='inline-block';
                answer = document.getElementById("answerNum");
            }
            else if (jsonObject.questionType === "BOOLEAN")
            {
                document.getElementById("bool").style.display='inline-block';
                answer = document.getElementById("bool");
            }
            else if (jsonObject.questionType === "MCQ")
            {
                document.getElementById("multChoice").style.display='inline-block';
                answer = document.getElementById("multChoice");
            }
            else if (jsonObject.questionType === "TEXT")
            {
                document.getElementById("answerText").style.display='inline-block';
                answer = document.getElementById("answerText");
            }


            question.innerHTML = jsonObject.questionText;
            if (jsonObject.canBeSkipped===true)
            {
                skipDir.style.display='inline-block';
            }
            else if (jsonObject.canBeSkipped===false)
            {
                skipDir.style.display='none';
            }
            if (jsonObject.completed===true)
            {
                window.location.href = 'leaderboard.html'
            }
            document.getElementById('questionNum').innerHTML="Question: " + (parseInt(jsonObject.currentQuestionIndex) + 1) +"/" + jsonObject.numOfQuestions;
            updateScore();
            document.getElementById('corrPoints').innerText=jsonObject.correctScore;
            document.getElementById('incorrPoints').innerText=jsonObject.wrongScore;
            document.getElementById('skipPoints').innerText=jsonObject.skipScore;
        });
}

getQuestion();

function answerF()
{
    console.log(answer);
    let ansValue;
    let buttons;
    if (answer.id==="answerText" || answer.id==="answerNum")
    {
        ansValue = answer.value;
    }
    else
    {
        if (answer.id==="multChoice")
        {
            buttons = document.querySelectorAll('input[name="MCQ"]');
        }
        else if (answer.id==="bool")
        {
            buttons = document.querySelectorAll('input[name="bool"]');
        }

        for (const button of buttons)
        {
            if (button.checked)
            {
                ansValue = button.value;
                break;
            }
        }

    }
    getLocation();
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
                    messageDir.innerText=jsonObject.message;
                    getQuestion();

                }
                else
                {
                    updateScore();
                    messageDir.innerText=jsonObject.message;

                }
            }
            else
            {
                messageDir.innerText=jsonObject.errorMessages;
            }

        });
}

function setCookie(cookieName, cookieValue, expireDays) { // code from the https://www.w3schools.com
    let date = new Date();
    date.setTime(date.getTime() + (expireDays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=start.html";
}
function updateScore()
{
    let score;
    fetch("https://codecyprus.org/th/api/score?session="+session)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject =>
        {
            console.log(jsonObject);
            score = jsonObject.score;
            scoreDir.innerHTML="Score: " + score;

        });

}
function openInfo()
{
    infoWindow.style.display='block';
}
function closeInfo()
{
    infoWindow.style.display='none';
}

function skip()
{
    skipWindow.style.display='block';
}
function  closeSkip()
{
    skipWindow.style.display='none';
}

function skipS()
{
    closeSkip();
    fetch("https://codecyprus.org/th/api/skip?session="+session)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject =>
        {

            updateScore()
            messageDir.innerText=jsonObject.message;
            getQuestion();
        });
}

function getLocation()
{
    if (navigator.geolocation)
    {

        navigator.geolocation.getCurrentPosition(sendPos);
    }
    else
        {
        alert("Geolocation is not supported by your browser.");
    }
}


let interval = setInterval(getLocation, 45000);

function sendPos(position) {

    fetch("https://codecyprus.org/th/api/location?session=" + getCookie('session') +"&latitude="+position.coords.latitude+  "&longitude=" + position.coords.longitude)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject =>
        {
            console.log(jsonObject);
            console.log(jsonObject.status);
        });

}

function hideAll()
{
    document.getElementById("answerNum").style.display='none';
    document.getElementById("answerNum").value=0;

    document.getElementById("answerText").style.display='none';
    document.getElementById("answerText").value='';

    document.getElementById("bool").style.display='none';
    document.getElementById("multChoice").style.display='none';

    let buttons;
    buttons = document.querySelectorAll('input[type="radio"]');

    for (const button of buttons)
    {
        button.checked=false;
    }
}



var opts = {
    // Whether to scan continuously for QR codes. If false, use scanner.scan() to
    // manually scan. If true, the scanner emits the "scan" event when a QR code is
    // scanned. Default true.
    continuous: true,
    // The HTML element to use for the camera's video preview. Must be a <video>
    // element. When the camera is active, this element will have the "active" CSS
    // class, otherwise, it will have the "inactive" class. By default, an invisible
    // element will be created to host the video.
    video: document.getElementById('preview'),
    // Whether to horizontally mirror the video preview. This is helpful when trying to
    // scan a QR code with a user-facing camera. Default true.
    mirror: false,
    // Whether to include the scanned image data as part of the scan result. See the
    // "scan" event for image format details. Default false.
    captureImage: false,
    // Only applies to continuous mode. Whether to actively scan when the tab is not
    // active.
    // When false, this reduces CPU usage when the tab is not active. Default true.
    backgroundScan: true,
    // Only applies to continuous mode. The period, in milliseconds, before the same QR
    // code will be recognized in succession. Default 5000 (5 seconds).
    refractoryPeriod: 5000,
    // Only applies to continuous mode. The period, in rendered frames, between scans. A
    // lower scan period increases CPU usage but makes scan response faster.
    // Default 1 (i.e. analyze every frame).
    scanPeriod: 1
};

var scanner = new Instascan.Scanner(opts);

function OpenCamera()
{
    Instascan.Camera.getCameras().then(function (cameras)
    {
        if (cameras.length > 0) {
            scanner.start(cameras[cameraNumber]);
            document.getElementById('preview').hidden=false;

        } else {
            console.error('No cameras found.');
            alert("No cameras found.");
        }
        alert(cameras.length);
    }).catch(function (e) {
        console.error(e);
        alert("No cameras found.");
    });
}

function NextCamera()
{
    Instascan.Camera.getCameras().then(function (cameras)
    {
        if (cameraNumber<cameras.length)
        {
            cameraNumber+=1;
        }
        else
        {
           cameraNumber=0;
        }
        OpenCamera();
    })
}
function StopCamera()
{
    scanner.stop();
    document.getElementById('preview').hidden=true;
}





scanner.addListener('scan', function (content) {
    console.log(content);
    document.getElementById("content").innerHTML = "Hint: " + content;
})




