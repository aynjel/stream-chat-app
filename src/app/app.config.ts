import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'get-stream-io-chat-app',
          appId: '1:434373932911:web:42dab43f20bb6c3e329a9a',
          storageBucket: 'get-stream-io-chat-app.appspot.com',
          apiKey: 'AIzaSyAxko7-1jDyRbUAweDtJ39Vx_H1FgbZCQo',
          authDomain: 'get-stream-io-chat-app.firebaseapp.com',
          messagingSenderId: '434373932911',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    provideHttpClient(withFetch()),
  ],
};
