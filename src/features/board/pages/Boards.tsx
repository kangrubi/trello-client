import React, { useEffect, useState } from "react";
import useBoard from "../hooks/useBoard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Boards = () => {
  const { getBoards, postBoards } = useBoard();

  const [selectedColor, setSelectedColor] = useState<string>("");

  const backgroundColor = [
    { color: "#ff9a9e" },
    { color: "#a18cd1" },
    { color: "#a1c4fd" },
  ];

  useEffect(() => {
    (async () => {
      await getBoards();
    })();
  }, []);

  const handleSubmitBoardForm = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    const target = event.currentTarget;

    const formData = new FormData(target);

    const title = formData.get("title");

    if (title === null) return;

    await postBoards({
      backgroundImage: "",
      backgroundColor: selectedColor,
      title: title as string,
    });
  };

  const handleClickColor = (color: string) => {
    setSelectedColor(color);
  };

  console.log(selectedColor);

  return (
    <div>
      <form onSubmit={handleSubmitBoardForm}>
        <ul>
          {backgroundColor.map((color) => (
            <li
              key={JSON.stringify(color)}
              onClick={() => handleClickColor(color.color)}
            >
              {color.color}
            </li>
          ))}
        </ul>
        <Label>Title</Label>
        <Input type="text" placeholder="title" name="title" />
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
};

export default Boards;
