import { Component } from '@angular/core';
import { NavParams,ViewController,PopoverController} from 'ionic-angular';
import {PopScoutPage} from '../pop-scout/pop-scout';

/**
 * Generated class for the ModalJogadoresPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal-jogadores',
  templateUrl: 'modal-jogadores.html',
})
export class ModalJogadoresPage {

  public time:any;

  constructor(public view: ViewController, public navParams: NavParams, public popoverCtrl:PopoverController) {
  }

  ionViewWillLoad() {
    this.time = this.navParams.get('dados_time');
    if(this.time.atletas && this.time.atletas.length>0){
      this.time.atletas.sort(function(a,b) {return (a.posicao_id > b.posicao_id) ? 1 : ((b.posicao_id > a.posicao_id) ? -1 : 0);} );
    }

  }

  closeModal(){
    this.view.dismiss();
  }

  showScout(atleta){
      let popover = this.popoverCtrl.create(PopScoutPage,{atleta:atleta});
      popover.present();
  }

}
