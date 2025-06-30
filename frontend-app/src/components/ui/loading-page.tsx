'use client';

import Image from 'next/image';
import { useState } from 'react';

interface LoadingPageProps {
  message?: string;
  showSpinner?: boolean;
}

export function LoadingPage({
  message = 'Loading...',
  showSpinner = true,
}: LoadingPageProps) {
  const [gifError, setGifError] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        {/* Show GIF if showSpinner is true and no error, otherwise show fallback spinner */}
        {showSpinner && !gifError ? (
          <div className="relative w-16 h-16">
            <Image
              src="/images/loader.gif"
              alt="Loading..."
              width={64}
              height={64}
              priority
              className="object-contain w-full h-full"
              onLoad={() => {
                console.log('GIF loaded successfully');
              }}
              onError={(e) => {
                console.error('GIF failed to load:', e);
                setGifError(true);
              }}
            />
          </div>
        ) : (
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        )}

        {/* Loading Message */}
        <p className="text-lg font-medium text-muted-foreground animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
}
