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

            <div class="dropdown">
                <b-avatar badge-variant="primary" class="dropdown-toggle" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <template #badge>
                        <b-icon icon="arrow-down-circle-fill" variant="dark"></b-icon>
                    </template>
                </b-avatar>

                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
            </div>
            
        </div>

    </div>
</template>

<script>
    export default {
        name: 'HeaDer',

        methods: {
            toggle() {
                this.$emit('toggel-header')
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
</style>