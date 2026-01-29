import { useState, useEffect, useMemo } from 'react';

import { supabase } from '../utility/supabase';
import { useTheme } from '../context/ThemeProvider';

export default function Avatar({ imagePath, style }) {
  const { theme } = useTheme()
  const styles = useMemo(() => handleStyle(theme), [theme]);

  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!imagePath || !supabase) {
      setLoading(false);
      return;
    }

    const loadImage = async () => {
      try {
        const { data } = supabase
          .storage
          .from('avatars')
          .getPublicUrl(imagePath);
        
        if (data?.publicUrl) {
          setImageUrl(data.publicUrl);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error loading avatar:', err);
        setError(true);
      } finally {
        setLoading(false);
      }

    };

    if (imagePath) loadImage();
  }, [imagePath, supabase]);

  const handleImageError = (e) => {
    console.error('Image failed to load:', {
      src: e.target.src,
      error: e.type,
      imagePath: imagePath
    });
    setError(true);
  };

  if (loading || error || !imageUrl) {
    return (
      <div style={{
        ...styles.container,
        ...style,
        backgroundColor: theme.primaryBorder,
      }}>
      </div>
    );
  }

  return (
    <div style={{
      ...styles.container,
      ...style
    }}>
      <img
        src={imageUrl}
        alt="Avatar"
        style={styles.image}
        onError={handleImageError}
        draggable={false}
      />
    </div>
  );
}

const handleStyle = (theme) => ({
  container: {
    borderRadius: '50%',
    overflow: 'hidden',
    position: 'relative',

    backgroundColor: theme.primaryBorder,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }
})