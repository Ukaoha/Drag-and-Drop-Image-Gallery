import React from 'react';

interface ImageCardProps {
  id: string;
  src: string;
  tags: string[];
}

const ImageCard: React.FC<ImageCardProps> = ({ id, src, tags }) => {
  return (
    <div className="image-card">
      <img
        src={src}
        alt={`Image ${id}`}
        className="image"
      />
      <div className="tags">
        {tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ImageCard;
