import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,LoadingController,ToastController,ModalController  } from 'ionic-angular';
import { CartolaServiceProvider } from '../../providers/cartola-service/cartola-service';
import { Storage } from '@ionic/storage';
import { ModalJogadoresPage } from '../modal-jogadores/modal-jogadores';

/**
 * Generated class for the TimesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-times',
  templateUrl: 'times.html',
})
export class TimesPage {

  public listaTimes: Array<any>=[];
  public listaTimesCadastrados : Array<any>=[];
  public mercadoStatus :any;
  public loading:any;
  public refresher:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
              public cartolaServiceProvider: CartolaServiceProvider, public loadingCtrl: LoadingController,
              public toastCtrl: ToastController, private storage: Storage, public modalCtrl:ModalController) {

    //inicializando storage
    /*this.storage.get('times_favoritos').then((data) => {
      if(data==null){
        this.listaTimesCadastrados=[];
      }
      else{
        this.listarTimesFavoritos();
      }
    });*/

    this.listarTimesFavoritos();

  }

  listarTimesFavoritos(){
      if(this.refresher==null){
        this.loading=this.loadingCtrl.create({
            content:'Carregando dados...'
          });
        this.loading.present();
      }


      this.storage.get('times_favoritos').then((data) => {
        if(data)
          this.listaTimesCadastrados=data;
        let timesValidados=[];

        this.cartolaServiceProvider.mercadoStatus().then(data => {
            if(data!=null){
                this.mercadoStatus=data;
                if(this.listaTimesCadastrados.length>0){
                  if(this.mercadoStatus.status_mercado==1 || this.mercadoStatus.status_mercado==2){
                    let self=this;
                    this.listaTimesCadastrados.forEach(function(item, index){
                      if((!item.atletas || !item.status_rodada || !item.rodada_time)||
                          (self.mercadoStatus.status_mercado!=item.status_rodada  || self.mercadoStatus.rodada_atual != item.rodada_time)){
                            self.cartolaServiceProvider.detalhesTime(item.slug).then(data => {
                              if(data && data.atletas){
                                item.atletas=data.atletas;
                              }
                              else
                              {
                                item.atletas=[];
                              }
                              item.rodada_time=self.mercadoStatus.rodada_atual ;
                              item.status_rodada =self.mercadoStatus.status_mercado;
                              timesValidados.push(item);

                              if(timesValidados.length==self.listaTimesCadastrados.length){
                                self.storage.set('times_favoritos', timesValidados);
                                self.preencherTimesFavorito(timesValidados);
                              }
                            });
                      }
                      else{
                        timesValidados.push(item);

                        if(timesValidados.length==self.listaTimesCadastrados.length){
                          self.storage.set('times_favoritos', timesValidados);
                          self.preencherTimesFavorito(timesValidados);
                        }
                      }
                    });
                  }
                }
                else{
                  if(this.refresher==null)
                    this.loading.dismiss();
                  else
                    this.refresher.complete();
                }
            }
            else{
              if(this.refresher==null)
                this.loading.dismiss();
              else
                this.refresher.complete();
            }



    		});
      });
  }

  preencherTimesFavorito(times:Array<any>){
    this.cartolaServiceProvider.parciais().then(data => {
      if(data!=null){
        let dadosParciais=data;

        times.forEach(function(item, index){
          let pontos=0;

          let atletas=item.atletas;

          atletas.forEach(function(item,index){
            if(item.clube_id!=1){
              //se parcial disponivel
              if(dadosParciais.hasOwnProperty(item.atleta_id)){
                item.pontos_num=dadosParciais[item.atleta_id].pontuacao;
                if(dadosParciais[item.atleta_id].scout){
                  item.scout=dadosParciais[item.atleta_id].scout;
                }
              }
            }
            pontos+=item.pontos_num==null?0.00:item.pontos_num;

            atletas[index]=item;
          });

          times[index].atletas=atletas;

          times[index].pontos=pontos

        });

        this.listaTimesCadastrados=times;
        if(this.refresher!=null)
          this.refresher.complete();
        else
          this.loading.dismiss();
      }
      else{
        if(this.refresher!=null)
          this.refresher.complete();
        else
          this.loading.dismiss();
      }


    });
  }


  showPesquisaTimePrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Buscar Time',
      message: "Informe o nome do seu time no cartola e toque em buscar.",
      inputs: [
        {
          name: 'nome',
          placeholder: 'Nome do time'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Buscar',
          handler: data => {
            this.buscarTime(data.nome);
          }
        }
      ]
    });
    prompt.present();
  }

  buscarTime(time:string){
    let loading=this.loadingCtrl.create({
  				content:'Realizando pesquisa...'
  			});
  		loading.present();

      this.cartolaServiceProvider.buscarTime(time).then(data => {
        if(data!=null && data.length==0){
          let alert = this.alertCtrl.create({
            title: 'Time não encontrado',
            subTitle: 'Não encontramos o seu time. Você digitou o nome dele corretamente?',
            buttons: ['OK']
          });
          alert.present();
        }
        this.listaTimes=data;
        loading.dismiss();
  		});
  }

  adicionarTime(time:any){

    this.storage.get('times_favoritos').then((data) => {
      let time_encontrato=[];

      if(data){
        time_encontrato = data.filter(function(item) {
            return item.time_id === time.time_id;
        });
      }
      else{
        data=[];
      }

      if(time_encontrato.length>0){
        let toast = this.toastCtrl.create({
          message: time.nome + " já cadastrado nos seus favoritos.",
          duration: 3000,
          cssClass: "toast-danger"
        });
        toast.present();
      }
      else{
        data.push(time);
        this.storage.set('times_favoritos', data);

        this.listaTimesCadastrados.push(time);

        let toast = this.toastCtrl.create({
          message: time.nome + " adicionado com sucesso aos seus favoritos.",
          duration: 2000
        });
        toast.present();

        this.listarTimesFavoritos();
      }
    });
  }

  removerTime(time:any){
    this.storage.get('times_favoritos').then((data) => {
      let arr = data.filter(function(item) {
          return item.time_id !== time.time_id;
      });

      this.storage.set('times_favoritos', arr);

      this.listaTimesCadastrados=arr;

      let toast = this.toastCtrl.create({
        message: time.nome + " removido com sucesso dos seus favoritos.",
        duration: 2000
      });
      toast.present();

      this.listarTimesFavoritos();
    });
  }

  modalJogadores(time:any){
    const modalJogadores= this.modalCtrl.create(ModalJogadoresPage,{dados_time:time});
    modalJogadores.present();
  }

  doRefresh(refresher) {
    this.refresher=refresher;
    this.listarTimesFavoritos();
  }

}
