import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

import Word from './Word';

const styles = theme => ({
  root: {
    //width: '80%',
    //height: '100%',
    position: 'absolute',
    top: '60px',
    left: '100px',
    right: '100px',
    bottom: '50px',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    // borderStyle: 'solid',
    // borderWidth: '1px',
    // borderColor: '1px'
  },
  invisibleText: {
    visibility: 'hidden'
  }
  // text: {
  //   whiteSpace: 'pre-wrap'
  // }
});

class Book extends React.Component{
  constructor() {
    super();

    this.state = {
      bookContentLength: 0
    };
  }

  componentDidMount() {
    const div = document.getElementById('book-container');
    const innerDiv = document.getElementById('inner-span');
    const bookContent = this.props.bookContent;

    const textArray = bookContent
      .filter(item => !!item)
      .map((item) => (
        '<p>' + item + '</p>'
      ));

    let string = '';
    const paragraphsCount = textArray.length;

    for (let i = 0; i < paragraphsCount; i++) {
      string += textArray[i];
      innerDiv.innerHTML = string;

      if (div.clientHeight < div.scrollHeight) {
        innerDiv.innerHTML = '';
        this.setState({bookContentLength: i});
        break;
      }
    }

    if (!this.props.bookContent.length && this.props.user) {
      this.props.loadBook();
    }
  }

  render() {
    const content = this.props.bookContent || [];
    const notChars = [' ', '-', '=', '+', '*', '&', '?', '%', ';', ':', '$', '#', '@', '!', ',', '.', '/', '\\',
      '—', '"', '(', ')', '{', '}', '«', '»', '…', '[', ']'];

    const text = content
      .filter(item => !!item)
      .slice(0, this.state.bookContentLength)
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
                textArray.push(<Word key={`w-${index}-${i}`} text={textItem} />);
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
          textArray.push(<Word key={`w-${index}-${i}`} text={textItem} />);
        } else {
          textArray.push(<span key={`s-${index}-${i}`}>{textItem}</span>);
        }

        return <p key={`p-${index}`}>{textArray}</p>;
      }
    );

    return (
      <Paper className={this.props.classes.root} id="book-container">
        <div className={this.props.classes.text}>{text}</div>
        <div id='inner-span' className={this.props.classes.invisibleText}>hidden text</div>
      </Paper>
    );
  }
}

Book.propTypes = {
  classes: PropTypes.object.isRequired,
  bookContent: PropTypes.array.isRequired,
  //activeBook: PropTypes.object.isRequired
};

export default withStyles(styles)(Book);
