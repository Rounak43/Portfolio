import { useEffect, useState } from 'react';

/**
 * The current `location.hash` without its leading `#`.
 *
 * Hash routing is deliberate: the site deploys to GitHub Pages, which serves
 * static files only and would 404 on a refresh of a real `/admin` path.
 */
export function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash.replace(/^#/, ''));

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash.replace(/^#/, ''));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return hash;
}

/** True when the URL is the hidden admin entry point, `#/admin`. */
export function useIsAdminRoute() {
  const hash = useHashRoute();
  return hash === '/admin';
}
