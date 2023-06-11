import classes from './MenuToggle.module.css';
import { AiOutlineBars, AiFillCloseCircle } from 'react-icons/ai';

//<AiOutlineBars className={cls.join(' ')} onClick={onToggle} />
const MenuToggle = ({ isOpen, onToggle }) => {
  const cls = [classes.MenuToggle];

  if (isOpen) {
    cls.push(classes.open);
  } else {
    cls.push(classes.close);
  }

  let isOpenTrue;
  if (isOpen) {
    isOpenTrue = (
      <AiFillCloseCircle className={cls.join(' ')} onClick={onToggle} />
    );
  } else {
    isOpenTrue = <AiOutlineBars className={cls.join(' ')} onClick={onToggle} />;
  }

  return isOpenTrue;
};

export default MenuToggle;
