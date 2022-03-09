const platformClient = require('purecloud-platform-client-v2');

// Set Genesys Cloud objects
const externalContactsApi = new platformClient.ExternalContactsApi();
let firstName = "";

// const email = document.getElementById("email").value;
  // console.log(email);
// Authenticate with Genesys Cloud
function findCustomer() {
  console.log("HELLO")
  externalContactsApi.getExternalcontactsReversewhitepageslookup("dgabriel@connexservice.ca", null)
    .then((data) => {
      firstName = data.contacts[0].firstName
      console.log(firstName);

      return firstName;
    })
}

// function initialize() {
// client.loginClientCredentialsGrant(CLIENT_ID, CLIENT_SECRET)
// 	.then(() => {
// 		console.log('Authenticated with Genesys Cloud');
    // externalContactsApi.getExternalcontactsReversewhitepageslookup("dgabriel@connexservice.ca", null)
    // .then((data) => {
    //   firstName = data.contacts[0].firstName
    //   console.log(firstName);

    //   return firstName;
    // })
	// })
  // .catch(() => {
  //   console.error(Error)
  // })
// }