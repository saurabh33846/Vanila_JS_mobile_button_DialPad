let keyMap = [
  {
    1: [",", ".", ";"]
  },
  {
    2: ["a", "b", "c"]
  },
  {
    3: ["d", "e", "f"]
  },
  {
    4: ["g", "h", "i"]
  },
  {
    5: ["j", "k", "l"]
  },
  {
    6: ["m", "n", "o"]
  },
  {
    7: ["p", "q", "r", "s"]
  },
  {
    8: ["t", "u", "v"]
  },
  {
    9: ["w", "x", "y", "z"]
  }
];
let timer = null;
let prevKeyPress = "";
let curCount = -1;
function appendValue(inputEl, value) {
  inputEl.value = inputEl.value + value;
  prevKeyPress = value;
  setClearTimeout();
}
function setClearTimeout() {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    timer = null;
  }, 2000);
}
function replaceValue(inputElem, replacemetKey) {
  let length = inputElem.value.length;
  inputElem.value = inputElem.value.slice(0, length - 1) + replacemetKey;
  setClearTimeout();
}
function handleButtonClick(event, inputElem) {
  let targetButton = event.target;
  console.log(timer);
  let buttonId = targetButton.getAttribute("data-id");
  if (prevKeyPress !== String(buttonId) || !timer) {
    curCount = 0;
    return appendValue(inputElem, String(buttonId));
  }
  let curKeyMap = keyMap.find((map) => {
    return Object.keys(map)[0] === buttonId;
  });
  console.log(curKeyMap);

  if (!(curKeyMap && curKeyMap[buttonId])) {
    alert("Nod key found");
  }
  let keyValues = curKeyMap[buttonId];

  let replacemetKey;
  if (curCount === keyValues.length) {
    replacemetKey = buttonId;
    curCount = 0;
  } else {
    replacemetKey = keyValues[curCount];
    curCount++;
  }
  replaceValue(inputElem, replacemetKey);
}

function renderKeys(htmlWrapper) {
  for (const keyMap of keyMap) {
    let button = document.createElement("button");
    let displayVal = Object.keys(keyMap)[0];
    button.innerHTML = `${displayVal}`;
    button.classList.add("button-class");
    button.setAttribute("data-id", displayVal);
    htmlWrapper.appendChild(button);
  }
}
const createDialPad = (htmlWrapper) => {
  let dialPadKeys = document.createElement("div");
  let inputElem = document.createElement("input");
  inputElem.classList.add("dialpad-input");
  htmlWrapper.appendChild(inputElem);
  dialPadKeys.classList.add("keys-container");
  dialPadKeys.onclick = (event) => {
    handleButtonClick(event, inputElem);
  };
  htmlWrapper.appendChild(dialPadKeys);
  renderKeys(dialPadKeys);
};

export default createDialPad;
