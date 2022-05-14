import BaseComponent from "../baseComponent";
import styles from './message.module.scss';

class Message extends BaseComponent {
  constructor(message) {
    super(`<div class="${styles.message}">${message}</div>`);
  }
}

export default Message;
