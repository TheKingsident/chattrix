import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ProfileImageWithFallBackProps extends ImageProps {
    src: string;
    fallbackSrc: string;
    alt: string;
    width?: number;
    height?: number;
    [key: string]: any;
}

const ProfileImageWithFallBack = (props: ProfileImageWithFallBackProps) => {
    const { src, fallbackSrc, alt = 'Profile image', ...rest } = props;
    const [imgSrc, setImgSrc] = useState<string>(src);

    return (
        <Image
            {...rest}
            src={imgSrc}
            alt={alt}
            onError={() => setImgSrc(fallbackSrc)}
        />
    )
}

export default  ProfileImageWithFallBack