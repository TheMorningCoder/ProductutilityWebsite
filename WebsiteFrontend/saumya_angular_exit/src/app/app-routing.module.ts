import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { NoPageComponent } from './blank-page/no-page.component';
import { PostProductComponent } from './post-product/post-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { RegistrationComponent } from './registration/registration.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [

  { path:'', component:DashboardComponent  },
  { path:'login', component:LoginComponent  },
  { path:'registration', component:RegistrationComponent  },

  {path:'homepage', component:HomepageComponent, canActivate : [AuthGuard]},
  {path:'question-search', component:ProductSearchComponent, canActivate : [AuthGuard]},
  {path:'result-page', component:ResultPageComponent, canActivate : [AuthGuard]},
  {path:'post-product', component:PostProductComponent, canActivate : [AuthGuard]},
  {path:'question-details/:id', component:ProductDetailsComponent, canActivate : [AuthGuard]},

  {
    path:'**',
    component:NoPageComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
