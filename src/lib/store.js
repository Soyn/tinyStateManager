import PubSub from './pubSub';
import { isPlainObject } from './utils';

const Status = {
  Resting: 'Resting',
  Mutating: 'Mutating',
};
export class Store {
  constructor(params) {
    this.events = new PubSub();
    if (params.hasOwnProperty('mutations')) {
      this.mutations = params.mutations;
    }
    this.status = Status.Resting;
    this.state = new Proxy(params.state || {}, {
      set: (state, key, value) => {
        this.state[key] = value;
        this.events.publish('stateChanged', this.state);
        if (this.status !== Status.Mutating) {
          console.warn('You Should Mutate Your State By Action!');
        }
        this.status = Status.Resting;
      }
    });
  }
  commit(mutationType, payload) {
    this.status = Status.Mutating;
    if (typeof this.mutations[mutationType] === 'function') {
      this.mutations[mutationType](this.state, payload);
      this.state = Object.assign({}, this.state);
    }
  }
  dispatch(actionType, payload){
    if (isPlainObject(payload)) {
      throw Error('Payload Must Be A Plain Object!');
    }
    if (this.status === Status.Mutating) {
      throw Error('Can Not Dispatch Action In Mutation Function!');
    }
    this.commit(actionType, payload);
  }
  getState() {
    return this.state;
  }
}
export function createStore(params) { 
  return new Store(params || {});
}