
$(document).on("click", ".bin", function() {
	var tclass = $(this).attr("class");
	var player = Number(tclass.replace(/^.*ply_(\d*).*/, "$1"));
	var pos    = Number(tclass.replace(/^.*p_(\d*).*/, "$1"));
	var col    = Number(tclass.replace(/^.*c_(\d*).*/, "$1"));
	var beans  = $((tclass.replace(/^/, '.').replace(/\s+/g, "."))+" > .bean").length;
	var position = { "player":player,"pos":pos,"beans":beans,"col":col,"target":tclass.replace(/^/, '.').replace(/\s+/g, ".") };
	move(position);
});
function move(position){
	console.log("Position: ("+position.pos+")",position);
	if(position.pos > 16) { position.pos = position.pos - 16; }
	if(is_valid_move(position, true) && position.pos !== bank) { 
		// console.log("beans:"+position.beans);
		var beans = $(position.target+" > .bean").length;
		$(position.target+" > .bean").remove();
		var i = 0;
		move_bean(i, beans, position);
	}
}
function move_bean(i, beans, position) {
	// alert("move_bean");
	var track = i;
	var speed = 300;
	setTimeout(function() {
		i++;
		console.log("move_bean(track:"+track+",i:"+i+",beans:"+beans+",position:",position);
		if(i <= beans) {
			var new_pos = ((position.pos+1) > 16 ? (position.pos-16+1) : (position.pos+1));
			var new_target = position.target.replace(/p_.*/, "p_"+new_pos).replace(/\s*\.c_(\d*)/g, '');
			$(new_target).append('<div class="bean">&nbsp;</div>');
			var new_position = { 
				"player":position.player,
				"pos":(position.pos+1),
				"beans":beans,
				"col":((position.col+1) > 16 ? 1 : (position.col+1)),
				"target":new_target
			};
			console.log("Target: "+new_target);
			console.log($(new_target).html());
			console.log("Beans: "+beans);

			if(is_valid_move(new_position, false)) { move_bean(i, beans, new_position); }
		} else { 
				var final_bin = $(new_target+" > .bean").length;
				console.log("Final Bin: "+final_bin);
				if(is_valid_move(position, true)) { move(position); }
		}
	}, speed);
}
function is_valid_move(position, last_move=false) {
	console.log("is_valid_move()",position);
	if(position.pos == bank && last_move ) {
		console.log("False");
		cramp(position);
		return false;
	}
	console.log($(position.target+" > .bean").length);
	if($(position.target+" > .bean").length > 1 || !last_move) { 
		console.log("True");
		return true;
	} else { 
		console.log("False");
		cramp(position);
		return false;
	}
}
function cramp(position) { 
	console.log("cramp()",position);
	if(position.player === 1) { var enemy = 2; } else { var enemy = 1; }
	var col     = ((position.col) > 16 ? (position.col-16) : (position.col));
	var cramper = ((9-position.pos) === 4 ? 13 : (9-position.pos));
	var target  = position.target.replace(/ply_(\d*)/, "ply_"+enemy).replace(/p_(\d*)/, "c_"+col);
	var crampped_beans = $(target+" > .bean").length;
	console.log("can cramp? "+$(".r_"+enemy+" "+target+" > .bean").length);
	if($(".r_"+enemy+" "+target+" > .bean").length > 0) { 
		console.log("Cramp: "+target+"  -> "+crampped_beans);
		$(target+" > .bean").remove();
		move_bean(0, crampped_beans, position);
	} else { 
		return false;
	}
}