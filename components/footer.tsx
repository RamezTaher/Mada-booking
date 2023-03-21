import { useTranslation } from "next-i18next"
import Link from "next/link"
import Image from "next/image"
const Footer = () => {
  const { t }: { t: any } = useTranslation(["common", "button"])
  return (
    <footer className="w-full flex relative">
      <div className="w-3/12 md:w-1/12 min-w-[6rem] lg:min-w-[11rem] bg-primary">
        <div className="relative w-full h-full opacity-20">
          <Image
            alt={"mada-logo"}
            src={"/images/abstract-w.svg"}
            layout={"fill"}
            objectFit="cover"
          ></Image>
        </div>
      </div>
      <div className="bg-secondary w-9/12 md:w-10/12">
        <div className="md:border-b border-primary border-solid ">
          <div className="container px-6 pt-7 pb-2 mx-auto flex justify-between flex-col lg:flex-row gap-6 md:gap-10 ">
            <div className="w-full ">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 ">
                <Link href="/" passHref>
                  <h3 className="font-bold cursor-pointer text-white text-sm">
                    {t("common:about")}
                  </h3>
                </Link>
                <Link href="/" passHref>
                  <h3 className="font-bold cursor-pointer text-white text-sm">
                    {t("common:blog")}
                  </h3>
                </Link>
                <Link href="/" passHref>
                  <h3 className="font-bold cursor-pointer text-white text-sm">
                    {t("common:terms-conditions")}
                  </h3>
                </Link>
                <Link href="/" passHref>
                  <h3 className="font-bold cursor-pointer text-white text-sm">
                    {t("common:about-us")}
                  </h3>
                </Link>
                <Link href="/" passHref>
                  <h3 className="font-bold cursor-pointer text-white text-sm">
                    {t("common:service-guarantee")}
                  </h3>
                </Link>
                <Link href="/" passHref>
                  <h3 className="font-bold cursor-pointer text-white text-sm">
                    {t("common:contact-us")}
                  </h3>
                </Link>
                <Link href="/" passHref>
                  <h3 className="font-bold cursor-pointer text-white text-sm">
                    {t("common:privacy-policy")}
                  </h3>
                </Link>
              </div>
              <div className="mt-16 ">
                <div className="flex justify-center items-center gap-2 border-b md:border-b-0 pb-4 border-primary border-solid">
                  <i className="icon-snapchat-brands text-primary cursor-pointer"></i>
                  <i className="icon-instagram-brands text-primary cursor-pointer"></i>
                  <i className="icon-vuesax-bold-facebook text-primary cursor-pointer"></i>
                  <i className="icon-twitter-brands text-primary cursor-pointer"></i>
                  <i className="icon-youtube-brands text-primary cursor-pointer"></i>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <Image
                alt={"mada-logo"}
                src={"/images/mada-logo-1.svg"}
                width={168}
                height={137}
                layout="fixed"
              ></Image>
            </div>
          </div>
        </div>
        <div className="text-xs text-white text-center py-2">
          Copyright &copy; 2016-<span>{new Date().getFullYear()}</span>{" "}
          MadaTourism.com™. All rights reserved.
        </div>
      </div>
      <div className="w-1/12 bg-secondary hidden md:block"></div>
    </footer>
  )
}

export default Footer
