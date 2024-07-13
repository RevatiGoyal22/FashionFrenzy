import React, { createContext, useState, useContext } from "react";

export const MoodboardContext = createContext();

export const useMoodboard = () => useContext(MoodboardContext);

export const MoodboardProvider = ({ children }) => {
  const [moodboardItems, setMoodboardItems] = useState([]);

  const addToMoodboard = (item) => {
    setMoodboardItems([...moodboardItems, item]);
  };

  const removeFromMoodboard = (item) => {
    setMoodboardItems((moodboardItems) => moodboardItems.filter((i) => i !== item));
  };

  return (
    <MoodboardContext.Provider
      value={{ moodboardItems, addToMoodboard, removeFromMoodboard }}
    >
      {children}
    </MoodboardContext.Provider>
  );
};
