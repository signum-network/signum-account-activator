<script context="module">
    export async function preload(page, session) {
        const { account, publickey } = page.query
        return { account, publickey }
    }
</script>

<script>
    import Modal from '../components/Modal.svelte'
    import { activatorService } from './api/__services__/ActivatorService'

    export let account
    export let publickey

    let isLoading = false
    let successfullyActivated = null

    $: canActivate = !isLoading && account && publickey


    const reset = () => {
        account = ''
        publickey = ''
    }

    const activate = async () => {
        try {
            isLoading = true
            await activatorService.validate(account, publickey)
            console.log('activate', account, publickey)
            successfullyActivated = true
            reset()
        } catch (e) {
            successfullyActivated = false
            console.log('error', e.message)
        } finally {
            isLoading = false
        }
    }

</script>

<style>
    h1, figure {
        text-align: center;
        margin: 0 auto;
    }

    figure {
        margin: 0 0 1em 0;
    }

    img {
        width: 100%;
        max-width: 600px;
        margin: 0 0 1em 0;
    }

    .buttons {
        padding-top: var(--dim-gap);
        display: flex;
        justify-content: center;
    }

</style>

<svelte:head>
    <title>Burst Account Activator</title>
</svelte:head>


<section class="hero">
    <div class="hero-body">
        <div class="container">
            <a href="https://www.burst-coin.org/" target="_blank">
                <figure>
                    <img alt='Burst' src='sticker-burst-1.svg'>
                </figure>
            </a>
            <h1 class="subtitle is-uppercase is-size-2-tablet is-size-4-mobile">
                Success
            </h1>
        </div>
    </div>
</section>

<div>
    <div class="field">
        <label class="label">Account Address or Id</label>
        <div class="control">
            <input class="input is-large" type="text" placeholder="Enter Account Address or Id" bind:value={account}/>
        </div>
    </div>
    <div class="field">
        <label class="label">Public Key</label>
        <div class="control">
            <input class="input is-large" type="text" placeholder="Enter Public Key" bind:value={publickey}/>
        </div>
    </div>
</div>
