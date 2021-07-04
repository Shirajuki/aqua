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
				ctx.fillStyle = 'black';
				ctx.fillText('FPS: ' + fps, canvas.width - 100, canvas.height - 10);
				
				// Game bullets
				for (let i = game.bullets.length-1; i >= 0; i--) {
					const bullet = game.bullets[i];
					bullet.move();
					bullet.draw(ctx);
					if (bullet.outOfRange) game.bullets.splice(i, 1);
					else if (bullet.collisionC(player)) {
						game.bullets.splice(i, 1);
						player.hit();
					}
				}
				// Player bullets
				for (let i = player.bullets.length - 1; i >= 0; i--) {
					const bullet = player.bullets[i];
					bullet.move();
					bullet.draw(ctx);
					if (bullet.outOfRange) player.bullets.splice(i, 1);
				}
				// Enemies
				for (let i = game.enemies.length - 1; i >= 0; i--) {
					const enemy = game.enemies[i];
					enemy.logic(ctx);
					if (enemy.outOfRange2 || enemy.dead) game.enemies.splice(i, 1);
					// Player bullet collision with enemy
					for (let j = player.bullets.length - 1; j >= 0; j--) {
						const bullet = player.bullets[j];
						if (enemy.collision(bullet)) {
							player.bullets.splice(j, 1);
							enemy.hit();
						}
					}
				}
				// Player movement
				player.logic(ctx);

				// Camera & background
				scroll.x += ((-player.x - scroll.x + 200) / 150) | 0;
				scroll.y += ((player.y - scroll.y - 320) / 100) | 0;
				// Limit scroll view to the map on x coordinate, snaps to place
				if (scroll.x > -5) scroll.x = -5;
				else if (scroll.x < -200) scroll.x = -200
				// Limit scroll view to the map on y coordinate, snaps to place at bottom
				if (scroll.y < -100) scroll.y = -100;
				else if (scroll.y > 0) scroll.y = 0;
				bg.style.transform = `translate(${scroll.x}px, ${scroll.y}px)`
				// Scrolling parallax sky
				sky0.style.transform = `translate(${scroll.x - skyScroll[0]}px, ${scroll.y}px)`
				sky1.style.transform = `translate(${scroll.x - skyScroll[1]}px, ${scroll.y}px)`
				skyScroll[0] += 0.2;
				skyScroll[1] += 0.2;
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

<div class="viewport">
	<img bind:this={sky0} class="sky" src="/images/sky.png" alt="sky0">
	<img bind:this={sky1} class="sky" src="/images/sky.png" alt="sky1">
	<img bind:this={bg} class="bg" src="/images/bg.png" alt="background">
</div>
<canvas bind:this={canvas} width={924} height={520} />

<style>
	canvas {
		background-color: transparent;
		border: 1px solid black;
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
	}
	div.viewport > .bg {
		width: 1140px;
	}
	div.viewport > .sky {
		position: absolute;
		width: 1140px;
		z-index: 1;
	}
</style>
