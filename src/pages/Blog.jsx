import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts } from '../utils/getBlogPosts';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  
  // Filter States
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');
  
  // Accordion State
  const [expandedYears, setExpandedYears] = useState({});

  useEffect(() => {
    const fetchedPosts = getBlogPosts();
    setPosts(fetchedPosts);
    
    // Default to 'All' for everything to allow browsing freely
    if (fetchedPosts.length > 0) {
      const mostRecentPost = fetchedPosts[0];
      const [year, month] = mostRecentPost.date.split('-');
      const dateObj = new Date(year, parseInt(month) - 1);
      const monthName = dateObj.toLocaleString('default', { month: 'long' });
      
      setSelectedYear(year);
      setSelectedMonth(monthName);
      setExpandedYears({ [year]: true });
    }
  }, []);

  // Compute unique values for Sidebar
  const yearsWithMonths = useMemo(() => {
    const groups = {};
    posts.forEach(post => {
      const [yearStr, monthStr, dayStr] = post.date.split('-');
      const dateObj = new Date(yearStr, parseInt(monthStr) - 1, dayStr);
      const year = yearStr;
      const month = dateObj.toLocaleString('default', { month: 'long' });
      
      if (!groups[year]) groups[year] = new Set();
      groups[year].add(month);
    });
    // Convert sets to arrays and sort years descending
    const sortedYears = Object.keys(groups).sort((a, b) => b - a);
    return sortedYears.map(year => ({
      year,
      months: Array.from(groups[year])
    }));
  }, [posts]);

  const categories = useMemo(() => {
    const cats = new Set();
    posts.forEach(p => p.category && cats.add(p.category));
    return Array.from(cats).sort();
  }, [posts]);

  const tags = useMemo(() => {
    const tgs = new Set();
    posts.forEach(p => {
      if (Array.isArray(p.tags)) {
        p.tags.forEach(t => tgs.add(t));
      }
    });
    return Array.from(tgs).sort();
  }, [posts]);

  // Apply Filters (Intersected)
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const [yearStr, monthStr, dayStr] = post.date.split('-');
      const dateObj = new Date(yearStr, parseInt(monthStr) - 1, dayStr);
      const postYear = yearStr;
      const postMonth = dateObj.toLocaleString('default', { month: 'long' });

      // Year Match
      if (selectedYear !== 'All' && postYear !== selectedYear) return false;
      // Month Match
      if (selectedMonth !== 'All' && postMonth !== selectedMonth) return false;
      // Category Match
      if (selectedCategory !== 'All' && post.category !== selectedCategory) return false;
      // Tag Match
      if (selectedTag !== 'All' && (!post.tags || !post.tags.includes(selectedTag))) return false;

      return true;
    });
  }, [posts, selectedYear, selectedMonth, selectedCategory, selectedTag]);

  // Dynamic Header Text
  const getHeaderText = () => {
    let text = "All Posts";
    if (selectedCategory !== 'All') text = `${selectedCategory}`;
    if (selectedTag !== 'All') text = `Posts tagged with '${selectedTag}'`;
    
    if (selectedYear !== 'All') {
      if (selectedMonth !== 'All') {
        text += ` in ${selectedMonth} ${selectedYear}`;
      } else {
        text += ` in ${selectedYear}`;
      }
    }
    return text;
  };

  const clearFilters = () => {
    setSelectedYear('All');
    setSelectedMonth('All');
    setSelectedCategory('All');
    setSelectedTag('All');
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-container-max mx-auto">
      
      {/* Header */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500 flex justify-between items-end">
        <div>
          <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight mb-4">
            Blog Archives
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
            Thoughts, tutorials, and insights on software engineering, design, and more.
          </p>
        </div>
        {(selectedYear !== 'All' || selectedMonth !== 'All' || selectedCategory !== 'All' || selectedTag !== 'All') && (
          <button 
            onClick={clearFilters}
            className="hidden lg:flex items-center gap-2 text-primary-container hover:text-primary-container/80 transition-colors uppercase tracking-widest font-label-md"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
            Clear Filters
          </button>
        )}
      </div>

      {/* 2-Pane Layout */}
      <div className="flex flex-col lg:flex-row gap-12 items-start relative">
        
        {/* Pane 1: Sidebar Navigation */}
        <aside className="w-full lg:w-1/4 lg:sticky lg:top-32 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 flex flex-col gap-8 pb-8">
          
          {/* Mobile Clear Filters */}
          {(selectedYear !== 'All' || selectedMonth !== 'All' || selectedCategory !== 'All' || selectedTag !== 'All') && (
            <button 
              onClick={clearFilters}
              className="lg:hidden flex items-center justify-center w-full bg-surface-variant/30 py-3 rounded-xl gap-2 text-primary-container hover:bg-surface-variant/50 transition-colors uppercase tracking-widest font-label-md"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
              Clear Filters
            </button>
          )}

          {/* Timeline Section */}
          <div className="bg-surface-variant/20 border border-outline-variant/30 rounded-3xl p-6 md:p-8">
            <h2 className="font-headline-sm text-xl font-bold text-on-surface mb-6 border-b border-outline-variant/20 pb-4">
              Timeline
            </h2>
            
            <button
              onClick={() => { setSelectedYear('All'); setSelectedMonth('All'); }}
              className={`text-left w-full mb-6 font-label-md uppercase tracking-widest transition-colors ${
                selectedYear === 'All' ? 'text-primary-container font-semibold' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              All Time
            </button>

            {yearsWithMonths.map(({ year, months }) => {
              const isExpanded = expandedYears[year];
              return (
                <div key={year} className="mb-4 last:mb-0">
                  <button
                    onClick={() => setExpandedYears(prev => ({ ...prev, [year]: !isExpanded }))}
                    className={`flex items-center justify-between w-full font-label-md uppercase tracking-widest mb-2 transition-colors ${
                      selectedYear === year ? 'text-primary-container font-semibold' : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span>{year}</span>
                    <span className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                      expand_more
                    </span>
                  </button>
                  
                  {isExpanded && (
                    <ul className="flex flex-col gap-2 pl-2 border-l border-outline-variant/20 ml-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      <li>
                        <button
                          onClick={() => { setSelectedYear(year); setSelectedMonth('All'); }}
                          className={`flex items-center w-full text-left px-4 py-2 rounded-xl transition-all duration-200 ${
                            selectedYear === year && selectedMonth === 'All' 
                              ? "bg-primary-container/10 text-primary-container font-semibold" 
                              : "text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface"
                          }`}
                        >
                          All of {year}
                        </button>
                      </li>
                      {months.map(month => {
                        const isActive = selectedYear === year && selectedMonth === month;
                        return (
                          <li key={month}>
                            <button
                              onClick={() => { setSelectedYear(year); setSelectedMonth(month); }}
                              className={`flex items-center w-full text-left px-4 py-2 rounded-xl transition-all duration-200 ${
                                isActive 
                                  ? "bg-primary-container/10 text-primary-container font-semibold" 
                                  : "text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface"
                              }`}
                            >
                              {month}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>

          {/* Categories Section */}
          {categories.length > 0 && (
            <div className="bg-surface-variant/20 border border-outline-variant/30 rounded-3xl p-6 md:p-8">
              <h2 className="font-headline-sm text-xl font-bold text-on-surface mb-6 border-b border-outline-variant/20 pb-4">
                Categories
              </h2>
              <ul className="flex flex-col gap-2">
                <li key="all-cats">
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`flex items-center w-full text-left px-4 py-2 rounded-xl transition-all duration-200 ${
                      selectedCategory === 'All' 
                        ? "bg-primary-container/10 text-primary-container font-semibold" 
                        : "text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface"
                    }`}
                  >
                    All Categories
                  </button>
                </li>
                {categories.map(cat => {
                  const isActive = selectedCategory === cat;
                  return (
                    <li key={cat}>
                      <button
                        onClick={() => setSelectedCategory(cat)}
                        className={`flex items-center w-full text-left px-4 py-2 rounded-xl transition-all duration-200 ${
                          isActive 
                            ? "bg-primary-container/10 text-primary-container font-semibold" 
                            : "text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface"
                        }`}
                      >
                        {cat}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Tags Section */}
          {tags.length > 0 && (
            <div className="bg-surface-variant/20 border border-outline-variant/30 rounded-3xl p-6 md:p-8">
              <h2 className="font-headline-sm text-xl font-bold text-on-surface mb-6 border-b border-outline-variant/20 pb-4">
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => {
                  const isActive = selectedTag === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(isActive ? 'All' : tag)}
                      className={`px-3 py-1.5 rounded-full text-sm font-label-md transition-all duration-200 border ${
                        isActive 
                          ? "bg-primary-container text-surface border-primary-container" 
                          : "bg-surface-variant/30 text-on-surface-variant border-outline-variant/30 hover:bg-surface-variant/80 hover:text-on-surface"
                      }`}
                    >
                      #{tag}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </aside>

        {/* Pane 2: Main Content Area */}
        <main className="w-full lg:w-3/4 flex-1">
          <h2 className="font-headline-md text-2xl font-bold text-on-surface mb-8 border-b border-outline-variant/20 pb-4 animate-in fade-in duration-300 capitalize">
            {getHeaderText()}
          </h2>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post, index) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group block animate-in fade-in slide-in-from-bottom-8 duration-500 fill-mode-both"
                  style={{ animationDelay: `${Math.min(index * 100, 500)}ms` }}
                >
                  <div className="h-full bg-surface-variant/30 border border-outline-variant/30 rounded-3xl p-6 md:p-8 hover:bg-surface-variant/50 hover:border-primary-container/30 hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden">
                    
                    {/* Category Badge */}
                    {post.category && (
                      <span className="absolute top-6 right-6 md:top-8 md:right-8 text-[10px] font-label-md uppercase tracking-widest bg-primary-container/10 text-primary-container px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    )}

                    <p className="text-sm font-label-md text-primary-container uppercase tracking-widest mb-3">
                      {post.date}
                    </p>
                    <h3 className="text-xl md:text-2xl font-headline-sm font-bold text-on-surface mb-4 group-hover:text-primary-container transition-colors line-clamp-2 pr-12">
                      {post.title}
                    </h3>
                    <p className="font-body-md text-on-surface-variant flex-grow mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-xs text-on-surface-variant bg-surface-variant/50 px-2 py-1 rounded-md">
                            #{tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="text-xs text-on-surface-variant bg-surface-variant/50 px-2 py-1 rounded-md">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="mt-auto flex items-center gap-2 text-primary-container font-label-md uppercase tracking-widest">
                      Read Post
                      <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform duration-300">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-surface-variant/10 border border-outline-variant/20 rounded-3xl p-12 text-center animate-in fade-in duration-300">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4">
                filter_list_off
              </span>
              <p className="text-xl text-on-surface-variant mb-6">No posts match your selected filters.</p>
              <button 
                onClick={clearFilters}
                className="bg-primary-container text-surface font-label-md uppercase tracking-widest px-6 py-3 rounded-full hover:bg-primary-container/80 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </main>
        
      </div>
    </div>
  );
}
