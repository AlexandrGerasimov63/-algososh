import { Dispatch, SetStateAction } from "react";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export type TArr = {
  value: number;
  color: ElementStates;
};

// Создаем массив случайных чисел
export const randomArr = (
  setSortArray: Dispatch<SetStateAction<TArr[]>>,
  sortArray: TArr[]
) => {
  const randomArr = [];
  const lenLimit = Math.floor(Math.random() * (17 - 3 + 1)) + 3;
  for (let i = 0; i <= lenLimit; i++) {
    randomArr.push({
      value: Math.floor(Math.random() * 100),
      color: ElementStates.Default,
    });
  }
  setSortArray((sortArray = randomArr));
};

// Сортировка выбором на повышение(возрастание)

export const sortingChoiseAscending = async (
  arr: TArr[],
  setSortArray: Dispatch<SetStateAction<TArr[]>>,
  setLoad: Dispatch<SetStateAction<boolean>>,
  setIdLoadAsc : Dispatch<SetStateAction<boolean>>
) => {
  setLoad(true);
  setIdLoadAsc(true);
  for (let i = 0; i < arr.length - 1; i++) {
    let tmp = arr[i].value;
    let jIndex = 0;
    arr[i].color = ElementStates.Changing;
    for (let j = i + 1; j < arr.length; j++) {
      arr[j].color = ElementStates.Changing;
      setSortArray([...arr]);
      await delay(SHORT_DELAY_IN_MS);
      if (arr[j].value <= tmp) {
        tmp = arr[j].value;
        jIndex = j;
      }
      arr[j].color = ElementStates.Default;
      setSortArray([...arr]);
    }
    if (tmp < arr[i].value) {
      arr[jIndex].value = arr[i].value;
      arr[i].value = tmp;
    }
    arr[i].color = ElementStates.Modified;

    setSortArray([...arr]);
  }
  arr[arr.length - 1].color = ElementStates.Modified;
  setSortArray([...arr]);
  setLoad(false);
  setIdLoadAsc(false);
};

// Сортировка выбором на понижение(убывание)

export const sortingChoiseDescending = async (
  arr: TArr[],
  setSortArray: Dispatch<SetStateAction<TArr[]>>,
  setLoad: Dispatch<SetStateAction<boolean>>,
  setIsLoadDir : Dispatch<SetStateAction<boolean>>
) => {
  setLoad(true);
  setIsLoadDir(true)
  for (let i = 0; i < arr.length - 1; i++) {
    let tmp = arr[i].value;
    let jIndex = 0;
    arr[i].color = ElementStates.Changing;
    for (let j = i + 1; j < arr.length; j++) {
      arr[j].color = ElementStates.Changing;
      setSortArray([...arr]);
      await delay(SHORT_DELAY_IN_MS);
      if (arr[j].value >= tmp) {
        tmp = arr[j].value;
        jIndex = j;
      }
      arr[j].color = ElementStates.Default;
      setSortArray([...arr]);
    }
    if (tmp > arr[i].value) {
      arr[jIndex].value = arr[i].value;
      arr[i].value = tmp;
    }
    arr[i].color = ElementStates.Modified;

    setSortArray([...arr]);
  }
  arr[arr.length - 1].color = ElementStates.Modified;
  setSortArray([...arr]);
  setLoad(false);
  setIsLoadDir(false)
};

// Сортировка пузырьком на повышение(возрастание)

export const sortingBubbleAscending = async (
  arr: TArr[],
  setSortArray: Dispatch<SetStateAction<TArr[]>>,
  setLoad: Dispatch<SetStateAction<boolean>>,
  setIdLoadAsc : Dispatch<SetStateAction<boolean>>
) => {
  setLoad(true);
  setIdLoadAsc(true);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].color = ElementStates.Changing;
      arr[j + 1].color = ElementStates.Changing;
      setSortArray([...arr]);
      await delay(SHORT_DELAY_IN_MS);
      if (arr[j].value > arr[j + 1].value) {
        const tmp = arr[j].value;
        arr[j].value = arr[j + 1].value;
        arr[j + 1].value = tmp;
      }
      arr[j].color = ElementStates.Default;
    }

    arr[arr.length - i - 1].color = ElementStates.Modified;
  }
  setLoad(false);
  setIdLoadAsc(false)
};

// Сортировка пузырьком на понижение(убывание)

export const sortingBubbleDescending = async (
  arr: TArr[],
  setSortArray: Dispatch<SetStateAction<TArr[]>>,
  setLoad: Dispatch<SetStateAction<boolean>>,
  setIsLoadDir : Dispatch<SetStateAction<boolean>>
) => {
  setLoad(true);
  setIsLoadDir(true)
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].color = ElementStates.Changing;
      arr[j + 1].color = ElementStates.Changing;
      setSortArray([...arr]);
      await delay(SHORT_DELAY_IN_MS);
      if (arr[j].value < arr[j + 1].value) {
        const tmp = arr[j].value;
        arr[j].value = arr[j + 1].value;
        arr[j + 1].value = tmp;
      }
      arr[j].color = ElementStates.Default;
    }

    arr[arr.length - i - 1].color = ElementStates.Modified;
  }
  setLoad(false);
  setIsLoadDir(false)
};