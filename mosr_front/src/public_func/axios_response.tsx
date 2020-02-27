
import { Modal } from 'antd';


const server_ip = 'http://localhost:5000';
const axios = require('axios');
interface interCallback {
	(res: string): void
}

export interface interRequests {
	url: string, info_title: string


}
export interface interResponses {
	config: any,
	data: any,
	headers: { 'content-type': string, last_modified?: string }
	status: number,
	statusText: string
}
export const axios_response = (req: interRequests, callback: interCallback) => {
	axios.get(server_ip + req.url)
		.then(function(response: interResponses) {
			// handle success
			console.log(response);
			let data: any = response.data;
			callback(data);
		})
		.catch(function(error: { Error?: any, response: { data: { mosr_message?: string }, status: number, headers: any } }) {
			// handle error
			console.log('error');
			if (error.response) {
				let error_response = error.response;
				if (error_response.status == 404) {
					if (error_response.data.mosr_message) {
						Modal.error({
							title: req.info_title,
							content: error_response.data.mosr_message,
						});


					}

				}
				else {
					Modal.error({
						title: req.info_title,
						content: '出错，状态码：' + error_response.status,
					});
				}
			}
			else{
				Modal.error({
					title: req.info_title,
					content: '无法访问网络地址' + server_ip + req.url + '，请检查网络环境',
				});
			}
			
		})
		.then(function() {
			// always executed
		});
}
