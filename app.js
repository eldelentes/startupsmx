var app = new Vue({
    el: '#app',
    data: {
        items: [],
        isActive: true
    },
    
    mounted: function(){
       this.loadItems(); 
    },

    methods: {
        loadItems: function(){
            
            var self = this
            var app_id = "appn2FjzFlNxkwgjn";
            var app_key = "key2UzEvT5cWBP1zd";
            this.items = []
        axios.get(
                "https://api.airtable.com/v0/"+app_id+"/Table%201",
                { 
                    headers: { Authorization: "Bearer "+app_key } 
                }
            ).then(function(response){
                self.items = response.data.records
            }).catch(function(error){
                console.log(error)
            })
        },

        close: function(){
            this.isActive = !this.isActive;
        }
    }
})