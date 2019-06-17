export function setAuth(auth) {
	return {
		type: "ALTER_AUTH",auth: auth
	};
}