import { makeRequest, makeRequestDirect } from './internet.js'

export const userLoggedIn = setInterval(function () {
  // console.log("<<< Herer Check Cookies >>>")
  // console.log("window.$cookies.get('HUID')", window.$cookies.get('HUID'))
  // if (!window.$cookies.get('HUID')) {
  //     console.log("Here >>");
  //     // clearInterval(userLoggedIn)
  // }
  // else {
  //     console.log("else")
  // }
}, 60000)

// Vue Make global Fun for Favorite
export const onFavouriteHandler = function (data) {
  console.log('Here >> calling Favourite', data)
  // let token = null;
  // if(this.$persistStore.get("accessToken")){
  //     token = this.$persistStore.get("accessToken")
  // }else{
  //     EventBus.$emit("OpenModalPopUp", {
  //         modal : "#loginModal"});
  // }

  let payload = {
    access_token: data.token,
    MovieID: data.movieId,
    Like: 1
  }
  if (data.like == 'unlike') {
    payload.Like = 0
  }

  makeRequestDirect('/api/AddFavourite', 'POST', null, payload)
    .then(response => {
      console.log('favourite >>>', response)
    })
    .catch(error => {
      console.log('favourite API Error', error)
    })
}
