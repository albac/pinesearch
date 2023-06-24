/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, Icon, Text, View } from "@aws-amplify/ui-react";
export default function FilterTime(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="10px"
      direction="row"
      width="331px"
      height="53px"
      justifyContent="space-between"
      alignItems="center"
      overflow="hidden"
      position="relative"
      border="1px SOLID rgba(139,170,173,1)"
      borderRadius="12px"
      padding="9px 18px 9px 18px"
      {...getOverrideProps(overrides, "FilterTime")}
      {...rest}
    >
      <Text
        fontFamily="Poppins"
        fontSize="16px"
        fontWeight="400"
        color="rgba(77,72,71,1)"
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
        children="Last 30 days"
        {...getOverrideProps(overrides, "Last 30 days")}
      ></Text>
      <View
        width="23px"
        height="23px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        overflow="hidden"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "ph:caret-down-bold")}
      >
        <Icon
          width="16.54px"
          height="9.35px"
          viewBox={{
            minX: 0,
            minY: 0,
            width: 16.536788940429688,
            height: 9.349166870117188,
          }}
          paths={[
            {
              d: "M16.2187 1.84457L9.03117 9.03207C8.93101 9.13258 8.81199 9.21233 8.68094 9.26674C8.54989 9.32116 8.40939 9.34917 8.2675 9.34917C8.1256 9.34917 7.9851 9.32116 7.85405 9.26674C7.723 9.21233 7.60398 9.13258 7.50382 9.03207L0.316323 1.84457C0.113785 1.64203 -3.01806e-09 1.36733 0 1.08089C3.01806e-09 0.794461 0.113785 0.51976 0.316323 0.317222C0.518862 0.114683 0.793563 0.000898633 1.08 0.000898629C1.36643 0.000898626 1.64113 0.114683 1.84367 0.317222L8.26839 6.74195L14.6931 0.316324C14.8957 0.113785 15.1704 0 15.4568 0C15.7432 0 16.0179 0.113785 16.2205 0.316324C16.423 0.518862 16.5368 0.793563 16.5368 1.08C16.5368 1.36643 16.423 1.64113 16.2205 1.84367L16.2187 1.84457Z",
              fill: "rgba(139,170,173,1)",
              fillRule: "nonzero",
            },
          ]}
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="32.8%"
          bottom="26.55%"
          left="14.05%"
          right="14.05%"
          {...getOverrideProps(overrides, "Vector")}
        ></Icon>
      </View>
    </Flex>
  );
}
