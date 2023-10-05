/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { PostComments } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PostCommentsUpdateFormInputValues = {
    s3url?: string;
    users_comments?: string[];
};
export declare type PostCommentsUpdateFormValidationValues = {
    s3url?: ValidationFunction<string>;
    users_comments?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PostCommentsUpdateFormOverridesProps = {
    PostCommentsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    s3url?: PrimitiveOverrideProps<TextFieldProps>;
    users_comments?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type PostCommentsUpdateFormProps = React.PropsWithChildren<{
    overrides?: PostCommentsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    postComments?: PostComments;
    onSubmit?: (fields: PostCommentsUpdateFormInputValues) => PostCommentsUpdateFormInputValues;
    onSuccess?: (fields: PostCommentsUpdateFormInputValues) => void;
    onError?: (fields: PostCommentsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PostCommentsUpdateFormInputValues) => PostCommentsUpdateFormInputValues;
    onValidate?: PostCommentsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PostCommentsUpdateForm(props: PostCommentsUpdateFormProps): React.ReactElement;
