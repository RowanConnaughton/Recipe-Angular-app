import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../recipe.service';
import {Router, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {

  recipe = <any>{};
  id: string;

  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private route: ActivatedRoute  ) {

    this.id =  this.route.snapshot.paramMap.get('id');
      if(this.id) this.recipeService.get(this.id).take(1).subscribe(r => this.recipe = r.payload.val())
     }


  save(recipe){
    if(this.id) this.recipeService.update(this.id, recipe);
    else this.recipeService.create(recipe);

    
    this.router.navigate(['/admin/recipes']);
  }

  delete(){
    if(!confirm('Are you sure you want to delete this recipe?'))return;
     
    this.recipeService.delete(this.id);
    this.router.navigate(['/admin/recipes']);
    

  }

  ngOnInit() {
  }

}
