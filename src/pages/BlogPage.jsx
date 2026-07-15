import { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import { fetchFromWp } from '../utils/wpApi';

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchFromWp('/posts?per_page=20&_embed');
        setPosts(data);
      } catch (err) {
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main className="blog-page-wrap">
      <section className="blog-page-hero reveal active">
        <span className="badge">Insights & Analytics</span>
        <h1>Improx Tech Intelligence Reports</h1>
        <p>
          Our latest technical observations, engineering blueprints, cloud setup guides, and software security reviews.
        </p>
      </section>
      <div className="blog-layout">
        <div className="blog-main">
          {loading && (
            <div className="loader-container">
              <div className="loader" aria-label="Loading" />
            </div>
          )}
          {error && <p className="error-message">{error}</p>}
          {!loading && !error && (
            <div className="blog-list">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>

        <aside className="blog-sidebar">
          <div className="glass-card sidebar-widget">
            <h3>Search</h3>
            <div className="blog-search-wrap">
              <input type="search" placeholder="Search articles..." aria-label="Search blog posts" disabled />
              <button type="button" className="btn btn-primary" aria-label="Search" disabled>
                <i className="fas fa-magnifying-glass" />
              </button>
            </div>
          </div>

          <div className="glass-card sidebar-widget">
            <h3>Categories</h3>
            <div className="sidebar-list">
              <p className="sidebar-muted">Categories will appear once API integration is enabled.</p>
            </div>
          </div>

          <div className="glass-card sidebar-widget">
            <h3>Recent Posts</h3>
            <div className="sidebar-recent">
              <p className="sidebar-muted">Recent posts will appear once API integration is enabled.</p>
            </div>
          </div>

          <div className="glass-card sidebar-widget">
            <h3>Tags</h3>
            <div className="sidebar-tags">
              <p className="sidebar-muted">Tags will appear once API integration is enabled.</p>
            </div>
          </div>
        </aside>
      </div>

      <section className="section cta-banner-section">
        <div className="glass-card reveal cta-banner">
          <h2>Looking for Technical Consultation?</h2>
          <p>
            Get in touch with an engineering consultant today to review database performance, cloud infrastructure, or code reviews.
          </p>
          <a className="btn btn-primary" href="/contact">
            Contact Our Team <i className="fas fa-arrow-right" />
          </a>
        </div>
      </section>
    </main>
  );
}

export default BlogPage;
