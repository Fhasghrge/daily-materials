import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useObservable, useEventCallback } from 'rxjs-hooks'
import { debounceTime, filter, mapTo, scan } from 'rxjs/operators'

import { ServiceContext, useInject, useInjector } from './utils/serviceProvider'
import SearchService from './index.service'
import "antd/dist/antd.css";


const SearchInput = () => {
  const searchServie = useInject(SearchService);
  const res = useObservable(() => searchServie.result$, [])

  const handlePress = (e) => {
    searchServie.send(e.target.value)
    handleClick(e.target.value)
  }
  const [handleClick, results] = useEventCallback(event$ => {
    return event$.pipe(
      debounceTime(500),
      filter(msg => !!msg),
      mapTo('test'),
      scan((pre, curr) => [...pre, curr], [])
    )
  }, [])
  
  useEffect(() => {
    console.log(results)
  }, [results])
  return (
    <div>
      <Input prefix={<SearchOutlined /> } onChange={handlePress}></Input>
      <ul>
        {res.map((item, index) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <ul>
        {results.map((item, index) => (
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

