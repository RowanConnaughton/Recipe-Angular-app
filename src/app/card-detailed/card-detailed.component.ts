import { Component, OnInit } from '@angular/core';
import { RecipequeryService } from '../recipequery.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-detailed',
  templateUrl: './card-detailed.component.html',
  styleUrls: ['./card-detailed.component.css']
})
export class CardDetailedComponent implements OnInit {

  private recipeInfo: any;
  private instructions: any;
  private ingredients: any;
  private activeId;
  private sub: Subscription ;
  private params;
  private similarRecipes: Array<Object> = [];
  private recipesTitle = "Similar recipes";
  private imageurl: string = 'https://spoonacular.com/recipeImages/';
  private url: string = '';
  private imageurlFb;
  


  constructor(private recipequery: RecipequeryService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    // grab recipe id from url parameters
    this.sub = this.route.params.subscribe(params => {
     this.activeId = params['id'];
    });

    if (this.activeId) {

      // get recipe info and list of similar recipes based on active id
      this.recipequery.getRecipeById(this.activeId)
        .subscribe(
          (res) => {
              this.recipeInfo = res;
              this.instructions = res.analyzedInstructions[0].steps;
              this.ingredients = res.extendedIngredients;
              this.imageurlFb = this.imageurl + this.recipeInfo.image;
              window.scrollTo(0, 0);

              this.url = "http://212.24.98.139/#/recipe/" + this.activeId;

              

              

      this.recipequery.getSimilarRecipe(this.activeId)
      .subscribe(
        (res) => {
          this.similarRecipes =  res.slice(0, 4);
      })

    })
}}






navigate(event) {
  // we need to assign new recipe's info to local variables as no router actions are taken when navigating to "same page"

   this.recipequery.getRecipeById(event)
        .subscribe(
          (res) => {
              this.activeId = event;
              this.recipeInfo = res;
              this.instructions = res.analyzedInstructions[0].steps;
              this.ingredients = res.extendedIngredients;

               this.url = "http://212.24.98.139/#/recipe/" + this.activeId;

              

              

      this.recipequery.getSimilarRecipe(event)
      .subscribe(
        (res) => {
          this.similarRecipes =  res.slice(0, 4);
      });
    });
  window.scrollTo(0, 0);

}


}
