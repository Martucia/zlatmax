import { useEffect, useState } from "react"
import React from 'react';

const PhotoSlider = (props) => {
    const [mainPhoto, setMainPhoto] = useState(null)

    const changePhoto = (e) => {
        setMainPhoto(e.target.currentSrc)
    }


    useEffect(() => {
        setMainPhoto(props.images[0].url)
    }, [props.images])


    return (
        <div className="swiper">
            <div className="main-photo">
                <img src={mainPhoto} alt="" />
            </div>
            <div className="photo-row">

                {props.images.map(image => {
                    // if (!image.isMain) 
                    return (
                        <div className="photo" onClick={changePhoto}>
                            <img src={image.url} alt="" />
                        </div>)
                })}

            </div>
        </div>
    );
}

export default PhotoSlider;