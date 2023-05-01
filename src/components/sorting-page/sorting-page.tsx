import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import sortingStyle from './sotting-page.module.css'
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { TArr, randomArr, sortingBubbleAscending, sortingBubbleDescending, sortingChoiseAscending, sortingChoiseDescending } from "./sortingLogic";
import { Column } from "../ui/column/column";

export const SortingPage: React.FC = () => {
  // Создаем состояние инициализации рандомного массива для отрисовки на экране, перед проведением сортировки
  const [createArr, setCreateArr] = useState<TArr[]>([])
  // Состояние положения и выбора радио кнопки
  enum SortingRadio {
    Choise = "choise",
    Bubble = "bubble",
  }
  const [radioType, setRadioType] = useState<SortingRadio>(SortingRadio.Choise)
  // Состояние выбора кнопки сортировки
  const [sortType, setSortType] = useState<Direction>()
  // Состояние загрузки
  const [isLoad, setIsLoad] = useState<boolean>(false)

  // Отрисовка рандомных массивов на экране
  useEffect(()=>{
    randomArr(setCreateArr,createArr)
    
  },[])
  //Установка значения радио кнопки по клику
  const changeRadioChoise = () => {
    setRadioType(SortingRadio.Choise);
  };

  const changeRadioBubble = () => {
    setRadioType(SortingRadio.Bubble);
  };

  //Применяем сортировку
  const changeSortType = (sorting: Direction) => {
    setSortType(sorting);
    if (sortType === Direction.Ascending && radioType === SortingRadio.Choise) {
      sortingChoiseAscending(createArr, setCreateArr, setIsLoad);
    }
    if (sortType === Direction.Descending && radioType === SortingRadio.Choise) {
      sortingChoiseDescending(createArr, setCreateArr, setIsLoad);
    }
    if (sortType === Direction.Ascending && radioType === SortingRadio.Bubble) {
      sortingBubbleAscending(createArr, setCreateArr, setIsLoad);
    }
    if (sortType === Direction.Descending && radioType === SortingRadio.Bubble) {
      sortingBubbleDescending(createArr, setCreateArr, setIsLoad);
    }
  };


  return (
    <SolutionLayout title="Сортировка массива">
      <div className={sortingStyle.input_wrapper}>
        <div className={sortingStyle.checkbox_wrapper}>
          <RadioInput
            label="Выбор"
            checked={radioType === SortingRadio.Choise}
            onChange={changeRadioChoise}
            disabled={isLoad} 
          />
          <RadioInput
            label="Пузырёк"
            checked={radioType === SortingRadio.Bubble}
            onChange={changeRadioBubble}
            disabled={isLoad}
          />
        </div>
        <div className={sortingStyle.button_wrapper}>
          <Button
            text="По возрастанию"
            sorting={Direction.Ascending}
            isLoader={isLoad}
            disabled={isLoad}
            onClick={()=>changeSortType(Direction.Ascending)}
          />
          <Button
            text="По убыванию"
            sorting={Direction.Descending}
            disabled={isLoad}
            onClick={()=>changeSortType(Direction.Descending)}
          />
        </div>
        <div>
          <Button
          extraClass={sortingStyle.button_arr}
          text="Новый массив"
          disabled={isLoad}
          onClick={()=>randomArr(setCreateArr,createArr)}
          />
        </div>
      </div>
      <div className={sortingStyle.columns_list_wrapper}>
        <ul className={sortingStyle.columns_list}>
          {createArr?.map((item, index) => (
            <li key={index}>
              <Column index={item.value} state={item.color} />
            </li>
          ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
