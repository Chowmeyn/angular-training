import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { LoggingService } from "./logging.service";
import { RecipeService } from "./recipe/recipe.service";
import { ShoppingListService } from "./shopping-list/shopping_list.service";

@NgModule({
    providers: [
        ShoppingListService, RecipeService, {
            provide: HTTP_INTERCEPTORS, 
            useClass: AuthInterceptorService, 
            multi: true
        },
    ]
})
export class CoreModule {}