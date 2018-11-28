import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../../recipe.service';
import { Subscription } from 'rxjs/Subscription';
import { Recipe } from '../../models/recipe';
import {DataTableModule, DataTableResource} from 'angular5-data-table';

@Component({
  selector: 'app-admin-recipes',
  templateUrl: './admin-recipes.component.html',
  styleUrls: ['./admin-recipes.component.css']
})
export class AdminRecipesComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  filteredRecipes: any[];
  subscription: Subscription;
  tableResource: DataTableResource<Recipe>;
  items: Recipe[] = [];
  itemCount: number;

  constructor(private recipeService: RecipeService) { 

    this.subscription = this.recipeService.getAll()
    .subscribe(recipes => {
      this.recipes = recipes;
       this.initializeTable(this.recipes)});

  }

  private initializeTable(r: Recipe[]) {
    this.tableResource = new DataTableResource(r);
    this.tableResource.query({ offset: 0, limit: 10 }).then(items => this.items = items);
    this.tableResource.count().then(count => this.itemCount = count);
  }
 
  reloadItems(params) {
    if (!this.tableResource) return;
 
    this.tableResource.query(params).then(items => this.items = items);
  }

  filter(query: string){
    //console.log(query);
    this.filteredRecipes = (query) ?
    this.recipes.filter(r => r.title.toLowerCase().includes(query.toLowerCase())) : 
    this.recipes;
    this.initializeTable(this.filteredRecipes);
  }

  ngOnDestroy(){

    this.subscription.unsubscribe();
  }

  ngOnInit() {
  
  }

}
