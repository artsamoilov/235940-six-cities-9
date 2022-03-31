import {memo} from 'react';
import PropertyImage from '../property-image/property-image';

type PropsType = {
  images: string[],
}

const MAX_PREVIEW_COUNT = 6;

function PropertyGallery({images}: PropsType): JSX.Element {
  const previewCount: number = images.length < MAX_PREVIEW_COUNT ? images.length : MAX_PREVIEW_COUNT;
  const previewImages: string[] = images.slice(0, previewCount);

  return (
    <div className='property__gallery-container container'>
      <div className='property__gallery'>

        {previewImages.map((previewSource: string): JSX.Element => <PropertyImage key={previewSource} source={previewSource} />)}

      </div>
    </div>
  );
}

export default memo(PropertyGallery);
