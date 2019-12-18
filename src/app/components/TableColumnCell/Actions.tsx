import * as React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

import * as Types from './types';
import { FieldsProps } from 'redux-form';
import { Leave } from '../../api';

// TODO: Move these into generics!
import CancelledPopover from '../../components/CancelledPopover';
import RemoveRow from '../TableColumnActions/RemoveRow';
import ExpireRow from '../TableColumnActions/ExpireRow';

export interface ColumnRendererProps {
    index: number;
    fields: FieldsProps<Partial<Leave>>;
    model: Partial<any>;
    fieldInstanceName: string;
}

export type ColumnRenderer = React.ComponentType<ColumnRendererProps>;

const ActionsColumn = (options?: Types.FieldColumnOptions): Types.TableColumnCell => {
    const colStyle = (options && options.colStyle) ? options.colStyle : {};

    return {
        title: '',
        colStyle: colStyle,
        // TODO: Don't hardcode in the formName! This is just in here while I work on some save related stuff...
        FormRenderer: ({ fields, index, model }) => (
            !model.id ?
                (
                    <>
                        <RemoveRow fields={fields} index={index} model={model} />
                    </>

                )
                :
                (
                    <>
                        <ExpireRow fields={fields} index={index} model={model} />
                    </>
                )

        ),
        CanceledRender: ({ model }) => (
            <CancelledPopover model={model} />
        )
    };
};

export default ActionsColumn;
