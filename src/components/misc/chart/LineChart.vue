<script>

    import { Line } from 'vue-chartjs'
    import Chart from './Chart'

    export default {

        extends: Line,

        mixins: [ Chart ]

    }
</script>