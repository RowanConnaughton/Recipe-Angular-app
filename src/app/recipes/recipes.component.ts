import { Component,ViewEncapsulation, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent  {
  recipes$;
  
  closeResult: string;

  constructor(recipeService: RecipeService,private modalService: NgbModal) {
    this.recipes$ = recipeService.getAll();
   }

   openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }
  

}
