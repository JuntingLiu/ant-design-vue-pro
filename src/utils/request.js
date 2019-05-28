import axios from 'axios';

function request(options) {
  return axios(options)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
}

export default request;
