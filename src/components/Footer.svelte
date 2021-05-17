<style>
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

    footer {
        width: 100%;
        height: var(--dim-footer-height);
        text-align: end;
        padding: var(--dim-small-gap);
    }

    .donation{
        display: flex;
        flex-direction: column;
        text-align: center;
    }
    @media (max-width: 400px) {
        small {
            font-size: .5em;
        }
    }
</style>


<footer>
    <div class="footer-content">
        <div class="svelte-heart">
            <small>Built with ❤️ and</small>
            <a href="https://svelte.dev" target="_blank" rel="noopener">
                <img class="small-img" src="svelte.svg" alt="Svelte Logo">
            </a>
        </div>
        <div class="donation">
            <small>
                <a class="has-text-white" href="/buymeabeer">Buy me a beer 🍺</a>
            </small>
        </div>
        <a href="https://burst-apps-team.github.io/phoenix" target="_blank" rel="noopener">
            <img src="burst-js.svg" alt="BurstJS Logo"/>
        </a>
    </div>
</footer>
