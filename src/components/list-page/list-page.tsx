import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styleList from "./list-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import {
  addHeadItem,
  addTailItem,
  defaultValue,
  pushItemIndx,
  removeHeadItem,
  removeItemIndx,
  removeTailItem,
  TItem,
} from "./list-page-logic";
import { List } from "./list-page-class";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ArrowIcon } from "../ui/icons/arrow-icon";

export const ListPage: React.FC = () => {
  const [list] = useState(new List(defaultValue));
  const [listArr, setListArr] = useState<TItem[]>(list.arr);
  const [disbledbtn, setDisabledBtn] = useState<boolean>(false);
  const [inputState, setInputState] = useState<string>("");
  const [inputIndxState, setInputIndxState] = useState<string>("");
  const [isAddHead, setAddHead] = useState<boolean>(false);
  const [isbottom, setbottom] = useState<boolean>(false);
  const [isAddTail, setAddTail] = useState<boolean>(false);
  const [isRemoveTail, setRemoveTail] = useState<boolean>(false);
  const [isRemoveHead, setRemoveHead] = useState<boolean>(false);
  const [isRemoveIndx, setRemoveIndx] = useState<boolean>(false);
  const [isAddIndx, setAddIndx] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [smallCircle, setSmallCircle] = useState<TItem>({
    value: "",
    color: ElementStates.Changing,
    position: -1,
  });

  const changeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(evt.target.value);
  };

  const changeIndxInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputIndxState(evt.target.value);
    const num = Number(evt.target.value);
    if (num > list.arr.length) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  };

  const runAnimAdd = async (num: number, end: number) => {
    for (let i = 0; i <= end; i++) {
      setSmallCircle({
        ...smallCircle,
        value: inputState,
        position: i,
      });
      await delay(SHORT_DELAY_IN_MS);
      list.arr[num].color = ElementStates.Changing;
      if (num < end) {
        num++;
      }
      setListArr([...list.arr]);
    }
  };

  const runAnimRemove = async (end: number) => {
    setIsStarted(true);
    for (let i = 0; i <= end; i++) {
      list.arr[i].color = ElementStates.Changing;
      setListArr([...list.arr]);
      await delay(SHORT_DELAY_IN_MS);
    }
    list.arr[end].color = ElementStates.Default;
    setSmallCircle({
      ...smallCircle,
      value: list.arr[end].value,
      position: end,
    });
    await delay(SHORT_DELAY_IN_MS);
    setIsStarted(false);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styleList.input_wrapper}>
        <div className={styleList.buttons_wrapper}>
          <Input
            maxLength={4}
            isLimitText={true}
            value={inputState}
            onChange={changeInput}
          />
          <Button
            text="Добавить в head"
            onClick={() =>
              addHeadItem(
                setIsStarted,
                setAddHead,
                setSmallCircle,
                smallCircle,
                inputState,
                list,
                setListArr,
                setInputIndxState,
                setInputState
              )
            }
            disabled={!inputState || isStarted}
            isLoader={isAddHead}
          />
          <Button
            text="Добавить в tail"
            disabled={!inputState || isStarted}
            onClick={() =>
              addTailItem(
                setIsStarted,
                setAddTail,
                setSmallCircle,
                smallCircle,
                inputState,
                list,
                setListArr,
                setInputIndxState,
                setInputState
              )
            }
            isLoader={isAddTail}
          />
          <Button
            text="Удалить из head"
            onClick={() =>
              removeHeadItem(
                setIsStarted,
                setRemoveHead,
                setbottom,
                setSmallCircle,
                smallCircle,
                list,
                setListArr,
                setInputIndxState,
                setInputState
              )
            }
            isLoader={isRemoveHead}
            disabled={list.isEmpty() || isStarted}
          />
          <Button
            text="Удалить из tail"
            onClick={() =>
              removeTailItem(
                setIsStarted,
                setRemoveTail,
                setbottom,
                setSmallCircle,
                smallCircle,
                list,
                setListArr,
                setInputIndxState,
                setInputState
              )
            }
            isLoader={isRemoveTail}
            disabled={list.isEmpty() || isStarted}
          />
          <Input
            maxLength={4}
            type="number"
            value={inputIndxState}
            onChange={changeIndxInput}
            placeholder="Введите индекс"
          />
          <Button
            extraClass={styleList.index_add}
            text="Добавить по индексу"
            disabled={!inputIndxState || !inputState || isStarted}
            onClick={() =>
              pushItemIndx(
                setIsStarted,
                setAddIndx,
                setSmallCircle,
                inputState,
                inputIndxState,
                list,
                setListArr,
                setInputIndxState,
                setInputState,
                runAnimAdd
              )
            }
            isLoader={isAddIndx}
          />
          <Button
            extraClass={styleList.index_remove}
            text="Удалить по индексу"
            disabled={!inputIndxState || disbledbtn || isStarted || (Number(inputIndxState)>listArr.length-1) || (Number(inputIndxState)<0)}
            onClick={() =>
              removeItemIndx(
                setIsStarted,
                setRemoveIndx,
                setbottom,
                setSmallCircle,
                inputIndxState,
                list,
                setListArr,
                setInputIndxState,
                setInputState,
                runAnimRemove
              )
            }
            isLoader={isRemoveIndx}
          />
        </div>
      </div>
      <ul className={styleList.circle_list}>
        {listArr?.map((item, index) => (
          <li className={styleList.circles_box} key={index}>
            {smallCircle.position === index && (
              <Circle
                isSmall={true}
                letter={smallCircle.value}
                state={smallCircle.color}
                extraClass={`${isbottom && styleList.bottom_circle}`}
              />
            )}
            <Circle
              extraClass={styleList.default_circle}
              letter={item.value}
              state={item.color}
              index={index}
              tail={
                index === list.getTail() && index !== smallCircle.position
                  ? "tail"
                  : ""
              }
              head={
                index === list.getHead() && index !== smallCircle.position
                  ? "head"
                  : ""
              }
            />
            {index < listArr.length - 1 && (
              <div className={styleList.arrow_box}>
                <ArrowIcon />
              </div>
            )}
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
