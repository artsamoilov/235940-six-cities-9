import PropertyImage from '../property-image/property-image';

type PropsType = {
  images: string[],
}

const MAX_PREVIEW_COUNT = 6;

export default function PropertyGallery({images}: PropsType): JSX.Element {
  const previewCount: number = images.length < MAX_PREVIEW_COUNT ? images.length : MAX_PREVIEW_COUNT;
  const previewImages: string[] = images.slice(0, previewCount);

  return (
    <div className='property__gallery-container container'>
      <div className='property__gallery'>

        {previewImages.map((previewSource: string, index: number): JSX.Element => <PropertyImage key={index} source={previewSource} />)}

      </div>
    </div>
  );
}
