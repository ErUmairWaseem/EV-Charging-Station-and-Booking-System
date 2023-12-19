import axios from "axios";


const BASE_URL = "http://localhost:3008/api/v1";


export async function makePostRequest(endpoint, bodyFormData) {
   
    return axios({
      method: "post",
      url: BASE_URL+endpoint,

      data: bodyFormData,
      headers: {
        "Content-Type": "application/json",
        //"Access-Control-Allow-Origin": "*",
      },
    }).catch(function (error) {
        //handle error
        console.error("API ERROR: ");
        console.error(error)
        console.error("END API ERROR");
      });
}
  export async function makeGetRequest(endpoint, bodyFormData) {
    // console.log(BASE_URL + endpoint);
    return axios({
      method: "get",
      url: BASE_URL+endpoint,

      data: bodyFormData,
      headers: {
        "Content-Type": "application/json",
        //"Access-Control-Allow-Origin": "*",
      },
    }).catch(function (error) {
        //handle error
        console.error("API ERROR: ");
        console.error(error)
        console.error("END API ERROR");
      });
  }
 