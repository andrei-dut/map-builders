import React from "react";
import styled from "styled-components";
import { ReactComponent as CloseSlideSvg } from "../icons/closeSlide.svg";
import { testSlide } from "../slides";
// import PdfViewer from "./PdfViewer";

const WrapSlide = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  padding: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  
  .slide {
    position: relative;
    max-width: 100%;
    height: 100%;
    background: #fff;
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
    & > img {
      border-radius: 12px;
      overflow: hidden;
      height: 100%;
      object-fit: contain;
      width: 100%;
    }
  }
  .slide__close {
    border: none;
    background: transparent;
    outline: none;
    cursor: pointer;
    display: flex;
    position: absolute;
    top: -28px;
    right: -28px;
  }
`;

const PreviewSlide = ({ setSlideId, slideId }) => {
  if (!slideId) return null;

  return (
    <WrapSlide>
      <div className="slide">
        <button className="slide__close" onClick={() => setSlideId(null)}>
          <CloseSlideSvg />
        </button>
        {/* <PdfViewer/> */}
        <img src={testSlide} alt={slideId} />
      </div>
    </WrapSlide>
  );
};

export default PreviewSlide;
