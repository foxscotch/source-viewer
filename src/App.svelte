<script>
    import { onMount } from 'svelte';
    import Directory from './Directory.svelte';
    
    let root;

    onMount(async () => {
        const res = await fetch('./manifest.json');
        root = await res.json();
    });
</script>

<svelte:head>
    <link rel="stylesheet" href="global.css">
</svelte:head>

<style>	
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

<main>
    {#if root}
        <Directory {...root} expanded/>
    {/if}
</main>

