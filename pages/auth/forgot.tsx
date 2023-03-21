import { useTranslation } from "next-i18next"
import Head from "next/head"
import React, { useState } from "react"
import Layout from "../../components/layout"
import Image from "next/image"
import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import nextI18NextConfig from "../../i18n/next-i18next.config"
import Link from "next/link"
import HeadSeo from "../../components/HeadSeo"
import siteMetadata from "../../data/siteMetadata"
type Props = {}

const Forgot = (props: Props) => {
  const { t } = useTranslation(["common", "search", "button"])
  const [form, setForm] = useState({
    email: "",
  })

  const onChangeForm = (e: React.FormEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value })
  }
  return (
    <>
      <HeadSeo
        title={t("common:auth-forgot")}
        description={t("home:mada")}
        canonicalUrl={siteMetadata.siteUrl}
        ogTwitterImage={siteMetadata.siteLogoSquare}
        ogType={"website"}
      />
      <Layout>
        <div className="absolute start-0 z-0 w-3/12 min-w-[6rem] lg:min-w-[11rem] h-full md:w-1/12 md:block hidden ">
          <div className="relative w-full h-full">
            <Image
              alt={"mada-logo"}
              src={"/images/abstract-g.svg"}
              layout="fill"
              objectFit="cover"
            ></Image>
          </div>
        </div>
        <div className="bg-secondary-tint py-24">
          <section className="relative z-10 py-12">
            <div className="container px-6 md:mx-auto">
              <div className="text-start">
                <div className="inline-block mb-20">
                  <h1 className="text-primary font-bold text-3xl md:text-5xl mb-3">
                    {t("auth:did-you-forgot-password")}
                  </h1>
                  <div className="h-1 md:h-1.5 w-1/3 bg-secondary me-auto"></div>
                </div>
              </div>
              <div className="flex justify-between items-center gap-16 flex-col lg:flex-row">
                <form className="w-full lg:w-1/2 lg:pe-24">
                  <div className="mb-4">
                    <label className="font-bold" htmlFor="email">
                      {t("auth:enter-your-email-to-reset")}
                    </label>
                    <input
                      value={form.email}
                      className="my-3"
                      type="email"
                      name="email"
                      id="email"
                      placeholder={t("input:email")}
                      onChange={(e) => onChangeForm(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <button
                      className="btn btn-secondary-outline rounded-full text-xl"
                      type="submit"
                    >
                      {t("button:cancel")}
                    </button>
                    <button
                      className="btn btn-secondary rounded-full text-xl"
                      type="submit"
                    >
                      {t("button:send")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}
export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(
        context.locale as string,
        ["common", "button", "auth", "input"],
        nextI18NextConfig
      )),
    },
  }
}
export default Forgot
