import back_server from './back_server';
import axios from 'axios';


function  processDetail(pd_catalog, pd_command){
    
    var config = { headers: {  
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'}
    }
    axios.post( back_server.restful_api_base_url()+'ProcessDetail/',{ pd_catalog : pd_catalog , pd_command : pd_command }, config
    )
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
    
  }

  export {processDetail}


