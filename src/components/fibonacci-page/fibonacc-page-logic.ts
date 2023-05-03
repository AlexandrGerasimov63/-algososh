import { Dispatch, SetStateAction } from "react";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const sumNumberFibo = (str: string) => {
    const num = Number(str);
    const fibArr = ["1", "1"];
    for (let i = 2; i < num + 1; i++) {
      const prev1 = Number(fibArr[i - 1]);
      const prev2 = Number(fibArr[i - 2]);
      const res = prev1 + prev2;
      fibArr.push(String(res));
    }
    return fibArr;
  };
  
export const showNumberFibo = async (
    arr: string[],
    setInputResult: Dispatch<SetStateAction<string[]>>,
    setIsLoad: Dispatch<SetStateAction<boolean>>
  ) => {
    for (let i = 0; i <= arr.length - 1; i++) {
      setIsLoad(true);
      await delay(SHORT_DELAY_IN_MS);
      setInputResult(arr.slice(0, i + 1));
    }
    setIsLoad(false);
  };