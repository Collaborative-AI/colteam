// 触底加载 hook
import { useEffect } from 'react';
import { throttle } from 'lodash';

const isTouchBottom = (handler) => {
  // 文档显示区域高度
  const showHeight = window.innerHeight;
  // 网页卷曲高度
  const scrollTopHeight = document.body.scrollTop || document.documentElement.scrollTop;
  // 所有内容高度
  const allHeight = document.body.scrollHeight;
  // (所有内容高度 = 文档显示区域高度 + 网页卷曲高度) 时即为触底
  console.log(123, showHeight + scrollTopHeight, allHeight)
  if (allHeight <= showHeight + scrollTopHeight) {
    handler();
  }
};

const useTouchBottom = (fn) => {
  const useFn = throttle(() => {
    if (typeof fn === 'function') {
      isTouchBottom(fn);
    };
  }, 500);

  useEffect(() => {
    window.addEventListener('scroll', useFn);
    return () => {
      window.removeEventListener('scroll', useFn);
    };
  }, []);
};

export default useTouchBottom;
