import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Giscus from '@giscus/react';
import { getBlogPostBySlug } from '../utils/getBlogPosts';
import { useEffect } from 'react';
import '../markdown.css';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-8">
        <h1 className="text-4xl font-bold text-on-surface mb-4">Post Not Found</h1>
        <Link to="/blog" className="text-primary-container hover:underline">
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-8 md:px-12 max-w-3xl mx-auto">
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary-container transition-colors mb-8 font-label-md uppercase tracking-widest"
        >
          <span className="material-symbols-outlined text-[20px]">
            arrow_back
          </span>
          Back to Blog
        </Link>

        <div className="flex flex-wrap items-center gap-4 mb-4">
          {post.category && (
            <span className="text-xs font-label-md uppercase tracking-widest bg-primary-container/10 text-primary-container px-3 py-1 rounded-full">
              {post.category}
            </span>
          )}
          <p className="text-sm font-label-md text-on-surface-variant uppercase tracking-widest">
            {post.date}
          </p>
        </div>

        <h1 className="font-headline-lg text-4xl md:text-5xl font-bold text-on-surface tracking-tight mb-6">
          {post.title}
        </h1>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs font-label-md text-on-surface-variant bg-surface-variant/30 border border-outline-variant/30 px-3 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {post.excerpt && (
          <p className="text-xl text-on-surface-variant italic border-l-2 border-primary-container/50 pl-4 py-1">
            {post.excerpt}
          </p>
        )}
      </div>

      {/* Using custom GitHub-style Markdown CSS tailored for the dark theme */}
      <div className="markdown-body animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({node, ...props}) => <a target="_blank" rel="noopener noreferrer" {...props} />
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Giscus Comments Section */}
      <div className="mt-20 pt-12 border-t border-outline-variant/30 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
        <h3 className="font-headline-sm text-2xl font-bold text-on-surface mb-8">
          Discussion
        </h3>
        <Giscus
          id="comments"
          repo="knightcube/knightcube.github.io"
          repoId={import.meta.env.VITE_GISCUS_REPO_ID}
          category="Announcements"
          categoryId={import.meta.env.VITE_GISCUS_CATEGORY_ID}
          mapping="pathname"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="bottom"
          theme="transparent_dark"
          lang="en"
          crossorigin="anonymous"
          async
        />
      </div>
    </div>
  );
}
