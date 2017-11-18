import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { TimesPage } from '../pages/times/times';
import { ModalJogadoresPage } from '../pages/modal-jogadores/modal-jogadores';
import { PopScoutPage } from '../pages/pop-scout/pop-scout';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CartolaServiceProvider } from '../providers/cartola-service/cartola-service';
import { FormatarNumeroPipe } from '../pipes/formatar-numero/formatar-numero';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    TimesPage,
    FormatarNumeroPipe,
    ModalJogadoresPage,
    PopScoutPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    TimesPage,
    ModalJogadoresPage,
    PopScoutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CartolaServiceProvider
  ]
})
export class AppModule {}
