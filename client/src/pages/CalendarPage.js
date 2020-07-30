/* eslint-disable no-new */
import { Header } from '../components/common';

export default function CalendarPage() {
  if (new.target !== CalendarPage) {
    return new CalendarPage();
  }

  this.init = () => {
    new Header();
  };

  this.init();
}
