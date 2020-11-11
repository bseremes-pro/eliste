import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import * as dayjs from 'dayjs';
import { ListesService } from '../../../../services/listes.service';

@Component({
  selector: 'app-liste-champs',
  templateUrl: './liste-champs.modal.html',
  styleUrls: [
    './styles/liste-champs.modal.scss',
    './styles/liste-champs.shell.scss',
  ],
})
export class FirebaseCreateUserModal implements OnInit {
  createUserForm: FormGroup;
  skills = [];
  listeChampsTypes = [];

  champs: any;

  constructor(
    private modalController: ModalController,
    public listeService: ListesService
  ) {}

  ngOnInit() {
    this.listeChampsTypes = this.listeService.getListe('CHAMPS_TYPES');

    this.createUserForm = new FormGroup({
      label: new FormControl(
        this.champs ? this.champs.label : '',
        Validators.required
      ),
      type: new FormControl(
        this.champs ? this.champs.type : '',
        Validators.required
      ),
    });
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  createUser() {
    this.modalController.dismiss(this.createUserForm.value);
  }
}
