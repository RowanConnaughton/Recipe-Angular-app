import { TestBed, inject } from '@angular/core/testing';

import { RecipeService } from '../recipe.service';

import { RecipesComponent } from './recipes.component';
import { IfObservable } from 'rxjs/observable/IfObservable';

describe('RecipeService', () => {
  beforeEach(() => {
    
      let component: RecipesComponent;
    let service: RecipeService;
   
  
  
beforeEach(() =>{
  service = new RecipeService(null);
  component = new RecipesComponent(service);
  
});

it('should set recipe properties with items returnd from the server', ()=>{
  let recipes =[1,2,3];

  spyOn(service, 'getAll').and.callFake(() =>{
    return IfObservable.from([recipes])
  });

  

  expect(component.recipes$).toBe(recipes);

});

  });

});