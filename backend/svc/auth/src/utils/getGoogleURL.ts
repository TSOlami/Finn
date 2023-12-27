import qs from "qs";

function getGoogleOAuthURL() {
	const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
	const options = {
		redirect_uri: `${process.env.GOOGLE_REDIRECT_URL}`,
		client_id: `${process.env.GOOGLE_CLIENT_ID}`,
		access_type: "offline",
		response_type: "code",
		prompt: "consent",
		scope: [
			"https://www.googleapis.com/auth/userinfo.profile",
			"https://www.googleapis.com/auth/userinfo.email",
		].join(" "),
	};

	console.log("options: ", options);
	console.log("qs.stringify(options): ", qs.stringify(options));

	return `${rootUrl}?${qs.stringify(options)}`;
}

export { getGoogleOAuthURL };