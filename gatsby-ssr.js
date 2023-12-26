/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

import React from 'react';
import { AnalyticsProvider } from './src/utils/analytics';

export const wrapRootElement = ({ element }) => <AnalyticsProvider>{element}</AnalyticsProvider>;
