// components/ImageGallery.tsx
import React, { useState } from 'react';
import { ImageData, imageData } from '../../data';
import ImageCard from './ImgCard';
import './imageGallery.css'
import Loader from '../Loader/Loader';
import { CircleLoader } from 'react-spinners';

const Gallery: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>(imageData);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [draggedImage, setDraggedImage] = useState<ImageData | null>(null);

  const handleDragStart = (image: ImageData) => {
    setDraggedImage(image);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (draggedImage) {
      const updatedImages = images.map((image) => {
        if (image.id === draggedImage.id) {
          return { ...draggedImage };
        }
        return image;
      });
      setImages(updatedImages);
      setDraggedImage(null);
    }
  };

  const filteredImages = images.filter((image) =>
    image.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="image-gallery">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by tags..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Images */}
      {loading ? (
        <div>      loading....</div>
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
              onDragStart={() => handleDragStart(image)}
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
