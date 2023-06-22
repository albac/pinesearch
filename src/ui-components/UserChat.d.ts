/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserChatOverridesProps = {
    UserChat?: PrimitiveOverrideProps<FlexProps>;
    User?: PrimitiveOverrideProps<ViewProps>;
    "ph:user-fill"?: PrimitiveOverrideProps<ViewProps>;
    Vector?: PrimitiveOverrideProps<IconProps>;
    "What is neuroscience?"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type UserChatProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: UserChatOverridesProps | undefined | null;
}>;
export default function UserChat(props: UserChatProps): React.ReactElement;
