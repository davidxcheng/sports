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
  // Skapa en variabel för serietabellen

  // Loopa över gamesPlayed
    // För varje match, räkna ut poäng för vardera lag..
    // ..och uppdatera serietabellen

  // Sortera serietabellen efter poäng (vi bryr oss inte om målskillnad)

  return [
    {
      teamName: "AIK",
      matchesPlayed: 2,
      won: 1,
      draws: 0,
      lost: 1,
      points: 3
    }
  ];
}

// Tar emot en sorterad array som representerar serietabellen
function render(standings) {
  console.log("standings", standings)
}