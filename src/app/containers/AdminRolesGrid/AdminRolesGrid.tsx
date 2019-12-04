import React from 'react';
import {
    Alert, Table
} from 'react-bootstrap';
import {
    FormErrors
} from 'redux-form';

import { Dispatch } from 'redux';

import { RootState } from '../../store';
import { IdType } from '../../api';

import {
    DataTableBase,
    DataTableProps,
    // DataTableSectionPlugin
} from '../../components/Table/DataTable';

import RolesFieldTable from './RolesFieldTable';

// import { fromTimeString } from 'jag-shuber-api';

export interface AdminRolesProps extends DataTableProps {}

export interface AdminRolesDisplayProps extends DataTableProps {

}

class AdminRolesDisplay extends React.PureComponent<AdminRolesDisplayProps, any> {
    render() {
        // const { data = [] } = this.props;

        // TODO: Rip out dummy data
        const testData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
        return (
            <div>
                {/*<h3>Roles</h3>*/}
                <Table responsive={true} striped={true} >
                    <thead>
                        <tr>
                            <th className="text-left">Role Name</th>
                            <th className="text-left">Role Code</th>
                            <th className="text-left">Description</th>
                            <th className="text-left">Start Date</th>
                            <th className="text-left">End Date</th>
                            <th className="text-left">Status</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {testData.map(r => {
                            return (
                                <tr key={r.id}>
                                    <td>Test Role</td>
                                    <td>TEST_ROLE</td>
                                    <td>Ipsum Lorem Dolor</td>
                                    <td>{new Date().toLocaleDateString()}</td>
                                    <td>{new Date().toLocaleDateString()}</td>
                                    <td>
                                        Active
                                    </td>
                                </tr>
                            );
                        })}

                    </tbody>
                </Table>
            </div>
        );
    }
}

export default class AdminRolesGrid extends DataTableBase<AdminRolesProps> {
    name = 'roles';
    formFieldNames = { default: 'roles'};
    title: string = 'Manage Roles';
    FormComponent = (props: DataTableProps<AdminRolesProps>) => (
        <div>
            <RolesFieldTable
                fieldName={this.formFieldNames.default}
                title={''} // Leave this blank
                columns={[
                    RolesFieldTable.RoleCodeColumn('Role Name'),
                    RolesFieldTable.TextFieldColumn('Role Code'),
                    RolesFieldTable.TextFieldColumn('Description'),
                    RolesFieldTable.DateColumn('Start Date', 'startDate'),
                    RolesFieldTable.DateColumn('End Date', 'endDate'),
                    RolesFieldTable.SelectorFieldColumn('Status'),
                    RolesFieldTable.CancelColumn()
                ]}
            />
        </div>
    )

    // TODO: Figure out why Fragments aren't working...
    DisplayComponent = (props: DataTableProps<AdminRolesDisplayProps>) => (
        <div>
            {/*<Alert>No roles exist</Alert>*/}
            <AdminRolesDisplay {...props} />
        </div>
    )

    validate(values: AdminRolesProps = {}): FormErrors | undefined {
        return undefined;
    }

    // TODO: Not sure if this should be roleId or what, I'm not there yet...
    fetchData(roleId: IdType, dispatch: Dispatch<{}>) {
        // TODO: Implement getRoles
        // dispatch(getRoles());
    }

    getData(roleId: IdType, state: RootState) {
        return {
        };
    }

    getDataFromFormValues(formValues: {}): DataTableProps {
        return super.getDataFromFormValues(formValues) || {
        };
    }
}
