<script>
	export let scroll;
	export let playerY;
	export let x;
	export let y;
	export let width;
	console.log(x, y, width, playerY);
	let color = "#708CAF";
	let gradientStop = "#6785AB";
	if (width === 140) {
		color = "#8EA0C0";
		gradientStop = "#7C94BF";
	}
	else if (width === 180) {
		color = "#9CAFCF";
		gradientStop = "#85A3D8";
	}
</script>

<svg class="rock" style="transform: translate({x + scroll.x}px, {y + scroll.y}px);" width="183" height="657" viewBox="0 0 183 657" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M3.43662 260.03L0 314.571L183 315L171.401 287.944L173.979 228.25L162.38 200.335L164.958 168.985L143.908 148.801L135.317 120.457V59.9035L128.014 38.4307L114.697 32.4183L95.3662 11.8045L90.6408 -5.37376L65.2958 -16.9691L60.5704 -32H52.838L46.3944 -26.4171L23.1972 27.2649L19.7606 57.3267L31.3592 86.1003V115.733L19.7606 141.929L17.1831 232.545L3.43662 260.03Z" fill={color}/>
	<path d="M3.43662 364.97L0 310.429L183 310L171.401 337.056L173.979 396.75L162.38 424.665L164.958 456.015L143.908 476.199L135.317 504.543V565.097L128.014 586.569L114.697 592.582L95.3662 613.196L90.6408 630.374L65.2958 641.969L60.5704 657H52.838L46.3944 651.417L23.1972 597.735L19.7606 567.673L31.3592 538.9V509.267L19.7606 483.071L17.1831 392.455L3.43662 364.97Z" fill="url(#paint0_linear)"/>
	<defs>
		<linearGradient id="paint0_linear" x1="91" y1="512" x2="91.5" y2="310" gradientUnits="userSpaceOnUse">
			<stop stop-color="#8EA0C0" stop-opacity="0"/>
			<stop offset="1" stop-color={gradientStop}/>
		</linearGradient>
	</defs>
</svg>

<style>
	svg.rock {
		position: absolute;
		z-index: 9002;
		left: 0;
		top: 0;
		width: 100px;
	}
</style>
