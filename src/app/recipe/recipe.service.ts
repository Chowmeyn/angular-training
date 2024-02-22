import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "src/shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping_list.service";
import { Recipe } from "./recipe.model";

@Injectable()

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe('Thicc ass Burger', 
    //         'Goddam thicc juicy tasty lookin burger', 
    //         'https://preview.redd.it/iod46sakipj81.jpg?auto=webp&s=201126186be9e35c3d1fbc1aa7c8554f9c695d22',
    //         [
    //          new Ingredient('Patty', 2),
    //          new Ingredient('Burger', 1)
    //     ]),
    //     new Recipe('Fried puken', 
    //         'Yummy juicy chicken', 
    //         'https://images-cdn.9gag.com/photo/awBn6RB_700b.jpg',
    //         [
    //          new Ingredient('Chicken', 1),
    //          new Ingredient('Flour', 1/2)
    //         ])
    //   ];
    private recipes: Recipe[] = [];
    
    constructor(private slService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
    
    getRecipe() {
        return this.recipes.slice();
    }

    getRecipes(index: number) {
        return this.recipes[index];
    }

    addIngredientsToSL(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice())
    }
}