import renderer from "react-test-renderer";
import { Button } from "./button";
import { render, screen, fireEvent } from '@testing-library/react'
import { Direction } from "../../../types/direction"; 

describe("Проверка кнопки", () => {
  it("Кнопка с текстом", () => {
    const tree = renderer.create(<Button text="Текст кнопки" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Кнопка без текста", ()=>{
    const tree = renderer.create(<Button/>).toJSON();
    expect(tree).toMatchSnapshot();
  })
  it("Кнопка disabled", ()=>{
    const tree = renderer.create(<Button disabled/>).toJSON();
    expect(tree).toMatchSnapshot();
  })
  it("Индикатор загрузки кнопки", ()=>{
    const tree = renderer.create(<Button isLoader/>).toJSON();
    expect(tree).toMatchSnapshot();
  })
  it("Колбэк кнопки", () => {
    const callBack = jest.fn();
    render(<Button onClick={callBack} />);
    fireEvent.click(screen.getByRole("button"));
    expect(callBack).toHaveBeenCalled();
  });
  it("Проверка btn Asc", ()=>{
    const tree = renderer.create(<Button sorting={Direction.Ascending}/>).toJSON();
    expect(tree).toMatchSnapshot();
  })
  it('Проверка кнопки Des', ()=>{
    const tree = renderer.create(<Button sorting={Direction.Descending}/>).toJSON();
    expect(tree).toMatchSnapshot();
  })
  it("Кпока big", () => {
    const tree = renderer.create(<Button linkedList="big" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Кнопка small", () => {
    const tree = renderer.create(<Button linkedList="small" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
