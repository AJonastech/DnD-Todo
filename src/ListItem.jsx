import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useRef } from "react";
function ListItem({ index, listItem, setListItems, listItems }) {
  
//Handles Drag logic as item leaves  or starts dragging
  const listTarget = useRef();
  const handleDragInit = (e, position) => {
    listTarget.current = position;
    e.target.classList.add("custom");
    e.dataTransfer.setData(
      "List",
      JSON.stringify(
        listItems.filter((item) => item.input === e.target.innerHTML)
      )
    );
  };
  const handleDragEnd = (e) => {
    e.target.classList.remove("custom");
    setListItems(listItems.filter((item) => item.input !== e.target.innerHTML));
  };
  const handleDragLeave = (e) => {
    // console.log(e.dataTransfer.getData("List"));
  };

  return (
    <div
      id={`draggable_item_${index}`}
      key={index}
      className={`flex items-start border-[1px] border-inherit shadow-lg  h-full  w-full break-words rounded-lg bg-white hover:bg-black/20 `}
    >
      <p
        ref={listTarget}
        draggable
        onDragLeave={(e) => {
          handleDragLeave(e);
        }}
        onDragEnd={(e) => {
          handleDragEnd(e);
        }}
        onDragStart={(e) => {
          handleDragInit(e, index);
        }}
        className=" w-full h-full overflow-hidden    grow   border-black   text-ellipsis   break-words py-2 px-4 "
      >
        {listItem.input}
      </p>

      <button
        className="p-2 w-fit  rounded-md"
        onClick={() => {
          const newList = listItems.filter((listItem) => listItem.id !== index);
          console.log(newList);
          setListItems(newList);
          //setFormVisibility((prev) => !prev);
        }}
      >
        <AiOutlineClose className="w-4 text-xl " />
      </button>
    </div>
  );
}

export default ListItem;
