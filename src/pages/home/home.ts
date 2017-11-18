import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { CartolaServiceProvider } from '../../providers/cartola-service/cartola-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	public mercadoStatus:any;
    public refresh:any;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public cartolaService: CartolaServiceProvider) {
    this.buscarDadosMercado();
  }

  buscarDadosMercado():void{
    let loading;

    if(this.refresh==null){
        loading=this.loadingCtrl.create({
    				content:'Carregando dados...'
    			});
    		loading.present();
    }

    this.cartolaService.mercadoStatus().then(data => {
      this.mercadoStatus=data;
      if(this.refresh!=null)
        this.refresh.complete();
      else
        loading.dismiss();
     });
  }

  doRefresh(refresher):void{
      this.refresh=refresher;
      this.buscarDadosMercado();
  }

}
