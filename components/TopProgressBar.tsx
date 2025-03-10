import Router from "next/router";
import NProgress from "nprogress";

let timer;
let state;
let activeRequests = 0;
const delay = 250;

function load() {
	if (state === "loading") {
		return;
	}
	state = "loading";
	timer = setTimeout(function () {
		NProgress.start();
	}, delay); // only show progress bar if it takes longer than the delay
}

function stop() {
	if (activeRequests > 0) {
		return;
	}
	state = "stop";
	clearTimeout(timer);
	NProgress.done();
}
const originalFetch = window.fetch;
window.fetch = async function (...args) {
	if (
		activeRequests !== 0 &&
		![
			"/hotel/search/",
			`/hotel/${window.location.pathname.split("/")[2]}/`,
		].includes(window.location.pathname)
	) {
		load();
	}
	activeRequests++;

	try {
		const response = await originalFetch(...args);
		return response;
	} catch (error) {
		return Promise.reject(error);
	} finally {
		activeRequests -= 1;
		if (activeRequests === 0) {
			stop();
		}
	}
};
if (
	![
		"/hotel/search/",
		`/hotel/${window.location.pathname.split("/")[2]}/`,
	].includes(window.location.pathname)
) {
	Router.events.on("routeChangeStart", load);
}

Router.events.on("routeChangeComplete", stop);
Router.events.on("routeChangeError", stop);

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
	return null;
};
