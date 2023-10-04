const storagePrefix = "ruby_";

export const storage = {
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },

  getToken: () => {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}token`) as string
    );
  },

  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
};
