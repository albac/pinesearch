/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, Image, Text } from "@aws-amplify/ui-react";
export default function SearchResult(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="17px"
      direction="row"
      width="740px"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "SearchResult")}
      {...rest}
    >
      <Image
        width="104px"
        height="104px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        shrink="0"
        position="relative"
        borderRadius="12px"
        padding="0px 0px 0px 0px"
        objectFit="cover"
        {...getOverrideProps(overrides, "Image")}
      ></Image>
      <Flex
        gap="12px"
        direction="column"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-start"
        grow="1"
        shrink="1"
        basis="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Text Group")}
      >
        <Text
          fontFamily="Poppins"
          fontSize="22px"
          fontWeight="700"
          color="rgba(0,15,8,1)"
          lineHeight="27.5px"
          textAlign="left"
          display="block"
          direction="column"
          justifyContent="unset"
          width="unset"
          height="unset"
          gap="unset"
          alignItems="unset"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="Exploring the Role of Gut Microbiota in Human Metabolism and Disease"
          {...getOverrideProps(
            overrides,
            "Exploring the Role of Gut Microbiota in Human Metabolism and Disease"
          )}
        ></Text>
        <Text
          fontFamily="PT Serif"
          fontSize="16px"
          fontWeight="400"
          color="rgba(0,15,8,1)"
          lineHeight="24.003637313842773px"
          textAlign="left"
          display="block"
          direction="column"
          justifyContent="unset"
          width="unset"
          height="unset"
          gap="unset"
          alignItems="unset"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="Explores the ecological consequences of microplastic pollution on aquatic ecosystems. This research investigates how microplastics, tiny plastic..."
          {...getOverrideProps(
            overrides,
            "Explores the ecological consequences of microplastic pollution on aquatic ecosystems. This research investigates how microplastics, tiny plastic..."
          )}
        ></Text>
      </Flex>
    </Flex>
  );
}
