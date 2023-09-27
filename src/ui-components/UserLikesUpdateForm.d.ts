/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { UserLikes } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserLikesUpdateFormInputValues = {
    user_sub?: string;
    posts_likes?: string[];
};
export declare type UserLikesUpdateFormValidationValues = {
    user_sub?: ValidationFunction<string>;
    posts_likes?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserLikesUpdateFormOverridesProps = {
    UserLikesUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    user_sub?: PrimitiveOverrideProps<TextFieldProps>;
    posts_likes?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserLikesUpdateFormProps = React.PropsWithChildren<{
    overrides?: UserLikesUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    userLikes?: UserLikes;
    onSubmit?: (fields: UserLikesUpdateFormInputValues) => UserLikesUpdateFormInputValues;
    onSuccess?: (fields: UserLikesUpdateFormInputValues) => void;
    onError?: (fields: UserLikesUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserLikesUpdateFormInputValues) => UserLikesUpdateFormInputValues;
    onValidate?: UserLikesUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UserLikesUpdateForm(props: UserLikesUpdateFormProps): React.ReactElement;
