import React from "react";
import { Input } from "antd";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import { useObservable } from 'rxjs-hooks'

import { ServiceContext, useInject, useInjector } from '../../utils/serviceProvider'
import SearchService from './index.service'
import "antd/dist/antd.css";


const SearchInput = () => {
  const searchServie = useInject(SearchService);
  // useObservable 可以手写 https://codesandbox.io/s/step-4-rxjs-with-react-pt-1-1gcbf?from-embed=&file=/src/index.js
  const loading = useObservable(() => searchServie.loading$, false)
  const res = useObservable(() => searchServie.result$, [])

  return (
    <div>
      <Input prefix={loading ? <LoadingOutlined /> : <SearchOutlined />} onChange={e => searchServie.send(e.target.value)}></Input>
      <ul>
        {res.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};


const WarpProvider = () => {
  const injector = useInjector([SearchService])
  return (
    <ServiceContext.Provider value={injector}>
      <SearchInput/>
    </ServiceContext.Provider>
  )
}

export default WarpProvider;

