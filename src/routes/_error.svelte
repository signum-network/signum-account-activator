<script>
    import { onDestroy } from 'svelte'

    export let status
    export let error

    const dev = process.env.NODE_ENV === 'development'

    let timeToRedirect = 5
    const interval = setInterval(() => {
        if (--timeToRedirect === 0) {
            location.replace('/')
        }
    }, 1000)

    onDestroy(() => {
        clearInterval(interval)
    })
</script>

<style>
    h1 {
        margin: 0 auto;
    }

    h1 {
        font-size: 2.8em;
        font-weight: 700;
        margin: 0 0 0.5em 0;
    }

    @media (min-width: 480px) {
        h1 {
            font-size: 4em;
        }
    }

    .center-text {
        text-align: center !important;
    }

    figure {
        margin: 0 0 1em 0;
    }

    .content img {
        max-height: 256px;
    }

    @media (max-width: 400px ) {
        .content img {
            width: 112px;
        }
    }

</style>

<svelte:head>
    <title>{status}</title>
</svelte:head>

<section class="hero">
    <div class="hero-body">
        <div class="container center-text">
            <a href="https://www.burst-coin.org/" target="_blank" rel="noopener">
                <figure>
                    <img class="is-600px-width" alt='Burst' src='sticker-burst-1.svg'>
                </figure>
            </a>
            <h1 class="subtitle is-uppercase is-size-2-tablet is-size-4-mobile center-text">
                This is not the page you're looking for
            </h1>
            <a href="/api/info">Open API Description</a>
            <div>
                <small>{timeToRedirect ? `Redirecting in ${timeToRedirect} seconds...` : 'Bye'}</small>
            </div>
        </div>
    </div>
</section>

<section class="content center-text">
    <figure>
        <img src="c3po.png" alt="Success"/>
    </figure>
    {#if dev && error.stack}
        <pre>{error.stack}</pre>
    {/if}
</section>
