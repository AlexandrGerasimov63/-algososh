import { Dispatch, SetStateAction } from "react";
import { Stack } from "./stack-page-class";
import { delay } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export type TItem = {
  value: string;
  color: ElementStates;
};



export const addItem = async (
  setAddLoad: Dispatch<SetStateAction<boolean>>,
  inputState: string,
  setStackArr: Dispatch<SetStateAction<TItem[]>>,
  setInputState: Dispatch<SetStateAction<string>>,
  stack:Stack<TItem>
) => {
  setAddLoad(true);
  stack.push({ value: inputState, color: ElementStates.Changing });
  setStackArr([...stack.elements()]);
  setInputState("");
  await delay(SHORT_DELAY_IN_MS);
  stack.lastItem.color = ElementStates.Default;
  setStackArr([...stack.elements()]);
  setAddLoad(false);
};

export const deleteItem = async (
  setRemoveLoad: Dispatch<SetStateAction<boolean>>,
  setStackArr: Dispatch<SetStateAction<TItem[]>>,
  stack:Stack<TItem>
) => {
  setRemoveLoad(true);
  stack.lastItem.color = ElementStates.Changing;
  setStackArr([...stack.elements()]);
  await delay(SHORT_DELAY_IN_MS);
  stack.pop();
  setStackArr([...stack.elements()]);
  setRemoveLoad(false);
};

export const clearArr = (setStackArr: Dispatch<SetStateAction<TItem[]>>,
  stack:Stack<TItem>) => {
  stack.clear();
  setStackArr([...stack.elements()]);
};

export const takeTop = (index: number, arr: TItem[]): string | null => {
  if (index === arr.length - 1) {
    return "top";
  } else {
    return null;
  }
};
