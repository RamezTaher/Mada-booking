import type { GetServerSideProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "../../components/layout";
import nextI18NextConfig from "../../i18n/next-i18next.config.js";
import HotelSearch from "../../components/hotels-search";
import Image from "next/image";
import StartsBox from "../../components/starts-box";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useLocalStorage } from "react-use";

import format from "date-fns/format";
import { addDays } from "date-fns";
import Link from "next/link";
import HeadSeo from "../../components/HeadSeo";
import siteMetadata from "../../data/siteMetadata";
import ModalError from "../../components/ModalError";
import { getPostsNumber } from "../../lib/posts";
import { useCities } from "../../hooks/useCities";
import Header from "../../components/header";

type Props = {
	availableHotels: Hotel[];
	posts: any;
};

type Hotel = {
	Adress: string;
	AdressAr: string;
	DefaultPicture: string;
	Stars: number;
	Name: string;
	NameAr: string;
	Slug: string;
};

const Home: NextPage<{ availableHotels: Hotel[] }> = ({
	availableHotels,
	posts,
}: Props) => {
	const { t, i18n } = useTranslation([
		"common",
		"home",
		"button",
		"validation",
	]);
	const { data, isLoading } = useCities();

	const videoRef = useRef<HTMLVideoElement>(null);
	const [videoPlaying, setVideoPlaying] = useState(false);
	const videoHandler = (playing: boolean) => {
		if (videoRef.current) {
			if (playing) {
				videoRef.current.play();
				setVideoPlaying(true);
			} else {
				videoRef.current.pause();
				setVideoPlaying(false);
			}
		}
	};
	const router = useRouter();
	const [chosenRoomsStorage, setChosenRoomsStorage, removeChosenRoomsStorage] =
		useLocalStorage("chosenRooms", []);
	const [chosenHotelStorage, setChosenHotelStorage, removeChosenHotelStorage] =
		useLocalStorage("chosenHotel", {});
	const [guestInfo, setGuestInfo, removeGuestInfo] = useLocalStorage(
		"guestInfo",
		{}
	);
	const [
		selectedHotelStorage,
		setSelectedHotelStorage,
		removeSelectedHotelStorage,
	] = useLocalStorage("selectedHotel", {});
	

	const [showModal, setShowModal] = useState(false);
	const handleGoToSearch = (data) => {
		router.push({
			pathname: "hotel/search",
			query: data,
		});
		removeChosenRoomsStorage();
		removeChosenHotelStorage();
		removeGuestInfo();
		removeSelectedHotelStorage();
	};
	return (
		<>
			<HeadSeo
				title={t("home:best-hotels-best-price")}
				description={t("home:mada")}
				canonicalUrl={siteMetadata.siteUrl}
				ogTwitterImage={siteMetadata.siteLogoSquare}
				ogType={"website"}
			/>
			<Layout>
				<section className="relative bg-secondary w-full ">
					<div className="relative z-20">
						<Header />
					</div>

					<div className="absolute start-0 w-3/12 min-w-[6rem] lg:min-w-[11rem] h-full md:w-1/12 bg-primary">
						<div className="relative w-full h-full opacity-20">
							<Image
								alt={"mada-logo"}
								src={"/images/abstract-w.svg"}
								layout="fill"
								objectFit="cover"></Image>
						</div>
					</div>
					<div className="container px-6 sm:mx-auto py-48 md:px-24 relative">
						<h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6 md:mb-14">
							{t("home:best-hotels-best-price")}
						</h1>
						{isLoading && (
							<HotelSearch goToSearch={handleGoToSearch} citiesList={data} />
						)}
						{!isLoading && (
							<HotelSearch goToSearch={handleGoToSearch} citiesList={data} />
						)}
					</div>
					<div className="absolute top-0 end-0 w-3/12 min-w-[6rem] lg:min-w-[11rem] h-full md:w-1/12 bg-transparent">
						<div className="relative w-full h-full opacity-20">
							<Image
								alt={"mada-logo"}
								src={"/images/abstract-w.svg"}
								layout="fill"
								objectFit="cover"></Image>
						</div>
					</div>
				</section>
				<section className="relative py-20">
					<div className="absolute top-0 end-0 w-3/12 min-w-[6rem] lg:min-w-[11rem] h-full md:w-1/12 bg-transparent">
						<div className="relative w-full h-full">
							<Image
								alt={"mada-logo"}
								src={"/images/abstract.svg"}
								layout="fill"
								objectFit="cover"></Image>
						</div>
					</div>
					<div className="container px-6 md:px-24 sm:mx-auto relative z-10">
						<div className="inline-block mb-20">
							<h1 className="text-primary font-bold text-3xl lg:text-5xl mb-2">
								{t("home:special-hotels")}
							</h1>
							<div className="h-1 md:h-1.5 w-3/5 bg-secondary"></div>
						</div>
						<div className="flex gap-4 snap-mandatory snap-x overflow-x-auto p-4 -mx-4">
							{availableHotels.map((availableHotel) => (
								<div
									onClick={() => {
										setSelectedHotelStorage(availableHotel);
									}}
									key={availableHotel.Slug}
									className="h-80 w-64 bg-white shadow-md cursor-pointer">
									<Link
										passHref
										href={{
											pathname: `/hotel/[slug]`,
											query: {
												slug: availableHotel.Slug,
												checkin: format(addDays(new Date(), 0), "yyyy-MM-dd"),
												checkout: format(addDays(new Date(), 1), "yyyy-MM-dd"),
											},
										}}>
										<div className="h-full w-full">
											<div className="relative h-56">
												<Image
													alt="hotel"
													src={
														availableHotel?.DefaultPicture ??
														"/images/no-hotel.jpg"
													}
													layout="fill"
													objectFit="cover"></Image>
											</div>
											<div className="p-4 flex flex-col">
												<h2 className="font-bold w-52 line-clamp-1">
													{i18n.language === "ar"
														? availableHotel.NameAr
														: availableHotel.Name}
												</h2>
												<StartsBox rating={availableHotel.Stars} />
												<p className="text-xs text-dark line-clamp-1 ">
													{i18n.language === "ar"
														? availableHotel.AdressAr ?? availableHotel.Adress
														: availableHotel.Adress}
												</p>
											</div>
										</div>
									</Link>
								</div>
							))}
						</div>
					</div>
				</section>
				<section className="bg-primary relative py-20">
					<div className="absolute top-0 start-0 w-3/12 min-w-[6rem] lg:min-w-[11rem] h-full md:w-1/12 bg-transparent">
						<div className="relative w-full h-full">
							<Image
								alt={"mada-logo"}
								src={"/images/abstract-g.svg"}
								layout="fill"
								objectFit="cover"></Image>
						</div>
					</div>
					<div className="container px-6 md:px-24 sm:mx-auto ">
						<div className="relative">
							<div className=" border-l-[6px] border-solid border-white absolute top-0 bottom-1/2 left-0"></div>
							<div className="border-t-[6px]  border-solid border-white absolute top-0 left-0 right-1/4  "></div>
							<div className="border-b-[6px]  border-solid border-white absolute bottom-0 right-0 left-1/4  "></div>
							<div className="border-r-[6px] border-solid border-white absolute top-1/2 bottom-0 right-0"></div>
							<video
								loop
								onClick={() => videoHandler(false)}
								ref={videoRef}
								className="w-100 w-full p-6">
								<source src={"/images/mada-promotion.mp4"} type="video/mp4" />
							</video>
							{!videoPlaying && (
								<i
									onClick={() => videoHandler(true)}
									className="icon-play_circle_outline_black_24dp z-10 absolute text-8xl right-[calc(50%-47px)] text-white top-[calc(50%-47px)] cursor-pointer"></i>
							)}
						</div>
					</div>
					<div className="container px-6 md:px-24 sm:mx-auto relative z-10">
						<div className="text-end">
							<div className="inline-block my-20">
								<h1 className="text-white font-bold text-3xl lg:text-5xl mb-2">
									{t("home:latest-blogs")}
								</h1>
								<div className="h-1 md:h-1.5 w-3/5 bg-white ms-auto"></div>
							</div>
						</div>
						<div className="grid grid-cols-1 lg:grid-rows-2 lg:grid-cols-3 gap-4">
							<Link
								passHref
								href={`${process.env.NEXT_PUBLIC_BLOG_URL}/post/${posts[0]?.slug}`}>
								<a
									target="_blank"
									className="lg:col-span-2 lg:row-span-2 cursor-pointer ">
									<div className="bg-white h-full">
										<div className="relative">
											<Image
												alt="hotel"
												src={posts[0]?.feature_image ?? "/images/no-hotel.jpg"}
												layout="responsive"
												width={720}
												height={460}
												objectFit="cover"></Image>
										</div>
										<div className="p-4">
											<div className="text-dark text-xs">
												{posts[0]?.dateFormatted}
											</div>
											<div className="lg:text-3xl font-bold  line-clamp-2">
												{posts[0]?.title}
											</div>
											<p className="font-medium text-sm lg:text-xl  line-clamp-2 lg:line-clamp-3">
												{posts[0]?.excerpt}
											</p>
										</div>
									</div>
								</a>
							</Link>
							<Link
								passHref
								href={`${process.env.NEXT_PUBLIC_BLOG_URL}/post/${posts[1]?.slug}`}>
								<a
									target="_blank"
									className="col-span-1 row-span-1 cursor-pointer">
									<div className="bg-white h-full">
										<div className="relative">
											<Image
												alt="hotel"
												src={posts[1]?.feature_image ?? "/images/no-hotel.jpg"}
												layout="responsive"
												width={350}
												height={220}
												objectFit="cover"></Image>
										</div>
										<div className="p-4">
											<div className="text-dark text-xs">
												{posts[1]?.dateFormatted}
											</div>
											<div className=" font-bold  line-clamp-2">
												{posts[1]?.title}
											</div>
											<p className="font-medium text-sm  line-clamp-2">
												{posts[1]?.excerpt}
											</p>
										</div>
									</div>
								</a>
							</Link>
							<Link
								passHref
								href={`${process.env.NEXT_PUBLIC_BLOG_URL}/post/${posts[2]?.slug}`}>
								<a
									target="_blank"
									className="col-span-1 row-span-1  cursor-pointer">
									<div className="bg-white h-full">
										<div className="relative">
											<Image
												alt="hotel"
												src={posts[2]?.feature_image ?? "/images/no-hotel.jpg"}
												layout="responsive"
												width={350}
												height={220}
												objectFit="cover"></Image>
										</div>
										<div className="p-4">
											<div className="text-dark text-xs">
												{" "}
												{posts[2]?.dateFormatted}
											</div>
											<div className=" font-bold  line-clamp-2">
												{" "}
												{posts[2]?.title}
											</div>
											<p className="font-medium text-sm  line-clamp-2">
												{" "}
												{posts[2]?.excerpt}
											</p>
										</div>
									</div>
								</a>
							</Link>
						</div>
					</div>
				</section>
				<section className="bg-dark-tint py-8">
					<div className="container px-6 md:px-24 sm:mx-auto">
						<div className="text-center">
							<div className="inline-block my-20">
								<h1 className="text-primary font-bold text-3xl lg:text-5xl mb-2">
									{t("home:features")}
								</h1>
								<div className="h-1 md:h-1.5 w-3/5 bg-secondary mx-auto"></div>
							</div>
						</div>
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-24">
							<div className="flex bg-white flex-col justify-center items-center gap-6 shadow-md border border-solid border-dark-tint py-20  px-6 hover:bg-primary hover:text-white">
								<i className="icon-first text-8xl"></i>
								<div className="font-bold text-3xl text-center">
									{t("home:best-economical-prices")}
								</div>
							</div>
							<div className="flex bg-white flex-col justify-center items-center gap-6 shadow-md border border-solid border-dark-tint py-20 px-6 hover:bg-primary hover:text-white">
								<i className="icon-tap text-8xl"></i>
								<div className="font-bold text-3xl text-center">
									{t("home:safe-rapid-booking")}
								</div>
							</div>
							<div className="flex bg-white flex-col justify-center items-center gap-6 shadow-md border border-solid border-dark-tint py-20 px-6 hover:bg-primary hover:text-white">
								<i className="icon-shield-2 text-8xl"></i>
								<div className="font-bold text-3xl text-center">
									{t("home:best-hotels-in-haram")}
								</div>
							</div>
						</div>
						<div className="bg-white shadow-md p-4 mb-16">
							<h2 className="font-bold text-3xl pt-12 pb-4 px-4 md:px-20 border-t-4 border-e-4 text-center border-primary border-solid">
								{t("home:stay-connected-with-us")}
							</h2>
							<p className="text-dark text-center my-6">
								{t("home:please-fill-your-data")}
							</p>
							<div className="flex flex-col gap-4 md:gap-0 md:flex-row items-center pb-12 pt-4 px-4 md:pe-24 md:ps-20 border-b-4 border-s-4 border-primary border-solid">
								<input
									type="text"
									className="rounded-full md:rounded-s-full h-full placeholder-dark border-solid border-dark-tint border md:border-e-0"
									placeholder={t("input:email")}
								/>
								<button className="btn btn-secondary rounded-full md:max-w-[12rem] md:-mx-6">
									{t("button:subscribe")}
								</button>
							</div>
						</div>
					</div>
				</section>
				{showModal && (
					<ModalError
						text={t("validation:fill-all-fields")}
						onClose={() => setShowModal(false)}
					/>
				)}
			</Layout>
		</>
	);
};
export const getServerSideProps: GetServerSideProps = async (context) => {
	const resAvailableHotels = await fetch(
		`${process.env.NEXT_PUBLIC_API}/Hotels/GetAvailableHotels`
	);
	const availableHotels = await resAvailableHotels.json();

	const posts = await getPostsNumber(3, "article");

	posts.map((post) => {
		const options: any = {
			year: "numeric",
			month: "long",
			day: "2-digit",
		};

		post.dateFormatted = new Intl.DateTimeFormat("ar-MA", options).format(
			new Date(post.published_at)
		);
	});

	if (!posts) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			...(await serverSideTranslations(
				context.locale as string,
				["common", "button", "home", "input", "validation"],
				nextI18NextConfig
			)),

			availableHotels: availableHotels,
			posts,
		},
	};
};
export default Home;
