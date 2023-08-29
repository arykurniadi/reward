export const getLocalStorage = (name, isObject = false) => {
  let data = localStorage.getItem(name);

  if (isObject) data = JSON.parse(data);

  return data;
};

export const setLocalStorage = (name, value) => {
  localStorage.setItem(name, value);

  return;
};
