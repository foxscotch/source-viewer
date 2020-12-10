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
    <h1>test</h1>
    {#if root}
        <Directory {...root} expanded/>
    {/if}
</main>

<style>
    main {
        /* text-align: center; */
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

