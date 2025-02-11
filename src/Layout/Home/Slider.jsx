// import React from 'react';
// import Slide1 from "../assets/slide1.jpg"
// import Slide2 from "../assets/slide2.jpg"
// import Slide3 from "../assets/slide3.jpg"


// const Slider = () => {
//     return (
//         <div className='w-11/12 mx-auto'>
//             <div className="carousel w-full mb-20">
//                 <div id="slide1" className="carousel-item relative w-full">
//                     <img
//                         src={Slide1}
//                         className="w-full" />
//                     <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
//                         <a href="#slide3" className="btn btn-circle">❮</a>
//                         <a href="#slide2" className="btn btn-circle">❯</a>
//                     </div>
//                 </div>
//                 <div id="slide2" className="carousel-item relative w-full">
//                     <img
//                         src={Slide2} />
//                     <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
//                         <a href="#slide1" className="btn btn-circle">❮</a>
//                         <a href="#slide3" className="btn btn-circle">❯</a>
//                     </div>
//                 </div>
//                 <div id="slide3" className="carousel-item relative w-full">
//                     <img
//                         src={Slide3}
//                         className="w-full" />
//                     <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
//                         <a href="#slide2" className="btn btn-circle">❮</a>
//                         <a href="#slide1" className="btn btn-circle">❯</a>
//                     </div>
//                 </div>

//             </div>
//         </div>

//     );
// };

// export default Slider;




import React, { useState, useEffect } from 'react';
import Slide1 from "../assets/slide1.jpg";
import Slide2 from "../assets/slide2.jpg";
import Slide3 from "../assets/slide3.jpg";
import { Fade } from 'react-awesome-reveal';

const Slider = () => {
    const slides = [Slide1, Slide2, Slide3];
    const [currentSlide, setCurrentSlide] = useState(0);

    // Automatically change slides every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 3000);
        return () => clearInterval(interval); // Cleanup on component unmount
    }, [slides.length]);

    return (
        <div className="w-11/12 mx-auto mb-14">
           
            <div className="relative w-full overflow-hidden rounded-lg shadow-lg h-56 md:h-[400px] lg:h-[650px]">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                            index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <Fade>
                            <img
                                src={slide}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </Fade>
                    </div>
                ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-4 space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;

