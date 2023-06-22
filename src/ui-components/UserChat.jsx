/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, Icon, Text, View } from "@aws-amplify/ui-react";
export default function UserChat(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="16px"
      direction="row"
      width="unset"
      height="unset"
      justifyContent="flex-start"
      alignItems="center"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "UserChat")}
      {...rest}
    >
      <View
        width="32px"
        height="32px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        overflow="hidden"
        shrink="0"
        position="relative"
        border="1px SOLID rgba(77,72,71,1)"
        borderRadius="20px"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "User")}
      >
        <View
          width="22px"
          height="22px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          overflow="hidden"
          position="absolute"
          top="5px"
          left="5px"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "ph:user-fill")}
        >
          <Icon
            width="17.87px"
            height="17.19px"
            viewBox={{
              minX: 0,
              minY: 0,
              width: 17.8740234375,
              height: 17.1898193359375,
            }}
            paths={[
              {
                d: "M17.7823 16.8461C17.722 16.9506 17.6352 17.0374 17.5306 17.0978C17.4261 17.1581 17.3075 17.1899 17.1868 17.1898L0.686795 17.1898C0.566173 17.1897 0.447707 17.1579 0.343292 17.0975C0.238877 17.0371 0.152189 16.9503 0.0919313 16.8458C0.031674 16.7413 -3.09446e-05 16.6228 2.26632e-08 16.5022C3.09899e-05 16.3815 0.0317967 16.2631 0.0921077 16.1586C1.40094 13.8959 3.41789 12.2734 5.77172 11.5042C4.60741 10.8111 3.70281 9.75494 3.19685 8.49794C2.69088 7.24095 2.61152 5.85262 2.97096 4.54616C3.3304 3.2397 4.10876 2.08735 5.1865 1.26607C6.26425 0.444792 7.58179 0 8.93679 0C10.2918 3.05311e-16 11.6093 0.444792 12.6871 1.26607C13.7648 2.08735 14.5432 3.2397 14.9026 4.54616C15.2621 5.85262 15.1827 7.24095 14.6767 8.49794C14.1708 9.75494 13.2662 10.8111 12.1019 11.5042C14.4557 12.2734 16.4727 13.8959 17.7815 16.1586C17.842 16.263 17.8739 16.3815 17.874 16.5022C17.8742 16.6229 17.8426 16.7415 17.7823 16.8461Z",
                fill: "rgba(77,72,71,1)",
                fillRule: "nonzero",
              },
            ]}
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            position="absolute"
            top="9.36%"
            bottom="12.5%"
            left="9.38%"
            right="9.38%"
            {...getOverrideProps(overrides, "Vector")}
          ></Icon>
        </View>
      </View>
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
        children="What is neuroscience?"
        {...getOverrideProps(overrides, "What is neuroscience?")}
      ></Text>
    </Flex>
  );
}
