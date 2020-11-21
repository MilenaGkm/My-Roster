

class RenderData {
	
	renderTeam(data){
		const source = $("#team-template").html();
		const template = Handlebars.compile(source);
		const newHTML = template({data});
		$('.team-container').append(newHTML);

	}
}
const displayData = new RenderData()



const fetchTeamBtn = function(){
	let input = $("#team-input").val()
	
	$.get(`teams/${input}`,function(playerData) {
		displayData.renderTeam(playerData)
	})
}

