import { createStore, Component } from '../lib';
const actionTypes = {
  Increase: 'Increase',
  Decrease: 'Decrease',
  [actionTypes.Reset]: 'Reset',
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
});

class CounterBoard extends Component {
  constructor(props) {
    super({
      store: props.store,
      element: props.element,
    });
    this.state = store.getState();
  }
  render() {
    const score = document.createElement('div');
    score.innerHtml = this.state.count || 0;
    score.id = 'score';
    this.element.appendChild(score);
    const createButton = (props) => {
      const { class, content, id } = props;
      btn.innerHtml = `<button class=${class} id=${id}>${content}</button>`;
      return btn;
    }

    const increateButton = createButton({
      class: 'inc',
      content: '+',
    });
    const decreaseButton = createButton({
      class: 'dec',
      content: '-',
    });
    this.element.appendChild([increateButton, decreaseButton])
  }
}

