const question = document.getElementById('question');

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
fetch("https://codecyprus.org/th/api/question?session="+session)
    .then(response => response.json()) //Parse JSON text to JavaScript object
    .then(jsonObject =>
    {
        console.log(session);
        question.innerHTML=jsonObject.questionText;
    });
