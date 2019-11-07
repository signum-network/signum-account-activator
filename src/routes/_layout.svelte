<style>
    :global(html),
    :global(body) {
        height: 100%;
        margin: 0;
    }

    .wrapper {
        overflow-y: auto;
    }

    footer {
        width: 100%;
        height: var(--dim-footer-height);
        text-align: end;
        border-top: 1px darkgrey solid;
        padding: var(--dim-small-gap);

    }

    @media (max-width: 400px) {
        small {
            font-size: .5em;
        }
    }

    .footer-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .svelte-heart {
        display: flex;
        flex-direction: column;
    }

    img {
        height: var(--dim-footer-height);
    }

    .small-img {
        height: calc(var(--dim-footer-height) / 2);
    }

    main {
        position: relative;
        max-width: 56em;
        background-color: white;
        padding: 2em;
        margin: 0 auto;
        box-sizing: border-box;
        height: calc(100vh - var(--dim-footer-height) - var(--dim-small-gap) * 2);
    }
</style>

<div class="wrapper">
    <main>
        <slot></slot>
    </main>
</div>
<footer class="has-background-white">
    <div class="footer-content">
        <div class="svelte-heart" }>
            <small>Built with ❤️ and</small>
            <a href="https://svelte.dev" target="_blank">
                <img class="small-img" src="svelte.svg" alt="Svelte Logo">
            </a>
        </div>

        <a href="https://burst-apps-team.github.io/phoenix" target="_blank">
            <img src="burst-js.svg" alt="BurstJS Logo" }>
        </a>
    </div>
</footer>
