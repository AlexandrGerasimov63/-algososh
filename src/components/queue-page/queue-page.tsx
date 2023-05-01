import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styleQeue from "./queue-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./queue-page-class";
import { Circle } from "../ui/circle/circle";
import { addItem, deleteItem, TItem, clearArr } from "./queue-page-logic";

export const defaultValues = Array.from({ length: 7 }, () => ({
  value: "",
  color: ElementStates.Default,
}));

export const QueuePage: React.FC = () => {
  const [queue] = useState(new Queue(defaultValues));
  const [queueArr, setQueueArr] = useState<TItem[]>(queue.arr);
  const [inputState, setInputState] = useState<string>("");
  const [isAddLoad, setAddLoad] = useState<boolean>(false);
  const [isRemoveLoad, setRemoveLoad] = useState<boolean>(false);
  const [cleanedLoad,setCleanedLoad]= useState<boolean>(false)
  const changeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(evt.target.value);
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styleQeue.input_wrapper}>
        <Input
          maxLength={4}
          isLimitText={true}
          value={inputState}
          onChange={changeInput}
        />
        <div className={styleQeue.buttons_wrapper}>
          <Button
            text="Добавить"
            onClick={() =>
              addItem(setAddLoad, queue, inputState, setQueueArr, setInputState)
            }
            disabled={!inputState}
            isLoader={isAddLoad}
          />
          <Button
            text="Удалить"
            onClick={() => deleteItem(setRemoveLoad, queue, setQueueArr)}
            disabled={queue.isEmpty() || isAddLoad}
            isLoader={isRemoveLoad}
          />
          <Button
            text="Очистить"
            onClick={() => clearArr(queue, setQueueArr, setCleanedLoad)}
            disabled={(queue.isEmpty() || isAddLoad || isRemoveLoad) && !queue.isHead()}
            isLoader={cleanedLoad}
          />
        </div>
      </div>
      <ul className={styleQeue.circle_list}>
        {queueArr?.map((item, index) => (
          <li key={index}>
            <Circle
              letter={item.value}
              state={item.color}
              index={index}
              tail={index === queue.getTail() ? "tail" : ""}
              head={index === queue.getHead() ? "head" : ""}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
