import { Component, OnInit } from '@angular/core';
import { FavouritesService } from '../favourites.service';

@Component({
  selector: 'app-my-favourites',
  templateUrl: './my-favourites.component.html',
  styleUrls: ['./my-favourites.component.css']
})
export class MyFavouritesComponent implements OnInit {
fav$;

  constructor(private favouritesService: FavouritesService) { 
    
  }

  removeFromFav(recipe){
    this.favouritesService.removeFromFav(recipe);
  }
  
  async ngOnInit() {
    this.fav$ = await this.favouritesService.getFav();
  }

}
