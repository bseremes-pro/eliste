import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, MenuController } from '@ionic/angular';

import { TermsOfServicePage } from '../../terms-of-service/terms-of-service.page';
import { PrivacyPolicyPage } from '../../privacy-policy/privacy-policy.page';
import { PasswordValidator } from '../../validators/password.validator';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./styles/inscription.page.scss'],
})
export class InscriptionPage implements OnInit {
  signupForm: FormGroup;
  matching_passwords_group: FormGroup;

  validation_messages = {
    email: [
      { type: 'required', message: 'Email requis.' },
      { type: 'pattern', message: 'Email invalide.' },
    ],
    password: [
      { type: 'required', message: 'Mot de passe requis.' },
      {
        type: 'minlength',
        message: 'Le mot de passe doit contenir au moins 5 symboles.',
      },
    ],
    confirm_password: [
      { type: 'required', message: 'Veuillez confirmer le mot de passe' },
    ],
    matching_passwords: [
      { type: 'areNotEqual', message: 'Les mots de passe sont différents' },
    ],
  };

  constructor(
    public router: Router,
    public modalController: ModalController,
    public menu: MenuController,
    public auth: AuthService
  ) {
    this.matching_passwords_group = new FormGroup(
      {
        password: new FormControl(
          '',
          Validators.compose([Validators.minLength(5), Validators.required])
        ),
        confirm_password: new FormControl('', Validators.required),
      },
      (formGroup: FormGroup) => {
        return PasswordValidator.areNotEqual(formGroup);
      }
    );

    this.signupForm = new FormGroup({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      matching_passwords: this.matching_passwords_group,
    });
  }

  ngOnInit(): void {
    this.menu.enable(false);
  }

  async showTermsModal() {
    const modal = await this.modalController.create({
      component: TermsOfServicePage,
    });
    return await modal.present();
  }

  async showPrivacyModal() {
    const modal = await this.modalController.create({
      component: PrivacyPolicyPage,
    });
    return await modal.present();
  }

  lancerInscription(): void {
    if (this.signupForm.valid && this.matching_passwords_group.valid) {
      const infos = {
        email: this.signupForm.value.email,
        password: this.matching_passwords_group.value.password,
      };
      this.auth.sInscrire(infos);
    }
  }
}
