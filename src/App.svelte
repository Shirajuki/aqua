<script lang="ts">
	import { onMount } from 'svelte';
	import { startStore } from './stores';
	import Game from './components/Game.svelte';
	import Menu from './components/Menu.svelte';

	let started: boolean = false;
	startStore.subscribe((value: boolean) => {
		started = value;
	});
	onMount(() => {
		console.log("yoyo");
	});
	
</script>

<div class="wrapper">
	{#if started}
		<Game />
	{:else}
		<Menu started={started}/>
	{/if}
</div>

<style>
</style>
