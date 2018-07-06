
var app = new Vue({
    el: '#app',
    data: {
        items: [],
        isActive: true,
        currentCategory: ''
    },
    
    mounted: function(){
       this.loadItems('');
    },

    methods: {
        loadItems: function(currentCategory){
            
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
                var currentItems = [];
                if ( currentCategory !== '' && currentCategory !== undefined) {
                    for (i = 0; i < self.items.length; i++) { 
                        var item = self.items[i];
                        
                        for (j = 0; j < item.fields.Category.length; j++) { 
                            
                            if (item.fields.Category[j] == currentCategory) {
                                currentItems.push(item)
                                break
                            }
                        }
                    }
                    self.items = currentItems;
                }

            }).catch(function(error){
                console.log(error)
            })
        },

        close: function(){
            this.isActive = !this.isActive;
        },

        filter: function(e){
            this.currentCategory =  e.target.innerHTML
            this.loadItems(this.currentCategory);

            var links = document.getElementsByClassName("categories-nav__link");
            for (i = 0; i < links.length; i++) {
                links[i].classList.remove('is-current');
            }
            e.target.classList.add("is-current");


            // this.items = this.items.filter(item => item.categories_.includes(categories, category));
        }

    }
})