import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import stringStyle from "./string.module.css"
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { stringReverse, TStringArr } from "./string-logic";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {
  // Добавляем состояние с инпута
  const [inputState, setInputState] = useState<string>("");
  // Добавляем слушатель onChange на инпут
  const changeInputValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(evt.target.value)
  }
  // Добавляем состояние отображаемой части
  const [inputResult, setInputResult] = useState<TStringArr[]>([]);
  // Состояние имитации загрузки
  const [isLoad, setIsLoad] = useState<boolean>(false)
  // Функция разбиения и преобразования строки
  const deployString = () => {
    const tmpArr = inputState
      .split("")
      .map((value) => ({ value, color: ElementStates.Default }));
      stringReverse(tmpArr, setIsLoad, setInputResult);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={stringStyle.input_wrapper}>
        <Input
        maxLength={11}
        isLimitText={true}
        value={inputState}
        onChange={changeInputValue}
        />
        <Button
        text="Развернуть"
        onClick={deployString}
        isLoader={isLoad}
        disabled={!inputState}
        />
      </div>
      <ul className={stringStyle.string_list}>
        {inputResult?.map((item, index) => (
          <li key={index}>
            <Circle letter={item.value} state={item.color}/>
          </li>
        ))}
        
      </ul>
    </SolutionLayout>
  );
};
