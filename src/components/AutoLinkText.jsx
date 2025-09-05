import React from 'react';

export default function AutoLinkText({ children, ...props }) {
  const text = Array.isArray(children)
    ? children.join('')
    : String(children ?? '');

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return (
    <span {...props}>
      {parts.map((part, idx) =>
        urlRegex.test(part) ? (
          <a
            key={idx}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {part}
          </a>
        ) : (
          <React.Fragment key={idx}>{part}</React.Fragment>
        )
      )}
    </span>
  );
}
