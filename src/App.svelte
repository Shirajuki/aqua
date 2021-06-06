<script lang="ts">
	import { onMount } from 'svelte';

	class Animal {
		x: number;
		y: number;
		width: number;
		height: number;
		color: string;
		constructor(x:number, y:number, width:number, height:number, color:string) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.color = color;
		}
		draw(ctx) {
			ctx.beginPath();
			ctx.fillStyle = this.color;
			ctx.rect(this.x, this.y, this.width, this.height);
			ctx.fill();

			ctx.beginPath();
			ctx.arc(this.x, this.y, this.width / 2, 0, 2 * Math.PI);
			ctx.fill();
		}
	}
	class Player extends Animal {
		is_sexy = false;
		meow() {
			console.log('Meow!')
		}
	}
	let canvas;
	const player = new Player(100, 100, 50, 50, "red");

	onMount(() => {
		const ctx = canvas.getContext('2d');
		let frame; // AnimationFrame cancel on unmount / exit
		let secondsPassed, oldTimeStamp, fps; // FPS
		const gameLoop = (timeStamp) => {
			frame = requestAnimationFrame(gameLoop);
			// Calculate the number of seconds passed since the last frame
			secondsPassed = (timeStamp - oldTimeStamp) / 1000;
			oldTimeStamp = timeStamp;
			// Calculate fps
			fps = Math.round(1 / secondsPassed);

			if (ctx) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.beginPath();
				ctx.fillStyle = "#000";
				ctx.rect(200,200,20,20);
				ctx.fill();

				// Draw number to the screen
				ctx.font = '25px Arial';
				ctx.fillStyle = 'black';
				ctx.fillText("FPS: " + fps, canvas.width - 100, canvas.height - 10);
				player.draw(ctx);
			}
		}
		requestAnimationFrame(gameLoop);
		return () => {
			cancelAnimationFrame(frame);
		};
	});

	document.onkeydown = (event) => {
		if (event.key === 'ArrowRight')
			player.x += 10;
		else if (event.key === 'ArrowUp')
			player.y -= 10;
		else if (event.key === 'ArrowLeft')
			player.x -= 10;
		else if (event.key === 'ArrowDown')
			player.y += 10;
		event.preventDefault();
	}
</script>

<canvas
	bind:this={canvas}
	width={1024}
	height={600}
></canvas>

<style>
	* { box-sizing: border-box; }
	canvas {
		background-color: #eee;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
</style>
