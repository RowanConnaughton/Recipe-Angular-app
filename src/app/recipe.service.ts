import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class RecipeService {

  constructor(private db: AngularFireDatabase) { }

create(recipe){

 return this.db.list('/recipes').push(recipe);

  }

  getAll() {
    return this.db.list('/recipes/',
    ref => ref.orderByChild('title'))
    .snapshotChanges()
    .map(actions => {
           return actions.map(action => ({
             key: action.key, 
             title: action.payload.val().title,
             imageUrl: action.payload.val().imageUrl,
             time: action.payload.val().time,
             description: action.payload.val().description
           }));
         });
    }

  get(recipesId){
    return this.db.object('/recipes/' + recipesId).snapshotChanges();
  }

  update(recipeId, recipe){
   return this.db.object('/recipes/' + recipeId).update(recipe);
  }

  delete(recipeId){
    return this.db.object('/recipes/' + recipeId).remove();
  }

}
