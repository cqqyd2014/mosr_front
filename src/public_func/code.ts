/*
base64编码
*/

export const encodeBase64Content=(commonContent:string)=>{
	let base64Content=Buffer.from(commonContent).toString('base64')
	return base64Content
}

/**
base解码
 */
export const decodeBase64Content=(base64Content:string)=>{
	let commonContent=base64Content.replace(/\s/g,'+')
	commonContent=Buffer.from(commonContent,'base64').toString()
	return commonContent
}