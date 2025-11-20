import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../utility/supabase';

export default function Media({ mediaPath, style }) {
  const [mediaUrl, setMediaUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const mediaType = useMemo(() => mediaPath.includes('picture') ? 'image' : 'video', [mediaPath]);

  useEffect(() => {
    if (!mediaPath || !supabase) {
      setLoading(false);
      return;
    }

    const loadMedia = async () => {
      try {
        const { data } = supabase
          .storage
          .from('media')
          .getPublicUrl(mediaPath);
        
        if (data?.publicUrl) {
          setMediaUrl(data.publicUrl);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error loading avatar:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadMedia();
  }, [mediaPath, supabase]);

  const handleMediaError = (e) => {
    console.error('Image failed to load:', {
      src: e.target.src,
      error: e.type,
    });
    setError(true);
  };

  if (loading || error || !mediaUrl) {
    return (
      <div style={{
        ...styles.container,
        ...style,
        backgroundColor: '#333',
      }}>
      </div>
    );
  }

  return (
    <div style={{
      ...styles.container,
      ...style
    }}>
      {mediaType === 'video' ? (
        <video
          src={mediaUrl}
          style={styles.media}
          controls
          preload='metadata'
          playsInline
          onError={handleMediaError}

          autoPlay
        />
      ) : (
        <img
          src={mediaUrl}
          alt="Avatar"
          style={styles.media}
          onError={handleMediaError}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#333',
    display: 'flex',

    borderRadius: 25
  },
  media: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }
};