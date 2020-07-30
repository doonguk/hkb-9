/* eslint-disable no-new */
import { calendarPageTemplate } from 'utils/template';
import { Header } from '../components/common/Header';
import { SelectMonth } from '../components/common/SelectMonth';
import { Calendar } from '../components/Calendar';

export default function CalendarPage() {
  if (new.target !== CalendarPage) {
    return new CalendarPage();
  }

  this.init = () => {
    this.$target = document.querySelector('#App');
    this.$target.innerHTML = calendarPageTemplate;
    new Header();
    new SelectMonth();
    new Calendar();
  };

  this.init();
}
