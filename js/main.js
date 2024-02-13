window.addEventListener('load', () => {
  const form = document.forms.quiz;
  const one = form.elements[0];
  const two = form.elements[1];
  const slider = document.querySelector('.quiz__slider');
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');
  const progress = document.querySelector('.quiz__progress');
  const bar = document.querySelector('.quiz__progress_bar');
  const question = document.querySelector('.quiz__question');
  const imgAnswer = document.querySelectorAll('.quiz__answer');
  const textAnswer = document.querySelectorAll('.quiz__answer_text');
  const img4 = document.getElementById('ans-4');
  const text4 = document.getElementById('text4');
  const list = document.querySelector('.quiz__answers');
  const policy = document.querySelector('.policy');
  const yes = document.querySelector('.yes');
  const bonus = document.getElementById('bonus');
  const error = document.querySelector('.quiz__err');
  const arr = [];

  //b - progress-bar, q - question, a -answer, img - image
  const quizData = [
    {
      n: 'q1',
      b: 5,
      q: '1. Какой сайт вам нужен?',
      a: ['Сайт-визитка', 'Лендинг', 'Многостраничник', 'Другое'],
      img: ['img-1', 'img-2', 'img-3', 'img-4'],
    },
    {
      n: 'q2',
      b: 15,
      q: '2. Есть ли у вас фото и тексты для сайта?',
      a: ['Я предоставлю', 'Есть частично', 'Ничего нет', 'Пока не знаю'],
      img: ['img-5', 'img-6', 'img-7', 'img-8'],
    },
    {
      n: 'q3',
      b: 25,
      q: '3. Какой дизайн вы хотели бы?',
      a: ['Шаблонный', 'Уникальный', 'Продающий', 'Нужно обсудить'],
      img: ['img-9', 'img-10', 'img-11', 'img-12'],
    },
    {
      n: 'q4',
      b: 35,
      q: '4. Нужна ли настройка рекламы на сайт?',
      a: [
        'Надо Яндекс Директ',
        'СЕО-продвижение',
        'Ничего не нужно',
        'Пока не знаю',
      ],
      img: ['img-13', 'img-14', 'img-15', 'img-16'],
    },
    {
      n: 'q5',
      b: 45,
      q: '5. Есть ли уже сайт и канал в соцсетях?',
      a: [
        'Нет ничего',
        'Есть и то и другое',
        'Есть сайт',
        'Есть  канал в соцсетях',
      ],
    },
    {
      n: 'q6',
      b: 55,
      q: '6. С чем связана ваша деятельность?',
      a: ['Строительство', 'Ремонт', 'Красота', 'Инфобизнес'],
    },
    {
      n: 'q7',
      b: 65,
      q: '7. Регион или город, на который вы планируете работать?',
      a: ['Вся Россия', 'Москва и область', 'Питер и область', 'Надо обсудить'],
    },
    {
      n: 'q8',
      b: 75,
      q: '8. Что в первую очередь важно для вас?',
      a: [
        'Стоимость проекта',
        'Красивый дизайн',
        'Скорость запуска проекта',
        'Рентабельность и результат',
      ],
    },
    {
      n: 'q9',
      b: 90,
      q: '9. Выберите бонус за прохождение опроса: ',
      a: [
        'Бесплатная настройка рекламы в Яндекс Директ',
        'Скидка 15% на создание сайта',
        'Бесплатный аудит имеющегося сайта и РК',
        'Ничего не нужно, спасибо',
      ],
    },
    {
      n: 'name',
      b: 0,
      q: 'Пожалуйста, укажите свои данные, чтобы закрепить за вами выбранный бонус  и прислать результаты расчета',
      a: ['', ''],
    },
  ];

  //Создаем переменную для индекса массива
  let currentQuiz = 0;

  function cleanAnswer() {
    // очищаем все инпуты
    for (i = 0; i < 4; i++) {
      form.elements[i].checked = false;
    }

    if (currentQuiz > 4) {
      form.elements[4].value = '';
    }
  }

  loadQuiz();

  function loadQuiz() {
    const currentQuizData = quizData[currentQuiz];
    //При изменении индекса в HTML-элементы вставятся соответствующие значения из массива данных.
    question.innerText = currentQuizData.q;
    bar.style.width = currentQuizData.b + `%`;

    for (i = 0; i < 4; i++) {
      form.elements[i].name = currentQuizData.n;
      form.elements[i].value = currentQuizData.a[i];
      imgAnswer[i].classList.add(currentQuizData.img[i]);
      textAnswer[i].innerText = currentQuizData.a[i];
    }

    img4.style.display = 'none';
    if (currentQuiz === 0) {
      prevBtn.classList.add('hidden');
    } else {
      prevBtn.classList.remove('hidden');
    }
  }
  //После 5 вопроса дизайн квиза меняется - только текстовые вопросы, удаляем CSS-свойства для картинок и плашек
  function loadTextQuiz() {
    const currentQuizData = quizData[currentQuiz];
    question.innerText = currentQuizData.q;
    bar.style.width = currentQuizData.b + `%`;

    if (currentQuiz < 8) {
      img4.style.display = 'flex';
      text4.name = currentQuizData.n;
      text4.value = '';
    } else {
      text4.name = '';
      img4.style.display = 'none';
    }

    if (currentQuiz < 9) {
      for (i = 0; i < 4; i++) {
        form.elements[i].name = currentQuizData.n;
        form.elements[i].value = currentQuizData.a[i];
        imgAnswer[i].classList.remove('quiz__answer');
        imgAnswer[i].classList.add('quiz__answer_t');
        textAnswer[i].classList.remove('quiz__answer_text');
        textAnswer[i].classList.add('quiz__answer_text_t');
        textAnswer[i].innerText = currentQuizData.a[i];
      }
      list.style.gap = `0`;
      list.style.margin = `0`;

      if (currentQuiz === 8) {
        nextBtn.textContent = 'Далее';
        const span = document.createElement('span');
        span.classList.add('flare');
        nextBtn.appendChild(span);
      }
    }
  }

  function loadForm() {
    const currentQuizData = quizData[currentQuiz];
    question.innerText = currentQuizData.q;
    progress.classList.add('hidden');
    nextBtn.textContent = 'Сохранить бонус';
    const span = document.createElement('span');
    span.classList.add('flare');
    nextBtn.appendChild(span);
    policy.style.display = 'block';
    list.style =
      'flex-direction: column; max-width: 70%; justify-content: center; margin: 0 auto; gap: 0';
    for (i = 0; i < 2; i++) {
      imgAnswer[i].classList.remove('quiz__answer_t');
      imgAnswer[i].classList.add('quiz__answer_f');
      textAnswer[i].classList.remove('quiz__answer_text_t');
      textAnswer[i].classList.add('hidden');
    }
    for (i = 2; i < 4; i++) {
      imgAnswer[i].classList.add('hidden');
    }
    img4.classList.add('hidden');
    prevBtn.classList.add('hidden');
    yes.classList.add('hidden');
    one.classList.remove('visually-hidden');
    one.setAttribute('type', 'text');
    one.setAttribute('name', 'name');
    one.setAttribute('id', 'name');
    one.setAttribute('data-reg', '^[А-ЯЁ][а-яё]*$');
    one.setAttribute('minlength', '3');
    one.setAttribute('placeholder', 'Ваше имя');
    one.setAttribute('value', '');
    one.setAttribute('required', 'true');
    let labelName = document.createElement('label');
    labelName.setAttribute('for', 'name');
    document.getElementById('answer1').after(labelName);
    labelName.classList.add('lbl');
    labelName.textContent = '*Только русские буквы';
    one.setAttribute('autocomplete', 'off');
    two.setAttribute('autocomplete', 'off');
    two.classList.remove('visually-hidden');
    two.setAttribute('type', 'tel');
    two.setAttribute('name', 'tel');
    two.setAttribute('placeholder', 'Ваш телефон');
    two.setAttribute('value', '');
    two.setAttribute('id', 'tel');
    two.setAttribute('minlength', '10');
    two.setAttribute('maxlength', '18');
    two.setAttribute('required', 'true');
  }

  //Валидация полей формы и маска телефонного номера
  form.addEventListener('input', inputHandler);
  form.addEventListener('submit', formCheck);

  function phoneMask() {
    var getInputNumbersValue = function (input) {
      return input.value.replace(/\D/g, '');
    };

    var onPhonePaste = function (e) {
      var input = e.target,
        inputNumbersValue = getInputNumbersValue(input);
      var pasted = e.clipboardData || window.clipboardData;
      if (pasted) {
        var pastedText = pasted.getData('Text');
        if (/\D/g.test(pastedText)) {
          input.value = inputNumbersValue;
          return;
        }
      }
    };

    var onPhoneInput = function (e) {
      var input = e.target,
        inputNumbersValue = getInputNumbersValue(input),
        selectionStart = input.selectionStart,
        formattedInputValue = '';

      if (!inputNumbersValue) {
        return (input.value = '');
      }

      if (input.value.length != selectionStart) {
        if (e.data && /\D/g.test(e.data)) {
          input.value = inputNumbersValue;
        }
        return;
      }

      if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {
        if (inputNumbersValue[0] == '9')
          inputNumbersValue = '7' + inputNumbersValue;
        var firstSymbols = inputNumbersValue[0] == '8' ? '8' : '+7';
        formattedInputValue = input.value = firstSymbols + ' ';
        if (inputNumbersValue.length > 1) {
          formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
        }
        if (inputNumbersValue.length >= 5) {
          formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
        }
        if (inputNumbersValue.length >= 8) {
          formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
        }
        if (inputNumbersValue.length >= 10) {
          formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
        }
      } else {
        formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
      }
      input.value = formattedInputValue;
    };
    var onPhoneKeyDown = function (e) {
      var inputValue = e.target.value.replace(/\D/g, '');
      if (e.keyCode == 8 && inputValue.length == 1) {
        e.target.value = '';
      }
    };

    two.addEventListener('keydown', onPhoneKeyDown);
    two.addEventListener('input', onPhoneInput, false);
    two.addEventListener('paste', onPhonePaste, false);
  }

  function inputHandler({ target }) {
    if (target.hasAttribute('data-reg')) {
      const inputValue = target.value;
      const inputReg = target.getAttribute('data-reg');
      const reg = new RegExp(inputReg);
      if (reg.test(inputValue)) {
        target.setAttribute('valid', 'true');
        target.style.border = '2px solid rgb(0, 196, 0)';
        setTimeout(() => {
          target.style.border = '';
        }, 4000);
      } else {
        target.setAttribute('valid', 'false');
        target.style.border = '2px solid rgb(255, 0, 0)';
        console.log(one.valid);
      }
    }
    phoneMask();
  }

  function formCheck() {
    console.log(one.valid);
    if (one.valid === 'true' && two.value) {
      formSubmit();
    } else {
      showFormError();
      return;
    }
  }

  function showError() {
    error.classList.remove('hidden');
    setTimeout(() => {
      error.classList.add('hidden');
    }, 3000);
  }

  function showFormError() {
    error.innerText = 'Нужно заполнить оба поля правильно!';
    error.classList.remove('hidden');
    setTimeout(() => {
      error.classList.add('hidden');
    }, 3000);
  }

  function getSelected() {
    const currentQuizData = quizData[currentQuiz];
    let answer;
    for (i = 0; i < 4; i++) {
      if (form.elements[i].checked) {
        ans = form.elements[i].id;
        switch (ans) {
          case 'ans-0':
            answer = currentQuizData.a[0];
            break;
          case 'ans-1':
            answer = currentQuizData.a[1];
            break;
          case 'ans-2':
            answer = currentQuizData.a[2];
            break;
          case 'ans-3':
            answer = currentQuizData.a[3];
            break;
        }
      }
    }

    if (form.elements[4].value) {
      answer = form.elements[4].value;
    }
    return answer;
  }

  function formSubmit() {
    const data = JSON.stringify(arr);
    var xhr = new XMLHttpRequest();
    var url = 'send.php';
    var params = 'arrFromJS=' + encodeURIComponent(data);
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText);
        //window.location.href = 'URL2';
      } else {
        //window.location.href = 'URL2';
      }
    };
    xhr.send(params);
  }

  //При нажатии на кнопку вычисляется индекс, по которому отобразятся данные из массива.
  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const currentQuizData = quizData[currentQuiz];
    const data = new FormData(form);
    const itemData = Array.from(data.entries());

    //Если ни один пункт не выбран, выводим предупреждение и не переходим на следующий вопрос
    if (
      (currentQuiz < 4 && itemData.length === 0) ||
      (currentQuiz < 4 && form.elements[4].value) ||
      (currentQuiz > 3 &&
        currentQuiz < 8 &&
        itemData.length === 1 &&
        !form.elements[4].value) ||
      (currentQuiz > 7 &&
        itemData.length === 0 &&
        currentQuiz < quizData.length)
    ) {
      showError();
      return;
    } else if (currentQuiz < quizData.length - 1) {
      //Если пункт выбран, записываем вопрос и ответ в массив для отправки на почту
      let answer = getSelected();
      arr.push(answer);
    }
    if (currentQuiz < 4) {
      for (i = 0; i < 4; i++) {
        imgAnswer[i].classList.remove(currentQuizData.img[i]);
      }
    }
    cleanAnswer();

    currentQuiz++;

    //Эффект появления следующего вопроса
    slider.classList.add('animated');
    setTimeout(() => {
      slider.classList.remove('animated');
    }, 600);

    if (currentQuiz < 4) {
      //Удаляем данные каждой картинки перед переходом на следующий слайд
      for (i = 0; i < 4; i++) {
        imgAnswer[i].classList.remove(currentQuizData.img[i]);
      }
      loadQuiz();
    } else if (currentQuiz < quizData.length - 1) {
      img4.value = '';
      loadTextQuiz();
    } else if (currentQuiz === quizData.length - 1) {
      //записываем значение выбранного бонуса в начальную секцию
      bonus.innerText = arr[arr.length - 1];
      loadForm();
    } else {
      if (!one.value || !two.value) {
        showFormError();
        return;
      }
      arr.push(one.value, two.value);
      formCheck();
    }
    one.value = '';
    two.value = '';
  });

  //Кнопка "Назад" по клику возвращает на один вопрос назад
  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const currentQuizData = quizData[currentQuiz];
    // очищаем все инпуты
    cleanAnswer();
    // если предыдущий ответ был записан в массив, удаляем его
    if (arr.length !== 0 && arr.length === currentQuiz) {
      arr.pop();
    }
    if (currentQuiz < 4) {
      //Удаляем данные каждой картинки перед возвращением на предыдущий слайд
      for (i = 0; i < 4; i++) {
        imgAnswer[i].classList.remove(currentQuizData.img[i]);
      }
      currentQuiz--;
      loadQuiz();
    } else if (currentQuiz === 4) {
      currentQuiz--;
      //Перед возвращением с пятого вопроса на 4 меняется разметка - с текстовых на картинки
      for (i = 0; i < 4; i++) {
        imgAnswer[i].classList.remove('quiz__answer_t');
        imgAnswer[i].classList.add('quiz__answer');
        textAnswer[i].classList.remove('quiz__answer_text_t');
        textAnswer[i].classList.add('quiz__answer_text');
      }
      img4.style.display = 'none';
      loadQuiz();
    } else {
      currentQuiz--;
      loadTextQuiz();
    }
  });
});
