import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PopScoutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-pop-scout',
  templateUrl: 'pop-scout.html',
})
export class PopScoutPage {
  public atleta:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
    this.atleta = this.navParams.get('atleta');
    console.log(this.atleta.scout);
  }

}
