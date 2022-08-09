// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const api = 'http://localhost:5001/ctmaps-fd35c/europe-west3/ctmaps/api';

export const env = {
  production: false,
  apiUrl: api,
  userurl: api + '/users',
  useraddurl: api + '/add',
  userdeleteurl: api + '/delete',
  lookupurl: api + '/lookup',
  loginurl: api + '/login',
  ratiosurl: api + '/ratios',
  ratiosupdateurl: api + '/update',
  ruleurl: api + '/rule',
  pricesurl: api + '/get-prices',
  manuelpriceurl: api + '/price',
  countriesurl: api + '/countries',
  savemapurl: api + '/savemap',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
