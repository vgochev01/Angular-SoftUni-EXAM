import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';



@NgModule({
  declarations: [
    LoaderComponent,
    DeleteModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
    DeleteModalComponent
  ]
})
export class SharedModule { }
