export function setStorage(key, data) {
    localStorage.setItem(key, data);
}

export function getStorage(key) {
    const data = localStorage.getItem(key);
    return data;
}

export function clearStorage(key) {
    const data = localStorage.removeItem(key);
    return data;
}
