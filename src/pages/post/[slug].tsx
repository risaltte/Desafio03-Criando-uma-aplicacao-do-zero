import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post() {
  return (
    <>
      <Head>
        <title>Spacetraveling - Post</title>
      </Head>

      <main>
        <div className={styles.banner}>
          <img src="/images/banner.png" alt="" />
        </div>

        <div className={styles.container}>
          <div className={styles.postTitle}>
            <h1>Criando um App React Native do Zero</h1>
            <div>
              <div><FiCalendar /><span>15 Mar</span></div>
              <div><FiUser /><span>Risaltte</span></div>
              <div><FiClock /><span>4 min</span></div>
            </div>
          </div>

          <section className={styles.postContent}>
            <h2>Proin et varius</h2>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Nullam dolor sapien, vulputate eu diam at, condimentum hendrerit tellus. Nam facilisis sodales felis, pharetra pharetra lectus auctor sed.</p>
            <p>Ut venenatis mauris vel libero pretium, et pretium ligula faucibus. Morbi nibh felis, elementum a posuere et, vulputate et erat. Nam venenatis.</p>
          </section>

          <section className={styles.postContent}>
            <h2>Proin et varius</h2>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Nullam dolor sapien, vulputate eu diam at, condimentum hendrerit tellus. Nam facilisis sodales felis, pharetra pharetra lectus auctor sed.</p>
            <p>Ut venenatis mauris vel libero pretium, et pretium ligula faucibus. Morbi nibh felis, elementum a posuere et, vulputate et erat. Nam venenatis.</p>
          </section>

          <section className={styles.postContent}>
            <h2>Proin et varius</h2>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Nullam dolor sapien, vulputate eu diam at, condimentum hendrerit tellus. Nam facilisis sodales felis, pharetra pharetra lectus auctor sed.</p>
            <p>Ut venenatis mauris vel libero pretium, et pretium ligula faucibus. Morbi nibh felis, elementum a posuere et, vulputate et erat. Nam venenatis.</p>
          </section>
        </div>
      </main>


    </>
  );
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient({});
//   const posts = await prismic.getByType(TODO);

//   // TODO
// };

// export const getStaticProps = async ({params }) => {
//   const prismic = getPrismicClient({});
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
