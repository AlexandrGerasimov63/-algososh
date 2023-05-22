import { stringReverse } from "./string-logic"; 
import { ElementStates } from "../../types/element-states";

const setResultArr = jest.fn();
const setLoad = jest.fn();

const initialArr = [
    { value: "1", color: ElementStates.Default },
    { value: "2", color: ElementStates.Default },
    { value: "3", color: ElementStates.Default },
    { value: "4", color: ElementStates.Default },
  ];
  
  const referenceArr = [
    { value: "4", color: ElementStates.Modified },
    { value: "3", color: ElementStates.Modified },
    { value: "2", color: ElementStates.Modified },
    { value: "1", color: ElementStates.Modified },
  ];
  
  describe("Тест разворота строки", () => {
    it("Разворот с четным кол-вом эл-тов", async () => {
      const tmpArr = initialArr;
      await stringReverse(tmpArr, setLoad, setResultArr);
      expect(initialArr).toStrictEqual(referenceArr);
    });
  
    it("Разворот с нечетным кол-вом эл-тов", async () => {
      const tmpArr = initialArr.splice(-1, 1);
      const tmpArr2 = referenceArr.splice(-1, 1);
      await stringReverse(tmpArr, setLoad, setResultArr);
      expect(tmpArr).toStrictEqual(tmpArr2);
    });
  
    it("Разворот с одним символом", async () => {
      const tmpArr = initialArr.splice(-1, 3);
      const tmpArr2 = referenceArr.splice(-1, 3);
      await stringReverse(tmpArr, setLoad, setResultArr);
      expect(tmpArr).toStrictEqual(tmpArr2);
    });
  
    it("Пустой массив", () => {
      const emptyArr = [{ value: "" }];
      const emptyArr2 = [{ value: "" }];
      expect(emptyArr).toStrictEqual(emptyArr2);
    });
  });