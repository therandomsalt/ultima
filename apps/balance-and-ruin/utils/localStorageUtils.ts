export function writeSetting(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function readSetting(key: string): any {
  return localStorage.getItem(key);
}
