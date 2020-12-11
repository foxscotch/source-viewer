<script>
    import Fa from 'svelte-fa';
    import { faCamera } from '@fortawesome/fontawesome-free';

    export let name;
</script>

<style>
    span {
        padding: 0 0 0 1.5em;
    }
</style>

<span><Fa icon={faCamera}/>{name}</span>
