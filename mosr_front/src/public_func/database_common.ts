export interface InterGenUrl{d_type:string,d_ip:string,d_port:number,
d_db_name:string,d_db_username:string,d_db_password:string}
//未用
export const gen_db_url=(param:InterGenUrl):string=>{
	if (param.d_type=='MS SQLSERVER'){
		return 'mssql+pymssql://'+param.d_db_username+':'+param.d_db_password+'@'+param.d_ip+'/'+param.d_db_name
	}
	if (param.d_type=='ORACLE'){
		return 'oracle://'+param.d_db_username+':'+param.d_db_password+'@'+param.d_ip+'/'+param.d_db_name
	}
	return ''
	
}