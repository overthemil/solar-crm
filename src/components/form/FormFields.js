/* eslint-disable react/prop-types */
// Material UI
import { FormHelperText, Grid } from '@mui/material';
import React from 'react';
import { v4 as uuid } from 'uuid';
import { AutocompleteField } from './fields/AutocompleteField';

// Project Import
import { InputField } from './fields/InputField';
import { MultiAutocompleteField } from './fields/MultiAutocompleteField';
import { PasswordField } from './fields/PasswordField';
import { SelectField } from './fields/SelectField';
import { UploadField } from './fields/UploadField';

export const FormFields = ({ fields, formik, width = 6 }) => {
  return (
    <Grid item container spacing={2} xs={12} md={width}>
      {fields.map((field) => {
        if (field.hidden) {
          return null;
        }
        if (field.variant === 'Input') {
          return (
            <React.Fragment key={field.id}>
              <Grid item xs={field.width || 6}>
                <InputField
                  error={field.error}
                  touched={field.touched}
                  label={field.label}
                  name={field.name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type={field.type}
                  value={field.value}
                  placeholder={field.placeholder}
                />
              </Grid>
            </React.Fragment>
          );
        } else if (field.variant === 'Password') {
          return (
            <React.Fragment key={field.id}>
              <Grid item xs={field.width || 6}>
                <PasswordField
                  error={field.error}
                  touched={field.touched}
                  label={field.label}
                  name={field.name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type={field.type}
                  value={field.value}
                  placeholder={field.placeholder}
                />
              </Grid>
            </React.Fragment>
          );
        } else if (field.variant === 'Select') {
          return (
            <React.Fragment key={field.id}>
              <Grid item xs={field.width || 6}>
                <SelectField
                  error={field.error}
                  touched={field.touched}
                  label={field.label}
                  name={field.name}
                  onChange={formik.handleChange}
                  value={field.value}
                  options={field.options}
                />
              </Grid>
            </React.Fragment>
          );
        } else if (field.variant === 'MultiAutocomplete') {
          return (
            <React.Fragment key={field.id}>
              <Grid item xs={field.width || 6}>
                <MultiAutocompleteField
                  error={field.error}
                  touched={field.touched}
                  label={field.label}
                  name={field.name}
                  options={field.options}
                  onChange={formik.handleChange}
                  value={field.value}
                  placeholder={field.placeholder}
                />
              </Grid>
            </React.Fragment>
          );
        } else if (field.variant === 'Autocomplete') {
          return (
            <React.Fragment key={field.id}>
              <Grid item xs={field.width || 6}>
                <AutocompleteField
                  formik={field.formik}
                  initialValue={field.initialValue}
                  error={field.error}
                  touched={field.touched}
                  label={field.label}
                  name={field.name}
                  options={field.options}
                  placeholder={field.placeholder}
                />
              </Grid>
            </React.Fragment>
          );
        } else if (field.variant === 'Upload') {
          return (
            <React.Fragment key={field.id}>
              <Grid item xs={field.width || 6}>
                <UploadField
                  allowMultiple={field.multiple}
                  formik={formik}
                  name={field.name}
                  onUpload={field.onUpload}
                  onDelete={field.onDelete}
                  label={field.label}
                  touched={field.touched}
                  error={field.error}
                />
              </Grid>
            </React.Fragment>
          );
        } else if (field.variant === 'Custom') {
          return <React.Fragment key={uuid()}>{field.customComponent}</React.Fragment>;
        }
        return (
          <React.Fragment key={uuid()}>
            <Grid item xs={12}></Grid>
          </React.Fragment>
        );
      })}
      {formik.errors.submit && (
        <Grid item xs={12}>
          <FormHelperText error>{formik.errors.submit}</FormHelperText>
        </Grid>
      )}
    </Grid>
  );
};
