import back_server from './back_server';
import axios from 'axios';
import XLSX from 'xlsx';

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
function exportExcel(data, fileName){
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb,fileName)
}
  export {processDetail,exportExcel}


