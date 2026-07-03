import { useState, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader/Loader';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import Cursor from './components/Cursor/Cursor';

// Lazy load heavy sections for better initial load
const Work = lazy(() => import('./components/Work/Work'));
const Skills = lazy(() => import('./components/Skills/Skills'));
const Story = lazy(() => import('./components/Story/Story'));
const Contact = lazy(() => import('./components/Contact/Contact'));

function App() {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <>
      {/* Custom cursor - always mounted (handles its own mobile detection) */}
      <Cursor />

      {/* Loader */}
      <AnimatePresence>
        {!loaderDone && (
          <Loader onComplete={() => setLoaderDone(true)} />
        )}
      </AnimatePresence>

      {/* Main content - only renders after loader */}
      {loaderDone && (
        <>
          <Navigation />
          <main>
            <Hero />
            <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
              <Work />
              <Skills />
              <Story />
              <Contact />
            </Suspense>
          </main>
        </>
      )}
    </>
  );
}

export default App;
