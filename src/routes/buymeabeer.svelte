<script>
    let donationAccount = 'BURST-9K9L-4CB5-88Y5-F5G4Z'
    let hasCopied = false
    const copyAddress = () => {
        navigator.clipboard.writeText(donationAccount)
        hasCopied = true
    }

    const returnHome = () => {
        location.replace('/')
    }

</script>

<style>
    .center-text {
        text-align: center !important;
    }

    figure {
        margin: 0 0 1em 0;
    }

    img {
        max-height: 180px;
    }

    @media (max-width: 400px ) {
        .content img {
            width: 112px;
        }
    }

</style>

<svelte:head>
    <title>Help ohager</title>
</svelte:head>

<section class="hero">
    <div class="hero-body">
        <div class="container center-text">
            <a href="https://www.burst-coin.org/" target="_blank" rel="noopener">
                <figure>
                    <img class="is-600px-width" alt='Burst' src='sticker-burst-1.svg'>
                </figure>
            </a>
            <h2 class="subtitle is-uppercase is-size-2-tablet is-size-4-mobile center-text">
                Buy me a beer 🍻
            </h2>
        </div>
    </div>
</section>

<section class="content center-text">
    <figure>
        <img src="ohager_bat.png" alt="Burst Apps Team Member ohager">
    </figure>
    <h3>
        <a href="burst.payment://v1?action=send&payload=e3JlY2lwaWVudElkOjE2MTA3NjIwMDI2Nzk2OTgzNTM4O2Ftb3VudDoxMDB9">
            {donationAccount}</a>
    </h3>
    <button class={`button is-small ${hasCopied && 'is-success'}`}
            on:click={copyAddress}>{ hasCopied ? 'Address Copied': 'Copy Address'}</button>
    <button class="button is-small" on:click={returnHome}>Back</button>
</section>
