const alertHandler = (setterFn: (s: string) => void, msg: string) => {
  setterFn(msg);
  setTimeout(() => {
    // Clear Error for 3 sec
    setterFn('');
  }, 3000);
};

export default alertHandler;
