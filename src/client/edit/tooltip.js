import {Tooltip} from 'bootstrap/dist/js/bootstrap.bundle.min';
export default {
    props: {
        'text': String,
        'enable': Boolean,
    },

    data() {
        return {
            tooltip: null
        }
    },

    methods: {
        setTooltip() {
            if(this.tooltip != null) {
                this.tooltip.dispose();
            }
            this.$nextTick(() => {
                console.log(this.$slots);
                console.log(this.$slots.default[0]);
                console.log(this.$slots.default[0].elm);
                this.tooltip = new Tooltip(this.$slots.default[0].elm, {
                    title: this.text
                });
            });
        },
        unsetTooltip() {
            if(this.tooltip != null) {
                this.tooltip.dispose();
            }
        }
    },

    watch: {
        text() {
            if(this.enable) {
                this.setTooltip();
            }
        },

        enable() {
            if(this.enable) {
                this.setTooltip();
            }
            else {
                this.unsetTooltip();
            }
        }
    },

    mounted() {
        if(this.enable) {
            this.setTooltip();
        }
    },

    render(h) {
        if(this.$slots.default.length > 1) {
            console.error('Component "Tooltip" must have only one child.');
        }

        return this.$slots.default;
    },


}