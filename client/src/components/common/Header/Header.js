import './index.scss';
import { headerHTMLTemplate } from 'utils/template';

export default function Header() {
  if (new.target !== Header) {
    return new Header();
  }

  this.init = () => {
    this.$target = document.querySelector('#App');
    this.$target.innerHTML = headerHTMLTemplate;
  };

  this.init();
}
