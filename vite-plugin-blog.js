import fs from 'fs';
import path from 'path';
import { loadEnv } from 'vite';
import fm from 'front-matter';

export function localBlogApi() {
  const getAllMdFiles = (dir, fileList = []) => {
    if (!fs.existsSync(dir)) return fileList;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        getAllMdFiles(fullPath, fileList);
      } else if (file.endsWith('.md')) {
        fileList.push(fullPath);
      }
    }
    return fileList;
  };

  const findPostBySlug = (dir, targetSlug) => {
    if (!fs.existsSync(dir)) return null;
    const files = getAllMdFiles(dir);
    return files.find(file => path.basename(file, '.md') === targetSlug) || null;
  };

  const getAllImages = (dir, fileList = []) => {
    if (!fs.existsSync(dir)) return fileList;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        getAllImages(fullPath, fileList);
      } else if (/\.(png|jpe?g|gif|svg|webp)$/i.test(file)) {
        fileList.push(fullPath);
      }
    }
    return fileList;
  };

  return {
    name: 'local-blog-api',
    configureServer(server) {
      server.middlewares.use('/api/upload-image', (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk.toString(); });
          req.on('end', () => {
            try {
              const { filename, data } = JSON.parse(body);
              if (!filename || !data) {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: 'Missing filename or data' }));
              }
              
              // data is usually like: "data:image/png;base64,iVBORw0KGgo..."
              const matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
              if (!matches || matches.length !== 3) {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: 'Invalid base64 image data' }));
              }
              
              const buffer = Buffer.from(matches[2], 'base64');
              
              const imgDir = path.resolve(process.cwd(), 'public/images/blog');
              if (!fs.existsSync(imgDir)) {
                fs.mkdirSync(imgDir, { recursive: true });
              }

              // Create a unique filename to avoid overwrites
              const timestamp = Date.now();
              const safeFilename = filename.replace(/[^a-zA-Z0-9.\-_]/g, '');
              const uniqueFilename = `${timestamp}-${safeFilename}`;
              const filePath = path.join(imgDir, uniqueFilename);
              
              fs.writeFileSync(filePath, buffer);
              
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ url: `/images/blog/${uniqueFilename}` }));
            } catch (err) {
              console.error('Error uploading image:', err);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Failed to upload image.' }));
            }
          });
        } else {
          next();
        }
      });

      server.middlewares.use('/api/verify-password', (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk.toString(); });
          req.on('end', () => {
            try {
              const env = loadEnv(server.config.mode, process.cwd(), '');
              const { password } = JSON.parse(body);
              const adminPassword = env.VITE_ADMIN_PASSWORD;
              
              if (!adminPassword || password !== adminPassword) {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: 'Incorrect password.' }));
              }
              
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true }));
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Server error' }));
            }
          });
        } else {
          next();
        }
      });

      server.middlewares.use('/api/save-blog', (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              const { password, title, slug, originalSlug, date, excerpt, category, tags, content, isDraft } = data;

              // Check password
              const env = loadEnv(server.config.mode, process.cwd(), '');
              const adminPassword = env.VITE_ADMIN_PASSWORD;
              if (!adminPassword || password !== adminPassword) {
                res.statusCode = 401;
                res.end(JSON.stringify({ error: 'Unauthorized. Incorrect password.' }));
                return;
              }

              // Create frontmatter
              const postDate = date || new Date().toISOString().split('T')[0]; // YYYY-MM-DD
              const [year, month] = postDate.split('-');
              const tagsArray = tags.split(',').map(tag => tag.trim()).filter(Boolean);
              
              const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${postDate}"
draft: ${isDraft === true}
excerpt: "${excerpt.replace(/"/g, '\\"')}"
category: "${category}"
tags: ${JSON.stringify(tagsArray)}
---

