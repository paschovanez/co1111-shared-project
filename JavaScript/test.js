const cookiesField = document.getElementById('testCookies');
const cookiesTable = document.getElementById('cookiesTable');
let testPairs = [
    { name: 'firstCookie', expected: 67 },
    { name: 'secondCookie', expected: 'smth' },
    { name: 'thirdCookie', expected: 89.1 },
    { name: 'fourthCookie', expected: 'another' },
    { name: 'fifthCookie', expected: 0}
];

function testCookies()
{
    for (i in testPairs)
    {
        setCookie(testPairs[i].name, testPairs[i].expected, 1);
        if (testPairs[i].expected==getCookie(testPairs[i].name))
        {
            cookiesTable.innerHTML+='<tr> <td>' +testPairs[i].expected + '</td> <td>' + getCookie(testPairs[i].name) + '</td> <td>Passed</td> </tr>';
        }
        else
        {
            cookiesTable.innerHTML+='<tr> <td>' +testPairs[i].expected + '</td> <td>' + getCookie(testPairs[i].name) + '</td> <td>Not Passed</td> </tr>';
        }
    }
}
function showQuestion()
{
    setCookie('p1', document.getElementById('question-type').value, 0.1);
    setCookie('p2', document.getElementById('can-be-skipped').value, 0.1);
    setCookie('p3', document.getElementById('requires-location').value, 0.1);
    window.location.href='unitTest.html';
}



function setCookie(cookieName, cookieValue, expireDays) {
    let date = new Date();
    date.setTime(date.getTime() + (expireDays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=start.html";
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
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