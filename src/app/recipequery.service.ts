import { Params } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class RecipequeryService {

  constructor(private http: Http) { }

  getRecipeById = (id: number) => {
    let headers = new Headers({ 'Accept': 'application/json', 'X-Mashape-Key': '5VgdVNCpvXmshrewZN5LDldzgTv4p16kdIbjsngBGP2wGNdDvq' });
    let options = new RequestOptions({ headers: headers });

    let recipeUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/'+id+'/information';

    return this.http.get(recipeUrl, options).map(resp => resp.json());
  }

  getSearchResults = (params: Params) => {

    // add our own parameter to query
    // go through parameters and form a string that can be added to the http request url
    let parameters = '?instructionsRequired=true&';
    for (let key in params) {
      parameters = parameters + key.toString()+"="+params[key]+"&";
    };

    let headers = new Headers({ 'Accept': 'application/json', 'X-Mashape-Key': '5VgdVNCpvXmshrewZN5LDldzgTv4p16kdIbjsngBGP2wGNdDvq' });
    let options = new RequestOptions({ headers: headers });

    let recipeUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search' + parameters;

    return this.http.get(recipeUrl, options).map(resp => resp.json());
    }

 getSearchResultsOffSet = (params: Params, ten: string) => {
   // same than above but add offset-parameter and combine it with given value for 'ten'
    let parameters = '?instructionsRequired=true&';
    for (let key in params){
      parameters = parameters + key.toString()+"="+params[key]+"&";
    };

    parameters = parameters + 'offset=' + ten;

    let headers = new Headers({ 'Accept': 'application/json', 'X-Mashape-Key': '5VgdVNCpvXmshrewZN5LDldzgTv4p16kdIbjsngBGP2wGNdDvq' });
    let options = new RequestOptions({ headers: headers });

    let recipeUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search' + parameters;

    return this.http.get(recipeUrl, options).map(resp => resp.json());
    }

    getSimilarRecipe = (id: number) => {
      let headers = new Headers({ 'Accept': 'application/json', 'X-Mashape-Key': '5VgdVNCpvXmshrewZN5LDldzgTv4p16kdIbjsngBGP2wGNdDvq' });
      let options = new RequestOptions({ headers: headers });

      let recipeUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/'+id+'/similar';

      return this.http.get(recipeUrl, options).map(resp => resp.json());
    }
  }

