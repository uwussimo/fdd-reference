'use client';

import { createContext, ReactNode, use, useState } from 'react';
import { Tracking } from './service';

const TrackingContext = createContext<Tracking | null>(null);

// ----------------------------------------------------------------------------------------------------

type TrackingServiceProviderProps = {
  children: ReactNode;
};

export const TrackingServiceProvider = (props: TrackingServiceProviderProps) => {
  const { children } = props;

  const [trackingService] = useState(() => new Tracking());

  return <TrackingContext value={trackingService}>{children}</TrackingContext>;
};

// ----------------------------------------------------------------------------------------------------

export const useTrackingService = () => {
  const context = use(TrackingContext);

  if (!context) {
    throw new Error('useTrackingService must be used within a TrackingServiceProvider');
  }

  return context;
};
