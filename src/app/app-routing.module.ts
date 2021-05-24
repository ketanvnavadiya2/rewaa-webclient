import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { InventoryEditComponent } from './inventory/inventory-edit/inventory-edit.component';
import { InventoryDetailsComponent } from './inventory/inventory-details/inventory-details.component';
import { InventoryListComponent } from './inventory/inventory-list/inventory-list.component';


const routes: Routes = [
  {
    path: '',
    component: InventoryComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'inventory',
    component: InventoryComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', component: InventoryListComponent },
      { path: 'add', component: InventoryEditComponent },
      {
        path: ':id/view',
        component: InventoryDetailsComponent
      },
      {
        path: ':id/edit',
        component: InventoryEditComponent
      }
    ]
  },
  {
    path: 'auth',
    component: AuthenticationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
