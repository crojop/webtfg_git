import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { EventFormComponent } from './event-form/event-form.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { ImageUploadModule } from "angular2-image-upload";
import { UserFormComponent } from './user-form/user-form.component';
import { UserComponent } from './user/user.component';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule} from '@angular/cdk/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { TerminalComponent } from './terminal/terminal.component';
import { TerminalFormComponent } from './terminal-form/terminal-form.component';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { MatPaginatorIntl, MatProgressSpinnerModule, MatProgressBarModule, MatFormFieldModule, MatIconModule, MatMenuModule } from '@angular/material';
import { CustomMatPaginatorIntl } from './spanish-paginator-intl';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductComponent } from './product/product.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { SafehtmlPipe } from './safehtml.pipe';
import { TagComponent } from './tag/tag.component';
import { TagFormComponent } from './tag-form/tag-form.component';
import { TabledialogComponent } from './tabledialog/tabledialog.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationService } from './authentication.service';
import { AuthGuard } from './auth.guard';
import { LogoutComponent } from './logout/logout.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt-interceptor';
import { GeneralService } from './general.service';
import { PasswordDialogComponent } from './password-dialog/password-dialog.component';
import { DatePipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { EventComponent } from './event/event.component';
import { HeaderComponent } from './header/header.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { TableComponent } from './table/table.component';
import { TitleComponent } from './title/title.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    EventFormComponent,
    DashboardComponent,
    UserFormComponent,
    UserComponent,
    DialogComponent,
    TerminalComponent,
    TerminalFormComponent,
    HelpDialogComponent,
    ProductFormComponent,
    ProductComponent,
    SafehtmlPipe,
    TagComponent,
    TagFormComponent,
    TabledialogComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    PasswordDialogComponent,
    EventComponent,
    HeaderComponent,
    TableComponent,
    TitleComponent,
    FormComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    MatDialogModule,
    MatSortModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatFormFieldModule,
    BrowserModule,
    CdkTableModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatTableModule,
    MatSelectModule,
    MyDateRangePickerModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatCardModule,
    MatTabsModule,
    MatMenuModule,
    MatExpansionModule,
    ImageUploadModule.forRoot()
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    BrowserModule,
    AuthenticationService,
    AuthGuard,
    GeneralService,
    DatePipe
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent, HelpDialogComponent, TabledialogComponent, PasswordDialogComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
