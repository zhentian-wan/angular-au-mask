/**
 * Created by zhentianwan on 04/07/2017.
 */
export const  TAB = 9,
  LEFT_ARROW =	37,
  RIGHT_ARROW = 39,
  BACKSPACE = 8,
  DELETE = 46;

export const SPECIAL_CHARACTERS = [" ", "/", "(", ")", "+", "\/", "-"];

export const overWriteCharAtPosition = (
  input: HTMLInputElement,
  val: any,
  position: number
) => {
  const currentValue = input.value;
  input.value = currentValue.slice(0, position) + val + currentValue.slice(position+1);
};
