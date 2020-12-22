import { extendObservable } from 'mobx';

class UserStore {

  constructor() {
    extendObservable(this, {
      isLoggedIn: false

    })
  }
}

export default new UserStore();