import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

import { LivresService } from '../../listes.service';
import { LivreCompletModel } from '../liste-details.model';

import { DataStore } from '../../../../shell/data-store';

@Component({
  selector: 'app-liste-details',
  templateUrl: './liste-details.page.html',
  styleUrls: [
    './styles/liste-details.page.scss',
    './styles/liste-details.shell.scss',
  ],
})
export class LivreDetailsPage implements OnInit {
  produit: LivreCompletModel;

  audio;

  @HostBinding('class.is-shell') get isShell() {
    return this.produit && this.produit.isShell ? true : false;
  }

  constructor(
    public firebaseService: LivresService,
    public router: Router,
    private route: ActivatedRoute,
    public actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {
    this.route.data.subscribe((resolvedRouteData) => {
      const resolvedDataStores = resolvedRouteData['data'];
      const combinedDataStore: DataStore<LivreCompletModel> =
        resolvedDataStores.user;

      combinedDataStore.state.subscribe((state) => {
        this.produit = state;
      });
    });
  }

  async interagir() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Que faire avec cette liste ?',
      buttons: [
        {
          text: 'Éditer',
          icon: 'brush-outline',
          handler: () => {
            this.router.navigate(['app/listes/edition', this.produit.id]);
          },
        },
        {
          text: 'Publier',
          icon: 'basket-outline',
          handler: () => {
            console.log('Publication à venir');
          },
        },
        {
          text: 'Suivre',
          icon: 'eye-outline',
          handler: () => {
            console.log('Suivi à venir');
          },
        },
        {
          text: 'Retour',
          icon: 'close',
          role: 'cancel',
          handler: () => {},
        },
      ],
    });
    await actionSheet.present();
  }
}
