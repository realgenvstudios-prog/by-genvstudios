import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Link } from 'react-router-dom';

const BlogPageContainer = styled.div`
  padding: 120px 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 80px 1rem 2rem;
  }
`;

const BlogHeading = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const BlogPost = styled(motion.div)`
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

const BlogImage = styled.div`
  height: 200px;
  background-color: #f0f0f0; /* Placeholder color */
  background-size: cover;
  background-position: center;
`;

const BlogContent = styled.div`
  padding: 1.5rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const BlogDate = styled.div`
  font-size: 0.8rem;
  color: #777;
  margin-bottom: 0.5rem;
`;

const BlogTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    line-height: 1.3;
  }
`;

const BlogExcerpt = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 1rem;
`;

const BlogReadMore = styled(Link)`
  display: inline-block;
  font-size: 0.9rem;
  font-weight: 600;
  color: black;
  text-decoration: none;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: -2px;
    left: 0;
    background-color: currentColor;
  }
  
  &:hover {
    opacity: 0.7;
  }
`;

const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 1.2rem;
  color: #666;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
    
    h3 {
      font-size: 1.3rem;
    }
    
    p {
      font-size: 1rem;
    }
  }
`;

const ErrorState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #dc3545;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #666;
  }
`;

function BlogPage() {
  // Get real blog data from Convex
  const blogs = useQuery(api.blogs.getAll);
  
  // Filter only published blogs and sort by date
  const publishedBlogs = blogs?.filter(blog => blog.status === 'published').sort((a, b) => new Date(b.date) - new Date(a.date)) || [];
  
  // Loading state
  if (blogs === undefined) {
    return (
      <BlogPageContainer>
        <BlogHeading
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Blog
        </BlogHeading>
        <LoadingState>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            style={{ 
              width: 40, 
              height: 40, 
              border: '3px solid #f0f0f0', 
              borderTop: '3px solid #333', 
              borderRadius: '50%',
              marginRight: '1rem'
            }}
          />
          Loading blog posts...
        </LoadingState>
      </BlogPageContainer>
    );
  }
  
  // Error state
  if (blogs === null) {
    return (
      <BlogPageContainer>
        <BlogHeading
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Blog
        </BlogHeading>
        <ErrorState>
          <h3>Unable to load blog posts</h3>
          <p>Please try refreshing the page or check back later.</p>
        </ErrorState>
      </BlogPageContainer>
    );
  }
  
  // Empty state
  if (publishedBlogs.length === 0) {
    return (
      <BlogPageContainer>
        <BlogHeading
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Blog
        </BlogHeading>
        <EmptyState>
          <h3>No blog posts yet</h3>
          <p>Check back soon for the latest updates and insights from Genvstudios.</p>
        </EmptyState>
      </BlogPageContainer>
    );
  }

  return (
    <BlogPageContainer>
      <BlogHeading
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Blog
      </BlogHeading>
      
      <BlogGrid>
        {publishedBlogs.map((blog, index) => (
          <BlogPost
            key={blog._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <BlogImage 
              style={{ 
                backgroundImage: blog.imageUrl ? `url(${blog.imageUrl})` : 'none',
                backgroundColor: blog.imageUrl ? 'transparent' : `hsl(${index * 60}, 70%, 85%)`
              }} 
            />
            <BlogContent>
              <BlogDate>{new Date(blog.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</BlogDate>
              <BlogTitle>{blog.title}</BlogTitle>
              {blog.subtitle && (
                <div style={{ 
                  fontSize: '1.1rem', 
                  color: '#777', 
                  marginBottom: '0.5rem',
                  fontStyle: 'italic'
                }}>
                  {blog.subtitle}
                </div>
              )}
              <BlogExcerpt>{blog.excerpt || blog.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'}</BlogExcerpt>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginTop: '1rem'
              }}>
                <BlogReadMore to={`/blog/${blog._id}`}>Read More</BlogReadMore>
                {blog.author && (
                  <div style={{ 
                    fontSize: '0.85rem', 
                    color: '#888',
                    fontStyle: 'italic'
                  }}>
                    by {blog.author}
                  </div>
                )}
              </div>
            </BlogContent>
          </BlogPost>
        ))}
      </BlogGrid>
    </BlogPageContainer>
  );
}

export default BlogPage;