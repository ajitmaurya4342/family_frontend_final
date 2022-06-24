<template>
  <div>
    <div class="wrapper">
      <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div :class="showToglebar ? 'background-blurr' : ''"></div>
      <!-- Sidebar  -->
      <div
        id="sidebar"
        :class="showToglebar ? 'active' : 'order-last'"
        v-if="showToglebar"
      >
        <div
          class="sidebar-header justify-content-center position-relative"
          v-if="!showProfile"
        >
          <h5>{{ editProfile ? "Update User Detail" : "Add New User" }}</h5>
          <h5 class="close-header" @click="showToglebarttt">
            <img
              src="../../assets/img/Close-298.png"
              alt="Close"
              class="close_icon_header"
            />
          </h5>
        </div>

        <b-container class="my-4 sidebar_main_container" v-if="!showProfile">
          <b-row class="my-2" v-if="storeParentDetail">
            <b-col sm="12">
              <label class="label_header"
                >Creating Children of
                {{ storeParentDetail.parent_detail.first_name }}
                {{ storeParentDetail.parent_detail.last_name }}</label
              >
            </b-col>
          </b-row>

          <b-row class="my-2" v-if="!is_son_or_daughter">
            <b-col sm="12">
              <label class="label_header">
                {{ userForm.gender == "Female" ? "Wife Of " : "Husband Of" }}
                {{ userDetail.relation_of }}</label
              >
            </b-col>
          </b-row>
          <b-row class="my-2">
            <b-col sm="12">
              <b-form-input
                class="custom_input_class"
                placeholder="Enter Your First Name"
                v-model="userForm.first_name"
              ></b-form-input>
            </b-col>
          </b-row>

          <b-row class="my-2">
            <b-col sm="12">
              <b-form-input
                class="custom_input_class"
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

            <b-row class="">
              <b-col sm="12">
                <b-form-group
                  label="Marial Status:"
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

           <b-row class="my-2" v-if="is_son_or_daughter">
             <b-col sm="12">
              <label class="title-input">Child Order</label>
            </b-col>
            <b-col sm="12">
              <b-form-input
                type="number"
                class="custom_input_class"
                placeholder="Enter Your Order Child"
                v-model="userForm.order_child"
              ></b-form-input>
            </b-col>
          </b-row>

          <b-row class="my-2">
           
            <b-col sm="12">
              <b-form-input
                class="custom_input_class"
                placeholder="Enter Your Email"
                type="email"
                v-model="userForm.email"
              ></b-form-input>
            </b-col>
          </b-row>

          <b-row class="my-2">
            <b-col sm="12">
              <b-form-input
                class="custom_input_class"
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
              <b-form-input
                type="date"
                class="custom_input_class"
                v-model="userForm.dob"
              ></b-form-input>
            </b-col>
          </b-row>

          <b-row class="my-2">
            <b-col sm="12">
              <label class="title-input">Date of Death</label>
            </b-col>
            <b-col sm="12">
              <b-form-input
                class="custom_input_class"
                type="date"
                v-model="userForm.dod"
              ></b-form-input>
            </b-col>
          </b-row>

          <b-row class="my-2">
            <b-col sm="8">
              <div class="custom_input_class">
                <b-form-file
                  v-model="userForm.picture"
                  v-on:change="uploadProfile($event.target)"
                  accept="image/png, image/gif, image/jpeg"
                  placeholder="Upload Your Profile"
                ></b-form-file>
              </div>
            </b-col>
            <b-col sm="4" v-if="userForm.picture">
              <img
                :src="baseUrl + userForm.picture"
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
              <b-form-textarea
                class="custom_input_class"
                v-model="userForm.description"
              ></b-form-textarea>
            </b-col>
          </b-row>

          <b-row class="my-2">
            <b-col sm="12" class="text-center">
              <button
                type="button"
                class="btn save_btn"
                @click="saveUser"
                :disabled="isSaveButtonEnable"
              >
                <img src="../../assets/img/Save.png" alt="" class="save_icon" />
                Save
              </button>
            </b-col>
          </b-row>
        </b-container>
        <div id="" class="" v-if="showProfile">
          <div class="show_profile_class">
            <div class="row d-flex justify-content-center padding-0">
              <div class="col-12 padding-0 sub_container_profile">
                <div class="card user-card-full">
                  <h5
                    class="close-header profile-close"
                    @click="showToglebarttt"
                  >
                    <img
                      src="../../assets/img/Close-298.png"
                      alt="Close"
                      class="close_icon_header"
                    />
                  </h5>
                  <div class="row m-l-0 m-r-0">
                    <div class="col-sm-12 user-profile padding-0">
                      <div class="card-block text-center  user_profile_info">
                        <div class="">
                          <img
                            v-if="userForm.picture"
                            :src="baseUrl + userForm.picture"
                            alt="User-Profile-Image"
                            class=" img-responsive mt-3"
                          />
                        </div>
                        <h6 class="f-w-600 m-0 text-white profile_text py-3">
                          {{ userForm.first_name }} {{ userForm.last_name }}
                        </h6>
                        <!-- <p>Web Designer</p> -->
                      </div>
                    </div>
                  </div>
                </div>
                <div class="content-details">
                  <div class="d-flex my-3 mx-2 justify-content-space-between">
                    <div class="title-texxxt">Email</div>
                    <div class="title-texxxt-val">
                      {{ userForm.email ? userForm.email : "Not Mentioned" }}
                    </div>
                  </div>
                  <hr />

                  <div class="d-flex my-3 mx-2 justify-content-space-between">
                    <div class="title-texxxt">Phone No</div>
                    <div class="title-texxxt-val">
                      {{
                        userForm.phone_number
                          ? userForm.phone_number
                          : "Not Mentioned"
                      }}
                    </div>
                  </div>
                  <hr />

                  <div class="d-flex my-3 mx-2 justify-content-space-between">
                    <div class="title-texxxt">Date Of Birth</div>
                    <div class="title-texxxt-val">
                      {{
                        userForm.dob
                          ? moment(userForm.dob).format("DD,MMM YYYY")
                          : "Not Mentioned"
                      }}
                    </div>
                  </div>
                  <hr />

                  <div class="d-flex my-3 mx-2 justify-content-space-between">
                    <div class="title-texxxt">Date of Death</div>
                    <div class="title-texxxt-val">
                      {{
                        userForm.dod
                          ? moment(userForm.dod).format("DD,MMM YYYY")
                          : "Not Mentioned"
                      }}
                    </div>
                  </div>
                  <hr />

                  <div class="d-flex my-3 mx-2 justify-content-space-between">
                    <div class="title-texxxt">About</div>
                    <div class="title-texxxt-val">
                      {{
                        userForm.description
                          ? userForm.description
                          : "Not Mentioned"
                      }}
                    </div>
                  </div>
                  <hr />
                </div>

                <b-row class="my-5">
                  <b-col sm="12" class="text-center">
                    <button
                      type="button"
                      class="btn update_btn update_btn_border"
                      @click="toEditProfile"
                    >
                      <img
                        src="../../assets/img/Data-Edit-148.png"
                        alt=""
                        class="update_icon"
                      />
                      Edit
                    </button>
                  </b-col>
                </b-row>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Page Content  -->
      <div id="content">
        <nav
          class="navbar navbar-expand-lg navbar-light bg-light justify-content-center align-items-center  py-md-2"
        >
          <div class="text-center">
            <div class="family_header">
              <span>Shroff Family Tree</span>
              <div class="line_bg_gradient mb-md-1"></div>
              <div class="line_bg_gradient d-none d-md-block mb-md-2"></div>
            </div>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="nav navbar-nav ml-auto">
                <!-- <li class="nav-item active">
                              <a class="nav-link" href="#">Page</a>
                          </li> -->
              </ul>
            </div>
          </div>
        </nav>

        <div class="mx-2 my-3">
          <VueFamilyTree
            :tree="tree2"
            :enable-drag="true"
            id="familyTree"
            class=" click_trigger"
            :wrapper-styles="{
              position: 'relative',
              width: '100%',
              height: dynamicheight
            }"
            @card-click="cardClick"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueFamilyTree from "vue-family-tree";
