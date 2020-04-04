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




export interface InterSFTS{d_type:string,d_table_name:string}
export const select_from_table_sql=(param:InterSFTS):string=>{
	if (param.d_type=='MS SQLSERVER'){
		
		return 'select * from ['+param.d_table_name+']'
	}
	if (param.d_type=='ORACLE'){

		return "select * from "+param.d_table_name
	}
	console.log('通过Table名得到SQL出错，缺少d_type')
	return ''
}


export interface InterSTFTS{d_type:string,d_table_name:string,d_top_num:number}
export const select_top_from_table_sql=(param:InterSTFTS):string=>{
	if (param.d_type=='MS SQLSERVER'){
		
		return 'select top '+param.d_top_num+' * from ['+param.d_table_name+']'
	}
	if (param.d_type=='ORACLE'){

		return "select * from "+param.d_table_name+ " where rownum<"+param.d_top_num
	}
	console.log('通过Table名得到TOPSQL出错，缺少d_type')
	return ''
}