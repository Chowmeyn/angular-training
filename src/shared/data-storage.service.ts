import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";
import { Recipe } from "src/app/recipe/recipe.model";
import { RecipeService } from "src/app/recipe/recipe.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(
        private http: HttpClient, 
        private recipeService: RecipeService, 
        private authService: AuthService
    ) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipe();
        this.http.put('https://ng-recipe-book-918a8-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json', recipes)
        .subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipe() {

                return this.http.get<Recipe[]>(
                    'https://ng-recipe-book-918a8-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
                ).pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe, 
                        ingredients: recipe.ingredients ? recipe.ingredients: []
                    };
                });
            }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            })
        );
    }
}