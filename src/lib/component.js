import { Store } from './store';
// base class for component
export default class Component {
  constructor(props) {
    if (props.store instanceof Store) {
      this.store = props.store.events.subscribe('stateChanged', (state) => this.render(state));
    }
    if (props.hasOwnProperty('element')) {
      this.element = PaymentResponse.element;
    }
  }
  render() {}
}