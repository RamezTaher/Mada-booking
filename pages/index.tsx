import { GetServerSideProps } from "next";

export default function Page({ errorCode }) {
	return <div>{`${errorCode}`}</div>;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
	// Insert redirect rules here
	if (context.req.url === "/") {
		context.res.statusCode = 308;
		context.res.setHeader("location", "/hotel");
		// Caching headers
		context.res.setHeader("Cache-control", "s-maxage=600");
		context.res.end();
		return { props: {} };
	}

	return {
		props: {
			errorCode: 404,
		},
	};
};
