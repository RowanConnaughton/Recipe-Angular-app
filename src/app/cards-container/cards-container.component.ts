import { RecipequeryService } from '../recipequery.service';

import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FavouritesService } from '../favourites.service';

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.css']
})
export class CardsContainerComponent implements OnInit, OnChanges{

  @Input() recipes: Array<Object>;
  @Input() title: string = '';
  @Input() imageurl: string = 'https://spoonacular.com/recipeImages/';


  @Output() update: EventEmitter<Array<Object>> = new EventEmitter<Array<Object>>();
 @Output() navigateTo: EventEmitter<number> = new EventEmitter<number>();

  constructor(private favouriteService: FavouritesService) { }

  ngOnInit() {
  }

  ngOnChanges(recipes) {
    if (recipes) {
      this.update.emit(this.recipes);
    }
  }

addToFav(recipe) {
   this.favouriteService.addToFav(recipe);
  
   
  }

  removeFromFav(recipe){
    this.favouriteService.removeFromFav(recipe);
  }


   navigate(id: number) {
   this.navigateTo.emit(id);
  }
 
}

