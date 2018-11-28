import{Favourite} from './favourite';
import {FavItem} from './fav-item';

export class FavData{
    items: FavItem[] = [];

    constructor(private itemsMap: {[recipeId: string]: FavItem}){
        this.itemsMap = itemsMap || {};

for(let recipeId in itemsMap){
    let item = itemsMap[recipeId];
    this.items.push(new FavItem({...item, id: recipeId}));
}
    }




}