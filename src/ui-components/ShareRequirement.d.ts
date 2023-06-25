/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, TextProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ShareRequirementOverridesProps = {
    ShareRequirement?: PrimitiveOverrideProps<FlexProps>;
    "You must create an account or log in to share a post."?: PrimitiveOverrideProps<TextProps>;
    Account?: PrimitiveOverrideProps<FlexProps>;
    Button?: PrimitiveOverrideProps<FlexProps>;
    "Sign Up"?: PrimitiveOverrideProps<TextProps>;
    "Log In"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type ShareRequirementProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: ShareRequirementOverridesProps | undefined | null;
}>;
export default function ShareRequirement(props: ShareRequirementProps): React.ReactElement;
