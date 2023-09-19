const storagePrefix = "ruby_";

export const storage = {
  getToken: () => {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}token`) as string
    ) as { accessToken: string; refreshToken: string };
  },
  setToken: ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) => {
    window.localStorage.setItem(
      `${storagePrefix}token`,
      JSON.stringify({
        accessToken,
        refreshToken,
      })
    );
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
};
