import { JSDOM } from 'jsdom';
import localstore from './mocks/localstore.js';
import displayhtml from './displayhtml.js';

const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

const myhtml = () => {
  document.body.innerHTML = `<ul id="todo-list">
      <li>Today's To Do<i class="fa-solid fa-arrows-rotate"></i></li>
      <li class="add-item"><input type="text" id="inp-add-item" placeholder="Add to your list ..."></li>
      <li class="btn"><a href="">Clear all Completed</a></li>
    </ul>`;
  return document;
};

describe('Add Method', () => {
  test('Add to the list', () => {
    expect(localstore.add({ target: { value: 'ABC' } })).toBe(1);
  });

  test('Add one new item to the list', () => {
    myhtml();
    displayhtml.addListItem({
      description: 'First Item',
      completed: false,
      index: 1,
    });
    const list = document.querySelectorAll('#todo-list li');
    expect(list).toHaveLength(4);
  });
});

describe('Remove Method', () => {
  test('Remove from the list', () => {
    expect(localstore.remove({ target: { index: '1' } })).toBe(5);
  });

  test('Remove one new item from the list', () => {
    myhtml();
    localstore.displayList();
    localstore.remove({ target: { index: '1' } });
    const list = document.querySelectorAll('.todoItem');
    expect(list).toHaveLength(4);
  });
});
