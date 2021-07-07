<script lang="ts">
	import { onMount } from 'svelte';
	import Game from './game';

	let canvas: any;
	let bg: any;
	let sky0: any;
	let sky1: any;
	const game = new Game();
	const player = game.player;
	const scroll: {x: number, y: number} = { x: 0, y: 0 };
	const skyScroll: number[] = [0,-1140];
	(window as any).game = game;
	onMount(() => {
		const ctx = canvas.getContext('2d');
		let frame: any; // AnimationFrame cancel on unmount / exit
		let secondsPassed: number, oldTimeStamp: number, fps: number; // FPS
		const gameLoop = (timeStamp: number) => {
			frame = requestAnimationFrame(gameLoop);
			// Calculate the number of seconds passed since the last frame
			secondsPassed = (timeStamp - oldTimeStamp) / 1000;
			oldTimeStamp = timeStamp;
			// Calculate fps
			fps = Math.round(1 / secondsPassed);

			if (ctx) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				// Draw number to the screen
				ctx.font = '25px Arial';
				ctx.fillStyle = "#fff";
				ctx.fillText('FPS: ' + fps, canvas.width - 100, canvas.height - 10);
				// Add score
				game.score++;
				// Draw the game
				game.draw(ctx);
				
				// Camera & background
				scroll.x += ((-player.x - scroll.x + 200) / 150);
				scroll.y += ((player.y - scroll.y - 320) / 100);
				// Limit scroll view to the map on x and y coordinates, snaps to place
				if (scroll.x > -5) scroll.x = -5;
				else if (scroll.x < -200) scroll.x = -200
				if (scroll.y < -100) scroll.y = -100;
				else if (scroll.y > 0) scroll.y = 0;
				bg.style.transform = `translate(${scroll.x}px, ${scroll.y}px)`

				// Scrolling parallax sky
				sky0.style.transform = `translate(${scroll.x - skyScroll[0]}px, ${scroll.y}px)`
				sky1.style.transform = `translate(${scroll.x - skyScroll[1]}px, ${scroll.y}px)`
				skyScroll[0] += 0.2;
				skyScroll[1] += 0.2;
				if (skyScroll[0] > 1140) skyScroll[0] = 0;
				if (skyScroll[1] > 0) skyScroll[1] = -1140;
			}
		};
		requestAnimationFrame(gameLoop);
		return () => {
			cancelAnimationFrame(frame);
		};
	});

	document.onkeydown = (event) => {
		if (event.key === 'ArrowRight') player.movement.right = true;
		else if (event.key === 'ArrowUp') player.movement.up = true;
		else if (event.key === 'ArrowLeft') player.movement.left = true;
		else if (event.key === 'ArrowDown') player.movement.down = true;
		else if (event.key === 's') player.shooting = true;
		else if (event.key === 'Shift') player.focusing = true;
		// event.preventDefault();
	};
	document.onkeyup = (event) => {
		if (event.key === 'ArrowRight') player.movement.right = false;
		else if (event.key === 'ArrowUp') player.movement.up = false;
		else if (event.key === 'ArrowLeft') player.movement.left = false;
		else if (event.key === 'ArrowDown') player.movement.down = false;
		else if (event.key === 's') player.shooting = false;
		else if (event.key === 'Shift') player.focusing = false;
		event.preventDefault();
	};
</script>

<div class="game">
	<div class="viewport">
		<img bind:this={sky0} class="sky" src="/images/sky.png" alt="sky0">
		<img bind:this={sky1} class="sky" src="/images/sky.png" alt="sky1">
		<img bind:this={bg} class="bg" src="/images/bg.png" alt="background">
	</div>
	<div class="gui">
		<div>
			<div class="score">
				<p>score</p>
				<p class="scorec">{String(game.score).padStart(9, '0')}</p>
			</div>
			<div class="life">
				<span class="heart"></span>
				<span class="heart"></span>
				<span class="heart"></span>
			</div>
		</div>
		<div>
			<div class="mana">
				<span class="star"></span>
				<span class="star"></span>
				<span class="star"></span>
			</div>
			<div class="power">
				<span class="sword"></span>
				<span class="sword"></span>
				<span class="sword"></span>
				<span class="sword"></span>
			</div>
		</div>
	</div>
	<canvas bind:this={canvas} width={924} height={520} />
</div>

<style>
	div.game {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 924px;
		height: 520px;
	}
	canvas {
		background-color: transparent;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		border: 1px solid black;
	}
	div.viewport {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 924px;
		height: 520px;
		overflow: hidden;
	}
	div.viewport > .bg {
		width: 1140px;
	}
	div.viewport > .sky {
		position: absolute;
		width: 1140px;
		z-index: 1;
	}
	div.gui {
		display: flex;
		position: absolute;
		top: 0;
		width: auto;
		border-radius: 0 0 25px 0;
		background-color: rgba(0,0,0,0.3);
		color: #fff;
		font-size: 1.6rem;
		font-family: setofont, monotype, sans-serif;
		font-weight: 700;
		padding: 8px 10px 10px 8px;
	}
	div.gui > div {
		display: flex;
		flex-direction: column;
	}
	div.gui > div:first-of-type {
		margin-right: 10px;
	}
	div.gui > div > div {
		display: flex;
	}
	div.gui > div span {
		display: block;
		width: 30px;
		background-size: 100% 100%;
	}
	div.gui > div > div.score {
		flex-direction: column;
	}
	span.heart {
		background-image: url(/images/heart.svg);
		height: 20px;
	}
	span.star{
		background-image: url(/images/star.svg);
		height: 28px;
	}
	span.sword{
		background-image: url(/images/sword.svg);
		height: 25px;
	}
	p.scorec {
		font-size: 2rem;
		align-self: flex-end;
	}
</style>
