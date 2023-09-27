/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserLikesCreateFormInputValues = {
    user_sub?: string;
    posts_likes?: string[];
};
export declare type UserLikesCreateFormValidationValues = {
    user_sub?: ValidationFunction<string>;
    posts_likes?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserLikesCreateFormOverridesProps = {
    UserLikesCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    user_sub?: PrimitiveOverrideProps<TextFieldProps>;
    posts_likes?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserLikesCreateFormProps = React.PropsWithChildren<{
    overrides?: UserLikesCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UserLikesCreateFormInputValues) => UserLikesCreateFormInputValues;
    onSuccess?: (fields: UserLikesCreateFormInputValues) => void;
    onError?: (fields: UserLikesCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserLikesCreateFormInputValues) => UserLikesCreateFormInputValues;
    onValidate?: UserLikesCreateFormValidationValues;
} & React.CSSProperties>;
export default function UserLikesCreateForm(props: UserLikesCreateFormProps): React.ReactElement;
