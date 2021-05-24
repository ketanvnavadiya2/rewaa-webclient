import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';

import bootstrap from "bootstrap";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './authentication/authentication.service';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AuthenticationInterceptorService } from './authentication/authentication-interceptor.service';
import { InventoryListComponent } from './inventory/inventory-list/inventory-list.component';
import { InventoryEditComponent } from './inventory/inventory-edit/inventory-edit.component';
import { InventoryDetailsComponent } from './inventory/inventory-details/inventory-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { InventoryService } from './inventory/inventory.service';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    LoadingSpinnerComponent,
    HeaderComponent,
    InventoryComponent,
    InventoryListComponent,
    InventoryEditComponent,
    InventoryDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule
  ],
  providers: [AuthenticationService,
              InventoryService,
              {
                provide: HTTP_INTERCEPTORS,
                useClass: AuthenticationInterceptorService,
                multi: true
              }
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
