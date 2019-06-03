export default function client(state = "", action){
	switch(action.type){
	case "SEARCH":
		return action.param;
	default:
		return state;
	}
}