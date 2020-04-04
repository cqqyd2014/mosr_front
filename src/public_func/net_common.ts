export interface InterIp4{ip1:number,ip2:number,ip3:number,ip4:number}

export const combineIps=(param:InterIp4)=>{
	return param.ip1+'.'+param.ip2+'.'+param.ip3+'.'+param.ip4
}

export const getPartFromIpString=(param:string,index:number)=>{
	let arr=getArrayFromIpString(param)
	return Number(arr[index])
}

export const getArrayFromIpString=(param:string)=>{
	return param.split('.')
}