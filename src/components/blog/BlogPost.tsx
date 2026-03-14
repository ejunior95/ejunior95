import { useParams, Link } from 'react-router-dom'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Giscus from '@giscus/react'
import { Calendar, ArrowLeft, Tag } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import { translations } from '../../i18n/translations'
import { getPostBySlug } from '../../utils/blogLoader'
import BlogLayout from './BlogLayout'
import './BlogPost.css'

function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const { language } = useLanguage()
  const t = translations[language].blog
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return (
      <BlogLayout>
        <div className="blog-not-found">
          <span className="code-comment">{'// 404 — '}{t.notFound}</span>
          <Link to="/blog" className="blog-back-link">
            <ArrowLeft size={16} />
            {t.backToBlog}
          </Link>
        </div>
      </BlogLayout>
    )
  }

  return (
    <BlogLayout>
      <article className="blog-article">
        <Link to="/blog" className="blog-back-link">
          <ArrowLeft size={16} />
          {t.backToBlog}
        </Link>

        <header className="blog-article-header">
          <h1 className="blog-article-title">
            {language === 'pt' ? post.title : post.titleEn}
          </h1>
          <div className="blog-article-meta">
            <span className="blog-article-date">
              <Calendar size={22} />
              {new Date(post.date).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </span>
            <div className="blog-article-tags">
              <span> | </span>
              <Tag size={18} color='#09ec42' />
              {post.tags.map(tag => (
                <span key={tag} className="blog-tag">{tag}</span>
              ))}
            </div>
          </div>
        </header>

        <div className="blog-article-content">
          <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
        </div>

        <section className="blog-comments">
          <h3 className="blog-comments-title">
            <span className="code-comment">{'// '}{t.comments}</span>
          </h3>
          <Giscus
            repo="ejunior95/ejunior95"
            repoId="MDEwOlJlcG9zaXRvcnkzNTg3NTA1NzE="
            category="Announcements"
            categoryId="DIC_kwDOFWIZa84C4RqA"
            mapping="pathname"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme="dark"
            lang={language === 'pt' ? 'pt' : 'en'}
            loading="lazy"
          />
        </section>
      </article>
    </BlogLayout>
  )
}

export default BlogPost
