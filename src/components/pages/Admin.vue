<template>
<div>
  <div class="wrapper">
    <div :class="showToglebar?'background-blurr':''"></div>
    <!-- Sidebar  -->
    <nav
      id="sidebar"
      :class="showToglebar?'active order-last':'order-last'"
      v-if="showToglebar"
    >
      <div class="sidebar-header" v-if="!showProfile">
        <h5>{{editProfile?'Update User Detail':'Add New User'}}</h5>
        <h5 class="close-header" @click="showToglebarttt">x</h5>
      </div>

      <b-container class="my-4" v-if="!showProfile">
        <b-row class="my-2" v-if="storeParentDetail">
          <b-col sm="12">
            <label style="color: green; font-size: 14px"
              >Creating Son of {{storeParentDetail.parent_detail.first_name}}
              {{storeParentDetail.parent_detail.last_name}}</label
            >
          </b-col>
        </b-row>

        <b-row class="my-2" v-if="!is_son_or_daughter">
          <b-col sm="12">
            <label style="color: green; font-size: 14px">
              {{userForm.gender=='Female'?'Wife Of ':'Husband Of'}}
              {{userDetail.relation_of}}</label
            >
          </b-col>
        </b-row>
        <b-row class="my-2">
          <b-col sm="12">
            <b-form-input
              placeholder="Enter Your First Name"
              v-model="userForm.first_name"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="my-2">
          <b-col sm="12">
            <b-form-input
              placeholder="Enter Your Last Name"
              v-model="userForm.last_name"
            ></b-form-input>
          </b-col>
        </b-row>

        <template v-if="is_son_or_daughter && !checkChildrenExist">
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
              <b-form-group
                label="Are you Married?"
                v-slot="{ ariaDescribedby }"
              >
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
        </template>

        <b-row class="my-2">
          <b-col sm="12">
            <b-form-input
              placeholder="Enter Your Email"
              type="email"
              v-model="userForm.email"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="my-2">
          <b-col sm="12">
            <b-form-input
              placeholder="Enter Your Phone"
              type="number"
              v-model="userForm.phone_number"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="my-2">
          <b-col sm="12">
            <label class="title-input">Date of Birth</label>
          </b-col>
          <b-col sm="12">
            <b-form-input type="date" v-model="userForm.dob"></b-form-input>
          </b-col>
        </b-row>

        <b-row class="my-2">
          <b-col sm="12">
            <label class="title-input">Date of Death</label>
          </b-col>
          <b-col sm="12">
            <b-form-input type="date" v-model="userForm.dod"></b-form-input>
          </b-col>
        </b-row>

        <b-row class="my-2">
          <b-col sm="8">
            <b-form-file
              v-model="userForm.picture"
              v-on:change="uploadProfile($event.target)"
              accept="image/png, image/gif, image/jpeg"
              placeholder="Upload Your Profile"
            ></b-form-file>
          </b-col>
          <b-col sm="4" v-if="userForm.picture">
            <img
              :src="baseUrl+userForm.picture"
              alt="avatar"
              class="img-responsive"
            />
          </b-col>
        </b-row>

        <b-row class="my-2" v-if="editProfile">
          <b-col sm="12">
            <label class="title-input">About You</label>
          </b-col>
          <b-col sm="12">
            <b-form-textarea v-model="userForm.description"></b-form-textarea>
          </b-col>
        </b-row>

        <b-row class="my-2">
          <b-col sm="12" class="text-center">
            <button
              type="button"
              class="btn btn-info"
              @click="saveUser"
              :disabled="isSaveButtonEnable"
            >
              <i class="fas fa-align-left"></i>
              <span>Save</span>
            </button>
          </b-col>
        </b-row>
      </b-container>
      <div id="" class="" v-if="showProfile">
        <div class="">
          <div class="row d-flex justify-content-center padding-0">
            <div class="col-xl-12 col-md-12 padding-0">
              <div class="card user-card-full">
                  <h5 class="close-header profile-close" @click="showToglebarttt">x</h5>
                <div class="row m-l-0 m-r-0">
                  <div
                    class="col-sm-12 bg-c-lite-green user-profile padding-0"
                  >
                    <div class="card-block text-center mt-2">
                      <div class="">
                        <img
                          v-if="userForm.picture"
                          :src="baseUrl+userForm.picture"
                          
                          alt="User-Profile-Image"
                          class=" img-responsive"
                        />
                      </div>
                      <h6 class="f-w-600 mt-2">{{userForm.first_name}} {{userForm.last_name}}</h6>
                      <!-- <p>Web Designer</p> -->
                      
                    </div>
                  </div>
                </div>
              </div>
                <div class="content-details">
                
                  <div class="d-flex my-3 mx-2 justify-content-space-between">
                    <div class="title-texxxt">Email</div>
                    <div class="title-texxxt-val">{{userForm.email?userForm.email:'Not Mentioned'}}</div>
                  </div>
                  <hr>

                    <div class="d-flex my-3 mx-2 justify-content-space-between">
                    <div class="title-texxxt">Phone No</div>
                    <div class="title-texxxt-val">{{userForm.phone_number?userForm.phone_number:'Not Mentioned'}}</div>
                  </div>
                  <hr>

                    <div class="d-flex my-3 mx-2 justify-content-space-between">
                    <div class="title-texxxt">Date Of Birth</div>
                    <div class="title-texxxt-val">{{userForm.dob?moment(userForm.dob).format("DDD,MMM YYYY"):'Not Mentioned'}}</div>
                  </div>
                  <hr>

                    <div class="d-flex my-3 mx-2 justify-content-space-between">
                    <div class="title-texxxt">Date of Death</div>
                    <div class="title-texxxt-val">{{userForm.dod?moment(userForm.dod).format("DDD,MMM YYYY"):'Not Mentioned'}}</div>
                  </div>
                  <hr>

                    <div class="d-flex my-3 mx-2 justify-content-space-between">
                    <div class="title-texxxt">About </div>
                    <div class="title-texxxt-val">{{userForm.description?(userForm.description):'Not Mentioned'}}</div>
                  </div>
                  <hr>

                  

                  
              </div>
              <b-row class="my-5">
          <b-col sm="12" class="text-center">
            <button
              type="button"
              class="btn btn-info"
              @click="toEditProfile"
            >
              <span>Update Profile</span>
            </button>
          </b-col>
        </b-row>
            </div>

            
          </div>
        </div>
      </div>
    </nav>

    <!-- Page Content  -->
    <div id="content">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <button
            type="button"
            class="btn btn-info"
          >
            <span>Shroff Family</span>
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
          :enable-drag="true"
          class="Family-tree"
          :wrapper-styles="{position: 'relative', width: '100%', height: dynamicheight}"
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
import moment from "moment"
import {URL_BASE} from "@/helper/constants"
import _ from "lodash"


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
    showToglebar:true,
    userForm:{
      user_id:"",
      first_name: "",
      description:"",
      last_name: "",
      phone_number:"",
      email:"",
      dob:"",
      dod:"",
      picture:"",
      is_married:"",
      gender:""

    },
    editProfile:false,
    is_son_or_daughter:true,
    userDetail:null,
    storeParentDetail:null,
    checkChildrenExist:false,
    baseUrl:URL_BASE,
    userlevel:0,
    is_admin_page:false,
    showProfile:false

  };
},
mounted() {

},


