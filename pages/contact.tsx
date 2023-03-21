import { GetStaticProps, NextPage } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import Image from "next/image"
import HeadSeo from "../components/HeadSeo"
import Layout from "../components/layout"
import siteMetadata from "../data/siteMetadata"
import nextI18nextConfig from "../i18n/next-i18next.config"

const Contact: NextPage = () => {
  const { t } = useTranslation(["common", "search", "button"])

  return (
    <>
      <HeadSeo
        title={t("common:contact-title")}
        description={t("home:mada")}
        canonicalUrl={siteMetadata.siteUrl}
        ogTwitterImage={siteMetadata.siteLogoSquare}
        ogType={"website"}
      />
      <Layout>
        <section className=" relative bg-secondary-tint w-full ">
          <div className="absolute start-0 w-3/12 min-w-[6rem] lg:min-w-[11rem] h-full md:w-1/12 ">
            <div className="relative w-full h-full opacity-20">
              <Image
                alt={"mada-logo"}
                src={"/images/abstract.svg"}
                layout="fill"
                objectFit="cover"
              ></Image>
            </div>
          </div>
          <div className=" container  md:mx-auto py-32 pb-12 lg:py-48  relative z-10 flex flex-col lg:flex-row gap-12">
            <div className="px-6 md:px-24 w-full lg:w-3/6 h-full">
              <div className="inline-block mb-8">
                <h1 className="text-primary font-bold text-3xl lg:text-[50px] lg:mb-10 mb-2">
                  {t("common:contact-us")}
                </h1>
                <div className="h-1 md:h-1.5 w-3/5 bg-secondary "></div>
              </div>
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <h1 className="text-base lg:text-xl font-bold text-primary">
                    {t("input:phone-number")}
                  </h1>
                  <div className="text-secondary font-bold text-xl lg:text-3xl">
                  <bdi> 00 966 533 333 570 </bdi> 
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-base lg:text-xl font-bold text-primary">
                    {t("input:email")}
                  </h1>
                  <div className="text-secondary font-bold text-xl lg:text-3xl">
                    info@madatourism.com
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-base lg:text-xl font-bold text-primary">
                    {t("input:address")}
                  </h1>
                  <div className="text-secondary font-bold text-xl lg:text-3xl">
                    الرصيفة، 7576, مكة 24232 الشيرف يحيى تايم تاور
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-base lg:text-xl font-bold text-primary">
                    {t("input:num-tax")}
                  </h1>
                  <div className="text-secondary font-bold text-xl lg:text-3xl">
                    300444473100003
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-[90vh] lg:w-3/6  ">
              <div className="relative h-[360px] lg:h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14858.071328800854!2d39.7833725!3d21.4088819!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xdce3abe9e4f76395!2sMada%20Tourism!5e0!3m2!1sen!2stn!4v1650270272893!5m2!1sen!2stn"
                  width="600"
                  height="450"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(
        context.locale as string,
        ["common", "button", "home", "input"],
        nextI18nextConfig
      )),
    },
  }
}
export default Contact
