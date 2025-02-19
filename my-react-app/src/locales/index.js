import zh from './zh';
import en from './en';

import { createIntl, createIntlCache } from 'react-intl';

const _currentLang = 'zh-CN';
const messages = {
  'zh-CN': zh,
  'en-US': en,
};
export const getCurrentLang = () => _currentLang;
export const getCurrentMessages = () => messages[_currentLang];

const cache = createIntlCache();
const intl = createIntl(
  {
    locale: _currentLang,
    messages: getCurrentMessages(),
  },
  cache
);

export default intl;
