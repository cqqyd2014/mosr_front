
//转换json数据为antd的表格数据，需要指定key，如果有单一主键，可采用，如果没有，用复合主键
//复合的方法key1=:key2=:key3，要求每个字段不能有=:
export interface InterRTR{'data':any,'keys':string[],starIndex:number}

export const recordToRow=(param:InterRTR)=>{
	console.log(param.data)
	return param.data.map((item:any,row_index: number) => {
		return {...item,'_index':row_index+param.starIndex+1,'key':(param.keys.map((key:any)=>{
			//console.log(key)
			return item[key]
		}).join('=:'))}
	})
}