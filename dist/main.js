

class RenderData {
	
	renderTeam(data){
		const source = $("#team-template").html();
		const template = Handlebars.compile(source);
		const newHTML = template(data);
		$('.team-container').append(newHTML);
		console.log(data);
	}
}


class FetchData {
	constructor() {
		this.data = {}
	}

	getTeam() {
		let input = $("#team-input").val()

		$.get(`teams/${input}`,function(playerData) {
			console.log(this.data);
			this.data = playerData
			console.log(this.data);
		})
		console.log(this.data);
		
	}
}


const getData = new FetchData()
const displayData = new RenderData()

const fetchTeamBtn = function(){

	getData.getTeam()
	console.log(getData.data);
	displayData.renderTeam(getData.data)

}





// const fetchTeamBtn= function(){
// 	let input = $("#team-input").val()

// 	$.get(`teams/${input}`, function(res){
// 		$("body").append(`<p>${res.pos}</p>`)
// 	})
// }
	



// const fetchTeamBtn= function(){
// 	let input = $("#team-input").val()

// 	$.get(`teams/${input}`, function(){
// 		let renderTeam = function(playerData){
// 		const source = $("#team-template").html();
// 		const template = Handlebars.compile(source);
// 		let newHTML = template(playerData.player);
// 		$('.team-container').append(newHTML);
// 		}
// 		return renderTeam
// 	})
// }

