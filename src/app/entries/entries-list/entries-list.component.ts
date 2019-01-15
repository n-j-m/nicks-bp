import { OnInit, Component, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BPEntry } from '../models/bp-entry';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { switchMap, takeUntil, tap, map } from 'rxjs/operators';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import * as dayjs from 'dayjs';
import { EditEntryDialogComponent } from '../edit-entry-dialog/edit-entry-dialog.component';

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.css'],
})
export class EntriesListComponent implements AfterViewInit, OnDestroy {
  private _onDestroy: Subject<void> = new Subject<void>();
  private _entiresCollection: AngularFirestoreCollection<BPEntry>;

  entries: Observable<BPEntry[]>;

  displayColumns = ['type', 'time', 'systolic', 'diastolic', 'pulse', 'edit', 'delete'];
  dataSource: MatTableDataSource<BPEntry>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(_afs: AngularFirestore, _authService: AuthService, private _dialog: MatDialog) {
    this.entries = _authService.user$.pipe(
      switchMap(user => {
        this._entiresCollection = _afs.collection<BPEntry>(`users/${user.uid}/entries`);
        return this._entiresCollection.valueChanges();
      }),
    );
  }

  ngAfterViewInit() {
    this.entries.pipe(takeUntil(this._onDestroy)).subscribe(entries => {
      this.dataSource = new MatTableDataSource(entries);
      this.dataSource.sort = this.sort;
    });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(entry: BPEntry) {
    this._dialog.open(EditEntryDialogComponent, {
      width: '350px',
      data: entry,
    });
  }

  deleteEntry(entry: BPEntry) {
    this._entiresCollection.doc(entry.uid).delete();
  }

  addOne() {
    this._entiresCollection
      .add({
        type: 'morning',
        time: Date.now(),
        systolic: 0,
        diastolic: 0,
        pulse: 0,
      })
      .then(e => e.set({ uid: e.id }, { merge: true }));
  }

  toTimeString(time: number): string {
    return dayjs(time).toString();
  }

  trackByUid(_: number, entry: BPEntry) {
    return entry.uid;
  }
}
