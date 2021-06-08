<script lang="ts">
	import { onMount } from 'svelte';
	import Game from './game';
	import Enemy from "./enemy";
	import type Animal from "./animal";

	let canvas: any;
	const game = new Game();
	const player = game.player;
	let boss = new Enemy(900,300,50,50,"black",game.bullets,game.player);
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
					else if (bullet.collisionC(boss)) {
						player.bullets.splice(i, 1);
						// boss.hit();
					}
				}
				boss.logic(ctx);
				// Player movement
				player.logic(ctx);
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

<canvas bind:this={canvas} width={1024} height={600} />

<style>
	* {
		box-sizing: border-box;
	}
	canvas {
		background-color: #eee;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
</style>
