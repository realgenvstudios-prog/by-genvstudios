import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const BlogDetailContainer = styled.div`
  padding: 120px 2rem 4rem;
  max-width: 800px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 80px 1rem 2rem;
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  font-size: 0.9rem;
  color: #666;
  text-decoration: none;
  margin-bottom: 2rem;
  
  &:hover {
    color: #333;
  }
  
  &:before {
    content: '← ';
    margin-right: 0.5rem;
  }
`;

const BlogHeader = styled.div`
  margin-bottom: 3rem;
  text-align: center;
`;

const BlogImage = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    height: 250px;
  }
`;

const BlogTitle = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    line-height: 1.3;
  }
`;

const BlogSubtitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 400;
  color: #666;
  margin-bottom: 1.5rem;
  font-style: italic;
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const BlogContent = styled(motion.div)`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.7;
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin: 2rem 0 1rem 0;
    color: #222;
  }
  
  h2 {
    font-size: 1.8rem;
    border-bottom: 2px solid #f0f0f0;
    padding-bottom: 0.5rem;
    
    @media (max-width: 768px) {
      font-size: 1.4rem;
    }
  }
  
  h3 {
    font-size: 1.4rem;
    
    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }
  
  p {
    margin-bottom: 1.5rem;
  }
  
  strong {
    font-weight: 600;
    color: #222;
  }
  
  em {
    font-style: italic;
    color: #555;
  }
  
  a {
    color: #007bff;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  ul, ol {
    margin: 1.5rem 0;
    padding-left: 2rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  blockquote {
    border-left: 4px solid #ddd;
    margin: 2rem 0;
    padding: 1rem 2rem;
    background: #f9f9f9;
    font-style: italic;
  }
  
  code {
    background: #f4f4f4;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: 'Monaco', 'Consolas', monospace;
    font-size: 0.9rem;
  }
  
  pre {
    background: #f4f4f4;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1.5rem 0;
  }
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 1.5rem 0;
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

const ErrorState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  p {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 2rem;
  }
  
  button {
    background: #333;
    color: #fff;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    
    &:hover {
      background: #555;
    }
  }
`;

function BlogDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = useQuery(api.blogs.getById, { id });

  // Loading state
  if (blog === undefined) {
    return (
      <BlogDetailContainer>
        <BackButton to="/blog">Back to Blog</BackButton>
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
          Loading blog post...
        </LoadingState>
      </BlogDetailContainer>
    );
  }

  // Error state (blog not found)
  if (blog === null) {
    return (
      <BlogDetailContainer>
        <BackButton to="/blog">Back to Blog</BackButton>
        <ErrorState>
          <h2>Blog post not found</h2>
          <p>The blog post you're looking for doesn't exist or may have been removed.</p>
          <button onClick={() => navigate('/blog')}>
            Return to Blog
          </button>
        </ErrorState>
      </BlogDetailContainer>
    );
  }

  // Don't show draft posts to public
  if (blog.status !== 'published') {
    return (
      <BlogDetailContainer>
        <BackButton to="/blog">Back to Blog</BackButton>
        <ErrorState>
          <h2>Blog post not available</h2>
          <p>This blog post is not currently published.</p>
          <button onClick={() => navigate('/blog')}>
            Return to Blog
          </button>
        </ErrorState>
      </BlogDetailContainer>
    );
  }

  return (
    <BlogDetailContainer>
      <BackButton to="/blog">Back to Blog</BackButton>
      
      <BlogHeader>
        {blog.imageUrl && (
          <BlogImage
            style={{ 
              backgroundImage: `url(${blog.imageUrl})`,
            }}
          />
        )}
        
        <BlogTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {blog.title}
        </BlogTitle>
        
        {blog.subtitle && (
          <BlogSubtitle>{blog.subtitle}</BlogSubtitle>
        )}
        
        <BlogMeta>
          <div>
            {new Date(blog.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
          {blog.author && <div>by {blog.author}</div>}
          <div>{Math.ceil(blog.content.split(' ').length / 200)} min read</div>
        </BlogMeta>
      </BlogHeader>

      <BlogContent
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <ReactMarkdown>{blog.content}</ReactMarkdown>
      </BlogContent>
    </BlogDetailContainer>
  );
}

export default BlogDetailPage;