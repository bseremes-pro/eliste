import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: [
    './styles/connexion.page.scss'
  ]
})
export class ConnexionPage implements OnInit {
  loginForm: FormGroup;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email requis.' },
      { type: 'pattern', message: 'Email invalide.' }
    ],
    'password': [
      { type: 'required', message: 'Mot de passe requis.' },
      { type: 'minlength', message: 'Le mot de passe doit contenir au moins 5 symboles.' }
    ]
  };

  constructor(
    public router: Router,
    public menu: MenuController,
    public auth: AuthService
  ) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ]))
    });
  }

  ngOnInit(): void {
    this.menu.enable(false);
  }

  lancerConnexion(): void {
    if (this.loginForm.valid) {
      this.auth.seConnecter(this.loginForm.value);
    }
  }

  goToForgotPassword(): void {
    console.log('redirect to forgot-password page');
  }
}
