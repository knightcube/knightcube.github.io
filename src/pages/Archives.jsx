import { useState, useMemo } from 'react';
import { transmissionLogs } from '../data/logs';

export default function Archives() {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Articles', 'Speaking'];

  const filteredLogs = useMemo(() => {
    // 1. Filter by category
    let results = filter === 'All'
      ? [...transmissionLogs]
      : transmissionLogs.filter(log => log.type?.trim().toLowerCase() === filter.toLowerCase());

    // 2. Sort by date (reverse chronological)
    return results.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [filter]);

  return (
    <main className="pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <header className="mb-16">
        <h1 className="font-display text-display text-on-surface mb-6"> Archives.</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          A log of articles, sessions, events and hackathons I was part of.
        </p>
      </header>

      {/* Filter System */}
      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full font-label-md text-label-md transition-all border ${filter === cat
              ? 'bg-primary-container/10 border-primary-container text-primary-container'
              : 'bg-transparent border-surface-container-high text-on-surface-variant hover:border-outline-variant hover:text-on-surface'
              }`}
          >
            {cat} Logs
          </button>
        ))}
      </div>

      {/* List View */}
      <div className="mt-16">
        <h4 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest mb-6">Archival Logs</h4>
        <div className="flex flex-col border-t border-surface-container-high">
          {filteredLogs.length > 0 ? (
            filteredLogs.map(log => (
              <a
                key={`${log.id}-${log.date}`}
                href={log.link}
                className="group py-6 border-b border-surface-container-high flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-surface-container-low transition-colors px-4 -mx-4 rounded-lg"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 flex-1">
                  <span className="font-label-md text-label-md text-on-surface-variant w-24 shrink-0 md:mt-1">{log.date}</span>
                  <div className="flex flex-col gap-2">
                    <h5 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary-container transition-colors">
                      {log.title}
                    </h5>
                    {log.description && (
                      <p className="font-body-md text-body-md text-on-surface-variant opacity-80 max-w-3xl pr-4">
                        {log.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {log.stats && (
                    <span className="hidden sm:flex font-label-sm text-label-sm text-on-surface-variant items-center gap-1.5 opacity-80 border border-surface-container-high px-3 py-1 rounded-full">
                      <span className="material-symbols-outlined text-[14px]">bar_chart</span>
                      {log.stats}
                    </span>
                  )}
                  <span className="font-label-sm text-label-sm text-on-surface-variant border border-surface-container-high px-3 py-1 rounded-full">
                    {log.type}
                  </span>
                  <span className="material-symbols-outlined text-outline-variant opacity-0 group-hover:opacity-100 transition-opacity">
                    arrow_forward
                  </span>
                </div>
              </a>
            ))
          ) : (
            <p className="py-10 text-center text-on-surface-variant">No logs found in this category.</p>
          )}
        </div>
      </div>
    </main>
  );
}