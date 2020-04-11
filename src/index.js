import Phaser from "phaser";
import config from "./config";
import "./styles/index.scss";

new Phaser.Game(config);

function onDeviceReady() {
  document.removeEventListener("deviceready", onDeviceReady, false);

  let adPublisherIds = {
      ios: {
        banner: "ca-app-pub-3023793039344798~8524973962",
        interstitial: "ca-app-pub-3023793039344798/4585728954",
      },
      android: {
        banner: "ca-app-pub-3023793039344798~2526541821",
        interstitial: "ca-app-pub-3023793039344798/4769561780",
      },
    },
    admobid = /(android)/i.test(navigator.userAgent)
      ? adPublisherIds.android
      : adPublisherIds.ios;

  // Set AdMobAds options:
  admob.setOptions({
    publisherId: admobid.banner, // Required
    interstitialAdId: admobid.interstitial, // Optional
    autoShowBanner: true, // Optional
    autoShowRInterstitial: false, // Optional
    autoShowRewarded: false, // Optional
    //   tappxIdiOS:            "/XXXXXXXXX/Pub-XXXX-iOS-IIII",            // Optional
    //   tappxIdAndroid:        "/XXXXXXXXX/Pub-XXXX-Android-AAAA",        // Optional
    //   tappxShare:            0.5                                        // Optional
  });

  // Request interstitial ad (will present automatically when autoShowInterstitial is set to true)
  //   admob.requestInterstitialAd();
}

document.addEventListener("deviceready", onDeviceReady, false);
