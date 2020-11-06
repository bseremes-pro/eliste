import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormGroup, FormControl, FormArray } from '@angular/forms';

import { LivresService } from '../../listes.service';
import { ListesService } from '../../../../services/listes.service';

// import { BoutiqueProduitModel } from '../livre-details.model';

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

  /* @HostBinding('class.is-shell') get isShell() {
    return ((this.boutique && this.boutique.isShell)) ? true : false;
  } */

  constructor(
    public firebaseService: LivresService,
    public listeService: ListesService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((resolvedRouteData) => {
      this.createUserForm = new FormGroup({
        titre: new FormControl('Ma liste', Validators.required),
        desc: new FormControl(
          'Une phrase sans verbe de description de ma liste...'
        ),
      });
    });
  }

  createUser() {
    this.firebaseService
      .creerListe(this.createUserForm.value)
      .then((reponse) => {
        this.router.navigate(['app/listes/details', reponse.id]);
      });
  }

  annuler() {
    this.router.navigate(['app/listes']);
  }
}
