import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirstPageComponent } from './first-page/first-page.component';
import { LogUserComponent } from './log-user/log-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { GroupDialogueComponent } from './group-dialogue/group-dialogue.component';
import { UserGuard } from './Guard/user.guard';


const routes: Routes = [
  { path: 'main-page', component: FirstPageComponent },
  { path: 'login', component: LogUserComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'group-dialogue', component: GroupDialogueComponent, canActivate: [UserGuard] },
  { path: '', redirectTo: '/main-page', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
