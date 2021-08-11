import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnDestroy {

  @Input() hotelId: string | undefined;
  @Output() hideDialog: EventEmitter<any> = new EventEmitter();
  subscription$: Subscription | null = null;

  constructor(
    private contentService: ContentService,
    private router: Router
  ) { }

  hide(): void{
    this.hideDialog.emit();
  }

  deleteOffer(): void {
    if(this.hotelId){
      this.subscription$ = this.contentService.deleteHotel(this.hotelId).subscribe({
        next: () => {
          this.router.navigate(['hotels']);
        },
        error: (err) => {
          console.error(err.error?.message || err.message);
          this.router.navigate(['home']);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }

}
