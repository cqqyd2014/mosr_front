export interface interInitState{
	user_name:string,
	nickname:string,
	user_uuid:string,
	user_roles:[],
	user_last_login_datetime:Date,
	isLoggedIn:boolean,
}

export const initState:interInitState = {
        user_name: '',
		nickname:'',
		user_uuid:'',
        user_roles:[],
		user_last_login_datetime:new Date,
        
        isLoggedIn: false,
    }