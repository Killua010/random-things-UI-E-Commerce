export default function auth(state = null, action){
	switch(action.type){
	case "ALTER_AUTH":
		return action.auth;
	default:
		return state;
	}
}