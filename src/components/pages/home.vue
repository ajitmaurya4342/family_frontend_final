<template>
  <div id="app">
    <section class="py-4 zoom-8" >
      <div class="row" >
        <div class="col-md-12 d-flex py-1 px-4 zoom-8 justify-content-space-between" >

         <span class="title_header font-bold" style="margin-left:50px"> Family Tree</span> 
           <span class="title_header font-bold" style="margin-left:50px" @click="redirectUrlLink"><u>Sign Up/Sign In</u></span> 
        </div>
        
      </div>
      <hr />
       <VueFamilyTree
      :tree="tree2"
      @card-click="cardClick"
    />
    </section>

  </div>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
import { Slide } from "vue-burger-menu"; // import the CSS transitions you wish to use, in this case we are using `Slide`

import VueYouTubeEmbed from "vue-youtube-embed";
import VueFamilyTree from 'vue-family-tree';
import axios from "axios"

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
      tree2:[ ],
      refresh:true
    };
  },
  mounted() {
    this.pageName = this.$route.name;

    window.addEventListener("online", this.updateOnlineStatus);
    window.addEventListener("offline", this.updateOnlineStatus);
  //   setTimeout(()=>{
      
  //    var element = document.getElementsByClassName("vue-family-card__image");
  //    console.log(element.length)
  //    for(let i=0;i<element.length;i++){
  // element[i].classList.add("mystyle");

  //    }


  //   })

  },
  components: {
   
    VueFamilyTree,
    Slide,
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
    redirectUrlLink(){
      window.open("http://localhost:8081")
    },
     getHeirachy(){
     
      var config = {
        method: 'get',
        url: 'http://localhost:5000/admin/getHeirachy/1',
      
      };
        axios(config)
        .then( (response) =>{
          this.tree2=response.data.Records
          this.$forceUpdate()
        })
        .catch(function (error) {
          console.log(error);
        });

    },
     cardClick (item) {
      console.log(item);
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
/* .vue-family-tree__col+.vue-family-tree__col {
    padding-left: 100px !important;
    padding-right: 100px !important;

} */
.vue-family-tree__branch .vue-family-tree__branch .vue-family-tree__col:after {

    background-color: #000000 ! important;
}

</style>
