import { createStore, Component } from '../lib';
const actionTypes = {
  Increase: 'Increase',
  Decrease: 'Decrease',
  Reset: 'Reset',
};

const mutations = {
  [actionTypes.Increase]: function (state) {
    state.count += 1;
  },
  [actionTypes.Decrease]: function (state) {
    state.count -= 1;
  },
  [actionTypes.Reset]: function (state) {
    state.count = 0;
  }
};

const store = createStore({
  mutations,
  state: {
    count: 0,
  },
});

const createButton = (props) => {
  const { className, content, id } = props;
  const btn = document.createElement('button');
  btn.classList.add(className);
  btn.innerHTML = content;
  if (id) {
    btn.id = id;
  }
  return btn;
}
class CounterBoard extends Component {
  constructor(props) {
    super({
      store: props.store,
      element: props.element,
    });
    this.state = store.getState();
    this.score = document.createElement('div');
    this.score.id = 'score';

    this.element.appendChild(this.score);
    this.increateButton = createButton({
      className: 'inc',
      content: '+',
    });
    this.decreaseButton = createButton({
      className: 'dec',
      content: '-',
    });
    this.resetButton = createButton({
      className: 'reset',
      content: 'Reset',
    });
    this.increateButton.addEventListener('click', () => {
      this.store.dispatch(actionTypes.Increase);
    });
    this.decreaseButton.addEventListener('click', () => {
      this.store.dispatch(actionTypes.Decrease);
    });
    this.resetButton.addEventListener('click', () => {
      this.store.dispatch(actionTypes.Reset);
    })
    this.element.appendChild(this.increateButton);
    this.element.appendChild(this.decreaseButton);
    this.element.appendChild(this.resetButton);
  }
  render() {
    this.score.innerHTML = `<span>${this.state.count}</span>`;
  }
}

const app = new CounterBoard({
  store,
  element: document.getElementById('root'),
});

app.render();