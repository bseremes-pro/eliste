import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import {
  ModalController,
  AlertController,
  IonRouterOutlet,
} from '@ionic/angular';

import { LivresService } from '../../listes.service';
import { ListesService } from '../../../../services/listes.service';

import { LivreCompletModel } from '../liste-details.model';
import { FirebaseCreateUserModal } from '../../pops/champs/liste-champs.modal';

import { DataStore, ShellModel } from '../../../../shell/data-store';
import { takeUntil, catchError } from 'rxjs/operators';
import { EMPTY, Subject } from 'rxjs';

@Component({
  selector: 'app-liste-edition',
  templateUrl: './liste-edition.page.html',
  styleUrls: [
    './styles/liste-edition.page.scss',
    './styles/liste-edition.shell.scss',
  ],
})
export class LivreEditionPage implements OnInit, OnDestroy {
  livre: LivreCompletModel;

  editionLivreForm: FormGroup;

  listeLangues = [];
  listeGenres = [];
  listeOrigines = [];

  imgURL: any;
  selectedFile: File;

  destroy$: Subject<null> = new Subject();
  submitted = false;

  @HostBinding('class.is-shell') get isShell() {
    return this.livre &&
      this.livre
        .isShell /* || (this.relatedUsers && this.relatedUsers.isShell) */
      ? true
      : false;
  }

  constructor(
    public alertController: AlertController,
    public livresService: LivresService,
    public listesService: ListesService,
    public router: Router,
    private route: ActivatedRoute,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet
  ) {}

  ngOnInit() {
    this.route.data.subscribe((resolvedRouteData) => {
      const resolvedDataStores = resolvedRouteData['data'];

      const completDataStore: DataStore<LivreCompletModel> =
        resolvedDataStores.livre;
      completDataStore.state.subscribe((state) => {
        this.livre = state;

        this.editionLivreForm = new FormGroup({
          titre: new FormControl(this.livre.titre, Validators.required),
          desc: new FormControl(this.livre.desc),
        });
      });
    });
  }

  ngOnDestroy() {
    this.destroy$.next(null);
  }

  async creerChamps() {
    const modal = await this.modalController.create({
      component: FirebaseCreateUserModal,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });

    modal.onDidDismiss().then((avatar) => {
      if (avatar.data != null) {
        this.livre.schema.push(avatar.data);
      }
    });
    await modal.present();
  }

  async modifierChamps(index) {
    const modal = await this.modalController.create({
      component: FirebaseCreateUserModal,
      componentProps: {
        champs: this.livre.schema[index],
      },
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });

    modal.onDidDismiss().then((avatar) => {
      if (avatar.data != null) {
        this.livre.schema[index] = avatar.data;
      }
    });
    await modal.present();
  }

  annuler() {
    this.router.navigate(['app/listes/details', this.livre.id]);
  }

  modifier() {
    this.livre.titre = this.editionLivreForm.value.titre;
    this.livre.desc = this.editionLivreForm.value.desc;

    this.livresService.modifierListe(this.livre).then(
      (result) => {
        this.router.navigate(['app/listes/details', this.livre.id]);
      },
      (err) => console.log(err)
    );
  }
}
