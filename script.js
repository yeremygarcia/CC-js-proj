let myHeaders = new Headers();
myHeaders.append("apikey", "Your API Key");

let requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

fetch("URL", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));