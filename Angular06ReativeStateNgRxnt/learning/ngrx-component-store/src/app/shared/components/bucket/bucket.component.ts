import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BucketService } from 'src/app/services/bucket.service';
import { Fruit } from '../../../constants/fruit';
import { IFruit } from '../../../interfaces/fruit.interface';
import { ANIMATIONS } from '../../../constants/animations';
import { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.scss'],
  animations: [ANIMATIONS.LIST_ANIMATION]
})
export class BucketComponent implements OnInit {
  bucket$: Observable<IFruit[]>;
  selectedFruit: Fruit = '' as null;
  fruits: string[] = Object.values(Fruit);
  isSaving: boolean;
  constructor(private bucketService: BucketService) { }

  ngOnInit(): void {
    this.bucket$ = this.bucketService.bucket$;
    this.bucketService.loadItems();
  }

  onAnimationStarted( event: AnimationEvent ) {
    this.isSaving = true;
  }

  onAnimationDone( event: AnimationEvent ) {
    this.isSaving = false;
    this.selectedFruit = '' as null;
  }

  addSelectedFruitToBucket() {
    this.bucketService.addItem({
      id: Date.now(),
      name: this.selectedFruit
    })
  }
  deleteFromBucket(fruit: IFruit) {
    this.bucketService.removeItem(fruit);
  }

}
