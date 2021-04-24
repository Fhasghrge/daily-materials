import React from "react";
import { Input, Skeleton } from "antd";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import { useObservable } from "rxjs-hooks";
import "antd/dist/antd.css";

import {
  ServiceContext,
  useInject,
  useInjector,
} from "../../utils/serviceProvider";
import SearchService from "./index.service";
import '../index.css'

const SearchInput = () => {
  const searchServie = useInject(SearchService);
  // useObservable 可以手写 https://codesandbox.io/s/step-4-rxjs-with-react-pt-1-1gcbf?from-embed=&file=/src/index.js
  const loading = useObservable(() => searchServie.loading$, false);
  const res = useObservable(() => searchServie.result$, []);

  return (
    <div>
      <Input
        prefix={loading ? <LoadingOutlined /> : <SearchOutlined />}
        onChange={(e) => searchServie.send(e.target.value)}
      ></Input>
      <Skeleton active loading={loading}>
        <ul>
          {res.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </Skeleton>
    </div>
  );
};

const WarpProvider = () => {
  const injector = useInjector([SearchService]);
  return (
    <ServiceContext.Provider value={injector}>
      <SearchInput />
    </ServiceContext.Provider>
  );
};

export default WarpProvider;
