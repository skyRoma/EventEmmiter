class EventEmmiter {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, fn) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(fn);
    return () => {
      this.events[eventName] = this.events[eventName].filter(
        func => func !== fn
      );
    };
  }

  emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(fn => {
        fn.call(null, data);
      });
    } else {
      console.error("There is no subscribed function for this event.");
    }
  }
}

class Item {
  constructor(selector) {
    this.element = document.querySelector(selector);
    this.changeColor = this.changeColor.bind(this);
    this.changeBorderColor = this.changeBorderColor.bind(this);
  }

  changeColor(color) {
    this.element.style.backgroundColor = color;
  }

  changeBorderColor(color) {
    this.element.style.borderColor = color;
  }
}

window.onload = function() {
  let emmiter = new EventEmmiter();
  let colors = ["green", "red", "blue", "pink", "gray"];
  let changeColor = () => {
    emmiter.emit("changeColor", colors[Math.floor(Math.random() * 5)]);
  };
  let changeBorderColor = () => {
    emmiter.emit("changeBorderColor", colors[Math.floor(Math.random() * 5)]);
  };

  document
    .querySelector("button:nth-child(1)")
    .addEventListener("click", changeColor);
  document
    .querySelector("button:nth-child(2)")
    .addEventListener("click", changeBorderColor);

  let item1 = new Item("div:nth-child(1)");
  let item2 = new Item("div:nth-child(2)");

  emmiter.subscribe("changeColor", item1.changeColor);
  emmiter.subscribe("changeColor", item2.changeColor);

  emmiter.subscribe("changeBorderColor", item1.changeBorderColor);
  emmiter.subscribe("changeBorderColor", item2.changeBorderColor);
};
