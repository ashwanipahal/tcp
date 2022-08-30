const onDoubleTap = callback => {
  let touchCount = 0;
  return () => {
    touchCount += 1;

    setTimeout(() => {
      touchCount = 0;
    }, 500);

    if (touchCount >= 2) {
      touchCount = 0;

      callback();
    }
  };
};

export default onDoubleTap;
