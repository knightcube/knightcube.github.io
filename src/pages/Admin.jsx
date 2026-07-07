import { useState } from 'react';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import TextareaAutosize from 'react-textarea-autosize';
import '@blocknote/mantine/style.css';
export default function Admin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [originalSlug, setOriginalSlug] = useState('');
  const [date, setDate] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [isDraft, setIsDraft] = useState(false);
  
  const [view, setView] = useState('dashboard');
  
  const [postsList, setPostsList] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  
  const [imagesList, setImagesList] = useState([]);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);
  
  const editor = useCreateBlockNote({
    uploadFile: async (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async () => {
          try {
            const base64 = reader.result;
            const res = await fetch('/api/upload-image', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ filename: file.name, data: base64 })
            });
            const json = await res.json();
            if (json.url) {
              resolve(json.url);
            } else {
              reject('Failed to upload image');
            }
          } catch (e) {
            reject(e);
          }
        };
        reader.onerror = () => reject('Failed to read file');
        reader.readAsDataURL(file);
      });
    }
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter a password');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setIsAuthenticated(true);
        fetchPostsList();
      } else {
        setError(data.error || 'Incorrect password');
      }
    } catch (err) {
      setError('Network error or server is not running.');
    } finally {
      setLoading(false);
    }
  };

  const fetchPostsList = async () => {
    setLoadingPosts(true);
    try {
      const res = await fetch('/api/list-blogs');
      const data = await res.json();
      setPostsList(data);
    } catch (err) {
      setError('Failed to fetch posts list.');
    } finally {
      setLoadingPosts(false);
    }
  };

  const fetchImagesList = async () => {
    setLoadingImages(true);
    try {
      const res = await fetch('/api/list-images');
      const data = await res.json();
      setImagesList(data);
      setShowGalleryModal(true);
    } catch (err) {
      setError('Failed to fetch images list.');
    } finally {
      setLoadingImages(false);
    }
  };

  const insertImageFromGallery = (url) => {
    const currentBlock = editor.getTextCursorPosition().block;
    
    // Insert an image block immediately after the current block
    editor.insertBlocks(
      [
        {
          type: "image",
          props: {
            url: url
          }
        }
      ],
      currentBlock,
      "after"
    );
    
    setShowGalleryModal(false);
  };

  const loadPost = async (postSlug) => {
    setView('editor');
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`/api/get-blog?slug=${postSlug}`);
      if (!res.ok) throw new Error('Failed to fetch post');
      const data = await res.json();
      
      const { attributes, body } = data;
      setTitle(attributes.title || '');
      setSlug(postSlug);
      setOriginalSlug(postSlug);
      setDate(attributes.date || '');
      setExcerpt(attributes.excerpt || '');
      setCategory(attributes.category || '');
      setTags(attributes.tags ? attributes.tags.join(', ') : '');
      setIsDraft(attributes.draft === true);
      
      const blocks = await editor.tryParseMarkdownToBlocks(body);
      editor.replaceBlocks(editor.document, blocks);
    } catch (err) {
      setError('Failed to load post.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!originalSlug) return;
    if (!window.confirm(`Are you sure you want to delete this post? This cannot be undone.`)) return;
    
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/delete-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, slug: originalSlug })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete');
      }
      setSuccess(`Post "${originalSlug}" deleted successfully!`);
      fetchPostsList();
      setView('dashboard');
    } catch (err) {
      setError(err.message || 'Failed to delete post.');
    } finally {
      setLoading(false);
    }
  };

  const createNewPost = async () => {
    setTitle('');
    setSlug('');
    setOriginalSlug('');
    setDate('');
    setExcerpt('');
    setCategory('');
    setTags('');
    setIsDraft(false);
    const emptyBlocks = await editor.tryParseMarkdownToBlocks("");
    editor.replaceBlocks(editor.document, emptyBlocks);
    setView('editor');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/save-blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          title,
          slug,
          originalSlug,
          date,
          excerpt,
          category,
          tags,
          isDraft,
          content: await editor.blocksToMarkdownLossy(editor.document),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(`Post "${data.slug}" published successfully!`);
        setOriginalSlug(data.slug);
        setSlug(data.slug);
        fetchPostsList();
      } else {
        setError(data.error || 'Failed to publish post.');
        if (response.status === 401) {
          setIsAuthenticated(false); // kick them out if wrong password
        }
      }
    } catch (err) {
      setError('Network error or server is not running.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-md mx-auto flex flex-col justify-center">
        <div className="bg-surface-variant/30 border border-outline-variant/30 rounded-3xl p-8 animate-in fade-in duration-500">
          <h1 className="font-headline-md text-2xl font-bold text-on-surface mb-2">Admin Login</h1>
          <p className="text-on-surface-variant text-sm mb-6">Enter your admin password to access the blog editor.</p>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-label-md text-on-surface mb-2 uppercase tracking-widest">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface/50 border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container/50 transition-colors"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="bg-primary-container text-surface font-label-md uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-primary-container/80 transition-colors mt-2 disabled:opacity-50 flex justify-center"
            >
              {loading ? 'Verifying...' : 'Enter'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24">
      {view === 'dashboard' ? (
        <div className="max-w-5xl mx-auto px-6 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-4">
            <h1 className="font-headline-lg text-4xl font-bold text-on-surface">Dashboard</h1>
            <div className="flex gap-4">
               <button onClick={() => setIsAuthenticated(false)} className="px-4 py-2 rounded-lg font-label-md uppercase tracking-widest text-xs text-on-surface-variant hover:text-on-surface transition-colors">
                 Logout
               </button>
               <button onClick={createNewPost} className="bg-primary-container text-surface font-label-md uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-primary-container/80 transition-colors flex items-center gap-2 text-sm">
                 <span className="material-symbols-outlined text-[20px]">add</span>
                 Create New Post
               </button>
            </div>
          </div>
          
          <div className="bg-surface-container border border-outline-variant/30 rounded-3xl overflow-hidden shadow-2xl">
            {loadingPosts ? (
              <div className="p-16 text-center text-on-surface-variant">Loading posts...</div>
            ) : postsList.length === 0 ? (
              <div className="p-16 text-center text-on-surface-variant flex flex-col items-center gap-4">
                <span className="material-symbols-outlined text-5xl opacity-30">edit_document</span>
                <p>No posts found. Create your first post!</p>
              </div>
            ) : (
              <div className="divide-y divide-outline-variant/10">
                {postsList.map(post => (
                  <div key={post.slug} className="flex items-center justify-between p-6 hover:bg-surface-variant/30 transition-colors group">
                    <div>
                      <div className="font-bold text-on-surface text-lg mb-1 flex items-center">
                        {post.title}
                        {post.isDraft && <span className="ml-3 text-[10px] font-label-md uppercase tracking-widest bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded-md">Draft</span>}
                      </div>
                      <div className="text-sm text-on-surface-variant font-label-md">{post.date} &bull; {post.slug}</div>
                    </div>
                    <button onClick={() => loadPost(post.slug)} className="opacity-0 group-hover:opacity-100 transition-opacity bg-surface text-on-surface font-label-md uppercase tracking-widest px-5 py-2.5 rounded-lg border border-outline-variant/30 hover:bg-surface-variant flex items-center gap-2 text-xs">
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Sticky Action Bar */}
          <div className="sticky top-[80px] z-40 bg-background/80 backdrop-blur-md border-b border-outline-variant/10 px-6 py-4 flex flex-wrap gap-4 justify-between items-center animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="text-on-surface-variant font-label-md uppercase tracking-widest text-sm flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">edit_document</span>
                {originalSlug ? 'Editing' : 'Draft'}
              </div>
              <button onClick={() => setView('dashboard')} className="flex items-center gap-2 text-xs hover:text-on-surface transition-colors bg-surface-variant/30 px-3 py-1.5 rounded-lg">
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                Dashboard
              </button>
          <button onClick={fetchImagesList} className="flex items-center gap-2 text-xs hover:text-on-surface transition-colors bg-surface-variant/30 px-3 py-1.5 rounded-lg">
            <span className="material-symbols-outlined text-[16px]">image</span>
            Gallery
          </button>
          {originalSlug && (
             <button onClick={createNewPost} className="flex items-center gap-2 text-xs hover:text-on-surface transition-colors bg-surface-variant/30 px-3 py-1.5 rounded-lg">
              <span className="material-symbols-outlined text-[16px]">add</span>
              New Post
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 rounded-lg font-label-md uppercase tracking-widest text-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30 transition-colors"
          >
            Logout
          </button>
          {originalSlug && (
            <button
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-500/10 text-red-400 font-label-md uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-red-500/20 transition-colors disabled:opacity-50 text-xs flex items-center gap-2"
            >
              Delete
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-primary-container text-surface font-label-md uppercase tracking-widest px-6 py-2 rounded-lg hover:bg-primary-container/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-xs"
          >
            {loading ? 'Saving...' : (isDraft ? 'Save Draft' : 'Publish')}
          </button>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto pt-12 pb-32 px-6 sm:px-10 lg:px-12 xl:px-20 animate-in fade-in duration-700 delay-100">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-8 w-full">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-xl mb-8 w-full">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[280px_1fr_280px] gap-12 lg:gap-16 items-start">
          
          {/* Left Sidebar: Metadata / Properties */}
          <div className="flex flex-col gap-6 text-sm font-body-md lg:sticky lg:top-[160px]">
            <div className="text-xs font-label-md uppercase tracking-widest text-on-surface-variant/50 border-b border-outline-variant/10 pb-2 mb-2">
              Post Properties
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 group">
                <div className="text-on-surface-variant/70 flex items-center gap-2 group-hover:text-on-surface-variant transition-colors">
                  <span className="material-symbols-outlined text-[16px]">category</span>
                  Category
                </div>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-on-surface placeholder:text-on-surface-variant/30"
                  placeholder="e.g. Engineering"
                />
              </div>
              
              <div className="flex flex-col gap-2 group">
                <div className="text-on-surface-variant/70 flex items-center gap-2 group-hover:text-on-surface-variant transition-colors">
                  <span className="material-symbols-outlined text-[16px]">tag</span>
                  Tags
                </div>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-on-surface placeholder:text-on-surface-variant/30"
                  placeholder="e.g. React, Tutorial"
                />
              </div>

              <div className="flex flex-col gap-2 group">
                <div className="text-on-surface-variant/70 flex items-center gap-2 group-hover:text-on-surface-variant transition-colors">
                  <span className="material-symbols-outlined text-[16px]">link</span>
                  Slug
                </div>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-on-surface placeholder:text-on-surface-variant/30"
                  placeholder="Empty for auto slug"
                />
              </div>

              <div className="flex flex-col gap-2 group">
                <div className="text-on-surface-variant/70 flex items-center gap-2 group-hover:text-on-surface-variant transition-colors">
                  <span className="material-symbols-outlined text-[16px]">subject</span>
                  Excerpt
                </div>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                  className="w-full bg-transparent border-none outline-none text-on-surface placeholder:text-on-surface-variant/30 resize-none"
                  placeholder="A short summary..."
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer group mt-2">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={isDraft}
                    onChange={(e) => setIsDraft(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-10 h-6 rounded-full transition-colors ${isDraft ? 'bg-primary-container' : 'bg-surface-variant/50'}`}></div>
                  <div className={`absolute left-1 w-4 h-4 rounded-full bg-surface transition-transform ${isDraft ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
                <div className="text-on-surface-variant/70 group-hover:text-on-surface-variant transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">edit_document</span>
                  Save as Draft
                </div>
              </label>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col gap-8 w-full min-w-0">
            {/* Title */}
            <TextareaAutosize
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-4xl sm:text-5xl md:text-6xl font-display font-bold bg-transparent border-none outline-none text-on-surface placeholder:text-on-surface-variant/30 py-2 resize-none !overflow-visible leading-tight break-words"
              placeholder="Post Title"
              minRows={1}
            />

            {/* Editor Block */}
            <div className="relative -ml-[54px] w-[calc(100%+54px)] max-w-full">
              {/* The negative margin aligns the actual text of BlockNote with the left edge of the inputs, overriding BlockNote's left drag handle padding */}
              <BlockNoteView editor={editor} theme="dark" />
            </div>
          </div>

          {/* Right Sidebar: Instructions */}
          <div className="flex flex-col gap-6 text-sm font-body-md xl:sticky xl:top-[160px]">
            <div className="text-xs font-label-md uppercase tracking-widest text-on-surface-variant/50 border-b border-outline-variant/10 pb-2 mb-2">
              Next Steps
            </div>
            <div className="bg-surface-variant/30 border border-outline-variant/30 rounded-2xl p-6 flex flex-col gap-5 text-on-surface-variant">
              <div>
                <div className="font-bold text-on-surface mb-1 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-primary">save</span>
                  1. Publish
                </div>
                <p className="text-xs leading-relaxed">Clicking Publish only saves the Markdown file and images locally on your machine.</p>
              </div>
              
              <div>
                <div className="font-bold text-on-surface mb-1 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-primary">commit</span>
                  2. Commit
                </div>
                <p className="text-xs leading-relaxed">Once you are happy with the post, you need to commit the changes via your terminal.</p>
              </div>
              
              <div>
                <div className="font-bold text-on-surface mb-1 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-primary">cloud_upload</span>
                  3. Push to GitHub
                </div>
                <p className="text-xs leading-relaxed">Push your commits to your GitHub repository. Your hosting provider (like Vercel or GitHub Pages) will automatically redeploy your site!</p>
              </div>
              
              <div className="bg-background/80 p-4 rounded-xl font-mono text-xs border border-outline-variant/20 mt-2 leading-loose">
                <span className="text-primary-container">git</span> add .<br/>
                <span className="text-primary-container">git</span> commit -m "New post"<br/>
                <span className="text-primary-container">git</span> push
              </div>
            </div>
          </div>

        </div>
      </div>
      </>
      )}
      
      {/* Image Gallery Drawer */}
      {showGalleryModal && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setShowGalleryModal(false)}
          ></div>
          
          {/* Drawer */}
          <div className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-sm sm:max-w-md bg-surface-container border-l border-outline-variant/30 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 ease-out">
            <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/10">
              <h2 className="font-headline-md font-bold text-on-surface text-lg">Image Gallery</h2>
              <button onClick={() => setShowGalleryModal(false)} className="text-on-surface-variant hover:text-on-surface transition-colors p-2 -mr-2 rounded-full hover:bg-surface-variant/50">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {loadingImages ? (
                <div className="p-8 text-center text-on-surface-variant">Loading images...</div>
              ) : imagesList.length === 0 ? (
                <div className="p-8 text-center text-on-surface-variant">No images found. Upload some first!</div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {imagesList.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => insertImageFromGallery(url)}
                      className="group relative aspect-square rounded-xl overflow-hidden border border-outline-variant/20 hover:border-primary-container transition-colors bg-surface-variant/10 flex items-center justify-center"
                    >
                      <img src={url} alt="Gallery item" className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 bg-primary-container/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-primary-container text-surface px-3 py-1.5 rounded-lg text-xs font-label-md uppercase tracking-widest font-bold shadow-lg transform scale-95 group-hover:scale-100 transition-transform">
                          Insert
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}

    </div>
  );
}
