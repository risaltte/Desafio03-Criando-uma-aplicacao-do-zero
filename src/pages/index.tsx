import { GetStaticProps } from 'next';
import { getPrismicClient } from '../services/prismic';
import Link from 'next/link';
import LoadMorePostsButton from '../components/LoadMorePostsButton';

import { FiCalendar } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

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
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <Link href="/">
          <a>
            <strong>Como utilizar Hooks</strong>
            <p>Pensando em sincronização em vez de ciclos de vida.</p>
            <div>
              <div><FiCalendar /><span>19 Abr 2021</span></div>
              <div><FiUser /><span>Danilo Vieira</span></div>
            </div>
          </a>
        </Link>

        <Link href="/">
          <a>
            <strong>Criando um app CRA do zero</strong>
            <p>Tudo sobre como criar a sua primeira aplicação utilizando Create React App.</p>
            <div>
              <div><FiCalendar /><span>15 Mai 2021</span></div>
              <div><FiUser /><span>Maria Aparecida</span></div>
            </div>
          </a>
        </Link>

        <Link href="/">
          <a>
            <strong>Como utilizar CotextAPI</strong>
            <p>Tudo sobre como ultilizar a ContextAPI do React.</p>
            <div>
              <div><FiCalendar /><span>05 Jun 2021</span></div>
              <div><FiUser /><span>Danilo Vieira</span></div>
            </div>
          </a>
        </Link>

        <LoadMorePostsButton />
      </div>

    </main>
  );
}

export const getStaticProps = async () => {
  // const prismic = getPrismicClient({});
  // const postsResponse = await prismic.getByType(TODO);

  // TODO

  return {
    props: {

    }
  }
};
