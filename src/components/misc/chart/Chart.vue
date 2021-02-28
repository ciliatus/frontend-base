<script>

    import DateTime from "@/util/DateTime";
    import Merge from "@/util/Merge";

    export default {

        props: {
            data: {
                type: Object,
                default: null
            },
            options: {
                type: Object,
                default: () => {}
            },
            generateLabelsFromX: Boolean
        },

        data () {
            return {
                mergedOptions: {},
                defaultOptions: {
                    responsive: true,
                    maintainAspectRatio: false,
                    spanGaps: false,
                    legend: {
                        labels: {
                            fontFamily: '"Roboto", sans-serif',
                            fontColor: '#a3a3a3'
                        }
                    },
                    scales: {
                        xAxes: [{
                            type: 'time',
                            beginAtZero: true,
                            ticks: {
                                maxTicksLimit: 12,
                                autoSkip: false
                            },
                            time: {
                                unit: 'hour',
                                minUnit: 'hour',
                                displayFormats: {
                                    hour: 'YYYY-MM-DD[\r\n]HH:mm'
                                }
                            }
                        }]
                    }
                }
            }
        },

        methods: {
            render () {
                this.renderChart(this.data, this.mergedOptions)
            }
        },

        mounted () {
            this.mergedOptions = Merge.objects(this.defaultOptions, this.options)
        }

    }
</script>