<h1 align="center"><img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/person-digging.svg" style="background-color: white; border-radius: 25%; height: 50px; margin-right: 15px; padding: 6px; width: 50px;"> Minesweeper</h1>

<h2 align="center">Features<img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/gift.svg" style="background-color: white; border-radius: 25%; height: 20px; margin-left: 15px; padding: 6px; width: 20px;"></h2>

<h3>Themes <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/paintbrush.svg" style="background-color: white; border-radius: 25%; height: 20px; margin-left: 15px; padding: 6px; width: 20px;"></h3>
<p>Themes were implemented in order to provide customization and provide a more preferential feel for the long standing debate on what's better.... dark or light theme?</p>
<p>The initial theme that loads is pulled from the browser and is based on if the user has selected a dark mode for their browser. If they have not, then it defaults to the light theme.</p>
<p>If the user changes the default to the opposite theme, this decision will be marked in the browser storage and will be retained for the next load of the browser when they try to sweep some mines.</p>

<h3>Difficulties <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/stairs.svg" style="background-color: white; border-radius: 25%; height: 20px; margin-left: 15px; padding: 6px; width: 20px;"></h3> 
<p>The game was implemented with three difficulties: easy, medium, and hard.</p>
<p>The decision the user makes on their difficulty is stored in the browser and the game will load up with the last played difficulty. If the user has not played the game, it will default to easy</p>

<h3>High Scores <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/ranking-star.svg" style="background-color: white; border-radius: 25%; height: 20px; margin-left: 15px; padding: 6px; width: 20px;"></h3>
<p>High scores for easy, medium, and hard are all tracked based on the time that the player took to clear the minefield. If the user improves their time, a new record for that difficulty will be stored.</p>
<p>Win counts are also tracked and will show on the start screen for the game to represent the victories that the player has achieved.</p>
<p>All high scores and win counts are stored in the browser to retain the player's scores until the data is cleared.</p>
