const state = null;

function useState(initState) {
  state = state || initState;
  function setState(newVal) {
    state = newVal;
    render();
  }
  return [state, setState];
}

const hooks = [];
let cursor = 0;

function useState2(initState) {
  const state = (hooks[cursor] = hooks[cursor] || initState);
  function setState(newVal) {
    state = newVal;
    render();
  }
  return [hooks[cursor++], setState];
}
