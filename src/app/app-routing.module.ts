import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { EntriesListComponent } from './entries/entries-list/entries-list.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: 'entries', component: EntriesListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', pathMatch: 'full', redirectTo: '/entries' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
