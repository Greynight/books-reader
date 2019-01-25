import React from 'react';
import Word from './../components/Word';

// const textToArray = (text) => {
//   const re = /\r\n*/;
//   return text.split(re).filter(item => !!item);
// };

// Calculate how much content fits a screen
const calculatePageSize = (bookContainer, bookPage, bookContentArray) => {
  let bookContentLength = 0;

  const textArray = bookContentArray
    .map((item) => (
      `<p class='paragraph'>${item}</p>`
    ));

  let string = '';
  const paragraphsCount = textArray.length;

  for (let i = 0; i < paragraphsCount; i++) {
    string += textArray[i];
    bookPage.innerHTML = string;

    if (bookContainer.clientHeight < bookContainer.scrollHeight) {
      bookContentLength = i;
      break;
    }
  }

  bookPage.innerHTML = '';

  return bookContentLength;
};

const prepareBook = (params) => {
  let {
    bookContent = [],
    offsetDirection,
    bookOffset,
    bookContainer,
    bookPage,
    updateOffset
  } = params;

  let text = [];
  let bookContentArray = [...bookContent];
  let bookContentLength = bookContentArray.length;

  if (!offsetDirection) {
    bookContentArray.reverse();
  }
  // TODO change as bookContent is array now
  const pageSize = calculatePageSize(bookContainer, bookPage, bookContentArray);
  const afterLastElement = bookContentArray[pageSize];
  const pages = bookContent.split(afterLastElement);
  const pageIndex = offsetDirection ? 0 : 1;
  const currentPageLength = pages[pageIndex].length;

  if (bookOffset !== currentPageLength) {
    updateOffset(currentPageLength);
  }

  const pageStart = offsetDirection ? 0 : -bookContentLength;
  const pageEnd = offsetDirection ? pageSize : bookContentArray.length;

  // prepare page content
  const content = bookContentArray.slice(pageStart, pageEnd) || [];
  const notChars = [' ', '-', '=', '+', '*', '&', '?', '%', ';', ':', '$', '#', '@', '!', ',', '.', '/', '\\',
    '—', '"', '(', ')', '{', '}', '«', '»', '…', '[', ']'];

  text = content
    .map((item, index) => {
      let textArray = [];
      let textItem = '';
      let i = 0;
      let wasWord = false;

      for (let char of item) {
        let isNotWord = notChars.includes(char);

        // if empty textItem
        if (!textItem) {
          textItem = char;

          // if not empty textItem
        } else {
          // if word
          if (wasWord) {
            // if word continues
            if (!isNotWord) {
              textItem += char;
              // if word finished
            } else {
              textArray.push(<Word key={`w-${index}-${i}`} text={textItem}/>);
              textItem = char;
            }
            // if not word
          } else {
            // if not word continues
            if (isNotWord) {
              textItem += char;
              // if not word finished
            } else {
              textArray.push(<span key={`s-${index}-${i}`}>{textItem}</span>);
              textItem = char;
            }
          }
        }

        wasWord = !isNotWord;
        i++;
      }

      if (wasWord) {
        textArray.push(<Word key={`w-${index}-${i}`} text={textItem}/>);
      } else {
        textArray.push(<span key={`s-${index}-${i}`}>{textItem}</span>);
      }

      return <p className='paragraph' key={`p-${index}`}>{textArray}</p>;
    }
  );

  return text;
};

export default prepareBook;
