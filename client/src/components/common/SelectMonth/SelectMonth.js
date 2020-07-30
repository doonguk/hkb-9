import './index.scss';
import { selectMonthTemplate } from 'utils/template';
import { CLASS_NAME } from 'utils/constants';

export default function SelectMonth() {
  if (new.target !== SelectMonth) {
    return new SelectMonth();
  }

  this.init = () => {
    this.$target = document.querySelector(`.${CLASS_NAME.SELECT_MONTH}`);
    this.$target.innerHTML = selectMonthTemplate;
  };

  this.init();
}
