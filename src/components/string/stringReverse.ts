import {Dispatch, SetStateAction} from "react";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";


export type TStringArr = {
    value: string;
    color: ElementStates;
  };
  
export const stringReverse = async (
    arr: TStringArr[],
    setLoad: Dispatch<SetStateAction<boolean>>,
    setResultArr: Dispatch<SetStateAction<TStringArr[]>>
  ) => {
    setLoad(true);
  
    let mid = Math.floor(arr.length / 2);
  
    for (let i = 0; i < mid; i++) {
      let len = arr.length - 1;
  
      if (i !== len - i) {
        arr[i].color = ElementStates.Changing;
        arr[len - i].color = ElementStates.Changing;
        setResultArr([...arr]);
        await delay(DELAY_IN_MS);
      }
      let tmp1 = arr[i];
      let tmp2 = arr[len - i];
      arr[i] = tmp2;
      arr[i].color = ElementStates.Modified;
      arr[len - i] = tmp1;
      arr[len - i].color = ElementStates.Modified;
    }
    arr[mid].color = ElementStates.Modified;
    setResultArr([...arr]);
  
    setLoad(false);
  };