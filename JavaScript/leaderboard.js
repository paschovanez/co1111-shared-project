const TH_API_URL = "https://codecyprus.org/th/api/"; // the API base url
/**
 * This is a function to access the /leaderboard at the specified URL
 */
function getLeaderBoard(url) {
// create and invoke the http request
    fetch(url, { method: "GET" })
        .then(response => response.json())
        .then(json => handleLeaderboard(json));
}
// for now, hardcoded
let treasureHuntId= getCookie('session');
let url = "https://codecyprus.org/th/api/leaderboard?sorted&session=" + treasureHuntId + "&limit=20"; // form url
getLeaderBoard(url);

function handleLeaderboard(leaderboard) {
    console.log(leaderboard);
    let options = { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
        second: '2-digit' };
    let html = ""; // used to include HTML code for the table rows
    let leaderboardArray = leaderboard['leaderboard'];
    for(const entry of leaderboardArray) {
        let date = new Date(entry['completionTime']);
        let formattedDate = date.toLocaleDateString("en-UK", options);
        html += "<tr>" +
            "<td>" + "<p>" + entry['player'] + "</p>" + "</td>" +
            "<td style='text-align: center'>" + "<p>" + entry['score'] + "</p>" + "</td>" +
            "<td>" + "<p>" + formattedDate + "</p>" + "</td>" +
            "</tr>";
    }
    let leaderboardElement = document.getElementById('resultsTable'); // table
    leaderboardElement.innerHTML += html;// append generated HTML to existing
    document.getElementById('loading').style.display='none';
}

function refreshTable()
{
    window.location.reload();
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