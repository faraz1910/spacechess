import "./Pieces.css";
import Piece from "./Piece";
import { useState, useRef } from "react";
import { createPosition, copyPosition } from "../../helper";
import { useAppContext } from "../../contexts/Context";
import { makeNewMove } from "../../reducer/actions/move";

const Pieces = () => {

  const ref = useRef()

  const {appState,dispatch} = useAppContext();

  const currentPosition = appState.position

  const calculateCoords = e => {
    const {width,left,top} = ref.current.getBoundingClientRect()
    const size = width / 8
    const y = Math.floor((e.clientX - left) / size)
    const x = 7 -  Math.floor((e.clientY - top) / size)
    return {x,y}
  }

  const onDrop = (e) => {
    const newPosition = copyPosition(currentPosition)
    const {x,y} = calculateCoords(e)

    const [p,rank,file] = e.dataTransfer.getData('text').split(',')

    newPosition[rank][file] = ''
    newPosition[x][y] = p

    dispatch(makeNewMove({newPosition}))
  };

  const onDragOver = e => e.preventDefault()

  return (
    <div 
    ref={ref}
    onDragOver={onDragOver}
    onDrop={onDrop} 
    className="pieces">
      {currentPosition.map((r, rank) =>
        r.map((f, file) =>
        currentPosition[rank][file] ? (
            <Piece
              key={rank + "-" + file}
              rank={rank}
              file={file}
              piece={currentPosition[rank][file]}
            />
          ) : null
        )
      )}
    </div>
  );
};

export default Pieces;
