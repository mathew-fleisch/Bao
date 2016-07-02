<html>
<head>
<title>Bao</title>
<link rel="stylesheet" href="style.css" />
<script type="text/javascript" src="jquery-3.0.0.min.js"></script>
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
<script type="text/javascript" src="script.js"></script>
</head>
<h1>Bao</h1>
<body>
	<div id="game">
<?php
		for ( $row = 0; $row < $max_row; $row++) {
			if($row == 2) { $player = 2; }
			if ($row == 0 || $row == 2) {
				echo '<div class="player_'.$player.'">';
			}	
			echo '<div class="row r_'.$row.'">';
			for ( $col = 0; $col < $max_col; $col++) {
				if($row % 2) { 
					$ply_pos--;
				} else {
					$ply_pos++;
				}

				echo '<div class="bin ply_'.$player.' p_'.$ply_pos.'"><span class="bin-text">'.$ply_pos.'</span>';
				// echo '<div class="bin '.($ply_pos == $bank ? 'bank' : '').' ply_'.$player.' p_'.$ply_pos.'"><span class="bin-text">'.$ply_pos.'</span>';
				// echo '<div class="bin '.($ply_pos == $bank ? 'bank' : '').' r_'.$row.' c_'.$col.' ply_'.$player.' p_'.$ply_pos.'"><span class="bin-text">'.$ply_pos.'</span>';
				for($i = 0; $i < $max_bns; $i++) { echo '<div class="bean">&nbsp;</div>'; }
				echo '</div>';
			}
			echo '</div>';
			if($ply_pos == $ply_brd) { $ply_pos = (($ply_brd / 2)+1); }
			//Lame ----v
			if($row == 1) { $ply_pos = ($row-1); }
			if($row == 2) { $ply_pos = (($col*2)+1); }
			//End of lame ---^
			//Fix this so that max_row and max_col don't need hard coded exceptions to change values


			if ($row == 1 || $row == 3) {
				echo '</div>';
			}	
		}
		?>
	</div>
</body>
</html>