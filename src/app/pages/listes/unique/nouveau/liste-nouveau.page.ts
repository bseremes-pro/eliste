import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ModalController, IonRouterOutlet } from '@ionic/angular';

import { LivresService } from '../../listes.service';
import { ListesService } from '../../../../services/listes.service';

// import { BoutiqueProduitModel } from '../livre-details.model';
import { FirebaseCreateUserModal } from '../../pops/champs/liste-champs.modal';

import { DataStore } from '../../../../shell/data-store';

@Component({
  selector: 'app-liste-nouveau',
  templateUrl: './liste-nouveau.page.html',
  styleUrls: [
    './styles/liste-nouveau.page.scss',
    './styles/liste-nouveau.shell.scss',
  ],
})
export class LivreNouveauPage implements OnInit {
  createUserForm: FormGroup;
  schema = [];

  /* @HostBinding('class.is-shell') get isShell() {
    return ((this.boutique && this.boutique.isShell)) ? true : false;
  } */

  constructor(
    public firebaseService: LivresService,
    public listeService: ListesService,
    public router: Router,
    private route: ActivatedRoute,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet
  ) {}

  ngOnInit() {
    this.route.data.subscribe((resolvedRouteData) => {
      this.createUserForm = new FormGroup({
        titre: new FormControl('Nom de la liste', Validators.required),
        desc: new FormControl('Phrase de description de la liste...'),
        schema: new FormArray([]),
      });
    });
  }

  async creerChamps() {
    const modal = await this.modalController.create({
      component: FirebaseCreateUserModal,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });

    modal.onDidDismiss().then((avatar) => {
      if (avatar.data != null) {
        this.schema.push(avatar.data);
      }
    });
    await modal.present();
  }

  async modifierChamps(index) {
    const modal = await this.modalController.create({
      component: FirebaseCreateUserModal,
      componentProps: {
        champs: this.schema[index],
      },
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });

    modal.onDidDismiss().then((avatar) => {
      if (avatar.data != null) {
        this.schema[index] = avatar.data;
      }
    });
    await modal.present();
  }

  creer() {
    this.firebaseService
      .creerListe(
        Object.assign({}, this.createUserForm.value, { schema: this.schema })
      )
      .then((reponse) => {
        this.router.navigate(['app/listes/details', reponse.id]);
      });
  }

  annuler() {
    this.router.navigate(['app/listes']);
  }
}
