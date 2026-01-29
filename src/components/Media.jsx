import { useState, useEffect, useMemo } from 'react';

import { supabase } from '../utility/supabase';

import { useTheme } from '../context/ThemeProvider';

export default function Media({ mediaPath, style }) {
  const { theme } = useTheme();
  const styles = useMemo(() => handleStyle(theme), [theme]);

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
        backgroundColor: theme.secondaryBackground,
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

const handleStyle = (theme) => ({
  container: {
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: theme.secondaryBackground,
    display: 'flex',

    borderRadius: 25
  },
  media: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }
});