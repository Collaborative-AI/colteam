// src/components/LoadMore/index.jsx
// 加载更多组件
import styles from './index.css';

/**
 * @param  status  状态 loadmore | loading | nomore
 * @param  hidden  是否隐藏
 */
const LoadMore = ({ status = 'loadmore', hidden = false }) => {
  return (
    <div className={styles.loadmore} hidden={hidden}>
      {status === 'loadmore' && <div>下拉加载</div>}
      {status === 'loading' && <div>加载中...</div>}
      {status === 'nomore' && <div>已加载全部内容</div>}
    </div>
  );
};

export default LoadMore;