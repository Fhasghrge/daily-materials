import React, { useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useObservable } from 'rxjs-hooks'
import { ServiceContext, useInject, useInjector } from './utils/serviceProvider'
import SearchService from './index.service'
import "antd/dist/antd.css";


const SearchInput = () => {
  const searchServie = useInject(SearchService);
  const res = useObservable(() => searchServie.result$, [])

  const handlePress = (e) => {
    searchServie.send(e.target.value)
  }
  return (
    <div>
      <Input prefix={<SearchOutlined /> } onPressEnter={handlePress}></Input>
      <ul>
        {res.map((item, index) => (
          <li key={index}>{item}</li>
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