components: {

  VueFamilyTree,

},
computed:{
  dynamicheight(){
    let heightOfDiv=this.userlevel>=4?(this.userlevel*250) + 200:800;
    console.log(this.userlevel)
  return `${heightOfDiv}px`
  },
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
    this.is_admin_page=window.location.pathname.includes("dmin")
    console.log(this.is_admin_page)
    this.resetList()
},
methods: {
    moment,
  
  resetList(){
    this.getHeirachy();
    this.showToglebarttt()
    this.resetForm()

  },
    toEditProfile(){
       window.scrollTo(200,0)
    this.showProfile=!this.showProfile
    this.editProfile=!this.editProfile
    },
  resetForm(){
    this.editProfile=false;
    this.showProfile=false;
    this.is_son_or_daughter=true;
    this.userDetail=null;
    this.checkChildrenExist=false
  Object.keys(this.userForm).map(z=>{
        this.userForm[z]=""
      })
  },
  saveUser(){
    this.showLoading()
    var config = {
      method: 'post',
      url: `${URL_BASE}/admin/addEditUsers/1`,
        headers: {
    'Content-Type': 'application/json'
  },
      data:JSON.stringify(this.userForm)

    };
      axios(config)
      .then( (response) =>{
          let {data}=response
          this.hideLoading()
        if(data.status){

          this.linkRelationOnlySonAndDaughter(data.Records[0].user_id).then(response=>{
            this.$toasted.show(data.message,{type:"success"})
            this.resetList()
          })


        }else{
          this.$toasted.show(data.message || data.msg || "Something Went Wrong",{type:"error"})

        }
        // this.tree2=arrayNew

        this.$forceUpdate()
      })
      .catch(function (error) {
        console.log(error);
      });



  },
    linkRelationOnlySonAndDaughter(user_id){
    return  new Promise((resolve)=>{
      if(this.storeParentDetail){
        let obj={
            parent_id:this.storeParentDetail.parent_detail.user_id,
        }
        if(this.userForm.gender=='Male'){
            obj["is_son_of"]='Y';
        }else{
            obj["is_daughter_of"]='Y';
        }

        console.log("Request Link",obj)
        var config = {
          method: 'post',
          url: `${URL_BASE}/admin/linkRelation/${user_id}/1`,
          data:JSON.stringify(obj),
            headers: {
    'Content-Type': 'application/json'
  },

        };
          axios(config)
          .then( (response) =>{
            console.log(response,"Relation Link")
              if(data.status){
              return resolve(true)
              }else{
              return resolve(false)
              }
          })
          .catch(function (error) {
          return resolve(false)
          });



      }else{
        console.log("No Relation Changed")
          return resolve(true)
      }

    })

    },
      uploadProfile: function(image) {

          var file = image.files[0];
          console.log(file," //   var formdata = new FormData()");
        //     formData.append("image", image, filename);
        //     formData.append("imagePath", "Gallery Image");
        //     formData.append("height", 1);
        //     formData.append("width", 1);
        //   formData.append("size",1);
        //  var axios = require('axios')")

            var data = new FormData();
            data.append('image', file);
            data.append('height', '24');
            data.append('width', '16');
            data.append('imagePath', 'Gallery Image');
            data.append('size', '314');

            var config = {
                method: 'post',
                url: `${URL_BASE}/admin/uploadimage`,
                headers: {
                },
                data : data
              };

              axios(config)
              .then( (response) =>{
                this.userForm.picture=`${response.data.path}`
                // console.log(JSON.stringify(response.data));
              })
              .catch(function (error) {
                console.log(error);
              });



      },
    showToglebarttt(item){


        if(item && item.hasOwnProperty("parent_detail")){
            window.scrollTo(200,0)
          this.storeParentDetail=item
          this.userForm.last_name=item.parent_detail.last_name
        }else{
            this.storeParentDetail=null
            this.resetForm()
        }

          if(item &&  item.hasOwnProperty("user_detail")){
            this.is_son_or_daughter=item.is_son_or_daugter
            this.checkChildrenExist=item.checkChildrenExist
            window.scrollTo(200,0)

              this.userDetail=item.user_detail
              if(this.is_admin_page){
                this.editProfile=true
                }else{
                  this.showProfile=true;
                }

            Object.keys(this.userForm).map(z=>{
              this.userForm[z]=this.userDetail[z]
              })
        }

          this.showToglebar=!this.showToglebar



    },
    setChildren(z){
        this.userlevel=(z.user_level && z.user_level>this.userlevel)?z.user_level:this.userlevel;

        if(z.is_married=='Y' ){

            if(z.children.length>0){
              z.children=_.orderBy(z.children,["user_id","asc"])

            }
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

                      if(this.is_admin_page){
                        z.children.push(obj)

                      }

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
                       if(this.is_admin_page){
                        z.children.push(obj)

                      }

                  }

            }

        }


    },
  redirectUrlLink(){
    window.open("http://localhost:8081")
  },
    getHeirachy(){
        this.showLoading()
    var config = {
      method: 'get',
      url: `${URL_BASE}/admin/getHeirachy/1`,

    };
      axios(config)
      .then( (response) =>{

        let arrayNew=[...response.data.Records]
       
          arrayNew.map(z=>{
            this.setChildren(z)

          })
      
        this.tree2=arrayNew
       
        this.hideLoading()


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

<style>
.vue-family-tree {
overflow: scroll !important;
/* height:1200px !important; */
}
.Family-tree {
zoom: 0.6;
}
@media (max-width: 768px) {
  .Family-tree {
  zoom: 0.4;
  }
}
.zoom-8 {
zoom: 0.55;
}
.vue-family-card__image {
border-radius: 100px !important;
}
.title_header {
font-size: 50px;
font-weight: bold;
}

.vue-family-tree__couple_children .vue-family-tree__person:last-child:before {
background-color: #000 !important;
}
.vue-family-tree__branch
.vue-family-tree__branch
.vue-family-tree__col:first-child:before {
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

.vue-family-tree__branch
.vue-family-tree__branch
.vue-family-tree__col:last-child:before {
border-right: 1px solid #000 !important;
}
.vue-family-tree__col + .vue-family-tree__col {
padding-left: 50px !important;
padding-right: 50px !important;
}
.vue-family-tree__branch .vue-family-tree__branch .vue-family-tree__col:after {
background-color: #000000 !important;
}
.close-header {
float: right;
height: 27px;
width: 27px;
border-radius: 27px;
background-color: #000000 !important;
color: #fff;
text-align: center;
font-weight: bold;
cursor: pointer;
}
.title-input {
font-size: 14px;
margin-bottom: 4px;
}

.img-responsive {
height: 100px;
width: 100px;
border-radius: 100px;
object-fit: fill;
background: black;
}

/* Profile Related Functions */

.padding-0 {
padding: 0;
margin: 0;
}

.user-card-full {
overflow: hidden;
}

.card {
border-radius: 5px;
-webkit-box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
border: none;
margin-bottom: 30px;
}

.m-r-0 {
margin-right: 0px;
}

.m-l-0 {
margin-left: 0px;
}

.user-card-full .user-profile {
border-radius: 5px 0 0 5px;
}

.bg-c-lite-green {
/* background: -webkit-gradient(linear, left top, right top, from(#f29263), to(#ee5a6f));
  background: linear-gradient(to right, #ee5a6f, #f29263); */
background: #6d7fcc;
}

.m-b-25 {
margin-bottom: 25px;
}

.img-radius {
border-radius: 5px;
}

.card .card-block p {
line-height: 25px;
}

@media only screen and (min-width: 1400px) {
p {
  font-size: 14px;
}
}

.b-b-default {
border-bottom: 1px solid #e0e0e0;
}

.m-b-20 {
margin-bottom: 20px;
}

.p-b-5 {
padding-bottom: 5px !important;
}

.card .card-block p {
line-height: 25px;
}

.m-b-10 {
margin-bottom: 10px;
}

.text-muted {
color: #919aa3 !important;
}

.b-b-default {
border-bottom: 1px solid #e0e0e0;
}

.f-w-600 {
font-weight: 600;
}

.m-b-20 {
margin-bottom: 20px;
}

.m-t-40 {
margin-top: 20px;
}

.p-b-5 {
padding-bottom: 5px !important;
}

.m-b-10 {
margin-bottom: 10px;
}

.m-t-40 {
margin-top: 20px;
}

.user-card-full .social-link li {
display: inline-block;
}

.user-card-full .social-link li a {
font-size: 20px;
margin: 0 10px 0 0;
-webkit-transition: all 0.3s ease-in-out;
transition: all 0.3s ease-in-out;
}

.justify-content-space-between{
justify-content: space-between
}
.profile-close{
position: absolute;
  top: 10%;
  z-index: 9;
  left: 90%;
}
</style>
