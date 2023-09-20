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
//         return { ...image, position: undefined }; // Reset the position
//       }
//       return image;
//     });

//     setImages(updatedImages);
//   };

//   const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>, image: ImageData) => {
//     e.preventDefault();
//     const touch = e.touches[0];
//     const target = e.currentTarget as HTMLDivElement;
//     target.setAttribute('data-imageId', image.id);
//     target.setAttribute('data-touchstartX', String(touch.clientX));
//     target.setAttribute('data-touchstartY', String(touch.clientY));
//   };

//   const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     const touch = e.touches[0];
//     const target = e.currentTarget as HTMLDivElement;
//     const imageId = target.getAttribute('data-imageId');
//     const touchstartX = parseFloat(target.getAttribute('data-touchstartX') || '0');
//     const touchstartY = parseFloat(target.getAttribute('data-touchstartY') || '0');

//     if (imageId) {
//       const deltaX = touch.clientX - touchstartX;
//       const deltaY = touch.clientY - touchstartY;
//       target.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
//     }
//   };

//   const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     const target = e.currentTarget as HTMLDivElement;
//     const imageId = target.getAttribute('data-imageId');

//     if (imageId) {
//       const updatedImages = images.map((image) => {
//         if (image.id === imageId) {
//           return { ...image, position: undefined }; // Reset the position
//         }
//         return image;
//       });

//       setImages(updatedImages);
//       target.style.transform = 'translate(0px, 0px)';
//     }
//   };

//   const filteredImages = images.filter((image) =>
//     image.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   return (
//     <div className="image-gallery">
//       <input
//         className='search'
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
//             onTouchStart={(e) => handleTouchStart(e, image)}
//             onTouchMove={handleTouchMove}
//             onTouchEnd={handleTouchEnd}
//           >
//             <ImageCard {...image} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Gallery;



import React, { useState, useRef } from 'react';
import { ImageData, imageData } from '../../data';
import ImageCard from './ImgCard';
import './imageGallery.css';

const Gallery: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>(imageData);
  const [searchTerm, setSearchTerm] = useState('');

  const dragImageRef = useRef<ImageData | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, image: ImageData) => {
    e.dataTransfer.setData('imageId', image.id);
    dragImageRef.current = image;
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedImageId = e.dataTransfer.getData('imageId');

    if (dragImageRef.current) {
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

    dragImageRef.current = null;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>, image: ImageData) => {
    // Prevent default behavior to avoid interference with touch scrolling
    e.preventDefault();
    dragImageRef.current = image;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (dragImageRef.current) {
      const droppedImageId = dragImageRef.current.id;

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

    dragImageRef.current = null;
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
        onTouchMove={handleTouchMove}
      >
        {filteredImages.map((image) => (
          <div
            key={image.id}
            draggable
            onDragStart={(e) => handleDragStart(e, image)}
            onTouchStart={(e) => handleTouchStart(e, image)}
            onTouchEnd={handleTouchEnd}
          >
            <ImageCard {...image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
