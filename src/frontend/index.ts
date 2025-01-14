import { AuthClient } from "@dfinity/auth-client";
import { handleAuthenticated, renderIndex } from "./views";
console.log(process.env.NODE_ENV)
console.log(process.env.__CANISTERS__)
// One day in nanoseconds
const days = BigInt(1);
const hours = BigInt(24);
const nanoseconds = BigInt(3600000000000);

export const defaultOptions = {
	createOptions: { idleOptions: { disableIdle: true, }, }, // Set to true if you do not want idle functionality
	loginOptions: {
		identityProvider:
			process.env.DFX_NETWORK === "ic" ? "https://identity.ic0.app/#authorize" : `http://localhost:4943?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai#authorize`,
		maxTimeToLive: days * hours * nanoseconds, }, }; // Maximum authorization expiration is 8 days

const init = async () => {
	const authClient = await AuthClient.create(defaultOptions.createOptions);
	if (await authClient.isAuthenticated()) { handleAuthenticated(authClient); }
	renderIndex();
	setupToast();
};

async function setupToast() {
	const status = document.getElementById("status");
	const closeButton = status?.querySelector("button");
	closeButton?.addEventListener("click", () => { status?.classList.add("hidden"); });
}

init();
