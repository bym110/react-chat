import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/App';
import * as serviceWorker from './serviceWorker';
import {ConfigProvider} from 'antd'
import zhCN from 'antd/es/locale/zh_CN';
import { Provider } from 'mobx-react';
import store from './store';

ReactDOM.render(

    <ConfigProvider locale={zhCN}>
            <Provider {...store}>
                <App />
            </Provider>
    </ConfigProvider>
,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
