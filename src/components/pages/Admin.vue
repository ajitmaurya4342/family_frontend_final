<template>
 <div>
     <div class="wrapper">
        <!-- Sidebar  -->
        <nav id="sidebar" :class="showToglebar?'active order-last':'order-last'" v-if="showToglebar">
            <div class="sidebar-header">
                <h3>Bootstrap Sidebar</h3>
            </div>

           

            
        </nav>

        <!-- Page Content  -->
        <div id="content">

            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">

                    <button type="button" id="sidebarCollapse" class="btn btn-info" @click="showToglebarttt">
                        <i class="fas fa-align-left"></i>
                        <span>Shroff Family</span>
                    </button>
                    <button class="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="fas fa-align-justify"></i>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="nav navbar-nav ml-auto">
                            <!-- <li class="nav-item active">
                                <a class="nav-link" href="#">Page</a>
                            </li> -->
                           
                        </ul>
                    </div>
                </div>
            </nav>

            <div>
                  <VueFamilyTree
                    :tree="tree2"
                    class="Family-tree"
                    @card-click="cardClick"
                    />

           </div>
           
        </div>
    </div>
 </div>

</template>

<script>
import VueFamilyTree from 'vue-family-tree';
import axios from "axios"
import {URL_BASE} from "@/helper/constants"

export default {
  data() {
    return {
      pageName: "",
      onLine: navigator.onLine,
      // onLine: false,
      showBackOnline: false,
      tree1: [{
        firstPerson: {
          name: 'John Walker',
          image: 'https://picsum.photos/300/300?random=1'
        },
        secondPerson: {
          name: 'Jannet Grem',
          image: 'https://picsum.photos/300/300?random=2'
        },  
        children: [
          {
          firstPerson: {
            name: 'Katia',
             image: 'https://picsum.photos/300/300?random=1'
          },
          secondPerson: {
            name: 'Oleg',
             image: 'https://picsum.photos/300/300?random=1'
          },
          user_id:"1"
        
        },
        {
          firstPerson: {
            name: 'Vitia',
             image: 'https://picsum.photos/300/300?random=1'
          },
          secondPerson: {
            name: 'Dasha222',
             image: 'https://picsum.photos/300/300?random=1'
          },
            user_id:"2"
             
        },
        {
          firstPerson: {
            name: 'Antonio Wild',
            image: 'https://picsum.photos/300/300?random=3'
          },
          secondPerson: {
            name: 'Olivia Olson',
             image: 'https://picsum.photos/300/300?random=1'
          },
             user_id:"3"
        
        },
      
        ]
      }],
      tree2:[],
      refresh:true,
      showToglebar:false
    };
  },
  mounted() {


  },
  components: {
   
    VueFamilyTree,

  },

  name: "app",
  beforeDestroy() {
    window.removeEventListener("online", this.updateOnlineStatus);
    window.removeEventListener("offline", this.updateOnlineStatus);
  },
   beforeMount() {
   
     this.getHeirachy()
  },
  methods: {
      showToglebarttt(){
          this.showToglebar=!this.showToglebar

      },
      setChildren(z){
          if(z.is_married=='Y'){
               if(z.hasOwnProperty("children")){
                   if(z.children.length==0){
                       let obj={
                           firstPerson:{
                               name:"Add New Child",
                               image:`${URL_BASE}/plus-image.jpg`
                           }
                       }
                       z.children.push(obj)

                   }else{
                         let obj={
                           firstPerson:{
                               name:"Add New Child",
                               image:`${URL_BASE}/plus-image.jpg`
                           }
                       }
                       z.children.map(k=>{
                           this.setChildren(k)
                       })
                        z.children.push(obj)
                       
                   }

              }
              
          }
         

      },
    redirectUrlLink(){
      window.open("http://localhost:8081")
    },
     getHeirachy(){
     
      var config = {
        method: 'get',
        url: `${URL_BASE}/admin/getHeirachy/1`,
      
      };
        axios(config)
        .then( (response) =>{
            
          let arrayNew=response.data.Records
          arrayNew.map(z=>{
             this.setChildren(z)
                
            })
          
          this.tree2=arrayNew

          this.$forceUpdate()
        })
        .catch(function (error) {
          console.log(error);
        });

    },
     cardClick (item) {
      console.log(item);
      this.showToglebarttt()
    },
    updateOnlineStatus(e) {
      const { type } = e;
      this.onLine = type === "online";
    }
  }
};
</script>

<style >
.vue-family-tree{
  overflow:scroll !important;
   height:1200px !important;
   
}
.Family-tree{
    zoom:0.6
}
.zoom-8{
  zoom:0.55
}
.vue-family-card__image{
   border-radius:100px !important
}
.title_header{
  font-size:50px;
  font-weight: bold;
}

.vue-family-tree__couple_children .vue-family-tree__person:last-child:before {

    background-color: #000 !important;
}
.vue-family-tree__branch .vue-family-tree__branch .vue-family-tree__col:first-child:before {
    width: 82px;
    border-left: 1px solid #000 !important;
}
.vue-family-tree__couple[data-v-7ea6d777]:before {
   
    background-color: #000 !important;
}
.vue-family-tree__branch .vue-family-tree__branch .vue-family-tree__col:before {
  
    border-top: 1px solid #000 !important;
}
.vue-family-tree__couple_children .vue-family-tree__person:last-child:after {
   
    background-color: #000 !important;
}

.vue-family-tree__branch .vue-family-tree__branch .vue-family-tree__col:last-child:before {

    border-right: 1px solid #000 !important;
 
}
.vue-family-tree__col+.vue-family-tree__col {
    padding-left: 50px !important;
    padding-right: 50px !important;

} 
.vue-family-tree__branch .vue-family-tree__branch .vue-family-tree__col:after {

    background-color: #000000 ! important;
}


</style>
