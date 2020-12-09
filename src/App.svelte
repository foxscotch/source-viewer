<script>
	export let name;
	let content;

	fetch('./manifest.json').then(res => res.json().then(d => content = d));
</script>

<main>
	<h1>test</h1>
	{#if content}
	<ul>
		{#each Object.entries(content) as [k, v]}
			<li>{k}: {v}</li>
		{/each}
	</ul>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
