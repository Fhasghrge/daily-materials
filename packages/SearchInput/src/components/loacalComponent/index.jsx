import React, { useState } from "react";
import { Input } from "antd";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import { useEventCallback } from "rxjs-hooks";

import { from } from "rxjs";
import { debounceTime, filter, map, tap, switchAll } from "rxjs/operators";
import "antd/dist/antd.css";

const fackPromise = (msg) => {
  return fetch(
    "https://6084086d9b2bed001704096b.mockapi.io/search/searchNname"
  ).then((res) => res.json());
};

const LocalHandle = () => {
  const [loading, setLoading] = useState(false);

  // how can we understand useEventCallback, 订阅和取消
  const [handleClick, results] = useEventCallback((event$) => {
    return event$.pipe(
      filter((msg) => !!msg),
      tap(() => setLoading(true)),
      debounceTime(500),
      map((msg) => {
        return from(fackPromise(msg));
      }),
      tap(() => setLoading(false)),
      switchAll()
    );
  }, []);

  return (
    <div>
      <Input
        prefix={loading ? <LoadingOutlined /> : <SearchOutlined />}
        onChange={(e) => handleClick(e.target.value)}
      ></Input>
      <ul>
        {results.map((item, index) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};
export default LocalHandle;
