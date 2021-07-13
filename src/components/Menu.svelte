<script lang="ts">
	import { onMount } from 'svelte';
	import { startStore } from '../stores';

	export let started: boolean = false;
	let btnStart: any;
	let btnEndless: any;
	let btnScore: any;
	let buttons: any;
	let selected = -1;

	const reset = (buttons: any) => {
		buttons.forEach((btn: any) => btn.classList.remove("selected"));
	}
	const select = (n: number) => {
		if (selected === 0 && n === -1) selected = buttons.length - 1;
		else selected = (selected + n) % buttons.length;
		reset(buttons);
		buttons[selected].classList.add("selected");
	}
	onMount(() => {
		buttons = [btnStart, btnEndless, btnScore];
		reset(buttons);

		buttons.forEach((btn: any) => {
			btn.addEventListener("click", () => {
				reset(buttons);
				btn.classList.add("selected");
				if (btn.id === "startGame") {
					console.log("startGame");
					setTimeout(() => startStore.set(true),1000)
					selected = 0;
				}
				else if (btn.id === "endless") {
					console.log("endless");
					selected = 1;
				}
				else if (btn.id === "score") {
					console.log("score");
					selected = 2;
				}
				buttons.forEach((btn: any) => btn.disabled = true);
			})
		});
		select(1);
	});

	document.onkeyup = (event) => {
		if (!started && buttons) {
			if (event.key === 'ArrowUp') select(-1);
			else if (event.key === 'ArrowDown') select(1);
			else if (event.key === 'Enter') buttons[selected]?.click();
		}
		event.preventDefault();
	};
</script>

<div class="menu">
	<div>
		<div>
			<button bind:this={btnStart} class="select selected" id="startGame">START GAME</button>
			<button bind:this={btnEndless} class="select" id="endless">ENDLESS</button>
			<button bind:this={btnScore} class="select" id="score">SCORE</button>
		</div>
		<p class="ver">Ver 1.00</p>
		<img src="/images/menu_cover.png" alt="splash"/>
	</div>
</div>

<style>
	div.menu{
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 924px;
		height: 520px;
		display: flex;
		background-image: url(/images/menu.png);
		overflow: hidden;
	}
	div.menu > div {
		background-color: rgba(191, 156, 254, 0.25);
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	div.menu > div > img {
		position: absolute;
		width: 620px;
		left: 0;
		top: 20px;
	}
	div.menu > div > p.ver {
		position: absolute;
		right: 30px;
		bottom: 30px;
		color: #fff;
		transform: rotate(-20deg);
		font-weight: 700;
		font-size: 1.4rem;
		font-family: setofont, monotype, sans-serif;
	}
	div.menu > div > div {
		display: flex;
		flex-direction: column;
		width: 300px;
		z-index: 9001;
		transform: translateX(55px);
	}
	div.menu > div button {
		position: relative;
		pointer-events: all;
		text-align: left;
		font-size: 2rem;
		background: -webkit-linear-gradient(#eee, #333);
		background: linear-gradient(#eee, #010659);
		/* text-shadow: -2px 2px 0px rgba(0,51,206,0.38), -5px 5px 0px rgba(30,0,74,0.14), -6px 6px 0px #3b3148; */
		text-shadow: -2px 2px 0px rgba(43, 70, 152, 0.38), -5px 5px 0px rgba(71, 48, 105, 0.14), -6px 6px 0px #4e3d64;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		border: none;
		font-weight: 700;
		font-family: setofont, monospace, sans-serif;
		margin: 15px;
		cursor: pointer;
		transition: all .2s;
	}
	div.menu > div button#startGame {
		right: 10px;
		width: 190px;
	}
	div.menu > div button#endless{
		right: 20px;
		width: 120px;
	}
	div.menu > div button#score{
		right: 30px;
		width: 100px;
	}
	div.menu > div button:hover,
	div.menu > div button.selected {
		letter-spacing: 2px;
		text-shadow: -2px 2px 0px rgba(0,51,206,0.38), -5px 5px 0px rgba(30,0,74,0.14), -6px 6px 0px #0c0416;
	}
	div.menu > div button.selected::after {
		transform: rotate(1125deg);
		background-color: #251b68;
		opacity: 1;
	}
	div.menu > div button::after {
		content: "";
		pointer-events: none;
		position: absolute;
		width: 16px;
		height: 16px;
		top: 12px;
		left: -35px;
		background-color: #c1dff1;
		transform: rotate(0);
		opacity: 0;
		transition: all 1.2s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.8s cubic-bezier(.6,.04,.98,.34);
	}
</style>
