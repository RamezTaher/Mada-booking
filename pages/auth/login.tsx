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
import { useRouter } from "next/router"
import { useLocalStorage } from "react-use"
import { useForm } from "react-hook-form"
import ModalError from "../../components/ModalError"
import { url } from "inspector"
type Props = {}

const Login = (props: Props) => {
  const { t, i18n } = useTranslation([
    "common",
    "button",
    "auth",
    "input",
    "validation",
  ])

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ reValidateMode: "onChange", mode: "all" })

  const onSubmit = async (formData) => {
    if (isValid) {
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/account/Login`,
          options
        )
        const data = await res.json()
        if (data.success) {
          setauthSucc(data.success)
          setUser(data.user)
          setToken(data.token)
          if (router.query && router.query.from) {
            router.push({ pathname: "/hotel/booking-paiement/" })
          } else {
            router.push({ pathname: "/hotel" })
          }
        } else {
          setauthSucc(data.success)
          setMsg(data.message)
        }
      } catch (err) {}
    } else {
      setShowModal(true)
    }
  }

  const [showModal, setShowModal] = useState(false)
  const [authSucc, setauthSucc] = useState(true)
  const [msg, setMsg] = useState("")
  const [user, setUser, removeUser] = useLocalStorage("user", {})
  const [token, setToken, removeToken] = useLocalStorage("token", "" || null)
  const router = useRouter()

  const closeErrorModal = () => {
    setShowModal(false)
  }
  return (
    <>
      <HeadSeo
        title={t("common:auth-login")}
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
                    {t("auth:login")}
                  </h1>
                  <div className="h-1 md:h-1.5 w-1/3 bg-secondary me-auto"></div>
                </div>
              </div>
              <div className="flex justify-between items-center gap-16 flex-col lg:flex-row">
                <form
                  className="w-full lg:w-1/2 lg:pe-24 lg:border-e border-solid border-dark-tint"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="">
                    <label className="font-bold" htmlFor="UserName">
                      {t("input:email")}
                    </label>
                    <input
                      {...register("UserName", {
                        required: true,
                      })}
                      className="my-3"
                      type="email"
                      name="UserName"
                      placeholder={t("input:email")}
                    />
                    {errors.UserName && (
                      <div className="text-danger">
                        {t("validation:fill-all-fields")}
                      </div>
                    )}
                  </div>
                  <div className="">
                    <label className="font-bold" htmlFor="password">
                      {t("input:password")}
                    </label>
                    <input
                      {...register("Password", {
                        required: true,
                      })}
                      className="my-3"
                      type="password"
                      name="Password"
                      id="Password"
                      placeholder={t("input:password")}
                    />
                    {errors.Password && (
                      <div className="text-danger">
                        {t("validation:fill-all-fields")}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center gap-4 mb-4">
                    <Link passHref href="/auth/register">
                      <div className="underline text-sm cursor-pointer">
                        {t("auth:create-account")}
                      </div>
                    </Link>
                    <Link passHref href="/auth/forgot">
                      <div className="underline text-sm cursor-pointer">
                        {t("auth:did-you-forgot-password")}
                      </div>
                    </Link>
                  </div>
                  <button
                    className="btn btn-secondary rounded-full text-xl"
                    type="submit"
                  >
                    {t("button:sign-in")}
                  </button>

                  {!authSucc && (
                    <div className="text-lg text-danger font-medium text-center mt-4">
                      {i18n.language === "ar"
                        ? "اسم المستخدم أو كلمة المرور غير صالحة"
                        : msg}
                    </div>
                  )}
                </form>

                <div className="w-full lg:w-1/2 lg:ps-24 hidden">
                  <button className="btn btn-danger rounded-full text-base px-4 justify-between lg:text-xl mb-8">
                    <i className="icon-vuesax-bold-google text-2xl"></i>
                    <div>{t("button:sign-in-google")}</div>
                    <i className="icon-vuesax-bold-google text-xs invisible"></i>
                  </button>
                  <button className="btn btn-info rounded-full text-base px-4 justify-between lg:text-xl">
                    <i className="icon-vuesax-bold-facebook text-2xl"></i>
                    <div>{t("button:sign-in-facebook")}</div>
                    <i className="icon-vuesax-bold-facebook text-xs invisible"></i>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        {showModal && (
          <ModalError
            text={t("validation:fill-all-fields")}
            onClose={closeErrorModal}
          />
        )}
      </Layout>
    </>
  )
}
export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(
        context.locale as string,
        ["common", "button", "auth", "input", "validation"],
        nextI18NextConfig
      )),
    },
  }
}
export default Login
