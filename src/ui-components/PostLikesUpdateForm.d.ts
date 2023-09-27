/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { PostLikes } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PostLikesUpdateFormInputValues = {
    s3url?: string;
    users_likes?: string[];
};
export declare type PostLikesUpdateFormValidationValues = {
    s3url?: ValidationFunction<string>;
    users_likes?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PostLikesUpdateFormOverridesProps = {
    PostLikesUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    s3url?: PrimitiveOverrideProps<TextFieldProps>;
    users_likes?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PostLikesUpdateFormProps = React.PropsWithChildren<{
    overrides?: PostLikesUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    postLikes?: PostLikes;
    onSubmit?: (fields: PostLikesUpdateFormInputValues) => PostLikesUpdateFormInputValues;
    onSuccess?: (fields: PostLikesUpdateFormInputValues) => void;
    onError?: (fields: PostLikesUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PostLikesUpdateFormInputValues) => PostLikesUpdateFormInputValues;
    onValidate?: PostLikesUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PostLikesUpdateForm(props: PostLikesUpdateFormProps): React.ReactElement;
