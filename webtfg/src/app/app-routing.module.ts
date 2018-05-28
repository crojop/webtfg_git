import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventFormComponent } from './event-form/event-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { TerminalComponent } from './terminal/terminal.component';
import { TerminalFormComponent } from './terminal-form/terminal-form.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { TagComponent } from './tag/tag.component';
import { TagFormComponent } from './tag-form/tag-form.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { EventComponent } from './event/event.component';
import { TableComponent } from './table/table.component';
import { ConsSettings } from './cons-settings';

const routes: Routes = [
 //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: ConsSettings.path_event_form, component: EventFormComponent },
  { path: ConsSettings.path_event_component, component: EventComponent },
  { path: ConsSettings.path_user_form, component: UserFormComponent },
  { path: ConsSettings.path_user_form+'/:'+ConsSettings.attr_user_id, component: UserFormComponent },
  { path: ConsSettings.path_user_component, component: UserComponent },
  
  { path: ConsSettings.path_tag_form, component: TagFormComponent },
  { path: ConsSettings.path_tag_form+'/:'+ConsSettings.attr_tag_code, component: TagFormComponent },
  { path: ConsSettings.path_tag_component+'/:'+ConsSettings.attr_event_id, component: TagComponent },

  { path: ConsSettings.path_terminal_component+'/:'+ConsSettings.attr_event_id, component: TerminalComponent },
  { path: ConsSettings.path_dashboard, component: DashboardComponent },
  { path: ConsSettings.path_login, component: LoginComponent },
  { path: ConsSettings.path_register, component: RegisterComponent },
  { path: ConsSettings.path_event_form +'/:'+ConsSettings.attr_event_id, component: EventFormComponent },
  { path: ConsSettings.path_terminal_form, component: TerminalFormComponent },
  { path: ConsSettings.path_terminal_form +'/:'+ConsSettings.attr_terminal_id, component: TerminalFormComponent },
  { path: ConsSettings.path_product_form, component: ProductFormComponent },
  { path: ConsSettings.path_product_form +'/:'+ConsSettings.attr_resource_id, component: ProductFormComponent },
  { path: ConsSettings.path_product_component+'/:'+ConsSettings.attr_terminal_id, component: ProductComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}