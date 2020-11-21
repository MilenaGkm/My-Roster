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
		if ( response !== undefined) {
			playersData = JSON.parse(response.toString()).league.standard
		}
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
	
	
const port = 3000

app.listen(port, function(){
    console.log(`Running server on port ${port}`)
})