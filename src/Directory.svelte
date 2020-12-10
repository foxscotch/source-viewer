<script>
    import App from './App.svelte';
    import File from './File.svelte';

    export let name;
    export let children = [];
    export let expanded = false;

    function toggle() {
        expanded = !expanded;
    }

    function compare(a, b) {
        if (a.children === undefined && b.children === undefined)
            return 0;
        else if (a.children && b.children === undefined)
            return -1;
        else if (a.children === undefined && b.children)
            return 1;
        return 0;
    }
</script>

<style>
    span {
        padding: 0 0 0 1.5em;
        background: url(/icons/folder.svg) 0 0.1em no-repeat;
        background-size: 1em 1em;
        font-weight: bold;
        cursor: pointer;
    }

    .expanded {
        background-image: url(/icons/folder-open.svg);
    }

    ul {
        padding: 0.2em 0 0 0.5em;
        margin: 0 0 0 0.5em;
        list-style: none;
        border-left: 1px solid #eee;
    }

    li {
        padding: 0.2em 0;
    }
</style>

<span class:expanded on:click={toggle}>{name}</span>

{#if expanded}
    <ul>
        {#each children.sort(compare) as child}
            <li>
                {#if child.children && child.children.length > 0}
                    <svelte:self {...child}/>
                {:else}
                    <File name={child.name}/>
                {/if}
            </li>
        {/each}
    </ul>
{/if}
