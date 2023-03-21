import React from "react"

const LoadingCard = () => {
    
return (
    <div className="loading-card-wrapper" >
    {
        [1,2,3,4,5].map(el =>
            <div key={el} className="loading-card-wrapper-cell" >
            <div className="image"></div>
            <div className="text">
            <div className="text-line"> </div>
            <div className="text-line"></div>
            <div className="text-line"></div>
            <div className="text-line"></div>
            <div className="text-line"></div>
            <br/>
            <div className="text-line"></div>
            <div className="text-line"></div>
            <div className="text-line"></div>
            <div className="text-line"></div>
            <div className="text-line"></div>
            </div>
            <div className="text">
            <div className="text-line"> </div>
            <div className="text-line"></div>
            <div className="text-line"></div>
            <div className="text-line"></div>
            <div className="text-line"></div>
            <br/>
            <div className="text-line"></div>
            <div className="text-line"></div>
            <div className="text-line"></div>
            <div className="text-line"></div>
            <div className="text-line"></div>
            </div>
            </div>
            )
    }
    </div>
    )
}

export default LoadingCard
        