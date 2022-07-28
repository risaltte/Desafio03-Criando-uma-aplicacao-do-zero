import { predicate } from '@prismicio/client';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  uid?: string | null;
  first_publication_date: string | null;
  data: {
    author: string;
    banner: {
      url: string;
    };
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
    subtitle: string;
    title: string;
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }:PostProps): JSX.Element {
  const totalWords = post.data.content.reduce((total, contentItem) => {
    total += contentItem.heading.split(' ').length;

    const words = contentItem.body.map(item => item.text.split(' ').length);
    words.map(word => (total += word));

    return total;
  }, 0);

  const readTime = Math.ceil(totalWords / 200);

  const router = useRouter();

  if (router.isFallback) {
    return (
      <h1>Carregando...</h1>
    );
  }

  const formattedDate = format(
    new Date(post.first_publication_date),
    'dd MMM yyyy',
    {
      locale: ptBR
    },
  );

  return (
    <>
      <Head>
        <title>{post.data.title} | Spacetraveling </title>
      </Head>

      <Header />

      <main>
        <div className={styles.banner}>
          <img src={post.data.banner.url} alt="" />
        </div>

        <div className={styles.container}>
          <div className={styles.postTitle}>
            <h1>{post.data.title}</h1>
            <div>
              <div><FiCalendar /><span>{formattedDate}</span>
              </div>
              <div><FiUser /><span>{post.data.author}</span></div>
              <div><FiClock /><span>{`${readTime} min`}</span></div>
            </div>
          </div>

          {post.data.content.map(content => {
            return (
              <section className={styles.postContent} key={content.heading}>
                <h2>{content.heading}</h2>
                <div
                  className={styles.postContent}
                  dangerouslySetInnerHTML={{
                    __html: RichText.asHtml(content.body)
                  }}
                />
              </section>
            );
          })}

        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const posts = await prismic.getByType('post', {
    predicates: [
      predicate.at('document.type', 'post')
    ]
  });

  const paths = posts.results.map(post => {
    return {
      params: {
        slug: post.uid
      }
    };
  });

  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('post', String(slug), {});

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      author: response.data.author,
      banner: {
        url: response.data.banner.url,
      },
      content: response.data.content.map(content => {
        return {
          heading: content.heading,
          body: [...content.body]
        }
      }),
      subtitle: response.data.subtitle,
      title: response.data.title,
    },
  }

  return {
    props: {
      post
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
};
