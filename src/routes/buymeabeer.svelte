<script>
    import { Amount, createDeeplink } from "@signumjs/util";

    let donationAccount = 'S-9K9L-4CB5-88Y5-F5G4Z'
    let hasCopied = false
    let deeplink = createDeeplink({
        action: 'pay',
        payload: {
            recipient: donationAccount,
            amountPlanck: Amount.fromSigna(50).getPlanck(),
            message: 'Buy you a beer 🍻',
            messageIsText: true,
        },
    })

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
            <h2 class="subtitle is-uppercase is-size-2-tablet is-size-4-mobile center-text has-text-white">
                Buy me a beer 🍻
            </h2>
        </div>
    </div>
</section>

<section class="content center-text">
    <figure>
        <img src="ohager_bat.png" alt="Signum Network Member ohager">
    </figure>
    <h3 class="has-text-white is-clickable">
        {donationAccount}
        <span on:click={copyAddress} title="Copy Address">{hasCopied ? '✅' : '📋' }</span>
    </h3>
    <div class="is-flex is-flex-direction-column">
      <a class="m-4" href={deeplink}>
          <button class="button is-primary is-large">Donate</button>
      </a>
        <a class="has-text-white mt-2" href="/">Back</a>
    </div>
</section>
