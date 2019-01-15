import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MainNavComponent } from './main-nav/main-nav.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [MainNavComponent, NotFoundComponent],
  imports: [CommonModule, SharedModule],
  exports: [MainNavComponent],
})
export class CoreModule {}
