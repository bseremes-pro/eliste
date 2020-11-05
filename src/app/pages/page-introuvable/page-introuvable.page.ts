import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'page-introuvable',
  templateUrl: './page-introuvable.page.html',
  styleUrls: [
    './styles/page-introuvable.page.scss'
  ]
})
export class PageIntrouvable implements OnInit {

  constructor(public menu: MenuController) { }

  ngOnInit(): void {
    this.menu.enable(false);
  }
}
