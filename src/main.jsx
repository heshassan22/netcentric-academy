import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import { mdxComponents } from './components/mdxComponents.jsx';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import TrackOverview from './pages/TrackOverview.jsx';
import LessonPage from './pages/LessonPage.jsx';
import './styles/site.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MDXProvider components={mdxComponents}>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/:track" element={<TrackOverview />} />
            <Route path="/:track/:slug" element={<LessonPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </MDXProvider>
  </React.StrictMode>
);
