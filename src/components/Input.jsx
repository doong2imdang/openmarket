import React from "react";
import styled, { css } from "styled-components";

export default function Input(props) {
  const { type, title, inputId, border, borderRadius } = props;
  return (
    <>
      <LabelStyle htmlFor={inputId} {...props}>
        {title}
      </LabelStyle>
      <InputStyle
        type={type ? type : "text"}
        id={inputId}
        border={border}
        borderRadius={borderRadius}
        {...props}
      />
    </>
  );
}

const LabelStyle = styled.label`
  color: var(--color-grey);
  font-size: 16px;
  margin: 6px 0 12px 0;
`;

const InputStyle = styled.input`
  padding: 20px 0;
  font-size: 16px;
  ${(props) =>
    props.border
      ? css`
          border: ${props.border};
        `
      : css`
          border-bottom: 1px solid var(--color-maingrey);
        `}

  ${(props) =>
    props.borderRadius &&
    css`
      border-radius: ${props.borderRadius};
    `}
  &::placeholder {
    color: var(--color-grey);
  }
  margin-bottom: 7px;
`;
