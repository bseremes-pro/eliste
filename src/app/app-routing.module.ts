import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToHome = () =>
  redirectUnauthorizedTo(['/auth/login']);
const redirectLoggedInToAccount = () => redirectLoggedInTo(['/app']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/connexion',
    pathMatch: 'full',
  },
  {
    path: 'walkthrough',
    loadChildren: () =>
      import('./walkthrough/walkthrough.module').then(
        (m) => m.WalkthroughPageModule
      ),
  },
  {
    path: 'getting-started',
    loadChildren: () =>
      import('./getting-started/getting-started.module').then(
        (m) => m.GettingStartedPageModule
      ),
  },
  {
    path: 'auth',
    redirectTo: 'auth/connexion',
    pathMatch: 'full',
  },
  {
    path: 'auth/connexion',
    loadChildren: () =>
      import('./pages/connexion/connexion.module').then(
        (m) => m.ConnexionPageModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToAccount },
  },
  {
    path: 'auth/inscription',
    loadChildren: () =>
      import('./pages/inscription/inscription.module').then(
        (m) => m.InscriptionPageModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToAccount },
  },
  {
    path: 'auth/reinitialisation-mdp',
    loadChildren: () =>
      import('./pages/reinitialisation-mdp/reinitialisation-mdp.module').then(
        (m) => m.ReinitialisationMdpPageModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToAccount },
  },
  {
    path: 'auth/login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToAccount },
  },
  {
    path: 'auth/signup',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToAccount },
  },
  {
    path: 'auth/forgot-password',
    loadChildren: () =>
      import('./forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordPageModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToAccount },
  },
  {
    path: 'app',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome },
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'contact-card',
    loadChildren: () =>
      import('./contact-card/contact-card.module').then(
        (m) => m.ContactCardPageModule
      ),
  },
  {
    path: 'forms-and-validations',
    loadChildren: () =>
      import('./forms/validations/forms-validations.module').then(
        (m) => m.FormsValidationsPageModule
      ),
  },
  {
    path: 'forms-filters',
    loadChildren: () =>
      import('./forms/filters/forms-filters.module').then(
        (m) => m.FormsFiltersPageModule
      ),
  },
  {
    path: 'page-not-found',
    loadChildren: () =>
      import('./page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule
      ),
  },
  {
    path: 'showcase',
    loadChildren: () =>
      import('./showcase/showcase.module').then((m) => m.ShowcasePageModule),
  },
  {
    path: 'firebase',
    redirectTo: 'firebase/auth/sign-in',
    pathMatch: 'full',
  },
  {
    path: 'firebase/auth',
    loadChildren: () =>
      import('./firebase/auth/firebase-auth.module').then(
        (m) => m.FirebaseAuthModule
      ),
  },
  {
    path: 'firebase/crud',
    loadChildren: () =>
      import('./firebase/crud/firebase-crud.module').then(
        (m) => m.FirebaseCrudModule
      ),
  },
  {
    path: 'maps',
    loadChildren: () =>
      import('./maps/maps.module').then((m) => m.MapsPageModule),
  },
  {
    path: 'video-playlist',
    loadChildren: () =>
      import('./video-playlist/video-playlist.module').then(
        (m) => m.VideoPlaylistPageModule
      ),
  },
  {
    path: 'page-introuvable',
    loadChildren: () =>
      import('./pages/page-introuvable/page-introuvable.module').then(
        (m) => m.PageIntrouvableModule
      ),
  },
  {
    path: '**',
    redirectTo: 'page-introuvable',
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // This value is required for server-side rendering to work.
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
