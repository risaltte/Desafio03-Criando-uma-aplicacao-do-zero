import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import styles from './loadMorePosts.module.scss';
interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}
interface LoadMorePostsButtonProps {
  nextPage: string | null;
  onLoadMorePosts: (morePosts: Array<Post>, nextPage: string | null) => void;
}


export default function LoadMorePostsButton({ nextPage, onLoadMorePosts }: LoadMorePostsButtonProps) {

  async function handleLoadMorePosts() {
    if (!nextPage) {
     return;
    }

    const response = await fetch(nextPage);
    const posts = await response.json();

    const updatedNextPage = posts.next_page;

    const formattedPosts = posts.results.map(post => {
      return {
        uid: post.uid,
        first_publication_date: format(
          new Date(post.first_publication_date),
          'dd MMM yyyy',
          {
            locale: ptBR
          }
        ),
        data: {
          title: post.data.title,
          subtitle: post.data.subtitle,
          author: post.data.author
        }
      };
    });

    onLoadMorePosts(formattedPosts, updatedNextPage);
  }

  return nextPage ? (
    <button
      type="button"
      className={styles.loadMorePostsButton}
      onClick={handleLoadMorePosts}
    >
      Carregar mais posts
    </button>
  ) : (
    <></>
  );
}
