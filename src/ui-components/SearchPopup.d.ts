/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SearchPopupOverridesProps = {
    SearchPopup?: PrimitiveOverrideProps<ViewProps>;
    Search?: PrimitiveOverrideProps<ViewProps>;
    "Ask a question about Science, Law, or Education..."?: PrimitiveOverrideProps<TextProps>;
    "ph:magnifying-glass-bold"?: PrimitiveOverrideProps<ViewProps>;
    Vector73192?: PrimitiveOverrideProps<IconProps>;
    "ph:arrow-circle-right-fill73193"?: PrimitiveOverrideProps<ViewProps>;
    Vector73194?: PrimitiveOverrideProps<IconProps>;
    ExampleThree?: PrimitiveOverrideProps<FlexProps>;
    "\u201CWhat are the cultural, and psychological factors that influence human behavior\u201D"?: PrimitiveOverrideProps<TextProps>;
    "ph:arrow-circle-right-fill73206"?: PrimitiveOverrideProps<ViewProps>;
    Vector73207?: PrimitiveOverrideProps<IconProps>;
    ExampleTwo?: PrimitiveOverrideProps<FlexProps>;
    "\u201CWhat is the nature of consciousness, and how does it arise in the brain?\u201D"?: PrimitiveOverrideProps<TextProps>;
    "ph:arrow-circle-right-fill73202"?: PrimitiveOverrideProps<ViewProps>;
    Vector73203?: PrimitiveOverrideProps<IconProps>;
    ExampleOne?: PrimitiveOverrideProps<FlexProps>;
    "\u201CWhat does the future of quantum computing look like?\u201D"?: PrimitiveOverrideProps<TextProps>;
    "ph:arrow-circle-right-fill73198"?: PrimitiveOverrideProps<ViewProps>;
    Vector73199?: PrimitiveOverrideProps<IconProps>;
    Examples?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type SearchPopupProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: SearchPopupOverridesProps | undefined | null;
}>;
export default function SearchPopup(props: SearchPopupProps): React.ReactElement;
