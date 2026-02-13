## Основной тек:

React

Vite

TypeScript

Zustand

Chakra UI 





## Дополнительный стек:

SCSS

React-router-dom (для реализации навигации)

Также для выполнения задания использовал FSD архитектуру и следовал БЭМ методологии.


## Перед началом разработки:

- создал файл сброса базовых стилей (reset.scss)
  
- настроил алиасы для удобных импортов
  
- в index.scss описал настроки для текста по умолчанию

- выявил все цвета в макете и записал их в переменные в variables.scss
  
- в variables.scss создал основной контейнер (container-1840) для ограничения контента по ширине
  
- подключил шрифт Inter с нужными значениями толщины в index.html


## Что удалось реализовать:

1. Навигация для разных страниц (Заявки, Отчеты, Профиль).

2. Добавил переключение по табам (Новые, Отклонены, На рассмотрении и т.д.).

3. Создание заявки через модальное окно со всем выпадающими списками, полями ввода и подгрузкой фотографий.

4. Выезжающее меню в хедере для мобильной версии.

5. hover-эффекты для кнопок и интерактивных элементов.

6. Адаптив для всего приложения


## Что не успел реализовать:

1. Фильтрация таблицы.

2. Пункт «Показать только мои» в табах.

3. Вывод введенных данных в консоль после нажатия на кнопку "Создать».

3. Отображение заявок по дням в мобильной версии (Сегодня, Вчера и т.д.).

4. Уменьшение паддингов у контейнера container-1840.

5. Замена иконки (с крестика на стрелку) закрытия модального окна в мобильной версии.

5. Не у всех элементов прописаны aria-атрибуты и alt.

6. Хотел написать побольше комментариев для удобства чтения кода.



## Особенности:
 
 Заметил, что в хедере слева пустое пространство (слева от «Заявки»), предположил, что это место для логотипа.


## Адаптив:

1. Хедер работает корректно, но сделал немного не по макету: в мобильной версии вместо заголовка страницы, на которой находишься я расположил бургер меню.

2. С таблицей решил сделать так: при уменьшении экрана постепенно исчезают определенные столбы и некоторые данные в ячейках (менее важная информация исчезает в первую очередь). Сделал это для того чтобы не появлялась прокрутка таблицы по горизонтали при любой ширине экрана.
Немного не успел доделать адаптив таблицы для мобильно версии, когда строки таблицы превращаются в карточки (информация расположена не так, как на макете, но читаемо).

3. Компонент с поиском и табами отображается корректно для всех типов экрана.

4. Модальное окно отображается корректно для всех типов экрана.


## Отдельно про таблицу:

1. Для управления состоянием таблицы использовал Zustand.

2. Начальное состояние таблицы - 5 моковых заявок (описаны в store.ts).

3. Категории привязал к номерам заявок (при создании заявки указали категорию «Холодильники», значит номер будет начинаться с «ХЛ»).

4. При создании новой заявки в полях Техник, Реакция и Решение появляется прочерк.


## Chakra UI:

Так так библиотека для меня абсолютно новая, по большей части писал привычный для себя код, но все-таки попробовал возможности Chakra для реализации таблицы и модального окна. 

Модальное постарался реализовать полностью из компонентов, которые предлагает Chakra.


## Итог:

Вот как-то так)
Спасибо большое за такое интересное тестовое! Очень хотелось бы представить вам решение в том виде, в котором я его изначально задумывал.

Понимаю, что сейчас в нем есть много недоработок и микромоментов, которых быть не должно, но в силу ограниченности времени, что-то упустил из виду, а что-то просто не успел. Готов внести все необходимые изменения, поэтому буду очень рад обратной связи по этому поводу! 


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