${content}
`;

              // Ensure blog directory exists
              const baseBlogDir = path.resolve(process.cwd(), 'src/content/blog');
              const targetDir = path.join(baseBlogDir, year, month);
              if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
              }

              // Write file
              const safeSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
              const filePath = path.join(targetDir, `${safeSlug}.md`);
              
              if (originalSlug) {
                const oldFilePath = findPostBySlug(baseBlogDir, originalSlug);
                if (oldFilePath && oldFilePath !== filePath) {
                  fs.unlinkSync(oldFilePath);
                }
              }
              
              fs.writeFileSync(filePath, frontmatter, 'utf-8');

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: 'Blog published successfully!', slug: safeSlug }));
            } catch (err) {
              console.error('Error saving blog:', err);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Failed to save blog post.' }));
            }
          });
        } else {
          next();
        }
      });

      server.middlewares.use('/api/list-blogs', (req, res, next) => {
        if (req.method === 'GET') {
          try {
            const blogDir = path.resolve(process.cwd(), 'src/content/blog');
            if (!fs.existsSync(blogDir)) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify([]));
            }
            const files = getAllMdFiles(blogDir);
            const blogs = files.map(filePath => {
              const content = fs.readFileSync(filePath, 'utf-8');
              const parsed = fm(content);
              return {
                slug: path.basename(filePath, '.md'),
                title: parsed.attributes.title || path.basename(filePath, '.md'),
                date: parsed.attributes.date || '',
                isDraft: parsed.attributes.draft === true,
              };
            });
            // Sort by date descending
            blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(blogs));
          } catch (err) {
            console.error('Error listing blogs:', err);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to list blogs' }));
          }
        } else {
          next();
        }
      });

      server.middlewares.use('/api/get-blog', (req, res, next) => {
        if (req.method === 'GET') {
          try {
            const url = new URL(req.url, `http://${req.headers.host}`);
            const slug = url.searchParams.get('slug');
            if (!slug) {
              res.statusCode = 400;
              return res.end(JSON.stringify({ error: 'Missing slug' }));
            }
            const blogDir = path.resolve(process.cwd(), 'src/content/blog');
            const filePath = findPostBySlug(blogDir, slug);
            if (!filePath) {
              res.statusCode = 404;
              return res.end(JSON.stringify({ error: 'Blog not found' }));
            }
            const content = fs.readFileSync(filePath, 'utf-8');
            const parsed = fm(content);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              attributes: parsed.attributes,
              body: parsed.body,
            }));
          } catch (err) {
            console.error('Error getting blog:', err);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to get blog' }));
          }
        } else {
          next();
        }
      });

      server.middlewares.use('/api/delete-blog', (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk.toString(); });
          req.on('end', () => {
            try {
              const { password, slug } = JSON.parse(body);
              const env = loadEnv(server.config.mode, process.cwd(), '');
              const adminPassword = env.VITE_ADMIN_PASSWORD;
              
              if (!adminPassword || password !== adminPassword) {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: 'Incorrect password.' }));
              }

              const blogDir = path.resolve(process.cwd(), 'src/content/blog');
              const filePath = findPostBySlug(blogDir, slug);
              if (filePath) {
                fs.unlinkSync(filePath);
              }
              
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true }));
            } catch (err) {
              console.error('Error deleting blog:', err);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Failed to delete blog' }));
            }
          });
        } else {
          next();
        }
      });

      server.middlewares.use('/api/list-images', (req, res, next) => {
        if (req.method === 'GET') {
          try {
            const publicDir = path.resolve(process.cwd(), 'public');
            if (!fs.existsSync(publicDir)) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify([]));
            }
            const files = getAllImages(publicDir);
            // Sort files by modified time descending (newest first)
            files.sort((a, b) => {
              const statA = fs.statSync(a);
              const statB = fs.statSync(b);
              return statB.mtimeMs - statA.mtimeMs;
            });
            const imageUrls = files.map(file => {
              const relPath = path.relative(publicDir, file);
              return '/' + relPath.split(path.sep).join('/');
            });
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(imageUrls));
          } catch (err) {
            console.error('Error listing images:', err);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to list images' }));
          }
        } else {
          next();
        }
      });
    },
  };
}
