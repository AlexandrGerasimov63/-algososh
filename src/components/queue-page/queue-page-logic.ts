import { Dispatch, SetStateAction } from "react";
import { delay } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Queue } from "./queue-page-class";

export class TItem {
  value!: string;
  color!: ElementStates;
}

export const addItem = async (
  setAddLoad: Dispatch<SetStateAction<boolean>>,
  queue: Queue<string>,
  inputState: string,
  setQueueArr: Dispatch<SetStateAction<TItem[]>>,
  setInputState: Dispatch<SetStateAction<string>>,
  
) => {
  setAddLoad(true);
  queue.push({ value: inputState, color: ElementStates.Changing });
  setQueueArr([...queue.arr]);
  
  setInputState("");
  await delay(SHORT_DELAY_IN_MS);
  queue.getLastItem().color = ElementStates.Default;
  setQueueArr([...queue.arr]);
  setAddLoad(false);
};

export const deleteItem = async (
  setRemoveLoad: Dispatch<SetStateAction<boolean>>,
  queue: Queue<string>,
  setQueueArr: Dispatch<SetStateAction<TItem[]>>
) => {
  setRemoveLoad(true);
  queue.getFirstItem().color = ElementStates.Changing;
  setQueueArr([...queue.arr]);
  await delay(SHORT_DELAY_IN_MS);
  queue.getFirstItem().color = ElementStates.Default;
  queue.pop();
  setQueueArr([...queue.arr]);
  setRemoveLoad(false);
};

export const clearArr = (
  queue: Queue<string>,
  setQueueArr: Dispatch<SetStateAction<TItem[]>>
) => {
  queue.clearArr();
  setQueueArr(queue.elements());
};
