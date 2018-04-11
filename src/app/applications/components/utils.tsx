import * as React from 'react';

import * as appModels from '../../shared/models';

const ARGO_SUCCESS_COLOR = '#18BE94';
const ARGO_FAILED_COLOR = '#E96D76';
const ARGO_RUNNING_COLOR = '#0DADEA';

export const ComparisonStatusIcon = ({status}: { status: appModels.ComparisonStatus }) => {
    let className = '';
    let color = '';

    switch (status) {
        case appModels.ComparisonStatuses.Synced:
            className = 'fa fa-check-circle';
            color = ARGO_SUCCESS_COLOR;
            break;
        case appModels.ComparisonStatuses.OutOfSync:
            className = 'fa fa-times';
            color = ARGO_FAILED_COLOR;
            break;
        case appModels.ComparisonStatuses.Error:
            className = 'fa fa-exclamation-circle';
            color = ARGO_FAILED_COLOR;
            break;
        case appModels.ComparisonStatuses.Unknown:
            className = 'fa fa-circle-o-notch status-icon--running status-icon--spin';
            color = ARGO_RUNNING_COLOR;
            break;
    }
    return <i title={status} className={className} style={{ color }} />;
};

export function getStateAndNode(resource: appModels.ResourceNode | appModels.ResourceState) {
    let resourceNode: appModels.ResourceNode;
    let resourceState = resource as appModels.ResourceState;
    if (resourceState.liveState || resourceState.targetState) {
        resourceNode = { state: resourceState.liveState || resourceState.targetState, children: resourceState.childLiveResources };
    } else {
        resourceState = null;
        resourceNode = resource as appModels.ResourceNode;
    }
    return {resourceState, resourceNode};
}

export function getPodPhase(pod: appModels.State) {
    let phase = '';
    if (pod.status) {
        phase = pod.status.phase;
        if (pod.status.containerStatuses && pod.status.containerStatuses.find((status: any) => status.state.terminated)) {
            phase = 'Terminating';
        }
    }
    return phase;
}
