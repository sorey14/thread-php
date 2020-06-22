<template>
    <section class="hero is-fullheight">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-mobile is-centered">
                    <div class="column is-three-quarters-mobile is-two-thirds-tablet is-one-third-desktop">
                        <div class="box shadow-box">
                            <form
                                class="form"
                                @submit.prevent
                                novalidate="true"
                            >
                                <b-field label="Email">
                                    <b-input
                                        v-model="user.email"
                                        name="email"
                                        autofocus
                                    />
                                </b-field>
                                <b-input
                                    type="hidden"
                                    v-model="user.token"
                                    name="token"
                                />
                                <div class="has-text-centered">
                                    <button
                                        type="button"
                                        class="button is-primary is-rounded"
                                        @click="onReset"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapActions } from 'vuex';
import showStatusToast from '../components/mixin/showStatusToast';

export default {
    name: 'SignInPage',

    mixins: [showStatusToast],

    data: () => ({
        status: false,
        user: {
            email: '',
            password: '',
            token: '12345678'
        },
    }),
    computed: {
    },
    methods: {
        ...mapActions('auth', [
            'signIn',
            'reset',
        ]),

        onReset() {
            console.log('test');
            try {
                this.reset({ email: this.user.email, token: this.user.token })
                    .then(() => {
                        this.showSuccessMessage('Check Your E-mail!');
                        this.$router.push({ path: '/' }).catch(() => {});
                    }).catch(error => this.showErrorMessage(error.message));
            } catch {
                this.showErrorMessage('Unable open form reset!');
            }
        },

    },
};
</script>

<style scoped>
</style>
