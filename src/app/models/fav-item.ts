import { Favourite } from "./favourite";

export class FavItem{
   $key:string;
    id: string;
    title: string;
    image: string;
    readyInMinutes: number;

constructor(init?: Partial<FavItem>){
    Object.assign(this, init);
}

}