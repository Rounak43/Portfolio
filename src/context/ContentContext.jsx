import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';

import { api } from '../api/client';
import {
  fallbackProjects,
  fallbackSkills,
  fallbackTimeline,
  fallbackCompetitions,
  fallbackAbout,
} from '../data/fallbacks';

const ContentContext = createContext(null);

/** The list-shaped resources, each with the bundled data to fall back on. */
const COLLECTIONS = {
  projects: fallbackProjects,
  skills: fallbackSkills,
  timeline: fallbackTimeline,
  competitions: fallbackCompetitions,
};

const initialState = () => {
  const state = {};
  for (const [name, fallback] of Object.entries(COLLECTIONS)) {
    state[name] = { items: fallback, loading: true, usingFallback: true };
  }
  return state;
};

/**
 * Loads every content collection from the API once, and exposes the mutation
 * helpers the admin UI uses. Each mutation refetches just its own collection,
 * which keeps ordering and server-assigned fields correct without the
 * bookkeeping that optimistic updates would need.
 */
export function ContentProvider({ children }) {
  const [collections, setCollections] = useState(initialState);
  const [about, setAbout] = useState({ data: fallbackAbout, loading: true, usingFallback: true });
  const [offline, setOffline] = useState(false);

  const loadCollection = useCallback(async (name) => {
    try {
      const response = await api.get(`/${name}`);
      setCollections((prev) => ({
        ...prev,
        [name]: { items: response.data, loading: false, usingFallback: false },
      }));
      return true;
    } catch {
      // Keep showing the bundled snapshot rather than blanking the section.
      setCollections((prev) => ({
        ...prev,
        [name]: { ...prev[name], loading: false, usingFallback: true },
      }));
      return false;
    }
  }, []);

  const loadAbout = useCallback(async () => {
    try {
      const response = await api.get('/about');
      const hasContent = response.data?.paragraphs?.length > 0;
      setAbout({
        data: hasContent ? response.data : fallbackAbout,
        loading: false,
        usingFallback: !hasContent,
      });
      return true;
    } catch {
      setAbout((prev) => ({ ...prev, loading: false, usingFallback: true }));
      return false;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const results = await Promise.all([
        ...Object.keys(COLLECTIONS).map(loadCollection),
        loadAbout(),
      ]);

      if (!cancelled) setOffline(results.every((ok) => !ok));
    })();

    return () => {
      cancelled = true;
    };
  }, [loadCollection, loadAbout]);

  const createItem = useCallback(
    async (name, payload) => {
      await api.post(`/${name}`, payload);
      await loadCollection(name);
    },
    [loadCollection]
  );

  const updateItem = useCallback(
    async (name, id, payload) => {
      await api.patch(`/${name}/${id}`, payload);
      await loadCollection(name);
    },
    [loadCollection]
  );

  const deleteItem = useCallback(
    async (name, id) => {
      await api.remove(`/${name}/${id}`);
      await loadCollection(name);
    },
    [loadCollection]
  );

  const reorderItems = useCallback(
    async (name, ids) => {
      // Reflect the new order immediately; the section re-sorts under the
      // cursor while the request is still in flight.
      setCollections((prev) => {
        const byId = new Map(prev[name].items.map((item) => [item.id, item]));
        return {
          ...prev,
          [name]: { ...prev[name], items: ids.map((id) => byId.get(id)).filter(Boolean) },
        };
      });

      try {
        await api.post(`/${name}/reorder`, { ids });
      } finally {
        await loadCollection(name);
      }
    },
    [loadCollection]
  );

  const saveAbout = useCallback(
    async (payload) => {
      await api.put('/about', payload);
      await loadAbout();
    },
    [loadAbout]
  );

  const value = useMemo(
    () => ({
      projects: collections.projects,
      skills: collections.skills,
      timeline: collections.timeline,
      competitions: collections.competitions,
      about,
      offline,
      createItem,
      updateItem,
      deleteItem,
      reorderItems,
      saveAbout,
      refresh: loadCollection,
    }),
    [
      collections,
      about,
      offline,
      createItem,
      updateItem,
      deleteItem,
      reorderItems,
      saveAbout,
      loadCollection,
    ]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used inside a ContentProvider.');
  return context;
}
