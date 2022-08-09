const api = 'https://europe-west3-ctmaps-fd35c.cloudfunctions.net/ctmaps/api';

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
