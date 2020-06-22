import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirstPageComponent } from './first-page/first-page.component';
import { LogUserComponent } from './log-user/log-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { GroupDialogueComponent } from './group-dialogue/group-dialogue.component';
import { UserGuard } from './Guard/user.guard';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { TableComponent } from './table/table.component';
import { AdminGuard } from './Guard/admin.guard';


const routes: Routes = [
  { path: 'main-page', component: FirstPageComponent },
  { path: 'login', component: LogUserComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'admin-page', component: AdminPageComponent, canActivate:  [AdminGuard], children: [
    { path: 'table', component: TableComponent }
  ]  },
  { path: 'settings', component: ChatPageComponent },
  { path: 'chat-list', component: GroupDialogueComponent, canActivate: [UserGuard] },
  { path: '', redirectTo: '/main-page', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
