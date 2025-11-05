import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaHeart } from 'react-icons/fa';

export default function MyGallery({ images }) {
  const [showLike, setShowLike] = useState(false);

  const handleDoubleClick = () => {
    setShowLike(true);
    setTimeout(() => setShowLike(false), 1000); // some após 1s
  };

  return (
    <div className="w-full relative">
      {showLike && (
        <FaHeart className="absolute top-1/2 left-1/2 z-30 text-white text-6xl transform -translate-x-1/2 -translate-y-1/2 animate-pop" />
      )}
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="w-full"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <div onDoubleClick={handleDoubleClick} className="relative">
              <img
                src={img.original}
                alt={`img-${i}`}
                className="w-full h-auto object-contain select-none"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
