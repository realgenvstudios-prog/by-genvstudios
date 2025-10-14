import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

// Custom hook to provide site settings to any component
export const useSiteSettings = () => {
  const settings = useQuery(api.settings.get);
  
  return {
    siteName: settings?.siteName || 'GenV Studios',
    logoUrl: settings?.logoUrl,
    contactEmail: settings?.contactEmail || 'contact@genvstudios.com',
    phoneNumber: settings?.phoneNumber || '+1 (555) 123-4567',
    address: settings?.address || '123 Fashion Avenue, Style City, SC 12345',
    isLoading: settings === undefined,
    hasSettings: settings !== null
  };
};

// HOC to wrap components that need settings
export const withSiteSettings = (WrappedComponent) => {
  return function WithSiteSettingsComponent(props) {
    const siteSettings = useSiteSettings();
    return <WrappedComponent {...props} siteSettings={siteSettings} />;
  };
};

export default useSiteSettings;