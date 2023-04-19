import React from "react";
import tw from "twin.macro";
import styled from "@emotion/styled";
import { SvgProps } from "../../types";

const SvgContainer = styled.svg`
  ${tw`fill-current`}
  ${({ color }) => (color != null ? `color: ${color};` : null)}
`;

const CheckIcon: React.FC<SvgProps> = ({ height = 24, width = 24, color }) => (
  <SvgContainer
    width={width}
    color={color}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
  </SvgContainer>
);

export default CheckIcon;
