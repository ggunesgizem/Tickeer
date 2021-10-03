export const secondToTime = (snd: number) => {
  var second_: string | number = Math.floor(snd % 60);
  if (second_ < 10) {
    second_ = '0' + second_;
  }
  if (Math.floor(snd / 60) < 10) {
    var a = '0' + Math.floor(snd / 60) + ':' + second_;
  } else {
    var a = Math.floor(snd / 60) + ':' + second_;
  }
  return a;
};

export const percentegaTime = (
  currentTime: number,
  fullTime: number,
  isForReverse?: boolean,
) => {
  const _time = (currentTime * 100) / fullTime;
  return isForReverse ? _time : 100 - _time;
};

export const reversePercantageTime = (
  currentTime: number,
  fullTime: number,
  isForReverse?: boolean,
) => {
  const _time = (currentTime * fullTime) / 100;
  return isForReverse ? _time : 100 - _time;
};
