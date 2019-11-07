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

</style>

<svelte:head>
    <title>Burst Account Activator</title>
</svelte:head>


<section class="hero">
    <div class="hero-body">
        <div class="container">
            <figure>
                <img alt='Burst' src='sticker-burst-1.svg'>
            </figure>
            <h1 class="subtitle is-uppercase is-size-2-tablet is-size-4-mobile">
                Activate your account
            </h1>
        </div>
    </div>
</section>

<div>
    <div class="field">
        <label class="label">Account Address or Id</label>
        <div class="control">
            <input class="input is-large" type="text" placeholder="Enter Account Address or Id"/>
        </div>
    </div>
    <div class="field">
        <label class="label">Public Key</label>
        <div class="control">
            <input class="input is-large" type="text" placeholder="Enter Public Key"/>
        </div>
    </div>
</div>
