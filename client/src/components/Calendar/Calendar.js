/* eslint-disable no-undef */
import './index.scss';
import { TAG_NAME } from 'utils/constants';

export default function Calendar() {
  if (new.target !== Calendar) {
    return new Calendar();
  }

  this.init = () => {
    this.$target = document.querySelector(TAG_NAME.MAIN);
  };

  this.init();
}
