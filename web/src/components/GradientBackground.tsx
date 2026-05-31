import React from 'react';

interface Props {
  variant?: 'aurora' | 'cosmic';
  withBlobs?: boolean;
}

/** Full-bleed gradient backdrop with optional glowing blobs. */
export default function GradientBackground({ variant = 'aurora', withBlobs = true }: Props) {
  return (
    <div className={`bg bg-${variant}`} aria-hidden="true">
      {withBlobs && (
        <>
          <span className="blob blob-orange" />
          <span className="blob blob-pink" />
          <span className="blob blob-blue" />
        </>
      )}
    </div>
  );
}
