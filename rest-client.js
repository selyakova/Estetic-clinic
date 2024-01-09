
    const vue = Vue.createApp({
        data() {
            return {
                serviceInModal: {name: null},
                estetic: [ ]
            };
        },
        async created() {
            this.estetic = await (await fetch('http://localhost:8080/estetic-clinic')).json();
        },
        methods: {
            getService: async function(id) {
                this.serviceInModal = await (await fetch(`http://localhost:8080/estetic-clinic/${id}`)).json();
                let serviceInfoModal = new bootstrap.Modal(document.getElementById('serviceInfoModal'), {})
                serviceInfoModal.show();
            }
        }
    }).mount('#app');
