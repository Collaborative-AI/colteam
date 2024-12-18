import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';
import { AuthProvider } from './components/AuthProvider.component';
import { IntlProvider } from "react-intl";
import { getCurrentLang, getCurrentMessages } from "./locales";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <IntlProvider locale={getCurrentLang()} messages={getCurrentMessages()}>
      <AuthProvider>
        <ConfigProvider
          theme={{
            "token": {
              "colorPrimary": "#ffde00",
              "colorInfo": "#ffde00",
              "colorTextBase": "#181818",
              "fontFamily": "PingFang SC, HarmonyOS_Medium, Helvetica Neue, Microsoft YaHei, sans-serif"
            }
          }}>
          <App />
        </ConfigProvider>
      </AuthProvider>
    </IntlProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
