
    const vue = Vue.createApp({
        data() {
            return {
                serviceInModal: {name: null,id: null},
                estetic: [ ],
                clientInModal: {name: null},
                clients: [ ],
                orderInModal: {id: null},
                orders: [ ],
            };
        },
        async created() {
            this.estetic = await (await fetch('http://localhost:8080/estetic-clinic')).json();

            this.clients = await (await fetch('http://localhost:8080/clients')).json();

            this.orders = await (await fetch('http://localhost:8080/orders')).json();

        },
        methods: {
            getService: async function(id) {
                this.serviceInModal = await (await fetch(`http://localhost:8080/estetic-clinic/${id}`)).json();
                let serviceInfoModal = new bootstrap.Modal(document.getElementById('serviceInfoModal'), {})
                serviceInfoModal.show();
            },

            getClient: async function(id) {
                this.clientInModal = await (await fetch(`http://localhost:8080/clients/${id}`)).json();
                let clientInfoModal = new bootstrap.Modal(document.getElementById('clientInfoModal'), {})
                clientInfoModal.show();
            },
            
            getOrder: async function(id) {
                this.orderInModal = await (await fetch(`http://localhost:8080/orders/${id}`)).json();
                let orderInfoModal = new bootstrap.Modal(document.getElementById('orderInfoModal'), {})
                orderInfoModal.show();
            }
        }
    }).mount('#app');
