import fm from 'front-matter';

export function getBlogPosts() {
  // Use import.meta.glob with ?raw to get the raw text of the markdown files
  const modules = import.meta.glob('../content/blog/**/*.md', { query: '?raw', import: 'default', eager: true });
  
  const posts = Object.entries(modules).map(([path, content]) => {
    // Extract frontmatter and markdown body
    const { attributes, body } = fm(content);
    
    // Create a slug from the filename (e.g. "../content/blog/first-post.md" -> "first-post")
    const slug = path.split('/').pop().replace(/\.md$/, '');
    
    return {
      slug,
      title: attributes.title,
      date: attributes.date,
      excerpt: attributes.excerpt,
      category: attributes.category || 'Uncategorized',
      tags: attributes.tags || [],
      content: body,
      ...attributes // in case there are other custom fields
    };
  }).filter(post => !post.draft);
  
  // Sort posts by date descending
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getBlogPostBySlug(slug) {
  const posts = getBlogPosts();
  return posts.find((post) => post.slug === slug);
}
