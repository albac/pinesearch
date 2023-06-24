/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex } from "@aws-amplify/ui-react";
export default function Tag(props) {
  const { post, overrides, ...rest } = props;
  return (
    <Flex
      gap="10px"
      direction="row"
      width="unset"
      height="unset"
      justifyContent="center"
      alignItems="center"
      position="relative"
      borderRadius="100px"
      padding="8px 14px 8px 14px"
      backgroundColor="rgba(242,245,244,1)"
      children={post?.title}
      {...getOverrideProps(overrides, "Tag")}
      {...rest}
    ></Flex>
  );
}
