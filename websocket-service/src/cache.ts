export const cache = new Map();

cache.set("1", "11"); // userId - Socket Id
cache.set("2", "12");
cache.set("3", "13");
cache.set("4", "14");

export const getUserIdBySocketId = (socketId: string): string => {
  let userId = "";
  cache.forEach((val, key) => {
    if (socketId === key) {
      userId = val;
    }
  });
  return userId;
};
