import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { metaReducers, rootReducer } from './reducers';

@NgModule({
    imports: [
        StoreModule.forRoot(rootReducer, {metaReducers})
    ]
})
export class AppStoreModule { }
