// export const BASEURL = 'http://gogo-cinemacon.binarynumbers.io';
// export const BASEURL = 'http://gogocinema.binarynumbers.io';
// export const BASEURL = 'https://api.gogocinema.com';
// export const BASEURL = 'http://developmentgogocinema.binarynumbers.io';
// export const BASEURL = 'http://www.yogesh.com';
// export const BASEURL = 'https://api-uat.gogocinema.com';
// export const BASEURL = 'https://gogo-alpha-api.binarynumbers.io';
// export const BASEURL = 'http://13.228.128.234';
// export const BASEURL = 'http://api.gogocinema.com';

var url = '';
var stripePublicKey = '';
if (window.location.host === 'www.gogocinema.com') {
  url = 'https://api.gogocinema.com/api';
  stripePublicKey = 'pk_live_XmcqMGTPozqA2i9zxpyWzcwg004N11eO55';
} else if (window.location.host === 'test.gogocinema.com') {
  url = 'https://api.gogocinema.com/api';
  stripePublicKey = 'pk_live_XmcqMGTPozqA2i9zxpyWzcwg004N11eO55';
} else if (window.location.host === 'test-uat.gogocinema.com') {
  url = 'https://api-uat.gogocinema.com/api';
  stripePublicKey = 'pk_live_XmcqMGTPozqA2i9zxpyWzcwg004N11eO55';
} else {
  url = 'https://api-bnb.gogocinema.com/api';
  stripePublicKey = 'pk_test_ugVaLIFJmaQKYnVc71msZtST00aJhA3Tds';
}
export const URL_BASE = url;
export const STRIPE_PUBLIC_KEY = stripePublicKey;
export const PROJECT_TITLE = "GoGoCinema";
