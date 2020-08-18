import * as React from "react";
import { useState } from "react";
import { render } from "react-dom";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence
} from "framer-motion";

import "./styles.css";

const variants = {
  exit: (chosenArticle) => {
    return {
      zIndex: 0,
      x: chosenArticle === "de" ? -1000 : 1000,
      opacity: 0
    };
  },
  initial: { scale: 0.3 },
  animate: { scale: 1 }
};

const SideContent = (props) => (
  <motion.div
    key={props.key}
    style={{ scale: props.scaleWhileWordMoves }}
    className="content"
    whileHover={{ scale: props.scaleWhileHoverOrTap }}
    whileTap={{ scale: props.scaleWhileHoverOrTap }}
    onClick={props.onClick}
    exit={{ x: props.side === "left" ? "-100vw" : "100vw" }}
    animate={{ x: 0 }}
    initial={{ x: props.side === "left" ? "-100vw" : "100vw" }}
  >
    <p>{props.text}</p>
  </motion.div>
);

const App = () => {
  const wordsWithArticlesAndTranslations = [
    { word: "kat", article: "de", translation: "cat" },
    { word: "hond", article: "de", translation: "dog" }
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const word = wordsWithArticlesAndTranslations[currentWordIndex].word;
  const rightArticle =
    wordsWithArticlesAndTranslations[currentWordIndex].article;
  const translation =
    wordsWithArticlesAndTranslations[currentWordIndex].translation;
  const [chosenArticle, setChosenArticle] = useState(null);
  const x = useMotionValue(0);
  const deScale = useTransform(x, (x) =>
    x < -80 ? Math.min(1 + (-x - 80) / 40, 1.4) : 1
  );
  const hetScale = useTransform(x, (x) =>
    x > 80 ? Math.min(1 + (x - 80) / 40, 1.4) : 1
  );

  const handleAnswerChoise = (article) => {
    setChosenArticle(article);
  };

  const playAgain = () => {
    x.set(0);
    setChosenArticle(null);
    setCurrentWordIndex(
      (currentWordIndex + 1) % wordsWithArticlesAndTranslations.length
    );
  };

  return (
    <>
      <div className="top-container">
        <AnimatePresence exitBeforeEnter>
          {chosenArticle === null && (
            <SideContent
              scaleWhileHoverOrTap={1.4}
              scaleWhileWordMoves={deScale}
              onClick={() => handleAnswerChoise("de")}
              text="de"
              key="de"
              side="left"
            />
          )}
          {chosenArticle !== null && (
            <SideContent
              scaleWhileHoverOrTap={1}
              scaleWhileWordMoves={1}
              text={chosenArticle === rightArticle ? "Right!" : "Wrong!"}
              key="answer"
              side="left"
            />
          )}
        </AnimatePresence>
      </div>
      <div className="middle-container">
        <AnimatePresence custom={chosenArticle}>
          {chosenArticle === null && (
            <motion.div
              key={currentWordIndex}
              className="content"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              style={{ x }}
              variants={variants}
              exit="exit"
              initial="initial"
              animate="animate"
              custom={chosenArticle}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.x < -96) {
                  setChosenArticle("de");
                }
                if (offset.x > 96) {
                  setChosenArticle("het");
                }
              }}
            >
              <p>
                {word}
                <br />
                <span>{translation}</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="bottom-container">
        <AnimatePresence exitBeforeEnter>
          {chosenArticle === null && (
            <SideContent
              scaleWhileHoverOrTap={1.4}
              scaleWhileWordMoves={hetScale}
              onClick={() => handleAnswerChoise("het")}
              text="het"
              key="het"
              side="right"
            />
          )}
          {chosenArticle !== null && (
            <SideContent
              scaleWhileHoverOrTap={1.4}
              scaleWhileWordMoves={1}
              onClick={() => playAgain()}
              text="Play again!"
              key="continue"
              side="right"
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

render(<App />, document.getElementById("root"));
