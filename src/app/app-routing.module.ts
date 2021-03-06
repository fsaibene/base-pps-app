import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'home', loadChildren: () => import('./components/home/home.module').then( m => m.HomePageModule)},
    {
        path: 'login',
        loadChildren: () => import('./components/login/login.module').then( m => m.LoginPageModule)
    },
    {
        path: 'register',
        loadChildren: () => import('./components/register/register.module').then( m => m.RegisterPageModule)
    },
    {
        path: 'forgot-password',
        loadChildren: () => import('./components/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
        exports: [RouterModule]
    })
export class AppRoutingModule { }
