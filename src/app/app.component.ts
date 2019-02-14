import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';

const {SplashScreen, StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    // private splashScreen: SplashScreen,
    // private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    SplashScreen.hide().catch(error => {
      console.error(error);
    });

    StatusBar.hide().catch(error => {
      console.error(error);
    });
  }

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     // this.statusBar.styleDefault();
  //     // this.splashScreen.hide();
  //   });
  // }
}
