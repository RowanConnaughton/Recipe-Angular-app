
import { Injectable } from '@angular/core';

import 'rxjs/operator/take';
import 'rxjs/operator/map';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database-deprecated'
import { FavData } from './models/fav-data';
import { Observable } from 'rxjs/Observable';
import{Favourite} from './models/favourite';


@Injectable()
export class FavouritesService {

  constructor(private db: AngularFireDatabase) { }


private create(){
 return this.db.list('/favourites').push({
    dateCreated: new Date().getTime()
  })
}



async getFav(): Promise<Observable<FavData>>{
  let favId = await this.getOrCreateFavId();
  return this.db.object('/favourites/' + favId)
  .map(x => new FavData(x.items));
}

private getItem(favId:string, recipeId: string){
  return this.db.object('/favourites/' + favId + '/items/' + recipeId);
}

private async getOrCreateFavId(): Promise<string>{
  let favId = localStorage.getItem('favId');
   if(favId) return favId;
  
  
      let result = await this.create();
      localStorage.setItem('favId', result.key);
      return result.key;
      
    
      
    
}

async addToFav(favourite: Favourite){
  let favId = await this.getOrCreateFavId();
 let item$ = this.getItem(favId, favourite.id);

 item$.take(1).subscribe(item => {
    item$.update({
      title: favourite.title,
      imageurls: favourite.image,
      readyInMinuties: favourite.readyInMinutes
    });

   
 });
}

async removeFromFav(recipe){

  let favId = await this.getOrCreateFavId();
 let item$ = this.getItem(favId, recipe.title);

 item$.take(1).subscribe(item => {
    item$.remove();

});

}



}
