import * as React from "react";
import { render } from "react-dom";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence
} from "framer-motion";

import "./styles.css";

const App = () => {
  const [state, setState] = React.useState("question");
  const x = useMotionValue(0);
  const deScale = useTransform(x, (x) =>
    x < -80 ? Math.min(1 + (-x - 80) / 40, 1.4) : 1
  );
  const hetScale = useTransform(x, (x) =>
    x > 80 ? Math.min(1 + (x - 80) / 40, 1.4) : 1
  );

  return (
    <>
      <div className="top-container">
        <AnimatePresence exitBeforeEnter>
          {state === "question" && (
            <motion.div
              key="de"
              style={{ scale: deScale }}
              className="content"
              whileHover={{ scale: 1.4 }}
              onClick={() => {
                setState("answer");
              }}
              exit={{ x: "-100vw" }}
              animate={{ x: 0 }}
              initial={{ x: "-100vw" }}
            >
              <p>de</p>
            </motion.div>
          )}
          {state === "answer" && (
            <motion.div
              key="answer"
              style={{ scale: deScale }}
              className="content"
              whileHover={{ scale: 1.4 }}
              onClick={() => {
                setState("question");
              }}
              exit={{ x: "-100vw" }}
              animate={{ x: 0 }}
              initial={{ x: "-100vw" }}
            >
              <p>answer</p>
            </motion.div>
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
          <p>meisje</p>
        </motion.div>
      </div>
      <div className="bottom-container">
        <motion.div
          style={{ scale: hetScale }}
          className="content"
          whileHover={{ scale: 1.4 }}
        >
          <p>het</p>
        </motion.div>
      </div>
    </>
  );
};

render(<App />, document.getElementById("root"));
