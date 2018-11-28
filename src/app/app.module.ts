import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { FormControl, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {CustomFormsModule} from 'ng2-validation';
import {DataTableModule} from 'angular5-data-table';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import {Input} from '@angular/core';
import { HttpModule } from '@angular/http';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatToolbarModule, MatInputModule, MatListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {APP_BASE_HREF} from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { RecipesComponent } from './recipes/recipes.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { environment } from '../environments/environment';
import { MyFavouritesComponent } from './my-favourites/my-favourites.component';
import { AdminRecipesComponent } from './admin/admin-recipes/admin-recipes.component';
import { UserService } from './user.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { RecipeFormComponent } from './admin/recipe-form/recipe-form.component';
import { RecipeService } from './recipe.service';
import { SearchRecipeComponent } from './search-recipe/search-recipe.component';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { CardsContainerComponent } from './cards-container/cards-container.component';
import { CardDetailedComponent } from './card-detailed/card-detailed.component';
import { RecipequeryService } from './recipequery.service';
import { SignupComponent } from './signup/signup.component';
import {NotificationService} from './notification.service';
import {FavouritesService} from './favourites.service';
import { BsFooterComponent } from './bs-footer/bs-footer.component';

 library.add(fas); 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BsNavbarComponent,
    RecipesComponent,
    HomeComponent,
    MyFavouritesComponent,
    AdminRecipesComponent,
    RecipeFormComponent,
    SearchRecipeComponent,
    AdvancedSearchComponent,
    CardsContainerComponent,
    CardDetailedComponent,
    SignupComponent,
    BsFooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    HttpModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatListModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FontAwesomeModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      //public
      { path: 'login', component: LoginComponent},
      { path: '', component: RecipesComponent},
      { path: 'recipes', component: RecipesComponent},
      {path: 'search', component: SearchRecipeComponent},
      { path: 'recipe/:id', component: CardDetailedComponent},
      { path: 'signup', component: SignupComponent },
     
     //user
      { path: 'my/favorites', component: MyFavouritesComponent, canActivate: [AuthGuardService]},
      //admin
     
      { path: 'admin/recipes/new', component: RecipeFormComponent , canActivate: [AuthGuardService, AdminAuthGuardService]},
      { path: 'admin/recipes/:id', component: RecipeFormComponent , canActivate: [AuthGuardService, AdminAuthGuardService]},
      { path: 'admin/recipes', component: AdminRecipesComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
    ])
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    AdminAuthGuardService,
    AngularFireDatabase,
    RecipeService,
    NotificationService,
    ReactiveFormsModule,
      FormsModule,
      FormBuilder,
      FavouritesService,
    RecipequeryService, {provide: APP_BASE_HREF, useValue : '' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
