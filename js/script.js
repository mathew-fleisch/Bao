speed = 200;
orig_speed = speed;
var loop;
$(document).on("click", "#stop-btn", function() { clearTimeout(loop); return false; });
$(document).on("change", "#speed", function() { speed = $("#speed").val(); });
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
	loop = setTimeout(function() {
		i++;
		console.log("move_bean(track:"+track+",i:"+i+",beans:"+beans+",position:",position);
		if(i <= beans) {
			var new_pos = ((position.pos+1) > 16 ? (position.pos-15) : (position.pos+1));
			var new_target = position.target.replace(/p_.*/, "p_"+new_pos).replace(/\s*\.c_(\d*)/g, '');
			$(new_target).append('<div class="bean">&nbsp;</div>');
			var new_position = { 
				"player":position.player,
				"pos":(new_pos),
				"beans":beans,
				"col":((position.col+1) > 16 ? 1 : (position.col+1)),
				"target":new_target
			};
			// console.log("Target: "+new_target);
			// console.log($(new_target).html());
			// console.log("Beans: "+beans);

			if(is_valid_move(new_position, false)) { move_bean(i, beans, new_position); }
		} else { 
				var final_bin = $(new_target+" > .bean").length;
				// console.log("Final Bin: "+final_bin);
				if(is_valid_move(position, true)) { move(position); }
		}
		update_stats(position.player, (beans-track));
	}, speed);
}
function update_stats(player, beans) {
	//Update bank stats
	var ply1_bank = $(".r_1 .c_4 > .bean").length;
	var ply2_bank = $(".r_2 .c_3 > .bean").length;
	$("#ply1_bank").val(ply1_bank);
	$("#ply2_bank").val(ply2_bank);

	//Update in-hand stats
	$("#beans_inhand").val(beans);
}
function is_valid_move(position, last_move=false) {
	// console.log("is_valid_move()");
	// console.log("is_valid_move()",position);
	if(position.pos == bank && last_move ) {
		// console.log("False");
		cramp(position);
		return false;
	}
	console.log($(position.target+" > .bean").length);
	if($(position.target+" > .bean").length > 1 || !last_move) { 
		// console.log("True");
		return true;
	} else { 
		// console.log("False");
		cramp(position);
		return false;
	}
}
function cramp(position) { 
	console.log("cramp()",position);
	// set_speed(2000);
	if(position.player === 1) { var enemy = 2; 	} else { var enemy = 1; }
	var col = ((position.pos) > 16 ? (position.pos-16) : (position.pos));
	var crnt_pos = position.target.replace(/^.*p_(\d*).*$/, "$1");
	// console.log("Crnt: "+crnt_pos);
	if(crnt_pos === "5") { 
		// console.log("Crnt: "+crnt_pos);
		var target = position.target.replace(/ply_(\d*)/, "ply_"+enemy).replace(/p_(\d*)/, "p_13").replace(/\.c_(\d*)/, ""); 
	} else {
		var target  = position.target.replace(/ply_(\d*)/, "ply_"+enemy).replace(/p_(\d*)/, "p_"+(9-crnt_pos));
		col         = $(target).attr("class").replace(/^.*c_(\d*).*$/, "$1");
		target      = target.replace(/p_(\d*)/, "c_"+col);
	}

	var crampped_beans = $(target+" > .bean").length;
	
	console.log("can cramp? "+target+" > .bean -> "+$(target+" > .bean").length);
	if($(target+" > .bean").length > 0) { 
		console.log("Cramp: "+target+"  -> "+crampped_beans);
		$(target+" > .bean").remove();
		move_bean(0, crampped_beans, position);
	} else { 
		return false;
	}
}
function set_speed(val) { speed = val; orig_speed = val; }