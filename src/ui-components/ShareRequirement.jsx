/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, Text } from "@aws-amplify/ui-react";
export default function ShareRequirement(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="20px"
      direction="column"
      width="481px"
      height="316px"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      position="relative"
      borderRadius="12px"
      padding="10px 10px 10px 10px"
      backgroundColor="rgba(255,255,255,1)"
      {...getOverrideProps(overrides, "ShareRequirement")}
      {...rest}
    >
      <Text
        fontFamily="PT Serif"
        fontSize="20px"
        fontWeight="400"
        color="rgba(0,15,8,1)"
        lineHeight="30.004547119140625px"
        textAlign="center"
        display="block"
        direction="column"
        justifyContent="unset"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="You must create an account&#xA;or log in to share a post."
        {...getOverrideProps(
          overrides,
          "You must create an account or log in to share a post."
        )}
      ></Text>
      <Flex
        gap="6px"
        direction="column"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="center"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Account")}
      >
        <Flex
          gap="10px"
          direction="row"
          width="unset"
          height="unset"
          justifyContent="center"
          alignItems="center"
          shrink="0"
          position="relative"
          borderRadius="100px"
          padding="12px 18px 12px 18px"
          backgroundColor="rgba(28,55,56,1)"
          {...getOverrideProps(overrides, "Button")}
        >
          <Text
            fontFamily="Poppins"
            fontSize="16px"
            fontWeight="500"
            color="rgba(255,255,255,1)"
            lineHeight="24px"
            textAlign="left"
            display="block"
            direction="column"
            justifyContent="unset"
            width="unset"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Sign Up"
            {...getOverrideProps(overrides, "Sign Up")}
          ></Text>
        </Flex>
        <Text
          fontFamily="Poppins"
          fontSize="16px"
          fontWeight="400"
          color="rgba(0,15,8,1)"
          lineHeight="24px"
          textAlign="left"
          display="block"
          direction="column"
          justifyContent="unset"
          width="unset"
          height="unset"
          gap="unset"
          alignItems="unset"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="Log In"
          {...getOverrideProps(overrides, "Log In")}
        ></Text>
      </Flex>
    </Flex>
  );
}
