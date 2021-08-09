import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CatalogModule } from './catalog/catalog.module';
import { CoreModule } from './core/core.module';
import { ContentService } from './services/content.service';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { AuthActivate } from './guards/auth.guard';
import { OwnerActivate } from './guards/owner.guard';
import { RouterModule } from '@angular/router';
import { httpInterceptorProviders } from './core/app-interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    CoreModule,
    UserModule,
    CatalogModule,
    SharedModule,
    RouterModule
  ],
  providers: [ContentService, UserService, AuthActivate, OwnerActivate, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
