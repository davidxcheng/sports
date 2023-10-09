"use strict";

window.addEventListener("load", async () => {
  var response = await fetch('data/games-played.jsonc');
  var data = await response.json();

  console.log("games played", data)
  var standings = calculateStandings(data);

  render(standings);
});

// Returnera en array sorterad på poäng (fallande)
// Varje item i arrayen motsvarar en rad i serietabellen
function calculateStandings(gamesPlayed) {
  var teams = new Array(16);

  for (const match of gamesPlayed) {
    if (match.matchday == 1) {
      teams[match.home.team.id] = {
        teamName: match.home.team.name,
        matchesPlayed: 0,
        won: 0,
        draws: 0,
        lost: 0,
        points: 0
        }
      teams[match.away.team.id] = {
        teamName: match.away.team.name,
        matchesPlayed: 0,
        won: 0,
        draws: 0,
        lost: 0,
        points: 0
        }
    }
  }

  for (const match of gamesPlayed) {
    var result = "unknown";
    teams[match.home.team.id].matchesPlayed += 1
    teams[match.away.team.id].matchesPlayed += 1
    if (match.home.goals > match.away.goals) {
      result = '1';
      teams[match.home.team.id].points += 3
      teams[match.home.team.id].won += 1
      teams[match.away.team.id].lost += 1
    } 
    if (match.home.goals < match.away.goals) {
      result = '2';
      teams[match.away.team.id].points += 3
      teams[match.home.team.id].lost += 1
      teams[match.away.team.id].won += 1
    }
    if (match.home.goals == match.away.goals) {
      result = 'X';
      teams[match.home.team.id].points += 1
      teams[match.away.team.id].points += 1
      teams[match.home.team.id].draws += 1
      teams[match.away.team.id].draws += 1
    }
  }

return teams;
}

function render(standings) {
  var elOutput = document.getElementById("output");
  var markup = "";

  // Sortera standings efter poäng i fallande ordning
  standings.sort((a, b) => b.points - a.points);

  for (const row of standings) {
    console.log(row.teamName);
    markup += `  <tr>
      <td>${row.teamName}</td>
      <td>${row.matchesPlayed}</td>
      <td>${row.won}</td>
      <td>${row.draws}</td>
      <td>${row.lost}</td>
      <td>${row.points}</td>
    </tr>`;
  }
  
  elOutput.innerHTML = markup;
}


// Tar emot en sorterad array som representerar serietabellen
