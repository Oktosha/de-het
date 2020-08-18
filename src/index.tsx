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

const SideContent = (props) => (
  <motion.div
    key={props.key}
    style={{ scale: props.scaleWhileWordMoves }}
    className="content"
    whileHover={{ scale: props.scaleWhileHover }}
    onClick={props.onClick}
    exit={{ x: props.side === "left" ? "-100vw" : "100vw" }}
    animate={{ x: 0 }}
    initial={{ x: props.side === "left" ? "-100vw" : "100vw" }}
  >
    <p>{props.text}</p>
  </motion.div>
);

const App = () => {
  const word = "meisje";
  const rightArticle = "het";
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
    setChosenArticle(null);
  };

  return (
    <>
      <div className="top-container">
        <AnimatePresence exitBeforeEnter>
          {chosenArticle === null && (
            <SideContent
              scaleWhileHover={1.4}
              scaleWhileWordMoves={deScale}
              onClick={() => handleAnswerChoise("de")}
              text="de"
              key="de"
              side="left"
            />
          )}
          {chosenArticle !== null && (
            <SideContent
              scaleWhileHover={1}
              scaleWhileWordMoves={1}
              text={chosenArticle === rightArticle ? "Right!" : "Wrong!"}
              key="answer"
              side="left"
            />
          )}
        </AnimatePresence>
      </div>
      <div className="middle-container">
        <motion.div
          className="content"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          style={{ x }}
        >
          <p>{word}</p>
        </motion.div>
      </div>
      <div className="bottom-container">
        <AnimatePresence exitBeforeEnter>
          {chosenArticle === null && (
            <SideContent
              scaleWhileHover={1.4}
              scaleWhileWordMoves={hetScale}
              onClick={() => handleAnswerChoise("het")}
              text="het"
              key="het"
              side="right"
            />
          )}
          {chosenArticle !== null && (
            <SideContent
              scaleWhileHover={1.4}
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
