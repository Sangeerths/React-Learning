import { useState } from "react";
import "./App.css";

function ImageCarousel() {
  const images = [
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80"
      ];
  const[currentIndex, setCurrentIndex] = useState(0);
    const previousImage = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + images.length) % images.length
    );
  };
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex +1 ) % images.length);
  };
  return (
    <div className="carousel-container">

      <h1>Image Carousel</h1>

      <div className="carousel">

        <button onClick={previousImage}>
          ❮
        </button>

        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
        />

        <button onClick={nextImage}>
          ❯
        </button>

      </div>

      <p>
        Image {currentIndex + 1} of {images.length}
      </p>

    </div>
  );
}


export default ImageCarousel;