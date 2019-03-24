export default class PubSub {
  constructor(){
    this.listeners = {};
  }
  publish(event, data) {
    const currentEventListeners = this.listeners[event];
    if (currentEventListeners) {
      currentEventListeners.forEach(listener => {
        listener(data);
      });
    } 
  }
  
  subscribe(event, callback) {
    if (typeof callback !== 'function') {
      throw Error('callback is not a function!');
    }
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }
}