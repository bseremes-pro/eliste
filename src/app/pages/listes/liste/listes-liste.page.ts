import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MenuController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { Observable, ReplaySubject, Subscription, merge } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { LivresService } from '../listes.service';
import { LivreBaseModel } from '../liste.model';

import { DataStore, ShellModel } from '../../../shell/data-store';

@Component({
  selector: 'app-listes-liste',
  templateUrl: './listes-liste.page.html',
  styleUrls: [
    './styles/listes-liste.page.scss',
    './styles/listes-liste.ios.scss',
    './styles/listes-liste.shell.scss',
  ],
})
export class LivresListePage implements OnInit, OnDestroy {
  requete: string;

  rechercheSubject: ReplaySubject<any> = new ReplaySubject<any>(1);
  rechercheFiltresObservable: Observable<
    any
  > = this.rechercheSubject.asObservable();

  livresDataStore: DataStore<Array<LivreBaseModel>>;
  stateSubscription: Subscription;

  // Use Typescript intersection types to enable docorating the Array of firebase models with a shell model
  // (ref: https://www.typescriptlang.org/docs/handbook/advanced-types.html#intersection-types)
  livres: Array<LivreBaseModel> & ShellModel;

  constructor(
    public menu: MenuController,
    public livresService: LivresService,
    public modalController: ModalController,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }

  ngOnInit() {
    this.requete = '';

    // Route data is a cold subscription, no need to unsubscribe?
    this.route.data.subscribe(
      (resolvedRouteData) => {
        this.livresDataStore = resolvedRouteData['data'];

        // We need to avoid having multiple firebase subscriptions open at the same time to avoid memory leaks
        // By using a switchMap to cancel previous subscription each time a new one arrives,
        // we ensure having just one subscription (the latest)
        const updateSearchObservable = this.rechercheFiltresObservable.pipe(
          switchMap((filters) => {
            const filteredDataSource = this.livresService.getListeListesDataSource();
            // Send a shell until we have filtered data from Firebase
            const searchingShellModel = [
              new LivreBaseModel(),
              new LivreBaseModel(),
              new LivreBaseModel(),
              new LivreBaseModel(),
            ];
            // Wait on purpose some time to ensure the shell animation gets shown while loading filtered data
            const searchingDelay = 400;

            const dataSourceWithShellObservable = DataStore.AppendShell(
              filteredDataSource,
              searchingShellModel,
              searchingDelay
            );

            return dataSourceWithShellObservable.pipe(
              map((filteredItems) => {
                // Just filter items by name if there is a search query and they are not shell values
                if (filters.query !== '' && !filteredItems.isShell) {
                  const queryFilteredItems = filteredItems.filter((item) =>
                    item.titre
                      .toLowerCase()
                      .includes(filters.query.toLowerCase())
                  );
                  // While filtering we strip out the isShell property, add it again
                  return Object.assign(queryFilteredItems, {
                    isShell: filteredItems.isShell,
                  });
                } else {
                  return filteredItems;
                }
              })
            );
          })
        );

        // Keep track of the subscription to unsubscribe onDestroy
        // Merge filteredData with the original dataStore state
        this.stateSubscription = merge(
          this.livresDataStore.state,
          updateSearchObservable
        ).subscribe(
          (state) => {
            this.livres = state;
          },
          (error) => console.log(error),
          () => console.log('stateSubscription completed')
        );
      },
      (error) => console.log(error)
    );
  }

  ionViewWillEnter() {
    this.menu.enable(true);
  }

  rechercher() {
    this.rechercheSubject.next({
      query: this.requete,
    });
  }
}
