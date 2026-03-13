import { Link } from 'react-router-dom'
import { Calendar, Tag } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import { translations } from '../../i18n/translations'
import { getAllPosts } from '../../utils/blogLoader'
import BlogLayout from './BlogLayout'
import './BlogList.css'

function BlogList() {
  const { language } = useLanguage()
  const t = translations[language].blog
  const posts = getAllPosts()

  return (
    <BlogLayout>
      <div className="blog-list">
        <h1 className="blog-list-title">
          <span className="code-comment">{'// '}</span>{t.title}
        </h1>

        {posts.length === 0 ? (
          <p className="blog-empty">
            <span className="code-comment">{'// '}{t.noPosts}</span>
          </p>
        ) : (
          <div className="blog-posts">
            {posts.map(post => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="blog-post-card">
                <h2 className="blog-post-title">
                  {language === 'pt' ? post.title : post.titleEn}
                </h2>
                <div className="blog-post-meta">
                  <span className="blog-post-date">
                    <Calendar size={12} />
                    {new Date(post.date).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </span>
                </div>
                <p className="blog-post-summary">
                  {language === 'pt' ? post.summary : post.summaryEn}
                </p>
                <div className="blog-post-tags">
                  <Tag size={10} />
                  {post.tags.map(tag => (
                    <span key={tag} className="blog-tag">{tag}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </BlogLayout>
  )
}

export default BlogList
