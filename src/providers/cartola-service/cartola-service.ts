import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the CartolaServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CartolaServiceProvider {

  private url: string ="http://192.34.58.115/cartola.php?servico=";

  constructor(public http: Http,public alertCtrl: AlertController) {}

  mercadoStatus(): Promise<any> {
      return new Promise(resolve => {
          this.http.get(this.url+"mercado_status").map(res => res.json())
          .subscribe(data => {
              resolve(data);
          }, err => {this.alertCtrl.create({
                                              title: 'Erro',
                                              subTitle: 'Não foi possível realizar busca, você esta conectado na internet?',
                                              buttons: ['OK']
                                            }).present(); resolve(null);});
      });
  }

  buscarTime(time:string): Promise<any> {
      return new Promise(resolve => {
          this.http.get(this.url+"buscar_time&nome="+time).map(res => res.json())
          .subscribe(data => {
              resolve(data);
          }, err => {this.alertCtrl.create({
                                            title: 'Erro',
                                            subTitle: 'Não foi possível realizar busca, você esta conectado na internet?',
                                            buttons: ['OK']
                                          }).present(); resolve(null);});
      });
  }

  detalhesTime(slugTime:string): Promise<any> {
      return new Promise(resolve => {
          this.http.get(this.url+"dados_times&slug="+slugTime).map(res => res.json())
          .subscribe(data => {
              resolve(data);
          }, err => {this.alertCtrl.create({
                                            title: 'Erro',
                                            subTitle: 'Não foi possível realizar busca, você esta conectado na internet?',
                                            buttons: ['OK']
                                          }).present(); resolve(null);});
      });
  }

  parciais(): Promise<any> {
      return new Promise(resolve => {
          this.http.get(this.url+"parciais").map(res => res.json())
          .subscribe(data => {
              resolve(data);
          }, err => {this.alertCtrl.create({
                                            title: 'Erro',
                                            subTitle: 'Não foi possível realizar busca, você esta conectado na internet?',
                                            buttons: ['OK']
                                          }).present(); resolve(null);});
      });
  }

}
