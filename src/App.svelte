<script>
    import { onMount } from 'svelte';
    import Directory from './Directory.svelte';
    
    let root;

    onMount(async () => {
        const res = await fetch('./manifest.json');
        root = await res.json();
        console.log(root);
    });
</script>

<main>
    {#if root}
        <Directory {...root} expanded/>
    {/if}
</main>

<style>
	:global(body) {
		background-color: #0d1117;
		color: #c9d1d9;
	}
	
    main {
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

