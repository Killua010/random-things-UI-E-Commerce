export default function client(state = null, action){
	switch(action.type){
	case "ALTER_CLIENT":
		return action.client;
	default:
		return state;
	}
}