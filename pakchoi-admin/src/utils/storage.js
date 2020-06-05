export const setStorage = function (key, data, hours = 48) {
  const expire = new Date().getTime() / 1e3 + hours * 3600;
  const storageData = JSON.stringify({
    data,
    expire
  });
  window.localStorage.setItem(key, storageData);
};


export const getStorage = function (key) {
  let storage = null;
  try {
    storage = JSON.parse(window.localStorage.getItem(key));
  } catch (error) {
    console.log(error);
  }
  if (!storage) return storage;
  const time = new Date().getTime() / 1e3;
  if (storage.expire > time) {
    return storage.data;
  }
  return removeStorage(key);
};

export const removeStorage = function (key) {
  window.localStorage.removeItem(key);
  return null;
};
