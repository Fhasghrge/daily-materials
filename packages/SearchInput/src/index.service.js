/***
 * 采用Angular这种视图和逻辑分离的方法
 * 把 service 分开使用
 */
import { BehaviorSubject, from } from 'rxjs'
import { filter, scan, debounceTime, tap, map, switchAll } from 'rxjs/operators'

const fackPromise = (msg) => {
  return fetch('https://6084086d9b2bed001704096b.mockapi.io/search/searchNname').then(res => res.json())
}

class SearchService {
  resultSource$ = new BehaviorSubject();

  result$ = this.resultSource$.pipe(
    debounceTime(500),
    filter(msg => !!msg),
    tap((msg) => console.log(msg)),
    map(msg => {
      return from(
        fackPromise(msg)
      )
    }),
    switchAll(),
  )
  send(msg) {
    this.resultSource$.next(msg)
  }
}
export default SearchService;