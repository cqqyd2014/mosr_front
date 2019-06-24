var back_server = {

    restful_api_base_url(){
        let hostname = window.document.location.hostname;
        
        return 'http://'+hostname+':5000/';
    },
    ws_api_base_url(){
        let hostname = window.document.location.hostname;
        
        return 'http://'+hostname+':5000/';
    }

}

export default back_server;