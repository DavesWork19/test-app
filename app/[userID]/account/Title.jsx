import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';

export const Title = (props) => {
  const title = props.title;
  const showPlus = props.showPlus;

  return (
    <h3 className='block text-lg font-medium text-slate-500 font-light mb-6 border-b'>
      {title}
      {showPlus && (
        <span
          className='ml-6 flex items-center'
          onClick={handleShowGenericData}
        >
          <PlusIcon aria-hidden='true' className='size-5' />
        </span>
      )}
      {!showPlus && (
        <span
          className='ml-6 flex items-center'
          onClick={handleShowGenericData}
        >
          <MinusIcon aria-hidden='true' className='size-5' />
        </span>
      )}
    </h3>
  );
};
