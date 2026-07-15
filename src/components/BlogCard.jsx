import { Link } from 'react-router-dom';

function BlogCard({ post }) {
  const excerpt = post.excerpt?.rendered
    ? post.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 160) + '…'
    : 'Read the full article to explore the approach, key takeaways, and implementation guidance.';

  const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80';

  return (
    <article className="blog-card glass-card reveal">
      <img src={image} alt={post.title?.rendered || 'Blog post'} loading="lazy" />
      <div className="blog-card-body">
        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
        <h3>{post.title?.rendered}</h3>
        <p>{excerpt}</p>
        <Link to={`/blog/${post.id}`} className="btn btn-primary">
          Read More
        </Link>
      </div>
    </article>
  );
}

export default BlogCard;
