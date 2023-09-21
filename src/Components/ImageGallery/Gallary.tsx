import React, { useState, useEffect } from 'react';
import { ImageData, imageData } from '../../data';
import ImageCard from './ImgCard';
import './imageGallery.css';
import Loader from '../Loader/Loader';

interface ExtendedHTMLDivElement extends HTMLDivElement {
  touchStartX?: number;
  touchStartY?: number;
  imageId?: string;
  isDragging?: boolean;
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setImages(imageData);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleDragStart = (e: React.DragEvent<ExtendedHTMLDivElement>, image: ImageData) => {
    const target = e.currentTarget as ExtendedHTMLDivElement;
    target.isDragging = true;
    e.dataTransfer.setData('imageId', image.id);
  };

  const handleDragEnd = (e: React.DragEvent<ExtendedHTMLDivElement>) => {
    const target = e.currentTarget as ExtendedHTMLDivElement;
    target.isDragging = false;
  };

  const handleDragOver = (e: React.DragEvent<ExtendedHTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<ExtendedHTMLDivElement>) => {
    e.preventDefault();
    const droppedImageId = e.dataTransfer.getData('imageId');

    const updatedImages = images.map((image) => {
      if (image.id === droppedImageId) {
        return { ...image, position: Date.now() };
      }
      return image;
    });

    updatedImages.sort((a, b) => (a.position || 0) - (b.position || 0));
    setImages(updatedImages);
  };

  const handleTouchStart = (e: React.TouchEvent<ExtendedHTMLDivElement>, image: ImageData) => {
    e.preventDefault();
    e.persist();

    const touch = e.touches[0];
    const target = e.currentTarget as ExtendedHTMLDivElement;

    target.touchStartX = touch.clientX;
    target.touchStartY = touch.clientY;
    target.imageId = image.id;

    target.addEventListener('touchmove', handleTouchMove);
    target.addEventListener('touchend', handleTouchEnd);
  };

  const handleTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0];
    const target = e.currentTarget as ExtendedHTMLDivElement;

    const deltaX = touch.clientX - target.touchStartX!;
    const deltaY = touch.clientY - target.touchStartY!;

    target.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const target = e.currentTarget as ExtendedHTMLDivElement;

    target.removeEventListener('touchmove', handleTouchMove);
    target.removeEventListener('touchend', handleTouchEnd);

    target.style.transform = '';

    const deltaX = e.changedTouches[0].clientX - target.touchStartX!;
    const deltaY = e.changedTouches[0].clientY - target.touchStartY!;
    if (Math.abs(deltaX) > 50 || Math.abs(deltaY) > 50) {
      const droppedImageId = target.imageId!;
      const updatedImages = images.map((image) => {
        if (image.id === droppedImageId) {
          return { ...image, position: Date.now() };
        }
        return image;
      });

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

      {isLoading ? (
        <div className="loading"><Loader/></div>
      ) : (
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
              onDragEnd={handleDragEnd}
              onTouchStart={(e) => handleTouchStart(e, image)}
            >
              <ImageCard {...image} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;





