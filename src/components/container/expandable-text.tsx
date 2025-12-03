import React from 'react';

type ExpandableTextProps = {
  text: string;
  limit?: number;
};

export function ExpandableText({ text, limit = 120 }: ExpandableTextProps) {
  const [expanded, setExpanded] = React.useState(false);

  const isLong = text.length > limit;
  const displayText = expanded ? text : text.slice(0, limit);

  return (
    <div>
      <h1 className='text-sm-regular md:text-md-regular'>{displayText}</h1>

      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className='
              text-primary-200 font-bold 
              hover:underline cursor-pointer
              text-sm-regular md:text-md-regular
            '
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      )}
    </div>
  );
}
