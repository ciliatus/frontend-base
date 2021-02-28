<template>
    <div>
        {{ object }}
    </div>
</template>

<script>

    import SingleComponent from "../SingleComponent"
    import UserModel from "../../store/models/Common/UserModel"

    export default {
        extends: SingleComponent,

        data () {
            return {
                model: UserModel
            }
        }
    }
</script>
