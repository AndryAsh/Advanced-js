'use strict';

const text = `One: 'Hi Mary.' Two: 'Oh, hi.'
One: 'How are you doing?'
Two: 'I'm doing alright. How about you?'
One: 'Not too bad. The weather is great isn't it?'
Two: 'Yes. It's absolutely beautiful today.'
One: 'I wish it was like this more frequently.'
Two: 'Me too.'
One: 'So where are you going now?'
Two: 'I'm going to meet a friend of mine at the department store'
One: 'Going to do a little shopping?'
Two: 'Yeah, I have to buy some presents for my parents.'
One: 'What's the occasion?'
Two: 'It's their anniversary.'
One: 'That's great. Well, you better get going. You don't want to be late.'
Two: 'I'll see you next time.'
One: 'Sure.' Bye.'`;

// Придумать шаблон, который заменяет одинарные кавычки на двойные.
/* let regExp = /'/g;

console.log(text.replace(regExp, '"')); */

// Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.
let regExp = /(?<=\s)'|\B'/g;           // Если строка One: 'Sure.' Bye.' попадает под условие aren't
// let regExp = /(?<=\s)'|'(?=\n)|'$/g;    // Если строка One: 'Sure.' Bye.' не попадает под условие aren't
console.log(text.replace(regExp, '"'));

/* Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить.
При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
a. Имя содержит только буквы.
b. Телефон имеет вид +7(000)000-0000.
c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
d. Текст произвольный.
e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой
и сообщить пользователю об ошибке.
*/


