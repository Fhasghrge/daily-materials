/***
 * 采用Angular这种视图和逻辑分离的方法
 * 把 service 分开使用
 */
import { BehaviorSubject, from } from "rxjs";
import {
  filter,
  debounceTime,
  tap,
  map,
  switchAll,
} from "rxjs/operators";

// you can use rxjs/ajax too
const fackPromise = (msg) => {
  return fetch(
    "https://6084086d9b2bed001704096b.mockapi.io/search/searchNname"
  ).then((res) => res.json());
};

class SearchService {
  resultSource$ = new BehaviorSubject();
  loadingSource$ = new BehaviorSubject(false)
  loading$ = this.loadingSource$.asObservable();
  // 这种逻辑和视图分离如何， 如何同步loading状态？
  result$ = this.resultSource$.pipe(
    filter((msg) => !!msg),
    tap(() => this.loadingSource$.next(true)),
    debounceTime(500),
    map((msg) => {
      return from(fackPromise(msg));
    }),
    switchAll(),
    tap(() => this.loadingSource$.next(false)),
  );

  send(msg) {
    this.resultSource$.next(msg);
  }
}
export default SearchService;