import axios from "axios";
import moment from "moment";
import { URL_BASE } from "@/helper/constants";
import _ from "lodash";

export default {
  data() {
    return {
      pageName: "",
      onLine: navigator.onLine,
      // onLine: false,
      showBackOnline: false,
      tree1: [
        {
          firstPerson: {
            name: "John Walker",
            image: "https://picsum.photos/300/300?random=1"
          },
          secondPerson: {
            name: "Jannet Grem",
            image: "https://picsum.photos/300/300?random=2"
          },
          children: [
            {
              firstPerson: {
                name: "Katia",
                image: "https://picsum.photos/300/300?random=1"
              },
              secondPerson: {
                name: "Oleg",
                image: "https://picsum.photos/300/300?random=1"
              },
              user_id: "1"
            },
            {
              firstPerson: {
                name: "Vitia",
                image: "https://picsum.photos/300/300?random=1"
              },
              secondPerson: {
                name: "Dasha222",
                image: "https://picsum.photos/300/300?random=1"
              },
              user_id: "2"
            },
            {
              firstPerson: {
                name: "Antonio Wild",
                image: "https://picsum.photos/300/300?random=3"
              },
              secondPerson: {
                name: "Olivia Olson",
                image: "https://picsum.photos/300/300?random=1"
              },
              user_id: "3"
            }
          ]
        }
      ],
      tree2: [],
      refresh: true,
      showToglebar: true,
      userForm: {
        user_id: "",
        first_name: "",
        description: "",
        last_name: "",
        phone_number: "",
        email: "",
        dob: "",
        dod: "",
        picture: "",
        is_married: "",
        gender: "",
        order_child:0
      },
      editProfile: false,
      is_son_or_daughter: true,
      userDetail: null,
      storeParentDetail: null,
      checkChildrenExist: false,
      baseUrl: URL_BASE,
      userlevel: 0,
      is_admin_page: false,
      showProfile: false,
      audioMute: true
    };
  },
  mounted() {
     setInterval(z=>{
        if(this.showProfile || this.editProfile){
          this.audioMute=true
        }else{
          this.audioMute=false
          this.sound.play();
          console.log("Sound Play")
        }
        
      },5000)
       if(screen.width>768){
          let element=document.getElementById("familyTree")
         element.classList.add("Family-tree");
       
       }
  },

  components: {
    VueFamilyTree
  },
  computed: {
    dynamicheight() {
      let heightOfDiv = this.userlevel >= 4 ? this.userlevel * 250 + 200 : 800;
      console.log(this.userlevel);
      return `${heightOfDiv}px`;
    },
    isSaveButtonEnable() {
      let check = false;
      let validation = ["first_name", "last_name", "gender", "is_married"];
      validation.map(z => {
        if (!this.userForm[z]) {
          check = true;
        }
      });
      if (this.userForm.first_name < 3 || this.userForm.last_name < 3) {
        check = true;
      }

      return check;
    }
  },

  name: "app",
  beforeDestroy() {
    window.removeEventListener("online", this.updateOnlineStatus);
    window.removeEventListener("offline", this.updateOnlineStatus);
  },
  beforeMount() {
    this.is_admin_page = window.location.pathname.includes("dmin");
    console.log(this.is_admin_page);
    this.resetList();
    this.playSound();
   
       
  },
  watch: {
    audioMute(val) {
      console.log(val, "vall");
      this.audioMute = val;
      this.audioMute ? this.sound.pause() : this.sound.play();
    }
  },
  methods: {
    moment,
    playSound() {
      this.sound = new Audio(
       `${URL_BASE}/AUD-20220620-WA0065.mp3`
      );
      // sound.muted = this.audioMute;
      this.audioMute ? this.sound.pause() : this.sound.play();
      this.sound.autoplay = true;
      // sound.play();
      this.sound.loop = true;
    },
    resetList() {
      this.getHeirachy();
      this.showToglebarttt();
      this.resetForm();
    },
    toEditProfile() {
      window.scrollTo(200, 0);
      this.showProfile = !this.showProfile;
      this.editProfile = !this.editProfile;
    },
    resetForm() {
      this.editProfile = false;
      this.showProfile = false;
      this.is_son_or_daughter = true;
      this.userDetail = null;
      this.checkChildrenExist = false;
      Object.keys(this.userForm).map(z => {
        if(z=='order_child'){
        this.userForm[z] = 0;
        }else{
           this.userForm[z] = "";
        }
      
      });
    },
    saveUser() {
      this.showLoading();
      var config = {
        method: "post",
        url: `${URL_BASE}/admin/addEditUsers/1`,
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(this.userForm)
      };
      axios(config)
        .then(response => {
          let { data } = response;
          this.hideLoading();
          if (data.status) {
            this.linkRelationOnlySonAndDaughter(data.Records[0].user_id).then(
              response => {
                this.$toasted.show(data.message, { type: "success" });
                this.resetList();
              }
            );
          } else {
            this.$toasted.show(
              data.message || data.msg || "Something Went Wrong",
              { type: "error" }
            );
          }
          // this.tree2=arrayNew

          this.$forceUpdate();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    linkRelationOnlySonAndDaughter(user_id) {
      return new Promise(resolve => {
        if (this.storeParentDetail) {
          let obj = {
            parent_id: this.storeParentDetail.parent_detail.user_id
          };
          if (this.userForm.gender == "Male") {
            obj["is_son_of"] = "Y";
          } else {
            obj["is_daughter_of"] = "Y";
          }

          console.log("Request Link", obj);
          var config = {
            method: "post",
            url: `${URL_BASE}/admin/linkRelation/${user_id}/1`,
            data: JSON.stringify(obj),
            headers: {
              "Content-Type": "application/json"
            }
          };
          axios(config)
            .then(response => {
              console.log(response, "Relation Link");
              if (data.status) {
                return resolve(true);
              } else {
                return resolve(false);
              }
            })
            .catch(function(error) {
              return resolve(false);
            });
        } else {
          console.log("No Relation Changed");
          return resolve(true);
        }
      });
    },
    uploadProfile: function(image) {
      var file = image.files[0];
      console.log(file, " //   var formdata = new FormData()");
      //     formData.append("image", image, filename);
      //     formData.append("imagePath", "Gallery Image");
      //     formData.append("height", 1);
      //     formData.append("width", 1);
      //   formData.append("size",1);
      //  var axios = require('axios')")

      var data = new FormData();
      data.append("image", file);
      data.append("height", "24");
      data.append("width", "16");
      data.append("imagePath", "Gallery Image");
      data.append("size", "314");

      var config = {
        method: "post",
        url: `${URL_BASE}/admin/uploadimage`,
        headers: {},
        data: data
      };

      axios(config)
        .then(response => {
          this.userForm.picture = `${response.data.path}`;
          // console.log(JSON.stringify(response.data));
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    showToglebarttt(item) {
      this.audioMute = !this.audioMute;
      if (item && item.hasOwnProperty("parent_detail")) {
        window.scrollTo(200, 0);
        this.storeParentDetail = item;
        this.userForm.last_name = item.parent_detail.last_name;
      } else {
        this.storeParentDetail = null;
        this.resetForm();
      }

      if (item && item.hasOwnProperty("user_detail")) {
        this.is_son_or_daughter = item.is_son_or_daugter;
        this.checkChildrenExist = item.checkChildrenExist;
        if(screen.width>768){
        window.scrollTo(200, 0);

        }

        this.userDetail = item.user_detail;
        if (this.is_admin_page) {
          this.editProfile = true;
        } else {
          this.showProfile = true;
        }

        Object.keys(this.userForm).map(z => {
          this.userForm[z] = this.userDetail[z];
        });

        if(screen.width<768){
          document.getElementsByTagName("meta")[2].setAttribute("content","initial-scale=1.0")
          window.scrollTo(200, 0);
        }

      }else{
         if(screen.width<768){
          document.getElementsByTagName("meta")[2].setAttribute("content","initial-scale=0.25")
           window.scrollTo(0, 0);
        }
      }

      this.showToglebar = !this.showToglebar;
    },
    setChildren(z) {
      this.userlevel =
        z.user_level && z.user_level > this.userlevel
          ? z.user_level
          : this.userlevel;

      if (z.is_married == "Y") {
        if (z.children.length > 0) {
          z.children = _.orderBy(z.children, ["sorting_order_child", "asc"]);
        }
        if (z.hasOwnProperty("children")) {
          if (z.children.length == 0) {
            let obj = {
              firstPerson: {
                name: "Add New Child",
                image: `${URL_BASE}/plus-image.png`,
                parent_detail: {
                  ...z
                }
              }
            };

            if (this.is_admin_page) {
              z.children.push(obj);
            }
          } else {
            let obj = {
              firstPerson: {
                name: "Add New Child",
                image: `${URL_BASE}/plus-image.png`,
                parent_detail: {
                  ...z
                }
              }
            };
            z.children.map(k => {
              this.setChildren(k);
            });
            if (this.is_admin_page) {
              z.children.push(obj);
            }
          }
        }
      }
    },
    redirectUrlLink() {
      window.open("http://localhost:8081");
    },
    getHeirachy() {
      this.showLoading();
      var config = {
        method: "get",
        url: `${URL_BASE}/admin/getHeirachy/1`
      };
      axios(config)
        .then(response => {
          let arrayNew = [...response.data.Records];

          arrayNew.map(z => {
            this.setChildren(z);
          });

          this.tree2 = arrayNew;

          this.hideLoading();

          this.$forceUpdate();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    cardClick(item) {
      console.log(item);

      this.showToglebarttt(item);
    },
    updateOnlineStatus(e) {
      const { type } = e;
      this.onLine = type === "online";
    }
  }
};
</script>

<style>
.vue-family-card__name a {
  /* font-family: "Allura", cursive !important; */
  font-weight: 800 !important;
  /* color: #ef7c8e !important; */
  /* font-size: 35px; */
}
/* .order-last {
  position: absolute;
  left: -50%;
  top: 0%;
}
.active .order-last {
  left: 180%;
  top: 0%;
  width: 100%;
} */
.vue-family-tree {
  overflow: scroll !important;
  /* height:1200px !important; */
}
.Family-tree {
  zoom: 0.35;
}
@media (max-width: 768px) {
  .Family-tree {
    zoom: 0.25;
  }
}
.zoom-8 {
  zoom: 0.55;
}
.vue-family-card__image {
  border: 5px solid #ef7c8e;
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
  /* background-color: #000000 !important; */
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
  height: 90px;
  width: 90px;
  border-radius: 90px;
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

.justify-content-space-between {
  justify-content: space-between;
}
.profile-close {
  position: absolute;
  top: 10%;
  z-index: 9;
  left: 90%;
  transition: 0.8s;
  background:#000
}

.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.8);
  animation: animate 25s linear infinite;
  bottom: -150px;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}
#sidebar {
  position: absolute !important;
  right: -50% !important;
  top: 0 !important;
  transform: translate(0%, 0%) !important;
  height: 100%;
  min-width: 400px;
  max-width: 400px;
  background: #fff;
  color: #000;
  font-weight: bold;
  transition: 0.8s !important;
  /* background: url("../img/texture_img.jpg"); */
  /* background: linear-gradient(-75deg, #e93b81, #f5abc9, #ffe5e2) repeat; */
  background: linear-gradient(-75deg, #ffaebc, #a0e7e5, #b4f8c8, #fbe7c6) repeat;
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}
.user_profile,
.user-card-full,
.user_profile_info {
  /* background: url("../img/border_texture.jpg") !important; */
  box-shadow: none !important;
  background: rgb(0 123 255 / 0%) !important;
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  background-repeat: no-repeat !important;
  background-size: cover !important;
}

@keyframes animate {
  0% {
    transform: translateY(-1000px) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  100% {
    transform: translateY(0) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}
</style>
