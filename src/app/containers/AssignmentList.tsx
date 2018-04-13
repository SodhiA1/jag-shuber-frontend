import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { Assignment } from '../api/index';
import {
  allAssignments,
  isLoadingAssignments
} from '../modules/assignments/selectors';
import { getAssignments } from '../modules/assignments/actions';
import AssignmentDefaultList from '../components/AssignmentDefaultList';

interface AssignmentTemplateListDispatchProps {
  getAssignments?: () => void;
}

interface AssignmentTemplateListStateProps {
  assignments: Assignment[];
}
interface AssignmentTemplateListProps {
  assignments?: Assignment[];
  loading?: boolean;
}
class AssignmentTemplateList 
  extends React.PureComponent<AssignmentTemplateListProps 
    & AssignmentTemplateListDispatchProps 
    & AssignmentTemplateListStateProps> {

  componentWillMount() {
    // tslint:disable-next-line:no-shadowed-variable
    const { getAssignments } = this.props;
    // tslint:disable-next-line:no-unused-expression
    getAssignments && getAssignments();
  }

  render() {
    const { assignments = [], loading = true } = this.props;

    if (loading) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <AssignmentDefaultList assignments={assignments} />
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    assignments: allAssignments(state),
    loading: isLoadingAssignments(state)
  };
};

const mapDispatchToProps = {
  getAssignments: getAssignments
};

// tslint:disable-next-line:max-line-length
export default connect<AssignmentTemplateListStateProps, AssignmentTemplateListDispatchProps, AssignmentTemplateListProps>(
  mapStateToProps,
  mapDispatchToProps
)(AssignmentTemplateList);