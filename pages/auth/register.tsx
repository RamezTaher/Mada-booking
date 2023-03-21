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
import ModalError from "../../components/ModalError"
import { useForm } from "react-hook-form"
type Props = {}

const Register = (props: Props) => {
  const { t } = useTranslation([
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
  } = useForm({
    reValidateMode: "onChange",
    mode: "all",
  })
  const onSubmit = async (formData) => {
    formData.UserName = formData.Email
    if (isValid) {
      console.log(formData)
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
          `${process.env.NEXT_PUBLIC_API}/account/register`,
          options
        )
        const data = await res.json()
        if (data.success) {
          router.push("/auth/login")
        } else {
          setEmailsExists(data.emailsExists)
          setPhoneExists(data.phoneExists)
          setUsernameExists(data.usernameExists)
        }
      } catch (err) {}
    } else {
      setShowModal(true)
    }
  }

  const [emailsExists, setEmailsExists] = useState(false)
  const [phoneExists, setPhoneExists] = useState(false)
  const [usernameExists, setUsernameExists] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const router = useRouter()

  const closeErrorModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <HeadSeo
        title={t("common:auth-register")}
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
          <section className="relative z-10 bg-white py-12">
            <div className="container px-6 md:mx-auto">
              <div className="text-start">
                <div className="inline-block mb-20">
                  <h1 className="text-primary font-bold text-3xl md:text-5xl mb-3">
                    {t("auth:register")}
                  </h1>
                  <div className="h-1 md:h-1.5 w-1/3 bg-secondary me-auto"></div>
                </div>
              </div>
              <div className="flex justify-between items-center gap-16 flex-col lg:flex-row">
                <form
                  className="w-full lg:w-1/2 lg:pe-24 lg:border-e border-solid border-dark-tint flex flex-col gap-5"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex justify-between items-center gap-4">
                    <div className="lg:w-1/2 w-full">
                      <label className="font-bold" htmlFor="FirstName">
                        {t("input:first-name")}
                      </label>
                      <input
                        {...register("FirstName", {
                          required: true,
                          pattern: /^[A-Za-z]+$/i,
                        })}
                        className="my-3"
                        type="text"
                        name="FirstName"
                        placeholder={t("input:first-name")}
                      />
                      {errors.FirstName?.type === "required" && (
                        <div className="text-danger">
                          {t("validation:fill-all-fields")}
                        </div>
                      )}
                    </div>

                    <div className="lg:w-1/2 w-full">
                      <label className="font-bold" htmlFor="LastName">
                        {t("input:last-name")}
                      </label>
                      <input
                        {...register("LastName", {
                          required: true,
                          pattern: /^[A-Za-z]+$/i,
                        })}
                        className="my-3"
                        type="text"
                        name="LastName"
                        placeholder={t("input:last-name")}
                      />
                      {errors.LastName?.type === "required" && (
                        <div className="text-danger">
                          {t("validation:fill-all-fields")}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="">
                    <label className="font-bold" htmlFor="Email">
                      {t("input:email")}
                    </label>
                    <input
                      {...register("Email", {
                        required: true,
                        pattern:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      })}
                      className="my-3"
                      type="email"
                      name="Email"
                      placeholder={t("input:email")}
                    />
                    {errors.Email?.type === "required" && (
                      <div className="text-danger">
                        {t("validation:fill-all-fields")}
                      </div>
                    )}
                    {emailsExists ||
                      (usernameExists && (
                        <div className="text-danger text-lg font-medium mb-1">
                          {t("common:Validation_UsedEmail")}
                        </div>
                      ))}
                  </div>

                  <div className="">
                    <label className="font-bold" htmlFor="Phone">
                      {t("input:phone-number")}
                    </label>
                    <input
                      {...register("Phone", { required: true, minLength: 6 })}
                      className="my-3"
                      type="text"
                      name="Phone"
                      placeholder={t("input:phone-number")}
                    />
                    {errors.Phone && (
                      <div className="text-danger">
                        {t("validation:fill-all-fields")}
                      </div>
                    )}

                    {phoneExists && (
                      <div className="text-danger">
                        {t("common:Validation_UsedPhone")}
                      </div>
                    )}
                  </div>

                  <div className="">
                    <label className="font-bold" htmlFor="Password">
                      {t("input:password")}
                    </label>
                    <input
                      {...register("Password", {
                        required: true,
                        minLength: 8,
                      })}
                      className="my-3"
                      type="password"
                      name="Password"
                      placeholder={t("input:password")}
                    />
                    {errors.Password?.type === "required" && (
                      <div className="text-danger">
                        {t("validation:fill-all-fields")}
                      </div>
                    )}
                  </div>
                  <div className="">
                    <label htmlFor="" className="">
                      <div className="flex items-center my-3">
                        <input
                          {...register("confirmTerms", {
                            required: true,
                          })}
                          name="confirmTerms"
                          id="confirmTerms"
                          type="checkbox"
                          className="form-checkbox outline-none text-primary ring-0 rounded ring-offset-0 checked:ring-primary ring-dark h-3 w-3"
                        />

                        <span className="ms-1.5 text-sm">
                          {t("auth:confirm-terms-conditions")}
                        </span>
                      </div>

                      {errors.confirmTerms?.type === "required" && (
                        <div className="text-danger">
                          {t("validation:fill-all-fields")}
                        </div>
                      )}
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-secondary rounded-full text-xl mb-2"
                  >
                    {t("common:auth-register")}
                  </button>
                  <div>
                    <div className=" text-sm cursor-pointer">
                      {t("auth:already-member")}
                      <Link passHref href="/auth/login">
                        <span className="underline">{t("auth:login")}</span>
                      </Link>
                    </div>
                  </div>
                </form>
                <div className="w-full lg:w-1/2 lg:ps-24 hidden">
                  <button className="btn btn-danger rounded-full text-base px-4 justify-between lg:text-xl mb-8">
                    <i className="icon-vuesax-bold-google text-2xl"></i>
                    <div>{t("button:sign-up-google")}</div>
                    <i className="icon-vuesax-bold-google text-xs invisible"></i>
                  </button>
                  <button className="btn btn-info rounded-full text-base px-4 justify-between lg:text-xl">
                    <i className="icon-vuesax-bold-facebook text-2xl"></i>
                    <div>{t("button:sign-up-facebook")}</div>
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
export default Register
