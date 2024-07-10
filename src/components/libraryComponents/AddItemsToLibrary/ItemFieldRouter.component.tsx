import { FieldType } from '@/utils/libraries/templates';
import { DateField } from './DateField.component';
import { MultiSelectField } from './MultiSelectField.component';
import { NumberField } from './NumberField.component';
import { SelectField } from './SelectField.component';
import { StringField } from './StringField.component';

type routerProps = {
  fieldTitle: string;
  type: FieldType;
};

export type FieldProps = {
  fieldTitle: string;
};

export const ItemFieldRouter = (props: routerProps) => {
  switch (props.type) {
    case 'string':
      return <StringField fieldTitle={props.fieldTitle} />;
    case 'number':
      return <NumberField fieldTitle={props.fieldTitle} />;
    case 'date':
      return <DateField fieldTitle={props.fieldTitle} />;
    case 'select':
      return <SelectField fieldTitle={props.fieldTitle} />;
    case 'multiSelect':
      return <MultiSelectField fieldTitle={props.fieldTitle} />;
    default:
      return <StringField fieldTitle={props.fieldTitle} />;
  }
};
