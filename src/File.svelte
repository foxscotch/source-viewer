<script>
    export let name;
    $: type = name.slice(name.lastIndexOf('.') + 1);

    const file_types = ['py', 'md', 'c', 'html'];
</script>

<style>
    span {
        padding: 0 0 0 1.5em;
        background: 0 0.1em no-repeat;
        background-size: 1em 1em;
    }
</style>

<span style="background-image: url(/icons/{file_types.includes(type) ? type : 'default'}.svg)">{name}</span>
