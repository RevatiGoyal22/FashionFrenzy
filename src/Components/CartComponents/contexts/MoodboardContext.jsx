import React, { createContext, useState, useContext } from "react";

export const MoodboardContext = createContext();

export const useMoodboard = () => useContext(MoodboardContext);

export const MoodboardProvider = ({ children }) => {
  const [moodboardItems, setMoodboardItems] = useState({
    party: [],
    sport: [],
    wanderlust: [],
    sanskari: [],
    casual: [],
    formal: [],
  });

  const addToMoodboard = (item,category) => {
     if (!["party", "sport", "wanderlust","sanskari","casual","formal"].includes(category)) {
       console.error("Invalid category provided to addToMoodboard");
       return;
     }
    setMoodboardItems((moodboardItems)=> ({
      ...moodboardItems,
      [category]: [...moodboardItems[category],item],
    }));
    console.log(`Added to ${category}:`, item);
  };

  const removeFromMoodboard = (item,category) => {
    setMoodboardItems((moodboardItems) =>({
      ...moodboardItems,
      [category]:moodboardItems[category].filter((i) => i !== item)
      ,}));
  };

  return (
    <MoodboardContext.Provider
      value={{ moodboardItems, addToMoodboard, removeFromMoodboard }}
    >
      {children}
    </MoodboardContext.Provider>
  );
};
