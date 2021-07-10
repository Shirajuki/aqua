<script lang="ts">
	import { onMount } from 'svelte';
	let wrapper: any;
	onMount(() => {
		if (wrapper) {
			setTimeout(() => {
				wrapper.classList.add("show");
			},0);
			setTimeout(() => {
				wrapper.classList.remove("show");
				wrapper.classList.add("hidden");
			},5000)
		}
	});
</script>

<div bind:this={wrapper} class="warningSignWrapper">
	<div class="warningSign">
		<div></div>
	</div>
	<div class="warningSign bottom">
		<div></div>
	</div>
</div>

<style>
	:global(div.warningSignWrapper) {
		opacity: 0;
		transition: opacity 2s;
	}
	:global(div.warningSignWrapper.show) {
		opacity: 1;
	}
	div.warningSign {
		position: absolute;
		z-index: 9002;
		left: 0;
		top: 0;
		width: 1005px;
		height: 80px;
		background-color: rgba(255,255,255,0.8);
		transform: translate(-80px,50px);
	}
	div.warningSign.bottom {
		transform: translate(0px,390px);
	}
	:global(div.warningSignWrapper.hidden div.warningSign) {
		animation: topWarning 1000ms linear;
		animation-fill-mode: forwards;
	}
	:global(div.warningSignWrapper.hidden div.warningSign.bottom) {
		animation: bottomWarning 1000ms linear;
		animation-fill-mode: forwards;
	}
	div.warningSign > div {
		height: 100%;
		width: 100%;
		background-image: url(/images/warning_sign.png);
		background-size: 400px 100%;
		background-position-y: center;
		background-position-x: 100px;
		animation: warningScroll 1500ms linear infinite;
	}
	div.warningSign.bottom  > div {
		animation: warningScroll 1500ms linear infinite reverse;
	}
	@keyframes topWarning {
		0% {
			transform: translate(-80px,50px);
		}
		100% {
			transform: translate(0,-80px);
		}
	}
	@keyframes bottomWarning {
		0% {
			transform: translate(0,390px);
		}
		100% {
			transform: translate(-80px,520px);
		}
	}
	@keyframes warningScroll {
		0% {
			background-position-x: 0px;
		}
		100% {
			background-position-x: 400px;
		}
	}
</style>
