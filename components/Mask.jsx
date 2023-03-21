import React from "react"
import Image from "next/image"

const Mask = () => {
  return (
    <div className="bg-black/30 fixed top-0 w-full flex items-center justify-center min-h-screen z-50">
      <Image
        src="/gifs/loading.gif"
        width="70px"
        height="70px"
        alt="loading gif"
      ></Image>
    </div>
  )
}

export default Mask
