import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-reinitialisation-mdp',
  templateUrl: './reinitialisation-mdp.page.html',
  styleUrls: [
    './styles/reinitialisation-mdp.page.scss'
  ]
})

export class ReinitialisationMdpPage implements OnInit {
  forgotPasswordForm: FormGroup;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email requis.' },
      { type: 'pattern', message: 'Email invalide.' }
    ]
  };

  constructor(
    public router: Router,
    public menu: MenuController
  ) {
    this.forgotPasswordForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }

  ngOnInit(): void {
    this.menu.enable(false);
  }

  recoverPassword(): void {
    console.log(this.forgotPasswordForm.value);
    this.router.navigate(['app/categories']);
  }

}
