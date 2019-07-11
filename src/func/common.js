import back_server from './back_server';
import axios from 'axios';
import XLSX from 'xlsx';







function _blankAndoComma(par){
    par=par.replace(' ', '')
    par=par.replace(',','_')
    return par
}


function uribase64encode(par){
    let uri_par=window.encodeURIComponent(par);
		//console.log(uri_cypher);
		let enbase_par=window.btoa(uri_par);
		
        //console.log(enbase_par);
        return enbase_par
}





function utf16ToUtf8(utf16Str) {
    var utf8Arr = [];
    var byteSize = 0;
    for (var i = 0; i < utf16Str.length; i++) {
        //获取字符Unicode码值
        var code = utf16Str.charCodeAt(i);

        //如果码值是1个字节的范围，则直接写入
        if (code >= 0x00 && code <= 0x7f) {
            byteSize += 1;
            utf8Arr.push(code);

            //如果码值是2个字节以上的范围，则按规则进行填充补码转换
        } else if (code >= 0x80 && code <= 0x7ff) {
            byteSize += 2;
            utf8Arr.push((192 | (31 & (code >> 6))));
            utf8Arr.push((128 | (63 & code)))
        } else if ((code >= 0x800 && code <= 0xd7ff)
            || (code >= 0xe000 && code <= 0xffff)) {
            byteSize += 3;
            utf8Arr.push((224 | (15 & (code >> 12))));
            utf8Arr.push((128 | (63 & (code >> 6))));
            utf8Arr.push((128 | (63 & code)))
        } else if(code >= 0x10000 && code <= 0x10ffff ){
            byteSize += 4;
            utf8Arr.push((240 | (7 & (code >> 18))));
            utf8Arr.push((128 | (63 & (code >> 12))));
            utf8Arr.push((128 | (63 & (code >> 6))));
            utf8Arr.push((128 | (63 & code)))
        }
    }

    return utf8Arr
}




function  processDetail(pd_catalog, pd_command){
    
    var config = { headers: {  
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'}
    }
    axios.post( back_server.restful_api_base_url()+'ProcessDetail/',{ pd_catalog : pd_catalog , pd_command : pd_command }, config
    )
    .then(function (response) {
        //console.log(response);
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
  export {processDetail,exportExcel,utf16ToUtf8,uribase64encode,_blankAndoComma}


