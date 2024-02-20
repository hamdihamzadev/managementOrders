<template>
    <div id="header">
        <div class="container d-flex justify-content-between py-3">
            <!------ BTN TOGGLE ------->
            <b-button id="btn-toggle" class="d-flex align-items-center h-50" @click="toggle">
                <b-icon icon="list" aria-hidden="true"></b-icon> Menu
            </b-button>
            <!------ SEARCH ------->
            <b-nav-form class="d-flex">
                <b-form-input size="sm" class="mr-sm-2 ml-2" placeholder="Search Page" id="search"></b-form-input>
            </b-nav-form>
            <!------ PROFILE MENU ------->

            <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
                <template #button-content>
                    <b-avatar variant="info" :src="imageSrc" @click="toggleDropdown">
                        <template #badge>
                            <b-icon icon="arrow-down-circle-fill"></b-icon>
                        </template></b-avatar>
                </template>
                <b-dropdown-item href="#">Hello <strong>Hamza</strong></b-dropdown-item>
                <b-dropdown-item href="#">Notification</b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item href="#" @click="logout">Log out <b-icon icon="box-arrow-in-right"  variant="dark"></b-icon></b-dropdown-item>
            </b-dropdown>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HeaDer',
        data() {
            return {
                imageSrc: require('@/assets/man.png'),
                listProfil: true,
                dropdownVisible: false,
            }
        },

        methods: {
            toggle() {
                this.$emit('toggel-header')
            },

            toggleDropdown() {
                this.dropdownVisible = !this.dropdownVisible;
            },

            logout(){
                this.$router.push('/Login')
            }
        }

    }
</script>

<style lang="scss">
    #header {
        background-color: var(--couleur-primaire-1);

        .navbar {
            height: 77px;
        }
    }

    #btn-toggle {
        background-color: var(--couleur-primaire-4);
        border: none;
        gap: 10px;
    }

    #search {
        height: 43px;
        width: 256px;
        background-color: transparent;
        padding-left: 14px;
        border: 1px solid var(--couleur-primaire-2);
        color: var(--couleur-primaire-3);
    }

    #btn-search {
        height: 45px;
        width: 81px;
    }

    .prof {
        font-size: 12px;
        margin: 0px;
    }

    #img-profil {
        object-fit: cover;
    }
</style>