import React from 'react';
import { Glyphicon, Well } from 'react-bootstrap';

import { connect, Dispatch } from 'react-redux';

import Page, { PageToolbar } from '../components/Page/Page';

import AdminForm from '../containers/AdminForm';
import * as AdminFormTemplates from '../components/AdminForm';
import { AdminFormProps } from '../components/AdminForm/AdminForm';

import PageTitle from '../containers/PageTitle';

import WorkSectionsLayout from '../plugins/AdminAssignmentTypes/WorkSectionsLayout';

import AdminCourtroomsPlugin from '../plugins/AdminAssignmentTypes/AdminCourtrooms';
import AdminCourtRolesPlugin from '../plugins/AdminAssignmentTypes/AdminCourtRoles';
import AdminJailRolesPlugin from '../plugins/AdminAssignmentTypes/AdminJailRoles';
import AdminEscortTypesPlugin from '../plugins/AdminAssignmentTypes/AdminEscortTypes';
import AdminOtherTypesPlugin from '../plugins/AdminAssignmentTypes/AdminOtherTypes';

import { selectedAdminRolesSection as selectedAdminFormSection } from '../modules/roles/selectors';
import { selectAdminRolesPluginSection } from '../modules/roles/actions';

import { RootState } from '../store';

export interface ManageAssignmentTypesStateProps {
    selectedSection?: any; // TODO: Think it's a string, always though?
}

export interface ManageAssignmentTypesDispatchProps {
    selectAdminFormSection: (sectionName: string) => any;
}

export interface ManageAssignmentTypesProps extends
    ManageAssignmentTypesStateProps, ManageAssignmentTypesDispatchProps {}

class ManageCodeTypes extends React.PureComponent<AdminFormProps & ManageAssignmentTypesProps> {
    static defaultProps: Partial<ManageAssignmentTypesProps> = {
        selectedSection: 'ADMIN_COURTROOMS:ADMIN_COURT_ROLES'
    };

    state = {
      isEditing: true
    };

    constructor(props: AdminFormProps & ManageAssignmentTypesProps) {
        super(props);

        this.toggleEditMode = this.toggleEditMode.bind(this);
    }

    toggleEditMode() {
        this.setState({
            isEditing: !this.state.isEditing
        });
    }

    render() {
        const { isEditing } = this.state;

        const {
            selectAdminFormSection,
            selectedSection = 'ADMIN_COURTROOMS'
        } = this.props;

        return (
            <Page
                disableLocations={false}
                toolbar={
                    <PageToolbar
                        left={(
                            <div style={{ flex: 1, display: 'flex', position: 'relative', justifyContent: 'center', paddingTop: '10px' }} />
                        )}
                        middle={(
                            <>
                                <div style={{ flex: 1, display: 'flex', position: 'relative', justifyContent: 'center', paddingTop: '10px' }}>
                                    <div className={`hidden-xs`} style={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}>
                                        <h6 style={{ color: 'white', fontWeight: 'bold', marginBottom: '3px' }}>Choose Work Section: </h6>
                                    </div>
                                    <div className={`admin-form-filters-toggle admin-form-page-tab${selectedSection === 'ADMIN_COURTROOMS' ? ' is-active' : ''}`} onClick={() => selectAdminFormSection('ADMIN_COURTROOMS')}>
                                        {/* <Glyphicon glyph="chevron-down" /> */}Courtrooms<span className="visible-lg"></span>
                                    </div>
                                    &nbsp;&nbsp;
                                    <div className={`admin-form-filters-toggle admin-form-page-tab${selectedSection === 'ADMIN_COURT_ROLES' ? ' is-active' : ''}`} onClick={() => selectAdminFormSection('ADMIN_COURT_ROLES')}>
                                        {/* <Glyphicon glyph="chevron-down" /> */}Court<span className="hidden-lg">s</span><span className="visible-lg">&nbsp;Roles</span>
                                    </div>
                                    &nbsp;&nbsp;
                                    <div className={`admin-form-filters-toggle admin-form-page-tab${selectedSection === 'ADMIN_JAIL_ROLES' ? ' is-active' : ''}`} onClick={() => selectAdminFormSection('ADMIN_JAIL_ROLES')}>
                                        {/* <Glyphicon glyph="chevron-down" /> */}Jail<span className="hidden-lg">s</span><span className="visible-lg">&nbsp;Roles</span>
                                    </div>
                                    &nbsp;&nbsp;
                                    <div className={`admin-form-filters-toggle admin-form-page-tab${selectedSection === 'ADMIN_ESCORT_TYPES' ? ' is-active' : ''}`} onClick={() => selectAdminFormSection('ADMIN_ESCORT_TYPES')}>
                                        {/* <Glyphicon glyph="chevron-down" /> */}Escort<span className="hidden-lg">s</span><span className="visible-lg">&nbsp;Runs</span>
                                    </div>
                                    &nbsp;&nbsp;
                                    <div className={`admin-form-filters-toggle admin-form-page-tab${selectedSection === 'ADMIN_OTHER_TYPES' ? ' is-active' : ''}`} onClick={() => selectAdminFormSection('ADMIN_OTHER_TYPES')}>
                                        {/* <Glyphicon glyph="chevron-down" /> */}Other<span className="visible-lg">&nbsp;Assignments</span>
                                    </div>
                                </div>
                            </>
                        )}
                        right={(
                            <div style={{ marginTop: 3, paddingTop: '10px' }}>
                                {/* <HeaderSaveButton formName={'AdminForm'} />
                                &nbsp;&nbsp;
                                <HeaderCancelButton formName={'AdminForm'} /> */}
                            </div>
                        )}
                    />
                }
            >
                <Well
                    style={{
                        display: 'flex',
                        backgroundColor: 'white',
                        flexDirection: 'column',
                        flex: '1 1',
                        maxWidth: '100%',
                        height: 'max-content',
                        margin: '0 auto',
                        borderRadius: 0
                    }}
                >
                    <PageTitle title={({ currentLocationName }: any) => `Manage ${currentLocationName} Assignment Types`} />
                    <AdminForm
                        key={'admin-assignment-types-grid'}
                        templateComponent={WorkSectionsLayout}
                        showTabs={false}
                        plugins={[
                            new AdminCourtroomsPlugin(),
                            new AdminCourtRolesPlugin(),
                            new AdminJailRolesPlugin(),
                            new AdminEscortTypesPlugin(),
                            new AdminOtherTypesPlugin()
                        ]}
                        isEditing={isEditing}
                        selectedSection={selectedSection}
                    />
                </Well>
            </Page>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        selectedSection: selectedAdminFormSection(state)
    };
};

const mapDispatchToProps = {
  selectAdminFormSection: selectAdminRolesPluginSection
};

// tslint:disable-next-line:max-line-length
export default connect<ManageAssignmentTypesStateProps, ManageAssignmentTypesDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(ManageCodeTypes);
