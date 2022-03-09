const fetch = require('node-fetch');

// Get client credentials from environment variables
const clientId = "4eb23f0e-0a17-48dc-ac88-13a44cc82134";
const clientSecret = "Jo_jT9ifYqfZJjoATdHsThUrc_MQmzDxxtXbh5ajWx4";
const environment = "ca_central_1"; // expected format: mypurecloud.com

function handleTokenCallback(body){
  return fetch(`https://api.${environment}/api/v2/authorization/roles`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `${body.token_type} ${body.access_token}`
      }
  })
  .then(res => {
      if(res.ok){
          return res.json();
      } else {
          throw Error(res.statusText);
      }
  })
  .then(jsonResponse => {
      console.log(jsonResponse);
  })
  .catch(e => console.error(e));
}


// Genesys Cloud Authentication
const params = new URLSearchParams();
params.append('grant_type', 'client_credentials');

fetch(`https://login.${environment}/oauth/token`, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(clientId + ':' + clientSecret).toString('base64')}`
  },
  body: params
})
.then(res => {
  if(res.ok){
      return res.json();
  } else {
      throw Error(res.statusText);
  }
})
.then(jsonResponse => {
  console.log(jsonResponse);
  handleTokenCallback(jsonResponse);
})
.catch(e => console.error(e));