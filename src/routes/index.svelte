<script context='module'>

    export async function preload(page, session) {
        let { account, publickey } = page.query
        return { account, publickey, isTestnet: process.env.TEST_NET === 'true' }
    }
</script>

<script>
    import { fade } from 'svelte/transition'
    import { Address } from '@burstjs/core'
    import { HttpClientFactory } from '@burstjs/http'
    import Stamp from '../components/Stamp.svelte'

    export let account
    export let publickey
    export let isTestnet

    const ActivationState = {
        New: 0,
        Activated: 1,
        Failed: 2,
    }

    const http = HttpClientFactory.createHttpClient('/api')
    const InitialTitle = 'Activate your account'

    let error = null
    let isLoading = false
    let activationState = ActivationState.New
    let title = InitialTitle
    $: canActivate = !isLoading && account && publickey
    $: {
        if (!publickey && account && account.startsWith('BURST-')) {
            try {
                const address = Address.fromExtendedRSAddress(account)
                account = address.getReedSolomonAddress()
                publickey = address.getPublicKey()
            } catch (e) {
                // noop
            }
        }
    }

    const reset = () => {
        account = null
        publickey = null
        error = null
    }

    const getErrorMessage = e => (e.data && e.data.message) || e.message || 'An unknown Error occurred'

    const activate = async () => {
        try {
            isLoading = true
            await http.post('/activate', { account, publickey, ref: 'self' })
            activationState = ActivationState.Activated
            title = 'Successfully activated'
            reset()
        } catch (e) {
            activationState = ActivationState.Failed
            title = 'Oh, snap. This did not work. Try again'
            error = getErrorMessage(e)
        } finally {
            isLoading = false
        }
    }

    const closeError = () => {
        title = InitialTitle
        reset()
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

    .is-256px-height {
        height: 100%;
        max-height: 256px;
    }

    .buttons {
        padding-top: var(--dim-gap);
        display: flex;
        justify-content: center;
    }

    .success {
        text-align: center;
    }

    .stamp-wrapper {
        position: absolute;
        top: -3em;
        left: -2em;
    }

</style>

<svelte:head>
    <title>Burst Account Activator</title>
</svelte:head>


<section class='hero'>
    <div class='hero-body'>
        <div class='container'>
            {#if isTestnet}
                <div class='stamp-wrapper'>
                    <Stamp text='Testnet'></Stamp>
                </div>
            {/if}
            <a href='https://www.burst-coin.org/' target='_blank' rel='noopener'>
                <figure>
                    <img class='is-600px-width' alt='Burst' src='sticker-burst-1.svg'>
                </figure>
            </a>
            <h1 class='subtitle is-uppercase is-size-2-tablet is-size-4-mobile'>
                {title}
            </h1>
        </div>
    </div>
</section>

<section class='form'>
    {#if activationState === ActivationState.Activated}
        <div transition:fade class='success'>
            <figure>
                <img class='is-256px-height' src='success.png' alt='Success' />
            </figure>
            <small>
                A welcome message was sent to your account. You'll receive it in a few moments.
            </small>
        </div>
    {:else }
        <div>
            <div class='field'>
                <label class='label'>Account Address or Id</label>
                <div class='control'>
                    <input class='input is-large' type='text' placeholder='Enter Account Address or Id'
                           bind:value={account} />
                </div>
            </div>
            <div class='field'>
                <label class='label'>Public Key</label>
                <div class='control'>
                    <input class='input is-large' type='text' placeholder='Enter Public Key' bind:value={publickey} />
                </div>
            </div>
            {#if error}
                <div in:fade='{{duration: 500}}' class='notification is-danger'>
                    <button class='delete' on:click={closeError}></button>
                    <small>{error}</small>
                </div>
            {:else}
                <div class='buttons'>
                    <button class={`button is-primary is-large ${isLoading ? 'is-loading' : ''}`}
                            on:click={async () => await activate()}
                            disabled={!canActivate}>Activate
                    </button>
                </div>
            {/if}
        </div>
    {/if}
</section>
