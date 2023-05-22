import { ElementStates } from "../../types/element-states";
import {
  sortingBubbleAscending,
  sortingBubbleDescending,
  sortingChoiseAscending,
  sortingChoiseDescending,
} from "./sorting-page-logic";


const setSortArray = jest.fn()
const setLoad = jest.fn()
const setIdLoadAsc = jest.fn()
const setIsLoadDir = jest.fn()

const arrWithOneChar = [{ value: 1, color: ElementStates.Default }];

const initialArr = [
  { value: 7, color: ElementStates.Default },
  { value: 3, color: ElementStates.Default },
  { value: 9, color: ElementStates.Default },
  { value: 16, color: ElementStates.Default },
];

const referenceArrAscending = [
  { value: 3, color: ElementStates.Modified },
  { value: 7, color: ElementStates.Modified },
  { value: 9, color: ElementStates.Modified },
  { value: 16, color: ElementStates.Modified },
];

const referenceArrDescending = [
  { value: 16, color: ElementStates.Modified },
  { value: 9, color: ElementStates.Modified },
  { value: 7, color: ElementStates.Modified },
  { value: 3, color: ElementStates.Modified },
];

describe("Тестирование сортировки", () => {
  it("Пустой массив выбором на повышение", async () => {
    await sortingChoiseAscending([],setSortArray,setLoad,setIdLoadAsc);
    expect(setSortArray).toHaveBeenCalledTimes(0);
  });
  it("Пустой массив выбором на понижение", async () => {
    await sortingChoiseDescending([],setSortArray,setLoad,setIsLoadDir);
    expect(setSortArray).toHaveBeenCalledTimes(0);
  });
  it("Пустой массив пузырьком на повышение", async () => {
    await sortingBubbleAscending([],setSortArray,setLoad,setIdLoadAsc);
    expect(setSortArray).toHaveBeenCalledTimes(0);
  });
  it("Пустой массив пузырьком на понижение", async () => {
    await sortingBubbleDescending([],setSortArray,setLoad,setIsLoadDir);
    expect(setSortArray).toHaveBeenCalledTimes(0);
  });

  it("Сортировка выбором на повышение с одним эл-том", async () => {
    await sortingChoiseAscending(arrWithOneChar,setSortArray, setLoad, setIdLoadAsc);
    expect(setSortArray).toHaveBeenCalledTimes(0);
  });

  it("Сортировка выбором на понижение с одним эл-том", async () => {
    await sortingChoiseDescending(arrWithOneChar,setSortArray,setLoad,setIsLoadDir );
    expect(setSortArray).toHaveBeenCalledTimes(0);
  });

  it("Сортировка пузырьком на понижение", async () => {
    await sortingBubbleDescending(arrWithOneChar,setSortArray, setLoad, setIsLoadDir);
    expect(setSortArray).toHaveBeenCalledTimes(0);
  });

  it("Сортировка пузырьком на повышение", async () => {
    await sortingBubbleAscending(arrWithOneChar, setSortArray, setLoad, setIdLoadAsc);
    expect(setSortArray).toHaveBeenCalledTimes(0);
  });
  
  it("Сортировка выбором на повышение", async () => {
    await sortingChoiseAscending(initialArr, setSortArray, setLoad, setIdLoadAsc);
    expect(initialArr).toStrictEqual(referenceArrAscending);
  });

  it("Сортировка выбором на понижение", async () => {
    await sortingChoiseDescending(initialArr, setSortArray, setLoad, setIsLoadDir);
    expect(initialArr).toStrictEqual(referenceArrDescending);
  });


  it("Сортировка пузырьком на повышение", async () => {
    await sortingBubbleAscending(initialArr, setSortArray, setLoad, setIdLoadAsc);
    expect(initialArr).toStrictEqual(referenceArrAscending);
  });

  it("Сортировка пузырьком на понижение", async () => {
    await sortingBubbleDescending(initialArr, setSortArray, setLoad, setIsLoadDir);
    expect(initialArr).toStrictEqual(referenceArrDescending);
  });
});