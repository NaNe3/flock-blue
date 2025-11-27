import { useEffect, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Album02Icon } from "@hugeicons-pro/core-solid-rounded"

import ImageUploadWrapper from "../../components/ImageUploadWrapper"
import BasicButton from "../../components/BasicButton"

import { updateAvatarForUser, uploadAvatar } from "../../utility/db-image"
import { constants } from "../../utility/colors"

import { useHolos } from "../../context/HolosProvider"
import { useOnboard } from "../../context/OnboardProvider"

export default function OnboardProfilePicture() {
  const { user } = useHolos()
  const { onboardData, updateOnboardData, handleCompleteOnboarding } = useOnboard()

  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [profileImage, setProfileImage] = useState(onboardData.profilePicture)
  const [profileImageUrl, setProfileImageUrl] = useState(onboardData.profilePictureUrl)

  useEffect(() => {
    if (profileImage) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [profileImage])

  const handleImageSelect = (file, blob) => {
    setProfileImage(file);
    // Create a URL for displaying the cropped image
    const imageUrl = URL.createObjectURL(blob);
    updateOnboardData({ profilePictureUrl: imageUrl, profilePicture: file });
    setProfileImageUrl(imageUrl);
    setDisabled(false);
  };

  const handleContinue = async () => {
    if (processing || disabled) return
    setProcessing(true)
    if (profileImage) {
      const { data, error } = await uploadAvatar(profileImage, user.id)
      console.log('Upload avatar response:', { data, error })

      if (!error) {
        const avatarPath = data?.path || null
        updateOnboardData({ profilePictureUrl: avatarPath });
        const { data: updateData, error: updateError } = await updateAvatarForUser(avatarPath, user.id)

        if (!updateError) {
          handleCompleteOnboarding()
        } else {
          setError(updateError)
        }
      } else {
        setError(error)
      }
    }
    setProcessing(false)
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <p style={styles.title}>Upload a profile picture</p>
        <ImageUploadWrapper 
          onImageSelect={handleImageSelect}
          aspect={1}
          cropShape="round"
        >
          <div style={{
            ...styles.imageContainer,
            backgroundImage: profileImageUrl ? `url(${profileImageUrl})` : 'none',
          }}>
            {!profileImageUrl && (
              <HugeiconsIcon
                icon={Album02Icon}
                size={40}
                color="#555"
              />
            )}
          </div>
        </ImageUploadWrapper>
        {error && ( <p style={styles.error}>{error.message}</p> )}
      </div>
      <div style={styles.footerContainer}>
        <p className='hover-underline' style={styles.skipText} onClick={handleCompleteOnboarding}>skip this step</p>
        <BasicButton
          text="continue"
          onClick={handleContinue}
          disabled={disabled || processing}
        />
      </div>
    </div>
  )
}

const styles = {
  container: {
    width: "100%",

    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: 20,
  },

  content: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    gap: 20,
    padding: "40px 20px",
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    color: "#fff",
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: "50%",
    border: "10px solid #333",

    cursor: "pointer",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    color: constants.red,
    fontSize: 18,
    fontWeight: 700,
    marginTop: 40,
  },

  footerContainer: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
  },
  skipText: {
    color: "#888",
    fontSize: 20,
    fontWeight: 700,
    alignSelf: "center",
    cursor: "pointer",
  },
};