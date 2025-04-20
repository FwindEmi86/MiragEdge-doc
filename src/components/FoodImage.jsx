export default function FoodImage({ src, alt, width = 200 }) {
    return (
      <img 
        src={src} 
        alt={alt} 
        style={{ 
          width: `${width}px`, 
          height: 'auto',
          margin: '1rem 0',
          borderRadius: '4px'
        }}
      />
    );
  }