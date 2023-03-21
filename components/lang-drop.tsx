import { Listbox, Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState } from "react";
const LangDrop = () => {
	const languages = [
		{ verbose: "arabic", value: "ar" },
		{ verbose: "english", value: "en" },
	];
	const router = useRouter();
	const { pathname, asPath, query, locale } = router;
	const { t, i18n } = useTranslation(["common"]);
	const [selectedLanguage, setSelectedLanguage] = useState(locale);
	const changeLanguage = (language: string) => {
		setSelectedLanguage(language);
		router.push({ pathname, query }, asPath, { locale: language });
		i18n.changeLanguage(language);
	};

	return (
		<div className="relative">
			<Listbox value={selectedLanguage} onChange={changeLanguage}>
				{({ open }) => (
					<>
						<Listbox.Button
							className={`${
								router.pathname !== "/hotel" ? "text-dark-shade" : "text-white"
							} flex justify-between items-center gap-2 px-3 py-2 bg-transparent w-full md:max-w-fit`}>
							<div className="font-bold ">
								{t(
									`common:${selectedLanguage === "ar" ? "arabic" : "english"}`
								)}
							</div>
							<i
								className={`${
									open ? "rotate-180" : ""
								} icon-expand_more_black_24dp text-sm transform transition-transform ease-in-out duration-150 text-primary`}></i>
						</Listbox.Button>
						<Transition
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0">
							<Listbox.Options className="absolute z-20 w-full shadow-lg px-1.5 bg-white divide-y divide-solid divide-dark-tint">
								{languages.map((language) => (
									<Listbox.Option
										className={`cursor-pointer font-medium px-1.5 py-1 text-start text-dark-shade hover:text-secondary `}
										key={language.value}
										value={language.value}>
										{t(`common:${language.verbose}`)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</>
				)}
			</Listbox>
		</div>
	);
};

export default LangDrop;
