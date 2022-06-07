<template>
 <div>
     <div class="wrapper">
       <div  :class="showToglebar?'background-blurr':''"></div>
        <!-- Sidebar  -->
        <nav id="sidebar" :class="showToglebar?'active order-last':'order-last'" v-if="showToglebar">
            <div class="sidebar-header">
                <h5 >Add New User </h5>
                <h5  class="close-header"  @click="showToglebarttt">x</h5>
            </div>

            <b-container class="my-4">
               <b-row class="my-2">
              
                <b-col sm="12">
                 <label style="color:green;font-size:14px">Creating Son of  {{storeParentDetail.parent_detail.first_name}}  {{storeParentDetail.parent_detail.last_name}}</label>
                </b-col>
              </b-row>
              <b-row class="my-2">
              
                <b-col sm="12">
                  <b-form-input  placeholder="Enter Your First Name" v-model="userForm.first_name"></b-form-input>
                </b-col>
              </b-row>

              <b-row class="my-2">
              
                <b-col sm="12">
                  <b-form-input  placeholder="Enter Your Last Name" v-model="userForm.last_name"></b-form-input>
                </b-col>
              </b-row>

                <b-row class="my-2">
                 
                <b-col sm="12">
                     <b-form-group label="Gender" v-slot="{ ariaDescribedby }">
                    <b-form-radio-group
                      id="radio-group-2"
                      v-model="userForm.gender"
                      :aria-describedby="ariaDescribedby"
                      name="gender"
                    >
                      <b-form-radio value="Male">Male</b-form-radio>
                      <b-form-radio value="Female">Female</b-form-radio>
 
                    </b-form-radio-group>
                  </b-form-group>
                </b-col>
              </b-row>

                <b-row class="my-2">
                 
                <b-col sm="12">
                     <b-form-group label="Are you Married?" v-slot="{ ariaDescribedby }">
                    <b-form-radio-group
                      id="radio-group-2"
                      v-model="userForm.is_married"
                      :aria-describedby="ariaDescribedby"
                      name="married_status"
                    >
                      <b-form-radio value="Y">Yes</b-form-radio>
                      <b-form-radio value="N">No</b-form-radio>
 
                    </b-form-radio-group>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row class="my-2">
                <b-col sm="12">
                  <b-form-input  placeholder="Enter Your Email" type="email" v-model="userForm.email"></b-form-input>
                </b-col>
              </b-row>

              <b-row class="my-2">
                <b-col sm="12">
                  <b-form-input  placeholder="Enter Your Phone" type="number" v-model="userForm.phone_number"></b-form-input>
                </b-col>
              </b-row>

               <b-row class="my-2">
                  <b-col sm="12">
                 <label class="title-input">Date of Birth</label>
                </b-col>
                <b-col sm="12">
                  <b-form-input  type="date" ></b-form-input>
                </b-col>
              </b-row>

               <b-row class="my-2">
                 <b-col sm="12">
                 <label class="title-input">Date of Death</label>
                </b-col>
                <b-col sm="12">
                  <b-form-input  type="date" ></b-form-input>
                </b-col>
              </b-row>

               

                <b-row class="my-2">
                 
                <b-col sm="12">
                <b-form-file
                v-model="userForm.picture"
               
                placeholder="Upload Your Profile"
              ></b-form-file>
                </b-col>
              </b-row>


                <b-row class="my-2">
                 
                <b-col sm="12" class="text-center">
                 <button type="button" id="sidebarCollapse" class="btn btn-info" @click="saveUser" :disabled="isSaveButtonEnable">
                        <i class="fas fa-align-left"></i>
                        <span>Save</span>
                    </button>
                </b-col>
              </b-row>

            
              
              
          </b-container>
              

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
      showToglebar:false,
      userForm:{
        first_name: "",
        last_name: "",
        phone_number:"",
        email:"",
        dob:"",
        picture:"",
        is_married:"",
        gender:""
        
      },
      storeParentDetail:null
    };
  },
  mounted() {


  },
  components: {
   
    VueFamilyTree,

  },
  computed:{
     isSaveButtonEnable(){
       let check=false;
       let validation=["first_name","last_name","gender","is_married"]
      validation.map(z=>{
        if(!this.userForm[z]){
          check=true;
        }
      })
      if(this.userForm.first_name<3 || this.userForm.last_name<3 ){
         check=true;
      }

      return check
     }

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
    saveUser(){

    },
      showToglebarttt(item){
          window.scrollTo(0,0)
          this.showToglebar=!this.showToglebar
          if(item){
            this.storeParentDetail=item
          }
        
      },
      setChildren(z){
          if(z.is_married=='Y'){
               if(z.hasOwnProperty("children")){
                   if(z.children.length==0){
                       let obj={
                           firstPerson:{
                               name:"Add New Child",
                               image:`${URL_BASE}/plus-image.jpg`,
                               parent_detail:{
                                 ...z
                               }
                           }
                       }
                       z.children.push(obj)

                   }else{
                         let obj={
                           firstPerson:{
                               name:"Add New Child",
                               image:`${URL_BASE}/plus-image.jpg`,
                                parent_detail:{
                                 ...z
                               }
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
      this.showToglebarttt(item)
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
.close-header{
  float:right;
  height:27px;
  width:27px;
  border-radius:27px;
  background-color:#000000 !important;
  color: #fff;
    text-align: center;
    font-weight: bold;
    cursor:pointer
}
.title-input{
  font-size: 14px;
    margin-bottom: 4px;
}


</style>
