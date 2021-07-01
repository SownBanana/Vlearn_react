import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {
    Box
} from '@material-ui/core';
import { sizing } from '@material-ui/system';
import useCheckMobile from 'commons/hooks/useCheckMobile';
export default function Slice({
    showThumbs = false,
    height = 300,
    data = []
}) {
    const isMobile = useCheckMobile()
    if (!data || data.length === 0) {
        data = [
            {
                img: 'https://vlearn-bucket.s3.ap-southeast-1.amazonaws.com/uploads/33178278-704b-4ef1-99d4-ac0fb1e4f931.png',
            },
            {
                img: 'https://s3.amazonaws.com/coursera_assets/meta_images/generated/XDP/XDP~COURSE!~html/XDP~COURSE!~html.jpeg',
            },
            {
                img: 'https://www.classcentral.com/report/wp-content/uploads/2020/06/top-100-course-pandemic.png',
                legend: 'Welcome to Vlearn'
            },
        ];
    }
    return (
        data && data.length > 0 &&
        <Carousel
            showThumbs={showThumbs}
            showStatus={false}
            autoPlay={true}
            interval={3000}
            infiniteLoop={true}
        >
            {
                data.map(slide =>
                    <Box
                        maxHeight={isMobile ? 'unset' : height}
                        style={{
                            overflow: 'hidden',
                            background: "#eee",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <img src={slide.img} />
                        {
                            slide.legend &&
                            <p className="legend">{slide.legend}</p>
                        }
                    </Box>
                )
            }
        </Carousel>
    )
}
