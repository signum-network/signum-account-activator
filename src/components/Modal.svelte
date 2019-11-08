<script>
    import {fade} from 'svelte/transition'
    export let imgSrc
    export let active

    const close = () => {
        active = false
    }
</script>

{#if active}
    <div transition:fade class='modal is-active'>
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <article class="media">
                    <!--                <div class="media-left">-->
                    <!--                    <figure class="image is-64x64">-->
                    <!--                        <img src={imgSrc}>-->
                    <!--                    </figure>-->
                    <!--                </div>-->
                    <div class="media-content">
                        <div class="content">
                            <slot></slot>
                        </div>
                    </div>
                </article>
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" on:click={close}></button>
    </div>
{/if}
