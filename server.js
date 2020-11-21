const express = require('express')
const path = require('path')
const urllib = require('urllib')
const app = express()



app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

const teamToIDs = {
	"lakers": "1610612747",
	"warriors": "1610612744",
	"heat": "1610612748",
	"suns": "1610612756"
}

let playersData = []

app.get("/teams/:teamName", function(req, res){
	urllib.request('http://data.nba.net/10s/prod/v1/2018/players.json', function(err, response){
		playersData = JSON.parse(response.toString()).league.standard
	})
		
	const TeamName = req.params.teamName	

	let relevantPlayerData = playersData.filter(function(playerData){
		return playerData.teamId === teamToIDs[TeamName] && playerData.isActive
	})

	let playerData = relevantPlayerData.map(playerD => {
		let player = {}
		player.firstName = playerD.firstName,
		player.lastName = playerD.lastName,
        player.jersey = playerD.jersey,
        player.pos = playerD.pos
		return player
	})
	
	res.send(playerData)
})
	
	



// 	const playerData = relevantPlayerData.map(playerD => {
// 		const player = {}
// 			player.firstName = playerD.firstName
// 		//return player
// 	}) 
// 	res.send(playerData.player)
// 	// firstName: relevantPlayerData.firstName,
// 	// allTeamPlayers.push(playerData)
// 	// res.send(allTeamPlayers)



// 	// for(let playerData of playersData){
// 	// 	if((playerData.teamId === teamToIDs[TeamName]) && (playerData.isActive)){
// 	// 		const player = {
// 	// 			firstName: playerData.firstName,
//     //             lastName: playerData.lastName,
//     //             jersey: playerData.jersey,
//     //             pos: playerData.pos
// 	// 		}
// 	// 		allTeamPlayers.push(player)
// 	// 		//res.send(player)
// 	// 	}
// 	// }
// 	// //allTeamPlayers = players
// 	// res.send(allTeamPlayers)
// 	// //res.send(players)


const port = 3000

app.listen(port, function(){
    console.log(`Running server on port ${port}`)
})