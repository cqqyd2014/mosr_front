/**
  * 时间格式yyyy-MM-dd HH:mm:ss.S
 */
export const dateFormatterFull=(date:Date)=>{
    
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const strDate = date.getDate().toString().padStart(2, '0');
    return `${date.getFullYear()}-${month}-${strDate} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
}