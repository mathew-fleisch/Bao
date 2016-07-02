
$(document).on("click", ".bin", function() {
	var tclass = $(this).attr("class");
	var player = Number(tclass.replace(/^.*ply_(\d*).*/, "$1"));
	var pos    = Number(tclass.replace(/^.*p_(\d*).*/, "$1"))	;
	var beans  = $((tclass.replace(/^/, '.').replace(/\s+/g, "."))+" > .bean").length;
	var position = { "player":player,"pos":pos,"beans":beans,"target":tclass.replace(/^/, '.').replace(/\s+/g, ".") };
	move(position);
});
function move(position){
	console.log("Position:",position);
	if(is_valid_move(position, true)) { 
		// console.log("beans:"+position.beans);
		$(position.target+" > .bean").remove();
		var i = 0;
		move_bean(i, position);
		// for(var i = 1; i <= position.beans; i++) { 
		// 	var new_pos = ((position.pos+i) > 16 ? (position.pos-16+i) : (position.pos+i));
		// 	var new_target = position.target.replace(/p_.*/, "p_"+new_pos);
		// 	$(new_target).append('<div class="bean">&nbsp;</div>');
		// 	var new_position = { 
		// 		"player":position.player,
		// 		"pos":(position.pos+i),
		// 		"beans":$(new_target+" > .bean").length,
		// 		"target":new_target
		// 	};

		// 	if(i == position.beans) {
		// 		var final_bin = $(new_target+" > .bean").length;
		// 		console.log("Final Bin: "+final_bin);
		// 		// console.log(new_position);
		// 		// console.log("Next -> "+is_valid_move(new_position));
		// 		// console.log("$(\""+new_target+"\").click();");
		// 		if(is_valid_move(new_position)) { $(new_target).click(); }
		// 	}
		// }
	}
}
function move_bean(i, position) {
	var track = i;
	setTimeout(function() {
		i++;
		console.log("move_bean(track:"+track+",i:"+i+",position:",position);
		if(i <= position.beans) {
			var new_pos = ((position.pos+1) > 16 ? (position.pos-16+1) : (position.pos+1));
			var new_target = position.target.replace(/p_.*/, "p_"+new_pos);
			$(new_target).append('<div class="bean">&nbsp;</div>');
			var new_position = { 
				"player":position.player,
				"pos":(position.pos+1),
				"beans":$(new_target+" > .bean").length,
				"target":new_target
			};
			console.log("Target: "+new_target);
			console.log($(new_target).html());
			console.log("Beans: "+$(new_target+" > .bean").length);

			if((i) == position.beans) {
				var final_bin = $(new_target+" > .bean").length;
				console.log("Final Bin: "+final_bin);
				// console.log(new_position);
				// console.log("Next -> "+is_valid_move(new_position));
				// console.log("$(\""+new_target+"\").click();");
				// if(is_valid_move(new_position)) { $(new_target).click(); }
				// move(new_position);
				if(is_valid_move(position, true)) { move(position); }

			}
			if(is_valid_move(new_position, false)) { move_bean((i), new_position); }
		}
	}, 1000);
}
function is_valid_move(position, last_move=false) {
	console.log("is_valid_move()",position);
	if(position.pos == bank && last_move ) {
		console.log("False");
		// cramp(position);
		return false;
	}
	console.log($(position.target+" > .bean").length);
	if($(position.target+" > .bean").length > 1 || !last_move) { 
		console.log("True");
		return true;
	} else { 
		console.log("False");
		// cramp(position);
		return false;
	}
}
function cramp(position) { 
	console.log("cramp()",position);
}