const platformClient = require('purecloud-platform-client-v2');
const client = platformClient.ApiClient.instance;

// Get client credentials from environment variables
const CLIENT_ID = "4eb23f0e-0a17-48dc-ac88-13a44cc82134";
const CLIENT_SECRET = "Jo_jT9ifYqfZJjoATdHsThUrc_MQmzDxxtXbh5ajWx4";
const ORG_REGION = "ca_central_1"; // eg. us_east_1

// Set environment
const environment = platformClient.PureCloudRegionHosts[ORG_REGION];
if(environment) client.setEnvironment(environment);

// Set Genesys Cloud objects
const externalContactsApi = new platformClient.ExternalContactsApi();
let firstName = "";

// const email = document.getElementById("email").value;
  // console.log(email);
// Authenticate with Genesys Cloud
console.log("HELLO")
function findCustomer() {
  externalContactsApi.getExternalcontactsReversewhitepageslookup("dgabriel@connexservice.ca", null)
    .then((data) => {
      firstName = data.contacts[0].firstName
      console.log(firstName);

      return firstName;
    })
}

function initialize() {
client.loginClientCredentialsGrant(CLIENT_ID, CLIENT_SECRET)
	.then(() => {
		console.log('Authenticated with Genesys Cloud');
    // externalContactsApi.getExternalcontactsReversewhitepageslookup("dgabriel@connexservice.ca", null)
    // .then((data) => {
    //   firstName = data.contacts[0].firstName
    //   console.log(firstName);

    //   return firstName;
    // })
	})
  .catch(() => {
    console.error(Error)
  })
}