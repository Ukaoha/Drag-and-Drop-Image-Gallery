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


import React, { useState } from 'react';
import { ImageData, imageData } from '../../data';
import ImageCard from './ImgCard';
import './imageGallery.css';

interface ExtendedHTMLDivElement extends HTMLDivElement {
  touchStartX?: number;
  touchStartY?: number;
  imageId?: string;
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>(imageData);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDragStart = (e: React.DragEvent<ExtendedHTMLDivElement>, image: ImageData) => {
    e.dataTransfer.setData('imageId', image.id);
  };

  const handleDragOver = (e: React.DragEvent<ExtendedHTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<ExtendedHTMLDivElement>) => {
    e.preventDefault();
    const droppedImageId = e.dataTransfer.getData('imageId');

    const updatedImages = images.map((image) => {
      if (image.id === droppedImageId) {
        return { ...image, position: Date.now() }; // Update the position property to rearrange images
      }
      return image;
    });

    // Sort images based on position to update their order
    updatedImages.sort((a, b) => (a.position || 0) - (b.position || 0));

    setImages(updatedImages);
  };

  const handleTouchStart = (e: React.TouchEvent<ExtendedHTMLDivElement>, image: ImageData) => {
    e.preventDefault(); // Prevent the default touch event behavior
    e.persist(); // Persist the event for asynchronous handling

    const touch = e.touches[0]; // Get the first touch
    const target = e.currentTarget as ExtendedHTMLDivElement; // Cast to ExtendedHTMLDivElement

    // Store the initial touch position relative to the target element
    target.touchStartX = touch.clientX;
    target.touchStartY = touch.clientY;
    target.imageId = image.id;

    // Add touch move and touch end event listeners
    target.addEventListener('touchmove', handleTouchMove);
    target.addEventListener('touchend', handleTouchEnd);
  };

  const handleTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0]; // Get the first touch
    const target = e.currentTarget as ExtendedHTMLDivElement; // Cast to ExtendedHTMLDivElement

    // Calculate the horizontal and vertical distances moved
    const deltaX = touch.clientX - target.touchStartX!;
    const deltaY = touch.clientY - target.touchStartY!;

    // Move the image element by updating its CSS transform property
    target.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const target = e.currentTarget as ExtendedHTMLDivElement; // Cast to ExtendedHTMLDivElement

    // Remove touch move and touch end event listeners
    target.removeEventListener('touchmove', handleTouchMove);
    target.removeEventListener('touchend', handleTouchEnd);

    // Reset the transform property
    target.style.transform = '';

    // Update the image position if it has moved significantly
    const deltaX = e.changedTouches[0].clientX - target.touchStartX!;
    const deltaY = e.changedTouches[0].clientY - target.touchStartY!;
    if (Math.abs(deltaX) > 50 || Math.abs(deltaY) > 50) {
      const droppedImageId = target.imageId!;
      const updatedImages = images.map((image) => {
        if (image.id === droppedImageId) {
          return { ...image, position: Date.now() }; // Update the position property to rearrange images
        }
        return image;
      });

      // Sort images based on position to update their order
      updatedImages.sort((a, b) => (a.position || 0) - (b.position || 0));

      setImages(updatedImages);
    }
  };

  const filteredImages = images.filter((image) =>
    image.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
            onDragStart={(e) => handleDragStart(e, image)}
            onTouchStart={(e) => handleTouchStart(e, image)}
          >
            <ImageCard {...image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
