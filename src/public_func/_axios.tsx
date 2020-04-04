
import { Modal } from 'antd';


const server_ip = 'http://localhost:5000';
const axios = require('axios');

interface InterCallback {
	(res: string): void
}

export interface InterRequests {
	url: string, info_title: string, loading?: boolean, data?: object


}
export interface InterResponses {
	config: any,
	data: any,
	headers: { 'content-type': string, last_modified?: string }
	status: number,
	statusText: string
}




export const on_error=(error: { Error?: any, response: { data: { message?: string,status?:boolean }, status: number, headers: any } }
,title:string,callback:InterCallback,url:string)=>{
	let error_callback_message=''
	if (error.response) {
				let error_response = error.response;
				if (error_response.status == 404) {
					if (error_response.data.message&&
					error_response.data.status==false) {
						//找不到资源
						error_callback_message=error_response.data.message
						


					}

				}
				else {
					error_callback_message='出错，状态码：' + error_response.status
					
				}
			}
			else {
				error_callback_message='无法访问网络地址' + server_ip + url + '，请检查网络环境'
				
			}
			//出错之后也要返回，不然前台的确定按钮，不能复原
			console.log(error)
			
			Modal.error({
					title: title,
					content: error_callback_message,
				});
			let obj:any={'status':false,'message':error_callback_message}
			callback(obj)
	
}

export const on_success=(response: InterResponses,callback:InterCallback,url:string)=>{
	let data: any = response.data;
			try {
				callback(data);
			} catch (error) {
				console.log('axios返回结果，但callback出错。请求地址：' + server_ip + url + '；出错信息：' + error)
			}
}

export const axios_jsonput=(_put:InterRequests,callback:InterCallback)=>{
	//let data ={'array_datas':[{"code":"1234","name":"yyyy",'_for_xywl2019_update':{'pk':{'uuid':'uuidstring'},'last_modified':'2020-12-21 00.00.00.000000','e_tag':'uuidstring'}}]} ;
	axios.put(server_ip + _put.url, _put.data)
		.then((response: InterResponses) => {
			on_success(response,callback,_put.url)
		}).catch(function(error: { Error?: any, response: { data: { message?: string }, status: number, headers: any } }) {
			
			on_error(error,_put.info_title,callback,_put.url)

		})
		.then(function() {
			// always executed
		});
}

export const axios_jsonpost = (_post: InterRequests, callback: InterCallback) => {
	//let data ={'array_datas':[{"code":"1234","name":"yyyy"}]} ;
	axios.post(server_ip + _post.url, _post.data)
		.then((response: InterResponses) => {
			on_success(response,callback,_post.url)
		}).catch(function(error: { Error?: any, response: { data: { message?: string }, status: number, headers: any } }) {
			
			on_error(error,_post.info_title,callback,_post.url)

		})
		.then(function() {
			// always executed
		});
}

export const axios_delete=(req: InterRequests, callback: InterCallback) => {
	axios.delete(server_ip + req.url,{data:req.data})
		.then((response: InterResponses) => {
			on_success(response,callback,req.url)

		})
		.catch(function(error: { Error?: any, response: { data: { message?: string }, status: number, headers: any } }) {
			
			on_error(error,req.info_title,callback,req.url)

		})
		.then(function() {
			// always executed
		});
}



export const axios_response = (req: InterRequests, callback: InterCallback) => {
	axios.get(server_ip + req.url)
		.then((response: InterResponses) => {
			on_success(response,callback,req.url)

		})
		.catch(function(error: { Error?: any, response: { data: { message?: string }, status: number, headers: any } }) {
			
			on_error(error,req.info_title,callback,req.url)

		})
		.then(function() {
			// always executed
		});
}
