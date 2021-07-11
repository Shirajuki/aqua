<script lang="ts">
	import { onMount } from 'svelte';
	import Game from './game';
	import { shockwave } from './particle';
	import { point, smallPoint } from './item';
	import Rocks from './components/Rocks.svelte';
	import Warning from './components/Warning.svelte';

	let canvas: any;
	let bg: any;
	let sky0: any;
	let sky1: any;
	const rocks: any = [
		{ x: 100, y: -150, width: 100, speed: 0.1 },
		{ x: 920, y: -150, width: 100, speed: 0.1 },
		{ x: 200, y: -125, width: 140, speed: 0.2 },
		{ x: 930, y: -125, width: 140, speed: 0.2 },
		{ x: 300, y: -100, width: 160, speed: 0.3 },
		{ x: 900, y: -100, width: 160, speed: 0.3 },
	];
	const game = new Game();
	const player = game.player;
	const scroll: {x: number, y: number} = { x: 0, y: 0 };
	const skyScroll: number[] = [0,-1140];
	(window as any).game = game;
	(window as any).scroll = scroll;
	onMount(() => {
		const ctx = canvas.getContext('2d');
		let frame: any; // AnimationFrame cancel on unmount / exit
		let secondsPassed: number, oldTimeStamp: number, fps: number; // FPS
		const gameLoop = (timeStamp: number) => {
			frame = requestAnimationFrame(gameLoop);
			// Calculate the number of seconds passed since the last frame
			secondsPassed = (timeStamp - oldTimeStamp) * 0.001;
			oldTimeStamp = timeStamp;
			// Calculate fps
			fps = Math.round(1 / secondsPassed);
			game.dt = secondsPassed*60;

			if (ctx) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				// Draw number to the screen
				ctx.font = '25px Arial';
				ctx.fillStyle = "#fff";
				ctx.fillText('FPS: ' + fps, canvas.width - 100, canvas.height - 10);
				// Add score
				game.score += 0.2*(game.dt || 1);
				// Draw the game
				game.draw(ctx);
				
				// Camera & background
				scroll.x += ((-player.x - scroll.x + 200) / 150)*(game.dt || 1);
				scroll.y += ((player.y - scroll.y - 320) / 100)*(game.dt || 1);
				// Limit scroll view to the map on x and y coordinates, snaps to place
				if (scroll.x > -5) scroll.x = -5;
				else if (scroll.x < -200) scroll.x = -200
				if (scroll.y < -100) scroll.y = -100;
				else if (scroll.y > 0) scroll.y = 0;
				bg.style.transform = `translate(${scroll.x}px, ${scroll.y}px)`

				// Rocks
				for (let i=rocks.length - 1; i>=0; i--) {
					const rock = rocks[i];
					rock.x -= rock.speed;
					if (rock.x < -250) rock.x = Math.random()*rock.width + 1100
				}

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
		else if (event.key === 'z') player.shooting = true;
		else if (event.key === 'x') player.spelling = true;
		else if (event.key === 'Shift') player.focusing = true;
		// event.preventDefault();
	};
	document.onkeyup = (event) => {
		if (event.key === 'ArrowRight') player.movement.right = false;
		else if (event.key === 'ArrowUp') player.movement.up = false;
		else if (event.key === 'ArrowLeft') player.movement.left = false;
		else if (event.key === 'ArrowDown') player.movement.down = false;
		else if (event.key === 'z') player.shooting = false;
		else if (event.key === 'x') player.spelling = false;
		else if (event.key === 'Shift') player.focusing = false;
		// Particle and item tests
		else if (event.key === 'c') shockwave({x: 450, y: 300, size: 30, amount: 30, particleArr: game.particles});
		event.preventDefault();
	};
	const getRockData = (rock: any, scroll: any) => {
		return {...rock, scroll: scroll};
	}
</script>

<div class="game">
	<div class="viewport">
		<img bind:this={sky0} class="sky" src="/images/sky.png" alt="sky0">
		<img bind:this={sky1} class="sky" src="/images/sky.png" alt="sky1">
		<img bind:this={bg} class="bg" src="/images/bg.png" alt="background">
		{#each rocks as rock}
			<Rocks {...getRockData(rock, scroll)}/>
		{/each}
	</div>
	<div class="gui">
		<div>
			<div class="score">
				<p>score</p>
				<p class="scorec">{String(Math.floor(game.score)).padStart(9, '0')}</p>
			</div>
			<div class="life">
				<span class="heart {game.player.stats.life <= 0 ? "hidden" : ""}"></span>
				<span class="heart {game.player.stats.life <= 1 ? "hidden" : ""}"></span>
				<span class="heart {game.player.stats.life <= 2 ? "hidden" : ""}"></span>
			</div>
		</div>
		<div>
			<div class="mana">
				<span class="star" style="background-position-x: {game.player.stats.spell < 1 ? (1 - game.player.stats.spell) * 30 | 0 : 0}px; transform: translateX(-{game.player.stats.spell < 1 ? (1 - game.player.stats.spell) * 30 | 0 : 0}px);"></span>
				<span class="star" style="background-position-x: {game.player.stats.spell < 2 ? (2 - game.player.stats.spell) * 30 | 0 : 0}px; transform: translateX(-{game.player.stats.spell < 2 ? (2 - game.player.stats.spell) * 30 | 0 : 0}px);"></span>
				<span class="star" style="background-position-x: {game.player.stats.spell < 3 ? (3 - game.player.stats.spell) * 30 | 0 : 0}px; transform: translateX(-{game.player.stats.spell < 3 ? (3 - game.player.stats.spell) * 30 | 0 : 0}px);"></span>
			</div>
			<div class="power">
				<span class="sword"></span>
				<span class="sword" style="background-position-x: {game.player.stats.power < 2 ? (2 - game.player.stats.power) * 30 | 0 : 0}px; transform: translateX(-{game.player.stats.power < 2 ? (2 - game.player.stats.power) * 30 | 0 : 0}px);"></span>
				<span class="sword" style="background-position-x: {game.player.stats.power < 3 ? (3 - game.player.stats.power) * 30 | 0 : 0}px; transform: translateX(-{game.player.stats.power < 3 ? (3 - game.player.stats.power) * 30 | 0 : 0}px);"></span>
				<span class="sword" style="background-position-x: {game.player.stats.power < 4 ? (4 - game.player.stats.power) * 30 | 0 : 0}px; transform: translateX(-{game.player.stats.power < 4 ? (4 - game.player.stats.power) * 30 | 0 : 0}px);"></span>
			</div>
		</div>
	</div>
	<canvas bind:this={canvas} width={924} height={520} />
	{#if game.showWarning}
		<Warning />
	{/if}
</div>

<style>
	div.game {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 924px;
		height: 520px;
		overflow: hidden;
	}
	canvas {
		background-color: transparent;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
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
		background-repeat: no-repeat;
	}
	div.gui > div span.hidden {
		background-position-x: 30px;
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
