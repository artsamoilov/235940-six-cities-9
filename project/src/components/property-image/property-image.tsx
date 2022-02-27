type PropsType = {
  source: string,
}

export default function PropertyImage({source}: PropsType): JSX.Element {
  return (
    <div className='property__image-wrapper'>
      <img className='property__image' src={source} alt='Photo preview' />
    </div>
  );
}
