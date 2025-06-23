import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfileForm } from './modules/profile/profile-form/profile-form';
import { List } from './modules/team/list/list';
import { Details } from './modules/details/details/details';

// Project routes configurations:
export const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'profile', component: ProfileForm },
  { path: 'pokemon-team', component: List },
  { path: 'summary', component: Details },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
