const tokenKey = "token";
const userKey = "user";
const cartKey = "cart";

export function getCart() {
  const cart = localStorage.getItem(cartKey);

  if (cart === null) {
    return [];
  }

  return JSON.parse(cart);
}

export function saveCart(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

export function removeCart() {
  localStorage.removeItem(cartKey);
}

export function saveToken(token) {
  saveToStorage(tokenKey, token);
}

export function getToken() {
  return getFromStorage(tokenKey);
}

export function saveUser(user) {
  saveToStorage(userKey, user);
}

export function getUser() {
  const user = getFromStorage(userKey);

  if (user) {
    return user.email;
  }

  return null;
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
  const value = localStorage.getItem(key);

  if (!value) {
    return [];
  }

  return JSON.parse(value);
}
