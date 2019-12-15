import React from 'react';
import {
    reduxForm,
    ConfigProps,
    getFormSyncErrors,
    getFormAsyncErrors,
    getFormSubmitErrors,
    hasSubmitFailed,
    InjectedFormProps,
    SubmissionError,
    FormErrors,
    reset
} from 'redux-form';

// TODO: Rewire dispatches
import { connect, Dispatch } from 'react-redux';

import { Alert } from 'react-bootstrap';

import merge from 'deepmerge';

import { toast } from '../components/ToastManager/ToastManager';
import { RequestActionConfig } from '../infrastructure/Requests/RequestActionBase';
import { default as FormSubmitButton, SubmitButtonProps } from '../components/FormElements/SubmitButton';

// import { currentLocation } from '../../modules/user/selectors';

import { RootState } from '../store';

import {
    selectedAdminRolesSection as selectedAdminFormSection,
    getAdminRolesPluginErrors as getAdminFormPluginErrors
} from '../modules/roles/selectors';
import {
    selectAdminRolesSection as selectAdminFormSection,
    setAdminRolesPluginSubmitErrors as setAdminFormPluginSubmitErrors,
} from '../modules/roles/actions'; // TODO: This is not generic!

import AdminFormComponent, { AdminFormProps } from '../components/AdminForm/AdminForm';
import { FormContainerBase } from '../components/Form/FormContainer';

async function submitPlugins(
    values: any,
    dispatch: Dispatch<any>,
    plugins: FormContainerBase<any>[] = []
) {
    // try creating resources catching errors so that we can throw a submission error at the end
    const pluginErrors: FormErrors = {};
    await Promise.all(plugins.map(async p => {
        try {
            await p.onSubmit(values, dispatch);
        } catch (e) {
            pluginErrors[p.name] = e;
        }
    }));

    const pluginsWithErrors = Object.keys(pluginErrors);
    if (pluginsWithErrors.length > 0) {
        const formErrors: FormErrors = {};
        const pluginErrorMessages: { [key: string]: string } = {};
        pluginsWithErrors.map(pluginName => {
            const err = pluginErrors[pluginName];
            if (err instanceof SubmissionError) {
                const { errors: { _error = undefined, ...restErrors } = {} } = err;
                if (_error) {
                    pluginErrorMessages[pluginName] = _error;
                }
                Object.keys(restErrors).forEach(fieldKey => {
                    formErrors[fieldKey] = restErrors[fieldKey];
                });
            }
        });
        dispatch(setAdminFormPluginSubmitErrors(pluginErrorMessages));
        throw new SubmissionError({ ...formErrors });
    }
}

function collectPluginErrors(state: any, formName: string, plugins: FormContainerBase<any>[] = []) {
    const includeErrors = hasSubmitFailed(formName)(state);
    if (!includeErrors) {
        return {
            pluginsWithErrors: {},
            pluginErrors: {}
        };
    }
    const pluginErrors = includeErrors ? getAdminFormPluginErrors(state) : {};
    const errors = includeErrors ?
        {
            syncErrors: getFormSyncErrors(formName)(state),
            asyncErrors: getFormAsyncErrors(formName)(state),
            submitErrors: getFormSubmitErrors(formName)(state)
        } : {};

    const pluginsWithErrors = plugins.reduce(
        (haveErrors, plugin) => {
            haveErrors[plugin.name] = (pluginErrors as Object).hasOwnProperty(plugin.name) || plugin.hasErrors(errors);
            return haveErrors;
        },
        {}
    );

    return {
        pluginsWithErrors,
        pluginErrors
    };
}

const formConfig: ConfigProps<{}, AdminFormProps> = {
    form: 'AdminForm',
    enableReinitialize: true,
    validate: (values: any, { plugins = [] }) => {
        const validationErrors = plugins.reduce((errors, plugin) => {
            const pluginValues = values[plugin.name];
            const pluginErrors = plugin.validate(pluginValues);
            if (pluginErrors) {
                errors[plugin.name] = {...pluginErrors};
            }
            return errors;
        }, {} as FormErrors);
        return {...validationErrors};
    },
    onSubmit: async (values: any, dispatch, { plugins = [] }: AdminFormProps) => {
        const profileUpdateConfig: RequestActionConfig<any> = {
            toasts: {
                error: (e) => `Error occured while creating/updating: ${e}`
            }
        };
        let actionMessage = '';

        try {
            await submitPlugins(values, dispatch, plugins);
        } catch (e) {
            toast.warn('An issue occurred with one of the sections');
            throw e;
        }

        toast.success(`${actionMessage}`);
    }
};

