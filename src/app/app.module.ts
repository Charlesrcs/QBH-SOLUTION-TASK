import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiPrefixInterceptor } from './core/interceptor/api-prefix.interceptor';
import { JwtTokenInterceptor } from './core/interceptor/jwt-token.interceptor';
import { StyleManager } from './shared/services/style-manager/style-manager.service';
import { SharedModule } from './shared/shared.module';
import { QBHTaskModule } from './modules/qbh-task/qbh-task.module';
export function tokenGetter() {
  return localStorage.getItem('access_token');
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    QBHTaskModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['http://localhost:3000'],
        // disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  ],
  // providers: [
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: ApiPrefixInterceptor,
  //     multi: true,
  //   },
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: JwtTokenInterceptor,
  //     multi: true,
  //   },
  //   StyleManager,
  // ],
  bootstrap: [AppComponent],
})
export class AppModule {}
