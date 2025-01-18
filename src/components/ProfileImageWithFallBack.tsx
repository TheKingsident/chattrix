import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

/**
 * Props for the `ProfileImageWithFallBack` component.
 * Extends the `ImageProps` from Next.js and includes additional properties.
 * 
 * @typedef {ImageProps & Object} ProfileImageWithFallBackProps
 * @property {string} src - The primary image source URL.
 * @property {string} fallbackSrc - The fallback image source URL to use if the primary image fails to load.
 * @property {string} alt - The alternative text for the image (default: 'Profile image').
 * @property {number} [width] - Optional width of the image.
 * @property {number} [height] - Optional height of the image.
 * @property {Object} [key] - Additional props to pass to the Image component.
 */
interface ProfileImageWithFallBackProps extends ImageProps {
    src: string;
    fallbackSrc: string;
    alt: string;
    width?: number;
    height?: number;
    [key: string]: unknown;
}

/**
 * React component to display a profile image with a fallback.
 * Uses Next.js `Image` component and switches to a fallback image
 * if the primary image fails to load.
 * 
 * @param {ProfileImageWithFallBackProps} props - The props for the component.
 * @returns {JSX.Element} The `ProfileImageWithFallBack` component.
 */
const ProfileImageWithFallBack = (props: ProfileImageWithFallBackProps): JSX.Element => {
    const { src, fallbackSrc, alt = 'Profile image', ...rest } = props;
    const [imgSrc, setImgSrc] = useState<string>(src);

    /**
     * Updates the image source to the fallback image in case of an error.
     */
    const handleImageError = (): void => {
        setImgSrc(fallbackSrc);
    };

    return (
        <Image
            {...rest}
            src={imgSrc}
            alt={alt}
            onError={handleImageError}
        />
    );
};

export default ProfileImageWithFallBack;
