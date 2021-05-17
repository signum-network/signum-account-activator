<script>
    let donationAccount = 'S-9K9L-4CB5-88Y5-F5G4Z'
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
            <a href="https://signum.network" target="_blank" rel="noopener">
                <figure>
                    <img class="is-600px-width" alt='Burst' src='signum.svg'>
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
        <img src="ohager_bat.png" alt="Signum Network Member ohager">
    </figure>
    <h3>
      <a class="has-text-white" href={`burst://requestBurst?receiver=${donationAccount}`}>{donationAccount}</a>
    </h3>
    <button class="button" on:click={returnHome}>Back</button>
    <button class={`button ${hasCopied && 'is-success'}`}
            on:click={copyAddress}>{ hasCopied ? 'Address Copied': 'Copy Address'}</button>
</section>
