import React from "react";
import tw from "twin.macro";
import { SvgProps } from "../../types";

const SvgContainer = tw.svg`
  fill-current hover:text-pink
`;

const TrashIcon: React.FC<SvgProps> = ({ height = 24, width = 24 }) => (
  <SvgContainer width={width} height={height} viewBox="0 0 24 24" fill="none">
    <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" />
  </SvgContainer>
);

export default TrashIcon;
