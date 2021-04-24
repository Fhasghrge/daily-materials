import { BehaviorSubject } from 'rxjs'
import { filter, scan } from 'rxjs/operators'

class SearchService {
  resultSource$ = new BehaviorSubject();
  result$ = this.resultSource$.pipe(
    filter(msg => !!msg),
    scan((pre, curr) => [...pre, curr], [])
  )
  send(msg) {
    this.resultSource$.next(msg)
  }
}
export default SearchService;