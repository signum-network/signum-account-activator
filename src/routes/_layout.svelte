<script>
    import Footer from '../components/Footer.svelte'
</script>

<style>
    :global(html),
    :global(body) {
        height: 100%;
        margin: 0;
        background-color: #1197d9;
    }

    main {
        overflow-y: auto;
        position: relative;
        max-width: 56em;
        background-color: #1197d9;
        padding: 2em;
        margin: 0 auto;
        box-sizing: border-box;
        height: calc(99vh - var(--dim-footer-height) - var(--dim-small-gap) * 2);
    }
</style>

<main>
    <slot></slot>
</main>
<Footer/>
