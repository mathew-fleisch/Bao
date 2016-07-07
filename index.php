<html>
<head>
<title>Bao</title>
<link rel="stylesheet" href="css/style.css" />
<script type="text/javascript" src="js/jquery-3.0.0.min.js"></script>
<?php 
$max_row = 4;
$max_col = 8; 
$max_bns = 2;
$bank    = 4;
$player  = 1;
$ply_brd = (($max_row / 2) * $max_col);
$ply_pos = ($ply_brd / 2);
?>
<script type="text/javascript">
var max_row = <?php echo $max_row; ?>;
var max_col = <?php echo $max_col; ?>;
var max_bns = <?php echo $max_bns; ?>;
var bank    = <?php echo $bank; ?>;
var player  = <?php echo $player; ?>;
var ply_brd = <?php echo $ply_brd; ?>;
var ply_pos = <?php echo $ply_pos; ?>;
</script>
<script type="text/javascript" src="js/script.js"></script>
</head>
<h1>Babo's Bao</h1>
<body>
<div class="game-container">
	<div id="game">
<?php
	$pretty = 0;
	for ( $row = 0; $row < $max_row; $row++) {
		if($row == 2) { $player = 2; }
		if ($row == 0 || $row == 2) {
			if($pretty) { echo "\t\t"; }
			echo '<div class="player_'.$player.'">';
			if($pretty) { echo "\n"; }
		}	
		if($pretty) { echo "\t\t\t"; }
		echo '<div class="row r_'.$row.'">';
		if($pretty) { echo "\n"; }
		for ( $col = 0; $col < $max_col; $col++) {
			if($row % 2) { 
				$ply_pos--;
			} else {
				$ply_pos++;
			}

			if($pretty) { echo "\t\t\t\t"; }
			echo '<div class="bin c_'.$col.' ply_'.$player.' p_'.$ply_pos.'">';
			if($pretty) { echo "\n\t\t\t\t\t"; }
			echo '<span class="bin-text">'.$ply_pos.'</span>';
			if($pretty) { echo "\n"; }
			// echo '<div class="bin '.($ply_pos == $bank ? 'bank' : '').' ply_'.$player.' p_'.$ply_pos.'"><span class="bin-text">'.$ply_pos.'</span>';
			// echo '<div class="bin '.($ply_pos == $bank ? 'bank' : '').' r_'.$row.' c_'.$col.' ply_'.$player.' p_'.$ply_pos.'"><span class="bin-text">'.$ply_pos.'</span>';
			for($i = 0; $i < $max_bns; $i++) { if($pretty) { echo "\t\t\t\t\t"; } echo '<div class="bean">&nbsp;</div>'; if($pretty) { echo "\n"; } }
			if($pretty) { echo "\t\t\t\t"; }
			echo '</div>';
			if($pretty) { echo "\n"; }
		}
		if($pretty) { echo "\t\t\t"; }
		echo '</div>';
		if($pretty) { echo "\n"; }
		if($ply_pos == $ply_brd) { $ply_pos = (($ply_brd / 2)+1); }
		//Lame ----v
		if($row == 1) { $ply_pos = ($row-1); }
		if($row == 2) { $ply_pos = (($col*2)+1); }
		//End of lame ---^
		//Fix this so that max_row and max_col don't need hard coded exceptions to change values


		if ($row == 1 || $row == 3) {
			if($pretty) { echo "\t\t"; }
			echo '</div>';
				if($pretty) { echo "\n"; }
		}	
	}
?>
	</div>
	<div id="game-stats">
		<ul>
			<li><span class="bank_label">Player 1 Bank: </span><input type="text" class="status-input" id="ply1_bank" size="3" readonly /></li>
			<li><span class="bank_label">Player 2 Bank: </span><input type="text" class="status-input" id="ply2_bank" size="3" readonly /></li>
			<li><span class="bank_label">Beans in-hand: </span><input type="text" class="status-input" id="beans_inhand" size="3" readonly /></li>
		</ul>
		<button id="stop-btn">Stop</button>
		<input type="text" id="speed" value="200" size="5" />
	</div>
</div>
</body>
</html>