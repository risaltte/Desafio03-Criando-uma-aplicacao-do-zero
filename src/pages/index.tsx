import { GetStaticProps } from 'next';
import { getPrismicClient } from '../services/prismic';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Link from 'next/link';
import LoadMorePostsButton from '../components/LoadMorePostsButton';

import { FiCalendar } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { useState } from 'react';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  const { results, next_page } = postsPagination;

  const formattedPosts = results.map(post => {
    return {
      ...post,
      first_publication_date: format(
        new Date(post.first_publication_date),
        'dd MMM yyyy',
        {
          locale: ptBR
        }
      )
    }
  });

  const [posts, setPosts] = useState<Post[]>(formattedPosts);
  const [ nextPage, setNextPage ] = useState(next_page);

  function onLoadMorePosts(morePosts: Array<Post>, nextPage: string | null) {
    setPosts([
      ...posts,
      ...morePosts
    ]);

    setNextPage(nextPage);
  }

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        {
          posts.map(post => (
            <Link key={post.uid} href={`/post/${post.uid}`}>
              <a>
                <strong>{post.data.title}</strong>
                <p>{post.data.subtitle}</p>
                <div>
                  <div><FiCalendar /><span>{post.first_publication_date}</span></div>
                  <div><FiUser /><span>{post.data.author}</span></div>
                </div>
              </a>
            </Link>
          ))
        }

        <LoadMorePostsButton nextPage={nextPage} onLoadMorePosts={onLoadMorePosts}/>
      </div>

    </main>
  );
}

export const getStaticProps:GetStaticProps = async () => {
  const prismic = getPrismicClient({});

  const postsResponse = await prismic.getByType('post', {
    lang: 'pt-BR',
    fetch: ['post.title', 'post.subtitle', 'post.author'],
    pageSize: 1
  });

  const posts = postsResponse.results.map(post => {
    return {
      slug: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author
      }
    }
  });

  const next_page = postsResponse.next_page;

  return {
    props: {
      postsPagination: {
        next_page,
        results: posts
      }
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
};
