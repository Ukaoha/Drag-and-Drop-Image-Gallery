// import React, { useState } from 'react';
// import { ImageData, imageData } from '../../data';
// import ImageCard from './ImgCard';
// import './imageGallery.css';

// const Gallery: React.FC = () => {
//   const [images, setImages] = useState<ImageData[]>(imageData);
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleDragStart = (e: React.DragEvent<HTMLDivElement>, image: ImageData) => {
//     e.dataTransfer.setData('imageId', image.id);
//   };

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     const droppedImageId = e.dataTransfer.getData('imageId');

//     const updatedImages = images.map((image) => {
//       if (image.id === droppedImageId) {
//         return { ...image, position: Date.now() }; // Update the position property to rearrange images
//       }
//       return image;
//     });

//     // Sort images based on position to update their order
//     updatedImages.sort((a, b) => (a.position || 0) - (b.position || 0));

//     setImages(updatedImages);
//   };

//   const filteredImages = images.filter((image) =>
//     image.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   return (
//     <div className="image-gallery">
//       <input
//       className='search'
//         type="text"
//         placeholder="Search by tags..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       <div
//         className="image-grid"
//         onDragOver={handleDragOver}
//         onDrop={handleDrop}
//       >
//         {filteredImages.map((image) => (
//           <div
//             key={image.id}
//             draggable
//             onDragStart={(e) => handleDragStart(e, image)}
//           >
//             <ImageCard {...image} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Gallery;


import React, { useState, useEffect } from 'react';
import { ImageData, imageData } from '../../data';
import ImageCard from './ImgCard';
import './imageGallery.css';

const Gallery: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>(imageData);
  const [searchTerm, setSearchTerm] = useState('');

  const [draggedImageId, setDraggedImageId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, image: ImageData) => {
    setDraggedImageId(image.id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (draggedImageId) {
      const updatedImages = images.map((image) => {
        if (image.id === draggedImageId) {
          return { ...image, position: Date.now() };
        }
        return image;
      });

      updatedImages.sort((a, b) => (a.position || 0) - (b.position || 0));

      setImages(updatedImages);
      setDraggedImageId(null);
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const touch = e.touches[0];
    const target = e.currentTarget as HTMLDivElement; // Type casting

    target.style.cursor = 'grabbing';
    target.style.transform = 'scale(1.1)';
    target.style.zIndex = '999';
    target.style.transition = 'transform 0.2s';
    target.style.transformOrigin = 'center';
    target.style.border = '2px solid #333';

    const offsetX = touch.clientX - target.getBoundingClientRect().left;
    const offsetY = touch.clientY - target.getBoundingClientRect().top;

    target.dataset.offsetX = offsetX.toString();
    target.dataset.offsetY = offsetY.toString();

    setDraggedImageId(target.getAttribute('data-image-id'));
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();

    if (draggedImageId) {
      const touch = e.touches[0];
      const target = e.currentTarget as HTMLDivElement; // Type casting

      const offsetX = parseFloat(target.dataset.offsetX || '0');
      const offsetY = parseFloat(target.dataset.offsetY || '0');

      const left = touch.clientX - offsetX;
      const top = touch.clientY - offsetY;

      target.style.left = left + 'px';
      target.style.top = top + 'px';
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    e.preventDefault();

    if (draggedImageId) {
      const target = e.currentTarget as HTMLDivElement; // Type casting

      target.style.cursor = 'grab';
      target.style.transform = 'scale(1)';
      target.style.zIndex = 'auto';
      target.style.transition = '';
      target.style.transformOrigin = '';
      target.style.border = '';

      setDraggedImageId(null);
    }
  };

  const filteredImages = images.filter((image) =>
    image.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    const imageGrid = document.querySelector('.image-grid') as HTMLDivElement;
    imageGrid.addEventListener('touchstart', handleTouchStart, { passive: false });
    imageGrid.addEventListener('touchmove', handleTouchMove, { passive: false });
    imageGrid.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      imageGrid.removeEventListener('touchstart', handleTouchStart);
      imageGrid.removeEventListener('touchmove', handleTouchMove);
      imageGrid.removeEventListener('touchend', handleTouchEnd);
    };
  }, [images]);

  return (
    <div className="image-gallery">
      <input
        className='search'
        type="text"
        placeholder="Search by tags..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div
        className="image-grid"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {filteredImages.map((image) => (
          <div
            key={image.id}
            draggable
            data-image-id={image.id}
            onDragStart={(e) => handleDragStart(e, image)}
          >
            <ImageCard {...image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
