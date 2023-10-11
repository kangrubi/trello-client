const storagePrefix = "ruby_";

export const storage = {
  setItem: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },

  getItem: () => {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}token`) as string
    );
  },

  removeItem: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
};
