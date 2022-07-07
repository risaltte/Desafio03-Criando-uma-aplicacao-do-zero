import styles from './loadMorePosts.module.scss';

export default function LoadMorePostsButton() {

  const nextPage = null;

  function handleLoadMorePosts() {
    alert('Carregar mais posts');
  }

  return nextPage ?  (
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
