import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntriesListComponent } from './entries-list/entries-list.component';
import { SharedModule } from '../shared/shared.module';
import { EditEntryDialogComponent } from './edit-entry-dialog/edit-entry-dialog.component';

@NgModule({
  declarations: [EntriesListComponent, EditEntryDialogComponent],
  imports: [CommonModule, SharedModule],
  exports: [EntriesListComponent],
  entryComponents: [EditEntryDialogComponent],
})
export class EntriesModule {}
