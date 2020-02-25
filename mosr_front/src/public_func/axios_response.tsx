
import { Modal } from 'antd';


const server_ip='http://localhost:5000';
const axios = require('axios');
interface callback {
	(res: string): void
}

export interface requests {
	url: string, info_title: string


}
export interface responses {
	config: any,
	data: any,
	headers: { 'content-type': string, last_modified?: string }
	status: number,
	statusText: string
}

export const axios_response = (req: requests, callback: callback) => {
	axios.get(server_ip+req.url)
		.then(function(response: responses) {
			let data: any = response.data;


			callback(data)

			console.log(response);
		})
		.catch(function(error: { Error?:any,response: { data: { mosr_message?: string }, status: number, headers: any } }) {
			// handle error
			//console.log(server_ip+req.url);
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
				else{
					Modal.error({
							title: req.info_title,
							content: '出错，状态码：'+error_response.status,
						});
				}
			}
			else{
				//console.log(error.response)
				Modal.error({
							title: req.info_title,
							content: '无法访问网络，请检查网络环境',
						});
			}
			
			callback('error')
			
		})
		.then(function() {
			// always executed

		});

}