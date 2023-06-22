/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AIChatOverridesProps = {
    AIChat?: PrimitiveOverrideProps<FlexProps>;
    AI?: PrimitiveOverrideProps<ViewProps>;
    Vector73392?: PrimitiveOverrideProps<IconProps>;
    Vector73393?: PrimitiveOverrideProps<IconProps>;
    Vector73394?: PrimitiveOverrideProps<IconProps>;
    "Neuroscience is the scientific study of the nervous system, including the brain, spinal cord, and nerves. It explores the structure and function of neurons, neural networks, and the relationships between brain activity and behavior, cognition, and mental processes."?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type AIChatProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: AIChatOverridesProps | undefined | null;
}>;
export default function AIChat(props: AIChatProps): React.ReactElement;