// Wire up the Form to redux Form
// @ts-ignore
const AdminForm = reduxForm<{}, AdminFormProps>(formConfig)(AdminFormComponent);

interface AdminFormContainerStateProps {
    pluginsWithErrors: { [key: string]: boolean };
    pluginErrors: { [key: string]: Error | string };
    selectedSection?: string;
}

interface AdminFormContainerDispatchProps {
    initialize: () => void;
    onSelectSection: (sectionName: string) => void;
}

interface AdminFormContainerPluginProps {
    plugins?: any[];
}

type AdminFormContainerProps = AdminFormProps &
    InjectedFormProps<{}, AdminFormProps>
    & AdminFormContainerStateProps
    & AdminFormContainerDispatchProps
    & AdminFormContainerPluginProps;

class AdminFormErrorDisplay extends React.PureComponent<{ pluginErrors: { [key: string]: Error | string } }> {
    render() {
        const { pluginErrors } = this.props;
        const pluginsWithErrors = Object.keys(pluginErrors);
        const hasErrors = pluginsWithErrors.length > 0;
        return hasErrors && (
            <Alert bsStyle="danger">
                <ul
                    style={{
                        listStyleType: 'none'
                    }}
                >
                    {pluginsWithErrors.map(key => (
                        <li key={key}><strong>{key}</strong>: {pluginErrors[key]}</li>
                    ))}
                </ul>
            </Alert>
        );
    }
}

class AdminFormContainer extends React.PureComponent<AdminFormContainerProps> {
    componentWillMount() {
        const { initialize } = this.props;
        if (initialize) {
            initialize();
        }
    }

    render() {
        const { isEditing, pluginErrors = {} } = this.props;

        return (
            <div>
                <AdminFormErrorDisplay pluginErrors={pluginErrors} />
                {isEditing
                    ? <AdminForm {...this.props as {}} />
                    : <AdminFormComponent {...this.props} />
                }
            </div>
        );
    }
}

// @ts-ignore
const combineMerge = (target, source, options) => {
    const destination = target.slice();

    source.forEach((item: any, index: number) => {
        if (typeof destination[index] === 'undefined') {
            destination[index] = options.cloneUnlessOtherwiseSpecified(item, options);
        } else if (options.isMergeableObject(item)) {
            destination[index] = merge(target[index], item, options);
        } else if (target.indexOf(item) === -1) {
            destination.push(item);
        }
    });
    return destination;
};

export default class extends
    connect<AdminFormContainerStateProps, AdminFormContainerDispatchProps, AdminFormProps, RootState>(
        // TODO: Type this?
        (state, { plugins }) => {
            let initialValues: any = {};

            // @ts-ignore
            initialValues = plugins
                .map(p => {
                    // TODO: Get rid of 'data' param if it isn't necessary...
                    const data = p.getData('data', state);
                    if (data != undefined) {
                        const pluginState = {};
                        pluginState[p.reduxFormKey] = data;
                        return pluginState;
                    }
                    return undefined;
                })
                .filter(s => s != undefined)
                .reduce(
                    (initValues, val) => {
                        return merge(initValues, val, { arrayMerge: combineMerge });
                    },
                    {}
                );

            return {
                initialValues,
                pluginState: { ...initialValues },
                selectedSection: selectedAdminFormSection(state),
                ...collectPluginErrors(state, formConfig.form, plugins)
            };
        },
        (dispatch, { plugins = [] }) => {
            return {
                initialize: () => {
                    dispatch(selectAdminFormSection());
                    dispatch(setAdminFormPluginSubmitErrors());
                    plugins.forEach(p => {
                        // TODO: Get rid of this first param, unless we're implementing location specific roles...
                        p.fetchData(undefined, dispatch);
                    });
                },
                onSelectSection: (sectionName) => dispatch(selectAdminFormSection(sectionName))
            };
        }
    )(AdminFormContainer as any) {
        static defaultProps: Partial<AdminFormProps & { children?: React.ReactNode }> = {
            plugins: []
        };

        static SubmitButton = (props: Partial<SubmitButtonProps>) => (
            <FormSubmitButton {...props} formName={formConfig.form} />
        )
    }
