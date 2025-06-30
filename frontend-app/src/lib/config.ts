import { APP_CONFIG, API_CONFIG, FEATURES, UI_CONFIG } from './constants';

// Configuration validation
export function validateConfig() {
  const requiredEnvVars = ['NEXT_PUBLIC_APP_NAME', 'NEXT_PUBLIC_SERVER_URL'];

  const missing = requiredEnvVars.filter((envVar) => !process.env[envVar]);

  if (missing.length > 0) {
    console.warn(`Missing environment variables: ${missing.join(', ')}`);
  }
}

// Environment-specific configuration
export const getConfig = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    ...APP_CONFIG,
    ...API_CONFIG,
    ...FEATURES,
    ...UI_CONFIG,
    environment: {
      isDevelopment,
      isProduction,
      isTest: process.env.NODE_ENV === 'test',
    },
    // Override features based on environment
    features: {
      ...FEATURES,
      enableDebugMode: isDevelopment,
      enableAnalytics: isProduction,
    },
  };
};

// Export the validated config
export const config = getConfig();
