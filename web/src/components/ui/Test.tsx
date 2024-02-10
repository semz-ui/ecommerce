import React from "react";
import { Button } from "./button";
import { useTheme } from "../ThemeProvider";

function Test() {
  const { setTheme } = useTheme();
  return (
    <>
      <Button onClick={() => setTheme("light")}>Change Theme</Button>
      <Button onClick={() => setTheme("dark")}>Change Theme</Button>
    </>
  );
}

export default Test;
