<template>
    <div id="app">
        <div class="loading" v-if="$store.state.isLoading">
            <center-content>
                <div><b-spinner></b-spinner></div>
                <div class="message">Loading...</div>
            </center-content>
        </div>
        <router-view class="page-content" :class="{ 'is-loading': $store.state.isLoading }"/>
    </div>
</template>

<style type="text/css">
    :root {
        --app-color-primary: #d5d5d5;
        --app-color-secondary: #212529;
        --app-color-tertiary: #eb9316;
        --app-color-quaternary: #ffffff;
    }
</style>
<style lang="scss" scoped>
    #app {
        > .loading {
            position: absolute;
            background: rgba($black, 0.9);
            color: $white;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 100;

            .message {
                margin-top: 10px;
                font-size: 30px;
            }
        }

        > .page-content {
            &.is-loading {
                overflow: hidden;
            }
        }
    }
</style>

<style lang="scss">
// $modal-header-padding: 10px;
// $modal-inner-padding: 10px;
$modal-header-padding: .8rem;
$modal-inner-padding: .625rem;

@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/src/index.scss';

html, body, #app {
    height: 100%;
    user-select: none;
    background-color: var(--app-color-primary);
    color: var(--app-color-secondary);
}

a {
    text-decoration: none !important;
    color: var(--app-color-secondary) !important;
}

.btn-default {
    color: var(--app-color-quaternary) !important;
    background-color: var(--app-color-tertiary) !important;
    border-color: var(--app-color-tertiary) !important;

    &.outline {
        background-color: transparent;
    }
}

form .form-group small.form-text {
    color: var(--app-color-secondary) !important;
    opacity: 0.5;
    // filter: brightness(85%);
}

@if ($production) {
    #app, a {
        cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=), none !important;
    }
}

.material-icons {
    font-size: inherit !important;
    vertical-align: middle;
    // line-height: $line-height-base !important;
}

.btn.btn-fab {;
    position: fixed;
    bottom: 10px;
    right: 10px;;
    z-index: 50;
    display: inline-block;
    padding: .7rem;
    font-size: 1.1rem;
    line-height: 1;
    border-radius: 50%;
    text-align: center;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5), 3px 3px 3px rgba(0, 0, 0, 0.25);
    cursor: default;
}
.modal .modal-title {
    font-size: 1rem;
    // line-height: 1;
}
</style>

<script>
export default {
    name: 'app',
    // computed() {
    // mounted() {
    //     console.log('aaa')
    // },
};
</script>
