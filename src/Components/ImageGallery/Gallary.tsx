import React, { useState } from 'react';
import { ImageData, imageData } from '../../data';
import ImageCard from './ImgCard';
import './imageGallery.css';

const Gallery: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>(imageData);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, image: ImageData) => {
    e.dataTransfer.setData('imageId', image.id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
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
          >
            <ImageCard {...image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
