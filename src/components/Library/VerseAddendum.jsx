import { useMemo, useCallback, memo } from "react";
import { HugeiconsIcon } from "@hugeicons/react";

import Avatar from "../Avatar";

const AvatarItem = memo(({ avatar, index, style }) => (
  <div key={`activity-item-${index}`} style={style.avatarContainer}>
    <Avatar
      imagePath={avatar}
      type="profile"
      style={style.avatar}
    />
  </div>
));

export const VerseAddendum = memo(({ 
  avatars,
  icon,
  text,
  background,
  onPress
}) => {
  const containerStyle = useMemo(() => ({
    ...styles.commentContainer, 
    backgroundColor: '#222'
  }), [background]);

  const handlePress = useCallback(() => {
    onPress?.();
  }, [onPress]);

  const renderedAvatars = useMemo(() => 
    avatars?.map((avatar, index) => (
      <AvatarItem 
        key={`activity-item-${index}`}
        avatar={avatar} 
        index={index} 
        style={styles}
      />
    )) || [],
    [avatars, styles]
  );

  return (
    <div onClick={handlePress}>
      <div 
        style={containerStyle}
        className="hover-background"
      >
        {renderedAvatars}
        <div style={styles.indicator}>
          {icon && (
            <HugeiconsIcon
              icon={icon}
              size={16}
              color={'#aaa'}
            />
          )}
          <p style={styles.indicatorCount}>{text}</p>
          {/* {!icon && !disableArrowIcon && (
            <Icon name="chevron-right" size={12} color={theme.secondaryText} style={styles.rightArrowIcon} />
          )} */}
        </div>
      </div>
    </div>
  );
});

const styles = {
  commentContainer: {
    borderRadius: 30,
    padding: 6,
    paddingRight: 9,
    
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 5,
  },
  avatarContainer: {
    width: 23,
    height: 23,
    borderRadius: 30,
    overflow: 'hidden',
  },
  avatar: { flex: 1 },
  indicator: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    marginLeft: 3,
  },
  indicatorCount: {
    fontSize: 16,
    fontWeight: 700,
    color: '#aaa',

    marginRight: 4
  },
  rightArrowIcon: {
  }
}
